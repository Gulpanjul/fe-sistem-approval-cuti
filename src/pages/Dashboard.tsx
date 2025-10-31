import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cuti"],
    queryFn: async () => (await api.get("/cuti")).data.data,
  });

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const role = (user?.role || "").toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  const translateStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending_head":
        return "Menunggu Head";
      case "pending_gm":
        return "Menunggu GM";
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      case "draft":
        return "Draft";
      case "revisi":
        return "Revisi";
      default:
        return status;
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Gagal memuat data cuti.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Daftar Cuti</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {role === "EMPLOYEE" && (
        <Link
          to="/cuti/add"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Ajukan Cuti
        </Link>
      )}

      {!data || data.length === 0 ? (
        <p className="mt-4 text-gray-500">Belum ada data cuti.</p>
      ) : (
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Tipe</th>
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c: any) => (
              <tr key={c.id}>
                <td className="p-2 border">{c.type}</td>
                <td className="p-2 border">
                  {new Date(c.startDate).toLocaleDateString()} -{" "}
                  {new Date(c.endDate).toLocaleDateString()}
                </td>
                <td className="p-2 border capitalize">
                  {translateStatus(c.status)}
                </td>
                <td className="p-2 border flex gap-2">
                  <Link
                    to={`/cuti/${c.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Detail
                  </Link>

                  {role === "EMPLOYEE" &&
                    ["DRAFT", "REVISI"].includes(c.status.toUpperCase()) && (
                      <Link
                        to={`/cuti/edit/${c.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
