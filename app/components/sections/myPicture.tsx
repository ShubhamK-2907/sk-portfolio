"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function MyPicture() {
    const imageRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (imageRef.current) {
            // Image zoom effect on scroll
            gsap.to(imageRef.current, {
                scale: 1.1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%", // Starts when the image is 80% from the top of the viewport
                    end: "bottom top",
                    scrub: true,
                },
            });
        }

        if (textRef.current) {
            // Text animation (slide from bottom-right, without bounce, and then exit)
            gsap.fromTo(
                textRef.current,
                {
                    x: 200, // Start from bottom-right off-screen
                    opacity: 0,
                },
                {
                    x: 0, // End at the bottom-left (after sliding in)
                    opacity: 1,
                    ease: "power1.out", // Smooth easing without bounce
                    duration: 1.5, // Duration of the slide-in animation
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 50%", // Start animation when the image reaches 50% of the viewport
                        end: "bottom top", // End animation when the image is out of view
                        scrub: true, // Synchronize the animation with the scroll position
                        onLeaveBack: () => {
                            // Reverse the animation as the user scrolls up
                            gsap.to(textRef.current, { x: 200, opacity: 0, ease: "power1.out" });
                        },
                    },
                }
            );
        }
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Image
                ref={imageRef}
                src="/assets/photos/myPicture.svg"
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                quality={90}
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div
                ref={textRef}
                className="absolute bottom-6 right-6 text-white font-bold font-archivo
                           text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl
                           leading-tight sm:leading-snug md:leading-snug lg:leading-none"
            >
                WANDERER.
            </div>
        </div>
    );
}
