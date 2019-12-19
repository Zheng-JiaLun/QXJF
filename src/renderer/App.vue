<template>
  <div id="App">
    <el-menu
     :default-active="_activeIndex" 
     class="el-menu-demo" mode="horizontal"
     :active='_activeIndex'
     @select="handleSelect"
    router
    text-color="#9fa6b0"
    active-text-color="#4179d6"
    style="background:rgba(47,52,59,1);"
    v-if="$route.meta.show">
        <el-menu-item ><img src="./assets/logo@2x.png"></el-menu-item>
        <el-menu-item class="fr" index="/">
          <i class="el-icon-s-marketing" ></i>
				  <span>实时行情</span>
        </el-menu-item>
        <el-menu-item class="fr" index="/kline">
          <i class="el-icon-s-data"></i>
				  <span slot="title">K线</span>
        </el-menu-item>
        <el-menu-item class="fr"  @click="showBoxxiadan()" >
          <i class="el-icon-postcard"></i>
				  <span slot="title">下单</span>
        </el-menu-item>
        <el-menu-item class="fr" index="/heyue">
          <i class="el-icon-s-claim"></i>
				  <span slot="title">合约信息</span>
        </el-menu-item>
        <el-menu-item class="fr" index="/zhinengjiaoyi" >
          <i class="el-icon-bank-card"></i>
          <span slot="title">智能交易</span>
			  </el-menu-item>
        <el-menu-item class="fr" style="float:right" @click="quit">
          <i class="el-icon-close"></i>
        </el-menu-item>  
        <el-menu-item class="fr" style="float:right" @click="zoom">
          <i class="el-icon-copy-document"></i>
        </el-menu-item>
         <el-menu-item class="fr" style="float:right" @click="minimize">
          <i class="el-icon-minus"></i>
        </el-menu-item>      
        <!-- <el-menu-item class="fr" style="float:right">
          <i class="el-icon-refresh"></i>
          <span slot="title">刷新</span>
        </el-menu-item>   -->
        <el-menu-item class="fr" style="float:right" @click="showBox('/zhuanzhang2')">
          <i class="el-icon-s-finance" ></i>
          <span slot="title" >银期转账</span>
        </el-menu-item>         
        <el-menu-item disabled class="fr" style="float:right"> | </el-menu-item>        
         <el-menu-item v-show="!isLogin" class="fr" style="float:right" @click="showBox('/register')">
          <span>注册</span>
        </el-menu-item>         
        <el-menu-item v-show="!isLogin" class="fr" style="float:right" @click="showBox('/login')" @userlogin="getUser">
          <span>登录</span>
        </el-menu-item>
        <el-menu-item v-show="isLogin" class="fr" style="float:right" @click="isUserShow = !isUserShow">
          <span>{{name}}</span>
           <img style="height:80%;" :src='img' alt="">
        </el-menu-item>
       

        <!-- <el-menu-item v-if="this.accountState.loginStatus === 0" class="fr" style="float:right">
          <div class="state.loginStatus">
              <el-row class="block-col-2">
                <el-col :span="12">
                  <span class="demonstration"><img :src="userImg" style="dispaly:block;height:40px;width:40px;margin-right:20px;border-radius:50%;"></span>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link" style="color:rgba(252,252,252,1);font-size:20px;color:#999;">
                      用户001<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="background:rgba(30,35,41,1);border-radius:5px;border:none">
                      <span @click="showBox('/mine')"><el-dropdown-item icon="el-icon-plus">我的主页</el-dropdown-item></span>
                      <span @click="showBox('/celue')"><el-dropdown-item icon="el-icon-circle-plus">策略介绍</el-dropdown-item></span>
                      <span @click="showBox('/teacher')"><el-dropdown-item icon="el-icon-circle-plus-outline">申请老师</el-dropdown-item></span>
                      <span @click="showBox('/forgetpwd')"><el-dropdown-item icon="el-icon-check" >修改密码</el-dropdown-item></span>
                      <span @click="tuichu"><el-dropdown-item icon="el-icon-circle-check" >退出账号</el-dropdown-item></span>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
           </el-row>
          </div>
        </el-menu-item> -->

    </el-menu>
    <div id="userMsg" v-show="isUserShow">
      <button @click="logout()">退出登录</button>
    </div>
    <!-- <div class="line"></div> -->
    <router-view ></router-view>
    <!-- <div id="login">
        <div class="content">
            <h1><span></span>欢迎登录<i class="el-icon-close" @click="closeWinC()"></i></h1>
            <div class="user">
                <p>账号</p>
                <el-input v-model="loginInput.user" type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
            </div>
            <div class="pwd">
                <p>密码</p>
                <el-input v-model="loginInput.pwd" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
            </div>
            <el-button type="primary" @click="login()">登录</el-button>
            <div class="zidong">
                <div class="left">
                <el-radio v-model="radio" label="1">下次自动登录</el-radio>
                </div>
                <div class="right">
                    <a @click="setPrLoss()">忘记密码？</a>
                    <span style="padding: 0 10px;"> | </span>
                    <router-link to="/register">注册</router-link>
                    
                </div>
            </div>
        </div>
       
        <div class="footer">
                <img src="./assets/二维码.png">
                <div class="middle">
                    <p>易得量化APP</p>
                    <p>随时随地 快捷方便</p>
                    <p style="color:rgba(115,134,181,1);">扫码下载易得量化APP</p>
                    
                </div>
                <img src="./assets/work.png">
        </div>
    </div>
    <div id="register"></div> -->
  </div>
