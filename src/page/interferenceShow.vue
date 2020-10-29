<template>
    <div style="width: 100%;height: 100%">
        <head-top></head-top>
        <!--        <div v-show="haveMap1" style="width:600px;height:700px;margin:0;top:10px;left:10px" id="container"></div>-->
        <div v-show="true" class="interferenceShow-body" >
            <div style="margin-top: 8px;">
                <el-input class="input1" style="width: 100%;height:5%;margin:0;left:10px" v-model="stationId" placeholder="请输入基站id" @keyup.enter.native="showMap">
                    <template slot="prepend">基站ID</template>
                    <el-button slot="append" icon="el-icon-search">搜索</el-button>
                </el-input>
                <el-alert
                    v-show="haveAlert1"
                    title="请输入正确的基站id"
                    style="width: 50%;height: 70px"
                    type="warning"
                    description="当前输入的基站id不存在，请正确输入"
                    show-icon>
                </el-alert>
            </div>
            <div class="left">
<!--                详细信息-->
                <el-table
                        :data="data"
                        height="150"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="ip"
                            label="端口ID"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="position"
                            label="位置消息"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="操作">
                        </el-table-column>
                    </el-table>
                <div style="position: relative;top:10px">
                    <div>当前中心经纬度：</div>
                    <div style="position: relative;top:5px">
                        x坐标：
                        <el-input class="positionshow"
                                   placeholder="116.418261"
                                   suffix-icon="el-icon-date">
                         </el-input>
                    </div>
                    <div style="position: relative;top:10px">
                        y坐标：
                        <el-input class="positionshow"
                                  placeholder="39.921984"
                                  prefix-icon="el-icon-search">
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="right" id="container"></div>
        </div>
    </div>
</template>

