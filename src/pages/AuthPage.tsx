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
        <div className="w-full px-5 pt-10 lg:w-1/2 xl:pl-12">
          <header className="mb-12 flex items-center gap-3 text-2xl font-bold text-emerald-500">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-lg text-white">
              PP
            </span>
            <span>PotPunch</span>
          </header>

          <div className="mx-auto max-w-[460px] pb-16 pt-10">
            <header className="mb-8 text-center">
              <h2 className="mb-2 text-4xl font-semibold text-slate-900">{title}</h2>
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
                    className="h-14 rounded-lg border border-slate-300 px-4 text-sm"
                    placeholder="First name"
                  />
                  <input
                    className="h-14 rounded-lg border border-slate-300 px-4 text-sm"
                    placeholder="Last name"
                  />
                </div>
              ) : null}

              <input
                className="h-14 w-full rounded-lg border border-slate-300 px-4 text-sm"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="h-14 w-full rounded-lg border border-slate-300 px-4 text-sm"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {mode === "signup" ? (
                <input
                  className="h-14 w-full rounded-lg border border-slate-300 px-4 text-sm"
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

        <div className="relative hidden min-h-screen w-1/2 bg-sky-50 p-20 lg:block">
          <div className="grid h-full place-items-center rounded-3xl border border-emerald-100 bg-white/70 p-12">
            <div className="text-center">
              <h3 className="mb-4 text-4xl font-semibold text-slate-900">Fast, Focused, Reliable</h3>
              <p className="text-sm font-medium text-slate-600">
                PotPunch helps your team manage contributions, conversations, and reporting from one serious workspace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
