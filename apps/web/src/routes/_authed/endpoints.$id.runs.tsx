import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Badge } from "@cronicorn/ui-library/components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cronicorn/ui-library/components/select";
import { Button } from "@cronicorn/ui-library/components/button";

import { PageHeader } from "../../components/page-header";
import { DataTable } from "../../components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { runsQueryOptions } from "@/lib/api-client/queries/runs.queries";

// Validate search params for filtering
const runsSearchSchema = z.object({
  status: z.enum(["all", "success", "failed"]).optional().default("all"),
  dateRange: z.string().optional(),
});

export const Route = createFileRoute("/_authed/endpoints/$id/runs")({
  validateSearch: runsSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ params, context, deps }) => {
    const filters = deps.search.status !== "all" ? { status: deps.search.status } : undefined;
    await context.queryClient.ensureQueryData(runsQueryOptions(params.id, filters));
  },
  component: RunsListPage,
});

type RunRow = {
  runId: string;
  status: "success" | "failure" | "timeout" | "cancelled";
  durationMs: number | null;
  startedAt: Date;
  finishedAt: Date | null;
};

function RunsListPage() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const filters = search.status !== "all" ? { status: search.status } : undefined;
  const { data } = useSuspenseQuery(runsQueryOptions(id, filters));

  const columns: Array<ColumnDef<RunRow>> = [
    {
      accessorKey: "runId",
      header: "Run ID",
      cell: ({ row }) => (
        <code className="text-xs font-mono">{row.original.runId.substring(0, 8)}</code>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variant =
          status === "success"
            ? "default"
            : status === "failure"
              ? "destructive"
              : "secondary";
        return (
          <Badge variant={variant} className="capitalize">
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "durationMs",
      header: "Duration",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.durationMs ? `${row.original.durationMs}ms` : "—"}
        </span>
      ),
    },
    {
      accessorKey: "startedAt",
      header: "Started At",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.startedAt).toLocaleString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="link" size="sm" asChild>
          <Link to="/runs/$id" params={{ id: row.original.runId }}>
            View Details
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        text="Run History"
        description="View execution history for this endpoint"
      />

      <div className="mb-6 flex gap-4 items-end">
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <Select
            value={search.status}
            onValueChange={(value) => {
              navigate({
                search: (prev) => ({ ...prev, status: value as typeof search.status }),
              });
            }}
          >
            <SelectTrigger id="status" className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failure">Failure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dateRange" className="text-sm font-medium">
            Date Range
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="dateRange" className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data.runs}
        searchKey="runId"
        searchPlaceholder="Search run ID..."
        emptyMessage="No runs found for the selected filters."
        enablePagination={true}
        defaultPageSize={50}
      />
    </>
  );
}
