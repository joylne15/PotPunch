const ACTIVITIES = [
  { title: "Payment confirmed", meta: "Emilia Sam - 25 min ago" },
  { title: "New member added", meta: "Ajoy Sarker - 1 hr ago" },
  { title: "Reminder queued", meta: "Pending group - 2 hrs ago" },
  { title: "Report exported", meta: "Monthly ledger - Today" },
];

export function ActivityFeed() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h4 className="mb-4 text-base font-bold text-slate-900">Activity</h4>
      <ul className="space-y-4 text-sm">
        {ACTIVITIES.map((activity) => (
          <li key={activity.title} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
            <div>
              <p className="font-semibold text-slate-900">{activity.title}</p>
              <p className="mt-0.5 text-slate-500">{activity.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
