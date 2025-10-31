import { useState } from "react";
import { api } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function CutiForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "TAHUNAN",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/cuti", form);
    navigate("/dashboard");
  };

  return (
    <div className="p-4 space-y-4">
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        ← Kembali
      </Link>
      <h1 className="text-xl font-bold mb-4">Ajukan Cuti</h1>
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
          onChange={(e) => setForm({ ...form, type: e.target.value })}
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
