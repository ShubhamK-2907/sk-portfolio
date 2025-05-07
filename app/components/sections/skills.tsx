"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/app/components/ui/card";
import { CodeIcon } from "lucide-react";
import dynamic from "next/dynamic";

type Skill = {
    name: string;
    percentage: number;
    category: string;
};

const skills: Skill[] = [
    { name: "React", percentage: 95, category: "Frontend" },
    { name: "TypeScript", percentage: 95, category: "Frontend" },
    { name: "Next.js", percentage: 95, category: "Frontend" },
    { name: "Tailwind CSS", percentage: 95, category: "Frontend" },
    { name: "SASS", percentage: 95, category: "Frontend" },
    { name: "Redux", percentage: 95, category: "Frontend" },
    { name: "JQuery", percentage: 95, category: "Frontend" },
    { name: "GCP", percentage: 70, category: "Backend" },
    { name: "Node.js", percentage: 70, category: "Backend" },
    { name: "MySQL", percentage: 70, category: "Backend" },
    { name: "Firebase", percentage: 70, category: "Backend" },
    { name: "AWS", percentage: 50, category: "Backend" },
    { name: "Docker", percentage: 90, category: "DevOps" },
    { name: "CI/CD", percentage: 90, category: "DevOps" },
];

export function Skills() {
    const sectionRef = useRef(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const skillsRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            Promise.all([
                import("gsap"),
                import("gsap/ScrollTrigger")
            ]).then(([gsapModule, scrollTriggerModule]) => {
                const localGsap = gsapModule.gsap;
                const localScrollTrigger = scrollTriggerModule.ScrollTrigger;

                localGsap.registerPlugin(localScrollTrigger);

                const ctx = localGsap.context(() => {
                    if (textRef.current) {
                        localGsap.fromTo(
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

                    skillsRefs.current.forEach((skillBar, index) => {
                        const progressBar = skillBar.querySelector('.progress-bar');
                        const percentageSpan = skillBar.querySelector('.percentage-text');

                        localGsap.fromTo(
                            progressBar,
                            { width: 0 },
                            {
                                width: `${skills[index].percentage}%`,
                                duration: 1.5,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: skillBar,
                                    start: "top bottom-=100",
                                    end: "bottom center",
                                    toggleActions: "play none none reverse",
                                    markers: false,
                                    onUpdate: (self) => {
                                        if (percentageSpan) {
                                            const currentProgress = Math.round(self.progress * skills[index].percentage);
                                            percentageSpan.textContent = `${skills[index].percentage}%`;
                                        }
                                    },
                                },
                            }
                        );
                    });
                }, sectionRef);

                return () => ctx.revert();
            });
        }
    }, []);

    const addToRefs = (el: HTMLDivElement) => {
        if (el && !skillsRefs.current.includes(el)) {
            skillsRefs.current.push(el);
        }
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section id="skills" className="section-padding bg-muted/30" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-12">
                    <div ref={textRef} className="relative text-center">
                        <h1
                            className="text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[8rem] tracking-widest font-extrabold leading-none font-archivo"
                            style={{ letterSpacing: "-0.05em" }}
                        >
                            SKILLS
                        </h1>
                    </div>
                </div>

                <div className="space-y-8">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <Card key={category} className="p-4 sm:p-6 lg:p-8 shadow-md rounded-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                    <CodeIcon className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold">{category} Skills</h2>
                            </div>

                            <div className="space-y-4">
                                {categorySkills.map((skill, index) => (
                                    <div
                                        key={skill.name}
                                        ref={addToRefs}
                                        className="skill-bar-container"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm sm:text-base font-medium">{skill.name}</span>
                                            <span className="percentage-text text-xs text-muted-foreground">0%</span>
                                        </div>
                                        <div className="w-full bg-muted/50 rounded-full h-2.5">
                                            <div
                                                className="progress-bar bg-gray-400 h-2.5 rounded-full"
                                                style={{ width: 0 }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}