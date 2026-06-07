import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getSavedCareers } from "../utils/storage.js";
import careers from "../data/careers.json";
import CareerCard from "../components/CareerCard.jsx";
import { Bookmark, ArrowRight } from "lucide-react";

export default function SavedCareers() {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadSaved = async () => {
      try {
        const ids = await getSavedCareers(user.id);
        if (active) {
          setSavedIds(ids || []);
        }
      } catch (err) {
        console.error("Error loading saved careers:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    if (user) loadSaved();
    return () => { active = false; };
  }, [user]);

  if (loading) {
    return (
      <div className="section py-24 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted">Loading saved careers...</p>
      </div>
    );
  }

  const saved = careers.filter((c) => savedIds.includes(c.id));

  return (
    <div className="section py-12">
      <h1 className="text-3xl font-bold text-text flex items-center gap-2">
        <Bookmark className="w-7 h-7 text-primary" /> Saved Careers
      </h1>
      <p className="mt-2 text-muted">All the careers you've bookmarked for later.</p>

      {saved.length === 0 ? (
        <div className="mt-10 card text-center">
          <p className="text-muted">You haven't saved any careers yet.</p>
          <Link to="/careers" className="btn-primary mt-4 inline-flex">
            Browse Careers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((c) => <CareerCard key={c.id} career={c} />)}
        </div>
      )}
    </div>
  );
}
