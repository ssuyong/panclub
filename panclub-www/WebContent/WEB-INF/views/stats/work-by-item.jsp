<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>부품거래내역</title>	
  <!-- Begin: Tab 사용 -->	 	
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <!-- End: Tab 사용 -->
  
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->

    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	    
</head>
<body class=" layout-fluid">

		
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
		<div class="spinner" id="spinner"></div>
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<h2 class="page-title">부품거래내역</h2>
						</div>
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnFind">조회</button>
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">
						<div class="*col-md-6">
							<div class="card">
								<div class="card-header" style="display: none;">
									<h3 class="card-title">Horizontal form</h3>
								</div>
								<div class="card-body">
																
								<div class="form-group mb-3 row">                    
			                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">기준일</label>
			                      <!-- 	<input type=hidden id="srchSYmd" >
									<input type=hidden id="srchEYmd" >
									<input type=hidden id="srchIgnorYmd" >
									<input type=hidden id="srchItemId" >
									<input type=hidden id="srchItemNo" > -->
																					
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
									    	<div class="col" style="margin-top: 3px;">
												<label class="form-check form-check-inline" style="margin-top: 3px"> 기간 전체조회
												<input class="form-check-input" type="checkbox" id="ymdIgnoreYN" name="ymdIgnoreYN" > </label>
											</div>	
									</div>
								  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품ID</label>
			                      <div class="col">
			                        <input type="text" id="itemId" value="${itemId}"class="form-control" style="width:60%; max-width:300px;" placeholder="" >
			                      </div>
			                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">품번</label>
			                      <div class="col">
			                        <input type="text" id="itemNo" value="${itemNo}" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
			                      </div>
			                     <!--  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">품명</label>
			                      <div class="col">
			                        <input type="text" id="itemName" value="" class="form-control" style="width:60%; max-width:300px;" placeholder="" disabled>
			                      </div>
			                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">제조사</label>
			                      <div class="col">
			                        <input type="text" id="makerName" value="" class="form-control" style="width:60%; max-width:300px;" placeholder=""  disabled>			                       
			                      </div> -->
			                      
			                    </div>   				                      					     
								</div>            
			                </div>               
																
								
								
								<div id="tabs">
								  <ul>
								     <li><a href="#tabs-1" id="tabRl">출고</a></li>
								     <li><a href="#tabs-2" id="tabWh">입고</a></li>
								     <li><a href="#tabs-3" id="tabPl">발주</a></li>
								     <li><a href="#tabs-4" id="tabSu">창고사용</a></li>
								     <li><a href="#tabs-5" id="tabOd">주문</a></li>
								     <li><a href="#tabs-6" id="tabEt">견적</a></li>
								   <!--  <li ><a href="#tabs-2">Proin dolor</a></li>
								    <li><a href="#tabs-3">Aenean lacinia</a></li> -->
								  </ul>
								  <div id="tabs-1">
								   <!--  <p>출고</p> -->
									<div class="form-group mb-3 row">
										<div id="grid_wrap_rl" style="width:99.1%;height:70vh;"></div>
									</div>								   
								  </div>

								  <div id="tabs-2">
								    <!-- <p>입고</p> -->
									<div class="form-group mb-3 row">
										<div id="grid_wrap_wh" style="width:99.1%;height:70vh;"></div>
									</div>								   
								  </div>
								  
								  <div id="tabs-3">
								   <!--  <p>발주</p> -->
									<div class="form-group mb-3 row">
										<div id="grid_wrap_pl" style="width:99.1%;height:70vh;"></div>
									</div>								   
								  </div>

								  <div id="tabs-4">
								    <!-- <p>창고사용</p> -->
									<div class="form-group mb-3 row">
										<div id="grid_wrap_su" style="width:99.1%;height:70vh;"></div>
									</div>								   
								  </div>

								  <div id="tabs-5">
								   <!--  <p>주문</p> -->
									<div class="form-group mb-3 row">
										<div id="grid_wrap_od" style="width:99.1%;height:70vh;"></div>
									</div>								   
								  </div>

								  <div id="tabs-6">
								  <!--   <p>견적</p> -->
									<div class="form-group mb-3 row">
										<div id="grid_wrap_et" style="width:99.1%;height:70vh;"></div>
									</div>								   
								  </div>


								 <!--  <div id="tabs-2">
								    <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
								  </div>
								  <div id="tabs-3">
								    <p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
								    <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
								  </div> -->
								</div>


									
								</div>
							</div>


							<div class="form-footer1"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

     <!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<input type="hidden" id="grid-custCode1" name="grid-custCode1" value="">
		<input type="hidden" id="grid-custName1" name="grid-custName1" value="">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnCustFind" >조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
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
		<script type="text/javascript"			src="/resources/pan/js/work-by-item.js?ver=4.0305.4"></script>
		    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.0427.3"></script> 
</body>
</html>