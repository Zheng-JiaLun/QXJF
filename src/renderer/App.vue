<template>
  <div id="App">
    <el-menu
     :default-active="activeIndex" 
     class="el-menu-demo" mode="horizontal"
     :active='activeIndex'
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
        <el-menu-item class="fr" style="float:right" >
          <i class="el-icon-refresh"></i>
          <span slot="title">刷新</span>
        </el-menu-item>  
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
        <el-menu-item v-show="isLogin" class="fr" style="float:right">
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
     
      handleSelect(keyPath) {
        //console.log(key, keyPath);
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
        //console.log(data)


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
      loginstate(){
         this.name = JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).name
        this.isLogin = true
      },
   
      closeWinC(){},login(){},setPrLoss(){},
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
  computed:{
    ...mapGetters([
      'loginStatus'
    ])
  },
  watch(){
     //监听事件EVNT_COMM_SHOW_STATIUS就是固定的id
      EventBus.$on('EVNT_COMM_SHOW_STATIUS', arg => {
          console.log("printf >>", arg);
      });
  },
  watch:{
    
    '$store.state.path':function(){
      console.log('监听vuex:path,改变就修改菜单栏选中效果')
      this.activeIndex = this.$store.state.path
    },
      
    loginStatus: function(){
      console.log('进入监听~~~')
      console.log(this.name)
      console.log(JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).name)
     this.loginstate()

      // setInterval(function(){
      //   location.reload();
      // },1000)
      
    },
    
  },
 
  mounted(){
    this.change();
    if(localStorage.getItem('ycxUserLoginState_QXJF') == null){
      //第一次登录
      this.isLogin = false
    }else{
      this.name = JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).name
      this.isLogin = true
    }


     this.$store.dispatch('startUpInitConnSignalr');//启动socket
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
  #login{
    width: 494px;
    height: 550px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .content{
        height: 400px;
        margin:10px auto;
        background:rgba(255,255,255,1);
        border-radius:4px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#333333;
        h1{
            width: 92%;
            line-height: 50px;
            font-size:20px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(59,59,59,1);
            text-align: left;
            margin:auto;
            border-bottom:1px solid #EEEEEE;
            i{  
                
                
                float: right;
                margin-right: 0px;
                line-height: 50px;
            }
            
        }
        .user,.pwd{
            width: 90%;
            margin: 0 auto;
        }
        .el-button{
            width: 90%;
            margin: 20px 5%;
            height:52px;
            background:rgba(65,118,216,1);
            border-radius:4px;
            font-size:20px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);

        }
        .zidong{
            display: flex;
            width: 90%;
            margin:10px auto;
            .left{
                width: 50%;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
            .right{
                
                width: 50%;
                text-align: right;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(65,118,216,1);
                a{
                    text-decoration: none;
                    font-size: 14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(65,118,216,1);
                    
                }
            }
        }
        
    }
    .footer{
            width:100%;
            height:100px;
            background:rgba(51,65,100,1);
            display: flex;
            border-radius:4px;
            margin: 25px auto 0 auto;
            

            img{
                
                display:block;
                height: 60%;
                margin: auto 20px;
                
            }
            .middle{
                flex: 1;
                p{
                    text-align: left;
                    height:12px;
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
            }
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

