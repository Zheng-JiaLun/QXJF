<template>
  <div class="moni">
    <!-- 横向信息展示区域 -->
    <div class="top" :style="isbuy?'background: #22272e;':''">
      <ul class="flex firstul">
        <li>{{userMsg.name}}</li>
        <li>
          <span>动态盈亏:</span>
          <span>{{this.$store.state.equityData}}</span>
        </li>
        <li>
          <span>可用资金:</span>
          <span>{{userMsg.usermoney}}</span>
        </li>
        <li>
          <span>动态权益:</span>
          <span>{{topMsg.dtqy}}</span>
        </li>
        <li>
          <span>冻结保证金:</span>
          <span>{{topMsg.djbzj}}</span>
        </li>
        <li>
          <span>自用保证金:</span>
          <span>{{topMsg.zybzj}}</span>
        </li>
        <li>
          <span>平仓盈亏:</span>
          <span>{{topMsg.pcyk}}</span>
        </li>
      </ul>
      <div class="flex start-time" v-show="showorhide1">
        <p>起止日期：</p>
        <el-date-picker
          v-model="value1"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          default-value="2019-12-01"
        ></el-date-picker>
      </div>
      <!-- <div></div> -->
      <ul class="flex secondul">
        <li>
          <p class="min" @click="close()">
            <i class="el-icon-arrow-down" style="font-size: 18px;"></i>
          </p>
        </li>
        <li>
          <p class="change" @click="changeClose()">
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
          <div class="input">
            <ul class="ul01 flex">
              <li>
                <p>
                  <i v-show="islock" @click="islockBtn()" class="el-icon-lock"></i>
                  <i v-show="!islock" @click="islockBtn()" class="el-icon-unlock"></i>
                </p>
                <!-- <input type="text" placeholder="合约代码"  v-model="inputVal"/> -->
                <el-cascader :options="options" :show-all-levels="false" v-model="inputVal"></el-cascader>
                <!-- <i class="el-icon-search"></i> -->
              </li>
              <li>
                <p>手数</p>
                <input type="number" placeholder="数量" v-model="inputNum"/>
              </li>
              <li>
                <p class="priceMode" @click="priceModeBtn">{{priceMode}}<i class="el-icon-d-caret"></i></p>
                <input type="number" placeholder="市价/限价"  v-model="codePrice" />
              </li>
            </ul>
            <ul class="ul02" style="line-height: 20px;">
              <li>
               <span>{{updown.limitUp}}</span>
                <span style="color: #FF3322;">涨板</span>
              </li>

              <li>
                <span>{{updown.limitDown}}</span>
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
        <!-- <p class="p">美原油，每手5吨,保证金18371元，纽约交易所，内盘</p>
        <div class="list" style="color: #999999;">
          <ul class="ul04">
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
            <li>14:20:00(本机时间)：委托 开仓 2899 卖出</li>
          </ul>
        </div> -->
      </div>
      <!-- 展示板块的右边部分，主要展示合约列表 -->
      <div class="right">
        <el-tabs v-model="activeName"
        @tab-click="handleClick"
         type="card" >
          <!-- 引入持仓组件 -->
          <el-tab-pane label="持仓" name="chicang" id="chicang">
            <ChiCang  :selector="selector" :clearSelection='clearSelection' @childFn="parentFn" @selectFn="selectFn"></ChiCang>
            <div class="determineBtn" v-show="selector">
              <button @click="determineBtn()">{{selectorText}}</button>
            </div>
          </el-tab-pane>
          <!-- 引入委托组件 -->
          <el-tab-pane label="委托" name="weituo" id="weituo">
            <WeiTuo></WeiTuo>
          </el-tab-pane>
          <!-- 引入成交组件 -->
          <el-tab-pane label="成交" name="chengjiao" id="chengjiao">
            <ChengJiao :value="value1"></ChengJiao>
          </el-tab-pane>
           <el-tab-pane label="出入金" name="churujin" class="pane" id="churujin">
            <ChuRuJin :value="value1"></ChuRuJin>
          </el-tab-pane>
          <el-tab-pane label="交割查询" name="jiaoge" class="pane" id="jiaoge">
            <JiaoGe :value="value1"></JiaoGe>
          </el-tab-pane>
          <!-- 引入预备单组件 -->
          <!-- <el-tab-pane label="预备单" name="yu">
            <MoNiYuBeiDan></MoNiYuBeiDan>
          </el-tab-pane> -->
          <!-- 引入条件单组件 -->
          <!-- <el-tab-pane label="条件单" name="tiao">
            <MoNiTiaoJianDan></MoNiTiaoJianDan>
          </el-tab-pane> -->
          <!-- 引入损盈单组件 -->
          <!-- <el-tab-pane label="损盈单" name="ying">
            <MoNiSunYingDan></MoNiSunYingDan>
          </el-tab-pane> -->
          <!-- 引入资金组件 -->
          <!-- <el-tab-pane label="资金" name="money">
            <MoNiZiJin></MoNiZiJin>
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
    <!--左边为买卖操作窗口，右边为合约清单-->
     <!-- <transition name="el-zoom-in-top"> -->
    <div class="centerLB" id="centerLB" v-show="isbuy">
      <!-- 合约买卖操作窗口 -->
      <div class="centerLBL">
        <BuyAndSell  :hangqingData='hangqingData' :childMsg='childMsg' :inputVal="inputVal" :chicangselect="chicangselect"></BuyAndSell>
      </div>
      <!-- 合约清单展示区域 -->
      <div class="centerLBR">
        <div id="List">
          <List @listenTabindex="showBoxindex()" :listSize="listSize" :value="value1" @listenData="listenDataFn" @selectDataFn='selectDataFn'></List>
        </div>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'  //导入ipcRenderer

