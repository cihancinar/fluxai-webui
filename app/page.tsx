'use client';
 
import { useState } from "react";
 
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
 
export default function Home() {
  interface Prediction {
    id: string;
    status: string;
    output?: string[];
    detail?: string;
  }
  
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(null);
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: (e.target as HTMLFormElement).prompt.value,
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
      console.log({ prediction: prediction });
      setPrediction(prediction);
    }
  };
 
  return (
    <div className="min-h-screen flex flex-col">


      <header className="p-4 bg-gray-100">
        <h1 className="text-lg font-semibold">black-forest-labs / dev</h1>
      </header>
 
      <form className="w-full flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow"
          name="prompt"
          placeholder="Enter a prompt to display an image"
        />
        <button className="button" type="submit">
          Go!
        </button>
      </form>
 
      {error && <div>{error}</div>}
 
      {prediction && (
        <>
          {prediction.output && (
            <div className="image-wrapper mt-5">
              <img
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
                height={768}
                width={768}
              />
            </div>
          )}
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
        </>
      )}



    </div>
  );
}