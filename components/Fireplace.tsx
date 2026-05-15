export function Fireplace() {
  return (
    <aside className="rounded-lg border border-border bg-card/95 p-3 shadow-soft">
      <div className="h-full rounded-lg border border-[#6f4a2f]/30 bg-[#2c1d16] p-3 shadow-inner">
        <div className="relative h-full min-h-48 overflow-hidden rounded-sm border border-[#7b5234]/50 bg-gradient-to-b from-[#21150f] via-[#3a2117] to-[#120d0a]">
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#120c08] to-transparent" />
          <div className="absolute inset-x-8 bottom-8 h-10 rounded-full bg-[#140c08] blur-md" />

          <div className="fireplace-glow" aria-hidden="true" />

          <div className="absolute bottom-14 left-1/2 h-24 w-20 -translate-x-1/2">
            <span className="fireplace-flame fireplace-flame-back" />
            <span className="fireplace-flame fireplace-flame-mid" />
            <span className="fireplace-flame fireplace-flame-front" />
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-end gap-1">
            <span className="h-5 w-28 rotate-6 rounded-full bg-[#5b301d] shadow-[inset_0_2px_0_rgb(122_75_45)]" />
            <span className="absolute h-5 w-28 -rotate-6 rounded-full bg-[#3d2418] shadow-[inset_0_2px_0_rgb(106_63_38)]" />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-8 bg-[#100b08]" />
          <div className="absolute inset-x-5 top-5 h-2 rounded-full bg-white/10" />
        </div>
      </div>
    </aside>
  );
}
