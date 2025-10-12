import Image from "next/image";
import Link from "next/link";

// components/TeamSection.jsx
export default function TeamSection() {
  const teamMembers = [
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
    {
      name: "saboor hemat",
      position: "Developer",
      image: "/team-members/saboor.png" // Replace with actual image path
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our Team
          </h2>
        </div>

        {/* Team Grid - Centered with auto-fit and justify-items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center w-full max-w-[180px]">
              {/* Circular Image */}
              <div className="mb-5 mx-auto w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                <Link 
                  href={`/team-section/${index+1}`} 
                  className="cursor-pointer hover:shadow-xl w-full h-full rounded-full transform hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden shadow-md"
                >
                  <Image
                    src="/team-members/saboor.png"
                    alt="saboor hemat"
                    width={160}
                    height={160}
                    className="object-cover rounded-full w-full h-full"
                  />
                </Link>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}