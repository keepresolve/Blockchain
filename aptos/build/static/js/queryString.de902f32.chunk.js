"use strict";(self.webpackChunk_petra_extension=self.webpackChunk_petra_extension||[]).push([[96],{56509:(r,a,e)=>{function s(r,a){return Object.keys(a).reduce((function(e,s){s.startsWith(r)&&(e[s.substr(r.length)]=a[s]);return e}),{})}e.r(a),e.d(a,{queryString:()=>i});var t=e(37989);function i(r,a){var e=document.createElement("a");e.href=a;var i=e.search.slice(1).split("&").reduce((function(r,a){var e=a.split("="),s=e[0],i=e[1];return r[s]=(0,t.a)(i),r}),{}),n=[],u=i.ajs_uid,_=i.ajs_event;if(i.ajs_aid){var c=Array.isArray(i.ajs_aid)?i.ajs_aid[0]:i.ajs_aid;r.setAnonymousId(c)}if(u){var j=Array.isArray(i.ajs_uid)?i.ajs_uid[0]:i.ajs_uid,d=s("ajs_trait_",i);n.push(r.identify(j,d))}if(_){var f=Array.isArray(i.ajs_event)?i.ajs_event[0]:i.ajs_event,o=s("ajs_prop_",i);n.push(r.track(f,o))}return Promise.all(n)}}}]);