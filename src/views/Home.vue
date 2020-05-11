<template>
  <el-container class="home-container">
    <el-header>
      <div class="el-header-top">
        <div class="el-header-top-left">
          <div style="width:2vh"></div>YQ 云平台管理系统
        </div>
        <div class="el-header-top-right" @click="openOrClose()">
          <div class="el-header-top-right-div1"></div>
          <div class="el-header-top-right-div2">
            <div></div>
            <div>
              <el-tooltip content="系统功能" placement="left-start" :enterable="false" effect="light">
                <i class="el-icon-s-tools" @click.stop="handleIsShowLiteMenu()"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!--容器上的div-->
      <div class="el-header-bottom" @click="closeOrOpen()"></div>
      <!--系统小菜单-->
      <div class="el-header-menu-container" v-show="isShowLiteMenu">
        <el-menu default-active="litle-memu-1" background-color="rgb(195,232,248)" active-text-color="rgb(68,168,236)">
          <el-submenu index="litle-memu">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统功能</span>
            </template>
            <el-menu-item @click="handleLogout()" index="litle-memu-1">
              <i class="el-icon-user-solid"></i>
              <span>退出</span>
            </el-menu-item>
            <el-menu-item @click="handleIsShowLiteMenu()" index="litle-memu-2">
              <i class="el-icon-close"></i>
              <span>关闭</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏左 -->
      <el-aside :width="iscollapse_left ? '0':'19.1%'" class="el-aside-left">
        <div class="el-aside-div">
          <!--图表-->
          <div class="el-aside-div-item" v-for="i in 1">
            <el-menu :collapse-transition="false" :collapse="iscollapse_left" router background-color="rgb(195,232,248)" active-text-color="rgb(68,168,236)">

              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  系统统计
                </template>
                <el-menu-item index="/echarts">图表</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>

          <div class="el-aside-div-item">
            <el-menu :collapse-transition="false" :collapse="iscollapse_left" router background-color="rgb(195,232,248)" active-text-color="rgb(68,168,236)">
              <!--动态 路由绑定-->

              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  用户管理
                </template>

                <el-menu-item index="/userlist">用户信息</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>

          <div class="el-aside-div-item">
            <el-menu :collapse-transition="false" :collapse="iscollapse_left" router background-color="rgb(195,232,248)" active-text-color="rgb(68,168,236)">
              <!--动态 路由绑定-->

              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  公司管理
                </template>

                <el-menu-item index="/companyinfo">公司信息</el-menu-item>
                <el-menu-item index="/departmentinfo">部门信息</el-menu-item>
                <el-menu-item index="/pensonnelinfo">员工信息</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-aside>
      <!-- /侧边栏左 -->
      <!-- 中间主体 -->
      <el-main>
        <div class="el-main-div">
          <router-view></router-view>
          <!-- 路由占位符 -->
        </div>
      </el-main>
      <!-- /中间主体 -->
      <!-- 侧边栏右 -->
      <!---->
      <el-aside :width="iscollapse_right ? '0':'19.1%'" class="el-aside-right">
        <div>
          <div>预留展示区域</div>
          <div>信息</div>
          <div>消息</div>
          <div>公告</div>
          <div>红文</div>
          <div>其他</div>
        </div>
      </el-aside>
      <!-- /侧边栏右 -->
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'owner-div-container',
  components: {},

  data () {
    return {
      //是否展开菜单 同时更改aside 宽度 左
      iscollapse_left: false,
      //是否展开菜单 同时更改aside 宽度 右
      iscollapse_right: true,
      //是否展示小菜单
      isShowLiteMenu: false,
      input3: '',
      menu_list: [{
        data: '用户管理',
        icon: 'el-icon-user-solid',
        children: [{
          data: '用户信息',
          icon: 'el-icon-s-custom',
          path: '/userlist'
        }]
      }],
      //图标
      iconsList: [
        'el-icon-user-solid',
        'el-icon-office-building',
        'el-icon-s-grid',
        'el-icon-s-home',
        'el-icon-truck',
        'el-icon-money',
        'el-icon-s-custom',
        'el-icon-s-tools'
      ]
      //logon图标
    }
  },
  methods: {
    //是否展开菜单左
    closeOrOpen () {
      this.iscollapse_left = !this.iscollapse_left
    },
    //是否展开菜单右
    openOrClose () {
      this.iscollapse_right = !this.iscollapse_right
    },
    //右上小菜单显示
    handleIsShowLiteMenu () {
      this.isShowLiteMenu = !this.isShowLiteMenu
    },
    handleLogout () {
      // 1销毁token令牌 2 返回登录页
      let message = `确定退出？`
      if (confirm(message)) {
        window.sessionStorage.removeItem('token')
        //弹出登录成功窗口
        this.$message.success('退出成功')
        //跳转到登录页面
        this.$router.push('/')
      }
    }
  },
  mounted: function () {
    let height = $('.el-main-div-top-div').css('height')
    $('.el-button,.el-row,.el-input__inner').css('height', height)
    //监听 菜单hover事件 强制改变hover 样式
    $('.el-aside-div-item-s').mouseover(function () {
      $(this).css('background-color', 'yellow')
    })
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/style.css';

.home-container {
  height: 100vh;
  width: 100vw;
}

//头部
.el-header {
  background: url('../../src/assets/image/heard.png');
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15% !important;
  padding: 0;
}

.el-header-top {
  height: 100%;
  width: 100%;
  //background-color: violet;
  display: flex;
  flex-direction: row;
}

.el-header-bottom {
  //height: 25%;
  width: 100%;
  display: flex;
  flex-direction: row;
  //background-color: yellow;
}

.el-header-top-left {
  flex: 3;
  display: flex;
  align-items: center;

  text-align: left;
  height: 100%;
  font-size: 5vmin;
  font-weight: 800;
  color: rgb(255, 255, 255);
  //text-shadow: 0 0 0.2em #87f, 0 0 0.2em #87f, 0 0 0.2em #87f;
}

.el-header-bottom {
  width: 19.1%;
  height: 15vh;
  z-index: 1;
  top: 0;
  position: absolute;
}

.el-header-menu-container {
  top: 0;
  right: 0;
  position: absolute;
  width: 150px;
  height: 150px;
  z-index: 2;

  //background-color: yellow;
}

.el-header-top-right {
  flex: 1;
  flex-direction: row;
  display: flex;
}

.el-header-top-right-div1 {
  width: 40%;
  height: 100%;
}

.el-header-top-right-div2 {
  width: 60%;
  height: 100%;
  display: flex;
  background: url('../assets/image/logo_user.jpg') no-repeat;
  background-size: 100% 100%;

  justify-content: flex-end;

  i {
    color: rgb(73, 187, 237);
    height: 5vmin;
    outline: none;
    font-size: 5vmin;
  }
}

//边界
.el-aside {
  flex-direction: column !important;
  display: flex !important;

  height: 85vh;
  overflow: hidden;

  .el-aside-div {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .el-aside-div-item {
    width: 90%;
    margin: 1vh auto;
    min-height: 54px;
    min-width: 130px;
  }
}

.el-aside-left {
  background: url('../../src/assets/image/asid.png');

  .el-menu,
  .el-submenu__title,
  .el-menu-item {
    border-right: 0;
  }
}

.el-submenu .el-menu-item {
  min-width: 0 !important; //干掉菜单的最小宽度很重要请不要更改
}

.el-main {
  background-color: #cccccc;
  padding: 0;
  width: 61.8% !important;
}

.el-main-div {
  display: flex;
  flex-direction: column;

  width: 98%;
  margin: auto;
  height: 98%;

  border-radius: 0.5em;
  box-shadow: 1px;
  border: 1px solid #ebeef5;

  background-color: rgb(256, 256, 256);
}

.el-aside-right div {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  width: 100%;
  height: 100%;
}

.el-submenu__title,
.el-menu,
.el-menu-item {
  background-color: rgb(195, 232, 248) !important;
}

.el-menu:hover {
  background-color: rgb(204, 204, 204) !important;
}

.el-submenu__title:hover {
  background-color: rgb(204, 204, 204) !important;
}

.el-menu-item:hover {
  background-color: rgb(204, 204, 204) !important;
}

//系统齿轮图标
</style>