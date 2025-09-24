<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>

<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>입금 등록</title>
<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->
	
	<!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox -->


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
							<h2 class="page-title">입금 등록</h2>
						</div>
					</div>
				</div>
			</div>

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnReg">저장(F9)</button>
				<button class="btn btn-primary  " id="btnClose">닫기</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">
						<div class="*col-md-6">
							<div class="card">

								<div class="card-body" style="margin-left:10px; margin-top: 10px;">
									<div class="form-group mb-3 row">
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label " style="*min-width: 118px; width: auto;">입금 번호</label> 
											<span id="depositNo_upt">${depositNo}</span>
											<input type="hidden" id="connectCdPay">			
										</div>
										<label class="col-3 col-form-label required required" style="*min-width: 118px; width: auto;">입금 일자</label>
										<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input1" aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper1" style="margin-top: -1px;"></div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required" style="min-width: 50px; width: auto;">계정</label>
										<div class="col">
											<div>
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
												<input class="form-check-input" id="radio1" type="radio" name="accCode" value="물품대" checked onClick="click_accCode(1)"> 
													<span class="form-check-label">물품대</span>
												</label> 
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
												<input class="form-check-input" id="radio2" type="radio" name="accCode" value="기타수입" onClick="click_accCode(2)">
													<span class="form-check-label">기타수입</span>
												</label> 
												<label class="form-check form-check-inline" style="margin-bottom: 0px;">
												 <input class="form-check-input" id="radio3" type="radio" name="accCode" value="카드대금" onClick="click_accCode(3)">
													<span class="form-check-label">카드대금</span>
												</label>
												 <label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
												 <input class="form-check-input" id="radio4" type="radio" name="accCode" value="대여금/차입금" onClick="click_accCode(4)">
													<span class="form-check-label">대여금/차입금</span>
												</label> 
												 <label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
												 <input class="form-check-input" id="radio5" type="radio" name="accCode" value="보험" onClick="click_accCode(5)">
													<span class="form-check-label">보험</span>
												</label>
											</div>
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 50px; width: auto;">입금 구분</label>
										<div class="col">
											<div>
												<div id="cashRadio">
													<label class="form-check form-check-inline" style="margin-bottom: 0px;">
													 <input class="form-check-input" id="radio6" type="radio"	name="payType" value="현금" onClick="click_payType(1)">
														<span class="form-check-label">현금</span>
													</label>
												</div>
												<div id="cardRadio">
													<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="radio7" type="radio" name="payType" value="카드" onClick="click_payType(2)">
														<span class="form-check-label">카드</span>
													</label>
												</div>
												<div id="depositRadio">
													<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="radio8" type="radio" name="payType" value="예금" checked onClick="click_payType(3)"> 
													<span class="form-check-label">예금</span>
													</label>
												</div>
											</div>
										</div>
									</div>
									<div id="custList" class="form-group mb-3 row">
										<label class="col-3 col-form-label required" style="min-width: 30px; width: auto;">거래처</label>
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
									</div>
									<div id="carInfo-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">차량번호</label>
										<div class="col">
											<input type="text" id="carNo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="" >
										</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">청구요청번호</label>
										<div class="col">
											<!-- <input type="text" id="claimReqNo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="" onclick ="openClReqDialog()"> -->
											<input type="text" id="clGroupId" class="form-control" style="width: 60%; max-width: 300px;" placeholder="" onkeyup="handleKeyUp(event, this)"onclick ="openClReqDialog()">
											
											<input type="text" id="clGroupId2" class="form-control" style="width: 60%; max-width: 300px; display: none; " placeholder="">
											</div> 
									</div>
									<!--현금일때는 안보여야함  -->
									<div id="cardInfo-input" class="form-group mb-3 row">
									<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">청구요청번호</label>
									<div class="col">
											<!-- <input type="text" id="claimReqNo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="" onclick ="openClReqDialog()"> -->
											<input type="text" id="clGroupId3" class="form-control" style="width: 60%; max-width: 300px;" placeholder="" onkeyup="handleKeyUp2(event, this)"onclick ="openClReqDialog2()">
											
											<input type="text" id="clGroupId4" class="form-control" style="width: 60%; max-width: 300px; display: none; " placeholder="">
											</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">카드사</label>
										<div class="col">
											<select id="payCode1" class="form-select" style="width: auto; padding: 2px 20px 2px 0;">
												<option value=""></option>
											</select>
										</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">승인번호</label>
										<div class="col">
											<input type="text" id="cdAllowNo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div id="accList" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">계좌</label>
										<div class="col">
											<select id="payCode2" class="form-select" style="width: auto; padding: 2px 20px 2px 0;"  >
												<option value=""></option>
											</select>
											<div id= "divCdPay" class="col">
											<button id="btnCdPay" class="btn btn-outline-info" onclick="serchCdPay()">카드대금매칭..</button>
											</div>
										</div>
									</div>
									<div id="money-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">공급가액</label>
										<div class="col">
											<input type="text" id="supPrice" class="form-control" onblur="vatCal(1)" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label"  style="min-width: 30px; width: auto;">부가세</label>
										<div class="col">
											<input type="text" id="vat" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<div class="col" id="depContainer"></div>
										<label class="col-3 col-form-label required" style="min-width: 30px; width: auto;">총 입금액</label>
										<div class="col" >
											<input type="text" id="depositMoney" class="form-control"  onblur="vatCal(2)" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<div class="col" id="depContainer"></div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">할인액</label>
										<div class="col">
											<input type="text" id="dcMoney" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div id="fee-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">카드수수료</label>
										<div class="col">
											<input type="text" id="cardFee" class="form-control" onblur="vatCal(1)" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">송금수수료</label>
										<div class="col">
											<input type="text" id="remitFee" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div id="cashRectRadio" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 50px; width: auto;">현금영수증</label>
										<div class="col">
											<div>
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
												<input class="form-check-input" id="radio9" type="radio" name="cashRectYN" value="미사용" checked onClick="click_cashRectYN(1)">
												 <span class="form-check-label">미사용</span>
												</label> 
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
												<input class="form-check-input" id="radio10" type="radio" name="cashRectYN" value="사용" onClick="click_cashRectYN(2)">
													<span class="form-check-label">사용</span>
												</label>

											</div>
										</div>
									</div>
									<div id="cashRectNo-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">고유번호</label>
										<div class="col">
											<input type="text" id="cashRectNo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div id="memo-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">비고</label>
										<div class="col">
											<input type="text" id="memo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<div id="memo23-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">입금예상금액</label>
										<div class="col">
											<input type="text" id="memo4" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">연관입금번호</label>
										<div class="col">
											<input type="text" id="memo2" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">예정입금번호</label>
										<div class="col">
											<input type="text" id="memo3" class="form-control"style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 청구요청매칭 -->
		<div id="dialog-form-clReq" title="청구요청매칭" style="display: none;">

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnRegDialog">선택</button>
				<button class="btn btn-primary  " id="btnCloseDialog">닫기</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">

									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">차량번호</label>
										<div class="col">
											<input type="text" id="carNo_dialog" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">요청번호</label>
										<div class="col">
											<input type="text" id="clReqNo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<div class="form-group mb-3 row">
											<div id="grid_wrap" style="width: 99.1%; height: 70vh;"></div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 물품대 카드결재 매칭 -->
			<div id="dialog-form-cdPay" title="카드결재매칭" style="display: none;">

				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnRegDialog1">선택</button>
					<button class="btn btn-primary  " id="btnCloseDialog1">닫기</button>
				</div>
				<div class="form-group mb-3 row">
					<label class="col-3 col-form-label "
						style="min-width: 118px; width: auto;">예상입금번호</label> <input
						type="text" id="depositNo_select" class="form-control" readonly
						style="width: 60%; max-width: 300px;" placeholder="">
				</div>
				<div class="form-group mb-3 row">
					<label class="col-3 col-form-label "
						style="min-width: 118px; width: auto;">입금합계</label> <input
						type="text" id="depositSum" class="form-control" readonly
						style="width: 60%; max-width: 300px;" placeholder="">
				</div>

				<div class="page-body">
					<div class="container-xl">
						<div class="row row-cards">

							<div class="*col-md-6">
								<div class="card">

									<div class="card-body">

										<div class="form-group mb-3 row">
											<div class="form-group mb-3 row">
												<div id="grid_wrap1" style="width: 99.1%; height: 70vh;"></div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 거래처선택 팝업 -->
			<!-- <div id="dialog-form-cust" title="거래처 선택" style="display: none;">
				<input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명">
				<input type="text" id="pop_cust_srch" placeholder="거래처명" >
				<button class="btn btn-dark" id="btnCustFind">조회</button>
				<div id="grid_wrap_cust" style="height: 90%;"></div>
			</div> -->
		<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
			<input type="hidden" id="grid-custCode1" name="grid-custCode1" value="">
			<input type="hidden" id="grid-custName1" name="grid-custName1" value="">
			<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
			<input type="text" id="pop_custName"  placeholder="거래처명"> -->
			<input type="text" id="pop_cust_srch"  placeholder="거래처명">
			<button class="btn btn-dark" id="btnCustFind" >조회</button>
		  	<div id="grid_wrap_cust" style=" height:90%;"></div>
		</div>
		
		<!-- 일반건 청구요청매칭 -->
		<div id="dialog-form-clReq2" title="일반 청구요청매칭" style="display: none;">

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnRegDialog2">선택</button>
				<button class="btn btn-primary  " id="btnCloseDialog2">닫기</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">

									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">차량번호</label>
										<div class="col">
											<input type="text" id="carNo_dialog" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">요청번호</label>
										<div class="col">
											<input type="text" id="clReqNo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<div class="form-group mb-3 row">
											<div id="grid_wrap3" style="width: 99.1%; height: 70vh;"></div>
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

			<script type="text/javascript" src="/resources/pan/js/deposit-up.js?ver=1.0805.4"></script>
			<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=3.0824.3"></script>
</body>
</html>