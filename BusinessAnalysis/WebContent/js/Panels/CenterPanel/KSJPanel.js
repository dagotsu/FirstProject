/**
 * 国土数値情報
 * 2015/08/19 taguchi
 */


var KSJPanel = {
		DomIDSummary : "SU",
		memory : null,
		Initialize:function(){
			require(["dojo/dom", "dojo/dom-construct"],
				function(dom, domConstruct){
					var ddom = dom.byId(KSJPanel.DomIDSummary);
					if(!ddom){
						domConstruct.place("<div id='" + KSJPanel.DomIDSummary + "'></div>", ConstTags.KSJPanel);
						KSJPanel.ReadKSJSummaryInfo();
					}
				}
			);
		},
		ReadKSJSummaryInfo:function(){
			MyStopWatch.Start("KSJサマリ一覧の取得開始");
			$.ajax({
				  url: 'http://nlftp.mlit.go.jp/ksj/api/1.0b/index.php/app/getKSJSummary.xml?appId=ksjapibeta1&lang=J&dataformat=1',
				  type: "GET",
				  dataType:"text",
				  success: KSJPanel.SetKSJSummaryToComboBox,
			});
		},
		SetKSJSummaryToComboBox:function(res){
			require(["dojo/dom", "dojo/on","dijit/form/ComboBox", "dojo/store/Memory", "dojo/domReady!"],
			function(dom, on, ComboBox, Memory){
				MyStopWatch.Stop("KSJサマリ一覧の取得完了");
				var text = res.responseText.replace(/<\/identifier>/g, "</identifier><title>");
				text = text.replace(/<field1>/g, "</title><field1>");
				var domObj = MyDOMParser.CreateObjFromXML(text);

				var items = domObj.getElementsByTagName("item");
				var data = [];
				for(var i = 0; i < items.length; i++){

					var d = {};
					for(var j = 0; j < items[i].childNodes.length; j++){
						var nodeName = items[i].childNodes[j].nodeName;
						d[nodeName]= items[i].childNodes[j].textContent;
					}
					data.push(d);
				}
				KSJPanel.memory = new Memory({
					idProperty:"identifier",
					data:data
				});
				var select = new ComboBox(
						{
							id:KSJPanel.DomIDSummary,
							name:"KSJSummary",
							store:KSJPanel.memory,
							searchAttr:"title"
						},
				KSJPanel.DomIDSummary);
				select.startup();
				on(dom.byId(KSJPanel.DomIDSummary), "select", function(arg){
					MyStopWatch.Start("KSJサマリ選択開始");
					var combobox = dijit.byId(KSJPanel.DomIDSummary);
					var querydata = KSJPanel.memory.query(combobox.item);
					MyStopWatch.Stop("KSJサマリ選択完了");
				});
				MyStopWatch.Stop("KSJサマリ一覧をコンボボックスへ展開完了");
			});
		}
}