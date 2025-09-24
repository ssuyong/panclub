<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>

<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>세금계산서등록</title>
<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>


</head>
<body class=" layout-fluid">
	<div class="page">
		<%--        
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>    --%>

		<div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<h2 class="page-title">세금계산서등록</h2>
						</div>
					</div>
				</div>
			</div>

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnReg">저장</button>
				<button class="btn btn-primary  " id="btnClose">닫기</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">
									<input type="hidden" id="clGroupId" value="${clGroupId}" />
					                <input type="hidden" id="clType" value="${clType}" /> 
					                <input type="hidden" id="insure1CollAmt" value="${insure1CollAmt}" />
					                <input type="hidden" id="insure2CollAmt" value="${insure2CollAmt}" />
					                <input type="hidden" id="clAmt" value="${clAmt}" />
					                <input type="hidden" id="insure1Code" value="${insure1Code}" />
					                <input type="hidden" id="insure2Code" value="${insure2Code}" />
					                <input type="hidden" id="custCode2" value="${custCode2}" />
					                <input type="hidden" id="expTypeVal" value="${expType}" />
					                <input type="hidden" id="clgArr" value="${clgArr}" />
					                <input type="hidden" id="summary" value="${summary}" />
					                <input type="hidden" id="seq" value="${seq}" />
								
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label "
											style="*min-width: 118px; width: auto;">세금계산서번호</label> <span
											id="taxBillNo_upt">${taxBillNo}</span>
									</div>
									<div class="form-group mb-3 row">

										<label class="col-3 col-form-label required required"
											style="*min-width: 118px; width: auto;">등록 일자</label>
										<div
											class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input1"
												aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper1" style="margin-top: -1px;"></div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 100px; width: auto;">사업자 구분</label>
										<div class="col">
											<div>
												<label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio1" type="radio"
													onClick="formClear3()" name="bizType" value="사업자">
													<span class="form-check-label">사업자</span>
												</label> <label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio2" type="radio"
													onClick="formClear3()" name="bizType" value="개인" checked>
													<span class="form-check-label">개인</span>
												</label>
											</div>
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 100px; width: auto;">과세 구분</label>
										<div class="col">
											<div>
												<label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio3" type="radio"
													name="taxTypeName" value="과세" checked> <span
													class="form-check-label">과세</span>
												</label> <label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio4" type="radio"
													name="taxTypeName" value="영세"> <span
													class="form-check-label">영세</span>
												</label> <label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio5" type="radio"
													name="taxTypeName" value="면세" > <span
													class="form-check-label">면세</span>
												</label>
											</div>
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 100px; width: auto;">청구 구분</label>
										<div class="col">
											<div>
												<label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio6" type="radio"
													name="clType" value="청구" checked> <span
													class="form-check-label">청구</span>
												</label> <label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio7" type="radio"
													name="clType" value="영수"> <span
													class="form-check-label">영수</span>
												</label>
											</div>
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 100px; width: auto;">거래처 유형</label>
										<select id="custType" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value="미선택"></option>
												<option value="일반">일반</option>
												<option value="보험1">보험1</option>
												<option value="보험2">보험2</option>
										</select>
										<label class="col-3 col-form-label required"
											style="min-width: 100px; width: auto;">증빙 유형</label>
										<select id="expType" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="현금영수증">현금영수증</option>
												<option value="세금계산서">세금계산서</option>
												<option value="카드">카드</option>
										</select>
									</div>
									<div id="cust" class="form-group mb-3 row">
										<label class="col-3 col-form-label required" style="min-width: 30px; width: auto;">거래처</label>
										<div class="col">
											<input type="text" id="custName" class="form-control"
												onClick="openFCustDialog()"
												style="width: 60%; max-width: 300px;" placeholder="">
											<!-- <input type="text" id="custName" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder=""> -->
										</div>
										<div>
											<input type="hidden" id="custCode" class="form-control" style="width: 60%; max-width: 300px;">
										</div>
										<label class="col-3 col-form-label required"
											style="min-width: 100px; width: auto;">대표자명</label>
										<div class="col">
											<input type="text" id="ceoName" class="form-control" style="width: 60%; max-width: 300px;">
										</div>
										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">사업자번호</label>
										<div class="col">
											<input type="text" id="bizNo1" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div id="person" class="form-group mb-3 row">
										<label class="col-3 col-form-label " style="*min-width: 100px; width: auto;">개인 이름</label>
										<div class="col">
											<input type="text" id="pName" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label" style="min-width: 100px; width: auto;">주민등록번호</label>
										<div class="col">
											<input type="text" id="bizNo2" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div class="form-group mb-3 row">

										<label class="col-3 col-form-label" style="min-width: 30px; width: auto; ">주소</label>
										<div style="display: block;">
											<input type="text" id="address" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">전화</label>
										<div>
											<input type="text" id="phone" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">팩스</label>
										<div >
											<input type="text" id="fax" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label required"
											style="min-width: 30px; width: auto;">이메일</label>
										<div >
											<input type="text" id="taxEmail" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">품명</label>
										<div >
											<input type="text" id="itemName" class="form-control"
												style="width: 60%; max-width: 300px;" value="부품대" placeholder="">
										</div>
									</div>

									<div id="money-input" class="form-group mb-3 row" style="margin-top:10px;">
										<label class="col-3 col-form-label required"
											style="min-width: 30px; width: auto;">공급가액</label>
										<div class="col">
										<input type="hidden" id="supPriceSave" class="form-control" value = "${sumPrice}">
											<input type="text" id="supPrice" class="form-control" 
												onblur="vatCal(1)" style="width: 60%; max-width: 300px;"
												placeholder="">
										</div>
										<label class="col-3 col-form-label required"
											style="min-width: 30px; width: auto;">부가세</label>
										<div class="col">
											<input type="text" id="vat" class="form-control" 
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label required required"
											style="min-width: 30px; width: auto;">합계금액</label>
										<div class="col">
											<input type="text" id="totalPrice" class="form-control" 
												onblur="vatCal(2)" style="width: 60%; max-width: 300px;"
												placeholder="">
										</div>
									</div>

									<div id="memo-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">비고</label>
										<div class="col">
											<input type="text" id="memo" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>



		<!-- 거래처찾는 dialog -->
		<div id="dialog-form-fCust" title="거래처선택" style="display: none;">

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnRegDialog1">선택</button>
				<button class="btn btn-primary  " id="btnCloseDialog1">닫기</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">
									<div class="form-group mb-3 row">
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"
												style="min-width: 30px; width: auto;">거래처</label>
											<div class="col">
												<select id="custCodeSelect" class="form-select"
													style="width: 350px; padding: 2px 20px 2px 0;">
													<option value=""></option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> 

			<!-- Tabler Libs JS -->

			<!-- Tabler Core -->
			<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->

			<script type="text/javascript"
				src="/resources/pan/js/taxBill-up.js?ver==9.0201.4"></script>
			<script type="text/javascript"
				src="/resources/pan/js/common-pan.js?ver=1.1116.2"></script>
</body>
</html>