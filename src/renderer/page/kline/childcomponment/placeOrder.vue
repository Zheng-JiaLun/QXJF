<template>
  <div class="moni">
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
                <!-- <input type="text" placeholder="合约代码" v-model="inputVal"/> -->
                <el-cascader :options="options" :show-all-levels="false" v-model="inputVal"></el-cascader>
                <!-- <i class="el-icon-search"></i> -->
              </li>
              <li>
                <p>手数</p>
                <input type="number" placeholder="数量"  v-model="inputNum"/>
              </li>
              <li>
                <p class="priceMode" @click="priceModeBtn">{{priceMode}}<i class="el-icon-d-caret"></i></p>
                <input type="number" placeholder="市价/限价" v-model="codePrice" />
              </li>
            </ul>
            <ul class="ul02 flex" style="line-height: 20px;">
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
          </ul>
        </div> -->
      </div>
      <!-- 展示板块的右边部分，主要展示合约列表 -->
      <div class="right">
        <el-tabs v-model="activeName"
        @tab-click="handleClick"
        
         type="card" >
          <!-- 引入持仓组件 -->
          <el-tab-pane label="持仓" name="chicang" id="chicang2">
            <ChiCang  :selector="selector" :clearSelection='clearSelection'  @childFn="parentFn"  @selectFn="selectFn"></ChiCang>
            <div class="determineBtn" v-show="selector">
              <button @click="determineBtn()">{{selectorText}}</button>
            </div>
          </el-tab-pane>
          <!-- 引入委托组件 -->
          <el-tab-pane label="委托" name="weituo" id="weituo2">
            <WeiTuo></WeiTuo>
          </el-tab-pane>
          <!-- 引入成交组件 -->
          <el-tab-pane label="成交" name="chengjiao" id="chengjiao2">
            <ChengJiao :value='value'></ChengJiao>
          </el-tab-pane>
          <el-tab-pane label="出入金" name="churujin" class="pane" id="churujin2">
            <ChuRuJin :value="value"></ChuRuJin>
          </el-tab-pane>
          <el-tab-pane label="交割查询" name="jiaoge" class="pane" id="jiaoge2">
            <JiaoGe :value="value"></JiaoGe>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ChiCang from "../../../components/common/ChiCangXinXi";
