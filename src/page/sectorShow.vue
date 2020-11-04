<template>
  <div style="width: 100%; height: 100%">
    <head-top></head-top>
    <el-input
      class="input1"
      style="width: 12%; height: 5%; margin-bottom: 15px; top: 10px; left: 10px"
      v-model="stationId"
      placeholder="请输入基站id"
      @keyup.enter.native="showMap"
    ></el-input>
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
    <div v-show="true" style="width: 100%; height: 100%; display: flex">
      <div style="width: 80%; height: 70%; margin: 10px" id="map_canvas"></div>
      <!--            <img class="img1" src="../assets/img/pci.png">-->
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
      stationId: 4915882,
      longitude: [],
      latitude: [],
      azimuth: [],
      name: [],
    };
  },
  mounted() {
    this.showMap();
  },
  methods: {
    showMap() {
      this.$api.get(
        "5g_info/sector",
        {
          stationId: this.stationId,
        },(response) => {
          if (response.data.length) {
            var len = response.data.length;
            console.log(response.data);
            for (let i = 0; i < len; i++) {
              this.azimuth[i] = response.data[i]["azimuth"];
              this.name[i] = response.data[i].location;
              this.longitude[i] = response.data[i].longitude;
              this.latitude[i] = response.data[i].latitude;
            }
            console.log(this.azimuth);
            console.log(this.name);
            console.log(this.longitude);
            console.log(this.latitude);
            var map = new BMap.Map("map_canvas");
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.enableScrollWheelZoom();
            map.addControl(new BMap.MapTypeControl());
            map.setMapType(BMAP_NORMAL_MAP);
            function Sector1(point2,radius,sDegree,eDegree,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,cname) {
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
              var pointL = EOffsetBearing(point2, radius, i - step);
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
            var len1 = this.azimuth.length;
            for (let i = 0; i < len1; i++) {
              var point = new BMap.Point(this.longitude[i], this.latitude[i]);
              // 地图默认显示比例
              map.centerAndZoom(point, 14);
              var polygon2 = Sector1(point,1050,this.azimuth[i] - 30,this.azimuth[i] + 30,"green",1,0.5,"green",0.5,"");
              map.addOverlay(polygon2);
              var marker = new BMap.Marker(point);
              map.addOverlay(marker);
              // var mySize = new BMap.Size(50,50);
              // var myIcon = new BMap.Icon( iconCar3, mySize, {
              //   imageSize: mySize
              // });
              // var marker = new BMap.Marker(point,{icon:myIcon});
              // map.addOverlay(marker);
            }
            this.haveAlert1 = false;
            this.haveMap1 = true;
          } else {
            this.haveMap1 = false;
            this.haveAlert1 = true;
          }
        }
      );

      // var point = new BMap.Point(this.longitude,this.latitude);
      // map.centerAndZoom(point,12);
      // var polygon2 = Sector1(point, 2000, -30,30,"yellow" , 12,5, "yellow" ,5 ,"扇区1-1");
      // map.addOverlay(polygon2);
      // var marker = new BMap.Marker(point);
      // map.addOverlay(marker);

      // var point = new BMap.Point(this.longitude,this.latitude);
      // map.centerAndZoom(point,12);
      // var polygon2 = Sector1(point, 117.5, 70,130,"yellow" , 12,5, "yellow" ,5 ,"扇区1-2");
      // map.addOverlay(polygon2);
      // var marker = new BMap.Marker(point);
      // map.addOverlay(marker);

      // var point = new BMap.Point(this.longitude,this.latitude);
      // map.centerAndZoom(point,12);
      // var polygon2 = Sector1(point, 117.5, 210,270,"yellow" , 12,5, "yellow" ,5 ,"扇区1-3");
      // map.addOverlay(polygon2);
      // var marker = new BMap.Marker(point);
      // map.addOverlay(marker);
    },
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
  /*position: absolute;*/
  /*left: 45%;*/
  /*top:10%;*/
  /*height:695px;*/
  /*width: 200px;*/
  /*margin: 0;*/
}
</style>
