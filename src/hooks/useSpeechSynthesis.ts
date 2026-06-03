import { useState, useEffect, useRef, useCallback } from "react";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import type {
  TSpeechSynthesisOptions,
  TSpeechSynthesisReturn,
} from "@/types/speech.d";
import { logger } from "@/utils/logger";
import { getEdgeTtsAudio } from "@/lib/edgeTts";

const DEFAULT_EDGETTS_VOICE = "vi-VN-HoaiMyNeural";
const DEFAULT_ELEVENLABS_VOICE = "hpp4J3VqNfWAUOO0d1Us";
const IS_ELEVENLABS_ID = /^[A-Za-z0-9]{20}$/;

const createAudioPlayer = (url: string): HTMLAudioElement => new Audio(url);

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

  const resolveAudio = useCallback(
    (el: HTMLAudioElement, resolve: (val: HTMLAudioElement | null) => void) => {
      speakResolveRef.current = resolve;
      audioRef.current = el;
      el.onended = () => {
        speakResolveRef.current = null;
        handleSpeechEnd();
        resolve(el);
      };
      el.onerror = () => {
        speakResolveRef.current = null;
        handleSpeechEnd();
        resolve(null);
      };
      setIsSpeaking(true);
    },
    [handleSpeechEnd]
  );

  const resolveBrowserTTS = useCallback(
    (
      utterance: SpeechSynthesisUtterance,
      synth: SpeechSynthesis,
      resolve: (val: null) => void
    ) => {
      speakResolveRef.current = () => resolve(null);
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
    },
    [handleSpeechEnd]
  );

  const getResolution = useCallback(() => {
    let _resolve: ((val: HTMLAudioElement | null) => void) | null = null;
    const promise = new Promise<HTMLAudioElement | null>((r) => {
      _resolve = r;
    });
    return { resolve: _resolve!, promise };
  }, []);

  const prefetch = useCallback(
    async (text: string, options?: TSpeechSynthesisOptions) => {
      if (!text.trim() || options?.muted) return;
      const key = `${text}:${options?.voiceId || DEFAULT_EDGETTS_VOICE}`;
      if (prefetchCacheRef.current.has(key)) return;
      try {
        const result = await getEdgeTtsAudio({
          data: { text, voice: options?.voiceId || DEFAULT_EDGETTS_VOICE },
        });
        if (result?.audio) {
          prefetchCacheRef.current.set(
            key,
            `data:audio/mpeg;base64,${result.audio}`
          );
        }
      } catch {
        // silent — speak() will fall through
      }
    },
    []
  );

  const callElevenLabs = useCallback(
    async (text: string, voiceId: string): Promise<HTMLAudioElement | null> => {
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      if (!apiKey) return null;

      try {
        const client = new ElevenLabsClient({ apiKey });
        elevenLabsClientRef.current = client;

        const response = await client.textToSpeech.convert(voiceId, {
          text,
          modelId:
            import.meta.env.VITE_ELEVENLABS_MODEL_ID ||
            "eleven_multilingual_v2",
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
        const blob = new Blob([combinedBuffer.buffer], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);

        const el = createAudioPlayer(url);
        useElevenLabsRef.current = true;

        const { resolve, promise } = getResolution();
        resolveAudio(el, resolve);
        el.play();
        const result = await promise;
        URL.revokeObjectURL(url);
        return result;
      } catch (error) {
        logger.warn("[ElevenLabs] failed:", error);
        return null;
      }
    },
    [getResolution, resolveAudio]
  );

  const callEdgeTts = useCallback(
    async (text: string, voiceId: string): Promise<HTMLAudioElement | null> => {
      try {
        const result = await getEdgeTtsAudio({
          data: { text, voice: voiceId },
        });
        if (!result?.audio) return null;

        const url = `data:audio/mpeg;base64,${result.audio}`;
        const el = createAudioPlayer(url);
        const { resolve, promise } = getResolution();
        resolveAudio(el, resolve);
        el.play();
        return await promise;
      } catch (error) {
        logger.warn("[EdgeTTS] failed:", error);
        return null;
      }
    },
    [getResolution, resolveAudio]
  );

  const callBrowserTts = useCallback(
    async (text: string, options?: TSpeechSynthesisOptions): Promise<null> => {
      if (!isSupported) return null;

      const synth = window.speechSynthesis;
      synthRef.current = synth;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

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

      const { resolve, promise } = getResolution();
      resolveBrowserTTS(utterance, synth, resolve);
      return (await promise) as unknown as null;
    },
    [isSupported, getResolution, resolveBrowserTTS]
  );

  const speak = useCallback(
    async (
      text: string,
      options?: TSpeechSynthesisOptions
    ): Promise<HTMLAudioElement | null> => {
      if (!text.trim() || options?.muted) return null;

      const edgeVoice = options?.voiceId || DEFAULT_EDGETTS_VOICE;
      const isElevenVoice = IS_ELEVENLABS_ID.test(options?.voiceId || "");
      const elevenVoice =
        options?.voiceId && isElevenVoice
          ? options.voiceId
          : import.meta.env.VITE_ELEVENLABS_VOICE_ID ||
            DEFAULT_ELEVENLABS_VOICE;

      // Check prefetch cache
      const cacheKey = `${text}:${edgeVoice}`;
      const cached = prefetchCacheRef.current.get(cacheKey);
      if (cached) {
        prefetchCacheRef.current.delete(cacheKey);
        const el = createAudioPlayer(cached);
        const { resolve, promise } = getResolution();
        resolveAudio(el, resolve);
        el.play();
        return await promise;
      }

      // 1) ElevenLabs — highest quality
      const elevenResult = await callElevenLabs(text, elevenVoice);
      if (elevenResult) return elevenResult;

      // 2) Edge TTS — fallback (free, server-side, supports Vietnamese)
      const edgeVoiceToUse = isElevenVoice ? DEFAULT_EDGETTS_VOICE : edgeVoice;
      const edgeResult = await callEdgeTts(text, edgeVoiceToUse);
      if (edgeResult) return edgeResult;

      // 3) Browser SpeechSynthesis — last resort
      return callBrowserTts(text, options);
    },
    [getResolution, resolveAudio, callElevenLabs, callEdgeTts, callBrowserTts]
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
    const cacheRef = prefetchCacheRef;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
      cacheRef.current.clear();
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
