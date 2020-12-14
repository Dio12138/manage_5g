<template>
  <div style="width: 100%; height: 100%">
    <head-top></head-top>
    <el-input
      class="input1"
      style="width: 12%; height: 5%; margin-bottom: 15px; left: 30px"
      v-model="stationId"
      placeholder="请输入基站id"
      @keyup.enter.native="searchPoint"
    ></el-input>
    <el-button class="btn" type="primary" @click="searchPoint" v-loading="isSearched"  element-loading-spinner="el-icon-loading">查询</el-button>
    <!-- <i class="el-icon-loading" v-show="isSearched"></i> -->
    <el-alert
      v-show="haveAlert1"
      title="请输入正确的基站id"
      style="width: 50%; height: 70px"
      type="warning"
      description="当前输入的基站id不存在，请正确输入"
      show-icon
    >
    </el-alert>
    <!--        <div v-show="haveMap1" style="width:600px;height:700px;margin:0;top:10px;left:10px" id="container"></div>-->
    <!--        <div v-show="true" style="width: 100%;height: 100%;display: flex">-->
    <!--            <div style="width: 60%;height:70%;margin:0" id="map_canvas">-->
    <!--&lt;!&ndash;                <div id="map_canvas" style="width: 100%; height: 100%;"></div>&ndash;&gt;-->
    <!--            </div>-->
    <!--            <img class="img1" src="../assets/img/pci.png">-->
    <!--        </div>-->
    <div v-show="true" style="width: 100%; height: 100%; display: flex" v-loading='isLoading' element-loading-text="拼命加载中">
      <div style="width: 80%; height: 70%; margin: 10px" id="map_canvas"></div>
                 <!-- <img class="img1" src="../assets/img/pci.png"> -->
      <!-- <div v-show="true" style="width: 18%;height: 70%; margin: 10px; background-color: green">信息</div> -->
    </div>
  </div>
</template>

