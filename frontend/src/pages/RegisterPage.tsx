// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { registerUser, loginWithGoogle, loginWithGitHub } from "../api/skillsync";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await registerUser(email, password);
    setLoading(false);
    if (res.success) {
      // Optionally auto-login or redirect to login
      navigate("/login");
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary-950 via-secondary-950 to-black">
      <form onSubmit={handleRegister} className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        {error && <div className="mb-4 text-red-400">{error}</div>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-black/40 border border-primary-900/40 text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-black/40 border border-primary-900/40 text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg transition"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="flex flex-col gap-3 mt-6">
          <button
            type="button"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg flex items-center justify-center gap-2"
            onClick={loginWithGoogle}
          >
            {/* Google SVG */}
            Sign up with Google
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 shadow-lg flex items-center justify-center gap-2"
            onClick={loginWithGitHub}
          >
            {/* GitHub SVG */}
            Sign up with GitHub
          </button>
        </div>
        <div className="mt-4 text-center text-neutral-400">
          Already have an account? <a href="/login" className="text-accent-400 underline">Sign in</a>
        </div>
      </form>
    </div>
  );
}