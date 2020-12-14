<template>
<div style="">
    <head-top></head-top>
    <div class="condition1">
        <div class="select">
            <label class="date">起始日期</label>
            <el-input class="input1" style="width: 190px;height:38px;" v-model="date" placeholder="Y/M/D"></el-input>
        </div>
    </div>
    <div class="condition1">
        <div class="select">
            <label class="num">对象编号</label>
            <el-input class="input1" style="width: 190px;height:38px;" v-model="stationId" placeholder="请输入对象编号"></el-input>
        </div>
        <div class="select">
            <el-button class="btn1" @click="showLineChart">查询</el-button>
        </div>
    </div>
    <div class="condition2">
        <label class="parameter">参数</label>
        <el-select class="select" v-model="theme" clearable placeholder="请选择参数">
            <el-option label="RRC建立请求次数" value="RRC建立请求次数(次)"></el-option>
            <el-option label="RRC建立成功次数" value="RRC建立成功次数(次)"></el-option>
            <el-option label="RRC重建请求次数" value="RRC重建请求次数(次)"></el-option>
            <el-option label="无线连接成功率" value="无线连接成功率(%)"></el-option>
            <el-option label="NSA终端在gNBD E-RAB掉线率" value="NSA终端在gNBD E-RAB掉线率new（%）"></el-option>
            <el-option label="上行可用的PRB" value="上行可用的PRB个数(个)"></el-option>
            <el-option label="下行可用的PRB" value="下行可用的PRB个数(个)"></el-option>
            <el-option label="上行实际平均占用PRB资源" value="上行实际平均占用PRB资源个数(个)"></el-option>
            <el-option label="下行实际平均占用PRB资源" value="下行实际平均占用PRB资源个数(个)"></el-option>
            <el-option label="上行PRB平均利用率" value="上行PRB平均利用率(%)"></el-option>
            <el-option label="下行PRB平均利用率" value="下行PRB平均利用率(%)"></el-option>
            <el-option label="小区内处于RRC连接状态的平均用户" value="小区内处于RRC连接状态的平均用户数"></el-option>
            <el-option label="小区上行有效吞吐率(MBPS)" value="小区上行有效吞吐率(MBPS)"></el-option>
            <el-option label="小区MAC层接收的上行数据总吞吐量（MBPS）" value="小区MAC层接收的上行数据总吞吐量(MBPS)"></el-option>
            <el-option label="小区下行有效吞吐率(MBPS)" value="小区下行有效吞吐率(MBPS)"></el-option>
            <el-option label="小区MAC层发送的下行数据总吞吐量（MBPS）" value="小区MAC层发送的下行数据总吞吐量(MBPS)"></el-option>
            <el-option label="小区MAC层上行数传的总时长（毫秒）" value="小区MAC层上行数传的总时长(毫秒)"></el-option>
            <el-option label="小区MAC层下行数传的总时长（毫秒）" value="小区MAC层下行数传的总时长(毫秒)"></el-option>
            <el-option label="小区中PDU会话正常释放的次数" value="小区中PDU会话正常释放的次数"></el-option>
            <el-option label="小区中PDU会话异常释放的次数" value="小区中PDU会话异常释放的次数"></el-option>
            <el-option label="CQI高阶占比" value="CQI高阶占比(%)"></el-option>
            <el-option label="CQI上报总数量" value="CQI上报总数量(次)"></el-option>
            <el-option label="全选" value="All"></el-option>
        </el-select>
            <!-- <el-link @click="add" class="add">添加</el-link> -->
        <el-button class="btn2" @click="filterLineChart(theme)">筛选</el-button>
    </div>
    
    <div>
      <el-card style="marginTop:30px;">
        <!-- 2.为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <span v-for="(item,k) in paramsName" :key="k" style="">
            <span :id="item.name" class="line" v-show="item.show"></span>
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
            // isShow:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            theme:"",
            stationId: "",
            date: "",
            time:[],
            xtime:[],
            paramsName:[
                {name:"RRC建立请求次数(次)",show:true},
                {name:"RRC建立成功次数(次)",show:true},
                {name:"RRC重建请求次数(次)",show:true},
                {name:"无线连接成功率(%)",show:true},
                {name:"NSA终端在gNBD E-RAB掉线率new（%）",show:true},
                {name:"上行可用的PRB个数(个)",show:true},
                {name:"上行实际平均占用PRB资源个数(个)",show:true},
                {name:"上行PRB平均利用率(%)",show:true},
                {name:"下行可用的PRB个数(个)",show:true},
                {name:"下行实际平均占用PRB资源个数(个)",show:true},
                {name:"下行PRB平均利用率(%)",show:true},
                {name:"小区内处于RRC连接状态的平均用户数",show:true},
                {name:"小区上行有效吞吐率(MBPS)",show:true},
                {name:"小区MAC层接收的上行数据总吞吐量(MBPS)",show:true},
                {name:"小区下行有效吞吐率(MBPS)",show:true},
                {name:"小区MAC层发送的下行数据总吞吐量(MBPS)",show:true},
                {name:"小区MAC层上行数传的总时长(毫秒)",show:true},
                {name:"小区MAC层下行数传的总时长(毫秒)",show:true},
                {name:"小区中PDU会话正常释放的次数",show:true},
                {name:"小区中PDU会话异常释放的次数",show:true},
                {name:"CQI高阶占比(%)",show:true},
                {name:"CQI上报总数量(次)",show:true},
                ],
            params: {
                RRC_set_request:[],
                RRC_success_request: [],
                RRC_reset_request:[],
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

    mounted(){
        // window.addEventListener('resize', this.resizeHandler);
        // },
        // beforeDestroy() { // 清理工作 避免内存泄漏
        // // 销毁监听事件
        // window.removeEventListener('resize', this.resizeHandler);
        // // 销毁 Echarts 实例
        // this.chart.dispose();
        document.addEventListener('cilck',this.filterLineChart);
    },

    methods:{
        showLineChart(){
            this.$api.get('5G_parameter/getStationData',{
                'stationId': this.stationId,
                'date':this.date
            },response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    if(response.data.success){
                        console.log(response.data);
                        var res = response.data.stationData;
                        console.log(res);
                        // if(this.date){
                            var showArr = [];
                            for(var i = 0; i < res.length; i++){
                                var timeArr = res[i]["parsing_time"].split(" ");
                                if(timeArr[1] == '8:00'){
                                    res[i]["parsing_time"] = timeArr[0];
                                    showArr.push(res[i]);
                                }
                            }
                            console.log(showArr);
                            for(var i=0;i<showArr.length;i++){
                                // var timeArr = showArr[i]["parsing_time"].split(" ");
                                // console.log(timeArr);
                                this.time.push(showArr[i]["parsing_time"]);
                                this.params.RRC_set_request.push(showArr[i]["RRC_build_request_times"]);
                                this.params.RRC_success_request.push(showArr[i]["RRC_build_success_times"]);
                                this.params.RRC_reset_request.push(showArr[i]["RRC_rebuild_request_times"]);
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
                        // }
                        
                        console.log(this.params);
                        console.log(this.time);

                        for(var i = 0; i < this.paramsName.length; i++){
                            this.paramsName[i].show = true;
                        }
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
                        alert(response.data.message);
                    }
                }
            })
        },

        draw(){
            // 获取所有的键组成的字符串数组
            var keys = Object.keys(this.params);
            for(var i=0;i<keys.length;i++){
                var myChart1 = echarts.init(document.getElementById(this.paramsName[i].name));
                var option1 = {
                    title: {
                        text: this.paramsName[i].name,
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
			        	    name:this.paramsName[i].name,
			        	    type:'line',
			        	    data:this.params[keys[i]],   // 获取params里第i个属性值
			        	},]
                };
                myChart1.setOption(option1);
                //根据窗口的大小变动图表 --- 重点
                window.onresize = function(){
                    myChart1.resize();
                }
                console.log("draw success");
            }
        },
        filterLineChart(theme){
            if(theme == 'All' || theme == ''){
                for(var i = 0; i < this.paramsName.length; i++){
                    this.paramsName[i].show = true;
                }
            }else{
                for(var i = 0; i < this.paramsName.length; i++){
                    if(this.paramsName[i].name == theme){
                        this.paramsName[i].show = true;
                        continue;
                    }
                    this.paramsName[i].show = false;
                }
            }

            // this.showLineChart();
        },
        add(){
            console.log(1);
        },
        resizeHandler() {
            this.chart.resize();
        },
    },
}
</script>

