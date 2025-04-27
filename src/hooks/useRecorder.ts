import { useState, useRef, useCallback } from "react";

/**
 * Micro-phone recorder hook
 * ------------------------
 * • Records in WAV when the browser supports it, otherwise falls back to WebM-Opus.
 * • Returns the recorded Blob and the selected MIME type so the caller can name the
 *   file correctly (e.g. recording.wav vs recording.webm).
 */
export default function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mime, setMime] = useState<string>("audio/webm");

  const chunks = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  /** Start recording */
  const start = useCallback(async () => {
    // Ask for mic permission
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Prefer WAV if the browser supports it; otherwise use WebM
    const selectedMime = MediaRecorder.isTypeSupported("audio/wav")
      ? "audio/wav"
      : "audio/webm";
    setMime(selectedMime);
    console.log("Recording mime:", selectedMime); // <-- see it in DevTools

    const recorder = new MediaRecorder(stream, { mimeType: selectedMime });

    recorder.ondataavailable = (e) => chunks.current.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: selectedMime });
      chunks.current = [];
      setAudioBlob(blob);
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  }, []);

  /** Stop recording */
  const stop = useCallback(() => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    setRecording(false);
  }, []);

  return { recording, audioBlob, mime, start, stop };
}