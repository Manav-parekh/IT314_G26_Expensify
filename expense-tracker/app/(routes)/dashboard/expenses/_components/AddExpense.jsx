"use client";
import React, { useState } from "react";
import { Button } from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/@/components/ui/button";
import {db} from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/dbConfig.jsx";
import { Budgets,Expenses } from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/schema.jsx"; 
import { toast } from "sonner";
import moment from 'moment';
import { eq } from "drizzle-orm";

function AddExpense({ budgetId, user, refreshData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
  
    const PAYMENT_METHODS = [
      'Cash',
      'Credit',
      'Debit',
      'UPI',
      'Cheque'
    ];
  
    const sendNotification = async (budgetName, budgetLimit, currentTotal) => {
      try {
        const response = await fetch('/sendEmail.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user?.primaryEmailAddress?.emailAddress,
            subject: 'Budget Exceeded Alert',
            
          }),
        });
  
        if (response.ok) {
          toast.success('Notification sent successfully!');
        } 
      } catch (error) {
        console.error('Error sending notification:', error);
        toast.error('Error sending notification.');
      }
    };
  
    // Function to add a new expense
    const addNewExpense = async () => {
      // Validate the form data
      if (!name || !amount || !paymentMethod) {
        toast.error("Please fill out all fields.");
        return;
      }

      console.log('Adding expense with:', { name, amount, paymentMethod, budgetId }); // Log inputs

      try {
        const result = await db.insert(Expenses).values({
          name: name,
          amount: Number(amount),
          budgetId: Number(budgetId),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().toDate(),
          payment_method: paymentMethod,
        }).returning({ insertedId: Expenses.id });

        console.log('Expense added:', result); // Log the result of the insert operation

        if (result) {
          refreshData();

          // Fetch the budget details
          const budget = await db
            .select({
              name: Budgets.name,
              amount: Budgets.amount, // Field to track the budget amount
            })
            .from(Budgets)
            .where(eq(Budgets.id, Number(budgetId))); // Corrected query

          if (budget.length > 0) {
            const { name: budgetName, amount: budgetLimit } = budget[0];
            const currentTotal = budget[0].amount; // Assuming you track the total in the 'amount' field

            // Check if the budget is exceeded
            if (currentTotal + Number(amount) > budgetLimit) {
              await sendNotification(budgetName, budgetLimit, currentTotal + Number(amount));
            }
          }

          setName('');
          setAmount('');
          setPaymentMethod('Cash');
          toast.success("New Expense Added!");
        }
      } catch (error) {
        console.error('Error adding expense:', error);
        toast.error(`Failed to add expense: ${error.message || 'Unknown error'}`);
      }
    };
  
    return (
      <div className="border bg-[#121212] p-5 rounded-lg text-gray-300">
        <h2 className="font-bold text-lg mb-4 text-gray-100">Add New Expense</h2>
  
        <div className="space-y-4">
          <div>
            <h2 className="text-gray-400 font-medium my-1">Expense Name</h2>
            <input
              placeholder="e.g. Bedroom Decor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#3a3a3a] text-gray-200 placeholder-gray-500 rounded-lg p-2 w-full"
            />
          </div>
  
          <div>
            <h2 className="text-gray-400 font-medium my-1">Expense Amount</h2>
            <input
              type="number"
              placeholder="e.g. Rs.1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#3a3a3a] text-gray-200 placeholder-gray-500 rounded-lg p-2 w-full"
            />
          </div>
  
          <div>
            <h2 className="text-gray-400 font-medium my-1">Payment Method</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="bg-[#3a3a3a] text-gray-200 rounded-lg p-2 w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
  
          <Button 
            disabled={!(name && amount && paymentMethod)} 
            onClick={addNewExpense}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white"
          >
            Add New Expense
          </Button>
        </div>
      </div>
    );
  }
  

export default AddExpense;
