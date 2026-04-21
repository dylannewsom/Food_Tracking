export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Metrics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Macro Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Daily Macros</h2>
          <div className="text-3xl font-extrabold text-gray-800 mb-2">185g <span className="text-lg font-medium text-gray-500">Protein</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <div className="text-sm text-gray-500">2,100 / 2,400 Calories</div>
        </div>

        {/* Weight Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Weight Trend</h2>
          <div className="text-3xl font-extrabold text-gray-800 mb-2">178.4 <span className="text-lg font-medium text-gray-500">lbs</span></div>
          <div className="text-sm text-green-600 font-medium flex items-center">
            ↓ 1.2 lbs this week
          </div>
        </div>

        {/* Cost Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Food Spend</h2>
          <div className="text-3xl font-extrabold text-gray-800 mb-2">$342 <span className="text-lg font-medium text-gray-500">/mo</span></div>
          <div className="text-sm text-gray-500 font-medium">
            $45 remaining in budget
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 flex items-center justify-center text-gray-400">
        Historical charts and graphs will render here
      </div>
    </div>
  );
}