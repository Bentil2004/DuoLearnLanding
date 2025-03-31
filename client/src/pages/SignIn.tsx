import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignIn = () => {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleFirebaseLogin = async (data: LoginUser) => {
    setIsLoading(true);
    
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optional: Verify email if you require email verification
      // if (!user.emailVerified) {
      //   toast({
      //     title: "Email not verified",
      //     description: "Please verify your email address",
      //     variant: "destructive",
      //   });
      //   return;
      // }

      toast({
        title: "Success!",
        description: "You've successfully signed in",
        variant: "default",
      });

      // Navigate to the dashboard or home page after successful login
      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      let errorMessage = "Please check your credentials and try again";
      
      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Try again later";
          break;
      }
      
      toast({
        title: "Error signing in",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmit = (data: LoginUser) => {
    handleFirebaseLogin(data);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-duoLightGray p-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 slide-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="text-duoGreen text-4xl font-bold mb-2 flex justify-center">
            <i className="fas fa-dove"></i>
          </div>
          <h2 className="text-2xl font-bold text-duoDarkGray">Welcome back!</h2>
          <p className="text-duoGray">Sign in to continue your language journey</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-duoDarkGray font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="yourname@example.com" 
                      className="px-4 py-3 rounded-xl border border-duoGray focus:border-duoGreen"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-duoRed" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-duoDarkGray font-semibold">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="px-4 py-3 rounded-xl border border-duoGray focus:border-duoGreen"
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-duoGray hover:text-duoDarkGray transition"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                  <FormMessage className="text-duoRed" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-duoGreen text-white font-bold rounded-2xl hover:bg-duoGreenHover transition focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <i className="fas fa-circle-notch fa-spin mr-2"></i>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <a href="#" className="text-duoBlue hover:underline">Forgot password?</a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-duoLightGray text-center">
          <p className="text-duoDarkGray">
            Don't have an account? 
            <Button 
              variant="link" 
              onClick={() => navigate("/signup")} 
              className="text-duoGreen font-bold hover:underline"
            >
              Sign up
            </Button>
          </p>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-duoLightGray"></div>
            <span className="px-4 text-duoGray">or continue with</span>
            <div className="flex-grow h-px bg-duoLightGray"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center py-3 border border-duoGray rounded-xl hover:bg-duoLightGray transition">
              <i className="fab fa-google mr-2"></i>
              Google
            </button>
            <button className="flex items-center justify-center py-3 border border-duoGray rounded-xl hover:bg-duoLightGray transition">
              <i className="fab fa-facebook-f mr-2"></i>
              Facebook
            </button>
          </div>
        </div>
      </motion.div>
      
      <Button 
        variant="ghost" 
        className="mt-4 text-duoDarkGray"
        onClick={() => navigate("/")}
      >
        <i className="fas fa-arrow-left mr-2"></i> Back to Home
      </Button>
    </div>
  );
};

export default SignIn;
