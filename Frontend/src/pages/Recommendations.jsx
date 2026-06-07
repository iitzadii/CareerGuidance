import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getLatestAssessment } from "../utils/storage.js";
import CareerCard from "../components/CareerCard.jsx";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Recommendations() {
  const { user } = useAuth();
  const [data, setData] = useState({
    latest: null,
    recs: [],
    loading: true
  });

  useEffect(() => {
    let active = true;
    const loadRecommendations = async () => {
      try {
        const res = await getLatestAssessment(user.id);
        if (active) {
          if (res) {
            setData({
              latest: res.assessment,
              recs: res.recommendations || [],
              loading: false
            });
          } else {
            setData({
              latest: null,
              recs: [],
              loading: false
            });
          }
        }
      } catch (err) {
        console.error("Error loading recommendations:", err);
        if (active) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    };
    if (user) loadRecommendations();
    return () => { active = false; };
  }, [user]);

  if (data.loading) {
    return (
      <div className="section py-24 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted">Analyzing your answers and loading recommendations...</p>
      </div>
    );
  }

  const { latest, recs } = data;

  if (!latest) {
    return (
      <div className="section py-16 text-center">
        <h1 className="text-2xl font-bold text-text">No assessment yet</h1>
        <p className="text-muted mt-2">Take the assessment to unlock personalized career recommendations.</p>
        <Link to="/assessment" className="btn-primary mt-6 inline-flex">
          Start Assessment <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="section py-12">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <span className="chip"><Sparkles className="w-3.5 h-3.5 mr-1" /> Personalized</span>
          <h1 className="mt-3 text-3xl font-bold text-text">Your career matches</h1>
          <p className="mt-2 text-muted">Based on your most recent assessment.</p>
        </div>
        <Link to="/assessment" className="btn-secondary">Retake assessment</Link>
      </div>

      {recs.length === 0 ? (
        <div className="card mt-8 text-center">
          <p className="text-muted">No strong matches found. Try retaking the assessment with broader selections.</p>
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recs.map((r) => (
            <CareerCard key={r.career.id} career={r.career} matchPercent={r.matchPercent} />
          ))}
        </div>
      )}
    </div>
  );
}
