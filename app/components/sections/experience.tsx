"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/app/components/ui/card";
import { Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Astria Digital",
    position: "Software Engineer",
    period: "Feb 2025 - Present",
    description: [
      "Developed a scalable communication platform using Twilio Studio Flow and Flex UI",
      "Deployed a real-time dashboard UI with dynamic tables, task queues, and interactive metrics (AHT, CSAT, volume, resolution rates)",
      "Integrated Twilio voicemail flow with AWS Lambda to trigger smart routing based on agent availability",
    ],
  },
  {
    company: "Udooh",
    position: "Software Engineer",
    period: "May 2024 - Jan 2025",
    description: [
      "Leading the platform UI development and MVP definition to acquire the first set of paying customers",
      "Built a dynamic, responsive discovery website paired with ZCal meeting Scheduler and GCP serverless Cloud Run Function",
      "Developed the Admin UI for the sales and monitoring team",
      "Designed and implemented the Experience module for MSME merchants",
      "Built the Channels UI to expedite the requirement for a virtual channel embed into merchants' browsers/signage",
      "Containerized the ReactJS platform UI on Docker and deployed Dev and Production Environments on Railway",
    ],
  },
  {
    company: "Lifesight.io",
    position: "Associate Software Engineer",
    period: "July 2022 - April 2024",
    description: [
      "Ownership of Customer Engage Module: Template Builder, Email, SMS and Whatsapp Campaign Orchestration",
      "Ownership of major measurement feature-sets: Attribution, MMM, Incrementality with Causal Inference for optimized marketing strategies",
      "Ownership of Integrate module: Custom app integrations [C-API] like Shiprocket, Google-ads, Facebook-ads, X-ads, Snapchat, etc",
      "Enabled platform analytics solutions [SessionStack, Heap, Segment] for the growth and prod-ops team",
    ],
  },
  {
    company: "Lifesight.io",
    position: "Product Intern",
    period: "Jan 2022 - June 2022",
    description: [
      "Created PRDs, detailed epics and user stories based on product requirements and scope from stakeholders",
      "Ideated holistic dashboards for data-driven decisions and tracking insights for Customer profiles",
      "Worked closely in benchmarking the messaging orchestration partners, involving Sendgrid and Twilio SMS",
    ],
  },
];

export function Experience() {
  const sectionRef = useRef(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (textRef.current) {
        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              scrollTrigger: {
                trigger: textRef.current,
                start: "top bottom",
                end: "top center",
                toggleActions: "play none none reverse",
                markers: false,
              },
            }
        );
      }

      // Animate experience cards
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
            card,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: i * 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                end: "bottom center",
                toggleActions: "play none none reverse",
                markers: false,
              },
            }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
      <section
          id="experience"
          className="section-padding bg-muted/30 w-full" // Added w-full to ensure full width
          ref={sectionRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Changed to container */}
          <div className="flex flex-col items-center mb-12">
            <div ref={textRef} className="relative text-center w-full"> {/* Added w-full */}
              <h1
                  className="text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[8rem] tracking-widest font-extrabold leading-none font-archivo"
                  style={{ letterSpacing: "-0.05em" }}
              >
                EXPERIENCE
              </h1>
            </div>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
                <Card
                    key={index}
                    className="p-4 sm:p-6 lg:p-8 shadow-md rounded-lg w-full" // Added w-full
                    ref={addToRefs}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">{exp.position}</h3>
                      <p className="text-primary font-medium text-sm sm:text-base">{exp.company}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2">{exp.period}</p>
                      <ul className="text-muted-foreground list-disc list-inside text-xs sm:text-sm">
                        {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
            ))}
          </div>
        </div>
      </section>
  );
}