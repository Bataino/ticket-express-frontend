import{b as l,o as a,c as i,d as n,a as e,e as u}from"./index-1c3ab2de.js";import"./checkbox.esm-a7413631.js";import"./index.esm-e7ada94f.js";import"./fileuploadstyle.esm-3da4add9.js";const m={class:""},_={class:"p-3"},b=e("h4",{class:"bold text-primary mb-4"},"Edit Venue",-1),p={class:"row"},h=u('<div class="col-12 col-md-6"><div><label class="fw-bold mb-1"> Title </label><input placeholder="The Venue&#39;s title" class="p-2 border rounded-7 w-100 mb-3"></div></div><div class="col-12 col-md-6"><div><label class="fw-bold mb-1"> Address </label><input placeholder="Input venue&#39;s full address" class="p-2 border rounded-7 w-100 mb-3"></div></div>',2),v={class:"col-12 col-md-6"},y={class:"mb-3"},g=e("label",{class:"fw-bold mb-1"}," Country ",-1),w={class:"col-12 col-md-6"},V={class:"mb-3"},f=e("label",{class:"fw-bold mb-1"}," State ",-1),U=e("div",{class:"bg-whitesmoke mt-2 mx-2 rounded-7",style:{"min-height":"200px"}},null,-1),N=e("button",{class:"btn btn-sm small btn-primary mt-3 mb-4 w-100 w-lg-fit"}," Update Venue ",-1),S={name:"HomeView",components:{},data(){return{products:[{},{},{}],data:{country:"US",region:"NY"},country:"US",region:"NY"}}},Y=Object.assign(S,{setup(k){return(o,s)=>{const d=l("te-header"),c=l("country-select"),r=l("region-select");return a(),i("div",m,[n(d),e("div",_,[b,e("div",p,[h,e("div",v,[e("div",y,[g,n(c,{modelValue:o.country,"onUpdate:modelValue":s[0]||(s[0]=t=>o.country=t),country:o.country,topCountry:"US",class:"w-100 p-2 border rounded-7"},null,8,["modelValue","country"])])]),e("div",w,[e("div",V,[f,n(r,{modelValue:o.region,"onUpdate:modelValue":s[1]||(s[1]=t=>o.region=t),country:o.country,region:o.region,class:"w-100 p-2 border rounded-7"},null,8,["modelValue","country","region"])])]),U]),N])])}}});export{Y as default};