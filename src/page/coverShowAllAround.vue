<template>
    <div style="width: 100%;height: 100%">
        <head-top></head-top>
        <!--        <div v-show="haveMap1" style="width:600px;height:700px;margin:0;top:10px;left:10px" id="container"></div>-->
        <div class="interferenceShow-body" >
            <div class="up">
                <!--                标题-->
                <div>
                    <h2> 全范围覆盖性指标展示</h2>
                </div>
                <!--               查询表单-->
                <div style="position: relative;top:10px">
                    <el-form :model="form" :inline="true" :rules="rules" label-width="80px" style="">
                        <el-form-item label="热图参数" prop="theme">
                            <el-select v-model="form.theme" placeholder="请选择参数">
                                <el-option label="RRC建立请求" value="RRC_build_request_times"></el-option>
                                <el-option label="RRC建立成功" value="RRC_build_success_times"></el-option>
                                <el-option label="RRC重建请求" value="RRC_rebuild_request_times"></el-option>
                                <el-option label="无线连接成功率" value="wireless_connet_success_rate"></el-option>
                                <el-option label="NSA终端在gNBD E-RAB掉线率" value="ERAB_failure_rate"></el-option>
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
                                <el-option label="CQI高阶占比(%)" value="CQI_high_order_rate"></el-option>
                                <el-option label="CQI上报总数量(次)" value="CQI_total_quantity"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="稀疏度" prop="density">
                            <el-input v-model.number="form.density"></el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="time">
                            <div>
                                <el-date-picker
                                    v-model="form.time"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy/M/d"
                                    value-format="yyyy_M_d">
                                </el-date-picker>
                                <el-button type="primary" @click="showMap">查询</el-button>
                            </div>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
            <div class="down" id="container" v-loading="loading" element-loading-text="拼命加载中"></div>
        </div>
    </div>
</template>