import WeiTuo from "../../../components/common/WeiTuoXinXi";
import ChengJiao from "../../../components/common/ChengJiaoChaXun";
import ChuRuJin from "../../../components/common/ChuRuJinChaXun";
import JiaoGe from "../../../components/common/JiaoGeChaXun";
export default {
    name:"placeOrder",
    props:{
      listSize:null,
      value:null,
      hangqingData:Array
      },
    data(){
        return {
            Listheight:'',
            activeName :"chicang",
            TabIndex: "",
            pinChang:false,
            inputVal:'',
            codePrice:'',
            priceMode:"市价",
            inputNum:'1',
            stopLoss:'0',
            stopPrint:'0',
            ischichang:true,
            clearSelection:0,
            selector:false,
            selectorText:'确定反手',
            selectorArr:[],
            options: [
             
            ],
            childMsg:{},
            islock:false,
            updown:{
              limitDown:'0',
              limitUp:'0'
            }
        }
    },
    methods:{
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
      // 持仓组件反出来的选中数组
      selectFn(val){
        this.selectorArr = val
        console.log(val)
      },
      handleClick(tab, event) {
        this.TabIndex = tab.index;
        localStorage.setItem("tabindex",tab.index)
        console.log(event,this.activeName)
        // 向父元素传值的自定义监听函数
        this.$emit("listenTabindex",1);
      },
      parentFn(val){
      this.childMsg = val
      },
      islockBtn(){
        this.islock = !this.islock
        // console.log(this.inputVal)
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
      buy(e){
        let _this = this
        // localStorage.setItem('buycode',_this.inputVal[1])//用户(买卖)操作的合约存一个,继续展示到页面上
        if(e == 1){
          //买
          this.$confirm('确定买入?', '提示', {
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
                // _this.guadanState1 = false;
                console.log(res)
                if (res.result == 1) {
                  // _this.active = 0;
                  // console.log(res)
                  // _this.$store.state.market.initChicang++
                  _this.$message({
                    type: 'success',
                    message:'买入成功'
                  });
                }else{
                  this.$message.error(res.message);
                  // alert(res.message)
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消买入'
            });          
          });
        }else{
          //卖
          this.$confirm('确定卖出?', '提示', {
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
                priceType:this.priceMode == '市价'?1:2,
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
      },
      //快捷反手
      quickFS(){
        this.clearSelection++
        if(this.selectorText == '确定反手'){
          this.selector = !this.selector;
        }else{
          this.selectorText = '确定反手'
          this.selector = true;
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
      // 快捷平仓
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
      
        
      },
      //部分平仓
      onePC(){
        this.clearSelection++
        if(this.selectorText == '确定平仓'){
          this.selector = !this.selector;
        }else{
          this.selectorText = '确定平仓'
          this.selector = true;
        }
      },
      //全部平仓
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
            _this.$pro.post('select_close',msg).then(function(res){
              console.log(res)
              if(res.result == 1){
                // _this.$store.state.market.initChicang++
                _this.$message({
                  type: 'success',
                  message: '全部平仓成功!'
                });
              }else{
                 _this.$message({
                  type: 'success',
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
        // console.log(this.options)
      },
    },
    created(){
      this.hqOptions()
      let isLock = JSON.parse(localStorage.getItem('islock'))
      if(isLock.islock){ //判断是否是锁定合约代码状态，如果是锁定状态，每次都把数据渲染到选择框里
        this.islock = true
        this.inputVal = isLock.val
      }else{
        // let arr = ['自选',localStorage.getItem('buycode')]
        // this.inputVal = arr
      }
    },
    computed:{
      changequoteDataAC(){
        return this.$store.getters.quoteDataAC
      },
      changeChanpinInfo(){
        return this.$store.state.chanpinInfo
      }
    },
    watch:{
       //  当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身的高度
      listSize: {
        handler: function(Val, oldVal) {
          
          this.Listheight= +Val;
          document.getElementById("chicang2").style.height = this.Listheight-24-this.Listheight*0.08 + "px";
          document.getElementById("weituo2").style.height = this.Listheight-24-this.Listheight*0.08 + "px";
          document.getElementById("chengjiao2").style.height = this.Listheight-24-this.Listheight*0.08 + "px";
          document.getElementById("churujin2").style.height = this.Listheight-24-this.Listheight*0.08 + "px";
          document.getElementById("jiaoge2").style.height = this.Listheight-24-this.Listheight*0.08 + "px";
          // console.log(Val,this.Listheight,document.getElementById("chicang2").style)
        }
      },
      inputVal(Val){
        console.log(Val[1])
        this.$store.state.chanpinInfo = Val[1]
      },
      changeChanpinInfo(val){
        this.inputVal = ['自选',val]
      },
      // 监听持仓列表传递过来的数据
      childMsg(val){
        if(!this.islock){//非锁定状态就把数据传递给合约代码
          this.inputVal = ['自选',val.futures_code]
        }
      },
      hangqingData:function(val){
        // console.log(this.inputVal)
        for (let i = 0; i < val.length; i++) {
        if(val[i].code == this.inputVal[1]){
          // let time = eval(hangqingData[i].tradeTime)
          if(this.priceMode == '市价'){
            this.codePrice = val[i].point
           
          }
          this.updown.limitDown = val[i].limitDown
          this.updown.limitUp = val[i].limitUp
        }
      }
      },
      // changequoteDataAC:function(Val){
      //   if(Val.code == this.inputVal[1]){
      //     this.codePrice = Val.point
      //     this.updown.limitDown = Val.limitDown
      //     this.updown.limitUp = Val.limitUp
      //   }
      // },
      activeName(Val){
        if(Val == 'chicang'){
          this.ischichang = true
        }else{
           this.ischichang = false
        }
      }
    },
    components:{
      ChiCang,
      ChengJiao,
      ChuRuJin,
      WeiTuo,
      JiaoGe
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
    height: 92%;
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
         min-width: 400px;
         box-sizing: border-box;
         position: relative;
        .input {
          padding: 0 10px;
          // height: 70px;
          // margin-bottom: 10px;
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
            height: 70px;
            display: flex;
            justify-content: center;
            // flex: 4;
            // display: inline-block;
            li {
              margin: 0px 16px 0px 5px;
              float: left;
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
            // flex: 1.5;
            list-style: none;
            font-size: 14px;
            height: 20px;
            margin: 10px 0;
            // margin-top: 30px;
            padding: 0px;
            display: flex;
            justify-content: center;
            // text-align: right;
            // float: right;
            li {
              margin: 0px 16px;
              float: left;
              p {
                margin: 10px 0px;
              }
            }
          }
        }
        .center {
          padding: 0 7px;
          // height: 61px;
          display: flex;
          justify-content: center;
          .ul03 {
            list-style: none;
            // margin: 0px;
            padding: 0px;
            // float: left;
            height: 61px;
            // display: block;
            // margin: 0 auto;
            display: flex;
            justify-content: center;
            li {
              width: 100px;
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
                height: 64px;
                font-size: 14px;
                border-radius: 4px;
                p:first-child {
                  border-bottom: #fdfdfd 1px solid;
                  margin-bottom: 0;
                }
                p:last-child{
                  margin: 0 0px;
                  font-size: 18px;
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
          display: flex;
            justify-content: center;
          position:absolute;
          bottom: 0;
          :first-child {
            // margin-left: 25px;
          }
          span {
            font-size: 14px;
            padding: 5px;
            display: inline-block;
            box-sizing: border-box;
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
      .el-tabs{
        height: 100%;
        
      }
      
    }
  }
}
</style>