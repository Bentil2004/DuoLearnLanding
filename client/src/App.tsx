import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useUserStore } from "./userStore"; // Assuming you have a user store


function Router() {
  const [_, navigate] = useLocation(); // Now properly imported

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Handle logged in user
        if (window.location.pathname === '/signin' || window.location.pathname === '/signup') {
          navigate('/dashboard');
        }
      } else {
        // Handle logged out user
        if (window.location.pathname.startsWith('/dashboard')) {
          navigate('/signin');
        }
      }
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
