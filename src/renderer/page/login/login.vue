<template>
    <div class="login">
        <div class="wrapper">
            <!-- <div class="top">易得量化</div> -->
            <div class="content">
                <h1><span></span>欢迎登录<i class="el-icon-close" @click="closeWinC()"></i></h1>
                <div class="user">
                    <p>账号</p>
                    <el-input v-model="loginInput.user" type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
                </div>
                <div class="pwd">
                    <p>密码</p>
                    <el-input v-model="loginInput.pwd" :placeholder="pwdPla" show-password @blur="pwdOutput()" @keyup.enter.native="login()"></el-input>
                </div>
                <el-button type="primary" @click="login()">登录</el-button>
                <div class="zidong">
                    <div class="left">
                    <el-checkbox  v-model="checked" >下次自动登录</el-checkbox >
                    </div>
                    <div class="right">
                        <a @click="setPrLoss()">忘记密码？</a>
                        <!-- <router-link to="/forgetpwd01">忘记密码？</router-link> -->
                        
                        <span style="padding: 0 10px;"> | </span>
                        <router-link to="/register">注册</router-link>
                        
                    </div>
                </div>
            </div>
            <!-- content结束 尾部开始 -->
            <div class="footer">
                    <img src="../../assets/二维码.png">
                    <div class="middle">
                        <p>易得量化APP</p>
                        <p>随时随地 快捷方便</p>
                        <p style="color:rgba(115,134,181,1);">扫码下载易得量化APP</p>
                        
                    </div>
                    <img src="../../assets/work.png">
            </div>
        </div>
    </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import {mapState,mapMutations,mapActions} from 'vuex'

const {
  dialog,
  BrowserWindow
} = require('electron').remote

// const ipcRenderer = require('electron').ipcRenderer


export default {
    computed:
        mapState(['accountState'])
    ,
    data(){
        return{

            loginInput: {
					user: '',
					pwd: ''
				},
            isLogin: false,
            checked: true,
            userPla: '账号为手机号码',
            pwdPla: '请输入密码',
            // isuserNull: false,
            // ispwdNull: false
			
        }
    },
    // mounted(){
    //     console.log(this.$store)
    // },
    
    methods:{
        //...mapActions(['accountLogin']),
        //...mapMutations(['accountLogin01','accountLogin02']),
        //弹窗
        async setPrLoss() {
            let data = await this.$Win.openWin({
                // browserwindow原生属性
                width: 1019, // 窗口宽
                height: 464, // 窗口高

                // electron-vue-windows自定义的属性
                windowConfig: {
                router: "/forgetpwd01", // 路由 *必填
                data: {
                    id: 1
                }, // 传送数据
                name: "", // 窗口名称
                animation: "none"
                }
            });
        },
        userOutput() {
            if (this.user == '') {
                this.userPla = '账号不能为空'
                //this.isuserNull = true
            } else {
                //this.userPla = '账号为手机号码'
                //this.isuserNull = false
            }
        },  
        pwdOutput() {
				if (this.pwd == '') {
					this.pwdPla = '密码不能为空'
					//this.ispwdNull = true
				} else {
					// this.pwdPla = '请输入密码'
					//this.ispwdNull = false
				}
        }, 
        closeWinC(){
            let win = this.$Win.getWinByName('login')
            this.$Win.closeWin(win)
        },
        login(){
            let _this = this
            // let msg =JSON.stringify({
            //     accountNo: this.loginInput.user,
			// 	password: this.loginInput.pwd
            // })
            //this.$store.dispatch('accountLogin')
            if(this.loginInput.user == '' ||this.loginInput.user ==null){
                 this.$message.error('错误:账号不能为空');
            }else if(this.loginInput.pwd ==''||this.loginInput.pwd.length<6){
                //this.accountLogin01()
                this.$message.error('错误:密码长度不能少于6位');
                
            }else{
                //this.accountLogin01()
                // let win = this.$Win.getWinByName('login')
                // this.$Win.closeWin(win)
                var msg = {
                    accountNo: _this.loginInput.user,
                    password: _this.loginInput.pwd
                } 
                // console.log(msg)
                _this.$pro.post('login', JSON.stringify(msg)).then((res) => {
                    // Toast.clear();
                    console.log(res);
                    if (res.result == 1) {
                        var setSocketParam = {
                            userId: res.msg.userId,
                            token: res.msg.token
                        }
                         _this.$message({
                            message: '恭喜你，登陆成功，正在跳转',
                            type: 'success'
                        });
                        // _this.$store.commit('setSocketParam', setSocketParam);
                        localStorage.setItem('autoLogin',_this.checked)
                        // this.$store.dispatch('setSocketParam',setSocketParam)
                        // this.$store.dispatch('loginStatus',true)
                        localStorage.setItem(_this.$store.state.localStorageUid, JSON.stringify(res.msg));
                        localStorage.setItem(_this.$store.state.localStorageLogin, true);
                        // this.resetSetItem(_this.$store.state.localStorageLogin,true)
                        //提交状态EVNT_COMM_SHOW_STATIUS就是固定的id
                        // this.$store.dispatch('loginStatus')
                        // console.log(this.$store)
                        // _this.$initChicang();
                        // _this.$store.commit('setQuoteStatus', false);
                        // _this.$initHangqing();
                        // _this.$store.dispatch('connectSocket');
                        // _this.$router.push('./index');
                        setTimeout(function(){
                             
                        },1000)
                       this.$Win.closeWin({value:'登陆成功'})
                        // ipcRenderer.send('MainMsgFromRender',true)
                    }else{
                        _this.$message.error('错误：'+res.message);
                    }
                    
                }).catch((error) => {
                    console.log(error)
                    _this.$message.error('错误');
                    // alert('错误' + error)
                })
                
                
                
                
            }
            //this.$emit('userlogin')
        },
        
        

      
             
    }
}
</script>

<style lang="scss" scoped>
.login{
    position: relative;
    width: 100%;
    opacity: 1;
    display: flex;
    flex-direction: row;
    
    
}
.wrapper{
    margin: auto;
    align-self: center;
    width: 484px;
    height: 550px;
    
  
}

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
</style>