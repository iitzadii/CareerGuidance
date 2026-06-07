import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getAssessmentHistory, getSavedCareers } from "../utils/storage.js";
import careers from "../data/careers.json";
import { User, Mail, Save, Check } from "lucide-react";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user.name);
  const [savedMsg, setSavedMsg] = useState(false);
  const [data, setData] = useState({
    history: [],
    savedIds: [],
    loading: true
  });

  useEffect(() => {
    let active = true;
    const loadProfileData = async () => {
      try {
        const [historyRes, savedIdsRes] = await Promise.all([
          getAssessmentHistory(user.id),
          getSavedCareers(user.id)
        ]);
        if (active) {
          setData({
            history: historyRes || [],
            savedIds: savedIdsRes || [],
            loading: false
          });
        }
      } catch (err) {
        console.error("Error loading profile data:", err);
        if (active) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    };
    if (user) loadProfileData();
    return () => { active = false; };
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({ name });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (data.loading) {
    return (
      <div className="section py-24 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted">Loading your profile info...</p>
      </div>
    );
  }

  const { history, savedIds } = data;
  const savedCareers = careers.filter((c) => savedIds.includes(c.id));

  return (
    <div className="section py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-text">Your Profile</h1>
      <p className="mt-2 text-muted">Manage your account and review your activity.</p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <form onSubmit={handleSave} className="md:col-span-2 card">
          <h2 className="font-semibold text-text">Account information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="label" htmlFor="name">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="input pl-9" />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input disabled value={user.email} className="input pl-9 bg-surface" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4" /> Save changes
            </button>
            {savedMsg && (
              <span className="text-sm text-green-600 inline-flex items-center gap-1">
                <Check className="w-4 h-4" /> Saved
              </span>
            )}
          </div>
        </form>

        <div className="card">
          <h2 className="font-semibold text-text">Quick stats</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Assessments taken</dt>
              <dd className="font-semibold text-text">{history.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Saved careers</dt>
              <dd className="font-semibold text-text">{savedCareers.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Member since</dt>
              <dd className="font-semibold text-text">
                {new Date(user.createdAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-text">Assessment history</h2>
          {history.length === 0 ? (
            <p className="text-sm text-muted mt-3">You haven't taken any assessments yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {history.map((h) => (
                <li key={h.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-medium text-text">
                    {new Date(h.date).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Qualification: {h.answers.qualification || "—"} · Stream: {h.answers.stream || "—"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold text-text">Saved careers</h2>
          {savedCareers.length === 0 ? (
            <p className="text-sm text-muted mt-3">No saved careers yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {savedCareers.map((c) => (
                <li key={c.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                  <Link to={`/careers/${c.id}`} className="text-sm font-medium text-text hover:text-primary">
                    {c.title}
                  </Link>
                  <span className="chip">{c.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
