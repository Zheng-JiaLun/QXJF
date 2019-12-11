<template>
    <div class="login">
        <div class="wrapper">
            <!-- <div class="top">易得量化</div> -->
            <div class="content">
                <h1><span></span>申请老师<i class="el-icon-close" @click="closeWinC()"></i></h1>
                <div class="user">
                    <p>姓名</p>
                    <el-input v-model="loginInput.user" type="text" :placeholder="userName" @blur="userOutput()"></el-input>
                </div>
                <div class="pwd">
                    <p>手机号</p>
                    <el-input v-model="loginInput.pwd" type="number" :placeholder="pwdPla"  @blur="pwdOutput()"></el-input>
                </div>
                <div class="yanzhengma">
                    <p>验证码</p>
                    <el-input v-model="loginInput.user" type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
                    <el-button id="fasong">获取验证码</el-button>
                </div> 

                <el-button type="primary" :disabled="!isLogin">提交申请</el-button>
               
            </div>
            <!-- content结束 尾部开始 -->
            <div class="footer">
                    <img src="../../assets/二维码.png">
                    <div class="middle">
                        <p>申请入驻  </p>
                        <p>分享你的策略</p>
                        <p style="color:rgba(115,134,181,1);">积分达到一定的数量后，申请成入驻本平台老师分享你的策略，将会获得奖金福利</p>
                        
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
            userName:'请输入真实姓名',
            userPla: '请输入验证码',
            pwdPla: '请输入您的手机号',
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
    .yanzhengma{
        width: 90%;
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
            right: -25px;
            top: 16px;
            height: 50%;
            background:rgba(85,141,236,1);
            
            border-radius:5px 0 0 5px;
        }
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