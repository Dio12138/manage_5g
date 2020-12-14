<template>
    <div style="width: 100%;height: 100%">
        <el-input placeholder="请输入搜索地址" v-model="address" style="width: 15em"></el-input>
        <el-button type="primary" icon="el-icon-delete" @click="getMap_onePoint">搜索</el-button>
        <div style="width:100%;height:750px;margin-right:20px;margin-top: 20px" id="container"></div>
    </div>
</template>

<script>
    import iconCar3 from '../../assets/img/jizhan1.png';
    var map;
    export default {
        name: "StationShow",
        data() {
            return {
                longitude: '',
                latitude: '',
                location: '',
                data: {},
                from: "",
                to: "",
                isOK: false,
                timer: '',
                address:'4916192',

            }
        },
        methods: {
            searchAddress() {
                var local = new BMap.LocalSearch(map, {
                    renderOptions: {map: map}
                });
                local.search(this.address);
            },
            getMap_onePoint(){
                this.$api.get('5G_info/searchStationById', {"stationId":this.address}, response => {
                    if (response.status >= 200 && response.status < 300) {
                        console.log(response.data);
                        if (response.data.success) {
                            this.data = response.data;
                            // this.longitude.push(response.data.stations[0].longitude);
                            // this.latitude.push(response.data.stations[0].latitude);
                            // this.location.push(response.data.stations[0].location);
                            this.longitude = response.data.stations[0].longitude;
                            this.latitude = response.data.stations[0].latitude;
                            this.location = response.data.stations[0].location;
                            this.isOK = true;
                            this.showMap();
                            // console.log(this.isOK);
                        } else {
                            console.log("222");
                        }

                    } else {
                        console.log(response.message);
                    }
                });
            },
            showMap(){
                map = new BMap.Map("container",{});
                // 创建地图实例
                var point = new BMap.Point(this.longitude, this.latitude);
                // 创建点坐标
                map.centerAndZoom(point, 15);
                // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true);
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl());
                map.addControl(new BMap.MapTypeControl());
                var mySize = new BMap.Size(50, 50);
                var myIcon = new BMap.Icon(iconCar3, mySize, { //会以base64的方式传参iconCar
                    //这行不加，自定义图片就会出问题
                    imageSize: mySize
                });
                var mk = new BMap.Marker(point, {
                    icon: myIcon
                });

                map.addOverlay(mk);//将标注添加到地图中
            },
        },
        mounted() {
            console.log("进入mounted")
            // this.getMap();
            this.getMap_onePoint();
        },
        beforeDestroy() {
            clearTimeout(this.timer);
            console.log("进入beforeDestroy");
        }

    }
</script>

<style scoped>

</style>




