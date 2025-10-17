// components/TopBanner.jsx
export default function TopBanner() {
  return (
    <div className="pt-10 pb-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">
          LarLeed
        </h1>
        <p className="pt-5 text-xl font-bold text-gray-600 dark:text-gray-300">
          Connecting Afghan Youth through Education, Dialogue, and Vision
        </p>
      </div>
    </div>
  );
}