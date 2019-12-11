<template>
    <div class="login">
        <div class="wrapper">
            <!-- <div class="top">易得量化</div> -->
            <div class="content">
                <h1><span></span>我的策略<i class="el-icon-close" @click="closeWinC()"></i></h1>
                <div class="user">
                    <p>账号</p>
                    <el-input v-model="loginInput.user" type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
                </div>
                <div class="pwd">
                    <p>密码</p>
                    <el-input v-model="loginInput.pwd" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div>
                <el-button type="primary" :disabled="!isLogin">登录</el-button>
                <div class="zidong">
                    <div class="left">
                    <el-radio v-model="radio" label="1">下次自动登录</el-radio>
                    </div>
                    <div class="right">
                        <router-link to="/forgetpwd">忘记密码？</router-link>
                        
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
export default {
    data(){
        return{
            loginInput: {
					user: '',
					pwd: ''
				},
            isLogin: false,
            radio: null,
            userPla: '账号为手机号码',
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
        }     
    }
}
</script>

<style lang="scss" scoped>
.login{
    position: relative;
    opacity:0.94;
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
    //background:rgba(255,255,255,1);
    border-radius:4px;
    
    

    h1{
        width: 90%;
        line-height: 50px;
        font-size:27px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(59,59,59,1);
        text-align: left;
        margin:auto;
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