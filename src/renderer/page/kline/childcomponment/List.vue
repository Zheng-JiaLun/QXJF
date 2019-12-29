<template>
  <div class="List"  id="cdcd">
    <el-tabs
      v-model="activeName"
      value="持仓信息"
      lazy
      v-show="islogin"
      type="border-card"
      @tab-click="handleClick"
      tab-position="bottom"
      id="tabs"
    >
      <!-- 在此区域引入持仓信息的组件 -->
      <el-tab-pane label="持仓信息" name="chicang" id="chicang">
        <Chicang :Listheight='Listheight' :pinChang='pinChang' :selector="selector" @childFn="parentFn" @childTopFn="parentTopFn"></Chicang>
        <div class="chichangbottom">
          <div class="jincangxinxi">
            <span>进仓时间：</span>
            <span class="spandata">{{childMsg.addtime}}</span>
            <span>止盈：</span>
            <span class="spandata">{{childMsg.stopprofit}}</span>
            <span>止损：</span>
            <span class="spandata">{{childMsg.stoploss}}</span>
          </div>
          <div class="pingcangcaozuo">
            <div>
              <input
                type="button"
                value="全部平仓"
                @click="quanbupingcang()"
              />
            </div>
            <div>
              <input
                type="button"
                value="部分平仓"
                @click="bufenpingcang()"
              />
            </div>
            <div>
              <input
                type="button"
                value="快捷平仓"
                @click="kuaijiepingcang()"
              />
            </div>
            <div>
              <input
                type="button"
                value="部分反手"
                @click="bufenfanshou()"
              />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- 在此区域引入委托信息的组件 -->
      <el-tab-pane label="委托信息" name="weituo" class="pane" id="weituo">
        <Weituo ></Weituo>
      </el-tab-pane>
      <!-- 在此区域引入成交查询的组件 -->
      <el-tab-pane label="成交查询" name="chengjiao" class="pane" id="chengjiao">
        <Chengjiao :value="value"></Chengjiao>
      </el-tab-pane>
      <el-tab-pane label="出入金查询" name="churujin" class="pane" id="churujin">
        <ChuRuJin :value="value"></ChuRuJin>
      </el-tab-pane>
      <el-tab-pane label="交割查询" name="jiaoge" class="pane" id="jiaoge">
        <JiaoGe :value="value"></JiaoGe>
      </el-tab-pane>
    </el-tabs>
    <div v-show="!islogin">
      <h2 style="color:#fff;text-align:center;">请登录后查看相关信息</h2>
    </div>
  </div>
</template>

<script>
import Chicang from "../../../components/common/ChiCangXinXi.vue";
import Weituo from "../../../components/common/WeiTuoXinXi.vue";
import Chengjiao from "../../../components/common/ChengJiaoChaXun.vue";
import ChuRuJin from "../../../components/common/ChuRuJinChaXun.vue";
import JiaoGe from "../../../components/common/JiaoGeChaXun.vue";

export default {
  name: "List",
  props:['listSize','value'],
  inject:['reload'],
  data() {
    return {
      Listheight:'',
      childMsg:{
        addtime:"",
        stoploss:"",
        stopprofit:""
      },
      changecssfanshou: 'false',
      changecsspingcang: 'false',
      changecsskuaijie: 'false',
      TabIndex: "",
      activeName: "chicang",
      selector:false,
      islogin:false,
      dialogVisible: false,
      pinChang:false,//部分平仓
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
      ],
      topData:{}
    };
  },
   mounted: function() {
     this.$nextTick(function() {
      // this.reboxSize();
    });
     if (!localStorage.getItem('ycxUserLoginState_QXJF')) { //判断是否为登录状态
        console.log('未登录状态');
        this.islogin = false
      } else {
        console.log('登录状态');
        this.islogin = true
       
      }
   },
   computed:{
     changeLoginStatus(){
       return this.$store.state.account.loginStatus
     },
    
   },
   watch: {
    //  当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身的高度
    listSize: {
      handler: function(Val, oldVal) {
        this.Listheight= +Val;
         document.getElementById("chicang").style.height = this.Listheight-28 + "px";
         document.getElementById("weituo").style.height = this.Listheight-28 + "px";
         document.getElementById("chengjiao").style.height = this.Listheight-28 + "px";
         document.getElementById("churujin").style.height = this.Listheight-28 + "px";
         document.getElementById("jiaoge").style.height = this.Listheight-28 + "px";
      }
    },
    changeLoginStatus:function(val){
      if(val == true){
        this.islogin = true
      }else{
        this.islogin = false
      }
    },
   
  },
  methods: {
    setPrLoss() {
      this.dialogVisible = true;
    },
    bufenpingcang() {
      this.pinChang = !this.pinChang;
     
    },
    parentFn(val){
      console.log(val)
      val.addtime = val.addtime.replace('T',' ')
      this.childMsg = val
    },
    parentTopFn(val){
      
      this.$emit('listenData',val)
    },
    kuaijiepingcang() {
      
    },
    bufenfanshou() {
      this.selector = !this.selector
    },
     quanbupingcang(){
      console.log(this.$store.state.serialnum)
      this.$confirm('确定全部平仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        var msg = JSON.stringify({
            userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
            serialNum:this.$store.state.serialnum.toString()
          })
         console.log(msg)
          _this.$post('select_close',msg).then(function(res){
            if(res.results == 1){
              //  _this.$store.state.market.initChicang++
              this.$message({
                type: 'success',
                message: '全部平仓成功!'
              });
            }else{
              
              alert('错误:'+res.msg.Message)
            }
          })
       
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消全部平仓'
        });
      });
    },
    handleClick(tab, event) {
      this.TabIndex = tab.index;
       localStorage.setItem("tabindex",tab.index)
      // 向父元素传值的自定义监听函数
      this.$emit("listenTabindex",1);
    }
  },
  components: {
    Chicang,
    Weituo,
    Chengjiao,
    ChuRuJin,
    JiaoGe
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.List {
  width: 100%;
  // #chicang{
  //   height:;
  // }
  .el-tabs,.el-tabs .el-table{
    background: #191B1F;
  }
  .chichangbottom {
    display: flex;
    margin-top: 5px;
    font-size: 14px;
    color: rgba(97, 104, 138, 1);
    height: 26px;
    .jincangxinxi {
      padding-top: 5px;
      white-space:nowrap;
      overflow: hidden;
      flex: 1;
      .spandata {
        margin-right: 20px;
      }
    }
    .pingcangcaozuo {
      white-space:nowrap;
      overflow: hidden;
      flex: 1;
      div {
        // color: rgba(65, 118, 216, 1);
        // background: rgba(65, 118, 216, 1);
        color: white;
        width: 60px;
        height: 20px;
        float: right;
        margin-right: 10px;
        text-align: center;
        border-radius: 5px;
        input {
          border: none;
          border-radius: 5px;
          width: 60px;
          height: 20px;
          background: rgba(65, 118, 216, 1);
           color: white;
          // color: rgba(65, 118, 216, 1);
          line-height: 20px;
        }
      }
      :hover {
        background: white;
        color: rgba(65, 118, 216, 1);
      }
      .change {
        border: 1px red solid
      }
    }
  }
}
</style>
