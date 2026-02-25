import { Clock8, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeSlideUp 0.55s ease forwards; animation-delay: 0.05s; opacity: 0; }
        .anim-2 { animation: fadeSlideUp 0.55s ease forwards; animation-delay: 0.2s;  opacity: 0; }
        .anim-3 { animation: fadeSlideUp 0.55s ease forwards; animation-delay: 0.35s; opacity: 0; }
        .anim-4 { animation: fadeSlideUp 0.55s ease forwards; animation-delay: 0.5s;  opacity: 0; }
        .anim-5 { animation: fadeSlideUp 0.55s ease forwards; animation-delay: 0.65s; opacity: 0; }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.12; }
          50%       { opacity: 0.25; }
        }
        .ring-1 { animation: ringPulse 3.5s ease-in-out infinite; }
        .ring-2 { animation: ringPulse 3.5s ease-in-out infinite; animation-delay: 0.6s; }
        .ring-3 { animation: ringPulse 3.5s ease-in-out infinite; animation-delay: 1.2s; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        .blink { animation: blink 2s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-bg overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_420px]">

        {/* ── Left: mission briefing ── */}
        <div className="flex flex-col justify-center px-8 sm:px-14 xl:px-20 py-16 min-h-screen lg:min-h-0">

          {/* Recruiting badge */}
          <div className="anim-1 flex items-center gap-2.5 mb-12">
            <span className="blink inline-block w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
            <span className="text-xs font-bold text-secondary uppercase tracking-[0.25em]">
              Recruiting Now
            </span>
          </div>

          {/* Logo — P[Clock]CKET / HEIST */}
          <div className="anim-2 mb-8 leading-none">
            <div className="flex items-center gap-0">
              <span className="font-display text-[82px] sm:text-[104px] xl:text-[124px] leading-none text-text tracking-wide">
                P
              </span>
              <Clock8
                className="text-primary flex-shrink-0 w-[68px] h-[68px] sm:w-[86px] sm:h-[86px] xl:w-[102px] xl:h-[102px] relative top-[-4px]"
                strokeWidth={2.25}
              />
              <span className="font-display text-[82px] sm:text-[104px] xl:text-[124px] leading-none text-text tracking-wide">
                CKET
              </span>
            </div>
            <div className="leading-none -mt-1">
              <span className="font-display text-[82px] sm:text-[104px] xl:text-[124px] leading-none text-primary tracking-wide">
                HEIST
              </span>
            </div>
          </div>

          {/* Tagline with orange bar accent */}
          <div className="anim-3 flex items-center gap-4 mb-8">
            <div className="w-8 h-[3px] bg-secondary rounded-full flex-shrink-0" />
            <p className="text-xl sm:text-2xl font-semibold text-text-accent">
              Tiny missions. Big office mischief.
            </p>
          </div>

          {/* Description */}
          <p className="anim-4 text-base text-text-muted leading-relaxed max-w-sm mb-12">
            Plan audacious office heists, coordinate with your crew, and
            pull off impossible missions — all from your desk.
          </p>

          {/* CTAs */}
          <div className="anim-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-bold text-base rounded-2xl hover:bg-secondary-dark transition-all duration-200 hover:shadow-[0_8px_32px_rgba(240,101,67,0.3)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Register Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/login"
              className="px-2 py-4 text-text-accent font-semibold text-base hover:text-primary transition-colors duration-200"
            >
              Sign in instead →
            </Link>
          </div>

          {/* Footer note */}
          <p className="anim-5 mt-16 text-xs text-text-muted uppercase tracking-[0.2em]">
            Free · No credit card · Start in minutes
          </p>
        </div>

        {/* ── Right: tactical scope panel ── */}
        <div className="hidden lg:flex relative bg-bg-muted overflow-hidden flex-col">

          {/* Top orange accent stripe */}
          <div className="w-full h-1.5 bg-secondary flex-shrink-0" />

          <div className="flex-1 relative flex items-center justify-center">

            {/* Large faded mission number */}
            <span
              className="absolute select-none pointer-events-none font-display text-[280px] font-black leading-none text-text"
              style={{ opacity: 0.03 }}
            >
              01
            </span>

            {/* Scope / crosshair rings */}
            <div className="relative flex items-center justify-center w-64 h-64">
              <div className="ring-1 absolute w-64 h-64 rounded-full border-2 border-primary" />
              <div className="ring-2 absolute w-48 h-48 rounded-full border   border-primary" />
              <div className="ring-3 absolute w-32 h-32 rounded-full border-2 border-primary" />

              {/* Crosshair axes */}
              <div className="absolute w-64 h-px bg-primary" style={{ opacity: 0.15 }} />
              <div className="absolute h-64 w-px bg-primary" style={{ opacity: 0.15 }} />

              {/* Cardinal tick marks */}
              <div className="absolute top-0    left-1/2 w-px h-4 bg-secondary -translate-x-1/2 -translate-y-2" />
              <div className="absolute bottom-0 left-1/2 w-px h-4 bg-secondary -translate-x-1/2  translate-y-2" />
              <div className="absolute left-0  top-1/2  w-4 h-px bg-secondary -translate-y-1/2 -translate-x-2" />
              <div className="absolute right-0 top-1/2  w-4 h-px bg-secondary -translate-y-1/2  translate-x-2" />

              {/* Centre dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
            </div>

            {/* Op status — top left */}
            <div className="absolute top-10 left-8">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5">
                Op Status
              </p>
              <div className="flex items-center gap-2">
                <span className="blink w-2 h-2 rounded-full bg-success inline-block" />
                <span className="text-xs font-bold text-text">Active</span>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-7 right-7 w-7 h-7">
              <div className="absolute top-0 right-0 w-full h-px bg-primary/30" />
              <div className="absolute top-0 right-0 w-px h-full bg-primary/30" />
            </div>
            <div className="absolute bottom-7 left-7 w-7 h-7">
              <div className="absolute bottom-0 left-0 w-full h-px bg-primary/30" />
              <div className="absolute bottom-0 left-0 w-px h-full bg-primary/30" />
            </div>

            {/* Vertical label — bottom right */}
            <div className="absolute bottom-10 right-7">
              <span
                className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]"
                style={{ writingMode: "vertical-rl" }}
              >
                Pocket Heist · Operations
              </span>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
