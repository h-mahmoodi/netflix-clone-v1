import{j as e,p as M,T as v,q as j,i as N,a as D,r as h,h as P,k}from"./main-ntQAJh54.js";import{u as b,a as w}from"./index-CJnzKFwo.js";import{S as o}from"./index-BlweqQ8f.js";import{M as C}from"./index-COvUyqkS.js";import"./index-76_51U5I.js";const R="_header_5jfkl_1",S="_headerContainer_5jfkl_5",B="_headerMovieDetails_5jfkl_10",d={header:R,headerContainer:S,headerMovieDetails:B},T=()=>e.jsx("div",{className:d.header,children:e.jsxs("div",{className:d.headerContainer,children:[e.jsx(o,{className:"w-96 h-12"}),e.jsx(o,{className:"w-96 h-14"}),e.jsxs("div",{className:d.headerMovieDetails,children:[e.jsx(o,{className:"w-40 h-8"}),e.jsx(o,{className:"w-40 h-8"})]})]})}),$="_header_y63sm_1",F="_bannerBackground_y63sm_1",I="_headerOverlay_y63sm_22",L="_headerContainer_y63sm_33",O="_headerTitle_y63sm_37",q="_headerMovieName_y63sm_41",A="_headerMovieDetails_y63sm_45",t={header:$,bannerBackground:F,headerOverlay:I,headerContainer:L,headerTitle:O,headerMovieName:q,headerMovieDetails:A},E=({movie:a})=>{const s=M(),n=()=>{s(`/movies/${a.id}`)};return e.jsxs("div",{className:t.header,style:{backgroundImage:`url(${v.imageUrl}${a==null?void 0:a.backdrop_path})`,backgroundPosition:"center center"},children:[e.jsx("div",{className:t.headerOverlay}),e.jsxs("div",{className:t.headerContainer,children:[e.jsx("div",{className:t.headerTitle,children:"Recommended Movies"}),e.jsx("div",{className:t.headerMovieName,onClick:n,children:e.jsx("span",{children:(a==null?void 0:a.title)||(a==null?void 0:a.name)})}),e.jsxs("div",{className:t.headerMovieDetails,children:[e.jsxs("span",{children:["Realese Date:",a==null?void 0:a.release_date]}),e.jsxs("span",{children:["IMDb ",a==null?void 0:a.vote_average]})]})]})]})},H="_page_9if0e_1",G="_imageAnimation_9if0e_1",K="_containerLayout_9if0e_15",Q="_moreButton_9if0e_19",U="_gridLayout_9if0e_27",z={page:H,imageAnimation:G,containerLayout:K,moreButton:Q,gridLayout:U},J=[{display:"Name",field:"title"},{display:"IMDb Score",field:"vote_average"},{display:"Popularity",field:"vote_count"},{display:"Released Date",field:"release_date"}],ee=()=>{const[a]=j(),{id:s}=N(),{data:n,isFetching:c,error:_}=D({queryKey:["moviePageDetails",s],queryFn:()=>P(s),enabled:!!s,staleTime:5*60*1e3}),{data:i,isFetching:m,error:l,fetchNextPage:g,hasNextPage:u,isFetchingNextPage:y}=b({queryKey:["MovieRecommendedPage",s],queryFn:({pageParam:r})=>k(s,r),getNextPageParam:r=>{if(r.page<r.total_pages)return r.page+1},initialPageParam:1,enabled:!!s}),f=w({fetchNextPage:g,hasNextPage:!!u,isLoading:y}),p=h.useMemo(()=>(i==null?void 0:i.pages.flatMap(r=>r.results))||[],[i]);h.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})},[a]);const x=()=>{if(c)return e.jsx(T,{});if(_)return e.jsx("div",{children:"Something went wrong"});if(!c&&n)return e.jsx(E,{movie:n})};return l?e.jsx("div",{children:"Something went wrong"}):e.jsxs("div",{className:z.page,children:[x(),e.jsx(C,{movies:p,isFetching:m,error:l,sortOptions:J,ref:f})]})};export{ee as default};
