import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BookOpen,
  Library,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Curated collections",
    description:
      "Organize products and finds into clear, easy-to-browse collections that feel intentional and searchable.",
  },
  {
    icon: Search,
    title: "Smart browsing",
    description:
      "Find what you need quickly with a clean browsing experience designed for discovery and comparison.",
  },
  {
    icon: Upload,
    title: "Simple publishing",
    description:
      "Upload and manage new items with a straightforward workflow that keeps your catalog tidy and current.",
  },
];

const steps = [
  {
    title: "Browse",
    description:
      "Explore the latest collections and discover interesting finds.",
  },
  {
    title: "Save",
    description: "Keep track of what matters to you in your personal library.",
  },
  {
    title: "Manage",
    description: "Upload, edit, and organize your own listings with ease.",
  },
];

const featureHighlights = [
  "Organized by theme",
  "Easy to browse and compare",
  "Built for repeat discovery",
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-neutral text-primary">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(46,192,197,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(16,58,63,0.10), transparent 30%)",
          }}
        />

        <div className="container relative mx-auto px-6 py-12 md:py-20">
          <header className="mb-16 flex items-center justify-between">
            <Link to="/app" className="flex items-center gap-3 text-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                <BookOpen size={18} />
              </div>
              <span className="text-xl font-bold tracking-wide">
                READ <span className="text-secondary">MARKET</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-primary md:flex">
              <Link
                to="/app/search"
                className="relative px-2 py-1.5 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-200 hover:text-primary hover:after:w-full"
              >
                Browse
              </Link>
              <Link
                to="/app/login"
                className="rounded-md border border-primary bg-surface px-3 py-1.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary hover:text-primary hover:shadow-md"
              >
                Sign in
              </Link>
            </nav>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary bg-surface px-3 py-1.5 text-sm font-medium text-primary shadow-sm">
                <Sparkles size={14} className="text-secondary" />
                Built for discovery and collection
              </div>

              <h1 className="max-w-xl text-4xl font-black leading-tight text-primary md:text-5xl lg:text-6xl">
                Curated finds,
                <span className="block text-secondary">
                  without the clutter.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                Read Market helps you discover, organize, and share collections
                in a clean marketplace experience built for browsing, saving,
                and managing what matters most.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/app/search"
                  className="btn-primary px-5 py-3"
                >
                  Explore collections
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/app/register"
                  className="btn-secondary px-5 py-3"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-primary bg-surface p-5 shadow-[0_18px_45px_rgba(16,58,63,0.08)]">
              <div className="rounded-xl border border-primary bg-surface-raised p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      Today
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-primary">
                      Featured collection
                    </h2>
                  </div>
                  <div className="rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                    New
                  </div>
                </div>

                <div
                  className="rounded-xl p-6 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #103a3f 0%, #1c4d52 45%, #2ec0c5 100%)",
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[#d9f6f8]">
                    Curated picks
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">
                    Reading Essentials
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-[#d8f6f8]">
                    Discover hand-picked items grouped into a clear, useful
                    browsing experience.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {featureHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg border border-primary bg-surface px-3 py-2 text-sm text-primary"
                    >
                      <span className="h-2 w-2 rounded-full bg-secondary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section border-t border-primary bg-surface py-20">
        <div className="container mx-auto px-6">
          <div className="landing-reveal mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Why it works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
              A cleaner way to browse and manage collections
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="landing-reveal rounded-2xl border border-primary bg-surface-raised p-6 shadow-[0_8px_24px_rgba(16,58,63,0.04)] transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(16,58,63,0.06)]"
                style={{ "--reveal-delay": `${(index + 1) * 100}ms` } as CSSProperties}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary">
                  {title}
                </h3>
                <p className="text-base leading-7 text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-[28px] border border-primary bg-primary p-8 text-white shadow-[0_20px_50px_rgba(16,58,63,0.15)] md:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                  How it works
                </p>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  A simple flow for discovery and organization
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {steps.map(({ title, description }, index) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{title}</h3>
                    <p className="text-sm leading-6 text-white/80">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Ready to explore the marketplace?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted">
            Browse collections, save what stands out, and manage your own
            catalog in a space designed to feel clear and useful.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/app/search"
              className="btn-primary px-6 py-3"
            >
              Browse now
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/app/login"
              className="btn-secondary px-6 py-3"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary bg-surface py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-sm text-muted md:flex-row">
          <div className="flex items-center gap-3 text-primary">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              <BookOpen size={16} />
            </div>
            <span className="font-bold tracking-wide">
              READ <span className="text-secondary">MARKET</span>
            </span>
          </div>

          <p>Built for browsing, organization, and collection discovery.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
