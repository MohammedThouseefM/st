import { IdCard3D } from '@/components/id-card-3d';
import { Terminal } from '@/components/terminal';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background md:flex-row">
      <div className="flex h-1/2 w-full items-center justify-center p-4 md:h-screen md:w-1/2">
        <IdCard3D />
      </div>
      <div className="h-screen w-full p-4 md:h-screen md:w-1/2">
        <Terminal />
      </div>
    </main>
  );
}
