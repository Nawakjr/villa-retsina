import { pricingMeta } from "@/data/pricing";
import type { PriceRow } from "@/data/pricing";

export default function PricingSection({
  rows,
  note,
}: {
  rows: PriceRow[];
  note: string;
}) {
  return (
    <div id="tarifs" className="scroll-mt-24">
      <h2 className="font-serif text-3xl text-anthracite sm:text-4xl">
        Tarifs de location
      </h2>
      <span className="rule-deco mt-4" />

      <div className="mt-8 overflow-x-auto rounded-2xl border border-anthracite/10">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-sable text-anthracite">
              <th className="px-4 py-3 font-medium">Saison</th>
              <th className="px-4 py-3 font-medium">Période (indicative)</th>
              <th className="px-4 py-3 text-right font-medium">
                {pricingMeta.colRdc}
              </th>
              <th className="px-4 py-3 text-right font-medium">
                {pricingMeta.colEtage}
              </th>
              <th className="px-4 py-3 text-right font-medium">
                {pricingMeta.colFull}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-sable/40" : "bg-white"}>
                <td className="px-4 py-3.5 font-medium text-anthracite">
                  {row.season}
                </td>
                <td className="px-4 py-3.5 text-anthracite/70">{row.period}</td>
                <td className="px-4 py-3.5 text-right text-anthracite/80">
                  {row.priceRdc}
                </td>
                <td className="px-4 py-3.5 text-right text-anthracite/80">
                  {row.priceEtage}
                </td>
                <td className="px-4 py-3.5 text-right font-semibold text-olive-deep">
                  {row.priceFull}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && <p className="mt-4 text-[13px] italic text-anthracite/55">{note}</p>}
    </div>
  );
}
