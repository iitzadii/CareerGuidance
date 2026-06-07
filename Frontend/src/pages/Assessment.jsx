import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import AssessmentProgress from "../components/AssessmentProgress.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { logActivity, saveAssessment } from "../utils/storage.js";

const steps = [
  {
    key: "qualification",
    type: "single",
    title: "What is your current qualification?",
    options: ["Class 10", "Class 12", "Diploma", "Bachelors", "Masters"],
  },
  {
    key: "stream",
    type: "single",
    title: "Which stream are you in (or interested in)?",
    options: ["Science", "Commerce", "Arts"],
  },
  {
    key: "skills",
    type: "multi",
    title: "Which skills do you enjoy or excel at?",
    options: [
      "Programming", "Math", "Writing", "Communication", "Design", "Drawing",
      "Problem Solving", "Research", "Leadership", "Analytical Thinking",
      "Public Speaking", "Empathy", "Accounting", "Statistics"
    ],
  },
  {
    key: "interests",
    type: "multi",
    title: "What topics genuinely interest you?",
    options: [
      "Technology", "Healthcare", "Business", "Law", "Design", "Art", "Math",
      "Science", "Teaching", "Marketing", "Finance", "Helping People",
      "Building Things", "Research", "Social Media", "Data", "Engineering",
      "Politics", "Debate"
    ],
  },
  {
    key: "personality",
    type: "multi",
    title: "Which traits describe you best?",
    options: [
      "Analytical", "Creative", "Empathetic", "Detail-oriented", "Curious",
      "Practical", "Articulate", "Patient", "Disciplined", "Confident"
    ],
  },
];

export default function Assessment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    qualification: "", stream: "", skills: [], interests: [], personality: []
  });

  const current = steps[step];
  const canNext = useMemo(() => {
    const val = answers[current.key];
    return current.type === "single" ? !!val : val.length > 0;
  }, [answers, current]);

  const selectSingle = (option) => setAnswers({ ...answers, [current.key]: option });

  const toggleMulti = (option) => {
    const list = answers[current.key];
    const next = list.includes(option) ? list.filter((x) => x !== option) : [...list, option];
    setAnswers({ ...answers, [current.key]: next });
  };

  const [saving, setSaving] = useState(false);

  const handleNext = async () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setSaving(true);
      try {
        await saveAssessment(user.id, { answers });
        navigate("/recommendations");
      } catch (err) {
        console.error("Failed to submit assessment:", err);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="section py-12 max-w-2xl">
      <AssessmentProgress current={step} total={steps.length} />
      <div className="mt-8 card">
        <h2 className="text-2xl font-bold text-text">{current.title}</h2>
        <p className="text-sm text-muted mt-1">
          {current.type === "single" ? "Select one option." : "Select all that apply."}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {current.options.map((opt) => {
            const selected = current.type === "single"
              ? answers[current.key] === opt
              : answers[current.key].includes(opt);
            return (
              <button
                key={opt}
                type="button"
                disabled={saving}
                onClick={() => current.type === "single" ? selectSingle(opt) : toggleMulti(opt)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selected
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-text border-border hover:border-primary"
                }`}
              >
                {selected && <Check className="inline w-4 h-4 mr-1 -ml-1" />}
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0 || saving}
          className="btn-secondary disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={handleNext} disabled={!canNext || saving} className="btn-primary disabled:opacity-40">
          {saving ? "Evaluating..." : step === steps.length - 1 ? "See Recommendations" : "Next"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
