import { Link } from "react-router-dom";
import {
  Rocket,
  Users2,
  ShieldCheck,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

const features = [
  {
    title: "Real-time feed",
    desc: "Instant posting and comments without reloads.",
    Icon: Rocket,
  },
  {
    title: "Follow & Discover",
    desc: "Find interesting accounts with smart suggestions.",
    Icon: Users2,
  },
  {
    title: "Secure",
    desc: "Protected authentication and server-side permissions.",
    Icon: ShieldCheck,
  },
];

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0e0e0e]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-green-500">
              circle
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/5"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:bg-green-400"
            >
              Create account
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.14),transparent_60%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Join the conversation with{" "}
              <span className="text-green-500">Circle</span>
            </h1>
            <p className="text-white/70 md:text-lg">
              Share thoughts, follow friends, and see what’s happening in real
              time.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-xl bg-green-500 px-5 py-3 font-semibold text-black hover:bg-green-400"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-white/15 px-5 py-3 font-semibold hover:bg-white/5"
              >
                I already have an account
              </Link>
            </div>
            <p className="text-xs text-white/50">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-green-400 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-green-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121212] p-4 shadow-xl">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400/40 to-green-700/30" />
                <div>
                  <div className="text-sm font-semibold">Madara</div>
                  <div className="text-xs text-white/50">@uchiha • 1m</div>
                </div>
              </div>
              <p className="mb-3 text-sm text-white/90">
                Power comes from the darkness within. Embrace it, and
                you&apos;ll surpass everyone.
              </p>
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <svg
                  viewBox="0 0 600 340"
                  className="h-48 w-full"
                  role="img"
                  aria-label="Illustration"
                >
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#22c55e"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="#16a34a"
                        stopOpacity="0.15"
                      />
                    </linearGradient>
                    <radialGradient id="g2" cx="50%" cy="40%" r="60%">
                      <stop
                        offset="0%"
                        stopColor="#22c55e"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="#0b0b0b"
                        stopOpacity="0.9"
                      />
                    </radialGradient>
                  </defs>
                  <rect width="600" height="340" fill="url(#g2)" />
                  <g opacity="0.9">
                    <circle cx="480" cy="80" r="60" fill="url(#g1)" />
                    <circle cx="140" cy="230" r="90" fill="url(#g1)" />
                    <circle cx="300" cy="150" r="40" fill="url(#g1)" />
                  </g>
                  <g stroke="#2a2a2a" strokeWidth="2">
                    <rect
                      x="40"
                      y="40"
                      width="520"
                      height="260"
                      rx="16"
                      fill="none"
                    />
                    <line x1="40" y1="120" x2="560" y2="120" />
                    <line x1="40" y1="200" x2="560" y2="200" />
                  </g>
                </svg>
              </div>
              <div className="mt-4 flex gap-3 text-white/70">
                <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-white/5">
                  <Heart className="h-4 w-4" />{" "}
                  <span className="text-xs">1.2k</span>
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-white/5">
                  <MessageCircle className="h-4 w-4" />{" "}
                  <span className="text-xs">256</span>
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-white/5">
                  <Share2 className="h-4 w-4" />{" "}
                  <span className="text-xs">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Why Circle?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-[#141414] p-5 transition hover:border-white/20 hover:bg-[#151515]"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15">
                <Icon className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center md:p-12">
          <h3 className="text-2xl font-bold md:text-3xl">
            Ready to join Circle?
          </h3>
          <p className="mt-2 text-white/70">
            Create a free account and start posting today.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/register"
              className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-black hover:bg-green-400"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 text-sm text-white/60">
          <span>© {new Date().getFullYear()} Circle</span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
