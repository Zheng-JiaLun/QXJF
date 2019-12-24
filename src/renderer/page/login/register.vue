<template>
    <div class="login">
        <div class="wrapper">
            <!-- <div class="top">易得量化</div> -->
            <div class="content">
                <h1><span>欢迎注册</span><i class="el-icon-close" @click="closeWinC()"></i></h1>
                <div class="jindutiao">
                    <p><span><b>1</b></span><span><b>2</b></span><span><b>3</b></span></p>
                    <p><span>填写基础信息</span><span>填写银行资料</span><span style="color:#A7A7A7;">上传身份凭证</span></p>
                    <div class="jindu"><el-progress :text-inside="false" :stroke-width="4" :percentage="percentage" :show-text="false"></el-progress></div>
                </div>
                <div class="user" v-show="isone">
                    <p>手机号码</p>
                    <el-input v-model="registerData.phone" type="number" :placeholder="userPla" @blur="userOutput()"></el-input>
                </div>
                <!-- <div class="yanzhengma">
                    <p>手机验证码</p>
                    <el-input v-model="registerData.verCode" type="number" :placeholder="usercode" @blur="userOutput()"></el-input>
                    <el-button id="fasong">发送验证码</el-button>
                </div>                 -->
                <div class="pwd" v-show="isone">
                    <p>登录密码</p>
                    <el-input v-model="registerData.pwd" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div>
                <div class="pwd" v-show="isone">
                    <p>姓名</p>
                    <el-input v-model="registerData.name" placeholder="请输入真实姓名"></el-input>
                </div>
                <div class="pwd" v-show="isone">
                    <p>身份证号</p>
                    <el-input v-model="registerData.idNumber" placeholder="请输入有效身份证号"></el-input>
                </div>
                <div class="pwd two" v-show="istwo">
                    <p>资金密码</p>
                    <el-input v-model="registerData.moneyPass" placeholder="请输入资金密码"></el-input>
                </div>
                <div class="pwd two" v-show="istwo">
                    <p>银行名称</p>
                    <el-input v-model="registerData.bank" placeholder="请输入银行名称"></el-input>
                </div>
                <div class="pwd two" v-show="istwo">
                    <p>银行卡号</p>
                    <el-input v-model="registerData.bankNumber" placeholder="请输入银行卡号"></el-input>
                </div>
                <div class="pwd two" v-show="istwo">
                    <p>开户行地址</p>
                    <el-input v-model="registerData.bankAddress" placeholder="请输入开户行地址"></el-input>
                </div>
                <div class="pwd two" v-show="istwo">
                    <p>机构代码</p>
                    <el-input v-model="registerData.organizationCode" placeholder="请输入机构代码"></el-input>
                </div>
                <div v-show="isthree">
                    <p>请上传身份证正面</p>
                   <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                   >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div v-show="isthree">
                    <p>请上传身份证反面</p>
                </div>
                <div v-show="isthree">
                    <p>请上传银行卡正面</p>
                </div>
                <!-- <div class="pwd">
                    <p>确认密码</p>
                    <el-input v-model="registerData.pwdCopy" :placeholder="pwdPla" show-password @blur="pwdOutput()"></el-input>
                </div>                 -->
                <el-button type="primary" @click="register">{{btnMsg}}</el-button>
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
            <div class="footer" v-show="isone">
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
                    pwdCopy:'',
                    idNumber:'',
                    name:'',
                    moneyPass:'',
                    bank:'',
                    bankNumber:'',
                    bankAddress:'',
                    organizationCode:''
                },

            imageUrl: '',

            percentage:20,
            btnMsg:'下一步',
            isLogin: false,
            radio: null,
            userPla: '请输入你的手机号~',
            usercode:'请输入验证码',
            pwdPla: '8-20位数字和字母组合',
            isone:true,
            istwo:false,
            isthree:false,
            // isuserNull: false,
            // ispwdNull: false
			
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
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
            let win = this.$Win.getWinByName('register')
            this.$Win.closeWin(win)
        }  ,
        register(){
            let msg =JSON.stringify({
                mobile: this.registerData.phone,
                code: this.registerData.verCode,
                password: this.registerData.pwd,
            })
            // if(this.registerData.phone ==''||this.registerData.verCode==''||this.registerData.pwd==''||this.registerData.pwdCopy==''){
            //     alert('请补全信息')
            // }else if(this.registerData.pwd !=this.registerData.pwdCopy){
            //     alert('2次输入密码不一致')
            // }else if(this.registerData.pwd.length<6 || this.registerData.pwdCopy.length<6){
            //     alert('密码长度不能少于6位')
            // }else{
            //     this.$router.push('/login')
            // }
            if(this.registerData.phone ==''||this.registerData.name==''||this.registerData.pwd==''||this.registerData.idNumber==''){
                this.$message.error('请完善相关信息');
            }else{
                this.isone = false
                this.istwo = true
                this.percentage = 50
                if(this.registerData.moneyPass ==''||this.registerData.bank==''||this.registerData.bankNumber==''||this.registerData.bankAddress==''||this.registerData.organizationCode==''){
                    this.$message.error('请完善相关信息');
                }else{
                    this.isone = false
                    this.istwo = false
                    this.isthree = true
                    this.percentage = 100
                    this.btnMsg = "立即注册"
                    // if(){

                    // }
                }
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
    width: 100%;
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
    
    margin:0px auto 0 auto;
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
     .jindutiao{
        width: 80%;
        margin: 5px auto 0 auto;
        position: relative;
        .jindu{
            width: 77.9%;
            position:absolute;
            top:-14px;
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
            display: flex;
            justify-content: space-between;
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
                z-index: 2;
                b{
                    padding-left: 9px;
                }
            }
            span:first-child{
                // margin-right: 83%;
            }
        }
        p:nth-child(2){
            margin:5px 0;
            // width: 90%;
            display: flex;
            justify-content: space-between;
            span{
                display:inline-block;
                font-family:Microsoft YaHei;
                font-weight:300;
                color:rgba(65,118,216,1);
            }
            span:first-child{
                
            }
        }
    }
    div:not(:nth-child(2))>.el-input{
        width: 80%;
    }
    div:not(:nth-child(2))>p{
        margin: 5px 0;
        display: inline-block;
        width: 17.9%;
    }
    div:not(:nth-child(2)){
        margin: 14px auto;
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
        margin: 10px 10% 0 10%;
        height:52px;
        background:rgba(65,118,216,1);
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#FFFFFF;

    }
    .zidong{
        
        width: 80%;
        margin:0px auto !important;
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
        width: 100%;
        height:100px;
        background:rgba(51,65,100,1);
        display: flex;
        border-radius:4px;
        margin: 20px auto 0 auto;
        position: fixed;
        bottom: 0;
        left: 0;

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


    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>