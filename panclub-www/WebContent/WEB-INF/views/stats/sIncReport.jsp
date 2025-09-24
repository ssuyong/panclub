<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>일별 출고,입고,주문 현황</title>
<!-- Begin: Tab 사용 -->
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<!-- End: Tab 사용 -->

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<script type="text/javascript" src="/resources/js/spin.js"></script>
<!-- spinner -->
<!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox --> 
<style type="text/css">
    /* 커스텀 칼럼 헤더 스타일 정의 */ 
    .total-custom {
        background: #ffffdd;
        font-weight: bold;
        text-align: right;
    }
    .total-footer-custom {
   	 	background: #8888cc;
        font-weight: bold;
        text-align: right; 
    }
    .green-grid-custom {
    	background: #CCFFCC;
        font-weight: bold;
        text-align: right; 
    }
    .green-footer-custom {
    	background: #99FF99;
        font-weight: bold;
        text-align: right; 
    }
 
</style>
</head>
<body class=" layout-fluid">
	<%@ include file="../icld/header.jsp"%>
	<%@ include file="../icld/navbar.jsp"%>

	<div class="page-wrapper" >
		<div class="page" > 
			<div class="col-md-4" style="width: 100%" >
				  
				<h4 style="margin: 10px;">출고,입고,주문 현황</h4> 
				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnFind">조회</button>
				</div>
                <div class="card" >
                  	<div class="card-header" > 
                  		<button class="btn btn-info" id="btnDateTypeChange">월간으로</button>
                 		<div class="tui-datepicker-input tui-datetime-input tui-has-focus" style="margin: 0px 30px" id="btnYYMMSelect">
						<input id="reportTargetMM" type="text" aria-label="Date" >
						<span class="tui-ico-date" ></span>
						<div id="calendar-wrapper" ></div>
						</div>
				   		
                     
						<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운" style="position:absolute; ; right: 28px;">
					 
               	   </div>
               	   <div style="margin: 10px 10px; ">
	                     <a style="display: initial; float: right; margin-right: 14px;  "> (단위 : 천원)</a>
	                     <div style=" text-align: center;">
		                     <div id="grid_wrap1" style="min-height: 90vh; width: 99vw; display: inline-block; "></div>  
	                     </div>
                   </div>
              	</div>
            </div>
        </div>
				  
		

		<!-- Tabler Libs JS -->
		<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
			defer></script>
		<script
			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"
			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
			defer></script>
		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>

		<script type="text/javascript" src="/resources/pan/js/sIncReport.js?ver=1.0329.4"></script> 
		<script type="text/javascript"
			src="/resources/pan/js/common-pan.js?ver=2.0427.3"></script>
	</div>
	 
</body>
</html>