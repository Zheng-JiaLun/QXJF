<template>
    <div class="zhuanzhang" >
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="银行卡转期货">
                
                <h1>
                    <!-- <i class="el-icon-close" @click="closeWin" style="display: inline-block;height:20px;width:20px;"></i> -->
                    <img src="../../assets/clone.png" @click="closeWin">
                     </h1>
                <div class="fengexian"></div>
                 <div class="content">
                    <!-- <P class="kahao">
                        <span>银行卡号</span><el-input placeholder="请输入银行卡号" v-model="kahao"></el-input>
                    </P>
                    <P class="huming">
                        <span>开户名</span><el-input placeholder="请输入开户名" v-model="huming"></el-input>
                    </P> 
                    <P class="dangqian">
                        <span>当前余额</span><el-input v-model="dangqian" :disabled="true"></el-input>
                    </P>  -->
                    <div class="xianxia" v-show="!xianUpDwon"> 
                       <div>
                           <h3>
                               <span>支付银行:</span><el-input placeholder="请输入支付银行" v-model="user.bank"/>
                           </h3>
                           <h3>
                               <span>支付卡号:</span><el-input placeholder="请输入支付卡号" v-model="user.bankNum"/>
                           </h3>
                           <h3>
                               <span>金额:</span><el-input placeholder="请输入支付金额" v-model="user.money"/>
                           </h3>
                           <h3 class="pingzheng">
                               <span>上传凭证:</span>
                                <div>
                                    <i class="el-icon-plus"></i>
                                    <input type="file" accept="image/*" @change="preImg" ref="inputer1">
                                    <img :src="'http://39.100.151.138:8082' + user.img" alt="">
                                </div>
                           </h3>
                       </div>
                       <div>
                           <h3>
                               <span>开户银行:</span><el-input v-model="other.bank"/>
                           </h3>
                           <h3>
                               <span>开户姓名:</span><el-input  v-model="other.name"/>
                           </h3>
                           <h3>
                               <span>银行卡号:</span><el-input v-model="other.bankNum"/>
                           </h3>
                           <h3>
                               <span>开户网点:</span><el-input v-model="other.address"/>
                           </h3>
                       </div>
                    </div>
                    <el-radio v-show="xianUpDwon" v-model="radio100" value="100" label="100" border>100</el-radio>
                    <el-radio v-show="xianUpDwon" v-model="radio100" value="500" label="500" border>500</el-radio>
                    <el-radio v-show="xianUpDwon" v-model="radio100" value="1000" label="1000" border>1000</el-radio>
                    <el-radio v-show="xianUpDwon" v-model="radio100" value="2000" label="2000" border>2000</el-radio>
                    <el-radio v-show="xianUpDwon" v-model="radio100" value="3000" label="3000" border>3000</el-radio>
                    <el-radio v-show="xianUpDwon" v-model="radio100" value="5000" label="5000" border>5000</el-radio>
                    <P class="fukuan" v-show="xianUpDwon">
                        <span>付款金额</span><el-input placeholder="输入金额" @focus="payNum()" v-model="fukuan" style="margin-left:8%;"></el-input><span style="padding-left:5px;margin:0">元</span>
                    </P>   
                    <p>
                        <el-radio v-model="radio" label="1" >线下入金</el-radio>
                        <el-radio v-model="radio" label="2" >线上入金</el-radio>
                    </p>   
                 </div>
        
                 <el-button @click="yToQ()">确认转入</el-button>                 
            </el-tab-pane>
            
             <el-tab-pane label="期货转银行卡" name="second">
                <h1><img src="../../assets/clone.png" @click="closeWin"></h1>
                <div class="content">
                     <P class="kahao">
                        <span>银行卡号</span><el-input placeholder="请输入银行卡号" v-model="account.bankCardNumber" readonly="readonly"></el-input>
                    </P>
                    <P class="huming">
                        <span>开户名</span><el-input placeholder="请输入开户名" v-model="account.accountName" readonly="readonly"></el-input>
                    </P> 
                    <P class="dangqian">
                        <span>开户银行</span><el-input v-model="account.depositBank" readonly="readonly"></el-input>
                    </P> 
                    <P class="dangqian">
                        <span>开户网点</span><el-input v-model="account.accountOpen" readonly="readonly"></el-input>
                    </P> 
                    <!-- <P class="dangqian">
                        <span>当前余额</span><el-input v-model="dangqian"></el-input>
                    </P>  -->
                    <P class="fukuan">
                        <span>付款金额</span><el-input placeholder="请输入金额（最低100元）" v-model="account.money"></el-input>
                    </P> 
                    <p><span>系统将在一个工作日内处理</span></p>   
                    

                </div>
                 <el-button @click="qToY()">确认转出</el-button> 
            </el-tab-pane>
           
        </el-tabs>
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
</template>

