<template>
  <div class="weituo" id="weituo">
    <el-table :data="weiData" tooltip-effect="light" highlight-current-row>
      <el-table-column prop="serialnum" label="订单号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="futures_name" label="合约" show-overflow-tooltip></el-table-column>
      <el-table-column label="买卖" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            :style="scope.row.updown == '1' ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{scope.row.updown =='1'?'买':'卖'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="开平" show-overflow-tooltip></el-table-column>
      <el-table-column prop="futures_price" label="委托价格" show-overflow-tooltip></el-table-column>
      <el-table-column prop="futures_num" label="委托手数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="trade_num" label="成交手数" show-overflow-tooltip></el-table-column>
      <el-table-column label="下单类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
          >{{scope.row.type==1?'限价':'市价'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addtime" label="委托时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="止盈止亏" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="cursor: pointer;color:#fff;" @click="setPrLoss(scope.row)">点击设置</span>
        </template>
      </el-table-column>
      <el-table-column label="撤单" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="chedan" @click="cancelOrder(scope.row)">撤单</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "weituo",
  inject:['reload'],
  props: ["Listheight"],
  data() {
    return {
      dialogVisible: false,
      zuixinjia: "暂无数据",
      weiData: [],
      stopProLoss: [
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1601
        },
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1236
        },
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1740
        },
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1556
        }
      ]
    };
  },
  methods: {
    //撤单按钮
    cancelOrder(a){
      console.log(a)
      let _this = this
      let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId,
        serialNum:a.serialnum
      })
      console.log(msg)
      this.$confirm('确认撤单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true,
        }).then(() => {
          _this.$pro.post('cancel_trust', msg).then((res) => {
            console.log(res)
            if (res.result == 1) {
              _this.$message({
                type: 'success',
                message: '撤单成功!'
              });
              _this.axiosWeiTuo()
            }else{
              _this.$message.error('错误:'+res.message);
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    async setPrLoss(a) {
      let data = await this.$Win.openWin({
        // browserwindow原生属性
        width: 600, // 窗口宽
        height: 370, // 窗口高

        // electron-vue-windows自定义的属性
        windowConfig: {
          router: "/zyzsTanchuang", // 路由 *必填
          data: {
            id: a,
          }, // 传送数据
          name: "zhiyingzhisun", // 窗口名称
          animation: "none"
        }
      });
      console.log(data)
      if(data){
        this.reload()
      }
    },
    axiosWeiTuo(){
      let _this = this
       if (!localStorage.getItem('ycxUserLoginState_QXJF')) { //判断是否为登录状态
        console.log('未登录状态');
      } else {
        console.log('登录状态');
       let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId
        })
        this.$pro.post('get_stay_order_new', msg).then((res) => {
            console.log(res)
            _this.weiData = res.msg.data
          })
      }

      
    }
    // {
    //   addtime:"2019-12-03T14:16:03"
    //   cs:200
    //   currencyFlag:"CNY"
    //   currencyName:"人民币"
    //   currencyRate:1
    //   dyyk:0
    //   futures_code:"IC1912"
    //   futures_name:"中证500"
    //   futures_num:1
    //   futures_price:4902
    //   isTradeTime:false
    //   lastprice:0
    //   orderTradeType:1
    //   orderType:"市价成交"
    //   price_unit:0.2
    //   serialnum:"42B265AD6CFA44A88D35A3ED1139EDBD"
    //   state:0
    //   stoploss:0
    //   stopprofit:0
    //   sx:400
    //   total:0
    //   traderNickname:""
    //   updown:1
    // }
    

  },
  computed:{
    changeLoginStatus(){
      return this.$store.state.account.loginStatus 
    }
  },
  created(){
    this.axiosWeiTuo()
  },
  watch: {
    //  当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身相关元素的高度
    Listheight: {
      handler: function(Val, oldVal) {
        document.getElementById("weituo").style.height = +Val + "px";
      }
    },
    changeLoginStatus:function(val){
      let _this = this
      if(val == true){
        let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId
        })
        this.$pro.post('get_position_list_new', msg).then((res) => {
            console.log(res.msg.data)
            _this.weiData = res.msg.data
          })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#weituo {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
  .el-table{
    background-color: transparent;
  }
  .chedan {
    color: white;
    line-height: 22px;
    width: 50px;
    height: 22px;
    // background:rgba(34,48,76,1);
    border-radius: 3px;
    margin: 0 auto;
  }
  .chedan:hover {
    background: rgba(51, 92, 168, 1);
  }
}
#weituo::-webkit-scrollbar {
  // display: none;
  width: 10px; // 横向滚动条
  height: 10px;
}
#weituo::-webkit-scrollbar-corner {
  display: none;
//  background: rgba(34, 39, 46, 1);
}
#weituo::-webkit-scrollbar-thumb {
  background-color: rgba(34,48,76,1);
  width: 6px; // 横向滚动条
  height: 6px;
}
</style>