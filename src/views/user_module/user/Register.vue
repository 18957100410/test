<template>
  <div class="owner-div-container">
    <div class="logo-word-container"></div>
    <div class="owner-div-mybox">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
       
        <div class="padding-div">
          <el-form-item prop="userName">
            <el-input
              placeholder="账号"
              prefix-icon="el-icon-user-solid"
              v-model="registerForm.userName"
              clearable
              ref="userName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              placeholder="密码"
              prefix-icon="el-icon-lock"
              v-model="registerForm.passWord"
              clearable
              type="password"
              show-password
              ref="passWord"
            ></el-input>
          </el-form-item>
          <el-form-item prop="mobileNumber">
            <el-input
              placeholder="手机"
              prefix-icon="el-icon-phone"
              v-model="registerForm.mobileNumber"
              clearable
              ref="mobileNumber"
            ></el-input>
          </el-form-item>
          <el-form-item prop="mail">
            <el-input
              placeholder="邮箱"
              prefix-icon="el-icon-message"
              v-model="registerForm.mail"
              clearable
              type="email"
              ref="mail"
            ></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input
              placeholder="年龄"
              prefix-icon="el-icon-user"
              v-model="registerForm.age"
              clearable
              ref="age"
            ></el-input>
          </el-form-item>
          <el-form-item prop="sex">
            <el-select v-model="registerForm.sex" placeholder="性别" popper-append-to-body ref="sex">
              <el-option
                v-for="item in options_sex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="companyID">
            <el-select v-model="registerForm.companyID" placeholder="所属公司">
              <el-option
                v-for="item1 in options_companyID"
                :key="item1.value"
                :label="item1.label"
                :value="item1.value"
                ref="companyID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              class="el-button-last"
              type="success"
              size="medium"
              plain
              @click="submitRegisterForm"
            >注&nbsp;&nbsp;册</el-button>
          </el-form-item>
           
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {userRegister } from '../../../api/user_module/user/login'

export default {
  name: 'owner-div-container',
  components: {},
  data() {
    const validateUserName = (rule, value, callback) => {
      let regexp = /^[a-zA-Z0-9]{6,18}$/
      if (!regexp.test(value)) {
        this.percentage=0;
        callback(new Error('只能输入数字或者字母'))
      } else {
        this.percentage=15;
        callback()
      }
    }
    const validatePassWord = (rule, value, callback) => {
      let regexp = /^[a-zA-Z0-9]{6,18}$/
      if (!regexp.test(value)) {
        callback(new Error('只能输入数字或者字母'))
      } else {
        callback()
      }
    }
    const validateMobileNumber = (rule, value, callback) => {
      let regexp = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!regexp.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateMail = (rule, value, callback) => {
      let regexp = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!regexp.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    const validateAge = (rule, value, callback) => {
      let regexp = /^[1-9][0-9]$/
      if (!regexp.test(value)) {
        callback(new Error('请输入合法的年龄'))
      } else {
        callback()
      }
    }
    return {
      /**表单双向绑定 */
      registerForm: {
        userName: '',
        passWord: '',
        mobileNumber: '',
        mail: '',
        age: '',
        sex: '',
        companyID: ''
        
        
      },
      options_sex: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      options_companyID: [
        {
          value: 1120,
          label: '元启'
        },
        {
          value: 1121,
          label: '元创'
        },
        {
          value: 1122,
          label: '海康'
        }
      ],
      /**验证规则 */
      registerRules: {
        userName: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 6,
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
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          },
          {
            validator: validatePassWord,
            trigger: 'blur'
          }
        ],
        mobileNumber: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: validateMobileNumber,
            trigger: 'blur'
          }
        ],
        mail: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: validateMail,
            trigger: 'blur'
          }
        ],
        age: [
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur'
          },
          {
            validator: validateAge,
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        companyID: [
          {
            required: true,
            message: '请选择公司',
            trigger: 'change',
            type: 'number'
          }
        ]
      }
    }
  },
  methods: {
    /*跳转到登录页面 */
    redirectToLogin() {
      this.$router.push('/')
    },
    /**注册 begin */
    submitRegisterForm() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          //弹出注册成功窗口
          const { data } = await userRegister(this.registerForm)
          if (data.code == 20000) {
            this.$message.success('注册成功')
            //携带账号密码回登录页
            this.$router.push('/')
          } else {
            this.$message.error('注册失败您的信息不全或者信息填写不符合')
            return false
          }
        } else {
          //弹出注册失败窗口

          return false
        }
      })
    },
  
  },
  /*处理因页面窗口改变带来页面布局紊乱 */
  /*mounted: function () {
            var ifRolad = true
            if (ifRolad) {
                $(window).resize(function () {
                    let message = `您改变了宽口大小，页面布局可能会改变,我们将请求为您刷新该页面,
                        以保持页面的美观。这样会造成你填写的数据没有了,
                        当然您也可以选择不刷新，虽然可能会不美观，但并不影响功能。
                        您确定刷新吗？`
                    if (ifRolad) {
                        ifRolad = false
                        if (confirm(message) === true) {
                            window.location.reload()
                        } else {
                            return false
                        }
                    }
                })
            }
        }*/
  /**注册 end */
//高度太低时隐藏logo文字
mounted:function () {
  let height=$('.owner-div-container').height();
  if(height<=673){
    $('.logo-word-container').css('display','none')
  }
}
}
</script>
<style scoped lang="less">

.padding-div {
  padding: 60px 60px 44px 60px !important;
}
.owner-div-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../../../assets/image/login_bgi.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
//头部logo字体
.logo-word-container{
   font-size: 5vmin;
    position: fixed;
    top: 20px;
    height: 5vh;
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
</style>