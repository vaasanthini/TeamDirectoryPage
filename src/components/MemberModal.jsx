import { useEffect } from "react";
import styles from "./MemberModal.module.css";

export default function MemberModal({ member, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.banner}>
          <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className={styles.avatarWrap}>
          <div className={styles.avatarRing} />
          <img className={styles.avatar} src={member.avatar} alt={member.name} />
        </div>

        <div className={styles.body}>
          <h2 className={styles.name}>{member.name}</h2>
          <span className={styles.roleBadge}>{member.role}</span>
          <p className={styles.dept}>{member.department} Department</p>

          <div className={styles.divider} />

          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Email</span>
              <a className={styles.value} href={`mailto:${member.email}`}>{member.email}</a>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Phone</span>
              <span className={styles.value}>{member.phone}</span>
            </div>
          </div>

          <p className={styles.bio}>{member.bio}</p>
        </div>
      </div>
    </div>
  );
}
