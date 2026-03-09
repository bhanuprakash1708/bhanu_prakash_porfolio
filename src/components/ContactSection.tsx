import { useState } from "react";
import { Mail, MapPin, Send, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        let errorMessage = "Unable to send message right now. Please try again shortly.";
        try {
          const payload = await response.json();
          if (payload?.error && typeof payload.error === "string") {
            errorMessage = payload.error;
          }
        } catch {
          // Ignore JSON parse errors and keep fallback message
        }
        throw new Error(errorMessage);
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Unable to send message right now. Please try again shortly.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Communication
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-4"
        >
          Let's <span className="gradient-text">Connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-14 text-lg"
        >
          Have a project in mind or just want to say hi? I'm always open to discussing new opportunities.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="border border-border rounded-2xl p-8 space-y-5"
          >
            <h3 className="text-lg font-heading font-semibold mb-2">Send a Message</h3>
            <p className="text-sm text-muted-foreground mb-4">I'll get back to you within 24 hours.</p>
            
            {(["name", "email", "message"] as const).map((field) => (
              <div key={field}>
                <label className="text-sm text-muted-foreground capitalize block mb-2">{field === "name" ? "Your Name" : field === "email" ? "Your Email" : "Your Message"}</label>
                {field === "message" ? (
                  <textarea
                    rows={4}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full rounded-xl bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_0_3px_hsl(0_72%_51%/0.1)] resize-none transition-all duration-300"
                    placeholder={`Your ${field}...`}
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full rounded-xl bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_0_3px_hsl(0_72%_51%/0.1)] transition-all duration-300"
                    placeholder={`Your ${field}...`}
                  />
                )}
                {errors[field] && <p className="text-xs text-destructive mt-1.5">{errors[field]}</p>}
              </div>
            ))}
            <button
              type="submit"
              disabled={sending}
              className="btn-animated w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            >
              <Send size={14} />
              {sending ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
            </button>
            {submitError && <p className="text-xs text-destructive">{submitError}</p>}
          </motion.form>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-border rounded-2xl p-8"
          >
            <h3 className="text-lg font-heading font-semibold mb-6">Direct Contact</h3>
            <div className="space-y-5">
              <a href="mailto:bhanu.prakash1708@gmail.com" className="contact-card flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 group">
                <div className="contact-icon w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">bhanu.prakash1708@gmail.com</p>
                </div>
              </a>
              <a href="tel:+919154040882" className="contact-card flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80">
                <div className="contact-icon w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm text-foreground">+91-9154040882</p>
                </div>
              </a>
              <div className="contact-card flex items-center gap-4 p-4 rounded-xl bg-secondary">
                <div className="contact-icon w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm text-foreground">Hyderabad, India</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
