<template>
  <div class="xiangqing">
    <div class="close">
      
        <i class="el-icon-close" @click="close()"></i>
    </div>
    <div class="dynmaic">
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
            <div class="information01">
              <div>
                <span class="nickname">十二的二</span>
                <p>05/20&nbsp;&nbsp;09:20</p>
              </div>

              <div class="genzong">
                <span>跟踪策略</span>
              </div>
            </div>

            <!-- 发表时间、发表文字展示 -->
            <div class="geren">
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
        <div class="liuyanlist" v-for="(item,index) in pinglunlist" :key="index">
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
    <div class="all" v-show="pinglunlist.length==1">
      <span @click="watchall()">查看全部评论</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "xiangqing",
  data() {
    return {
      pinglunlist: [1]
    };
  },
  methods: {
    // 关闭弹窗函数
    close() {
      let win = this.$Win.getWinByName("zhuyetanchuang");
      this.$Win.closeWin(win);
    },
    // 查看全部评论函数
    watchall() {
      this.pinglunlist = [1, 2];
    }
  }
};
</script>
<style lang="scss" scoped>
.xiangqing {
  background: white;
  width: 100%;
  .close {
    width: 100%;
    position:fixed;
    background: white;
    padding-top: 5px;
    text-align: right;
  }
  .dynmaic {
    color: rgba(51, 50, 50, 1);
    width: 100%;
padding-top: 25px;
    .gerendongtai {
      .fabiao {
        display: flex;
        .logo {
          margin-right: 2px;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .information {
          .information01 {
            display: flex;
            div:first-child {
              flex: 1;
              .nickname {
                font-size: 20px;
                font-weight: bold;
              }
              p {
                margin: 5px 2px;
                font-size: 12px;
              }
            }
            .genzong {
              flex: 1;
              text-align: right;
              padding: 10px 20px 0px 0px;
              span {
                padding: 5px 10px;
                background: rgba(65, 118, 216, 1);
                color: white;
              }
            }
          }
          .geren {
            p {
              margin: 10px 2px;
            }
          }
        }
      }
    }
    .liebiao {
      .jietu {
        width: 90%;
        height: 200px;
        background: grey;
        margin: 10px auto;
      }
      .caozuo {
        padding: 3px 15px;
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
        padding: 5px 15px;
        color: rgba(51, 50, 50, 1);
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
            .liuyanshijian {
              font-size: 12px;
              margin: 5px;
              margin-bottom: 0px;
            }
          }
        }
        .liuyan {
          p {
            margin: 0px 0px 10px 0px;
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
              color: white;
              padding: 0px 10px;
              background: rgba(34, 48, 76, 1);
              border-radius: 12px;
            }
            margin-right: 10px;
          }
        }
      }
    }
  }
  .all {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>