<script>
import iconCar3 from "../assets/img/jizhan1.png";
import headTop from "../components/headTop";
export default {
  name: "sectorShow",
  components: {
    headTop,
  },
  data() {
    return {
      haveAlert1: false,
      haveMap1: true,
      isLoading: true,
      isSearched: false,
      stationId: '',
      longitude: [],
      latitude: [],
      azimuth: [],
      aziArr1:[],
      pointCollection: {},
      name: [],
      id: [],
      area:[],
      searchMarker:{},
      map:{},
      polygon2: {},
    };
  },
  mounted() {
    this.showMap();
  },
  methods: {
    showMap() {
      this.$api.get(
        // "5g_info/sector",
        "5g_info/allSector",
        {
          // stationId: this.stationId,
        },(response) => {
          if (response.data.length) {
            // var data1 = response.data.slice(0,5000);
            // var len = data1.length;
            var len = response.data.length;
            // console.log(response.data);
            for (let i = 0; i < len; i++) {
              var strArr = response.data[i].location.split('_');
              this.name[i] = strArr[strArr.length-2];
              this.azimuth[i] = response.data[i].azimuth;
              this.longitude[i] = response.data[i].longitude;
              this.latitude[i] = response.data[i].latitude;
              this.id[i] = response.data[i].gNBID;
              this.area[i] = response.data[i].cover_scence;
            }
            // 把同一经纬度的不同方位角放在一组
            var n = 0;
            this.aziArr1.push([this.azimuth[0]]);
            for(let i = 0; i < len-1; i++){
              if(this.longitude[i] == this.longitude[i+1] && this.latitude[i] == this.latitude[i+1]){
                this.aziArr1[n].push(this.azimuth[i+1]);
              }else {
                this.aziArr1.push([this.azimuth[i+1]]);
                n ++;
              }
            }

            var map = new BMap.Map("map_canvas");
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.enableScrollWheelZoom();
            map.addControl(new BMap.MapTypeControl());
            map.setMapType(BMAP_NORMAL_MAP);

            // 绘制扇区
            function Sector1(point2,radius,sDegree,eDegree,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity) {
              var points = [];
              var step = (eDegree - sDegree) / 10 || 10;
              points.push(point2);
              for (var i = sDegree; i < eDegree + 0.01; i += step) {
                points.push(EOffsetBearing(point2, radius, i));
              }
              points.push(point2);
              var polygon = new BMap.Polygon(points, {
                strokeColor: strokeColour,
                strokeWeight: strokeWeight,
                strokeOpacity: Strokepacity,
                fillColor: fillColour,
                fillOpacity: fillOpacity,
              });
              // var pointL = EOffsetBearing(point2, radius, i - step);
              // var myLabel = new BMap.Label(cname,{position:pointL});
              // map.addOverlay(myLabel);
              return polygon;
            }

            function EOffsetBearing(point3, dist, bearing) {
              var latConv = map.getDistance(point3,new BMap.Point(point3.lng + 0.1, point3.lat)) * (2.64 + (point3.lat - 18.3) * 0.11);
              var lngConv = map.getDistance(point3,new BMap.Point(point3.lng, point3.lat + 0.1)) * 3;
              var lat = (dist * Math.cos((bearing * Math.PI) / 180)) / latConv;
              var lng = (dist * Math.sin((bearing * Math.PI) / 180)) / lngConv;
              return new BMap.Point(point3.lng + lng, point3.lat + lat);
            }

            // 初次加载时默认中心位置和地图比例
            var pointCenter = new BMap.Point(120.1522, 30.31919);
            map.centerAndZoom(pointCenter, 14);
            
            var len1 = this.azimuth.length;
            var rad = 100;
            for (let i = 0; i < len1; i++) {
              var point = new BMap.Point(this.longitude[i], this.latitude[i]);
              // 区域总共有7种："核心城区"，"一般城区"，"农村"，"郊区"，"密集城区"，"高铁"，"高速"
              if (this.area[i] == "农村") {
                rad = 350;
              }else if (this.area[i] == "郊区") {
                rad = 250;
              }else if (this.area[i] == "高铁") {
                rad = 300;
              }else if (this.area[i] == "高速") {
                rad = 200;
              }else if (this.area[i] == "一般城区") {
                rad = 100;
              }else if (this.area[i] == "核心城区") {
                rad = 50;
              }else if (this.area[i] == "密集城区") {
                rad = 30;
              }
              this.polygon2 = Sector1(point,rad,this.azimuth[i] - 30,this.azimuth[i] + 30,"green",1,0.5,"green",0.5);
              map.addOverlay(this.polygon2);
            }

            this.timer = setTimeout(this.fun1(map), 1000);

            this.haveAlert1 = false;
            this.haveMap1 = true;
            this.isLoading = false;
            console.log('sector success');
            this.map = map;
          } else {
            this.haveMap1 = false;
            this.haveAlert1 = true;
            this.isLoading = false;
            console.log('sector failed');
          }
        }
      );
    },
    fun1(map) {  //绘制海量点
			var points = [];  // 添加海量点数据
			for (var i = 0; i < this.longitude.length; i++) {
				var point=new BMap.Point(this.longitude[i], this.latitude[i]);
        point.name=this.name[i];
        point.id=this.id[i];
        var sIndex = this.name.indexOf(this.name[i]);
        var arr = [];
        // 找到与当前name值相同的所有位置
        for(var j = sIndex; j<this.name.length; j++){
          sIndex = this.name.indexOf(this.name[i], j);
          if (sIndex === -1) {
            //未找到就退出循环完成搜索
            break
          }
          arr.push(this.azimuth[j]) //找到就存储索引
        }
        point.azimuth=arr;
				points.push(point);
			}
			var options = {
				size: BMAP_POINT_SIZE_BIG,
				shape: BMAP_POINT_SHAPE_WATERDROP,
				color: '#d340c3',
			};
			this.pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
			this.pointCollection.addEventListener('click', (e)=> {  // 给PointCollection添加点击事件，点击一处显示信息窗口
				var point = new BMap.Point(e.point.lng, e.point.lat);
				var opts = {
					width: 250,     // 信息窗口宽度
					height: 120,     // 信息窗口高度
					title: e.point.name, // 信息窗口标题
          enableMessage: true,//设置允许信息窗发送短息
        };
        var info = '经度：'+e.point.lng+ "<br>" +"纬度："+e.point.lat + "<br>" + '基站ID：' + e.point.id + "<br>" + '方位角：' + e.point.azimuth;
				var infoWindow = new BMap.InfoWindow(info, opts);  // 创建信息窗口对象
				map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
			map.addOverlay(this.pointCollection);  // 添加Overlay
    },
    async searchPoint() {
      this.isSearched = true;
      await setTimeout(() => {
        var searchId = parseInt(this.stationId);
        var index = this.id.indexOf(searchId);
        if(index > -1){
          this.map.removeOverlay(this.searchMarker);
          var point = new BMap.Point(this.longitude[index], this.latitude[index]);
          // this.map.centerAndZoom(point, 15);
          this.searchMarker = new BMap.Marker(point);
          this.map.addOverlay(this.searchMarker);
          this.map.panTo(point);
          this.isSearched = false;
          console.log('search success');
        }else{
          this.isSearched = false;
          alert('不存在此基站，重新输入');
        }
      }, 100);
    }
  },
};
</script>

<style scoped>
.img1 {
  /*border-style:solid;*/
  background: white;
  display: inline-block;
  height: 70%;
  width: 10%;
}
.btn{
    display: inline-block;
    height: 38px;
    width: 70px;
    line-height: 38px;
    padding: 0 18px;
    margin-left: 40px;
    margin-top: 20px;
    background-color: #4488ca;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}

/* 不起作用？ */
/* .BMap_bubble_title {
    display:none;
}
.BMap_pop div:nth-child(1) {
	display:none;
}
.BMap_pop div:nth-child(3) {
	display:none;
}
.BMap_pop div:nth-child(5) {
	display:none;
}
.BMap_pop div:nth-child(7) {
	display:none;
} */
</style>
