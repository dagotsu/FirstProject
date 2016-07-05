/**
 * オリジナルのログ
 * 2015/05/25 ASK TaguchiHirokazu 新規作成
 */
var MyStopWatch = {
	StartTime:null,
	TimeStr:null,
	Start:function(Message){
		this.Initialize();
		console.debug(Message + " StopWatch Start");
		this.StartTime = new Date();
	},
	Stop:function(Message){
		var Stop = new Date();
		var myTime = 0;
		if(this.StartTime != null){
			var myTime = Stop.getTime() - this.StartTime.getTime();
		}else{
			this.Initialize();
		}
		var myH = Math.floor(myTime/(60*60*1000));
		myTime = myTime-(myH * 60 * 60 * 1000);
		var myM = Math.floor(myTime/(60*1000));
		myTime = myTime - (myM * 60 * 1000);
		var myS = Math.floor(myTime/1000);
		myMS = myTime % 1000;
		this.TimeStr = myH  + ":" + myM + ":" + myS + ":" + myMS;
		console.debug(Message + " StopWatch Stop Time=" + this.TimeStr);
	},
	/**
	 * ログ機能の初期化
	 *
	 * １．古いIEでconsole.log関連のクラス・関数が未実装していない場合は無視するようにする。
	 */
	Initialize : function(){
		if( typeof window.console === "undefined" ){
			window.console = {};
		}
		// console.@@がメソッドでない場合は空のメソッドを用意する
		if( typeof window.console.log !== "function" ){
			window.console.log = function(){};
		}
		if( typeof window.console.debug !== "function" ){
			window.console.debug = function(){};
		}
		if( typeof window.console.info !== "function" ){
			window.console.info = function(){};
		}
		if( typeof window.console.warn !== "function" ){
			window.console.warn = function(){};
		}
		if( typeof window.console.error !== "function" ){
			window.console.error = function(){};
		}
		if( typeof window.console.dir !== "function" ){
			window.console.dir = function(){};
		}
		if( typeof window.console.trace !== "function" ){
			window.console.trace = function(){};
		}
		if( typeof window.console.assert !== "function" ){
			window.console.assert = function(){};
		}
		if( typeof window.console.dirxml !== "function" ){
			window.console.dirxml = function(){};
		}
		if( typeof window.console.group !== "function" ){
			window.console.group = function(){};
		}
		if( typeof window.console.groupEnd !== "function" ){
			window.console.groupEnd = function(){};
		}
		if( typeof window.console.time !== "function" ){
			window.console.time = function(){};
		}
		if( typeof window.console.timeEnd !== "function" ){
			window.console.timeEnd = function(){};
		}
		if( typeof window.console.profile !== "function" ){
			window.console.profile = function(){};
		}
		if( typeof window.console.profileEnd !== "function" ){
			window.console.profileEnd = function(){};
		}
		if( typeof window.console.count !== "function" ){
			window.console.count = function(){};
		}
	}
};