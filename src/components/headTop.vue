<template>
    <div class="header_container">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <header class="section_title1" style="color: #1d90e6">杭州5G基站管理系统</header>
<!--        <img class="avator" src="/static/img/jizhan1.png">-->
<!--        <el-dropdown @command="handleCommand" menu-align='start'>-->
<!--            <img :src="baseImgPath + adminInfo.avatar" class="avator">-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--                &lt;!&ndash;				<el-dropdown-item command="home">首页</el-dropdown-item>&ndash;&gt;-->
<!--                &lt;!&ndash;				<el-dropdown-item command="signout">退出</el-dropdown-item>&ndash;&gt;-->
<!--                <el-button type="primary" @click="tologin" class="submit_btn">退出</el-button>-->
<!--            </el-dropdown-menu>-->
<!--        </el-dropdown>-->
        <el-button size="small" @click="tologin" type="success">退出</el-button>
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'

	export default {
		data() {
			return {
				baseImgPath,
			}
		},
		created() {
			if (!this.adminInfo.id) {
				this.getAdminData()
			}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			...mapActions(['getAdminData']),
			tologin() {
				this.$router.push('/');
			},
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				} else if (command == 'signout') {
					const res = await signout()
					if (res.status == 1) {
						this.$message({
							type: 'success',
							message: '退出成功'
						});
						this.$router.push('/');
					} else {
						this.$message({
							type: 'error',
							message: res.message
						});
					}
				}
			},
		}
	}
</script>

<style lang="less">
    @import '../style/mixin';

    .header_container {
        background-color: #111111;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
		padding-left: 20px;;
    }
    .section_title1{
        text-align: center;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .avator {
        .wh(40px, 40px);
        border-radius: 50%;
        margin-right: 50px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
