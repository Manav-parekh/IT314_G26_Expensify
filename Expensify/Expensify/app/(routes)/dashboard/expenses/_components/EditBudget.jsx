"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Updated import path
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Updated import path
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input"; // Updated import path
import { db } from "@/utils/dbConfig"; // Updated import path
import { Budgets } from "@/utils/schema"; // Updated import path
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || '🎯');  // Default to a target emoji
  const [openEmojiPicker, setEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name || ''); // Default to empty if no name exists
  const [amount, setAmount] = useState(budgetInfo?.amount || ''); // Default to empty or previous amount
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    // Ensure amount is a valid number, fallback to 0 if it's invalid
    const validAmount = amount ? parseFloat(amount) : 0;

    // Update the budget even if no changes
    const result = await db.update(Budgets).set({
      name: name,
      amount: validAmount,  // Ensure the amount is a valid number
      icon: emojiIcon,
    }).where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast("Budget Updated!");
      setOpenDialog(false); // Close the dialog after updating the budget
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="flex gap-2" onClick={() => setOpenDialog(true)}><PenBox /> Edit</Button>
        </DialogTrigger>

        <DialogContent className="bg-[#1a1a1a] text-white rounded-lg shadow-xl p-6 w-full md:w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">Update Budget</DialogTitle>
            <DialogDescription className="mt-4 text-center text-white">
              <div className="relative">
                <Button
                  variant="outline"
                  className="text-lg text-white border-white hover:bg-[#444] focus:ring-2 focus:ring-white mx-auto"
                  onClick={() => setEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-20 mt-2">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setEmojiPicker(false);
                      }}
                      theme="dark" // Setting dark theme for the emoji picker
                    />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h2 className="font-medium my-1 text-lg text-center">Budget Name</h2>
                <Input
                  placeholder="e.g. Home Decor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#333] text-white border-[#555] focus:ring-2 focus:ring-white placeholder-gray-400 w-full p-3 rounded-md"
                />
              </div>
              <div className="mt-4">
                <h2 className="font-medium my-1 text-lg text-center">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. 5000$"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#333] text-white border-[#555] focus:ring-2 focus:ring-white placeholder-gray-400 w-full p-3 rounded-md"
                />
              </div>
              <Button
                onClick={() => onUpdateBudget()}
                className="mt-5 w-full bg-[#3a3a3a] text-white hover:bg-[#555] p-3 rounded-md"
              >
                Update Budget
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
