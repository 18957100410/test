<template>
    <div class='owner-div-container'>
        
    
    <el-carousel  :interval="1000" arrow="always" type="card" :autoplay="autoplay">
    <el-carousel-item v-for="item in urlDate" :key="item">
      <div><img :src="item"></div>
    </el-carousel-item>
    
  </el-carousel>
  <div style="margin:0 auto;text-align:center">
  <el-button type="success" @click="stopOrRun(true)">播放</el-button>
  <el-button type="danger"  @click="stopOrRun(false)">停止</el-button>
  </div>
  
  </div>

    
</template>
<script>
import url1 from '../../assets/image/1.jpg'
import url2 from '../../assets/image/2.jpg'
import url3 from '../../assets/image/3.jpg'
import url4 from '../../assets/image/4.jpg'
import url5 from '../../assets/image/5.jpg'

export default {
    name: 'owner-div-container',
    components:{
        
    },
    data(){
        return{
            urlDate:[url1,url2,url3,url4,url5],
            autoplay:true,
        }
    },
    methods:{
        stopOrRun(b){
          this.autoplay=b
        }
    },
    
}
</script>
<style lang='less' scoped>
.owner-div-container{
  //display: flex;
  //align-items: center;
  //justify-content: center;
}
/deep/.el-carousel__container {

     
}


  /deep/.el-carousel__button {
    display: block;
    opacity: .48;
    width: 30px;
    height: 20px !important;
    background-color:rgb(43,168,222);
}
</style>