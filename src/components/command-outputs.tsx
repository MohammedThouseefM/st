
"use client";

const commands = [
  'help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'certifications', 'leadership', 'sudo', 'clear'
];

export const Help = () => (
  <div>
    {commands.map((cmd) => (
      <p key={cmd} className="text-primary">{cmd}</p>
    ))}
  </div>
);

export const About = () => (
    <p>
      Hi, I'm Mark Gatere, a Software & AI Engineer. I am a passionate software engineer with a knack for building elegant and efficient solutions. 
      My journey in tech has been driven by a relentless curiosity and a desire to solve real-world problems. 
      This terminal is a small reflection of my love for creative and interactive development.
    </p>
);

const projectList = [
    { name: 'Thouseef Maps', desc: 'A Google Maps clone built with modern web technologies, showcasing real-time geolocation and interactive map features.' },
    { name: 'Thouseefbot', desc: 'A ChatGPT-inspired NLP project that demonstrates advanced language understanding and generation capabilities.' },
];

export const Projects = () => (
    <div>
        {projectList.map(p => (
            <div key={p.name} className="mb-2">
                <p className="text-primary font-bold">{p.name}</p>
                <p className="text-accent ml-2">{p.desc}</p>
            </div>
        ))}
    </div>
);

const skillsList = {
    'Languages': ['Python', 'JavaScript', 'Node.js'],
    'Frameworks/Libraries': ['ReactJS', 'TensorFlow', 'Next.js', 'Express.js'],
    'Tools/Technologies': ['Docker', 'Git', 'Firebase', 'MongoDB']
};

export const Skills = () => (
    <div>
        {Object.entries(skillsList).map(([category, skills]) => (
            <div key={category} className="mb-2">
                <p className="text-primary font-bold">{category}:</p>
                <p className="text-accent ml-2">{skills.join(', ')}</p>
            </div>
        ))}
    </div>
);

export const Experience = () => (
    <div>
        <div className="mb-2">
            <p className="text-primary font-bold">Senior Software Engineer - TechCorp (2020 - Present)</p>
            <p className="text-accent ml-2">- Led development of key features for a large-scale SaaS platform.</p>
            <p className="text-accent ml-2">- Mentored junior engineers and contributed to architectural decisions.</p>
        </div>
        <div>
            <p className="text-primary font-bold">Software Engineer - Innovate LLC (2018 - 2020)</p>
            <p className="text-accent ml-2">- Developed and maintained full-stack web applications for various clients.</p>
        </div>
    </div>
);

export const Education = () => (
    <div>
        <p className="text-primary font-bold">B.S. in Computer Science - University of Technology</p>
        <p className="text-accent ml-2">Graduated with honors, focusing on AI and distributed systems.</p>
    </div>
);

export const Certifications = () => (
    <div>
        <p className="text-primary font-bold">Google Certified Professional Cloud Architect</p>
    </div>
)

export const Leadership = () => (
    <div>
        <p className="text-primary font-bold">Lead Developer - Open Source Contributor</p>
    </div>
)


export const Contact = () => (
    <div>
        <p>You can reach me via:</p>
        <ul className="mt-2 space-y-1">
            <li><span className="text-primary w-20 inline-block">Email:</span> <a href="mailto:mark.gatere@example.com" className="text-accent underline">mark.gatere@example.com</a></li>
            <li><span className="text-primary w-20 inline-block">LinkedIn:</span> <a href="#" className="text-accent underline">linkedin.com/in/markgatere</a></li>
            <li><span className="text-primary w-20 inline-block">GitHub:</span> <a href="#" className="text-accent underline">github.com/markgatere</a></li>
        </ul>
    </div>
);

