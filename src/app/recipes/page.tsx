export default function RecipesPage() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Recipes</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
          + Create Recipe
        </button>
      </div>
      <div className="border-2 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-400">
        Saved recipes will go here
      </div>
    </div>
  );
}