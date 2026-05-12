import { useState, useMemo, useEffect } from "react";
import teamData from "./data/teamData";
import SearchBar from "./components/SearchBar";
import RoleFilter from "./components/RoleFilter";
import TeamGrid from "./components/TeamGrid";
import MemberModal from "./components/MemberModal";
import "./App.css";

const allRoles = [...new Set(teamData.map((m) => m.role))].sort();

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    root.setAttribute("data-theme", theme);
    const timer = setTimeout(() => root.classList.remove("theme-transitioning"), 400);
    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const filteredMembers = useMemo(() => {
    return teamData
      .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((m) => selectedRole === "All" || m.role === selectedRole);
  }, [searchTerm, selectedRole]);

  return (
    <div className="app">
      <header className="header">
        <div className="headerInner">
          <div>
            <h1 className="title">Team Directory</h1>
            <p className="subtitle">{teamData.length} members across 6 roles</p>
          </div>
          <button
            className="themeToggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="controls">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <RoleFilter
            roles={allRoles}
            selected={selectedRole}
            onChange={setSelectedRole}
          />
        </div>

        <div className="results-info">
          {filteredMembers.length} result{filteredMembers.length !== 1 ? "s" : ""}
        </div>

        <TeamGrid members={filteredMembers} onSelect={setSelectedMember} />
      </main>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
