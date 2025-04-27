import { useState } from "react";
import useRecorderJs from "../hooks/useRecorderJs";
import { Timer } from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import React from "react";

const COOKIE_IMAGE = "/cookie_theft.jpg";
const API_URL = "https://backend-9277c693-08f7-4400-9585.renu-01.cranecloud.io";

export default function CookieTestPage() {
  const { recording, audioBlob, start, stop } = useRecorderJs();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!audioBlob) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    try {
      const res = await fetch(`${API_URL}/predict-audio`, { method: "POST", body: formData });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      navigate("/result", { state: data });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="flex flex-col lg:flex-row gap-8 p-6">
      <section className="lg:w-1/2 rounded-xl bg-white shadow-card ring-1 ring-gray-100 p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Cookie Theft Test (Verbal)</h1>
        <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Ensure you are in a quiet environment with minimal background noise.</p>
        <ol className="list-decimal list-inside space-y-1 sm:space-y-2 mb-6 sm:mb-8 text-sm sm:text-base text-gray-800">
          <li>Click <strong>Start Recording</strong> when ready.</li>
          <li>Speak for one minute, describing the picture in detail.</li>
          <li>Click <strong>Stop Recording</strong> when done.</li>
        </ol>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Button onClick={recording ? stop : start} variant={recording ? "danger" : "primary"}>
            {recording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Timer active={recording} />
        </div>
        {audioBlob && !recording && (
          <Button onClick={handleSubmit} disabled={uploading} variant="primary">
            {uploading ? "Uploading…" : "Submit & Get Result"}
          </Button>
        )}
        {error && <p className="text-red-600 mt-4 text-sm sm:text-base">{error}</p>}
      </section>
      <section className="lg:w-1/2 flex justify-center items-start">
        <img src={COOKIE_IMAGE} alt="Cookie Theft stimulus" className="w-full max-w-md h-auto border rounded-xl shadow-card" />
      </section>
    </main>
  );
}