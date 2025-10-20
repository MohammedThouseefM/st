
"use client";

const commands = [
  'help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'certifications', 'leadership', 'sudo', 'clear'
];

export const Help = () => (
  <div>
    <p>Available commands:</p>
    {commands.map((cmd) => (
      <p key={cmd} className="text-primary">{cmd}</p>
    ))}
  </div>
);

export const About = () => (
    <p>
      I’m Mohammed Thouseef M, a passionate and disciplined BCA student at Merith Haji Ismail Sahab Arts and Science College, currently shaping my career into a blend of Full Stack Development, AI/ML, and Cybersecurity. I believe in building, learning, and evolving every single day. I don’t chase hype — I chase mastery. My journey started with simple HTML pages and has grown into building full-fledged web applications that combine design, logic, and intelligence. As a developer, I value clarity, functionality, and purpose. As a person, I value faith, honesty, and self-discipline. Technology isn’t just my career — it’s my tool to create impact, automate problems, and build digital experiences that actually matter. I’m constantly upgrading myself — one project, one challenge, and one line of code at a time. My mission is simple: To become a world-class developer who builds real-world tech solutions that inspire, educate, and empower.
    </p>
);

const projectList = [
    { name: 'Student Portal Website', desc: 'A complete student management system built using HTML, CSS, JavaScript, React JS, Node.js, and SQLite, featuring dashboards, fee payment, and admin panels.' },
    { name: 'Tourism Website with AI Chatbot', desc: 'A tourism platform where admins can manage destinations and an integrated AI chatbot helps users explore locations.' },
    { name: 'Traffic Accident Data Analysis', desc: 'A data analysis and visualization project using Python (Pandas, Matplotlib, Seaborn) and Excel to analyze real traffic accident data.' },
    { name: 'Interactive Quiz Web Page', desc: 'A front-end project built with HTML, CSS, and JavaScript featuring a countdown timer, answer validation, and scoring logic.' },
    { name: 'Personal Portfolio Website — techbythouseef.in', desc: 'A clean, responsive portfolio built to reflect my journey and skills, hosted on Netlify with a custom domain.' },
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
    'Frontend': ['HTML', 'CSS', 'JavaScript', 'React JS'],
    'Backend & Database': ['Node.js', 'SQLite', 'MySQL (basic)'],
    'Data Analytics': ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Excel'],
    'Programming Languages': ['Python', 'C++', 'C#'],
    'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'Netlify', 'Excel Dashboards']
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
            <p className="text-primary font-bold">Freelance Web Developer</p>
            <p className="text-accent ml-2">- Developed multiple web applications for small businesses and academic use. Worked on full project lifecycles—planning, development, testing, and deployment.</p>
        </div>
        <div>
            <p className="text-primary font-bold">Data Analyst (Naan Mudhalvan Project)</p>
            <p className="text-accent ml-2">- Collaborated on real-world datasets to extract insights and visualize KPIs. Built data dashboards and automated data-cleaning pipelines using Python.</p>
        </div>
    </div>
);

export const Education = () => (
    <div>
        <p className="text-primary font-bold">Bachelor of Computer Applications (BCA) - Merith Haji Ismail Sahab Arts and Science College</p>
        <p className="text-accent ml-2">1st Sem – 67.71% | 2nd Sem – 69.14% | 3rd Sem – 78.37%</p>
        <p className="text-accent ml-2">Scored 100/100 in OOPs using Python.</p>
    </div>
);

export const Certifications = () => (
    <div>
        <p className="text-accent ml-2">- OOPs Programming in Python – Infosys Springboard</p>
        <p className="text-accent ml-2">- Advanced Data Analytics & Visualization – Naan Mudhalvan</p>
        <p className="text-accent ml-2">- Understanding the Internet – Naan Mudhalvan</p>
        <p className="text-accent ml-2">- Office Automation – Naan Mudhalvan</p>
    </div>
)

export const Leadership = () => (
    <div>
        <p className="text-accent ml-2">- Organized and managed student fund collection for events and externals.</p>
        <p className="text-accent ml-2">- Helped classmates debug and structure projects logically.</p>
        <p className="text-accent ml-2">- Maintained a consistent work ethic that inspired peers to push harder.</p>
    </div>
)


export const Contact = () => (
    <div>
        <p>You can reach me via:</p>
        <ul className="mt-2 space-y-1">
            <li><span className="text-primary w-20 inline-block">Email:</span> <a href="mailto:mthouseef100@gmail.com" className="text-accent underline">mthouseef100@gmail.com</a></li>
            <li><span className="text-primary w-20 inline-block">Phone:</span> <a href="tel:+919043950148" className="text-accent underline">+91 9043950148</a></li>
            <li><span className="text-primary w-20 inline-block">LinkedIn:</span> <a href="https://www.linkedin.com/in/mohammed-thouseef-mohammed148350" target="_blank" rel="noopener noreferrer" className="text-accent underline">linkedin.com/in/mohammed-thouseef-mohammed148350</a></li>
            <li><span className="text-primary w-20 inline-block">GitHub:</span> <a href="https://github.com/MohammedThouseefM" target="_blank" rel="noopener noreferrer" className="text-accent underline">github.com/MohammedThouseefM</a></li>
        </ul>
    </div>
);
