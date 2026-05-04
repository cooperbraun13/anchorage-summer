const pins = [
  { label: "Flattop", top: "24%", left: "54%" },
  { label: "Coastal Trail", top: "44%", left: "32%" },
  { label: "Coffee", top: "58%", left: "64%" },
  { label: "Kincaid", top: "70%", left: "42%" },
  { label: "Pizza", top: "34%", left: "78%" },
];

export function MapPreview() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Places I&apos;ve Been
        </h2>
        <span className="text-sm font-semibold text-primary">
          Map preview
        </span>
      </div>
      <div className="map-grid relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-border">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-card/85 px-3 py-1 text-sm font-bold text-foreground shadow-sm">
          Anchorage
        </div>
        {pins.map((pin) => (
          <span
            key={pin.label}
            aria-label={pin.label}
            className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-card bg-primary shadow-sm"
            style={{ top: pin.top, left: pin.left }}
          />
        ))}
      </div>
    </section>
  );
}
