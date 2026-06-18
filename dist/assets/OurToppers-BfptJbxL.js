import{r as l,j as e}from"./index-FOwXK0BM.js";import{u as c,b as m,g as o}from"./Header-BVUDvGGv.js";import{S as x}from"./ScrollTrigger-D1XJUMov.js";import{O as p,g as d,a as u,t as f}from"./ourToppers-I7Wx8Pgx.js";import"./image-Xt4rwSCV.js";import"./navigation-DyL9qzwr.js";o.registerPlugin(x);const y=()=>{const r=l.useRef(null),n=c(),a=l.useMemo(()=>p.map((s,t)=>({...s,description:s.course,...d(t)})),[]),i=l.useMemo(()=>[...a,...a],[a]);return m(()=>{n||o.from(".our-toppers-heading",{y:50,opacity:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:r.current,start:"top 65%",once:!0}})},{dependencies:[n],scope:r}),e.jsxs("section",{ref:r,className:"relative flex w-full min-h-[480px] flex-col items-center overflow-hidden pb-0 pt-0 md:min-h-[520px]",children:[e.jsx("img",{src:"/assets/our-centers/centers-bg.png",alt:"Background",className:"absolute inset-0 z-0 h-full w-full object-cover"}),e.jsxs("div",{className:"relative z-10 flex w-full max-w-[1900px] flex-col items-center",children:[e.jsx("div",{className:"our-toppers-heading mt-6 text-center md:mt-8",children:e.jsx("h2",{className:"global-section-heading",children:"OUR TOPPERS"})}),e.jsx("p",{className:"our-toppers-heading mx-auto mb-0 max-w-[800px] px-6 text-center text-[13px] font-medium leading-snug text-[#2A3742] md:text-[15px]",children:u}),e.jsx("div",{className:"w-full -mt-2 overflow-hidden -translate-y-10 md:-translate-y-14",children:e.jsx("div",{className:"course-toppers-track flex w-max gap-0",children:i.map((s,t)=>e.jsxs("div",{className:"-ml-16 flex shrink-0 flex-col items-center overflow-visible first:ml-0 md:-ml-20 lg:-ml-24",children:[e.jsx("div",{className:"relative flex h-[320px] w-full items-end justify-center overflow-visible sm:h-[360px] lg:h-[400px]",children:e.jsx("img",{src:f(s.img),alt:s.name,loading:t<6?"eager":"lazy",className:"pointer-events-none block h-[320px] w-auto max-w-[340px] select-none object-contain object-bottom sm:h-[360px] sm:max-w-[380px] lg:h-[400px] lg:max-w-[420px]",style:{transform:`translateY(${s.y-28}px) scale(${s.scale})`,transformOrigin:"bottom center"}})}),e.jsxs("div",{className:"relative z-20 -mt-3 flex min-h-[76px] flex-col items-center justify-start px-1 text-center sm:-mt-4",children:[e.jsx("h3",{className:"max-w-full truncate text-[14px] font-bold leading-tight text-white md:text-[15px]",children:s.name}),e.jsx("span",{className:"topper-air-badge mt-1.5",children:s.rank}),e.jsx("span",{className:"mt-2.5 text-center text-[12px] text-white opacity-90",children:s.description})]})]},`${s.name}-${t}`))})})]}),e.jsx("style",{jsx:!0,children:`
        .course-toppers-track {
          animation: courseToppersScroll 55s linear infinite;
          will-change: transform;
        }

        .course-toppers-track:hover {
          animation-play-state: paused;
        }

        @keyframes courseToppersScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .course-toppers-track {
            animation: none;
            transform: none;
          }
        }
      `})]})};export{y as default};
