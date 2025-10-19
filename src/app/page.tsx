import { IdCard3D } from '@/components/id-card-3d';
import { Terminal } from '@/components/terminal';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#222222]">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">
        <div className="flex w-full md:w-1/3 items-center justify-center p-4 flex-col">
          <div className="w-full h-full flex-grow flex items-center justify-center">
            <IdCard3D />
          </div>
          <p className="mt-4 text-accent">[Interactive 3D Card]</p>
        </div>
        <div className="w-full md:w-2/3 h-full p-4 border-l-2 border-primary">
          <Terminal />
        </div>
      </main>
      <Footer />
    </div>
  );
}
