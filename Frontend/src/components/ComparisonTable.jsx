import { Check, X } from "lucide-react";

export default function ComparisonTable({ a, b }) {
  const rows = [
    { label: "Category", get: (c) => c.category },
    { label: "Industry", get: (c) => c.industry },
    { label: "Salary Range", get: (c) => c.salaryRange },
    { label: "Demand", get: (c) => c.demand },
    { label: "Growth", get: (c) => c.growth },
    { label: "Future Scope", get: (c) => c.scope },
    { label: "Education", get: (c) => (c.educationalPath || []).join(" → ") },
    { label: "Key Skills", get: (c) => (c.skills || []).join(", ") },
    { label: "Top Qualifications", get: (c) => (c.qualifications || []).join(", ") },
  ];

  return (
    <div className="overflow-x-auto border border-border rounded-xl">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="text-left p-4 font-semibold text-text w-1/4">Criteria</th>
            <th className="text-left p-4 font-semibold text-text">{a.title}</th>
            <th className="text-left p-4 font-semibold text-text">{b.title}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-border align-top">
              <td className="p-4 text-muted font-medium">{r.label}</td>
              <td className="p-4 text-text">{r.get(a) || "—"}</td>
              <td className="p-4 text-text">{r.get(b) || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
