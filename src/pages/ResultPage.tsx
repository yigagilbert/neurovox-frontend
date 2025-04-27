import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  if (!state) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <p className="mb-3">No result available. Please take the test first.</p>
          <Link to="/" className="btn btn-outline-primary">Back to test</Link>
        </div>
      </div>
    );
  }

  const { prediction, confidence, inference_time } = state as any;
  const confidencePct = (confidence * 100).toFixed(1);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center my-2">Assessment Result</h2>
            </div>
            <div className="card-body text-center p-4">
              <div className="mb-4">
                <h3 className="mb-4">Prediction</h3>
                <div className="display-6 mb-3 text-primary fw-bold">{prediction}</div>

                <div className="mb-3">
                  <p className="mb-1">Confidence</p>
                  <div className="progress" role="progressbar">
                    <div
                      className={`progress-bar progress-bar-striped ${parseFloat(confidencePct) > 70 ? 'bg-success' : 'bg-warning'}`}
                      style={{ width: `${confidencePct}%` }}
                    >
                      {confidencePct}%
                    </div>
                  </div>
                </div>

                <p className="text-muted small">
                  Inference time: {inference_time.toFixed(2)}s
                </p>
              </div>
              <Link to="/" className="btn btn-primary px-4">Retake Test</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}