<template>
  <div class="weituo" id="weituo">
    <el-table :data="weiData" tooltip-effect="light" highlight-current-row>
      <el-table-column prop="order" label="订单号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="合约" show-overflow-tooltip></el-table-column>
      <el-table-column label="买卖" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            :style="scope.row.business == '买' ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{scope.row.business}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="开平" show-overflow-tooltip></el-table-column>
      <el-table-column prop="weiPrice" label="委托价格" show-overflow-tooltip></el-table-column>
      <el-table-column prop="num" label="委托手数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="delnum" label="成交手数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderType" label="下单类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="time" label="委托时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="止盈止亏" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="cursor: pointer;color:#fff;" @click="setPrLoss()">{{scope.row.stop_pro_loss}}</span>
        </template>
      </el-table-column>
      <el-table-column label="撤单" show-overflow-tooltip>
        <template>
          <div class="chedan">撤单</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "weituo",
  props: ["Listheight"],
  data() {
    return {
      dialogVisible: false,
      zuixinjia: "暂无数据",
      weiData: [
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "卖",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        },
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "卖",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        },
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "卖",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        },
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "卖",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        },
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "卖",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        },
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "卖",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        },
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "卖",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        },
        {
          order: "8A89UA",
          name: "小恒生1905",
          business: "买",
          type: 1,
          weiPrice: 1566,
          num: 5,
          delnum: 10,
          orderType: "指定",
          time: "09-03 12:34:13",
          stop_pro_loss: "0/4"
        }
      ],
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
    axiosWeiTuo(){

       if (!localStorage.getItem('ycxUserLoginState_QXJF')) { //判断是否为登录状态
        console.log('未登录状态');
      } else {
        console.log('登录状态');
       let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId
        })
        this.$pro.post('get_position_list_new', msg).then((res) => {
            console.log(res.msg.data)
          
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
      if(val == true){
        let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId
        })
        this.$pro.post('get_position_list_new', msg).then((res) => {
            console.log(res.msg.data)
          
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