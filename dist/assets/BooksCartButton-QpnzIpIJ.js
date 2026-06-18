import{c as a,u as n,j as o}from"./index-FOwXK0BM.js";import{u as i}from"./navigation-DyL9qzwr.js";/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],l=a("shopping-cart",u),d=()=>{const r=i(),t=n(e=>e.items).reduce((e,c)=>e+c.quantity,0);if(t===0)return null;const s=()=>{r.push("/checkout")};return o.jsxs("button",{type:"button",onClick:s,className:"fixed bottom-24 left-4 z-[60] flex items-center gap-2 rounded-full border border-[#249EDC] bg-white px-4 py-2.5 font-['Montserrat'] text-sm font-semibold text-[#007BB5] shadow-[0_8px_24px_rgba(36,158,220,0.25)] transition-all hover:scale-[1.03] hover:bg-[#EAF7FF] sm:bottom-6 sm:left-6","aria-label":`Go to checkout with ${t} items`,children:[o.jsx(l,{size:18,"aria-hidden":!0}),o.jsxs("span",{children:["My Cart (",t,")"]})]})};export{d as B};
