"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR"); // Default currency is Rupee
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUser();

  // Currency conversion rates
  const currencyRates = {
    INR: 82, // Example: 1 USD = 82 INR
    USD: 1,  // Base currency
    EUR: 0.92, // Example: 1 USD = 0.92 EUR
    GBP: 0.81, // Example: 1 USD = 0.81 GBP
    JPY: 145.75, // Example: 1 USD = 145.75 JPY
  };

  // Function to convert the amount to USD
  const convertToUSD = (amount, currency) => {
    if (!currencyRates[currency]) {
      toast("Unsupported currency selected.");
      return amount;
    }
    return Math.round(amount / currencyRates[currency]); // Round to nearest integer
  };
  

  // Function to handle budget creation
  const onCreateBudget = async () => {
    if (!db || !db.insert) {
      toast("Database connection error.");
      return;
    }

    try {
      const convertedAmount = convertToUSD(parseFloat(amount), currency);
      const result = await db.insert(Budgets)
        .values({
          name: name,
          amount: convertedAmount, // Store the amount in USD
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        refreshData();
        toast("New Budget Created!");
        setOpenDialog(false);
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
            onClick={() => setOpenDialog(true)}
          >
            <h2 className="text-3xl text-white">+</h2>
            <h2 className="text-white">Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent className="bg-[#1a1a1a] text-white rounded-lg shadow-xl p-6 w-full md:w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">Create New Budget</DialogTitle>
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
                      theme="dark"
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
              <div className="mt-4">
                <h2 className="font-medium my-1 text-lg text-center">Currency</h2>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-[#333] text-white border-[#555] focus:ring-2 focus:ring-white placeholder-gray-400 w-full p-3 rounded-md"
                >
                  <option value="INR">₹ Rupee (INR)</option>
                  <option value="USD">Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">Pound Sterling (GBP)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                </select>
              </div>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full bg-[#3a3a3a] text-white hover:bg-[#555] p-3 rounded-md"
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
