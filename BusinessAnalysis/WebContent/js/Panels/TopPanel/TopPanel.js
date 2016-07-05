/**
 * ヘッダのパネル
 * taguchi 2015/08/18
 */
var TopPanel = {
		Initialize:function(){
			require(
					["dojo/dom-construct"],
					function(domConstruct){
						domConstruct.destroy(ConstTags.TopPanel);
						MyStopWatch.Stop("トップパネルの初期化完了");
					}
			);
		},
}