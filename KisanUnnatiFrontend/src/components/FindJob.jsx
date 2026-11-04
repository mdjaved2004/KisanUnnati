
const jobs = [
  {
    id: 1,
    name: "Aman singh",
    location: "Indore, MP",
    type: "Full Time",
    description:
      "Looking for a skilled individual for managing crop quality and irrigation systems. Basic knowledge of fertilizers required.",
  },
  {
    id: 2,
    name: "Arvind Singh",
    location: "Indore, MP",
    type: "Full Time",
    description:
      "We need a farmer for organic vegetable production. Experience with composting and pesticide-free methods preferred.",
  },
  {
    id: 3,
    name: "Mo. Javed Mansoori",
    location: "Indore, MP",
    type: "Full Time",
    description:
      "Hiring for warehouse supervision and logistics for grains and pulses. Good pay with accommodation provided.",
  },
  {
    id: 4,
    name: "Veer",
    location: "Indore, MP",
    type: "Full Time",
    description:
      "Wanted for rural dairy management — cattle feeding, milk collection, and quality checking duties.",
  },
  {
    id: 5,
    name: "Kiran Bai",
    location: "Indore, MP",
    type: "Full Time",
    description:
      "Need a farm equipment operator for plowing, sowing, and harvesting. Tractor license required.",
  },
  {
    id: 6,
    name: "Lalit Das",
    location: "Indore, MP",
    type: "Full Time",
    description:
      "Opportunity for agricultural marketing support — help farmers connect to mandi buyers and improve pricing.",
  },
];

const FarmerJobs = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-200 p-4 shadow-md">
        <h1 className="text-xl font-bold text-blue-800"></h1>
        <nav className="flex items-center gap-6 text-gray-700">
          <a href="#" className="hover:text-green-600">
            Job Find
          </a>
          <a href="#" className="hover:text-green-600">
            Job Post
          </a>
          <a href="#" className="hover:text-green-600">
            Job Advice
          </a>
          <button className="bg-purple-700 text-white text-sm px-4 py-1 rounded-full hover:bg-purple-800">
            Full Time Job
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white text-center py-16 px-4">
        <h2 className="text-4xl font-extrabold mb-4">ONLY FOR FARMER</h2>
        <p className="text-lg mb-6">
          Discover exciting opportunities across the agricultural sector.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Job title, e.g., Agronomist, Farm Manager"
            className="p-3 rounded-md text-gray-700 w-full md:w-1/2"
          />
          <input
            type="text"
            placeholder="Location (e.g., Rural, Midwestern)"
            className="p-3 rounded-md text-gray-700 w-full md:w-1/2"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md">
            Search Agri Jobs
          </button>
        </div>
      </section>

      {/* Job Section */}
      <section className="py-12 px-6">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Featured Agricultural Job Opportunities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#e5d2cf] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between p-3 bg-[#e5d2cf]">
                <div className="flex items-center gap-3">
                  <img
                    src=""
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      Name - {job.name}
                    </p>
                    <p className="text-xs text-gray-700">
                      Location - {job.location}
                    </p>
                  </div>
                </div>
                <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>

              {/* Description */}
              <div className="flex-1 bg-gray-200 flex items-center justify-center text-center p-6">
                <p className="text-lg font-medium text-gray-800">
                  {job.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-3 bg-[#d8bfbf]">
                <button className="text-sm text-gray-700 hover:underline">
                  More info
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded-md">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FarmerJobs;