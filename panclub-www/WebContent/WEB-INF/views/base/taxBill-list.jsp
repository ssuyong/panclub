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

<!-- fancyBox -->
<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->
<script type="text/javascript"
	src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript"
	src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
<!-- fancyBox -->

<link
	href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
	rel="stylesheet" />
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>

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
							<h2 class="page-title">세금계산서목록</h2>
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
				<button class="btn btn-primary" id="btnTaxFind">조회</button>
				<!-- <button class="btn btn-primary" id="btnTaxSave">저장</button> -->
				<button class="btn btn-primary" id="btnTaxDel">삭제</button>
				<button class="btn btn-primary" id="btnSendHW">*전자세금계산서등록*</button>
				<button class="btn btn-primary" id="btnDelHW">*전자세금계산서취소*</button>
				<button class="btn btn-primary" id="btnHw">하이웍스..</button>
				<input type=hidden id="url_key"  >
				<input type=hidden id="office_key" >
				<input type=hidden id="access_key" >
				<input type=hidden id="bizNo" >
				<input type=hidden  id="link_url" >
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
											style="*min-width: 118px; width: auto; ">기간</label>
										<input type=hidden id="prmsYmd" value=${sYmd} > <input
											type=hidden id="prmeYmd" value=${eYmd} >

										<div class="row" style="display: contents;">
											<div class="col-md-6" style="width: auto; ">
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
											<label class="col-3 col-form-label"
											style="*min-width: 30px; width: auto;">거래처</label>
										<div class="col" style="width: auto; ">
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
										<label class="col-3 col-form-label " style="min-width: 80px; width: auto;">상태</label>
										<div class="col" style="width: auto; ">
											<select class="form-select" id="appStatus" style="width: 20%; max-width: 100px;">
												<option></option>
												<option>승인대기</option>
												<option>미발급</option>
												<option>반려</option>
												<option>승인</option>
											</select>
										</div>
										<label class="col-3 col-form-label " style="min-width: 80px; width: auto;">증빙유형</label>
										<div class="col" style="width: auto; ">
											<select class="form-select" id="expType" style="width: 20%; max-width: 100px;">
												<option></option>
												<option>현금영수증</option>
												<option>세금계산서</option>
												<option>카드</option>
											</select>
										</div>
										<label class="col-3 col-form-label " style="min-width: 80px; width: auto;">일반/보험</label>
										<div class="col" style="width: auto; ">
											<select class="form-select" id="clType2" style="width: 20%; max-width: 100px;">
												<option></option>
												<option>일반</option>
												<option>보험</option>
											</select>
										</div>
									</div>
								</div>
							</div>

							 <div class="form-group mb-3 row">
								<div style="margin: 2px 0px 0;">
									<span style="display: initial; float: right; margin-right: 10px;'">
										<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
									</span>
								</div>
								<div id="grid_wrap" style="width: 99.1%; height: 70vh;"></div>
								<!-- <div>
									<button class="btn btn-outline-info" onclick="removeRow()">행삭제</button>
								</div> -->

							</div>

							<div class="form-footer1"></div>
						</div>
					</div>
						<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
						<input type="text" id="pop_cust_srch" placeholder="거래처명">
						<button class="btn btn-dark" id="btnCustFind">조회</button>
						<div id="grid_wrap_cust" style="height: 90%;"></div>
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
			src="/resources/pan/js/taxBill-list.js?ver=1.0522.4"></script>
		<script type="text/javascript"
			src="/resources/pan/js/common-pan.js?ver=1.0309.3"></script>	
			
</body>
</html>