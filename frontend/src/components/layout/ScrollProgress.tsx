import { useScrollProgress } from '../../hooks/useScroll';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      id="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="ความคืบหน้าในการเลื่อนหน้า"
    />
  );
}
