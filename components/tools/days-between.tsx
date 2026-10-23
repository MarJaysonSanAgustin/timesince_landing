'use client';

import { useId, useState } from 'react';
import { parseDate, daysBetween, describeGap, formatDate } from '@/lib/interval';
import { ToolShell, ToolField, ToolResult, inputClass } from '@/components/tools/tool-shell';

export function DaysBetween() {
  const fromId = useId();
  const toId = useId();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const a = parseDate(from);
  const b = parseDate(to);

  return (
    <ToolShell>
      <div className="grid gap-5 sm:grid-cols-2">
        <ToolField label="From" htmlFor={fromId}>
          <input
            id={fromId}
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={inputClass}
          />
        </ToolField>
        <ToolField label="To" htmlFor={toId}>
          <input
            id={toId}
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={inputClass}
          />
        </ToolField>
      </div>

      {!(a && b) && (
        <p className="mt-6 text-sm text-faint">
          Pick both dates. The order does not matter; the gap is the same either way.
        </p>
      )}

      {a && b && (() => {
        // Order-independent: a reader who fills these in backwards still gets an answer.
        const [start, end] = a <= b ? [a, b] : [b, a];
        const days = daysBetween(start, end);
        return (
          <ToolResult
            value={
              days === 0 ? 'Same day' : `${days.toLocaleString()} ${days === 1 ? 'day' : 'days'}`
            }
            caption={`between ${formatDate(start)} and ${formatDate(end)}`}
            rows={[
              { label: 'IN WEEKS', value: (days / 7).toFixed(1) },
              { label: 'IN MONTHS', value: describeGap(days, start, end) },
            ]}
          />
        );
      })()}
    </ToolShell>
  );
}
