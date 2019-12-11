<template>
    <div class="neipan">
        <div class="tianchong"></div>
        <table cellspacing=0>
            <thead>
                <th v-for="item in headList" :key="item.id">{{item.title}}</th>
            </thead>
            <tbody>
                <tr v-for="(item,index) in bodyList" :key="item.id" @click="hangqingbg(index)" :style="{background:isactive == index?'#22304C':''}">
                    <td style="color:rgba(179,179,179,1);">{{item.xuhao}}</td>
                    <td style="color:rgba(220,220,10,1) min-width:80px;"  :title="item.heyuemingcheng">{{item.heyuemingcheng}}</td>
                    <td style="color:rgba(220,220,10,1);">{{item.heyuedaima}}</td>
                    <td :style="item.zuixinjia >=60?'color:rgba(255,51,34,1);':'color:rgba(0,189,0,1);'">{{item.zuixinjia}}</td>
                    <td style="color:rgba(255,51,34,1);">{{item.maijia}}</td>
                    <td style="color:rgba(153,153,153,1);">{{item.mailiang}}</td>
                    <td style="color:rgba(153,153,153,1);">{{item.chengjiaoliang}}</td>
                    <td :style="item.zhangdie >0?'color:rgba(255,51,34,1);':'color:rgba(0,189,0,1);'">{{item.zhangdie}}</td>
                    <td :style="item.zhangdie >0?'color:rgba(255,51,34,1);':'color:rgba(0,189,0,1);'">{{item.zhangfu}}</td>
                    <td style="color:rgba(0,189,0,1);">{{item.kaipan}}</td>
                    <td>{{item.zuoshoupan}}</td>
                    <td style="color:rgba(255,51,34,1);">{{item.zuigao}}</td>
                    <td style="color:rgba(0,189,0,1);">{{item.zuidi}}</td>
                    <td>{{item.chicangliang}}</td>
                    <td style="color:rgba(48,113,232,1);">{{item.jiesuanjia}}</td>
                    <td>{{item.zhangting}}</td>
                    <td>{{item.dieting}}</td>
                    <td>{{item.zuochicang}}</td>
                    <td style="color:rgba(220,220,10,1);">{{item.zuojiesuan}}</td>
                    <td>{{item.chengjiaozongjia}}</td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name:'neipan',
    data(){
        return{
            // id 0.0001-0.00020
            isactive:-1,
            headList:[
                {
                    id:'0.0001',
                    title:'序号'
                },
                {
                    id:'0.0002',
                    title:'合约名称'
                },
                {
                    id:'0.0003',
                    title:'合约代码'
                }, 
                {
                    id:'0.0004',
                    title:'最新价'
                },
                {
                    id:'0.0005',
                    title:'买价'
                }, 
                {
                    id:'0.0006',
                    title:'买量'
                },
                {
                    id:'0.0007',
                    title:'成交量'
                }, 
                {
                    id:'0.0008',
                    title:'涨跌'
                },
                {
                    id:'0.0009',
                    title:'涨幅%'
                },
                {
                    id:'0.00010',
                    title:'开盘'
                }, 
                {
                    id:'0.00011',
                    title:'昨收盘'
                }, 
                {
                    id:'0.00012',
                    title:'最高'
                }, 
                {
                    id:'0.00013',
                    title:'最低'
                },
                {
                    id:'0.00014',
                    title:'持仓量'
                }, 
                {
                    id:'0.00015',
                    title:'结算价'
                },
                {
                    id:'0.00016',
                    title:'涨停'
                }, 
                {
                    id:'0.00017',
                    title:'跌停'
                },
                {
                    id:'0.00018',
                    title:'昨持仓'
                }, 
                {
                    id:'0.00019',
                    title:'昨结算'
                },
                {
                    id:'0.00020',
                    title:'成交总价'
                },                         
            ],
            bodyList:[
                {
                    id:'0.00020',
                    xuhao:1,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,

                    
                },
                {
                    id:'0.00021',
                    xuhao:2,
                    heyuemingcheng:'小恒生1905',
                    heyuedaima:'CL1906',
                    zuixinjia:90.12,
                    maijia:90,
                    mailiang:10,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00022',
                    xuhao:3,
                    heyuemingcheng:'恒生1905',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00023',
                    xuhao:4,
                    heyuemingcheng:'原油1906',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00024',
                    xuhao:5,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00025',
                    xuhao:6,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:1.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00026',
                    xuhao:7,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:80.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00027',
                    xuhao:8,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00028',
                    xuhao:9,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00029',
                    xuhao:10,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00030',
                    xuhao:11,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
                {
                    id:'0.00031',
                    xuhao:12,
                    heyuemingcheng:'美原油',
                    heyuedaima:'CL1906',
                    zuixinjia:59.25,
                    maijia:60.25,
                    mailiang:21,
                    chengjiaoliang:32451,
                    zhangdie:-0.23,
                    zhangfu:'0.03%',
                    kaipan:61.24,
                    zuoshoupan:85.98,
                    zuigao:1848,
                    zuidi:1000,
                    chicangliang:9,
                    jiesuanjia:18484,
                    zhangting:8484,
                    dieting:61.24,
                    zuochicang:9,
                    zuojiesuan:1005,
                    chengjiaozongjia:84846,
                    
                },
            ],
        }
    },
    methods:{
        hangqingbg(a){
           this.isactive=a
        }
    }

}
</script>

<style lang="scss" scoped>
.neipan{
    width: 100%;  
    position: relative; 
}
.tianchong{
    position:absolute;
    left: -22px;
    width: 22px;
    height: 44px;
    background: #22272E;
}
table{
    width: 100%;
    margin: 0;
    min-width: 800px;
    border-collapse: collapse;
    thead{
        width: 100%;
        background: #22272E;
        th{ 
            width: 4%;
            min-width: 56px;
            height:40px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(179,179,179,1);
            padding: 2px 0px;   
        }
    }
    tbody{
        width: 100%;
        text-align: center;
        tr{
            height: 30px;
            cursor: pointer;
            td{
                width: 4%;
                min-width: 56px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                padding: 0;
                color:rgba(153,153,153,1);
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>

