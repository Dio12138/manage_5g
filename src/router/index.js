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
const stationshow_1 = r => require.ensure([], () => r(require('@/components/station/StationShow_1')), 'stationshow_1');
const test1 = r => require.ensure([], () => r(require('@/components/demo/test1')), 'test1');
const othersShow = r => require.ensure([], () => r(require('@/page/othersShow')), 'othersShow');
const sectorShow = r => require.ensure([], () => r(require('@/page/sectorShow')), 'sectorShow');
const coverShow = r => require.ensure([], () => r(require('@/page/coverShow')), 'coverShow');
const coverShowAllAround = r => require.ensure([], () => r(require('@/page/coverShowAllAround')), 'coverShowAllAround');
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
            meta: ['?????????'],
        }, {
            path: '/addShop',
            component: addShop,
            meta: ['????????????', '????????????'],
        }, {
            path: '/addGoods',
            component: addGoods,
            meta: ['????????????', '????????????'],
        }, {
            path: '/userList',
            component: userList,
            meta: ['????????????', '????????????'],
        }, {
            path: '/shopList',
            component: shopList,
            meta: ['????????????', '????????????'],
        }, {
            path: '/foodList',
            component: foodList,
            meta: ['????????????', '????????????'],
        }, {
            path: '/orderList',
            component: orderList,
            meta: ['????????????', '????????????'],
        }, {
            path: '/adminList',
            component: adminList,
            meta: ['????????????', '???????????????'],
        }, {
            path: '/visitor',
            component: visitor,
            meta: ['??????', '????????????'],
        }, {
            path: '/newMember',
            component: newMember,
            meta: ['??????', '????????????'],
        }, {
            path: '/uploadImg',
            component: uploadImg,
            meta: ['????????????', 'MarkDown'],
        }, {
            path: '/vueEdit',
            component: vueEdit,
            meta: ['??????', '????????????'],
        }, {
            path: '/adminSet',
            component: adminSet,
            meta: ['??????', '???????????????'],
        }, {
            path: '/sendMessage',
            component: sendMessage,
            meta: ['??????', '????????????'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['??????', '??????'],
        },
        //  {
        //     path: '/stationshow',
        //     component: stationshow,
        //     meta: ['??????', '??????'],
        // },
        {
            path: '/stationshow_1',
            component: stationshow_1,
            meta: ['??????', '??????'],
        },
         {
            path: '/test1',
            component: test1,
            meta: ['??????', '??????1'],
        }, {
            path: '/searchStation',
            component: searchStation,
            meta: ['??????', '??????'],
        }, {
            path: '/reportPage',
            component: reportPage,
            meta: ['??????', '?????????'],
        }, {
            path: '/testTable',
            component: testTable,
            meta: ['??????', '????????????'],
        }, {
            path: '/rsrpShow',
            component: rsrpShow,
            meta: ['?????????', 'rsrp'],
        },{
            path: '/submitCement',
            component: submitCement,
        },{
            path: '/throughpurShow',
            component: throughpurShow,
            meta: ['?????????', 'throughpur'],
        },{
            path: '/sinrShow',
            component: sinrShow,
            meta: ['?????????', 'sinr'],
        },{
            path: '/pciShow',
            component: pciShow,
            meta: ['?????????', 'pci'],
        },{
            path: '/othersShow',
            component: othersShow,
            meta: ['5G??????', '????????????'],
        },{
            path: '/sectorShow',
            component: sectorShow,
            meta: ['GIS????????????', '?????????'],
        }, {
            path: '/coverShow',
            component: coverShow,
            meta: ['5G????????????', '???????????????'],
        },
        {
            path: '/coverShowAllAround',
            component: coverShowAllAround,
            meta: ['5G????????????', '????????????????????????'],
        },
        {
            path: '/interferenceShow',
            component: interferenceShow,
            meta: ['5G????????????', '????????????'],
        },
        {
            path: '/collectStationInfos',
            component: collectStationInfos,
            meta: ['????????????', '????????????'],
        },
        {
            path: '/addAllStations',
            component: addAllStations,
            meta: ['????????????', '??????????????????'],
        },
        {
            path: '/addStations',
            component: addStations,
            meta: ['????????????', '????????????'],
        },
        {
            path: '/deleteStations',
            component: deleteStations,
            meta: ['????????????', '????????????'],
        },
        {
            path: '/updateStations',
            component: updateStations,
            meta: ['????????????', '????????????'],
        }]
    }
]

export default new Router({
    routes,
    // mode: "history",
    strict: process.env.NODE_ENV !== 'production',
})