<script>
    import iconCar3 from '../assets/img/jizhan1.png';
    import headTop from '../components/headTop';

    export default {
        name: "interferenceShow",
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
                pci:[],
                longitudeArr:[],
                latitudeArr:[],
            }
        },
        methods: {
            showMap() {
                this.$api.get('DY_DATE/getMovingPciById', {
                    'stationId': this.stationId,
                }, response => {
                    if (response.status >= 200 && response.status < 300) {
                        console.log(response.data);
                        if (response.data.success1) {
                            if(response.data.success2){
                                this.longitude = response.data.stations.longitude;
                                this.latitude = response.data.stations.latitude;
                                this.pci = response.data.pci;
                                this.longitudeArr=response.data.longitudeArr;
                                this.latitudeArr=response.data.latitudeArr;
                                this.haveMap1=true;
                                this.haveAlert1=false;
                                console.log(response.data.message);
                                this.showMap1();
                            }else{
                                this.longitude = response.data.stations.longitude;
                                this.latitude = response.data.stations.latitude;
                                this.pci =[];
                                this.longitudeArr=[];
                                this.latitudeArr=[];
                                this.haveMap1=true;
                                this.haveAlert1=false;
                                console.log(response.data.message);
                                this.showMap1();
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
            showMap1() {
                var map = new BMap.Map("container");          // 创建地图实例

                var point = new BMap.Point(116.418261, 39.921984);
                map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(); // 允许滚轮缩放

                var points = [
                    {"lng": 116.418261, "lat": 39.921984, "count": 50},
                    {"lng": 116.423332, "lat": 39.916532, "count": 51},
                    {"lng": 116.419787, "lat": 39.930658, "count": 15},
                    {"lng": 116.418455, "lat": 39.920921, "count": 40},
                    {"lng": 116.418843, "lat": 39.915516, "count": 100},
                    {"lng": 116.42546, "lat": 39.918503, "count": 6},
                    {"lng": 116.423289, "lat": 39.919989, "count": 18},
                    {"lng": 116.418162, "lat": 39.915051, "count": 80},
                    {"lng": 116.422039, "lat": 39.91782, "count": 11},
                    {"lng": 116.41387, "lat": 39.917253, "count": 7},
                    {"lng": 116.41773, "lat": 39.919426, "count": 42},
                    {"lng": 116.421107, "lat": 39.916445, "count": 4},
                    {"lng": 116.417521, "lat": 39.917943, "count": 27},
                    {"lng": 116.419812, "lat": 39.920836, "count": 23},
                    {"lng": 116.420682, "lat": 39.91463, "count": 60},
                    {"lng": 116.415424, "lat": 39.924675, "count": 8},
                    {"lng": 116.419242, "lat": 39.914509, "count": 15},
                    {"lng": 116.422766, "lat": 39.921408, "count": 25},
                    {"lng": 116.421674, "lat": 39.924396, "count": 21},
                    {"lng": 116.427268, "lat": 39.92267, "count": 1},
                    {"lng": 116.417721, "lat": 39.920034, "count": 51},
                    {"lng": 116.412456, "lat": 39.92667, "count": 7},
                    {"lng": 116.420432, "lat": 39.919114, "count": 11},
                    {"lng": 116.425013, "lat": 39.921611, "count": 35},
                    {"lng": 116.418733, "lat": 39.931037, "count": 22},
                    {"lng": 116.419336, "lat": 39.931134, "count": 4},
                    {"lng": 116.413557, "lat": 39.923254, "count": 5},
                    {"lng": 116.418367, "lat": 39.92943, "count": 3},
                    {"lng": 116.424312, "lat": 39.919621, "count": 100},
                    {"lng": 116.423874, "lat": 39.919447, "count": 87},
                    {"lng": 116.424225, "lat": 39.923091, "count": 32},
                    {"lng": 116.417801, "lat": 39.921854, "count": 44},
                    {"lng": 116.417129, "lat": 39.928227, "count": 21},
                    {"lng": 116.426426, "lat": 39.922286, "count": 80},
                    {"lng": 116.421597, "lat": 39.91948, "count": 32},
                    {"lng": 116.423895, "lat": 39.920787, "count": 26},
                    {"lng": 116.423563, "lat": 39.921197, "count": 17},
                    {"lng": 116.417982, "lat": 39.922547, "count": 17},
                    {"lng": 116.426126, "lat": 39.921938, "count": 25},
                    {"lng": 116.42326, "lat": 39.915782, "count": 100},
                    {"lng": 116.419239, "lat": 39.916759, "count": 39},
                    {"lng": 116.417185, "lat": 39.929123, "count": 11},
                    {"lng": 116.417237, "lat": 39.927518, "count": 9},
                    {"lng": 116.417784, "lat": 39.915754, "count": 47},
                    {"lng": 116.420193, "lat": 39.917061, "count": 52},
                    {"lng": 116.422735, "lat": 39.915619, "count": 100},
                    {"lng": 116.418495, "lat": 39.915958, "count": 46},
                    {"lng": 116.416292, "lat": 39.931166, "count": 9},
                    {"lng": 116.419916, "lat": 39.924055, "count": 8},
                    {"lng": 116.42189, "lat": 39.921308, "count": 11},
                    {"lng": 116.413765, "lat": 39.929376, "count": 3},
                    {"lng": 116.418232, "lat": 39.920348, "count": 50},
                    {"lng": 116.417554, "lat": 39.930511, "count": 15},
                    {"lng": 116.418568, "lat": 39.918161, "count": 23},
                    {"lng": 116.413461, "lat": 39.926306, "count": 3},
                    {"lng": 116.42232, "lat": 39.92161, "count": 13},
                    {"lng": 116.4174, "lat": 39.928616, "count": 6},
                    {"lng": 116.424679, "lat": 39.915499, "count": 21},
                    {"lng": 116.42171, "lat": 39.915738, "count": 29},
                    {"lng": 116.417836, "lat": 39.916998, "count": 99},
                    {"lng": 116.420755, "lat": 39.928001, "count": 10},
                    {"lng": 116.414077, "lat": 39.930655, "count": 14},
                    {"lng": 116.426092, "lat": 39.922995, "count": 16},
                    {"lng": 116.41535, "lat": 39.931054, "count": 15},
                    {"lng": 116.413022, "lat": 39.921895, "count": 13},
                    {"lng": 116.415551, "lat": 39.913373, "count": 17},
                    {"lng": 116.421191, "lat": 39.926572, "count": 1},
                    {"lng": 116.419612, "lat": 39.917119, "count": 9},
                    {"lng": 116.418237, "lat": 39.921337, "count": 54},
                    {"lng": 116.423776, "lat": 39.921919, "count": 26},
                    {"lng": 116.417694, "lat": 39.92536, "count": 17},
                    {"lng": 116.415377, "lat": 39.914137, "count": 19},
                    {"lng": 116.417434, "lat": 39.914394, "count": 43},
                    {"lng": 116.42588, "lat": 39.922622, "count": 27},
                    {"lng": 116.418345, "lat": 39.919467, "count": 8},
                    {"lng": 116.426883, "lat": 39.917171, "count": 3},
                    {"lng": 116.423877, "lat": 39.916659, "count": 34},
                    {"lng": 116.415712, "lat": 39.915613, "count": 14},
                    {"lng": 116.419869, "lat": 39.931416, "count": 12},
                    {"lng": 116.416956, "lat": 39.925377, "count": 11},
                    {"lng": 116.42066, "lat": 39.925017, "count": 38},
                    {"lng": 116.416244, "lat": 39.920215, "count": 91},
                    {"lng": 116.41929, "lat": 39.915908, "count": 54},
                    {"lng": 116.422116, "lat": 39.919658, "count": 21},
                    {"lng": 116.4183, "lat": 39.925015, "count": 15},
                    {"lng": 116.421969, "lat": 39.913527, "count": 3},
                    {"lng": 116.422936, "lat": 39.921854, "count": 24},
                    {"lng": 116.41905, "lat": 39.929217, "count": 12},
                    {"lng": 116.424579, "lat": 39.914987, "count": 57},
                    {"lng": 116.42076, "lat": 39.915251, "count": 70},
                    {"lng": 116.425867, "lat": 39.918989, "count": 8}];


                if (!isSupportCanvas()) {
                    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
                }

                var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
                map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data: points, max: 100});

                //是否显示热力图
                function openHeatmap() {
                    heatmapOverlay.show();
                }

                function closeHeatmap() {
                    heatmapOverlay.hide();
                }

                openHeatmap();

                function setGradient() {
                    /*格式如下所示:
                   {
                         0:'rgb(102, 255, 0)',
                         .5:'rgb(255, 170, 0)',
                         1:'rgb(255, 0, 0)'
                   }*/
                    var gradient = {};
                    var colors = document.querySelectorAll("input[type='color']");
                    colors = [].slice.call(colors, 0);
                    colors.forEach(function (ele) {
                        gradient[ele.getAttribute("data-key")] = ele.value;
                    });
                    heatmapOverlay.setOptions({"gradient": gradient});
                }

                //判断浏览区是否支持canvas
                function isSupportCanvas() {
                    var elem = document.createElement('canvas');
                    return !!(elem.getContext && elem.getContext('2d'));
                }
            }
        },
        mounted() {
            //加载热力图js
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js';
            document.body.appendChild(s);
            //获取数据
            this.showMap();
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
    .interferenceShow-body{
        width: 100%;
        height: 100%;
        display: flex;
        position: absolute;
        top:80px
    }
    .right{
        position: absolute;
        right:1px;
        height: 80%;
        width: 60%;

        /*style="width: 50%;height:70%;margin:0;position: absolute;left:300px"*/
    }
    .left{
        position: absolute;
        left: 5px;
        top:100px;
        width: 39%;
    }
    .positionshow{
        position: relative;
        width: 50%;
    }
    /*#container{*/
    /*    display: inline-block;*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    top:100px*/
    /*}*/
</style>



