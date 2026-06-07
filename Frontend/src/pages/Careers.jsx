import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import careers from "../data/careers.json";
import CareerCard from "../components/CareerCard.jsx";

const unique = (arr) => [...new Set(arr)];

export default function Careers() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [qualification, setQualification] = useState("All");
  const [industry, setIndustry] = useState("All");

  const categories = useMemo(() => ["All", ...unique(careers.map((c) => c.category))], []);
  const qualifications = useMemo(() => ["All", ...unique(careers.flatMap((c) => c.qualifications))], []);
  const industries = useMemo(() => ["All", ...unique(careers.map((c) => c.industry))], []);

  const filtered = careers.filter((c) => {
    if (q && !`${c.title} ${c.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (category !== "All" && c.category !== category) return false;
    if (industry !== "All" && c.industry !== industry) return false;
    if (qualification !== "All" && !c.qualifications.includes(qualification)) return false;
    return true;
  });

  return (
    <div className="section py-12">
      <h1 className="text-3xl font-bold text-text">Explore Careers</h1>
      <p className="mt-2 text-muted">Search and filter through career paths to find what suits you.</p>

      <div className="mt-8 card">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search careers…"
              className="input pl-9"
            />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="input">
            {industries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="mt-3 grid md:grid-cols-4 gap-3">
          <select value={qualification} onChange={(e) => setQualification(e.target.value)} className="input md:col-span-2">
            {qualifications.map((c) => <option key={c}>{c === "All" ? "All qualifications" : c}</option>)}
          </select>
          <div className="md:col-span-2 text-sm text-muted self-center">
            Showing {filtered.length} of {careers.length} careers
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">No careers match your filters.</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => <CareerCard key={c.id} career={c} />)}
        </div>
      )}
    </div>
  );
}
