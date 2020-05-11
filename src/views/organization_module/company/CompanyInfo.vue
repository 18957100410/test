<template>
  <div class="owner-div-container">
    <div class="owner-div-container-top">
      <!--面包屑-->
      <div class="top">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/carousel' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>公司信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--添加按钮-->
      <div class="bottom">
        <div>
          <button class="owner-button-add" v-if="data.length==0" @click="showAddDialog()">添加</button>
        </div>
      </div>
    </div>
    <div class="owner-div-container-middle">
      <el-table border stripe height="70vh" :data="data">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="公司名称" prop="companyName"></el-table-column>
        <el-table-column label="公司地址" prop="companyAddress"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.companyID)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDelteDialog(scope.row.companyID)"></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="owner-div-container-bottom"></div>
    <!--dilog区域-->
    <div class="owner-dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="20%">
        <el-form ref="companyForm" :model="companyForm" :rules="companyRules">
          <el-form-item prop="companyName">
            <el-row>
              <el-col :span="8"><label for="companyName">公司名称</label></el-col>
              <el-col>
                <el-input v-model="companyForm.companyName" clearable ref="companyName" id="companyName"></el-input>
              </el-col>
            </el-row>

          </el-form-item>
          <el-form-item prop="companyAddress">
            <el-row>
              <el-col :span="8"><label for="companyAddress">公司地址</label></el-col>
              <el-col>
                <el-input v-model="companyForm.companyAddress" clearable ref="companyAddress" type="address" id="companyAddress"></el-input>
              </el-col>
            </el-row>

          </el-form-item>

          <el-form-item prop="remark">

            <el-row>
              <el-col :span="8"><label for="remark">备注</label></el-col>
              <el-col>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="companyForm.remark" id="remark">
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
            </el-col>
          </el-row>

        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { companyGetOne, companyDelete, companyUpdate, companyAdd } from '../../../api/organization_module/company/companyinfo.js'
export default {
  name: 'owner-div-container',
  components: {},
  data () {
    return {
      dialogTitle: '',
      addButtonVisible: false,
      editButtonVisible: false,
      dialogVisible: false,
      //模拟公司id一般在user身上
      companyID: -1,
      //公司信息数据
      data: [],
      /**表单双向绑定 */
      companyForm: {
        companyID: this.companyID,
        companyName: '',
        companyAddress: '',
        remark: '',


      },
      //公司信息验证
      companyRules: {
        companyName: {
          required: true,
          message: '请输入公司名称',
          trigger: 'blur'
        },
      }
    }
  },
  methods: {
    //公司id赋值
    setCompanyID () {
      if (this.companyID == -1) {
        this.companyID = this.$store.getters.getCompanyID
      }
    },
    //获取公司信息
    async getTableData () {
      const { data: res } = await companyGetOne(this.companyID)
      if (!res || res.code != 20000) {
        return this.$message.error('没有查到到任何数据')
      }
      this.data.length = 0
      this.data.push(res.data)
    },
    //弹出添加对话框
    showAddDialog () {
      this.dialogVisible = !this.dialogVisible
      this.dialogTitle = '公司信息添加'
      this.addButtonVisible = true
      this.editButtonVisible = false
    },
    //弹出修改对话框
    async showEditDialog () {
      this.dialogTitle = '公司信息修改'
      this.addButtonVisible = false
      this.editButtonVisible = true

      this.dialogVisible = !this.dialogVisible
      const { data } = await companyGetOne(this.companyID)
      if (!data || data.code != 20000) {
        this.$message.error('查询信息失败')
        this.dialogVisible = false //关闭dialog
        return false
      }
      this.companyForm = data.data
    },
    //弹出删除对话框
    showDelteDialog (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await companyDelete(id)
          if (!data || data.code != 20000) {
            this.$message.error('删除失败')
          } else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            //重新渲染

            this.data = [],
              //重置表单数据
              this.companyForm = {

                companyName: '',
                companyAddress: '',
                remark: '',


              }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //提交添加信息
    submitAddForm () {
      this.$refs.companyForm.validate(async valid => {
        if (valid) {

          const { data } = await companyAdd(this.companyForm)
          //console.log(data)
          if (data.code == 20000) {
            this.$message.success('添加成功')
            //清空表单 关闭dialog
            this.$refs.companyForm.resetFields()
            this.dialogVisible = false

            //重新渲染页面
            this.data.length = 0
            this.data.push(data.data)
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
      this.$refs.companyForm.validate(async valid => {
        if (valid) {
          //弹出注册成功窗口
          const { data } = await companyUpdate(this.companyForm)
          //console.log(data)
          if (data.code == 20000) {
            this.$message.success('修改成功')
            //清空表单 关闭dialog
            this.$refs.companyForm.resetFields()
            this.dialogVisible = false

            //重新渲染页面
            this.getTableData(this.companyID)
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
    //vue 创建以后就获取数据，为渲染准备
    this.getTableData(this.setCompanyID())
  }
}
</script>
<style lang='less' scoped>
</style>