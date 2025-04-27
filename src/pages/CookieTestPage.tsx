import { useState } from "react";
import useRecorderJs from "../hooks/useRecorderJs";
import { Timer } from "../components/Timer";
import { useNavigate } from "react-router-dom";
// import { Button } from "../components/Button";
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
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h1 className="card-title text-primary fw-bold mb-3">Cookie Theft Test</h1>
              <p className="card-text text-muted mb-4">
                Ensure you are in a quiet environment with minimal background noise.
              </p>
              <ol className="list-group list-group-numbered mb-4">
                <li className="list-group-item border-0">Click <strong>Start Recording</strong> when ready.</li>
                <li className="list-group-item border-0">Speak for one minute, describing the picture in detail.</li>
                <li className="list-group-item border-0">Click <strong>Stop Recording</strong> when done.</li>
              </ol>
              <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
                <button
                  onClick={recording ? stop : start}
                  className={`btn ${recording ? 'btn-danger' : 'btn-primary'}`}
                >
                  {recording ? "Stop Recording" : "Start Recording"}
                </button>
                <Timer active={recording} />
              </div>
              {audioBlob && !recording && (
                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className="btn btn-success"
                >
                  {uploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Uploading...
                    </>
                  ) : "Submit & Get Result"}
                </button>
              )}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src={COOKIE_IMAGE}
                alt="Cookie Theft stimulus"
                className="img-fluid rounded"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}