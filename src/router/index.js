import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const submitCement = r => require.ensure([], () => r(require('@/components/demo/submitCement')), 'submitCement');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const searchStation = r => require.ensure([], () => r(require('@/page/searchStation')), 'searchStation');
const reportPage = r => require.ensure([], () => r(require('@/page/reportPage')), 'reportPage');
const testTable = r => require.ensure([], () => r(require('@/page/testTable')), 'testTable');
const rsrpShow = r => require.ensure([], () => r(require('@/page/rsrpShow')), 'rsrpShow');
const throughpurShow = r => require.ensure([], () => r(require('@/page/throughpurShow')), 'throughpurShow');
const sinrShow = r => require.ensure([], () => r(require('@/page/sinrShow')), 'sinrShow');
const pciShow = r => require.ensure([], () => r(require('@/page/pciShow')), 'pciShow');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const stationshow = r => require.ensure([], () => r(require('@/components/station/StationShow')), 'stationshow');
const test1 = r => require.ensure([], () => r(require('@/components/demo/test1')), 'test1');
const othersShow = r => require.ensure([], () => r(require('@/page/othersShow')), 'othersShow');
const sectorShow = r => require.ensure([], () => r(require('@/page/sectorShow')), 'sectorShow');
const coverShow = r => require.ensure([], () => r(require('@/page/coverShow')), 'coverShow');
const interferenceShow = r => require.ensure([], () => r(require('@/page/interferenceShow')), 'interferenceShow');
const collectStationInfos = r => require.ensure([], () => r(require('@/page/collectStationInfos')), 'collectStationInfos');
const addAllStations = r => require.ensure([], () => r(require('@/page/addAllStations')), 'addAllStations');
const addStations = r => require.ensure([], () => r(require('@/page/addStations')), 'addStations');
const deleteStations = r => require.ensure([], () => r(require('@/page/deleteStations')), 'deleteStations');
const updateStations = r => require.ensure([], () => r(require('@/page/updateStations')), 'updateStations');
// const aa = r => require.ensure([], () => r(require('@/page/aa')), 'aa');

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: ['全览图'],
        }, {
            path: '/addShop',
            component: addShop,
            meta: ['添加数据', '添加商铺'],
        }, {
            path: '/addGoods',
            component: addGoods,
            meta: ['添加数据', '添加商品'],
        }, {
            path: '/userList',
            component: userList,
            meta: ['数据管理', '用户列表'],
        }, {
            path: '/shopList',
            component: shopList,
            meta: ['数据管理', '商家列表'],
        }, {
            path: '/foodList',
            component: foodList,
            meta: ['数据管理', '食品列表'],
        }, {
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单列表'],
        }, {
            path: '/adminList',
            component: adminList,
            meta: ['数据管理', '管理员列表'],
        }, {
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        }, {
            path: '/newMember',
            component: newMember,
            meta: ['图表', '用户数据'],
        }, {
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        }, {
            path: '/vueEdit',
            component: vueEdit,
            meta: ['编辑', '文本编辑'],
        }, {
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        }, {
            path: '/sendMessage',
            component: sendMessage,
            meta: ['设置', '发送通知'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明', '说明'],
        }, {
            path: '/stationshow',
            component: stationshow,
            meta: ['查看', '地图'],
        }, {
            path: '/test1',
            component: test1,
            meta: ['查看', '地图1'],
        }, {
            path: '/searchStation',
            component: searchStation,
            meta: ['查看', '基站'],
        }, {
            path: '/reportPage',
            component: reportPage,
            meta: ['下载', '报告页'],
        }, {
            path: '/testTable',
            component: testTable,
            meta: ['下载', '测试表格'],
        }, {
            path: '/rsrpShow',
            component: rsrpShow,
            meta: ['效果图', 'rsrp'],
        },{
            path: '/submitCement',
            component: submitCement,
        },{
            path: '/throughpurShow',
            component: throughpurShow,
            meta: ['效果图', 'throughpur'],
        },{
            path: '/sinrShow',
            component: sinrShow,
            meta: ['效果图', 'sinr'],
        },{
            path: '/pciShow',
            component: pciShow,
            meta: ['效果图', 'pci'],
        },{
            path: '/othersShow',
            component: othersShow,
            meta: ['5G指标', '其他性能'],
        },{
            path: '/sectorShow',
            component: sectorShow,
            meta: ['GIS专项展示', '扇区图'],
        }, {
            path: '/coverShow',
            component: coverShow,
            meta: ['5G指标展示', '覆盖性展示'],
        },
        {
            path: '/interferenceShow',
            component: interferenceShow,
            meta: ['5G指标展示', '干扰展示'],
        },
        {
            path: '/collectStationInfos',
            component: collectStationInfos,
            meta: ['数据管理', '数据采集'],
        },
        {
            path: '/addAllStations',
            component: addAllStations,
            meta: ['数据管理', '数据批量导入'],
        },
        {
            path: '/addStations',
            component: addStations,
            meta: ['数据管理', '数据添加'],
        },
        {
            path: '/deleteStations',
            component: deleteStations,
            meta: ['数据管理', '数据删除'],
        },
        {
            path: '/updateStations',
            component: updateStations,
            meta: ['数据管理', '数据修改'],
        }]
    }
]

export default new Router({
    routes,
    // mode: "history",
    strict: process.env.NODE_ENV !== 'production',
})
