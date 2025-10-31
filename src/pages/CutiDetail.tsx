import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import { useState } from "react";

export default function CutiDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const role = (localStorage.getItem("role") || user?.role || "").toUpperCase();
  const [comment, setComment] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cuti-detail", id],
    queryFn: async () => (await api.get(`/cuti/${id}`)).data,
    enabled: !!id,
  });

  const actionMutation = useMutation({
    mutationFn: async (action: string) => {
      await api.post(`/cuti/${id}/action`, { action, comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuti-detail", id] });
      setComment("");
      alert("Aksi berhasil dilakukan.");
    },
    onError: () => {
      alert("Gagal melakukan aksi. Coba lagi.");
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError || !data)
    return <p className="p-4 text-red-500">Data tidak ditemukan.</p>;

  const {
    type,
    reason,
    startDate,
    endDate,
    status,
    attachment,
    employee,
    histories,
  } = data;

  const canApprove =
    (role === "HEAD" && status === "pending_head") ||
    (role === "GM" && status === "pending_gm");

  const canRequestRevision =
    (role === "HEAD" && status === "pending_head") ||
    (role === "GM" && status === "pending_gm");

  const canReject = canApprove;

  return (
    <div className="p-4 space-y-4">
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        ← Kembali
      </Link>

      <h1 className="text-xl font-bold">Detail Cuti</h1>

      <div className="border p-4 rounded-lg bg-gray-50">
        <p>
          <strong>Nama:</strong> {employee?.name}
        </p>
        <p>
          <strong>Tipe:</strong> {type}
        </p>
        <p>
          <strong>Periode:</strong> {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Alasan:</strong> {reason}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        {attachment && (
          <p>
            <strong>Lampiran:</strong>{" "}
            <a
              href={`/uploads/${attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {attachment}
            </a>
          </p>
        )}
      </div>

      {/* Aksi hanya muncul untuk Head atau GM */}
      {(canApprove || canReject || canRequestRevision) && (
        <div className="border p-4 rounded-lg bg-gray-100">
          <h2 className="font-semibold mb-2">Aksi</h2>
          <textarea
            className="border w-full p-2 rounded mb-2"
            placeholder="Tambahkan komentar (opsional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex gap-2">
            {canApprove && (
              <button
                onClick={() => actionMutation.mutate("approve")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
            )}
            {canReject && (
              <button
                onClick={() => actionMutation.mutate("reject")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            )}
            {canRequestRevision && (
              <button
                onClick={() => actionMutation.mutate("request_revision")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Request Revisi
              </button>
            )}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-semibold mb-2">Riwayat Aksi</h2>
        {histories.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Tanggal</th>
                <th className="p-2 border">Aktor</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Aksi</th>
                <th className="p-2 border">Komentar</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((h: any) => (
                <tr key={h.id}>
                  <td className="p-2 border">
                    {new Date(h.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 border">{h.actor?.name || "-"}</td>
                  <td className="p-2 border">{h.role}</td>
                  <td className="p-2 border">{h.action}</td>
                  <td className="p-2 border">{h.comment || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
