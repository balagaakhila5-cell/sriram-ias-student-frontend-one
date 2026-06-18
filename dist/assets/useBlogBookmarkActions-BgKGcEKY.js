import{c as f,r as s}from"./index-FOwXK0BM.js";import{u as N,b as U}from"./navigation-DyL9qzwr.js";import{l as m}from"./Header-BVUDvGGv.js";/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M16 12h2",key:"7q9ll5"}],["path",{d:"M16 8h2",key:"msurwy"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}],["path",{d:"M6 12h2",key:"32wvfc"}],["path",{d:"M6 8h2",key:"30oboj"}]],W=f("book-open-text",z);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],X=f("bookmark",L);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Q=f("chart-column",T);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],Y=f("lightbulb",V),j="blogBookmarks",B="blog-bookmarks-updated";function M(e){return`${j}_${e}`}function J(e){return`blog-${e}`}function u(e){return e.sourceCardId??e.id}function P(e){const n=new Set,a=[];return e.forEach(i=>{const t=u(i);!t||n.has(t)||(n.add(t),a.push({...i,id:t,sourceCardId:t}))}),a}function v(e,n){window.localStorage.setItem(M(e),JSON.stringify(n))}function S(e){if(typeof window>"u")return[];try{const n=window.localStorage.getItem(M(e)),a=n?JSON.parse(n):[],i=P(a);return JSON.stringify(a)!==JSON.stringify(i)&&v(e,i),i}catch{return[]}}function $(e,n){const a=J(n);return S(e).some(i=>i.slug===n||u(i)===a)}function I(e,n){return n?S(e).some(a=>u(a)===n):!1}function D(e,n){const a=n.id,i=S(e),h=i.findIndex(d=>u(d)===a)>=0,c=h?i.filter(d=>u(d)!==a):[...i,{...n,id:a,sourceCardId:a,bookmarkedAt:new Date().toISOString()}];return v(e,c),window.dispatchEvent(new Event(B)),!h}function K(e){return typeof window<"u"?`${window.location.origin}/blogs/${e}`:`/blogs/${e}`}function q(e){return`Check out ${e} on Sriram's IAS`}function Z(e,n="listing"){const a=N(),i=U(),t=m(o=>o.user),h=m(o=>o.isAuthenticated),c=m(o=>o.isHydrated),[d,l]=s.useState(!1),[x,b]=s.useState(null),r=K(e.slug),p=q(e.title),k=h&&(t==null?void 0:t.role)==="student",w=s.useCallback(()=>t!=null&&t.id?n==="detail"?$(t.id,e.slug):I(t.id,e.id):!1,[e.id,e.slug,n,t==null?void 0:t.id]);s.useEffect(()=>{if(!(t!=null&&t.id)){l(!1);return}l(w());const o=()=>{t!=null&&t.id&&l(w())};return window.addEventListener(B,o),()=>window.removeEventListener(B,o)},[w,t==null?void 0:t.id]);const C=s.useCallback(()=>{if(!c)return!1;if(!k||!(t!=null&&t.id)){const o=typeof window<"u"?`${window.location.pathname}${window.location.search}`:i||"/blogs",y=encodeURIComponent(o);return a.push(`/login?redirect=${y}`),!1}return!0},[c,k,i,a,t==null?void 0:t.id]),g=s.useCallback(o=>{b(o),window.setTimeout(()=>b(null),2500)},[]),_=s.useCallback(()=>{const o=encodeURIComponent(`${p} ${r}`);window.open(`https://wa.me/?text=${o}`,"_blank","noopener,noreferrer")},[p,r]),A=s.useCallback(()=>{const o=encodeURIComponent(r);window.open(`https://www.facebook.com/sharer/sharer.php?u=${o}`,"_blank","noopener,noreferrer")},[r]),E=s.useCallback(()=>{const o=encodeURIComponent(e.title),y=encodeURIComponent(`${p}

${r}`);window.location.href=`mailto:?subject=${o}&body=${y}`},[e.title,p,r]),O=s.useCallback(async()=>{try{await navigator.clipboard.writeText(r),g("Link copied to clipboard")}catch{g("Unable to copy link")}},[r,g]),R=s.useCallback(()=>{!C()||!(t!=null&&t.id)||(D(t.id,e),l(n==="detail"?$(t.id,e.slug):I(t.id,e.id)))},[e,n,C,t==null?void 0:t.id]);return{isBookmarked:d,shareMessage:x,handleBookmark:R,shareOnWhatsApp:_,shareOnFacebook:A,shareViaEmail:E,copyShareLink:O,isStudentReady:c&&k}}export{X as B,Q as C,Y as L,W as a,J as g,Z as u};
