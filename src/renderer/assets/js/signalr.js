import Vue from 'vue'
import $ from 'jquery'
    import  '../../../../node_modules/signalr'
// import md5 from 'js-md5'
import store from '@/store/index.js'
// import localStorage from 'electron-localstorage'
// import {
// 	Toast
// } from 'vant'

let api = {}
let msg = {}
let conn = store.state.connSignalr

const imUrl = 'http://39.100.151.138:8081' //webSocket地址
const apiUrl = ''
const version = store.state.version

const installKey = store.state.localStorageInstall;
// const installInfo = JSON.parse(localStorage.getItem(installKey));

api = {
	//创建连接
	creatConnection: function() {
		// Toast.loading({
		// 	duration: 0, // 持续展示 toast
		// 	forbidClick: true, // 禁用背景点击
		// 	loadingType: 'spinner',
		// 	message: '行情连接中...'
		// })

		// if (!store.state.account.loginStatus) { //判断是否为登录状态
		// 	console.log('未登录状态连接websocket开始');
		// 	let uuid = Vue.prototype.$pro.generateUUID();
		// 	msg = {
		// 		"userId": uuid,
		// 		"token": uuid
		// 	}
		// } else {
		// 	console.log('登录状态连接websocket开始');
		// 	msg = {
		// 		"userId": store.state.socketParam.userId,
		// 		"token": store.state.socketParam.token
		// 	}
		// }
		console.log('登录状态连接websocket开始');
		msg = {
			"userId": 2480,
			"token": '124564'
		}
		//创建行情连接
		conn = $.connection(imUrl + "/myconnection", msg)
		console.log(conn);
		//开始行情连接
		conn.start()
			.done(() => {
				// Toast.clear();
				console.log('行情连接成功');
			})
			.fail((erro) => {
				console.log(erro);
			})
		//接受到消息
		conn.received((message) => {
			 console.log(message);
			let data = JSON.parse(message);
			if (data.messageType == 1) {
				// console.log(data);
				let dataObject = JSON.parse(data.content);
				// console.log(dataObject[0]);
				store.commit('setQuoteData', dataObject[0]);
			} else if (data.messageType == 2) {
				let newData = data.content + "-" + new Date().getTime() + Math.random();
				store.commit('setUpdataSocketData', newData);
				if (store.state.market.computedFdyk && store.state.account.loginStatus) {
					store.dispatch('computedFdyk')
				}
			}
		})
		//断开连接
		conn.disconnected(() => {
			// Toast({
			// 	duration: 1000 * 3,
			// 	message: '行情连接失败,请检查网络',
			// 	position: 'bottom'
			// })
			console.log('断开连接');
		})
	},
	//发送消息
	sendImMessage: function(msg) {
		conn.send(msg)
	}
}
export {
	api,
	conn
}
