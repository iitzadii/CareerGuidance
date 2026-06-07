import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Award, ExternalLink } from "lucide-react";

export default function CollegeCard({ college }) {
  return (
    <div className="card hover:border-primary transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary grid place-items-center">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <Link to={`/college/${college.id}`} className="font-semibold text-text hover:text-primary">
            {college.name}
          </Link>
          <p className="text-sm text-muted inline-flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5" /> {college.location}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-muted text-xs">Annual fees</div>
          <div className="font-medium text-text">{college.fees}</div>
        </div>
        <div>
          <div className="text-muted text-xs">Ranking</div>
          <div className="font-medium text-text inline-flex items-center gap-1">
            <Award className="w-4 h-4 text-primary" /> #{college.ranking}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link to={`/college/${college.id}`} className="btn-secondary text-sm flex-1">Details</Link>
        <a href={college.website} target="_blank" rel="noreferrer" className="btn-primary text-sm">
          Visit <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
