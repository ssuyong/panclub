<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<title>담당자별 처리현황</title>


</head>
<body class=" layout-fluid">
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
		<h2 class="page-title" style="margin: 10px">담당자별 처리현황</h2>
		<div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <a style="margin-left: 10px">※아래 견적,주문,발주,입고,출고 탭을 선택후 조회하면 됩니다.</a>	
        </div>
        <div class="spinner" id="spinner"></div>
		<div class="page-body">
			<div class="card" style="margin:  10px">
				<div class="form-group mb-3 row">
					<div id="iDiv_tabSet" style="margin: 10px">
						<button class="btn btn-secondary cButton_tabSelect">견적</button>
		            	<button class="btn btn-secondary cButton_tabSelect">주문</button>
		            	<button class="btn btn-secondary cButton_tabSelect">발주</button>
		            	<button class="btn btn-secondary cButton_tabSelect">입고</button> 
		            	<button class="btn btn-secondary cButton_tabSelect">출고</button> 
		            	
		            	<div class="tui-datepicker-input tui-datetime-input tui-has-focus" style="margin-left: 20px">
							<input id="startpicker-input" type="text" aria-label="Date">
							<span class="tui-ico-date"></span>
							<div id="startpicker-container" style="margin-left: -1px;"></div>
						</div>
						<span>~</span>
						<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
							<input id="endpicker-input" type="text" aria-label="Date">
							<span class="tui-ico-date"></span>
							<div id="endpicker-container" style="margin-left: -1px;"></div>
						</div> 
		            </div> 
	            </div> 
                <div id="grid_wrap" style="height:70vh; margin: 0 10px 10px 10px"></div> 
           </div>
		</div>        
        	
	</div>
</div>
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
			<%	/* CSS/JS 파일 캐시 방지 */	
				String mdStaffWorkRpt = application.getRealPath("/resources/pan/js/mdStaffWorkRpt.js");	
				File mdStaffWorkRptFile = new File(mdStaffWorkRpt);	
				Date lastModified_mdStaffWorkRptFile = new Date(mdStaffWorkRptFile.lastModified());  	
				
			 
				
				
				SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			%>		
	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script> 
	<!-- Tabler Libs JS -->
	<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
		defer></script>
	<script
		src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
		defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
		defer></script>
	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>
	<!-- 		팝업매니저js 헤더로 옴김 -->
<!-- 	<script type="text/javascript"			src="/resources/pan/js/noticePopupManager.js?ver=1.0729.4"></script> -->
	<script type="text/javascript" src="/resources/pan/js/mdStaffWorkRpt.js?ver=<%=fmt.format(lastModified_mdStaffWorkRptFile)%>"></script> 

</body>
</html>