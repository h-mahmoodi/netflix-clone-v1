import{r as l,j as e,q as w}from"./main-DKSfX3_Z.js";import{b}from"./index-Vgt4Y7Cs.js";const _="_container_jfh6l_1",N="_gridLayout_jfh6l_5",p={container:_,gridLayout:N,"width-1-2":"_width-1-2_jfh6l_13","width-1-3":"_width-1-3_jfh6l_16","width-1-4":"_width-1-4_jfh6l_19","width-1-5":"_width-1-5_jfh6l_22","width-1-6":"_width-1-6_jfh6l_25"},v=l.forwardRef(({movies:c,grid:s=5,isLoading:o},a)=>o?e.jsx("div",{className:p.container,children:e.jsx("div",{className:"flex justify-center items-center w-full",children:e.jsx("span",{className:"flex items-center mt-20 px-3 text-xl animate-spin ",children:e.jsx("i",{className:"flex fi fi-rr-spinner text-5xl text-zinc-700"})})})}):e.jsxs("div",{className:p.container,children:[e.jsx("div",{className:p.gridLayout,children:c==null?void 0:c.map((n,t)=>e.jsx("div",{className:p[`width-1-${s}`],children:e.jsx(b,{movie:n})},`${n.id}-${t}`))}),e.jsx("div",{className:p.moreButton,ref:a})]})),S=({options:c,movies:s,setter:o,searchParams:a,setSearchParams:n})=>{const[t,j]=l.useState({field:a.get("sortBy")||null,direction:a.get("sortDir")||null}),[m,f]=l.useState(s.length),x=l.useCallback(()=>{if(!t.field||!t.direction){o(s);return}const i=[...s].sort((u,y)=>{const r=u[t.field],d=y[t.field];return typeof r=="number"&&typeof d=="number"?t.direction==="asc"?r-d:d-r:typeof r=="string"&&typeof d=="string"?t.direction==="asc"?r.localeCompare(d):d.localeCompare(r):0});o(i)},[t.field,t.direction,s,o]),g=i=>{j(u=>{const y=u.field===i&&u.direction==="desc"?"asc":u.field===i&&u.direction==="asc"?null:"desc",r=y?{field:i,direction:y}:{field:null,direction:null};if(r.field&&r.direction)n({...Object.fromEntries(a.entries()),sortBy:r.field,sortDir:r.direction});else{const d=new URLSearchParams(a);d.delete("sortBy"),d.delete("sortDir"),n(d)}return r})};return l.useEffect(()=>{s.length!==m&&f(s.length),x()},[s.length,m,x]),e.jsx("div",{className:"flex gap-3 items-center",children:e.jsx("div",{className:"flex items-center gap-3",children:c.map((i,u)=>e.jsxs("button",{className:`flex items-stretch
                    border border-zinc-800 bg-zinc-800
                     rounded-md overflow-hidden`,onClick:()=>g(i.field),children:[e.jsx("span",{className:"flex items-center px-3",children:t.field===i.field?t.direction==="asc"?e.jsx("i",{className:"flex fi fi-rr-sort-amount-up-alt"}):e.jsx("i",{className:"flex fi fi-rr-sort-amount-down-alt"}):e.jsx("i",{className:"flex fi fi-rr-sort-alt "})}),e.jsxs("span",{className:`text-base py-2 px-3
                 ${t.field===i.field?"bg-zinc-900":"bg-black hover:bg-zinc-950 text-zinc-300"} `,children:["Sort By ",i.display]})]},`${u}-${i.field}`))})})},h={columns:[4,5,6],selectedColumn:5},C=({defaultGrid:c,setSelectedGrid:s,searchParams:o,setSearchParams:a})=>{const[n,t]=l.useState(+o.get("column")||c||h.selectedColumn),j=()=>{if(h.columns.length>1){const m=h.columns.length,f=h.columns.indexOf(n);console.log(m,"/",f);const x=f<m-1?h.columns[f+1]:h.columns[0];t(x),a({...Object.fromEntries(o.entries()),column:`${x}`})}};return l.useEffect(()=>{s(n)},[n,s]),e.jsx("div",{className:"flex gap-3 items-center",children:e.jsxs("button",{onClick:j,className:`flex items-stretch
    border border-zinc-800 bg-zinc-800
     rounded-md overflow-hidden`,children:[e.jsx("span",{className:"flex items-center px-3",children:e.jsx("i",{className:"flex fi fi-rr-apps"})}),e.jsxs("span",{className:"text-base py-2 px-3 bg-zinc-900",children:["Display By ",n," Column"]})]})})},z="_containerLayout_9mmqf_1",L={containerLayout:z},$=l.forwardRef(({movies:c,isFetching:s,error:o,sortOptions:a,defaultGrid:n},t)=>{const[j,m]=l.useState(c),[f,x]=w(),[g,i]=l.useState(n);return l.useEffect(()=>{window.scroll({top:280,left:0,behavior:"smooth"})},[f]),o?e.jsx("div",{children:"Something went wrong"}):e.jsxs("div",{className:L.containerLayout,children:[e.jsxs("div",{className:`flex justify-between items-center 
         bg-zinc-950 sticky top-[81px] left-0 z-20 py-4 px-3 rounded-md mx-2`,children:[e.jsx(S,{options:a,movies:c,setter:m,searchParams:f,setSearchParams:x}),e.jsx(C,{defaultGrid:n,setSelectedGrid:i,searchParams:f,setSearchParams:x})]}),e.jsx("div",{children:e.jsx(v,{movies:j,isLoading:s,ref:t,grid:g})})]})});export{$ as M};
