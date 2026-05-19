const USERS = [
  { name: "Abdur Rohman", role: "Finance managers", type: "Full Time", level: "Senior" },
  { name: "Ajoy Sarker", role: "Investors", type: "Full Time", level: "Senior" },
  { name: "Mohammad Ali", role: "Board Members", type: "Part Time", level: "Junior" },
  { name: "Nayeem Islam", role: "Financial Analyst", type: "Part Time", level: "Senior" },
  { name: "Abdullah Mamun", role: "Finance managers", type: "Part Time", level: "Senior" },
  { name: "Sheikh Rakib", role: "Accountants", type: "Full Time", level: "Senior" },
];

export function UsersTable() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <input
          className="h-12 w-full max-w-xl rounded-lg bg-slate-100 px-4 text-sm placeholder:text-slate-500"
          placeholder="Job Title, Company, or Keywords"
        />
        <button className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white">
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Type</th>
              <th className="p-3">Level</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr key={user.name} className="border-b border-slate-100">
                <td className="p-3 font-semibold text-slate-900">{user.name}</td>
                <td className="p-3 text-slate-600">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 ${
                      user.type === "Full Time"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {user.type}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 ${
                      user.level === "Senior"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-sky-100 text-sky-600"
                    }`}
                  >
                    {user.level}
                  </span>
                </td>
                <td className="p-3">
                  <button className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white">
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
