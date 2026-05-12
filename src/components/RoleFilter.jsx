import styles from "./RoleFilter.module.css";

export default function RoleFilter({ roles, selected, onChange }) {
  return (
    <div className={styles.wrapper}>
      {["All", ...roles].map((role) => (
        <button
          key={role}
          className={`${styles.btn} ${selected === role ? styles.active : ""}`}
          onClick={() => onChange(role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
}
