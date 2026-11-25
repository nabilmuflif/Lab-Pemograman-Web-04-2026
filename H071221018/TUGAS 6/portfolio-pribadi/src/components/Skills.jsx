const Skills = () => {
  const skills = [
    "HTML & CSS",
    "JavaScript",
    "React JS",
    "Tailwind CSS",
    "UI/UX Design",
    "Database Management",
    "Problem Solving",
    "Teamwork",
  ];

  return (
    <section id="skills" className="bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-red-500 font-semibold tracking-widest">
            MY ABILITIES
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            My Skills
          </h2>

          <div className="w-20 h-1 bg-red-500 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center hover:border-red-400 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-red-500 text-3xl mb-3">
                ✦
              </div>

              <h3 className="text-white font-semibold">
                {skill}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
