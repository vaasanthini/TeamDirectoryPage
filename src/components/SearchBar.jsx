import { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";

const STORAGE_KEY = "team-dir-recent-searches";
const MAX_RECENT = 3;

function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function persistRecent(term, current) {
  const deduped = current.filter((s) => s !== term);
  const updated = [term, ...deduped].slice(0, MAX_RECENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export default function SearchBar({ value, onChange }) {
  const [recentSearches, setRecentSearches] = useState(loadRecent);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.trim()) {
      const updated = persistRecent(value.trim(), recentSearches);
      setRecentSearches(updated);
      setShowDropdown(false);
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  function handleSelect(term) {
    onChange(term);
    setShowDropdown(false);
  }

  const visibleRecent = recentSearches
    .filter((s) => s !== value.trim())
    .slice(0, MAX_RECENT);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.input}
        type="text"
        placeholder="Search by name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange("")}>
          ✕
        </button>
      )}
      {showDropdown && visibleRecent.length > 0 && (
        <ul className={styles.dropdown}>
          {visibleRecent.map((term) => (
            <li
              key={term}
              className={styles.dropdownItem}
              onMouseDown={() => handleSelect(term)}
            >
              <span className={styles.recentIcon}>🕐</span>
              {term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
