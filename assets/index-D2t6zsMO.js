import{y as t,B as o,r as i,j as e}from"./main-BXy35M1J.js";import{A as a}from"./index-CTYc4lwN.js";import{M as r}from"./index-kzQtpgY4.js";import"./netflix-wkEmooaA.js";import"./index-CUS1yTeg.js";const l={},p=[{display:"Name",field:"title"},{display:"IMDb Score",field:"vote_average"},{display:"Popularity",field:"vote_count"},{display:"Released Date",field:"release_date"}],v=()=>{const{movies:s}=t(o);return i.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})},[]),e.jsxs("div",{className:l.page,children:[e.jsx(a,{title:"Recent view Movies"}),e.jsx("div",{className:"container mx-auto mt-10",children:e.jsx(r,{movies:s,isFetching:!1,error:null,sortOptions:p})})]})};export{v as default};