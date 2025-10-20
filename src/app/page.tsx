import { IdCard3D } from '@/components/id-card-3d';
import { Terminal } from '@/components/terminal';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 md:pt-0 md:pb-0 md:pl-0 md:pr-0">
        <div className="flex flex-col md:flex-row md:h-screen md:pt-20 md:pb-20">
            <div className="flex w-full md:w-1/3 items-center justify-center p-4 flex-col min-h-[300px] md:min-h-0">
              <div className="w-full h-full flex-grow flex items-center justify-center">
                <IdCard3D />
              </div>
              <p className="mt-4 text-accent">[Interactive 3D Card]</p>
            </div>
            <div className="w-full md:w-2/3 h-full p-4 border-t-2 md:border-t-0 md:border-l-2 border-primary">
              <Terminal />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
