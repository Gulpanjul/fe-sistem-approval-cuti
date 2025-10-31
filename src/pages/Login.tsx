import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  role: string;
  name: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role.toUpperCase());

      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as any).response?.data?.error
      ) {
        setError((err as any).response.data.error);
      } else {
        setError("Login gagal");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full mb-2 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full mb-4 p-2 rounded"
        />

        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
