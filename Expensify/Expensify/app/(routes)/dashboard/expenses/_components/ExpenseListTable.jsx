import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

function ExpenseListTable({ expensesList = [], refreshData }) {
  const [currency, setCurrency] = useState('USD');
  const [sortBy, setSortBy] = useState('date');

  // Shared conversion rates between components
  const conversionRates = {
    USD: 1,
    EUR: 0.92,  // 1 USD = 0.92 EUR
    GBP: 0.81,  // 1 USD = 0.81 GBP
    INR: 82.5,  // 1 USD = 82.5 INR
    JPY: 150.0, // 1 USD = 150 JPY
  };

  const deleteExpense = async (expense) => {
    try {
      const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast.success('Expense Deleted Successfully!');
        refreshData();
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amountInCents) => {
    // Convert from cents to dollars
    const amountInUSD = amountInCents / 100;
    
    // Convert USD to selected currency
    const convertedAmount = amountInUSD * conversionRates[currency];
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(convertedAmount);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Sorting logic
  const sortedExpenses = [...expensesList].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return 0;
  });

  return (
    <div className="mt-3 bg-gradient-to-b from-black via-gray-800 to-gray-950 p-3 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-white">Expenses</h2>
        <div>
          <select
            className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
            value={currency}
            onChange={handleCurrencyChange}
          >
            {Object.keys(conversionRates).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
          
          <select
            className="px-4 py-2 bg-blue-600 text-white rounded"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-5 bg-gray-800 p-2 rounded-t-md border-none">
        <h2 className="font-bold text-white">Name</h2>
        <h2 className="font-bold text-white">Amount</h2>
        <h2 className="font-bold text-white">Date</h2>
        <h2 className="font-bold text-white">Mode of Payment</h2>
        <h2 className="font-bold text-white">Action</h2>
      </div>
      {sortedExpenses && sortedExpenses.length > 0 ? (
        sortedExpenses.map((expense) => (
          <div key={expense.id} className="grid grid-cols-5 bg-gray-700 p-2 border-none hover:bg-gray-600 transition-colors">
            <h2 className="text-white">{expense.name}</h2>
            <h2 className="text-white">{formatAmount(expense.amount)}</h2>
            <h2 className="text-white">{formatDate(expense.createdAt)}</h2>
            <h2 className="text-white">{expense.payment_method || 'Unknown'}</h2>
            <h2>
              <Trash
                className="text-red-600 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => deleteExpense(expense)}
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="col-span-5 text-center p-4 bg-gray-700 text-white">No expenses found.</div>
      )}
    </div>
  );
}

export default ExpenseListTable;