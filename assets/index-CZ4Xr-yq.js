import{r as o,j as t,b as g}from"./main-BXy35M1J.js";import{M as d}from"./index-kzQtpgY4.js";import{A as m}from"./index-CTYc4lwN.js";import{u,a as c}from"./index-Dush4ycP.js";import"./index-CUS1yTeg.js";import"./netflix-wkEmooaA.js";const y=[{display:"Name",field:"title"},{display:"IMDb Score",field:"vote_average"},{display:"Popularity",field:"vote_count"},{display:"Released Date",field:"release_date"}],w=()=>{const{data:i,isFetching:a,error:s,fetchNextPage:r,hasNextPage:l,isFetchingNextPage:n}=u({queryKey:["NowPlayingMoviesPage"],queryFn:({pageParam:e})=>g(e),getNextPageParam:e=>{if(e.page<e.total_pages)return e.page+1},initialPageParam:1}),p=c({fetchNextPage:r,hasNextPage:!!l,isLoading:n}),f=o.useMemo(()=>(i==null?void 0:i.pages.flatMap(e=>e.results))||[],[i]);return o.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})},[]),t.jsxs("div",{children:[t.jsx(m,{title:"Now Playing Movies"}),t.jsx(d,{movies:f,isFetching:a,error:s,sortOptions:y,ref:p})]})};export{w as default};