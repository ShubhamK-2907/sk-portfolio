"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import { init, send } from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Github, Mail, MessageSquare, Send, AlertCircle, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    emailjs.init({publicKey: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    // Validate inputs
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!subject.trim()) {
      alert("Please enter a subject");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
          },
          {publicKey: process.env.NEXT_PUBLIC_EMAILJS_USER_ID}
      );

      setSubmitStatus("success");
      alert("Message sent successfully!");

      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setSubmitStatus("error");
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          }
      );
    }
  }, []);

  return (
      <section id="contact" className="section-padding bg-muted/30" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2 font-archivo">GET IN TOUCH</p>
            <h2
                className="tracking-widest text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[8rem] font-extrabold leading-none font-archivo"
                style={{letterSpacing: "-0.05em", color: "white"}}
            >
              <span className="text-white">CON</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-muted-foreground">
              TACT
            </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">{'LET\'S CONNECT'}</h3>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:shubhamk2907@example.com" className="text-muted-foreground hover:text-primary">
                        {'shubhamk2907@example.com'}
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Social</p>
                      <a href="https://www.linkedin.com/in/shubham-kumar-sahoo2907/" className="text-muted-foreground hover:text-primary">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <Github className="h-4 w-4 mr-2" />
                    <div>
                      <p className="font-medium">Social</p>
                      <a href="https://github.com/ShubhamK-2907/" className="text-muted-foreground hover:text-primary">
                        Github
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <Card className="p-6">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea
                      placeholder="Your Message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
  );
}