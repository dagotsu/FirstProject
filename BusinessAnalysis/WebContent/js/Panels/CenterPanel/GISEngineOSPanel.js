/**
 * GISエンジンとOSの対応表
 */
var GISEngineOSPanel = {
		Command_RequestGISEngineOS:"EO",

		DomIDGISEngineOS:"EO",
		DomIDGrid:"DG",

		gisEngineMemory:null,

		Initialize:function(){
			var DomID_GISEnginePanel = "NH";
			require(["dojo/dom", "dojo/dom-construct", "dojo/domReady!"],function(dom, domConstruct){
				var ddom = dom.byId(DomID_GISEnginePanel);
				if(!ddom){
					domConstruct.place("<div id='" + DomID_GISEnginePanel + "'></div>", ConstTags.GISEngineOSPanel);
					domConstruct.place("<div id='" + GISEngineOSPanel.DomIDGISEngineOS + "'></div>", DomID_GISEnginePanel);
					var params = "command=" + GISEngineOSPanel.Command_RequestGISEngineOS;
					MyXMLHttpMessaging.SendByPost("/BusinessAnalysis/GISEngineOSPanel", params, GISEngineOSPanel.SetEngineOSPanel);
				}
			});
		},
		SetEngineOSPanel:function(){
			if (XMLRequest.readyState==4 && XMLRequest.status==200){
				MyStopWatch.Start("GISエンジン-OS一覧表の作成開始");
				require(["dojo/dom", "dojo/dom-construct", "dojo/_base/declare",
				         "dgrid/OnDemandGrid", "dstore/Memory", "dgrid/extensions/ColumnResizer", "dojo/domReady!"],
					function(dom, domConstruct, declare, Grid, Memory, ColumnResizer){
					var json = JSON.parse(XMLRequest.responseText);
					var columnNames = json.columns;
					var columns = {};
					for(var i = 0; i < columnNames.length; i++){
						columns[columnNames[i].name] = {label:columnNames[i].name, resizable:true};
					}
					GISEngineOSPanel.gisEngineMemory = new Memory({data:json.data});
					var grid = new (declare([Grid, ColumnResizer]))({
						// use Infinity so that all data is available in the grid
						//bufferRows: Infinity,
							className: 'dgrid-autoheight',
							collection: GISEngineOSPanel.gisEngineMemory,
							columns: columns,
							loadingMessage: 'Loading data...',
							noDataMessage: 'No results found.'
								//selectionMode:"single",
						}, GISEngineOSPanel.DomIDGrid);
						grid.startup();
					MyStopWatch.Stop("GISエンジン-OS一覧表の作成完了");
				});
			}
		},
}