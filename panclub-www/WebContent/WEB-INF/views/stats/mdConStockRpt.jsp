<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>기간별 재고 사용 현황</title>
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
 
</head>
<style type="text/css">
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	  margin: 0;
	}
</style>
<script type="text/javascript"> 
	//common-pan 접근용 auigrid id
	var myGridID  = "#grid_wrap1";
</script>
<body class=" layout-fluid">
	<%@ include file="../icld/header.jsp"%>
	<%@ include file="../icld/navbar.jsp"%>

	<div class="page-wrapper" > 
				<h4 id="subTitle" style="margin: 10px;">기간별 재고 사용 현황</h4> 
				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnFind"  >조회</button>
				</div>
				
				
                <div class="card" >
                  	<div class="card-header" > 
                  		<button class="btn btn-info" id="btnDateTypeChange">월간으로</button>
                 		<div class="tui-datepicker-input tui-datetime-input tui-has-focus" style="margin: 0px 30px" id="btnYYMMSelect">
						<input id="reportTargetMM" type="text" aria-label="Date" >
						<span class="tui-ico-date" ></span>
						<div id="calendar-wrapper" ></div>
						</div>
				   		 <% if (  ("ㄱ121").equals(comCode) ) { %>
						      
							<label class="form-check form-check-inline" > P 제외하기
							<input class="form-check-input" type="checkbox" id="pIgnoreYN" name="pIgnoreYN" checked> </label>
						<%} %> 
                     
						<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운" style="position:absolute; ; right: 28px;">
					 
               	   </div>
			         
					  
                
		</div>
               	  
        <div style="margin: 10px 10px">
	                     
<!-- 	                     <a style="display: initial; float: right; margin-right: 14px;"> (단위 : 천원)</a> -->  
	                     <div id="grid_wrap1" style="min-height: 65vh;"></div>
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
		
	 
		<script type="module" src="/resources/pan/js/mdConStockRpt.js?ver=1.0618.4"></script>  
		<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0428/.3"></script>
	</div>
	 
</body>
</html>