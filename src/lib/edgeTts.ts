import { createServerFn } from "@tanstack/react-start";
import { UniversalEdgeTTS } from "edge-tts-universal";

type TEdgeTtsInput = {
  text: string;
  voice: string;
};

export const getEdgeTtsAudio = createServerFn({ method: "POST" })
  .inputValidator((data: TEdgeTtsInput) => data)
  .handler(async ({ data }) => {
    try {
      const tts = new UniversalEdgeTTS(
        data.text,
        data.voice || "vi-VN-HoaiMyNeural",
        {
          rate: "+0%",
          volume: "+0%",
          pitch: "+0Hz",
        }
      );

      const result = await tts.synthesize();
      const buffer = Buffer.from(await result.audio.arrayBuffer());

      if (buffer.length === 0) {
        throw new Error("No audio data received from Edge TTS");
      }

      return { audio: buffer.toString("base64") };
    } catch (error) {
      console.error("[EdgeTTS server] error:", error);
      throw error;
    }
  });
