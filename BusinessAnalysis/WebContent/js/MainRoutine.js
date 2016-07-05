/**
 * メインルーチン
 */
/**
 * メインルーチン
 * 2015/08/07
 */
var MainRoutine = {
		InitializeSystem:function(){
			MyStopWatch.Start("ストップウォッチスタート");
			require(
					["dojo/parser","dojo/domReady!"],
					function(Parser){
						MyStopWatch.Stop("メインライブラリのローディング完了");
						TopPanel.Initialize(); //トップパネルの初期化
						CenterPanel.Initialize();
						MyStopWatch.Stop("メイン初期化完了");
					}
			);
		}
}