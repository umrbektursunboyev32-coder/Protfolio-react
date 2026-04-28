import React from 'react';
import './App.css'; // CSS faylni ulash
import Counter from './Counter';

const Skills = () => {
  const skillsData = [
    { name: 'React JS', level: '85%', color: '#61DBFB' },
    { name: 'JavaScript', level: '90%', color: '#F7DF1E' },
    { name: 'Python', level: '80%', color: '#3776AB' },
    { name: 'HTML/CSS', level: '95%', color: '#E34F26' },
    { name: 'Telegram Bot API', level: '88%', color: '#0088cc' },
    { name: 'Git/GitHub', level: '75%', color: '#f05032' },
  ];

  return (
    <section className="skills-container">
      <h2 className="skills-title">Texnik Ko'nikmalar</h2>
      <div className="skills-grid">
        {skillsData.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percent">{skill.level}</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: skill.level, 
                  backgroundColor: skill.color,
                  boxShadow: `0 0 10px ${skill.color}55` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <Counter />
    </section>
  );
};

export default Skills;