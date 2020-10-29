<template>
    <div style="width: 100%;height: 100%">
        <!--        <el-tag type="success">地图展示</el-tag>-->
        <!--    <input type="text" placeholder="出发地" style="width: 15em" id="startAddress" v-model="from">-->
        <!--    <input type="text" placeholder="目的地" style="width: 15em" id="endAddress" v-model="to">-->
        <!--        <input type="text" placeholder="搜索" style="width: 15em" id="searchAddress" v-model="address">-->
        <!--        <el-input placeholder="请输入搜索地址" v-model="address" style="width: 15em"></el-input>-->
        <!--        <el-button type="primary" icon="el-icon-delete" @click="searchAddress">搜索</el-button>-->
        <!--        <button @click="searchAddress">搜索</button>-->
<!--        <input type="text" @keyup.enter="showMap" placeholder="请输入基站id" style="width: 200px;height: 20px" id="searchAddress"-->
<!--               v-model="stationId">-->
        <head-top></head-top>
        <el-input class="wb11" v-model="stationId" placeholder="请输入基站id" @keyup.enter.native="showMap"></el-input>
        <div style="width:800px;height:700px;margin:0" id="container"></div>
        <div id="container1">
            <p>121212</p>
        </div>
    </div>
</template>

<script>
	import iconCar from '../../assets/img/jizhan1.png';
	import headTop from '../headTop';

	var map;
	export default {
		name: "test1",
		components: {
			headTop,
		},
		data() {
			return {
				stationId: '',
				longitude: '',
				latitude: '',
				location: [],
				data: {},
				from: "",
				to: "",
				isOK: false,
				timer: '',
				address: '',
			}
		},
		methods: {
			showMap() {
				this.$api.get('5G_info/getLongitudeById', {
					'stationId': this.stationId,
				}, response => {
					if (response.status >= 200 && response.status < 300) {
						console.log(response.data);
						if (response.data.success) {
							this.longitude = response.data.stations.longitude;
							this.latitude = response.data.stations.latitude;
							this.showMap1();
						} else {
							console.log("111");
						}

					} else {
						console.log(response.message);
					}
				});
			},
			showMap1(){
				var map = new BMap.Map("container");
				var point = new BMap.Point(this.longitude, this.latitude);
				map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注
				// 创建图标对象
				var deviceSize = new BMap.Size(50, 50);
				var deviceIcon = new BMap.Icon(iconCar, deviceSize, { //会以base64的方式传参iconCar
					imageSize: deviceSize
				});

				var mk = new BMap.Marker(point, {
					icon: deviceIcon
				});

				map.addOverlay(mk);//将标注添加到地图中
			}
		},
		mounted() {
			// var map = new BMap.Map("container");
			// var point = new BMap.Point(this.longitude, this.latitude);
			// map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注
			// // 创建图标对象
			// var deviceSize = new BMap.Size(50, 50);
			// var deviceIcon = new BMap.Icon(iconCar, deviceSize, { //会以base64的方式传参iconCar
			//     imageSize: deviceSize
			// });
			//
			// var mk = new BMap.Marker(point, {
			//     icon: deviceIcon
			// });
			//
			// map.addOverlay(mk);//将标注添加到地图中
		}
// 随机向地图添加10个标注
// 			var bounds = map.getBounds();
// 			var lngSpan = bounds.maxX - bounds.minX;
// 			var latSpan = bounds.maxY - bounds.minY;
// 			for (var i = 0; i < 10; i ++) {
// 				var point = new BMap.Point(bounds.minX + lngSpan * (Math.random() * 0.7 + 0.15),
// 					bounds.minY + latSpan * (Math.random() * 0.7 + 0.15));
// 				addMarker(point, i);
// 			}
	}
</script>

<style scoped>
    /*#container1{*/
    /*    display: inline-block;*/
    /*    position: relative;*/
    /*    right: 60px;*/
    /*    top:40px;*/
    /*    height:700px;*/
    /*    width: 200px;*/
    /*    margin: 0;*/
    /*}*/
    /*#container{*/
    /*    display: inline-block;*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    top:100px*/
    /*}*/
</style>


