import Vue from 'vue'
import Router from 'vue-router'
import hangqing from '../page/hangqing/hangqing.vue'
import niuyueCOMN from '../page/hangqing/componets/niuyueCOMN.vue'
import kline from '../page/kline/kline.vue'
import xiadan from '../page/xiadan/xiadan.vue'
// import BuyAndSell from '../page/kline/childcomponment/BuyAndSell.vue'
import List from '../page/kline/childcomponment/List.vue'
import hushenA from '../page/hangqing/componets/hushenA.vue'
import hushenB from '../page/hangqing/componets/hushenB.vue'
import zhijiage from '../page/hangqing/componets/zhijiage.vue'
import meiguoice from '../page/hangqing/componets/meiguo.vue'
import meiguoce from '../page/hangqing/componets/meiguoce.vue'
import neipan from '../page/hangqing/componets/neipan.vue'
import waipan from '../page/hangqing/componets/waipan.vue'
import heyue from '../page/heyue/heyue.vue'
import zhinengjiaoyi from '../page/zhinengjiaoyi/zhinengjiaoyi.vue'
import zhuye from '../page/zhinengjiaoyi/componets/zhuye.vue'
import zhuyetanchuang from '../page/zhinengjiaoyi/componets/zhuyexiangqingtanchuang.vue'
import zhanghu from '../page/zhinengjiaoyi/componets/zhanghu.vue'
import gendan from '../page/zhinengjiaoyi/componets/gendan.vue'
import guanzhu from '../page/zhinengjiaoyi/componets/guanzhu.vue'
import fensi from '../page/zhinengjiaoyi/componets/fensi.vue'
import login from '../page/login/login.vue'
import register from '../page/login/register.vue'
import forgetpwd from '../page/login/forgetPwd.vue'
import forgetpwd01 from '../page/login/forgetPwd01.vue'
import mine from '../page/mine/mine.vue'
import celue from '../page/mine/celue.vue'
import teacher from '../page/mine/teacher.vue'
import zhuanzhang from '../page/zhuanzhang/zhuanzhang.vue'
import zhuanzhang2 from '../page/zhuanzhang/zhuanzhang2.vue'
import moni from '../components/common/moni.vue'
import zyzsTanchuang from '../components/common/zhiyingzhisuntanchuang.vue'
import CandleStick from '../page/kline/childcomponment/CandleStick/CandleStickMax.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path:'/',
        name:hangqing,
        component:hangqing,
        meta:{
          show:true
        },
        children:[
          {
            path:'/',
            meta:{
              show:true
            },
            component:hushenA
          },
          {
            path:'/hangqing/hushenB',
            meta:{
              show:true
            },
            component:hushenB
          },
          {
            path:'/hangqing/zhijiage',
            meta:{
              show:true
            },
            component:zhijiage
          },
          {
            path:'/hangqing/meiguoice',
            meta:{
              show:true
            },
            component:meiguoice
          },
          {
            path:'/hangqing/meiguoce',
            component:meiguoce,
            meta:{
              show:true
            },
          },
          {
            path:'/hangqing/neipan',
            meta:{
              show:true
            },
            component:neipan
          },
          {
            path:'/hangqing/waipan',
            meta:{
              show:true
            },
            component:waipan
          },
          {
            path:'/hangqing/niuyueCOMN',
            component:niuyueCOMN,
            meta:{
              show:true
            }
          },
        ]
      },
      
      
      {
        path:'/zhuyetanchuang',
        // name:zhuyetanchuang,
        meta:{
          show:false
        },        
        component:zhuyetanchuang,
      },
      {
        path:'/kline',
        name:kline,
        meta:{
          show:true
        },        
        component:kline,

      },
      {
        path:'/xiadan',
        component:xiadan,
        meta:{
          show:true
        }, 
      },
      {
        path:'/candleStick',
        component:CandleStick,
        meta:{
          show:false
        }, 
      },
      
      // {
      //   path:'/buyAndSell',
      //   // name:BuyAndSell,
      //   meta:{
      //     show:true
      //   },   
      //   component:BuyAndSell
      // },
      {
        path:'/moni',
        // name:moni,
        meta:{
          show:false
        },   
        component:moni
      },
      {
        path:'/zyzsTanchuang',
        // name:moni,
        meta:{
          show:false
        },   
        component:zyzsTanchuang
      },
      
      {
        path:'/heyue',
        component:heyue,
        meta:{
          show:true
        },
      },
      {
        path:'/zhinengjiaoyi',
        component:zhinengjiaoyi,
        meta:{
          show:true
        },
        children:[
          {
            path:'/',
            component:zhuye,
            meta:{
              show:true
            }
          },
          {
            path:'/zhinengjiaoyi/zhanghu',
            component:zhanghu,
            meta:{
              show:true
            }
          },
          {
            path:'/zhinengjiaoyi/gendan',
            component:gendan,
            meta:{
              show:true
            }
          },
          {
            path:'/zhinengjiaoyi/guanzhu',
            component:guanzhu,
            meta:{
              show:true
            }
          },
          {
            path:'/zhinengjiaoyi/fensi',
            component:fensi,
            meta:{
              show:true
            }
          },
        ]
      },
      {
        path:'/login',
        meta:{
          show:false
        },

        component:login
      },
      {
        path:'/register',
        meta:{
          show:false
        },
        component:register
      },
      {
        path:'/forgetpwd',
        meta:{
          show:false
        },
        component:forgetpwd
      },
      {
        path:'/forgetpwd01',
        name:'forgetpwd01',
        meta:{
          show:false
        },
        component:forgetpwd01
      },
      {
        path:'/mine',
        component:mine,
        meta:{
          show:false
        }
      },
      {
        path:'/celue',
        component:celue,
        meta:{
          show:false
        }
      },
      {
        path:'/teacher',
        component:teacher,
        meta:{
          show:false
        }
      },
      {

        path:'/zhuanzhang',
        component:zhuanzhang,
        meta:{  //添加meta标签，里面自定义roles,用来设置权限
          show:false
        }
      },
      {

        path:'/zhuanzhang2',
        component:zhuanzhang2,
        meta:{  //添加meta标签，里面自定义roles,用来设置权限
          show:false
        }
      },
      {

        path:'/List',
        component:List

      },
      {
      // {
      //   path: '*',
      //   redirect: '/'
      // }

        path:'/list',
        // name:List,
        component:List
      }


   ]
})
