import { getTodayLogs } from "../actions/foodActions";
import LogMealForm from "./LogMealForm";

export default async function DiaryPage() {
  const todayLogs = await getTodayLogs();

  // We explicitly tell TypeScript that 'sum' is a number and 'log' can bypass strict checking
  const totalCalories = todayLogs.reduce((sum: number, log: any) => sum + (log.foodItem.baseCalories * log.quantityConsumed), 0);
  const totalProtein = todayLogs.reduce((sum: number, log: any) => sum + (log.foodItem.baseProtein * log.quantityConsumed), 0);

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Today's Diary</h1>
          <p className="text-gray-500 text-sm mt-1">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Daily Macros</div>
          <div className="text-2xl font-extrabold text-blue-600">
            {totalCalories.toFixed(0)} <span className="text-base font-medium text-gray-500">kcal</span>
            <span className="mx-2 text-gray-300">|</span>
            {totalProtein.toFixed(1)}g <span className="text-base font-medium text-gray-500">Protein</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <LogMealForm />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Logged Items</h2>
          
          {todayLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
              No meals logged yet today.
            </div>
          ) : (
            <ul className="space-y-3">
              {todayLogs.map((log: any) => {
                // Simplified to only use the master dictionary base values
                const itemCals = log.foodItem.baseCalories * log.quantityConsumed;
                const itemPro = log.foodItem.baseProtein * log.quantityConsumed;
                
                return (
                  <li key={log.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">{log.foodItem.name}</div>
                      <div className="text-xs text-gray-500">
                        {log.quantityConsumed} serving(s)
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-bold text-gray-700">{itemCals.toFixed(0)} kcal</div>
                      <div className="text-blue-600 font-medium">{itemPro.toFixed(1)}g pro</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}