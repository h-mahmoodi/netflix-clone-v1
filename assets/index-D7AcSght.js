import{r as l,s as w,j as e,v as E}from"./main-BWGDbpIE.js";import{M}from"./index-C00G2pBq.js";import{A as k}from"./index-DwY5Egkr.js";import{u as R,a as F}from"./index-EMpiA1ID.js";import"./index-Ch_ZWPTy.js";import"./netflix-wkEmooaA.js";const L="_container_feil4_1",z="_inputBox_feil4_6",A="_placeholder_feil4_12",$="_placeholderDeactive_feil4_17",G="_selectedOptions_feil4_21",q="_selectedOption_feil4_21",H="_input_feil4_6",K="_modalBox_feil4_35",Q="_modalBoxOption_feil4_42",t={container:L,inputBox:z,placeholder:A,placeholderDeactive:$,selectedOptions:G,selectedOption:q,input:H,modalBox:K,modalBoxOption:Q},N=({placeholder:d="SelectInput",options:c=[],value:i,onChange:x,icon:v="fi-rr-filter",loading:g=!1})=>{const[n,p]=l.useState(i||[]),[_,f]=l.useState(!1),[a,j]=l.useState(!1),[m,O]=l.useState(""),h=l.useRef(null),[S,y]=l.useState(c),B=w(P),D=()=>{var s;(s=h.current)==null||s.focus(),f(!0),j(!0)};function P(){var s;(s=h.current)==null||s.focus(),O(""),f(!1),j(!1)}const C=(s,o)=>{s.stopPropagation(),p(r=>r.filter(u=>u.value!==o.value))},I=s=>{var r;n.find(u=>u.value===s.value)||(p(u=>[s,...u]),O(""),(r=h.current)==null||r.focus())};return l.useEffect(()=>{const s=c.filter(o=>o.label.toLocaleLowerCase().includes(m.toLocaleLowerCase().trim()));if(console.log("newOptions",s),y(s),s.length===0){j(!1);return}},[m,c]),l.useEffect(()=>{x(n)},[n,x]),l.useEffect(()=>{p(i)},[i]),e.jsxs("div",{className:t.container,ref:B,children:[g?e.jsx("span",{className:"flex items-center px-3 text-xl animate-spin ",children:e.jsx("i",{className:"flex fi fi-rr-spinner"})}):e.jsx("span",{className:"flex items-center px-3 text-xl ",children:e.jsx("i",{className:`flex fi ${v}`})}),e.jsxs("div",{className:t.inputBox,onClick:D,children:[e.jsx("span",{className:`${t.placeholder} ${n.length>0||_?t.placeholderDeactive:t.placeholderActive}`,children:d}),e.jsxs("div",{className:t.selectedOptions,children:[n.map((s,o)=>e.jsxs("div",{className:t.selectedOption,children:[e.jsx("span",{className:"px-2 py-1",children:s.label}),e.jsx("span",{className:"flex items-center bg-zinc-800 px-1 hover:bg-red-700 cursor-pointer",onClick:r=>C(r,s),children:e.jsx("i",{className:"flex fi fi-rr-cross-small "})})]},o)),e.jsx("input",{className:t.input,value:m,onChange:s=>O(s.target.value),ref:h,style:{width:`${(m.length+5)*8}px`}})]})]}),a&&e.jsx("div",{className:t.modalBox,children:S.map(s=>e.jsx("div",{className:n.find(o=>o.value===s.value)?t.modalBoxOptionSelected:t.modalBoxOption,onClick:()=>I(s),children:e.jsx("span",{children:s.label})},s.value))})]})},T=[{display:"Name",field:"title"},{display:"IMDb Score",field:"vote_average"},{display:"Popularity",field:"vote_count"},{display:"Released Date",field:"release_date"}],b=[{value:"value 1",label:"label 1"},{value:"value 2",label:"label 2"},{value:"value 3",label:"label 3"},{value:"value 4",label:"label 4"},{value:"value 5",label:"label 5"}],Z=()=>{const[d,c]=l.useState([]),{data:i,isFetching:x,error:v,fetchNextPage:g,hasNextPage:n,isFetchingNextPage:p}=R({queryKey:["PopularMoviesPage"],queryFn:({pageParam:a})=>E(a),getNextPageParam:a=>{if(a.page<a.total_pages)return a.page+1},initialPageParam:1}),_=F({fetchNextPage:g,hasNextPage:!!n,isLoading:p}),f=l.useMemo(()=>(i==null?void 0:i.pages.flatMap(a=>a.results))||[],[i]);return l.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})},[]),e.jsxs("div",{children:[e.jsx(k,{title:"Explore Movies"}),e.jsxs("div",{className:"container mx-auto mt-5 flex gap-3",children:[e.jsx(M,{movies:f,isFetching:x,error:v,sortOptions:T,defaultGrid:4,ref:_}),e.jsxs("div",{className:`w-96 h-screen  mt-2 sticky top-[81px] flex flex-col gap-5
         `,children:[e.jsx("div",{className:" bg-zinc-950 rounded-md py-4 px-3",children:e.jsx(N,{placeholder:"Filter By Genres",options:b,value:d,onChange:c})}),e.jsx("div",{className:"bg-zinc-950 rounded-md h-20 p-4",children:e.jsx(N,{placeholder:"Filter By Release Date",options:b,value:d,onChange:c})}),e.jsx("div",{className:"bg-zinc-950 rounded-md h-20 p-4",children:e.jsx(N,{placeholder:"Filter By IMDb Rate",options:b,value:d,onChange:c})})]})]})]})};export{Z as default};
