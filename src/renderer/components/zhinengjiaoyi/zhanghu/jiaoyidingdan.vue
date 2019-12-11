<template>
    <div class="dingdan">
        <h6>
            <p>持仓手速<span style="color:#EB3425">9</span>手</p>
            <p>浮动收益<span style="color:#EB3425">+9288</span></p>
        </h6>
        <el-tabs type="card" >
            <el-tab-pane label="历史交易">
                <el-table :data="tableData" style="width: 100%" tooltip-effect="light" highlight-current-row>
                    <el-table-column prop="date" label="合约名称">
                        <template  slot-scope="scope">
                            <div style="color: #DCDC0A;">
                                {{scope.row.date}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="合约代码">
                        <template  slot-scope="scope">
                            <div style="color: #DCDC0A;">
                                {{scope.row.name}}
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="zhiying" label="止盈"></el-table-column>
                    <el-table-column prop="zhisun" label="止损"></el-table-column>
                    <el-table-column prop="shoushu" label="手数"></el-table-column>
                    <el-table-column prop="kaicangshijian" label="开仓时间"></el-table-column>
                    <el-table-column prop="pingcangjiage" label="平仓价格"></el-table-column>
                    <el-table-column prop="huoli" label="获利">
                        <template  slot-scope="scope">
                            <span style="color: #EB3425">
                                {{scope.row.huoli}}
                            </span>
                        </template>
                    </el-table-column>
               </el-table>
            </el-tab-pane>


            <el-tab-pane label="正在交易">
                 <el-table :data="tableData" style="width: 100%" >
                    <el-table-column prop="date" label="合约名称" >
                        <template slot-scope="scope">
                            <span style="color:rgba(220,220,10,1);">
                                {{scope.row.date}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="合约代码">
                        <template slot-scope="scope">
                            <span style="color:rgba(220,220,10,1);">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="zhiying" label="止盈"></el-table-column>
                    <el-table-column prop="zhisun" label="止损"></el-table-column>
                    <el-table-column prop="shoushu" label="手数"></el-table-column>
                    <el-table-column prop="kaicangshijian" label="开仓时间">
                    </el-table-column>
                    <el-table-column prop="pingcangjiage" label="平仓价格">
                         <template slot-scope="scope">
                            <span style="color:rgba(48,113,232,1);">
                                {{scope.row.pingcangjiage}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="huoli" label="获利">
                        <template  slot-scope="scope">
                            <span style="color: #EB3425">
                                {{scope.row.huoli}}
                            </span>
                        </template>
                    </el-table-column>
               </el-table>
            </el-tab-pane>
  
        </el-tabs>
    </div>
</template>

<script>
export default {
    data(){
        return{
           tableData: [{
            date: '恒生1905',
            name: 'HS1905',
            address: '买入',
            zhiying:1099,
            zhisun:8188,
            shoushu:40,
            kaicangshijian:'05/20 13.23',
            pingcangjiage:8899,
            huoli:9288

          }, {
            date: '恒生1905',
            name: 'HS1905',
            address: '买入',
            zhiying:1099,
            zhisun:8188,
            shoushu:40,
            kaicangshijian:'05/20 13.23',
            pingcangjiage:8899,
            huoli:9288

          }, {
            date: '恒生1905',
            name: 'HS1905',
            address: '买入',
            zhiying:1099,
            zhisun:8188,
            shoushu:40,
            kaicangshijian:'05/20 13.23',
            pingcangjiage:8899,
            huoli:9288

          }, ]
            
                
        }
    },

}
</script>

<style lang="scss" scoped>
.dingdan{
    width: 100%;
}
h6{
    display: flex;
    margin: 0px;
    p{

        font-size:10px;
        font-family:Microsoft YaHei;
        font-weight:300;
        color:rgba(232,232,232,1);
        padding-right: 20px;
        span{
            padding: 0 10px;
        }
    }
}
.el-tabs{
    .el-tab-pane{
        border: none;
    }
}
table{
    width: 100%;
    thead{
        width: 100%;
        th{ 
            text-align: left;
            width: 4%;
            font-size:10px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(179,179,179,1);
        }
    }
    }
</style>