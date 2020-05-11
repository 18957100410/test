<template>
  <div class='owner-div-container'>
    <div class='owner-div-container-top'>
      <!--面包屑-->
      <div class="top">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/carousel' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>员工信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--搜索框 +添加按钮-->
      <div class="bottom">
        <!--文本框-->
        <div>
          <div>

            <el-select v-model="departmentID" slot="prepend" placeholder="搜索部门" class="el-input-group__prepend">
              <el-option v-for="item in departmentOptions" :key="item.departmentName" :label="item.departmentName" :value="item.departmentID"></el-option>
            </el-select>

            <div style="width:16px;"></div>
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
          <div>
            <button class="owner-button-add" @click="showAddDialog()">添加</button>
          </div>
        </div>
      </div>
    </div>
    <div class='owner-div-container-middle'>
      <el-table border :data="dataList" stripe height="70vh">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="所属部门">
          <template slot-scope="scope">
            <div v-for="item in departmentOptions" v-if="item.departmentID==scope.row.departmentID" v-text="item.departmentName">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="mobileNumber" label="手机"></el-table-column>
        <el-table-column prop="mail" label="邮箱"></el-table-column>
        <el-table-column prop="remark" label="备注说明"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.pensonnelID)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDelteDialog(scope.row.pensonnelID)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区-->
    <div class='owner-div-container-bottom'>
      <el-pagination :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" hide-on-single-page :pager-count="11" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>

    </div>
    <!--dilog区域-->
    <div class="owner-dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="20%">
        <el-form ref="pensonnelForm" :model="pensonnelForm" :rules="pensonnelRules">
          <el-form-item prop="departmentID">
            <el-row>
              <el-col :span="8"><label for="departmentID">所属部门</label></el-col>
              <el-col>
                <el-select v-model="pensonnelForm.departmentID" id="departmentID">
                  <el-option v-for="item in departmentOptions" :key="item.departmentName" :label="item.departmentName" :value="item.departmentID"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="name">
            <el-row>
              <el-col :span="8"><label for="name">姓名</label></el-col>
              <el-col>
                <el-input v-model="pensonnelForm.name" clearable ref="name" id="name"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="sex">
            <el-row>
              <el-col :span="8"><label for="sex">性别</label></el-col>
              <el-col>
                <el-select v-model="pensonnelForm.sex" id="sex" popper-append-to-body ref="sex">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="age">
            <el-row>
              <el-col :span="8"><label for="age">年龄</label></el-col>
              <el-col>
                <el-input v-model="pensonnelForm.age" clearable ref="age" id="age"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="mobileNumber">
            <el-row>
              <el-col :span="8"><label for="mobileNumber">手机</label></el-col>
              <el-col>
                <el-input v-model="pensonnelForm.mobileNumber" clearable ref="mobileNumber" id="mobileNumber"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="mail">
            <el-row>
              <el-col :span="8"><label for="mail">邮箱</label></el-col>
              <el-col>
                <el-input v-model="pensonnelForm.mail" clearable ref="mail" id="mail"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="remark">
            <el-row>
              <el-col :span="8"><label for="remark">备注说明</label></el-col>
              <el-col>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="pensonnelForm.remark" id="remark">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <div style="height:16px;"></div>
          <el-row>
            <el-col :span="24">

              <el-button class="el-button-last" type="success" plain @click="submitAddForm()" v-if="addButtonVisible">
                添加
              </el-button>
              <el-button class="el-button-last" type="success" plain @click="submitEditForm()" v-if="editButtonVisible">
                修改
              </el-button>
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  pensonnelList, pensonnelDelete, pensonnelUpdate, pensonnelGetOne, pensonnelAdd

} from '../../../api/organization_module/pensonnel/pensonnelinfo'
import {
  departmentList
} from '../../../api/organization_module/department/departmentinfo'
export default {
  name: 'owner-div-container',
  components: {

  },
  data () {
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
      dialogTitle: '',
      addButtonVisible: false,
      editButtonVisible: false,
      dialogVisible: false,
      // for search
      departmentOptions: [],
      searchOptions: [
        { label: '姓名', value: 'name' },
        { label: '性别', value: 'sex' },
        { label: '年龄', value: 'age' },
        { label: '手机', value: 'mobileNumber' },
        { label: '邮箱', value: 'mail' },
        { label: '备注说明', value: 'remark' },
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
      departmentID: '',
      /**表单双向绑定 */
      pensonnelForm: {
        pensonnelID: '',
        departmentID: '',
        name: '',
        sex: '',
        age: '',
        mobileNumber: '',
        mail: '',
        remark: ''
      },
      //部门信息验证
      pensonnelRules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        age: [
          {
            validator: validateAge,
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
      }

    }
  },
  methods: {
    //获取分页数据
    async getTableDataList (currentPage, pageSize) {
      if (this.departmentID != '' || (this.searchKey != '' && this.searchValue != '')) {
        if (this.departmentID != '' && (this.searchKey != '' && this.searchValue != '')) {
          const { data: res } = await pensonnelList(
            this.$store.getters.getCompanyID,
            currentPage,
            pageSize,
            this.searchKey,
            this.searchValue,
            this.departmentID
          )
          if (!res || res.code != 20000) {
            return this.$message.error('没有查到到任何数据')
          }
          this.currentPage = res.data.currentPage
          this.pageSize = res.data.pageSize
          this.total = res.data.total
          //this.dataList = res.data.data
          this.dataList = res.data.data
        } else if (this.departmentID != '' && (this.searchKey == '' || this.searchValue == '')) {
          const { data: res } = await pensonnelList(
            this.$store.getters.getCompanyID,
            currentPage,
            pageSize,
            '',
            '',
            this.departmentID
          )
          if (!res || res.code != 20000) {
            return this.$message.error('没有查到到任何数据')
          }
          this.currentPage = res.data.currentPage
          this.pageSize = res.data.pageSize
          this.total = res.data.total
          //this.dataList = res.data.data
          this.dataList = res.data.data
        } else if (this.departmentID == '' && (this.searchKey != '' && this.searchValue != '')) {
          const { data: res } = await pensonnelList(
            this.$store.getters.getCompanyID,
            currentPage,
            pageSize,
            this.searchKey,
            this.searchValue,
          )
          if (!res || res.code != 20000) {
            return this.$message.error('没有查到到任何数据')
          }
          this.currentPage = res.data.currentPage
          this.pageSize = res.data.pageSize
          this.total = res.data.total
          //this.dataList = res.data.data
          this.dataList = res.data.data
        }


      } else {
        const { data: res } = await pensonnelList(this.$store.getters.getCompanyID, currentPage, pageSize)
        if (!res || res.code != 20000) {
          return this.$message.error('没有查到到任何数据')
        }
        this.currentPage = res.data.currentPage
        this.pageSize = res.data.pageSize
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
    //获取所有部门信息
    async getDepartmentList () {
      const { data: res } = await departmentList(this.$store.getters.getCompanyID, 1, 30)
      if (res.code == 20000) {
        this.departmentOptions = res.data.data
      }

    },
    //弹出添加对话框
    showAddDialog () {
      this.dialogVisible = !this.dialogVisible
      this.dialogTitle = '员工信息添加'
      this.addButtonVisible = true
      this.editButtonVisible = false
      //清空表单 防止有数据
      if (this.$refs.pensonnelForm) {
        this.$refs.pensonnelForm.resetFields()
      }


    },
    //弹出编辑框
    async showEditDialog (id) {
      this.dialogTitle = '员工信息修改'
      this.addButtonVisible = false
      this.editButtonVisible = true

      this.dialogVisible = !this.dialogVisible
      //清空表单 防止有数据
      if (this.$refs.pensonnelForm) {
        this.$refs.pensonnelForm.resetFields()
      }
      const { data } = await pensonnelGetOne(id)
      if (!data || data.code != 20000) {
        this.$message.error('查询信息失败')
        this.dialogVisible = false //关闭dialog
        return false
      }
      this.pensonnelForm = data.data
    },
    //弹出删除对话框
    showDelteDialog (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await pensonnelDelete(id)
          if (!data || data.code != 20000) {
            this.$message.error('删除失败')
          } else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            //重新渲染
            this.getDepartmentList()
            this.getTableDataList(this.$store.getters.getCompanyID, this.currentPage, this.pageSize)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

    },
    //serach
    handleSearch () {
      if (this.departmentID != '' || (this.searchKey != '' && this.searchValue != '')) {
        //重新渲染
        this.getDepartmentList()
        this.getTableDataList(1, 15)
      } else {
        this.$message.error('您未选择搜索部门 或者 没有输入搜索条件+关键字')
      }
    },
    //提交添加信息
    submitAddForm () {
      this.$refs.pensonnelForm.validate(async valid => {
        if (valid) {

          const { data } = await pensonnelAdd(this.$store.getters.getCompanyID, this.pensonnelForm)
          //console.log(data)
          if (data.code == 20000) {
            this.$message.success('添加成功')
            //清空表单 关闭dialog
            if (this.$refs.pensonnelForm) {
              this.$refs.pensonnelForm.resetFields()
            }
            this.dialogVisible = false

            //重新渲染页面
            this.getDepartmentList()
            this.getTableDataList(1, 15)
          } else {
            this.$message.error('添加失败您的信息不全或者信息填写不符合')
            return false
          }
        } else {
          //弹出注册失败窗口

          return false
        }
      })
    },
    //提交修改信息
    submitEditForm () {
      this.$refs.pensonnelForm.validate(async valid => {
        if (valid) {
          //弹出注册成功窗口
          const { data } = await pensonnelUpdate(this.pensonnelForm)
          //console.log(data)
          if (data.code == 20000) {
            this.$message.success('修改成功')
            //清空表单 关闭dialog
            if (this.$refs.pensonnelForm) {
              this.$refs.pensonnelForm.resetFields()
            }
            this.dialogVisible = false

            //重新渲染页面
            this.getDepartmentList()
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


  },
  created: function () {
    //立即渲染
    this.getDepartmentList()
    this.getTableDataList(1, 15)
  }
}
</script>
<style lang='less' scoped>
</style>