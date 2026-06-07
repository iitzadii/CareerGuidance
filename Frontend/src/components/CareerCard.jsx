import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Bookmark, BookmarkCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { isCareerSaved, toggleSavedCareer } from "../utils/storage.js";
import { useState, useEffect } from "react";

export default function CareerCard({ career, matchPercent }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    let active = true;
    const checkSaved = async () => {
      const isSaved = await isCareerSaved(user.id, career.id);
      if (active) setSaved(isSaved);
    };
    if (user) checkSaved();
    return () => { active = false; };
  }, [user, career.id]);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || toggling) return;
    setToggling(true);
    try {
      const next = await toggleSavedCareer(user.id, career.id);
      setSaved(next.includes(career.id));
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(false);
    }
  };

  return (
    <Link
      to={`/careers/${career.id}`}
      className="card hover:border-primary hover:shadow-sm transition-all group block"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary grid place-items-center">
          <Briefcase className="w-5 h-5" />
        </div>
        {typeof matchPercent === "number" && (
          <span className="text-xs font-semibold text-primary bg-blue-50 px-2 py-1 rounded-full">
            {matchPercent}% match
          </span>
        )}
        {user && typeof matchPercent !== "number" && (
          <button onClick={handleSave} className="text-muted hover:text-primary" aria-label="Save">
            {saved ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5" />}
          </button>
        )}
      </div>
      <h3 className="mt-4 font-semibold text-text group-hover:text-primary">{career.title}</h3>
      <p className="mt-1 text-sm text-muted line-clamp-2">{career.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="chip">{career.category}</span>
        <span className="chip">{career.industry}</span>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
        <span className="text-muted">{career.salaryRange}</span>
        <span className="inline-flex items-center gap-1 text-primary font-medium">
          <TrendingUp className="w-4 h-4" /> {career.demand}
        </span>
      </div>
    </Link>
  );
}
