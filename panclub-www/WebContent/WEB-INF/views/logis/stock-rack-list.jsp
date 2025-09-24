<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>랙(위치)별 재고</title>
<!-- Aui 인쇄 -->
<script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
<!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>

<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">
	
<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<!-- fancyBox -->
<script type="text/javascript"
	src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript"
	src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
<!-- fancyBox -->
<link href="/resources/pan/css/barcodePrint.css?ver=1.0530.4" rel="stylesheet" /> 
</head>
<body class=" layout-fluid">

	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<h2 class="page-title">랙(위치)별 재고</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnFind">조회</button>
				<button class="btn btn-primary" id="btnbulkSrch_sectionOnOff">다중조회 On</button>
				<!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
				<!-- <button class="btn btn-primary" id="btnUpt">수동처리</button>  -->
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card" id="idDiv_nomalSrch_section" style="display: block;">
								
								<div class="card-body">
									<!-- <form> -->
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"	style="*min-width: 118px; width: auto;">수정일</label> 
										<input	type=hidden id="prmsYmd" value=${sYmd} > 
										<input type=hidden id="prmeYmd" value=${eYmd} >

										<div class="row" style="display: contents;">
											<div class="col-md-6" style="width:auto;">
												<div 
													class="tui-datepicker-input tui-datetime-input tui-has-focus">
													<input id="startpicker-input" type="text" aria-label="Date"  value="${sYmd}">
													<span class="tui-ico-date"></span>
													<div id="startpicker-container" style="margin-left: -1px;"></div>
												</div>
												<span>~</span>
												<div
													class="tui-datepicker-input tui-datetime-input tui-has-focus">
													<input id="endpicker-input" type="text" aria-label="Date" value="${eYmd}">
													<span class="tui-ico-date"></span>
													<div id="endpicker-container" style="margin-left: -1px;"></div>
												</div>
												<label class="form-check form-check-inline" > 기간 전체조회
											<input class="form-check-input" type="checkbox" id="ymdIgnoreYN"
											name="ymdIgnoreYN"  checked="checked"> </label>
											</div>
										
										<label class="col-3 col-form-label " style="min-width: 80px; width:auto;">창고</label>
					                    <select class="form-select" id="storageCode"  style="width:60%; max-width:200px;">
					                      	<option></option>
					                      </select>
					                     
										<!-- </div>
	
										<label class="col-3 col-form-label " style="min-width: 118px; width: auto;">창고코드</label>
										<div class="col">
											<input type="text" id="storCode" class="form-control"	style="width: 60%; max-width: 300px;" placeholder="">
										</div>										
										<label class="col-3 col-form-label " style="min-width: 118px; width: auto;">창고명</label>
										<div class="col">
											<input type="text" id="storName" class="form-control"	style="width: 60%; max-width: 300px;" placeholder="">
									
										
											
										
										</div> -->
																				
										<label class="col-3 col-form-label " style="min-width: 118px; width: auto;">랙코드</label>
										<div class="col">
											<input type="text" id="rackCode" class="form-control barcodeReaderInput_rackCode"	style="width: 60%; max-width: 300px;" placeholder="">
										</div>										
										<label class="col-3 col-form-label " style="min-width: 118px; width: auto;">랙명</label>
										<div class="col">
											<input type="text" id="rackName" class="form-control barcodeReaderInput_rackName"	style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label " style="min-width: 118px; width: auto;">클래스</label>
										<div class="col">
											<select id="classCode" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="GN">정품</option>
												<option value="AM">애프터마켓</option>
												<option value="RM">재제조</option>
												<option value="ET">기타</option>
											</select>
										</div>									
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">제조사</label>
										<div class="col">
											<select id="makerCode" class="form-select"	style="width: auto; padding: 2px 20px 2px 0;">
												<option value=""></option>
											</select>
										</div>
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">부품ID</label>
										<div class="col">
											<input type="text" id="itemId" class="form-control barcodeReaderInput_itemId"	value="${itemId}"	aria-describedby="" placeholder=""	style="width: 60%; max-width: 300px;">
										</div>

										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">품번</label>
										<div class="col">
											<input type="text" id="itemNo" class="form-control barcodeReaderInput_itemNo"	aria-describedby="" placeholder=""	style="width: 60%; max-width: 300px;">
										</div>
										<label class="col-3 col-form-label "	style="min-width: 118px; width: auto;">부품명</label>
										<div class="col">
											<input type="text" id="itemName" class="form-control barcodeReaderInput_itemName"	style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label "	style="min-width: 118px; width: auto;">&nbsp;</label>
										<div class="col">&nbsp;	</div>
									</div>
									

								</div>
								</div>
								</div>
							<div id="idDiv_bulkSrch_section" style="float:left; border:1px solid #eee;height:500px; padding:0 1px; display:none;">
									 
								   <nav> 
								    	<div style="padding:3px">
								    	<input type="radio"	value="itemId" name="bulkSrchType" id="" class="" 
								   		style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" ><span style="padding-right: 12px;">부품ID</span> 
								    	<input type="radio"	value="itemNo" name="bulkSrchType" id="" class="" 
								    	 	style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" checked><span>품번</span>
								    	</div>
								    
								        <div>
								        	<textarea rows="10" cols="20" style="height:59vh;border:1px solid #bbb; font-size:14px; " wrap="off" id="item_bulk" name="item_bulk" class="barcodeReaderInput_bulk"
								        	></textarea>
								        </div>
								        <div>	
								        	<button class="" onClick="txtAreaReset()" 
								        	style="font-size: 13px; width: 60px; border: 1px solid #aaa; background-color: #fff; border-radius: 3px; color:#555; padding:2px;"}>
								        	RESET</button>
								        	<!-- <button class="" onClick="javascript:fn_goodsSrch(0,'bulk_Y');"
								        	style="font-size: 13px; width: 60px; border: 1px solid #aaa;background-color: #ebfaff; border-radius: 3px; color:#555; padding:2px;" >
								        	SEARCH</button> -->
								        </div>	
								    </nav>	    
							</div>
								
							<div class="form-group mb-3 row"  >
									<div>
										<span style="display: initial; float: right; margin-right: 10px;'">
											<input type="button" class="btn btn-secondary " onclick="barcodePrintItem()" value="바코드인쇄">
											<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
										</span>
									</div>
							</div>
							 

							<div class="form-group mb-3 row">											
								<div id="grid_wrap" style="width: 99.1%; height: 70vh;"></div>
							</div>

							<div class="form-footer1"></div>
						</div>
					</div>

				</div>

				<%-- <%@ include file="../icld/footer.jsp" %> --%>

			</div>
			</div>
		</div>
		<!-- 라벨출력을 위한 div -->
		<input type="text" id="barcodeInput"  style="position:relative; left:-2000px; top:-100000px;">
		<div id="barcodePrintDiv"> </div>

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
		<script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
	    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
		<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=1.0530.4"></script>
		<script type="text/javascript"			src="/resources/pan/js/stock-rack-list.js?ver=1.0530.4"></script>
		<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0102.4"></script>
		<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%>
</body>
</html>