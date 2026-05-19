const PROGRESS = 68;

export function CollectionProgress() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">Collection Progress</h4>
          <p className="mt-1 text-sm text-slate-500">May target against confirmed member payments.</p>
        </div>
        <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700">
          {PROGRESS}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${PROGRESS}%` }} />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="font-medium text-slate-500">Target</p>
          <p className="mt-1 font-bold text-slate-900">130,000</p>
        </div>
        <div>
          <p className="font-medium text-slate-500">Collected</p>
          <p className="mt-1 font-bold text-emerald-700">88,400</p>
        </div>
        <div>
          <p className="font-medium text-slate-500">Remaining</p>
          <p className="mt-1 font-bold text-amber-600">41,600</p>
        </div>
      </div>
    </section>
  );
}
