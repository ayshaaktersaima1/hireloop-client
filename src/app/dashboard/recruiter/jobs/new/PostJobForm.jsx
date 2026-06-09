"use client";

import { useState } from "react";
import {
    Button,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    ListBox,
    Select,
    TextArea,
    TextField,
} from "@heroui/react";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobForm({ company }) {
    const [isRemote, setIsRemote] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [jobType, setJobType] = useState(null);
    const [currency, setCurrency] = useState(null);

    // const [company] = useState({
    //     name: "Acme Corp (Auto-filled)",
    //     id: "company_123",
    //     isApproved: true,
    // });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        // if (!company.isApproved) {
        //     setLoading(false);
        //     alert("Your company profile must be approved before you can post jobs.");
        //     return;
        // }

        const formData = new FormData(e.currentTarget);

        const jobData = {
            title: formData.get("title"),
            category: formData.get("category"),
            type: jobType,
            salaryMin: formData.get("salaryMin"),
            salaryMax: formData.get("salaryMax"),
            currency: currency,
            location: isRemote ? "Remote" : formData.get("location"),
            isRemote,
            deadline: formData.get("deadline"),
            responsibilities: formData.get("responsibilities"),
            requirements: formData.get("requirements"),
            benefits: formData.get("benefits"),

            companyId: company._id,
            companyName: company.name,
            companyLogo: company.logo,


            status: "active",
            isPubliclyVisible: true,
        };

        console.log(jobDataa);

        const res = await createJob(jobData);

        if (res.insertedId) {
            setLoading(false);
            setMessage("Job posted successfully.");
            alert("Job posted successfully");
            redirect("/dashboard/recruiter/jobs");
        }

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-black px-4 pb-20 pt-36 text-white">
            <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#181818] shadow-2xl">
                <div className="border-b border-white/10 p-8">
                    <h1 className="text-3xl font-semibold">Post a New Job</h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Create a public job listing for your approved company.
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-400">
                        Posting as:
                        <span className="font-semibold text-zinc-200">
                            {company.name}
                        </span>

                        <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">
                            Approved
                        </span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-10 p-8">
                    <Fieldset className="space-y-6">
                        <h2 className="text-xl font-semibold">Job Info</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <TextField isRequired name="title">
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Job Title
                                </Label>
                                <Input
                                    placeholder="e.g. Frontend Developer"
                                    className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                />
                                <FieldError className="mt-1 text-xs text-red-400" />
                            </TextField>

                            <TextField isRequired name="category">
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Job Category
                                </Label>
                                <Input
                                    placeholder="e.g. Engineering"
                                    className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                />
                                <FieldError className="mt-1 text-xs text-red-400" />
                            </TextField>

                            <Select
                                selectedKey={jobType}
                                onSelectionChange={(key) => setJobType(key)}
                                placeholder="Select job type"
                                className="w-full"
                            >
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Job Type
                                </Label>

                                <Select.Trigger className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover className="rounded-xl border border-white/10 bg-[#222] p-2 text-white shadow-xl">
                                    <ListBox>
                                        <ListBox.Item id="full-time" textValue="Full-time">
                                            Full-time
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="part-time" textValue="Part-time">
                                            Part-time
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item id="contract" textValue="Contract">
                                            Contract
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="internship" textValue="Internship">
                                            Internship
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select
                                selectedKey={currency}
                                onSelectionChange={(key) => setCurrency(key)}
                                placeholder="Select currency"
                                className="w-full"
                            >
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Currency
                                </Label>

                                <Select.Trigger className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover className="rounded-xl border border-white/10 bg-[#222] p-2 text-white shadow-xl">
                                    <ListBox>
                                        <ListBox.Item id="USD" textValue="USD">
                                            USD
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="BDT" textValue="BDT">
                                            BDT
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="EUR" textValue="EUR">
                                            EUR
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <TextField isRequired name="salaryMin" type="number">
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Minimum Salary
                                </Label>
                                <Input
                                    placeholder="50000"
                                    className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                />
                                <FieldError className="mt-1 text-xs text-red-400" />
                            </TextField>

                            <TextField isRequired name="salaryMax" type="number">
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Maximum Salary
                                </Label>
                                <Input
                                    placeholder="90000"
                                    className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                />
                                <FieldError className="mt-1 text-xs text-red-400" />
                            </TextField>

                            <TextField isRequired={!isRemote} name="location">
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Location
                                </Label>
                                <Input
                                    disabled={isRemote}
                                    placeholder="City, Country"
                                    className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 disabled:opacity-50"
                                />
                                <FieldError className="mt-1 text-xs text-red-400" />
                            </TextField>

                            <TextField isRequired name="deadline" type="date">
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Application Deadline
                                </Label>
                                <Input className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none" />
                                <FieldError className="mt-1 text-xs text-red-400" />
                            </TextField>
                        </div>

                        <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-zinc-300">
                            <input
                                type="checkbox"
                                checked={isRemote}
                                onChange={(e) => setIsRemote(e.target.checked)}
                                className="h-4 w-4 accent-[#665cff]"
                            />
                            This is a remote job
                        </label>
                    </Fieldset>

                    <Fieldset className="space-y-6">
                        <h2 className="text-xl font-semibold">Job Description</h2>

                        <TextField isRequired name="responsibilities">
                            <Label className="mb-2 block text-sm text-zinc-300">
                                Responsibilities
                            </Label>
                            <TextArea
                                placeholder="Describe the main responsibilities..."
                                className="min-h-32 w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                            />
                            <FieldError className="mt-1 text-xs text-red-400" />
                        </TextField>

                        <TextField isRequired name="requirements">
                            <Label className="mb-2 block text-sm text-zinc-300">
                                Requirements
                            </Label>
                            <TextArea
                                placeholder="List required skills, experience, and qualifications..."
                                className="min-h-32 w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                            />
                            <FieldError className="mt-1 text-xs text-red-400" />
                        </TextField>

                        <TextField name="benefits">
                            <Label className="mb-2 block text-sm text-zinc-300">
                                Benefits Optional
                            </Label>
                            <TextArea
                                placeholder="Mention salary perks, remote benefits, insurance, bonuses..."
                                className="min-h-28 w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                            />
                        </TextField>
                    </Fieldset>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                        <h3 className="font-semibold">Company</h3>

                        <p className="mt-2 text-sm text-zinc-400">
                            This job will be posted under{" "}
                            <span className="font-medium text-white">
                                {company.name}
                            </span>
                            .
                        </p>

                        <p className="mt-1 text-xs text-green-400">
                            Company ID: {company.id}
                        </p>
                    </div>

                    {message && (
                        <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                            {message}
                        </div>
                    )}

                    <div className="flex justify-end gap-4 border-t border-white/10 pt-8">
                        <Button
                            type="button"
                            variant="bordered"
                            className="border-white/10 text-white"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="bg-white px-8 font-semibold text-black"
                        >
                            Post Job
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}