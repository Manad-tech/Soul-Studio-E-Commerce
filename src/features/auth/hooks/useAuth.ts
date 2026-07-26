import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthRepository } from "../repositories/authRepository";
import type { LoginPayload, RegisterPayload, User } from "../types";

export function useAuth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const response = await AuthRepository.login(payload);
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        setUser(user);
        toast.success(`Welcome back, ${user.name}`);
        navigate("/profile");
      }
    } catch (error: any) {
      // The interceptor might catch this too, but we handle UI state here
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const response = await AuthRepository.register(payload);
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        setUser(user);
        toast.success(`Welcome to Soul Studio, ${user.name}`);
        navigate("/profile");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };
}
