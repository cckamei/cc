webpackJsonp([23],{A0Xp:function(a,e){},efvT:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("Dd8w"),l=t.n(r),i=t("NYxO"),o={data:function(){return{isEdit:!1,loadmore:!1,occupation:["教育工作","医务工作","财务工作","媒体市场","服务行业","零售行业","艺术工作","技术工作","公务员"],reqData:{nick_name:"",name:"",gender:-1,birthday:"",idcard:"",occupation:-1,wmzqh:"",szsc:"",zzqh:"",xlcd:"",wedding_day:"",lover_birth:"",son_birth:"",daughter_birth:"",hobbit:"",advisor_name:"",store_code:""}}},computed:{isActive:function(){return this.reqData.nick_name.length&&this.reqData.name.length&&-1!==this.reqData.gender&&this.reqData.birthday.length&&this.reqData.idcard.length&&-1!==this.reqData.career}},created:function(){this.pageInit()},methods:l()({},Object(i.b)(["ajax"]),{pageInit:function(){var a=this;this.ajax({name:"getUserInfo"}).then(function(e){var t=e;a.occupation.forEach(function(a,e){a==t.career&&(t.occupation=e)}),a.reqData=t})},edit:function(){console.log(46),this.isEdit=!this.isEdit},confirm:function(){var a=this,e=this.reqData,t=e.occupation;e.career=this.occupation[t],this.ajax({name:"editUserInfo",data:e}).then(function(e){a.$router.push({name:"mypage"})})}})},n={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"pt"},[t("v-header",{attrs:{back:""}},[a._v("个人资料")]),a._v(" "),t("div",{staticClass:"content"},[t("ul",[t("li",{staticClass:"section"},[t("ul",{staticClass:"form"},[t("li",[t("v-form-input",{attrs:{readonly:!a.isEdit,label:"昵称*",maxlength:"6",placeholder:"请填写您的账户昵称"},model:{value:a.reqData.nick_name,callback:function(e){a.$set(a.reqData,"nick_name",e)},expression:"reqData.nick_name"}})],1),a._v(" "),t("li",[t("v-form-input",{attrs:{readonly:!a.isEdit,label:"姓名*",maxlength:"4",placeholder:"请填写您的真实姓名"},model:{value:a.reqData.name,callback:function(e){a.$set(a.reqData,"name",e)},expression:"reqData.name"}})],1),a._v(" "),t("li",[t("v-form-select",{attrs:{label:"性别*",title:"性别选择",list:["男","女"],placeholder:"请选择您的性别"},model:{value:a.reqData.gender,callback:function(e){a.$set(a.reqData,"gender",e)},expression:"reqData.gender"}})],1),a._v(" "),t("li",[t("v-form-datepicker",{attrs:{label:"生日*",title:"生日日期",format:"yyyy-MM-dd",yearFormat:"{value} 年",monthFormat:"{value} 月",dateFormat:"{value} 日",placeholder:"请选择生日"},model:{value:a.reqData.birthday,callback:function(e){a.$set(a.reqData,"birthday",e)},expression:"reqData.birthday"}})],1),a._v(" "),t("li",[t("v-form-input",{attrs:{readonly:!a.isEdit,label:"身份证号*",maxlength:"20",placeholder:"请填写您的身份证号码"},model:{value:a.reqData.idcard,callback:function(e){a.$set(a.reqData,"idcard",e)},expression:"reqData.idcard"}})],1),a._v(" "),t("li",[t("v-form-select",{attrs:{label:"职业*",title:"职业选择",list:a.occupation,placeholder:"请选择您所从事的职业"},model:{value:a.reqData.occupation,callback:function(e){a.$set(a.reqData,"occupation",e)},expression:"reqData.occupation"}})],1)]),a._v(" "),a.loadmore?a._e():t("div",{staticClass:"more",on:{click:function(e){a.loadmore=!0}}},[a._v("点击展开填写详细资料获取更多优惠（选填）")])]),a._v(" "),a.loadmore?t("li",{staticClass:"section"},[t("ul",{staticClass:"form"},[t("li",[t("v-form-input",{attrs:{readonly:!a.isEdit,label:"中指指圈号",maxlength:"20"},model:{value:a.reqData.zzqh,callback:function(e){a.$set(a.reqData,"zzqh",e)},expression:"reqData.zzqh"}})],1),a._v(" "),t("li",[t("v-form-input",{attrs:{readonly:!a.isEdit,label:"无名指指圈号",maxlength:"20"},model:{value:a.reqData.wmzqh,callback:function(e){a.$set(a.reqData,"wmzqh",e)},expression:"reqData.wmzqh"}})],1),a._v(" "),t("li",[t("v-form-input",{attrs:{readonly:!a.isEdit,label:"项链长度",maxlength:"20",unit:"cm"},model:{value:a.reqData.xlcd,callback:function(e){a.$set(a.reqData,"xlcd",e)},expression:"reqData.xlcd"}})],1),a._v(" "),t("li",[t("v-form-input",{attrs:{label:"手镯尺寸",readonly:!a.isEdit,maxlength:"20",unit:"mm"},model:{value:a.reqData.szsc,callback:function(e){a.$set(a.reqData,"szsc",e)},expression:"reqData.szsc"}})],1)])]):a._e(),a._v(" "),a.loadmore?t("li",{staticClass:"section"},[t("ul",{staticClass:"form"},[t("li",[t("v-form-datepicker",{attrs:{label:"结婚纪念日",title:"结婚纪念日",format:"yyyy-MM-dd",yearFormat:"{value} 年",monthFormat:"{value} 月",dateFormat:"{value} 日",placeholder:"请选择"},model:{value:a.reqData.wedding_day,callback:function(e){a.$set(a.reqData,"wedding_day",e)},expression:"reqData.wedding_day"}})],1),a._v(" "),t("li",[t("v-form-datepicker",{attrs:{label:"配偶生日",title:"配偶生日",format:"yyyy - MM - dd",yearFormat:"{value}年",monthFormat:"{value}月",dateFormat:"{value}日",placeholder:"请选择"},model:{value:a.reqData.lover_birth,callback:function(e){a.$set(a.reqData,"lover_birth",e)},expression:"reqData.lover_birth"}})],1),a._v(" "),t("li",[t("v-form-datepicker",{attrs:{label:"儿子生日",title:"儿子生日",format:"yyyy-MM-dd",yearFormat:"{value}年",monthFormat:"{value}月",dateFormat:"{value}日",placeholder:"请选择"},model:{value:a.reqData.son_birth,callback:function(e){a.$set(a.reqData,"son_birth",e)},expression:"reqData.son_birth"}})],1),a._v(" "),t("li",[t("v-form-datepicker",{attrs:{label:"女儿生日",title:"女儿生日",format:"yyyy-MM-dd 日",yearFormat:"{value}年",monthFormat:"{value}月",dateFormat:"{value}日",placeholder:"请选择"},model:{value:a.reqData.daughter_birth,callback:function(e){a.$set(a.reqData,"daughter_birth",e)},expression:"reqData.daughter_birth"}})],1),a._v(" "),t("li",[t("v-form-input",{attrs:{readonly:!a.isEdit,label:"兴趣爱好",maxlength:"20"},model:{value:a.reqData.hobbit,callback:function(e){a.$set(a.reqData,"hobbit",e)},expression:"reqData.hobbit"}})],1)])]):a._e(),a._v(" "),a.reqData.store_code?t("li",{staticClass:"section"},[t("div",{staticClass:"more"},[a._v("以下内容由线下门店填写（选填）")]),a._v(" "),t("ul",{staticClass:"form"},[t("li",[t("v-form-input",{attrs:{label:"门店代码",disabled:"disabled",maxlength:"20"},model:{value:a.reqData.store_code,callback:function(e){a.$set(a.reqData,"store_code",e)},expression:"reqData.store_code"}})],1),a._v(" "),t("li",[t("v-form-input",{attrs:{label:"珠宝顾问姓名",disabled:"disabled",maxlength:"20"},model:{value:a.reqData.advisor_name,callback:function(e){a.$set(a.reqData,"advisor_name",e)},expression:"reqData.advisor_name"}})],1)])]):a._e()])]),a._v(" "),a.isEdit?a._e():t("div",{staticClass:"rightTopBtn",on:{click:function(e){a.edit()}}},[a._v("编辑")]),a._v(" "),a.isEdit?t("div",{staticClass:"rightTopBtn submitBtn"},[t("button",{staticClass:"btn",class:{active:a.isActive},on:{click:function(e){a.isActive&&a.confirm()}}},[a._v("提交")])]):a._e()],1)},staticRenderFns:[]};var s=t("VU/8")(o,n,!1,function(a){t("A0Xp")},"data-v-2214d92e",null);e.default=s.exports}});
//# sourceMappingURL=23.03375e31b2df0c33674e.js.map