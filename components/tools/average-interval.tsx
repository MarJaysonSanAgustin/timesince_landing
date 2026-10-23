'use client';

import { useId, useState } from 'react';
import { parseDate, intervalStats, formatDate } from '@/lib/interval';
import { ToolShell, ToolField, ToolResult, inputClass } from '@/components/tools/tool-shell';

const PLACEHOLDER = '2026-01-04\n2026-01-19\n2026-02-02\n2026-02-21';

export function AverageInterval() {
  const id = useId();
  const [value, setValue] = useState('');

  const lines = value.split('\n').map((l) => l.trim()).filter(Boolean);
  const parsed = lines.map((line) => ({ line, date: parseDate(line) }));
  const invalid = parsed.filter((p) => !p.date).map((p) => p.line);
  const dates = parsed.flatMap((p) => (p.date ? [p.date] : []));
  const stats = intervalStats(dates);

  return (
    <ToolShell>
      <ToolField label="Dates, one per line (YYYY-MM-DD)" htmlFor={id}>
        <textarea
          id={id}
          rows={6}
          value={value}
          placeholder={PLACEHOLDER}
          onChange={(e) => setValue(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </ToolField>

      {invalid.length > 0 && (
        <p className="mt-3 text-sm text-muted">
          {invalid.length === 1
            ? 'Skipped a line that is not a date: '
            : `Skipped ${invalid.length} lines that are not dates: `}
          <span className="font-mono text-faint">{invalid.slice(0, 3).join(', ')}</span>
          {invalid.length > 3 && <span className="text-faint"> and more</span>}
        </p>
      )}

      {!stats && (
        <p className="mt-6 text-sm text-faint">
          {dates.length === 1
            ? 'One date has no interval. Add at least one more.'
            : 'Paste at least two dates. Everything stays in your browser.'}
        </p>
      )}

      {stats && (
        <ToolResult
          value={`${stats.average.toFixed(1)} days`}
          caption={`average gap across ${stats.count} dates`}
          rows={[
            { label: 'SHORTEST GAP', value: `${stats.shortest} ${stats.shortest === 1 ? 'day' : 'days'}` },
            { label: 'LONGEST GAP', value: `${stats.longest} ${stats.longest === 1 ? 'day' : 'days'}` },
            { label: 'INTERVALS', value: String(stats.gaps.length) },
            ...(stats.nextDue
              ? [{ label: 'NEXT DUE, ON AVERAGE', value: formatDate(stats.nextDue) }]
              : []),
          ]}
        />
      )}
    </ToolShell>
  );
}
