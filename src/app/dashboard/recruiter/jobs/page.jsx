import { getCompanyJobs } from "@/lib/api/jobs";
import { Table } from "@heroui/react";
import { Delete, Eye, Pencil } from "@gravity-ui/icons";
import { getLoggedInRecruiterCompany } from "@/lib/api/company";

const RecruiterJobs = async () => {
    const company = await getLoggedInRecruiterCompany();
    const companyId = company._id;

    const jobs = await getCompanyJobs(companyId);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-semibold text-white">
                    Manage Jobs
                </h1>

                <p className="mt-2 text-sm text-zinc-400">
                    View and manage all jobs posted by your company.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818] p-10">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content
                            aria-label="Company Jobs"
                            className="min-w-[900px]"
                        >
                            <Table.Header>
                                <Table.Column isRowHeader>
                                    Job Title
                                </Table.Column>

                                <Table.Column>
                                    Type / Category
                                </Table.Column>

                                <Table.Column>
                                    Location
                                </Table.Column>

                                <Table.Column>
                                    Status
                                </Table.Column>

                                <Table.Column>
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {jobs?.map((job) => (
                                    <Table.Row key={job._id}>
                                        <Table.Cell>
                                            <div>
                                                <p className="font-medium text-white">
                                                    {job.title}
                                                </p>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div>
                                                <p className="text-sm text-white">
                                                    {job.type}
                                                </p>

                                                <p className="text-xs text-zinc-400">
                                                    {job.category}
                                                </p>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            {job.location}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${job.status === "active"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                                    }`}
                                            >
                                                {job.status}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white">
                                                    <Eye className="h-4 w-4" />
                                                </button>

                                                <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button className="rounded-lg p-2 text-red-400 transition hover:bg-red-600 hover:text-red">
                                                    <Delete className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default RecruiterJobs;