<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>거래처별 청구 현황</title>
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
<script type="text/javascript"> 
	//common-pan 접근용 auigrid id
	var myGridID  = "#grid_wrap1";
</script>
<body class=" layout-fluid">
	<%@ include file="../icld/header.jsp"%>
	<%@ include file="../icld/navbar.jsp"%>

	<div class="page-wrapper" >
		<div class="page" > 
			<div class="col-md-4" style="width: 100%" >
				  
				<h4 id="subTitle" style="margin: 10px;">거래처별 청구 현황</h4> 
				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnFind"  >조회</button>
				</div>
                <div class="card" >
                  	<div class="card-header" >  
                  		 <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">기준일</label>
                  		<div class="row" style="display: contents;">
									    <div class="col-md-6" style="width: auto">										       
									       <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
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
					   
						<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">거래처코드</label>
			            <div class="col">
			              <input type="text" id="InputCustCode" class="form-control" style="width:60%; max-width:200px;" placeholder="" >
			            </div>
			            <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">업체코드</label>
			            <div class="col">
	                      <input type="text" id="InputComCode" class="form-control" style="width:60%; max-width:200px;" placeholder="" >
	                    </div>
	                    <label class="col-3 col-form-label " style="min-width: 70px; width: auto; margin-left : 50px;">청구상태</label>
				   		<div class="col"  style="display: contents;">
											<select id=procStep class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value="전체">전체</option>
												<option value="청구">청구</option>
												<option value="미청구">미청구</option>
											</select>	
										</div>	
                     	<div class="col">
						<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운" style="position:absolute; ; right: 28px;">
						</div>
					 
               	   </div>
               	   <div style="margin: 10px 10px">
	                     
<!-- 	                     <a style="display: initial; float: right; margin-right: 14px;"> (단위 : 천원)</a> -->  
	                     <div id="grid_wrap1" style="min-height: 90vh;"></div>
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
		
	 
		<script type="module" src="/resources/pan/js/sCl-Report.js?ver=2.0117.4"></script> 
		 <script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=1.0821.3"></script>
	</div>
	 
</body>
</html>