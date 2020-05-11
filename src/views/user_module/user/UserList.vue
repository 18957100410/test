<template>
  <div class="owner-div-container">
    <div class="owner-div-container-top">
      <!--面包屑-->
      <div class="top">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/carousel' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--搜索框 +添加按钮-->
      <div class="bottom">
        <!--文本框-->
        <div>
          <div>
            <el-input placeholder="关键字" v-model="searchValue" clearable>
              <el-select v-model="searchKey" slot="prepend" placeholder="搜索条件">
                <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-input>
          </div>
          <div style="width:16px;"></div>
          <!--按钮-->
          <div>
            <button class="owner-button-search" @click="handleSearch()">搜索</button>
          </div>
          <div style="width:16px;"></div>

        </div>
      </div>
    </div>

    <div class="owner-div-container-middle">
      <el-table border :data="dataList" stripe height="70vh">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="userName" label="账号"></el-table-column>
        <el-table-column prop="mobileNumber" label="电话"></el-table-column>
        <el-table-column prop="mail" label="邮箱"></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.userID)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDelteDialog(scope.row.userID)"></el-button>
            <el-tooltip content="分配权限" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区-->
    <div class="owner-div-container-bottom">
      <el-pagination :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" hide-on-single-page :pager-count="11" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
    </div>
    <!--dilog区域-->
    <div class="owner-dialog">
      <el-dialog title="用户信息修改" :visible.sync="dialogVisible" width="20%">
        <el-form ref="updateForm" :model="updateForm" :rules="updateRules">
          <el-form-item prop="userName">
            <el-input placeholder="账号" prefix-icon="el-icon-user-solid" v-model="updateForm.userName" clearable ref="userName" disabled></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input placeholder="密码" prefix-icon="el-icon-lock" v-model="updateForm.passWord" clearable type="password" show-password ref="passWord"></el-input>
          </el-form-item>
          <el-form-item prop="mobileNumber">
            <el-input placeholder="手机" prefix-icon="el-icon-phone" v-model="updateForm.mobileNumber" clearable ref="mobileNumber"></el-input>
          </el-form-item>
          <el-form-item prop="mail">
            <el-input placeholder="邮箱" prefix-icon="el-icon-message" v-model="updateForm.mail" clearable type="email" ref="mail"></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input placeholder="年龄" prefix-icon="el-icon-user" v-model="updateForm.age" clearable ref="age"></el-input>
          </el-form-item>
          <el-form-item prop="sex">
            <el-select v-model="updateForm.sex" placeholder="性别" popper-append-to-body ref="sex">
              <el-option v-for="item in options_sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="companyID">
            <el-select v-model="updateForm.companyID" placeholder="所属公司">
              <el-option v-for="item1 in options_companyID" :key="item1.value" :label="item1.label" :value="item1.value" ref="companyID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="el-button-last" type="success" size="medium" plain @click="submitEditForm">修&nbsp;&nbsp;改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  userList,
  userUpdate,
  userGetOne,
  userDelete
} from '../../../api/user_module/user/login'
export default {
  name: 'owner-div-container',
  components: {},
  data () {
    const validateUserName = (rule, value, callback) => {
      let regexp = /^[a-zA-Z0-9]{6,18}$/
      if (!regexp.test(value)) {
        this.percentage = 0
        callback(new Error('只能输入数字或者字母'))
      } else {
        this.percentage = 15
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
      // for search
      searchOptions: [
        { label: '账号', value: 'userName' },
        { label: '电话', value: 'mobileNumber' },
        { label: '邮箱', value: 'mail' }
      ],
      searchKey: '',
      searchValue: '',

      //当前页码
      currentPage: 1,
      //每页几条数据
      pageSize: 15,
      //总记录条数
      total: 0,
      //表格数据
      dataList: [],
      dialogVisible: false,

      /**表单双向绑定 */
      updateForm: {
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
          value: 11,
          label: '元启'
        },
        {
          value: 12,
          label: '元创'
        },
        {
          value: 13,
          label: '海康'
        }
      ],
      /**验证规则 */
      updateRules: {
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
    //获取分页数据
    async getTableDataList (currentPage, pageSize) {
      if (this.searchKey != '' && this.searchValue != '') {
        const { data: res } = await userList(
          currentPage,
          pageSize,
          this.searchKey,
          this.searchValue
        )

        if (!res || res.code != 20000) {
          return this.$message.error('没有查到到任何数据')
        }
        this.currentPage = currentPage
        this.pageSize = pageSize
        this.total = res.data.total
        //this.dataList = res.data.data
        this.dataList = res.data.data
      } else {
        const { data: res } = await userList(currentPage, pageSize)
        if (!res || res.code != 20000) {
          return this.$message.error('没有查到到任何数据')
        }
        this.currentPage = currentPage
        this.pageSize = pageSize
        this.total = res.data.total
        //this.dataList = res.data.data
        this.dataList = res.data.data
      }
    },
    //监听显示条数改变
    handleSizeChange (newSize) {
      this.getTableDataList(this.currentPage, newSize)
      this.pageSize = newSize
    },
    //监听页码改变
    handleCurrentChange (newCurrent) {
      this.getTableDataList(newCurrent, this.pageSize)
      this.currentPage = newCurrent
    },

    //弹出编辑框
    async showEditDialog (id) {
      this.dialogVisible = true
      const { data } = await userGetOne(id)
      if (!data || data.code != 20000) {
        this.$message.error('查询信息失败')
        this.dialogVisible = false //关闭dialog
        return false
      }
      this.updateForm = data.data
    },
    //弹出删除对话框
    showDelteDialog (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await userDelete(id)
          if (!data || data.code != 20000) {
            this.$message.error('删除失败')
          } else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            //重新渲染
            this.getTableDataList(this.currentPage, this.pageSize)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

    },
    submitEditForm () {
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          //弹出注册成功窗口
          const { data } = await userUpdate(this.updateForm)
          //console.log(data)
          if (data.code == 20000) {
            this.$message.success('修改成功')
            //清空表单 关闭dialog
            this.$refs.updateForm.resetFields()
            this.dialogVisible = false
            //重新渲染页面
            this.getTableDataList(this.currentPage, this.pageSize)
          } else {
            this.$message.error('修改失败您的信息不全或者信息填写不符合')
            return false
          }
        } else {
          //弹出注册失败窗口

          return false
        }
      })
    },
    //serach
    handleSearch () {
      if (this.searchKey != '' && this.searchValue != '') {
        //重新渲染
        this.getTableDataList(1, 15)
      } else {
        this.$message.error('您未选择搜索条件 或者 没有输入搜索关键字')
      }
    }
  },
  created: function () {
    //vue 创建以后就获取数据，为渲染准备 第一页显示15条
    this.getTableDataList(1, 15)
  }
}
</script>
<style scoped lang="less">
.btn-next + span {
  cursor: pointer;
}
</style>