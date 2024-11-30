"use client"
import React, { use, useEffect, useState } from "react"
import CreateBudget from 'C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/(routes)/dashboard/budgets/_components/CreateBudget.jsx'
import {db} from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/dbConfig.jsx";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets,Expenses } from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/schema.jsx"; 
import { useUser } from "@clerk/nextjs";
import BudgetItem from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/(routes)/dashboard/budgets/_components/BudgetItem.jsx";

function BudgetList() {
    const [budgetList, setbudgetList]=useState([]);
    const { user } = useUser();
    useEffect(() => {
        user && getBudgetList();
    }, [user])
    const getBudgetList = async () => {
        
        const result = await db
            .select({
                ...getTableColumns(Budgets),
                totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
                totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            setbudgetList(result)
            ;
    }
    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2
             lg:grid-cols-3 gap-5">
                <CreateBudget refreshData={()=>getBudgetList()}/>
                {budgetList?.length>0? budgetList.map((budget,index)=>(
                <BudgetItem budget={budget}/>
            ))
            :[1,2,3,4,5].map((item,index)=>(
                <div
                    key={index}
                    className="w-full bg-slate-200 rounded-lg h-44 animate-pulse flex items-center justify-center">
                        <span className="text-slate-400">Loading...</span>
                </div>
            ))
            }
            </div>
        </div>
    )
}
export default BudgetList
