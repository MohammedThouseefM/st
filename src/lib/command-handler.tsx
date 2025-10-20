
import { Help, About, Projects, Skills, Experience, Education, Contact, Certifications, Leadership } from '@/components/command-outputs';

export const handleCommand = (command: string): React.ReactNode => {
  const [cmd] = command.toLowerCase().split(' ');

  switch (cmd) {
    case 'help':
      return <Help />;
    case 'about':
      return <About />;
    case 'projects':
      return <Projects />;
    case 'skills':
      return <Skills />;
    case 'experience':
      return <Experience />;
    case 'education':
      return <Education />;
    case 'certifications':
      return <Certifications />;
    case 'leadership':
        return <Leadership />;
    case 'contact':
    case 'contact-info':
      return <Contact />;
    case 'sudo':
        return "“Discipline builds confidence. Faith builds purpose. Consistency builds results.” I live by these words. Every day, I aim to improve 1% — in code, in mindset, and in impact. My identity isn’t just “developer.” I’m a builder, thinker, and problem-solver who believes in turning knowledge into action. Faith keeps me grounded; logic keeps me sharp. Long-term, my mission is to become a full-stack engineer skilled in AI, ML, and cybersecurity, building projects that make people’s lives easier, safer, and smarter. I don’t wait for motivation. I build systems, routines, and principles that make success inevitable. sudo mindset: “Execute your goals. Debug your fears. Commit your vision.”";
    case 'welcome':
        return (
              <div>
                <p>Hi, I&apos;m Mohammed Thouseef M, a BCA Student & Web Developer.</p>
                <p>Welcome to my interactive &apos;AI powered&apos; portfolio terminal!</p>
                <p className="text-primary">Type &apos;help&apos; to see available commands.</p>
              </div>
          );
    case '':
        return '';
    default:
      return <p>Command not found: {command}. Type 'help' for a list of available commands.</p>;
  }
};
