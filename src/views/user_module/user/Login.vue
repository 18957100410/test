<template>
  <div class="owner-div-container">
    <div class="logo-word-container">YQ 云平台管理系统 {{$store.state.count}}</div>
    <div class="owner-div-mybox">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <div class="padding-div">
          <el-form-item prop="userName">
            <el-input placeholder="账号" prefix-icon="el-icon-user-solid" v-model="loginForm.userName" clearable ref="userName" name="userName"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input placeholder="密码" prefix-icon="el-icon-lock" v-model="loginForm.passWord" clearable type="password" show-password ref="passWord" name="passWord"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="el-button-last" type="success" size="medium" plain @click="submitLoginForm()">登&nbsp;&nbsp;录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="el-button-last" type="success" size="medium" plain @click="redirectToRegister()">注&nbsp;&nbsp;册</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isRememberPassWordChecked">记住密码</el-checkbox>
            <el-checkbox v-model="isRetrievePassWordChecked" class="hiddenSquareBoder" @change="doRetrievePassWordChecked">找回密码</el-checkbox>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { userLogin } from '../../../api/user_module/user/login'
export default {
  name: 'owner-div-container',
  components: {},
  data () {
    const validateUserName = (rule, value, callback) => {
      let regexp = /^[a-zA-Z0-9]{5,18}$/
      if (!regexp.test(value)) {
        callback(new Error('只能输入数字或者字母'))
      } else {
        callback()
      }
    }
    const validatePassWord = (rule, value, callback) => {
      let regexp = /^[a-zA-Z0-9]{5,18}$/
      if (!regexp.test(value)) {
        callback(new Error('只能输入数字或者字母'))
      } else {
        callback()
      }
    }
    return {
      /**登录 begin*/
      loginForm: {
        userName: '',
        passWord: ''
      },
      /**登录 end*/
      loginRules: {
        userName: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          },
          {
            validator: validateUserName,
            trigger: 'blur'
          }
        ],
        passWord: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          },
          {
            validator: validatePassWord,
            trigger: 'blur'
          }
        ]
      },
      //是否记住密码
      isRememberPassWordChecked: false,
      isRetrievePassWordChecked: false
    }
  },
  methods: {
    /*跳转到注册页面 */
    redirectToRegister () {
      this.$router.push('/register')
    },
    submitLoginForm () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          /*axios后台验证登录账号密码是否正确 */
          //console.log(userLogin(this.loginForm))
          await userLogin(this.loginForm).then(response => {
            const { data } = response

            if (data.code == 20000) {
              //验证通过处理记住密码
              //判断复选框是否被勾选 勾选则调用配置cookie方法
              if (this.isRememberPassWordChecked) {
                //传入账号名，密码，和保存天数3个参数
                this.setCookie(
                  this.loginForm.userName,
                  this.loginForm.passWord,
                  7
                )
              } else {
                this.clearCookie()
              }
              //保存用户信息
              this.$store.commit('setUserinfo', data.data)
              //保存token
              window.sessionStorage.setItem('token', data.data.token)
              //弹出登录成功窗口
              this.$message.success('登录成功')
              //跳转到主页面
              this.$router.push('/home')
            } else {
              //弹出登录失败窗口
              this.$message.error('登录失败请查验您的账号密码是否都正确')
              return false
            }
          })
        } else {
          //弹出登录失败窗口
          this.$message.error('登录失败请查验您的账号密码是否都正确')
          return false
        }
      })
    },

    /**处理找回密码 */
    doRetrievePassWordChecked () {
      if (this.isRetrievePassWordChecked) {
        console.log('待处理')
      }
    },
    //设置cookie
    setCookie (c_name, c_pwd, exdays) {
      var exdate = new Date() //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
      //字符串拼接cookie

      window.document.cookie =
        'userName' +
        '=' +
        c_name +
        ';expires=' +
        exdate.toGMTString() +
        ';path=/'
      window.document.cookie =
        'passWord' +
        '=' +
        c_pwd +
        ';expires=' +
        exdate.toGMTString() +
        ';path=/'
    },
    //读取cookie中 账号和密码 并返回结果存在为true
    getCookie: function () {
      let isContainUserName = false,
        isContainPassWord = false
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') //再次切割
          console.log(arr[i])
          //判断查找相对应的值
          if (arr2[0] == 'userName') {
            isContainUserName = true
            this.loginForm.userName = arr2[1] //保存到保存数据的地方
          } else if (arr2[0] == 'passWord') {
            isContainPassWord = true
            this.loginForm.passWord = arr2[1]
          }
        }
      }
      if (isContainUserName && isContainPassWord) {
        return true
      } else {
        return false
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) //修改2值都为空，天数为负1天就好了
    }
  },

  mounted: function () {
    this.$nextTick(() => {
      this.isRememberPassWordChecked = this.getCookie()
    })
    if ($('.padding-div')) {
      let marginTop = $('.padding-div').offset().top
      if (marginTop > 0) {
        $('.logo-word-container').height(marginTop)
        $('.logo-word-container').css('line-height', marginTop + 'px')
      }
    }

    //监听窗口缩放
    $(window).resize(function () {
      if ($('.padding-div')) {
        if ($('.padding-div').offset()) {
          let marginTop = $('.padding-div').offset().top
          if (marginTop > 0) {
            $('.logo-word-container').height(marginTop)
            $('.logo-word-container').css('line-height', marginTop + 'px')
          }
        }
      }
    })
  }
}
</script>
<style scoped lang="less">
.padding-div {
  padding: 60px 60px 0 60px;
}
.owner-div-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url('../../../assets/image/login_bgi.png') no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
//头部logo字体
.logo-word-container {
  font-size: 5vmin;
  position: fixed;
  top: 0;
  //line-height: 1px;

  color: rgb(255, 255, 255);
}
.owner-div-mybox {
  min-width: 200px;
  .el-form {
    background-image: url('../../../assets/image/login_shadow.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}

.el-input__inner {
  width: 100% !important;
  //透明

  background: transparent;
  color: rgb(255, 255, 255) !important;
}

.el-select {
  display: inline !important;
  position: static !important;
}

.el-form-item__content:first-child {
  text-align: center;
}

.el-button-last {
  text-align: center;
  width: 100%;
}
.hiddenSquareBoder {
  .el-checkbox__inner {
    border: none;
    background-color: transparent;
    visibility: hidden;
  }
}
</style>