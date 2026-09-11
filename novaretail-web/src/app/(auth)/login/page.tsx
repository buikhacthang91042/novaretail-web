"use client";
import { useAuth } from "@/src/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    if (!username.trim()) {
      setIsSubmitting(false);
      setError("Username is required");
      return;
    }
    if (!password) {
      setIsSubmitting(false);
      setError("Password is required");
      return;
    }
    try {
      await login(username, password);
      router.replace("/");
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="username">User Name</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-200"
          placeholder="Input username..."
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-200"
          placeholder="Input password..."
        />
      </div>
      <button
        className="border border-green-200"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Log in
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
