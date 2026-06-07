import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  ClipboardList, Compass, GitCompare, Bookmark, Sparkles, ArrowRight, Activity
} from "lucide-react";
import careers from "../data/careers.json";
import { apiFetch } from "../utils/api.js";
import CareerCard from "../components/CareerCard.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    latest: null,
    savedIds: [],
    activity: [],
    recs: [],
    loading: true
  });

  useEffect(() => {
    let active = true;
    const loadDashboard = async () => {
      try {
        const res = await apiFetch("/api/dashboard");
        if (active) {
          setData({
            latest: res.latest,
            savedIds: res.savedIds || [],
            activity: res.activity || [],
            recs: res.recs || [],
            loading: false
          });
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        if (active) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    };
    if (user) loadDashboard();
    return () => { active = false; };
  }, [user]);

  if (data.loading) {
    return (
      <div className="section py-24 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted">Loading your dashboard...</p>
      </div>
    );
  }

  const { latest, savedIds, activity, recs } = data;

  const tiles = [
    { to: "/assessment", icon: ClipboardList, title: "Start Assessment", text: "Take or retake the quiz to refine your matches." },
    { to: "/careers", icon: Compass, title: "Explore Careers", text: "Browse the full catalog of career paths." },
    { to: "/compare", icon: GitCompare, title: "Compare Careers", text: "Weigh two careers side by side." },
    { to: "/saved", icon: Bookmark, title: "Saved Careers", text: `${savedIds.length} career${savedIds.length === 1 ? "" : "s"} bookmarked.` },
  ];

  return (
    <div className="section py-12">
      <div className="card bg-gradient-to-r from-primary to-primary-dark text-white border-0">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-xs bg-white/15 px-2 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> Welcome
            </span>
            <h1 className="mt-3 text-2xl md:text-3xl font-bold">Hi {user.name?.split(" ")[0]}, ready to explore?</h1>
            <p className="mt-1 text-white/90 max-w-xl">
              {latest
                ? "Here's a quick look at your dashboard and your top career matches."
                : "Start with a 2-minute assessment to unlock personalized recommendations."}
            </p>
          </div>
          <Link
            to={latest ? "/recommendations" : "/assessment"}
            className="bg-white text-primary font-semibold px-4 py-2.5 rounded-lg inline-flex items-center gap-2"
          >
            {latest ? "View Recommendations" : "Start Assessment"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map(({ icon: Icon, to, title, text }) => (
          <Link key={title} to={to} className="card hover:border-primary transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary grid place-items-center">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="mt-4 font-semibold text-text">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-text">Recommended for you</h2>
            {latest && <Link to="/recommendations" className="text-sm text-primary font-medium">View all</Link>}
          </div>
          {recs.length === 0 ? (
            <div className="card text-center">
              <p className="text-muted">Take the assessment to see personalized recommendations.</p>
              <Link to="/assessment" className="btn-primary mt-4 inline-flex">Start now <ArrowRight className="w-4 h-4" /></Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {recs.map((r) => (
                <CareerCard key={r.career.id} career={r.career} matchPercent={r.matchPercent} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Recent activity
          </h2>
          <div className="card">
            {activity.length === 0 ? (
              <p className="text-sm text-muted">Your recent activity will appear here.</p>
            ) : (
              <ul className="divide-y divide-border">
                {activity.slice(0, 6).map((a, i) => (
                  <li key={i} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-sm text-text">{a.message}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {new Date(a.at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
