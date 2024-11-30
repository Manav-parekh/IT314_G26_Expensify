"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "@/app/(routes)/dashboard/_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "@/app/(routes)/dashboard/_components/BarChartDashboard";
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable";
import { toast } from "sonner";

export default function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [numOfBudgets, setNumOfBudgets] = useState(0);
  const [latestExpenses, setLatestExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currency, setCurrency] = useState("USD");
  const { user } = useUser();

  const currencyRates = {
    INR: 82, // Example: 1 USD = 82 INR
    USD: 1,  // Base currency
    EUR: 0.92, // Example: 1 USD = 0.92 EUR
    GBP: 0.81, // Example: 1 USD = 0.81 GBP
    JPY: 145.75, // Example: 1 USD = 145.75 JPY
  };

  useEffect(() => {
    if (user) {
      getBudgetList();
      getLatestExpenses();
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    setTotalBudget(
      result.reduce((acc, budget) => acc + parseFloat(budget.amount), 0)
    );
    setTotalExpense(
      result.reduce((acc, budget) => acc + parseFloat(budget.totalSpend || 0), 0)
    );
    setNumOfBudgets(result.length);
    setBudgetList(result);
  };

  const getLatestExpenses = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const userBudgets = await db
      .select({ id: Budgets.id })
      .from(Budgets)
      .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));

    const expensePromises = userBudgets.map(async (budget) => {
      return await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, budget.id))
        .orderBy(desc(Expenses.createdAt))
        .limit(3);
    });

    const budgetExpenses = await Promise.all(expensePromises);
    setLatestExpenses(budgetExpenses.flat());
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredExpenses = latestExpenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchQuery)
  );

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const formatAmount = (amount) => {
    const conversionRate = currencyRates[currency] || 1;
    const convertedAmount = amount * conversionRate;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  useEffect(() => {
    latestExpenses.forEach((expense) => {
      if (expense.amount > 5000) {
        toast(
          `Alert: High expense detected - ${currency} ${formatAmount(
            expense.amount
          )} on ${expense.name}`
        );
      }
    });
  }, [latestExpenses, currency]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0b234a] text-white">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}!</h2>
      <p className="text-gray-300">
        Here's what's happening with your money. Let's manage your expenses!
      </p>

      <div className="mt-10">
        <CardInfo
          budgetList={budgetList}
          totalBudget={totalBudget}
          totalSpent={totalExpense}
          numOfBudgets={numOfBudgets}
        />
        <div className="mt-6 flex justify-center items-center">
          <div className="w-full max-w-4xl">
            <BarChartDashboard budgetList={budgetList} />
          </div>
        </div>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search expenses..."
            className="px-4 py-2 w-full mb-4 border rounded text-black"
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-xl text-white mb-4">Latest 10 Expenses</h3>
          <ExpenseListTable
            expensesList={filteredExpenses}
            refreshData={getLatestExpenses}
            formatAmount={formatAmount}
          />
        </div>
      </div>
    </div>
  );
}
