"use client";

import { useState } from "react";
import { searchFoodItems, logMeal } from "../actions/foodActions";

type FoodItem = {
  id: string;
  name: string;
  baseCalories: number;
  baseProtein: number;
};

export default function LogMealForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLogging, setIsLogging] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const results = await searchFoodItems(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSaveMeal = async () => {
    if (!selectedItem) return;
    setIsLogging(true);

    await logMeal({
      foodItemId: selectedItem.id,
      quantityConsumed: quantity,
    });

    setSelectedItem(null);
    setSearchQuery("");
    setQuantity(1);
    setSearchResults([]);
    setIsLogging(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Log a Meal</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search food dictionary..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchResults.length > 0 && !selectedItem && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setSearchQuery(item.name);
                  setSearchResults([]);
                }}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
              >
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-500">{item.baseCalories} kcal | {item.baseProtein}g Protein</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedItem && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />
          <button
            onClick={handleSaveMeal}
            disabled={isLogging}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLogging ? "Logging..." : `Log ${Math.round(quantity * selectedItem.baseCalories)} Calories`}
          </button>
        </div>
      )}
    </div>
  );
}