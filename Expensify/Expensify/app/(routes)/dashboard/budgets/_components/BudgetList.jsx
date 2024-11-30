"use client";

import React, { useEffect, useState } from 'react';
import CreateBudget from "@/app/(routes)/dashboard/budgets/_components/CreateBudget"; // Updated import path
import { db } from "@/utils/dbConfig"; // Updated import path based on alias
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema"; // Updated import path
import { useUser } from "@clerk/nextjs";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem"; // Updated import path


function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("Logged-in user: ", user);  // Log user data for debugging
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    if (!user) return;
  
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      paymentMethod: sql`array_agg(${Expenses.payment_method})`.mapWith(String),
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);
  
    console.log("Budget List: ", result);
    setBudgetList(result);
  };
  
  return (
    <div className="mt-7 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full">
        <CreateBudget refreshData={getBudgetList} />
        {budgetList.length ? (
          budgetList.map((budget) => <BudgetItem key={budget.id} budget={budget} />)
        ) : (
          <div className="w-full bg-[#2d2d2d] rounded-lg h-[150px] animate-pulse"></div>
        )}
      </div>
    </div>
  );
}

export default BudgetList;
