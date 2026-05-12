import TeamCard from "./TeamCard";
import styles from "./TeamGrid.module.css";

export default function TeamGrid({ members, onSelect }) {
  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🔍</span>
        <p className={styles.emptyText}>No members found</p>
        <p className={styles.emptyHint}>Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <TeamCard key={member.id} member={member} onClick={onSelect} />
      ))}
    </div>
  );
}
