import React from 'react';
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';

function CardInfo({ budgetList, totalBudget, totalSpent, numOfBudgets }) {
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="p-7 border rounded-lg flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">${totalBudget}</h2>
        </div>
        <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
        <div>
          <h2 className="text-sm">Total Spend</h2>
          <h2 className="font-bold text-2xl">${totalSpent}</h2>
        </div>
        <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
        <div>
          <h2 className="text-sm">No. of Budgets</h2>
          <h2 className="font-bold text-2xl">{numOfBudgets}</h2>
        </div>
        <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>
    </div>
  );
}

export default CardInfo;
