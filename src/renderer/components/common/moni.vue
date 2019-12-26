<template>
  <div class="moni">
    <!-- 横向信息展示区域 -->
    <div class="top">
      <ul class="flex firstul">
        <li>易得模拟_71376613</li>
        <li>
          <span>权益:</span>
          <span>900.00</span>
        </li>
        <li>
          <span>可用资金:</span>
          <span>900.00</span>
        </li>
        <li>
          <span>资金使用率:</span>
          <span>900.00</span>
        </li>
      </ul>
      <!-- <div></div> -->
      <ul class="flex secondul">
        <li>
          <p class="min" @click="close()">
            <i class="el-icon-arrow-down" style="font-size: 18px;"></i>
          </p>
        </li>
        <li>
          <p class="change" @click="close()">
            <i class="el-icon-sort"></i>
          </p>
        </li>
      </ul>
    </div>
    <!-- 内容展示区域，此区域主要分为左右两大板块 -->
    <div class="container">
      <!-- 展示板块的左边部分 -->
      <div class="left">
        <div class="cont">
          <!-- 上方input表格表单区域 -->
          <div class="input flex">
            <ul class="ul01 flex">
              <li>
                <p>
                  <i class="el-icon-lock"></i>
                </p>
                <input type="text" placeholder="合约代码"  v-model="inputVal"/>
                <i class="el-icon-search"></i>
              </li>
              <li>
                <p>手数</p>
                <input type="number" placeholder="数量" v-model="inputNum"/>
              </li>
              <li>
                <p>价格</p>
                <input type="number" placeholder="对手价"  v-model="codePrice" />
              </li>
            </ul>
            <ul class="ul02 flex" style="line-height: 20px;">
              <li>
                <span>56239</span>
                <span style="color: #FF3322;">涨板</span>
              </li>

              <li>
                <span>56239</span>
                <span style="color: #00BD00;">跌板</span>
              </li>
            </ul>
          </div>
          <!-- 中间彩色按键区域 -->
          <div class="center">
            <ul class="ul03">
              <li>
                <div class="cl buy" @click="buy(1)">
                  <p>
                    <span>{{codePrice}}</span>
                    <i class="el-icon-caret-top"></i>
                  </p>
                  <p>买多</p>
                </div>
                <!-- <p>&lt;=28</p> -->
              </li>
              <li>
                <div class="cl sell" @click="buy(2)">
                  <p>
                    <span>{{codePrice}}</span>
                    <i class="el-icon-caret-top"></i>
                  </p>
                  <p>卖空</p>
                </div>
                <!-- <p>&lt;=28</p> -->
              </li>
              <li>
                <div class="cl ping" @click="ping()">
                  <p>
                    <span>先开先平</span>
                  </p>
                  <p>平仓</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 快捷按键区域 -->
          <div class="fast" v-show="ischichang">
            <span @click="quickFS">快捷反手</span>
            <span @click="quickPC">快捷平仓</span>
            <span @click="onePC">部分平仓</span>
            <span @click="allPC">全部平仓</span>
            <!-- <input type="button" value="快捷反手"/>
            <input type="button" value="快捷平仓"/>
            <input type="button" value="部分平仓"/>
            <input type="button" value="全部平仓"/> -->
          </div>
        </div>
        <p class="p">美原油，每手5吨,保证金18371元，纽约交易所，内盘</p>
        <div class="list" style="color: #999999;">
          <ul class="ul04">
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
          </ul>
        </div>
      </div>
      <!-- 展示板块的右边部分，主要展示合约列表 -->
      <div class="right">
        <el-tabs v-model="activeName"
        @tab-click="handleClick"
         type="card" >
          <!-- 引入持仓组件 -->
          <el-tab-pane label="持仓" name="chicang">
            <ChiCang :pinChang='pinChang' :selector="selector"></ChiCang>
          </el-tab-pane>
          <!-- 引入委托组件 -->
          <el-tab-pane label="委托" name="weituo">
            <MoNiWeiTuo :msg="tableData"></MoNiWeiTuo>
          </el-tab-pane>
          <!-- 引入成交组件 -->
          <el-tab-pane label="成交" name="chengjiao">
            <MoNiChengJiao></MoNiChengJiao>
          </el-tab-pane>
          <!-- 引入预备单组件 -->
          <el-tab-pane label="预备单" name="yu">
            <MoNiYuBeiDan></MoNiYuBeiDan>
          </el-tab-pane>
          <!-- 引入条件单组件 -->
          <el-tab-pane label="条件单" name="tiao">
            <MoNiTiaoJianDan></MoNiTiaoJianDan>
          </el-tab-pane>
          <!-- 引入损盈单组件 -->
          <el-tab-pane label="损盈单" name="ying">
            <MoNiSunYingDan></MoNiSunYingDan>
          </el-tab-pane>
          <!-- 引入资金组件 -->
          <el-tab-pane label="资金" name="money">
            <MoNiZiJin></MoNiZiJin>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import ChiCang from '../common/ChiCangXinXi';
