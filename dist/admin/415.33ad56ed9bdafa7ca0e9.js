(self.webpackChunkblack_dashboard_angular=self.webpackChunkblack_dashboard_angular||[]).push([[415],{45415:function(e,t,i){"use strict";i.r(t),i.d(t,{RoleModule:function(){return C}});var o=i(38583),n=i(91841),s=i(90665),r=i(14330),l=i(89736),a=i(72533),d=i(76419),c=i(89019),u=i(9022);function g(e,t){1&e&&(u.TgZ(0,"h2"),u._uU(1,"Role Management"),u.qZA())}function p(e,t){1&e&&(u.TgZ(0,"h2"),u._uU(1,"Role Details"),u.qZA())}function m(e,t){1&e&&(u.TgZ(0,"h2"),u._uU(1,"Create Role"),u.qZA())}function Z(e,t){1&e&&(u.TgZ(0,"h2"),u._uU(1,"Update Role"),u.qZA())}function h(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"button",25),u.NdJ("click",function(){return u.CHM(i),u.oxw().onEditAction()}),u._uU(1," EDIT"),u.qZA()}if(2&e){var o=u.oxw();u.Q6J("disabled",0==(null==o.permissionObj?null:o.permissionObj.isUpdate)||o.loggedInUserRoleId==(null==o.roleDetailsObj?null:o.roleDetailsObj.roleId))}}function A(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"button",26),u.NdJ("click",function(){return u.CHM(i),u.oxw().back()}),u._uU(1," BACK "),u.qZA()}}function b(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"button",27),u.NdJ("click",function(){return u.CHM(i),u.oxw().onCreateAction()}),u._uU(1,"CREATE ROLE +"),u.qZA()}if(2&e){var o=u.oxw();u.Q6J("disabled",0==(null==o.permissionObj?null:o.permissionObj.isCreate))}}function f(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",3),u.TgZ(1,"div",28),u.TgZ(2,"h4",29),u._uU(3," Search "),u.qZA(),u.qZA(),u.TgZ(4,"div",30),u.TgZ(5,"div",31),u.TgZ(6,"input",32),u.NdJ("ngModelChange",function(e){return u.CHM(i),u.oxw().roleType=e}),u.qZA(),u.qZA(),u.qZA(),u.TgZ(7,"div",33),u.TgZ(8,"button",34),u.NdJ("click",function(){u.CHM(i);var e=u.oxw();return e.currentPage=1,e.getRolePermission()}),u._UZ(9,"i",35),u.qZA(),u._uU(10,"\xa0\xa0 "),u.TgZ(11,"button",36),u.NdJ("click",function(){return u.CHM(i),u.oxw().clearSearch()}),u._UZ(12,"i",37),u.qZA(),u.qZA(),u.qZA()}if(2&e){var o=u.oxw();u.xp6(6),u.Q6J("ngModel",o.roleType)}}function T(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"tr"),u.TgZ(1,"td"),u._uU(2),u.qZA(),u.TgZ(3,"td"),u._uU(4),u.ALo(5,"date"),u.qZA(),u.TgZ(6,"td"),u._uU(7),u.ALo(8,"date"),u.qZA(),u.TgZ(9,"td",42),u.TgZ(10,"button",46),u.NdJ("click",function(){var e=u.CHM(i).$implicit;return u.oxw(2).viewDetailsObj(e)}),u._UZ(11,"i",47),u.qZA(),u._uU(12,"\xa0\xa0 "),u.TgZ(13,"button",48),u.NdJ("click",function(){var e=u.CHM(i).$implicit;return u.oxw(2).deleteModal(e)}),u._UZ(14,"i",49),u.qZA(),u.qZA(),u.qZA()}if(2&e){var o=t.$implicit,n=u.oxw(2);u.xp6(2),u.Oqu(null==o?null:o.roleType),u.xp6(2),u.Oqu(u.xi3(5,5,null==o?null:o.createdAt,"mediumDate")),u.xp6(3),u.Oqu(u.xi3(8,8,null==o?null:o.updatedAt,"mediumDate")),u.xp6(3),u.Q6J("disabled",0==(null==n.permissionObj?null:n.permissionObj.isRead)),u.xp6(3),u.Q6J("disabled",0==(null==n.permissionObj?null:n.permissionObj.isDelete)||n.loggedInUserRoleId==(null==o?null:o.roleId))}}function v(e,t){1&e&&(u.TgZ(0,"tr"),u.TgZ(1,"td",50),u._uU(2,"No Record Found"),u.qZA(),u.qZA())}var q=function(e,t,i){return{itemsPerPage:e,totalItems:t,currentPage:i}};function I(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",38),u.TgZ(1,"div",39),u.TgZ(2,"table",40),u.TgZ(3,"thead",41),u.TgZ(4,"tr"),u.TgZ(5,"th"),u._uU(6,"Role"),u.qZA(),u.TgZ(7,"th"),u._uU(8,"Created On"),u.qZA(),u.TgZ(9,"th"),u._uU(10,"Updated On"),u.qZA(),u.TgZ(11,"th",42),u._uU(12,"Actions"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(13,"tbody"),u.YNc(14,T,15,11,"tr",43),u.ALo(15,"paginate"),u.YNc(16,v,3,0,"tr",8),u.qZA(),u.qZA(),u.qZA(),u.TgZ(17,"div",44),u.TgZ(18,"pagination-controls",45),u.NdJ("pageChange",function(e){return u.CHM(i),u.oxw().pagination(e)}),u.qZA(),u.qZA(),u.qZA()}if(2&e){var o=u.oxw();u.xp6(14),u.Q6J("ngForOf",u.xi3(15,2,o.roleList,u.kEZ(5,q,o.itemPerPage,o.totalItems,o.currentPage))),u.xp6(2),u.Q6J("ngIf",!o.roleList.length)}}function x(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"tr"),u.TgZ(1,"td"),u._uU(2),u.qZA(),u.TgZ(3,"td"),u.TgZ(4,"input",56),u.NdJ("change",function(){var e=u.CHM(i).index;return u.oxw(2).allowReadAction(e)})("ngModelChange",function(e){return u.CHM(i).$implicit.isDownload=e}),u.qZA(),u.qZA(),u.TgZ(5,"td"),u.TgZ(6,"input",56),u.NdJ("change",function(){var e=u.CHM(i).index;return u.oxw(2).allowReadAction(e)})("ngModelChange",function(e){return u.CHM(i).$implicit.isCreate=e}),u.qZA(),u.qZA(),u.TgZ(7,"td"),u.TgZ(8,"input",57),u.NdJ("ngModelChange",function(e){return u.CHM(i).$implicit.isRead=e}),u.qZA(),u.qZA(),u.TgZ(9,"td"),u.TgZ(10,"input",56),u.NdJ("change",function(){var e=u.CHM(i).index;return u.oxw(2).allowReadAction(e)})("ngModelChange",function(e){return u.CHM(i).$implicit.isDelete=e}),u.qZA(),u.qZA(),u.TgZ(11,"td"),u.TgZ(12,"input",56),u.NdJ("change",function(){var e=u.CHM(i).index;return u.oxw(2).allowReadAction(e)})("ngModelChange",function(e){return u.CHM(i).$implicit.isBlocked=e}),u.qZA(),u.qZA(),u.TgZ(13,"td"),u.TgZ(14,"input",56),u.NdJ("change",function(){var e=u.CHM(i).index;return u.oxw(2).allowReadAction(e)})("ngModelChange",function(e){return u.CHM(i).$implicit.isUpdate=e}),u.qZA(),u.qZA(),u.TgZ(15,"td"),u.TgZ(16,"input",56),u.NdJ("change",function(){var e=u.CHM(i).index;return u.oxw(2).onSelectAll(e)})("ngModelChange",function(e){return u.CHM(i).$implicit.selectAll=e}),u.qZA(),u.qZA(),u.qZA()}if(2&e){var o=t.$implicit,n=u.oxw(2);u.xp6(2),u.Oqu(null==o?null:o.moduleName),u.xp6(2),u.Q6J("ngModel",o.isDownload)("disabled","VIEW"==n.buttonName),u.xp6(2),u.Q6J("ngModel",o.isCreate)("disabled","VIEW"==n.buttonName),u.xp6(2),u.Q6J("disabled",o.isDownload||o.isCreate||o.isDelete||o.isBlocked||o.isUpdate)("ngModel",o.isRead)("disabled","VIEW"==n.buttonName),u.xp6(2),u.Q6J("ngModel",o.isDelete)("disabled","VIEW"==n.buttonName),u.xp6(2),u.Q6J("ngModel",o.isBlocked)("disabled","VIEW"==n.buttonName),u.xp6(2),u.Q6J("ngModel",o.isUpdate)("disabled","VIEW"==n.buttonName),u.xp6(2),u.Q6J("ngModel",o.selectAll)("disabled","VIEW"==n.buttonName)}}function N(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"button",58),u.NdJ("click",function(){u.CHM(i);var e=u.oxw(2);return"UPDATE"==e.buttonName?e.updateRole():e.saveRole()}),u._uU(1),u.qZA()}if(2&e){var o=u.oxw(2);u.Q6J("title",o.buttonName),u.xp6(1),u.Oqu(o.buttonName)}}function w(e,t){if(1&e){var i=u.EpF();u.TgZ(0,"div",38),u.TgZ(1,"div",3),u.TgZ(2,"div",28),u.TgZ(3,"h4",51),u._uU(4," Role Name "),u.TgZ(5,"span",52),u._uU(6,"*"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(7,"div",30),u.TgZ(8,"div",31),u.TgZ(9,"input",53),u.NdJ("ngModelChange",function(e){return u.CHM(i),u.oxw().roleDetailsObj.roleType=e}),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(10,"div",3),u.TgZ(11,"div",28),u.TgZ(12,"h4",51),u._uU(13," Permissions "),u.TgZ(14,"span",52),u._uU(15,"*"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(16,"div",39),u.TgZ(17,"table",40),u.TgZ(18,"thead",41),u.TgZ(19,"tr"),u.TgZ(20,"th"),u._uU(21,"Modules"),u.qZA(),u.TgZ(22,"th"),u._uU(23,"Download"),u.qZA(),u.TgZ(24,"th"),u._uU(25,"Create"),u.qZA(),u.TgZ(26,"th"),u._uU(27,"Read"),u.qZA(),u.TgZ(28,"th"),u._uU(29,"Delete"),u.qZA(),u.TgZ(30,"th"),u._uU(31,"Block"),u.qZA(),u.TgZ(32,"th"),u._uU(33,"Update"),u.qZA(),u.TgZ(34,"th"),u._uU(35,"Selected All"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(36,"tbody"),u.YNc(37,x,17,16,"tr",43),u.qZA(),u.qZA(),u.TgZ(38,"div",54),u.YNc(39,N,2,2,"button",55),u.qZA(),u.qZA(),u.qZA()}if(2&e){var o=u.oxw();u.xp6(9),u.Q6J("disabled","VIEW"==o.buttonName)("ngModel",o.roleDetailsObj.roleType)("id",o.i),u.xp6(28),u.Q6J("ngForOf",o.permissionArr),u.xp6(2),u.Q6J("ngIf","VIEW"!=o.buttonName)}}var U=function(){function e(e,t,i){var o,n=this;this.server=e,this.router=t,this.route=i,this.buttonName="LIST",this.roleDetailsObj={},this.itemPerPage=10,this.currentPage=1,this.totalItems=0,this.permissionArr=[],this.permissionObj={},o=localStorage.getItem("permitted")?JSON.parse(atob(localStorage.getItem("permitted"))):[],this.permissionObj=o.find(function(e){return"Role Management"==e.name}),c._.modules.forEach(function(e){n.permissionArr.push({isCreate:!1,isDelete:!1,isBlocked:!1,isDownload:!1,isRead:!1,isUpdate:!1,selectAll:!1,moduleName:e})}),console.log(this.permissionArr)}return e.prototype.ngOnInit=function(){this.loggedInUserRoleId=atob(localStorage.getItem("roleId")),this.loggedInUserId=atob(localStorage.getItem("userId")),console.log(this.loggedInUserRoleId),this.getRolePermission()},e.prototype.getRolePermission=function(){var e=this;this.roleList=[],this.totalItems=0;var t=c._.getRole.getRolePermission+"?page="+(this.currentPage-1)+"&pageSize="+this.itemPerPage+"&ip="+localStorage.getItem("ip")+"&userId="+this.loggedInUserId;this.roleType&&(t=t+"&role="+this.roleType),this.server.showSpinner(),this.server.getApi(t).subscribe(function(t){e.server.hideSpinner(),200==t.status?(e.roleList=t.data.content,e.totalItems=t.data.count):205==t.status&&e.server.showErrToast(t.message)},function(t){e.server.hideSpinner(),401==t.status||400==t.status||t.status,e.server.showErrToast(t.error.message)})},e.prototype.clearSearch=function(){this.roleType="",this.currentPage=1,this.totalItems=0,this.getRolePermission()},e.prototype.allowReadAction=function(e){this.permissionArr[e].isRead=!0},e.prototype.onSelectAll=function(e){console.log(this.permissionArr[e].selectAll),this.permissionArr[e].isRead=this.permissionArr[e].selectAll,this.permissionArr[e].isCreate=this.permissionArr[e].selectAll,this.permissionArr[e].isDelete=this.permissionArr[e].selectAll,this.permissionArr[e].isBlocked=this.permissionArr[e].selectAll,this.permissionArr[e].isUpdate=this.permissionArr[e].selectAll,this.permissionArr[e].isDownload=this.permissionArr[e].selectAll},e.prototype.saveRole=function(){var e=this;console.log(this.permissionArr),this.roleList=[],this.totalItems=0,this.permissionArr.forEach(function(e){delete e.selectAll});var t=c._.getRole.getRolePermission,i={ip:localStorage.getItem("ip"),permissionModuleDto:this.permissionArr,roleType:this.roleDetailsObj.roleType};this.server.showSpinner(),this.server.postApi(t,i).subscribe(function(t){e.server.hideSpinner(),200==t.status?(e.roleList=t.data,e.server.showSuccToast(t.message),e.buttonName="LIST",e.getRolePermission()):205==t.status&&e.server.showErrToast(t.message)},function(t){e.server.hideSpinner(),401==t.status||400==t.status||t.status,e.server.showErrToast(t.error.message)})},e.prototype.updateRole=function(){var e=this;this.roleList=[],this.totalItems=0;var t=c._.getRole.getRolePermission+"?page="+(this.currentPage-1)+"&pageSize="+this.itemPerPage;this.permissionArr.forEach(function(e){delete e.selectAll}),this.permissionArr.forEach(function(e){delete e.name});var i={ip:localStorage.getItem("ip"),permissionModuleDto:this.permissionArr,roleType:this.roleDetailsObj.roleType,roleId:this.roleDetailsObj.roleId};this.server.showSpinner(),this.server.putApi(t,i).subscribe(function(t){e.server.hideSpinner(),200==t.status?(e.roleList=t.data,e.server.showSuccToast(t.message),e.buttonName="LIST",e.getRolePermission()):205==t.status&&e.server.showErrToast(t.message)},function(t){e.server.hideSpinner(),401==t.status||400==t.status||t.status,e.server.showErrToast(t.error.message)})},e.prototype.deleteModal=function(e){this.loggedInUserRoleId!=e.roleId?($("#myModal").modal("show"),this.roleDetailsObj=e,console.log(this.roleDetailsObj)):this.server.showErrToast("You can't delete your own assigned role!")},e.prototype.deleteRole=function(){var e=this,t=c._.getRole.getRolePermission+"?rolePermissionModuleId="+this.roleDetailsObj.roleId+"&ip="+localStorage.getItem("ip");this.server.showSpinner(),this.server.delApi(t).subscribe(function(t){e.server.hideSpinner(),200==t.status?(e.server.showErrToast(t.message),e.getRolePermission()):201==t.status&&e.server.showErrToast(t.message)},function(t){e.server.hideSpinner(),401==t.status||400==t.status||t.status,e.server.showErrToast(t.error.message)})},e.prototype.onEditAction=function(){this.loggedInUserRoleId!=this.roleDetailsObj.roleId?this.buttonName="UPDATE":this.server.showErrToast("You cant edit your own assigned role!")},e.prototype.viewDetailsObj=function(e){var t=this;this.buttonName="VIEW",this.roleDetailsObj=e,console.log(e.module),console.log(this.permissionArr),e.module.forEach(function(e){var i=t.permissionArr.findIndex(function(t){return t.moduleName==e.name});console.log(i),-1!=i&&(t.permissionArr[i].isRead=e.isRead,t.permissionArr[i].isDownload=e.isDownload,t.permissionArr[i].isUpdate=e.isUpdate,t.permissionArr[i].isDelete=e.isDelete,t.permissionArr[i].isCreate=e.isCreate,t.permissionArr[i].isBlocked=e.isBlocked)}),console.log(this.permissionArr)},e.prototype.onCreateAction=function(){this.roleDetailsObj.roleType="",this.buttonName="SAVE",this.roleDetailsObj.disable},e.prototype.back=function(){this.buttonName="LIST"},e.prototype.pagination=function(e){this.currentPage=e,this.getRolePermission()},e.\u0275fac=function(t){return new(t||e)(u.Y36(d.N),u.Y36(r.F0),u.Y36(r.gz))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-role-management"]],decls:36,vars:10,consts:[[1,"wrapper"],[1,"main-panel"],[1,"content"],[1,"row"],[1,"col-md-12"],[1,"card"],[1,"card-header",2,"display","flex"],[1,"tim-icons","icon-single-02","mr-2",2,"font-size","x-large"],[4,"ngIf"],[2,"padding-left","50%"],["class","btn btn-success editBack","title","Edit",3,"disabled","click",4,"ngIf"],["class","btn btn-success bckb",3,"click",4,"ngIf"],["class","btn btn-success cretr","title","Add",3,"disabled","click",4,"ngIf"],["class","row",4,"ngIf"],["class"," card-body",4,"ngIf"],["id","myModal",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","data-dismiss","modal",1,"close"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-success","modalSpace",3,"click"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["title","Edit",1,"btn","btn-success","editBack",3,"disabled","click"],[1,"btn","btn-success","bckb",3,"click"],["title","Add",1,"btn","btn-success","cretr",3,"disabled","click"],[1,"col-md-2",2,"text-align","end","margin-top","4px"],[1,"text-muted","schitm"],[1,"col-md-6"],[1,"form-group",2,"display","flex"],["placeholder","Search by role name ","type","text",1,"form-control",3,"ngModel","ngModelChange"],[1,"col-md-4"],["type","button","rel","tooltip",1,"btn","btn-info","btn-sm","btn-icon",3,"click"],[1,"tim-icons","icon-zoom-split"],["type","button","rel","tooltip",1,"btn","btn","btn-success","btn-sm","btn-icon",3,"click"],[1,"tim-icons","icon-refresh-02"],[1,"card-body"],[1,"table-responsive",2,"text-align","center"],["id","",1,"table","tablesorter"],[1,"text-primary"],[1,"text-center"],[4,"ngFor","ngForOf"],[1,"custom-pagination","mt-2",2,"text-align","right"],[3,"pageChange"],["title","View",1,"btn","btn","btn-success","btn-sm","btn-icon",3,"disabled","click"],[1,"fa","fa-eye"],["data-toggle","modal","title","Delete",1,"btn","btn-danger","btn-sm","btn-icon",3,"disabled","click"],[1,"fa","fa-times"],["colspan","9",1,"table-no-record"],[1,"text-muted"],[1,"redRole"],["placeholder","Enter role name","type","text",1,"form-control",3,"disabled","ngModel","id","ngModelChange"],[1,"mt-5"],["class","btn btn-success",3,"title","click",4,"ngIf"],["type","checkbox","id","flexCheckDefault",1,"form-check-input",3,"ngModel","disabled","change","ngModelChange"],["type","checkbox","id","flexCheckDefault",1,"form-check-input",3,"disabled","ngModel","ngModelChange"],[1,"btn","btn-success",3,"title","click"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0),u.TgZ(1,"div",1),u.TgZ(2,"div",2),u.TgZ(3,"div",3),u.TgZ(4,"div",4),u.TgZ(5,"div",5),u.TgZ(6,"div",6),u._UZ(7,"i",7),u.YNc(8,g,2,0,"h2",8),u.YNc(9,p,2,0,"h2",8),u.YNc(10,m,2,0,"h2",8),u.YNc(11,Z,2,0,"h2",8),u.TgZ(12,"div",9),u.YNc(13,h,2,1,"button",10),u._uU(14,"\xa0\xa0 "),u.YNc(15,A,2,0,"button",11),u.YNc(16,b,2,1,"button",12),u.qZA(),u.qZA(),u._UZ(17,"hr"),u.YNc(18,f,13,1,"div",13),u.YNc(19,I,19,9,"div",14),u.YNc(20,w,40,5,"div",14),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(21,"div",15),u.TgZ(22,"div",16),u.TgZ(23,"div",17),u.TgZ(24,"div",18),u.TgZ(25,"h4",19),u._uU(26,"Delete"),u.qZA(),u.TgZ(27,"button",20),u._uU(28,"\xd7"),u.qZA(),u.qZA(),u.TgZ(29,"div",21),u._uU(30," Are you sure you want to delete this role? "),u.qZA(),u.TgZ(31,"div",22),u.TgZ(32,"button",23),u.NdJ("click",function(){return t.deleteRole()}),u._uU(33,"Yes"),u.qZA(),u.TgZ(34,"button",24),u._uU(35,"No"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&e&&(u.xp6(8),u.Q6J("ngIf","LIST"==t.buttonName),u.xp6(1),u.Q6J("ngIf","VIEW"==t.buttonName),u.xp6(1),u.Q6J("ngIf","SAVE"==t.buttonName),u.xp6(1),u.Q6J("ngIf","UPDATE"==t.buttonName),u.xp6(2),u.Q6J("ngIf","VIEW"==t.buttonName),u.xp6(2),u.Q6J("ngIf","VIEW"==t.buttonName||"SAVE"==t.buttonName||"UPDATE"==t.buttonName),u.xp6(1),u.Q6J("ngIf","LIST"==t.buttonName),u.xp6(2),u.Q6J("ngIf","LIST"==t.buttonName),u.xp6(1),u.Q6J("ngIf","LIST"==t.buttonName),u.xp6(1),u.Q6J("ngIf","LIST"!=t.buttonName))},directives:[o.O5,s.Fj,s.JJ,s.On,o.sg,a.LS,s.Wl],pipes:[a._s,o.uU],styles:[""]}),e}(),M=[{path:"role-management",component:U},{path:"role-detail",component:U}],C=function(){function e(){}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[o.ez,r.Bz.forChild(M),s.u5,n.JF,l.IJ,s.u5,s.UX,a.JX]]}),e}()}}]);