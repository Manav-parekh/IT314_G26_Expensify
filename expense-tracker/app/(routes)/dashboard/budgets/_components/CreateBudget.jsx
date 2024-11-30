"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/@/components/ui/dialog.jsx";
import EmojiPicker from "emoji-picker-react";
import {db} from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/dbConfig.jsx";
import { Budgets,Expenses } from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/schema.jsx"; 
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Button } from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/@/components/ui/alert";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😄");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // Control dialog state
  const { user } = useUser();

  const onCreateBudget = async () => {
    try {
      const result = await db.insert(Budgets)
        .values({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        refreshData();
        toast("New Budget Created!");
        setOpenDialog(false); // Close dialog after creation
      } else {
        toast("Failed to create budget.");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast("An error occurred while creating the budget.");
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div
            className="bg-[#2d2d2d] p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md"
            onClick={() => setOpenDialog(true)} // Open dialog on click
          >
            <h2 className="text-3xl text-white">+</h2>
            <h2 className="text-white">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent
          className="w-full max-w-md mx-auto p-6 bg-[#1a1a1a] rounded-lg shadow-lg text-white"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">
              Create New Budget
            </DialogTitle>
            <DialogDescription className="mt-5 flex flex-col items-center">
              <div className="relative">
                <Button
                  variant="outline"
                  className="text-4xl border border-gray-400 rounded-md p-3 text-white hover:bg-[#444] focus:ring-2 focus:ring-white"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-10 mt-2">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                      theme="dark"
                    />
                  </div>
                )}
              </div>
              <div className="mt-5 w-full">
                <h2 className="text-left font-medium mb-1 text-lg">Budget Name</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Home Decor"
                  className="w-full bg-[#333] text-white border-[#555] placeholder-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-5 w-full">
                <h2 className="text-left font-medium mb-1 text-lg">Budget Amount</h2>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. Rs.5000"
                  className="w-full bg-[#333] text-white border-[#555] placeholder-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full bg-[#3a3a3a] text-white hover:bg-[#555] rounded-md p-3"
              >
                Create Budget
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
