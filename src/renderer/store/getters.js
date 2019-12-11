export default{
    updataSocketData(state) {
        return state.market.updataSocketData
    },
    path(state){
        return state.path
    },
    kDataSocket(state){
        return state.market.quoteData
    },
    NetworkSignal(state){
        return state.NetworkSignal
    },
    quoteStatusAC(state){
        return state.account.quoteStatus
    },
    quoteDataAC(state){
        return state.market.quoteData
    },
    chicangListAC(state){
        return state.market.initChicangList
    },
    skinAC(state){
        return state.skin
    },
    loginStatus(state){
    return state.account.loginStatus
    }
}