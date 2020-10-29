<template>
  <div>
    <head-top></head-top>
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="input"
            placeholder="请输入基站id"
            @keyup.enter.native="getStations"
          ></el-input>
        </el-col>
        <el-button type="primary" @click="getStations">查询</el-button>
      </el-row>
    </el-card>
   

    <el-alert
      id="wb13"
      v-if="haveAlert"
      title="请输入正确的id"
      style="width: 50%; height: 70px"
      type="warning"
      description="当前输入的基站id不存在，请正确输入"
      show-icon
    ></el-alert>

    <el-table
      v-if="haveStations"
      :data="stations"
      style="width: 100%"
    
      border
      fit
      stripe
      highlight-current-row
    >
      <el-table-column
      fixed
        type="index"
        label="序号"
        width="80"
      ></el-table-column>
      <el-table-column prop="gNBID" label="基站ID" width="120"> </el-table-column>
       <el-table-column prop="province" label="省份" width="120"> </el-table-column>
      <el-table-column prop="city" label="城市" width="120"> </el-table-column>
      <el-table-column prop="district" label="行政区" width="120">
      </el-table-column>
      <el-table-column prop="location" label="位置" width="250"></el-table-column>
         <el-table-column prop="belong_gNBID" label="所属基站名称" width="250">
      </el-table-column>
      <el-table-column prop="cover_type" label="覆盖类型" width="120">
      </el-table-column>
      <el-table-column prop="open_status" label="开通状态" width="120">
      </el-table-column>
      <el-table-column prop="CELL_ID" label="CELL_ID" width="120"> </el-table-column>
      <el-table-column prop="TAC" label="TAC" width="120"> </el-table-column>
      <el-table-column prop="PCI" label="PCI" width="120">
      </el-table-column>
      <el-table-column prop="band" label="频段" width="120">
      </el-table-column>
      <el-table-column prop="bandWidth" label="带宽" width="120"> </el-table-column>
      <el-table-column prop="frequency" label="频点" width="120">
      </el-table-column>
      <el-table-column prop="duplex_mode" label="双工模式" width="120">
      </el-table-column>
      <el-table-column prop="manufactures" label="生产厂家" width="120">
      </el-table-column>
      <el-table-column prop="equipment" label="设备型号" width="120">
      </el-table-column>
      <el-table-column prop="equipment_version" label="设备版本" width="250"></el-table-column>
      
      <el-table-column prop="base_type" label="基站类型" width="120"> </el-table-column>
     <el-table-column prop="longitude" label="经度" width="120"></el-table-column>
       <el-table-column prop="latitude" label="纬度" width="120"></el-table-column>
      <el-table-column prop="antenna_height" label="天线挂高" width="120">
      </el-table-column>
      <el-table-column prop="azimuth" label="方位角" width="120">
      </el-table-column>
      <el-table-column prop="down_angle" label="下倾角" width="120">
      </el-table-column>
      <el-table-column prop="nr_framework" label="NR架构" width="120">
      </el-table-column>
      <el-table-column prop="eNBID" label="4G锚点站eNBID_CELLID" width="315">
      </el-table-column>
      <el-table-column prop="share_base" label="是否共享基站" width="140">
      </el-table-column>
      <el-table-column prop="cover_scence" label="小区覆盖场景" width="130"> </el-table-column>
      <el-table-column prop="remark" label="备注" width="120"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="120" >
        <template slot-scope="scope">
          <!-- <el-button v-if="!showEdit[$index]" type="primary" size="mini" @click="deleteDialogVisible=true">删除</el-button>  -->
          <!-- 删除按钮 -->
          <el-button
            type="primary"
            size="mini"
            v-model="scope.row.PCI"
            @click="removeStationsByPCI(scope.row.PCI)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

   
  </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
  name: "deleteStations",
  components: {
    headTop,
  },
  data() {
    return {
      input: "",
      haveStations: false,
      haveAlert: false,

      stations: [],
      
      stationsUp: [],
     
    };
  },
  methods: {
    getStations() {
      this.$api.get(
        "5G_info/searchStationById",
        {
          stationId: this.input,
          // 'PCI':this.stations.PCI
        },
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
            if (response.data.success) {
              this.haveStations = true;
              this.haveAlert = false;
              this.stations = response.data.stations;
              console.log(this.stations);
              console.log("success");
            } else {
              this.haveStations = false;
              this.haveAlert = true;
              console.log("fail");
            }
          } else {
            this.haveStations = false;
            this.haveAlert = true;
            console.log(response.message);
          }
        }
      );
    },
    async removeStationsByPCI(PCI) {
      // console.log(PCI);
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该基站信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      } else {
        console.log(PCI);
        return this.$api.get(
          "5G_info/deleteStationInfo",
          {
            stationId: this.input,
            PCI: PCI,
          },
          (response) => {
            if (response.status !== 200) {
              return this.$message.error("删除用户失败！");
            } else {
              this.getStations();
              return this.$message.success("删除用户成功！");
            }
          }
        );
      }
    },
  },
};
</script>

<style>
.top {
  /* 以下三条使顶部进行吸顶 */
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
}
.wb1 {
  width: 300px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
}
.bs {
  padding: 10px;
  text-align: center;
  font-size: 16px;
}
/* .delete-bs {
  border-radius: 5px;
  background-color: rgb(0, 153, 255);
  font-size: 14px;
} */

/**设置表格文字居中 */
.el-table th > .cell {
  text-align: center;
}

.el-table .cell {
  text-align: center;
}
/* 基站查看信息-弹出框滚动条 */
  /* 设置滚动条的样式 */
  /***解决了滚动条之间发生错位的现象 */
  ::-webkit-scrollbar {
      width: 10px !important;
      height:10px !important;
      background-color: #b3c0c09e;
  }
 
  .el-table__fixed::before, .el-table__fixed-right::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: unset;
    z-index: 4;
}
/* 弹出框滚动条 */
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
}
.el-dialog {
  margin: 0 auto !important;
  height: 80%;
  overflow: hidden;
}

.el-dialog__body {
  position: absolute;
  left: 0;
  top: 54px;
  bottom: 70px;
  right: 0;
  padding: 0;
  z-index: 1;
  overflow: hidden;
  overflow-y: auto;
}
.el-dialog__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-input {
  width: 70%;
}

</style>