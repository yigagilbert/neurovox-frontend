import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  if (!state) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <p className="mb-4">No result available. Please take the test first.</p>
        <Link to="/" className="text-brand-600 underline">Back to test</Link>
      </div>
    );
  }
  const { prediction, confidence, inference_time } = state as any;
  return (
    <main className="p-4 sm:p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Assessment Result</h2>
      <div className="bg-white shadow-card rounded-xl p-6 sm:p-8 ring-1 ring-gray-100">
        <p className="text-lg sm:text-xl font-medium mb-2">
          Prediction: <span className="font-semibold text-brand-700">{prediction}</span>
        </p>
        <p className="text-gray-600 mb-1">Confidence: {(confidence * 100).toFixed(1)}%</p>
        <p className="text-gray-500 text-sm">Inference time: {inference_time.toFixed(2)}s</p>
      </div>
      <Link to="/" className="inline-block mt-6 sm:mt-8">
        <button className="bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md px-6 sm:px-8 py-2 shadow-card">Retake Test</button>
      </Link>
    </main>
  );
}