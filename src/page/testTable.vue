<template>
    <div>
        <head-top></head-top>
        <el-input class="wb11" v-model="input" placeholder="请输入基站id" @keyup.enter.native="submit1"></el-input>
        <el-button id="wb12" type="primary" icon="el-icon-download" v-show="haveUrl"><a v-bind:href="excelUrl">下载</a></el-button>
        <el-alert
            id="wb13"
            v-show="haveAlert"
            title="请输入正确的基站id"
            style="width: 50%;height: 70px"
            type="warning"
            description="当前输入的基站id不存在，请正确输入"
            show-icon>
        </el-alert>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	export default {
		name: "testTable",
		components: {
			headTop,
		},
		data() {
			return {
				input:'',
				haveUrl:false,
				haveAlert:false,
				excelUrl:'',
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
		methods:{
			submit1(){
				this.$api.get('base_station_parameter/exprotTestForm', {
					'base_station_id': this.input,
				}, response => {
					if (response.status >= 200 && response.status < 300) {
						console.log(response.data);
						if (response.data.success) {
							console.log("success");
							this.haveUrl=true;
							this.haveAlert=false;
							this.excelUrl=response.data.excelurl;
						} else {
							console.log(response.data.message);
							this.haveUrl=false;
							this.haveAlert=true;
							this.excelUrl='';
						}

					} else {
						console.log(response.message);
					}
				});
			}
		}
	}
</script>

<style scoped>
    #wb13{
        position: relative;
        left:300px;
        top:300px;
    }
    #wb12{
        position: relative;
        left:480px;
        top:300px;
    }
    .wb11{
        position: relative;
        left:500px;
        top:300px;
        width: 300px;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
    }
</style>

