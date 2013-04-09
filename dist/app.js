define("#mix/sln/0.3.3/modules/gesture",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a){function h(a,b,c,d,e,f,g,h){var i=Math.atan2(h-f,g-e)-Math.atan2(d-b,c-a),j=Math.sqrt((Math.pow(h-f,2)+Math.pow(g-e,2))/(Math.pow(d-b,2)+Math.pow(c-a,2))),k=[e-j*a*Math.cos(i)+j*b*Math.sin(i),f-j*b*Math.cos(i)-j*a*Math.sin(i)];return{rotate:i,scale:j,translate:k,matrix:[[j*Math.cos(i),-j*Math.sin(i),k[0]],[j*Math.sin(i),j*Math.cos(i),k[1]],[0,0,1]]}}function i(a,b,c){var d=document.createEvent("HTMLEvents");return d.initEvent(a,!0,!0),b&&(c?Object.each(c,function(a){d[a]=b[a]}):Object.extend(d,b)),d}a("mix/core/0.3.0/base/reset");var d=window,e=d.document,f=["screenX","screenY","clientX","clientY","pageX","pageY"],g=a("mix/core/0.3.0/base/class"),j=g.create({initialize:function(a){var b=this;b._el=a,b._myGestures={},b._lastTapTime=0/0,b._onStart=b._onStart.bind(b),b._onDoing=b._onDoing.bind(b),b._onEnd=b._onEnd.bind(b),b._onTap=b._onTap.bind(b)},getElement:function(){return that._el},enable:function(){var a=this,b=a._el;b.addEventListener("touchstart",a._onStart,!1),b.addEventListener("tap",a._onTap,!1)},disable:function(){var a=this,b=a._el;b.removeEventListener("touchstart",a._onStart,!1),b.removeEventListener("tap",a._onTap,!1)},_onStart:function(a){var b=this,c=b._el,d=b._myGestures;if(0===Object.keys(d).length&&(e.body.addEventListener("touchmove",b._onDoing,!1),e.body.addEventListener("touchend",b._onEnd,!1)),Object.each(a.changedTouches,function(a){var b={};for(var e in a)b[e]=a[e];var f={startTouch:b,startTime:Date.now(),status:"tapping",pressingHandler:setTimeout(function(){if("tapping"===f.status){f.status="pressing";var a=i("press",b);c.dispatchEvent(a)}clearTimeout(f.pressingHandler),f.pressingHandler=null},500)};d[a.identifier]=f}),2==Object.keys(d).length){var f=i("dualtouchstart");f.touches=JSON.parse(JSON.stringify(a.touches)),c.dispatchEvent(f)}},_onDoing:function(a){var b=this,c=b._el,d=b._myGestures;if(Object.each(a.changedTouches,function(a){var e,g,h,j,b=d[a.identifier];b&&(e=a.clientX-b.startTouch.clientX,g=a.clientY-b.startTouch.clientY,h=Math.sqrt(Math.pow(e,2)+Math.pow(g,2)),"tapping"==b.status&&h>10&&(b.status="panning",j=i("panstart",a,f),c.dispatchEvent(j)),"panning"==b.status&&(j=i("pan",a,f),j.displacementX=e,j.displacementY=g,c.dispatchEvent(j)))}),2==Object.keys(d).length){var j,k,e=[],g=[];Object.each(a.touchs,function(a){var b;(b=d[a.identifier])&&(e.push([b.startTouch.clientX,b.startTouch.clientY]),g.push([a.clientX,a.clientY]))}),j=h(e[0][0],e[0][1],e[1][0],e[1][1],g[0][0],g[0][1],g[1][0],g[1][1]),k=i("dualtouch",j),k.touches=JSON.parse(JSON.stringify(a.touches)),c.dispatchEvent(k)}},_onEnd:function(a){var g,b=this,c=b._el,d=b._myGestures;2==Object.keys(d).length&&(g=i("dualtouchend"),g.touches=JSON.parse(JSON.stringify(a.touches)),c.dispatchEvent(g));for(var h=0;a.changedTouches.length>h;h++){var j=a.changedTouches[h],k=j.identifier,l=d[k];if(l){if(l.pressingHandler&&(clearTimeout(l.pressingHandler),l.pressingHandler=null),"tapping"===l.status&&(g=i("tap",j,f),c.dispatchEvent(g)),"panning"===l.status){g=i("panend",j,f),c.dispatchEvent(g);var m=Date.now()-l.startTime;300>m&&(g=i("flick",j,f),g.duration=m,g.valocityX=(j.clientX-l.startTouch.clientX)/m,g.valocityY=(j.clientY-l.startTouch.clientY)/m,g.displacementX=j.clientX-l.startTouch.clientX,g.displacementY=j.clientY-l.startTouch.clientY,c.dispatchEvent(g))}"pressing"===l.status&&(g=i("pressend",j,f),c.dispatchEvent(g)),delete d[k]}}0==Object.keys(d).length&&(e.body.removeEventListener("touchend",b._onEnd),e.body.removeEventListener("touchmove",b._onDoing))},_onTap:function(a){var b=this,c=b._el,d=b._lastTapTime;if(500>Date.now()-d){var e=document.createEvent("HTMLEvents");e.initEvent("doubletap",!0,!0),Object.each(f,function(b){e[b]=a[b]}),c.dispatchEvent(e)}b._lastTapTime=Date.now()}});return j}),define("#mix/sln/0.3.3/modules/transform",[],function(a,b){function k(a,b){return[[(a/3+(a+b)/3-a)/(b-a),(a*a/3+2*a*b/3-a*a)/(b*b-a*a)],[(b/3+(a+b)/3-a)/(b-a),(b*b/3+2*a*b/3-a*a)/(b*b-a*a)]]}function l(a){var b,c;if(b=getComputedStyle(a).webkitTransform,"none"!==b){if(c=b.match(d))return parseInt(c[1])||0;if(c=b.match(e))return parseInt(c[1])||0}return 0}function m(a){var b,c;if(b=getComputedStyle(a).webkitTransform,"none"!==b){if(c=b.match(d))return parseInt(c[2])||0;if(c=b.match(e))return parseInt(c[2])||0}return 0}function n(a,b){return a+="",b+="",0>a.indexOf("%")&&"0"!==a&&(a+="px"),0>b.indexOf("%")&&"0"!==b&&(b+="px"),i&&j?"translate3d("+a+", "+b+", 0)":"translate("+a+", "+b+")"}function o(a,b,c){function e(b){d||b&&(b.srcElement!==a||b.propertyName!==f)||(d=!0,a.style.webkitTransition="none",a.removeEventListener("webkitTransitionEnd",e,!1),c&&setTimeout(c,50))}var d=!1;a.addEventListener("webkitTransitionEnd",e,!1)}function p(a,b,c,d,e,g,h){o(a,b,h),a.style.webkitTransition=[f,b,c,d].join(" "),a.style.webkitTransform=n(e,g)}var d=/^matrix3d\(\d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, ([\d-]+), ([-\d]+), [\d-]+, \d+\)/,e=/^matrix\(\d+, \d+, \d+, \d+, ([-\d]+), ([-\d]+)\)$/,f="-webkit-transform",g=navigator.appVersion,i=(/android/gi.test(g),/iphone|ipad/gi.test(g)),j="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix;b.getY=m,b.getX=l,b.getTranslate=n,b.getBezier=k,b.start=p}),define("#mix/sln/0.3.3/modules/scroll",["./gesture","./transform","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a){function k(a){var b=a.parentNode,c=getComputedStyle(b),d=0-a.scrollHeight+b.offsetHeight-parseInt(c.paddingTop)-parseInt(c.paddingBottom);return d>0&&(d=0),d}a("mix/core/0.3.0/base/reset");var d=window,e=d.document,g=(d.navigator,a("mix/core/0.3.0/base/class")),h=a("./gesture"),i=a("./transform"),j=!1,l=g.create({initialize:function(a){var b=this;b._wrap=a,b._scroller=a.children[0],b._gesture=new h(b._scroller),b._originalX=null,b._originalY=null,b._currentY=null,b._scrollHeight=null,b._scrollEndHandler=null,b._scrollEndCancel=!1,b._refreshed=!1,b._preventBodyTouch=b._preventBodyTouch.bind(b),b._onTouchStart=b._onTouchStart.bind(b),b._onPanStart=b._onPanStart.bind(b),b._onPan=b._onPan.bind(b),b._onPanEnd=b._onPanEnd.bind(b),b._onFlick=b._onFlick.bind(b),b._onScrollEnd=b._onScrollEnd.bind(b)},enable:function(){var a=this,b=a._scroller;a._gesture.enable(),b.addEventListener("touchstart",a._onTouchStart,!1),b.addEventListener("panstart",a._onPanStart,!1),b.addEventListener("pan",a._onPan,!1),b.addEventListener("panend",a._onPanEnd,!1),b.addEventListener("flick",a._onFlick,!1),j||(j=!0,e.body.addEventListener("touchmove",a._preventBodyTouch,!1))},disable:function(){var a=this,b=a._scroller;a._gesture.disable(),b.removeEventListener("touchstart",a._onTouchStart,!1),b.removeEventListener("panstart",a._onPanStart,!1),b.removeEventListener("pan",a._onPan,!1),b.removeEventListener("panend",a._onPanEnd,!1),b.removeEventListener("flick",a._onFlick,!1),j&&(j=!1,e.body.removeEventListener("touchmove",a._preventBodyTouch,!1))},refresh:function(){this._scroller.style.height="auto",this._refreshed=!0},getHeight:function(){return this._scroller.offsetHeight},getTop:function(){return-i.getY(this._scroller)},to:function(a){var b=this,c=b._scroller,d=i.getX(c),e=k(c);a=-a,e>a?a=e:a>0&&(a=0),c.style.webkitTransform=i.getTranslate(d,a),b._onScrollEnd()},_preventBodyTouch:function(a){return a.preventDefault(),!1},_onTouchStart:function(){var b=this,c=b._scroller;c.style.webkitTransition="none",c.style.webkitTransform=getComputedStyle(c).webkitTransform,b._refreshed&&(b._refreshed=!1,b._scrollHeight=c.offsetHeight,c.style.height=b._scrollHeight+"px")},_onPanStart:function(){var b=this,c=b._scroller;b._originalX=i.getX(c),b._originalY=i.getY(c)},_onPan:function(a){var b=this,c=b._scroller,d=k(c),e=b._originalX,f=b._originalY,g=b._currentY=f+a.displacementY;c.style.webkitTransform=g>0?i.getTranslate(e,g/2):d>g?i.getTranslate(e,(d-g)/2+g):i.getTranslate(e,g)},_onPanEnd:function(){var b=this,c=b._scroller,d=b._originalX,e=b._currentY,f=k(c),g=null;e>0&&(g=0),f>e&&(g=f),null!=g?i.start(c,"0.4s","ease-out","0s",d,g,b._onScrollEnd):b._onScrollEnd()},_onFlick:function(a){var b=this,c=b._scroller,d=b._originalX,e=b._currentY,f=k(c);if(b._scrollEndCancel=!0,!(f>e||e>0)){var g=i.getY(c),h=a.valocityY;h>1.5&&(h=1.5),-1.5>h&&(h=-1.5);var j=.0015*(h/Math.abs(h)),l=h/j,m=g+l*h/2;if(m>0||f>m){var n=m>0?1:-1,o=m>0?0:f;m=(m-o)/2+o,l=(n*Math.sqrt(2*j*(m-g)+h*h)-h)/j,v=h-j*l,i.start(c,l.toFixed(0)+"ms","cubic-bezier("+i.getBezier(-h/j,-h/j+l)+")","0s",d,m.toFixed(0),function(){h=v,g=m,j=.0045*(h/Math.abs(h)),l=-h/j,m=o,i.start(c,(0-l).toFixed(0)+"ms","cubic-bezier("+i.getBezier(-l,0)+")","0s",d,m.toFixed(0),b._onScrollEnd)})}else i.start(c,l.toFixed(0)+"ms","cubic-bezier("+i.getBezier(-l,0)+")","0s",d,m.toFixed(0),b._onScrollEnd)}},_onScrollEnd:function(){var a=this;a._scrollEndCancel=!1,setTimeout(function(){a._scrollEndCancel||a._scrollEndHandler&&a._scrollEndHandler()},10)}});return l}),define("#mix/sln/0.3.3/modules/component",["./scroll","./gesture","./transform","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/base/message","mix/core/0.3.0/url/navigate"],function(a){a("mix/core/0.3.0/base/reset");var d=window,f=(d.document,a("mix/core/0.3.0/base/class")),g=a("mix/core/0.3.0/base/message"),i=(a("mix/core/0.3.0/url/navigate").singleton,a("./scroll")),j=a("./transform"),k={},m=function(a,b){a.fn||(a.fn={}),Object.extend(a.fn,b)},n=f.create({Implements:g,initialize:function(){g.prototype.initialize.call(this,"component")},get:function(a){return k[a]},initViewport:function(a){k.viewport=a,a.getAttribute("id")||a.setAttribute("id","viewport-"+Date.now())},initNavibar:function(a){var b=k.viewport;b.className+=" enableNavibar",k.navibar=a,m(a,{change:function(b,c){function g(){e.className="",e.removeEventListener("webkitTransitionEnd",g)}var e=a.querySelector("ul"),f=e.querySelector("li:first-child");f.innerHTML=b,e.className=c,setTimeout(function(){e.className+=" transition",e.addEventListener("webkitTransitionEnd",g,!1)},1)},set:function(b){var d=a.querySelector("ul"),e=d.querySelector("li:first-child");e.innerHTML=b}})},initBtn:function(a,b){k[a]=b;var c=this;return m(b,{setText:function(a){b.innerText=a},show:function(){b.style.visibility=""},hide:function(){b.style.visibility="hidden"}}),b.addEventListener("click",function(b){return c.trigger(a+"Click"),b.preventDefault(),!1}),b},initBackBtn:function(a){this.initBtn("backBtn",a)},initFuncBtn:function(a){this.initBtn("funcBtn",a)},initContent:function(a){k.content=a;var b=a.querySelector("div > .active"),c=a.querySelector("div > .inactive");b.setAttribute("index","0"),c.setAttribute("index","1"),m(a,{getActive:function(){return b},getInactive:function(){return c},switchActive:function(){swap=c,c=b,b=swap},toggleClass:function(){c.className="inactive",b.className="active"}})},getActiveContent:function(){return k.content.fn.getActive()},initScroll:function(a){k.scroll=a;var b=this,d=(a.children[0],new i(a)),e=k.viewport;e.className+=" enableScroll",a.className+=" scroll",d._scrollEndHandler=function(){b.trigger("scrollEnd")},d.enable(),m(a,{refresh:function(){d.refresh()},getScrollHeight:function(){return d.getHeight()},getScrollTop:function(){return d.getTop()},scrollTo:function(a){d.to(a)}})},initTransition:function(a){function e(c){var g,h,i,k,e=a.querySelector("div"),f=e.offsetWidth;d.fn.switchActive(),g=d.fn.getActive(),h=d.fn.getInactive(),g.style.display="block",g.style.top="-9999px",e.appendChild(g),i=j.getX(e),k=j.getY(e),i+="forward"===c?-f:f,j.start(e,"0.4s","ease",0,i,k,function(){d.fn.toggleClass(),g.style.left=-i+"px",g.style.top="",g.style.display="",h.innerHTML="",e.removeChild(h),e.style.webkitTransform=j.getTranslate(i,0),b.trigger(c+"TransitionEnd")})}k.transition=a;var b=this,c=k.viewport,d=k.content;c.className+=" enableTransition",a.className+=" transition",m(a,{forward:function(){e("forward")},backward:function(){e("backward")}})}});return new n}),define("#mix/sln/0.3.3/modules/view",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a){function k(){j||(j=!0,Object.extend(i.prototype,i.fn))}a("mix/core/0.3.0/base/reset");var d=window,f=(d.document,a("mix/core/0.3.0/base/class")),g={},h=0,i=f.create({initialize:function(){var a=this,b=a.name;a._vid=b+"-"+Date.now()+"-"+h++,a.views||(a.views={})},loadTemplate:function(a,b){var c=this;1===arguments.length&&(b=arguments[0],a=c.template),a&&app.loadFile(a,b)},compileTemplate:function(a,b){var d=app.config.templateEngine;return d&&d.compile&&Object.isTypeof(a,"string")&&(a=d.compile(a)),b?(b(a),void 0):a},renderTemplate:function(a,b){var c=this,d=app.config.templateEngine,e=c.compiledTemplate,f="";return f=d&&d.render&&Object.isTypeof(a,"object")&&e?d.render(e,a):e,b?(b(f),void 0):f}});i.fn={};var j=!1;return i.define=function(a){k();var b=i.extend(a);return g[a.name]=b},i.get=function(a){return g[a]},i.each=function(a){Object.each(g,a)},i}),define("#mix/sln/0.3.3/modules/page",["./view","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/base/message"],function(a){function m(){l||(l=!0,Object.extend(k.prototype,k.fn))}a("mix/core/0.3.0/base/reset");var d=window,f=(d.document,a("mix/core/0.3.0/base/class")),g=a("mix/core/0.3.0/base/message"),h=a("./view"),i={DEFINED:0,UNLOADED:1,LOADED:2,READY:3},j={},k=f.create({Extends:h,Implements:g,initialize:function(){var a=this,b=a.name;g.prototype.initialize.call(a,"page."+b),h.prototype.initialize.apply(a,arguments),a.status=i.DEFINED},getTitle:function(){return this.title},fill:function(a,b){var c=this;Object.isTypeof(a,"string")||(a=c.renderTemplate(a)),c.trigger("rendered",a),b&&b()},ready:function(){},unload:function(){}});k.STATUS=i,k.global={},k.fn={};var l=!1;return k.define=function(a){m();var b=k.extend(a),c=new b;return Object.each(k.global,function(a,b){var d=Object.isTypeof(a);switch(d){case"array":c[b]=a.slice(0).concat(c[b]||[]);break;case"object":c[b]=Object.extend(a,c[b]||{});break;case"string":case"number":null==c[b]&&(c[b]=a)}}),j[c.name]=c},k.get=function(a){return j[a]},k.each=function(a){Object.each(j,a)},k}),define("#mix/sln/0.3.3/modules/navigation",["./page","./view","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/url/navigate","mix/core/0.3.0/base/message"],function(a){a("mix/core/0.3.0/base/reset");var d=window,f=(d.document,a("mix/core/0.3.0/base/class")),g=a("mix/core/0.3.0/url/navigate").singleton,h=a("./page"),i=h.STATUS,j=f.create({initialize:function(a){var b=this,c=a.name.split(".");b.pageName=c[0],b.routeName=c[1],b.state=a},load:function(a){function e(b){d[b]=!0,d.join("").match(/^(true)*$/)&&(c.status=i.LOADED,a())}function f(a){var b=a.views||{};d.push(a),Object.each(b,f)}var c=h.get(this.pageName),d=[];c.status<i.LOADED&&(f(c),Object.each(d,function(a,b){a.loadTemplate(function(c){a.compileTemplate(c,function(c){a.compiledTemplate=c,e(b)})})}))},ready:function(){var a=h.get(this.pageName);a.status===i.LOADED&&a.status<i.READY&&(a.status=i.READY,a.trigger("ready"),a.ready())},unload:function(){var b=h.get(this.pageName);b.status>i.UNLOADED&&(b.status=i.UNLOADED,b.trigger("unloaded"),b.unload())}});return Object.extend(j,{_cur:null,getParameter:function(a){return this._cur?this._cur.state.params[a]:void 0},getArgument:function(a){return this._cur?this._cur.state.args[a]:void 0},getData:function(a){return this._cur?this._cur.state.datas[a]:void 0},getPageName:function(){return this._cur?this._cur.pageName:void 0},getRouteName:function(){return this._cur?this._cur.routeName:void 0},getState:function(){return this._cur?this._cur.state:void 0},push:function(a,b){g.forward(a,b)},pop:function(){g.backward()}}),j}),define("#mix/sln/0.3.3/app",["./modules/view","./modules/page","./modules/component","./modules/scroll","./modules/gesture","./modules/transform","./modules/navigation","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/url/router","mix/core/0.3.0/url/navigate","mix/core/0.3.0/base/message","mix/sln/0.3.3/app"],function(a){function m(){var a=app.config.viewport,b=a.querySelector("header.navibar"),c=b.querySelector("li:nth-child(2) button"),d=b.querySelector("li:nth-child(3) button");content=a.querySelector("section.content"),toolbar=a.querySelector("footer.toolbar"),k.initViewport(a),app.config.enableNavibar&&(k.initNavibar(b),k.initBackBtn(c),k.initFuncBtn(d)),k.initContent(content),app.config.enableScroll&&k.initScroll(content),app.config.enableTransition&&k.initTransition(content),app.config.enableToolbar&&k.initToolbar()}function n(){function i(a){var f=a.pageName,g=j.get(f),i=g.buttons;b.fn.hide(),c.fn.hide(),i&&Object.each(i,function(a){var f=a.type;switch(f){case"back":b.fn.setText(a.text),d=a.handler,(a.autoHide===!1||h.getStateIndex()>=1)&&b.fn.show();break;case"func":c.fn.setText(a.text),e=a.handler,c.fn.show();break;default:}a.onChange&&a.onChange.call(b)})}function m(b,c){var d=b.pageName,e=b.state.transition,f=j.get(d),g=f.getTitle()||"";c?a.fn.change(g,e):a.fn.set(g,e)}function n(a){app.config.enableTransition?g.fn[a.state.transition]():(f.fn.switchActive(),f.fn.toggleClass()),app.navigation._cur&&app.navigation._cur.unload(),app.navigation._cur=a,a.load(function(){a.ready(),app.config.enableNavibar&&m(a,!1)})}var a=k.get("navibar"),b=k.get("backBtn"),c=k.get("funcBtn"),d=null,e=null,f=k.get("content"),g=k.get("transition");k.on("backBtnClick",function(){d?d():h.backward()}),k.on("funcBtnClick",function(){e&&e()}),h.on("forward backward",function(a){var b=new l(a);app.config.enableNavibar&&(i(b),m(b,!0)),n(b)}),j.each(function(a){var b=a.name,c=a.route;c?Object.isTypeof(c,"string")&&(c={name:"anonymous",text:c}):c={name:"default","default":!0},h.addRoute(b+"."+c.name,c.text,c),a.on("rendered",function(a){var b=k.get("scroll"),c=k.getActiveContent();c&&(c.innerHTML=a),b&&b.fn.refresh()})})}a("mix/core/0.3.0/base/reset");var d=window,g=(d.document,a("mix/core/0.3.0/base/class"),a("mix/core/0.3.0/url/router").singleton),h=a("mix/core/0.3.0/url/navigate").singleton,i=a("./modules/view"),j=a("./modules/page"),k=a("./modules/component"),l=a("./modules/navigation");app={},Object.extend(app,{config:{viewport:null,theme:"iOS",routePrefix:0,routePrefixSep:"/",enableNavibar:!1,enableScroll:!1,enableTransition:!1,enableToolbar:!1,templateEngine:null},view:i,page:j,component:k,navigation:l,plugin:{},loadFile:function(a,b){var c=new d.XMLHttpRequest;c.onreadystatechange=function(){4===c.readyState&&(c.status>=200&&300>c.status||304===c.status)&&b(c.responseText)},c.open("GET",a,!0),c.send()},start:function(){m(),n(),app.plugin.init&&app.plugin.init(),g.start()}}),d.app=app}),require("mix/sln/0.3.3/app");