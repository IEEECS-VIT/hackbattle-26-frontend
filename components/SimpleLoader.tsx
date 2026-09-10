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
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