<script>
    import iconCar3 from '../assets/img/jizhan1.png';
    import headTop from '../components/headTop';

    export default {
        name: "coverShowAllAround",
        components: {
            headTop,
        },
        data() {
            var validator1 = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('稀疏度不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入整数数字，推荐：5-20'));
                    } else {
                        if (value < 0 || value > 100) {
                            callback(new Error('建议大于0并小于100'));
                        } else {
                            callback();
                        }
                    }
                }, 100);
            };
            return {
                loading: false,
                form:{
                    stationId: 4916192,//无
                    range:1,//无
                    theme:"PDU_abnormal_release",
                    time:"",
                    density:5,
                },
                dateTime:'',
                rules:{
                    theme:[
                        { required: true, message: '请选择热图参数', trigger: 'blur' },
                        ],
                    time:[
                        { type: 'date',required: true, message: '请选择时间', trigger: 'blur' },
                        ],
                    density:[
                        { required: true, validator: validator1, trigger: 'blur' },
                    ]
                },
                location: [],
                count_max:2,
                centerCoordinate:{
                    longitude: '120.153000',
                    latitude: '30.275800',
                },
            }
        },
        methods: {
            showMap() {
                this.loading= true;
                console.log(this.form.time);
                this.changeTime()
                this.$api.get('5G_info/getAllHotMap', {
                    // 'stationId': this.form.stationId,
                    // 'range':this.form.range,
                    'theme':this.form.theme,//需要展示的参数类型
                    'time':this.dateTime,
                    'density':this.form.density
                }, response => {
                    console.log(response.data.success);
                    if(response.data.success == true){console.log(response.data.count_max);
                        this.location=response.data.stations;
                        this.count_max=response.data.count_max;
                        this.showMap1();
                        this.loading=false;}
                    else {
                        this.loading=false;
                        this.open2(response.data.message);
                        console.log(response.data.message);
                    }
                });
            },
            showMap1() {
                var map = new BMap.Map("container");          // 创建地图实例

                var point = new BMap.Point(this.centerCoordinate.longitude, this.centerCoordinate.latitude);
                map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(); // 允许滚轮缩放
                //先展示海量点
                this.fun1(map);

                for(var i = 0;i<this.location.length;i++){
                    this.location[i].count = Math.round(Number(this.location[i].count))
                }
                console.log(this.location);
                var points = this.location;


                if (!isSupportCanvas()) {
                    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
                }

                var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 25});//一个热圈的范围
                map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data: points, max: this.count_max});//max颜色深度,相对于count而言

                //是否显示热力图,延迟1秒是为了让热力图在海量点图上面
                function openHeatmap() {
                    heatmapOverlay.show();
                }
                setGradient();
                this.timer = setTimeout(openHeatmap(), 3000);

                function setGradient() {
                    var gradient = {
                        0.00001: "rgb(0,0,25)",
                        0.001: "rgb(0,0,40)",
                        0.25: "rgb(0,0,255)",
                        0.45: "rgb(0,100,255)",
                        0.55: "rgb(0,255,0)",
                        0.65: "rgb(150,255,0)",
                        0.78: "rgb(255,255,0)",
                        0.90: "rgb(250,100,0)",
                        1: "rgb(255,0,0)"
                    };
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

            fun1(map) {
                if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
                    var points = [];  // 添加海量点数据
                    for (var i = 0; i < this.location.length; i++) {
                        var point=new BMap.Point(this.location[i].lng, this.location[i].lat);
                        point.count=this.location[i].count;
                        point.location=this.location[i].location;
                        points.push(point);
                    }
                    var options = {
                        size: BMAP_POINT_SIZE_SMALL,
                        shape: BMAP_POINT_SHAPE_WATERDROP,
                        color: '#d340c3'
                    };
                    console.log("共有："+points.length+"个基站");
                    var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection

                    pointCollection.addEventListener('click', (e)=> {
                        var point = new BMap.Point(e.point.lng, e.point.lat);
                        var opts = {
                            width: 250,     // 信息窗口宽度
                            height: 120,     // 信息窗口高度
                            title: "基站位置与参数信息：", // 信息窗口标题
                            enableMessage: true//设置允许信息窗发送短息
                        };
                        var infoWindow = new BMap.InfoWindow('<p>经度:'+e.point.lng+','+'纬度:'+e.point.lat+'</p>参数值:'+e.point.count+'<p>地名:'+e.point.location+'<\p>', opts);  // 创建信息窗口对象
                        map.openInfoWindow(infoWindow, point); //开启信息窗口
                    });
                    map.addOverlay(pointCollection);  // 添加Overlay
                } else {
                    alert('请在chrome、safari、IE8+以上浏览器查看本示例');
                }

            },
            changeTime(){
                var dateBegin = this.form.time;
                var date1 = new Date(dateBegin);
                var yy = date1.getFullYear() + "_";
                var mm =
                    (date1.getMonth() + 1 < 10
                        ? date1.getMonth() + 1
                        : date1.getMonth() + 1) + "_";
                var dd = date1.getDate();
                this.dateTime = yy + mm + dd;
                console.log(this.dateTime);
            },
            //弹窗
            open2(message) {
                this.$notify.info({
                    title: '消息',
                    message: message,
                });
            },
            setDefaultTime(){
                var DefaultTime = new Date();
                DefaultTime.setFullYear(2020,4,13);
                this.form.time = DefaultTime;
            }

        },
        mounted() {
            //加载热力图js
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js';
            document.body.appendChild(s);
            this.setDefaultTime();
            //获取数据
            this.showMap();
        }
    }
</script>

<style scoped>
    .interferenceShow-body{
        width: 100%;
        height: 100%;
        display: flex;
        position: absolute;
        top:80px;
    }
    .up{
        position: absolute;
        left:1px;
    }
    .down{
        position: absolute;
        left:1px;
        top:100px;
        height: 80%;
        width: 80%;
    }
</style>




