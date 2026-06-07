import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import careers from "../data/careers.json";
import colleges from "../data/colleges.json";
import exams from "../data/exams.json";
import {
  Bookmark, BookmarkCheck, TrendingUp, Briefcase, GraduationCap,
  ArrowLeft, Wallet, Sparkles
} from "lucide-react";
import CollegeCard from "../components/CollegeCard.jsx";
import ExamCard from "../components/ExamCard.jsx";
import CareerCard from "../components/CareerCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { isCareerSaved, logActivity, toggleSavedCareer } from "../utils/storage.js";

export default function CareerDetails() {
  const { id } = useParams();
  const career = careers.find((c) => c.id === id);
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    let active = true;
    const checkSaved = async () => {
      const isSaved = await isCareerSaved(user.id, career.id);
      if (active) setSaved(isSaved);
    };
    if (user && career) checkSaved();
    return () => { active = false; };
  }, [user, career]);

  if (!career) return <Navigate to="/careers" replace />;

  const relatedColleges = colleges.filter((c) => career.collegeIds?.includes(c.id));
  const relatedExams = exams.filter((e) => career.examIds?.includes(e.id));
  const related = careers.filter((c) => career.relatedCareerIds?.includes(c.id));

  const handleSave = async () => {
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
    <div className="section py-12">
      <Link to="/careers" className="text-sm text-muted inline-flex items-center gap-1 hover:text-primary">
        <ArrowLeft className="w-4 h-4" /> Back to careers
      </Link>

      <div className="mt-6 card">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary grid place-items-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text">{career.title}</h1>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="chip">{career.category}</span>
                  <span className="chip">{career.industry}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-muted max-w-2xl">{career.description}</p>
          </div>
          {user && (
            <button onClick={handleSave} className={saved ? "btn-primary" : "btn-secondary"}>
              {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              {saved ? "Saved" : "Save Career"}
            </button>
          )}
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="text-xs text-muted">Salary range</div>
            <div className="font-semibold text-text mt-1 flex items-center gap-1">
              <Wallet className="w-4 h-4 text-primary" /> {career.salaryRange}
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="text-xs text-muted">Demand</div>
            <div className="font-semibold text-text mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-primary" /> {career.demand}
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="text-xs text-muted">Growth</div>
            <div className="font-semibold text-text mt-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-primary" /> {career.growth}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <Section title="Future Scope">
          <p className="text-muted">{career.scope}</p>
        </Section>
        <Section title="Required Skills">
          <ul className="flex flex-wrap gap-1.5">
            {career.skills.map((s) => <span key={s} className="chip">{s}</span>)}
          </ul>
        </Section>
        <Section title="Growth Opportunities">
          <p className="text-muted">{career.growthOpportunities}</p>
        </Section>
      </div>

      <div className="mt-8 card">
        <h2 className="text-xl font-bold text-text flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" /> Educational Path
        </h2>
        <ol className="mt-4 space-y-3">
          {career.educationalPath.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-white text-xs grid place-items-center font-semibold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-text">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {relatedColleges.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-text">Top Colleges</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedColleges.map((c) => <CollegeCard key={c.id} college={c} />)}
          </div>
        </div>
      )}

      {relatedExams.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-text">Entrance Exams</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedExams.map((e) => <ExamCard key={e.id} exam={e} />)}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-text">Related Careers</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((c) => <CareerCard key={c.id} career={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="card">
      <h3 className="font-semibold text-text">{title}</h3>
      <div className="mt-3 text-sm">{children}</div>
    </div>
  );
}
