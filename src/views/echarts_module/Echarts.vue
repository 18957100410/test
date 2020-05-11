<template>
  <div class="owner-div-container">
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
<script>
export default {
  name: 'owner-div-container',
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    getDate() {
        var base = +new Date(2020, 1, 1);
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        var data = [Math.random() * 300];


        for (var i = 1; i < 90; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
        return date;
    } ,    
    getData(){
        var arry=[100];
        for (var i = 0; i < 90; i++) {
            var d=Math.random()*1000+Math.random()*100+Math.random()*10
            arry[i]=parseInt(d)
        }
        return arry
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '销售量统计'
        },
        tooltip: {
          trigger: 'axis',
          
        },
        xAxis: {
          type:'category',
          data:this.getDate()
        },
        yAxis: {
           type:'value',
          splitLine: {
           show: false
          },
          data: [100, 200, 300, 500, 700, 1000]
        },
        
        dataZoom: [
          {
            startValue: '2019-1'
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 100,
              lte: 150,
              color: 'rgb(14,170,35)'
            },
            {
              gt: 151,
              lte: 300,
              color: 'rgb(202,206,17)'
            },
            {
              gt: 301,
              lte: 450,
               color: 'rgb(208,98,17)'
            },
            {
              gt: 451,
              lte: 600,
              color: 'rgb(206,26,17)'
            },
            {
              gt: 601,
              lte: 900,
             color: 'rgb(182,15,96)'
            },
            {
              gt: 901,
              color: 'rgb(133,14,170)'
            }
          ],
          outOfRange: {
            color:'rgb(0,0,255)'
          }
        },
        series: {
          name: '销售量统计',
          type: 'line',
          smooth:true,//把折线变成曲线
          data: this.getData(),
          markLine: {
            silent: true,
            data: [
              {
                name: '平均线',
                // 支持 'average', 'min', 'max'
                type: 'average'
              },
              {
                name: 'Y 轴值为 100 的水平线',
                yAxis: 100
              },
              [
                {
                  // 起点和终点的项会共用一个 name
                  name: '最小值',
                  type: 'min'
                },
                {
                  name: '最大值',
                  type: 'max'
                }
              ]
            ]
          }
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.owner-div-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  widows: 100%;
}
</style>