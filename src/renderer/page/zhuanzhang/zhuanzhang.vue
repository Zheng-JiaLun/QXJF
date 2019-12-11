<template>
    <div class="zhuanzhang" >
        <el-tabs type="border-card">
            <el-tab-pane label="银行卡转期货">
                <div class="right" @click="closeWin">
                        <i class="el-icon-close"></i>
                    </div>
                <div class="content">
                    <P class="kahao">
                        <span>银行卡号</span><el-input placeholder="请输入银行卡号" v-model="kahao"></el-input>
                    </P>
                    <P class="huming">
                        <span>开户名</span><el-input placeholder="请输入开户名" v-model="huming"></el-input>
                    </P> 
                    <P class="dangqian">
                        <span>当前余额</span><el-input v-model="dangqian"></el-input>
                    </P> 
                    <P class="fukuan">
                        <span>付款金额</span><el-input placeholder="请输入金额（元）" v-model="fukuan"></el-input>
                    </P>   
                    <p>
                        <el-radio v-model="radio" label="1" >线下入金</el-radio>
                        <el-radio v-model="radio" label="2">线上入金</el-radio>
                    </p>   
                </div>
        
                <el-button>确认转入</el-button>                 
            </el-tab-pane>
            
            <el-tab-pane label="期货转银行卡">
                 <div class="right" @click="closeWin">
                        
                        <i class="el-icon-close"></i>
                    </div>
                <div class="content">
                    <P class="kahao">
                        <span>银行卡号</span><el-input placeholder="请输入银行卡号" v-model="kahao"></el-input>
                    </P>
                    <P class="huming">
                        <span>开户名</span><el-input placeholder="请输入开户名" v-model="huming"></el-input>
                    </P> 
                    <P class="dangqian">
                        <span>当前余额</span><el-input v-model="dangqian"></el-input>
                    </P> 
                    <P class="fukuan">
                        <span>付款金额</span><el-input placeholder="请输入金额（元）" v-model="fukuan"></el-input>
                    </P>   
                    <p><span>系统将在一个工作日内处理</span></p>   
                    

                </div>
        
                <el-button>确认转出</el-button> 
            </el-tab-pane>
           
        </el-tabs>

         
            
              
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
    
}
.el-tabs.el-tabs--top.el-tabs--border-card{
    background: #fff;
    border: none;
    
    
    .el-tab-pane {
        
        
        .right{
            width: 10%;
            height: 40px;
            
            position:fixed;
            right: 0;
            top: 10px;
            
            i{
                
                height: 40px;
                line-height: 40px;
                vertical-align: middle;
                
            }
            
        }
    }  
    
}


.content{
    width: 70%;
    margin: 10px auto;
    

    P{
        width: 100%;
        display: flex;
        margin: 20px 0;
        span{
            width: 30%;
            display: block;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            line-height: 40px;
            color:rgba(102,102,102,1);
            margin-right: 5%;
        }
        .input{
            display: inline-block;
            width: 65%;
            
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
            width: 100%;
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:300;
            text-align: center;
            color:rgba(128,128,128,1);
            
        }

        
    }
    
}
.el-button{
        width:20%;
        margin-left: 40%;
        margin-right: 40%;
        margin-top: 40px;
        height:52px;
        background:rgba(65,118,216,1);
        border-radius:4px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);

    //    
    }
</style>