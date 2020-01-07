<template>
    <div class="hangqing">
        <div id="left"></div>
        <div class="tianchuang" v-if="istanchuang"></div>
        <div class="right">
            <div class="nav">
               <a name="hangqingbg" :class="panShow?'panShow':' '" @click="isPanShow(1)">内盘</a>
                <a name="hangqingbg" :class="!panShow?'panShow':' '" @click="isPanShow(2)">外盘</a>
            </div>
            <div class="zujian">
               <!-- <el-tabs
               type="border-card"
                tab-position="left">
                   <el-tab-pane label="内盘" name="内盘">
                       
                   </el-tab-pane>
                   <el-tab-pane label="外盘" name="外盘">
                       
                   </el-tab-pane>
               </el-tabs> -->
               
                 <el-tabs
                    v-model="activeName"
                    lazy
                    type="border-card"
                    value="自选"
                    tab-position="bottom"
                    id="tabs"
                    ref="tabs"
                 >
                      
                    <!-- <el-tab-pane v-for="(item,index) in msg" :key="index" :label = item.name :name="item.name">
                        <HangqingCP :msg="item.item"></HangqingCP>
                    </el-tab-pane> -->
                    <el-tab-pane  label = "自选" name="自选" >
                        <HangqingCP :msg='msg[0].item' :panShow='panShow'></HangqingCP>
                    </el-tab-pane>
                    <el-tab-pane  label = "上海能源INE" name="上海能源INE" v-if="panShow">
                        <HangqingCP :msg= msg[1].item :panShow='panShow'></HangqingCP>
                    </el-tab-pane>
                    <el-tab-pane  label = "中金所" name="中金所"  v-if="panShow">
                        <HangqingCP :msg= msg[2].item :panShow='panShow'></HangqingCP>
                    </el-tab-pane>
                    <el-tab-pane  label = "大宗商品" name="大宗商品"  v-if="panShow">
                        <HangqingCP :msg= msg[3].item :panShow='panShow'></HangqingCP>
                    </el-tab-pane>
                    <el-tab-pane  label = "瑞士EUREX" name="瑞士EUREX"  v-if="!panShow">
                        <HangqingCP :msg= msg[4].item :panShow='panShow'> </HangqingCP>
                    </el-tab-pane>
                    <el-tab-pane  label = "纽约COMEX" name="纽约COMEX"  v-if="!panShow">
                        <HangqingCP :msg= msg[5].item :panShow='panShow'></HangqingCP>
                    </el-tab-pane>
                    <el-tab-pane  label = "纽约NYMEX" name="纽约NYMEX"  v-if="!panShow">
                        <HangqingCP :msg= msg[6].item :panShow='panShow'></HangqingCP>
                    </el-tab-pane>
                    <el-tab-pane  label = "香港HKEX" name="香港HKEX"  v-if="!panShow">
                        <HangqingCP :msg= msg[7].item :panShow='panShow'></HangqingCP>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- main结束 footer开始 -->
            <div class="footer">
                <!-- <div class="foot1">
                
                    <router-link to="/hangqing" name="hangqingbg01">沪深A股</router-link>
                     <router-link to="/hangqing/hushenB" name="hangqingbg01">纽约CCMEX</router-link>
                     <router-link to="/hangqing/zhijiage" name="hangqingbg01">芝加哥CME</router-link>
                     <router-link to="/hangqing/meiguoice" name="hangqingbg01">美国ICE</router-link>
                     <router-link to="/hangqing/meiguoce" name="hangqingbg01">美国CE</router-link>
                     <router-link to="/hangqing/niuyueCOMN" name="hangqingbg01">纽约COMN</router-link>
                     <a  @click="showBox('/niuyueCOMN')">纽约COMN</a>
                   
                </div>  -->
               
                <div class="foot2">
                    <div class="left">
                       
                            <span style="color:rgba(255,255,255,1);">上证指数：</span><span>{{'0'}}</span><span>-1345.46</span><span>-2.90%</span>
                      
                        
                    </div>
                    <div class="foot2-right">
                        <span class="footBtn" @click="showBoxxiadan()">下单</span>
                        <!-- <span :class="!panShow?'footerPanShow':' '" @click="isPanShow()">外盘</span> -->
                        <!-- <span >
                            <img src="../../assets/img/hangqing/实时行情拷贝副本.png" >
                            <i class="el-icon-search"></i>
                            <input placeholder="合约代码/名称" v-model="input">
                        </span> -->
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
//import {ipcRenderer} from 'electron'
//const { BrowserWindow } = require('electron').remote
import {mapMutations,mapActions,mapGetters} from 'vuex';
import  _axios  from "../../assets/js/common";
// import { axios } from "axios";
import  HangqingCP  from "./componets/hangqingCP";
export default {
    
    name:'hangqing',
    data(){
        return{
            input:'',
            istanchuang:false,
            activeName:"自选",
            msg:null,
            panShow:true,
            newMsg:null,
            websock: null,
            active: 0,
				ellipsis: false,
				colors: ['yellow', 'fense', 'red'],
				list: [],
				uInfo: '',
				websockState: 0,
				isLoading: false,
				createTime: '无数据',
				nowHeyue:'自选',
				nowIndex:0,
				initList:{},
                spee:0.1,
                bottomMsg:{}
        }
    },
    computed: {
        // quoteData() {
        //     return this.$store.getters.quoteDataAC;
        // },
        // quoteStatus(){
        //     return this.$store.getters.quoteStatusAC;
        // },
        // initListMin(){
        //     let quoteData = this.$store.getters.quoteDataAC
        //     // console.log(quoteData)
        //     if(this.initList[quoteData.code]){
        //         let changePoint = this.initList[quoteData.code].changePoint
        //         this.initList[quoteData.code].point = quoteData.point
        //         this.initList[quoteData.code].changePoint = quoteData.changePoint
        //         this.initList[quoteData.code].initChangePoint = changePoint - quoteData.changePoint
        //         this.initList[quoteData.code].changeRate = quoteData.changeRate
        //     }
        //     return this.initList
        // }
    },
    methods:{
        tabChange(index,title){
            this.nowHeyue = title
            this.nowIndex = index
        },
        //内外盘切换
        isPanShow(e){
            if(e == 1){
                this.panShow = true
                // this.activeName = '上海能源INE'
            }else{
                this.panShow = false
                // this.activeName = '瑞士EUREX'
            }
            
        },
        async showBoxxiadan() {
            // console.log()
            if(JSON.parse(localStorage.getItem(this.$store.state.localStorageLogin))){
            if(this.$route.path == '/kline'){
                this.$store.state.isplaceOrder = !this.$store.state.isplaceOrder
            }else{
                let data = await this.$Win.openWin({
                // browserwindow原生属性
                width: 1400, // 窗口宽
                height: 516, // 窗口高
                resizable: true,  // 窗口是否可以改变尺寸
                // electron-vue-windows自定义的属性
                alwaysOnTop:true,
                windowConfig: {
                    router: "/moni", // 路由 *必填
                    data: {
                    id: 1
                    }, // 传送数据
                    name: "yidemoni", // 窗口名称
                    animation: "fromBottom"
                }
                });
            }
            }else{
            this.$confirm('未登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                // this.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
                // this.showBox('/login')
            })
            }
            
        
        },
        hangqingbgChange(){
            var navs = document.getElementsByName('hangqingbg')
            for(let i =0;i<navs.length;i++){
                navs[i].addEventListener("click",function(){
                    for(let j =0;j<navs.length;j++){
                        navs[j].className =""
                    }
                    
                    this.className='bgchange'
                    
                    //this.istanchuang =true
                })
                
            }
            var navs01 = document.getElementsByName('hangqingbg01')
            for(let i =0;i<navs01.length;i++){
                navs01[i].addEventListener("click",function(){
                    for(let j =0;j<navs01.length;j++){
                        navs01[j].className =""
                    }
                    
                    this.className='bgchange01'
                    
                    //this.istanchuang =true
                })
                
            }
        },
        // async showBox(type){
        //     //console.log(type)
        //     let data = await this.$Win.openWin({
        //         width:1200,
        //         height:600,
        //         windowConfig:{
        //             router:type,
        //             data:{},
        //             name:'纽约',
        //             animation:'formLeft'
        //          }
        //     })
           
        // },
        axiosPost(){
            this.$http.post('http://39.100.151.138:8082'+'/appapi/app/get',{       // 还可以直接把参数拼接在url后边
            'cmd': 'get_menu',
            // 'timestamp': new Date().getTime(),
            // 'UUID':uuid ,
            // 'token': uuid,
            }).then((res) =>{
                this.msg = res.data.msg
                // console.log(this.msg,"````````````````````")
                // this.$store.commit('setklineMsg',res.data.msg[0].item)
                // console.log(this.msg)
            }).catch(function (error) {
                console.log(error);
            });
            // console.log(this.$refs) 
            // this.newMsg = this.$store.state.market.quoteData
        },

    },
   

    mounted(){
        // console.log(this.$refs.tabs.$children[0].$refs.nav.children[0])
        // this.$refs.tabs.$children[0].$refs.tabs[2].style.display = "none"
    },
    created(){
        this.axiosPost();
        
    },
    
    computed:{
        changeAC(){
            return this.$store.getters.quoteDataAC
        },
      
    //     ...mapGetters([
    //         'quoteDataAC'
    //     ])
    },
    watch:{
        changeAC:function(val){
            // console.log(val)
        }
    },
    components:{
        HangqingCP
    }
}
</script>

