<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
<META NAME="ROBOTS" CONTENT="NOARCHIVE">
<META name="robots" content="noindex,nofollow">

<meta name="viewport" content="width=device-width,user-scalable=no">

<jsp:include page="./Header.jsp"/>
<title>TopPage</title>

<script type="text/javascript">
		$(document).ready(function(){
			MyStopWatch.Stop("readyイベント開始");
			MainRoutine.InitializeSystem();
		});
</script>
</head>
<body class="claro">

	<div id="MainFrame"
 	data-dojo-type="dijit/layout/BorderContainer"
	data-dojo-props="design:'headline'">
		<div id="TopPanel"
		data-dojo-type="dijit/layout/ContentPane"
		data-dojo-props="region:'top'">
		</div>
		<div id="CenterPanel"
		data-dojo-type="dijit/layout/ContentPane"
		data-dojo-props="region:'center'">
		</div>
		<div id="BottomPanel"
		data-dojo-type="dijit/layout/ContentPane"
		data-dojo-props="region:'bottom'">
		</div>
	</div>
</body>
</html>