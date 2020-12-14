<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #111111;">
                <el-menu :default-active="defaultActive" style="min-height: 100%; backgroundColor: #111111" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                        <el-menu-item index="searchStation">展示基站数据</el-menu-item>
                        <!-- <el-menu-item index="reportPage">报告页下载</el-menu-item>
                        <el-menu-item index="testTable">测试表格下载</el-menu-item> -->
                        <!-- <el-menu-item index="collectStationInfos">数据采集</el-menu-item> -->
                        <el-menu-item index="addAllStations">数据批量导入</el-menu-item>
                        <el-menu-item index="addStations">数据添加</el-menu-item>
                        <el-menu-item index="deleteStations">数据删除</el-menu-item>
                        <el-menu-item index="updateStations">数据修改</el-menu-item>
                        <!-- <el-menu-item index="aa">AA</el-menu-item> -->
                        
                        <!-- <el-menu-item index="userList">用户列表</el-menu-item>-->
                        <!-- <el-menu-item index="shopList">商家列表</el-menu-item>-->
                        <!-- <el-menu-item index="foodList">食品列表</el-menu-item>-->
                        <!-- <el-menu-item index="orderList">订单列表</el-menu-item>-->
                        <!-- <el-menu-item index="adminList">管理员列表</el-menu-item>-->
                    </el-submenu>
                    <!-- <el-submenu index="3">-->
                    <!-- <template slot="title"><i class="el-icon-plus"></i>添加数据</template>-->
                    <!-- <el-menu-item>添加基站数据</el-menu-item>-->
                    <!-- &lt;!&ndash; <el-menu-item index="addShop">添加商铺</el-menu-item>&ndash;&gt;-->
                    <!-- &lt;!&ndash; <el-menu-item index="addGoods">添加商品</el-menu-item>&ndash;&gt;-->
                    <!-- </el-submenu>-->
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-plus"></i>5G指标展示</template>
                        <el-menu-item index="coverShow">覆盖性展示</el-menu-item>
                        <el-menu-item index="coverShowAllAround">全范围覆盖性展示</el-menu-item>
                        <!-- <el-menu-item index="interferenceShow">干扰展示</el-menu-item> -->
                        <el-menu-item index="othersShow">其他性能展示</el-menu-item>
                    </el-submenu>
                    <!-- <el-submenu index="5">
                        <template slot="title"><i class="el-icon-plus"></i>其他性能</template>
                        <el-menu-item index="5-1">折线图</el-menu-item>
                    </el-submenu> -->
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-view"></i>GIS专项展示</template>
                        <!-- <el-menu-item index="heatMap">热力图</el-menu-item> -->
                        <el-menu-item index="sectorShow">扇区图</el-menu-item>
                    </el-submenu>
                    <!-- <el-submenu index="7">
                        <template slot="title"><i class="el-icon-minus"></i>智能分析</template>
                        <el-menu-item index="dataAnalysis">数据分析</el-menu-item>
                    </el-submenu> -->
                    <el-submenu index="8">
                        <template slot="title"><i class="el-icon-plus"></i>报表展示</template>
                        <el-menu-item index="reportPage">报告页下载</el-menu-item>
                        <el-menu-item index="testTable">测试表格下载</el-menu-item>
                    </el-submenu>
                    <el-submenu index="9">
                        <template slot="title"><i class="el-icon-star-on"></i>效果图展示</template>
                        <el-menu-item index="rsrpShow">RSRP效果图</el-menu-item>
                        <el-menu-item index="throughpurShow">Throughpur效果图</el-menu-item>
                        <el-menu-item index="sinrShow">SINR效果图</el-menu-item>
                        <el-menu-item index="pciShow">PCI效果图</el-menu-item>
                        <!-- <el-menu-item index="visitor">用户分布</el-menu-item>-->
                        <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="10">
                        <template slot="title"><i class="el-icon-edit"></i>编辑</template>
                        <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                        <el-menu-item index="vueEdit">文本编辑</el-menu-item>
                    </el-submenu>
                    <el-submenu index="11">
                        <template slot="title"><i class="el-icon-setting"></i>设置</template>
                        <!-- <el-menu-item index="adminSet">管理员设置</el-menu-item>-->
                        <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="12">
                        <template slot="title"><i class="el-icon-warning"></i>说明</template>
                        <el-menu-item index="explain">说明</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';

//     .manage_page {
//         /*background-color: #d1dbe5;*/
//     }
//   .aside {
//     background-color: #D3DCE6;
//     color: #333;
//     text-align: center;
//     line-height: 200px;
//   }
//   .main {
//     background-color: #E9EEF3;
//     color: #333;
//     text-align: center;
//     line-height: 160px;
//   }
</style>