<template>
    <div class="niuyuechicang">
            <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">

                <el-table-column
                property="bianhao"
                label="编号"
                width="120">
                </el-table-column>

                <el-table-column
                property="date"
                label="日期"
                width="120">
                </el-table-column>
                <el-table-column
                property="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                property="address"
                label="止盈止亏">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px" @click="dialogTableVisible = true">{{ scope.row.address}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 弹窗部分开始 -->
            <el-dialog title="客户端止损止盈" :visible.sync="dialogTableVisible" center>
                <p>正在修改（合约:HKEX   方向:卖出）持仓对应的止损止盈单信息</p>
                <el-table :data="gridData">
                    <el-table-column property="date" label="日期" width="150"></el-table-column>
                    <el-table-column property="name" label="姓名" width="200"></el-table-column>
                    <el-table-column property="address" label="地址"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
      return {
            tableData: [{
                bianhao:'MHI1905',
                date: '2016-05-02',
                name: '王小虎',
                address: '点击设置'
                }, {
                bianhao:'MHI1905',
                date: '2016-05-04',
                name: '王小虎',
                address: '点击设置'
                }, {
                bianhao:'MHI1905',    
                date: '2016-05-01',
                name: '王小虎',
                address: '点击设置'
                }, {
                bianhao:'MHI1905',
                date: '2016-05-03',
                name: '王小虎',
                address: '点击设置'
                }],
                currentRow: null,
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            dialogTableVisible: false,
            dialogFormVisible: false,
         }
    },
    methods:{
        handleCurrentChange(val) {
            this.currentRow = val;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>