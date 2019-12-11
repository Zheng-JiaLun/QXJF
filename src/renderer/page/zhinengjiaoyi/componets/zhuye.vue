<template>
  <div class="zhuye">
    <!-- 此区域用于展示个人简介，主体部分为左右两大板块 -->
    <div class="brief">
      <!-- 简介区域的左边部分，用于展示个人介绍 -->
      <div class="left">
        <!-- 头像展示 -->
        <div class="logo">
          <img src="../../../assets/timg.jpg" alt="头像理发去了.." />
        </div>
        <div class="information">
          <span class="nickname">十二的二</span>
          <div class="geren">
            <div>
              <span>个人简介：</span>
            </div>
            <div>
              <span>
                13的手工实战经验，7年的程序化交易经验，
                目前已经形成稳定的量化对冲突交易系统。
                内心对市场永远心存敬畏，交易如履薄冰。
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 简介区域的右边部分，用于展示关注、粉丝以及人气相关信息 -->
      <div class="right">
        <!-- 关注按钮存放区域 -->
        <div class="attention0">
          <div class="attention">
            <span>+ 关注</span>
          </div>
        </div>

        <div class="heat">
          <div class="renqi">
            <span>10000</span>
            <br />
            <span>人气</span>
          </div>
          <div class="fans">
            <span>9000</span>
            <br />
            <span>粉丝</span>
          </div>
          <div class="guanzhu">
            <span>713</span>
            <br />
            <span>关注</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 此区域用于展示个人相关动态 -->
    <!-- 个人动态循环体 -->
    <div class="dynmaic"  v-for="(item,index) in 3" :key="index" >
      <!-- 头像以及文字展示区域 -->
      <div class="gerendongtai">
        <div class="fabiao" @click="showBox()">
          <!-- 头像展示 -->
          <div class="logo">
            <img src="../../../assets/timg.jpg" alt="头像理发去了.." />
          </div>
          <!-- 昵称、发表时间、发表内容（文字部分）展示区域 -->
          <div class="information">
            <!-- 展示昵称 -->
            <div>
              <span class="nickname">十二的二</span>
            </div>
            <!-- 发表时间、发表文字展示 -->
            <div class="geren">
              <p>05/20&nbsp;&nbsp;09:20</p>
              <p>
                这个月真的是煎熬...隔夜利息太重了...以后不做CHF了波动太小也赚不到钱！
                不错的是早起布局的gbp和eur抓住了，也算是安慰了。这个月行情普遍不好能赚就满足了z。
              </p>
            </div>
          </div>
        </div>
        <!-- 无内容，占位置，切莫删除 -->
        <div class="other"></div>
      </div>
      <!-- 文字下方列表及评论展示区域 -->
      <div class="liebiao">
        <div class="jietu">这是图片...</div>
        <!-- 评赞操作区域 -->
        <div class="caozuo">
          <div class="pinlun">
            <i class="el-icon-edit"></i>
            <span>我要评论</span>
          </div>
          <div class="liuyan">
            <i class="el-icon-chat-dot-square"></i>
            <span>1231</span>
          </div>
          <div class="dianzan">
            <i class="el-icon-thumb"></i>
            <span>4545</span>
          </div>
        </div>
        <!-- 评论展示列表 -->
        <!-- 评论循环体 -->
        <div class="liuyanlist" v-for="(item,index) in 2" :key="index">
          <!-- 留言者头像和昵称 -->
          <div class="fangke">
            <!-- 留言者头像 -->
            <div class="fangkelogo">
              <img src="../../../assets/timg.jpg" alt="头像理发去了.." />
            </div>
            <!-- 留言者昵称 -->
            <div class="fangkexinxi">
              <span>大猪蹄子</span>
              <span>已关注作者</span>
              <br />
              <p class="liuyanshijian">05/20&nbsp;&nbsp;09:20</p>
            </div>
          </div>
          <div class="liuyan">
            <p>
              13的手工实战经验，7年的程序化交易经验，
              目前已经形成了稳定的量化对冲交易系统。
              内心对市场永远心存敬畏，交易如履薄冰。
            </p>
          </div>
          <div class="liuyancaozuo">
            <div class="liuyandianzan">
              <i class="el-icon-thumb"></i>
              <span>4545</span>
            </div>
            <div class="liuyanhuifu">
              <div>
                <span>回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zhuye",
  data() {
    return {};
  },
  methods:{
    async showBox() {
				let data = await this.$Win.openWin({
					// browserwindow原生属性
					width: 450, // 窗口宽
					height: 650, // 窗口高
			
					// electron-vue-windows自定义的属性
					windowConfig: {
						router: '/zhuyetanchuang', // 路由 *必填
						data: {
							id: 1
						}, // 传送数据 
						name: 'zhuyetanchuang', // 窗口名称
						animation: 'fromLeft'
					}
				})
			},
  }
};
</script>
<style lang="scss" scoped>
.zhuye {
  width: 100%;

  
  //overflow-y: scroll;
  //-webkit-overflow-scrolling: touch;
  .brief {
    display: flex;
    .left {
      flex: 6.5;
      display: flex;
      padding: 20px 80px;
      .logo {
        margin-right: 20px;
        img {
          width: 40px;
        height: 40px;
          border-radius: 50%;
        }
      }
      .information {
        color: #ffffff;
        .nickname {
          font-size: 25px;
          font-weight: bold;
        }
        .geren {
          margin-top: 20px;
          display: flex;
          :first-child {
            flex: 1.2;
          }
          :last-child {
            flex: 8;
          }
        }
      }
    }
    .right {
      flex: 3.5;
      font-family: MicrosoftYaHei;
      padding: 20px 210px 20px 20px;
      .attention0 {
        width: 100%;
        height: 55px;
        .attention {
          color: #ffffff;
          background: #283753;
          width: 90px;
          font-weight: bold;
          padding: 6px;
          text-align: center;
          float: right;
        }
      }
      .heat {
        color: #fff;
        div {
          float: right;
          margin-left: 50px;
          text-align: center;
        }
      }
    }
  }
  .dynmaic {
    width: 100%;
    margin-top: 50px;
    .gerendongtai {
      display: flex;
      .fabiao {
        flex: 6.5;
        display: flex;
        padding: 20px 80px 10px 80px;
        .logo {
          margin-right: 20px;
          img {
             width: 40px;
          height: 40px;
            border-radius: 50%;
          }
        }
        .information {
          color: #ffffff;
          .nickname {
            font-size: 25px;
            font-weight: bold;
          }
        }
      }
      .other {
        flex: 3.5;
        padding: 20px 210px 10px 20px;
      }
    }
    .liebiao {
      width: 55%;
      margin-left: 113px;
      .jietu {
        width: 100%;
        height: 300px;
        background: grey;
      }
      .caozuo {
        color: rgba(195, 195, 195, 1);
        border-bottom: 1px solid grey;
        height: 30px;
        margin-bottom: 10px;
        div {
          float: right;
          margin: 10px 25px 0px 5px;
        }
        div:first-child {
          float: left;
        }
      }
      .liuyanlist {
        color: rgba(255, 255, 255, 1);
        .fangke {
          display: flex;
          height: 45px;
          .fangkelogo {
            flex: 0.7;
            height: 50px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .fangkexinxi {
            flex: 9.3;
            span:nth-child(1) {
              font-weight: bold;
            }
            span:nth-child(2) {
              border-radius: 1px;
              padding: 2px 3px;
              font-size: 12px;
              border: 1px solid rgba(107, 107, 107, 1);
            }
            .liuyanshijian{
              font-size: 12px;
              margin: 5px;
              margin-bottom: 0px;
            }
          }
        }
        .liuyan{
          p{
             margin:0px 0px 10px 0px;
          }
        }
        .liuyancaozuo {
          margin-bottom: 30px;
          display: flex;
          div:nth-child(1) {
            margin-right: 10px;
          }
          div:nth-child(2) {
            div:nth-child(1) {
              padding:0px 10px;
              background:rgba(34,48,76,1);
              border-radius: 12px;
            }
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>