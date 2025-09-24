<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>월간 재고보고서</title>
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
<body class=" layout-fluid">
	<%@ include file="../icld/header.jsp"%>
	<%@ include file="../icld/navbar.jsp"%>

	<div class="page-wrapper" >

		



		<div class="page" > 
				

		
		
		<div class="col-md-4" style="width: 100%" >
				<h4 style="margin: 10px;">월간 재고보고서</h4> 
                <div class="card" >
                  	<div class="card-header" > 
                 			<div class="tui-datepicker-input tui-datetime-input tui-has-focus" style="margin: 0px 30px">
							<input id="reportTargetMM" type="text" aria-label="Date">
							<span class="tui-ico-date"></span>
							<div id="calendar-wrapper"></div>
					</div>
				   
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" >
                      <li class="nav-item">
                        <a href="#tab1" class="nav-link active" data-bs-toggle="tab" id="tab1Select">총괄장</a>
                      </li>
                  <!--     <li class="nav-item">
                        <a href="#tab2" class="nav-link" data-bs-toggle="tab" id="tab2Select">자체재고+위탁재고 반품상세</a>
                      </li>    -->
                      <li class="nav-item">
                        <a href="#tab3" class="nav-link" data-bs-toggle="tab" id="tab3Select">매입 입고상세</a>
                      </li>
                      <li class="nav-item">
                        <a href="#tab4" class="nav-link" data-bs-toggle="tab" id="tab4Select">출고상세</a>
                      </li>
                 <!--     <li class="nav-item">
                        <a href="#tab5" class="nav-link" data-bs-toggle="tab" id="tab5Select">폐기상세</a>
                      </li>
                      <li class="nav-item">
                        <a href="#tab6" class="nav-link" data-bs-toggle="tab" id="tab6Select">재고 실사현황</a>
                      </li>-->
                       
                    </ul>
                    
                    <span style="display: initial; float: right; margin-right: 10px;'">
						<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
					</span>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" >
                      <div class="tab-pane active show" id="tab1"> 
                     
                        <div id="grid_wrap1" style=" height: 80vh;"></div>
                      </div>
                      <div class="tab-pane" id="tab2">
                       
                        <div id="grid_wrap2" style=" height: 80vh;"></div>
                      </div>
                      <div class="tab-pane" id="tab3">
                      
                        <div id="grid_wrap3" style=" height: 80vh;"></div> 
                      </div>
                      <div class="tab-pane" id="tab4">
                   
                        <div id="grid_wrap4" style=" height: 80vh;"></div>
                      </div>
                      <div class="tab-pane" id="tab5">
                        
                        <div id="grid_wrap5" style=" height: 80vh;"></div>
                      </div>
                      <div class="tab-pane" id="tab6">
                        
                        <div id="grid_wrap6" style=" height: 80vh;"></div> 
                      </div>
                      
                      
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
		<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> --> 
		<script type="text/javascript" src="/resources/pan/js/stock-report.js?ver=3.1205.5"></script> 
		<script type="text/javascript"
			src="/resources/pan/js/common-pan.js?ver=2.0427.3"></script>
	</div>
	 
</body>
</html>

