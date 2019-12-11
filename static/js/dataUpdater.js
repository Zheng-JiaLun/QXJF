/**
 * 数据更新器
 * 通过更新器触发datafeeds的getBars实时更新图表数据
 */
class dataUpdater {
  // 构造器
  constructor(datafeeds) {

    this.subscribers = {}
    // 请求
    this.requestsPending = 0
    // 历史数据（旧图表数据）
    this.historyProvider = datafeeds
  }
  /**
   * 订阅商品
   * 
   * @symbolInfo   symbolInfo对象
   * @resolution  周期
   * @newDataCallback  将更新的bar传递给此回调函数，用于更新图表
   * @listenerGuid 表示交易的唯一id和表示订阅的周期（分辨率）,生成规则：ticker+'_'+周期
   * */
  subscribeBars(symbolInfo, resolution, newDataCallback, listenerGuid) {

    // 记录商品信息并存入订阅产品的数组中
    this.subscribers[listenerGuid] = {
      lastBarTime: null,
      listener: newDataCallback,
      resolution: resolution,
      symbolInfo: symbolInfo
    }
  }
  /**
   * 取消订阅商品
   * 
   * @listenerGuid  表示交易的唯一id和表示订阅的周期（分辨率），生成规则：ticker+'_'+周期
   * */
  unsubscribeBars(listenerGuid) {
    delete this.subscribers[listenerGuid]     // 根据GUid移除相关的订阅信息
  }
  /** 
   * 更新数据函数
   * */ 
  updateData() {
    // 若requestsPending不为0则返回
    if (this.requestsPending) return
    // 将requestsPending赋值为0
    this.requestsPending = 0
    // 遍历subscribers数组
    for (let listenerGuid in this.subscribers) {

      this.requestsPending++
      // 执行更新订阅函数，然后requestsPending--
      /**
       * 
       */
      this.updateDataForSubscriber(listenerGuid).then(() => this.requestsPending--).catch(() => this.requestsPending--)
    }
  }
  /**
   * 更新订阅数据
   * @listenerGuid   表示交易的唯一id和表示订阅的周期（分辨率），生成规则：ticker+'_'+周期
   * 函数若执行成功（即进入Promise对象的resolve（）方法）则执行.then()方法；
   * 函数若执行失败（即进入Promise对象的reject（）方法）则执行.catch()方法
   */ 
  updateDataForSubscriber(listenerGuid) {
    return new Promise((resolve, reject) => {
      // 获取订阅商品
      const subscriptionRecord = this.subscribers[listenerGuid]
      // 获取秒时间戳作为区域的终止的时间（时间戳）
      const rangeEndTime = parseInt((Date.now() / 1000).toString())
      // 根据periodLengthSeconds方法计算出区域的开始的时间（时间戳）
      const rangeStartTime = rangeEndTime - this.periodLengthSeconds(subscriptionRecord.resolution, 10)
      /**
       * 通过时间范围获取历史K线数据
       * 
       * @subscriptionRecord.symbolInfo  商品信息对象
       * @subscriptionRecord.resolution  周期
       * @rangeStartTime 时间戳（最左边请求的K线时间）
       * @rangeEndTime   时间戳（最右边请求的K线时间）
       * @bars  将返回的bars作为形参传入历史数据回调函数
       */
      this.historyProvider.getBars(subscriptionRecord.symbolInfo, subscriptionRecord.resolution, rangeStartTime, rangeEndTime,
        bars => {
          this.onSubscriberDataReceived(listenerGuid, bars)
          resolve()
        },
        () => {
          reject()
        }
      )
    })
  }

  /**
   * 获取订阅数据
   * @listenerGuid   表示交易的唯一id和表示订阅的周期（分辨率），生成规则：ticker+'_'+周期
   * @bars getBars方法获取的历史数据
   */ 
  onSubscriberDataReceived(listenerGuid, bars) {
    // 如果subscribers数据没有listenerGuid属性则返回
    if (!this.subscribers.hasOwnProperty(listenerGuid)) return
    // 如果bars的长度为0则返回
    if (!bars.length) return
    // 获取bars最后一个元素
    const lastBar = bars[bars.length - 1]
    // 获取subscribers的第listenerGuid个订阅
    const subscriptionRecord = this.subscribers[listenerGuid]

    if (subscriptionRecord.lastBarTime !== null && lastBar.time < subscriptionRecord.lastBarTime) return
    const isNewBar = subscriptionRecord.lastBarTime !== null && lastBar.time > subscriptionRecord.lastBarTime
    if (isNewBar) {
      if (bars.length < 2) {
        throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
      }
      const previousBar = bars[bars.length - 2]
      subscriptionRecord.listener(previousBar)
    }
    subscriptionRecord.lastBarTime = lastBar.time
    subscriptionRecord.listener(lastBar)
  }
  /**
   * 周期左右时间间隔计算函数  先转换为天数 再转换为秒数
   * 
   * @param {*} resolution   周期
   * @param {*} requiredPeriodsCount  所需的周期
   */
  periodLengthSeconds(resolution, requiredPeriodsCount) {
    let daysCount = 0
    if (resolution === 'D' || resolution === '1D') {
      daysCount = requiredPeriodsCount
    } else if (resolution === 'M' || resolution === '1M') {
      daysCount = 31 * requiredPeriodsCount
    } else if (resolution === 'W' || resolution === '1W') {
      daysCount = 7 * requiredPeriodsCount
    } else {
      daysCount = requiredPeriodsCount * parseInt(resolution) / (24 * 60)
    }
    return daysCount * 24 * 60 * 60
  }
}

export default dataUpdater