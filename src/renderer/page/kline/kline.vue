<template>
  <!-- K线主题展示页面 -->
  <div class="kline" id="kline">
    <!-- 第一条横向菜单栏 -->
    <div class="top01 flex">
      <ul class="flex">
        <li
          v-for="(item, index) in kTab"
          :key="index"
          :class="isactive === index ? 'changestyle' : '' "
          @click="dianji(index);klineFlag = item.key"
        >{{item.title}}</li>
      </ul>
      <el-dropdown class="dropdown" trigger="click" @command="handleCommand" style="height: 100%;">
        <span class="el-dropdown-link dropdownSpan">更多</span>
        <el-dropdown-menu
          slot="dropdown"
          style="background-color:rgba(30,35,41,1);border-radius:2px;border:none"
        >
          <el-dropdown-item v-for="(item, index) in MoreList" 
          :key="index" 
           :command="index"
           
            style="display:flex;padding-right:0;color: #a7a7a7;">
            <img
              src="../../assets/fenshi.png"
              v-if="item.key <1"
              style="display:inline-block;width:12px;height:12px;border:1px solid rgba(65,118,216,1);vertical-align:middle;margin: auto;"
            />
            <span class="spanL" style="display:inline-block;text-align:center;width:35px;" >{{item.key}}</span>
            <span
              class="spanR"
              style="flex:8;text-align:left;margin-left:15px;vertical-align:middle;"
            >{{item.title}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 第二条横向菜单栏 -->
    <!-- <div class="top02 flex">
      <ul>
        <li>
          <span>开 :</span>
          <span style="color: #DCDC0A;">{{this.$store.state.klineTopMsg.Open}}</span>
        </li>
        <li>
          <span>高 :</span>
          <span style="color: #FF3322;">{{this.$store.state.klineTopMsg.High}}</span>
        </li>
        <li>
          <span>低 :</span>
          <span style="color: #00BD00;">{{this.$store.state.klineTopMsg.Low}}</span>
        </li>
        <li>
          <span>收 :</span>
          <span style="color: #D5D5D5;">{{this.$store.state.klineTopMsg.YClose?this.$store.state.klineTopMsg.YClose:this.$store.state.klineTopMsg.Close}}</span>
        </li>
      </ul>
    </div> -->
    <!-- K线、买卖、相关详情展示区域，该区域主题分为左右两个板块 -->
    <div class="center flex" id="center">
      <!-- 主体区域左边部分，此区域有分为上、中、下三大板块，
      上方为K线展示，下方为买卖及合约清单-->
      <div class="centerL">
        <!-- K线展示区域 -->
        <div class="centerLT" id="centerLT" ref="centerLT">
          <!-- <CandleStick
            @listenTooltip="klineTooltip"
            @listenHeight="listenheight"
            :klineFlag="klineFlag"
            :klineSize="klineSize"
            :candleHeight="candleHeight"
          ></CandleStick> -->
          <!-- <Hello></Hello> -->
          <div v-show="isactive == 0">
            <MinuteBox :candleHeight="candleHeight" :candleWidth="candleWidth" :toChildOption="minuteOption" @function="toFatherMinute" :islogin='islogin' :isdownload='isdownload'></MinuteBox>
          </div>
          <div v-show="isactive != 0">
            <MinuteBox :candleHeight="candleHeight" :candleWidth="candleWidth" :toChildOption="klineOption" @function="toFatherKline" :islogin='islogin' :isdownload='isdownload'></MinuteBox>
          </div>
          
         
          <!-- <zbEchart :klineFlag="klineFlag" :proInfo="proInfo"></zbEchart> -->
        </div>
        <!-- 简易信息展示 -->
        <div class="centerLM" id="centerLM" v-show="islogin">
          <div class="data flex">
            <p>{{userMsg.name?userMsg.name:"未登录"}}</p>
            <p class="flex" v-show="islogin">
              <span>动态盈亏:</span>
              <span>{{changeLoginStatus?changeEquityData+'元':'暂无信息'}}</span>
            </p>
            <p class="flex"  v-show="islogin" @click="click01()">
              <span>可用资金:</span>
              <span>{{userMsg.usermoney?userMsg.usermoney:"暂无信息"}}</span>
            </p>
            <!-- <p class="flex"  v-show="islogin">
              <span>资金使用率:</span>
              <span>2.7%</span>
            </p> -->
            <p class="flex"  v-show="islogin">
              <span>自用保证金:</span>
              <span>{{topData.zybzj}}</span>
            </p>
            <p class="flex"  v-show="islogin">
              <span>冻结保证金:</span>
              <span>{{topData.djbzj}}</span>
            </p>
            <p class="flex"  v-show="islogin">
              <span>动态权益:</span>
              <span>{{topData.dtqy}}</span>
            </p>
            <p class="flex"  v-show="islogin">
              <span>平仓盈亏:</span>
              <span>{{topData.pcyk}}</span>
            </p>
            <!-- <div class="flex" v-show="showorhide1">
              <p>成交查询：</p>
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div> -->
            <div class="flex" v-show="showorhide1">
              <p>起止日期：</p>
              <el-date-picker
                v-model="value1"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2019-12-01"
              ></el-date-picker>
            </div>
            <!-- <div class="flex" v-show="showorhide2">
              <p>起止日期：</p>
              <el-date-picker
                v-model="value9"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2019-09-01"
              ></el-date-picker>
            </div> -->
          </div>
          <div class="action flex" v-show="islogin">
            
            <div class="new flex" @click="placeOrders()">
              <i class="el-icon-sort"></i>
            </div>
            <div class="download flex" @click="download()">
              <i class="el-icon-download" v-show="isdownload"></i>
              <i class="el-icon-upload2" v-show="!isdownload"></i>
            </div>
            <!-- <div class="ping flex">
              <button>
                <i class="el-icon-bottom-left"></i>
                <span @click="allClose()">全部平仓</span>
              </button>
            </div> -->
          </div>
        </div>
        <!-- 此区域为买卖及合约清单展示，主要分为左右两部分，
        左边为买卖操作窗口，右边为合约清单-->
        <transition name="el-zoom-in-bottom">
        <div class="centerLB" id="centerLB" v-if="islogin" v-show="isdownload">
          <!-- 合约买卖操作窗口 -->
          <div class="centerLBL">
            <BuyAndSell :hangqingData='hangqingData' :chicangselect="chicangselect"></BuyAndSell>
          </div>
          <!-- 合约清单展示区域 -->
          <div class="centerLBR">
            <div id="List">
              <List @listenTabindex="showBoxindex()" :listSize="listSize" :value="value1"  @listenData="listenDataFn" @selectDataFn="selectDataFn"></List>
            </div>
            <!-- <div class="listbottom">
              <span>上证指数：</span>
              <span class="spanszzs">2909.46</span>
              <span class="spanszzs">2909.46</span>
              <span class="spanszzs">2909.46</span>
            </div>-->
          </div>
          <!-- 买卖下单操作窗口(默认隐藏) -->
           <transition name="el-zoom-in-top">
          <div id="placeOrder" v-show="isplaceOrder">
            <PlaceOrder @listenTabindex="showBoxindex()" :hangqingData='hangqingData' :listSize="listSize" :value="value1"></PlaceOrder>
          </div>
         </transition>
        </div>
        </transition>
      </div>
      <!-- 主体区域的右边部分，此部分主要展示合约详情 -->
      <div class="centerR">
        <KInfo></KInfo>
      </div>
    </div>
    <div class="bottom">
      <span>上证指数：</span>
      <span class="spanszzs">2909.46</span>
      <span class="spanszzs">2909.46</span>
      <span class="spanszzs">2909.46</span>
    </div>
  </div>
</template>

<script>
import{mapGetters}from 'vuex'
import zbEchart from "../../components/zbEchart";
import BuyAndSell from "../kline/childcomponment/BuyAndSell.vue";
import List from "../kline/childcomponment/List.vue";
import KInfo from "../kline/childcomponment/KInfo.vue";
import Win from "electron-vue-windows";
import CandleStick from "../kline/childcomponment/CandleStick/CandleStick.vue";
// import Hello from "../kline/childcomponment/HelloWorld.vue";
import MinuteBox from "../kline/childcomponment/timeSLine.vue";
import PlaceOrder from "../kline/childcomponment/placeOrder";
export default {
  name: "kline",
  inject:['reload'],
  data() {
    return {
      viewSize: "",
      klineSize: "",
      candleHeight: 0,
      candleWidth:0,
      isplaceOrder:false,//另一种下单界面
      pingcang:null,
      islogin:false,
      userMsg:{
        name:false,
        usermoney:false
      },
      isdownload:true,
      hangqingData:[],
      showorhide1: false,
      topData:{},
      chicangselect:{},
      height: "300px",
      tabindex: 0,
      isactive: 0,
      value1: "",
      value9: "",
      listSize: "",
      klineFlag: "2",
     
      // klineFlag: 2,
      proInfo: {
        code: "HSI1906"
      },
      kTab: [
        {
          title: "分时",
          key: "",
          url: require("../../assets/fenshi.png")
        },
        {
          title: "1分",
          key: "1"
        },
        {
          title: "5分",
          key: "5"
        },
        {
          title: "15分",
          key: "15"
        },
        {
          title: "30分",
          key: "30"
        },
        {
          title: "60分",
          key: "60"
        },
       
      ],
      MoreList: [
        // {
        //   title: "分时",
        //   key: ""
        // },
        // {
        //   title: "一分钟",
        //   key: "1"
        // },
        // {
        //   title: "三分钟",
        //   key: "3"
        // },
        // {
        //   title: "五分钟",
        //   key: "5"
        // },
        // {
        //   title: "十分钟",
        //   key: "10"
        // },
        // {
        //   title: "十五分钟",
        //   key: "15"
        // },
        // {
        //   title: "三十分钟",
        //   key: "30"
        // },
        // {
        //   title: "小时周数",
        //   key: "时"
        // },
        {
          title: "日线",
          key: "日"
        },
        {
          title: "周线",
          key: "周"
        },
        {
          title: "月线",
          key: "月"
        },
        {
          title: "季线",
          key: "季"
        },
        {
          title: "年线",
          key: "年"
        },
        {
          title: "MA",
          key: "MA"
        },
        {
          title: "BOLL",
          key: "BOLL"
        },
        // {
        //   title: "秒周线",
        //   key: "秒"
        // }
      ],
      minuteOption:{
       
        // Type:'分钟走势图',   //创建图形类型
    
        // Windows: //窗口指标
        // [
            
        // ], 
            
        // IsAutoUpdate:true,       //是自动更新数据
        // DayCount:1,                 //1 最新交易日数据 >1 多日走势图
        // IsShowCorssCursorInfo:true, //是否显示十字光标的刻度信息
        // IsShowRightMenu:true,       //是否显示右键菜单
        // CorssCursorTouchEnd:true,

        // MinuteLine:
        // {
        //     //IsDrawAreaPrice:false,      //是否画价格面积图
        // },

        // Border: //边框
        // {
        //     Left:1,    //左边间距
        //     Right:1,   //右边间距
        //     Top:0,
        //     Bottom:20
        // },
            
        // Frame:  //子框架设置
        // [
        //     {SplitCount:3,StringFormat:0},
        //     {SplitCount:2,StringFormat:0},
        //     {SplitCount:3,StringFormat:0},
        // ],

        // ExtendChart:    //扩展图形
        // [
        //     //{Name:'MinuteTooltip' }  //手机端tooltip
        // ],
         Type: '分钟走势图', //历史分钟走势图
          Symbol: '000001.sz',
          IsAutoUpate: true, //是自动更新数据
          Windows:
              [
                //   { Index: "BOLL" }
              ],
          DayCount: 1,

          IsShowRightMenu: false, //右键菜单
          IsShowCorssCursorInfo: true, //是否显示十字光标的刻度信息

          Border: //边框
          {
              Left: 0, //左边间距
              Right: 0, //右边间距
              Top:20,
              Bottom: 0
          },

          KLineTitle: //标题设置
          {
              IsShowName: false, //不显示股票名称
              IsShowSettingInfo: false, //不显示周期/复权
          },

          Frame: //子框架设置,刻度小数位数设置
              [
                  { SplitCount: 5, StringFormat: 0 },
                  { SplitCount: 3, StringFormat: 0 },
                  { SplitCount: 3, StringFormat: 0 }
              ]       
      },
      klineOption:{
        Type: '历史K线图', 
                
        Windows: //窗口指标
        [
            
            {Index:"MA",
            Modify: false, 
            Change: false,
            // Args:[ 
            //   { Name:'M5', Value:5}, { Name:'M10', Value:10 }
            // ]
            }, 
            // {Index:"BOLL",Modify: false, Change: false},
            {Index:"VOL",Modify: false, Change: false}
        ],
        IsAutoUpdate:true, //自动更新数据
        // AutoUpdateFrequency:10000,
            DayCount:1,       //1最新交易数据，1<多日走势图
        IsShowCorssCursorInfo:true,

        Border: //边框
        {
            Left:   1,
            Right:  1, //右边间距
            Top:    20,
            Bottom: 25,
        },

         KLine: 
        {
            DragMode: 1, //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
            Right: 1, //复权 0 不复权 1 前复权 2 后复权
            Period: 0, //周期 0 日线 1 周线 2 月线 3 年线 4 1分钟 5 5分钟 6 15分钟 7 30分钟 8 60分钟 9 季线 10 分笔线 11 2小时 12 4小时
            MaxReqeustDataCount: 1000, //日线数据最近1000天
            MaxRequestMinuteDayCount: 2,    //分钟数据最近15天
            PageSize: 50, //一屏显示多少数据 
            IsShowTooltip: true //是否显示K线提示信息
        },
        
      }
    };
  },
 
  mounted: function() {
    this.reboxSize();
    this.klineTooltipData = this.$store.state.klineTopMsg
    
    //窗口大小变化时获取屏幕高度
    window.onresize = () => {
      return (() => {
        this.klineSize == "2" ? (this.klineSize = "1") : (this.klineSize = "2");
        // console.log(this.viewSize);
        this.klineSize == "2" ? (this.klineSize = "1") : (this.klineSize = "2");
        var Hight = document.documentElement.clientHeight;
        document.getElementById("kline").style.height = Hight - 60 + "px";
        document.getElementById("center").style.height = Hight - 118 + "px";
        if(this.islogin){
          if(this.isdownload){
            if (this.viewSize == "max") {
              document.getElementById("centerLT").style.height = Hight - 118 + "px";
              this.candleHeight = Hight - 118;
              document.getElementById("centerLM").style.height = "0px";
              document.getElementById("centerLB").style.height = "0px";
            } else if (this.viewSize == "min") {
              document.getElementById("centerLB").style.height =
                (Hight - 115) / 2 - 104 + "px";
              document.getElementById("centerLM").style.height = "30px";
              document.getElementById("centerLT").style.height = //K线展示区域的高度
                (Hight - 115) / 2 + 70  + "px";
              this.candleHeight = (Hight - 115) / 2; //将高度传给K线组件
              document.getElementById("List").style.height =
                (Hight - 115) / 2 - 104 + "px";
              this.listSize = document.getElementById("List").clientHeight;
            } else {
              document.getElementById("centerLT").style.height =
                (Hight - 115) / 2 + 70 + "px";
              this.candleHeight = (Hight - 115) / 2; //将高度传给K线组件
              document.getElementById("centerLB").style.height =
                (Hight - 115) / 2 - 104 + "px";
              document.getElementById("List").style.height =
                (Hight - 115) / 2 - 104 + "px";
              this.listSize = document.getElementById("List").clientHeight;
            }
          }else{
            if (this.viewSize == "max") {
               document.getElementById("centerLT").style.height = Hight - 148 + "px";
               this.candleHeight = Hight - 148;
            }else if(this.viewSize == "min"){
              document.getElementById("centerLT").style.height = //K线展示区域的高度
                Hight - 145 + "px";
                this.candleHeight = Hight - 145; //将高度传给K线组件
                 this.listSize = document.getElementById("List").clientHeight;
            }else{
               document.getElementById("centerLT").style.height =
                Hight - 145 + "px";
                 this.candleHeight = Hight - 145; //将高度传给K线组件
                 this.listSize = document.getElementById("List").clientHeight;
            }
          }
          
        }else{
          document.getElementById("centerLT").style.height =
              (Hight - 115) + "px";
        }
        this.candleWidth = window.innerWidth
        
      })();
    };
    // 页面加载时 调用获取屏幕高度的函数
    this.$nextTick(function() {
      this.reboxSize();
    });
  },
  created(){
    let _this = this
    // localStorage.setItem('placeOrderIndex',"0")
    //判断是否登录
    if(JSON.parse(localStorage.getItem(this.$store.state.localStorageLogin))){
      this.hangqingData = JSON.parse(localStorage.getItem(this.$store.state.localStorageHq))[0].item
      

      this.islogin = true
      var msg = JSON.stringify({
        userID: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId
      });
      	this.$post('get_user_asset', msg).then(function(res) {
          // console.log(res)
          _this.userMsg.usermoney = res.msg.user_money
          _this.userMsg.name = res.msg.user_name
        })
    }else{
      this.userMsg.usermoney = false
      this.userMsg.name = false
      this.islogin = false
    }
    if(localStorage.getItem('placeOrderIndex') == '1'){
      this.isplaceOrder = true
    }
  },
  methods: {
    placeOrders(){
      this.isplaceOrder = !this.isplaceOrder
      if(this.isplaceOrder){
        localStorage.setItem('placeOrderIndex',"1")
      }else{
        localStorage.setItem('placeOrderIndex',"2")
      }
      
    },
    // 持仓列表组件传递出来的单中某行的数据
    selectDataFn(val){
      this.chicangselect = val
    },
    //k线界面交易信息隐藏显示
    download(){
      var Hight = document.documentElement.clientHeight; //获取视图的高度
      this.isdownload = !this.isdownload
      if(this.isdownload){
        document.getElementById("centerLT").style.height = //K线展示区域的高度
            (Hight - 115) / 2+ 70 + "px";
        document.getElementById("centerLB").style.height =
          (Hight - 115) / 2 - 104 + "px";
      }else{
        document.getElementById("centerLT").style.height = //K线展示区域的高度
            Hight - 145 + "px";
      }
    },
    handleCommand(command){
      console.log(this.isactive)
      console.log(command)
      this.isactive = 7
      switch (command) {
          case 0:
            this.klineOption.KLine.Period = 0
            console.log("日线")
            break;
          case 1:
            this.klineOption.KLine.Period = 1
            console.log("周线")
            break;
          case 2:
            this.klineOption.KLine.Period = 2 
            console.log("月线")
            break;
          case 3:
            this.klineOption.KLine.Period = 9
            console.log("季线")
            break;
          case 4:
            this.klineOption.KLine.Period = 3
            console.log("年线")
            break;
          case 5:
            this.$set(this.klineOption.Windows[0],'Index','MA')
            break;
          case 6:
            this.$set(this.klineOption.Windows[0],'Index','BOLL')
            break;

          default:
            
            break;
        }
    },
    //监听子组件传递过来的数据展示到信息栏
    listenDataFn(val){
      this.topData = val
      console.log(val)
    },
    // 此函数获取窗口大小，并动态修改相关板块的高度
    reboxSize() {
      var Hight = document.documentElement.clientHeight; //获取视图的高度
      if(this.islogin){
        document.getElementById("kline").style.height = Hight - 60 + "px"; //K线页面展示的高度
        document.getElementById("center").style.height = Hight - 118 + "px"; //减去两个固定高度的导航栏
        // if(this.isdownload){
          document.getElementById("centerLT").style.height = //K线展示区域的高度
            (Hight - 115) / 2 + 70 + "px";
          document.getElementById("centerLM").style.height = "30px";
          this.candleHeight = (Hight - 115) / 2; //将高度传给K线组件
          document.getElementById("centerLB").style.height = (Hight - 115) / 2 - 104 + "px";
            // (Hight - 115) / 2 - 104 + "px";
          document.getElementById("List").style.height =
            (Hight - 115) / 2 - 104 + "px";
          this.listSize = document.getElementById("List").clientHeight;
        // }else{

        // }
       
        
      }else{
        document.getElementById("kline").style.height = Hight - 60 + "px"; //K线页面展示的高度
        document.getElementById("center").style.height = Hight - 118 + "px"; //减去两个固定高度的导航栏
        document.getElementById("centerLT").style.height = //K线展示区域的高度
          (Hight - 115) + "px";
       
        this.candleHeight = (Hight - 115) / 2; //将高度传给K线组件
        
        
        this.listSize = document.getElementById("List").clientHeight;
      }
      
      
     
    },
    // 此函数用于控制时间选择器的隐藏或显示
    showBoxindex(data) {
      if (localStorage.getItem("tabindex") == 2) {
        // this.showorhide2 = false;
        this.showorhide1 = true;
      } else if (localStorage.getItem("tabindex") == 3 || localStorage.getItem("tabindex") == 4) {
        // this.showorhide2 = true;
        this.showorhide1 = true;
      } else {
        // this.showorhide2 = false;
        this.showorhide1 = false;
      }
    },
    // 接收K线组件传递过来的值
    // klineTooltip(data) {
    //   this.klineTooltipData = data;
    // },
    // 监听K线组件传递过来的值，改变K线下方元素的高度
    listenheight(data) {
      this.viewSize = data;
      var Hight = document.documentElement.clientHeight;
      if (data == "max") {
        document.getElementById("center").style.height = Hight - 145 + "px"; //减去两个固定高度的导航栏
        document.getElementById("centerLT").style.height = Hight - 145 + "px";
        this.candleHeight = Hight - 145;
        document.getElementById("centerLM").style.height = "0px";
        document.getElementById("centerLB").style.height = "0px";
      } else {
        document.getElementById("centerLB").style.height =
          (Hight - 115) / 2 - 61 + "px";
        document.getElementById("List").style.height =
          (Hight - 115) / 2 - 61 + "px";
        this.listSize = document.getElementById("List").clientHeight;
        document.getElementById("centerLM").style.height = "30px";
        document.getElementById("centerLT").style.height = //K线展示区域的高度
          (Hight - 115) / 2 + "px";
        this.candleHeight = (Hight - 115) / 2; //将高度传给K线组件
      }
    },
   
    // 点击选中时背景发生改变
    dianji(index) {
      this.isactive = index;
      this.kTab[index].key
      if(index != 0 && this.kTab[index].key){
        //点击选中时改变K线周期参数，然后再K线组件里调用改变K线周期函数
        switch (this.kTab[index].key) {
          case '1':
            this.klineOption.KLine.Period = 4
            break;
          case '5':
            this.klineOption.KLine.Period = 5
            break;
          case '15':
            this.klineOption.KLine.Period = 6 //自定义分钟数10分钟
            break;
          case '30':
            this.klineOption.KLine.Period = 7
            break;
          case '60':
            this.klineOption.KLine.Period = 8
            break;
        
          default:
            this.klineOption.KLine.Period = 0
            break;
        }
        // console.log(this.klineOption)
      }
      // console.log(this.klineTooltipData)
    },
    showDatePicker() {
      return false;
    },
    // async showBox() {
    //   let data = await this.$Win.openWin({
    //     // browserwindow原生属性
    //     width: 1400, // 窗口宽
    //     height: 516, // 窗口高

    //     // electron-vue-windows自定义的属性
    //     windowConfig: {
    //       router: "/moni", // 路由 *必填
    //       data: {
    //         id: 1
    //       }, // 传送数据
    //       name: "yidemoni", // 窗口名称
    //       animation: "fromLeft"
    //     }
    //   });
    // },
    //父组件中接受来自子组件的信息

    toFatherMinute(e){
     
    },
    toFatherKline(e){
     
    }
  },
  computed:{
   changeLoginStatus(){
     return this.$store.state.account.loginStatus
   },
   changeEquityData:function(){
     return this.$store.state.equityData
   },
   changeIsplaceOrder(){
     return this.$store.state.isplaceOrder
   },
   updataSocketData() {
      return this.$store.getters.updataSocketData;
    },
    changeDataAC(){
      return this.$store.getters.quoteDataAC
    }
  },
  watch:{
    changeLoginStatus:function(val){
      if(val == true){
        // console.log(JSON.parse(localStorage.getItem('ycxUserInfo_QXJF'))) 
        let msg =  JSON.parse(localStorage.getItem(this.$store.state.localStorageUid))
        this.userMsg = msg
        this.islogin = true
        // this.reboxSize();
        this.reload()
      }else{
        this.userMsg.usermoney = false
        this.userMsg.name = false
        this.islogin = false
        this.reboxSize();
      }
    },
    changeDataAC:function(val){
      let data = this.hangqingData
      for(let i=0;i<data.length;i++){
        if(val.code ==data[i].code){
          data.splice(i,1,val)
        }
      }
      
        // else{
      //   for(let i=0;i<this.hangqingData.length;i++){
      //     console.log(this.hangqingData)
      //     if(val.code ==this.hangqingData[i].code){
      //       this.hangqingData.splice(i,1,val)
      //     }else{
      //       this.hangqingData.push(val)
      //     }
      //   }
        
      // }
      
      
      
    },
    changeIsplaceOrder:function(val){
      if(val){
        this.isplaceOrder = true
      }else{
        this.isplaceOrder = false
      }
    },
     updataSocketData:function(val){
      this.reload()
    }
   
  },
  components: {
    BuyAndSell,
    List,
    KInfo,
    CandleStick,
    zbEchart,
    // Hello,
    MinuteBox,
    PlaceOrder,
  }
};
</script>

<style lang="scss" scoped>
.showcontent{
  display: none;
}
.kline {
  width: 100%;
  background: rgba(30, 35, 41, 1);
  display: flex;
  flex-direction: column;
  .flex {
    display: flex;
  }
  //第一级导航栏样式
  .top01 {
    width: 100%;
    height: 28px;
    white-space: nowrap;
    overflow: hidden;
    background: #1E2329;
    // background: rgba(42, 45, 50, 1);
    // background: rgba(30, 35, 41, 1);
    ul {
      list-style: none;
      padding-left: 0px;
      display: inline;
      margin: 0px;
      li {
        font-size: 14px;
        float: left;
        padding: 4px 20px;
        background: #1E2329;
        // border-right: black 1px solid;
        color: #a7a7a7;
        line-height: 20px;
        height: 20px;
      }
      :hover {
        background: rgba(177, 174, 174, 0.603);
      }
      .changestyle {
        background: rgba(82, 90, 101, 1);
      }
    }
    .dropdown {
      cursor: pointer;
      background: #1E2329;
      padding: 0 20px;
      border-right: 1px solid #2a2d32;
      height: 100%;
      display: block;
      line-height: 28px;
      color: #a7a7a7;
      span:first-child {
        text-align: right;
        flex: 3;
        //color: #4176D8;
      }
      .el-dropdown-menu {
        .el-dropdown-item {
          .spanR {
            color: #4176d8 !important;
          }
        }
      }
      span:last-child {
        text-align: left;
        flex: 7;
      }
    }
    .dropdown:hover {
      background: rgba(177, 174, 174, 0.603);
    }
  }
  //第二级导航栏样式
  .top02 {
    width: 100%;
    height: 27px;
    white-space: nowrap;
    overflow: hidden;
    background: #22272E;
    ul {
      list-style: none;
      margin: 0px;
      li {
        float: left;
        margin: 0px;
        padding: 5px 25px;
        font-size: 14px;
        span:first-child {
          color: #d6d6d6;
        }
      }
    }
  }
  //K线、买卖、相关详情展示区域，该区域主题分为左右两个板块
  .center {
    width: 100%;
    background: rgba(25, 27, 31, 1);
    // background: palevioletred;
    //左边区域
    .centerL {
      width: 84%;
      .centerLT {
        width: 100%;
        // background: rgba(34, 39, 46, 1);
        .show{
          display: block;
        }
      }
      .centerLM {
        width: 100%;
        height: 30px;
        white-space: nowrap;
        overflow: hidden;
        color: #a7a7a7;
        background: rgba(34, 39, 46, 1);
        border: black 1px solid;
        border-bottom: none;
        position: relative;
        .data {
          width: auto;
          float: left;
          p {
            height: 28px;
            margin: 1px 5px 1px 20px;
            line-height: 28px;
            font-size: 14px;
          }
          div {
            float: right;
            span:first-child {
              display: flex;
            }
          }
        }
        .action {
          width: auto;
          float: right;
          height: 30px;
          position: absolute;
          background: #22272e;
          border-left: black 1px solid;
          right: 0;
          div {
            display: inline;
          }
          div:first-child {
            margin: 5px 5px;
            :first-child {
              border: #a7a7a7 solid 1px;
              border-radius: 50%;
            }
          }
          div:last-child {
            margin: 5px 5px;
            :last-child {
              border: #a7a7a7 solid 1px;
              border-radius: 50%;
            }
          }
          button {
            cursor: pointer;
            outline: none;
            height: 30px;
            color: #d6d6d6;
            background: rgba(34, 39, 46, 1);
            border: 1px solid rgba(34, 39, 46, 1);
          }
          button:hover {
            background: rgba(82, 90, 101, 1);
          }
        }
      }
      .centerLB {
        position: relative;
        overflow: hidden;
        width: 100%;
        display: flex;
        #placeOrder{
          width: 100%;
          height: 100%;
          background: #2e71b4;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 3;

        }
        .centerLBL {
          background: #191B1F;
          width: 30%;
          border-bottom: #2a2d32 1px solid;
          border-top: black 1px solid;
          overflow-y: scroll;
        }
        .centerLBL::-webkit-scrollbar {
          display: none;
        }
        .centerLBR {
          width: 70%;
          background: #191B1F;
          #List {
            overflow-y: scroll;
          }
          .listbottom {
            font-size: 14px;
            height: 16px;
            background: rgba(34, 39, 46, 1);
            color: #a7a7a7;
            .spanszzs {
              color: green;
              margin: 10px;
            }
          }
        }
        #List::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .centerR {
      width: 16%;
    }
  }
  .bottom {
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    height: 28px;
    background: rgba(34, 39, 46, 1);
    border: black 1px solid;
    color: #a7a7a7;
    span {
      line-height: 28px;
    }
    .spanszzs {
      color: green;
      margin: 10px;
    }
  }
}
</style>

