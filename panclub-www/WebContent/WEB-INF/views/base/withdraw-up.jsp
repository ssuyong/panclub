<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>




<!doctype html>

<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>출금 등록</title>

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	
<!-- End : Toast Date Picker  -->

<!-- 검색 셀렉트박스 1
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css"> -->
<style>
	div{
	display: block;
	}
</style>

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
							<h2 class="page-title">출금 등록</h2>
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
										<label class="col-3 col-form-label "
											style="*min-width: 118px; width: auto;">출금 번호</label> <span
											id="wdNo_upt">${wdNo}</span>
									</div>
									<div class="form-group mb-3 row">

										<label class="col-3 col-form-label required required" style="*min-width: 118px; width: auto;">출금 일자</label>
										<div
											class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input1" aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper1" style="margin-top: -1px;"></div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required" style="min-width: 50px; width: auto;">계정</label>
										<div class="col">
											<div>
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="radio1" type="radio" name="accCode" value="물품대" checked onClick="click_accType(1)" checked> 
													<span class="form-check-label">물품대</span>
												</label> 
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
												<input class="form-check-input" id="radio2" type="radio" name="accCode" value="반환금" onClick="click_accType(2)"> 
												<span class="form-check-label">반환금</span>
												</label>
											</div>
											<!-- <div>
												<label class="form-check form-check-inline"
													style="margin-bottom: 0px;"> <input
													class="form-check-input" id="radio2" type="radio"
													name="accCode" value="반환금" onClick="click_accType(2)"> <span
													class="form-check-label">반환금</span>
												</label>
											</div> -->
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required" style="min-width: 50px; width: auto;">출금 구분</label>
										<div class="col">
											<div>
												<div id="cashRadio">
													<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="radio6" type="radio" name="payType" value="현금" onClick="click_payType(1)">
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
									<!-- 청구요청번호 반환금 계정에서 보이고 물품대 계정에서 안보이고 -->
									<div id="returnM" class="form-group mb-3 row">
									  <label class="col-2 col-form-label required" style="min-width: 118px; width: auto;" >청구그룹아이디</label>
									  <div class="col-4 d-flex">
									    <input type="text" id="clReqNo" class="form-control" onclick="openClReqDialog()" style="width: 30%;" placeholder="">
									  </div>
									  <label class="col-2 col-form-label" style="min-width: 50px; width: auto;">거래처 유형</label>
									  <div class="col-4 d-flex">
									    <select id="custType" class="form-select" style="width: 10%; padding: 2px 25px 2px 0;">
									      <option value="미선택"></option>
									      <option value="일반">일반</option>
									      <option value="보험1">보험1</option>
									      <option value="보험2">보험2</option>
									    </select>
									  </div>
									</div>
									<div id="custList" class="form-group mb-3 row">
										<input type="hidden" id="insure1Code_save" ">
										<input type="hidden" id="insure1Name_save" ">
										<input type="hidden" id="insure2Code_save" ">
										<input type="hidden" id="insure2Name_save" ">
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
										<label class="col-3 col-form-label " style="*min-width: 118px; width: auto;">출금요청번호</label>
										<div>
											<input type="text" id="wdReqNo" class="form-control" onclick="openWdReqDialog()" style="width: 60%; max-width: 300px;" placeholder=""  value="${wdReqNoArr}">
										</div>
									<div id="cardInfo-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">카드사</label>
										<div>
											<select id="payCode1" class="form-select" style="width: auto; padding: 2px 20px 2px 0;">
												<option value=""></option>
											</select>
										</div>
									</div>
									<div id="accList" class="form-group mb-3 row">
										<label class="col-3 col-form-label required"  style="min-width: 30px; width: auto;">계좌</label>
										<div>
											<select id="payCode2" class="form-select" style="width: auto; padding: 2px 20px 2px 0;">
												<option value=""></option>
											</select>
										</div>
									</div>
									<div id="money-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">공급가액</label>
										<div>
											<input type="text" id="supPrice" class="form-control" onblur="vatCal(1)" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label"  style="min-width: 30px; width: auto;">부가세</label>
										<div >
											<input type="text" id="vat" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label required" style="min-width: 30px; width: auto;">출금액</label>
										<div >

											<%-- <fmt:formatNumber type="number" value="${wdReqAmt2}" pattern="#,###"/> --%>
											<input type="text" id="wdMoney" class="form-control" onblur="vatCal(2)" style="width: 60%; max-width: 300px;"
												placeholder="" value=<fmt:formatNumber type="number" value="${wdReqAmt2}" pattern="#,###"/>  >
										</div>
										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">할인액</label>
										<div >
											<input type="text" id="dcMoney" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<!-- 송금수수료 현금 예금에서 보이고 카드에서 안보이고 -->
									<div id="fee-input" class="form-group mb-3 row">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">송금수수료</label>
										<div class="col">
											<input type="text" id="fee" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
									<!-- 현금영수증 현금 예금에서 보이고 카드에서 안보이고 -->
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
										<div>
											<input type="text" id="memo" class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

			</div>


		<!-- 출금요청매칭 -->
		<div id="dialog-form-wdReq" title="출금요청매칭" style="display: none;">

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
		
		<!-- 청구요청매칭 -->
		<div id="dialog-form-clReq" title="청구요청매칭" style="display: none;">

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnFnDialog2">조회</button>
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
				                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">요청일</label>
				                      	<input type=hidden id="prmsYmd" value=${sYmd} >
										<input type=hidden id="prmeYmd" value=${eYmd} >
																						
										<div class="row" style="display: contents;">
										    <div class="col-md-6" style="width:auto;">										       
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
										     <div class="col" >
													<label class="form-check form-check-inline" > 기간 전체조회
													<input class="form-check-input" type="checkbox" id="ymdIgnoreYN"
														name="ymdIgnoreYN" > </label>
										    </div>
										</div>
				                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">차량번호</label>
				                      <div class="col">
				                        <input type="text" id="carNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
				                      </div>
				                      <label class="col-3 col-form-label"
															style="min-width: 30px; width: auto;">납품처</label>
														<div class="col">
															<input type="text" id="custCode2" class="form-control" aria-describedby="" placeholder="거래처코드"
																style="display: initial; width: 48%; max-width: 100px;"
																value="${custCode}" onKeyUp="findCust(this,'custName2');"
																ondblclick="findCust(this,'custName',0,'Y');"> <input
																type="text" id="custName2" class="form-control"
																aria-describedby="" placeholder="거래처명"
																style="display: initial; width: 48%; max-width: 200px;"
																disabled>
														</div>
									<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">보험사 정보</label>
				                      <div class="col">
				                        <input type="text" id="insure1Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'insure1Name');" >
				                        <input type="text" id="insure1Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" readonly >
				                       </div> 	
				                       				
				 					  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">보험 담당자</label>
				                      <div class="col">
				                        <input type="text" id="insure1ＭgrName" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
				                      </div>
				                </div>
				                <div class="form-group mb-3 row">
				                	<!-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left: 100px;">청구요청번호</label>
			                    	<div class="col">
			                        	<input type="text" id="clReqNo2" class="form-control" style="width:60%; max-width:100px;" placeholder="" >
			                      	</div> -->
			                      	<label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left:100px;">청구그룹ID</label>
			                      	<div class="col">
			                        	<input type="text" id="clGroupId" class="form-control" style="width:60%; max-width:100px;" placeholder="" >
			                      	</div>
			                      	<label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left:100px;">주문그룹ID</label>
				                    <div class="col">
				                    	<input type="text" id="orderGroupId" class="form-control" style="width:60%; max-width:100px;" placeholder="" >
				                    </div>
				                    <!-- 청구그룹아이디로 검색하면 LIST를 안타고 GROUP_QRY 를 탐 나중에 수정 -->
			                      	<!-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left:100px;">청구그룹ID</label>
			                      	<div class="col">
			                        	<input type="text" id="clGroupId" class="form-control" style="width:60%; max-width:100px;" placeholder="" >
			                      	</div> -->
			                      	<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">담당자</label>
				                    <div class="col">
				                    	<input type="text" id="regUserName" class="form-control" style="width:60%; max-width:100px;" placeholder="" >
				                    </div>
				                </div>
				                

									<div class="form-group mb-3 row">
										<div class="form-group mb-3 row">
											<div id="grid_wrap2" style="width: 99.1%; height: 70vh;"></div>
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
			</div>

 -->
   <!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<input type="hidden" id="grid-custCode1" name="grid-custCode1" value="">
		<input type="hidden" id="grid-custName1" name="grid-custName1" value="">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnCustFind" >조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
	</div>

			<!-- Tabler Libs JS -->

			<!-- Tabler Core -->
			<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->

			<script type="text/javascript" src="/resources/pan/js/withdraw-up.js?ver=1.0805.4"></script>
			<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.0612.3"></script>
</body>
</html>