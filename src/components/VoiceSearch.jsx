"use client";
import { useState } from "react";

export default function VoiceSearch() {
  const [results, setResults] = useState([]);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      let text = event.results[0][0].transcript.toLowerCase().trim();
      console.log("🎤 User said:", text);

      try {
        // 🔹 Call backend API instead of Firestore directly
        const res = await fetch(`/api/products?brand=${text}`);
        const data = await res.json();

        if (data.success && data.products.length > 0) {
          console.log("✅ ProductsData:", data.products);
          setResults(data.products);

          // 🔹 Voice output of first product
          const firstProduct = data.products[0];
          const utterance = new SpeechSynthesisUtterance(
            `${firstProduct.name} by ${firstProduct.brand}. Price is ${firstProduct.price} ${firstProduct.currency || "INR"}. Features are ${firstProduct.features?.join(", ") || "not available"}`
          );
          window.speechSynthesis.speak(utterance);
        } else {
          console.warn("⚠️ No product found for:", text);
          setResults([]);
          const utterance = new SpeechSynthesisUtterance(
            "Sorry, no products found for this brand."
          );
          window.speechSynthesis.speak(utterance);
        }
      } catch (error) {
        console.error("🔥 API error:", error);
      }

      setListening(false);
    };
  };

  return (
    <div className="p-6">
      {/* 🎤 Voice Button */}
      <button
        onClick={startListening}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={listening}
      >
        {listening ? "Listening..." : "🎤 Speak"}
      </button>

      {/* 🔹 Results */}
      {results.length > 0 ? (
        <div className="mt-6 space-y-4">
          {results.map((product) => (
            <div key={product.id} className="border p-4 rounded bg-gray-100">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
              <p>Price: ₹{product.price}</p>
              <p>Description: {product.description}</p>

              {product.features && product.features.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No product found. Try another brand.</p>
      )}
    </div>
  );
}
