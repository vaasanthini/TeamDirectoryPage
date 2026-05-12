import styles from "./TeamCard.module.css";

const roleColors = {
  Engineer: "#dbeafe",
  Designer: "#fce7f3",
  Manager: "#d1fae5",
  Marketing: "#fef3c7",
  QA: "#ede9fe",
};

const roleText = {
  Engineer: "#1d4ed8",
  Designer: "#be185d",
  Manager: "#065f46",
  Marketing: "#92400e",
  QA: "#5b21b6",
};

export default function TeamCard({ member, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(member)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(member)}>
      <div className={styles.avatarWrap}>
        <div className={styles.avatarRing} />
        <img className={styles.avatar} src={member.avatar} alt={member.name} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{member.name}</h3>
        <span
          className={styles.role}
          style={{
            background: roleColors[member.role] ?? "#f3f4f6",
            color: roleText[member.role] ?? "#374151",
          }}
        >
          {member.role}
        </span>
        <p className={styles.dept}>{member.department}</p>
      </div>
    </div>
  );
}
