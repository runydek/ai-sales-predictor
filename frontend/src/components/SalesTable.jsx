import { useState, useEffect } from "react";
import { getSales } from "../api/sales";

export default function SalesTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const perPage = 20;

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await getSales();
      setData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Gagal memuat data penjualan");
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter((item) => {
    const matchSearch =
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.product_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Memuat data...</div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          placeholder="Cari produk..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(0);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Status</option>
          <option value="Laris">Laris</option>
          <option value="Tidak">Tidak</option>
        </select>
        <span className="text-sm text-gray-500">
          Menampilkan {filtered.length} dari {data.length} produk
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Produk
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">
                Jumlah
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">
                Harga
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">
                Diskon
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => (
              <tr
                key={item.product_id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-500">{item.product_id}</td>
                <td className="px-4 py-3 font-medium">{item.product_name}</td>
                <td className="px-4 py-3 text-right">
                  {item.jumlah_penjualan}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatRupiah(item.harga)}
                </td>
                <td className="px-4 py-3 text-right">{item.diskon}%</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      item.status === "Laris"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
