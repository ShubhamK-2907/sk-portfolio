"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/app/components/ui/button";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const ctaRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const heroElement = heroRef.current;

            if (heroElement) {
                const heroHeight = heroElement.offsetHeight;

                gsap.to([headingRef.current, subtitleRef.current, ctaRef.current], {
                    y: heroHeight * 0.3, // Moves elements up slightly
                    opacity: 0,
                    duration: 2.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: heroElement,
                        start: "top top",
                        end: "90% top",
                        scrub: true,
                    },
                });

                // Smooth video parallax effect
                const videoElement = videoRef.current;
                if (videoElement) {
                    gsap.to(videoElement, {
                        y: 30, // Moves the video down by 150px
                        ease: "none",
                        scrollTrigger: {
                            trigger: heroElement,
                            start: "70% bottom", // Starts when the bottom 30% of hero is visible
                            end: "bottom top", // Ends when the bottom of the hero is offscreen
                            scrub: true,
                        },
                    });
                }
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/assets/videos/hero_shubham_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 px-4 md:px-8 max-w-4xl">
                <h1
                    ref={headingRef}
                    className="relative text-white font-bold mb-6 font-archivo"
                >
                    <span className="absolute top-[-2rem] text-sm md:text-2xl block">
                        {"Hi, I'm"}
                    </span>
                    <span className="text-5xl md:text-6xl lg:text-8xl whitespace-nowrap leading-tight">
                        SHUBHAM
                    </span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-md md:text-lg lg:text-xl text-gray-300 mb-8 font-archivo"
                >
                    A passionate developer dedicated to creating innovative solutions for
                    real-world problems
                </p>
                <div ref={ctaRef} className="flex flex-col items-center gap-6">
                    <div className="flex gap-4">
                        <Button size="lg" asChild>
                            <a href="#contact">Get in Touch</a>
                        </Button>
                    </div>
                    <div className="mt-10 animate-bounce">
                        <ArrowDown className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
