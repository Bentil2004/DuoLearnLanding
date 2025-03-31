import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

const Header = () => {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <div className="text-duoGreen text-3xl font-bold mr-2">
                <i className="fas fa-dove"></i>
              </div>
              <h1 className="text-duoGreen text-xl font-bold">Duolingo</h1>
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition">Courses</a>
          <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition">About</a>
          <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition">Schools</a>
          <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition">Premium</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            onClick={() => navigate("/signin")}
            variant="outline" 
            className="font-bold text-duoGreen border-2 border-duoGreen hover:bg-duoGreen hover:text-white rounded-2xl"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate("/signup")}
            className="hidden md:block font-bold text-white bg-duoGreen hover:bg-duoGreenHover rounded-2xl"
          >
            Get Started
          </Button>
          <button onClick={toggleMenu} className="md:hidden text-duoDarkGray text-xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          <nav className="flex flex-col space-y-3 pb-3">
            <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition py-2">Courses</a>
            <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition py-2">About</a>
            <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition py-2">Schools</a>
            <a href="#" className="font-semibold text-duoDarkGray hover:text-duoGreen transition py-2">Premium</a>
            <Button 
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
              className="font-bold text-white bg-duoGreen hover:bg-duoGreenHover rounded-2xl mt-2"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
