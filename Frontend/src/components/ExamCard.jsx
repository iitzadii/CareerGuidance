import { FileText, ExternalLink } from "lucide-react";

export default function ExamCard({ exam }) {
  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary grid place-items-center">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-text">{exam.name}</h3>
          <p className="text-sm text-muted">{exam.fullName}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-muted text-xs uppercase tracking-wide">Eligibility</dt>
          <dd className="text-text mt-0.5">{exam.eligibility}</dd>
        </div>
        <div>
          <dt className="text-muted text-xs uppercase tracking-wide">Exam Pattern</dt>
          <dd className="text-text mt-0.5">{exam.pattern}</dd>
        </div>
        <div>
          <dt className="text-muted text-xs uppercase tracking-wide">Syllabus</dt>
          <dd className="text-text mt-0.5">{exam.syllabus}</dd>
        </div>
      </dl>
      <a
        href={exam.website}
        target="_blank"
        rel="noreferrer"
        className="btn-secondary text-sm mt-4 w-full"
      >
        Official Website <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
