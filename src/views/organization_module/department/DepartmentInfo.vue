<template>
  <div class='owner-div-container'>
    <div class='owner-div-container-top'>
      <!--面包屑-->
      <div class="top">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/carousel' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>部门信息</el-breadcrumb-item>
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
          <div>
            <button class="owner-button-add" @click="showAddDialog()">添加</button>
          </div>
        </div>
      </div>
    </div>
    <div class='owner-div-container-middle'>
      <el-table border :data="dataList" stripe height="70vh">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="departmentID" label="部门编号"></el-table-column>
        <el-table-column prop="departmentName" label="部门名称"></el-table-column>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isUsed" active-color="#13ce66" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注说明"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.departmentID)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDelteDialog(scope.row.departmentID)"></el-button>

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
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="20%">
        <el-form ref="departmentForm" :model="departmentForm" :rules="departmentRules">
          <el-form-item prop="departmentName">
            <el-row>
              <el-col :span="8"><label for="departmentName">部门名称</label></el-col>
              <el-col>
                <el-input v-model="departmentForm.departmentName" clearable ref="departmentName" id="departmentName"></el-input>
              </el-col>
            </el-row>

          </el-form-item>
          <el-form-item prop="isUsed">

            <el-row>
              <el-col :span="8"><label for="isUsed">启用状态</label></el-col>
              <el-col>
                <el-switch v-model="departmentForm.isUsed" active-color="#13ce66" id="isUsed"></el-switch>

              </el-col>
            </el-row>

          </el-form-item>
          <el-form-item prop="remark">

            <el-row>
              <el-col :span="8"><label for="remark">备注</label></el-col>
              <el-col>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="departmentForm.remark" id="remark">
                </el-input>
              </el-col>
            </el-row>

          </el-form-item>
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
  departmentList, departmentDelete, departmentUpdate, departmentGetOne, departmentAdd

} from '../../../api/organization_module/department/departmentinfo'
export default {
  name: 'owner-div-container',
  components: {
  },
  data () {
    return {
      dialogTitle: '',
      addButtonVisible: false,
      editButtonVisible: false,
      // for search
      searchOptions: [
        { label: '部门编号', value: 'departmentID' },
        { label: '部门名称', value: 'departmentName' },
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
      departmentForm: {
        departmentID: '',
        departmentName: '',
        isUsed: true,
        remark: '',
      },
      //部门信息验证
      departmentRules: {
        departmentName: {
          required: true,
          message: '请输入部门名称',
          trigger: 'blur'
        },
      }
    }
  },
  methods: {
    //获取分页数据
    async getTableDataList (currentPage, pageSize) {
      if (this.searchKey != '' && this.searchValue != '') {
        const { data: res } = await departmentList(
          this.$store.getters.getCompanyID,
          currentPage,
          pageSize,
          this.searchKey,
          this.searchValue
        )

        if (!res || res.code != 20000) {
          return this.$message.error('没有查到到任何数据')
        }
        this.currentPage = res.data.currentPage
        this.pageSize = res.data.pageSize
        this.total = res.data.total
        //this.dataList = res.data.data
        this.dataList = res.data.data
      } else {
        const { data: res } = await departmentList(this.$store.getters.getCompanyID, currentPage, pageSize)
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
    //弹出添加对话框
    showAddDialog () {
      this.dialogVisible = !this.dialogVisible
      this.dialogTitle = '部门信息添加'
      this.addButtonVisible = true
      this.editButtonVisible = false
      //清空表单 防止有数据
      if (this.$refs.departmentForm) {
        this.$refs.departmentForm.resetFields()
      }


    },
    //弹出编辑框
    async showEditDialog (departmentID) {
      this.dialogTitle = '部门信息修改'
      this.addButtonVisible = false
      this.editButtonVisible = true

      this.dialogVisible = !this.dialogVisible
      const { data } = await departmentGetOne(departmentID)
      if (!data || data.code != 20000) {
        this.$message.error('查询信息失败')
        this.dialogVisible = false //关闭dialog
        return false
      }
      this.departmentForm = data.data
    },
    //弹出删除对话框
    showDelteDialog (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await departmentDelete(id)
          if (!data || data.code != 20000) {
            this.$message.error('删除失败')
          } else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            //重新渲染
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
      if (this.searchKey != '' && this.searchValue != '') {
        //重新渲染
        this.getTableDataList(1, 15)
      } else {
        this.$message.error('您未选择搜索条件 或者 没有输入搜索关键字')
      }
    },
    //提交添加信息
    submitAddForm () {
      this.$refs.departmentForm.validate(async valid => {
        if (valid) {

          const { data } = await departmentAdd(this.$store.getters.getCompanyID, this.departmentForm)
          //console.log(data)
          if (data.code == 20000) {
            this.$message.success('添加成功')
            //清空表单 关闭dialog
            if (this.$refs.departmentForm) {
              this.$refs.departmentForm.resetFields()
            }
            this.dialogVisible = false

            //重新渲染页面
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
      this.$refs.departmentForm.validate(async valid => {
        if (valid) {
          //弹出注册成功窗口
          const { data } = await departmentUpdate(this.departmentForm)
          //console.log(data)
          if (data.code == 20000) {
            this.$message.success('修改成功')
            //清空表单 关闭dialog
            if (this.$refs.departmentForm) {
              this.$refs.departmentForm.resetFields()
            }
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

  },
  created: function () {
    //vue 创建以后就获取数据，为渲染准备 第一页显示15条
    this.getTableDataList(1, 15)
  }
}
</script>
<style lang='less' scoped>
</style>