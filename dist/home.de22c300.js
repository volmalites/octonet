(self.webpackChunkoctonet=self.webpackChunkoctonet||[]).push([[177],{Ewbq:function(){},kjgD:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return f}});var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("section",{attrs:{id:"container"}},[t("loading",{attrs:{opacity:1,"background-color":"black",height:255,width:255,color:"aquamarine",active:e.isLoading,"can-cancel":!1,"is-full-page":e.fullPage},on:{"update:active":function(n){e.isLoading=n}}})],1)])};i._withStripped=!0,t("ls82"),t("2B1R"),t("5s+n"),t("07d7");var r=t("Womt"),a=t("kGIl"),o=t.n(a);function s(e,n,t,i,r,a,o){try{var s=e[a](o),c=s.value}catch(e){return void t(e)}s.done?n(c):Promise.resolve(c).then(i,r)}t("z28l");var c,d,l={name:"ThreeTest",data:function(){return{camera:null,scene:null,renderer:null,mesh:null,isLoading:!0,fullPage:!1}},components:{Loading:o()},methods:{init:function(){var e=document.getElementById("container");this.camera=new r.cPb(45,window.innerWidth/window.innerHeight,.01,1e3),this.camera.position.z=1.5,this.scene=new r.xsS;var n=new r.dpR,t=n.load("./../../public/2_no_clouds_4k.jpg"),i=n.load("./../../public/elev_bump_4k.jpg"),a=n.load("./../../public/water_4k.png"),o=n.load("./../../public/fair_clouds_4k.png");this.scene.add(new r.Mig(3355443));var s=new r.Ox3(16777215,1);s.position.set(5,-3,5),this.scene.add(s);var c=new r.xo$(.5,32,32),d=new r.xoR;d.color.set(16777215),d.map=t,d.bumpMap=i,d.bumpScale=.0025,d.specularMap=a,d.specular=new r.Ilk("grey");var l=new r.xo$(.506,32,32),h=new r.xoR({map:o,side:r.ehD,transparent:!0,depthWrite:!1});this.cloudMesh=new r.Kj0(l,h),this.mesh=new r.Kj0(c,d),this.scene.add(this.mesh),this.mesh.add(this.cloudMesh),this.renderer=new r.CP7({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(e.clientWidth-10,window.innerHeight);var u=document.createElement("div");u.style.position="absolute",u.style.top="5%",u.style.right=0,u.style.left=0,u.style.backgroundColor="rgb(127,255,212,0.25)",u.setAttribute("id","aqua");var p=document.createElement("h1");p.innerText="WELCOME TO OUR WEBSITE",u.appendChild(p),(p=document.createElement("h2")).innerText="We develop tailor made digital solutions for any need only short of the imagination",u.appendChild(p),e.appendChild(this.renderer.domElement),e.appendChild(u)},animate:(c=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:requestAnimationFrame(this.animate),this.mesh.rotation.y-=.001,this.cloudMesh.rotation.y+=39e-5,this.renderer.render(this.scene,this.camera);case 4:case"end":return e.stop()}}),e,this)})),d=function(){var e=this,n=arguments;return new Promise((function(t,i){var r=c.apply(e,n);function a(e){s(r,t,i,a,o,"next",e)}function o(e){s(r,t,i,a,o,"throw",e)}a(void 0)}))},function(){return d.apply(this,arguments)}),resize:function(e,n){this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n),this.renderer.render(this.scene,this.camera)}},mounted:function(){var e=this;this.init(),this.animate().then(this.isLoading=!1);var n=document.getElementById("container");window.addEventListener("resize",(function(){e.resize(n.clientWidth,window.innerHeight)}))}},h=t("LboF"),u=t.n(h),p=t("Ewbq"),m=t.n(p),w=(u()(m(),{insert:"head",singleton:!1}),m().locals,(0,t("KHd+").Z)(l,i,[],!1,null,"df02a584",null));w.options.__file="src/components/HomePage.vue";var f=w.exports}}]);