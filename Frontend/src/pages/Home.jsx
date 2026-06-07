import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Target, BookOpen, BarChart3, Users, ShieldCheck,
  ChevronDown, GraduationCap, Compass
} from "lucide-react";
import { useState } from "react";

const features = [
  { icon: Target, title: "Personalized Assessment", text: "Answer questions about your interests, skills and personality to discover careers built for you." },
  { icon: BookOpen, title: "Detailed Career Paths", text: "Explore education routes, required skills, salaries and growth potential for each career." },
  { icon: BarChart3, title: "Compare Side-by-Side", text: "Compare two careers across salary, demand, future scope, and education needed." },
  { icon: GraduationCap, title: "Colleges & Exams", text: "Find top colleges, entrance exams, syllabus and eligibility for every career." },
  { icon: Users, title: "Save Your Favorites", text: "Bookmark careers and revisit them anytime from your personal dashboard." },
  { icon: ShieldCheck, title: "Private & Local", text: "Your data stays on your device. No tracking, no third parties." },
];

const steps = [
  { n: "01", title: "Create a free account", text: "Sign up in seconds — your data is stored privately on your device." },
  { n: "02", title: "Take the assessment", text: "A short quiz covering your qualification, interests, skills and personality." },
  { n: "03", title: "Get personalized matches", text: "See your top career matches with match scores and reasons." },
  { n: "04", title: "Explore in depth", text: "Read about salaries, colleges, exams and growth — then save or compare." },
];

const faqs = [
  { q: "Is CareerCompass free to use?", a: "Yes, all features are completely free. There are no hidden charges or subscriptions." },
  { q: "Do I need an account?", a: "An account is required for the assessment, saved careers and dashboard. Browsing careers is open to everyone." },
  { q: "Is my data shared anywhere?", a: "No. All your data is stored locally in your browser using local storage — nothing is sent to any server." },
  { q: "How accurate are the recommendations?", a: "Our engine weighs qualification, interests, skills and personality. The more honestly you answer, the better the matches." },
  { q: "Can I retake the assessment?", a: "Yes, you can retake it as many times as you want. All your past attempts are saved in your profile." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      {/* Hero */}
      <section className="bg-surface border-b border-border">
        <div className="section py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="chip mb-4"><Sparkles className="w-3.5 h-3.5 mr-1" /> Career Guidance Platform</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
              Find Careers That Match Your Interests and Skills
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl">
              Take a short assessment and discover personalized career paths, top colleges, entrance exams and salary insights — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/assessment" className="btn-primary">
                Start Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/careers" className="btn-secondary">Explore Careers</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-muted">
              <div><span className="block text-2xl font-bold text-text">10+</span> Career paths</div>
              <div><span className="block text-2xl font-bold text-text">12+</span> Top colleges</div>
              <div><span className="block text-2xl font-bold text-text">12+</span> Entrance exams</div>
            </div>
          </div>
          <div className="relative">
            <div className="card shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-primary" />
                <span className="font-semibold">Your top matches</span>
              </div>
              {[
                { t: "Software Engineer", m: 94 },
                { t: "Data Scientist", m: 88 },
                { t: "UX Designer", m: 81 },
              ].map((m) => (
                <div key={m.t} className="py-3 border-t border-border first:border-t-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{m.t}</span>
                    <span className="text-primary font-semibold">{m.m}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${m.m}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="section">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text">Everything you need to choose with confidence</h2>
            <p className="mt-3 text-muted">Tools and information designed for students and professionals exploring what's next.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary grid place-items-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-text">{title}</h3>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <div className="section">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text">How it works</h2>
            <p className="mt-3 text-muted">Four simple steps to clarity about your future.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="card">
                <div className="text-primary font-bold">{s.n}</div>
                <h3 className="mt-3 font-semibold text-text">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="section grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text">Frequently asked questions</h2>
            <p className="mt-3 text-muted">Everything you might want to know before starting.</p>
            <div className="mt-6">
              <Link to="/signup" className="btn-primary">Create free account <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <button
                key={f.q}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full text-left card hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-semibold text-text">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </div>
                {openFaq === i && <p className="mt-3 text-sm text-muted">{f.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
