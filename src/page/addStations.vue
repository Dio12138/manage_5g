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
            @click="getStations"
          ></el-input>
        </el-col>
        <el-button type="primary" @click="getStations">查询</el-button>
        <el-button type="primary" @click="addDialogVisible = true"
          >添加基站信息</el-button
        >
      </el-row>
    </el-card>
    <el-alert
      id="wb13"
      v-if="haveAlert"
      title="请输入正确的id"
      style="width: 80%; height: 70px; font-size: 12px"
      type="warning"
      description="当前输入的基站id不存在，请正确输入"
      show-icon
    >
    </el-alert>
    <el-table
      v-if="haveStations"
      :data="stations"
      style="width: 80%"
      height="198"
      stripe
      fit
      border
      highlight-current-row
    >
      <el-table-column
        fixed
        type="index"
        label="序号"
        width="80"
      ></el-table-column>
      <el-table-column prop="gNBID" label="基站ID" width="120">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="城市" width="120"> </el-table-column>
      <el-table-column prop="district" label="行政区" width="120">
      </el-table-column>
      <el-table-column
        prop="location"
        label="位置"
        width="250"
      ></el-table-column>
      <el-table-column prop="belong_gNBID" label="所属基站名称" width="250">
      </el-table-column>
      <el-table-column prop="cover_type" label="覆盖类型" width="120">
      </el-table-column>
      <el-table-column prop="open_status" label="开放状态" width="120">
      </el-table-column>
      <el-table-column prop="CELL_ID" label="CELL_ID" width="120">
      </el-table-column>
      <el-table-column prop="TAC" label="PCI" width="TAC"> </el-table-column>
      <el-table-column prop="PCI" label="PCI" width="120"> </el-table-column>
      <el-table-column prop="band" label="频段" width="120"> </el-table-column>
      <el-table-column prop="bandWidth" label="带宽" width="120">
      </el-table-column>
      <el-table-column prop="frequency" label="频点" width="120">
      </el-table-column>
      <el-table-column prop="duplex_mode" label="双工模式" width="120">
      </el-table-column>
      <el-table-column prop="manufactures" label="生产厂家" width="120">
      </el-table-column>
      <el-table-column prop="equipment" label="设备型号" width="120">
      </el-table-column>
      <el-table-column
        prop="equipment_version"
        label="设备版本"
        width="250"
      ></el-table-column>
      <el-table-column prop="PCI" label="PCI" width="120"> </el-table-column>
      <el-table-column prop="longitude" label="经度" width="120">
      </el-table-column>
      <el-table-column prop="latitude" label="纬度" width="120">
      </el-table-column>
      <el-table-column prop="base_type" label="基站类型" width="120">
      </el-table-column>
      <el-table-column
        prop="longitude"
        label="经度"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="latitude"
        label="纬度"
        width="120"
      ></el-table-column>
      <el-table-column prop="antenna_height" label="天线高度" width="120">
      </el-table-column>
      <el-table-column prop="azimuth" label="方位角" width="120">
      </el-table-column>
      <el-table-column prop="down_angle" label="下倾角" width="120">
      </el-table-column>
      <el-table-column prop="nr_framework" label="NR架构" width="120">
      </el-table-column>
      <el-table-column prop="eNBID" label="4G锚点站eNBID_CELLID" width="310">
      </el-table-column>
      <el-table-column prop="share_base" label="是否共享基站" width="140">
      </el-table-column>
      <el-table-column prop="cover_scence" label="小区覆盖场景" width="130">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120">
      </el-table-column>
    </el-table>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加基站信息"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="addDialogClosed"
    >
      <!-- 添加内容主题区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
      >
        <el-form-item label="gNBID" prop="gNBID">
          <el-input v-model="addForm.gNBID"></el-input>
        </el-form-item>

        <el-form-item label="省份" prop="prov">
          <el-select
            v-model="addForm.prov"
            @change="choseProvince"
            placeholder="省级地区"
          >
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="city">
          <el-select
            v-model="addForm.city"
            @change="choseCity"
            placeholder="市级地区"
          >
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="行政区" prop="district">
          <el-select
            v-model="addForm.district"
            @change="choseBlock"
            placeholder="区级地区"
          >
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="位置" prop="location">
          <el-input v-model.trim="addForm.location"></el-input>
        </el-form-item>

        <el-form-item label="所属gNBID名称" prop="belong_gNBID">
          <el-input v-model.trim="addForm.belong_gNBID"></el-input>
        </el-form-item>

        <el-form-item label="cover_type" prop="cover_type">
          <el-select
            v-model.trim="addForm.cover_type"
            placeholder="请选择覆盖类型"
          >
            <el-option label="室内" value="室内"></el-option>
            <el-option label="室外" value="室外"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开通状态" prop="open_status">
          <el-select
            v-model.trim="addForm.open_status"
            placeholder="请选择开通状态"
          >
            <el-option label="在网" value="在网"></el-option>
            <el-option label="离网" value="离网"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="CELL ID" prop="CELL_ID">
          <el-input v-model.trim="addForm.CELL_ID"></el-input>
        </el-form-item>

        <el-form-item label="TAC" prop="TAC">
          <el-input v-model.trim="addForm.TAC"></el-input>
        </el-form-item>

        <el-form-item label="PCI" prop="PCI">
          <el-input v-model.trim="addForm.PCI"></el-input>
        </el-form-item>

        <el-form-item label="频段" prop="band">
          <el-input v-model.trim="addForm.band"></el-input>
        </el-form-item>

        <el-form-item label="带宽" prop="bandWidth">
          <el-input v-model.trim="addForm.bandWidth"></el-input>
        </el-form-item>

        <el-form-item label="频点" prop="frequency">
          <el-input v-model.trim="addForm.frequency"></el-input>
        </el-form-item>

        <el-form-item label="双工模式" prop="duplex_mode">
          <el-select
            v-model.trim="addForm.duplex_mode"
            placeholder="请选择双工模式"
          >
            <el-option label="TDD" value="TDD"></el-option>
            <el-option label="FDD" value="FDD"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="厂家" prop="manufactures">
          <el-input v-model.trim="addForm.manufactures"></el-input>
        </el-form-item>

        <el-form-item label="设备型号" prop="equipment">
          <el-input v-model.trim="addForm.equipment"></el-input>
        </el-form-item>

        <el-form-item label="设备版本" prop="equipment_version">
          <el-input v-model.trim="addForm.equipment_version"></el-input>
        </el-form-item>

        <el-form-item label="基站类型" prop="base_type">
          <el-input v-model.trim="addForm.base_type"></el-input>
        </el-form-item>

        <el-form-item label="longitude" prop="longitude">
          <el-input v-model.trim="addForm.longitude"></el-input>
        </el-form-item>

        <el-form-item label="latitude" prop="latitude">
          <el-input v-model.trim="addForm.latitude"></el-input>
        </el-form-item>

        <el-form-item label="天线挂高" prop="antenna_height">
          <el-input v-model.trim="addForm.antenna_height"></el-input>
        </el-form-item>

        <el-form-item label="方位角" prop="azimuth">
          <el-input v-model.trim="addForm.azimuth"></el-input>
        </el-form-item>

        <el-form-item label="下倾角" prop="down_angle">
          <el-input v-model.trim="addForm.down_angle"></el-input>
        </el-form-item>

        <el-form-item label="NR架构" prop="nr_framework">
          <el-input v-model.trim="addForm.nr_framework"></el-input>
        </el-form-item>

        <el-form-item label="4G锚点站eNBID_CELLID" prop="eNBID">
          <el-input v-model.trim="addForm.eNBID"></el-input>
        </el-form-item>

        <el-form-item label="是否共享站" prop="share_base">
          <el-select
            v-model.trim="addForm.share_base"
            placeholder="请选择是否是共享基站"
          >
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="小区覆盖场景" prop="cover_scence">
          <el-select
            v-model.trim="addForm.cover_scence"
            placeholder="请选择小区覆盖类型"
          >
            <el-option label="密集城区" value="密集城区"></el-option>
            <el-option label="核心城区" value="核心城区"></el-option>
            <el-option label="一般城区" value="一般城区"></el-option>
            <el-option label="高铁" value="高铁"></el-option>
            <el-option label="郊区" value="郊区"></el-option>
            <el-option label="农村" value="农村"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="addForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStations">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import headTop from "../components/headTop";
