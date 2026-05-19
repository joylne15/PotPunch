type StatCardProps = {
  label: string;
  value: string;
  caption: string;
  tone: "emerald" | "amber" | "sky" | "rose";
};

const toneClass = {
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  sky: "bg-sky-50 text-sky-700",
  rose: "bg-rose-50 text-rose-700",
};

export function StatCard({ label, value, caption, tone }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <span className={`rounded-md px-2 py-1 text-xs font-bold ${toneClass[tone]}`}>
          Live
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{caption}</p>
    </div>
  );
}
