import{r as m,j as e}from"./index-FOwXK0BM.js";import{u as d}from"./page-IuTVZW_1.js";import{t as f,O as h}from"./ourToppers-I7Wx8Pgx.js";import"./MainLayout-2Ds1BY8o.js";import"./Header-BVUDvGGv.js";import"./image-Xt4rwSCV.js";import"./navigation-DyL9qzwr.js";import"./Footer-DVCTt5Gy.js";import"./FloatingActions-G4zpuUf3.js";import"./ScrollTrigger-D1XJUMov.js";import"./courseAdapter-CyU8NHox.js";const i=h.map((a,t)=>({name:a.name,rank:a.rank,description:a.course,img:a.img,y:[35,15,45,28,18,10,5,12][t]??20,scale:[1,1.03,1.01,.98,.92,1,1,1][t]??1})),z=()=>{const{data:a}=d(),t=a==null?void 0:a.section3,n=m.useMemo(()=>{const s=(t==null?void 0:t.toppers)??[];return s.length===0?i:s.map((r,p)=>{const l=i[p%i.length];return{name:r.name,rank:r.rank,description:r.description??l.description,img:l.img,y:l.y,scale:l.scale}})},[t==null?void 0:t.toppers]),o=m.useMemo(()=>[...n,...n],[n]),c=(t==null?void 0:t.title)??"OUR TOPPERS",x=(t==null?void 0:t.subTitle)??"Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention.";return e.jsxs("section",{className:"relative w-full min-h-[520px] flex flex-col items-center pt-0 pb-0 overflow-hidden",children:[e.jsx("img",{src:"/assets/our-centers/centers-bg.png",alt:"Background",className:"absolute inset-0 z-0 h-full w-full object-cover"}),e.jsxs("div",{className:"relative z-10 w-full max-w-[1900px] flex flex-col items-center",children:[e.jsx("div",{className:"text-center mt-8 md:mt-10 pt-2",children:e.jsx("h2",{className:"global-section-heading",children:c})}),e.jsx("p",{className:"text-center text-[#2A3742] font-medium max-w-[800px] mx-auto text-[13px] md:text-[15px] leading-snug px-6 mb-0",children:x}),e.jsx("div",{className:"w-full -mt-2 overflow-hidden -translate-y-14 md:-translate-y-16",children:e.jsx("div",{className:"toppers-track flex w-max gap-0",children:o.map((s,r)=>e.jsxs("div",{className:"-ml-20 md:-ml-24 lg:-ml-28 first:ml-0 flex shrink-0 flex-col items-center overflow-visible",children:[e.jsx("div",{className:"relative flex h-[360px] w-full items-end justify-center overflow-visible sm:h-[400px] lg:h-[440px]",children:e.jsx("img",{src:f(s.img),alt:s.name,loading:r<5?"eager":"lazy",className:"block h-[360px] w-auto max-w-[400px] select-none object-contain object-bottom pointer-events-none sm:h-[400px] sm:max-w-[440px] lg:h-[460px] lg:max-w-[500px]",style:{transform:`translateY(${s.y-28}px) scale(${s.scale})`,transformOrigin:"bottom center"}})}),e.jsxs("div",{className:"-mt-3 flex min-h-[76px] flex-col items-center justify-start text-center relative z-20 px-1 sm:-mt-4",children:[e.jsx("h3",{className:"text-white text-[14px] md:text-[15px] font-bold leading-tight min-h-[20px] max-w-full truncate",children:s.name}),e.jsx("span",{className:"topper-air-badge mt-1.5",children:s.rank}),e.jsx("span",{className:"text-white text-[12px] opacity-90 text-center mt-2.5",children:s.description})]})]},`${s.name}-${r}`))})})]}),e.jsx("style",{jsx:!0,children:`
        .toppers-track {
          animation: toppersScroll 55s linear infinite;
          will-change: transform;
        }

        .toppers-track:hover {
          animation-play-state: paused;
        }

        @keyframes toppersScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `})]})};export{z as default};
