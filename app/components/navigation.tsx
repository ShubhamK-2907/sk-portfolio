"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import gsap from "gsap";

export function Navigation() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const nameRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (nameRef.current) {
            const timeline = gsap.timeline({ paused: true });

            timeline
                .to(nameRef.current, {
                    width: "auto",
                    padding: "0 10px",
                    duration: 0.5,
                    ease: "power2.out",
                })
                .to(nameRef.current.querySelector(".expanded"), {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power1.out",
                });

            nameRef.current.addEventListener("mouseenter", () => {
                timeline.play();
            });

            nameRef.current.addEventListener("mouseleave", () => {
                timeline.reverse();
            });
        }
    }, []);

    return (
        <nav className=" fixed inset-x-0 top-0 bg-background/20 backdrop-blur-sm z-50 border-b w-full overflow-hidden">
            <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" aria-label="Shubham Kumar Sahoo">
                            <span
                                ref={nameRef}
                                className="flex items-center overflow-hidden whitespace-nowrap w-[40px] transition-all"
                            >
                                <span className="text-white font-archivo">©</span>
                                <span className="text-white font-bold font-archivo">SK</span>
                                <span className="expanded text-white opacity-0 ml-2 font-archivo">
                                    | Shubham Kumar Sahoo
                                </span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/#about" className="hover:text-primary transition-colors">
                            About
                        </Link>
                        <Link href="/#experience" className="hover:text-primary transition-colors">
                            Experience
                        </Link>
                        <Link href="/#projects" className="hover:text-primary transition-colors">
                            Projects
                        </Link>
                        <Link href="/#contact" className="hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden w-full">
                    <div className="px-4 pt-2 pb-3 space-y-2">
                        <Link
                            href="/#about"
                            className="block px-3 py-2 rounded-md hover:bg-accent transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/#experience"
                            className="block px-3 py-2 rounded-md hover:bg-accent transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Experience
                        </Link>
                        <Link
                            href="/#projects"
                            className="block px-3 py-2 rounded-md hover:bg-accent transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/#contact"
                            className="block px-3 py-2 rounded-md hover:bg-accent transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}