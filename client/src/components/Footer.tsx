import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-duoLightGray mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <a className="flex items-center">
                <div className="text-duoGreen text-2xl font-bold mr-2">
                  <i className="fas fa-dove"></i>
                </div>
                <h3 className="text-duoGreen text-lg font-bold">Duolingo</h3>
              </a>
            </Link>
            <p className="mt-2 text-duoGray max-w-xs">The world's #1 way to learn a language. Completely free, fun, and scientifically proven to work.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-duoDarkGray mb-4">Learn</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Courses</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Dictionary</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Stories</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Premium</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-duoDarkGray mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Company</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Careers</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Research</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Our Team</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-duoDarkGray mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Help Center</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Community</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Guidelines</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Investors</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-duoDarkGray mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Terms</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Privacy</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Cookie Policy</a></li>
                <li><a href="#" className="text-duoGray hover:text-duoGreen transition">Licenses</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-duoLightGray flex flex-col md:flex-row justify-between items-center">
          <p className="text-duoGray mb-4 md:mb-0">© {new Date().getFullYear()} Duolingo. This is a demo project.</p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-duoGray hover:text-duoGreen transition text-xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-duoGray hover:text-duoGreen transition text-xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-duoGray hover:text-duoGreen transition text-xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-duoGray hover:text-duoGreen transition text-xl">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
