<template>
    <div class="login">
        <div class="wrapper">
            <!-- <div class="top">易得量化</div> -->
            <div class="content">
                <h1><span>欢迎注册</span><i class="el-icon-close" @click="closeWinC()"></i></h1>
                <div class="user">
                    <p>手机号码</p>
                    <el-input v-model="registerData.phone" type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
                </div>
                <div class="yanzhengma">
                    <p>手机验证码</p>
                    <el-input v-model="registerData.verCode" type="number" :placeholder="usercode" @blur="userOutput()"></el-input>
                    <el-button id="fasong">发送验证码</el-button>
                </div>                
                <div class="pwd">
                    <p>登录密码</p>
                    <el-input v-model="registerData.pwd" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div>
                <div class="pwd">
                    <p>确认密码</p>
                    <el-input v-model="registerData.pwdCopy" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div>                
                <el-button type="primary" @click="register">确认注册</el-button>
                <div class="zidong">
                    <!-- <div class="left">
                    <el-radio v-model="radio" label="1">下次自动登录</el-radio>
                    </div>
                    <div class="right">
                        <a>忘记密码？</a>
                        <span style="padding: 0 10px;"> | </span>
                        <a>注册</a>
                    </div> -->
                    <a style="color:rgba(51,51,51,1);">已有账号？</a>
                    
                    <router-link to="/login" style="color:#4176D8">点击登录</router-link>
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
export default {
    data(){
        return{
            registerData: {
                    phone: '',
                    verCode:'',
                    pwd: '',
                    pwdCopy:''
				},
            isLogin: false,
            radio: null,
            userPla: '0086~',
            usercode:'请输入验证码',
            pwdPla: '8-20位数字和字母组合',
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
            let win = this.$Win.getWinByName('register')
            this.$Win.closeWin(win)
        }  ,
        register(){
            let msg =JSON.stringify({
                mobile: this.registerData.phone,
                code: this.registerData.verCode,
                password: this.registerData.pwd,
            })
            if(this.registerData.phone ==''||this.registerData.verCode==''||this.registerData.pwd==''||this.registerData.pwdCopy==''){
                alert('请补全信息')
            }else if(this.registerData.pwd !=this.registerData.pwdCopy){
                alert('2次输入密码不一致')
            }else if(this.registerData.pwd.length<6 || this.registerData.pwdCopy.length<6){
                alert('密码长度不能少于6位')
            }else{
                this.$router.push('/login')
            }
            
            
        }  
    }
}
</script>

<style lang="scss" scoped>
.login{
    position: relative;
    width: 100%;
    //height: 100%;
    
    display: flex;
    flex-direction: row;
    
   
}
.wrapper{
    margin: auto;
    align-self: center;
    // width: 484px;
    // height: 653px;
    
  
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
    
    margin:10px auto 10px auto;
    background:rgba(255,255,255,1);
    border-radius:4px;
    height: 550px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:#333333;
    


    h1{
        width: 92%;
        margin:auto;
        line-height: 50px;
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#585858;
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
    .yanzhengma{
        width: 80%;
        margin: 0 auto;
        position: relative;
        #fasong{

            width: 20%;
            height: 40px;
            font-size:12px;
            border-radius:0 5px 5px 0;
            padding: 0 !important;
            font-family:Microsoft YaHei;
            color:#C2C2C2;
            position: absolute;
            right: 0px;
            margin-right: 0px;
            top: 17px;

        }
    }
    .el-button{
        width: 80%;
        margin: 20px 10% 10px 10%;
        height:52px;
        background:rgba(65,118,216,1);
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#FFFFFF;

    }
    .zidong{
        
        width: 80%;
        margin:0px auto;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        a{
            text-decoration: none;
            padding-bottom: 10px;
        }
    }
    
}
.footer{
        width: 484px;
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