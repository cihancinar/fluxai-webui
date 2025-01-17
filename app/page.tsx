"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Combobox from "@/components/Combobox";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  interface Prediction {
    id: string;
    status: string;
    output?: string[] | string;
    detail?: string;
  }

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(
    "black-forest-labs/flux-dev"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: (e.target as HTMLFormElement).prompt.value,
        model: selectedModel,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
    }
  };

  const getImageSrc = (output: string[] | string) => {
    if (Array.isArray(output)) {
      return output[output.length - 1];
    }
    return output;
  };

  const handleDownload = () => {
    const src = getImageSrc(prediction?.output);
    if (src) {
      const link = document.createElement("a");
      link.href = src;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1">
        {/* Left column - Form */}
        <div className="w-1/2 p-8 border-r border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-center">Input</h2>

          <div className="p-6">
            <div className="pb-8">
              <Combobox value={selectedModel} onChange={setSelectedModel} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700"
              >
                Prompt
              </label>
              <Textarea
                name="prompt"
                placeholder=""
                className="flex-1"
                rows={4}
              />

              <Button type="submit" className="w-full">
                Generate Image
              </Button>
            </form>
          </div>
        </div>

        {/* Right column - Output */}
        <div className="w-1/2 p-8 flex flex-col items-center ">
          <h2 className="text-lg font-semibold mb-4">Output</h2>
          <div
            className="p-4 mb-4 bg-gray-200 flex items-center justify-center"
            style={{ width: "100%", height: "512px" }}
          >
            {prediction ? (
              prediction.output ? (
                <>
                  <img
                    src={getImageSrc(prediction.output)}
                    alt="Generated image"
                    className="max-w-full max-h-full"
                  />
                </>
              ) : prediction.status === "processing" ? (
                <Loader />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Image Generation Started..
                </p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                No image generated yet.
              </p>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            status: {prediction?.status}
          </p>
          {prediction && prediction.output && (
            <Button onClick={handleDownload} className="mt-4" variant="outline">
              Download Image
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
