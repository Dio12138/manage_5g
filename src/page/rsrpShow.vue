<template>
    <div style="width: 100%;height: 100%">
        <head-top></head-top>
        <el-input class="input1" style="width: 12%;height:5%;margin:0;top:10px;left:10px" v-model="stationId" placeholder="请输入基站id" @keyup.enter.native="showMap"></el-input>
        <el-alert
            v-show="haveAlert1"
            title="请输入正确的基站id"
            style="width: 50%;height: 70px"
            type="warning"
            description="当前输入的基站id不存在，请正确输入"
            show-icon>
        </el-alert>
<!--        <div v-show="haveMap1" style="width:600px;height:700px;margin:0;top:10px;left:10px" id="container"></div>-->
        <div v-show="true" style="width: 100%;height: 100%;display: flex">
            <div style="width: 40%;height:70%;margin:0" id="container"></div>
            <img class="img1" src="../assets/img/rsrp1.png">
            <div style="width: 40%;height:70%;margin:0" id="container1"></div>
            <img class="img1" src="../assets/img/rsrp2.png">
        </div>
<!--        <div class="container4" v-show="true" style="width: 10%;height:70%;margin:0">-->
<!--            <p class="pstyle">RSRPSSB</p>-->
<!--            <br>-->
<!--            &lt;!&ndash;            <img src="/static/img/green1.png" style="vertical-align:middle;width: 40px">&ndash;&gt;-->
<!--            <p class="pstyle">[-85,-40] (0,0.00%)</p>-->
<!--            <br>-->
<!--            <p class="pstyle">[-95,-85] (0,0.00%)</p>-->
<!--            <br>-->
<!--            <p class="pstyle">[-105,-95] (0,0.00%)</p>-->
<!--            <br>-->
<!--            <p class="pstyle">[-115,-105] (0,0.00%)</p>-->
<!--        </div>-->
    </div>
</template>

