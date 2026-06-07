export default function AssessmentProgress({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm text-muted mb-2">
        <span>Step {current + 1} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
