
import BackButton from '@/components/ui/back-button';
import { Button } from './ui/button';

export default function GetInTouchSection() {
  return(
    <section className=" bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Get In Touch
                </h2>
                
                <div>
                    <p className="text-lg text-gray-500 dark:text-white font-medium">
                        Hello guys my name is abdul saboor hemat, I am a web Developer working with next.js and Laravel.
                    </p>
                </div>
                    
            </div>
            <div className="lg:col-span-2">
                <div className="pt-5">
                    <label htmlFor="get_in_touch" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                        id="get_in_touch"
                        name="get_in_touch"
                        type="email"
                        autoComplete="get_in_touch"
                        required
                        className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Enter Your Email..."
                        />
                    </div>
                </div>
                <Button className="mt-4 cursor-pointer px-7" >Submit Form</Button>
            </div>
        </div>    
      </div>
    </section>
  );

}