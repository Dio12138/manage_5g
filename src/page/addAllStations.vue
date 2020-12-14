<template>
  <div class="parentDiv">
    <meta charset="UTF-8" />
    <!-- 面包屑导航区 -->
    <head-top></head-top>
    <el-card>
      <!-- 搜索 添加 -->
      <!-- <el-span class="bs">日期</el-span> -->
      <el-input
        class="wb1"
        v-model="input"
        @click="searchDetailByDate"
        placeholder="请输入查询日期  格式为:yyyy-mm-dd"
      ></el-input>
      <el-button type="primary" @click="searchDetailByDate">查询</el-button>

      <!-- 上传文件区域 -->
      <el-date-picker
        clearable
        v-model="startTime"
        :picker-options="startDatePicker"
        :disabled="dialogStatus == 'view'"
        value-format="YYYY-MM-dd"
        :placeholder="dialogStatus == 'view' ? '' : '请输入时间'"
      ></el-date-picker>
      <el-date-picker
        v-model="endTime"
        clearable
        :picker-options="endDatePicker"
        :disabled="dialogStatus == 'view'"
        value-format="YYYY-MM-dd"
        :placeholder="dialogStatus == 'view' ? '' : '请输入结束时间'"
      >
      </el-date-picker>

      <el-button type="primary" @click="importFile">批量导入文件</el-button>
      <!-- <el-alert
        v-if="(haveSelect = false)"
        title="请先输入上传文件的起止时间"
        style="width: 80%; height: 70px; font-size: 12px"
        type="warning"
        show-icon
      ></el-alert> -->

      <!-- 显示数据表上传信息 -->

      <el-alert
        id="wb13"
        v-if="haveInput == false && isOning == false && haveDetail == false"
        title="请输入正确的查询日期"
        style="width: 80%; height: 70px; font-size: 12px"
        type="warning"
        description="当前输入的查询日期不存在，请正确输入"
        show-icon
      >
      </el-alert>
      <el-table
        :data="importData"
        class="table-container"
        v-model="haveDetail"
        v-if="(haveDetail = true && isOning == false)"
        stripe
        fit
        border
        style="width: 80%"
        height="1000px"
        highlight-current-row
      >
        <el-table-column
          fixed
          type="index"
          width="80"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column prop="importDate" label="导入日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.importDate }}</span></template
          ></el-table-column
        >
        <el-table-column prop="totalNum" label="导入数量" align="center">
          <template slot-scope="scope"
            ><span>{{ scope.row.totalNum }}</span></template
          ></el-table-column
        >
        <el-table-column
          prop="successNum"
          width="120"
          label="导入成功"
          align="center"
          ><template slot-scope="scope"
            ><span>{{ scope.row.successNum }}</span></template
          ></el-table-column
        >
        <el-table-column
          prop="failNum"
          width="120"
          label="导入失败"
          align="center"
        >
          <template slot-scope="scope"
            ><span>{{ scope.row.failNum }}</span></template
          ></el-table-column
        >
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              label="查看日志"
              size="mini"
              width="120"
              @click="viewLog"
              >查看日志</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-scrollbar> -->
      <!-- </div> -->
      <el-dialog
        title="上传文件"
        :visible.sync="isEditWinShow"
        custom-class="customWidth"
        :close-on-click-modal="false"
      >
        <el-form label-width="100px">
          <el-row>
            <el-col :span="60">
              <el-upload
                drag
                multiple
                ref="upload"
                :auto-upload="true"
                :http-request="checkedFile"
                :before-remove="removeFile"
                :limit="10"
                action="/"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                  <div>上传文件类型是csv或者zip</div>
                </div>
              </el-upload>
              <el-button
                slot="trigger"
                type="primary"
                size="small"
                align="right"
                >选取文件</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 按日期查询区域 -->
      <!-- v-if="isOning == true" -->
      <el-table
        class="scrollbarDiv2"
        :data="
          detailList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        v-if="isOning == true"
        stripe
        fit
        border
        style="width: 100%"
      >
        <!-- stripe: 斑马条纹border：边框-->
        <el-table-column
          fixed
          type="index"
          width="80"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="importDate"
          label="导入日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="totalNum"
          label="导入数量"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="successNum"
          width="120"
          label="导入成功"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="failNum"
          width="120"
          label="导入失败"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              label="查看日志"
              size="mini"
              width="120"
              @click="viewLog($index, row)"
              >查看日志</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="查看日志" :visible.sync="isDialogShow">
        <el-form label-width="100px">
          <el-row>
            <el-col :span="60">
              <span>数据上传成功！</span>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-pagination
        v-if="havePagination"
        :data="
          detailList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
      <div v-if="progressSeen">
        <el-progress
          :text-inside="true"
          :stroke-width="15"
          :percentage="progress"
          status="success"
        ></el-progress>
      </div>
    </el-card>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import axios from "axios";