<style lang="scss" scoped>
.hangqing{
    height: calc(100% - 60px);
    width: 100%;
    // display: flex;
    position: relative;
    .right{
        .panShow{
            background: linear-gradient(-45deg, transparent 15px, rgb(87, 89, 92) 0);
            // border: 1px solid #A4A4A4;
        }
    }
    
}

//选中样式
.bgchange{
            
    background: linear-gradient(-45deg,transparent 15px,rgb(34,48,76) 0)!important;
        }
.bgchange01{
            
    background: linear-gradient(-45deg,transparent 5px,rgb(34,48,76) 0)!important;
        }
.tianchuang{
    position:absolute;
    top:44px;
    left: 0px;
    width: 30px;
    height: 30px;
    background: #22304C;
}

#left{

    height:calc(100vh - 60px);
    width: 29px;
    background:#22272E !important;
    }
.right{
    // flex: 1;
    height: 100%;
    border: none;
    width: calc(100% - 29px);
    // display: flex;
    // flex-direction: column;
    position: absolute;
    left: 29px;
    top: 0;
    background:#000;
    .nav{
        position: absolute;
        top:130px;
        left: 0px;
        width: 22px;
        display: flex;
        //border-left: 1px solid #191B1F;
        flex-direction: column;
        a{
            display: block;
            text-decoration: none;
            color: #A4A4A4;
            font-family:Microsoft YaHei;
            text-shadow:0px 2px 1px rgba(19,20,22,1);
            font-weight:400;
            height: 40px;
            padding: 40px 2px; 
            z-index: 999;
            cursor: pointer;
        }
        a{
            border-radius: 0 4px 0px 0;
            background:linear-gradient(-45deg,transparent 15px,#22272E 0);
        }    
    }
    .zujian{
        
        height:calc(100vh - 113px);
        // width:98.8%;
        // margin-left: 22px; 
        padding: 0px;
          
        overflow-x: auto;
        overflow-y: auto;
        width: 100%;
        
        tr:hover{
            background-color: #22304C!important;
        }
    }
    .zujian::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
    }
    .zujian::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgb(34, 39, 46);
    }
    .zujian::-webkit-scrollbar-track {/*滚动条里面轨道*/
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        
        background: rgb(107, 107, 107);
    }
}
.footer{
    height: 27px;
    width: 100%;
    z-index: 999;
    position: absolute;
    bottom: 0px;
    left: 0;
    .foot1{
        height: 26px;

        background:rgba(30,33,38,1);
        a{
            text-decoration: none;
            line-height: 26px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:300;
            color:rgba(255,255,255,1);
            background:rgba(47,52,59,1);
            margin: 0 -1px;
            padding: 6px 10px;          
            border-radius: 0 0 8px 8px;
        }
    }
    .foot2{
        width: 100%;
        height: 27px;
        background:rgba(42,47,56,1);
        display: flex;
        justify-content: space-between;
        position: relative;
        .left{
            // float: left;
             height: 27px;
            //  flex: 1;
             position: relative;
             background: none;           
             span{
                font-size:14px;
                line-height: 27px;
                font-family:Microsoft YaHei;
                font-weight:300;
                color:rgba(0,189,0,1);
                padding: 0px 10px;
             }
        }
        .foot2-right{
            // position: absolute;
            // right: 0;
            // top: 0;
            height: 27px;
            // display:inline-block;
            background:rgba(42,47,56,1);
            .footBtn:hover{
                background: #22272E;
            }
            .footerPanShow{
                background:rgba(64,70,79,1);
                border:1px solid rgba(128,128,128,1);
            }
            span{
                line-height: 23px;   
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:300;
                color:rgba(144,147,153,1);
                padding: 0 22.5px;
                margin-top: 2px;
                border:1px solid rgba(128,128,128,1);
                background:rgba(42,47,56,1);
                display: inline-block;
                height: 23px;
                box-sizing: border-box;
                cursor: pointer;
                input{
                    background: rgba(42,47,56,1);
                    color: white;
                    border:1px solid rgba(128,128,128,1);
                }
                input:focus{outline:none;}
             
            }
            i{
                // width: 2%;
                display: inline-block;
                width: 18px;
                height: 17px;
                //background: red;
                vertical-align: middle;
                // padding: 6.8px 10px;
                margin-left: 4px;
            }
        }

    }
}
</style>

