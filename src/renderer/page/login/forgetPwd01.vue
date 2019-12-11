<template>
    <div class="login">
        <div class="wrapper">
            <div class="content">
                <h1><span></span>修改密码<i class="el-icon-close" @click="closeWinC()"></i></h1>
                <!-- <el-steps :active="1" align-center process-status="process">
                <el-step title="重置密码" description=""></el-step>
                <el-step title="完成" description=""></el-step>
                </el-steps> -->
                <div class="jindutiao">
                    <p><span><b>1</b></span><span><b>2</b></span></p>
                    <p><span style="margin-right: 77%;">重置密码</span><span style="color:#A7A7A7;">完成</span></p>
                    <div class="jindu"><el-progress :text-inside="false" :stroke-width="4" :percentage="20" :show-text="false"></el-progress></div>
                </div>
                <div class="user">
                    <p>旧密码</p>
                    <el-input v-model="loginInput.user" show-password type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
                </div>
                <div class="pwd">
                    <p>新登录密码</p>
                    <el-input v-model="loginInput.pwdxinmima" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div> 
                <div class="yanzhengma">
                    <p>确认密码</p>
                    <el-input v-model="loginInput.code" type="number" :placeholder="userCode" @blur="userOutput()"></el-input>
                    <!-- <el-button id="fasong">获取验证码</el-button> -->
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
            <!-- <div class="footer">
                    <img src="../../assets/二维码.png">
                    <div class="middle">
                        <p>易得量化APP</p>
                        <p>随时随地 快捷方便</p>
                        <p style="color:rgba(115,134,181,1);">扫码下载易得量化APP</p>
                        
                    </div>
                    <img src="../../assets/work.png">
            </div> -->
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
            userPla: '请输入原登录密码',
            userCode:'请再次输入密码',
            pwdPla: '不少于6位',
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
    display: flex;
    flex-direction: row;
    width:1019px;
    height:464px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    
    
}
.wrapper{
    margin:0px auto;
    //align-self: center;
    width: 100%;
    //height: 500px;
    
  
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
    //height: 400px;
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
        margin:0px auto;
        border-bottom:1px solid #EEEEEE;
        i{  
            
            
            float: right;
            margin-right: 0px;
            line-height: 50px;
        }
        
    }
    .jindutiao{
        width: 80%;
        margin: 50px auto 0 auto;
        position: relative;
        .jindu{
            width: 79.9%;
            position:absolute;
            top:14px;
            left: 44px;
            .el-progress{
                .el-progress-bar__inner{
                    background-color: rgba(65,118,216,1) !important;
                }
            }
        }
        p:first-child{
            margin: 0;
            width: 96%;
            margin: 0 auto;
            span{
                display:inline-block;
                width:29px;
                line-height: 29px;
                height:29px;
                background:rgba(65,118,216,1);
                border-radius:50%;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:#FFFFFF;
                b{
                    padding-left: 9px;
                }
            }
            span:first-child{
                margin-right: 83%;
            }
        }
        p:last-child{
            margin:5px 0;
            width: 90%;
            span{
                display:inline-block;
                font-family:Microsoft YaHei;
                font-weight:300;
                color:rgba(65,118,216,1);
            }
            span:first-child{
                margin-right: 86% !important;
            }
        }
    }
    .user{
        width: 40%;
        margin: 0 auto;
        .el-input{
            width: 57%;
        }
    }
    .user,.pwd,.yanzhengma{
        p{
            display:inline-block;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            margin-right: 5px;
        }

       
    }
    .pwd{
        width: 46%;
        margin: 0 auto;
        .el-input{
            width: 49%;
        }
    }
    .yanzhengma{
        .el-input{
                    width: 53%;
                }
    }
    .el-button{
        width:158px;
        margin: 40px 38%;
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
        width: 43%;
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