<template>
  <div id="minute" ref="minute">

  </div>
</template>

<script>
import  HQChart  from "../../../jscommon/umychart.vue/umychart.vue.js";
// import  HQChart  from "../../../jscommon/umychart.vue/umychart.vue(2).js";
export default {
    name:'timeSLine',
     props:["candleHeight",'candleWidth','toChildOption','islogin','isdownload'],
    data(){
        return{
            Symbol:"600000.sh",
            Line:
            {
                JSChart:null,
                Option:this.toChildOption,
            }
           
           
        }
    },
   
    mounted(){
        this.OnSize();
        //  JSComplier.SetDomain('https://xxxx.abc.com');
        // HQChart.SetDomain('http://39.100.151.138:8082');
        // window.onresize = ()=> { this.OnSize(); }//组件内部无法监听窗口变化
        this.CreateMinuteChart();
    },
    methods:{
         OnSize()
        { 
            var chartWidth = window.innerWidth-(window.innerWidth*0.18);
            if(this.isdownload){
                if(this.changeislogin){
                    var chartHeight = (window.innerHeight-115)/2;
                }else{
                    var chartHeight = (window.innerHeight-115);
                }
            }else{
                 var chartHeight = (window.innerHeight-145);
            }
            
           
            
            var minute=this.$refs.minute;
            minute.style.width=chartWidth+'px';
            minute.style.height=chartHeight+'px';
             if (this.Line.JSChart) this.Line.JSChart.OnSize();
        },

        CreateMinuteChart() //创建日线图
        {
            if (this.Line.JSChart) return;
            this.Line.Option.Symbol=this.Symbol;
            let chart=HQChart.JSChart.Init(this.$refs.minute);

             var blackStyle=HQChart.HQChartStyle.GetStyleConfig(1); //读取黑色风格配置
            // console.log(this.ref.kline.style)
            HQChart.JSChart.SetStyle(blackStyle);

            chart.SetOption(this.Line.Option);
            this.Line.JSChart=chart;
            this.$emit("function",this.Line.JSChart)//传递数据给父组件（传着玩儿的）
        },
    },
    computed:{
        klineData() {
            return this.$store.getters.kDataSocket
        },
        changeCode(){
            return this.$store.state.chanpinInfo
        },
        changewindows(){
            return this.toChildOption.Windows[0].Index?this.toChildOption.Windows[0].Index:''
        },
        changeislogin(){
            return this.islogin
        },
        changeisdownload(){
            return this.isdownload
        }
    },
    watch: {
        
        'candleHeight'() {
            
            console.log('高度变化')
                this.OnSize();
        },
        'candleWidth'(){
                console.log('宽度变化')
                this.OnSize();
        },
        'toChildOption.KLine.Period'(e){
            // console.log(e)
            console.log(this.Line.JSChart)
             this.Line.JSChart.ChangePeriod(e);
        },
        changewindows(e){
            console.log(e)
            this.Line.JSChart.ChangeIndex(1,e);
        },
        klineData: {
            handler: function(val, oldVal) {
                var flag = 0;
                if (val.code == this.$store.state.chanpinInfo) {//this.proInfo.code
                    flag++;
                    if (flag == 1) {
                        // console.log('更新了');
                        //this.mySetInterval();
                    }
                        this.$store.state.realTimeData=val;
                        this.$store.state.isDataChange=true;
                    //this.kData.socketData = val;
                    //this.updataKline();
                }
            },
            deep: true
        },
        changeislogin:function(val){
            console.log(val)
            this.OnSize();
        },
        changeisdownload:function(val){
            this.OnSize();
        },
        // changeCode:function(){
        //     this.CreateMinuteChart()
        //     // console.log("k线监听code````````",this)
        // }
    }
}
</script>

<style lang="scss" scoped>
    #minute{
        margin: 0 auto;
    }
</style>