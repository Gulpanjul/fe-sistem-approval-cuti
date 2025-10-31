import { useState, useEffect } from "react";
import { api } from "../api/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

interface CutiForm {
  startDate: string;
  endDate: string;
  type: "TAHUNAN" | "SAKIT" | "IZIN";
  reason: string;
}

export default function CutiEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CutiForm>({
    startDate: "",
    endDate: "",
    type: "TAHUNAN",
    reason: "",
  });

  useEffect(() => {
    const fetchCuti = async () => {
      try {
        const res = await api.get(`/cuti/${id}`);
        const c = res.data;
        setForm({
          startDate: c.startDate
            ? new Date(c.startDate).toISOString().split("T")[0]
            : "",
          endDate: c.endDate
            ? new Date(c.endDate).toISOString().split("T")[0]
            : "",
          type: c.type || "TAHUNAN",
          reason: c.reason || "",
        });
      } catch (err) {
        console.error("Gagal mengambil data cuti:", err);
        alert("Gagal memuat data cuti");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCuti();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/cuti/${id}`, form);
      navigate("/dashboard");
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      alert("Gagal menyimpan perubahan.");
    }
  };

  if (loading) return <p className="p-4">Memuat data...</p>;

  return (
    <div className="p-4 space-y-4">
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        ← Kembali
      </Link>
      <h1 className="text-xl font-bold mb-4">Edit Cuti</h1>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="border p-2 w-full"
        />
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as CutiForm["type"] })
          }
          className="border p-2 w-full"
        >
          <option value="TAHUNAN">Tahunan</option>
          <option value="SAKIT">Sakit</option>
          <option value="IZIN">Izin</option>
        </select>
        <textarea
          placeholder="Alasan cuti"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="border p-2 w-full"
        />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
