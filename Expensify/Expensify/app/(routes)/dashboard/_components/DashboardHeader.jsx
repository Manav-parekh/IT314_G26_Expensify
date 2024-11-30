import { UserButton } from '@clerk/nextjs';
import React from 'react';

function DashboardHeader({ userName, totalBudget, totalExpense }) {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      <div>
        <h2 className='text-xl font-semibold text-white'>
          Hi, {userName}!
        </h2>
        <div className='mt-2 text-sm text-gray-300'>
          <span>Total Budget: ${totalBudget.toFixed(2)}</span> | 
          <span className='ml-2'>Total Spent: ${totalExpense.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
