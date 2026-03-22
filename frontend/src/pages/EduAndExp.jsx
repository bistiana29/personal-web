import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';

export default function EduAndExp({ theme, isDarkMode }) {

  // EDUCATION
  const educationData = {
    year: "2021 - 2025",
    institution: "Politeknik Elektronika Negeri Surabaya",
    major: "Applied Data Science",
    details:
      "Final-year student focusing on Statistical Modeling, Machine Learning, and Big Data."
  };

  // EXPERIENCE (8 items biar balance kiri kanan)
  const experienceData = [
    {
      year: "2025",
      title: "Data Science Intern",
      place: "PT Company Name",
      details: [
        "Performed data cleaning and preprocessing using PostgreSQL",
        "Built KPI dashboards using Tableau"
      ]
    },
    {
      year: "2025",
      title: "Freelance Data Analyst",
      place: "Client Project",
      details: [
        "Analyzed sales data for small businesses",
        "Delivered business insights reports"
      ]
    },
    {
      year: "2024",
      title: "Machine Learning Project",
      place: "Independent Study",
      details: [
        "Built Random Forest model (88% accuracy)",
        "Deployed API using FastAPI & Docker"
      ]
    },
    {
      year: "2024",
      title: "Data Visualization Project",
      place: "Personal Project",
      details: [
        "Created interactive dashboards with Plotly",
        "Analyzed public datasets"
      ]
    },
    {
      year: "2023",
      title: "Volunteer Data Analyst",
      place: "Organization",
      details: [
        "Analyzed survey data (500+ respondents)",
        "Provided strategic insights"
      ]
    },
    {
      year: "2023",
      title: "Data Cleaning Assistant",
      place: "Part-time",
      details: [
        "Handled large dataset cleaning",
        "Ensured data consistency"
      ]
    },
    {
      year: "2022",
      title: "Mini Data Science Project",
      place: "Campus",
      details: [
        "Performed exploratory data analysis",
        "Visualized data using Seaborn"
      ]
    },
    {
      year: "2022",
      title: "Python Data Project",
      place: "Self Learning",
      details: [
        "Built small data pipelines",
        "Practiced Pandas & visualization"
      ]
    }
  ];

  return (
    <section
      id="eduandexp"
      className="min-h-screen pt-32 pb-24 px-6 lg:px-16 border-t border-[#077A7D]/20"
    >
      {/* PAGE TITLE */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Education & Experience
        </h1>
        <p className="text-slate-400">
          My academic journey and professional growth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* EDUCATION */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap size={28} className={theme.accent} />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>

          <div className={`p-8 rounded-3xl border ${theme.card}`}>
            <span className="text-sm opacity-70">{educationData.year}</span>
            <h3 className="text-2xl font-bold mt-2">
              {educationData.institution}
            </h3>
            <p className={`font-semibold ${theme.accent}`}>
              {educationData.major}
            </p>
            <p className="mt-3 text-slate-400">
              {educationData.details}
            </p>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div>
          <div className="flex items-center gap-3 mb-12">
            <Briefcase size={28} className={theme.accent} />
            <h2 className="text-2xl font-bold">Experience</h2>
          </div>

          {/* TIMELINE */}
          <div className="relative">
            {/* CENTER LINE */}
            <div className="absolute left-1/2 top-0 w-[2px] h-full bg-[#077A7D]/40 transform -translate-x-1/2"></div>

            <div className="space-y-16">
              {experienceData.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className="relative grid grid-cols-1 md:grid-cols-2 items-center"
                  >
                    {/* LEFT SIDE */}
                    <div className={`md:pr-12 ${isLeft ? "block" : "hidden md:block"}`}>
                      {isLeft && (
                        <div className="text-right">
                          <p className="text-sm text-slate-400">{item.year}</p>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-sm text-teal-400 mb-2">{item.place}</p>
                          <ul className="space-y-1 text-sm text-slate-300">
                            {item.details.map((d, i) => (
                              <li key={i}>• {d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* CENTER DOT */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-[#06202B]"></div>

                    {/* RIGHT SIDE */}
                    <div className={`md:pl-12 ${!isLeft ? "block" : "hidden md:block"}`}>
                      {!isLeft && (
                        <div>
                          <p className="text-sm text-slate-400">{item.year}</p>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-sm text-teal-400 mb-2">{item.place}</p>
                          <ul className="space-y-1 text-sm text-slate-300">
                            {item.details.map((d, i) => (
                              <li key={i}>• {d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
