"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig"; // Updated import path
import { Budgets, Expenses } from "@/utils/schema"; // Updated import path
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable"; // Updated import path
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem"; // Updated import path
import AddExpenses from "@/app/(routes)/dashboard/expenses/_components/AddExpenses"; // Updated import path
import { Button } from "@/components/ui/button"; // Updated import path
import { Trash, ArrowLeft } from "lucide-react";
import EditBudget from "@/app/(routes)/dashboard/expenses/_components/EditBudget"; // Updated import path
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Updated import path
import { toast } from "sonner";
import { useRouter } from "next/navigation";


function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState();
  const [openDialog, setOpenDialog] = useState(false); // Add state for dialog visibility
  const route = useRouter();

  const budgetId = React.use(params).id;

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user]);

  const getExpensesList = async () => {
    try {
      const result = await db.select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, budgetId))
        .orderBy(desc(Expenses.id));
      setExpensesList(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching expenses list:', error);
    }
  };

  const deleteBudget = async () => {
    try {
      const deleteExpenseResult = await db.delete(Expenses)
        .where(eq(Expenses.budgetId, budgetId))
        .returning();

      if (deleteExpenseResult.length >= 0) {
        const result = await db.delete(Budgets)
          .where(eq(Budgets.id, budgetId))
          .returning();
        console.log(result);
        toast("Budget Deleted !");
        route.replace('/dashboard/budgets');
        setOpenDialog(false); // Close the dialog after successful deletion
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const getBudgetInfo = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        expenseNames: sql`array_agg(${Expenses.name})`.mapWith(String),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, Number(budgetId)))
      .groupBy(Budgets.id);

      if (result.length >= 0) {
        setBudgetInfo(result[0]);
        getExpensesList();
      }
    } catch (error) {
      console.error('Error fetching budget info:', error);
    }
  };

  if (!user) {
    return (
      <div className='p-10'>
        <div className='h-[150px] w-full bg-slate-800 rounded-lg animate-pulse'></div>
      </div>
    );
  }

  return (
    <div className='p-10 bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen text-gray-200'>
      <h2 className='text-2xl font-bold flex justify-between items-center mb-4'>
        <div className="flex items-center gap-3">
          <Button
            className="flex items-center justify-center text-white hover:text-gray-200 focus:outline-none"
            onClick={() => route.push('/dashboard/budgets')}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          {budgetInfo && budgetInfo.name ? budgetInfo.name : 'Loading...'}
        </div>
        
        <div className='flex gap-2 items-center'>
          <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()} />
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 text-white bg-red-600 hover:bg-red-700" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription >
                  This action cannot be undone. This will permanently delete your current budget along with expenses
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex justify-between items-center gap-4 w-full">
                <button
                  className="text-white text-xl cursor-pointer"
                  onClick={() => setOpenDialog(false)}  // Close the dialog when clicked
                >
                  &times; {/* Close icon */}
                </button>
                <AlertDialogAction 
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
                  onClick={deleteBudget}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className='h-[150px] w-full bg-slate-800 rounded-lg animate-pulse'></div>
        )}

        <AddExpenses 
          budgetId={budgetId}
          user={user}
          refreshData={getBudgetInfo}
        />
      </div>
      
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable 
          expensesList={expensesList}
          refreshData={getBudgetInfo}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
