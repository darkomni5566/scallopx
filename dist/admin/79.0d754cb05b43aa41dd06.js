(self.webpackChunkblack_dashboard_angular=self.webpackChunkblack_dashboard_angular||[]).push([[79],{30079:function(t,e,i){"use strict";i.r(e),i.d(e,{KycLimitModule:function(){return P}});var r=i(38583),n=i(91841),o=i(90665),s=i(14330),a=i(89736),c=i(72533),u=i(76419),l=i(89019),m=i(9022);function p(t,e){1&t&&(m.TgZ(0,"h2"),m._uU(1,"Kyc Limit"),m.qZA())}function d(t,e){1&t&&(m.TgZ(0,"h2"),m._uU(1,"Create Limit"),m.qZA())}function g(t,e){1&t&&(m.TgZ(0,"h2"),m._uU(1,"Kyc Detail"),m.qZA())}function Z(t,e){1&t&&(m.TgZ(0,"h2"),m._uU(1,"Update Kyc Limit"),m.qZA())}function f(t,e){if(1&t){var i=m.EpF();m.TgZ(0,"button",12),m.NdJ("click",function(){return m.CHM(i),m.oxw().onEditAction()}),m._uU(1," EDIT"),m.qZA()}if(2&t){var r=m.oxw();m.Q6J("disabled",0==(null==r.permissionObj?null:r.permissionObj.isUpdate))}}function T(t,e){if(1&t){var i=m.EpF();m.TgZ(0,"button",13),m.NdJ("click",function(){return m.CHM(i),m.oxw().back()}),m._uU(1," BACK "),m.qZA()}}function h(t,e){if(1&t){var i=m.EpF();m.TgZ(0,"button",14),m.NdJ("click",function(){return m.CHM(i),m.oxw().onCreateAction()}),m._uU(1,"CREATE LIMIT +"),m.qZA()}if(2&t){var r=m.oxw();m.Q6J("disabled",0==(null==r.permissionObj?null:r.permissionObj.isCreate))}}function b(t,e){if(1&t){var i=m.EpF();m.TgZ(0,"tr"),m.TgZ(1,"td"),m._uU(2),m.qZA(),m.TgZ(3,"td"),m._uU(4),m.qZA(),m.TgZ(5,"td"),m._uU(6),m.qZA(),m.TgZ(7,"td"),m._uU(8),m.qZA(),m.TgZ(9,"td"),m._uU(10),m.ALo(11,"date"),m.qZA(),m.TgZ(12,"td",19),m.TgZ(13,"button",23),m.TgZ(14,"i",24),m.NdJ("click",function(){var t=m.CHM(i).$implicit;return m.oxw(2).viewDetailsObj(t)}),m.qZA(),m.qZA(),m._uU(15,"\xa0\xa0 "),m.qZA(),m.qZA()}if(2&t){var r=e.$implicit,n=m.oxw(2);m.xp6(2),m.Oqu(null==r?null:r.limit),m.xp6(2),m.Oqu(null==r?null:r.limitType),m.xp6(2),m.Oqu(null==r?null:r.riskType),m.xp6(2),m.Oqu(null==r?null:r.riskScore),m.xp6(2),m.Oqu(m.xi3(11,6,null==r?null:r.creationTime,"mediumDate")),m.xp6(3),m.Q6J("disabled",0==(null==n.permissionObj?null:n.permissionObj.isRead))}}function v(t,e){1&t&&(m.TgZ(0,"tr"),m.TgZ(1,"td",25),m._uU(2,"No Record Found"),m.qZA(),m.qZA())}var A=function(t,e,i){return{itemsPerPage:t,totalItems:e,currentPage:i}};function y(t,e){if(1&t){var i=m.EpF();m.TgZ(0,"div",15),m.TgZ(1,"div",16),m.TgZ(2,"table",17),m.TgZ(3,"thead",18),m.TgZ(4,"tr"),m.TgZ(5,"th"),m._uU(6,"Limit"),m.qZA(),m.TgZ(7,"th"),m._uU(8,"Limit Type"),m.qZA(),m.TgZ(9,"th"),m._uU(10,"Risk Type"),m.qZA(),m.TgZ(11,"th"),m._uU(12,"Risk Score"),m.qZA(),m.TgZ(13,"th"),m._uU(14,"Created At"),m.qZA(),m.TgZ(15,"th",19),m._uU(16,"Actions"),m.qZA(),m.qZA(),m.qZA(),m.TgZ(17,"tbody"),m.YNc(18,b,16,9,"tr",20),m.ALo(19,"paginate"),m.YNc(20,v,3,0,"tr",6),m.qZA(),m.qZA(),m.qZA(),m.TgZ(21,"div",21),m.TgZ(22,"pagination-controls",22),m.NdJ("pageChange",function(t){return m.CHM(i),m.oxw().pagination(t)}),m.qZA(),m.qZA(),m.qZA()}if(2&t){var r=m.oxw();m.xp6(18),m.Q6J("ngForOf",m.xi3(19,2,r.roleList,m.kEZ(5,A,r.itemPerPage,r.totalItems,r.currentPage))),m.xp6(2),m.Q6J("ngIf",!r.roleList.length)}}function q(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1," *Please Enter limit."),m.qZA())}function k(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1,"*Please Enter Valid limit."),m.qZA())}function I(t,e){if(1&t&&(m.TgZ(0,"div",38),m.YNc(1,q,2,0,"p",31),m.YNc(2,k,2,0,"p",31),m.qZA()),2&t){var i=m.oxw(2);m.xp6(1),m.Q6J("ngIf",i.adminForm.get("limit").errors.required),m.xp6(1),m.Q6J("ngIf",i.adminForm.get("limit").errors.pattern)}}function x(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1," *Please Enter Limit Type."),m.qZA())}function N(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1,"*Please Enter Valid Limit Type."),m.qZA())}function U(t,e){if(1&t&&(m.TgZ(0,"div",38),m.YNc(1,x,2,0,"p",31),m.YNc(2,N,2,0,"p",31),m.qZA()),2&t){var i=m.oxw(2);m.xp6(1),m.Q6J("ngIf",i.adminForm.get("limitType").errors.required),m.xp6(1),m.Q6J("ngIf",i.adminForm.get("limitType").errors.pattern)}}function _(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1," *Please Enter Risk Type."),m.qZA())}function E(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1,"*Please Enter Valid Risk Type."),m.qZA())}function S(t,e){if(1&t&&(m.TgZ(0,"div",38),m.YNc(1,_,2,0,"p",31),m.YNc(2,E,2,0,"p",31),m.qZA()),2&t){var i=m.oxw(2);m.xp6(1),m.Q6J("ngIf",i.adminForm.get("riskType").errors.required),m.xp6(1),m.Q6J("ngIf",i.adminForm.get("riskType").errors.pattern)}}function F(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1," *Please Enter Risk Score."),m.qZA())}function w(t,e){1&t&&(m.TgZ(0,"p",38),m._uU(1,"*Please Enter Valid Risk Score."),m.qZA())}function J(t,e){if(1&t&&(m.TgZ(0,"div",38),m.YNc(1,F,2,0,"p",31),m.YNc(2,w,2,0,"p",31),m.qZA()),2&t){var i=m.oxw(2);m.xp6(1),m.Q6J("ngIf",i.adminForm.get("riskScore").errors.required),m.xp6(1),m.Q6J("ngIf",i.adminForm.get("riskScore").errors.pattern)}}function L(t,e){if(1&t){var i=m.EpF();m.TgZ(0,"button",39),m.NdJ("click",function(){m.CHM(i);var t=m.oxw(2);return"UPDATE"==t.buttonName?t.updateRole():t.saveRole()}),m._uU(1),m.qZA()}if(2&t){var r=m.oxw(2);m.Q6J("disabled",!r.adminForm.valid)("title",r.buttonName),m.xp6(1),m.Oqu(r.buttonName)}}function O(t,e){if(1&t&&(m.TgZ(0,"div",15),m.TgZ(1,"form",26),m.TgZ(2,"div",1),m.TgZ(3,"div",27),m.TgZ(4,"div",28),m.TgZ(5,"label"),m._uU(6,"Limit "),m.TgZ(7,"span",29),m._uU(8,"*"),m.qZA(),m.qZA(),m._UZ(9,"input",30),m.qZA(),m.YNc(10,I,3,2,"div",31),m.qZA(),m.TgZ(11,"div",32),m.TgZ(12,"div",28),m.TgZ(13,"label"),m._uU(14,"Limit Type "),m.TgZ(15,"span",29),m._uU(16,"*"),m.qZA(),m.qZA(),m._UZ(17,"input",33),m.qZA(),m.YNc(18,U,3,2,"div",31),m.qZA(),m.TgZ(19,"div",27),m.TgZ(20,"div",28),m.TgZ(21,"label"),m._uU(22,"Risk Type "),m.TgZ(23,"span",29),m._uU(24,"*"),m.qZA(),m.qZA(),m._UZ(25,"input",34),m.qZA(),m.YNc(26,S,3,2,"div",31),m.qZA(),m.TgZ(27,"div",32),m.TgZ(28,"div",28),m.TgZ(29,"label"),m._uU(30,"Risk Score "),m.TgZ(31,"span",29),m._uU(32,"*"),m.qZA(),m.qZA(),m._UZ(33,"input",35),m.qZA(),m.YNc(34,J,3,2,"div",31),m.qZA(),m.qZA(),m.qZA(),m.TgZ(35,"div",36),m.YNc(36,L,2,3,"button",37),m.qZA(),m.qZA()),2&t){var i=m.oxw();m.xp6(1),m.Q6J("formGroup",i.adminForm),m.xp6(9),m.Q6J("ngIf",i.adminForm.get("limit").invalid&&(i.adminForm.get("limit").touched||i.adminForm.get("limit").dirty)),m.xp6(8),m.Q6J("ngIf",i.adminForm.get("limitType").invalid&&(i.adminForm.get("limitType").touched||i.adminForm.get("limitType").dirty)),m.xp6(8),m.Q6J("ngIf",i.adminForm.get("riskType").invalid&&(i.adminForm.get("riskType").touched||i.adminForm.get("riskType").dirty)),m.xp6(8),m.Q6J("ngIf",i.adminForm.get("riskScore").invalid&&(i.adminForm.get("riskScore").touched||i.adminForm.get("riskScore").dirty)),m.xp6(2),m.Q6J("ngIf","VIEW"!=i.buttonName)}}var Q=[{path:"kyc-limit",component:function(){function t(t,e){var i;this.server=t,this.router=e,this.buttonName="LIST",this.itemPerPage=10,this.currentPage=1,this.totalItems=0,this.selectedRoleObj={},this.permissionObj={},i=localStorage.getItem("permitted")?JSON.parse(atob(localStorage.getItem("permitted"))):[],this.permissionObj=i.find(function(t){return"Kyc Limit"==t.name})}return t.prototype.ngOnInit=function(){this.getUserList()},t.prototype.getUserList=function(){var t=this;this.roleList=[],this.totalItems=0;var e=l._.kycLimit.getKycLimit+"?page="+(this.currentPage-1)+"&pageSize="+this.itemPerPage+"&ip="+localStorage.getItem("ip");this.server.showSpinner(),this.server.getApi(e).subscribe(function(e){t.server.hideSpinner(),200==e.status?(t.roleList=e.data?e.data.data:[],t.server.showSuccToast(e.message),t.totalItems=e.data?e.data.count:0):205==e.status&&t.server.showErrToast(e.message)},function(e){t.server.hideSpinner(),401==e.status||400==e.status||e.status,t.server.showErrToast(e.error.message)})},t.prototype.formValidation=function(){this.adminForm=new o.cw({limit:new o.NI({value:"",disabled:"VIEW"===this.buttonName},[o.kI.required,o.kI.pattern(/^\d*\.?\d{0,26}$/g)]),limitType:new o.NI({value:"",disabled:"VIEW"===this.buttonName},[o.kI.required]),riskType:new o.NI({value:"",disabled:"VIEW"===this.buttonName||"UPDATE"===this.buttonName},[o.kI.required]),riskScore:new o.NI({value:"",disabled:"VIEW"===this.buttonName},[o.kI.required])})},t.prototype.onEditAction=function(){this.buttonName="UPDATE",this.adminForm.enable()},t.prototype.viewDetailsObj=function(t){this.selectedRoleObj=t,this.buttonName="VIEW",this.formValidation(),this.patchData()},t.prototype.patchData=function(){this.adminForm.patchValue({limit:this.selectedRoleObj.limit,limitType:this.selectedRoleObj.limitType,riskType:this.selectedRoleObj.riskType,riskScore:this.selectedRoleObj.riskScore})},t.prototype.saveRole=function(){var t=this;this.roleList=[],this.totalItems=0;var e=l._.kycLimit.getKycLimit,i={limit:this.adminForm.value.limit,limitType:this.adminForm.value.limitType,riskScore:this.adminForm.value.riskScore,riskType:this.adminForm.value.riskType,ip:localStorage.getItem("ip")};this.server.showSpinner(),this.server.postApi(e,i).subscribe(function(e){t.server.hideSpinner(),200==e.status?(t.roleList=e.data,t.buttonName="LIST",t.getUserList()):205==e.status&&t.server.showErrToast(e.message)},function(e){t.server.hideSpinner(),401==e.status||400==e.status||e.status,t.server.showErrToast(e.error.message)})},t.prototype.updateRole=function(){var t=this;if(this.adminForm.value.riskType==this.selectedRoleObj.riskType){this.roleList=[],this.totalItems=0;var e=l._.kycLimit.getKycLimit,i={limit:this.adminForm.value.limit,limitType:this.adminForm.value.limitType,riskScore:this.adminForm.value.riskScore,riskType:this.adminForm.value.riskType,ip:localStorage.getItem("ip")};this.server.showSpinner(),this.server.postApi(e,i).subscribe(function(e){t.server.hideSpinner(),200==e.status?(t.buttonName="LIST",t.getUserList()):205==e.status&&t.server.showErrToast(e.message)},function(e){t.server.hideSpinner(),401==e.status||400==e.status||e.status,t.server.showErrToast(e.error.message)})}else this.server.showErrToast("You cant update your own risk type")},t.prototype.onCreateAction=function(){this.formValidation(),this.buttonName="SAVE"},t.prototype.back=function(){this.buttonName="LIST"},t.prototype.pagination=function(t){this.currentPage=t,this.getUserList()},t.prototype.clearSearch=function(){this.searchKey="",this.currentPage=1,this.totalItems=0,this.getUserList()},t.\u0275fac=function(e){return new(e||t)(m.Y36(u.N),m.Y36(s.F0))},t.\u0275cmp=m.Xpm({type:t,selectors:[["app-kyc-limit"]],decls:18,vars:9,consts:[[1,"content"],[1,"row"],[1,"col-md-12"],[1,"card"],[1,"card-header",2,"display","flex"],[1,"tim-icons","icon-single-02","mr-2",2,"font-size","x-large"],[4,"ngIf"],[2,"padding-left","50%"],["class","btn btn-success editBack","title","Edit",3,"disabled","click",4,"ngIf"],["class","btn btn-success bckb",3,"click",4,"ngIf"],["class","btn btn-success ctb","title","Add",3,"disabled","click",4,"ngIf"],["class"," card-body",4,"ngIf"],["title","Edit",1,"btn","btn-success","editBack",3,"disabled","click"],[1,"btn","btn-success","bckb",3,"click"],["title","Add",1,"btn","btn-success","ctb",3,"disabled","click"],[1,"card-body"],[1,"table-responsive",2,"text-align","center"],["id","",1,"table","tablesorter"],[1,"text-primary"],[1,"text-center"],[4,"ngFor","ngForOf"],[1,"custom-pagination","mt-2",2,"text-align","right"],[3,"pageChange"],[1,"btn","btn","btn-success","btn-sm","btn-icon",3,"disabled"],["title","View",1,"fa","fa-eye",3,"click"],["colspan","9",1,"table-no-record"],[3,"formGroup"],[1,"col-md-6","pr-md-1"],[1,"form-group"],[1,"redRole"],["placeholder","Enter limit","type","text","formControlName","limit",1,"form-control"],["class","error",4,"ngIf"],[1,"col-md-6","pl-md-1"],["placeholder","Enter limit type","type","text","formControlName","limitType","maxlength","60",1,"form-control"],["placeholder","Enter risk type","type","text","formControlName","riskType","maxlength","60",1,"form-control"],["placeholder","Enter risk type","type","text","formControlName","riskScore","maxlength","60",1,"form-control"],[1,"mt-5","card-footer"],["class","btn btn-success",3,"disabled","title","click",4,"ngIf"],[1,"error"],[1,"btn","btn-success",3,"disabled","title","click"]],template:function(t,e){1&t&&(m.TgZ(0,"div",0),m.TgZ(1,"div",1),m.TgZ(2,"div",2),m.TgZ(3,"div",3),m.TgZ(4,"div",4),m._UZ(5,"i",5),m.YNc(6,p,2,0,"h2",6),m.YNc(7,d,2,0,"h2",6),m.YNc(8,g,2,0,"h2",6),m.YNc(9,Z,2,0,"h2",6),m.TgZ(10,"div",7),m.YNc(11,f,2,1,"button",8),m._uU(12,"\xa0\xa0 "),m.YNc(13,T,2,0,"button",9),m.YNc(14,h,2,1,"button",10),m.qZA(),m.qZA(),m._UZ(15,"hr"),m.YNc(16,y,23,9,"div",11),m.YNc(17,O,37,6,"div",11),m.qZA(),m.qZA(),m.qZA(),m.qZA()),2&t&&(m.xp6(6),m.Q6J("ngIf","LIST"==e.buttonName),m.xp6(1),m.Q6J("ngIf","SAVE"==e.buttonName),m.xp6(1),m.Q6J("ngIf","VIEW"==e.buttonName),m.xp6(1),m.Q6J("ngIf","UPDATE"==e.buttonName),m.xp6(2),m.Q6J("ngIf","VIEW"==e.buttonName),m.xp6(2),m.Q6J("ngIf","VIEW"==e.buttonName||"SAVE"==e.buttonName||"UPDATE"==e.buttonName),m.xp6(1),m.Q6J("ngIf","LIST"==e.buttonName),m.xp6(2),m.Q6J("ngIf","LIST"==e.buttonName),m.xp6(1),m.Q6J("ngIf","LIST"!=e.buttonName))},directives:[r.O5,r.sg,c.LS,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u,o.nD],pipes:[c._s,r.uU],styles:["@media (min-width: 320px) and (max-width: 570px) {\n  .ctb[_ngcontent-%COMP%] {\n    margin: 43px 0px 6px -220px;\n  }\n}"]}),t}()}],P=function(){function t(){}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=m.oAB({type:t}),t.\u0275inj=m.cJS({imports:[[r.ez,s.Bz.forChild(Q),o.u5,n.JF,a.IJ,o.u5,o.UX,c.JX]]}),t}()}}]);