// install之后进行引入即可
import Papa from "papaparse";
import jschardet from "jschardet";

export default {
  name: "addAllStations",
  components: {
    headTop,
  },
  data() {
    return {
      haveInput: false,
      isOning: false,
      importData: [],
      haveDetail: false,
      input: "",
      totle: 0,
      /** 表格分页*/
      // 获取总数据
      detailList: [],
      //  默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数组长度（不为空）
      totalCount: 1,
      // 个数选择器
      pagesizes: [2, 5, 10, 15],
      // 每页显示的总条数
      pagesize: 1,
      havePagination: false,
      //时间选择器
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      dialogStatus: [],
      startTime: "",
      endTime: "",
      datesInt: "",
      uploadName: "",
      // t: false,

      tableData: [],
      //日志操作
      isDialogShow: false,
      // 上传文件数据
      fileData: "",
      fileList: [],
      inventoryRequests: [],
      newData: [],
      isEditWinShow: false,
      isLoading: false,
      finished: false,
      //新上传的数目
      totalNum: 0,
      newFailNum: 0,
      newSuccessNum: 0,
      //显示进度条
      progress: 0,
      progressSeen: false,

      /**新添 */
      maxSize: 5 * 1024 * 1024 * 1024, // 上传最大文件限制5G
      multiUploadSize: 500 * 1024 * 1024, // 大于这个大小的文件使用分块上传(后端可以支持断点续传)500M
      eachSize: 300 * 1024 * 1024, // 每块文件大小300M
      requestCancelQueue: [], // 请求方法队列（调用取消上传）
      uploadVisable: false,
    };
  },
  watch: {
    startTime(v1) {
      console.log("已选择输入日期");
      // console.log(v1);
    },
    endTime(v2) {
      console.log("已选择输出日期");
      // console.log(v2);
    },
  },
  created() {
    this.getDetailList();
  },
  methods: {
    changeData() {
      console.log("ooo");
    },
    // 获取表格内容
    getDetailList() {
      this.isOning = false;
      this.haveDetail == true;
      this.$api.get(
        "5G_info/getDetail",
        {
          importDate: this.tableData.importDate,
          totalNum11: this.tableData.totalNum11,
          successNum11: this.tableData.successNum11,
          failNum11: this.tableData.failNum11,
        },
        (response) => {
          if (response.status >= 200 && response.status <= 300) {
            if (response.data.success) {
              this.importData = response.data.detailList;

              console.log("success");
            } else {
              console.log("fail");
            }
          } else {
            // this.haveInput = true;
            console.log("网页连接失败！");
            console.log(response.message);
          }
        }
      );
    },
    // 根据日期查找上传记录
    searchDetailByDate() {
      // this.haveInput=true;
      if (this.input == "") {
        this.isOning = false;
        // this.haveInput=true;
        this.haveDetail = false;
        alert("请先输入查询日期");
      } else {
        this.isOning = true;
        this.haveDetail = false;
        this.havePagination = true;
        this.$api.get(
          "5G_info/searchDetailByDate",
          {
            searchDate: this.input,
          },
          (response) => {
            if (response.status >= 200 && response.status <= 300) {
              if (response.data.success) {
                this.haveDetail = false;
                this.haveInput = true;
                this.detailList = response.data.detailList;
                this.totalCount = response.data.detailList.length; //获取数组的长度
                // console.log(this.totalCount);
                console.log("success");
              } else {
                console.log("fail");
                // this.haveInput = false;
                this.isOning = true;
                this.haveDetail = false;
                alert("无此日期的消息，请核对！");
              }
            } else {
              console.log("网页连接失败！");
              console.log(response.message);
            }
          }
        );
      }
    },
    //时间选择器逻辑处理
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.endTime) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.endTime).getTime() <= time.getTime();
          } else {
            return time.getTime() > Date.now(); //开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
      console.log(self.endTime);
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.startTime) {
            //如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.startTime).getTime() > time.getTime();
          } else {
            return time.getTime() > Date.now(); //开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
      console.log(self.startTime);
    },

    viewLog() {
      this.isDialogShow = true;
      console.log("查看日志");
    },
    //
    handleSizeChange(newSize) {
      //改变每页的条数
      this.pagesize = newSize;

      //改变每页的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    handleCurrentChange(newPage) {
      //改变默认的页数
      this.currentPage = newPage;
    },

    // 上传文件调用方法
    // importFile() {
    //   if (this.startTime == "" && this.endTime == "") {
    //     alert("请先输入导入文件的起止日期");
    //   } else if (this.startTime == "") {
    //     alert("请先输入导入文件的起始日期");
    //   } else if (this.endTime == "") {
    //     alert("请先输入导入文件的结束日期");
    //   } else {
    //     this.isEditWinShow = true;
    //   }
    // },
    importFile() {
      if (this.startTime == "" && this.endTime == "") {
        alert("请先输入时间！");
      } else if (this.startTime == "") {
        alert("请输入开始时间！");
      } else if (this.endTime == "") {
        alert("请输入结束时间！");
      } else {
        this.isEditWinShow = true;
      }
    },

    /***批量上传操作 */
    //将数组乱码进行转化
    async checkedFile(options) {
      const {
        maxSize,
        multiUploadSize,
        getSize,
        isZip,
        splitUpload,
        singleUpload,
      } = this;
      const { file, onProgress, onSuccess, onError } = options;
      console.log(file); //打印文件信息
      if (file.size > maxSize) {
        return this.$message({
          message: `您选择的文件大于${getSize(maxSize)}`,
          type: "error",
        });
      }

      const uploadFunc = this.suffix == "zip" ? singleUpload : splitUpload;
      try {
        await uploadFunc(file, onProgress);
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.$refs.upload.clearFiles();
        this.isEditWinShow = false;
        this.importDetail();
      
      //上传成功才会进行这一步
      setTimeout(() => {
          this.importStartAndEndtime();
        }, 1000);

        onSuccess();
      } catch (e) {
        // console.error(e);
        this.$message({
          message: e.message,
          type: "error",
        });
        onError();
      }

      const prom = new Promise((resolve, reject) => {});

      prom.abort = () => {}; //终止正在进行的axios进程

      return prom;
    },
    // 格式化文件大小显示文字
    getSize(size) {
      return size > 1024
        ? size / 1024 > 1024
          ? size / (1024 * 1024) > 1024
            ? (size / (1024 * 1024 * 1024)).toFixed(2) + "GB"
            : (size / (1024 * 1024)).toFixed(2) + "MB"
          : (size / 1024).toFixed(2) + "KB"
        : size.toFixed(2) + "B";
    },

    //对文件进行分割若为zip则上传zip，不是则上传csv文件
    isZip() {
      //对文件名称切割字符串
      let fileName = this.file.fileName;
      let fileArr = fileName.split(".");
      //得到切割完成的后缀
      let suffix = fileName[fileArr.length - 1];
      console.log(suffix);
      return suffix;
    },
    // 单文件直接上传
    singleUpload(file, onProgress) {
      return this.postFile(
        { file, uid: file.uid, fileName: file.name },
        onProgress
      );
    },
    // 大文件分块上传
    splitUpload(file, onProgress) {
      return this.postFile(
        {
          file,
          fileName: file.name,
          uid: file.uid,
        },
        onProgress
      );
    },

    removeFile(file) {
      this.$refs.upload.clearFiles();
      this.requestCancelQueue[file.uid]();
      delete this.requestCancelQueue[file.uid];

      return true;
    },
    // 提交文件方法,将参数转换为FormData, 然后通过axios发起请求
    postFile(param, onProgress) {
      //绑定的上传日期传到后端作为表名
      var strstart = this.startTime;
      var date1 = new Date(strstart);
      var yy = date1.getFullYear() + "_";
      var mm =
        (date1.getMonth() + 1 < 10
          ? date1.getMonth() + 1
          : date1.getMonth() + 1) + "_";
      var dd = date1.getDate();

      this.datesInt = yy + mm + dd;
      console.log(this.datesInt); //可以出来
      var tableName = this.datesInt;
      const formData = new FormData();
      for (let p in param) {
        formData.append(p, param[p]);
      }
      const { requestCancelQueue } = this;
      const config = {
        cancelToken: new axios.CancelToken(function executor(cancel) {
          if (requestCancelQueue[param.uid]) {
            requestCancelQueue[param.uid]();
            delete requestCancelQueue[param.uid];
          }
          requestCancelQueue[param.uid] = cancel;
        }),
        onUploadProgress: (e) => {
          if (param.chunked) {
            e.percent = Number(
              (
                ((param.chunk * (param.eachSize - 1) + e.loaded) /
                  param.fullSize) *
                100
              ).toFixed(2)
            );
          } else {
            e.percent = Number(((e.loaded / e.total) * 100).toFixed(2));
          }
          onProgress(e);
        },
      };
  
        return axios
          .post(
            "http://101.69.255.134:9001/5G_info/importCsv?tableName=" +
              this.datesInt,
            formData,
            config
          )
          .then((response) => {
            this.newSuccessNum = response.data.successNum;
            this.newFailNum = response.data.failNum;
            this.totalNum = response.data.totalNum;
            this.uploadName = response.data.filename;
          });
      
    },
   

    //将新上传的数据详情导入数据库
    importDetail() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds
          : new Date().getSeconds();

      this.date = yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss;
      this.$api.post(
        "5G_info/importDetail",
        {
          importDate: this.importDate,
          totalNum11: this.totalNum,
          successNum11: this.newSuccessNum,
          failNum11: this.newFailNum,
        },
        (response) => {
          if (response.status !== 200) {
            console.log("插入详情失败！");
          } else {
            //   this.getStations(this.addForm.gNBID);

            console.log("插入详情成功！");
            console.log(response.data);
            //隐藏添加用户的对话框
          }
        }
      );
    },
    //将文件内容的起止时间插入到数据库中
    importStartAndEndtime() {
      // this.checkedFile();
      //对得到的文件名进行分割
      console.log(this.startTime);
      console.log(this.endTime); //可以得出文件名
      var subName = this.uploadName.substr(0, this.uploadName.length - 4); //得出切割后缀后的文件名
      //上传的起止时间
      var dateBegin = this.startTime;
      var date1 = new Date(dateBegin);
      var yy = date1.getFullYear() + "_";
      var mm =
        (date1.getMonth() + 1 < 10
          ? date1.getMonth() + 1
          : date1.getMonth() + 1) + "_";
      var dd = date1.getDate();
      this.dateTime = yy + mm + dd;
      console.log(this.dateTime);
      //上传的起始时间

      var strstart = this.startTime;
      var date2 = new Date(strstart);
      var dateStart = Date.parse(date2);
      console.log(dateStart);
      //上传的结束时间
      var strend = this.endTime;
      var date3 = new Date(
        new Date(new Date(strend).toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      );
      var dateEnd = Date.parse(date3);
      console.log(dateEnd);
      

      this.$api.post(
        "5G_info/importStartAndEndtime",
        {
          fileName: this.dateTime,
          dateTime: this.dateTime,
          startTime: dateStart,
          endTime: dateEnd,
        },
        (response) => {
          if (response.status !== 200) {
            console.log("时间数据插入失败");
          } else {
            console.log("时间数据插入成功");
            
          }
        }
      );
    },
  },
};
</script>

<style lang="less" >
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
.el-date-editor.el-input {
  width: 200px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
}
.el-input__inner {
  width: 100%;
  text-align: center;
  display: inline-block;
}

.bs {
  padding: 10px;
  text-align: center;
  font-size: 16px;
}
.update-bs {
  border-radius: 5px;
  background-color: rgb(0, 153, 255);
  font-size: 14px;
}
.el-pagination {
  margin-top: 15px;
}
/**设置表格文字居中(没作用) */
.el-table th > .cell {
  text-align: center;
}
.el-table .cell {
  text-align: center;
}
// 表格一显示纵向滚东条
.table-container {
  /* 表格整体 */
  width: 1000px;
  height: 600px;
  margin-left: 2px;
  margin-top: 5px;
}
</style>
