import{r,j as s,u as k,T as B,o as M,t as C,a as w,g as E,f as A,b as H,c as L,d as T}from"./main-BPJ7WpKq.js";import{M as P,a as g}from"./index-CO3CWoDF.js";import{i as I}from"./netflix-wkEmooaA.js";import"./index--7tQkVSj.js";const R="_slider_1s2nh_1",z="_animation_1s2nh_1",D="_inner_1s2nh_15",q="_bannerList_1s2nh_19",F="_navigation_1s2nh_23",U="_bullets_1s2nh_28",W="_timeBar_1s2nh_33",m={slider:R,animation:z,inner:D,bannerList:q,navigation:F,bullets:U,timeBar:W},G="_navigation_1y4dv_1",K="_left_1y4dv_5",O="_right_1y4dv_6",p={navigation:G,left:K,right:O},Q=({totalItems:e,selectedIndex:n,handlerFn:t})=>{const l=r.useCallback(i=>{i==="next"?n<e-1?t(n+1):t(0):i==="prev"&&(n>0?t(n-1):t(e-1))},[e,n,t]);return s.jsxs("div",{className:p.navigation,children:[s.jsx("button",{className:p.left,onClick:()=>l("prev"),"aria-label":"previous slide",children:s.jsx("i",{className:"fi fi-br-angle-left"})}),s.jsx("button",{className:p.right,onClick:()=>l("next"),"aria-label":"next slide",children:s.jsx("i",{className:"fi fi-br-angle-right"})})]})},J="_banner_1i07p_1",V="_bannerBackground_1i07p_1",X="_overlay_1i07p_22",Y="_containerBox_1i07p_32",Z="_content_1i07p_36",ss="_details_1i07p_40",h={banner:J,bannerBackground:V,overlay:X,containerBox:Y,content:Z,details:ss},es="_card_ckstj_1",ts="_image_ckstj_4",ns="_play_ckstj_8",N={card:es,image:ts,play:ns},as=({movie:e})=>{const n=k(),t=()=>{n(M({title:(e==null?void 0:e.title)||(e==null?void 0:e.title)||"The Trailer",content:s.jsx(P,{movieId:e.id})}))};return s.jsxs("div",{className:N.card,children:[s.jsx("img",{src:`${B.imageUrl_w500}${e.poster_path}`,className:N.image,alt:(e==null?void 0:e.title)||(e==null?void 0:e.title),loading:"lazy",width:"342px",height:"513px"}),s.jsx("div",{className:N.play,onClick:t,children:s.jsx("i",{className:"fi fi-rr-play-circle"})})]})},is="_info_2wz3v_1",rs="_title_2wz3v_5",ls="_description_2wz3v_9",v={info:is,title:rs,description:ls},cs=({movie:e})=>s.jsxs("div",{className:v.info,children:[s.jsx("h2",{className:v.title,children:`${(e==null?void 0:e.name)||(e==null?void 0:e.title)} `}),s.jsx("p",{className:v.description,children:C(e==null?void 0:e.overview,145)})]}),os="_actions_a63is_1",ds="_buttonPrimary_a63is_5",_s="_buttonSecondary_a63is_15",f={actions:os,buttonPrimary:ds,buttonSecondary:_s},us=({movie:e})=>s.jsxs("div",{className:f.actions,children:[s.jsxs("button",{className:f.buttonPrimary,"aria-label":`More Details ${e.title||e.name}`,children:[s.jsx("span",{children:"More Details"}),s.jsx("i",{className:"fi fi fi-sr-arrow-right flex text-3xl"})]}),s.jsxs("button",{className:f.buttonSecondary,"aria-label":`Add to favorite ${e.title||e.name}`,children:[s.jsx("i",{className:"fi fi-rr-heart  "}),s.jsx("span",{children:"Add to Favorite"})]}),s.jsxs("button",{className:f.buttonSecondary,"aria-label":`Add to watch list ${e.title||e.name}`,children:[s.jsx("i",{className:"fi fi-rr-play-alt  "}),s.jsx("span",{children:"Add to Watch List"})]})]});function ms({movie:e}){return s.jsx("div",{className:h.banner,style:{backgroundImage:`url(${B.imageUrl_w1300}${e==null?void 0:e.backdrop_path})`},children:s.jsxs(s.Fragment,{children:[s.jsx("div",{className:h.overlay}),s.jsx("div",{className:h.containerBox,children:s.jsxs("div",{className:h.content,children:[s.jsx(as,{movie:e}),s.jsxs("div",{className:h.details,children:[s.jsx(cs,{movie:e}),s.jsx(us,{movie:e})]})]})})]})})}const xs="_banner_1cd3l_1",hs="_active_1cd3l_6",y={banner:xs,active:hs},js=({movies:e,selectedMovie:n})=>s.jsx(s.Fragment,{children:e.map((t,l)=>s.jsx("div",{className:`${y.banner} ${n===l?y.active:void 0}`,children:s.jsx(ms,{movie:t})},t.id))}),bs="_bullets_6a9ra_1",fs="_active_6a9ra_13",$={bullets:bs,active:fs},gs=({totalItems:e,selectedIndex:n,handlerFn:t})=>{const l=new Array(e).fill(null);return s.jsx("div",{className:$.bullets,children:l.map((i,c)=>s.jsx("span",{className:n===c?$.active:void 0,onClick:()=>t(c)},c))})},ps="_timeBar_1xymp_1",Ns={timeBar:ps},vs=({interval:e,tick:n,handlerFn:t,sliderRef:l,selectedIndex:i,totalItems:c})=>{const[x,d]=r.useState(0),[j,b]=r.useState(!1),u=r.useCallback(()=>{b(!0)},[]),_=r.useCallback(()=>{b(!1)},[]);return r.useEffect(()=>{let o=null;return j||(o=setInterval(()=>{d(S=>S+n)},n)),()=>{clearInterval(o)}},[j,n]),r.useEffect(()=>{x>e&&(i<c-1?t(i+1):t(0),d(0))},[x,t,e,i,c]),r.useEffect(()=>{const o=l.current;return o.addEventListener("mouseenter",u),o.addEventListener("mouseleave",_),()=>{o&&(o.removeEventListener("mouseenter",u),o.removeEventListener("mouseleave",_))}},[u,_,l]),s.jsx("div",{className:Ns.timeBar,style:{width:`${x/e*100}%`}})},ys="_skeleton_n31a4_1",$s="_banner_n31a4_5",Bs="_bannerBackground_n31a4_1",Ss="_containerBox_n31a4_29",ks="_content_n31a4_33",Ms="_details_n31a4_37",Cs="_image_n31a4_41",ws="_shimmer_n31a4_1",Es="_statistics_n31a4_46",As="_titleContainer_n31a4_51",Hs="_title_n31a4_51",Ls="_description_n31a4_59",Ts="_buttonContainer_n31a4_64",Ps="_button_n31a4_64",Is="_overlay_n31a4_73",a={skeleton:ys,banner:$s,bannerBackground:Bs,containerBox:Ss,content:ks,details:Ms,image:Cs,shimmer:ws,statistics:Es,titleContainer:As,title:Hs,description:Ls,buttonContainer:Ts,button:Ps,overlay:Is};function Rs(){return s.jsxs("div",{className:a.skeleton,children:[s.jsx("div",{className:a.banner,style:{backgroundImage:`url(${I})`}}),s.jsx("div",{className:a.overlay}),s.jsx("div",{className:a.containerBox,children:s.jsxs("div",{className:a.content,children:[s.jsx("div",{className:a.image}),s.jsxs("div",{className:a.details,children:[s.jsxs("div",{className:a.titleContainer,children:[s.jsx("div",{className:a.title}),s.jsx("div",{className:a.description})]}),s.jsxs("div",{className:a.buttonContainer,children:[s.jsx("div",{className:a.button}),s.jsx("div",{className:a.button}),s.jsx("div",{className:a.button})]})]})]})})]})}const zs=()=>{const[e,n]=r.useState([]),{isPending:t,error:l,data:i}=w({queryKey:["HomeSlider"],queryFn:()=>A()}),[c,x]=r.useState(0),d=5,j=8e3,b=10,u=r.useRef(null);console.log(i),r.useEffect(()=>{n(E(i==null?void 0:i.results,d)||[])},[i,d]);const _=r.useCallback(o=>{x(o)},[]);return t||l?s.jsx(Rs,{}):s.jsx("div",{className:m.slider,ref:u,children:s.jsxs("div",{className:m.inner,children:[s.jsx("div",{className:m.bannerList,children:s.jsx(js,{movies:e,selectedMovie:c})}),s.jsx("div",{className:m.navigation,children:s.jsx(Q,{totalItems:d,selectedIndex:c,handlerFn:_})}),s.jsx("div",{className:m.bullets,children:s.jsx(gs,{totalItems:d,selectedIndex:c,handlerFn:_})}),s.jsx("div",{className:m.timeBar,children:s.jsx(vs,{interval:j,tick:b,handlerFn:_,sliderRef:u,totalItems:d,selectedIndex:c})})]})})},Ds="_page_1l9n0_1",qs="_imageAnimation_1l9n0_1",Fs={page:Ds,imageAnimation:qs},Os=()=>s.jsxs("div",{className:Fs.page,children:[s.jsx(zs,{}),s.jsxs("div",{className:"container mx-auto",children:[s.jsx(g,{title:"Now Playing Movies",fetcher:()=>H(1)}),s.jsx(g,{title:"Top Rated Movies",fetcher:()=>L(1)}),s.jsx(g,{title:"Most Popular Movies",fetcher:()=>T(1)})]})]});export{Os as default};
