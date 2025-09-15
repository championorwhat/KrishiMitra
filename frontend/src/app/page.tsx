
import { Hero, About, Services } from '@/components';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Services />
      <Navbar />
    </div>
  );
}
