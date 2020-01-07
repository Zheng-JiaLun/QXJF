<template>
  <div class="Chengjiao" id="chengjiao">
    <el-table
      :data="delData"
      tooltip-effect="light"
      highlight-current-row
     
       @current-change="handleCurrentChange"
    >
      <el-table-column prop="futures_name" label="合约" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="trade_num" label="手数" show-overflow-tooltip ></el-table-column>
      <el-table-column label="买卖" show-overflow-tooltip >
        <template slot-scope="scope">
          <span
            :style="scope.row.updown == 1 ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{scope.row.updown == 1?"买":"卖"}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="open_price" label="开仓价格" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="open_time" label="开仓时间" width="150" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="orderOpenType" label="开仓方式" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="orderType" label="平仓方式" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="close_price" label="平仓价格" show-overflow-tooltip ></el-table-column>
      <el-table-column label="本币盈亏" show-overflow-tooltip >
        <template slot-scope="scope">
          <span
            :style="scope.row.this_pro_loss > 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{(scope.row.close_price*1000 - scope.row.open_price*1000)*scope.row.cs/1000}}</span>
        </template>
      </el-table-column>
      <el-table-column label="盈亏" show-overflow-tooltip >
        <template slot-scope="scope">
          <span
            :style="scope.row.yk > 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{scope.row.yk}}</span>
        </template>
      </el-table-column>
       <el-table-column prop="sx" label="手续费" show-overflow-tooltip ></el-table-column>
      <el-table-column label="订单号" show-overflow-tooltip >
        <template slot-scope="scope">
          <span style="color: #DCDC0A;">{{scope.row.serialnum}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="止盈止损" show-overflow-tooltip >
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="setPrLoss()">{{scope.row.stop_pro_loss}}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
export default {
  name: "Chengjiao",
  props: ["Listheight","value"],
  data() {
    return {
      delData: []
    };
  },
  methods:{
    async setPrLoss() {
      let data = await this.$Win.openWin({
        // browserwindow原生属性
        width: 900, // 窗口宽
        height: 476, // 窗口高

        // electron-vue-windows自定义的属性
        windowConfig: {
          router: "/zyzsTanchuang", // 路由 *必填
          data: {
            id: 1
          }, // 传送数据
          name: "zhiyingzhisun", // 窗口名称
          animation: "none"
        }
      });
    },
     handleCurrentChange(val) {
        // this.currentRow = val;
      },
      initChengJiao(){
       
        if (localStorage.getItem(this.$store.state.localStorageLogin)) { //判断是否为登录状态
         
          let nowTime = new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()
          let msg = JSON.stringify({
            userID: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
            pageIndex: 1,
            pageSize: 1000,
            startTime: this.changeValue[0]+' 00:00:00',
            endTime: this.changeValue[1]+' 23:59:59'
          });
          this.$pro.post('get_history_order_new', msg).then((res) => {
            console.log(res)
            if(res.result == 1){
              this.delData = res.msg.data
            }else{
              console.log("错误:",res.msg)
            }
              // this.delData = res.msg.data

          })
        }
      }
  },
  created(){
    this.initChengJiao()
  },
  computed:{
    changeValue(){
      if(this.value){
        return  [new Date(this.value[0]).getFullYear()+'-'+new Date(this.value[0]).getMonth()+'-'+new Date(this.value[0]).getDate(),new Date(this.value[1]).getFullYear()+'-'+new Date(this.value[1]).getMonth()+'-'+new Date(this.value[1]).getDate()]
      }else{
        return  [new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()]
      }
      
    }
  },
  watch: {
    //  当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身相关元素的高度
    Listheight: {
      handler: function(Val, oldVal) {
        document.getElementById("chengjiao").style.height = +Val + "px";
      }
    },
    changeValue:function(val){
      console.log(val)
      this.initChengJiao()
    }
  },
};
</script>
<style lang="scss" scoped>
#chengjiao {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .el-table{
    background-color: transparent;
  
  }
}

#chengjiao::-webkit-scrollbar {
  // display: none;
  width: 10px; // 横向滚动条
  height: 10px;
}
#chengjiao::-webkit-scrollbar-corner {
  display: none;
//  background: rgba(34, 39, 46, 1);
}
#chengjiao::-webkit-scrollbar-thumb {
  background-color: rgba(34,48,76,1);
  // border-radius: 6px;
  width: 6px; // 横向滚动条
  height: 6px;
}
</style>