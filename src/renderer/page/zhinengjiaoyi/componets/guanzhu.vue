<template>
  <div class="guanzhu">
    <!-- 此区域展示所有关注的人 -->
    <div class="guanzhuliebiao">
      <!-- 关注的人具体信息展示，此div为循环体 -->
      <div class="guanzhuderen" v-for="(item,index) in 3" :key="index">
        <!-- 头像展示 -->
        <div class="logo">
          <img src="../../../assets/timg.jpg" alt="头像理发去了.." />
        </div>
        <!-- 昵称展示 -->
        <div class="nicheng">
          <span>十二的二</span>
          <span>A</span>
        </div>
        <!-- 人气展示 -->
        <div class="renqi">
          <div class="celve">
            <span>40</span>
            <br />
            <span>策略</span>
          </div>
          <div class="guanzhushu">
            <span>9299</span>
            <br />
            <span>关注</span>
          </div>
          <div class="fensishu">
            <span>9299</span>
            <br />
            <span>粉丝</span>
          </div>
        </div>
        <!-- 收益与回撤 -->
        <div class="shouhui">
          <div class="shouyilv">
            <div>
              <span>收益率</span>
            </div>
            <div>
              <span>138.0%</span>
            </div>
          </div>
          <div class="huiche">
            <div>
              <span>最大回撤</span>
            </div>
            <div>
              <span>2.76%</span>
            </div>
          </div>
        </div>
        <!-- 关注按钮 -->
        <div class="anniu">
          <div class="guanzhuanniu">
            <span>+关注</span>
          </div>
        </div>
      </div>

    
  
  </div>
  </div>
</template>

<script>
export default {
  name: "guanzhu",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.guanzhu {
  width: 100%;
  background: rgba(25, 27, 31, 1);
  .guanzhuliebiao {
    margin: 12px 138px 0px 38px;
    width: 100%;
    .guanzhuderen {
      color: rgba(243, 237, 237, 0.992);
      padding: 15px;
      float: left;
      width: 15%;
      opacity: 0.8;
      border-radius: 2px;
      margin: 10px;
      border: 1px solid rgb(2, 2, 2);
      //   头像展示区域样式
      .logo {
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      //   昵称展示区域样式
      .nicheng {
        span:nth-child(1) {
          font-weight: bolder;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
        span:nth-child(2) {
          font-weight: bolder;
          margin-right: 10px;
          background: linear-gradient(
            -10deg,
            rgba(34, 48, 76, 1),
            rgba(82, 134, 231, 1)
          );
          padding: 0px 5px;
          opacity: 0.26;
          border-radius: 2px;
        }
      }
      //   人气展示区域样式
      .renqi {
        display: flex;
        margin-top: 20px;
        .celve,
        .guanzhushu,
        .fensishu {
          flex: 1;
          margin-right: 10px;
          //   text-align: center;
        }
      }
      //   收益率和最大回撤区域样式展示
      .shouhui {
        margin-top: 50px;
        .shouyilv {
          display: flex;
          div:nth-child(1) {
            flex: 1;
            text-align: left;
          }
          div:nth-child(2) {
            flex: 1;
            text-align: right;
            color: red;
          }
        }
        .huiche {
          display: flex;
          div:nth-child(1) {
            flex: 1;
            text-align: left;
          }
          div:nth-child(2) {
            flex: 1;
            text-align: right;
          }
        }
      }
      .anniu {
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
        .guanzhuanniu {
          padding: 2px 10px;
          width: 77px;
          height: 20px;
          background: rgba(40, 55, 83, 1);
          border-radius: 1px;
          margin: 0 auto;
          span{
              line-height: 20px;
          }
        }
      }
    }
  }
.content{
    width: 80%;
    margin: 0 auto;
    display: flex;
    .yonghu{
        width: 20%;
        background:rgba(25,27,31,1);
        border-radius:4px;
        margin: 1%;
        //background: red;
        p{
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(253,253,253,1);
            line-height:17px;
            margin-left: 5%;
        }
        ul{
            width: 90%;
            padding: 0px;
            margin: 0 auto;
            display: flex;
            list-style: none;

            li{
                width: 30%;
                font-size:8px;
                font-family:Microsoft YaHei;
                font-weight:300;
                color:rgba(163,163,163,1);
                line-height:17px;
                text-align:left;
                }
        }
        .el-button{
            width: 40%;
            margin-left: 30%;
            background:rgba(40,55,83,1);
            border-radius:1px;
        }
    }
}
}
</style>