import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useGSAP = () => {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Initialize ScrollSmoother for buttery smooth scrolling
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2, // Smoothness level (0-3)
      effects: true, // Enable data-speed effects
      smoothTouch: 0.1, // Smooth scrolling on touch devices
      normalizeScroll: true, // Normalize scroll across browsers
      ignoreMobileResize: true, // Better mobile performance
    });

    // Refresh ScrollTrigger when smoother is ready
    ScrollTrigger.refresh();

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      ScrollTrigger.killAll();
    };
  }, []);

  return smootherRef.current;
};

export const useScrollAnimations = () => {
  useEffect(() => {
    // Fade in animations for sections
    gsap.utils.toArray('.gsap-fade-in').forEach((element: any) => {
      gsap.fromTo(element, 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Slide in from left animations
    gsap.utils.toArray('.gsap-slide-left').forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          x: -100
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Slide in from right animations
    gsap.utils.toArray('.gsap-slide-right').forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          x: 100
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Scale animations for cards
    gsap.utils.toArray('.gsap-scale').forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stagger animations for grid items
    gsap.utils.toArray('.gsap-stagger').forEach((container: any) => {
      const items = container.querySelectorAll('.gsap-stagger-item');
      gsap.fromTo(items,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effects for background elements
    gsap.utils.toArray('.gsap-parallax').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Text reveal animations
    gsap.utils.toArray('.gsap-text-reveal').forEach((element: any) => {
      const text = element.textContent;
      element.innerHTML = text.split('').map((char: string) => 
        char === ' ' ? ' ' : `<span class="inline-block">${char}</span>`
      ).join('');

      const chars = element.querySelectorAll('span');
      gsap.fromTo(chars,
        {
          opacity: 0,
          y: 20,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.05,
          ease: "power2.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);
};