"use client";

import { useState } from "react";
import {
    Button,
    Form,
    TextField,
    TextArea,
    Input,
    Label,
    Select,
    ListBox,
} from "@heroui/react";
import { Pencil, Plus, Xmark, ArrowUpFromLine } from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";

export default function CompanyProfile({ recruiter, recruiterCompany }) {



    const { name, _id } = recruiter;



    const [company, setCompany] = useState(recruiterCompany);
    const [showForm, setShowForm] = useState(false);
    const [industry, setIndustry] = useState(null);
    const [employeeCount, setEmployeeCount] = useState(null);

    const [logoFile, setLogoFile] = useState(null);
    const [logoUrl, setLogoUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be smaller than 5MB");
            return;
        }

        setIsUploading(true);

        const imageData = new FormData();
        imageData.append("image", file);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
                {
                    method: "POST",
                    body: imageData,
                }
            );

            const data = await response.json();

            if (data.success) {
                setLogoUrl(data.data.url);
                setLogoFile(file);
            } else {
                alert("Image upload failed");
            }
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const finalLogoUrl = logoUrl || company?.logo || "";

        const companyData = {
            name: formData.get("name"),
            website: formData.get("website"),
            location: formData.get("location"),
            description: formData.get("description"),
            industry,
            employeeCount,
            logo: finalLogoUrl,
            status: company?.status || "pending",
            recruiterId: recruiter.id
        };

        console.log(companyData);

        const payload = await createCompany(companyData);

        if (payload.insertedId) {
            alert('company created successfully')
        }

        setCompany(companyData);
        setShowForm(false);
    };

    const triggerClass =
        "flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-[#222] px-4 text-sm text-white outline-none";

    const popoverClass =
        "rounded-xl border border-white/10 bg-[#222] p-2 text-white shadow-xl";

    return (
        <main className="min-h-screen bg-black px-4 pb-20 pt-36 text-white">
            <div className="mx-auto max-w-4xl">
                {!company && !showForm && (
                    <div className="rounded-3xl border border-white/10 bg-[#181818] p-10 text-center">
                        <h1 className="text-3xl font-semibold">No Company Registered</h1>
                        <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
                            Register your company before posting jobs on HireLoop.
                        </p>

                        <Button
                            onPress={() => setShowForm(true)}
                            className="mt-8 bg-white px-6 font-semibold text-black"
                        >
                            <Plus className="h-4 w-4" />
                            Register Company
                        </Button>
                    </div>
                )}

                {company && !showForm && (
                    <div className="rounded-3xl border border-white/10 bg-[#181818] p-8">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <img
                                    src={company.logo || "/placeholder-logo.png"}
                                    alt={company.name}
                                    className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
                                />

                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-3xl font-semibold">{company.name}</h1>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${company.status === "approved"
                                                ? "bg-green-500/10 text-green-400"
                                                : company.status === "rejected"
                                                    ? "bg-red-500/10 text-red-400"
                                                    : "bg-yellow-500/10 text-yellow-400"
                                                }`}
                                        >
                                            {company.status}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        {company.industry} · {company.location}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onPress={() => setShowForm(true)}
                                variant="bordered"
                                className="border-white/10 text-white"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit
                            </Button>
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <Info label="Website" value={company.website} />
                            <Info label="Employee Count" value={company.employeeCount} />
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                            <p className="text-sm text-zinc-400">Description</p>
                            <p className="mt-2 text-zinc-200">{company.description}</p>
                        </div>
                    </div>
                )}

                {showForm && (
                    <div className="rounded-3xl border border-white/10 bg-[#181818] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-white/10 p-8">
                            <div>
                                <h1 className="text-3xl font-semibold">
                                    {company ? "Edit Company" : "Register New Company"}
                                </h1>
                                <p className="mt-2 text-sm text-zinc-400">
                                    Enter your business details to start hiring on HireLoop.
                                </p>
                            </div>

                            <button onClick={() => setShowForm(false)}>
                                <Xmark className="h-6 w-6 text-zinc-400" />
                            </button>
                        </div>

                        <Form onSubmit={handleSubmit} className="space-y-8 p-8">
                            <div className="grid gap-6 md:grid-cols-2">
                                <TextField isRequired name="name" defaultValue={company?.name}>
                                    <Label className="mb-2 block text-sm text-zinc-300">
                                        Company Name
                                    </Label>
                                    <Input
                                        placeholder="e.g. Acme Corp"
                                        className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                    />
                                </TextField>

                                <Select
                                    selectedKey={industry}
                                    onSelectionChange={setIndustry}
                                    placeholder="Select industry"
                                    className="w-full"
                                >
                                    <Label className="mb-2 block text-sm text-zinc-300">
                                        Industry / Category
                                    </Label>
                                    <Select.Trigger className={triggerClass}>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className={popoverClass}>
                                        <ListBox>
                                            {["Technology", "Design", "Marketing", "Sales", "Finance"].map(
                                                (item) => (
                                                    <ListBox.Item key={item} id={item} textValue={item}>
                                                        {item}
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                )
                                            )}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                <TextField name="website" defaultValue={company?.website}>
                                    <Label className="mb-2 block text-sm text-zinc-300">
                                        Website URL
                                    </Label>
                                    <Input
                                        placeholder="https://company.com"
                                        className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                    />
                                </TextField>

                                <TextField isRequired name="location" defaultValue={company?.location}>
                                    <Label className="mb-2 block text-sm text-zinc-300">
                                        Location
                                    </Label>
                                    <Input
                                        placeholder="City, Country"
                                        className="w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                    />
                                </TextField>

                                <Select
                                    selectedKey={employeeCount}
                                    onSelectionChange={setEmployeeCount}
                                    placeholder="Select employee count"
                                    className="w-full"
                                >
                                    <Label className="mb-2 block text-sm text-zinc-300">
                                        Employee Count Range
                                    </Label>
                                    <Select.Trigger className={triggerClass}>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className={popoverClass}>
                                        <ListBox>
                                            {[
                                                "1-10 employees",
                                                "11-50 employees",
                                                "51-200 employees",
                                                "201-500 employees",
                                                "500+ employees",
                                            ].map((item) => (
                                                <ListBox.Item key={item} id={item} textValue={item}>
                                                    {item}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                <div>
                                    <Label className="mb-2 block text-sm text-zinc-300">
                                        Company Logo
                                    </Label>

                                    <label className="flex cursor-pointer items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-[#222]">
                                            {logoUrl ? (
                                                <img
                                                    src={logoUrl}
                                                    alt="Logo Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : company?.logo ? (
                                                <img
                                                    src={company.logo}
                                                    alt="Company Logo"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <ArrowUpFromLine className="h-5 w-5 text-zinc-300" />
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium">
                                                {isUploading ? "Uploading..." : "Upload image"}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                PNG, JPG up to 5MB
                                            </p>
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg"
                                            className="hidden"
                                            onChange={handleLogoUpload}
                                        />
                                    </label>
                                </div>
                            </div>

                            <TextField name="description" defaultValue={company?.description}>
                                <Label className="mb-2 block text-sm text-zinc-300">
                                    Brief Description
                                </Label>
                                <TextArea
                                    placeholder="Tell us about your company's mission and culture..."
                                    className="min-h-32 w-full rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                />
                            </TextField>

                            <div className="flex justify-end gap-4 border-t border-white/10 pt-8">
                                <Button
                                    type="button"
                                    variant="bordered"
                                    onPress={() => setShowForm(false)}
                                    className="border-white/10 text-white"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isUploading}
                                    className="bg-white px-8 font-semibold text-black disabled:opacity-50"
                                >
                                    {company ? "Update Company" : "Register Company"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </main>
    );
}

function Info({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="mt-2 font-medium text-white">{value || "Not provided"}</p>
        </div>
    );
}