<script>
import {
    ipcRenderer
} from 'electron'
const {
    dialog,
    BrowserWindow
} = require('electron').remote
export default {
    data(){
        return{
            activeName:'second',
            radio:'2',
            radio100: '5000',
            
            kahao:'',
            huming:'',
            dangqian:'992848 (元)',
            fukuan:'',
            account:{
                accountName:'',
                bankCardNumber:'',
                depositBank:'',
                accountOpen:'',
                money:''
            },
            xianUpDwon:true,
            uInfo:{},
            user:{
                bank:'',
                bankNum:'',
                money:'',
                img:''
            },
            other:{
                bank:'',
                name:'',
                bankNum:'',
                address:''
            }
        }
    },
     mounted(){
        this.uInfo = JSON.parse(localStorage.getItem(this.$store.state.localStorageUid));
        console.log(this.uInfo)
        this.account.accountName = this.uInfo.bankusername;
        this.account.bankCardNumber = this.uInfo.bankcard;
        this.account.depositBank = this.uInfo.bankName;
        this.account.accountOpen = this.uInfo.bankAddress;
        this.initXianxia()
    },
    methods:{
			closeWin() {
               let win =this.$Win.getWinByName('zhuanzhang')
               this.$Win.closeWin(win)
            },
            payNum(){
                this.radio100 = ''
            },
             preImg(event){
                this.uploadAction(this.$refs.inputer1.files[0].path)
            },
            initXianxia(){
                var _this = this;
				var msg = JSON.stringify({
					user_id: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId
				})

				this.$post('get_agt_bankinfo', msg).then(function(res) {
                    console.log(res)
					if (res.result == 1) {
                        _this.other.name = res.msg[0].accountname
                        _this.other.bank = res.msg[0].bankname
                        _this.other.address = res.msg[0].bankaddress
                        _this.other.bankNum = res.msg[0].cardnumber
                        // console.log()
						// for (var i = 0; i < res.msg.length; i++) {
						// 	var obj = {};
						// 	obj.bankcard = res.msg[i].cardnumber;
						// 	obj.accout = res.msg[i].accountname;
						// 	obj.openBank = res.msg[i].bankname;
						// 	obj.openBankMin = res.msg[i].bankaddress;
						// 	_this.actions.push(obj);
						// }

						// _this.account = _this.actions[0]
					}

				})
            },
            yToQ(){
                let _this = this
                if(this.radio == '2'){
                    if(this.fukuan != ''){
                        if(this.fukuan < 100){
                            this.$message.error('金额不能小于100元');
                            return
                        }else{
                            var msg = JSON.stringify({
                                user_id: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
                                pay_amount: this.fukuan,
                                pay_channel: 4
                            })
                            
                        }
                        
                    }else if(this.radio100 != '' && this.fukuan == ''){
                        var msg = JSON.stringify({
                            user_id: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
                            pay_amount: this.radio100,
                            pay_channel: 4
                        })
                    }else{
                        this.$message.error('请输入或选择金额~');
                        return
                    }
                    this.$pro.post('create_pay_order', msg).then(function(res) {
                        console.log(res);
                        if (res.result === 1) {
                            _this.$message({
                            showClose: true,
                            message: '入金成功~',
                            type: 'success',
                            // center: true,
                            });
                            // Toast.clear();
                            // _this.$store.commit('setOrderId', res.msg.order_id);
                            // _this.$router.push('/thirdParty');
                        } else {
                            _this.$message({
                            showClose: true,
                            message: '错误'+res.message,
                            type: 'error'
                            });
                            // Toast.clear();
                            // Toast.fail(res.message);
                        }
                    })
                }else{
                    let _this = this
                    var msg = JSON.stringify({
                        user_id:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
                        //user_id: 0,
                        bank_account_name: this.other.name,
                        pay_bankcard: Number(this.other.bankNum),
                        bank_name: this.other.bank,
                        bank_branch: this.other.address,
                        bankcard: this.user.bankNum,
                        pay_bank_account_name: this.user.bank,
                        tvalue: Number(this.user.money),
                        
                        //pay_photo:require('../../../assets/img/index/up-img.png'),
                        pay_photo:this.user.img,
                        type: 0,
                        
                    });
                    //console.log(msg)
                    
                    if (this.other.name != '' && this.other.bankNum != '' && this.other.bank != '' && this.other.address !=
                        '' && this.user.money != ''&& this.user.img != ''&& this.user.bank != ''&& this.user.bankNum != '') {
                            
                        this.$post('add_inout_detail', msg).then(function(res) {
                            //console.log(res)
                            console.log(JSON.stringify(res))
                            if (res.result == 1) {
                                
                               _this.$message({
                                message: '受理成功',
                                type: 'success'
                                });
                                _this.user.bank=''
                                _this.user.bankNum=''
                                _this.user.money=''
                                _this.user.img=''
                                setTimeout(function(){
                                    _this.closeWin()
                                },1000)
                            } else {
                                _this.$message.error('错误:'+res.message);
                            }
                        })

                    } else {
                        _this.$message.error('请填写完整信息');
                    }
                }
                
                
            },
            qToY(){
                console.log(this.account.money.indexOf('.'))
                let _this = this
				var msg = JSON.stringify({
					user_id:this.uInfo.userId,
					accountName:this.account.accountName,
					bankCardNumber:Number(this.account.bankCardNumber),
					depositBank:this.account.depositBank,
					accountOpen:this.account.accountOpen,
					pay_amount:Number(this.account.money)
                })
                if(this.account.money<100){
                    this.$message.error('金额不能小于100元');
                    return
                }else if(this.account.money.indexOf('.') != -1){
                    this.$message.error('输入金额只能是整数');
                    return
                }else{
                    this.$post('create_outMoney_order',msg).then(function(res){
                        console.log(res);
                        if(res.result == 1){
                            _this.$message({
                                showClose: true,
                                message: '成功~',
                                type: 'success',
                                // center: true,
                            });
                        }else{
                            _this.$message({
                                showClose: true,
                                message: '错误'+res.message,
                                type: 'error'
                            });
                        }
                    })
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
                            _this.$set(_this.user,'img',res.msg)
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
    watch:{
        radio:function(val){
            console.log(val)
            if(val == 1){
                this.xianUpDwon = false
            }else{
                this.xianUpDwon = true
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.zhuanzhang{
   
    width: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
    border-radius:4px;
    
}

h1{
    position:fixed;
    top:0px;
    right: 20px;
    //width: 5%;
    
    margin: 0;
  
    
    
} 
// .fengexian{
//     border-bottom:1px solid #EEEEEE;
// }
.content{
    width: 40%;
    margin: 10px auto;
    >.el-radio{
        margin: 5px 10px;
        width: 80px;
    }
    .xianxia{
        width: 700px;
        display: flex;
        justify-content: space-between;
        margin-left: -182px;
        >div{
            width: 45%;
            >h3{
                display: flex;
                font-size: 15px;
                font-weight: 300;
                span{
                    flex: 3;
                    text-align: right;
                }
                .el-input{
                    flex: 7
                }
            }
            .pingzheng{
                display: flex;
                span{
                    flex: 3;
                }
                >div{
                    flex: 7;
                border: #C0C4CC 1px dashed;
                position: relative;
                width: 100px;
                height: 80px;
                margin: 0 auto;
                
                i{
                    font-size: 50px;
                    color: #C0C4CC;
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
        }
    }

    P{
        width: 100%;
        display: flex;
        margin: 20px 0;
        span{
            width: 38%;
            display: block;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            line-height: 40px;
            color:#666666;
            //margin-right: 5%;
        }
        .input{
            display: inline-block;
            width: 50%;
            margin-left: 2%;
            background: red !important;
            
        }
        .el-input__inner{
            padding-left: 2% !important;
        }
    }
    p:last-child{

        span{
        display: block;
        height: 17px;
        width: 100%;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:300;
        text-align: center;
        color:rgba(128,128,128,1);
        
        }
        .el-radio{
            width: 50%;
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:300;
            text-align: center;
            color:rgba(128,128,128,1);
            
        }
        .el-radio:first-child{
            margin-left: 22%;
        }

        
    }
    
}
.el-button{
        width:200px;
        margin:20px 40%;
        height:52px;
        background:rgba(65,118,216,1);
        border-radius:4px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);

    //    
}
.footer{
        width:90%;
        height:100px;
        background:rgba(51,65,100,1);
        display: flex;
        border-radius:4px;
        margin: 40px auto 0 auto;
        

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