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
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);     
    const [amount, setAmount] = useState(budgetInfo?.amount);  
    const { user } = useUser();

    // Update state when `budgetInfo` changes
    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo.icon);
            setName(budgetInfo.name);
            setAmount(budgetInfo.amount);
        }
    }, [budgetInfo]);

    const onUpdateBudget = async () => {
        const result = await db
            .update(Budgets)
            .set({
                name: name,
                amount: amount,
                icon: emojiIcon
            })
            .where(eq(Budgets.id, budgetInfo.id))
            .returning();

        if (result) {
            refreshData(); // Refresh the parent component data
            toast('Budget Updated!');
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2 text-white-200 bg-blue-700 hover:bg-blue-800"><PenBox /> Edit</Button>
                </DialogTrigger>
                <DialogContent 
                    className="w-full max-w-md mx-auto p-6 bg-[#121212] text-gray-300 rounded-lg shadow-lg"
                    style={{
                        position: "fixed",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, -15%)",
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className="text-gray-100">Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5 flex flex-col items-start">
                                <div 
                                    className="border border-gray-600 p-3 rounded-md text-4xl cursor-pointer mb-2 bg-[#1f1f1f] text-gray-100"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </div>
                                {openEmojiPicker && (
                                    <div className="absolute z-10">
                                        <EmojiPicker
                                            theme="dark"
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="mt-3 w-full">
                                    <h2 className="text-gray-400 font-medium mb-1 text-left">Budget Name</h2>
                                    <input 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Home Decor"
                                        className="w-full p-2 bg-[#1f1f1f] text-gray-200 placeholder-gray-500 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mt-3 w-full">
                                    <h2 className="text-gray-400 font-medium mb-1 text-left">Budget Amount</h2>
                                    <input 
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="e.g. Rs. 5000"
                                        className="w-full p-2 bg-[#1f1f1f] text-gray-200 placeholder-gray-500 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <Button
                                    disabled={!(name && amount)}
                                    onClick={onUpdateBudget}
                                    className={`mt-5 w-full bg-blue-600 hover:bg-blue-500 text-white`}
                                >
                                    Update Budget
                                </Button>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditBudget;
