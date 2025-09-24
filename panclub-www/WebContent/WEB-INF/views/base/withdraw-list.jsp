<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>출금 관리</title>
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

<!-- fancyBox -->
<script type="text/javascript"
	src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript"
	src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />

</head>
<body class=" layout-fluid">

	<%@ page import="java.util.*"%>
	<%@ page import="java.text.*"%>
	<%
	String prmsYmd = ""; 
	prmsYmd= request.getParameter("sYmd");
	
	String prmeYmd = "";
	prmeYmd= request.getParameter("eYmd");
	
	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	Calendar cal = Calendar.getInstance();
			
	if (("").equals(prmsYmd) || prmsYmd == null ){
		cal.setTime(new Date());
		cal.add(Calendar.MONTH, -1);
	
		prmsYmd = dateFormat.format(cal.getTime());
		/* out.println(dateFormat.format(cal.getTime())); */
	}
	
	if (("").equals(prmeYmd) || prmeYmd == null ){
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
							<h2 class="page-title">출금 관리</h2>
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
				<button class="btn btn-primary" id="btndepFind">조회</button>
				<button class="btn btn-primary" id="btndepReg">등록</button>
				<button class="btn btn-primary" id="btndepSave">저장</button>
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
									<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">기간</label> 
										<input type=hidden id="prmsYmd" value=${sYmd} >
										 <input type=hidden id="prmeYmd" value=${eYmd} >
											<div class="row" style="display: contents; width: auto;">
											<div class="col-md-6" style="width: 280px">
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
											<input class="form-check-input" type="checkbox" id="ymdIgnoreYN"
											name="ymdIgnoreYN" > </label>
										</div>						
										<label class="col-3 col-form-label" style="min-width: 110px; width: auto;">거래처</label>
										<div class="col">
											<input type="text" id="custCode" class="form-control"
												aria-describedby="" placeholder="거래처코드"
												style="display: initial; width: 48%; max-width: 100px;"
												value="${custCode}" onKeyUp="findCust(this,'custName');"
												ondblclick="findCust(this,'custName',0,'Y');"> <input
												type="text" id="custName" class="form-control"
												aria-describedby="" placeholder="거래처명"
												style="display: initial; width: 48%; max-width: 200px;"
												disabled>
										</div>
										<label class="col-3 col-form-label" style="min-width: 110px; width: auto;">카드사</label>
										<div class="col">
											<select id="payCode1" class="form-select" style="width: auto; padding: 2px 20px 2px 0;">
												<option value=""></option>
											</select>
										</div>
										<label class="col-3 col-form-label" style="min-width: 110px; width: auto;">계좌</label>
										<div class="col">
											<select id="payCode2" class="form-select" style="width: auto; padding: 2px 20px 2px 0;">
												<option value=""></option>
											</select>
										</div>
									</div>
					</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label"
										style="min-width: 50px; width: auto; margin-left: 10px;">출금 구분</label>
									<div class="col" style="display: contents;">
										<select id="payType" class="form-select"
											style="width: auto; padding: 2px 20px 2px 0;">
											<option value=""></option>
										</select>
									</div>
									<label class="col-3 col-form-label " style="min-width: 50px; width: auto;">현금영수증 발행여부</label>
										<div class="col" style="display: contents;" > 
											<select id="cashRectYN" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="Y">발행</option>
												<option value="N">미발행</option>
											</select>
									 
								</div>
									<label class="col-3 col-form-label"
										style="min-width: 30px; width: auto;">출금요청번호</label>
									<div class="col">
										<input type="text" id="wdReqNo" class="form-control"
											style="width: 60%; max-width: 200px;" placeholder="">
									</div>
									<label class="col-3 col-form-label"
										style="min-width: 30px; width: auto;">비고</label>
									<div class="col">
										<input type="text" id="memo" class="form-control"
											style="width: 60%; max-width: 200px;" placeholder="">
									</div>
								</div>
							

							</div>
							
						</div>
								<div class="form-group mb-3 row" >
									<div style="margin: 2px 0px 0;">
									<span> <input type="button" class="btn btn-secondary" onclick="cashChk('/base/withdrawAdd' , 'CHK')" value="현금영수증발행"></span>
										<span style="display: initial; float: right; margin-right: 10px;'">
											<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
										</span>
									</div>
								</div>
						<div class="form-group mb-3 row">
							<div id="grid_wrap" style="width: 99.1%; height: 70vh;"></div>
							<div>
								<button class="btn btn-outline-info" onclick="removeRow()">행삭제</button>
							</div>

						</div>

						<div class="form-footer1"></div>
					</div>
				</div>

			</div>

			<%-- <%@ include file="../icld/footer.jsp" %> --%>

		</div>
	</div>
	
	<!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch" placeholder="거래처명" >
		<button class="btn btn-dark" id="btnCustFind">조회</button>
		<div id="grid_wrap_cust" style="height: 90%;"></div>
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
		src=/resources/pan/js/withdraw-list.js?ver=1.0619.4"></script>
	<script type="text/javascript"
		src="/resources/pan/js/common-pan.js?ver=2.0303.3"></script>

</body>
</html>