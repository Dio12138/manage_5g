webpackJsonp([27],{226:function(e,t,r){r(832);var a=r(99)(r(552),r(918),null,null);e.exports=a.exports},263:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(52),o=r.n(a),l=r(51),i=r.n(l),n=r(53),s=r.n(n),d=r(100),c=r(101),u=r(102);t.default={data:function(){return{baseImgPath:c.b}},created:function(){this.adminInfo.id||this.getAdminData()},computed:s()({},r.i(u.b)(["adminInfo"])),methods:s()({},r.i(u.c)(["getAdminData"]),{tologin:function(){this.$router.push("/")},handleCommand:function(e){var t=this;return i()(o.a.mark(function a(){var l;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if("home"!=e){a.next=4;break}t.$router.push("/manage"),a.next=9;break;case 4:if("signout"!=e){a.next=9;break}return a.next=7,r.i(d.b)();case 7:l=a.sent,1==l.status?(t.$message({type:"success",message:"退出成功"}),t.$router.push("/")):t.$message({type:"error",message:l.message});case 9:case"end":return a.stop()}},a,t)}))()}})}},264:function(e,t,r){t=e.exports=r(217)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#111;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.section_title1{text-align:center;font-size:24px;margin-bottom:10px}.avator{width:40px;height:40px;border-radius:50%;margin-right:50px}.el-dropdown-menu__item{text-align:center}",""])},265:function(e,t,r){var a=r(264);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(218)("65b5c4ce",a,!0)},266:function(e,t,r){r(265);var a=r(99)(r(263),r(267),null,null);e.exports=a.exports},267:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header_container"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[e._v("首页")]),e._v(" "),e._l(e.$route.meta,function(t,a){return r("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),r("header",{staticClass:"section_title1",staticStyle:{color:"#1d90e6"}},[e._v("杭州5G基站管理系统")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"success"},on:{click:e.tologin}},[e._v("退出")])],1)},staticRenderFns:[]}},552:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(52),o=r.n(a),l=r(51),i=r.n(l),n=r(19),s=r.n(n),d=r(266),c=r.n(d),u=r(33),m=r.n(u);t.default={name:"addStations",components:{headTop:c.a},data:function(){return{input:"",haveStations:!1,haveAlert:!1,stations:[],province:"",shi1:[],city:"",block:"",qu:"",qu1:[],mapJson:"../../static/json/map.json",addDialogVisible:!1,addForm:{gNBID:"",prov:"",city:"",district:"",location:"",belong_gNBID:"",cover_type:"",open_status:"",CELL_ID:"",TAC:"",PCI:"",band:"",bandWidth:"",frequency:"",duplex_mode:"",manufactures:"",equipment:"",equipment_version:"",base_type:"",longitude:"",latitude:"",antenna_height:"",azimuth:"",down_angle:"",nr_framework:"",eNBID:"",share_base:"",cover_scence:"",remark:""},addFormRules:{gNBID:[{required:!0,message:"请输入基站ID",trigger:"blur"},{message:"请输入整数",trigger:"blur"}],prov:[{required:!0,message:"请输入省级名称",trigger:"blur"}],city:[{required:!0,message:"请输入城市名称",trigger:"blur"}],ditrict:[{required:!0,message:"请输入行政区名称",trigger:"blur"}],location:[{required:!0,message:"请输入基站位置",trigger:"blur"}],belong_gNBID:[{required:!1,message:"请输入所属gNBID名称",trigger:"blur"}],cover_type:[{required:!0,message:"请输入基站cover_type",trigger:"blur"}],open_status:[{required:!0,message:"请输入开放状态",trigger:"blur"}],CELL_ID:[{required:!0,message:"请输入CELL ID名称",trigger:"blur"}],TAC:[{required:!0,message:"请输入基站TAC",trigger:"blur"}],PCI:[{required:!0,message:"请输入基站PCI",trigger:"blur"}],band:[{required:!0,message:"请输入频段",trigger:"blur"}],bandWidth:[{required:!0,message:"请输入带宽",trigger:"blur"}],frequency:[{required:!0,message:"请输入频点",trigger:"blur"}],duplex_mode:[{required:!0,message:"请输入双工模式",trigger:"blur"}],manufactures:[{required:!1,message:"请输入生产厂家",trigger:"blur"}],equipment:[{required:!0,message:"请输入设备型号",trigger:"blur"}],equipment_version:[{required:!0,message:"请输入设备版本",trigger:"blur"}],base_type:[{required:!0,message:"请输入基站类型",trigger:"blur"}],longitude:[{required:!0,message:"请输入基站longitude",trigger:"blur"}],latitude:[{required:!0,message:"请输入基站latitude",trigger:"blur"}],antenna_height:[{required:!0,message:"请输入天线挂高",trigger:"blur"}],azimuth:[{required:!0,message:"请输入方位角",trigger:"blur"}],down_angle:[{required:!0,message:"请输入下倾角",trigger:"blur"}],nr_framework:[{required:!0,message:"请输入NR架构模型",trigger:"blur"}],eNBID:[{required:!0,message:"请输入4G锚点站",trigger:"blur"}],share_base:[{required:!1,message:"请输入是否是共享基站",trigger:"blur"}],cover_scence:[{required:!0,message:"请输入覆盖场景",trigger:"blur"}],remark:[{required:!1,message:"请输入备注",trigger:"blur"}]}}},created:function(){this.getCityData()},methods:{getStations:function(){var e=this;this.$api.get("5G_info/searchStationById",{stationId:this.input},function(t){t.status>=200&&t.status<=300?(console.log(t.data),t.data.success?(e.haveStations=!0,e.haveAlert=!1,e.stations=t.data.stations,console.log("success")):(e.haveStations=!1,e.haveAlert=!0,console.log("fail"))):(e.haveStations=!1,e.haveAlert=!0,console.log(t.message))})},addDialogClosed:function(){this.$refs.addFormRef.resetFields()},getCityData:function(){var e=this;m.a.get(this.mapJson).then(function(t){if(200==t.status){var r=t.data;e.province=[],e.city=[],e.block=[];for(var a in r)a.match(/0000$/)?e.province.push({id:a,value:r[a],children:[]}):a.match(/00$/)?e.city.push({id:a,value:r[a],children:[]}):e.block.push({id:a,value:r[a]});for(var o in e.province)for(var l in e.city)e.province[o].id.slice(0,2)===e.city[l].id.slice(0,2)&&e.province[o].children.push(e.city[l]);for(var i in e.city)for(var n in e.block)e.block[n].id.slice(0,4)===e.city[i].id.slice(0,4)&&e.city[i].children.push(e.block[n])}}).catch(function(e){console.log(s()(+e))})},choseProvince:function(e){for(var t in this.province)e===this.province[t].id&&(this.shi1=this.province[t].children,this.addForm.prov=this.province[t].value)},choseCity:function(e){for(var t in this.city)e===this.city[t].id&&(this.addForm.city=this.city[t].value,this.qu1=this.city[t].children,this.qu=this.city[t].children.value,this.E=this.qu1[0].id)},choseBlock:function(e){for(var t in this.block)e===this.block[t].id&&(this.addForm.district=this.block[t].value,this.E=e,console.log(this.addForm.district))},addStations:function(){var e=this;this.$refs.addFormRef.validate(function(){var t=i()(o.a.mark(function t(r){var a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$api.post("5G_info/addStationInfo",{gNBID:e.addForm.gNBID,prov:e.addForm.prov,city:e.addForm.city,district:e.addForm.district,location:e.addForm.location,belong_gNBID:e.addForm.belong_gNBID,cover_type:e.addForm.cover_type,open_status:e.addForm.open_status,CELL_ID:e.addForm.CELL_ID,TAC:e.addForm.TAC,PCI:e.addForm.PCI,band:e.addForm.band,bandWidth:e.addForm.bandWidth,frequency:e.addForm.frequency,duplex_mode:e.addForm.duplex_mode,manufactures:e.addForm.manufactures,equipment:e.addForm.equipment,equipment_version:e.addForm.equipment_version,base_type:e.addForm.base_type,longitude:e.addForm.longitude,latitude:e.addForm.latitude,antenna_height:e.addForm.antenna_height,azimuth:e.addForm.azimuth,down_angle:e.addForm.down_angle,nr_framework:e.addForm.nr_framework,eNBID:e.addForm.eNBID,share_base:e.addForm.share_base,cover_scence:e.addForm.cover_scence,remark:e.addForm.remark},function(t){return 200!==t.status?(console.log(t.data),e.$message.error("添加用户失败！")):(e.addDialogVisible=!1,e.$message.success("添加用户成功！"))});case 4:a=t.sent;case 5:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())}}}},599:function(e,t,r){t=e.exports=r(217)(!1),t.push([e.i,'.top{position:sticky;position:-webkit-sticky;top:0}.wb1{width:300px;padding:15px;border-radius:5px;background-color:#fff}.bs,.wb1{text-align:center}.bs{padding:10px;font-size:16px}.el-table .cell,.el-table th>.cell{text-align:center}::-webkit-scrollbar{width:10px!important;height:10px!important;background-color:#b3c0c09e}::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6pxn rgba(0,0,0,.3);background-color:#e4e4e4}.el-table__fixed-right:before,.el-table__fixed:before{content:"";position:absolute;left:0;bottom:0;width:100%;height:1px;background-color:unset;z-index:4}.abow_dialog{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:Center;align-items:Center;overflow:hidden}.el-dialog{margin:0 auto!important;height:80%;overflow:hidden}.el-dialog__body{position:absolute;left:0;top:54px;bottom:70px;right:0;padding:0;z-index:1;overflow:hidden;overflow-y:auto}.el-dialog__footer{position:absolute;left:0;right:0;bottom:0}.el-input{width:70%}',""])},832:function(e,t,r){var a=r(599);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(218)("6ed81a6f",a,!0)},918:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("head-top"),e._v(" "),r("el-card",[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{placeholder:"请输入基站id"},on:{click:e.getStations},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}})],1),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.getStations}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加基站信息")])],1)],1),e._v(" "),e.haveAlert?r("el-alert",{staticStyle:{width:"80%",height:"70px","font-size":"12px"},attrs:{id:"wb13",title:"请输入正确的id",type:"warning",description:"当前输入的基站id不存在，请正确输入","show-icon":""}}):e._e(),e._v(" "),e.haveStations?r("el-table",{staticStyle:{width:"80%"},attrs:{data:e.stations,height:"198",stripe:"",fit:"",border:"","highlight-current-row":""}},[r("el-table-column",{attrs:{fixed:"",type:"index",label:"序号",width:"80"}}),e._v(" "),r("el-table-column",{attrs:{prop:"gNBID",label:"基站ID",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"province",label:"省份",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"city",label:"城市",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"district",label:"行政区",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"location",label:"位置",width:"250"}}),e._v(" "),r("el-table-column",{attrs:{prop:"belong_gNBID",label:"所属基站名称",width:"250"}}),e._v(" "),r("el-table-column",{attrs:{prop:"cover_type",label:"覆盖类型",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"open_status",label:"开放状态",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"CELL_ID",label:"CELL_ID",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"TAC",label:"PCI",width:"TAC"}}),e._v(" "),r("el-table-column",{attrs:{prop:"PCI",label:"PCI",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"band",label:"频段",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"bandWidth",label:"带宽",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"frequency",label:"频点",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"duplex_mode",label:"双工模式",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"manufactures",label:"生产厂家",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"equipment",label:"设备型号",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"equipment_version",label:"设备版本",width:"250"}}),e._v(" "),r("el-table-column",{attrs:{prop:"PCI",label:"PCI",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"longitude",label:"经度",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"latitude",label:"纬度",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"base_type",label:"基站类型",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"longitude",label:"经度",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"latitude",label:"纬度",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"antenna_height",label:"天线高度",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"azimuth",label:"方位角",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"down_angle",label:"下倾角",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"nr_framework",label:"NR架构",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"eNBID",label:"4G锚点站eNBID_CELLID",width:"310"}}),e._v(" "),r("el-table-column",{attrs:{prop:"share_base",label:"是否共享基站",width:"140"}}),e._v(" "),r("el-table-column",{attrs:{prop:"cover_scence",label:"小区覆盖场景",width:"130"}}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注",width:"120"}})],1):e._e(),e._v(" "),r("el-dialog",{attrs:{title:"添加基站信息",visible:e.addDialogVisible,width:"40%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addDialogClosed}},[r("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"gNBID",prop:"gNBID"}},[r("el-input",{model:{value:e.addForm.gNBID,callback:function(t){e.$set(e.addForm,"gNBID",t)},expression:"addForm.gNBID"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"省份",prop:"prov"}},[r("el-select",{attrs:{placeholder:"省级地区"},on:{change:e.choseProvince},model:{value:e.addForm.prov,callback:function(t){e.$set(e.addForm,"prov",t)},expression:"addForm.prov"}},e._l(e.province,function(e){return r("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"城市",prop:"city"}},[r("el-select",{attrs:{placeholder:"市级地区"},on:{change:e.choseCity},model:{value:e.addForm.city,callback:function(t){e.$set(e.addForm,"city",t)},expression:"addForm.city"}},e._l(e.shi1,function(e){return r("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"行政区",prop:"district"}},[r("el-select",{attrs:{placeholder:"区级地区"},on:{change:e.choseBlock},model:{value:e.addForm.district,callback:function(t){e.$set(e.addForm,"district",t)},expression:"addForm.district"}},e._l(e.qu1,function(e){return r("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"位置",prop:"location"}},[r("el-input",{model:{value:e.addForm.location,callback:function(t){e.$set(e.addForm,"location","string"==typeof t?t.trim():t)},expression:"addForm.location"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"所属gNBID名称",prop:"belong_gNBID"}},[r("el-input",{model:{value:e.addForm.belong_gNBID,callback:function(t){e.$set(e.addForm,"belong_gNBID","string"==typeof t?t.trim():t)},expression:"addForm.belong_gNBID"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"cover_type",prop:"cover_type"}},[r("el-select",{attrs:{placeholder:"请选择覆盖类型"},model:{value:e.addForm.cover_type,callback:function(t){e.$set(e.addForm,"cover_type","string"==typeof t?t.trim():t)},expression:"addForm.cover_type"}},[r("el-option",{attrs:{label:"室内",value:"室内"}}),e._v(" "),r("el-option",{attrs:{label:"室外",value:"室外"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"开通状态",prop:"open_status"}},[r("el-select",{attrs:{placeholder:"请选择开通状态"},model:{value:e.addForm.open_status,callback:function(t){e.$set(e.addForm,"open_status","string"==typeof t?t.trim():t)},expression:"addForm.open_status"}},[r("el-option",{attrs:{label:"在网",value:"在网"}}),e._v(" "),r("el-option",{attrs:{label:"离网",value:"离网"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"CELL ID",prop:"CELL_ID"}},[r("el-input",{model:{value:e.addForm.CELL_ID,callback:function(t){e.$set(e.addForm,"CELL_ID","string"==typeof t?t.trim():t)},expression:"addForm.CELL_ID"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"TAC",prop:"TAC"}},[r("el-input",{model:{value:e.addForm.TAC,callback:function(t){e.$set(e.addForm,"TAC","string"==typeof t?t.trim():t)},expression:"addForm.TAC"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"PCI",prop:"PCI"}},[r("el-input",{model:{value:e.addForm.PCI,callback:function(t){e.$set(e.addForm,"PCI","string"==typeof t?t.trim():t)},expression:"addForm.PCI"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"频段",prop:"band"}},[r("el-input",{model:{value:e.addForm.band,callback:function(t){e.$set(e.addForm,"band","string"==typeof t?t.trim():t)},expression:"addForm.band"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"带宽",prop:"bandWidth"}},[r("el-input",{model:{value:e.addForm.bandWidth,callback:function(t){e.$set(e.addForm,"bandWidth","string"==typeof t?t.trim():t)},expression:"addForm.bandWidth"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"频点",prop:"frequency"}},[r("el-input",{model:{value:e.addForm.frequency,callback:function(t){e.$set(e.addForm,"frequency","string"==typeof t?t.trim():t)},expression:"addForm.frequency"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"双工模式",prop:"duplex_mode"}},[r("el-select",{attrs:{placeholder:"请选择双工模式"},model:{value:e.addForm.duplex_mode,callback:function(t){e.$set(e.addForm,"duplex_mode","string"==typeof t?t.trim():t)},expression:"addForm.duplex_mode"}},[r("el-option",{attrs:{label:"TDD",value:"TDD"}}),e._v(" "),r("el-option",{attrs:{label:"FDD",value:"FDD"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"厂家",prop:"manufactures"}},[r("el-input",{model:{value:e.addForm.manufactures,callback:function(t){e.$set(e.addForm,"manufactures","string"==typeof t?t.trim():t)},expression:"addForm.manufactures"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"设备型号",prop:"equipment"}},[r("el-input",{model:{value:e.addForm.equipment,callback:function(t){e.$set(e.addForm,"equipment","string"==typeof t?t.trim():t)},expression:"addForm.equipment"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"设备版本",prop:"equipment_version"}},[r("el-input",{model:{value:e.addForm.equipment_version,callback:function(t){e.$set(e.addForm,"equipment_version","string"==typeof t?t.trim():t)},expression:"addForm.equipment_version"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"基站类型",prop:"base_type"}},[r("el-input",{model:{value:e.addForm.base_type,callback:function(t){e.$set(e.addForm,"base_type","string"==typeof t?t.trim():t)},expression:"addForm.base_type"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"longitude",prop:"longitude"}},[r("el-input",{model:{value:e.addForm.longitude,callback:function(t){e.$set(e.addForm,"longitude","string"==typeof t?t.trim():t)},expression:"addForm.longitude"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"latitude",prop:"latitude"}},[r("el-input",{model:{value:e.addForm.latitude,callback:function(t){e.$set(e.addForm,"latitude","string"==typeof t?t.trim():t)},expression:"addForm.latitude"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"天线挂高",prop:"antenna_height"}},[r("el-input",{model:{value:e.addForm.antenna_height,callback:function(t){e.$set(e.addForm,"antenna_height","string"==typeof t?t.trim():t)},expression:"addForm.antenna_height"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"方位角",prop:"azimuth"}},[r("el-input",{model:{value:e.addForm.azimuth,callback:function(t){e.$set(e.addForm,"azimuth","string"==typeof t?t.trim():t)},expression:"addForm.azimuth"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"下倾角",prop:"down_angle"}},[r("el-input",{model:{value:e.addForm.down_angle,callback:function(t){e.$set(e.addForm,"down_angle","string"==typeof t?t.trim():t)},expression:"addForm.down_angle"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"NR架构",prop:"nr_framework"}},[r("el-input",{model:{value:e.addForm.nr_framework,callback:function(t){e.$set(e.addForm,"nr_framework","string"==typeof t?t.trim():t)},expression:"addForm.nr_framework"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"4G锚点站eNBID_CELLID",prop:"eNBID"}},[r("el-input",{model:{value:e.addForm.eNBID,callback:function(t){e.$set(e.addForm,"eNBID","string"==typeof t?t.trim():t)},expression:"addForm.eNBID"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否共享站",prop:"share_base"}},[r("el-select",{attrs:{placeholder:"请选择是否是共享基站"},model:{value:e.addForm.share_base,callback:function(t){e.$set(e.addForm,"share_base","string"==typeof t?t.trim():t)},expression:"addForm.share_base"}},[r("el-option",{attrs:{label:"是",value:"是"}}),e._v(" "),r("el-option",{attrs:{label:"否",value:"否"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"小区覆盖场景",prop:"cover_scence"}},[r("el-select",{attrs:{placeholder:"请选择小区覆盖类型"},model:{value:e.addForm.cover_scence,callback:function(t){e.$set(e.addForm,"cover_scence","string"==typeof t?t.trim():t)},expression:"addForm.cover_scence"}},[r("el-option",{attrs:{label:"密集城区",value:"密集城区"}}),e._v(" "),r("el-option",{attrs:{label:"核心城区",value:"核心城区"}}),e._v(" "),r("el-option",{attrs:{label:"一般城区",value:"一般城区"}}),e._v(" "),r("el-option",{attrs:{label:"高铁",value:"高铁"}}),e._v(" "),r("el-option",{attrs:{label:"郊区",value:"郊区"}}),e._v(" "),r("el-option",{attrs:{label:"农村",value:"农村"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{model:{value:e.addForm.remark,callback:function(t){e.$set(e.addForm,"remark","string"==typeof t?t.trim():t)},expression:"addForm.remark"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.addStations}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});