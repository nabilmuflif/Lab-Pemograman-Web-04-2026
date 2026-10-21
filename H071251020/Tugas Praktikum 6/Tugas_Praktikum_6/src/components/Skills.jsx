import React from 'react';

const Skills = () => {

  const skills = ['HTML5', 'CSS and Framework', 'Python', 'Java and Gradle', 'PHP and Laravel'];

  return (
    <section id="skills" className="py-20 bg-slate-100 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Keahlian Saya</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-bold text-indigo-600 text-lg">{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;