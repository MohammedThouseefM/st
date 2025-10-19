import { Help, About, Projects, Skills, Experience, Education, Contact } from '@/components/command-outputs';

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
    case 'contact':
    case 'contact-info':
      return <Contact />;
    case 'sudo':
        return <p>Permission denied: you are not the root user.</p>;
    case '':
        return '';
    default:
      return <p>Command not found: {command}. Type 'help' for a list of available commands.</p>;
  }
};
