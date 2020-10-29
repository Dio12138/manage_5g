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
      description="当前输入的id不存在，请正确输入"
      show-icon
    >
    </el-alert>
    <el-table
      class="table"
      v-if="haveStations"
      :data="stations"
      stripe
      fit
      border
      style="width: 100%"

      highlight-current-row
    >
      <el-table-column
        fixed
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="gNBID"
        label="基站ID"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column type="text" prop="province" label="省份" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.province }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].province"
            v-else
            placeholder="省份"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column type="text" prop="city" label="城市" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.city }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].city"
            v-else
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column type="text" prop="district" label="行政区" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.district }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].district"
            v-else
            placeholder="行政区"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="location" label="位置" width="250">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.location }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].location"
            v-else
            placeholder="位置"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="belong_gNBID" label="所属gNBID的名称" width="250">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.belong_gNBID }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].belong_gNBID"
            v-else
            placeholder="belong_gNBID"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="cover_type" label="覆盖类型" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.cover_type }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].cover_type"
            v-else
            placeholder="cover_type"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="open_status" label="开通状态" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.open_status }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].open_status"
            v-else
            placeholder="open_status"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="CELL_ID" label="CELL ID" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.CELL_ID }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].CELL_ID"
            v-else
            placeholder="CELL_ID"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="TAC" label="TAC" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.TAC }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].TAC"
            v-else
            placeholder="TAC"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="PCI" label="PCI" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.PCI }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].PCI"
            v-else
            placeholder="PCI"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="band" label="频段" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.band }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].band"
            v-else
            placeholder="band"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="bandWidth" label="带宽" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.bandWidth }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].bandWidth"
            v-else
            placeholder="bandWidth"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="frequency" label="频点" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.frequency }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].frequency"
            v-else
            placeholder="frequency"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="duplex_mode" label="双工模式" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.duplex_mode }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].duplex_mode"
            v-else
            placeholder="duplex_mode"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="manufactures" label="生产厂家" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.manufactures }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].manufactures"
            v-else
            placeholder="manufactures"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="equipment" label="设备型号" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.equipment }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].equipment"
            v-else
            placeholder="equipment"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="equipment_version" label="设备版本" width="250">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.equipment_version }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].equipment_version"
            v-else
            placeholder="equipment_version"
          ></el-input>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="equipment" label="设备型号" width="250">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.equipment }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].equipment"
            v-else
            placeholder="equipment"
          ></el-input>
        </template>
      </el-table-column> -->

      <el-table-column prop=" base_type" label="基站类型" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.base_type }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].base_type"
            v-else
            placeholder=" base_type"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="longitude" label="经度" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.longitude }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].longitude"
            v-else
            placeholder="longitude"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="latitude" label="纬度" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.latitude }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].latitude"
            v-else
            placeholder="latitude"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="antenna_height" label="天线挂高" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.antenna_height }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].antenna_height"
            v-else
            placeholder="antenna_height"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="azimuth" label="方位角" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.azimuth }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].azimuth"
            v-else
            placeholder="azimuth"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="down_angle" label="下倾角" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.down_angle }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].down_angle"
            v-else
            placeholder="down_angle"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="nr_framework" label="NR架构" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.nr_framework }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].nr_framework"
            v-else
            placeholder="nr_framework"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="eNBID" label="4G锚点站eNBID_CELLID" width="315">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.eNBID }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].eNBID"
            v-else
            placeholder="eNBID"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="share_base" label="是否是共享基站" width="140">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.share_base }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].share_base"
            v-else
            placeholder="share_base"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="cover_scence" label="小区覆盖场景" width="130">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.cover_scence }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].cover_scence"
            v-else
            placeholder="cover_scence"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120">
        <template slot-scope="{ row, $index }">
          <span v-if="!showEdit[$index]">{{ row.remark }}</span>
          <el-input
            type="text"
            v-model="addForm[$index].remark"
            v-else
            placeholder="remark"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="!showEdit[$index]"
            type="primary"
            size="mini"
            @click="showEditDialog(row.gNBID, row.PCI)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加修改用户的弹出框 -->
    <el-dialog
      title="修改基站信息"
      :visible.sync="updateDialogVisible"
      width="40%"
      @close="updateDialogClosed"
    >
      <!-- 更新内容主题区域 -->
      <el-form
        :model="updateData"
        :rules="updateFormRules"
        ref="updateFormRef"
        label-width="120px"
      >
        <el-form-item fixed style="position: sticky" label="gNBID" prop="gNBID">
          <el-input v-model="updateData.gNBID" disabled></el-input>
        </el-form-item>

        <el-form-item label="省份" prop="province">
          <el-input v-model="updateData.province"></el-input>
        </el-form-item>

        <el-form-item label="城市" prop="city">
          <el-input v-model="updateData.city"></el-input>
        </el-form-item>

        <el-form-item label="行政区" prop="district">
          <el-input v-model="updateData.district"></el-input>
        </el-form-item>

        <el-form-item label="位置" prop="location">
          <el-input v-model="updateData.location"></el-input>
        </el-form-item>

        <el-form-item label="所属gNBID名称" prop="belong_gNBID">
          <el-input v-model="updateData.belong_gNBID"></el-input>
        </el-form-item>

        <el-form-item label="cover_type" prop="cover_type">
          <el-select
            v-model="updateData.cover_type"
            placeholder="请选择覆盖类型"
          >
            <el-option label="室内" value="室内"></el-option>
            <el-option label="室外" value="室外"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开放状态" prop="location">
          <el-input v-model="updateData.open_status"></el-input>
        </el-form-item>

        <el-form-item label="CELL_ID" prop="belong_gNBID">
          <el-input v-model="updateData.CELL_ID"></el-input>
        </el-form-item>

        <el-form-item label="TAC" prop="TAC">
          <el-input v-model="updateData.TAC"></el-input>
        </el-form-item>

        <el-form-item label="PCI" prop="PCI">
          <el-input v-model="updateData.PCI" disabled></el-input>
        </el-form-item>

        <el-form-item label="频段" prop="band">
          <el-input v-model="updateData.band"></el-input>
        </el-form-item>

        <el-form-item label="带宽" prop="bandWidth">
          <el-input v-model="updateData.bandWidth"></el-input>
        </el-form-item>

        <el-form-item label="频点" prop="frequency">
          <el-input v-model="updateData.frequency"></el-input>
        </el-form-item>

        <el-form-item label="双工模式" prop="duplex_mode">
          <el-select
            v-model="updateData.duplex_mode"
            placeholder="请选择双工模式"
          >
            <el-option label="TDD" value="TDD"></el-option>
            <el-option label="FDD" value="FDD"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="厂家" prop="manufactures">
          <el-input v-model="updateData.manufactures"></el-input>
        </el-form-item>

        <el-form-item label="设备型号" prop="equipment">
          <el-input v-model="updateData.equipment"></el-input>
        </el-form-item>

        <el-form-item label="设备版本" prop="equipment_version">
          <el-input v-model="updateData.equipment_version"></el-input>
        </el-form-item>

        <el-form-item label="基站类型" prop="base_type">
          <el-input v-model="updateData.base_type"></el-input>
        </el-form-item>

        <el-form-item label="longitude" prop="longitude">
          <el-input v-model="updateData.longitude"></el-input>
        </el-form-item>

        <el-form-item label="latitude" prop="latitude">
          <el-input v-model="updateData.latitude"></el-input>
        </el-form-item>

        <el-form-item label="天线挂高" prop="antenna_height">
          <el-input v-model="updateData.antenna_height"></el-input>
        </el-form-item>

        <el-form-item label="方位角" prop="azimuth">
          <el-input v-model="updateData.azimuth"></el-input>
        </el-form-item>

        <el-form-item label="下倾角" prop="down_angle">
          <el-input v-model="updateData.down_angle"></el-input>
        </el-form-item>

        <el-form-item label="NR架构" prop="nr_framework">
          <el-input v-model="updateData.nr_framework"></el-input>
        </el-form-item>

        <el-form-item label="4G锚点站eNBID_CELLID" prop="eNBID">
          <el-input v-model="updateData.eNBID"></el-input>
        </el-form-item>

        <el-form-item label="是否共享站" prop="share_base">
          <el-select
            v-model="updateData.share_base"
            placeholder="请选择是否是共享基站"
          >
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="小区覆盖场景" prop="cover_scence">
          <el-select
            v-model="updateData.cover_scence"
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
          <el-input v-model="updateData.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
  name: "aa",
  components: {
    headTop,
  },
  data() {
    return {
      input: "",
      haveStations: false,
      haveAlert: false,
      stations: [],
      //控制修改隐藏
      showEdit: [],
      updateForm: {
        gNBID: "",
        province: "",
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
      // addForm绑定数据库信息
      addForm: {
        gNBID: "",
        province: "",
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
      updateDialogVisible: false,
      updateForm: {},
      updateData: [],

      //表单验证
      updateFormRules: {
        // gNBID: [
        //   { required: true, message: "请输入基站ID", trigger: "blur" },
        //   { message: "请输入整数", trigger: "blur" },
        // ],
        province: [
          { required: true, message: "请输入省级名称", trigger: "blur" },
          { message: "请正确输入省级名称", trigger: "blur" },
        ],
        city: [
          { required: true, message: "请输入城市名称", trigger: "blur" },
          { message: "请正确输入城市名称", trigger: "blur" },
        ],
        ditrict: [
          { required: true, message: "请输入行政区名称", trigger: "blur" },
          { message: "请正确输入行政区名称", trigger: "blur" },
        ],
        location: [
          { required: false, message: "请输入基站位置", trigger: "blur" },
          { message: "请输入基站位置", trigger: "blur" },
        ],
        belong_gNBID: [
          { required: false, message: "请输入所属gNBID名称", trigger: "blur" },
          { message: "请输入所属gNBID名称", trigger: "blur" },
        ],
        cover_type: [
          { required: true, message: "请输入基站cover_type", trigger: "blur" },
          { message: "请正确输入基站cover_type", trigger: "blur" },
        ],
        open_status: [
          { required: true, message: "请输入开放状态", trigger: "blur" },
          { message: "请输入开放状态", trigger: "blur" },
        ],
        CELL_ID: [
          { required: true, message: "请输入城市名称", trigger: "blur" },
          { message: "请正确输入城市名称", trigger: "blur" },
        ],

        // PCI: [
        //   { required: true, message: "请输入基站PCI", trigger: "blur" },
        //   { message: "请正确输入基站PCI", trigger: "blur" },
        // ],
        // band: [
        //   { required: true, message: "请输入频段", trigger: "blur" },
        //   { message: "请正确输入频段", trigger: "blur" },
        // ],
        // bandWidth: [
        //   { required: true, message: "请输入带宽", trigger: "blur" },
        //   { message: "请正确输入频段", trigger: "blur" },
        // ],
        // frequency: [
        //   { required: true, message: "请输入频点", trigger: "blur" },
        //   { message: "请正确输入频段", trigger: "blur" },
        // ],
        // duplex_mode: [
        //   { required: true, message: "请输入双工模式", trigger: "blur" },
        //   { message: "请正确输入双工模式", trigger: "blur" },
        // ],
        // manufactures: [
        //   { required: false, message: "请输入生产厂家", trigger: "blur" },
        //   { message: "请正确输入生产厂家", trigger: "blur" },
        // ],
        // equipment: [
        //   { required: true, message: "请输入设备型号", trigger: "blur" },
        //   { message: "请正确输入设备型号", trigger: "blur" },
        // ],
        // equipment_version: [
        //   { required: true, message: "请输入设备版本", trigger: "blur" },
        //   { message: "请正确输入设备版本", trigger: "blur" },
        // ],
        // base_type: [
        //   { required: true, message: "请输入基站类型", trigger: "blur" },
        //   { message: "请正确输入基站类型", trigger: "blur" },
        // ],
        // longitude: [
        //   { required: true, message: "请输入基站longitude", trigger: "blur" },
        //   { message: "请正确输入基站longitude", trigger: "blur" },
        // ],
        // latitude: [
        //   { required: true, message: "请输入基站latitude", trigger: "blur" },
        //   { message: "请正确输入基站latitude", trigger: "blur" },
        // ],
        // antenna_height: [
        //   { required: true, message: "请输入天线挂高", trigger: "blur" },
        //   { message: "请正确输入天线挂高", trigger: "blur" },
        // ],
        // azimuth: [
        //   { required: true, message: "请输入方位角", trigger: "blur" },
        //   { message: "请正确输入方位角", trigger: "blur" },
        // ],
        // down_angle: [
        //   { required: true, message: "请输入下倾角", trigger: "blur" },
        //   { message: "请正确输入下倾角", trigger: "blur" },
        // ],
        // nr_framework: [
        //   { required: true, message: "请输入NR架构模型", trigger: "blur" },
        //   { message: "请输入NR架构模型", trigger: "blur" },
        // ],
        // eNBID: [
        //   { required: true, message: "请输入4G锚点站", trigger: "blur" },
        //   { message: "请正确输入4G锚点站", trigger: "blur" },
        // ],
        // share_base: [
        //   { required: false, message: "请输入是否是共享基站", trigger: "blur" },
        //   { message: "请正确输入是否是共享基站", trigger: "blur" },
        // ],
        // cover_scence: [
        //   { required: true, message: "请输入覆盖场景", trigger: "blur" },
        //   { message: "请输入覆盖场景", trigger: "blur" },
        // ],
        // remark: [
        //   { required: false, message: "请输入备注", trigger: "blur" },
        //   { message: "请正确输入备注", trigger: "blur" },
        // ],
      },
    };
  },

  methods: {
    getStations() {
      this.$api.get(
        "5G_info/searchStationById",
        {
          stationId: this.input,
        },
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            //console.log(response.data.stations);
            if (response.data.success) {
              this.haveStations = true;
              this.haveAlert = false;
              // return
              this.stations = response.data.stations;
              const stationDatas = this.stations;
              return stationDatas;
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

    //监听修改用户的对话框的关闭
    updateDialogClosed() {
      this.$refs.updateFormRef.resetFields();
      // this.$refs.resetFields();
    },
    //展示编辑用户的对话框(再一次查询)
    async showEditDialog(gNBID, PCI) {
      this.updateDialogVisible = true;
      // console.log(PCI);
      return this.$api.get(
        "5G_info/searchStationByIdAndPCI",
        {
          gNBID: gNBID,
          PCI: PCI,
        },
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data);
            if (response.data.success) {
              this.updateDialogVisible = true;
              this.updateData = response.data.stations[0];
              console.log(this.updateData);

              console.log(gNBID);

              console.log("success");
            }
          } else {
            this.updateDialogVisible = false;
            this.haveAlert = false;
            console.log("false");
          }
        }
      );
    },
    //提交操作(save)
    confirmEdit() {
      this.$refs.updateFormRef.validate(async (valid) => {
        console.log(this.updateData.gNBID);
        if (!valid) return;
        //发送请求，隐藏输入框
        const res = await this.$api.post(
          "5G_info/updateStationInfo",

          {
            gNBID: this.updateData.gNBID,
            province: this.updateData.province,
            city: this.updateData.city,
            district: this.updateData.district,
            location: this.updateData.location,
            belong_gNBID: this.updateData.belong_gNBID,
            cover_type: this.updateData.cover_type,
            open_status: this.updateData.open_status,
            CELL_ID: this.updateData.CELL_ID,
            TAC: this.updateData.TAC,
            PCI: this.updateData.PCI,
            band: this.updateData.band,
            bandWidth: this.updateData.bandWidth,
            frequency: this.updateData.frequency,
            duplex_mode: this.updateData.duplex_mode,
            manufactures: this.updateData.manufactures,
            equipment: this.updateData.equipment,
            equipment_version: this.updateData.equipment_version,
            base_type: this.updateData.base_type,
            longitude: this.updateData.longitude,
            latitude: this.updateData.latitude,
            antenna_height: this.updateData.antenna_height,
            azimuth: this.updateData.azimuth,
            down_angle: this.updateData.down_angle,
            nr_framework: this.updateData.nr_framework,
            eNBID: this.updateData.eNBID,
            share_base: this.updateData.share_base,
            cover_scence: this.updateData.cover_scence,
            remark: this.updateData.remark,
          },
          (response) => {
            if (response.status !== 200) {
              // console.log(response.data);
              return this.$message.error("更新用户失败！");
            } else {
              this.getStations(this.addForm.gNBID);
              this.updateDialogVisible = false;
              return this.$message.success("更新用户成功！");
              //隐藏添加用户的对话框
            }
          }
        );
      });
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
/**设置表格文字居中 */
.el-table th > .cell {
  text-align: center;
}

.el-table .cell {
  text-align: center;
}
/* .update-bs {
  border-radius: 5px;
  background-color: rgb(0, 153, 255);
  font-size: 14px;
} */
/* 基站查看信息-弹出框滚动条 */
/* 设置滚动条的样式 */
/***解决了滚动条之间发生错位的现象 */
::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
  background-color: #b3c0c09e;
}

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