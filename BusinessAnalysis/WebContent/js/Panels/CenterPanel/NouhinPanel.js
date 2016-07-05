/**
 *
 */
var NouhinPanel = {
		//サーバーへ問い合わせるコマンド名
		Command_RequestAnkens:"AK",		//Request Anken
		Command_RequestNouhin:"NH",		//Request Nouhin

		DomIDAnken:"DA",
		DomIDGrid:"NHGrid",
		ankenMemory:null,
		Initialize:function(){
			var DomIDNouhin = "NH";
			require(["dojo/dom", "dojo/dom-construct", "dojo/domReady!"],function(dom, domConstruct){
				var ddom = dom.byId(DomIDNouhin);
				if(!ddom){
					domConstruct.place("<div id='" + DomIDNouhin + "'></div>", ConstTags.NouhinPanel);
					domConstruct.place("<div id='" + NouhinPanel.DomIDAnken + "'></div>", DomIDNouhin);
					domConstruct.place("<div id='" + NouhinPanel.DomIDGrid + "'></div>", DomIDNouhin);
					var params = "command=" + NouhinPanel.Command_RequestAnkens;
					MyXMLHttpMessaging.SendByPost("/BusinessAnalysis/NouhinPanel", params, NouhinPanel.SetAnkenCombo);
				}
			});
		},
		SetAnkenCombo : function(){
			if (XMLRequest.readyState==4 && XMLRequest.status==200){
				MyStopWatch.Start("案件一覧の取得開始");
				require(["dojo/dom", "dojo/on","dijit/form/ComboBox", "dojo/store/Memory", "dojo/domReady!"],
						function(dom, on, ComboBox, Memory){
						var json = JSON.parse(XMLRequest.responseText);
						NouhinPanel.ankenMemory = new Memory({data:json.data});
						var select = new ComboBox(
							{
								id:NouhinPanel.DomIDAnken,
								name:"NouhinPanel",
								store:NouhinPanel.ankenMemory,
								searchAttr:"anken"
							},
							NouhinPanel.DomIDAnken);
						select.startup();
						on(dom.byId(NouhinPanel.DomIDAnken), "select", function(arg){
							var combobox = dijit.byId(NouhinPanel.DomIDAnken);
							var querydata = NouhinPanel.ankenMemory.query(combobox.item);

							if(querydata.length != 0){
								var anken_id = querydata[0].id;
								NouhinPanel.createNouhinGrid(anken_id);
							}
						});
						MyStopWatch.Stop("案件一覧の取得完了");
					});
			}
		},
		createNouhinGrid : function(ankenID){
			if(!ankenID)
				return;
			MyStopWatch.Start("納品物一覧の取得開始");
			var params = "command=" + NouhinPanel.Command_RequestNouhin + "&anken_id=" + ankenID;
			MyXMLHttpMessaging.SendByPost("/BusinessAnalysis/NouhinPanel", params, NouhinPanel.callback_CreateGrid);
		},
		memory : null,
		grid:null,
		callback_CreateGrid : function(){
			if (XMLRequest.readyState==4 && XMLRequest.status==200){
		        MyStopWatch.Stop("納品物一覧表の作成開始");
				require(["dojo/dom", "dojo/dom-construct", "dojo/_base/declare",
				         "dgrid/OnDemandGrid", "dstore/Memory", "dgrid/extensions/ColumnResizer", "dojo/domReady!"],
				         function(dom, domConstruct, declare, Grid, Memory, ColumnResizer){

								domConstruct.empty(NouhinPanel.DomIDGrid);
								var json = JSON.parse(XMLRequest.responseText);
								//alert(XMLRequest.responseText);
								var columnNames = json.columns;
								var columns = {};
								for(var i = 0; i < columnNames.length; i++){
									columns[columnNames[i].name] = {label:columnNames[i].label, resizable:true};
								}
								columns["newestVersion"] = {label:"最新版", resizable:true};
								NouhinPanel.memory = new Memory({data: json.data, idProperty:'anken_id'});
								NouhinPanel.memory.filter({pub_code_type:"KSJ_CODE"}).forEach(function(mem){
										var identifier = mem.pub_code;
										var version = mem.version;
										var prefCode = mem.pub_subcode1;
										$.ajax({
											  url : 'http://nlftp.mlit.go.jp/ksj/api/1.0b/index.php/app/getKSJURL.xml?' +
												'appId=ksjapibeta1' +
												'&lang=J' +
												'&dataformat=1' +
												'&identifier=' + identifier +
												'&prefCode=' + prefCode,
											  type: "GET",
											  dataType:"text",
											  success: NouhinPanel.checkNewestVersion,
										});
								});
								NouhinPanel.grid = new (declare([Grid, ColumnResizer]))({
								// use Infinity so that all data is available in the grid
								//bufferRows: Infinity,
									className: 'dgrid-autoheight',
									collection: NouhinPanel.memory,
									columns: columns,
									loadingMessage: 'Loading data...',
									noDataMessage: 'No results found.'
										//selectionMode:"single",
								}, NouhinPanel.DomIDGrid);

							}
					);
				MyStopWatch.Stop("納品物一覧表の作成完了");
			}
		},
		checkNewestVersion:function(res){
			var domObj = MyDOMParser.CreateObjFromXML(res.responseText);
			var domid = domObj.getElementsByTagName("identifier")[0].textContent;
			var dompref = domObj.getElementsByTagName("prefcode")[0].textContent;
			if(!domid || !dompref){
				console.error("国土地理院から該当データを得られませんでした。");
				return;
			}
			var newestYear = 0;
			var years = domObj.getElementsByTagName("year");

			for(var i = 0; i < years.length; i++){
				if(newestYear < years[i].textContent)
					newestYear = years[i].textContent;
			}
			var d = NouhinPanel.memory.filter({pub_code:domid, pub_subcode1:dompref});
			d.forEach(function(m){
				m.newestVersion = newestYear;
			});

			NouhinPanel.grid.refresh();
			MyStopWatch.Stop("国土地理院より最新バージョンを取得:KSJID=" + domid);
		}
}