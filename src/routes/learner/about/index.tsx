import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

// Import mock data từ thư mục data
import { ABOUT_STATS, ABOUT_VALUES } from "~/data/about";

const TeamImage = lazy(() => import("@/components/ui/TeamImage"));

export const Route = createFileRoute("/learner/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div
      className="w-full min-h-screen px-6 py-4"
      style={{ background: "#eef3ee" }}
    >
      {/* ── Hero banner ── */}
      <div
        className="rounded-2xl px-10 py-10 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #c8d8f8 0%, #dce8ff 50%, #d4eed4 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute right-12 top-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl rotate-12 opacity-70"
          style={{
            background: "linear-gradient(135deg, #a8d5a2 0%, #6bcb77 100%)",
          }}
        />
        <div
          className="absolute right-32 bottom-0 w-16 h-16 rounded-2xl rotate-45 opacity-40"
          style={{ background: "#2d4a3e" }}
        />
        <div className="relative z-10 max-w-lg">
          <span className="inline-block bg-white/60 backdrop-blur-sm text-gray-500 text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wider uppercase">
            Our Story
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-3 leading-snug">
            Meet the team behind
            <br />
            <span className="text-[#2d4a3e]">Learnify.</span>
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            We're a small team of passionate builders committed to making
            high-quality, AI-powered education accessible to everyone.
          </p>
        </div>
      </div>

      {/* ── Two-column: Mission + Values ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4 mb-4">
        {/* Mission card */}
        <div className="bg-white rounded-2xl p-7 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-1">
            Our Mission
          </h2>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">
            Why we build Learnify
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Learnify was born from a simple belief: learning should be
            personalized, engaging, and available to everyone. We combine
            curated expert content with AI-driven guidance to create an
            experience that adapts to each individual learner's pace and goals.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            From interactive mind-maps to streaks that keep you motivated, every
            feature is designed to help you build lasting knowledge — not just
            pass the next exam.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-50">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[#2d4a3e] mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-1">
              Our Values
            </h2>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">
              What drives us
            </p>
          </div>
          {ABOUT_VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="flex items-start gap-3 p-3 rounded-xl transition-all hover:scale-[1.01] duration-200"
                style={{ background: v.color }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${v.iconColor}20` }}
                >
                  <span
                    className="material-symbols-rounded text-[20px]"
                    style={{ color: v.iconColor }}
                  >
                    {v.icon}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800 mb-0.5">
                    {v.title}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    {v.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Team section ── */}
      <div className="bg-white rounded-2xl p-7 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-1">The Team</h2>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              The humans behind the product
            </p>
          </div>
          <span className="text-xs bg-[#eef3ee] text-[#2d4a3e] font-semibold px-3 py-1.5 rounded-full">
            3 members
          </span>
        </div>

        {/* Team image if available - Bọc trong Suspense để hỗ trợ lazy load */}
        <div className="mb-6">
          <Suspense
            fallback={
              <div className="h-40 w-full bg-gray-100 animate-pulse rounded-xl" />
            }
          >
            <TeamImage />
          </Suspense>
        </div>
      </div>

      {/* ── Contact CTA ── */}
      <div
        className="rounded-2xl px-8 py-7 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, #2d4a3e 0%, #3d6b55 100%)",
        }}
      >
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Want to get in touch?
          </h3>
          <p className="text-sm text-white/70">
            We'd love to hear from you — feedback, ideas, or just a hello.
          </p>
        </div>
        <a
          href="mailto:hello@learnify.com"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#2d4a3e] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <span className="material-symbols-rounded text-[18px]">mail</span>
          Contact us
        </a>
      </div>
    </div>
  );
}
