(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{208:function(e,a,t){"use strict";t.r(a),t.d(a,"default",function(){return b});var o=t(52),r=t(53),i=t(55),n=t(54),d=t(56),l=t(0),c=t.n(l),s=t(40),u=t(449),p=t.n(u);function b(e){return function(a){return function(t){function l(){return Object(o.a)(this,l),Object(i.a)(this,Object(n.a)(l).apply(this,arguments))}return Object(d.a)(l,t),Object(r.a)(l,[{key:"render",value:function(){var t=this.props,o=t.dispatch,r=t.items;return c.a.createElement("div",null,c.a.createElement(p.a,{color:"primary",variant:"outlined",size:"small",onClick:function(){return o(Object(s.addToList)())}},"Add counter")," ",r&&r.length>0&&c.a.createElement(p.a,{color:"primary",variant:"outlined",size:"small",onClick:function(){return o(Object(s.removeFromList)(r.length-1))}},"Remove counter"),c.a.createElement("br",null),r&&r.map(function(t,r){return c.a.createElement(a,Object.assign({},e(t),{key:r,dispatch:function(e){return o(Object(s.performInList)(r,e))}}))}))}}]),l}(l.Component)}}},449:function(e,a,t){"use strict";var o=t(1);Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return r.default}});var r=o(t(450))},450:function(e,a,t){"use strict";var o=t(1);Object.defineProperty(a,"__esModule",{value:!0}),a.default=a.styles=void 0;var r=o(t(10)),i=o(t(5)),n=o(t(4)),d=o(t(0)),l=(o(t(2)),o(t(6))),c=o(t(14)),s=t(87),u=o(t(119)),p=t(27),b=function(e){return{root:(0,n.default)({},e.typography.button,{lineHeight:"1.4em",boxSizing:"border-box",minWidth:64,minHeight:36,padding:"8px 16px",borderRadius:e.shape.borderRadius,color:e.palette.text.primary,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),"&:hover":{textDecoration:"none",backgroundColor:(0,s.fade)(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"},"&$disabled":{backgroundColor:"transparent"}},"&$disabled":{color:e.palette.action.disabled}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},text:{},textPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,s.fade)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},textSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,s.fade)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},flat:{},flatPrimary:{},flatSecondary:{},outlined:{border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},outlinedPrimary:{border:"1px solid ".concat((0,s.fade)(e.palette.primary.main,.5)),"&:hover":{border:"1px solid ".concat(e.palette.primary.main)},"&$disabled":{border:"1px solid ".concat(e.palette.action.disabled)}},outlinedSecondary:{border:"1px solid ".concat((0,s.fade)(e.palette.secondary.main,.5)),"&:hover":{border:"1px solid ".concat(e.palette.secondary.main)},"&$disabled":{border:"1px solid ".concat(e.palette.action.disabled)}},contained:{color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],boxShadow:e.shadows[2],"&$focusVisible":{boxShadow:e.shadows[6]},"&:active":{boxShadow:e.shadows[8]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground},"&:hover":{backgroundColor:e.palette.grey.A100,"@media (hover: none)":{backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}}},containedPrimary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},containedSecondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},raised:{},raisedPrimary:{},raisedSecondary:{},fab:{borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,boxShadow:e.shadows[6],"&:active":{boxShadow:e.shadows[12]}},extendedFab:{borderRadius:24,padding:"0 16px",width:"auto",minWidth:48,height:48},focusVisible:{},disabled:{},colorInherit:{color:"inherit"},mini:{width:40,height:40},sizeSmall:{padding:"7px 8px",minWidth:64,minHeight:32,fontSize:e.typography.pxToRem(13)},sizeLarge:{padding:"8px 24px",minWidth:112,minHeight:40,fontSize:e.typography.pxToRem(15)},fullWidth:{width:"100%"}}};function m(e){var a,t=e.children,o=e.classes,c=e.className,s=e.color,b=e.disabled,m=e.disableFocusRipple,f=e.fullWidth,h=e.focusVisibleClassName,y=e.mini,g=e.size,x=e.variant,v=(0,i.default)(e,["children","classes","className","color","disabled","disableFocusRipple","fullWidth","focusVisibleClassName","mini","size","variant"]),k="fab"===x||"extendedFab"===x,C="contained"===x||"raised"===x,w="text"===x||"flat"===x||"outlined"===x,S=(0,l.default)(o.root,(a={},(0,r.default)(a,o.fab,k),(0,r.default)(a,o.mini,k&&y),(0,r.default)(a,o.extendedFab,"extendedFab"===x),(0,r.default)(a,o.text,w),(0,r.default)(a,o.textPrimary,w&&"primary"===s),(0,r.default)(a,o.textSecondary,w&&"secondary"===s),(0,r.default)(a,o.flat,"text"===x||"flat"===x),(0,r.default)(a,o.flatPrimary,("text"===x||"flat"===x)&&"primary"===s),(0,r.default)(a,o.flatSecondary,("text"===x||"flat"===x)&&"secondary"===s),(0,r.default)(a,o.contained,C||k),(0,r.default)(a,o.containedPrimary,(C||k)&&"primary"===s),(0,r.default)(a,o.containedSecondary,(C||k)&&"secondary"===s),(0,r.default)(a,o.raised,C||k),(0,r.default)(a,o.raisedPrimary,(C||k)&&"primary"===s),(0,r.default)(a,o.raisedSecondary,(C||k)&&"secondary"===s),(0,r.default)(a,o.outlined,"outlined"===x),(0,r.default)(a,o.outlinedPrimary,"outlined"===x&&"primary"===s),(0,r.default)(a,o.outlinedSecondary,"outlined"===x&&"secondary"===s),(0,r.default)(a,o["size".concat((0,p.capitalize)(g))],"medium"!==g),(0,r.default)(a,o.disabled,b),(0,r.default)(a,o.fullWidth,f),(0,r.default)(a,o.colorInherit,"inherit"===s),a),c);return d.default.createElement(u.default,(0,n.default)({className:S,disabled:b,focusRipple:!m,focusVisibleClassName:(0,l.default)(o.focusVisible,h)},v),d.default.createElement("span",{className:o.label},t))}a.styles=b,m.propTypes={},m.defaultProps={color:"default",component:"button",disabled:!1,disableFocusRipple:!1,fullWidth:!1,mini:!1,size:"medium",type:"button",variant:"text"};var f=(0,c.default)(b,{name:"MuiButton"})(m);a.default=f}}]);
//# sourceMappingURL=5.280d2a30.chunk.js.map