import type { z } from 'zod';
import type { guideSchema } from '@/lib/content/schema';

type Comparison = NonNullable<z.infer<typeof guideSchema>['comparison']>;

/**
 * A comparison table, in the ticket's voice: mono for the column headings and
 * the cells, label left in the sans.
 *
 * Scrolls horizontally with the first column pinned, because that is where
 * comparison tables actually fail — at phone width an unpinned table shows you
 * a column of values with no idea which row they belong to.
 */
export function ComparisonTable({ caption, columns, rows }: Comparison) {
  return (
    <section className="not-prose my-12">
      <div className="ticket overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {caption && (
            <caption className="stub-label px-5 pt-4 text-left uppercase">{caption}</caption>
          )}
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="sticky left-0 z-10 bg-card px-5 py-3">
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((col) => (
                <th key={col} scope="col" className="stub-label px-5 py-3 uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-5 py-3 text-sm font-medium text-ink"
                >
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={`${row.label}-${columns[i]}`}
                    className="stub-value px-5 py-3 text-sm whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
