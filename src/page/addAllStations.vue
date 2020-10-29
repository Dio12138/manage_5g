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
      <el-button type="primary" @click="importFile">批量导入文件</el-button>
      <!-- 显示数据表上传信息 -->
      <!-- <div class="scrollbarDiv1"> -->
      <!-- <el-scrollbar > -->
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
              @click="viewLog($index, row)"
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
            <el-col :span="24">
              <!-- 上传表单 -->
              <!-- https://jsonplaceholder.typicode.com/posts/ -->
              <!-- action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/" -->
              <!-- action="http://localhost:8002/F:/Study/PHP/phpStudy/phpstudy_pro/WWW/tp5_5g/public/uploads" -->
              <el-upload
                ref="upload"
                accept=".csv"
                action="http://pet.qinqingonline.com:9001/uploads/uploadsCSV"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="fileList"
                :auto-upload="true"
                :on-success="hanleSuccess"
              >
                <el-button
                  slot="trigger"
                  type="primary"
                  size="small"
                  align="right"
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="submitUpload"
                  >确定上传</el-button
                >
                <div slot="tip" class="el-upload__tip">请上传csv文件</div>
              </el-upload>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 按日期查询区域 -->
      <el-table
        class="scrollbarDiv2"
        :data="
          detailList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        v-if="isOning == true"
        v-model="isOning"
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
      <!-- 分页区域1-->
      <!-- <el-pagination
        :data="importData.slice((currentPage1 - 1) * pagesize1, currentPage1 * pagesize1)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes1"
        :page-size="pagesize1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination> -->
      <!-- 分页区域2-->

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
      pagesizes: [1, 2, 3, 4],
      // 每页显示的总条数
      pagesize: 1,
      havePagination: false,

      tableData: [],
      // 上传文件数据
      fileData: "",
      fileList: [],
      inventoryRequests: [],
      newData: [],
      isEditWinShow: false,
      isLoading: false,
      finished: false,
      //成功的数目
      successNum1: 0,
      failNum1: 0,
      //显示进度条
      progress: 0,
      progressSeen: false,
    };
  },
  created() {
    this.getDetailList();
  },
  methods: {
//     action(){
// return process.env.VUE_APP_BASE_API+'/uploadfile/'
//     },
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
              // console.log(this.importData);
              console.log("success");
            } else {
              console.log("fail");
            }
          } else {
            console.log("网页连接失败！");
            console.log(response.message);
          }
        }
      );
    },
    // 根据日期查找上传记录
    searchDetailByDate() {
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
              this.detailList = response.data.detailList;
              this.totalCount = response.data.detailList.length; //获取数组的长度
              console.log(this.totalCount);
              console.log("success");
            } else {
              console.log("fail");
            }
          } else {
            console.log("网页连接失败！");
            console.log(response.message);
          }
        }
      );
    },
    viewLog() {
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
    importFile() {
      this.isEditWinShow = true;
    },

    /***批量上传操作 */
    //将数组乱码进行转化
    checkEncoding(base64Str) {
      var str = atob(base64Str.split(";base64,")[1]);
      var encoding = jschardet.detect(str);
      encoding = encoding.encoding;
      if (encoding === "window-1252") {
        encoding = "ANSI";
      }
      return encoding;
    },
    // 文件上传之前被转化
    beforeUpload(file) {
      let excelfileExtend = ".csv"; //设置文件格式
      let fileExtend = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!excelfileExtend.includes(fileExtend)) {
        this.$message.error("文件格式错误");
        return false;
      } else {
        const fileSize=file.size/1024/1024<500;
        if(!fileSize){
          this.$message.warning(
            "请选择文件小于500M"
          );
        }else{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
          // console.log(evt);
          const data = evt.target.result;
          const encoding = this.checkEncoding(data);
          // console.log(this.file);//不存在
          Papa.parse(file, {
            encoding: encoding,
            header: true,
            complete: (results) => {
              this.inventoryRequests = results.data;
              let newData = this.inventoryRequests.pop();
              // console.log(this.newData);
              console.log(this.inventoryRequests);//分析数据
          console.log("分析完成");
            },
          });
          return false;
        };
      }}
    },
    //封装api请求
    uploadData(json) {
      return new Promise((resolve, reject) => {
        this.$api.post("5G_info/addBatch", { json }, (response) => {
          if (response.status !== 200) {
            reject("后台连接失败");
          } else {
            if (response.data.success) {
            
              resolve(json);
              console.log("数据插入成功");
              
              this.successNum1 += response.data.successNum;
              console.log(this.successNum1);
            } else {
              console.log("数据插入失败");
              this.failNum1 += response.data.failNum;
              console.log(this.failNum1);
              resolve(json);

            }
          }
        });
      });
    },

    submitUpload(file, fileList) {
      console.log(file);
      // this.progressSeen = true;
      const totalNum = this.inventoryRequests.length;
      if (this.inventoryRequests.length === 0) {
        this.$message.warning(`请先传入csv文件。`);
        return false;
      } else {
        const loading = this.$loading({
          lock: true,
          text: "正在上传文件，请稍后！",
          spinner: "el-icon-loading",
          background: "rgba(0,0,0,0.7)",
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
        // onUploadProgress: (progressEvent) => {
        //   var complete =
        //     ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        //   this.progress = complete;
        // };
        // 进度条显示
        // const config={
        //   onUploadProgress:progressEvent=>{
        //     this.progressPercent=Number((ProgressEvent.loaded/progressEvent.total*100).toFixed(2))
        //   }
        // }
        // console.log(this.inventoryRequests);
        // const totalNum = this.inventoryRequests.length;

        if (totalNum > 50) {
          let intNum = parseInt(this.inventoryRequests.length / 50); //取整数
          let charNum = this.inventoryRequests.length - 50 * intNum; //取余数
          let arr = [];
          let result = [];
          const sliceNum = 50; //取每次截取的长度（result的对象长度）
          for (let i = 0; i < totalNum / sliceNum; i++) {
            result.push(
              this.inventoryRequests.slice(i * sliceNum, (i + 1) * sliceNum)
            );
          }
          for (let j = 0; j < sliceNum - (totalNum % sliceNum); j++) {
            result[result.length - 1].push({});
          }

          for (var i = 0; i < result[intNum].length; i++) {
            if (
              result[intNum][i] == "" ||
              result[intNum][i] == null ||
              JSON.stringify(result[intNum][i]) == "{}"
            ) {
              result[intNum].splice(i, 1);
              i = i - 1;
            }
          }
          result.reduce(async (pre, cur, i) => {
            let stringData = JSON.stringify(result[i]);
            await pre;
            return this.uploadData(stringData);
          }, Promise.resolve());
        } else if (totalNum < 50) {
          let json = JSON.stringify(this.inventoryRequests);
          this.$api.post("5G_info/addBatch", { json }, (response) => {
            if (response.status !== 200) {
              console.log("后台连接失败");
            } else {
              if (response.data.success) {
                this.successNum1 += response.data.successNum;
                console.log("数据插入成功");
              } else {
                this.failNum1 += response.data.failNum;
                console.log("数据插入失败");
              }
            }
          });
        }
        // console.log(file);
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
        this.isEditWinShow = false;
        setTimeout(() => {
          this.importDetail();
          this.$message({
            message: "上传成功！",
            type: "success",
          });
        }, 2000);
        // this.$refs.uploads.clearFiles();
      }
    },
    hanleSuccess(response, file) {
      this.$refs.upload.clearFiles();
      // console.log(this.inventoryRequests);
    },

    // 将上传成功、失败的数目导入数据库
    importDetail() {
      let totalNum1 = this.successNum1 + this.failNum1;
      console.log(totalNum1); //原因是在本函数中定义的变量是不需要加this的
      this.$api.post(
        "5G_info/importDetail",
        {
          importDate: this.importDate,
          totalNum11: totalNum1,
          successNum11: this.successNum1,
          failNum11: this.failNum1,
        },
        (response) => {
          console.log("成功");
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
