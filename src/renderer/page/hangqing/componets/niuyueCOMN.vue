<template>
    <div class="niuyue">
        纽约COMN
         <!-- <header>
           <span>易得模拟_71376613</span>
           <span>权益：900.000</span>
           <span>可用资金：900.000</span>
           <span>资金使用率：0.00%</span>
           <i class="el-icon-arrow-down" @click="closeWinC" style="float:right"></i>
           <i class="el-icon-sort" @click="closeWinC" style="float:right"></i>
        </header>
        <div class="content">
            <div class="left">买多 卖空 开平</div>
            <div class="right">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="background:rgba(30,35,41,1);">
                    <el-tab-pane label="持仓" name="first">
                        <nueyuechicang></nueyuechicang>
                    </el-tab-pane>
                    <el-tab-pane label="委托" name="second">委托</el-tab-pane>
                    <el-tab-pane label="成交" name="third">成交</el-tab-pane>
                    <el-tab-pane label="预备单" name="fourth">预备单</el-tab-pane>
                </el-tabs>
            </div>
        </div> -->
       
    </div>
</template>

<script>
import nueyuechicang from '../componets/nueyuechicang'
export default {
    data(){
        return{
             activeName: 'second'
        }
    },
    components:{
        nueyuechicang,
    },
    methods:{
        closeWinC(){
            let win = this.$Win.getWinByName('niuyueCOMN')
            
            this.$Win.closeWin(win)
        },
        handleClick(tab, event) {
           //console.log(tab, event);
        }
    }
}
</script>

<style lang="scss" scoped>
.niuyue{
    width:100%;
    height: 100%;
    margin: 0;
    padding: 0;
    color: #fff;
    
    
}
header{
    height:50px;
    
    background:rgba(42,47,56,1);

    span,i{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:300;
        color:rgba(255,255,255,1);
        line-height: 50px;
        padding: 0 1%;
    }
}
.content{
    background:rgba(47,52,59,1);
    height: calc(100vh - 50px);
    width: 100%;
    display: flex;
    justify-content: space-around;

    .left{
        width: 30%;
        border:1px solid rgba(0,0,0,1);
    }
    .right{
        width:60%;
        border:1px solid rgba(0,0,0,1);
    }
}
</style>