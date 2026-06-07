import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, GraduationCap, MapPin, Award } from "lucide-react";
import colleges from "../data/colleges.json";

export default function CollegeDetails() {
  const { id } = useParams();
  const college = colleges.find((c) => c.id === id);
  if (!college) return <Navigate to="/" replace />;

  const sections = [
    { title: "Description", text: college.description },
    { title: "Courses Offered", text: college.courses.join(" • ") },
    { title: "Admission Process", text: college.admission },
    { title: "Fee Structure", text: college.feeStructure },
    { title: "Placements", text: college.placements },
    { title: "Scholarships", text: college.scholarships },
    { title: "Hostel Information", text: college.hostel },
  ];

  return (
    <div className="section py-12">
      <Link to="/careers" className="text-sm text-muted inline-flex items-center gap-1 hover:text-primary">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="mt-6 card">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary grid place-items-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text">{college.name}</h1>
                <p className="text-muted inline-flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" /> {college.location}
                </p>
              </div>
            </div>
          </div>
          <a href={college.website} target="_blank" rel="noreferrer" className="btn-primary">
            Official Website <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="text-xs text-muted">Annual Fees</div>
            <div className="font-semibold text-text mt-1">{college.fees}</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="text-xs text-muted">Ranking</div>
            <div className="font-semibold text-text mt-1 flex items-center gap-1">
              <Award className="w-4 h-4 text-primary" /> #{college.ranking}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <div key={s.title} className="card">
            <h3 className="font-semibold text-text">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
