<template>
    <div>
        <head-top></head-top>
        <el-input class="wb1" v-model="input" placeholder="请输入基站id" @keyup.enter.native="getStations"></el-input>
        <el-button class="btn" type="primary" @click="getStations">搜索</el-button>
        <el-alert
            id="wb13"
            v-if="haveAlert"
            title="请输入正确的基站id"
            style="width: 50%;height: 70px"
            type="warning"
            description="当前输入的基站id不存在，请正确输入"
            show-icon>
        </el-alert>
        <el-table
            v-if="haveStations"
            :data="stations"
            style="width: 78%"
            height="260">
            <el-table-column
                prop="city"
                label="城市"
                width="150">
            </el-table-column>
            <el-table-column
                prop="district"
                label="行政区"
                width="120">
            </el-table-column>
            <el-table-column
                prop="location"
                label="位置"
                width="120">
            </el-table-column>
            <el-table-column
                prop="cover_type"
                label="覆盖类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="gNBID"
                label="基站id"
                width="120">
            </el-table-column>
            <el-table-column
                prop="TAC"
                label="TAC"
                width="120">
            </el-table-column>
            <el-table-column
                prop="PCI"
                label="PCI"
                width="120">
            </el-table-column>
            <el-table-column
                prop="longitude"
                label="经度"
                width="120">
            </el-table-column>
            <el-table-column
                prop="latitude"
                label="纬度"
                width="120">
            </el-table-column>


        </el-table>
    </div>
</template>

<script>
	import headTop from '../components/headTop'

	export default {
		name: "searchStation",
		components: {
			headTop,
		},
		data() {
			return {
				input: '',
				haveStations:false,
				haveAlert:false,
				stations: [],
			}
		},
		methods: {
			getStations() {
				this.$api.get('5G_info/searchStationById', {
					'stationId': this.input,
				}, response => {
					if (response.status >= 200 && response.status < 300) {
						console.log(response.data);
						if (response.data.success) {
							this.haveStations=true;
							this.haveAlert=false;
							this.stations=response.data.stations;
							console.log("success");
						} else {
							this.haveStations=false;
							this.haveAlert=true;
							console.log("fail");
						}

					} else {
						this.haveStations=false;
						this.haveAlert=true;
						console.log(response.message);
					}
				});
			}
		}
	}
</script>

<style scoped>
    .wb1 {
        width: 300px;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
    }
</style>
