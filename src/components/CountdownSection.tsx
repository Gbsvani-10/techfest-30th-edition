import { useState, useEffect, KeyboardEvent } from 'react';
import { CalendarPlus, Check } from 'lucide-react';
import { FESTIVAL_DAYS } from '../data/festivalData';

// December 16, 2026 at 09:00 AM IST (+05:30)
const FESTIVAL_START_MS = new Date('2026-12-16T09:00:00+05:30').getTime();

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
}

function calculateRemaining(): TimeRemaining {
  const now = Date.now();
  const diff = FESTIVAL_START_MS - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, started: false };
}

function padTwo(val: number): string {
  return String(val).padStart(2, '0');
}

function formatIcsUtcTimestamp(date: Date): string {
  const yyyy = date.getUTCFullYear();
  const mm = padTwo(date.getUTCMonth() + 1);
  const dd = padTwo(date.getUTCDate());
  const hh = padTwo(date.getUTCHours());
  const min = padTwo(date.getUTCMinutes());
  const ss = padTwo(date.getUTCSeconds());
  return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateRemaining());
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [downloadedCal, setDownloadedCal] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleDownloadIcs = () => {
    const nowStamp = formatIcsUtcTimestamp(new Date());
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Techfest IIT Bombay//30th Edition 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:techfest-iitb-30th-edition-2026@techfest.org',
      `DTSTAMP:${nowStamp}`,
      'DTSTART:20261216T033000Z',
      'DTEND:20261218T163000Z',
      'SUMMARY:Techfest IIT Bombay — 30th Edition',
      'DESCRIPTION:Asia\'s Largest Science and Technology Festival at IIT Bombay (Powai\\, Mumbai). Official portal: https://techfest.org/',
      'LOCATION:IIT Bombay\\, Powai\\, Mumbai\\, Maharashtra 400076\\, India',
      'URL:https://techfest.org/',
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const icsContent = `${icsLines.join('\r\n')}\r\n`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Techfest-IIT-Bombay-30th-Edition-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    setDownloadedCal(true);
    window.setTimeout(() => setDownloadedCal(false), 3000);
  };

  const handleDayKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % FESTIVAL_DAYS.length;
    else if (e.key === 'ArrowLeft')
      nextIdx = (idx - 1 + FESTIVAL_DAYS.length) % FESTIVAL_DAYS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = FESTIVAL_DAYS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveDayIdx(nextIdx);
      const tablist = e.currentTarget.parentElement;
      const buttons = tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIdx]?.focus();
    }
  };

  const activeDay = FESTIVAL_DAYS[activeDayIdx];

  const units = [
    { label: 'Days', value: padTwo(timeLeft.days) },
    { label: 'Hours', value: padTwo(timeLeft.hours) },
    { label: 'Minutes', value: padTwo(timeLeft.minutes) },
    { label: 'Seconds', value: padTwo(timeLeft.seconds) },
  ];

  return (
    <section
      id="countdown"
      className="py-20 sm:py-24 lg:py-28 bg-[#050505] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-reveal-group
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div data-reveal>
            <p className="text-xs font-mono tracking-wider text-[#FF5500] mb-3">
              05 · Festival Countdown & Timeline
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.94] text-white text-balance">
              December 16–18, 2026
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400">
              Counting down to Day 1 gates opening at IIT Bombay, Powai, Mumbai (09:00 IST).
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadIcs}
            data-reveal
            className="group inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 text-xs font-semibold text-white bg-[#141416] hover:bg-[#1E1E22] border border-white/15 hover:border-[#FF5500] active:scale-[0.98] rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
          >
            {downloadedCal ? (
              <>
                <Check className="w-4 h-4 text-[#FF5500]" aria-hidden="true" />
                <span>Calendar Invite Saved (.ics)</span>
              </>
            ) : (
              <>
                <CalendarPlus
                  className="w-4 h-4 text-[#FF5500] transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>Add Dec 16–18 to Calendar (.ics)</span>
              </>
            )}
          </button>
        </div>

        {/* Live Tabular Countdown Matrix */}
        {timeLeft.started ? (
          <div
            data-reveal-group
            className="border border-[#FF5500]/40 bg-[#0D0D0F] p-8 sm:p-10 text-center"
          >
            <p
              data-reveal
              className="font-display text-4xl sm:text-5xl font-bold uppercase text-white"
            >
              Techfest 30th Edition Is Underway
            </p>
            <p data-reveal className="mt-2 text-sm text-neutral-300">
              December 16–18, 2026 · IIT Bombay, Powai
            </p>
          </div>
        ) : (
          <div
            data-stagger-grid
            aria-live="off"
            aria-label="Countdown to December 16, 2026, 09:00 IST"
            className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#0A0A0B] divide-x divide-y lg:divide-y-0 divide-white/10"
          >
            {units.map((unit, idx) => (
              <div
                key={unit.label}
                data-stagger-card
                className="p-6 sm:p-10 flex flex-col justify-between transition-colors duration-200 hover:bg-white/[0.02]"
              >
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  {unit.label}
                </span>
                <div
                  className={`mt-4 font-mono text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight tabular-nums ${
                    idx === 3 ? 'text-[#FF5500]' : 'text-white'
                  }`}
                >
                  {unit.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Three-Day Festival Timeline */}
        <div data-reveal-group className="mt-12 border border-white/10 bg-[#0A0A0B]">
          <div
            data-reveal
            role="tablist"
            aria-label="Interactive three-day festival timeline"
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-b border-white/10"
          >
            {FESTIVAL_DAYS.map((dayItem, idx) => {
              const isActive = idx === activeDayIdx;
              return (
                <button
                  key={dayItem.day}
                  id={`timeline-tab-${idx}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`timeline-panel-${idx}`}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                  onClick={() => setActiveDayIdx(idx)}
                  onKeyDown={(e) => handleDayKeyDown(e, idx)}
                  className={`relative text-left px-6 py-5 min-h-[78px] transition-all duration-200 ease-editorial cursor-pointer ${
                    isActive
                      ? 'bg-[#141416] border-b-2 border-b-[#FF5500]'
                      : 'hover:bg-white/[0.03] active:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isActive ? 'text-[#FF5500] font-semibold' : 'text-neutral-400'}>
                      {dayItem.day}
                    </span>
                    <span className="text-neutral-400 tabular-nums">{dayItem.date}</span>
                  </div>
                  <div className="mt-1.5 text-base font-semibold text-white">
                    {dayItem.theme}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            key={activeDay.day}
            id={`timeline-panel-${activeDayIdx}`}
            role="tabpanel"
            aria-labelledby={`timeline-tab-${activeDayIdx}`}
            aria-live="polite"
            className="p-6 sm:p-8 space-y-8 animate-panel-in"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-mono text-[#FF5500] mb-1.5">
                  {activeDay.day} · {activeDay.date}
                </p>
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
                  {activeDay.summary}
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeDay.focusAreas.map((area) => (
                  <div
                    key={area}
                    className="px-3.5 py-2.5 border border-white/10 bg-[#101012] text-xs font-medium text-neutral-200"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Phase Daily Progression */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeDay.phases.map((item, idx) => (
                <div
                  key={item.phase}
                  className="relative p-5 border border-white/10 bg-[#0E0E10]"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#FF5500] font-semibold">
                      {String(idx + 1).padStart(2, '0')} · {item.phase}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
