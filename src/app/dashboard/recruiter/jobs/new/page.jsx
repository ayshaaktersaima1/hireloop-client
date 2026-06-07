import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';

const PostJobPage = async () => {

    const company = await getLoggedInRecruiterCompany();
    console.log('infp', company)
    return (
        <div>
            <PostJobForm company={company}></PostJobForm>
        </div>
    );
};

export default PostJobPage;