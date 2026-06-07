import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Compass, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/careers", label: "Careers" },
  { to: "/assessment", label: "Assessment" },
  { to: "/compare", label: "Compare" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
      <div className="section flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-text">
          <span className="w-8 h-8 rounded-lg bg-primary text-white grid place-items-center">
            <Compass className="w-5 h-5" />
          </span>
          CareerCompass
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-primary bg-blue-50" : "text-text hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className="btn-ghost">Dashboard</Link>
              <Link to="/profile" className="btn-secondary !px-3 !py-2 text-sm">
                <UserIcon className="w-4 h-4" /> {user.name?.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} className="btn-ghost" aria-label="Log out">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Log in</Link>
              <Link to="/signup" className="btn-primary text-sm">Sign up</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg border border-border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="section py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? "text-primary bg-blue-50" : "text-text"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="h-px bg-border my-2" />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">Dashboard</Link>
                <Link to="/profile" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">Profile</Link>
                <button onClick={handleLogout} className="text-left px-3 py-2 text-sm text-red-600">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">Log in</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-semibold text-primary">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
