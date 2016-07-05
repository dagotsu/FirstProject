/**
 *
 */
/**
 * 参照パネル
 */
var DataPanel = {
		Command_RequestTables:"RT",		//Request Tables
		Command_RequestData:"RD",	//Request Data

		DomIDOperate:"OP",
		DomIDGrid:"DG",

		Initialize:function(){

			var DomIDData = "DT";
			require(["dojo/dom", "dojo/dom-construct", "dojo/domReady!"],function(dom, domConstruct){
				var ddom = dom.byId(DomIDData);
				if(!ddom){
					MyStopWatch.Start("データパネル初期化開始");
					domConstruct.place("<div id='" + DomIDData + "'></div>", ConstTags.DataPanel);
					domConstruct.place("<div id='" + DataPanel.DomIDOperate + "'></div>", DomIDData);
					domConstruct.place("<div id='" + DataPanel.DomIDGrid + "'></div>", DomIDData);
					var params = "command=" + DataPanel.Command_RequestTables;
					MyXMLHttpMessaging.SendByPost("/BusinessAnalysis/DataPanel", params, DataPanel.callback_LoadTables);
					MyStopWatch.Stop("データパネル初期化完了");
				}
			});

		},
		callback_LoadTables : function(){
			if (XMLRequest.readyState==4 && XMLRequest.status==200){
				require(["dojo/dom", "dojo/on","dijit/form/ComboBox", "dojo/store/Memory", "dojo/domReady!"],
					function(dom, on, ComboBox, Memory){
					var json = JSON.parse(XMLRequest.responseText);
					var memory = new Memory({data:json.data});
					var select = new ComboBox(
						{
							id:DataPanel.DomIDOperate,
							name:"Tables",
							store:memory,
							searchAttr:"name"
						},
						DataPanel.DomIDOperate);
					select.startup();
					on(dom.byId(DataPanel.DomIDOperate), "select", function(arg){
						var tableName = arg.target.value;
						DataPanel.createDataGrid(tableName);
					});
					MyStopWatch.Stop("テーブル一覧の取得完了");
				});
			}
		},
		createDataGrid : function(tableName){
			if(!tableName)
				return;

			MyStopWatch.Start("データ取得開始");
			var params = "command=" + DataPanel.Command_RequestData + "&name=" + tableName;
			MyXMLHttpMessaging.SendByPost("/BusinessAnalysis/DataPanel", params, DataPanel.callback_CreateGrid);
		},
		callback_CreateGrid : function(){
			if (XMLRequest.readyState==4 && XMLRequest.status==200){
				require(["dojo/dom", "dojo/dom-construct", "dojo/_base/declare",
				         "dgrid/OnDemandGrid", "dstore/Memory", "dgrid/extensions/ColumnResizer", "dojo/domReady!"],
						function(dom, domConstruct, declare, Grid, Memory, ColumnResizer){
								domConstruct.empty(DataPanel.DomIDGrid);
								var json = JSON.parse(XMLRequest.responseText);
								var columnNames = json.columns;
								var columns = {};
								for(var i = 0; i < columnNames.length; i++){
									columns[columnNames[i].name] = {label:columnNames[i].name, resizable:true};
								}
								var memory = new Memory({data: json.data, idProperty:'id'})
								var grid = new (declare([Grid, ColumnResizer]))({
								// use Infinity so that all data is available in the grid
								//bufferRows: Infinity,
									className: 'dgrid-autoheight',
									collection: memory,
									columns: columns,
									loadingMessage: 'Loading data...',
									noDataMessage: 'No results found.'
										//selectionMode:"single",
								}, DataPanel.DomIDGrid);
								grid.startup();
								//MyStopWatch.Stop("参照パネルの初期化完了");
							}
					);
				MyStopWatch.Stop("データ取得完了");
			}
		}
}