import axios from "axios";
export default {
  name: "addStations",
  components: {
    headTop,
  },
  data() {
    return {
      input: "",
      haveStations: false,
      haveAlert: false,
      stations: [],

      province: "",
      // sheng: "",
      // shi: "",
      shi1: [],
      city: "",
      block: "",
      qu: "",
      qu1: [],
      mapJson: "../../static/json/map.json",

      //添加用户对话框的显示与隐藏
      addDialogVisible: false,
      //添加用户的表单信息
      addForm: {
        gNBID: "",
        prov: "",
        city: "",
        district: "",
        location: "",
        belong_gNBID: "",
        cover_type: "",
        open_status: "",
        CELL_ID: "",
        TAC: "",
        PCI: "",
        band: "",
        bandWidth: "",
        frequency: "",
        duplex_mode: "",
        manufactures: "",
        equipment: "",
        equipment_version: "",
        base_type: "",
        longitude: "",
        latitude: "",
        antenna_height: "",
        azimuth: "",
        down_angle: "",
        nr_framework: "",
        eNBID: "",
        share_base: "",
        cover_scence: "",
        remark: "",
      },

      //添加用户的验证规则
      addFormRules: {
        gNBID: [
          { required: true, message: "请输入基站ID", trigger: "blur" },
          { message: "请输入整数", trigger: "blur" },
        ],
        prov: [{ required: true, message: "请输入省级名称", trigger: "blur" }],
        city: [{ required: true, message: "请输入城市名称", trigger: "blur" }],
        ditrict: [
          { required: true, message: "请输入行政区名称", trigger: "blur" },
        ],
        location: [
          { required: true, message: "请输入基站位置", trigger: "blur" },
        ],
        belong_gNBID: [
          { required: false, message: "请输入所属gNBID名称", trigger: "blur" },
        ],
        cover_type: [
          { required: true, message: "请输入基站cover_type", trigger: "blur" },
        ],
        open_status: [
          { required: true, message: "请输入开放状态", trigger: "blur" },
        ],
        CELL_ID: [
          { required: true, message: "请输入CELL ID名称", trigger: "blur" },
        ],
        TAC: [{ required: true, message: "请输入基站TAC", trigger: "blur" }],
        PCI: [{ required: true, message: "请输入基站PCI", trigger: "blur" }],
        band: [{ required: true, message: "请输入频段", trigger: "blur" }],
        bandWidth: [{ required: true, message: "请输入带宽", trigger: "blur" }],
        frequency: [{ required: true, message: "请输入频点", trigger: "blur" }],
        duplex_mode: [
          { required: true, message: "请输入双工模式", trigger: "blur" },
        ],
        manufactures: [
          { required: false, message: "请输入生产厂家", trigger: "blur" },
        ],
        equipment: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
        ],
        equipment_version: [
          { required: true, message: "请输入设备版本", trigger: "blur" },
        ],
        base_type: [
          { required: true, message: "请输入基站类型", trigger: "blur" },
        ],
        longitude: [
          { required: true, message: "请输入基站longitude", trigger: "blur" },
        ],
        latitude: [
          { required: true, message: "请输入基站latitude", trigger: "blur" },
        ],
        antenna_height: [
          { required: true, message: "请输入天线挂高", trigger: "blur" },
        ],
        azimuth: [{ required: true, message: "请输入方位角", trigger: "blur" }],
        down_angle: [
          { required: true, message: "请输入下倾角", trigger: "blur" },
        ],
        nr_framework: [
          { required: true, message: "请输入NR架构模型", trigger: "blur" },
        ],
        eNBID: [{ required: true, message: "请输入4G锚点站", trigger: "blur" }],
        share_base: [
          { required: false, message: "请输入是否是共享基站", trigger: "blur" },
        ],
        cover_scence: [
          { required: true, message: "请输入覆盖场景", trigger: "blur" },
        ],
        remark: [{ required: false, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  created: function () {
    this.getCityData();
  },

  methods: {
    //查询后获取基站信息
    getStations() {
      this.$api.get(
        "5G_info/searchStationById",
        {
          stationId: this.input,
        },
        (response) => {
          if (response.status >= 200 && response.status <= 300) {
            console.log(response.data);
            if (response.data.success) {
              this.haveStations = true;
              this.haveAlert = false;
              this.stations = response.data.stations;
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
    //   监听添加用户框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
      // this.$refs.resetFields();
    },

    // 加载china地点数据，三级
    getCityData() {
      var that = this;
      axios
        .get(this.mapJson)
        .then(function (response) {
          if (response.status == 200) {
            var data = response.data;
            that.province = [];
            that.city = [];
            that.block = [];
            // console.log(mapJson);
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {
                //省
                that.province.push({
                  id: item,
                  value: data[item],
                  children: [],
                });
              } else if (item.match(/00$/)) {
                //市
                that.city.push({ id: item, value: data[item], children: [] });
              } else {
                //区
                that.block.push({ id: item, value: data[item] });
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (
                  that.province[index].id.slice(0, 2) ===
                  that.city[index1].id.slice(0, 2)
                ) {
                  that.province[index].children.push(that.city[index1]);
                }
              }
            }
            // 分类区级
            for (var item1 in that.city) {
              for (var item2 in that.block) {
                if (
                  that.block[item2].id.slice(0, 4) ===
                  that.city[item1].id.slice(0, 4)
                ) {
                  that.city[item1].children.push(that.block[item2]);
                }
              }
            }
          } else {
          }
        })
        .catch(function (error) {
          console.log(typeof +error);
        });
    },
    // 选省
    choseProvince(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          // console.log(this.province[index2].id); //你选择的省级编码
          // console.log(this.province[index2].value); //省级编码 对应的汉字
          this.shi1 = this.province[index2].children; //数组=市

          //取出省名称
          this.addForm.prov = this.province[index2].value;

          //this.shi = this.province[index2].children[0].value;
          //以下代码默认为输入框输入第一个元素
          // this.qu1 = this.province[index2].children[0].children;
          //  this.qu = this.province[index2].children[0].children[0].value;
          //this.E = this.qu1[0].id;
          //return this.addForm.city;
        }
      }
    },

    // 选市
    choseCity(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          //取出的是市名称
          this.addForm.city = this.city[index3].value;
          this.qu1 = this.city[index3].children;
          // this.qu  = this.city[index3].children[index3].value;
          this.qu = this.city[index3].children.value;
          this.E = this.qu1[0].id;
        }
      }
    },
    // 选区
    choseBlock(e) {
      for (var index4 in this.block) {
        if (e === this.block[index4].id) {
          //取出的是区名称
          this.addForm.district = this.block[index4].value;
          this.E = e;
          console.log(this.addForm.district);
        }
      }
    },

    //点击按钮  添加新用户 有一个表单预校验的操作
    addStations() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //可以发起添加用户的网络请求
        const res = await this.$api.post(
          "5G_info/addStationInfo",
          {
            gNBID: this.addForm.gNBID,
            prov: this.addForm.prov,
            city: this.addForm.city,
            district: this.addForm.district,
            location: this.addForm.location,
            belong_gNBID: this.addForm.belong_gNBID,
            cover_type: this.addForm.cover_type,
            open_status: this.addForm.open_status,
            CELL_ID: this.addForm.CELL_ID,
            TAC: this.addForm.TAC,
            PCI: this.addForm.PCI,
            band: this.addForm.band,
            bandWidth: this.addForm.bandWidth,
            frequency: this.addForm.frequency,
            duplex_mode: this.addForm.duplex_mode,
            manufactures: this.addForm.manufactures,
            equipment: this.addForm.equipment,
            equipment_version: this.addForm.equipment_version,
            base_type: this.addForm.base_type,
            longitude: this.addForm.longitude,
            latitude: this.addForm.latitude,
            antenna_height: this.addForm.antenna_height,
            azimuth: this.addForm.azimuth,
            down_angle: this.addForm.down_angle,
            nr_framework: this.addForm.nr_framework,
            eNBID: this.addForm.eNBID,
            share_base: this.addForm.share_base,
            cover_scence: this.addForm.cover_scence,
            remark: this.addForm.remark,
          },
          (response) => {
            if (response.status !== 200) {
              //显示未被定义
              console.log(response.data);
              return this.$message.error("添加用户失败！");
            } else {
              //   this.getStations(this.addForm.gNBID);
              this.addDialogVisible = false;
              return this.$message.success("添加用户成功！");
              console.log(this.addForm.prov);
              //隐藏添加用户的对话框
            }
          }
        );
      });
    },
  },
};
</script>

<style lang="css">
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
/* .update-bs {
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
  height: 10px !important;
  background-color: #b3c0c09e;
}
/* 去除滚动条 */
/* ::-webkit-scrollbar {
width: 1px;
height: 1px;
} */

.el-table__fixed::before,
.el-table__fixed-right::before {
  content: "";
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