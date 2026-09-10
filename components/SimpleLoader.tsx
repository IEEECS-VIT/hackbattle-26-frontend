import styles from "./SimpleLoader.module.css";

export default function SimpleLoader({
  label = "Loading…",
  fullScreen = false,
}: {
  label?: string;
  fullScreen?: boolean;
}) {
  return (
    <div className={fullScreen ? styles.screen : styles.inline} role="status" aria-live="polite">
      <div className={styles.panel}>
        <span className={styles.spinner} aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  );
}
