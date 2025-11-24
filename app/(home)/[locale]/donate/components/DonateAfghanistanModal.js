"use client";
import { useState } from "react";

export default function DonateAfghanistanModal({ isOpen, onClose }) {
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    {
      id: "mobile",
      name: "Mobile Money",
      providers: [
        "HesabPay:32423424",
        "AWCC:070000000",
        "Salaam:07444444",
        "Roshan:070090900909",
      ],
      description: "Instant transfer via mobile wallets",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      providers: [
        "Bank-e-Millie:2345345234525423",
        "Azizi Bank:234234243234234234",
        "Kabul Bank:242342342342342",
      ],
      description: "Direct bank transfer within Afghanistan",
    },
    {
      id: "cash",
      name: "Cash Donation",
      providers: ["ADD:Kabul, shahr-e-now, Yaqub Square, d Tower, 12N Shop"],
      description: "In-person donation at our offices",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission
    console.log({
      amount: donationAmount,
      method: selectedMethod,
      type: "afghanistan",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🇦🇫</span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Donate in Afghanistan
                </h2>
                <p className="text-green-100 text-sm">
                  Support local students directly
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Which Way Do You Prepare?
            </label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedMethod === method.id
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {selectedMethod === method.id && (
                    <div className="mt-3">
                      <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                        <option value="">Select provider</option>
                        {method.providers.map((provider) => (
                          <option key={provider} value={provider}>
                            {provider}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
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
          </div>
        </form>
      </div>
    </div>
  );
}
