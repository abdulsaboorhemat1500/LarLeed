"use client";

export default function DonationImpactPage() {
  const impactCards = [
    {
      id: 1,
      title: "Scholarship Programs",
      description:
        "Your donations provide full and partial scholarships to deserving Afghan students who otherwise couldn't afford education. Each scholarship covers tuition fees, books, and educational materials.",
      impact: "50+ students supported annually",
      icon: "🎓",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Educational Resources",
      description:
        "Funds are used to establish libraries, computer labs, and provide modern educational equipment. We ensure schools have the necessary tools for quality education in Afghanistan.",
      impact: "15 schools equipped yearly",
      icon: "📚",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Teacher Training & Development",
      description:
        "Invest in training programs for educators to enhance teaching quality and modernize educational approaches. Well-trained teachers create lasting impact in communities.",
      impact: "200+ teachers trained",
      icon: "👨‍🏫",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Where Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Donation Goes
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Every contribution directly impacts the lives of Afghan students.
              See how your generosity transforms into meaningful educational
              opportunities.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Students Supported</div>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  25+
                </div>
                <div className="text-gray-600">Schools Equipped</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  100%
                </div>
                <div className="text-gray-600">Direct Impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Cards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {impactCards.map((card, index) => (
              <div
                key={card.id}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Icon/Animation Section */}
                <div className="flex-1 flex justify-center">
                  <div className="relative w-64 h-64">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-3xl opacity-10`}
                    />
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <span className="text-8xl">{card.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 max-w-lg">
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${card.color} text-white text-sm font-semibold mb-4`}
                  >
                    <span className="mr-2">{card.icon}</span>
                    {card.title}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {card.title}
                  </h3>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="flex items-center space-x-2 text-gray-700 font-semibold">
                    <span className="text-green-500">✓</span>
                    <span>{card.impact}</span>
                  </div>

                  {/* Progress/Impact Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Current Impact</span>
                      <span>Growing</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${card.color}`}
                        style={{ width: `${70 + index * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of donors who are transforming education in
              Afghanistan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                Start Donating Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                Learn More About Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
