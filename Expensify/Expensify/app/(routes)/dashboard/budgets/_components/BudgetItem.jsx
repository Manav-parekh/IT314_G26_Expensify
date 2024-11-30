import React from 'react';
import Link from 'next/link';

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => Math.min(100, ((budget.totalSpend / budget.amount) * 100).toFixed(2));

  return (
    <Link href={`/dashboard/expenses/${budget?.id}`} className='p-5 border border-gray-600 rounded-lg hover:shadow-lg cursor-pointer h-[190px] bg-[#121212]'>
      <div>
      <div className='flex justify-between gap-3'>
        <div className="flex gap-3">
          <h2 className='text-3xl p-2 bg-[#2d2d2d] text-white rounded-full'>{budget?.icon}</h2>
          <div>
            <h2 className='font-bold text-white'>{budget?.name}</h2>
            <h2 className='font-semibold text-gray-500'>{budget?.totalItem} Items</h2>
          </div>
        </div>
        <h2 className='font-bold text-[#3498db] text-lg'>${budget?.totalSpend || 0}</h2>
      </div>
      <div className='mt-5'>
        <div className='flex justify-between mb-3 text-xs text-slate-400'>
          <h2>${budget?.totalSpend || 0} Spent</h2>
          <h2>${budget?.amount - (budget?.totalSpend || 0)} Remaining</h2>
        </div>
        <div className='w-full bg-[#2a2a2a] h-2 rounded-full'>
          <div className='bg-[#3498db] h-2 rounded-full' style={{ width: `${calculateProgressPerc()}%` }}></div>
        </div>
      </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