<style scoped>
.line{
    min-width: 500px;
    /* width: 50%; */
    height: 300px;
    display: inline-block;
    /* margin: 0 auto; */
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
.num,.date,.parameter{
    margin-right: 10px;
}
.btn1,.btn2{
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
.btn1,.btn2 :hover{
    opacity: .8;
    color:#fff;
}
.select{
    display: inline-block;
    position: relative;
    margin-top: 15px;
    margin-right: 50px;
}
.condition1,.condition2 {
    margin-left:10%;
    /* text-align: center; */
}
.add{
    position: relative;
    /* font-weight: 600; */
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    transition: color .3s ease;
    cursor: pointer;
}
/* .add::after {
  --scale: 0;
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 3px;
  background: #4c81c9;
  -webkit-transform: scaleX(var(--scale));
          transform: scaleX(var(--scale));
  -webkit-transform-origin: var(--x) 50%;
          transform-origin: var(--x) 50%;
  transition: -webkit-transform 0.3s cubic-bezier(0.535, 0.05, 0.355, 1);
  transition: transform 0.3s cubic-bezier(0.535, 0.05, 0.355, 1);
  transition: transform 0.3s cubic-bezier(0.535, 0.05, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.535, 0.05, 0.355, 1);
} */
.add:hover {
  color: #4c81c9;
  text-decoration: underline;
}
/* .add:hover::after {
  --scale: 1;
} */
</style>