import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access the admin panel.");
      navigate("/login", { replace: true });
      return;
    }

    if (user?.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      navigate("/profile", { replace: true });
    }
  }, [user, isAuthenticated, navigate]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null; 
  }

  return <>{children}</>;
}
