import{r as i,s as y,j as e,v as S}from"./main-CIuKfFDS.js";import{M as D}from"./index-CldYTKHH.js";import{A as I}from"./index-D-NLH0hJ.js";import{u as P,a as k}from"./index-DIArOwCB.js";import"./index-DQBivOJS.js";import"./netflix-wkEmooaA.js";const C="_container_50of4_1",M="_inputBox_50of4_6",w="_placeholder_50of4_12",F="_placeholderDeactive_50of4_17",R="_selectedOptions_50of4_21",z="_selectedOption_50of4_21",E="_input_50of4_6",L="_modalBox_50of4_35",A="_modalBoxOption_50of4_41",G="_modalBoxOptionSelected_50of4_46",t={container:C,inputBox:M,placeholder:w,placeholderDeactive:F,selectedOptions:R,selectedOption:z,input:E,modalBox:L,modalBoxOption:A,modalBoxOptionSelected:G},$=({placeholder:f="SelectInput",options:r=[],selectedOptions:a,setSelectedOptions:p})=>{const[m,u]=i.useState(!1),[h,n]=i.useState(!1),[c,d]=i.useState(""),l=i.useRef(null),[g,j]=i.useState(r),N=y(b),O=()=>{var s;(s=l.current)==null||s.focus(),u(!0),n(!0)};function b(){var s;(s=l.current)==null||s.focus(),d(""),u(!1),n(!1)}const _=s=>{p(o=>o.filter(x=>x.value!==s.value))},B=s=>{var x;a.find(v=>v.value===s.value)||(p(v=>[s,...v]),d(""),(x=l.current)==null||x.focus())};return i.useEffect(()=>{const s=r.filter(o=>o.label.toLocaleLowerCase().includes(c.toLocaleLowerCase().trim()));j(s),s.length===0?n(!1):n(!0)},[c,r]),e.jsxs("div",{className:t.container,ref:N,children:[e.jsx("span",{className:"flex items-center px-3 text-xl ",children:e.jsx("i",{className:"flex fi fi-rr-filter "})}),e.jsxs("div",{className:t.inputBox,onClick:O,children:[e.jsx("span",{className:`${t.placeholder} ${a.length>0||m?t.placeholderDeactive:t.placeholderActive}`,children:f}),e.jsxs("div",{className:t.selectedOptions,children:[a.map((s,o)=>e.jsxs("div",{className:t.selectedOption,children:[e.jsx("span",{className:"px-2 py-1",children:s.label}),e.jsx("span",{className:"flex items-center bg-zinc-800 px-1 hover:bg-red-700 cursor-pointer",onClick:()=>_(s),children:e.jsx("i",{className:"flex fi fi-rr-cross-small "})})]},o)),e.jsx("input",{className:t.input,value:c,onChange:s=>d(s.target.value),ref:l,style:{width:`${(c.length+5)*8}px`}})]})]}),h&&e.jsx("div",{className:t.modalBox,children:g.map(s=>e.jsxs("div",{className:a.find(o=>o.value===s.value)?t.modalBoxOptionSelected:t.modalBoxOption,onClick:()=>B(s),children:[e.jsx("span",{children:s.label}),a.find(o=>o.value===s.value)&&e.jsx("span",{onClick:()=>_(s),children:e.jsx("i",{className:"flex fi fi-rr-cross-small cursor-pointer"})})]}))})]})},q=[{display:"Name",field:"title"},{display:"IMDb Score",field:"vote_average"},{display:"Popularity",field:"vote_count"},{display:"Released Date",field:"release_date"}],H=[{value:"value 1",label:"label 1"},{value:"value 2",label:"label 2"},{value:"value 3",label:"label 3"},{value:"value 4",label:"label 4"},{value:"value 5",label:"label 5"}],W=()=>{const[f,r]=i.useState([]),{data:a,isFetching:p,error:m,fetchNextPage:u,hasNextPage:h,isFetchingNextPage:n}=P({queryKey:["PopularMoviesPage"],queryFn:({pageParam:l})=>S(l),getNextPageParam:l=>{if(l.page<l.total_pages)return l.page+1},initialPageParam:1}),c=k({fetchNextPage:u,hasNextPage:!!h,isLoading:n}),d=i.useMemo(()=>(a==null?void 0:a.pages.flatMap(l=>l.results))||[],[a]);return i.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})},[]),e.jsxs("div",{children:[e.jsx(I,{title:"Explore Movies"}),e.jsxs("div",{className:"container mx-auto mt-5 flex gap-3",children:[e.jsx(D,{movies:d,isFetching:p,error:m,sortOptions:q,defaultGrid:4,ref:c}),e.jsxs("div",{className:`w-96 h-screen  mt-2 sticky top-[81px] flex flex-col gap-5
         `,children:[e.jsx("div",{className:" bg-zinc-950 rounded-md py-4 px-3",children:e.jsx($,{placeholder:"Filter By Genres",options:H,selectedOptions:f,setSelectedOptions:r})}),e.jsx("div",{className:" bg-zinc-950 rounded-md h-20 py-4 px-3",children:e.jsx("h2",{className:"text-xl text-zinc-100 mb-4",children:"Filter By Genres"})}),e.jsx("div",{className:"bg-zinc-950 rounded-md h-20 p-4",children:e.jsx("h2",{className:"text-lg text-zinc-100",children:"Filter By Release Date"})}),e.jsx("div",{className:"bg-zinc-950 rounded-md h-20 p-4",children:e.jsx("h2",{className:"text-lg text-zinc-100",children:"Filter By IMDb Rate"})})]})]})]})};export{W as default};
