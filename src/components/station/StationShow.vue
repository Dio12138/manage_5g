<template>
    <div style="width: 100%;height: 100%">
<!--        <el-tag type="success">地图展示</el-tag>-->
        <!--    <input type="text" placeholder="出发地" style="width: 15em" id="startAddress" v-model="from">-->
        <!--    <input type="text" placeholder="目的地" style="width: 15em" id="endAddress" v-model="to">-->
<!--        <input type="text" placeholder="搜索" style="width: 15em" id="searchAddress" v-model="address">-->
        <el-input placeholder="请输入搜索地址" v-model="address" style="width: 15em"></el-input>
        <el-button type="primary" icon="el-icon-delete" @click="searchAddress">搜索</el-button>

<!--        <button @click="searchAddress">搜索</button>-->
        <div style="width:100%;height:750px;margin-right:20px;margin-top: 20px" id="container"></div>
    </div>

    <!--  <div>111</div>-->

</template>

<script>
	// import BMap from 'BMap';
	var map;
	export default {
		name: "StationShow",
		data() {
			return {
				longitude: [],
				latitude: [],
				location: [],
				data: {},
				from: "",
				to: "",
				isOK: false,
				timer: '',
				address:'',
			}
		},
		created() {
			console.log("进入created");
			this.$api.get('5G_info/getAllStationInfo', {}, response => {
				if (response.status >= 200 && response.status < 300) {
					console.log(response.data);
					if (response.data.success) {
						this.data = response.data;
						this.longitude = response.data.longitude;
						this.latitude = response.data.latitude;
						this.location = response.data.location;
						this.isOK = true;
						// console.log(this.isOK);
					} else {
						console.log("111");
					}

				} else {
					console.log(response.message);
				}
			});
		},
		methods: {
			searchAddress() {
				var local = new BMap.LocalSearch(map, {
					renderOptions: {map: map}
				});
				local.search(this.address);
			},
			fun1() {
				// console.log(this.longitude);
				// console.log(this.longitude.length);
				// console.log(this.isOK);

				if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
					var points = [];  // 添加海量点数据
					for (var i = 0; i < this.longitude.length; i++) {
						var point=new BMap.Point(this.longitude[i], this.latitude[i]);
						point.location=this.location[i];
						points.push(point);
					}
					var options = {
						size: BMAP_POINT_SIZE_BIG,
						shape: BMAP_POINT_SHAPE_WATERDROP,
						color: '#d340c3'
					};
					console.log("共有："+points.length+"个基站");
					var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
					// pointCollection.addEventListener('click', function (e) {
					//     alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
					// });

					pointCollection.addEventListener('click', (e)=> {
						var point = new BMap.Point(e.point.lng, e.point.lat);
						var opts = {
							width: 250,     // 信息窗口宽度
							height: 80,     // 信息窗口高度
							title: "基站位置：", // 信息窗口标题
							enableMessage: true//设置允许信息窗发送短息
						};
						var infoWindow = new BMap.InfoWindow(e.point.location+','+'经度：'+e.point.lng+','+'纬度：'+e.point.lat, opts);  // 创建信息窗口对象
						map.openInfoWindow(infoWindow, point); //开启信息窗口
					});
					map.addOverlay(pointCollection);  // 添加Overlay
				} else {
					alert('请在chrome、safari、IE8+以上浏览器查看本示例');
				}

			}
		},
		mounted() {
			console.log("进入mounted")
			map = new BMap.Map("container",{});
			// 创建地图实例
			var point = new BMap.Point(120.1522, 30.31919);
			// 创建点坐标
			map.centerAndZoom(point, 15);
			// 初始化地图，设置中心点坐标和地图级别
			map.enableScrollWheelZoom(true);
			map.addControl(new BMap.NavigationControl());
			map.addControl(new BMap.ScaleControl());
			map.addControl(new BMap.OverviewMapControl());
			map.addControl(new BMap.MapTypeControl());
			//这样做是因为需要等待created里的axios请求完成，感觉没法讲created和mounted里的操作搞成一个同步，
            // 默认就是异步的，所以只能用一个定时器了
			this.timer = setTimeout(this.fun1, 1000);
		},
		beforeDestroy() {
			clearTimeout(this.timer);
			console.log("进入beforeDestroy");
		}

	}
</script>

<style scoped>
    /*.wb2{*/
    /*    left:1000px;*/
    /*}*/
    /*html{height:100%}*/
    /*body{height:100%;margin:0px;padding:0px}*/
    /*#container{height:100%}*/
</style>



