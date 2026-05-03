'use client';

import React, { useRef, useEffect } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const NUM_NODES = 60;
const NODE_RADIUS = 4;
const SPEED = 0.4;
const MAX_DIST = 220;
const DOT_COLOR = 'rgba(0, 100, 180, 0.12)';

interface Node {
  x: number; y: number; vx: number; vy: number;
}

interface Props {
  course: CourseData;
}

const CourseDescription: React.FC<Props> = ({ course }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let nodes: Node[] = [];

    const init = (w: number, h: number) => {
      nodes = Array.from({ length: NUM_NODES }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
      }));
    };

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      init(w, h);
    };

    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = DOT_COLOR;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 100, 180, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Background animation
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          once: true,
        }
      }
    );

    // Text animation
    gsap.fromTo('.course-description-text',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.course-description-text',
          start: 'top 85%',
          once: true,
        }
      }
    );
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  const city = course.city || 'delhi';

  let bgStyle: React.CSSProperties = {};
  
  // Shared style for the gradient text
  const gradientTextStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  };

  let descriptionContent = null;

  if (city === 'hyderabad') {
    // Hyderabad: Recreated from the screenshot using pure CSS gradients for sharp and soft circles
    bgStyle = {
      background: `
        /* Bottom-left partial white circle */
        radial-gradient(circle 120px at 0% 100%, #ffffff 0%, #ffffff 99.9%, transparent 100%),
        /* Right-middle partial white circle */
        radial-gradient(circle 100px at 100% 50%, #ffffff 0%, #ffffff 99.9%, transparent 100%),
        /* Top-left soft white/blue glow */
        radial-gradient(circle 400px at 15% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
        /* Base soft blue/cyan gradient */
        linear-gradient(135deg, #d8effa 0%, #f4fbfe 100%)
      `
    };
  } else if (city === 'pune') {
    // Pune: Standard background image with lightening overlay
    bgStyle = {
      backgroundImage: "url('/assets/course/course-des-bg-pune.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backgroundBlendMode: 'lighten',
    };
  } else {
    // Delhi (or fallback): Standard background image with lightening overlay
    bgStyle = {
      backgroundImage: "url('/assets/course/course-des-bg-del.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backgroundBlendMode: 'lighten',
    };
  }

  if (course.slug === 'prelims-test-series-mentorship') {
    descriptionContent = (
      <>
        For aspirants who seek structured guidance alongside testing, SRIRAM’s IAS offers a{' '}
        <span className="font-bold" style={gradientTextStyle}>
          Mentorship-Integrated Test Series
        </span>
        , a specialized variant designed for One to one mentorship support and strategic direction.
      </>
    );
  } else if (course.slug === 'mains-test-series-mentorship') {
    descriptionContent = (
      <>
        <span className="font-bold" style={gradientTextStyle}>
          UPSC CSE Main exam
        </span>{' '}
        is a crucial stage which involves written answers to all papers and makes the largest share of marks. The year long CSE Mains test series is designed to master the art of writing and strengthen hold over the Mains syllabus with graded preparation plan through multiple revisions. The outlined strategy will enhance the analytical skill, simulating the brainstorming required in exam hall which is essential to address the knowledge and its application gap early on. Let's start preparing at the earliest and knock on the doors of LBSNAA.
      </>
    );
  } else if (course.slug === 'csat-foundation') {
    descriptionContent = (
      <>
        If you're seeking the best{' '}
        <span className="font-bold" style={gradientTextStyle}>
          CSAT Course for UPSC Prelims 2026
        </span>{' '}
        in online or offline mode, look no further than SRIRAM's IAS. We are offering a comprehensive Civil Services Aptitude Test (CSAT) Course for CSE 2026, meticulously crafted to elevate your preparation and maximize your chances of success in the UPSC Civil Services Examination (CSE).
      </>
    );
  } else if (course.slug === 'interview-guidance-program') {
    descriptionContent = (
      <>
        The UPSC Civil Services Examination (CSE){' '}
        <span className="font-bold" style={gradientTextStyle}>
          Personality Test
        </span>{' '}
        is the final and most crucial stage of the Civil Services Examination, designed not to test specialized knowledge, but to assess a candidate's overall personal suitability for a career in public service. Our Interview Guidance Program (IGP) emphasises a shift in focus from knowledge acquisition to personality refinement and application of judgment.
      </>
    );
  } else if (course.slug === 'stride-mentorship-program') {
    descriptionContent = (
      <>
        Your Dreams Deserve a Proven Strategy, Every aspirant aims to crack the prestigious Civil Services Exam (CSE). However, only those who approach it strategically succeed. The{' '}
        <span className="font-bold" style={gradientTextStyle}>
          STRIDE Mentorship Program
        </span>{' '}
        is designed to provide structured, strategic, and holistic guidance to make you exam-ready for{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC CSE
        </span>. It offers comprehensive and handholding support to enhance your Civil Service Preparation.
      </>
    );
  } else if (course.slug === 'anthropology-optional-foundation') {
    descriptionContent = (
      <>
        Our{' '}
        <span className="font-bold" style={gradientTextStyle}>
          Anthropology Foundation Course
        </span>{' '}
        is a Comprehensive and Structured Learning Program Designed Specifically for{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC Civil Services Examination (CSE)
        </span>{' '}
        Aspirants who have opted for Anthropology as their Optional Subject. It covers the key areas and topics in Anthropology optional like Socio-Cultural Anthropology, Physical Anthropology, Archaeological Anthropology, Primatology, Indian Anthropology, Tribal Anthropology in a systematic and structured manner.
      </>
    );
  } else if (course.slug === 'geography-optional-foundation') {
    descriptionContent = (
      <>
        The{' '}
        <span className="font-bold" style={gradientTextStyle}>
          Geography Optional Foundation Course
        </span>{' '}
        is a precisely designed academic program tailored for aspirants of the{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC Civil Services Examination
        </span>{' '}
        who have opted for Geography as their optional subject. This course offers a comprehensive and integrated approach, focusing on conceptual clarity, analytical depth, and applied understanding. It ensures systematic coverage of both Paper I and Paper II of the Geography syllabus while simultaneously aligning theoretical foundations with practical Answer-Writing competence and contemporary relevance. The program is suited for both first-time aspirants and repeat candidates seeking structured guidance and academic enrichment.
      </>
    );
  } else if (course.slug === 'psir-optional-foundation') {
    descriptionContent = (
      <>
        Our{' '}
        <span className="font-bold" style={gradientTextStyle}>
          Political Science & International Relations (PSIR) Foundation Course
        </span>{' '}
        is a Comprehensive and Structured Learning Program Designed Specifically for{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC CSE
        </span>{' '}
        Aspirants who have opted for PSIR as their Optional Subject. With a Strong Focus on Conceptual Clarity, Answer-Writing Skills, and Contemporary Relevance, the Course blends Academic Depth with UPSC-Specific Strategy. From Political Theory to Global Affairs, we cover the Entire Syllabus in a Result-oriented Manner.
      </>
    );
  } else if (course.slug === 'sociology-optional-foundation') {
    descriptionContent = (
      <>
        Our{' '}
        <span className="font-bold" style={gradientTextStyle}>
          Sociology Foundation Course
        </span>{' '}
        is a Comprehensive and Structured Learning Program Designed Specifically for{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC Civil Services Examination (CSE)
        </span>{' '}
        Aspirants who have opted for Sociology as their Optional Subject. The Course Ensures Conceptual Clarity, Answer-Writing Practice and Integration of Current Affairs. It Covers Key Topics like Sociological Theories, Indian Society, and Social Institutions, Along with PYQ Analysis, Personalized Mentorship, and Value-added Resources for Effective Preparation.
      </>
    );
  } else if (course.slug === '1-year-gs-foundation') {
    descriptionContent = (
      <>
        <span className="font-bold" style={gradientTextStyle}>
          SRIRAM’s IAS General Studies (Prelims + Mains) Classroom Foundation Course
        </span>{' '}
        is a Comprehensive and Well-structured Program Tailored for Aspirants of the{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC Civil Services Examination (CSE)
        </span>. The Course is Designed to Ensure Complete Coverage of the General Studies Syllabus for Both Prelims and Mains, While also Integrating Skill-Building Sessions in Answer Writing, Current Affairs Analysis and Personality Development. It Aims to Create a Strong Foundation by Combining Expert Guidance, Reliable Study Resources and Continuous Assessment. The Course is Ideal for Both Beginners and Re-Attempters who Seek Disciplined, Guided and Result-Oriented Preparation.
      </>
    );
  } else if (course.slug === 'ncert-foundation') {
    descriptionContent = (
      <>
        <span className="font-bold" style={gradientTextStyle}>
          The NCERT Foundation Program
        </span>{' '}
        has been Designed on the Principles of ‘Going Back to the Basics’. The Program will Bridge the Gap Between Basic Knowledge and Analytical Understanding Required for the{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC Civil Services Examination (CSE)
        </span>. The Program Offers Time Bound Preparation with focus on Fundamentals, Answer Writing, Current Affairs and Unique Revision Strategy along with Mentorship Support.
      </>
    );
  } else {
    descriptionContent = (
      <>
        <span className="font-bold" style={gradientTextStyle}>
          The {course.title.replace('\n', ' ').split(' - ')[0]}
        </span>{' '}
        is a comprehensively structured and result-oriented program designed to provide holistic preparation for the{' '}
        <span className="font-bold" style={gradientTextStyle}>
          UPSC Civil Services Examination (CSE)
        </span>. It integrates{' '}
        <span className="font-bold" style={gradientTextStyle}>
          Prelims, Mains
        </span>{' '}
        and Personality Development preparation with a strong focus on{' '}
        <span className="font-bold" style={gradientTextStyle}>
          conceptual clarity, strategic mentorship, and revision-based learning
        </span>. This course is ideal for{' '}
        <span className="font-bold" style={gradientTextStyle}>
          early starters
        </span>{' '}
        who seek a solid academic roadmap to success.
      </>
    );
  }

  return (
    <section
      ref={containerRef}
      className="w-full py-16 md:py-24 relative overflow-hidden flex items-center justify-center font-['Montserrat',sans-serif] border border-[rgba(255,255,255,0.1)]"
      style={bgStyle}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <p className="course-description-text text-left text-[16px] md:text-[24px] leading-[1.8] md:leading-[2.2] text-[#4b5563] transition-colors duration-300 hover:text-black">
          {descriptionContent}
        </p>
      </div>
    </section>
  );
};

export default CourseDescription;