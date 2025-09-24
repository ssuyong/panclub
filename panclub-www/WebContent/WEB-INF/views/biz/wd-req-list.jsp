<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>출금요청 내역</title>
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
<!-- fancyBox -->

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
							<h2 class="page-title">출금요청 내역</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnFind">조회(F9)</button>
				<!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->

			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">
									<!-- <form> -->
									<div class="form-group mb-3 row">
		
										<!-- <label class="col-3 col-form-label"
											style="*min-width: 118px; width: auto;">요청일</label> <input
											type=hidden id="prmsYmd" value=${sYmd} > <input
											type=hidden id="prmeYmd" value=${eYmd} >

										<div class="col" style="display: contents;">
											<div class="col-3 col-form-label">
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
											<div class="col" style="margin-left: -150px;">
												<label class="form-check form-check-inline"
													style="margin-top: 3px"> 기간 전체조회 <input
													class="form-check-input" type="checkbox" id="ymdIgnoreYN"
													name="ymdIgnoreYN">
												</label>
											</div>
										</div> -->
											<label class="col-3 col-form-label " style="min-width: 70px; width: auto;">기준일자  </label>
										<div style="width: 100px!important">
											<select id="wdDateType" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value="출금요청일">출금요청일</option>
												<option value="출금일">출금일</option>
											</select>
										</div>          
										<div class="row" style="display: contents; ">
											<div class="col-md-6" style="width: auto; ">
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


										<label class="col-3 col-form-label"
											style="*min-width: 30px; width: auto;">발주처</label>
										<div class="col">

											<input type="text" id="custCode" class="form-control"
												aria-describedby="" placeholder="거래처코드"
												style="display: initial; width: 48%; max-width: 100px;"
												value="${custCode}" onKeyUp="findCust(this,'custName');"
												ondblclick="findCust(this,'custName',0,'Y');"> <input
												type="text" id="custName" class="form-control"
												aria-describedby="" placeholder="거래처명"
												style="display: initial; width: 48%; max-width: 200px;"
												value="${custName}" disabled>
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">요청번호</label>
										<div class="col">
											<input type="text" id="wdReqNo" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<div
											style="display: flex; justify-content: space-between; width: 500px;">
											<label style="margin-left: 10px">출금유형 </label>
											<div class="col" style="margin-left: 10px">
												<select id="wdReqType" class="form-select"
													style="width: auto; padding: 2px 25px 2px 0;">
													<option value="" selected></option>
													<option value="발주출금">발주출금</option>
													<option value="입고출금">입고출금</option>

												</select>
											</div>
											<label style="margin-left: 10px">결제여부 </label>
											<div class="col" style="margin-left: 10px">
												<select id="payStatus" class="form-select"
													style="width: auto; padding: 2px 25px 2px 0;">
													<option value="" ></option>
													<option value="출금">출금완료</option>
													<option value="미출금" selected>출금미완료</option>
													<!-- <option value="일부출금">일부출금</option> -->
												</select>
											</div>
										</div>


									</div>


								</div>
							</div>

							<div class="form-group mb-3 row">
								<div style="margin: 2px 0px 0;">
									<span> <input type="button" class="btn btn-secondary"
										onclick="reqChk('/biz/whReqBuyChkAdd','REQ_CANCEL')"
										value="요청취소"> <!-- <input type="button" class="btn btn-secondary" onclick="buyChk('/biz/whReqBuyChkAdd','BUY_CHK')" value="매입확정" >
	                  		<input type="button" class="btn btn-secondary" onclick="buyChk('/biz/whReqBuyChkAdd','CANCEL')" value="매입확정취소"> -->
										<input type="button" id="btndepReg" class="btn btn-secondary"
										value="출금확정">
									</span>
									<span style="display: initial; float: right; margin-right: 20px;'">
											<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
										</span>
								</div>
							</div>
							<div id="grid_wrap" style="width: 99.1%; height: 70vh;"></div>
						</div>

						<div class="form-footer1"></div>
					</div>
				</div>

			</div>

		</div>
	</div>

	<!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch" placeholder="거래처명">
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
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"	defer></script>
	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>
	<script type="text/javascript"		src="/resources/pan/js/wd-req-list.js?ver=1.0711.4" defer></script>
	<script type="text/javascript"		src="/resources/pan/js/common-pan.js?ver=1.0410.3" defer></script>

</body>
</html>