(function(a,b){var c=a.document;b.view.fn.parseMultiTemplate=function(a){var d,b=c.createElement("div"),f={};return b.innerHTML=a,d=b.querySelectorAll('script[type="text/template"]'),0===d.length?f.main=a:Object.each(d,function(a){var b=a.getAttribute("id");f[b]=a.innerHTML}),f},b.view.fn.compileMultiTemplate=function(a,b){var c=this,d={};return Object.each(a,function(a,b){c.compileTemplate(a,function(a){d[b]=a})}),b?(b(d),void 0):d},b.view.fn.loadTemplate=function(a,c){var d=this;1===arguments.length&&(c=arguments[0],a=d.template||d.templates),Object.isTypeof(a,"string")?b.loadFile(a,function(a,b){var c=d.parseMultiTemplate(a);d.compileMultiTemplate(c,b)}):a&&d.compileMultiTemplate(a,c)},b.view.fn.renderTemplate=function(){return this.renderMultiTemplate.apply(this,arguments)},b.view.fn.renderMultiTemplate=function(a,d){var i,e=this,f=b.config.templateEngine,g=e.compiledTemplate,h={};return Object.each(a,function(a,b){var c=g[b];c&&(h[b]=f&&f.render?f.render(c,a):c)}),h.main&&(i=c.createElement("div"),i.innerHTML=h.main,Object.each(h,function(a,b){if("main"!==b){var c=i.querySelector("#"+b);c&&(c.innerHTML=a)}}),h=i.innerHTML),d?(d(h),void 0):h},b.view.fn.renderSingleTemplate=function(a,b,c){var d=this,e={};return e[a]=b,c?(d.renderMultiTemplate(e,function(b){c(b[a])}),void 0):d.renderMultiTemplate(e)[a]},b.plugin.multiTemplate=!0})(window,window.app);