<template>
    <div class="zhuye">
        <div class="top">
            <div class="left">
                <img src="../../../assets/work.png" style="dispaly:block;height:40px;width:40px;margin-right:20px;border-radius:50%;">
                <div class="name">
                    <h2>用户001</h2>
                    <p>个人简介：13的手工实战经验，7年的程序化交易经验，目前已经形成了稳定的量化对冲交易系统。内心对市场永远存有敬畏，交易如薄冰。</p>
                </div>
            </div>
            <div class="right">
                <button><i class="el-icon-plus"></i><span>关注</span></button>
                <ul>
                    <li>
                        <p>关注</p>
                        <p>713</p>
                    </li>
                    <li>
                        <p>粉丝</p>
                        <p>9000</p>
                    </li>
                    <li>
                        <p>人气</p>
                        <p>1000</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="middle">
            <div class="pingji">
                <div class="left">
                    <div class="top">
                        <p>交易员<span>用户001</span></p>
                        <p>近13周账户评级<span style="color:#EB3425;">优秀</span></p>
                    </div>
                    <div class="mid">
                        <h3>交易策略</h3>
                        <p>寻找市场情绪高涨，或到达强烈阻力位的货币对，适机开仓，期间存在价位调整、追涨杀跌、平手保护等操作，最大仓位不高于10倍杠杆（比如10000的账户最大不超过1手），日回报0.5-1%。月订单数10-20</p>
                    </div>
                    <div class="buttom">
                         <li>
                                <p style="color:rgba(235,52,37,1);">95%</p>
                                <p>收益率</p>
                            </li>
                            <li>
                                <p>0.24</p>
                                <p>净值盈亏比</p>
                            </li>
                            <li>
                                <p>30周</p>
                                <p>交易时间</p>
                        </li>
                    </div>
                </div>
                <div class="right">
                    <ul>
                        <li><p>6.9</p><p>盈利能力</p></li>
                        <li><p>4.9</p><p>资金规模</p></li>
                        <li><p>9.9</p><p>风控能力</p></li>
                    </ul>
                </div>
            </div>
            
        </div>
       <el-tabs type="card">
            <el-tab-pane label="交易分析">
                <jiaoyifenxi></jiaoyifenxi>
                </el-tab-pane>
            <el-tab-pane label="交易订单">
                <jiaoyidingdan></jiaoyidingdan>
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<script>
import jiaoyidingdan from "../../../components/zhinengjiaoyi/zhanghu/jiaoyidingdan"
import jiaoyifenxi from "../../../components/zhinengjiaoyi/zhanghu/jiaoyifenxi"
export default {
    data(){
        return{

        }
    },
    methods:{
      
    },
    components:{
        jiaoyidingdan,
        jiaoyifenxi
    }
}
</script>
<style lang="scss" scoped>
.zhuye{
    width: 100%;
    margin: 20px auto;
    
}
.top{
    width: 90%;
    margin: 0px auto;
    display: flex;
    height: 80px;
    .left{
       width: 60%;
       display: flex;
       background: none; 
       
       img{
           width: 10%;
           background: #4179d6
           

       }
       .name{
           width: 90%;
           
           h2{
               margin-top: 4px;
               text-align: left;
               font-size:12px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
               
               
           }
           p{
               font-size:10px;
                font-family:Microsoft YaHei;
                font-weight:300;
                color:rgba(234,233,233,1);
                line-height:12px;
                text-align:left;
                line-height: 16px;
                
                
            }
       }
    }
    .right{
        width: 40%;
        margin-left: 20%;
        button{
            
            margin-left: 40%;
            background:rgba(40,55,83,1);
            border-radius:1px;
            border: none;
        }
        ul{
            list-style: none;
            display: flex;
            
            li{
                width: 20%;
                
                p{  
                    margin: 5px;
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(194,194,194,1);
                }
            }
        }
        
    }
}
.middle{
    
    width: 90%;
    margin: 0px auto 10px auto;
    .pingji{
        height:200px;
        width: 60%;
        background:rgba(30,35,41,1);
        border-radius:4px;
        display: flex;
        .left{
            width:60%;
            .top{
                height: 12%;
                display: flex;
                p{  width: 40%;
                    font-size:10px;
                    font-family:Microsoft YaHei;
                    font-weight:300;
                    color:rgba(210,210,210,1);
                    line-height:18px;
                    span{
                        padding-left: 10px;
                    }
                }
            }
            .mid{
                margin-left: 5%;
                h3{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:18px;
                }
                p{
                   font-size:10px;
                    font-family:Microsoft YaHei;
                    font-weight:300;
                    color:rgba(210,210,210,1);
                    line-height:18px; 
                }
            }
            .buttom{
                margin-left: 5%;
                display: flex;
                li{
                    width: 35%;
                    list-style-type: none;
                    p{
                        font-size:11px;
                        font-family:Microsoft YaHei;
                        font-weight:300;
                        color:rgba(153,153,153,1);
                        line-height:13px;
                    }
                }
            }
        }
        .right{
            width:40%;
            
            ul{
                list-style: none;
                width: 40%;
                margin: 20px auto;
                li{
                    p{
                        text-align: right;
                        font-size:11px;
                        font-family:Microsoft YaHei;
                        font-weight:300;
                        color:rgba(153,153,153,1);
                        line-height:13px; 
                    }
                }
            }
        }
    }
}
.el-tabs{
    width: 95%;
    margin-left: 5%;

    
    //background: none;
    .el-tabs__header>.is-top{
        border-bottom:none;
    }
}
.el-tabs--card>.el-tabs__header{
    border-bottom:none!important;
}



</style>