/* eslint-disable */
<template>
  <div class="hello">
    这是K线
    <!-- <div id="chart_container" class="f-fill" style="height:800px;"></div> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function() {
    return {
      currency1: "USD",
      currency2: "BTC",
      saved_chart: null,
      chart: null,
      feed: null,
      last_price: 1234.2365,
      last_time: null,
      bars: [],
      init: ""
    };
  },
  mounted: function() {
    const this_vue = this;
    this_vue.getChartData();
    this_vue.feed = this_vue.createfeed();
    // onready方法可以设置图表库支持的图表配置。这些数据会影响到图表支持的功能，所以它被称为服务端定制
    // 图表库要求您使用回调函数来传递datafeed的configurationData参数。configurationData是一个对象，现在支持以下属性:
    TradingView.onready(function(configurationData) {
      //Widget构造函数  在此函数中可以设置图表的相关参数
      this_vue.chart = window.tvWidget = new TradingView.widget({
        //布尔值显示图表是否占用窗口中所有可用的空间(默认值为false)
        fullscreen: false,
        //布尔值，显示图表是否应使用窗格中的所有可用空间，并在调整窗格本身大小时自动调整大小。(默认值为false)
        autosize: true,
        //id属性为指定要包含widget的DOM元素id
        container_id: "chart_container",
        //JavaScript对象的实现接口 JS API 以反馈数据显示在图表上。 必须项
        datafeed: this_vue.feed,
        // static文件夹的路径
        library_path: "../../../../static/js/",
        // 本地化(可根据参数改变相关语言)
        locale: "zh",
        //将此属性设置为 true时，可使图表将详细的API日志写入控制台。
        debug: true,
        // 加载时背景色设置
        loading_screen: {
          backgroundColor: "#fe4761",
          foregroundColor: "#000000"
        }, //todo:do it
        interval: "60",
        // 引入自己的css文件
        custom_css_url: "chart.css"
      });
      this_vue.chart.onChartReady(function() {
        this_vue.chart
          .chart()
          .createStudy("MACD", false, false, [3, 5, "close", 0]);
        // 均线展示下拉菜单
        var isHaveMA5;
        var isHaveMA10;
        var isHaveMA15;
        var selectMA = this_vue.chart
          .createButton({ align: "left" })
          .attr("title", "MA10")
          .on("change", function(e) {
            if (this.children[0].value == "MA5") {
              // 获取所有的指标
              var Studies = this_vue.chart.chart().getAllStudies();
              // 新建一个数组用于存放所有的指标id
              var StudiesIDarr = [];
              for (var i = 0; i < Studies.length; i++) {
                StudiesIDarr.push(Studies[i].id);
              }
              console.log(StudiesIDarr.indexOf(isHaveMA5));
              if (StudiesIDarr.indexOf(isHaveMA5) == -1) {
                // 创建一条MA5的均线，并返回其id
                isHaveMA5 = this_vue.chart
                  .chart()
                  .createStudy(
                    "Moving Average",
                    false,
                    false,
                    [5, "close", 0],
                    null,
                    {
                      "Plot.color": "#ffb620",
                      "Plot.linewidth": 2
                    }
                  );
              }
              this_vue.chart.chart().removeEntity(isHaveMA10);
              this_vue.chart.chart().removeEntity(isHaveMA15);
              console.log(this.children[0].value);
            } else if (this.children[0].value == "MA10") {
              // 获取所有的指标
              var Studies = this_vue.chart.chart().getAllStudies();
              // 新建一个数组用于存放所有的指标id
              var StudiesIDarr = [];
              for (var i = 0; i < Studies.length; i++) {
                StudiesIDarr.push(Studies[i].id);
              }
              console.log(StudiesIDarr.indexOf(isHaveMA10));
              if (StudiesIDarr.indexOf(isHaveMA10) == -1) {
                // 创建一条MA10的均线，并返回其id
                isHaveMA10 = this_vue.chart
                  .chart()
                  .createStudy(
                    "Moving Average",
                    false,
                    false,
                    [10, "close", 0],
                    null,
                    {
                      "Plot.color": "#ffb620",
                      "Plot.linewidth": 2
                    }
                  );
              }
              this_vue.chart.chart().removeEntity(isHaveMA5);
              this_vue.chart.chart().removeEntity(isHaveMA15);
            } else if (this.children[0].value == "MA15") {
              // 获取所有的指标
              var Studies = this_vue.chart.chart().getAllStudies();
              // 新建一个数组用于存放所有的指标id
              var StudiesIDarr = [];
              for (var i = 0; i < Studies.length; i++) {
                StudiesIDarr.push(Studies[i].id);
              }
              console.log(StudiesIDarr.indexOf(isHaveMA15));
              if (StudiesIDarr.indexOf(isHaveMA15) == -1) {
                // 创建一条MA15的均线，并返回其id
                isHaveMA15 = this_vue.chart
                  .chart()
                  .createStudy(
                    "Moving Average",
                    true,
                    false,
                    [15, "close", 0],
                    null,
                    {
                      "Plot.color": "#ffb620",
                      "Plot.linewidth": 2
                    }
                  );
              }
              this_vue.chart.chart().removeEntity(isHaveMA5);
              this_vue.chart.chart().removeEntity(isHaveMA10);
            }
          })
          .append(
            "<select id='select'><option class='option'>均线显示</option><option class='option'>MA5</option><option class='option'>MA10</option><option class='option'>MA15</option></select>"
          );
        this_vue.chart.onShortcut("alt+s", function() {
          console.log(1231);
        });
      });
    });
  },
  methods: {
    /**
     * 装填初始数据
     */
    getChartData: function() {
      var _this = this;
      var t = 1508313600000;
      for (var i = 0; i < 30; i++) {
        var o = (Math.random() * 5 + 43.9).toFixed(1);
        var c = (Math.random() * 5 + 43.9).toFixed(1);
        var h = (Math.random() * 5 + 43.9).toFixed(1);
        var l = (Math.random() * 5 + 43.9).toFixed(1);
        if (h < c) h = c;
        if (h < o) h = o;
        if (l > o) l = o;
        if (h < l) {
          var tep = low;
          l = h;
          h = tep;
        }
        if (l > c) l = c;
        t += 3600000;
        _this.bars.push({
          close: Number(c),
          open: Number(o),
          high: Number(h),
          low: Number(l),
          volume: Number(Math.random(43000, 46000)),
          time: Number(t)
        });
      }
    },
    /**
     * JS API
     */
    createfeed: function() {
      let this_vue = this;
      let Datafeed = {};
      console.log(123456789);
      Datafeed.DataPulseUpdater = function(datafeed, updateFrequency) {
        console.log(293);
        console.log(updateFrequency);
        console.log(datafeed);
        //updateFrequency更新顺序  DataPulseUpdater数据脉冲  subscribers订阅
        this._datafeed = datafeed;
        this._subscribers = {};
        this._requestsPending = 0; //请求支出
        var that = this;
        var timenum = 10;
        var update = function() {
          console.log(300);
          var funcc = datafeed._callbacks["message"];
          var t = 1508385600000 + 3600000 * timenum;
         
          var o = (Math.random() * 5 + 43.9).toFixed(1);
          var c = (Math.random() * 5 + 43.9).toFixed(1);
          var h = (Math.random() * 5 + 43.9).toFixed(1);
          var l = (Math.random() * 5 + 43.9).toFixed(1);
          if (h < c) {
            h = c;
          }

          if (h < o) {
            h = o;
          }

          if (l > o) {
            l = o;
          }

          if (h < l) {
            var tep = low;
            l = h;
            h = tep;
          }
          if (l > c) {
            l = c;
          }
          // 仅修改最后一条数据，不追加
          this_vue.bars[this_vue.bars.length - 1] = {
              close: Number(c),
              open: Number(o),
              high: Number(h),
              low: Number(l),
              volume: Number(Math.random(43000, 46000)),
              // time: that.last_time
              time: t
            };
          funcc(this_vue.bars[this_vue.bars.length - 1]);


          // 在后面追加更新数据
          //  timenum++;
          // t += 3600000;
          // this_vue.bars.push({
          //   close: Number(c),
          //   open: Number(o),
          //   high: Number(h),
          //   low: Number(l),
          //   volume: Number(Math.random(43000, 46000)),
          //   time: Number(t)
          // });
          // funcc(this_vue.bars[this_vue.bars.length - 1]);



          // if (that._requestsPending > 0) {
          //   return;
          // }
          // 遍历订阅信息
          // for (var listenerGUID in that._subscribers) {
          //   console.log(306);
          //   // 获取订阅
          //   var subscriptionRecord = that._subscribers[listenerGUID];
          //   // 获取订阅的周期
          //   var resolution = subscriptionRecord.resolution;
          //   // 获取当前秒时间戳作为最右边请求K线的时间
          //   var datesRangeRight = parseInt(new Date().valueOf() / 1000);
          //   //通过函数计算出最左边请求K线的时间
          //   var datesRangeLeft =
          //     datesRangeRight - that.periodLengthSeconds(resolution, 10);
          //   that._requestsPending++;
          //   (function(_subscriptionRecord) {
          //     // 通过日期范围获取历史K线数据
          //     that._datafeed.getBars(
          //       _subscriptionRecord.symbolInfo, //商品信息对象
          //       resolution, //周期
          //       datesRangeLeft, //最左边请求K线的时间
          //       datesRangeRight, //最右边请求K线的时间
          //       function(bars) {
          //         that._requestsPending--;
          //         // hasOwnProperty表示是否有自己的属性。
          //         if (!that._subscribers.hasOwnProperty(listenerGUID)) {
          //           return;
          //         }
          //         if (bars.length === 0) {
          //           return;
          //         }
          //         // 获取最后(新)一个K线数据
          //         var lastBar = bars[bars.length - 1];
          //         if (
          //           !isNaN(_subscriptionRecord.lastBarTime) &&
          //           lastBar.time < _subscriptionRecord.lastBarTime
          //         ) {
          //           return;
          //         }
          //         var subscribers = _subscriptionRecord.listeners;

          //         //	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case _subscriptionRecord.lastBarTime = NaN
          //         // 当有一个新的更新并且这个更新生成了一个新的bar，这时这个更新不起作用，这种情况下：_subscriptionRecord.lastBarTime为NaN。
          //         var isNewBar =
          //           !isNaN(_subscriptionRecord.lastBarTime) &&
          //           lastBar.time > _subscriptionRecord.lastBarTime;

          //         //	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
          //         //	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
          //         // 选择适当的时间进行更新
          //         if (isNewBar) {
          //           // 当数据少于两条时抛出错误信息
          //           if (bars.length < 2) {
          //             throw new Error(
          //               "Not enough bars in history for proper pulse update. Need at least 2."
          //             );
          //           }
          //           // 获取倒数第二条数据信息
          //           var previousBar = bars[bars.length - 2];
          //           for (var i = 0; i < subscribers.length; ++i) {
          //             subscribers[i](previousBar);
          //           }
          //         }
          //         _subscriptionRecord.lastBarTime = lastBar.time;
          //         for (var i = 0; i < subscribers.length; ++i) {
          //           subscribers[i](lastBar);
          //         }
          //       },
          //       //	on error
          //       function() {
          //         that._requestsPending--;
          //       }
          //     );
          //   })(subscriptionRecord);
          // }
        };
        if (typeof updateFrequency != "undefined" && updateFrequency > 0) {
          console.log(380);
          console.log(updateFrequency);
          setInterval(update, updateFrequency);
        }
        console.log(382);
      };
      // 根据时间间隔以及更新周期计算间隔时间
      Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function(
        resolution,
        requiredPeriodsCount
      ) {
        console.log(389);
        var daysCount = 0;
        if (resolution === "D") {
          daysCount = requiredPeriodsCount;
        } else if (resolution === "M") {
          daysCount = 31 * requiredPeriodsCount;
        } else if (resolution === "W") {
          daysCount = 7 * requiredPeriodsCount;
        } else {
          daysCount = (requiredPeriodsCount * resolution) / (24 * 60);
        }
        return daysCount * 24 * 60 * 60;
      };

      // 订阅
      Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function(
        symbolInfo,
        resolution,
        newDataCallback,
        listenerGUID
      ) {
        console.log(410);
        this._datafeed._logMessage("Subscribing " + listenerGUID);

        if (!this._subscribers.hasOwnProperty(listenerGUID)) {
          this._subscribers[listenerGUID] = {
            symbolInfo: symbolInfo,
            resolution: resolution,
            lastBarTime: NaN,
            listeners: []
          };
        }

        this._subscribers[listenerGUID].listeners.push(newDataCallback);
      };
      // 取消订阅
      Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function(
        listenerGUID
      ) {
        this._datafeed._logMessage("Unsubscribing " + listenerGUID);
        delete this._subscribers[listenerGUID];
      };

      // API容器
      Datafeed.Container = function(updateFrequency) {
        console.log(434);
        // 数据相关的自定义。它们使用datafeed配置响应
        this._configuration = {
          supports_search: true, //是否支持搜索
          supports_group_request: false, //是否支持组请求
          // 布尔值来标识您的 datafeed 是否支持在K线上显示标记
          supports_marks: true,
          // 布尔值来标识您的 datafeed 是否支持时间刻度标记
          supports_timescale_marks: true,
          // 支持的周期数组，周期可以是数字或字符串。 如果周期是一个数字，它被视为分钟数
          supported_resolutions: [
            "1",
            "3",
            "5",
            "15",
            "30",
            "60",
            "120",
            "240", //四小时
            "360", //六小时
            "720", //十二小时
            "1D", //一天
            // "3D", //三天
            // "1W", //一周
            // "1M", //一个月
            "12M"
          ],
          // 交易所对象数组
          exchanges: ["myExchange"]
        };
        // 数据脉冲更新
        this._barsPulseUpdater = new Datafeed.DataPulseUpdater(
          this,
          updateFrequency || 5 * 1000
        );
        // this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);
        // 是否启用日志的标识符
        this._enableLogging = true;
        this._callbacks = {};
        this._initializationFinished = true;
        // this._fireEvent("initialized");
        // this._fireEvent("configuration_ready");
        console.log(486);
      };

      // Datafeed.Container.prototype._fireEvent = function(event, argument) {
      //   console.log(489)
      //   if (this._callbacks.hasOwnProperty(event)) {
      //     var callbacksChain = this._callbacks[event];
      //     for (var i = 0; i < callbacksChain.length; ++i) {
      //       callbacksChain[i](argument);
      //     }

      //     this._callbacks[event] = [];
      //   }
      // };
      // };
      // 日志输出
      Datafeed.Container.prototype._logMessage = function(message) {
        if (this._enableLogging) {
          var now = new Date();
          console.log(
            "CHART LOGS: " +
              now.toLocaleTimeString() +
              "." +
              now.getMilliseconds() +
              "> " +
              message
          );
        }
      };
      /**
       * 注册事件函数
       * @event 事件名称
       * @callback 事件的回调函数
       */
      Datafeed.Container.prototype.on = function(event, callback) {
        // if (!this._callbacks.hasOwnProperty(event)) {
        //   this._callbacks[event] = [];
        // }
        this._callbacks[event] = callback;
        // this指当前的Datafeed.Container
        return this;
      };
      // 图表初始化之后在其中调用callback继续修改配置参数  配置之前设置的config
      Datafeed.Container.prototype.onReady = function(callback) {
        let that = this;
        if (this._configuration) {
          setTimeout(function() {
            callback(that._configuration);
          }, 0);
          var timenum = 10;
          setInterval(function() {
            var t = 1508385600000 + 3600000 * timenum;
            // timenum++;
            var o = (Math.random() * 5 + 43.9).toFixed(1);
            var c = (Math.random() * 5 + 43.9).toFixed(1);
            var h = (Math.random() * 5 + 43.9).toFixed(1);
            var l = (Math.random() * 5 + 43.9).toFixed(1);
            if (h < c) {
              h = c;
            }

            if (h < o) {
              h = o;
            }

            if (l > o) {
              l = o;
            }

            if (h < l) {
              var tep = low;
              l = h;
              h = tep;
            }
            if (l > c) {
              l = c;
            }
            // t += 3600000;
            this_vue.bars[this_vue.bars.length - 1] = {
              close: Number(c),
              open: Number(o),
              high: Number(h),
              low: Number(l),
              volume: Number(Math.random(43000, 46000)),
              // time: that.last_time
              time: t
            };
            // this_vue.bars.push({
            //   close: Number(c),
            //   open: Number(o),
            //   high: Number(h),
            //   low: Number(l),
            //   volume: Number(Math.random(43000, 46000)),
            //   time: Number(t)
            // });
            // console.log(that._callbacks);
            var func = that._callbacks["message"];
            // console.log(func);
            // func(this_vue.bars[this_vue.bars.length - 1]);
          }, 1000);
        } else {
          this.on("configuration_ready", function() {
            this._callbacks(that._configuration);
          });
        }
      };
      // 调用onSymbolResolvedCallback方法来设置商品信息
      Datafeed.Container.prototype.resolveSymbol = function(
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
      ) {
        console.log(543);
        this._logMessage("GOWNO :: resolve symbol " + symbolName);
        Promise.resolve().then(() => {
          function adjustScale() {
            if (this_vue.last_price > 1000) return 100;
            else return 100000000;
          }

          this._logMessage(
            "GOWNO :: onResultReady inject " +
              this_vue.currency1 +
              ":" +
              this_vue.currency2
          );
          onSymbolResolvedCallback({
            name: this_vue.currency1 + ":" + this_vue.currency2,
            timezone: "Europe/Warsaw",
            pricescale: adjustScale(),
            minmov: 1,
            minmov2: 0,
            ticker: this_vue.currency1 + ":" + this_vue.currency2,
            description: "",
            session: "24x7",
            type: "bitcoin",
            "exchange-traded": "myExchange",
            "exchange-listed": "myExchange",
            has_intraday: true,
            intraday_multipliers: ["60"], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
            has_weekly_and_monthly: false,
            has_no_volume: false,
            regular_session: "24x7"
          });
        });
        // console.log(5431)
      };
      // 主要负责历史数据的加载
      var numm = 0;
      var barr = [];
      
      Datafeed.Container.prototype.getBars = function(
        symbolInfo,
        resolution,
        rangeStartDate,
        rangeEndDate,
        onDataCallback,
        onErrorCallback
      ) {
        console.log(rangeStartDate)
        rangeStartDate =this_vue.bars[0].time;
        console.log(rangeStartDate)
        rangeEndDate = this_vue.bars[this_vue.bars.length-1].time;
        // if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
        //   throw new Error([
        //     "Got a JS time instead of Unix one.",
        //     rangeStartDate,
        //     rangeEndDate
        //   ]);
        // }
        onDataCallback([], { noData: false });
        // onDataCallback(this_vue.bars, { noData: false });
        // onDataCallback(bars, { noData: true , nextTime: data.nb || data.nextTime });
      };
      //订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据。
      Datafeed.Container.prototype.subscribeBars = function(
        symbolInfo, //商品
        resolution, //更新周期
        onRealtimeCallback, //onRealtimeCallback方法以更新实时数据
        listenerGUID,
        onResetCacheNeededCallback //function()将在bars数据发生变化时执行
      ) {
        console.log(606);

        this_vue.bars.forEach(function(bar) {
          // in subscribeBars
          onRealtimeCallback(bar);
        });
        // this.last_time = this_vue.bars[this_vue.bars.length - 1].time;
        this.on("message", function(msg) {
          onRealtimeCallback(msg);
        });
        this.on("pair_change", function() {
          onResetCacheNeededCallback();
        });
        // this._barsPulseUpdater.subscribeDataListener(
        //   symbolInfo,
        //   resolution,
        //   onRealtimeCallback,
        //   listenerGUID,
        //   onResetCacheNeededCallback
        // );
      };
      // 取消订阅K线数据。在调用subscribeBars方法时,图表库将跳过与subscriberUID相同的对象。
      Datafeed.Container.prototype.unsubscribeBars = function(listenerGUID) {
        this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
      };
      console.log(987654321);

      return new Datafeed.Container();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.option {
  color: #000;
}
</style>
