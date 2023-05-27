(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sign-up"],{"0687":function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s._self._c;return t("div",{staticClass:"container u-full-height u-flex u-flex-col pt-4"},[t("div",{staticClass:"mb-24"},[t("h2",{staticClass:"u-text-normal mb-12"},[s._v("Sign up")]),t("form",{on:{submit:function(t){return t.preventDefault(),s.onSubmit.apply(null,arguments)}}},[t("div",{staticClass:"form-group mr-12"},[s._m(0),t("input",{directives:[{name:"model",rawName:"v-model",value:s.form.username,expression:"form.username"}],staticClass:"form-control",attrs:{id:"username",type:"email",autocomplete:"username",autofocus:"",required:""},domProps:{value:s.form.username},on:{input:function(t){t.target.composing||s.$set(s.form,"username",t.target.value)}}})]),t("div",{staticClass:"form-group mr-12"},[s._m(1),t("input",{directives:[{name:"model",rawName:"v-model",value:s.form.password,expression:"form.password"}],staticClass:"form-control",attrs:{id:"password",type:"password",autocomplete:"new-password",required:""},domProps:{value:s.form.password},on:{input:function(t){t.target.composing||s.$set(s.form,"password",t.target.value)}}}),t("small",{staticClass:"text-muted"},[s._v("Must be at least 8 characters")])]),t("div",{staticClass:"form-group mr-12"},[s._m(2),t("input",{directives:[{name:"model",rawName:"v-model",value:s.form.repeatPassword,expression:"form.repeatPassword"}],staticClass:"form-control",attrs:{id:"repeatPassword",type:"password",autocomplete:"new-password",required:""},domProps:{value:s.form.repeatPassword},on:{input:function(t){t.target.composing||s.$set(s.form,"repeatPassword",t.target.value)}}})]),t("b-button",{attrs:{type:"submit","is-loading":s.isLoading,variant:"secondary"}},[s._v("Sign up")])],1),t("p",{staticClass:"mt-4"},[s._v(" Already have an account? "),t("router-link",{staticClass:"text-secondary",attrs:{to:{name:"Login"}}},[s._v("Sign in here")])],1)])])},r=[function(){var s=this,t=s._self._c;return t("label",{attrs:{for:"username"}},[s._v("Email address "),t("sup",[s._v("*")])])},function(){var s=this,t=s._self._c;return t("label",{attrs:{for:"password"}},[s._v("Password "),t("sup",[s._v("*")])])},function(){var s=this,t=s._self._c;return t("label",{attrs:{for:"password"}},[s._v("Confirm password "),t("sup",[s._v("*")])])}],o=(e("14d9"),e("1b3a")),i=e("1947"),n={name:"Login",components:{BButton:i["a"]},data(){return{isLoading:!1,form:{username:"",password:"",repeatPassword:""}}},methods:{async onSubmit(){if(!this.isLoading)if(this.form.username&&this.form.password&&this.form.repeatPassword)if(this.form.password===this.form.repeatPassword){this.isLoading=!0;try{await this.$appwrite.account.create(o["d"].unique(),this.form.username,this.form.password),await this.$appwrite.account.createEmailSession(this.form.username,this.form.password);const{$id:s,name:t}=await this.$appwrite.account.get();this.$store.commit("setUser",{id:s,name:t}),await this.$router.push({name:"Home"})}catch(s){console.log(s),this.$toast.open({type:"error",message:s.message})}finally{this.isLoading=!1}}else this.$toast.open({type:"error",message:"Passwords do not match."});else this.$toast.open({type:"error",message:"Please provide email and password."})}}},m=n,u=e("2877"),p=Object(u["a"])(m,a,r,!1,null,"2eeb072a",null);t["default"]=p.exports}}]);
//# sourceMappingURL=sign-up.85fb1744.js.map