<template>
    <div class="login">
        <div class="wrapper">
            <!-- <div class="top">易得量化</div> -->
            <div class="content">
                <h1><span></span>修改密码<i class="el-icon-close" @click="closeWinC()"></i></h1>
                <div class="user">
                    <p>账号</p>
                    <el-input v-model="loginInput.user" type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
                </div>
                <!-- <div class="pwd">
                    <p>旧密码</p>
                    <el-input v-model="loginInput.pwd" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div> -->
                <div class="pwd">
                    <p>新密码</p>
                    <el-input v-model="loginInput.pwdxinmima" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div> 
                <div class="yanzhengma">
                    <p>验证码</p>
                    <el-input v-model="loginInput.code" type="number" :placeholder="userCode" @blur="userOutput()"></el-input>
                    <el-button id="fasong">获取验证码</el-button>
                </div>                
                <el-button type="primary" @click="confirm">确认</el-button>
                <!-- <div class="zidong">
                    <div class="left">
                    <el-radio v-model="radio" label="1">下次自动登录</el-radio>
                    </div>
                    <div class="right">
                        <router-link to="/login">登录</router-link>
                        
                        <span style="padding: 0 10px;"> | </span>
                        <router-link to="/register">注册</router-link>
                        
                    </div>
                </div> -->
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
export default {
    data(){
        return{
            loginInput: {
                    user: '',
                    code:'',
                    pwd: '',
                    pwdxinmima:''
				},
            isLogin: false,
            radio: null,
            userPla: '账号为手机号码',
            userCode:'输入验证码',
            pwdPla: '请输入密码',
            // isuserNull: false,
            // ispwdNull: false
			
        }
    },
    methods:{
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
        confirm(){
            if(this.loginInput.user==''||this.loginInput.pwdxinmima==''){
                alert('账号或密码不能为空')
            }else if(this.loginInput.pwdxinmima.length<6){
                alert('密码至少为6位数')
            }else{

            }
        }  
    }
}
</script>

<style lang="scss" scoped>
.login{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    
    
}
.wrapper{
    margin: auto;
    align-self: center;
    width: 484px;
    height: 500px;
    
  
}
// .top{
//         width: 100%;
//         text-align: center;
//         font-size:52px;
//         font-family:HXBNRBJ;
//         font-weight:400;
//         color:rgba(255,255,255,1);
//         background:none;
//         margin-bottom: 30px;       
// }
.content{
    height: 400px;
    margin:10px auto;
    background:rgba(255,255,255,1);
    border-radius:4px;
    
    

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
        width: 80%;
        margin: 0 auto;
    }
    .el-button{
        width: 80%;
        margin: 20px 10%;
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
        width: 80%;
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
  .yanzhengma{
        width: 80%;
        margin: 0 auto;
        position: relative;
        #fasong{
            background: none;
            width: 20%;
            font-size:12px;
            height: 18px;
            font-family:Microsoft YaHei;
            font-weight:300;
            color:#FFFFFF;
            border: none;
            position: absolute;
            right: -40px;
            top: 16px;
            height: 50%;
            background:rgba(85,141,236,1);
            padding-left: 0;
            border-radius:0 5px 5px 0;
        }
    } 
.footer{
        width:100%;
        height:100px;
        background:rgba(51,65,100,1);
        display: flex;
        border-radius:4px;
        margin: 20px auto 0 auto;
        

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