"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Search the Dictionary
export async function searchFoodItems(query: string) {
  return await prisma.foodItem.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
    take: 5,
  });
}

// 2. Log a Meal & Trigger a Live Refresh
export async function logMeal(data: { foodItemId: string; quantityConsumed: number }) {
  await prisma.foodLogEntry.create({
    data: {
      foodItemId: data.foodItemId,
      quantityConsumed: data.quantityConsumed,
    },
  });

  // This Next.js magic tells the browser to instantly refresh the data on the screen!
  revalidatePath("/");
  revalidatePath("/metrics");
}

// 3. Get Today's Logs for the Diary & Metrics
export async function getTodayLogs() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  return await prisma.foodLogEntry.findMany({
    where: {
      dateLogged: { gte: today },
    },
    include: {
      foodItem: true, // Pulls in the macros from the master dictionary
    },
    orderBy: {
      dateLogged: "desc",
    },
  });
}