<template>
    <div style="width: 100%;height: 100%">
        <head-top></head-top>
        <!--        <div v-show="haveMap1" style="width:600px;height:700px;margin:0;top:10px;left:10px" id="container"></div>-->
        <div class="interferenceShow-body" >
            <div class="left">
<!--                标题-->
                <div>
                    <h2> 覆盖性指标展示</h2>
                </div>
<!--               查询表单-->
                <div style="position: relative;top:10px">
                    <el-form :model="form" label-width="80px" style="">
                        <el-form-item label="热图参数">
                            <el-select v-model="form.theme" placeholder="请选择参数">
                                <el-option label="RRC建立请求" value="RRC_build_request_times"></el-option>
                                <el-option label="RRC建立成功" value="RRC_build_success_times"></el-option>
                                <el-option label="RRC重建请求" value="RRC_rebuild_request_times"></el-option>
                                <el-option label="上行可用的PRB" value="uplink_available_PRBnumber"></el-option>
                                <el-option label="下行可用的PRB" value="downlink_available_PRBnumber"></el-option>
                                <el-option label="上行实际平均占用PRB资源" value="uplink_occupy_PRBnumber"></el-option>
                                <el-option label="下行实际平均占用PRB资源" value="downlink_occupy_PRBnumber"></el-option>
                                <el-option label="小区内处于RRC连接状态的平均用户" value="RRC_connet_average_number"></el-option>
                                <el-option label="小区上行有效吞吐率(MBPS)" value="uplink_valid_MBPS"></el-option>
                                <el-option label="小区MAC层接收的上行数据总吞吐量（MBPS）" value="downlink_reception_total_MBPS"></el-option>
                                <el-option label="小区下行有效吞吐率(MBPS)" value="downlink_valid_MBPS"></el-option>
                                <el-option label="小区MAC层发送的下行数据总吞吐量（MBPS）" value="downlink_transmission_total_MBPS"></el-option>
                                <el-option label="小区MAC层上行数传的总时长（毫秒）" value="uplink_transmission_total_time"></el-option>
                                <el-option label="小区MAC层下行数传的总时长（毫秒）" value="downlink_transmission_total_time"></el-option>
                                <el-option label="小区中PDU会话正常释放的次数" value="PDU_normal_release"></el-option>
                                <el-option label="小区中PDU会话异常常释放的次数" value="PDU_abnormal_release"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="基站ID" style="width: 60%">
                            <el-input v-model="form.stationId"></el-input>
                        </el-form-item>
                        <el-form-item label="范围/公里" style="width: 60%">
                            <el-input v-model="form.range"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="showMap">查询</el-button>
                    </el-form>

                </div>
<!--                坐标展示-->
                <div style="position: relative;top:25px;width: 60%;">
                    <div>中心基站经纬度：</div>
                    <div style="position: relative;top:5px">
                        维度坐标：
                        <el-input class="positionshow"
                                  :placeholder="centerCoordinate.longitude"
                                  suffix-icon="el-icon-date">
                        </el-input>
                    </div>
                    <div style="position: relative;top:10px">
                        经度坐标：
                        <el-input class="positionshow"
                                  :placeholder="centerCoordinate.latitude"
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

                form:{
                    stationId: 4916192,
                    range:3,
                    theme:"RRC_build_request_times",
                },
                // options:[
                //     {value:'RRC',label:'RRC建立请求'},
                //     {value:'RrcSuccess',label:'RRC建立成功'},
                //     {value:'RrcRebuild',label:'RRC重建请求'},
                //     {value:'UpPrb',label:'上行可用的PRB'},
                //     {value:'DownRrc',label:'下行可用的PRB'},
                //     {value:'RealUpPrb',label:'上行实际平均占用PRB资源'},
                //     {value:'RealDownRrc',label:'下行实际平均占用PRB资源'},
                //     {value:'AverageRrcConnet',label:'小区内处于RRC连接状态的平均用户'},
                // ],
                // longitude: '',
                // latitude: '',
                location: [],
                count_max:2,
                centerCoordinate:{
                    longitude: '120.057000',
                    latitude: '30.255020',
                },
            }
        },
        methods: {
            showMap() {
                this.$api.get('5G_info/getHotMap', {
                    'stationId': this.form.stationId,
                    'range':this.form.range,
                    'theme':this.form.theme,//需要展示的参数类型
                }, response => {
                    console.log(response.data.centerStation);
                    console.log(response.data.count_max);
                    console.log(response.data.stations);
                    this.centerCoordinate.longitude=response.data.centerStation.longitude;
                    this.centerCoordinate.latitude=response.data.centerStation.latitude;
                    this.location=response.data.stations;
                    this.count_max=response.data.count_max;
                    this.showMap1();

                });
            },
            showMap1() {
                var map = new BMap.Map("container");          // 创建地图实例

                var point = new BMap.Point(this.centerCoordinate.longitude, this.centerCoordinate.latitude);
                map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(); // 允许滚轮缩放

                var points = this.location;


                if (!isSupportCanvas()) {
                    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
                }

                var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 25});//一个热圈的范围
                map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data: points, max: this.count_max});//max颜色深度,相对于count而言

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
            },
            countNumberOfBaseStations(){}
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
        width: 70%;

        /*style="width: 50%;height:70%;margin:0;position: absolute;left:300px"*/
    }
    .left{
        position: absolute;
        left: 5px;
        top:20px;
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



