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
                <div class="imgBox" v-show="isthree">
                    <span>请上传身份证正面</span>
                    <div >
                        <i class="el-icon-plus"></i>
                        <input type="file" accept="image/*" @change="preImg" @click="upBoxIndex = 1" ref="inputer1">
                        <img :src="'http://39.100.151.138:8082' + imgList.img1" alt="">
                    </div>
                   
                   
                    
                </div>
                <div class="imgBox" v-show="isthree">
                    <span>请上传身份证反面</span>
                    <div >
                        <i class="el-icon-plus"></i>
                        <input type="file" accept="image/*" @change="preImg" @click="upBoxIndex = 2" ref="inputer2">
                        <img :src="'http://39.100.151.138:8082' + imgList.img2" alt="">
                    </div>
                    <!-- <input type="file" name="" accept="image/*" @change="preImg" ref="inputer" id=""> -->
                    
                </div>
                <div  class="imgBox" v-show="isthree">
                    <span>请上传银行卡正面</span>
                    <div >
                        <i class="el-icon-plus"></i>
                        <input type="file" accept="image/*" @change="preImg" @click="upBoxIndex = 3" ref="inputer3">
                        <img :src="'http://39.100.151.138:8082' + imgList.img3" alt="">
                    </div>
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
            imgList: {
                img1: null,
                img2: null,
                img3: null
            },
            upBoxIndex:1,
            percentage:20,
            btnMsg:'下一步',
            isLogin: false,
            radio: null,
            userPla: '请输入你的手机号~',
            usercode:'请输入验证码',
            pwdPla: '6-20位数字和字母组合',
            isone:true,
            istwo:false,
            isthree:false,
            // isuserNull: false,
            // ispwdNull: false
			
        }
    },
    methods:{
        preImg(event){
            if(this.upBoxIndex == 1){
                this.uploadAction(this.$refs.inputer1.files[0].path)
            }else if(this.upBoxIndex == 2){
                this.uploadAction(this.$refs.inputer2.files[0].path)
            }else{
                this.uploadAction(this.$refs.inputer3.files[0].path)
            }
            // console.log(this.$refs.inputer.files[0].path)
            
            // this.imgList = this.$refs.inputer.files[0].path
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
            let _this = this
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
            if(this.btnMsg == '下一步'){
                if(this.registerData.phone ==''||this.registerData.name==''||this.registerData.pwd==''||this.registerData.idNumber==''){
                    this.$message.error('请完善相关信息');
                    console.log(this.registerData.phone.length)
                }else{
                    if(this.registerData.phone.length != '11'){
                        this.$message.error('手机号错误');
                        return
                    }
                    if(this.registerData.idNumber.length != '15' && this.registerData.idNumber.length != '18'){
                        this.$message.error('身份证号错误');
                        return
                    }
                    if(this.registerData.pwd.length < '6'){
                        this.$message.error('密码不能小于6位');
                        return
                    }
                    this.isone = false
                    this.istwo = true
                    this.percentage = 50
                    this.btnMsg = '再下一步'
                }
            }else if(this.btnMsg == '再下一步'){
                if(this.registerData.moneyPass ==''||this.registerData.bank==''||this.registerData.bankNumber==''||this.registerData.bankAddress==''||this.registerData.organizationCode==''){
                    this.$message.error('请完善相关信息');
                }else{
                     this.isone = false
                    this.istwo = false
                    this.isthree = true
                    this.percentage = 100
                    this.btnMsg = "立即注册"
                }
            }else{
                if(this.imgList.img1 == null ||this.imgList.img2 == null ||this.imgList.img3 == null){
                    this.$message.error('请完善相关信息');
                }else{
                    let msg = JSON.stringify({
                        phoneNum: this.registerData.phone,
                        name: this.registerData.name,
                        idCardNum: this.registerData.idNumber,
                        loginPassword: this.registerData.pwd,
                        moneyPassword: this.registerData.moneyPass,
                        bankName: this.registerData.bank,
                        bankCardNum: this.registerData.bankNumber,
                        bankAddress: this.registerData.bankAddress,
                        agent: this.registerData.organizationCode,
                        idCardPicPos: this.imgList.img1,
                        idCardPicNeg: this.imgList.img2,
                        bankCardPicPos: this.imgList.img3
                    })
                    console.log(msg)
                    this.$pro.post('app_register', msg).then((res) => {
                        console.log(JSON.stringify(res))
                        
                        if (res.result == 1) {
                            _this.$alert('恭喜你!注册成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.closeWinC
                                }
                            });
                        } else {
                           _this.$message.error('错误'+res.message);
                        }

                    })
                }
            }
            
        },
        //将图片压缩转成base64
        getBase64Image(img) {
            var canvas = document.createElement("canvas");
            var width = img.width;
            var height = img.height;
            //calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > 640) {
                    height = Math.round(height *= 640 / width);
                    width = 640;
                }
            } else {
                if (height > 1024) {
                    width = Math.round(width *= 1024 / height);
                    height = 1024;
                }
            }
            canvas.width = width; /*设置新的图片的宽度*/
            canvas.height = height; /*设置新的图片的长度*/
            var ctx = canvas.getContext("2d");
            // console.log('图片转码：' + ctx)
            ctx.drawImage(img, 0, 0, width, height); /*绘图*/
            var dataURL = canvas.toDataURL("image/png", 1.0);
            // this.voucherImg=dataURL;
            // console.log('base64:' + dataURL)
            return dataURL.replace("data:image/png;base64,", "");
        },
        uploadAction(imgPath) {
            var _this = this;
            // console.log('1、：' + imgPath)
            var image = new Image();
            image.src = imgPath;
            image.onload = function() {
                // console.log('实例img：' + image)
                var file = _this.getBase64Image(image);
                // console.log('2、：' + file)
                var msg = JSON.stringify({
                    img: file
                })
                //console.log(msg);
                _this.$pro.post('upload_base64_img_register', msg).then(function(res) {
                    console.log('返回结果：' + JSON.stringify(res))
                    // console.log(res)
                    if (res.result == 1) {
                        _this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        // Toast.success('上传成功');
                        _this.$set(_this.imgList,'img' + _this.upBoxIndex,res.msg)
                        // console.log(_this.imgList)
                        // console.log(_this.upBoxIndex)
                        // console.log(_this.imgList['img' + _this.upBoxIndex])
                        // console.log(_this.imgList.img1)
                        // _this.popupShow2 = false;
                        // _this.$router.back(-2);
                    } else {
                        Dialog.alert({
                            message: '凭证上传失败，请重试'
                        })
                        // _this.voucherImg='';
                    }

                })
            }

        },
    },
    computed:{
        myData(){
            return {
                'cmd':'upload_base64_img_register'
            }
        }
    },
    watch:{
        'img':function(){
            console.log(this.img)
        },
        imageUrl:function(val){
            console.log(val)
        }
    },
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
    
    .imgBox{
        text-align: center;
        >div{
            border: #333333 1px dashed;
            position: relative;
            width: 200px;
            height: 100px;
            margin: 0 auto;
            
            i{
                font-size: 50px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%)
            }
            input{
                width: 100%;
                height: 100%;
                opacity: 0;
                 position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                cursor: pointer;
            }
            img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                 z-index: 1;
            }
        }
    }

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