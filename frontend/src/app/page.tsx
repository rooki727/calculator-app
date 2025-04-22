"use client";

import { useState } from "react";
import { CalculatorService } from "@/gen/calculator/v1/calculator_connect";
import { CalculateRequest, CalculateResponse } from "@/gen/calculator/v1/calculator_pb";
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

const transport = createConnectTransport({
  baseUrl: typeof window === "undefined" ? "" : "http://localhost:8080",
});

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const client = createPromiseClient(CalculatorService, transport);

  const handleCalculate = async () => {
    if (!firstNumber || !secondNumber) {
      setError("Please enter both numbers");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const req = new CalculateRequest({
        firstNumber: parseFloat(firstNumber),
        secondNumber: parseFloat(secondNumber),
        operation,
      });

      const res = await client.calculate(req) as CalculateResponse;
      setResult(res.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Calculator</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Number
            </label>
            <input
              type="number"
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter first number"
            />
          </div>
          
          <div>
            <label htmlFor="operation-select" className="block text-sm font-medium text-gray-700 mb-1">
              Operation
            </label>
            <select
              id="operation-select"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="+">Addition (+)</option>
              <option value="-">Subtraction (-)</option>
              <option value="*">Multiplication (*)</option>
              <option value="/">Division (/)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Second Number
            </label>
            <input
              type="number"
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter second number"
            />
          </div>
          
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded text-white font-medium ${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
          
          {result !== null && (
            <div className="mt-4 p-4 bg-gray-50 rounded text-center">
              <p className="text-sm text-gray-600">Result:</p>
              <p className="text-2xl font-bold">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}