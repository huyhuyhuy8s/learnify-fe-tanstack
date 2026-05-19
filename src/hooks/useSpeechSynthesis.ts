import { useState, useEffect, useRef, useCallback } from "react";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import type {
  TSpeechSynthesisOptions,
  TSpeechSynthesisReturn,
} from "@/types/speech.d";
import { logger } from "@/utils/logger";
import { getEdgeTtsAudio } from "@/lib/edgeTts";

const useSpeechSynthesis = (): TSpeechSynthesisReturn => {
  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const useElevenLabsRef = useRef(false);
  const elevenLabsClientRef = useRef<ElevenLabsClient | null>(null);
  const speakResolveRef = useRef<
    ((value: HTMLAudioElement | null) => void) | null
  >(null);
  const prefetchCacheRef = useRef<Map<string, string>>(new Map());

  const stopPolling = useCallback(() => {
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const handleSpeechEnd = useCallback(() => {
    stopPolling();
    audioRef.current = null;
  }, [stopPolling]);

  const prefetch = useCallback(
    async (text: string, options?: TSpeechSynthesisOptions) => {
      if (!text.trim() || options?.muted) return;
      const key = `${text}:${options?.voiceId || "vi-VN-HoaiMyNeural"}`;
      if (prefetchCacheRef.current.has(key)) return;
      try {
        const result = await getEdgeTtsAudio({
          data: { text, voice: options?.voiceId || "vi-VN-HoaiMyNeural" },
        });
        if (result?.audio) {
          prefetchCacheRef.current.set(
            key,
            `data:audio/mpeg;base64,${result.audio}`
          );
        }
      } catch {
        // silent — speak() will fall through to Edge TTS / ElevenLabs / browser TTS
      }
    },
    []
  );

  const speak = useCallback(
    async (
      text: string,
      options?: TSpeechSynthesisOptions
    ): Promise<HTMLAudioElement | null> => {
      if (!text.trim() || options?.muted) return null;

      // Check prefetch cache
      const cacheKey = `${text}:${options?.voiceId || "vi-VN-HoaiMyNeural"}`;
      const cached = prefetchCacheRef.current.get(cacheKey);
      if (cached) {
        prefetchCacheRef.current.delete(cacheKey);
        const audioElement = new Audio(cached);
        audioRef.current = audioElement;
        return await new Promise<HTMLAudioElement | null>((resolve) => {
          speakResolveRef.current = resolve;

          audioElement.onended = () => {
            speakResolveRef.current = null;
            handleSpeechEnd();
            resolve(audioElement);
          };
          audioElement.onerror = () => {
            speakResolveRef.current = null;
            handleSpeechEnd();
            resolve(null);
          };

          setIsSpeaking(true);
          audioElement.play();
        });
      }

      // Edge TTS (free, no API key needed, supports Vietnamese)
      try {
        const result = await getEdgeTtsAudio({
          data: {
            text,
            voice: options?.voiceId || "vi-VN-HoaiMyNeural",
          },
        });

        if (!result?.audio) {
          throw new Error("Empty audio response from Edge TTS");
        }

        const url = `data:audio/mpeg;base64,${result.audio}`;
        const audioElement = new Audio(url);
        audioRef.current = audioElement;

        return await new Promise<HTMLAudioElement | null>((resolve) => {
          speakResolveRef.current = resolve;

          audioElement.onended = () => {
            speakResolveRef.current = null;
            handleSpeechEnd();
            resolve(audioElement);
          };
          audioElement.onerror = () => {
            speakResolveRef.current = null;
            handleSpeechEnd();
            resolve(null);
          };

          setIsSpeaking(true);
          audioElement.play();
        });
      } catch (error) {
        audioRef.current = null;
        logger.warn("[EdgeTTS] failed, falling back to ElevenLabs:", error);
      }

      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      const voiceId =
        options?.voiceId ||
        import.meta.env.VITE_ELEVENLABS_VOICE_ID ||
        "21m00Tcm4TlvDq8ikWAM";
      const modelId =
        import.meta.env.VITE_ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

      if (apiKey) {
        try {
          const client = new ElevenLabsClient({ apiKey });
          elevenLabsClientRef.current = client;

          const response = await client.textToSpeech.convert(voiceId, {
            text,
            modelId,
          });
          const chunks: Uint8Array[] = [];
          const reader = response.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
          }

          const combinedBuffer = new Uint8Array(
            chunks.reduce((acc, chunk) => acc + chunk.length, 0)
          );
          let offset = 0;
          for (const chunk of chunks) {
            combinedBuffer.set(chunk, offset);
            offset += chunk.length;
          }
          const blob = new Blob([combinedBuffer.buffer], {
            type: "audio/mpeg",
          });
          const url = URL.createObjectURL(blob);

          const audioElement = new Audio(url);
          audioRef.current = audioElement;
          useElevenLabsRef.current = true;

          return await new Promise<HTMLAudioElement | null>((resolve) => {
            speakResolveRef.current = resolve;

            audioElement.onended = () => {
              speakResolveRef.current = null;
              URL.revokeObjectURL(url);
              handleSpeechEnd();
              resolve(audioElement);
            };
            audioElement.onerror = () => {
              speakResolveRef.current = null;
              URL.revokeObjectURL(url);
              handleSpeechEnd();
              resolve(null);
            };

            setIsSpeaking(true);
            audioElement.play();
          });
        } catch (error) {
          logger.error(
            "ElevenLabs TTS error, falling back to browser TTS:",
            error
          );
        }
      }

      if (!isSupported) return null;

      const synth = window.speechSynthesis;
      synthRef.current = synth;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Select Vietnamese voice for browser SpeechSynthesis fallback
      let voices = synth.getVoices();
      if (voices.length === 0) {
        await new Promise<void>((resolve) => {
          synth.onvoiceschanged = () => {
            synth.onvoiceschanged = null;
            resolve();
          };
        });
        voices = synth.getVoices();
      }
      const vnVoice = voices.find((v) => v.lang.startsWith("vi"));
      if (vnVoice) utterance.voice = vnVoice;

      if (options?.rate !== undefined) utterance.rate = options.rate;
      if (options?.pitch !== undefined) utterance.pitch = options.pitch;
      if (options?.volume !== undefined) utterance.volume = options.volume;

      return await new Promise<null>((resolve) => {
        speakResolveRef.current = () => {
          resolve(null);
        };

        utterance.onend = () => {
          speakResolveRef.current = null;
          handleSpeechEnd();
          resolve(null);
        };
        utterance.onerror = () => {
          speakResolveRef.current = null;
          handleSpeechEnd();
          resolve(null);
        };

        setIsSpeaking(true);
        synth.speak(utterance);
      });
    },
    [isSupported, handleSpeechEnd]
  );

  const stop = useCallback(() => {
    if (speakResolveRef.current) {
      speakResolveRef.current(null);
      speakResolveRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    synthRef.current = null;
    utteranceRef.current = null;
    stopPolling();
  }, [isSupported, stopPolling]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    } else if (isSupported && synthRef.current) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (audioRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    } else if (isSupported && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported, isPaused]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
      const cache = prefetchCacheRef.current;
      cache.clear();
      logger.debug("[speech] cleanup complete");
    };
  }, [isSupported]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      logger.debug("[speech] beforeunload - force stopping audio");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      window.speechSynthesis?.cancel();
      prefetchCacheRef.current.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return {
    speak,
    prefetch,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    isSupported,
  };
};

export default useSpeechSynthesis;
