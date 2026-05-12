import { useState, useEffect, useRef, useCallback } from "react";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import type {
  TSpeechSynthesisOptions,
  TSpeechSynthesisReturn,
} from "@/types/speech.d";

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

  const stopPolling = useCallback(() => {
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const handleSpeechEnd = useCallback(() => {
    stopPolling();
    audioRef.current = null;
  }, [stopPolling]);

  const speak = useCallback(
    async (
      text: string,
      options?: TSpeechSynthesisOptions
    ): Promise<HTMLAudioElement | null> => {
      if (!text.trim() || options?.muted) return null;

      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      const voiceId =
        options?.voiceId || import.meta.env.VITE_ELEVENLABS_VOICE_ID;
      const modelId =
        import.meta.env.VITE_ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

      const useElevenLabs = !!apiKey;
      console.log("[TTS] useElevenLabs:", useElevenLabs, "| voiceId:", voiceId);

      if (useElevenLabs) {
        try {
          console.log(
            "[TTS] Calling ElevenLabs API with text:",
            text.substring(0, 50) + "..."
          );

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

          audioElement.onended = () => {
            URL.revokeObjectURL(url);
            handleSpeechEnd();
          };

          audioElement.onerror = () => {
            URL.revokeObjectURL(url);
            handleSpeechEnd();
          };

          setIsSpeaking(true);
          await audioElement.play();

          return audioElement;
        } catch (error) {
          console.error("ElevenLabs TTS error:", error);
          return null;
        }
      }

      if (!isSupported) return null;

      const synth = window.speechSynthesis;
      synthRef.current = synth;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      if (options?.rate !== undefined) utterance.rate = options.rate;
      if (options?.pitch !== undefined) utterance.pitch = options.pitch;
      if (options?.volume !== undefined) utterance.volume = options.volume;

      utterance.onend = handleSpeechEnd;
      utterance.onerror = handleSpeechEnd;

      setIsSpeaking(true);
      synth.speak(utterance);

      return null;
    },
    [isSupported, handleSpeechEnd]
  );

  const stop = useCallback(() => {
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
    if (audioRef.current && useElevenLabsRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    } else if (isSupported && synthRef.current) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (audioRef.current && useElevenLabsRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    } else if (isSupported && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported, isPaused]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { speak, stop, pause, resume, isSpeaking, isPaused, isSupported };
};

export default useSpeechSynthesis;
