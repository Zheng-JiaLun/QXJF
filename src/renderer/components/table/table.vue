<template>
    <div>
        <el-table 
        :data="fatherData"
        max-height="376px"
        style="width: 100%;"
        highlight-current-row
        >
            <el-table-column prop="number" label="序号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="合约" show-overflow-tooltip></el-table-column>
            <el-table-column prop="business" label="买卖" show-overflow-tooltip></el-table-column>
            <el-table-column prop="position" label="总持仓" show-overflow-tooltip></el-table-column>
            <el-table-column prop="position_price" label="持仓价格" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:"tables",
    data(){
        return {
            fatherData:this.msg,
        }
    },
    props:["msg"],
        
    
    beforeCreate: function() {
        // 组件创建之前
        // console.log(this.msg);
    },
    created: function() {
        // 组件创建之后

        // 使用该组件，就会调用created方法 在created这个方法中可以操作后端的数据，数据响应视图
        // 应用： 发起ajax请求
        // console.log(this.option);
        // this.option = '改变了吧'
    },
    beforeMount: function() {
        // 挂载数据到DOM之前会调用
        
    },
    mounted: function() {
        // 挂载数据到DOM之后会调用  Vue 作用以后的DOM
       
       console.log(this.msg);
       console.log(this.fatherData);
    },
    beforeUpdate() {
        // 在更新DOM之前 调用此钩子函数 应用：可以获取原始的DOM
       
    },
    updated() {
        // 在更新DOM之后 调用此钩子函数 应用：可以获取最新的DOM
      
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    },
    activated() {
        console.log('组件被激活了');
    },
    deactivated() {
        console.log('组件被停用了');
    }

}
</script>

<style>

</style>
