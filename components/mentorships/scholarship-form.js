import { Button } from "../ui/button";

export default function ScholarshipFormSection() {
  return (
    <section className="py-10 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto ">
        <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white mb-6 border-b border-b-gray-300 pb-4">
            Scholarship Submition Form
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Personal Details
                </h2>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                    </label>
                    <div className="mt-1">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter your Full Name"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                    </label>
                    <div className="mt-1">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter your Email Address"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Address
                    </label>
                    <div className="mt-1">
                        <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="address"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter your Current Address"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                    </label>
                    <div className="mt-1">
                        <input
                        id="phone"
                        name="phone"
                        type="name"
                        autoComplete="phone"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter your Phone Number"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="dateofbirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date of Birth
                    </label>
                    <div className="mt-1">
                        <input
                        id="dateofbirth"
                        name="dateofbirth"
                        type="date"
                        autoComplete="dateofbirth"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter your Date of Birth"
                        />
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Academic Details 
                </h2>
                <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        University/School name
                    </label>
                    <div className="mt-1">
                        <input
                        id="university"
                        name="university"
                        type="text"
                        autoComplete="university"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter University/School name"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="studylevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Level of Study
                    </label>
                    <div className="mt-1">
                        <input
                        id="studylevel"
                        name="studylevel"
                        type="text"
                        autoComplete="studylevel"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Level of Study"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="graduationyear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Year of Graduation
                    </label>
                    <div className="mt-1">
                        <input
                        id="graduationyear"
                        name="graduationyear"
                        type="text"
                        autoComplete="graduationyear"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Year of Graduation"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="major" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Major
                    </label>
                    <div className="mt-1">
                        <input
                        id="major"
                        name="major"
                        type="text"
                        autoComplete="major"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Your Major"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your GPA/Score
                    </label>
                    <div className="mt-1">
                        <input
                        id="gpa"
                        name="gpa"
                        type="text"
                        autoComplete="gpa"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Your GPA/Score"
                        />
                    </div>
                </div>
            </div>
             <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Scholarship Applying for
                </h2>
                <div>
                    <label htmlFor="scholarship" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        scholarship Name
                    </label>
                    <div className="mt-1">
                        <input
                        id="scholarship"
                        name="scholarship"
                        type="text"
                        autoComplete="scholarship"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter scholarship Name"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="scholarshipcountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Scholarship Country
                    </label>
                    <div className="mt-1">
                        <input
                        id="scholarshipcountry"
                        name="scholarshipcountry"
                        type="text"
                        autoComplete="scholarshipcountry"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Scholarship Country"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="scholarshipuni" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Scholarship University
                    </label>
                    <div className="mt-1">
                        <input
                        id="scholarshipuni"
                        name="scholarshipuni"
                        type="text"
                        autoComplete="scholarshipuni"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Your scholarship University"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Scholarship Level
                    </label>
                    <div className="mt-1">
                        <input
                        id="level"
                        name="level"
                        type="text"
                        autoComplete="level"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Your scholarship Level"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <label htmlFor="deadeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Scholarship Deadeline
                    </label>
                    <div className="mt-1">
                        <input
                        id="deadeline"
                        name="deadeline"
                        type="text"
                        autoComplete="deadeline"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Scholarship Deadeline"
                        />
                    </div>
                </div>
            </div>
        </div>
        <Button className="mt-4 cursor-pointer px-7" >Submit Form</Button>
      </div>
    </section>
  );
}