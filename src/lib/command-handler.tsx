import { TypewriterOutput } from '@/components/typewriter-output';
import { Help, About, Projects, Skills, Experience, Education, Contact, Certifications, Leadership } from '@/components/command-outputs';

export const handleCommand = (command: string): React.ReactNode => {
  const [cmd] = command.toLowerCase().split(' ');

  const wrapInTypewriter = (component: React.ReactNode) => <TypewriterOutput>{component}</TypewriterOutput>;

  switch (cmd) {
    case 'help':
      return wrapInTypewriter(<Help />);
    case 'about':
      return wrapInTypewriter(<About />);
    case 'projects':
      return wrapInTypewriter(<Projects />);
    case 'skills':
      return wrapInTypewriter(<Skills />);
    case 'experience':
      return wrapInTypewriter(<Experience />);
    case 'education':
      return wrapInTypewriter(<Education />);
    case 'certifications':
      return wrapInTypewriter(<Certifications />);
    case 'leadership':
        return wrapInTypewriter(<Leadership />);
    case 'contact':
    case 'contact-info':
      return wrapInTypewriter(<Contact />);
    case 'sudo':
        return wrapInTypewriter(<p>Permission denied: you are not the root user.</p>);
    case 'welcome':
        return wrapInTypewriter(
            <div>
              <p>Hi, I&apos;m Mark Gatere, a Software & AI Engineer.</p>
              <p>Welcome to my interactive &apos;AI powered&apos; portfolio terminal!</p>
              <p className="text-primary">Type &apos;help&apos; to see available commands.</p>
            </div>
          );
    case '':
        return '';
    default:
      return wrapInTypewriter(<p>Command not found: {command}. Type 'help' for a list of available commands.</p>);
  }
};
