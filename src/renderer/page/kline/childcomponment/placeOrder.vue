<template>
  <div class="moni">
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
                <input type="text" placeholder="CY001" />
                <i class="el-icon-search"></i>
              </li>
              <li>
                <p>手数</p>
                <input type="number" placeholder="1" />
              </li>
              <li>
                <p>价格</p>
                <input type="number" placeholder="对手价" />
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
                <div class="cl buy">
                  <p>
                    <span>23747</span>
                    <i class="el-icon-caret-top"></i>
                  </p>
                  <p>买多</p>
                </div>
                <!-- <p>&lt;=28</p> -->
              </li>
              <li>
                <div class="cl sell">
                  <p>
                    <span>23747</span>
                    <i class="el-icon-caret-top"></i>
                  </p>
                  <p>卖空</p>
                </div>
                <!-- <p>&lt;=28</p> -->
              </li>
              <li>
                <div class="cl ping">
                  <p>
                    <span>先开先平</span>
                  </p>
                  <p>平仓</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 快捷按键区域 -->
          <div class="fast">
            <span>快捷反手</span>
            <span>快捷平仓</span>
            <span>部分平仓</span>
            <span>全部平仓</span>
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
          </ul>
        </div>
      </div>
      <!-- 展示板块的右边部分，主要展示合约列表 -->
      <div class="right">
        <el-tabs v-model="activeName" type="card" >
          <!-- 引入持仓组件 -->
          <el-tab-pane label="持仓" name="chicang">
            <!-- <MoNiChiCang></MoNiChiCang> -->
          </el-tab-pane>
          <!-- 引入委托组件 -->
          <el-tab-pane label="委托" name="weituo">
            <!-- <MoNiWeiTuo :msg="tableData"></MoNiWeiTuo> -->
          </el-tab-pane>
          <!-- 引入成交组件 -->
          <el-tab-pane label="成交" name="chengjiao">
            <!-- <MoNiChengJiao></MoNiChengJiao> -->
          </el-tab-pane>
          <!-- 引入预备单组件 -->
          <el-tab-pane label="预备单" name="yu">
            <!-- <MoNiYuBeiDan></MoNiYuBeiDan> -->
          </el-tab-pane>
          <!-- 引入条件单组件 -->
          <el-tab-pane label="条件单" name="tiao">
            <!-- <MoNiTiaoJianDan></MoNiTiaoJianDan> -->
          </el-tab-pane>
          <!-- 引入损盈单组件 -->
          <el-tab-pane label="损盈单" name="ying">
            <!-- <MoNiSunYingDan></MoNiSunYingDan> -->
          </el-tab-pane>
          <!-- 引入资金组件 -->
          <el-tab-pane label="资金" name="money">
            <!-- <MoNiZiJin></MoNiZiJin> -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"placeOrder",
    data(){
        return {
             activeName :"chicang",
        }
    }
}
</script>

<style lang="scss" scoped>
    .moni {
  width: 100%;
  height: 100%;
  background-color: #2f343b;
  position: relative;
  // 内容展示区域样式
  .container {
    padding: 0 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    box-sizing: border-box;
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
        // height: 250px;
        border: 1px solid black;
         min-width: 400px;
         box-sizing: border-box;
        .input {
          padding: 5px 10px;
          height: 70px;
          margin-bottom: 10px;
          // display: flex;
         
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
            // flex: 4;
            display: inline-block;
            li {
              margin: 0px 16px 0px 5px;
              float: left;
              p {
                margin: 10px 0px;
              }
            }
          }
          .ul02 {
            // flex: 1.5;
            list-style: none;
            font-size: 14px;
            margin-top: 30px;
            padding: 0px;
            text-align: right;
            float: right;
            li {
              margin: 0px 16px;
              p {
                margin: 10px 0px;
              }
            }
          }
        }
        .center {
          padding: 0 7px;
          height: 61px;
          .ul03 {
            list-style: none;
            margin: 0px;
            padding: 0px;
            float: left;
            li {
              width: 70px;
              float: left;
              margin: 0px 12px 0px 5px;
              text-align: center;
              p {
                // margin: 5px 0px;
              }
              p:last-child{
                font-size: 15px;
              }
              div {
                padding: 2px 0px;
                box-sizing: border-box;
                color: #ffffff;
                width: 100%;
                height: 47px;
                font-size: 14px;
                border-radius: 4px;
                p:first-child {
                  border-bottom: #fdfdfd 1px solid;
                }
                p {
                  margin: 0 0px;
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
          margin-bottom: 10px;
          :first-child {
            margin-left: 25px;
          }
          span {
            font-size: 14px;
            padding: 5px;
            display: inline-block;
            box-sizing: border-box;
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
        min-width: 400px;
      }
      .list{
        min-width: 400px;
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
    //   height: 400px;
      width: 60%;
      border: 1px solid black;
      color: #ffffff;
    }
  }
}
</style>