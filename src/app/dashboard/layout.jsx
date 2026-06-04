import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className='pt-40 pb-20 flex items-start min-h-screen'>
            <DashboardSidebar></DashboardSidebar>
            <div className='flex-1'>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;