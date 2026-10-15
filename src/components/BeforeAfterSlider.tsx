import { useRef, useState, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { Transformation } from '@/data/locations';

interface BeforeAfterSliderProps {
  item: Transformation;
}

export default function BeforeAfterSlider({ item }: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden rounded-xl bg-slate-100"
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={(e) => dragging.current && update(e.touches[0].clientX)}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* After (base) */}
      <img src={item.afterImg} alt="After" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <span className="absolute bottom-3 right-3 rounded-full bg-sage-600/90 px-3 py-1 text-xs font-semibold text-white">After</span>

      {/* Before (clipped overlay) */}
      <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={item.beforeImg}
          alt="Before"
          className="absolute inset-0 h-full max-w-none object-cover"
          style={{ width: `${ref.current?.clientWidth ?? 1000}px` }}
          draggable={false}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">Before</span>
      </div>

      {/* Handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="h-full w-0.5 bg-white shadow-lg" />
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-sage-600 text-white shadow-xl">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
