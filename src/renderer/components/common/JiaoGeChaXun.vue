<template>
  <div class="jiaoge" id="jiaoge">
    <el-table
      :data="JiaoGeData"
      class="table01"
      tooltip-effect="light"
      highlight-current-row
    >
      <el-table-column prop="name" label="用户账号" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="start_money" label="期初金额" show-overflow-tooltip ></el-table-column>
      <el-table-column label="出入金" show-overflow-tooltip >
        <template slot-scope="scope">
          <span style="color: #DCDC0A;">{{scope.row.inoutvalue}}</span>
        </template>
      </el-table-column>
       <el-table-column label="平仓盈亏" show-overflow-tooltip >
        <template slot-scope="scope">
          <span :style="scope.row.pcyk > 0?'color: red':'color:green'">{{scope.row.pcyk}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sx" label="手续费" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="end_money" label="期末资金" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="jdate" label="结算日期" show-overflow-tooltip ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "jiaoge",
  props: ["Listheight",'value'],
  data() {
    return {
      JiaoGeData: [
        {
          userid: "8A89UA89976",
          startmoney: 19055,
          outorin: "出金",
          yinkui: "19055",
          shouxufei: 30,
          endmoney: 19055,
          jiesuandate: "06-03 12:34:13"
        },
        {
          userid: "8A89UA89976",
          startmoney: 19055,
          outorin: "出金",
          yinkui: "19055",
          shouxufei: 30,
          endmoney: 19055,
          jiesuandate: "06-03 12:34:13"
        },
        {
          userid: "8A89UA89976",
          startmoney: 19055,
          outorin: "出金",
          yinkui: "19055",
          shouxufei: 30,
          endmoney: 19055,
          jiesuandate: "06-03 12:34:13"
        },
        {
          userid: "8A89UA89976",
          startmoney: 19055,
          outorin: "出金",
          yinkui: "19055",
          shouxufei: 30,
          endmoney: 19055,
          jiesuandate: "06-03 12:34:13"
        }
      ]
    };
  },
  methods:{
    initJiaoge(){
      let _this = this
      let msg = JSON.stringify({
      userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
      startTime: this.changeValue[0]+' 00:00:00',
      endTime: this.changeValue[1]+' 23:59:59'
      })
      this.$pro.post('get_sellet_info',msg).then(function(res){
        console.log(res)
        if(res.result == 1){
          _this.JiaoGeData = res.msg
          // console.log(res.msg.data)
        }
        
      })
    }
  },
  created(){
    this.initJiaoge()
  },
 
    computed:{
    changeValue(){
      if(this.value){
        return  [new Date(this.value[0]).getFullYear()+'-'+new Date(this.value[0]).getMonth()+'-'+new Date(this.value[0]).getDate(),new Date(this.value[1]).getFullYear()+'-'+new Date(this.value[1]).getMonth()+'-'+new Date(this.value[1]).getDate()]
      }else{
        return  [new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()]
      }
      
    }
  
  },
   watch: {
    //  当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身相关元素的高度
    Listheight: {
      handler: function(Val, oldVal) {
        console.log('jiaoge///')
        document.getElementById("jiaoge").style.height = +Val + "px";
      }
    },
     changeValue:function(val){
      this.initJiaoge()
    }
  }
};
</script>
<style lang="scss" scoped>
#jiaoge{
  width: 100%;
  height: 100%;
   overflow-y: scroll;
  overflow-x: scroll;
  .el-table{
    background-color: transparent;
  }
}
#jiaoge::-webkit-scrollbar {
  // display: none;
  width: 10px; // 横向滚动条
  height: 10px;
}
#jiaoge::-webkit-scrollbar-corner {
  display: none;
//  background: rgba(34, 39, 46, 1);
}
#jiaoge::-webkit-scrollbar-thumb {
  background-color: rgba(34,48,76,1);
  width: 6px; // 横向滚动条
  height: 6px;
}
</style>