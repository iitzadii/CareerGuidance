import { useState } from "react";
import careers from "../data/careers.json";
import ComparisonTable from "../components/ComparisonTable.jsx";
import { GitCompare } from "lucide-react";

export default function CompareCareers() {
  const [aId, setAId] = useState(careers[0].id);
  const [bId, setBId] = useState(careers[1].id);
  const a = careers.find((c) => c.id === aId);
  const b = careers.find((c) => c.id === bId);

  return (
    <div className="section py-12">
      <h1 className="text-3xl font-bold text-text flex items-center gap-2">
        <GitCompare className="w-7 h-7 text-primary" /> Compare Careers
      </h1>
      <p className="mt-2 text-muted">Select two careers to compare them side by side.</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Career A</label>
          <select value={aId} onChange={(e) => setAId(e.target.value)} className="input">
            {careers.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Career B</label>
          <select value={bId} onChange={(e) => setBId(e.target.value)} className="input">
            {careers.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
      </div>

      {a.id === b.id ? (
        <p className="mt-8 text-muted text-center">Select two different careers to compare.</p>
      ) : (
        <div className="mt-8">
          <ComparisonTable a={a} b={b} />
        </div>
      )}
    </div>
  );
}
