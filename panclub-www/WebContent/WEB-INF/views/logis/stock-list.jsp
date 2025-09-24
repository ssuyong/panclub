<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
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
							<h2 class="page-title">재고 내역</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnFind">조회</button>
				<!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
				<button class="btn btn-primary" id="btnUpt">수동처리</button>
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">
									<!-- <form> -->
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="min-width: 118px; width: auto;">제조사</label>
										<div class="col">
											<select id="makerCode" class="form-select"
												style="width: auto; padding: 2px 20px 2px 0;">
												<option value=""></option>
											</select>
										</div>
										<label class="col-3 col-form-label"
											style="min-width: 118px; width: auto;">부품ID</label>
										<div class="col">
											<input type="text" id="itemId" class="form-control"
												aria-describedby="" placeholder=""
												style="width: 60%; max-width: 300px;">
										</div>

										<label class="col-3 col-form-label"
											style="min-width: 118px; width: auto;">품번</label>
										<div class="col">
											<input type="text" id="itemNo" class="form-control"
												aria-describedby="" placeholder=""
												style="width: 60%; max-width: 300px;">
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">부품명</label>
										<div class="col">
											<input type="text" id="itemName" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>



									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">클래스</label>
										<div class="col">
											<select id="classCode" class="form-select"
												style="width: auto; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="GN">정품</option>
												<option value="AM">애프터마켓</option>
												<option value="RM">재제조</option>
												<option value="ET">기타</option>
											</select>
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">창고</label>
										<div class="col">
											<input type="text" id="storName" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label"
										style="*min-width: 118px; width: auto;">기간</label> <input
										type=hidden id="prmsYmd" value=${sYmd} > <input
										type=hidden id="prmeYmd" value=${eYmd} >

									<div class="row" style="display: contents;">
										<div class="col-md-6">
											<div 
												class="tui-datepicker-input tui-datetime-input tui-has-focus">
												<input id="startpicker-input" type="text" aria-label="Date">
												<span class="tui-ico-date"></span>
												<div id="startpicker-container" style="margin-left: -1px;"></div>
											</div>
											<span>~</span>
											<div
												class="tui-datepicker-input tui-datetime-input tui-has-focus">
												<input id="endpicker-input" type="text" aria-label="Date">
												<span class="tui-ico-date"></span>
												<div id="endpicker-container" style="margin-left: -1px;"></div>
											</div>
										</div>
									</div>
										


									</div>

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
		<script type="text/javascript"
			src="/resources/pan/js/stock-list.js?ver=1.0105.3"></script>
		<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%>
</body>
</html>