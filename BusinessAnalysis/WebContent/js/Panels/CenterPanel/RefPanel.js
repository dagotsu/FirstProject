/**
 * 参照パネル
 */
var RefPanel = {
		DomIDRefGrid : "RefGrid",
		Initialize:function(){

			require(["dojo/dom"],function(dom){
				var rdom = dom.byId(RefPanel.DomIDRefGrid);
				if(!rdom){
					MyStopWatch.Start("参照パネルの初期化開始");
					MyXMLHttpMessaging.SendByPost("/BusinessAnalysis/RefPanel", null, RefPanel.callback);
				}
			});
		},
		callback:function(){
			if (XMLRequest.readyState==4 && XMLRequest.status==200){
			require(["dojo/dom", "dojo/dom-construct", "dojo/_base/declare",
			         "dgrid/OnDemandGrid", "dstore/Memory", "dgrid/extensions/ColumnResizer", "dojo/domReady!"],
					function(dom, domConstruct, declare, Grid, Memory, ColumnResizer){
							domConstruct.place("<div id='" + RefPanel.DomIDRefGrid + "'></div>", ConstTags.RefPanel);

							var json = JSON.parse(XMLRequest.responseText);
							var memory = new Memory({data: json.data, idProperty:'id'});
							var grid = new (declare([Grid, ColumnResizer]))({
							// use Infinity so that all data is available in the grid
							//bufferRows: Infinity,
								className: 'dgrid-autoheight',
								collection:memory,
								columns: {
											category : {label:"カテゴリ", resizable:true},
											link : {
												label:"リンク",
												formatter:function(data){
												return data;
												},
											resizable:true
										},
								},
								loadingMessage: 'Loading data...',
								noDataMessage: 'No results found.'
									//selectionMode:"single",
							}, RefPanel.DomIDRefGrid);
							grid.startup();
							MyStopWatch.Stop("参照パネルの初期化完了");
						}
				);
			}
		},
}