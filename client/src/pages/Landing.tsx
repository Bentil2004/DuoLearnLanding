import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  {
    icon: "fa-gamepad",
    title: "Fun and Engaging",
    description: "Game-like lessons keep you motivated and excited to learn more.",
    color: "duoGreen"
  },
  {
    icon: "fa-chart-line",
    title: "Effective Learning",
    description: "Research-backed methods to help you retain knowledge and learn quickly.",
    color: "duoBlue"
  },
  {
    icon: "fa-medal",
    title: "Stay Motivated",
    description: "Earn achievements, join leaderboards, and track your progress daily.",
    color: "duoYellow"
  }
];

const languages = [
  { code: "ES", name: "Spanish" },
  { code: "FR", name: "French" },
  { code: "JP", name: "Japanese" },
  { code: "DE", name: "German" },
  { code: "IT", name: "Italian" },
  { code: "+", name: "And more" }
];

const testimonials = [
  {
    initials: "JD",
    name: "John D.",
    rating: 5,
    text: "I've tried many language apps and this is by far the most effective. The lessons are fun and I actually remember what I learn!",
    color: "duoGreen"
  },
  {
    initials: "SM",
    name: "Sarah M.",
    rating: 5,
    text: "The daily reminders keep me accountable, and the streak counter is surprisingly motivating. I'm now on a 78-day streak learning French!",
    color: "duoBlue"
  },
  {
    initials: "RK",
    name: "Raj K.",
    rating: 4.5,
    text: "I started using this app to prepare for a trip to Japan, and I was amazed at how much I could communicate when I got there.",
    color: "duoYellow"
  }
];

const Landing = () => {
  const [_, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 slide-in">
          {/* Hero Section */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-10">
            <motion.div 
              className="lg:w-1/2 mt-10 lg:mt-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-duoDarkGray mb-6">The fun, effective way to learn a language!</h1>
              <p className="text-lg text-duoDarkGray mb-8">Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you'll earn points and unlock new levels while gaining real-world communication skills.</p>
              <Button 
                onClick={() => navigate("/signup")}
                size="lg" 
                className="px-8 py-6 font-bold text-white bg-duoGreen hover:bg-duoGreenHover rounded-2xl text-lg"
              >
                Get Started
              </Button>
            </motion.div>
            <div className="lg:w-1/2 flex justify-center">
              <motion.div 
                className="relative w-64 h-64 md:w-96 md:h-96"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-duoYellow rounded-full opacity-20"></div>
                <svg className="relative z-10 w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="120" cy="120" r="120" fill="#58CC02" fillOpacity="0.2"/>
                  <path d="M120 60C86.8629 60 60 86.8629 60 120C60 153.137 86.8629 180 120 180C153.137 180 180 153.137 180 120C180 86.8629 153.137 60 120 60Z" fill="#58CC02"/>
                  <circle cx="95" cy="105" r="15" fill="white"/>
                  <circle cx="145" cy="105" r="15" fill="white"/>
                  <circle cx="95" cy="105" r="5" fill="black"/>
                  <circle cx="145" cy="105" r="5" fill="black"/>
                  <path d="M100 140C106.667 146.667 133.333 146.667 140 140" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M75 80L90 95" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M165 80L150 95" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-center text-duoDarkGray mb-12">Why learn with Duolingo?</h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-${feature.color} bg-opacity-20 rounded-full`}>
                    <i className={`fas ${feature.icon} text-2xl text-${feature.color}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-duoDarkGray mb-3">{feature.title}</h3>
                  <p className="text-duoDarkGray">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Languages Section */}
          <div className="py-12 bg-white rounded-2xl shadow-md px-8 my-16">
            <h2 className="text-3xl font-bold text-center text-duoDarkGray mb-10">Choose from 40+ languages</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {languages.map((language, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 hover:bg-duoLightGray rounded-lg transition cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-duoGreen bg-opacity-10 rounded-full">
                    <span className="text-xl font-bold text-duoGreen">{language.code}</span>
                  </div>
                  <p className="font-semibold">{language.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center text-duoDarkGray mb-12">What our users say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-${testimonial.color} bg-opacity-20 rounded-full flex items-center justify-center mr-4`}>
                      <span className={`text-${testimonial.color} font-bold`}>{testimonial.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <div className="flex text-duoYellow">
                        {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                        {testimonial.rating % 1 !== 0 && (
                          <i className="fas fa-star-half-alt"></i>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-duoDarkGray">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <motion.div 
            className="bg-duoGreen rounded-2xl p-10 text-center text-white my-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to start your language journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join millions of learners worldwide. Create your free account today and start learning immediately!</p>
            <Button 
              onClick={() => navigate("/signup")}
              variant="outline" 
              size="lg" 
              className="px-8 py-6 bg-white text-duoGreen font-bold rounded-2xl text-lg hover:bg-duoLightGray"
            >
              Create Free Account
            </Button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
