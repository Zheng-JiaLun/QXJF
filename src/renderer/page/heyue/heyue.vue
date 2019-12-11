<template>
  <div class="heyue">
    <!-- 合约页面的主体展示区域，此区域分为左右两大板块 -->
    <div class="container">
      <!-- 主体区域的左边部分，此区域主要展示交易所清单 -->
      <div class="left">
        <div
          class="jiaoyisuo"
          v-for="(item, index) in jiaoyisuoList"
          :key="index"
          :style="{background:isactive == index ? changebackground : '',color:isactive == index ?color:''}"
          @click="selectjiaoyisuo(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 主体区域的右边部分，此区域主要展示左边选中交易所对应的合约信息详情 -->
      <div class="right">
        <!-- 产品的下拉选项栏 -->
        <div class="chanpin">
          <span>产品</span>
          <select>
            <option
              v-for="(item, index) in heyueList"
              :key="index"
              :label="item.heyuename"
              :value="item.heyuename"
            ></option>
          </select>
        </div>
        <!-- 此区域展示合约详情，主体分为左右两大板块 -->
        <div class="content">
          <!-- 主体左边部分，展示产品相关信息 -->
          <div class="leftlist">
            <div class="title">
              <span>恒生1808</span>
            </div>
            <div class="information">
              <p>
                <span>交易品种：</span>
                <span>恒生1808</span>
              </p>
              <p>
                <span>合约乘数：</span>
                <span>50HKS/手</span>
              </p>
              <p>
                <span>涨跌停板幅度：</span>
                <span>无</span>
              </p>
              <p>
                <span>最后交易日：</span>
                <span>合约月份最后第2个交易日</span>
              </p>
              <p>
                <span>最低交易保证金：</span>
                <span>合约价值的7%</span>
              </p>
              <p>
                <span>交易代码：</span>
                <span>HSI</span>
              </p>
              <p>
                <span>上市时间：</span>
                <span>1964年7月31日</span>
              </p>
              <p>
                <span>手续费：</span>
                <span>开仓手续费</span>
                <span>150.0</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>平仓手续费</span>
                <span>150.0</span>
              </p>
            </div>
          </div>
          <!-- 主体右边部分，展示合约相关信息 -->
          <div class="rightlist">
            <div class="title">
              <span>合约信息</span>
            </div>
            <div class="information">
              <ul>
                <li>
                  <p>
                    <span>报价单位：</span>
                    <span>每指数点HKS50</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>最小价格变动单位：</span>
                    <span>一个指数点</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>交易时间：</span>
                    <span>
                      上午 9:15-12:00&nbsp;&nbsp;&nbsp;&nbsp;
                      下午 13:00-16:00&nbsp;&nbsp;&nbsp;&nbsp;
                      夜盘 17:15-次日01:00
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>最后交割日：</span>
                    <span>合约月份最后第2个交易日</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>交割方式：</span>
                    <span>现金交割</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>合约月份：</span>
                    <span>HSI1808</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span>保证金：</span>
                    <span>16000.0</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "heyue",
  data() {
    return {
      isactive: -1,
      changebackground: "",
      color: "",
      heyueList: [],
      jiaoyisuoList: [
        {
          name: "自选",
          heyue: [
            {
              heyuename: "自选合约一"
            },
            {
              heyuename: "自选合约二"
            },
            {
              heyuename: "自选合约三"
            },
            {
              heyuename: "自选合约四"
            }
          ]
        },
        {
          name: "香港HKEX",
          heyue: [
            {
              heyuename: "香港HKEX合约一"
            },
            {
              heyuename: "香港HKEX合约二"
            },
            {
              heyuename: "香港HKEX合约三"
            },
            {
              heyuename: "香港HKEX合约四"
            }
          ]
        },
        {
          name: "纽约NYMEX",
          heyue: [
            {
              heyuename: "纽约NYMEX合约一"
            },
            {
              heyuename: "纽约NYMEX合约二"
            },
            {
              heyuename: "纽约NYMEX合约三"
            },
            {
              heyuename: "纽约NYMEX合约四"
            }
          ]
        },
        {
          name: "上海能源INE",
          heyue: [
            {
              heyuename: "上海能源INE合约一"
            },
            {
              heyuename: "上海能源INE合约二"
            },
            {
              heyuename: "上海能源INE合约三"
            },
            {
              heyuename: "上海能源INE合约四"
            }
          ]
        },
        {
          name: "郑州交易所",
          heyue: [
            {
              heyuename: "郑州交易所合约一"
            },
            {
              heyuename: "郑州交易所合约二"
            },
            {
              heyuename: "郑州交易所合约三"
            },
            {
              heyuename: "郑州交易所合约四"
            }
          ]
        }
      ]
    };
  },
  methods: {
    selectjiaoyisuo(index) {
      this.changebackground = "rgba(34,48,76,1)";
      this.color = "#FFFFFF";
      this.isactive = index;
      this.heyueList = this.jiaoyisuoList[index].heyue;
    }
  }
};
</script>
<style lang="scss" scoped>
// 合约页面的主体宽高设置
.heyue {
  width: 100%;
  
  // 合约展示区域弹性布局
  .container {
    display: flex;
    height:calc(100vh - 60px);
    // 左边交易所列表展示区域样式
    .left {
      width: 14%;
      height:calc(100vh - 60px);
      background: rgba(30, 35, 41, 1);
      margin-right: 10px;
      // 单个交易所的样式设置
      .jiaoyisuo {
        padding: 20px 0px;
        width: 100%;
        color: #999999;
        text-align: center;
        font-size: 16px;
      }
    }
    // 右边合约信息的样式设置
    .right {
     width: 85%;
      height:calc(100vh - 60px);
      color: #999999;
      // 产品名称下拉菜单栏
      .chanpin {
        width: 100%;
        height: 29px;
        background: rgba(30, 35, 41, 1);
        border: 1px solid rgba(0, 0, 0, 1);
        border-bottom: none;
        span {
          line-height: 29px;
          margin-left: 10px;
          margin-right: 10px;
        }
        select {
          color: #999999;
          width: 150px;
          height: 25px;
          background: rgba(38, 44, 51, 1);
          border-radius: 2px;
          line-height: 29px;
          margin-top: -2px;
          border: 1px solid rgba(38, 44, 51, 1);
        }
      }
      // 产品合约信息展示区域样式设置
      .content {
        display: flex;
        border: 1px solid rgba(0, 0, 0, 1);
        height:calc(100vh - 110px);
        // 左边信息展示区域样式设置
        .leftlist {
          font-size: 16px;
          // color: red;
          flex: 1;
          border-right: 1px solid rgba(0, 0, 0, 1);
          height: 100%;
          .title {
            border-bottom: 1px solid rgba(0, 0, 0, 1);
            padding-left: 10px;
            height: 19px;
            line-height: 19px;
            background: rgba(30, 35, 41, 1);
          }
          .information {
            font-size: 16px;
            // color: red;
            padding-left: 10px;
          }
        }
        // 右边信息展示区域样式设置
        .rightlist {
          flex: 2;
          font-size: 16px;
          // color: red;
          .title {
            border-bottom: 1px solid rgba(0, 0, 0, 1);
            padding-left: 10px;
            height: 19px;
            line-height: 19px;
            background: rgba(30, 35, 41, 1);
          }
          .information {
            font-size: 16px;
            // color: red;
            padding-left: 10px;
            li {
              line-height: 19px;
            }
          }
        }
      }
    }
  }
}
</style>