import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { useParams } from 'next/navigation';
export default function WorkThusFor() {
  const { t } = useTranslations();
  const { locale } = useParams();
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content - Left Side */}
          <div className="space-y-6">
            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {t('HomePage.Work Thus For')}
            </h2>
            
            {/* Description */}
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <p>
                At LarLeed, we are dedicated to creating lasting impact through our comprehensive 
                initiatives focused on education, dialogue, and youth empowerment.
              </p>
                
              <p>
                Our work spans across multiple domains, each designed to address the unique 
                challenges faced by Afghan youth while harnessing their incredible potential 
                for positive change.
              </p>
              
              <p>
                Through strategic partnerships, community engagement, and innovative programs, 
                we strive to build a brighter future where every young Afghan has the opportunity 
                to learn, grow, and lead.
              </p>
            </div>
            
            {/* Call to Action */}
            <div className="pt-6">
              <Link href={`/${locale}/about`}>
              <button className="cursor-pointer px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                {t('HomePage.Learn More About Our Work')}
              </button>
              </Link>
            </div>
          </div>
          
          {/* Image Content - Right Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
              src="/workthosfor.jpg"
              alt='work thos for image'
              />
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -z-10 bottom-10 -left-10 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}