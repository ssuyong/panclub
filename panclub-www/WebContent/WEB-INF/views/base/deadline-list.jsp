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

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

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
							<div class="page-pretitle" style="display: none;">요약</div>
							<h2 class="page-title">마감일 등록</h2>
						</div>
						<!-- Page title actions -->
						<div class="col-12 col-md-auto ms-auto d-print-none"
							style="display: none;">
							<div class="btn-list">
								<span class="d-none d-sm-inline"> <a href="#"
									class="btn btn-white"> New view </a>
								</span> <a href="#" class="btn btn-primary d-none d-sm-inline-block"
									data-bs-toggle="modal" data-bs-target="#modal-report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
										height="24" viewBox="0 0 24 24" stroke-width="2"
										stroke="currentColor" fill="none" stroke-linecap="round"
										stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" /></svg> Create new report
								</a> <a href="#" class="btn btn-primary d-sm-none btn-icon"
									data-bs-toggle="modal" data-bs-target="#modal-report"
									aria-label="Create new report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
										height="24" viewBox="0 0 24 24" stroke-width="2"
										stroke="currentColor" fill="none" stroke-linecap="round"
										stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" /></svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnDeadlineReg">저장</button>
				<span  style=" display: flex; float: right;    margin-right: 150px; ">
					<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
						<input type="text" id="datepicker-input5" aria-label="Date-Time"> <span class="tui-ico-date"></span>
					</div>
					<div id="wrapper5" style="margin-top: -1px;"></div>
					<button class="btn btn-primary" id="btnStockYM" >재고원가생성</button> 
				</span>
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
									<!-- <form> -->
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="*min-width: 118px; width: auto;">입고 마감</label>
										<div
											class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input1"
												aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper1" style="margin-top: -1px;"></div>
									</div>

									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="*min-width: 118px; width: auto;">출고 마감</label>
										<div
											class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input2"
												aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper2" style="margin-top: -1px;"></div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="*min-width: 118px; width: auto;">입금 마감</label>
										<div
											class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input3"
												aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper3" style="margin-top: -1px;"></div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="*min-width: 118px; width: auto;">출금 마감</label>
										<div
											class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input4"
												aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper4" style="margin-top: -1px;"></div>
									</div>

								</div>
							</div>
							<div class="form-group mb-3 row">
								<label class="col-3 col-form-label"
									style="*min-width: 118px; width: auto;"><h3>현재 마감
										일자</h3></label>
							</div>

							<div class="form-group mb-3 row">
								<div id="grid_wrap" style="width: 99.1%; height: 7vh;"></div>
							</div>

							<div class="form-footer1"></div>
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
		<script type="text/javascript"
			src="/resources/pan/js/deadline-list.js?ver=6.0606.3"></script>
</body>
</html>