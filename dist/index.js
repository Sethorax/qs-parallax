var o,t,n,i,e,s=(o=!1,t=[],n={scrollTarget:document},i=function(o){void 0===o&&(o=!1);var i=n.scrollTarget===document?window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0:n.scrollTarget.scrollTop;t.forEach(function(n,e){if("breakpoint"===n.type)n.isBelowBreakpoint&&i>=n.startPosition?(t[e].isBelowBreakpoint=!1,n.callback(!0,i)):!n.isBelowBreakpoint&&i<n.startPosition?(t[e].isBelowBreakpoint=!0,n.callback(!1,i)):!0===o&&n.callback(!0,i);else if(i>=n.startPosition&&i<=n.endPosition||!0===o){var s=(i-n.startPosition)/(n.endPosition-n.startPosition);s>1?s=1:s<0&&(s=0),t[e].progress=s,n.callback(s,i)}else i>n.endPosition&&n.progress<1?(t[e].progress=1,n.callback(1,i)):i<n.startPosition&&n.progress>0&&(t[e].progress=0,n.callback(0,i))})},e=function(e,s,r,a){t.push({isBelowBreakpoint:!1,isTransitioning:!1,startPosition:s,endPosition:r,callback:a,type:e}),o||(o=!0,n.scrollTarget.addEventListener("scroll",function(){return window.requestAnimationFrame(i)})),i(!0)},{addBreakpointListener:function(o,t){e("breakpoint",o,null,t)},addProgressListener:function(o,t,n){e("progressive",o,t,n)},clearListeners:function(){t=[]},setOptions:function(o){!function(o,t){for(var n in t)o[n]=t[n]}(n,o)}});module.exports=s;
