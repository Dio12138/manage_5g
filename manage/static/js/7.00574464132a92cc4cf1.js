webpackJsonp([7],{252:function(e,t,a){a(833);var l=a(99)(a(578),a(919),null,null);e.exports=l.exports},263:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(52),n=a.n(l),o=a(51),r=a.n(o),i=a(53),s=a.n(i),d=a(100),u=a(101),p=a(102);t.default={data:function(){return{baseImgPath:u.b}},created:function(){this.adminInfo.id||this.getAdminData()},computed:s()({},a.i(p.b)(["adminInfo"])),methods:s()({},a.i(p.c)(["getAdminData"]),{tologin:function(){this.$router.push("/")},handleCommand:function(e){var t=this;return r()(n.a.mark(function l(){var o;return n.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:if("home"!=e){l.next=4;break}t.$router.push("/manage"),l.next=9;break;case 4:if("signout"!=e){l.next=9;break}return l.next=7,a.i(d.b)();case 7:o=l.sent,1==o.status?(t.$message({type:"success",message:"退出成功"}),t.$router.push("/")):t.$message({type:"error",message:o.message});case 9:case"end":return l.stop()}},l,t)}))()}})}},264:function(e,t,a){t=e.exports=a(217)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#111;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.section_title1{text-align:center;font-size:24px;margin-bottom:10px}.avator{width:40px;height:40px;border-radius:50%;margin-right:50px}.el-dropdown-menu__item{text-align:center}",""])},265:function(e,t,a){var l=a(264);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(218)("65b5c4ce",l,!0)},266:function(e,t,a){a(265);var l=a(99)(a(263),a(267),null,null);e.exports=l.exports},267:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[e._v("首页")]),e._v(" "),e._l(e.$route.meta,function(t,l){return a("el-breadcrumb-item",{key:l},[e._v(e._s(t))])})],2),e._v(" "),a("header",{staticClass:"section_title1",staticStyle:{color:"#1d90e6"}},[e._v("杭州5G基站管理系统")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"success"},on:{click:e.tologin}},[e._v("退出")])],1)},staticRenderFns:[]}},578:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(52),n=a.n(l),o=a(51),r=a.n(o),i=a(585),s=a.n(i),d=a(266),u=a.n(d);t.default={name:"aa",components:{headTop:u.a},data:function(){var e;return e={input:"",haveStations:!1,haveAlert:!1,stations:[],showEdit:[],updateForm:{gNBID:"",province:"",city:"",district:"",location:"",belong_gNBID:"",cover_type:"",open_status:"",CELL_ID:"",TAC:"",PCI:"",band:"",bandWidth:"",frequency:"",duplex_mode:"",manufactures:"",equipment:"",equipment_version:"",base_type:"",longitude:"",latitude:"",antenna_height:"",azimuth:"",down_angle:"",nr_framework:"",eNBID:"",share_base:"",cover_scence:"",remark:""},addForm:{gNBID:"",province:"",city:"",district:"",location:"",belong_gNBID:"",cover_type:"",open_status:"",CELL_ID:"",TAC:"",PCI:"",band:"",bandWidth:"",frequency:"",duplex_mode:"",manufactures:"",equipment:"",equipment_version:"",base_type:"",longitude:"",latitude:"",antenna_height:"",azimuth:"",down_angle:"",nr_framework:"",eNBID:"",share_base:"",cover_scence:"",remark:""},updateDialogVisible:!1},s()(e,"updateForm",{}),s()(e,"updateData",{}),s()(e,"updateFormRules",{province:[{required:!0,message:"请输入省级名称",trigger:"blur"},{message:"请正确输入省级名称",trigger:"blur"}],city:[{required:!0,message:"请输入城市名称",trigger:"blur"},{message:"请正确输入城市名称",trigger:"blur"}],ditrict:[{required:!0,message:"请输入行政区名称",trigger:"blur"},{message:"请正确输入行政区名称",trigger:"blur"}],location:[{required:!1,message:"请输入基站位置",trigger:"blur"},{message:"请输入基站位置",trigger:"blur"}],belong_gNBID:[{required:!1,message:"请输入所属gNBID名称",trigger:"blur"},{message:"请输入所属gNBID名称",trigger:"blur"}],cover_type:[{required:!0,message:"请输入基站cover_type",trigger:"blur"},{message:"请正确输入基站cover_type",trigger:"blur"}],open_status:[{required:!0,message:"请输入开放状态",trigger:"blur"},{message:"请输入开放状态",trigger:"blur"}],CELL_ID:[{required:!0,message:"请输入城市名称",trigger:"blur"},{message:"请正确输入城市名称",trigger:"blur"}]}),e},methods:{getStations:function(){var e=this;this.$api.get("5G_info/searchStationById",{stationId:this.input},function(t){if(t.status>=200&&t.status<300){if(t.data.success){e.haveStations=!0,e.haveAlert=!1,e.stations=t.data.stations;return e.stations}e.haveStations=!1,e.haveAlert=!0,console.log("fail")}else e.haveStations=!1,e.haveAlert=!0,console.log(t.message)})},updateDialogClosed:function(){this.$refs.updateFormRef.resetFields()},showEditDialog:function(e,t){var a=this;return r()(n.a.mark(function l(){return n.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return a.updateDialogVisible=!0,l.abrupt("return",a.$api.get("5G_info/searchStationByIdAndPCI",{gNBID:e,PCI:t},function(t){t.status>=200&&t.status<300?t.data.success&&(a.updateDialogVisible=!0,a.updateData=t.data.stations[0],console.log(a.updateData),console.log(e),console.log("success")):(a.updateDialogVisible=!1,a.haveAlert=!1,console.log("false"))}));case 2:case"end":return l.stop()}},l,a)}))()},confirmEdit:function(){var e=this;this.$refs.updateFormRef.validate(function(){var t=r()(n.a.mark(function t(a){var l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(e.updateData.gNBID),a){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,e.$api.post("5G_info/updateStationInfo",{gNBID:e.updateData.gNBID,province:e.updateData.province,city:e.updateData.city,district:e.updateData.district,location:e.updateData.location,belong_gNBID:e.updateData.belong_gNBID,cover_type:e.updateData.cover_type,open_status:e.updateData.open_status,CELL_ID:e.updateData.CELL_ID,TAC:e.updateData.TAC,PCI:e.updateData.PCI,band:e.updateData.band,bandWidth:e.updateData.bandWidth,frequency:e.updateData.frequency,duplex_mode:e.updateData.duplex_mode,manufactures:e.updateData.manufactures,equipment:e.updateData.equipment,equipment_version:e.updateData.equipment_version,base_type:e.updateData.base_type,longitude:e.updateData.longitude,latitude:e.updateData.latitude,antenna_height:e.updateData.antenna_height,azimuth:e.updateData.azimuth,down_angle:e.updateData.down_angle,nr_framework:e.updateData.nr_framework,eNBID:e.updateData.eNBID,share_base:e.updateData.share_base,cover_scence:e.updateData.cover_scence,remark:e.updateData.remark},function(t){return 200!==t.status?e.$message.error("更新用户失败！"):(e.getStations(e.addForm.gNBID),e.updateDialogVisible=!1,e.$message.success("更新用户成功！"))});case 5:l=t.sent;case 6:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())}}}},584:function(e,t,a){e.exports={default:a(588),__esModule:!0}},585:function(e,t,a){"use strict";t.__esModule=!0;var l=a(584),n=function(e){return e&&e.__esModule?e:{default:e}}(l);t.default=function(e,t,a){return t in e?(0,n.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},588:function(e,t,a){a(591);var l=a(4).Object;e.exports=function(e,t,a){return l.defineProperty(e,t,a)}},591:function(e,t,a){var l=a(10);l(l.S+l.F*!a(7),"Object",{defineProperty:a(12).f})},600:function(e,t,a){t=e.exports=a(217)(!1),t.push([e.i,'.top{position:sticky;position:-webkit-sticky;top:0}.wb1{width:300px;padding:15px;border-radius:5px;background-color:#fff}.bs,.wb1{text-align:center}.bs{padding:10px;font-size:16px}.el-table .cell,.el-table th>.cell{text-align:center}::-webkit-scrollbar{width:10px!important;height:10px!important;background-color:#b3c0c09e}::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6pxn rgba(0,0,0,.3);background-color:#e4e4e4}.el-table__fixed-right:before,.el-table__fixed:before{content:"";position:absolute;left:0;bottom:0;width:100%;height:1px;background-color:unset;z-index:4}.abow_dialog{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:Center;align-items:Center;overflow:hidden}.el-dialog{margin:0 auto!important;height:80%;overflow:hidden}.el-dialog__body{position:absolute;left:0;top:54px;bottom:70px;right:0;padding:0;z-index:1;overflow:hidden;overflow-y:auto}.el-dialog__footer{position:absolute;left:0;right:0;bottom:0}.el-input{width:70%}',""])},833:function(e,t,a){var l=a(600);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(218)("45ecc9ed",l,!0)},919:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("head-top"),e._v(" "),a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"请输入基站id"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getStations(t)}},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.getStations}},[e._v("查询")])],1)],1),e._v(" "),e.haveAlert?a("el-alert",{staticStyle:{width:"50%",height:"70px"},attrs:{id:"wb13",title:"请输入正确的id",type:"warning",description:"当前输入的id不存在，请正确输入","show-icon":""}}):e._e(),e._v(" "),e.haveStations?a("el-table",{staticClass:"table",staticStyle:{width:"100%"},attrs:{data:e.stations,stripe:"",fit:"",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{fixed:"",type:"index",label:"序号",width:"80",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gNBID",label:"基站ID",width:"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{type:"text",prop:"province",label:"省份",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"省份"},model:{value:e.addForm[n].province,callback:function(t){e.$set(e.addForm[n],"province",t)},expression:"addForm[$index].province"}}):a("span",[e._v(e._s(l.province))])]}}],null,!1,1783905414)}),e._v(" "),a("el-table-column",{attrs:{type:"text",prop:"city",label:"城市",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text"},model:{value:e.addForm[n].city,callback:function(t){e.$set(e.addForm[n],"city",t)},expression:"addForm[$index].city"}}):a("span",[e._v(e._s(l.city))])]}}],null,!1,3054806063)}),e._v(" "),a("el-table-column",{attrs:{type:"text",prop:"district",label:"行政区",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"行政区"},model:{value:e.addForm[n].district,callback:function(t){e.$set(e.addForm[n],"district",t)},expression:"addForm[$index].district"}}):a("span",[e._v(e._s(l.district))])]}}],null,!1,3447985107)}),e._v(" "),a("el-table-column",{attrs:{prop:"location",label:"位置",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"位置"},model:{value:e.addForm[n].location,callback:function(t){e.$set(e.addForm[n],"location",t)},expression:"addForm[$index].location"}}):a("span",[e._v(e._s(l.location))])]}}],null,!1,2099348889)}),e._v(" "),a("el-table-column",{attrs:{prop:"belong_gNBID",label:"所属gNBID的名称",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"belong_gNBID"},model:{value:e.addForm[n].belong_gNBID,callback:function(t){e.$set(e.addForm[n],"belong_gNBID",t)},expression:"addForm[$index].belong_gNBID"}}):a("span",[e._v(e._s(l.belong_gNBID))])]}}],null,!1,3245258350)}),e._v(" "),a("el-table-column",{attrs:{prop:"cover_type",label:"覆盖类型",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"cover_type"},model:{value:e.addForm[n].cover_type,callback:function(t){e.$set(e.addForm[n],"cover_type",t)},expression:"addForm[$index].cover_type"}}):a("span",[e._v(e._s(l.cover_type))])]}}],null,!1,4210399504)}),e._v(" "),a("el-table-column",{attrs:{prop:"open_status",label:"开通状态",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"open_status"},model:{value:e.addForm[n].open_status,callback:function(t){e.$set(e.addForm[n],"open_status",t)},expression:"addForm[$index].open_status"}}):a("span",[e._v(e._s(l.open_status))])]}}],null,!1,1374363909)}),e._v(" "),a("el-table-column",{attrs:{prop:"CELL_ID",label:"CELL ID",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"CELL_ID"},model:{value:e.addForm[n].CELL_ID,callback:function(t){e.$set(e.addForm[n],"CELL_ID",t)},expression:"addForm[$index].CELL_ID"}}):a("span",[e._v(e._s(l.CELL_ID))])]}}],null,!1,145281678)}),e._v(" "),a("el-table-column",{attrs:{prop:"TAC",label:"TAC",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"TAC"},model:{value:e.addForm[n].TAC,callback:function(t){e.$set(e.addForm[n],"TAC",t)},expression:"addForm[$index].TAC"}}):a("span",[e._v(e._s(l.TAC))])]}}],null,!1,2002036844)}),e._v(" "),a("el-table-column",{attrs:{prop:"PCI",label:"PCI",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"PCI",disabled:""},model:{value:e.addForm[n].PCI,callback:function(t){e.$set(e.addForm[n],"PCI",t)},expression:"addForm[$index].PCI"}}):a("span",[e._v(e._s(l.PCI))])]}}],null,!1,2589355174)}),e._v(" "),a("el-table-column",{attrs:{prop:"band",label:"频段",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"band"},model:{value:e.addForm[n].band,callback:function(t){e.$set(e.addForm[n],"band",t)},expression:"addForm[$index].band"}}):a("span",[e._v(e._s(l.band))])]}}],null,!1,3393172051)}),e._v(" "),a("el-table-column",{attrs:{prop:"bandWidth",label:"带宽",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"bandWidth"},model:{value:e.addForm[n].bandWidth,callback:function(t){e.$set(e.addForm[n],"bandWidth",t)},expression:"addForm[$index].bandWidth"}}):a("span",[e._v(e._s(l.bandWidth))])]}}],null,!1,3752820725)}),e._v(" "),a("el-table-column",{attrs:{prop:"frequency",label:"频点",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"frequency"},model:{value:e.addForm[n].frequency,callback:function(t){e.$set(e.addForm[n],"frequency",t)},expression:"addForm[$index].frequency"}}):a("span",[e._v(e._s(l.frequency))])]}}],null,!1,4014611678)}),e._v(" "),a("el-table-column",{attrs:{prop:"duplex_mode",label:"双工模式",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"duplex_mode"},model:{value:e.addForm[n].duplex_mode,callback:function(t){e.$set(e.addForm[n],"duplex_mode",t)},expression:"addForm[$index].duplex_mode"}}):a("span",[e._v(e._s(l.duplex_mode))])]}}],null,!1,3625409302)}),e._v(" "),a("el-table-column",{attrs:{prop:"manufactures",label:"生产厂家",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"manufactures"},model:{value:e.addForm[n].manufactures,callback:function(t){e.$set(e.addForm[n],"manufactures",t)},expression:"addForm[$index].manufactures"}}):a("span",[e._v(e._s(l.manufactures))])]}}],null,!1,1016639436)}),e._v(" "),a("el-table-column",{attrs:{prop:"equipment",label:"设备型号",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"equipment"},model:{value:e.addForm[n].equipment,callback:function(t){e.$set(e.addForm[n],"equipment",t)},expression:"addForm[$index].equipment"}}):a("span",[e._v(e._s(l.equipment))])]}}],null,!1,2834687952)}),e._v(" "),a("el-table-column",{attrs:{prop:"equipment_version",label:"设备版本",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"equipment_version"},model:{value:e.addForm[n].equipment_version,callback:function(t){e.$set(e.addForm[n],"equipment_version",t)},expression:"addForm[$index].equipment_version"}}):a("span",[e._v(e._s(l.equipment_version))])]}}],null,!1,973780181)}),e._v(" "),a("el-table-column",{attrs:{prop:" base_type",label:"基站类型",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:" base_type"},model:{value:e.addForm[n].base_type,callback:function(t){e.$set(e.addForm[n],"base_type",t)},expression:"addForm[$index].base_type"}}):a("span",[e._v(e._s(l.base_type))])]}}],null,!1,3659521512)}),e._v(" "),a("el-table-column",{attrs:{prop:"longitude",label:"经度",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"longitude"},model:{value:e.addForm[n].longitude,callback:function(t){e.$set(e.addForm[n],"longitude",t)},expression:"addForm[$index].longitude"}}):a("span",[e._v(e._s(l.longitude))])]}}],null,!1,442739545)}),e._v(" "),a("el-table-column",{attrs:{prop:"latitude",label:"纬度",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"latitude"},model:{value:e.addForm[n].latitude,callback:function(t){e.$set(e.addForm[n],"latitude",t)},expression:"addForm[$index].latitude"}}):a("span",[e._v(e._s(l.latitude))])]}}],null,!1,1927478986)}),e._v(" "),a("el-table-column",{attrs:{prop:"antenna_height",label:"天线挂高",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"antenna_height"},model:{value:e.addForm[n].antenna_height,callback:function(t){e.$set(e.addForm[n],"antenna_height",t)},expression:"addForm[$index].antenna_height"}}):a("span",[e._v(e._s(l.antenna_height))])]}}],null,!1,2584956421)}),e._v(" "),a("el-table-column",{attrs:{prop:"azimuth",label:"方位角",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"azimuth"},model:{value:e.addForm[n].azimuth,callback:function(t){e.$set(e.addForm[n],"azimuth",t)},expression:"addForm[$index].azimuth"}}):a("span",[e._v(e._s(l.azimuth))])]}}],null,!1,823275148)}),e._v(" "),a("el-table-column",{attrs:{prop:"down_angle",label:"下倾角",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"down_angle"},model:{value:e.addForm[n].down_angle,callback:function(t){e.$set(e.addForm[n],"down_angle",t)},expression:"addForm[$index].down_angle"}}):a("span",[e._v(e._s(l.down_angle))])]}}],null,!1,2854775478)}),e._v(" "),a("el-table-column",{attrs:{prop:"nr_framework",label:"NR架构",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"nr_framework"},model:{value:e.addForm[n].nr_framework,callback:function(t){e.$set(e.addForm[n],"nr_framework",t)},expression:"addForm[$index].nr_framework"}}):a("span",[e._v(e._s(l.nr_framework))])]}}],null,!1,1421328133)}),e._v(" "),a("el-table-column",{attrs:{prop:"eNBID",label:"4G锚点站eNBID_CELLID",width:"315"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"eNBID"},model:{value:e.addForm[n].eNBID,callback:function(t){e.$set(e.addForm[n],"eNBID",t)},expression:"addForm[$index].eNBID"}}):a("span",[e._v(e._s(l.eNBID))])]}}],null,!1,1422250078)}),e._v(" "),a("el-table-column",{attrs:{prop:"share_base",label:"是否是共享基站",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"share_base"},model:{value:e.addForm[n].share_base,callback:function(t){e.$set(e.addForm[n],"share_base",t)},expression:"addForm[$index].share_base"}}):a("span",[e._v(e._s(l.share_base))])]}}],null,!1,367249085)}),e._v(" "),a("el-table-column",{attrs:{prop:"cover_scence",label:"小区覆盖场景",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"cover_scence"},model:{value:e.addForm[n].cover_scence,callback:function(t){e.$set(e.addForm[n],"cover_scence",t)},expression:"addForm[$index].cover_scence"}}):a("span",[e._v(e._s(l.cover_scence))])]}}],null,!1,4030872181)}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?a("el-input",{attrs:{type:"text",placeholder:"remark"},model:{value:e.addForm[n].remark,callback:function(t){e.$set(e.addForm[n],"remark",t)},expression:"addForm[$index].remark"}}):a("span",[e._v(e._s(l.remark))])]}}],null,!1,1659442616)}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row,n=t.$index;return[e.showEdit[n]?e._e():a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.showEditDialog(l.gNBID,l.PCI)}}},[e._v("编辑")])]}}],null,!1,177241363)})],1):e._e(),e._v(" "),a("el-dialog",{attrs:{title:"修改基站信息",visible:e.updateDialogVisible,width:"40%"},on:{"update:visible":function(t){e.updateDialogVisible=t},close:e.updateDialogClosed}},[a("el-form",{ref:"updateFormRef",attrs:{model:e.updateData,rules:e.updateFormRules,"label-width":"120px"}},[a("el-form-item",{staticStyle:{position:"sticky"},attrs:{fixed:"",label:"gNBID",prop:"gNBID"}},[a("el-input",{attrs:{disabled:""},model:{value:e.updateData.gNBID,callback:function(t){e.$set(e.updateData,"gNBID",t)},expression:"updateData.gNBID"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"省份",prop:"province"}},[a("el-input",{model:{value:e.updateData.province,callback:function(t){e.$set(e.updateData,"province",t)},expression:"updateData.province"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"城市",prop:"city"}},[a("el-input",{model:{value:e.updateData.city,callback:function(t){e.$set(e.updateData,"city",t)},expression:"updateData.city"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"行政区",prop:"district"}},[a("el-input",{model:{value:e.updateData.district,callback:function(t){e.$set(e.updateData,"district",t)},expression:"updateData.district"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"位置",prop:"location"}},[a("el-input",{model:{value:e.updateData.location,callback:function(t){e.$set(e.updateData,"location",t)},expression:"updateData.location"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属gNBID名称",prop:"belong_gNBID"}},[a("el-input",{model:{value:e.updateData.belong_gNBID,callback:function(t){e.$set(e.updateData,"belong_gNBID",t)},expression:"updateData.belong_gNBID"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"cover_type",prop:"cover_type"}},[a("el-select",{attrs:{placeholder:"请选择覆盖类型"},model:{value:e.updateData.cover_type,callback:function(t){e.$set(e.updateData,"cover_type",t)},expression:"updateData.cover_type"}},[a("el-option",{attrs:{label:"室内",value:"室内"}}),e._v(" "),a("el-option",{attrs:{label:"室外",value:"室外"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"开放状态",prop:"location"}},[a("el-input",{model:{value:e.updateData.open_status,callback:function(t){e.$set(e.updateData,"open_status",t)},expression:"updateData.open_status"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"CELL_ID",prop:"belong_gNBID"}},[a("el-input",{model:{value:e.updateData.CELL_ID,callback:function(t){e.$set(e.updateData,"CELL_ID",t)},expression:"updateData.CELL_ID"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"TAC",prop:"TAC"}},[a("el-input",{model:{value:e.updateData.TAC,callback:function(t){e.$set(e.updateData,"TAC",t)},expression:"updateData.TAC"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"PCI",prop:"PCI"}},[a("el-input",{attrs:{disabled:""},model:{value:e.updateData.PCI,callback:function(t){e.$set(e.updateData,"PCI",t)},expression:"updateData.PCI"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"频段",prop:"band"}},[a("el-input",{model:{value:e.updateData.band,callback:function(t){e.$set(e.updateData,"band",t)},expression:"updateData.band"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"带宽",prop:"bandWidth"}},[a("el-input",{model:{value:e.updateData.bandWidth,callback:function(t){e.$set(e.updateData,"bandWidth",t)},expression:"updateData.bandWidth"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"频点",prop:"frequency"}},[a("el-input",{model:{value:e.updateData.frequency,callback:function(t){e.$set(e.updateData,"frequency",t)},expression:"updateData.frequency"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"双工模式",prop:"duplex_mode"}},[a("el-select",{attrs:{placeholder:"请选择双工模式"},model:{value:e.updateData.duplex_mode,callback:function(t){e.$set(e.updateData,"duplex_mode",t)},expression:"updateData.duplex_mode"}},[a("el-option",{attrs:{label:"TDD",value:"TDD"}}),e._v(" "),a("el-option",{attrs:{label:"FDD",value:"FDD"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"厂家",prop:"manufactures"}},[a("el-input",{model:{value:e.updateData.manufactures,callback:function(t){e.$set(e.updateData,"manufactures",t)},expression:"updateData.manufactures"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"设备型号",prop:"equipment"}},[a("el-input",{model:{value:e.updateData.equipment,callback:function(t){e.$set(e.updateData,"equipment",t)},expression:"updateData.equipment"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"设备版本",prop:"equipment_version"}},[a("el-input",{model:{value:e.updateData.equipment_version,callback:function(t){e.$set(e.updateData,"equipment_version",t)},expression:"updateData.equipment_version"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"基站类型",prop:"base_type"}},[a("el-input",{model:{value:e.updateData.base_type,callback:function(t){e.$set(e.updateData,"base_type",t)},expression:"updateData.base_type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"longitude",prop:"longitude"}},[a("el-input",{model:{value:e.updateData.longitude,callback:function(t){e.$set(e.updateData,"longitude",t)},expression:"updateData.longitude"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"latitude",prop:"latitude"}},[a("el-input",{model:{value:e.updateData.latitude,callback:function(t){e.$set(e.updateData,"latitude",t)},expression:"updateData.latitude"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"天线挂高",prop:"antenna_height"}},[a("el-input",{model:{value:e.updateData.antenna_height,callback:function(t){e.$set(e.updateData,"antenna_height",t)},expression:"updateData.antenna_height"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"方位角",prop:"azimuth"}},[a("el-input",{model:{value:e.updateData.azimuth,callback:function(t){e.$set(e.updateData,"azimuth",t)},expression:"updateData.azimuth"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"下倾角",prop:"down_angle"}},[a("el-input",{model:{value:e.updateData.down_angle,callback:function(t){e.$set(e.updateData,"down_angle",t)},expression:"updateData.down_angle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"NR架构",prop:"nr_framework"}},[a("el-input",{model:{value:e.updateData.nr_framework,callback:function(t){e.$set(e.updateData,"nr_framework",t)},expression:"updateData.nr_framework"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"4G锚点站eNBID_CELLID",prop:"eNBID"}},[a("el-input",{model:{value:e.updateData.eNBID,callback:function(t){e.$set(e.updateData,"eNBID",t)},expression:"updateData.eNBID"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否共享站",prop:"share_base"}},[a("el-select",{attrs:{placeholder:"请选择是否是共享基站"},model:{value:e.updateData.share_base,callback:function(t){e.$set(e.updateData,"share_base",t)},expression:"updateData.share_base"}},[a("el-option",{attrs:{label:"是",value:"是"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"否"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"小区覆盖场景",prop:"cover_scence"}},[a("el-select",{attrs:{placeholder:"请选择小区覆盖类型"},model:{value:e.updateData.cover_scence,callback:function(t){e.$set(e.updateData,"cover_scence",t)},expression:"updateData.cover_scence"}},[a("el-option",{attrs:{label:"密集城区",value:"密集城区"}}),e._v(" "),a("el-option",{attrs:{label:"核心城区",value:"核心城区"}}),e._v(" "),a("el-option",{attrs:{label:"一般城区",value:"一般城区"}}),e._v(" "),a("el-option",{attrs:{label:"高铁",value:"高铁"}}),e._v(" "),a("el-option",{attrs:{label:"郊区",value:"郊区"}}),e._v(" "),a("el-option",{attrs:{label:"农村",value:"农村"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{model:{value:e.updateData.remark,callback:function(t){e.$set(e.updateData,"remark",t)},expression:"updateData.remark"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updateDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmEdit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});