// src/components/ProtectedRoute.tsx
import { Route, Redirect } from "wouter";
import { useUserStore } from "../userStore"; // or your auth context

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType;
}

export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps) {
  const { user } = useUserStore(); // or const { user } = useAuth();
  
  return (
    <Route path={path}>
      {user ? <Component /> : <Redirect to="/signin" />}
    </Route>
  );
}