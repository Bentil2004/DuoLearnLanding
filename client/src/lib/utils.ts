import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function calculatePasswordStrength(password: string): number {
  if (password.length === 0) return 0;
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 25;
  
  // Character variety checks
  if (password.match(/[A-Z]/)) strength += 25;
  if (password.match(/[0-9]/)) strength += 25;
  if (password.match(/[^A-Za-z0-9]/)) strength += 25;
  
  return strength;
}

export function getPasswordStrengthText(strength: number): {
  text: string;
  className: string;
} {
  if (strength < 50) {
    return {
      text: "Weak",
      className: "text-duoRed"
    };
  } else if (strength < 75) {
    return {
      text: "Medium",
      className: "text-duoYellow"
    };
  } else {
    return {
      text: "Strong",
      className: "text-duoGreen"
    };
  }
}

export function getPasswordStrengthColor(strength: number): string {
  if (strength < 50) {
    return "bg-duoRed";
  } else if (strength < 75) {
    return "bg-duoYellow";
  } else {
    return "bg-duoGreen";
  }
}
