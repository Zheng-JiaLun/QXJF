<template>
    <div class="gendan">
        <div class="content">
            <h2>我的跟单</h2>
            <div class="xuanze">
                <ul class="left">
                    <li @click="show =1" name="wodegendan">跟随账户</li>
                    <li @click="show =2" name="wodegendan">跟随策略</li>
                    <li @click="show =3" name="wodegendan"> 跟单者</li>
                </ul>
                <ul class="right">
                    <el-select v-model="value" placeholder="请选择时间" @change="showMess(value)">
                        <el-option v-for="(item) in options" :key="item.value" :label="item.label" :value="item.value" >
                        </el-option>
                     </el-select>
                </ul>
            </div> 
            <!-- 多选框出现 跟随订单-->
            <div class="message" v-if="show == 1">
                 <el-table :data="tableData" style="width: 100%;text-align: center;" :row-style="rowSy" :cell-style="cellSY" >
                       <el-table-column
                        prop="name"
                        label="账户信息"
                        width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="shoushu"
                        label="手数">
                        </el-table-column>
                        <el-table-column
                        prop="gensuijin"
                        label="跟随金额">
                        </el-table-column>
                        <el-table-column
                        prop="shouyi"
                        label="收益">
                        </el-table-column>
                        <el-table-column
                        prop="zuidahuiche"
                        label="最大回撤">
                        </el-table-column>
                        <el-table-column
                        prop="shouyilv"
                        label="收益率">
                        </el-table-column>
                        <el-table-column
                        prop="zhanghupingji"
                        label="账户评级">
                        </el-table-column>
                        
                        <el-table-column
                        prop="date"
                        label="日期"
                        >
                        </el-table-column>
                    
                    
                </el-table>
            </div>
                <!-- 跟随策略框 -->
             <div class="message" v-if="show == 2">
                 <el-table :data="celueData" style="width: 100%;text-align: center;" :row-style="rowSy" :cell-style="cellSY">
                       <el-table-column
                        prop="name"
                        label="账户信息"
                        width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="shoushu"
                        label="手数">
                        </el-table-column>
                        <el-table-column
                        prop="gensuijin"
                        label="跟随金额">
                        </el-table-column>
                        <el-table-column
                        prop="shouyi"
                        label="收益">
                        </el-table-column>
                        <el-table-column
                        prop="zuidahuiche"
                        label="最大回撤">
                        </el-table-column>
                        <el-table-column
                        prop="shouyilv"
                        label="收益率">
                        </el-table-column>
                        <el-table-column
                        prop="zhanghupingji"
                        label="账户评级">
                        </el-table-column>
                        
                        <el-table-column
                        prop="date"
                        label="日期"
                        >
                        </el-table-column>
                </el-table>
            </div>
                <!-- 跟随者内容部分 -->
             <div class="message" v-if="show == 3">
                 <el-table :data="gensuizheData" style="width: 100%;text-align: center;" :row-style="rowSy" :cell-style="cellSY">
                       <el-table-column
                        prop="name"
                        label="账户信息"
                        width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="shoushu"
                        label="手数">
                        </el-table-column>
                        <el-table-column
                        prop="gensuijin"
                        label="跟随金额">
                        </el-table-column>
                        <el-table-column
                        prop="shouyi"
                        label="收益">
                        </el-table-column>
                        <el-table-column
                        prop="zuidahuiche"
                        label="最大回撤">
                        </el-table-column>
                        <el-table-column
                        prop="shouyilv"
                        label="收益率">
                        </el-table-column>
                        <el-table-column
                        prop="zhanghupingji"
                        label="账户评级">
                        </el-table-column>
                        
                        <el-table-column
                        prop="date"
                        label="日期"
                        >
                        </el-table-column>
                    
                    
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        show:1,
        options: [{
          value: '近一个月',
          label: '近一个月'
        }, {
          value: '近三个月',
          label: '近三个月'
        }, {
          value: '近半年',
          label: '近半年'
        }, {
          value: '近一年',
          label: '近一年'
        },],
        value: '',
        tableData: [{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:8990.89,
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:8990.89,
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:8990.89,
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:8990.89,
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12.45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:8990.89,
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:8990.89,
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'8990.89',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },],

        celueData: [{
        name: '稳赢外汇名称',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '稳赢外汇名称',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '稳赢外汇名称',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '稳赢外汇名称',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12.45',
        },{
        name: '稳赢外汇名称',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '稳赢外汇名称',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '稳赢外汇名称',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },],

        gensuizheData: [{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12.45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },{
        name: '大猪蹄子2',
        shoushu:'89',
        gensuijin:'按比例10倍',
        shouyi:8900.8,
        zuidahuiche:'8.98%',
        shouyilv:'90%',
        zhanghupingji:'A+',
        date: '2019-10-02 12:45',
        },],
        }
    },
    methods:{
        showMess(a){
            alert(a)
        },
        rowSy({row, rowIndex}){
            if(rowIndex == 0||rowIndex == 2||rowIndex == 4||rowIndex == 6||rowIndex == 8){
                return 'background:rgba(30,35,41,1);'
            }
        },
        cellSY({row, column, rowIndex, columnIndex}){
            if(columnIndex ==3||columnIndex ==5){
                return 'color:rgba(235,52,37,1);'
            }
        },
        gendanChange(){
            var navs = document.getElementsByName("wodegendan")
            for(var m =0;m<navs.length;m++){
                navs[m].addEventListener("click",function(){
                    for(var n=0;n<navs.length;n++){
                        navs[n].className='wodegendan'
                    }
                    this.className ='zhengchangwode'
                })
            }
        }

    },
    mounted(){
        this.gendanChange()
    }
}
</script>
<style lang="scss" scoped>
.gendan{
    width: 100%;

}
.wodegendan{
    
    border-radius:7px;
    border: none
    
}
.zhengchangwode{
    border: none!important;;
    border-radius:7px;
    background:rgba(34,48,76,1);
    color:rgba(255,255,255,1);
}
.content{
    width: 90%;
    margin: auto;
    h2{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(65,118,216,1);
        line-height:21px;
        
        
    }
    .xuanze{
        width: 100%;
        display: flex;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        .left{
            padding: 0;
            width: 50%;
            float: left;
            display: flex;
            list-style: none;
            li{ 
                height: 14px;
                margin: 0 10px;
                padding: 5px 10px;
                border:1px solid rgba(230,230,230,1);
                border-radius:7px;
                cursor: pointer;
            }
            
        }
        .right{
            float: right;
            .el-input__inner{
              background: black !important;
            }
            .el-select-dropdown{
                background: black !important;
            }
        }
    }
    .message{
        .el-table{
            background: none;
            tr{
                background: none;
            }
        }
    }
}
</style>