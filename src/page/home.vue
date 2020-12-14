<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
<!--			<header class="section_title" style="color: #1d90e6">杭州5G基站管理系统</header>-->
			<!-- <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="6" ><div class="data_list today_head"><span class="data_num head">数据下载：</span></div></el-col>
				<el-col :span="4" ><div class="data_list" @click="report1"><span class="data_num">报告页</span> </div></el-col>
				<el-col :span="4"><div class="data_list" @click="report2"><span class="data_num">测试表格</span> </div></el-col> -->
			<!-- </el-row> -->
            <!-- <br>
            <el-row :gutter="20">
                <el-col :span="6"><div class="data_list all_head"><span class="data_num head">效果图：</span></div></el-col>
                <el-col :span="4"><div class="data_list" @click="show1"><span class="data_num">RSRP</span> </div></el-col>
                <el-col :span="4"><div class="data_list" @click="show2"><span class="data_num">Throughpur</span> </div></el-col>
                <el-col :span="4"><div class="data_list" @click="show3"><span class="data_num">SINR</span></div></el-col>
                <el-col :span="4"><div class="data_list" @click="show4"><span class="data_num">PCI</span></div></el-col>
            </el-row>
            <br> -->
            <!-- <StationShow_1 id="map1"></StationShow_1> -->
			<station-show id="map1"></station-show>

<!--            <el-table-->
<!--                :data="tableData"-->
<!--                style="width: 100%">-->
<!--                <el-table-column-->
<!--                    prop="date"-->
<!--                    label="日期"-->
<!--                    width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="name"-->
<!--                    label="姓名"-->
<!--                    width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="address"-->
<!--                    label="地址">-->
<!--                </el-table-column>-->
<!--            </el-table>-->
		</section>
<!--		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>-->

    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import StationShow_1 from '../components/station/StationShow_1'
	import StationShow from '../components/station/StationShow.vue'
	import tendency from '../components/tendency'
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
				tableData: [{
					date: '2020-06-02',
					name: 'wb',
					address: '浙江工业大学信息工程学院'
				}, {
					date: '2020-06-02',
					name: 'wb',
					address: '浙江工业大学信息工程学院'
				}, {
					date: '2020-06-02',
                        name: 'wb',
					address: '浙江工业大学信息工程学院'
				}, {
					date: '2020-06-02',
                        name: 'wb',
					address: '浙江工业大学信息工程学院'
				}]
    		}
    	},
    	components: {
    		headTop,
    		tendency,
            StationShow_1,
        	StationShow,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		report1(){
				this.$router.push('reportPage');
            },
			report2(){
				this.$router.push('testTable');
			},
			show1(){
				this.$router.push('rsrpShow');
			},
			show2(){
				this.$router.push('throughpurShow');
			},
			show3(){
				this.$router.push('sinrShow');
			},
			show4(){
				this.$router.push('pciShow');
			},
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
    			.then(res => {
    				this.userCount = res[0].count;
    				this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
    				apiArr[0].push(userCount(item))
    				apiArr[1].push(orderCount(item))
                    apiArr[2].push(adminDayCount(item))
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.status == 1) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
            get1(){
				this.$api.get('/uploads/4915882_2020-06-04.xls', {
				}, response => {
					if (response.status >= 200 && response.status < 300) {
						console.log("success");


					} else {
						console.log("fail");
					}
				});
			}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #7fc5e5;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
        // #map1{
        //     /*border-style:;*/
        //     /*width: 40%;*/
        //     /*height: 50%;*/
        // }
	}
    .wan{
        .sc(16px, #333)
    }

</style>
