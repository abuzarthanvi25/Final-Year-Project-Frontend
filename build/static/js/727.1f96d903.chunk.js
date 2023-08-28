"use strict";(self.webpackChunkskillsift_ai=self.webpackChunkskillsift_ai||[]).push([[727],{2727:function(t,e,i){i.r(e),i.d(e,{default:function(){return G}});var n=i(7313),r=i(9019),a=i(9506),o=i(1113),s=i(2401),l=i(7592),c=i(9860),d=i(8119),h=i(7973),u=i(3428),m=i(3405),v=i(3366),p=i(7462),g=i(3061),x=i(686),f=i(1921);function Z(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function b(t){return parseFloat(t)}var j=i(7551),w=i(7342),k=i(7430),y=i(2298);function C(t){return(0,y.Z)("MuiSkeleton",t)}(0,k.Z)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var P=i(6417);const S=["animation","className","component","height","style","variant","width"];let z,M,R,L,A=t=>t;const F=(0,x.F4)(z||(z=A`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),T=(0,x.F4)(M||(M=A`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),$=(0,l.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:i}=t;return[e.root,e[i.variant],!1!==i.animation&&e[i.animation],i.hasChildren&&e.withChildren,i.hasChildren&&!i.width&&e.fitContent,i.hasChildren&&!i.height&&e.heightAuto]}})((t=>{let{theme:e,ownerState:i}=t;const n=Z(e.shape.borderRadius)||"px",r=b(e.shape.borderRadius);return(0,p.Z)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,j.Fq)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===i.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${n}/${Math.round(r/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===i.variant&&{borderRadius:"50%"},"rounded"===i.variant&&{borderRadius:(e.vars||e).shape.borderRadius},i.hasChildren&&{"& > *":{visibility:"hidden"}},i.hasChildren&&!i.width&&{maxWidth:"fit-content"},i.hasChildren&&!i.height&&{height:"auto"})}),(t=>{let{ownerState:e}=t;return"pulse"===e.animation&&(0,x.iv)(R||(R=A`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),F)}),(t=>{let{ownerState:e,theme:i}=t;return"wave"===e.animation&&(0,x.iv)(L||(L=A`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),T,(i.vars||i).palette.action.hover)}));var I=n.forwardRef((function(t,e){const i=(0,w.Z)({props:t,name:"MuiSkeleton"}),{animation:n="pulse",className:r,component:a="span",height:o,style:s,variant:l="text",width:c}=i,d=(0,v.Z)(i,S),h=(0,p.Z)({},i,{animation:n,component:a,variant:l,hasChildren:Boolean(d.children)}),u=(t=>{const{classes:e,variant:i,animation:n,hasChildren:r,width:a,height:o}=t,s={root:["root",i,n,r&&"withChildren",r&&!a&&"fitContent",r&&!o&&"heightAuto"]};return(0,f.Z)(s,C,e)})(h);return(0,P.jsx)($,(0,p.Z)({as:a,ref:e,className:(0,g.Z)(u.root,r),ownerState:h},d,{style:(0,p.Z)({width:c,height:o},s)}))}));var H=()=>(0,P.jsx)(u.Z,{children:(0,P.jsx)(m.Z,{children:(0,P.jsxs)(r.ZP,{container:!0,direction:"column",children:[(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsxs)(r.ZP,{container:!0,justifyContent:"space-between",children:[(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsx)(I,{variant:"rectangular",width:44,height:44})}),(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsx)(I,{variant:"rectangular",width:34,height:34})})]})}),(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsx)(I,{variant:"rectangular",sx:{my:2},height:40})}),(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsx)(I,{variant:"rectangular",height:30})})]})})});var X=t=>{let{isLoading:e,Interview:i}=t;const n=(0,l.ZP)(h.Z)((t=>{let{theme:e}=t;return{backgroundColor:e.palette.secondary.dark,color:"#fff",overflow:"hidden",position:"relative","&:after":{content:'""',position:"absolute",width:210,height:210,background:e.palette.secondary[800],borderRadius:"50%",top:-85,right:-95,[e.breakpoints.down("sm")]:{top:-105,right:-140}},"&:before":{content:'""',position:"absolute",width:210,height:210,background:e.palette.secondary[800],borderRadius:"50%",top:-125,right:-15,opacity:.5,[e.breakpoints.down("sm")]:{top:-155,right:-70}}}})),s=(0,c.Z)();return(0,P.jsx)(P.Fragment,{children:e?(0,P.jsx)(H,{}):(0,P.jsx)(n,{border:!1,content:!1,children:(0,P.jsx)(a.Z,{sx:{p:3.25},children:(0,P.jsxs)(r.ZP,{container:!0,direction:"column",children:[(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsxs)(r.ZP,{container:!0,alignItems:"center",children:[(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsxs)(o.Z,{sx:{fontSize:"2.125rem",fontWeight:500,mr:1,mt:1.75,mb:.75},children:[" ",null===i||void 0===i?void 0:i.title]})}),(0,P.jsx)(r.ZP,{item:!0,children:(0,P.jsx)(d.Z,{sx:{cursor:"pointer",...s.typography.smallAvatar,backgroundColor:s.palette.secondary[200],color:s.palette.secondary.dark,p:2.5},children:(0,P.jsx)(i.icon,{fontSize:"inherit",sx:{transform:"rotate3d(1, 1, 1, 45deg)"}})})})]})}),(0,P.jsx)(r.ZP,{item:!0,sx:{mb:1.25},children:(0,P.jsx)(o.Z,{sx:{fontSize:"1rem",fontWeight:500,color:s.palette.secondary[200]},children:null===i||void 0===i?void 0:i.subTitle})})]})})})})},B=i(4839),N=i(2766),W=i(2134),_=i(8106);var G=()=>{const[t,e]=(0,n.useState)(!0);(0,n.useEffect)((()=>{e(!1)}),[]);const i=[{title:"Technical",subTitle:"For Technical students wanting to evalute their technical skills",icon:()=>(0,P.jsx)(B.Z,{})},{title:"Generalized",subTitle:"Generalized interview for sentiment and career evaluation",icon:()=>(0,P.jsx)(N.Z,{})},{title:"Job Specific",subTitle:"Job Specific interview for tailor-made interviews",icon:()=>(0,P.jsx)(W.Z,{})},{title:"Psychological",subTitle:"Interviews for personality and traits evaluation",icon:()=>(0,P.jsx)(_.Z,{})}];return(0,P.jsx)(r.ZP,{container:!0,spacing:s.dv,children:(0,P.jsxs)(r.ZP,{item:!0,xs:12,children:[(0,P.jsx)(a.Z,{style:{textAlign:"center",fontSize:"30px",margin:"20px 0px"},children:(0,P.jsx)(o.Z,{variant:"body3",children:"Interviews Available"})}),(0,P.jsx)(r.ZP,{container:!0,spacing:s.dv,children:i&&i.map(((e,i)=>(0,P.jsx)(r.ZP,{item:!0,lg:6,md:4,sm:6,xs:12,children:(0,P.jsx)(X,{Interview:e,isLoading:t})},i)))})]})})}},2134:function(t,e,i){var n=i(1941);e.Z=void 0;var r=n(i(5045)),a=i(6417),o=(0,r.default)((0,a.jsx)("path",{d:"M11.71 17.99C8.53 17.84 6 15.22 6 12c0-3.31 2.69-6 6-6 3.22 0 5.84 2.53 5.99 5.71l-2.1-.63C15.48 9.31 13.89 8 12 8c-2.21 0-4 1.79-4 4 0 1.89 1.31 3.48 3.08 3.89l.63 2.1zM22 12c0 .3-.01.6-.04.9l-1.97-.59c.01-.1.01-.21.01-.31 0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8c.1 0 .21 0 .31-.01l.59 1.97c-.3.03-.6.04-.9.04-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10zm-3.77 4.26L22 15l-10-3 3 10 1.26-3.77 4.27 4.27 1.98-1.98-4.28-4.26z"}),"AdsClick");e.Z=o},4839:function(t,e,i){var n=i(1941);e.Z=void 0;var r=n(i(5045)),a=i(6417),o=(0,r.default)((0,a.jsx)("path",{d:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"}),"Code");e.Z=o},2766:function(t,e,i){var n=i(1941);e.Z=void 0;var r=n(i(5045)),a=i(6417),o=(0,r.default)((0,a.jsx)("path",{d:"M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"}),"FormatListBulleted");e.Z=o},8106:function(t,e,i){var n=i(1941);e.Z=void 0;var r=n(i(5045)),a=i(6417),o=(0,r.default)([(0,a.jsx)("path",{d:"M13 8.57c-.79 0-1.43.64-1.43 1.43s.64 1.43 1.43 1.43 1.43-.64 1.43-1.43-.64-1.43-1.43-1.43z"},"0"),(0,a.jsx)("path",{d:"M13 3C9.25 3 6.2 5.94 6.02 9.64L4.1 12.2c-.25.33-.01.8.4.8H6v3c0 1.1.9 2 2 2h1v3h7v-4.68c2.36-1.12 4-3.53 4-6.32 0-3.87-3.13-7-7-7zm3 7c0 .13-.01.26-.02.39l.83.66c.08.06.1.16.05.25l-.8 1.39c-.05.09-.16.12-.24.09l-.99-.4c-.21.16-.43.29-.67.39L14 13.83c-.01.1-.1.17-.2.17h-1.6c-.1 0-.18-.07-.2-.17l-.15-1.06c-.25-.1-.47-.23-.68-.39l-.99.4c-.09.03-.2 0-.25-.09l-.8-1.39c-.05-.08-.03-.19.05-.25l.84-.66c-.01-.13-.02-.26-.02-.39s.02-.27.04-.39l-.85-.66c-.08-.06-.1-.16-.05-.26l.8-1.38c.05-.09.15-.12.24-.09l1 .4c.2-.15.43-.29.67-.39L12 6.17c.02-.1.1-.17.2-.17h1.6c.1 0 .18.07.2.17l.15 1.06c.24.1.46.23.67.39l1-.4c.09-.03.2 0 .24.09l.8 1.38c.05.09.03.2-.05.26l-.85.66c.03.12.04.25.04.39z"},"1")],"Psychology");e.Z=o}}]);