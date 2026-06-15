import type { OnDemandSideTable } from "@/lib/types/on-demand-side-table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

const onDemandSideTable: OnDemandSideTable[] = [
  { title: "Artrade", lastRun: null },
  { title: "Audit", lastRun: null },
  { title: "Ledger", lastRun: null },
]

export default function OnDemandTable() {
  return (
    <Card className="fit h-full max-h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-black/80">
          <span className="inline-block h-2 w-2 rounded-full bg-purple-400" />
          On-Demand
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Table>
          <TableBody>
            {onDemandSideTable.map((item) => (
              <TableRow
                key={item.title}
                className="border-white/8 hover:bg-white/5"
              >
                <TableCell className="px-0 py-2">
                  <span className="block text-sm font-medium text-black">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-black">{item.lastRun}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
