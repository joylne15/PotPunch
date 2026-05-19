const ACTIVITIES = [
  "James sent payment for SEO writing",
  "New member signup approved",
  "Three invoices pending review",
  "Monthly report exported",
];

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h4 className="mb-4 text-xl font-bold text-slate-900">Activity</h4>
      <ul className="space-y-3 text-sm text-slate-600">
        {ACTIVITIES.map((activity) => (
          <li key={activity}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}
