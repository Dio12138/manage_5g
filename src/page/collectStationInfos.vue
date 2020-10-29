<template>
  <div >
    <head-top></head-top>   
      <el-card>
        <!--搜索 添加 -->
        <el-name class="bs1">日期</el-name>
        <el-input
          class="wb1"
          v-model="input"
          placeholder="请输入日期"
        ></el-input>
        <el-name class="bs1">基站ID</el-name>
        <el-input
          class="wb1"
          placeholder="请输入基站id"
          @keyup.enter.native="getStations"
        ></el-input>
        <el-button type="primary" @click="getStations">查询</el-button>
        <!-- <el-name>数据采集</el-name> -->
        <el-input
          class="wb1"
          type="file"
          id="files"
          ref="refFile"
          v-on:change="importCsv"
        ></el-input>
        <el-button type="primary" @click="confirmUpload">确定上传</el-button>
      </el-card>
   
    <!-- <div class="map-part">
      <h2>百度地图</h2>
    </div> -->
  </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
  name: "collectStationInfos",
  components: {
    headTop,
  },
  methods: {
    importCsv() {
      let selectedFile = null;
      selectedFile = this.$refs.refFile.files[0];
      if (selectedFile === undefined) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      read.onload = (evt) => {
        //对代码进行检查
        let encoding = this.checkEncoding(evt.target.result);
        //将csv转换成数组
        Papa.parse(selectedFile, {
          encoding: "ANSI",
          complete: (res) => {
            let data = res.data;
            if (data[data.length] - 1 == " ") {
              //去除的是最后一行空行
              data.pop();
            }
            //data就是文件里面的数据
            console.log(data);
          },
        });
      };
    },
    confirmUpload() {
      console.log("上传成功！！！");
    },
  },
};
</script>

<style>
.page {
  width: 100%;
}
.search-part {
  width: 45%;
  height: 100%;
  float: left;
  padding: 0;
  margin: 0;
}
/* .map-part {
 
  width: 55%;
  height: 100%;
  float: right;
  padding: 0;
  margin: 0;
  font-size: 90px;
  align-content: center;
} */
.wb1 {
  width: 300px;
  
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
}
.b2,
.b3 {
  margin-left: 20px;
}
.bs1 {
  padding: 10px;
  text-align: center;
  font-size: 16px;
}
</style>