<script>
	import iconCar3 from '../assets/img/jizhan1.png';
	import headTop from '../components/headTop';

	export default {
		name: "rsrpShow",
		components: {
			headTop,
		},
		data() {
			return {
				haveAlert1:false,
				haveMap1:false,
				stationId: 4915882,
				// longitude: '',
				longitude: '120.057000',
				// latitude: '',
				latitude: '30.255020',
				location: [],
				data: {},
				from: "",
				to: "",
				isOK: false,
				timer: '',
				address: '',
                rsrp_ul:[],
                rsrp_dl:[],
				longitudeArr:[],
				latitudeArr:[],
			}
		},
		methods: {
			showMap() {
				this.$api.get('DY_DATE/getMovingRsrpById', {
					'stationId': this.stationId,
				}, response => {
					if (response.status >= 200 && response.status < 300) {
						console.log(response.data);
						if (response.data.success1) {
							if(response.data.success2){
								this.longitude = response.data.stations.longitude;
								this.latitude = response.data.stations.latitude;
								this.rsrp_ul = response.data.rsrp_ul;
								this.rsrp_dl = response.data.rsrp_dl;
								this.longitudeArr=response.data.longitudeArr;
								this.latitudeArr=response.data.latitudeArr;
								this.haveMap1=true;
								this.haveAlert1=false;
								console.log(response.data.message);
								this.showMap1();
								this.showMap2();
                            }else{
								this.longitude = response.data.stations.longitude;
								this.latitude = response.data.stations.latitude;
								this.rsrp_ul =[];
								this.rsrp_dl =[];
								this.longitudeArr=[];
								this.latitudeArr=[];
								this.haveMap1=true;
								this.haveAlert1=false;
								console.log(response.data.message);
								this.showMap1();
								this.showMap2();
                            }
						} else {
							console.log(response.data.message);
							this.haveMap1=false;
							this.haveAlert1=true;
						}
					} else {
						console.log("请求异常");
						this.haveMap1=false;
						this.haveAlert1=true;
					}
				});
			},
			showMap1(){
				var map = new BMap.Map("container");
				var point = new BMap.Point(this.longitude, this.latitude);
				map.centerAndZoom(point, 20);  // 编写自定义函数，创建标注
				map.addControl(new BMap.ScaleControl());
				map.enableScrollWheelZoom(true);
				// map.disableDragging();//禁用鼠标拖拽

                //创建图标对象，只不过放到了回调函数里面
				var convertor = new BMap.Convertor();//创建一个坐标转换的实例
				var pointArr = [];
				pointArr.push(point);
				convertor.translate(pointArr, 1, 5, function (data){
					if(data.status === 0) {
						var mySize = new BMap.Size(50, 50);
						var myIcon = new BMap.Icon(iconCar3, mySize, { //会以base64的方式传参iconCar
							//这行不加，自定义图片就会出问题
							imageSize: mySize
						});

						var mk = new BMap.Marker(data.points[0], {
							icon: myIcon
						});

						map.addOverlay(mk);//将标注添加到地图中
						map.setCenter(data.points[0]);
					}
				})

                var tempArr=[];
				for (var i = 0; i <this.longitudeArr.length ; i++) {
					tempArr.push(new BMap.Point(this.longitudeArr[i], this.latitudeArr[i]));
					// tempArr[i]=new BMap.Point(this.longitudeArr[i], this.latitudeArr[i]);
				}

				for (var i = 0; i <tempArr.length-1; i++) {
					var midRsrpUl=(this.rsrp_ul[i]+this.rsrp_ul[i+1])/2;
					var polyline = new BMap.Polyline([
							tempArr[i],
							tempArr[i+1],
						],
						{strokeColor:this.getColor(midRsrpUl), strokeWeight:6, strokeOpacity:0.5}
					);
					map.addOverlay(polyline);
					console.log("经度："+tempArr[i].lng+"纬度："+tempArr[i].lat);
				}
				// console.log("经度1："+new BMap.Point(120.057000, 30.255020).lng+"纬度1："+new BMap.Point(120.057000, 30.255020).lat);

			},
			showMap2(){
				var map = new BMap.Map("container1");
				var point = new BMap.Point(this.longitude, this.latitude);
				map.centerAndZoom(point, 20);  // 编写自定义函数，创建标注
				map.enableScrollWheelZoom(true);
				map.addControl(new BMap.ScaleControl());
				// map.disableDragging();//禁用鼠标拖拽
				//创建图标对象，只不过放到了回调函数里面
				var convertor = new BMap.Convertor();//创建一个坐标转换的实例
				var pointArr = [];
				pointArr.push(point);
				convertor.translate(pointArr, 1, 5, function (data){
					if(data.status === 0) {
						var mySize = new BMap.Size(50, 50);
						var myIcon = new BMap.Icon(iconCar3, mySize, { //会以base64的方式传参iconCar
							//这行不加，自定义图片就会出问题
							imageSize: mySize
						});

						var mk = new BMap.Marker(data.points[0], {
							icon: myIcon
						});

						map.addOverlay(mk);//将标注添加到地图中
						map.setCenter(data.points[0]);
					}
				})

				var tempArr=[];
				for (var i = 0; i <this.longitudeArr.length ; i++) {
					tempArr.push(new BMap.Point(this.longitudeArr[i], this.latitudeArr[i]));
				}

				for (var i = 0; i <tempArr.length-1; i++) {
					var midRsrpDl=(this.rsrp_dl[i]+this.rsrp_dl[i+1])/2;
					var polyline = new BMap.Polyline([
							tempArr[i],
							tempArr[i+1],
						],
						{strokeColor:this.getColor(midRsrpDl), strokeWeight:6, strokeOpacity:0.5}
					);
					map.addOverlay(polyline);
				}
				// map.removeOverlay(polyline1);
			},
            getColor(mid){
				var colorVal=[-115,-105,-95,-85,-40];
				var myColor=["#e80000","#f0ef22","#ffff00","#00fe00","#004000"];
				for (var i = 0; i <colorVal.length ; i++) {
                    if(mid<colorVal[i]){
                    	return myColor[i];
                    }
				}
            },
		},
		mounted() {
            this.showMap1();
            this.showMap2();
		}
	}
</script>

<style scoped>
    .img1{
        /*border-style:solid;*/
        background:white;
        display: inline-block;
        height:70%;
        width: 10%;
        /*position: absolute;*/
        /*left: 45%;*/
        /*top:10%;*/
        /*height:695px;*/
        /*width: 200px;*/
        /*margin: 0;*/
    }
    .pstyle{
        position: relative;
        top:100px;
    }
    /*#container{*/
    /*    display: inline-block;*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    top:100px*/
    /*}*/
</style>


