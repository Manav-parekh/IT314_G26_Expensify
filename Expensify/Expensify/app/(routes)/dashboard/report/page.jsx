"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig.jsx";
import { Budgets, Expenses } from "@/utils/schema.jsx";
import { eq, sql } from "drizzle-orm";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ReportsPage() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [pieChartData, setPieChartData] = useState(null);
  const [analysisReport, setAnalysisReport] = useState(null); // Analysis report data

  useEffect(() => {
    if (expensesList.length > 0) {
      generatePieChart(expensesList);
    }
  }, [expensesList]);

  useEffect(() => {
    if (user) {
      fetchReportsData();
    }
  }, [user]);

  const fetchReportsData = async () => {
    const budgetResult = await db
      .select({
        id: Budgets.id,
        name: Budgets.name,
        amount: Budgets.amount,
        totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    const expenseResult = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        budgetId: Expenses.budgetId,
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    setBudgetList(budgetResult);
    setExpensesList(expenseResult);

    generatePieChart(expenseResult); // Generate pie chart data
  };

  const generatePieChart = (expenses) => {
    const nameSpend = {};

    expenses.forEach((expense) => {
      const name = expense.name;
      if (!nameSpend[name]) {
        nameSpend[name] = 0;
      }
      nameSpend[name] += expense.amount;
    });

    const data = {
      labels: Object.keys(nameSpend),
      datasets: [
        {
          data: Object.values(nameSpend),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#C9CBCF",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#C9CBCF",
          ],
        },
      ],
    };

    setPieChartData(data);
    generateAnalysisReport(nameSpend);
  };

  const generateAnalysisReport = (nameSpend) => {
    const totalSpend = Object.values(nameSpend).reduce(
      (sum, value) => sum + (Number(value) || 0),
      0
    );
  
    const sortedCategories = Object.entries(nameSpend).sort(
      ([, a], [, b]) => Number(b) - Number(a)
    );
  
    const reportData = {
      totalSpend: totalSpend.toFixed(2),
      categories: sortedCategories.map(([name, amount]) => ({
        name,
        amount: Number(amount).toFixed(2), // Ensure `amount` is a number
        percentage: ((Number(amount) / totalSpend) * 100).toFixed(2),
      })),
      topCategory:
        sortedCategories.length > 0
          ? {
              name: sortedCategories[0][0],
              amount: Number(sortedCategories[0][1]).toFixed(2),
              percentage: (
                (Number(sortedCategories[0][1]) / totalSpend) *
                100
              ).toFixed(2),
            }
          : null,
    };
  
    setAnalysisReport(reportData);
  };
  

  return (
    <div className="p-10 bg-gradient-to-b from-black via-gray-900 to-gray-950 min-h-screen">
      <h2 className="font-bold text-4xl text-white mb-2">Reports & Analysis 📊</h2>
      <p className="text-gray-400 mb-8">
        Gain insights into your spending and make informed financial decisions.
      </p>

      {/* Remove CardInfo here */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-white mb-4 text-center">Expense Distribution</h3>
          {pieChartData ? (
            <Pie data={pieChartData} />
          ) : (
            <p className="text-gray-400 text-center">Loading chart...</p>
          )}
        </div>

        {/* Analysis Report */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-white mb-4 text-center">Spending Analysis</h3>
          {analysisReport ? (
            <div>
              {/* Total Spending */}
              <div className="mb-4">
                <span className="font-bold text-lg text-white">Total Spending: </span>
                <span className="text-yellow-400">₹{analysisReport.totalSpend}</span>
              </div>

              {/* Categories Table */}
              <table className="table-auto w-full text-gray-400 mb-6">
              <thead>
                    <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 w-1/12 text-center">#</th>
                    <th className="py-3 px-4 w-5/12 text-left">Category</th>
                    <th className="py-3 px-4 w-3/12 text-right">Amount</th>
                    <th className="py-3 px-4 w-3/12 text-right">% of Total</th>
                    </tr>
                </thead>
                <tbody>
                  {analysisReport.categories.map((category, index) => (
                    <tr key={category.name} className="border-b border-gray-700">
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-left">{category.name}</td>
                      <td className="py-2 px-4 text-right">₹{category.amount}</td>
                      <td className="py-2 px-4 text-right">{category.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Top Spending Category */}
              {analysisReport.topCategory && (
                <div>
                  <div className="font-bold text-lg text-white">
                    Highest Spending:{" "}
                    <span className="text-yellow-400">
                      {analysisReport.topCategory.name}
                    </span>{" "}
                    (₹{analysisReport.topCategory.amount},{" "}
                    {analysisReport.topCategory.percentage}%)
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Consider optimizing this category if it's not essential.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400">Loading analysis...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
