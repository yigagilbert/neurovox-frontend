import { useState, useRef, useCallback } from "react";
import Recorder from "recorder-js";

export default function useRecorderJs() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob]   = useState<Blob | null>(null);

  const gumStream = useRef<MediaStream | null>(null);
  const recorder  = useRef<Recorder | null>(null);

  const start = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    gumStream.current = stream;

    const audioCtx  = new AudioContext();
    const rec       = new Recorder(audioCtx, { numChannels: 1 });
    await rec.init(stream);

    rec.start();
    recorder.current = rec;
    setRecording(true);
  }, []);

  const stop = useCallback(async () => {
    if (!recorder.current) return;

    const { blob } = await recorder.current.stop(); // returns 16-bit PCM WAV
    gumStream.current?.getTracks().forEach((t) => t.stop());

    setAudioBlob(blob);
    setRecording(false);
  }, []);

  return { recording, audioBlob, start, stop };
}
