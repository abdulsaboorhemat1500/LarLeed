"use client";
import { useState } from "react";

export default function DonateInternationalModal({ isOpen, onClose }) {
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [currency, setCurrency] = useState("USD");

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: "🔵",
      description: "Secure online payment",
    },
    {
      id: "creditcard",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Visa, MasterCard, American Express",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: "₿",
      description: "Bitcoin, Ethereum, USDT",
    },
    {
      id: "wire",
      name: "Bank Wire Transfer",
      icon: "🏦",
      description: "International bank transfer",
    },
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission
    console.log({
      amount: donationAmount,
      currency: currency,
      method: selectedMethod,
      type: "international",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌍</span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Donate Internationally
                </h2>
                <p className="text-blue-100 text-sm">
                  Global support for Afghan education
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Currency Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Payment Method
            </label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedMethod === method.id
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!donationAmount || !selectedMethod}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-700 transition-colors"
            >
              Donate Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
