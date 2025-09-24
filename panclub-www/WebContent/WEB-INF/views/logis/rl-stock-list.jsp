<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>출고 부품 조회</title>
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
							<h2 class="page-title">출고 부품 조회</h2>
						</div>
						
						
<!-- 						<label class="col-3 col-form-label " style="min-width: 50px; width:auto; margin-left:15px">기간검색</label> -->
<!-- 		  			   <div class="col" style="width:auto;"> -->
<!-- 						 <select class="form-select" id="startYmSerch"  style="width:auto;min-width: 120px; "> -->
<!-- 						 	<option>전체</option> -->
<!-- 						 </select> -->
<!-- 						 <label>~</label> -->
<!-- 						 <select class="form-select" id="endYmSerch"  style="width:auto;min-width: 120px; "> -->
<!-- 						 	<option>전체</option> -->
<!-- 						 </select> -->
<!-- 		   			  	</div> -->
		   			  	
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 10px;">
				<button class="btn btn-primary" id="btnFind">조회</button>
				<!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
				<!-- <button class="btn btn-primary" id="btnUpt">수동처리</button>  -->
				 
			</div>
			
			 
	 		<div class="col-md-6" style="width: auto; padding: 0 0 0 20px;">
				<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
					<input id="startYmSerch" type="text" aria-label="Year-Month">
					<span class="tui-ico-date"></span>
					<div id="startpicker-container" style="margin-left: -1px;"></div>
				</div>
				<span>~</span>
				<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
					<input id="endYmSerch" type="text" aria-label="Year-Month">
					<span class="tui-ico-date"></span>
					<div id="endpicker-container" style="margin-left: -1px;"></div>
				</div>
			</div>
			
			
		
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							

							<div class="form-group mb-3 ">
								<div style="margin: 2px 0px 0;">
<!-- 									<span>  -->
<!-- 										<input type="button" id="btnUpt" class="btn btn-secondary" value="수동처리"> -->
<!-- 									</span> -->
									<span style=" display: initial; float: right;">
<!-- 				                      	<input type="button" class="btn btn-secondary" onclick="popLink('/logis/stock-rack-list')" value="랙별재고"> -->
<!-- 				                      	<input type="button" class="btn btn-secondary" onclick="popLink('/logis/stock-actions-list')" value="재고이력">	 -->
				                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">			                      	                     	
			                      	</span>
								</div>
								
								<!-- 대량조회 -->
							  	<div id="idDiv_bulkSrch_section" style="float:left; border:1px solid #eee;height:500px; padding:0 1px; *display:none;">
									<header_ba >
							        <div id="hamburger">
							            <div></div>
							            <div></div>
							            <div></div>
							        </div>
								    </header_ba>
								    <nav>
								    	<div style="padding:3px">
<!-- 								    	<input type="radio"	value="itemId" name="bulkSrchType" id="" class=""  -->
<!-- 								    		style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" ><span style="padding-right: 12px;">부품ID</span>  -->
<!-- 								    	<input type="radio"	value="itemNo" name="bulkSrchType" id="" class=""  -->
<!-- 								    	 	style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" checked><span>품번</span> -->
								    	</div>
								        <div>
								        	<textarea rows="10" cols="20" style="height:59vh;border:1px solid #bbb; font-size:14px; " wrap="off" id="item_bulk" name="item_bulk" 
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
								<!-- 대량조회 END -->
								<div>
								<div id="grid_wrap" style="width: 88%; height: 70vh;"></div>
								</div>
							</div>

							<div class="form-footer1"></div>
						</div>
					</div>

				</div>

				<%-- <%@ include file="../icld/footer.jsp" %> --%>

			</div>
		</div>

		<!-- Tabler Libs JS -->
		<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"			defer></script>
		<script			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"			defer></script>
		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>
		<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
		<script type="text/javascript"			src="/resources/pan/js/rl-stock-list.js?ver=1.1123.3"></script>
		<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%>
		<script type="text/javascript"
			src="/resources/pan/js/common-pan.js?ver=2.0323.3"></script>
</body>
</html>