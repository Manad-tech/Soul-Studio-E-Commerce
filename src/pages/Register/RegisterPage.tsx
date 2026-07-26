import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ShieldCheck, Mail } from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import { useAuth } from "@/features/auth/hooks/useAuth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerAuth, isLoading } = useAuth();
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [tempCredentials, setTempCredentials] = useState<RegisterFormValues | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmitCredentials = async (data: RegisterFormValues) => {
    // Hold credentials and trigger simulated OTP dispatch
    setTempCredentials(data);
    setShowOtpStep(true);
    toast.info("A 4-digit OTP has been sent to your email. (Use Code: 1234)");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (otpValue === "1234") {
      if (tempCredentials) {
        await registerAuth(tempCredentials);
      }
    } else {
      setOtpError("Invalid verification code. Please enter '1234' to verify.");
      toast.error("Incorrect verification code");
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center py-20 bg-[#0D0D0D]">
      <Container>
        <div className="mx-auto max-w-md rounded-[32px] border border-white/10 bg-[#111111] p-10 shadow-2xl">
          
          {!showOtpStep ? (
            <>
              <h1 className="text-center font-serif text-4xl text-white">Create Account</h1>
              <p className="mt-2 text-center text-white/60">Join Soul Studio collectors.</p>
              
              <form onSubmit={handleSubmit(onSubmitCredentials)} className="mt-8 space-y-5">
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Full Name"
                    disabled={isLoading}
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-5 text-white outline-none focus:border-[#C58A5C] transition-colors disabled:opacity-50"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email address"
                    disabled={isLoading}
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-5 text-white outline-none focus:border-[#C58A5C] transition-colors disabled:opacity-50"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Password (Min 8 chars)"
                    disabled={isLoading}
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-5 text-white outline-none focus:border-[#C58A5C] transition-colors disabled:opacity-50"
                  />
                  {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-[#C58A5C] font-semibold text-black transition hover:bg-[#b07850] disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Sign Up"}
                </button>
              </form>

              <p className="mt-8 text-center text-white/60">
                Already have an account? <Link to="/login" className="text-[#C58A5C] hover:underline">Log In</Link>
              </p>
            </>
          ) : (
            // OTP verification step layout
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-[#C58A5C]/10 text-[#C58A5C] mb-2">
                  <ShieldCheck size={32} />
                </div>
                <h1 className="font-serif text-3xl text-white">Verify Account</h1>
                <p className="text-sm text-white/50">
                  We've sent a verification code to <strong className="text-white">{tempCredentials?.email}</strong>
                </p>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-4.5 text-white/40" size={18} />
                  <input 
                    type="text"
                    maxLength={4}
                    placeholder="Enter 4-Digit OTP"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 pl-12 pr-4 text-center tracking-[0.5em] font-bold text-white text-lg outline-none focus:border-[#C58A5C] transition-colors"
                  />
                </div>
                {otpError && <p className="text-xs text-red-400 mt-1 text-center">{otpError}</p>}
              </div>

              <button 
                type="submit"
                className="w-full h-12 rounded-full bg-[#C58A5C] text-black font-semibold hover:bg-[#b07850] transition cursor-pointer"
              >
                Verify & Authorize
              </button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => {
                    setOtpValue("");
                    setOtpError("");
                    toast.success("New OTP sent. Check email (Code: 1234)");
                  }}
                  className="text-xs text-[#C58A5C] hover:underline"
                >
                  Resend OTP Code
                </button>
              </div>
            </form>
          )}

        </div>
      </Container>
    </section>
  );
}
