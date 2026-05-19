const SHARED_FILES = ["Reference.zip", "Doc0001.docx", "Filex.pdf"];

export function UserInfoPanel() {
  return (
    <aside className="p-5 lg:col-span-3">
      <h4 className="mb-4 text-2xl font-bold text-slate-900">User Info</h4>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-slate-200 font-bold text-slate-600">
          AS
        </div>
        <p className="font-bold text-slate-900">Ajoy Sarker</p>
        <p className="text-sm text-slate-500">UX Researcher</p>
      </div>

      <h5 className="mb-3 font-bold text-slate-900">Shared Files</h5>
      <ul className="space-y-2 text-sm text-slate-600">
        {SHARED_FILES.map((file) => (
          <li key={file} className="rounded-lg bg-slate-100 p-3">
            {file}
          </li>
        ))}
      </ul>
    </aside>
  );
}
