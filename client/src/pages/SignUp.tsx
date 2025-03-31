import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { calculatePasswordStrength, getPasswordStrengthText, getPasswordStrengthColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";

const SignUp = () => {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const form = useForm<InsertUser & { agreeTerms: boolean }>({
    resolver: zodResolver(
      insertUserSchema.extend({
        agreeTerms: z => z === true ? true : "You must agree to the terms"
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      agreeTerms: false
    }
  });
  
  const { watch } = form;
  const password = watch("password");
  
  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setPasswordStrength(0);
    }
  }, [password]);
  
  const strengthInfo = getPasswordStrengthText(passwordStrength);
  const strengthColor = getPasswordStrengthColor(passwordStrength);
  
  const mutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      const { agreeTerms, ...userData } = data as any;
      // Generate a username from the email if not provided
      if (!userData.username) {
        userData.username = userData.email.split('@')[0];
      }
      
      const response = await apiRequest("POST", "/api/auth/register", userData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your account has been created",
        variant: "default",
      });
      // Redirect to sign in after successful registration
      setTimeout(() => navigate("/signin"), 1500);
    },
    onError: (error) => {
      toast({
        title: "Error creating account",
        description: error.message || "Please check your information and try again",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: InsertUser & { agreeTerms: boolean }) => {
    mutation.mutate(data);
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
          <h2 className="text-2xl font-bold text-duoDarkGray">Create your account</h2>
          <p className="text-duoGray">Join millions of language learners worldwide</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-duoDarkGray font-semibold">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
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
                        placeholder="Choose a secure password"
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
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Password strength:</span>
                      <span className={`font-semibold ${strengthInfo.className}`}>
                        {strengthInfo.text}
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`} 
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-duoGray mt-1">
                      Use 8+ characters with a mix of letters, numbers & symbols
                    </p>
                  </div>
                  
                  <FormMessage className="text-duoRed" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-duoDarkGray">
                      I agree to the <a href="#" className="text-duoBlue hover:underline">Terms of Service</a> and <a href="#" className="text-duoBlue hover:underline">Privacy Policy</a>
                    </FormLabel>
                    <FormMessage className="text-duoRed" />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-duoGreen text-white font-bold rounded-2xl hover:bg-duoGreenHover transition focus:outline-none"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-circle-notch fa-spin mr-2"></i>
                  Creating your account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-8 pt-6 border-t border-duoLightGray text-center">
          <p className="text-duoDarkGray">
            Already have an account? 
            <Button 
              variant="link" 
              onClick={() => navigate("/signin")} 
              className="text-duoGreen font-bold hover:underline"
            >
              Sign in
            </Button>
          </p>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-duoLightGray"></div>
            <span className="px-4 text-duoGray">or sign up with</span>
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

export default SignUp;
