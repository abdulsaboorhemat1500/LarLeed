import Link from "next/link";

// components/CourseCardWithImage.js
export default function SchoolCard() {
  return (
    <div className="max-w-sm bg-white dark:bg-gray-800  shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      {/* Course Image */}
      <div className="h-48 bg-gray-300 dark:bg-gray-600 relative">
        <img 
          src="/hero-section-image.jpg" 
          alt="The Complete Agentic AI Engineering Course"
          className="w-full h-full object-cover"
        />
       
      </div>

      {/* Rest of the content remains the same */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          The Complete Agentic AI Engineering Course (2025)
        </h3>

        <p className="text-blue-600 dark:text-gray-400 text-sm mb-4">
          Ed Donner, Ligency
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
            kj df fldkjf dfjkdsj fkdsjfkdsj fdsjfkdsjf dsjfkadsjfkadjf lkdsjfjsdfjsdjf fdsjfkdsjffdsjfdsk
            djfadhfdjf dfj dhflsdfj dkjfklsajdf aldjfkdjs fdjf dfj sd
        </p>
        
        <a href="#" target="__blank">
          <button className="cursor-pointer w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
            Watch Video
          </button>
        </a>
        
      </div>
    </div>
  );
}