import ChiCang from '../common/ChiCangXinXi';
import ChengJiao from '../common/ChengJiaoChaXun';
import ChuRuJin from '../common/ChuRuJinChaXun';
import JiaoGe from '../common/JiaoGeChaXun';
// import MoNiWeiTuo from '../common/monichildren/moniweituo.vue';
import WeiTuo from '../common/WeiTuoXinXi';
import MoNiYuBeiDan from '../common/monichildren/moniyubeidan.vue';
import MoNiZiJin from '../common/monichildren/monizijin.vue';
import BuyAndSell from '../../page/kline/childcomponment/BuyAndSell';
import List from '../../page/kline/childcomponment/List';
export default {
  name: "moni",
  inject:['reload'],
  data() {
    return {
      activeName :"chicang",
      text:"父组件传入的值",
      TabIndex: "",
      islock:false,
      // pinChang:false,
      inputVal:'',
      codePrice:'',
      inputNum:'1',
      stopLoss:'0',
      stopPrint:'0',
      ischichang:true,
      priceMode:"市价",
      selector:false,
      clearSelection:0,
      showorhide1: false,
      value1: "",
      listSize:"500px",
      isbuy:false,
      codePrice:'',
      selectorText:'确定反手',
      selectorArr:[],
      hangqingData:[],
      chicangselect:{},
      topMsg:{},
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
       options: [
          
      ],
      childMsg:{},
      updown:{
        limitDown:'0',
        limitUp:'0'
      },
      userMsg:{
        usermoney:'',
        name:''
      }
    };
  },
  methods: {
    //确定反手/平仓
    determineBtn(){
      let _this = this,arr = [];
      for(let i=0;i<this.selectorArr.length;i++){
         arr.push(this.selectorArr[i].serialnum)
      }
      if(this.selectorText == '确定反手'){

      }else{
        var msg = JSON.stringify({
          userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
          serialNum:arr.toString()
        })
        // console.log(msg)
        _this.$post('select_close',msg).then(function(res){
          // console.log(res)
          if(res.result == 1){
            //  _this.$store.state.market.initChicang++
            _this.$message({
              type: 'success',
              message: '平仓成功!'
            });
          }else{
              _this.$message({
              type: 'info',
              message: '错误:'+res.msg.Message
            });
            
          }
        })
      }
    },
    selectDataFn(val){
      console.log(val)
      this.chicangselect = val
    },
    // 持仓组件反出来的多选选中数组
    selectFn(val){
      this.selectorArr = val
      console.log(val)
    },
    close() {
      localStorage.removeItem('isbuy')
      // let win = this.$Win.getWinByName("yidemoni");
      // this.$Win.closeWin(win);
      ipcRenderer.send('closeXiadan')
    },
    changeClose(){
      this.isbuy = !this.isbuy
      localStorage.setItem('isbuy',this.isbuy)
    },
     //监听子组件传递过来的数据展示到信息栏
    listenDataFn(val){
      this.topMsg = val
      console.log(val)
    },
    handleClick(tab, event) {
      this.TabIndex = tab.index;
      localStorage.setItem("tabindex",tab.index)

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
    parentFn(val){
      this.childMsg = val
    },
    islockBtn(){
      this.islock = !this.islock
      if(this.islock == false){
        localStorage.setItem('islock',JSON.stringify({
          islock:false,
          val:this.inputVal
        }))
      }else{
        localStorage.setItem('islock',JSON.stringify({
          islock:true,
          val:this.inputVal
        }))
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
   
    //市价/限价切换按钮
    priceModeBtn(){
      if(this.priceMode == '市价'){
        this.priceMode = '限价'
      }else{
        this.priceMode = '市价'
      }
    },
     buy(e){
      let _this = this
      localStorage.setItem('buycode',_this.inputVal[1])//用户(买卖)操作的合约存一个,继续展示到页面上
      if(e == 1){
        //买
        // console.log(this.inputVal)
        if(this.inputVal == ''){
           this.$message.error('请输入正确合约参数');
        }else{
          this.$confirm(this.inputVal[1]+' , '+'买入 , '+_this.inputNum+'手'+' , '+this.priceMode+' , '+'确定买入?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(_this.inputNum == ''||_this.codePrice == ''||_this.inputVal == ''){
              this.$message({
                type: 'warning',
                message: '请输入正确参数'
              });  
              return ""
            }
              var msg = JSON.stringify({
                userID: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
                tradeNum: _this.inputNum,
                tradePrice: _this.codePrice,
                futuresCode: _this.inputVal[1],
                updown:1,
                priceType:this.priceMode == '市价'?1:2,
                stopLoss: Number(_this.stopLoss),
                stopProfit: Number(_this.stopPrint)
              })
              _this.$pro.post('buy_sale_order', msg).then((res) => {
                // console.log(res)
                if (res.result == 1) {
                  // _this.$store.state.market.initChicang++
                  _this.$message({
                    type: 'success',
                    message:'买入成功'
                  });
                }else{
                  this.$message.error(res.message);
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消买入'
            });          
          });
        }
        
      }else{
        //卖
        if(this.inputVal == ''){
          this.$message.error('请输入正确合约参数');
        }else{
          this.$confirm(this.inputVal[1]+' , '+'卖出 , '+_this.inputNum+'手'+' , '+this.priceMode+' , '+'确定卖出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(_this.inputNum == ''||_this.codePrice == ''||_this.inputVal == ''){
                this.$message({
                  type: 'warning',
                  message: '请输入正确参数'
                });  
                return ""
              }
              var msg = JSON.stringify({
                userID: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
                tradeNum: _this.inputNum,
                tradePrice: _this.codePrice,
                futuresCode: _this.inputVal[1],
                updown: 2,
                priceType: this.priceMode == '市价'?1:2,
                stopLoss: Number(_this.stopLoss),
                stopProfit: Number(_this.stopPrint)
              })
              _this.$pro.post('buy_sale_order', msg).then((res) => {
                // _this.guadanState1 = false;
                console.log(res)
                if (res.result == 1) {
                  // _this.active = 0;
                  // console.log(res)
                  // _this.$store.state.market.initChicang++
                  _this.$message({
                    type: 'success',
                    message:'卖出成功'
                  });
                }else{
                  this.$message.error(res.message);
                  // alert(res.message)
                }
              })
          
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消卖出'
            });          
          });
        }
       
      }
    },
    quickFS(){
      // ipcRenderer.send('hangqingsend','11111111111122222')
      this.clearSelection++
      if(this.selectorText == '确定反手'){
        this.selector = !this.selector;
      }else{
        this.selectorText = '确定反手'
        this.selector = true;
      }
      
      
    },
    //先开先平
    ping(){
      let _this = this
      this.$confirm(
        this.topMsg.data[0].futures_name+' , '+(this.topMsg.data[0].updown == '1'?'买':'卖')+this.topMsg.data[0].futures_num+' , 持仓价格:'+this.topMsg.data[0].futures_price+' , 是否平仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let msg = JSON.stringify({
          userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
          tradeNum: this.topMsg.data[0].futures_num,
          tradePrice: this.topMsg.data[0].futures_price,
          futuresCode: this.topMsg.data[0].futures_code,
          updown: this.topMsg.data[0].updown,
          priceType: this.topMsg.data[0].orderTradeType,
          serialNum: this.topMsg.data[0].serialnum,
          stopLoss: this.topMsg.data[0].stoploss,
          stopProfit:this.topMsg.data[0].stopprofit
        })
        this.$pro.post('close_position', msg).then((res) => {
          // console.log(res)
          if(res.result == 1){
            // this.axiosChiCang()
              _this.$message({
              type: 'success',
              message: '成功'
            });
          }
          
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    quickPC(){
      let _this = this
      console.log(this.childMsg)
      
      let msgs = JSON.stringify({
          userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
          tradeNum: _this.childMsg.futures_num,
          tradePrice: _this.childMsg.futures_price,
          futuresCode: _this.childMsg.futures_code,
          updown: _this.childMsg.updown,
          priceType: _this.childMsg.orderTradeType,
          serialNum: _this.childMsg.serialnum,
          stopLoss: _this.childMsg.stoploss,
          stopProfit:_this.childMsg.stopprofit
      })
      this.$pro.post('close_position', msgs).then((res) => {
        console.log(res)
        if(res.result == 1){
          // this.axiosChiCang()
            _this.$message({
            type: 'success',
            message: '成功'
          });
        }else{
          
          _this.$message.error('失败:'+res.message);
        }
        
      })
      // this.reload()
    },
    onePC(){
      this.clearSelection++
      if(this.selectorText == '确定平仓'){
         this.selector = !this.selector;
      }else{
        this.selectorText = '确定平仓'
        this.selector = true;
      }
      
    },
    allPC(){
      let _this = this
      // console.log(this.$store.state.serialnum)
      this.$confirm('确定全部平仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // center: true
      }).then(() => {
        var msg = JSON.stringify({
            userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
            serialNum:this.$store.state.serialnum.toString()
          })
         console.log(msg)
          _this.$post('select_close',msg).then(function(res){
            console.log(res)
            if(res.result == 1){
              //  _this.$store.state.market.initChicang++
              _this.$message({
                type: 'success',
                message: '全部平仓成功!'
              });
            }else{
               _this.$message({
                type: 'info',
                message: '错误:'+res.msg.Message
              });
              
            }
          })
       
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消全部平仓'
        });
      });
    },
    // 行情数据存储进options
    hqOptions(){
      let hq = JSON.parse(localStorage.getItem(this.$store.state.localStorageHq)).map(function(item){
        return{
          "value":item.name,
          "label":item.name,
          "children":item.item.map(function(e){
            return{
              "value":e.code,
              "label":e.name+" "+e.code,
            }
          }),
          
        }
      })
      this.options = hq
        
    },
    postUserMsg(){
      let _this = this
      var msg = JSON.stringify({
      userID: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId
      });
      this.$post('get_user_asset', msg).then(function(res) {
        // console.log(res)
        _this.userMsg.usermoney = res.msg.user_money
        _this.userMsg.name = res.msg.user_name
      })
    }
  },
  created(){
    let _this = this
    // ipcRenderer.on('neiwai',function(event,arg){
      // console.log(arg)
      // if(arg == '外盘'){
      //   _this.isbuy = true
      // }else{
      //   _this.isbuy = false
      // }
    // })

    // 下单页面接收主进程发送过来的数据
    ipcRenderer.on('code',(event,arg) => {
      // console.log(arg)
      if(!_this.islock){//非锁定状态就把数据传递给合约代码
        _this.inputVal = ['自选',arg]
      }
    })

    ipcRenderer.on('neiwai',(event,arg) => {
      arg == '外盘'? _this.isbuy = true:_this.isbuy = false
     
    })
    this.hqOptions()
    this.postUserMsg()
    this.hangqingData = JSON.parse(localStorage.getItem(this.$store.state.localStorageHq))[0].item
    
    let isLock = JSON.parse(localStorage.getItem('islock'))
    if(isLock.islock){ //判断是否是锁定合约代码状态，如果是锁定状态，每次都把数据渲染到选择框里
      this.islock = true
      this.inputVal = isLock.val
    }else{
      let arr = ['自选',localStorage.getItem('buycode')]
      this.inputVal = arr
    }

    // let data = this.$Win.getParameter()
    // // 判断用户点击内盘下单,还是外盘下单
    // if(data.id == '2'){
    //   if(localStorage.getItem('isbuy') == null){
    //     this.isbuy = true
    //   }else if(JSON.parse(localStorage.getItem('isbuy')) == true){
    //     this.isbuy = true
    //   }else{
    //     this.isbuy = false
    //   }
    // }else{
    //   if(localStorage.getItem('isbuy') == null){
    //     this.isbuy = false
    //   }else if(JSON.parse(localStorage.getItem('isbuy'))  == true){
    //     this.isbuy = true
    //   }else{
    //     this.isbuy = false
    //   }
    // }
   
    
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
    updataSocketData:function(val){
     
      // console.log("222",val) 
      this.reload()
    },
    changeSocketData:function(Val){
      let data = this.hangqingData
      for(let i=0;i<data.length;i++){
        if(Val.code ==data[i].code){
          data.splice(i,1,Val)
        }
        if(data[i].code == this.inputVal[1]){
          if(this.priceMode == '市价'){
            this.codePrice = data[i].point
          }
          this.updown.limitDown = data[i].limitDown
          this.updown.limitUp = data[i].limitUp
        }
      }
    },
    inputVal(val){
      
      this.$store.state.chanpinInfo = val[1]
    },
    // 监听持仓列表传递过来的数据
    childMsg(val){

      if(!this.islock){//非锁定状态就把数据传递给合约代码
        this.inputVal = ['自选',val.futures_code]
      }
    },
    activeName(Val){
      if(Val == 'chicang'){
        this.ischichang = true
      }else{
          this.ischichang = false
      }
    },

  },

  components:{
    ChiCang,
    JiaoGe,
    ChuRuJin,
    ChengJiao,
    WeiTuo,
    BuyAndSell,
    List
  }
};
</script>
<style lang="scss" scoped>
.moni {
  width: 100%;
  height: 100%;
  background-color: #2f343b;
  // -webkit-app-region:drag;
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
    .start-time{
      display: flex;
    }
    .el-input__inner{
      height: 30px;
      background: #2F343B;
      border: #2F343B;
      margin: 10px 0;
      width: 290px;
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
      // flex: 2;
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
    padding: 29px 40px;
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
            flex: 4;
            display: flex;
            justify-content: center;
            li {
              margin: 0px 16px 0px 5px;
              .priceMode:hover{
                background: rgb(92, 92, 92);
                border-radius: 3px;
                cursor: pointer;
              }
              .el-cascader{
                width: 118px;
                height: 25px;
                background: #22272e;
                border: 1px solid #595959;
                
              }
              p {
                margin: 10px 0px;
              }
            }
          }
          .ul02 {
            flex: 1.5;
            list-style: none;
            font-size: 14px;
            margin:0px;
            padding: 0px;
            text-align: right;
            display: flex;
            justify-content: center;
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
            margin: 10px 0;
            padding: 0px;
            display: flex;
            justify-content: center;
            li {
              width: 95px;
              // float: left;
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
          display: flex;
            justify-content: center;
          width: 100%;
          :first-child {
            // margin-left: 25px;
          }
          span {
            font-size: 14px;
            padding: 5px;
            background-color: #545b64;
            border-radius: 2px;
            margin: 0 5px;
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
      height: 300px;
      width: 60%;
      border: 1px solid black;
      color: #ffffff;
      .determineBtn{
        position: absolute;
        bottom: 7px;
        left: 0;
        button{
          border: none;
          border-radius: 5px;
          width: 70px;
          height: 25px;
          background: #4176d8;
          color: white;
          line-height: 25px;
          margin-left: 5px;
          cursor: pointer;
          :hover{
            background: #224586;
          }
        }
      }
    }
  }
  .centerLB {
    position: absolute;
    left: 0;
    top: 50px;
    overflow: hidden;
    width: 100%;
    display: flex;
    z-index: 3;
   background: #191B1F;
    height: 360px;
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
</style>