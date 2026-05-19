import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 p-6">
      <div className="max-w-xl rounded-lg border border-slate-200 bg-white p-10 text-center">
        <p className="text-7xl font-extrabold text-emerald-500">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Page Not Found</h1>
        <p className="mt-3 text-slate-500">
          The page you are looking for does not exist in this dashboard.
        </p>
        <Link
          to="/admin"
          className="mt-8 inline-block rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
