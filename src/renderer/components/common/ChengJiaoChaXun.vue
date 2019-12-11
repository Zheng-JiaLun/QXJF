<template>
  <div class="Chengjiao" id="chengjiao">
    <el-table
      :data="delData"
      tooltip-effect="light"
      highlight-current-row
       @current-change="handleCurrentChange"
    >
      <el-table-column prop="name" label="合约" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="position" label="手数" show-overflow-tooltip ></el-table-column>
      <el-table-column label="买卖" show-overflow-tooltip >
        <template slot-scope="scope">
          <span
            :style="scope.row.business == '买' ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{scope.row.business}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="openPrice" label="开仓价格" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="opentime" label="开仓时间" width="150" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="openType" label="开仓方式" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="closePrice" label="平仓价格" show-overflow-tooltip ></el-table-column>
      <el-table-column label="本币盈亏" show-overflow-tooltip >
        <template slot-scope="scope">
          <span
            :style="scope.row.this_pro_loss > 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{scope.row.this_pro_loss}}</span>
        </template>
      </el-table-column>
      <el-table-column label="盈亏" show-overflow-tooltip >
        <template slot-scope="scope">
          <span
            :style="scope.row.pro_loss > 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
          >{{scope.row.pro_loss}}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交订单" show-overflow-tooltip >
        <template slot-scope="scope">
          <span style="color: #DCDC0A;">{{scope.row.delOrder}}</span>
        </template>
      </el-table-column>
      <el-table-column label="止盈止损" show-overflow-tooltip >
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="setPrLoss()">{{scope.row.stop_pro_loss}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "Chengjiao",
  props: ["Listheight"],
  data() {
    return {
      delData: [
        {
          name: "小恒生1905",
          position: 1,
          business: "买",
          openPrice: 79586,
          opentime: "05-07 13:15:00",
          openType: "市价成交",
          closePrice: 75698,
          this_pro_loss: 733,
          pro_loss: -1524,
          delOrder: "MHI1905",
          stop_pro_loss: "0/4"
        },
        {
          name: "小恒生1905",
          position: 1,
          business: "买",
          openPrice: 79586,
          opentime: "05-07 13:15:00",
          openType: "市价成交",
          closePrice: 75698,
          this_pro_loss: 733,
          pro_loss: 1524,
          delOrder: "MHI1905",
          stop_pro_loss: "0/4"
        },
        {
          name: "小恒生1905",
          position: 1,
          business: "卖",
          openPrice: 79586,
          opentime: "05-07 13:15:00",
          openType: "市价成交",
          closePrice: 75698,
          this_pro_loss: 733,
          pro_loss: -1524,
          delOrder: "MHI1905",
          stop_pro_loss: "0/4"
        },
        {
          name: "小恒生1905",
          position: 1,
          business: "卖",
          openPrice: 79586,
          opentime: "05-07 13:15:00",
          openType: "市价成交",
          closePrice: 75698,
          this_pro_loss: 733,
          pro_loss: 1524,
          delOrder: "MHI1905",
          stop_pro_loss: "0/4"
        },
        {
          name: "小恒生1905",
          position: 1,
          business: "卖",
          openPrice: 79586,
          opentime: "05-07 13:15:00",
          openType: "市价成交",
          closePrice: 75698,
          this_pro_loss: 733,
          pro_loss: -1524,
          delOrder: "MHI1905",
          stop_pro_loss: "0/4"
        },
        {
          name: "小恒生1905",
          position: 1,
          business: "卖",
          openPrice: 79586,
          opentime: "05-07 13:15:00",
          openType: "市价成交",
          closePrice: 75698,
          this_pro_loss: 733,
          pro_loss: 1524,
          delOrder: "MHI1905",
          stop_pro_loss: "0/4"
        }
      ]
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
      }
  },
  watch: {
    //  当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身相关元素的高度
    Listheight: {
      handler: function(Val, oldVal) {
        document.getElementById("chengjiao").style.height = +Val + "px";
      }
    }
  },
};
</script>
<style lang="scss" scoped>
#chengjiao {
  width: 100%;
  height: 100%;
  overflow: scroll;
  
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