/**
 * CenterPanel
 * 2015/08/18 taguchi
 */
var CenterPanel = {
		Initialize:function(){
			require(["dojo/on", "dijit/layout/TabContainer", "dijit/layout/ContentPane", "dojo/cookie","dojo/domReady!"],
				function(on, TabContainer, ContentPane, cookie){
					var tc = new TabContainer({
						id:"TabC",
						region:"center",
					}, ConstTags.CenterPanel);
					var cp1 = new ContentPane({
						id:ConstTags.TitlePanel,
						title: "タイトルページ",
				    });
					tc.addChild(cp1);
					var cp2 = new ContentPane({
						id:ConstTags.DataPanel,
						title: "データ",
				    });
				    tc.addChild(cp2);
					var cp3 = new ContentPane({
						id:ConstTags.KSJPanel,
						title: "フリー地図情報",
				    });
				    tc.addChild(cp3);
					var cp5 = new ContentPane({
						id:ConstTags.NouhinPanel,
						title: "納品情報",
				    });
				    tc.addChild(cp5);
					var cp7 = new ContentPane({
						id:ConstTags.EsriMapPanel,
						title: "EsriMap",
				    });
					tc.addChild(cp7);
				    var cp8 = new ContentPane({
				    	id:ConstTags.GISEngineOSPanel,
				    	title: "GISE-OS対応表",
				    });
					tc.addChild(cp8);
					var cp6 = new ContentPane({
						id:ConstTags.GoogleMapPanel,
						title: "GoogleMap",
				    });
				    tc.addChild(cp6);
					var cp9 = new ContentPane({
						id:ConstTags.OpenLayersPanel,
						title: "OpenLayers",
				    });
				    tc.addChild(cp9);
				    var cp4 = new ContentPane({
						id:ConstTags.RefPanel,
						title: "参照Webページ",
				    });
				    tc.addChild(cp4);

			        tc.watch("selectedChildWidget", function(name, oval, nval){
			        	cookie(CookieNames.CenterPanel_ActiveTabName, nval.id);
			        	switch(nval.id){
			        		case ConstTags.DataPanel:
			        			DataPanel.Initialize();
			        		break;
			        		case ConstTags.KSJPanel:
			        			KSJPanel.Initialize();
			        			break;
			        		case ConstTags.NouhinPanel:
			        			NouhinPanel.Initialize();
			        			break;
			        		case ConstTags.GoogleMapPanel:
			        			GoogleMapPanel.Initialize();
			        			break;
			        		case ConstTags.EsriMapPanel:
			        			EsriMapPanel.Initialize();
			        			break;
			        		case ConstTags.RefPanel:
			        			RefPanel.Initialize();
			        			break;
			        		case ConstTags.GISEngineOSPanel:
			        			GISEngineOSPanel.Initialize();
			        			break;
			        		case ConstTags.OpenLayersPanel:
			        			OpenLayersPanel.Initialize();
			        			break;
			        	}
			        });
			        tc.startup();

			        var active_tabName = cookie(CookieNames.CenterPanel_ActiveTabName);
			        if(!active_tabName)
			        	active_tabName = ConstTags.DataPanel;
			        tc.selectChild(active_tabName, true);

					MyStopWatch.Stop("センターパネルの初期化完了");
				}
			);
		}
}