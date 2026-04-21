import { getTodayLogs } from "../../actions/foodActions";

export default async function MetricsPage() {
  const todayLogs = await getTodayLogs();

  // We explicitly tell TypeScript that 'sum' is a number and 'log' can bypass strict checking
  const totalCalories = todayLogs.reduce((sum: number, log: any) => sum + (log.foodItem.baseCalories * log.quantityConsumed), 0);
  const totalProtein = todayLogs.reduce((sum: number, log: any) => sum + (log.foodItem.baseProtein * log.quantityConsumed), 0);

  // The 1-to-10 Target Calculation
  const targetProtein = totalCalories / 10;
  
  // Cap the progress bar visual at 100% so it doesn't break the CSS if you over-index on protein
  const proteinProgressPercentage = targetProtein > 0 
    ? Math.min((totalProtein / targetProtein) * 100, 100) 
    : 0;

  const proteinDeficit = targetProtein - totalProtein;

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">My Metrics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Live Macro Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Protein Goal (1g / 10kcal)</h2>
          <div className="text-3xl font-extrabold text-gray-800 mb-2">
            {totalProtein.toFixed(1)}g <span className="text-lg font-medium text-gray-500">/ {targetProtein.toFixed(1)}g</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className={`h-2 rounded-full ${proteinProgressPercentage >= 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
              style={{ width: `${proteinProgressPercentage}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-500 font-medium">
            {totalCalories.toFixed(0)} Calories Consumed
          </div>
          {proteinDeficit > 0 && (
             <div className="text-xs text-amber-600 mt-2 font-medium">
               Need {proteinDeficit.toFixed(1)}g more protein to hit ratio.
             </div>
          )}
        </div>

        {/* Weight Card - Placeholder for Future DB Connect */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Weight Trend</h2>
          <div className="text-3xl font-extrabold text-gray-400 mb-2">--.- <span className="text-lg font-medium">lbs</span></div>
          <div className="text-sm text-gray-400 font-medium flex items-center">
            Awaiting Scale Sync
          </div>
        </div>

        {/* Cost Card - Placeholder for Future DB Connect */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Food Spend</h2>
          <div className="text-3xl font-extrabold text-gray-400 mb-2">$0 <span className="text-lg font-medium">/mo</span></div>
          <div className="text-sm text-gray-400 font-medium">
            Awaiting Grocery Sync
          </div>
        </div>
      </div>
    </div>
  );
}