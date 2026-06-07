import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/company';

const CompanyPage = async () => {

    const user = await getUserSession();
    const recruiterId = user?.id;
    const recruiterCompany = await getRecruiterCompany(recruiterId);
    console.log('neeee', recruiterCompany)


    console.log('khaaa', user)
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={recruiterCompany} ></CompanyProfile>
        </div>
    );
};

export default CompanyPage;