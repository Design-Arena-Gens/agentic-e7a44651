"use client";

export function SplashScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-white text-center">
      <div className="animate-[splashPulse_2s_ease-in-out_infinite] rounded-full bg-[var(--accent)]/10 px-10 py-12">
        <span className="text-4xl font-bold text-[var(--accent)]">
          Bindass Store
        </span>
      </div>
      <p className="mt-6 text-lg text-[var(--muted)]">
        Shop Smart, Live Bindass
      </p>
    </div>
  );
}
