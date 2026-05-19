import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type AuthPageProps = {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  footerText: string;
  footerLink: string;
  footerHref: string;
};

export function AuthPage({
  mode,
  title,
  subtitle,
  footerText,
  footerLink,
  footerHref,
}: AuthPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("role", "admin");
    localStorage.setItem("name", "John Doe");
    navigate("/admin");
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="w-full px-5 pt-8 lg:w-1/2 xl:pl-12">
          <header className="mb-12 flex items-center gap-3 text-2xl font-bold text-emerald-500">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500 text-lg text-white">
              PP
            </span>
            <span>PotPunch</span>
          </header>

          <div className="mx-auto max-w-[460px] pb-16 pt-6">
            <header className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-semibold text-slate-900">{title}</h2>
              <p className="text-base font-medium text-slate-500">{subtitle}</p>
            </header>

            <div className="mb-5 grid gap-4 md:grid-cols-2">
              <button className="rounded-lg border border-slate-200 px-6 py-4 text-base font-medium text-slate-800">
                Sign In with Google
              </button>
              <button className="rounded-lg border border-slate-200 px-6 py-4 text-base font-medium text-slate-800">
                Sign In with Apple
              </button>
            </div>

            <div className="relative mb-5 mt-6 text-center text-sm text-slate-500">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-slate-200" />
              <span className="relative bg-white px-3">Or continue with</span>
            </div>

            <div className="space-y-4">
              {mode === "signup" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className="h-12 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500"
                    placeholder="First name"
                  />
                  <input
                    className="h-12 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500"
                    placeholder="Last name"
                  />
                </div>
              ) : null}

              <input
                className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {mode === "signup" ? (
                <input
                  className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500"
                  placeholder="Confirm Password"
                  type="password"
                />
              ) : null}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full rounded-lg bg-emerald-500 py-3.5 font-bold text-white transition hover:bg-emerald-600"
            >
              {mode === "login" ? "Sign In" : "Sign Up"}
            </button>

            <p className="pt-7 text-center text-base font-medium text-slate-900">
              {footerText}{" "}
              <Link className="font-semibold underline" to={footerHref}>
                {footerLink}
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden min-h-screen w-1/2 bg-slate-100 p-12 lg:block">
          <div className="grid h-full content-center gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-sm font-bold text-emerald-700">Today</p>
              <p className="mt-3 text-4xl font-bold text-slate-900">88,400</p>
              <p className="mt-2 text-sm text-slate-500">Collected from 26 confirmed payments.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-500">Open reminders</p>
                <p className="mt-2 text-2xl font-bold text-amber-600">18</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-500">Members</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">322</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
