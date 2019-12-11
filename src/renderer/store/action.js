//import ajax from '../config/ajax'

export default{
    //定义一个函数，当被触发时，给函数传递参数给mutations处理
    addNum({commit,state},id){
        commit('ADD_ITEMNUM',id)
    },

    accountLogin({commit}){
        commit('accountLogin01')
    },
    loginStatus({commit}){
        commit('setLoginStatus',true)
    },
    setSocketParam({commit},SocketParam){
        commit('setSocketParam',SocketParam)
    },
    startUpInitConnSignalr({commit}){
        commit('initConnSignalr')
    },
    setPath({commit},Path){
        commit('setPath',Path)
    },
    aCChanpinInfo({commit},chanpinInfo){
        commit('setChanpinInfo',chanpinInfo)
    },
    computedFdyk({
        commit,
        state
    }) {
        // console.log('动态权益计算中');
        var totalFdyk = 0;
        var uInfo = JSON.parse(localStorage.getItem(state.localStorageUid));
        var msg = JSON.stringify({
            userID: uInfo.userId
        })
        var quoteData = state.market.quoteData;
        var _chicangList = {
            list:[]
        }
        if(JSON.stringify(state.market.initChicangList) != '{}'){
            _chicangList = JSON.parse(state.market.initChicangList);
            var exchangeList = JSON.parse(state.exchange.exchangeList);
            for (let key in _chicangList.list) {
                if (_chicangList.list[key].futures_code == quoteData.code) {
                    _chicangList.list[key].point = quoteData.point;
                    if (_chicangList.list[key].updown == 1) {
                        _chicangList.list[key].private_yk = parseFloat(((quoteData.point - _chicangList.list[key].futures_price) * _chicangList.list[key].cs) / _chicangList.list[key].currencyRate).toFixed(0)*_chicangList.list[key].futures_num
                    } else {
                        _chicangList.list[key].private_yk = parseFloat(((_chicangList.list[key].futures_price - quoteData.point) * _chicangList.list[key].cs) / _chicangList.list[key].currencyRate).toFixed(0)*_chicangList.list[key].futures_num
                    }
                    if(_chicangList.list[key].currencyFlag == 'CNY'){
                        _chicangList.list[key].private_yk_rmb = _chicangList.list[key].private_yk
                    }else{
                        _chicangList.list[key].private_yk_rmb = _chicangList.list[key].private_yk * exchangeList[_chicangList.list[key].currencyFlag]
                    }	
                }
                totalFdyk += parseFloat(_chicangList.list[key].private_yk_rmb);
            }
            _chicangList.fdyk = totalFdyk;
        }
        commit('setChicangList', JSON.stringify(_chicangList));
    },
    connectSocket({state}){
        Vue.prototype.$initExchange(); //初始化汇率
        if (state.account.loginStatus) {
            Vue.prototype.$initHangqing(); //初始化行情列表
            setTimeout(function(){
                Vue.prototype.$initChicang(); //初始化持仓列表
            },500)
        } else {
            Vue.prototype.$initHangqing(); //初始化行情列表
        }
    }


}
//随机uuid
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}