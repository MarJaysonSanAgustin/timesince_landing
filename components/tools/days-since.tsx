'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { parseDate, todayUtc, daysBetween, describeGap, formatDate } from '@/lib/interval';
import { ToolShell, ToolField, ToolResult, inputClass } from '@/components/tools/tool-shell';

export function DaysSince() {
  const id = useId();
  const [value, setValue] = useState('');
  const date = parseDate(value);
  const today = todayUtc();

  return (
    <ToolShell>
      <ToolField label="Date it last happened" htmlFor={id}>
        <input
          id={id}
          type="date"
          value={value}
          max={today.toISOString().slice(0, 10)}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
        />
      </ToolField>

      {!date && (
        <p className="mt-6 text-sm text-faint">
          Pick a date and the count appears here. Nothing is sent anywhere.
        </p>
      )}

      {date && (() => {
        const days = daysBetween(date, today);
        if (days < 0) {
          return (
            <p className="mt-6 text-sm text-muted">
              That date is in the future. This counts time since something happened — try{' '}
              <Link href="/tools/days-between" className="text-ube hover:underline">
                days between two dates
              </Link>{' '}
              instead.
            </p>
          );
        }
        return (
          <ToolResult
            value={days === 0 ? 'Today' : `${days.toLocaleString()} ${days === 1 ? 'day' : 'days'}`}
            caption={`since ${formatDate(date)}`}
            rows={[
              { label: 'IN WEEKS', value: (days / 7).toFixed(1) },
              { label: 'IN MONTHS', value: describeGap(days, date, today) },
            ]}
          />
        );
      })()}
    </ToolShell>
  );
}
