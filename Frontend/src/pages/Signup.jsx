import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section py-16 max-w-md">
      <h1 className="text-3xl font-bold text-text">Create your account</h1>
      <p className="mt-2 text-muted">Start exploring careers in less than a minute.</p>

      <form onSubmit={onSubmit} className="mt-8 card space-y-4">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input id="name" name="name" required value={form.name} onChange={onChange} className="input" placeholder="Ananya Sharma" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={onChange} className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required value={form.password} onChange={onChange} className="input" placeholder="At least 6 characters" />
        </div>
        <div>
          <label className="label" htmlFor="confirm">Confirm password</label>
          <input id="confirm" name="confirm" type="password" required value={form.confirm} onChange={onChange} className="input" placeholder="Repeat your password" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium">Log in</Link>
      </p>
    </div>
  );
}
