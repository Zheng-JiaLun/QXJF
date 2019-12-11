<template>
  <div class="churujin" id="churujin">
    <el-table
      :data="ChuRuJinData"
      class="table01"
      tooltip-effect="light"
      style="width: 100%;"
      max-height="250"
      highlight-current-row
    >
      <el-table-column prop="userid" label="用户账号" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="money" label="金额" show-overflow-tooltip ></el-table-column>
      <el-table-column label="出入" show-overflow-tooltip >
        <template slot-scope="scope">
          <span style="color: #DCDC0A;">{{scope.row.outorin}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="申请日期" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="status" label="处理状态" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="chulidate" label="处理日期" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="paymode" label="支付方式" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="serial_number" label="流水号" show-overflow-tooltip ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "churujin",
  props: ["Listheight"],
  data() {
    return {
      ChuRuJinData: [
        {
          userid: "8A89UA89976",
          money: 19055,
          outorin: "出金",
          date: "06-03 12:34:13",
          status: "处理中",
          chulidate: "06-03 12:34:13",
          paymode: "银行卡支付",
          serial_number: "928287721749291"
        },
        {
          userid: "8A89UA89976",
          money: 19055,
          outorin: "出金",
          date: "06-03 12:34:13",
          status: "处理中",
          chulidate: "06-03 12:34:13",
          paymode: "银行卡支付",
          serial_number: "928287721749292"
        },
        {
          userid: "8A89UA89976",
          money: 19055,
          outorin: "出金",
          date: "06-03 12:34:13",
          status: "处理中",
          chulidate: "06-03 12:34:13",
          paymode: "银行卡支付",
          serial_number: "928287721749293"
        },
        {
          userid: "8A89UA89976",
          money: 19055,
          outorin: "出金",
          date: "06-03 12:34:13",
          status: "处理中",
          chulidate: "06-03 12:34:13",
          paymode: "银行卡支付",
          serial_number: "928287721749294"
        }
      ]
    };
  },
  watch: {
    //  当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身相关元素的高度
    Listheight: {
      handler: function(Val, oldVal) {
        document.getElementById("churujin").style.height = +Val + "px";
      }
    }
  },
};
</script>
<style lang="scss" scoped>
#churujin{
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
}
#churujin::-webkit-scrollbar {
  // display: none;
  width: 10px; // 横向滚动条
  height: 10px;
}
#churujin::-webkit-scrollbar-corner {
  display: none;
//  background: rgba(34, 39, 46, 1);
}
#churujin::-webkit-scrollbar-thumb {
  background-color: rgba(34,48,76,1);
  width: 6px; // 横向滚动条
  height: 6px;
}
</style>