</template>




<script type="text/javascript" src='../../static/js/charting_library.min.js'></script>

<script>
import {ipcRenderer,ipcMain} from 'electron'
import{mapState,mapMutations,mapGetters} from 'vuex'
import { EventBus } from "./assets/js/EventBus";    //引入EventBus
// import $ from 'jquery'
//     import signalR from '../../node_modules/signalr'
const {
  dialog,
  BrowserWindow
} = require('electron').remote


export default {
  name: 'App',
  computed:
    mapState(['accountState','main'])
  ,
  data() {
      return {
        windowsIndex:'',
        activeIndex: '/',
        //state.loginStatus:null,
        userImg:require('../renderer/assets/work.png'),
        // loginOff:userInfor,
        isLogin:false,
        isUserShow:false,
        loginInput: {
					user: '',
					pwd: ''
        },
        userPla: '账号为手机号码',
        pwdPla: '请输入密码',
        name:'zjl',
        img:'http://39.100.151.138:8082/upload/headImg/tx_default.png'
      };
    },
  methods: {
    
      handleSelect(index,indexPath) {
        
        // console.log(index, indexPath,'22222222222222222222222222222222222222222222222222222222');
        // this.$store.state.path = keyPath;
      },
    
      async showBox(type){
        //console.log(type)
        var a =0  // 窗口宽
        var b =0  // 窗口高
        if(type =='/login'){
            a=494;
            b=550
        }else if(type =='/register'){
              a=550;
              b= 690;
        }else if(type == '/zhuanzhang2'){
            a=822;
            b= 490;
        }else{
          a=550;
          b=680
        }

        let data = await this.$Win.openWin({
          //browserwindow原生属性
         width:a,
         height:b,
          
          // width: type == '/login' ? 494 : 550, 
          // height: type == '/login' ? 560 : 680, 
          //electron-vue-windows 自定义的属性
          windowConfig:{
            router:type, //路由*必填
            data:{
              
            }, //传送数据
            name:'',  //窗口名称
            animation: 'fromLeft' //动画
          }          
        })
        console.log(data.value)
        if(data.value == '登陆成功'){
          this.$pro.isLogin()
          this.name = JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).name
          this.img = 'http://39.100.151.138:8082' + JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).headImg
          this.isLogin = true
          console.log(this.$store)
        }


      },
      quit(){
				this.$confirm('确认退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					ipcRenderer.send('close')
				})
      },
      //退出登录
      logout(){
        localStorage.removeItem('ycxUserInfo_QXJF')
        localStorage.removeItem('ycxUserLoginState_QXJF')
        this.$store.state.account.loginStatus = false
        this.isLogin = false
        this.isUserShow = false
      },
      zoom(){
        ipcRenderer.send('max')
      },
      minimize(){
        ipcRenderer.send('min')
        
      },
      tuichu(){
          this.accountState.loginStatus=0
          
      },
      getUser(){
        this.accountState.loginStatus =1
      },
      change(){
        //alert(5)
        // console.log(this.accountState.loginStatus)
        // console.log(this.main)
      },
      //请求存储行情信息在localStorage
      postHangqing(){
        let _this = this
        this.$pro.post('get_menu','').then((res) =>{
          this.$store.state.chanpinInfo = res.msg[0].item[0].code
          // console.log('~~~~~~~~~~~~~~~~~~~~~~',this.$store.state.chanpinInfo)
          localStorage.setItem(_this.$store.state.localStorageHq,JSON.stringify(res.msg))
        })
      },
      //设置一个全局时间，存到vuex，每秒跟新一次
      timer(){
        setInterval(() => {
          this.$store.state.nowTime = this.$pro.getTime()
          
        }, 1000)
      },
     
      
      async showBoxxiadan() {
      let data = await this.$Win.openWin({
        // browserwindow原生属性
        width: 1400, // 窗口宽
        height: 516, // 窗口高

        // electron-vue-windows自定义的属性
        windowConfig: {
          router: "/moni", // 路由 *必填
          data: {
            id: 1
          }, // 传送数据
          name: "yidemoni", // 窗口名称
          animation: "fromBottom"
        }
      });
    }
  },
  created(){
    this.postHangqing()
    this.timer()
    
  //  window.addEventListener('setItem', ()=> {
  //     this.name = localStorage.getItem('ycxUserLoginState_QXJF');
  //      this.isLogin = true
  //      console.log("触发localStorage监听")
  //   })
  //   ipcRenderer.on('RenderMsgFromMain', function (event, arg) {
  //   alert(arg)
  //   window.parent.location.reload()
  //   let _this = this
   
  //   })
  },
  computed:{
    ...mapGetters([
      'loginStatus'
    ]),
  
    _activeIndex(){
      return this.$store.state.activeIndex
    }
  },
  
  watch:{
    loginStatus: function(){},
  },
 
  mounted(){
    // console.log(this.$store)
    this.change();
    if(JSON.parse(localStorage.getItem('ycxUserLoginState_QXJF')) == true){
      this.$pro.isLogin()
       this.name = JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).name
       this.img = 'http://39.100.151.138:8082' + JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).headImg
      this.isLogin = true
    }else{
      this.isLogin = false
       this.$store.state.account.loginStatus = false
    }


     this.$store.dispatch('startUpInitConnSignalr');//启动socket
    //  this.$store.commit('initConnSignalr');//启动socket
    //  console.log(this.$store.state.market.quoteData.openPoint) //行情Socket

    
    // this.$websocket.dispatch('WEBSOCKET_INIT',"http://39.100.151.138:8081/myconnection" + '?userId=' + uuid + '&token=' + uuid)
  },
    
  components:{
      
  },
}

//随机uuid
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
</script>
<style lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  

  }
  #userMsg{
    width: 500px;
    height: 300px;
    background: lightblue;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
    button{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 50px;
      background: #409eff;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 17px;
      font-weight: 600;
      
    }
    button:hover{
        background: #2e71b4;
      }
  }
.el-menu{
    width: 100%;
    height: 60px;
    margin-bottom: 0px;
    -webkit-app-region: drag;
    .el-menu-item{
      //width: 6%;
      padding: 0 20px;
      -webkit-app-region:no-drag;
    }
    .el-menu-item:first-child{
      -webkit-app-region: drag;
            }
    


  .fr{
    height: 60px;
    }
  .fr:hover{
    background:rgba(82,90,101,1) !important;
  }



}
.el-menu-item span{

  font-size: 15px;
}
.el-menu-item.is-active {
      border: none;
      
}
.el-menu.el-menu--horizontal{
  border: none;
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  background: none;
}
 
</style>

