<template>
<div>
    <head-top></head-top>
    <div class="condition">
        <div class="select">
            <label class="date">起始日期</label>
            <el-input class="input1" style="width: 190px;height:38px;" v-model="date" placeholder="Y/M/D"></el-input>
        </div>
        <div class="select">
            <label class="num">对象编号</label>
            <el-input class="input1" style="width: 190px;height:38px;" v-model="stationId" placeholder="请输入对象编号"></el-input>
        </div>
        <div class="select">
            <el-button class="btn" @click="showLineChart">查询</el-button>
        </div>
    </div>
    
    <div>
      <el-card style="marginTop:40px">
        <!-- 2.为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <span v-for="(item,k) in paramsName" :key="k" style="">
            <span :id="item" class="line"></span>
        </span>
      </el-card>
    </div>
    
</div>
</template>

<script>
import headTop from '../components/headTop';
import echarts from "echarts";
import _ from "lodash";

export default {
    name: "othersShow",
	components: {
		headTop,
    },
    data(){
        return {
            stationId: "",
            date: "",
            time:[],
            xtime:[],
            paramsName:[
                "RRC建立请求次数(次)",
                "RRC重建请求次数(次)",
                "RRC建立成功次数(次)",
                "无线连接成功率(%)",
                "NSA终端在gNBD E-RAB掉线率new（%）",
                "上行可用的PRB个数(个)",
                "上行实际平均占用PRB资源个数(个)",
                "上行PRB平均利用率(%)",
                "下行可用的PRB个数(个)",
                "下行实际平均占用PRB资源个数(个)",
                "下行PRB平均利用率(%)",
                "小区内处于RRC连接状态的平均用户数",
                "小区上行有效吞吐率(MBPS)",
                "小区MAC层接收的上行数据总吞吐量(MBPS)",
                "小区下行有效吞吐率(MBPS)",
                "小区MAC层发送的下行数据总吞吐量(MBPS)",
                "小区MAC层上行数传的总时长(毫秒)",
                "小区MAC层下行数传的总时长(毫秒)",
                "小区中PDU会话正常释放的次数",
                "小区中PDU会话异常释放的次数",
                "CQI高阶占比(%)",
                "CQI上报总数量(次)",
                ],
            params: {
                RRC_set_request:[],
                RRC_reset_request:[],
                RRC_success_request: [],
                coonect_success:[],
                connect_lost:[],
                ul_available_PRB:[],
                ul_average_PRB:[],
                ul_utilization_PRB:[],
                dl_available_PRB:[],
                dl_average_PRB:[],
                dl_utilization_PRB:[],
                RRC_connect_users:[],
                ul_MBPS:[],
                ul_total_MBPS:[],
                dl_MBPS:[],
                dl_total_MBPS:[],
                ul_transfer_time:[],
                dl_transfer_time:[],
                PDU_release_sucess:[],
                PDU_release_error:[],
                CQI_proportion:[],
                CQI_total:[],
            },
        }
    },

    // created(){
    //     this.showLineChart();
    // },

    methods:{
        showLineChart(){
            this.$api.get('5G_parameter/getStationData',{
                'stationId': this.stationId,
                // 'date':this.date
            },response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    if(response.data.success){
                        console.log(response.data);
                        var res = response.data.stationData;
                        console.log(res);
                        if(this.date){
                            var sDate =new Date(this.date).getTime();
                            var showArr = [];
                            var len = 0;
                            res.forEach(item => {
                                var d = new Date(item["parsing_time"]);
                                var timestamp = d.getTime();
                                var h = d.getHours();
                                if(timestamp >= sDate && h == 8){
                                    showArr.push(item);
                                }
                            });
                            console.log(showArr);
                            if(showArr.length < 10){
                                len = showArr.length;
                            }else{
                                len = 10;
                            }
                            for(var i=0;i<len;i++){
                                var timeArr = showArr[i]["parsing_time"].split(" ");
                                // console.log(timeArr);
                                this.time.push(timeArr[0]);
                                this.params.RRC_set_request.push(showArr[i]["RRC_build_request_times"]);
                                this.params.RRC_reset_request.push(showArr[i]["RRC_rebuild_request_times"]);
                                this.params.RRC_success_request.push(showArr[i]["RRC_build_success_times"]);
                                this.params.coonect_success.push(showArr[i]["wireless_connet_success_rate"]);
                                this.params.connect_lost.push(showArr[i]["ERAB_failure_rate"]);
                                this.params.ul_available_PRB.push(showArr[i]["uplink_available_PRBnumber"]);
                                this.params.ul_average_PRB.push(showArr[i]["uplink_occupy_PRBnumber"]);
                                this.params.ul_utilization_PRB.push(showArr[i]["uplink_PRBrate"]);
                                this.params.dl_available_PRB.push(showArr[i]["downlink_available_PRBnumber"]);
                                this.params.dl_average_PRB.push(showArr[i]["downlink_occupy_PRBnumber"]);
                                this.params.dl_utilization_PRB.push(showArr[i]["downlink_PRBrate"]);
                                this.params.RRC_connect_users.push(showArr[i]["RRC_connet_average_number"]);
                                this.params.ul_MBPS.push(showArr[i]["uplink_valid_MBPS"]);
                                this.params.ul_total_MBPS.push(showArr[i]["uplink_reception_total_MBPS"]);
                                this.params.dl_MBPS.push(showArr[i]["downlink_valid_MBPS"]);
                                this.params.dl_total_MBPS.push(showArr[i]["downlink_transmission_total_MBPS"]);
                                this.params.ul_transfer_time.push(showArr[i]["uplink_transmission_total_time"]);
                                this.params.dl_transfer_time.push(showArr[i]["downlink_transmission_total_time"]);
                                this.params.PDU_release_sucess.push(showArr[i]["PDU_normal_release"]);
                                this.params.PDU_release_error.push(showArr[i]["PDU_abnormal_release"]);
                                this.params.CQI_proportion.push(showArr[i]["CQI_high_order_rate"]);
                                this.params.CQI_total.push(showArr[i]["CQI_total_quantity"]);
                            }
                        }
                        
                        console.log(this.params);
                        console.log(this.time);

                        this.draw();
                        // 每次画完图后要清空数组，否则变更id后数据会和之前的累加在一起
                        this.time=[];
                        var keys = Object.keys(this.params);
                        for(var i=0;i<keys.length;i++){
                            this.params[keys[i]] = [];
                        }
                    }
                    else{
                        // console.log(response.data);
                        alert("无此基站id数据，请重新输入");
                    }
                }
            })
        },

        draw(){
            // 获取所有的键组成的字符串数组
            var keys = Object.keys(this.params);
            for(var i=0;i<keys.length;i++){
                var myChart1 = echarts.init(document.getElementById(this.paramsName[i]));
                var option1 = {
                    title: {
                        text: this.paramsName[i],
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick:{
                            show:false
                        },
			        	data: this.time,
                    },
                    yAxis: {
                        type: 'value',
                        axisTick:{
                            show:false
                        },
                    },
                    grid: {
                        left: 65
                    },
                    series:[
                        {
			        	    name:this.paramsName[i],
			        	    type:'line',
			        	    data:this.params[keys[i]],   // 获取params里第i个属性值
			        	},]
                };
                myChart1.setOption(option1);
                console.log("draw success");
            }
        },
    },
}
</script>

<style scoped>
.line{
    width: 520px;
    height: 300px;
    display: inline-block;
    /* margin: 0 10px; */
}
/* .date{
    float: left;
    display: block;
    padding: 9px 15px;
    width: 80px;
    font-weight: 400;
    line-height: 20px;
    text-align: right;
} */
.num{
    margin-right: 10px;
}
.btn{
    display: inline-block;
    height: 38px;
    line-height: 38px;
    padding: 0 18px;
    background-color: #4488ca;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}
.btn:hover{
    opacity: .8;
    color:#fff;
}
.select{
    display: inline-block;
    position: relative;
    margin-top: 33px;
    margin-right: 100px;
}
.condition {
    margin-left:15%;
}
</style>