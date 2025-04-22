"use client";

import { useState } from "react";
import { connectClient } from "@/lib/connect-client";
import { useMutation } from "@tanstack/react-query";

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("+");
  
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: async () => {
      return await connectClient.calculate({
        firstNumber: parseFloat(firstNumber),
        secondNumber: parseFloat(secondNumber),
        operation,
      });
    }
  });

  const handleCalculate = () => {
    if (!firstNumber || !secondNumber) return;
    mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Calculator</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        )}
        
        <div className="space-y-4">
          {/* 保持原有的输入框和选择器 */}
          <input 
            type="number"
            value={firstNumber}
            onChange={(e) => setFirstNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="First number"
          />
          
          <label htmlFor="operation" className="block text-sm font-medium text-gray-700">
            Operation
          </label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {["+", "-", "*", "/"].map(op => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
          
          <input
            type="number"
            value={secondNumber}
            onChange={(e) => setSecondNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Second number"
          />
          
          <button
            onClick={handleCalculate}
            disabled={isPending}
            className={`w-full py-2 px-4 rounded text-white font-medium ${
              isPending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Calculating..." : "Calculate"}
          </button>
          
          {data && (
            <div className="mt-4 p-4 bg-gray-50 rounded text-center">
              <p className="text-sm text-gray-600">Result:</p>
              <p className="text-2xl font-bold">{data.result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}