import styles from "./SimpleLoader.module.css";

export default function SimpleLoader({
  label = "Loading…",
  fullScreen = false,
}: {
  label?: string;
  fullScreen?: boolean;
}) {
  return (
    <div
      className={fullScreen ? styles.screen : styles.inline}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={styles.loader}>
        <span className={styles.ball} aria-hidden="true">
          <span />
        </span>
        <span className={styles.visuallyHidden}>{label}</span>
      </div>
    </div>
  );
}
