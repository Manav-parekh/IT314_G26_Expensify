"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";

const Page = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [latestExpenses, setLatestExpenses] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user?.id) return;

      try {
        // Fetch expenses for the current user
        const expensesData = await db
          .select()
          .from(Expenses)
          .where(Expenses.userId, user.id); // Correct syntax for Drizzle ORM
        
        setLatestExpenses(expensesData); // Store the fetched data in the state
      } catch (error) {
        console.error("Error fetching expenses:", error);
        toast.error("Failed to fetch expenses");
      }
    };

    fetchExpenses();
  }, [user]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadPDF = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Normalize start and end dates to full day range
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    // Filter expenses based on selected date range and user ID
    const filteredByDate = latestExpenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);

      if (isNaN(expenseDate.getTime())) {
        console.error("Invalid expense date:", expense.createdAt);
        return false;
      }

      expenseDate.setHours(0, 0, 0, 0);
      return expenseDate >= start && expenseDate <= end;
    });

    if (filteredByDate.length === 0) {
      toast.error("No expenses found for the selected date range.");
      return;
    }

    const doc = new jsPDF();

    // Add title and date range
    doc.setFontSize(20);
    doc.text("Expense Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`From: ${start.toLocaleDateString()}`, 20, 30);
    doc.text(`To: ${end.toLocaleDateString()}`, 20, 40);

    // Table headers
    doc.setFontSize(12);
    doc.text("Name", 20, 50);
    doc.text("Amount", 60, 50);
    doc.text("Date", 120, 50);
    doc.text("Payment Method", 160, 50);

    let y = 60;
    let total = 0;

    filteredByDate.forEach((expense) => {
      doc.text(expense.name, 20, y);
      doc.text(formatAmount(expense.amount), 60, y);
      doc.text(new Date(expense.createdAt).toLocaleDateString(), 120, y);
      doc.text(expense.payment_method || "Unknown", 160, y);
      total += expense.amount;
      y += 10;
    });

    // Add total expenses
    doc.setFontSize(14);
    doc.text(`Total Expenses: ${formatAmount(total)}`, 20, y + 10);

    // Save the PDF
    doc.save("expense_report.pdf");
    toast.success("Expense report downloaded successfully!");
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0b234a] text-white">
      <h2 className="font-bold text-3xl mb-6 text-center">Download Expense Report</h2>

      <div className="flex flex-col items-center mt-6 space-y-6">
        <div className="flex space-x-6">
          <input
            type="date"
            className="px-4 py-2 border rounded-lg text-black bg-white shadow-md focus:outline-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="px-4 py-2 border rounded-lg text-black bg-white shadow-md focus:outline-none"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition duration-300"
        >
          Download PDF
        </button>
      </div>

      {/* Optionally, display the list of expenses on the page */}
      <div className="mt-8">
        <h3 className="text-2xl mb-4">Latest Expenses</h3>
        <ul className="space-y-4">
          {latestExpenses.map((expense) => (
            <li key={expense.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {expense.name}</p>
              <p><strong>Amount:</strong> {formatAmount(expense.amount)}</p>
              <p><strong>Date:</strong> {new Date(expense.createdAt).toLocaleDateString()}</p>
              <p><strong>Payment Method:</strong> {expense.payment_method || "Unknown"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
