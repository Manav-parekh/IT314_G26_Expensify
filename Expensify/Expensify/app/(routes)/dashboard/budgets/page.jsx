"use client";

import React from 'react';
import BudgetList from "@/app/(routes)/dashboard/budgets/_components/BudgetList"; // Updated import path


function Budget() {
  return (
    <div className='p-10 bg-gradient-to-b from-black via-gray-900 to-gray-950'>
        <h2 className='font-bold text-3xl text-white'>My Budget</h2>
        <BudgetList/>
    </div>
  )
}

export default Budget
