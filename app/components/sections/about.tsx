"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/app/components/ui/card";
import { Code2, Palette, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        backgroundPosition: '200% center',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
              markers: false
            }
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
    <section id="about" className="section-padding overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2
                ref={textRef}
                className="text-5xl font-bold mb-12 font-archivo text-transparent bg-gradient-to-r from-gray-600 via-white to-gray-600 bg-[length:300%_200%] bg-clip-text"
            >
              {'I Aspire To Be A Driving Force Behind A Future Where Design Tech Is A Catalyst For Positive Change'}
            </h2>
          </div>
          <div>
            <h3 className="text-xl font-small mb-4 tracking-widest font-archivo">{'WHO  AM I'}</h3>
            <p className="text-muted-foreground">
            {'An experienced fullstack software engineer with a strong track record of success in high-profile projects. Shubham Kumar Sahoo here, a proud 2022 graduate from PES University (CSE | BTech). Beyond my knack for coding, I absolutely thrive on gaming, Marvel, and travelling.\n' +
                  'Last 2 years, hardcore focus on front-end development on top of React and Typescript with intermediate experience on backend technologies. Worked with 4-5 member teams, operating at maximum capacity under strict deadlines as an Individual Contributor - thanks to the Startup Hustle🔥!'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6" ref={addToRefs}>
            <Code2 className="h-12 w-12 mb-4 text-primary"/>
            <h3 className="text-lg font-semibold mb-2">Clean Code</h3>
            <p className="text-muted-foreground">
              Writing maintainable, scalable, and well-documented code is my priority.
            </p>
          </Card>

          <Card className="p-6" ref={addToRefs}>
            <Palette className="h-12 w-12 mb-4 text-primary"/>
            <h3 className="text-lg font-semibold mb-2">Modern Design</h3>
            <p className="text-muted-foreground">
              Creating beautiful, responsive interfaces that provide great user experiences.
            </p>
          </Card>

          <Card className="p-6" ref={addToRefs}>
            <Rocket className="h-12 w-12 mb-4 text-primary"/>
            <h3 className="text-lg font-semibold mb-2">Performance</h3>
            <p className="text-muted-foreground">
              Optimizing applications for speed and efficiency across all devices.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}