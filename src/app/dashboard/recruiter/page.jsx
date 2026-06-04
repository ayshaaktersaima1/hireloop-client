'use client'
import DashboardStateCard from '@/components/dashboard/StateCard';
import { useSession } from '@/lib/auth-client';
import React from 'react';
import {
    FileText,
    Persons,
    Thunderbolt,
    CircleCheck,
} from "@gravity-ui/icons";

const RecruiterHomepage = () => {

    const { data: session, isPending } = useSession();
    if (isPending) {
        return <div>loading...</div>
    }
    const userName = session?.user?.name;

    const user = session?.user;

    return (
        <div className='text-2xl font-semibold'>
            <p>Welcome Back {userName}</p>


            <div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 p-8">
                    <DashboardStateCard
                        Icon={FileText}
                        title="Total Job Posts"
                        value="48"
                    />

                    <DashboardStateCard
                        Icon={Persons}
                        title="Total Applicants"
                        value="1,284"
                    />

                    <DashboardStateCard
                        Icon={Thunderbolt}
                        title="Active Jobs"
                        value="18"
                    />

                    <DashboardStateCard
                        Icon={CircleCheck}
                        title="Jobs Closed"
                        value="32"
                    />
                </div>
            </div>
        </div>
    );
};

export default RecruiterHomepage;