'use client';

import { useState } from 'react';
import { Plus, Sprout, Undo2 } from 'lucide-react';
import { strings } from '@/lib/strings/en';

const example = strings.home.example;

export function WateringExample() {
  const [logged, setLogged] = useState(false);
  const dates = logged ? [...example.dates, example.date] : example.dates;
  const ActionIcon = logged ? Undo2 : Plus;

  return (
    <figure className="paper grid place-items-center rounded-[24px] border border-line px-5 py-6 sm:p-10">
      <div className="relative w-full max-w-sm">
        <div className="surface">
          <div className="flex items-center justify-between gap-3 px-5 py-3 font-mono text-xs text-muted sm:px-7">
            <span>{example.label}</span>
            <span>{example.date}</span>
          </div>
          <div className="bg-[#205348] px-5 py-5 text-white sm:px-7 sm:py-6">
            <div className="flex items-center gap-2.5">
              <Sprout aria-hidden="true" size={24} />
              <span className="font-display text-xl font-bold">{example.name}</span>
            </div>
            <p aria-live="polite" aria-atomic="true" className="mt-5">
              <span className="block font-mono text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-tight">
                {logged ? example.justLogged : example.elapsed}
              </span>
              <span className="mt-2 block text-sm">{logged ? example.recorded : example.since}</span>
            </p>
          </div>
          <div className="px-5 pb-5 pt-1 sm:px-7">
            <p className="meta">{example.history}</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-ink">
              {dates.map((date) => <li key={date}>{date}</li>)}
            </ul>
            <button
              type="button"
              onClick={() => setLogged((previous) => !previous)}
              className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-card border border-hair bg-card px-4 text-sm font-bold text-ink hover:bg-paper"
            >
              <ActionIcon size={16} aria-hidden="true" />
              {logged ? example.undo : example.log}
            </button>
          </div>
        </div>
      </div>
    </figure>
  );
}
