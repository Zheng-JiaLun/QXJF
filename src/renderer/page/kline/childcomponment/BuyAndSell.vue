<template>
  <div class="transaction flex">
    <!-- 买入卖出组件的展示区域 -->
    <div class="cont">
      <!-- 买入卖出组件顶部下拉选择框展示区域 -->
      <div class="top flex">
        <!-- 左边下拉选择框 -->
        <el-select
          class="select"
          v-model="heyue.heyueClass"
          placeholder="请选择"
          @change="heyueChange"
        >
          <el-option
            v-for="(item, index) in heyueClassOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- 右边下拉选择框 -->
        <el-select class="select" v-model="heyue.heyueName" placeholder="请选择" @change="heyueNameCh">
          <el-option
            v-for="(item, index) in heyueNameOptions"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <!-- 合约名字展示框 -->
      <div class="heyue flex">
        <span>合约：</span>
        <input class="heyueInput" type="text" readonly='true' :value="heyue.heyueName"/>
        <!-- <span class="span">{{heyue.heyueName}}</span> -->
      </div>
      <!-- 相关操作展示区域 -->
      <div class="input flex">
        <div class="cl flex">
          <span>跟盘:</span>
          <el-input class="inner" placeholder v-model="gen" clearable></el-input>
        </div>
        <div class="cl flex">
          <span>数量:</span>
          <el-input class="inner" placeholder v-model="num" clearable></el-input>
        </div>
        <div class="cl flex">
          <span>止盈:</span>
          <el-input class="inner" placeholder v-model="stopPrint" clearable></el-input>
        </div>
        <div class="cl flex">
          <span>止损:</span>
          <el-input class="inner" placeholder v-model="stopLoss" clearable></el-input>
        </div>
      </div>
      <!-- 底部买入卖出按键展示区域 -->
      <div class="button flex">
        <div class="buttonChildL">
          <el-button type="danger" @click="guadan(1)">买入</el-button>
        </div>
        <div class="buttonChildR">
          <el-button type="primary" @click="guadan(2)">卖出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "transaction",
  data() {
    return {
      gen: 88888,
      num: 666,
      stopPrint: 55555,
      stopLoss: 9999,
      heyue: {
        heyueClass: "",
        heyueName: ""
      },
      heyueClassOptions: [
        {
          id: "交易所一",
          subject: [
            { name: 11 },
            { name: 12 },
            { name: 13 },
            { name: 14 },
            { name: 15 }
          ]
        },
        {
          id: "交易所二",
          subject: [
            { name: 21 },
            { name: 22 },
            { name: 23 },
            { name: 24 },
            { name: 25 }
          ]
        },
        {
          id: "交易所三",
          subject: [
            { name: 31 },
            { name: 32 },
            { name: 33 },
            { name: 34 },
            { name: 35 }
          ]
        },
        {
          id: "交易所四",
          subject: [
            { name: 41 },
            { name: 42 },
            { name: 43 },
            { name: 44 },
            { name: 45 }
          ]
        }
      ],
      heyueNameOptions: []
    };
  },
  methods: {
    guadan(type){
      if(type == 1){

      }else{
        
      }
    },
    heyueChange(value) {
      for (var i = 0; i < this.heyueClassOptions.length; i++) {
        if (value === this.heyueClassOptions[i].id) {
          this.indexNum = i;
          break;
        }
      }
      this.heyueNameOptions = this.heyueClassOptions[this.indexNum].subject;
      this.heyue.heyueClass = value;
      this.heyue.heyueName = this.heyueClassOptions[
        this.indexNum
      ].subject[0].name;
    },
    heyueNameCh(value) {
      this.heyue.heyueName = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.transaction::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.7);
    background: rgb(29,33,37);
}
.transaction::-webkit-scrollbar-track {/*滚动条里面轨道*/
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgb(39,44,50);
}
.transaction::-webkit-scrollbar{
  height: 8px;
  width: 8px;
}
.transaction {
  overflow-x: auto;
  .flex {
    display: flex;
  }
  .cont {
    width: 85%;
    margin: 0 auto;
    height: 100%;
    min-width: 300px;
    color:#b7b7b7;
    .top {
      padding: 5% 0;
      .select {
        flex: 1;
        margin-right: 10px;
      }
    }
    .heyue {
      color: #b7b7b7;
      span:first-child {
        color:#b7b7b7;
        width: 13.5%;
        height: 37px;
        line-height: 37px;
        font-size: 12px;
      }
      .heyueInput {
        flex:1;
        height: 37px;
        line-height: 37px;
        background: #191B1F;
        color: #b7b7b7;
        font-size: 14px;
        text-indent: 10px;
        margin-right: 10px;
        border:1px solid rgba(67,67,67,1);
        border-radius: 2px;
      }
    }
    .input {
      display: flex;
      flex-wrap: wrap;
      margin-right: 10px;
      justify-content:space-between;
      .cl {
        width: 45%;
        padding: 5% 0;
        span {
          font-size: 12px;
          line-height: 40px;
          width: 30%;
          color: #b7b7b7;
          flex-shrink: 0;
        }
        input {
          line-height: 100%;
          margin-right: 50px;
          width: 70%;
        }
        .inner{
          width: 70%;
        }
      }
    }
    .button {
      margin: 5% 0;
      padding-top: 1%;
      .buttonChildL {
        flex: 1;
        text-align: right;
        margin-right: 3%;
      }
      .buttonChildR {
        flex: 1;
        text-align: left;
        margin-left: 3%;
      }
      .el-button {
        width: 80%;
        height: width/4;
      }
      .el-button--danger {
        background-color: rgba(230, 38, 21, 0.788);
        border-color: rgba(230, 38, 21, 0.788);
      }
      .el-button--danger:hover{
        background-color: rgba(151, 26, 14, 0.788);
        border-color: rgba(151, 26, 14, 0.788);
      }
      .el-button--primary {
        background-color: #078307;
        border-color: #078307;

      }
      .el-button--primary:hover{
        background-color: #085808;
        border-color: #085808;
      }
    }
  }
}
</style>
