"use strict";(self.webpackChunk_petra_extension=self.webpackChunk_petra_extension||[]).push([[214],{14086:(e,t,r)=>{r.r(t),r.d(t,{remoteMiddlewares:()=>c});var n=r(9161),a=r(50279),i=r(76605),s=r(46854);function c(e,t,r){var c;return(0,n.mG)(this,void 0,void 0,(function(){var o,l,u,d,f=this;return(0,n.Jh)(this,(function(h){switch(h.label){case 0:return(0,a.s)()?[2,[]]:(o=(0,s.Kg)(),l=null!==(c=t.enabledMiddleware)&&void 0!==c?c:{},u=Object.entries(l).filter((function(e){e[0];return e[1]})).map((function(e){return e[0]})),d=u.map((function(t){return(0,n.mG)(f,void 0,void 0,(function(){var a,s,c,l;return(0,n.Jh)(this,(function(n){switch(n.label){case 0:a=t.replace("@segment/",""),s=a,r&&(s=btoa(a).replace(/=/g,"")),c="".concat(o,"/middleware/").concat(s,"/latest/").concat(s,".js.gz"),n.label=1;case 1:return n.trys.push([1,3,,4]),[4,(0,i.v)(c)];case 2:return n.sent(),[2,window["".concat(a,"Middleware")]];case 3:return l=n.sent(),e.log("error",l),e.stats.increment("failed_remote_middleware"),[3,4];case 4:return[2]}}))}))})),[4,Promise.all(d)]);case 1:return[2,h.sent().filter(Boolean)]}}))}))}}}]);