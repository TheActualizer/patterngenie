import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Index;