import MoNiChengJiao from '../common/monichildren/monichengjiao.vue';
import MoNiSunYingDan from '../common/monichildren/monisunyingdan.vue';
import MoNiTiaoJianDan from '../common/monichildren/monitiaojiandan.vue';
// import MoNiWeiTuo from '../common/monichildren/moniweituo.vue';
import MoNiWeiTuo from '../table/table.vue';
import MoNiYuBeiDan from '../common/monichildren/moniyubeidan.vue';
import MoNiZiJin from '../common/monichildren/monizijin.vue';
export default {
  name: "moni",
  inject:['reload'],
  data() {
    return {
      activeName :"chicang",
      text:"父组件传入的值",
      TabIndex: "",
      pinChang:false,
      inputVal:'',
      codePrice:'',
      inputNum:'1',
      stopLoss:'0',
      stopPrint:'0',
      ischichang:true,
      selector:false,
      codePrice:'',
      tableData: [
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "-1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "700",
          this_pro_loss: "1100",
          stop_pro_loss: "点击设置",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "卖",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "700",
          this_pro_loss: "-1100",
          stop_pro_loss: "点击设置",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "卖",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "-1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "卖",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "-1100",
          stop_pro_loss: "点击设置",
          type: "市价成交"
        }
      ],
    };
  },
  methods: {
    close() {
      let win = this.$Win.getWinByName("yidemoni");
      this.$Win.closeWin(win);
    },
    handleClick(tab, event) {
      this.TabIndex = tab.index;
      localStorage.setItem("tabindex",tab.index)
    },
    quickFS(){
      this.selector = !this.selector;
    },
    quickPC(){},
    onePC(){
      this.pinChang = !this.pinChang
    },
    allPC(){},
  },
  computed:{
     updataSocketData() {
      return this.$store.getters.updataSocketData;
    },
    changeSocketData(){
      return this.$store.getters.quoteDataAC
    }
  },
  watch:{
    updataSocketData:function(){
      this.reload()
      console.log("222")
    },
    changeSocketData:function(val){
      // console.log(val)
    }

  },

  components:{
    ChiCang,
    MoNiChengJiao,
    MoNiSunYingDan,
    MoNiTiaoJianDan,
    MoNiWeiTuo,
    MoNiYuBeiDan,
    MoNiZiJin
  }
};
</script>
<style lang="scss" scoped>
.moni {
  width: 100%;
  height: 100%;
  background-color: #2f343b;
  // 横向展示区域样式
  .top {
    color: #cccccc;
    font-size: 14px;
    background-color: #2a2f38;
    height: 50px;
    display: flex;
    justify-content: space-between;
    ul {
      list-style: none;
      margin: 0px;
      padding: 0px;
    }
    .firstul {
      flex: 8;
      -webkit-app-region: drag;//让这个div变为可拖动模块
      overflow: hidden;
      li {
        float: left;
        margin: 15px;
      }
    }
    .secondul {
      flex: 2;
      li {
        float: right;
        margin: 0px 15px;
      }
      .change {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        border: 1px solid #cccccc;
        text-align: center;
        line-height: 19px;
      }

      .min {
        width: 19px;
        height: 16px;
        line-height: 5px;
        // border: 1px dashed #cccccc;
      }
    }
  }
  // 内容展示区域样式
  .container {
    padding: 24px 40px;
    color: #cccccc;
    display: flex;
    /*滚动条样式*/
    .left::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .left::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .left {
      width: 35%;
      margin-right: 40px;
      overflow-x: auto;
      overflow-y: auto;
      box-sizing: border-box;
      .cont {
        width: 100%;
        height: 250px;
        border: 1px solid black;
         min-width: 462px;
         box-sizing: border-box;
        .input {
          padding: 5px 10px;
          height: 70px;
          margin-bottom: 10px;
          display: flex;
         
          input {
            width: 60px;
            height: 21px;
            background: rgba(34, 39, 46, 1);
            border: 1px solid rgba(89, 89, 89, 1);
            color: #ffffff; 
          }
          .ul01 {
            list-style: none;
            margin: 0px;
            padding: 0px;
            flex: 4;
            display: flex;
            li {
              margin: 0px 16px 0px 5px;
              p {
                margin: 10px 0px;
              }
            }
          }
          .ul02 {
            flex: 1.5;
            list-style: none;
            font-size: 14px;
            margin-top: 30px;
            padding: 0px;
            text-align: right;
            li {
              margin: 0px 16px;
              p {
                margin: 10px 0px;
              }
            }
          }
        }
        .center {
          padding: 5px 7px;
          height: 106px;
          .ul03 {
            list-style: none;
            margin: 0px;
            padding: 0px;
            float: left;
            li {
              width: 95px;
              float: left;
              margin: 0px 12px 0px 5px;
              text-align: center;
              p {
                margin: 5px 0px;
              }
              p:last-child{
                font-size: 18px;
              }
              div {
                padding: 2px 0px;
                box-sizing: border-box;
                color: #ffffff;
                width: 95px;
                height: 59px;
                font-size: 14px;
                border-radius: 4px;
                p:first-child {
                  border-bottom: #fdfdfd 1px solid;
                }
                p {
                  margin: 5px 0px;
                }
              }
              .buy {
                background: #e03e30;
              }
              .sell {
                background: #009944;
              }
              .ping {
                background: #1f3e7d;
              }
            }
          }
        }
        .fast {
          width: 100%;
          :first-child {
            margin-left: 25px;
          }
          span {
            font-size: 14px;
            padding: 5px;
            background-color: #545b64;
            border-radius: 2px;
            cursor: pointer;
            // border: 1px #545b64 solid ;
            // outline: none;
          }
          span:hover{
            
            background-color: #8d8c8c;
            // border: 1px #545b64 solid ;
            // outline: none;
          }
          input {
            color:  #a7a7a7;
            font-size: 14px;
            padding: 5px;
            background-color: #545b64;
            border: 1px #545b64 solid ;
            outline: none;
          }
        }
      }
      .p {
        font-size: 14px;
        background-color: #22272e;
        padding: 5px;
        margin: 10px 0 5px 0;
        min-width: 462px;
      }
      .list{
        min-width: 462px;
        .ul04 {
        list-style: none;
        padding: 0px;
        font-size: 12px;
        color: #D2D2D2;
          li{
            line-height: 20px;
          }
        }
      }
      
    }
    .right {
      height: 400px;
      width: 60%;
      border: 1px solid black;
      color: #ffffff;
    }
  }
}
</style>