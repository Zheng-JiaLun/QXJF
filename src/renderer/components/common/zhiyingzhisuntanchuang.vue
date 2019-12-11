<template>
  <div class="zhisunTanchuang">
    <div class="top">
      <h3>客户端止损止盈</h3>
    </div>
    <div class="center">
      <p style="color: #CCCCCC;padding-bottom: 5px;">正在修改（合约:HKEX 方向:卖出）持仓对应的止损止盈单信息</p>
      <div
        class="flex flex-align-items-center flex-justify-content-sb"
        style="padding-bottom: 10px;"
      >
        <p style="color: #CCCCCC;">
          <span style="padding-right: 10px;">有效止损价: 2</span>
          <span>持仓量: 33</span>
          <span style="color: #00BD00;float:right;">{{zuixinjia}}</span>
          <span style="color: #00BD00;float:right;">最新价:</span>
        </p>
      </div>
      <el-table :data="stopProLoss" border tooltip-effect="light" @row-click="c">
        <el-table-column prop="time" label="设置时间" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="num" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stopLoss" label="止损价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stopLossLive" label="活动止损价差" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stopPro" label="止盈价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="myPrice" label="保本价" show-overflow-tooltip></el-table-column>
      </el-table>
      <p
        style="font-size: 12px;color: #4176D8;padding: 10px 0;"
      >窗口关闭前此合约对应的止损止盈单不会出发（客户端止损止盈，不是交易所指令，只对在本地程序运行时有效）</p>
    </div>
    <div class="footer">
      <el-button @click="close()">确 定</el-button>
      <el-button @click="close()">取 消</el-button>
    </div>
    <span slot="footer" class="dialog-footer"></span>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      zuixinjia: "暂无数据",
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
    c(row) {
      this.zuixinjia = row.myPrice;
    },
    close() {
      let win = this.$Win.getWinByName("zhiyingzhisun");
      this.$Win.closeWin(win);
    }
  }
};
</script>
<style lang="scss" scoped>
.zhisunTanchuang {
  height: 100vh;
  background: rgba(42, 47, 56, 1);
  font-family: Microsoft YaHei;
  p {
    margin: 0px;
  }
  .top {
    padding: 1px;
    text-align: center;
    background: rgba(47, 52, 59, 1);
    color: #9b9999;
  }
  .center {
    padding: 10px 3%;
    background: rgba(42, 47, 56, 1);
  }
  .footer {
    padding: 10px 3%;
    background: rgba(42, 47, 56, 1);
    text-align: right;
  }
}
</style>
