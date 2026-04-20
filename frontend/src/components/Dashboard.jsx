import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SalesTable from "./SalesTable";
import PredictForm from "./PredictForm";

export default function Dashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            AI Sales Prediction
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">admin</span>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-1 mb-6 border-b">
          <button
            onClick={() => setActiveTab("sales")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "sales"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Data Penjualan
          </button>
          <button
            onClick={() => setActiveTab("predict")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "predict"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Prediksi
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "sales" ? <SalesTable /> : <PredictForm />}
        </div>
      </div>
    </div>
  );
}
