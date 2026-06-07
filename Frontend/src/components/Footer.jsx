import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="section py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-text">
            <span className="w-8 h-8 rounded-lg bg-primary text-white grid place-items-center">
              <Compass className="w-5 h-5" />
            </span>
            CareerCompass
          </div>
          <p className="mt-3 text-sm text-muted max-w-xs">
            A guidance platform helping students discover the right career path with clarity.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
            <li><Link to="/assessment" className="hover:text-primary">Assessment</Link></li>
            <li><Link to="/compare" className="hover:text-primary">Compare Careers</Link></li>
            <li><Link to="/saved" className="hover:text-primary">Saved</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text mb-3">Account</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/login" className="hover:text-primary">Log in</Link></li>
            <li><Link to="/signup" className="hover:text-primary">Sign up</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/profile" className="hover:text-primary">Profile</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text mb-3">About</h4>
          <p className="text-sm text-muted">
            Built for students and counselors to make confident, informed career decisions.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="section py-4 text-xs text-muted flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} CareerCompass. All rights reserved.</span>
          <span>Made for learners.</span>
        </div>
      </div>
    </footer>
  );
}
