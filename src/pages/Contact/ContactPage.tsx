import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/common/Container";
import { ContactRepository } from "@/features/contact/repositories/contactRepository";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await ContactRepository.submitContactForm(data);
      if (res.success) {
        toast.success("Thank you. We will get back to you shortly.");
        reset();
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-20 text-white">
      <Container>
        {/* Hero */}
        <div className="mb-20 text-center">
          <h1 className="font-serif text-5xl md:text-7xl">Get in Touch</h1>
          <p className="mt-6 mx-auto max-w-2xl text-white/60 text-lg">
            Whether you have a question about our exclusive collections or need assistance with your order, our dedicated team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-3xl mb-8 text-[#C58A5C]">Send us a message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Full Name"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-5 outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    {...register("email")}
                    placeholder="Email Address"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-5 outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
                </div>
              </div>
              
              <div>
                <input
                  {...register("subject")}
                  placeholder="Subject"
                  disabled={isSubmitting}
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-5 outline-none focus:border-[#C58A5C] transition-colors"
                />
                {errors.subject && <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>}
              </div>

              <div>
                <textarea
                  {...register("message")}
                  placeholder="Your Message"
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-black/30 p-5 outline-none focus:border-[#C58A5C] transition-colors resize-none"
                />
                {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex h-14 w-full items-center justify-center rounded-full bg-[#C58A5C] font-semibold text-black transition hover:bg-[#b07850] disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info & Map Placeholder */}
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-3xl mb-8 text-[#C58A5C]">Visit Our Studio</h2>
              <div className="space-y-6 text-white/70">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#C58A5C] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Studio Address</p>
                    <p className="leading-relaxed">
                      Soul Studio — Un Arte Ventura<br />
                      12, Gallery Lane, Indiranagar<br />
                      Bengaluru, Karnataka 560038<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-[#C58A5C] shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-[#C58A5C] transition-colors">+91 98765 43210</a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-[#C58A5C] shrink-0" />
                  <a href="mailto:hello@soulstudio.in" className="hover:text-[#C58A5C] transition-colors">hello@soulstudio.in</a>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-[#C58A5C] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Studio Hours</p>
                    <p>Mon – Sat: 10 AM – 7 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <p className="text-white/40 tracking-widest uppercase text-sm">Interactive Map Placeholder</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
