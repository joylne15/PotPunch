const MEMBERS = [
  { name: "Ajoy Sarker", status: "Paid", amount: "130,000" },
  { name: "Emilia Sam", status: "Partial", amount: "88,400" },
  { name: "Cody Fisher", status: "Pending", amount: "0" },
  { name: "Eleanor Pena", status: "Partial", amount: "74,100" },
];

export function MembersPreview() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-bold text-slate-900">Member Status</h4>
        <button className="rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
              <th className="pb-3">Member</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Paid</th>
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((member) => (
              <tr key={member.name} className="border-b border-slate-100 last:border-0">
                <td className="py-3 font-semibold text-slate-900">{member.name}</td>
                <td className="py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-bold ${
                      member.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700"
                        : member.status === "Partial"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="py-3 text-right font-bold text-slate-900">{member.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
