<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<!--
* Tabler - Premium and Open Source dashboard template with responsive and high quality UI.
* @version 1.0.0-beta11
* @link https://tabler.io
* Copyright 2018-2022 The Tabler Authors
* Copyright 2018-2022 codecalm.net PaweÅ Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
-->

<html>
<head>
<%@ include file="../icld/head.jsp"%>

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->
</head>
<body class=" layout-fluid">
	<%@ page import="java.util.*"%>
	<%@ page import="java.text.*"%>
	<%
	String prmsYmd = "";
	prmsYmd = request.getParameter("sYmd");

	String prmeYmd = "";
	prmeYmd = request.getParameter("eYmd");

	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	Calendar cal = Calendar.getInstance();

	if (("").equals(prmsYmd) || prmsYmd == null) {
		cal.setTime(new Date());
		cal.add(Calendar.MONTH, -1);

		prmsYmd = dateFormat.format(cal.getTime());
		/* out.println(dateFormat.format(cal.getTime())); */
	}

	if (("").equals(prmeYmd) || prmeYmd == null) {
		cal.setTime(new Date());
		cal.add(Calendar.MONTH, 0);

		prmeYmd = dateFormat.format(cal.getTime());
		/* out.println(dateFormat.format(cal.getTime())); */
	}
	%>
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
							<h2 class="page-title">접속현황</h2>
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
				<button class="btn btn-primary" id="btnLogFind">조회</button>
				<!-- <button class="btn btn-primary" id="btnStaffReg">저장</button> -->
				<!-- <button class="btn btn-primary" id="btn" onclick=" statusChk()">테스틍</button> -->
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
											style="*min-width: 118px; width: auto;">접속시간</label> 
											<!-- <input type=hidden id="prmsYmd" value=${sYmd} > 
											<input type=hidden id="prmeYmd" value=${eYmd} >
 -->
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
									<% if (("ㄱ000").equals(comCode) || ("ㅋ127").equals(comCode))  {  //ㅋ127 추가. hsg 2024.10.18%>
										<label class="col-3 col-form-label"
											style="min-width: 118px; width: auto;">회사코드</label>
										<div class="col">
											<input type="text" id="comCode" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									<%} %>	
										<label class="col-3 col-form-label"
											style="min-width: 118px; width: auto;">사용자아이디</label>
										<div class="col">
											<input type="text" id="userId" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
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

				<!-- 	<div class="form-group mb-3 row">
					<div style="margin: 2px;">
						<button class="btn btn-outline-info"
							onclick="addRow1(myGridID,'last')">행추가</button>
						<button class="btn btn-outline-info" onclick="removeRow1()">행삭제</button>
					</div>
				</div> -->
			</div>


			<%-- <%@ include file="../icld/footer.jsp" %> --%>

		</div>
	</div>
	<div class="modal modal-blur fade" id="modal-report" tabindex="-1"
		role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">New report</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label class="form-label">Name</label> <input type="text"
							class="form-control" name="example-text-input"
							placeholder="Your report name">
					</div>
					<label class="form-label">Report type</label>
					<div class="form-selectgroup-boxes row mb-3">
						<div class="col-lg-6">
							<label class="form-selectgroup-item"> <input type="radio"
								name="report-type" value="1" class="form-selectgroup-input"
								checked> <span
								class="form-selectgroup-label d-flex align-items-center p-3">
									<span class="me-3"> <span class="form-selectgroup-check"></span>
								</span> <span class="form-selectgroup-label-content"> <span
										class="form-selectgroup-title strong mb-1">Simple</span> <span
										class="d-block text-muted">Provide only basic data
											needed for the report</span>
								</span>
							</span>
							</label>
						</div>
						<div class="col-lg-6">
							<label class="form-selectgroup-item"> <input type="radio"
								name="report-type" value="1" class="form-selectgroup-input">
								<span
								class="form-selectgroup-label d-flex align-items-center p-3">
									<span class="me-3"> <span class="form-selectgroup-check"></span>
								</span> <span class="form-selectgroup-label-content"> <span
										class="form-selectgroup-title strong mb-1">Advanced</span> <span
										class="d-block text-muted">Insert charts and additional
											advanced analyses to be inserted in the report</span>
								</span>
							</span>
							</label>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-8">
							<div class="mb-3">
								<label class="form-label">Report url</label>
								<div class="input-group input-group-flat">
									<span class="input-group-text">
										https://tabler.io/reports/ </span> <input type="text"
										class="form-control ps-0" value="report-01" autocomplete="off">
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="mb-3">
								<label class="form-label">Visibility</label> <select
									class="form-select">
									<option value="1" selected>Private</option>
									<option value="2">Public</option>
									<option value="3">Hidden</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-lg-6">
							<div class="mb-3">
								<label class="form-label">Client name</label> <input type="text"
									class="form-control">
							</div>
						</div>
						<div class="col-lg-6">
							<div class="mb-3">
								<label class="form-label">Reporting period</label> <input
									type="date" class="form-control">
							</div>
						</div>
						<div class="col-lg-12">
							<div>
								<label class="form-label">Additional information</label>
								<textarea class="form-control" rows="3"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-link link-secondary"
						data-bs-dismiss="modal"> Cancel </a> <a href="#"
						class="btn btn-primary ms-auto" data-bs-dismiss="modal"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
						<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
							height="24" viewBox="0 0 24 24" stroke-width="2"
							stroke="currentColor" fill="none" stroke-linecap="round"
							stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" /></svg> Create new report
					</a>
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
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
		defer></script>
	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>
	<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
	<script type="text/javascript"
		src="/resources/pan/js/userLog.js?ver=2.0302.3"></script>

</body>
</html>