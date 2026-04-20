import { useState } from "react";
import { predictStatus } from "../api/predict";

export default function PredictForm() {
  const [formData, setFormData] = useState({
    jumlah_penjualan: "",
    harga: "",
    diskon: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await predictStatus({
        jumlah_penjualan: parseFloat(formData.jumlah_penjualan),
        harga: parseFloat(formData.harga),
        diskon: parseFloat(formData.diskon),
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Prediksi gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ jumlah_penjualan: "", harga: "", diskon: "" });
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Prediksi Status Produk
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Penjualan
            </label>
            <input
              type="number"
              name="jumlah_penjualan"
              value={formData.jumlah_penjualan}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 150"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga Satuan
            </label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 100000"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diskon (%)
            </label>
            <input
              type="number"
              name="diskon"
              value={formData.diskon}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 10"
              min="0"
              max="100"
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Memprediksi..." : "Prediksi"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 rounded border">
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Hasil Prediksi:</span>
            <span
              className={`text-xl font-bold ${
                result.status === "Laris"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {result.status}
            </span>
            <span className="text-sm text-gray-500">
              (Confidence: {(result.confidence * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
