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
                    <P class="kahao">
                        <span>银行卡号</span><el-input placeholder="请输入银行卡号" v-model="kahao"></el-input>
                    </P>
                    <P class="huming">
                        <span>开户名</span><el-input placeholder="请输入开户名" v-model="huming"></el-input>
                    </P> 
                    <P class="dangqian">
                        <span>当前余额</span><el-input v-model="dangqian" :disabled="true"></el-input>
                    </P> 
                    <P class="fukuan">
                        <span>付款金额</span><el-input placeholder="输入金额" v-model="fukuan" style="margin-left:8%;"></el-input><span style="padding-left:5px;margin:0">元</span>
                    </P>   
                    <p>
                        <el-radio v-model="radio" label="1" >线下入金</el-radio>
                        <el-radio v-model="radio" label="2">线上入金</el-radio>
                    </p>   
                 </div>
        
                <el-button>确认转入</el-button>                 
            </el-tab-pane>
            
             <el-tab-pane label="期货转银行卡" name="second">
                <h1><img src="../../assets/clone.png" @click="closeWin"></h1>
                <div class="content">
                    <P class="kahao">
                        <span>银行卡号</span><el-input type="number" placeholder="请输入银行卡号" v-model="kahao"></el-input>
                    </P>
                    <P class="huming">
                        <span>开户名</span><el-input  placeholder="请输入开户名" v-model="huming"></el-input>
                    </P> 
                    <P class="dangqian">
                        <span>当前余额</span><el-input v-model="dangqian" :disabled="true"></el-input>
                    </P> 
                    <P class="fukuan">
                        <span>付款金额</span><el-input type="number" placeholder="输入金额" v-model="fukuan" style="margin-left:8%;"></el-input><span style="padding-left:5px;margin:0">元</span>
                    </P>   
                    <p><span>系统将在一个工作日内处理</span></p>   
                    

                </div>
                 <el-button>确认转出</el-button> 
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
            radio:'1',
            kahao:'',
            huming:'',
            dangqian:'992848 (元)',
            fukuan:'',
        }
    },
    methods:{
			closeWin() {
               let win =this.$Win.getWinByName('zhuanzhang')
               this.$Win.closeWin(win)
			},
    }
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