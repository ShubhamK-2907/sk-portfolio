"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "UDOOH Website",
    description: "A full-featured discovery website built with Next.js and Typescript",
    image: "/assets/photos/udoohWebsite.svg",
    technologies: ["Next.js", "TypeScript", "SASS", "Docker"],
    live: "https://www.udooh.com/",
  },
  {
    title: "UDOOH Platform UI",
    description: "A public website designed to facilitate DOOH dynamic ad campaigns scheduling",
    image: "/assets/photos/udoohPlatform.svg",
    technologies: ["React", "Typescript", "Docker", "Firebase"],
    live: "https://app.udooh.com/",
  },
  {
    title: "Real Estate Discovery UI App",
    description: "A modern real estate application optimized for mobile and tablet devices.",
    image: "/assets/photos/real_estate_new.jpg",
    technologies: ["React", "TypeScript", "SASS", "Vite", "Docker"],
    github: "https://github.com/ShubhamK-2907/real-estate-application",
  },
  {
    title: "Generic AVL Project",
    description: "This project implements a generic AVL tree using C++ templates",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["C++ templates"],
    github: "https://github.com/ShubhamK-2907/generic-AVL-Project",
  },
  {
    title: "My Pathfinder Visualiser",
    description: "The Pathfinding Algorithm Visualizer is an interactive tool developed using Svelte and TypeScript to demonstrate and analyze pathfinding algorithms [A*, BFS, DFS, and Dijkstra]",
    image: "/assets/photos/pathfinderVisualiser.svg",
    technologies: ["Typescript", "Svelte"],
    github: "https://github.com/ShubhamK-2907/MyPathFinder",
    live: "https://my-path-finder.vercel.app/"
  },
  {
    title: "Clumsy Bird",
    description: "A flappy bird control game built on top of vanilla JS",
    image: "/assets/photos/clumsyBird.svg",
    technologies: ["Javascript", "Grunt"],
    github: "https://github.com/ShubhamK-2907/clumsy-bird",
  },
];

export function Projects() {
  const sectionRef = useRef(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
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
      <section id="projects" className="section-padding bg-black text-white" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12">
            <p className="text-sm font-light tracking-wider text-muted-foreground mb-4 font-archivo">FEATURED</p>
            <div ref={textRef} className="relative text-center">
              <h1
                  className="text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[8rem] tracking-widest font-extrabold leading-none font-archivo"
                  style={{ letterSpacing: "-0.05em", color: "white" }}
              >
                WORK
              </h1>
            </div>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden" ref={addToRefs}>
                  <div className="relative h-48 sm:h-56 lg:h-64">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 font-archivo">{project.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 font-archivo">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                          <span
                              key={i}
                              className="px-2 py-1 bg-primary/10 rounded-full text-xs md:text-sm font-archivo"
                          >
                      {tech}
                    </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {project.github && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                      )}
                      {project.live && (
                          <Button size="sm" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live
                            </a>
                          </Button>
                      )}
                    </div>
                  </div>
                </Card>
            ))}
          </div>
        </div>
      </section>
  );
}
