<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>

<html>
<head>
<!-- <script type="text/javascript">
		var theme = "blue";
	</script> -->
<%@ include file="../icld/head.jsp"%>
<title>거래처 등록</title>

<!-- Begin : jquery-ui 레이어파업 -->
<!--     <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="https://code.jquery.com/ui/1.11.1/jquery-ui.js"></script> -->
<!-- End : jquery-ui 레이어파업 -->

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
							<h2 class="page-title">거래처 등록</h2>
						</div>
						<!-- Page title actions -->
						<div class="col-12 col-md-auto ms-auto d-print-none"style="display: none;">
							<div class="btn-list">
								<span class="d-none d-sm-inline"> <a href="#"class="btn btn-white"> New view </a>
								</span> <a href="#" class="btn btn-primary d-none d-sm-inline-block"data-bs-toggle="modal" data-bs-target="#modal-report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"height="24" viewBox="0 0 24 24" stroke-width="2"stroke="currentColor" fill="none" stroke-linecap="round"
										stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" /></svg> Create new report
								</a> <a href="#" class="btn btn-primary d-sm-none btn-icon"
									data-bs-toggle="modal" data-bs-target="#modal-report"
									aria-label="Create new report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"height="24" viewBox="0 0 24 24" stroke-width="2"stroke="currentColor" fill="none" stroke-linecap="round"
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
				<button class="btn btn-primary" id="btnReg">등록</button>
				<button class="btn btn-primary disabled " id="btnUpt">수정</button>
				<button class="btn btn-primary disabled " id="btnDel">삭제</button>
				
				<input type="text" id="custCodeSrch"   class="form-control" aria-describedby="" placeholder="거래처코드로 검색" 
						style="width:40%;  height: 22px; max-width:106px; margin-left:20px; margin-right:20px;background-color: aliceblue; float: right;" 
						onKeyPress="if(event.key === 'Enter') findCustMst('/base/cust-list', 1);">
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
								 <input type="hidden" name="custCode2" id="custCode2" value="${custCode}" >
								<form name ="frmCust" id="frmCust" method="post">		
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">사용유무</label>
										<div class="col">
											<select id="validYN" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
												<option value="Y">사용</option>
												<option value="N">중지</option>
											</select>
										</div>
										
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">업체구분</label>
										<div class="col">
											<select id="custType" class="form-select"style="width: auto; padding: 2px 20px 2px 0;" onchange="custCatChk()">
												<!-- <optgroup label="자동차정비업">
								                            <option value="A1">자동차종합정비업(구 1급)</option>
								                            <option value="A2">소형자동차종합정비업(구 2급)</option>
								                            <option value="A3">자동차전문정비업(구 3급)</option>
								                            <option value="A4">제조사 서비스센터</option>
								                            <option value="A5">운수업체</option>
								                          </optgroup>
								                          <optgroup label="부품업">
								                            <option value="B1">도매업체</option>
								                            <option value="B2">소매업체</option>
								                          </optgroup> -->
												<option value="C3">일반(사업자번호 O)</option>
												<option value="C2">개인(사업자번호 x)</option>
												<option value="C1">보험사</option>
												<option value="C4">은행</option>
												<option value="C5">카드사</option>
												
												<!-- <optgroup label="SR">
								                            <option value="E1">SR2</option>
								                            <option value="E2">SR3</option>
								                          </optgroup> -->

											</select> 
										</div>	
									<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">거래구분</label>
										<div class="col" id="custCat"style="display: flex; flex-direction: row;">
												 <label class="form-check"style="margin-right: 20px"> 
													<input class="form-check-input" type="checkbox" id="placeYN" onchange="custChk()" >
														<span class="form-check-label">발주업체 </span>
													</label> 
													<label class="form-check" style="margin-left: 20px"> 
													<input	class="form-check-input" type="checkbox"id="supplyYN" onchange="custChk()" >
										                    			 <span class="form-check-label">납품업체 </span>
													</label>
											   <div class="form-group mb-3 row"  style="margin-left: 50px;display:none;" id="centerChk" >                   
								                    	<span style="float:right;">
														<label class="form-check form-check-inline" style="margin-bottom: 0px;">			
											                <input class="form-check-input" type="radio" name="centerYN" value="Y" >
											                <span class="form-check-label">센터</span>
											            </label>
											            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
											                 <input class="form-check-input" type="radio" name="centerYN" value="N" >
											                <span class="form-check-label">외부재고</span>
											            </label>
										            	</span>
												</div>
											<!-- 	<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">사용유무</label>
								                      <div class="col">
								                        <select id="validYN" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
								                          <option value="Y">사용</option>
								                          <option value="N">중지</option>
								                        </select>
								                      </div>
								                       -->
								                       
								                  <label class="col-3 col-form-label"style="margin-left: 50px; min-width: 118px; width: auto;">판매금액유형</label>
											<div class="col">
												<select id="salePriceType" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option>센터가</option>
													<option>매입가</option> 
												</select>
											</div>     
										</div>

										<div class="form-group mb-3 row" style="*padding-bottom: 20px;">
											<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">거래처코드</label>
											<div class="col">
												<input type="text" id="custCode" class="form-control"aria-describedby="" placeholder=""style="display: initial; width: 35%; max-width: 300px;"maxlength="8" value="${custCode}" required
													onKeyUp="codeValidCheck(this);"> 
												<input type="text"id="lastCustCode" class="form-control" aria-describedby=""placeholder="마지막 코드"style="display: initial; width: 45%; max-width: 300px;"disabled>
                      	 
											</div>

															<!--                      <label class="col-3 col-form-label required">거래처명(약명)</label>
																                      <div class="col">
																                        <input type="text" class="form-control" aria-describedby="" placeholder="" style="width:300px;">
																                      </div>
																                      
																                      <label class="col-3 col-form-label required">거래처정식명)</label>
																                      <div class="col">
																                        <input type="text" class="form-control" aria-describedby="" placeholder="" style="width:300px;">
																                      </div>    -->
				
															<!--   </div>
				                                          <div class="form-group mb-3 row"> -->
											<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">거래처명(약명)</label>
											<div class="col">
												<input type="text" id="custName" class="form-control"style="width: 100%; max-width: 300px;"placeholder="ex) P-성수 ">
												<!--                         <small class="form-hint">
														                          Your password must be 8-20 characters long, contain letters and numbers, and must not contain
														                          spaces, special characters, or emoji.
														                        </small>-->
											</div>
											
											<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">거래처명(정식명)</label>
											<div class="col">
												<input type="text" id="formalName" class="form-control"style="width: 100%; max-width: 300px;"placeholder="사업자 등록증의 법인명">
											</div>
											
											<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">대표 거래처코드</label>
											<div class="col">
												<input type="text" id="mainCustCode" class="form-control" aria-describedby="" placeholder="대표거래처코드" style="display: initial; width: 40%; max-width: 100px;"
														required onKeyUp="findCust(this,'supplyCustName');">
										  		<input type="text" id="mainCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display: initial; width: 50%; max-width: 500px;" disabled>
										  	</div>
										 
										    <label class="col-3 col-form-label "style="*min-width: 118px; width: auto;">AOS보험사코드</label>
											<div class="col">
												<input type="text" id="aos_inscd" class="form-control"style="width: 40%; max-width: 300px;"placeholder="">
											</div>
										  <label class="col-3 col-form-label "style="*min-width: 118px; width: auto;">AOS보험사명</label>
											<div class="col">
												<input type="text" id="aos_insnm" class="form-control"style="width: 40%; max-width: 300px;"placeholder="">
											</div>
											
										</div>

										<div class="form-group mb-3 row" style="margin-top: 10px;">
												<label class="col-3 col-form-label required"style="min-width: 118px; width: auto; ">사업자등록번호</label>
												<div class="col">
													<input type="text" id="bizNo" class="form-control" size=12maxlength=12 style="width: 70%; max-width: 300px;"placeholder="" maxlength="12">
												</div>
												<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">업태</label>
												<div class="col">
													<input type="text" id="bzType" class="form-control"style="width: 50%; max-width: 300px;" placeholder="">
												</div>
												<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">종목</label>
												<div class="col">
													<input type="text" id="bzItems" class="form-control"style="width: 50%; max-width: 300px;" placeholder="">
												</div>
	
												<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">대표자명</label>
												<div class="col">
													<input type="text" id="ceoName" class="form-control" size=12maxlength=12 style="width: 60%; max-width: 300px;"placeholder="">
												</div>
												<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
												<div class="col">&nbsp;</div>
										</div>

										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">사업장주소</label>
											<div class="col">
												<input type="text" id="custAddress1" class="form-control"style="*width: 50%; max-width: 800px;" placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto; padding-left: 240px; display: none;">물류주소</label>
											<div class="col">
												<input type="text" id="custAddress2" class="form-control"style="*width: 60%; max-width: 800px; display: none;"placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 0px; width: auto;">&nbsp;</label>
											<div class="col" style="display: none;">
												<input type="text" class="form-control"style="*width: 60%; max-width: 800px; display: none;"placeholder="">
											</div>
										</div>

										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">대표전화</label>
											<div class="col">
												<input type="text" id="phone" class="form-control" size=12maxlength=12 style="width: 70%; max-width: 300px;"placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">팩스</label>
											<div class="col">
												<input type="text" id="fax" class="form-control"style="width: 60%; max-width: 300px;" placeholder="">
											</div>
											

											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">세금계산서용 핸드폰</label>
											<div class="col">
												<input type="text" id="taxMobile" class="form-control"size=12 maxlength=12 style="width: 100%; max-width: 300px;"placeholder="">
											</div>
											<label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">세금계산서용 이메일</label>
											<div class="col">
												<input type="text" id="taxEmail" class="form-control"style="width: 100%; max-width: 400px;" maxlength=100  placeholder="">
											</div>
										<!-- 	<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div> -->
										</div>
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label required " style="min-width: 118px; width: auto;">사업자등록증 첨부 </label>
											<div class="col">
												<div>
													<input type="file" name="attaFile" id="attaFile" class="form-control" style="width: 60%; max-width: 600px; " multiple  />
												</div>
											</div>
											<label class="col-3 col-form-label " style="min-width: 118; width:auto;"> 첨부파일</label>
						                      <div class="col">
						                     	<span id="attaFileOri"></span>
						                     </div>
						                     
										</div>
											
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">결제일</label>
											<div class="col">
												<select id="paymentDay" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option></option>
													<option>즉시</option>
													<option>월말</option>
													<option>익월5일</option>
													<option>익월10일</option>
													<option>익월15일</option>
												</select>
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
										</div>
										<div class="form-group mb-3 row" style="display: none;">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">출고단가종류</label>
											<div class="col">
												<input type="text" id="releasePriceType"class="form-control" style="width: 60%; max-width: 300px;"placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">입고단가종류</label>
											<div class="col">
												<input type="text" id="warehousePriceType"class="form-control" style="width: 60%; max-width: 300px;"placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">x마진율</label>
											<div class="col">
												<input type="number" id="marginRate" min="0" step="0.01"value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: initial;"placeholder="">%
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">x입고율</label>
											<div class="col">
												<input type="number" id="warehouseRate" min="0" step="0.01"value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: initial;"placeholder="">%
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
										</div>

										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">세액유무</label>
											<div class="col">
												<select id="taxType" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option value="1">별도</option>
													<option value="3">포함</option>
													<option value="2">무</option>
												</select>
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">현외구분</label>
											<div class="col">
												<select id="cashType" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option value="1">현금</option>
													<option value="2" selected>외상</option>
													<option value="0">거래불량</option>
												</select>
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">출고한도</label>
											<div class="col">
												<input type="number" id="releaseLimit" min="0" value="0"class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: initial;"placeholder="">원
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">입금한도일</label>
											<div class="col">
												<input type="number" id="depositLimitDay" min="0" value="0"class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: initial;"placeholder="">일
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">전잔출력</label>
											<div class="col">
												<select id="balanceDspType" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option value="0">무</option>
													<option value="1">유</option>
													<option value="2">선택</option>
												</select>
											</div>
										</div>

										<div class="form-group mb-3 row" id="placeCust">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">매입결제일</label>
											<div class="col">
												<input type="number" id="payDay" min="0" value="0"class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: initial;"placeholder="">일
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">매입결제유형</label>
											<div class="col">
												<select id="payType" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option>카드</option>
													<option>송금</option>
													<option>현금</option>
													<option>기타</option>
												</select>
											</div>
											
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">매입결제계좌번호</label>
											<div class="col">
												<input type="text" id="accNum" class="form-control"style="*width: 60%; max-width: 500px;" placeholder="">
											</div>

											<!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">+할인율</label>
                      <div class="col">
                        <input type="number" id="dcRate" min="0" step="0.01" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">%
                      </div> -->
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"
													placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
											<!--  <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">+판매장려금</label>
                      <div class="col">
                        <input type="number" id="bonusRate" min="0" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">원
                      </div>         -->
										</div>

										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">메모</label>
											<div class="col">
												<textarea id="memo" class="form-control"data-bs-toggle="autosize" placeholder="특이사항 등.."style="width: 90%"></textarea>
											</div>
										</div>


											<!-- 	<div class="form-group mb-3 row" id="srTable" style="display: flex !important; flex-wrap: wrap !important; padding-left: 90px !important;">
											  <div class="col">
											    <div class="form-group row" style="display: flex; padding-left: 20px;">
											      <div style="flex: 1;">
											        <label style="margin-right: 10px;">SR담당자1</label> 
											        <input type="text" class="form-control" id="sr1" style="flex: 1; width: 0; min-width: 300px;" placeholder="" disabled>
											      </div>
											      <div style="flex: 1;">
											        <label style="margin-right: 10px;">SR 지분율</label> 
											        <input type="text" class="form-control" id="sr1Rate" style="flex: 1; width: 0; min-width: 300px;" placeholder="" disabled>
											      </div>
											    </div>

												<div class="form-group row" id="srbox" style="display: flex !important; flex-wrap: wrap !important; padding-left: 20px !important;">
													<div style="flex: 1;">
														<label style="margin-right:10px">SR담당자2</label> 
														<input type="text"class="form-control" id="sr2" style="flex: 1; width: 0; min-width: 300px;"placeholder="" disabled>
													</div>
													<div style="flex: 1;">
														<label style="margin-right: 10px;">SR 지분율</label> 
														<input type="text"class="form-control" id="sr2Rate" style="flex: 1; width: 0; min-width: 300px;"placeholder="" disabled>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group mb-3 row">
 -->
 
										<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"style="min-width: 118px; width: auto; ">SR담당자1</label>
											<div class="col">
												<input type="text" class="form-control"style="width: 60%; max-width: 300px; padding-right: 12px;"
													placeholder="" id="sr1" disabled>
											</div>
											<!-- <label class="col-3 col-form-label"style="min-width: 118px; width: auto; margin-left:115px">SR지분율</label>
											<div class="col">
												<input type="text" class="form-control"style="width: 60%; max-width: 200px; padding-right: 12px;"
													placeholder=""id="sr1Rate"disabled>
											</div> -->
										<label class="col-3 col-form-label"style="min-width: 118px; width: auto; ">SR담당자2</label>
											<div class="col">
												<input type="text" class="form-control"style="width: 60%; max-width: 300px; padding-right: 12px; "
													placeholder="" id="sr2" disabled>
											</div>
										</div>	
										<!-- <div class="form-group mb-3 row"> -->
											<!-- <label class="col-3 col-form-label"style="min-width: 118px; width: auto; margin-left:115px">SR지분율</label>
											<div class="col">
												<input type="text" class="form-control"style="width: 60%; max-width: 200px; padding-right: 12px; "
													placeholder="" id="sr2"  disabled>
											</div>
										</div>	 -->
								<div class="form-group mb-3 row">
								<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">연동키</label>
												<div class="col">
													<input type="text" class="form-control"style="width: 60%; max-width: 300px; padding-right: 12px;" placeholder="" id="linkGvKey" disabled>
												</div>
										<!-- <div class="col" style="display:content">
													<input type="button" class="btn btn-outline-info" onclick="copyClipboard()" value="복사">													
												</div>	 -->
								<label class="col-3 col-form-label" style="min-width: 118px; width:auto; " >발급된 연동키</label>				
										<div class="col">
												<input type="text" class="form-control"style="width: 60%; max-width: 300px; padding-right: 12px;" placeholder="" id="linkTkKey" >
										</div>		
								</div>	
						   </form>  			
											<!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">+거래처등급</label>
								                    <div class="col">
								                        <select id="grade" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
								                          <option>최우수</option>
								                          <option>우수</option>
								                          <option>보통</option>
								                          <option>주의</option>
								                          <option>불량</option>
								                        </select>
								                    </div>
								                    <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">+SR마진율</label>
								                    <div class="col">
								                        <input type="number" id="srMarginRate" min="0" step="0.01" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">%
								                    </div> -->

											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
										</div>
										
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
											<div class="col">
												<input type="text" id="custMgrSrch" class="form-control" aria-describedby="" placeholder="담당자검색" style="width: 60%; max-width: 300px; padding-right: 12px;" onKeyPress="if(event.key === 'Enter') findCustMstMgr('/base/cust-mgr-list');">
											</div>
										</div>

										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">담당자<br>(거래처)
											</label>
											<div id="grid_wrap" style="width: 90%; height: 160px;"></div>
											<div style="margin: 2px 117px 0;">
												<input type="button" class="btn btn-outline-info"onclick="addRow1(myGridID,'last')" value="행추가"> 
												<input type="button" class="btn btn-outline-info"onclick="removeRow1()" value="행삭제">
											</div>
										</div>
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">관리자<br>(자사)</label>
											<div id="grid_wrap2" style="width: 90%; height: 160px;"></div>
											<div style="margin: 2px 117px 0;">
												<input type="button" class="btn btn-outline-info"onclick="addRow2(myGridID2,'last')" value="행추가"> 
												<input type="button" class="btn btn-outline-info" onclick="removeRow2()" value="행삭제">
											</div>
										</div>
									</div>
									</div>
								</div>
								<!--             <div class="form-footer1">
            	<button type="submit" class="btn btn-primary" id="btnReg">등록</button>
            </div> -->
							</div>
						</div>
					</div>
					<%--   <%@ include file="../icld/footer.jsp" %> --%>
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
									<label class="form-selectgroup-item"> <input
										type="radio" name="report-type" value="1"
										class="form-selectgroup-input" checked> <span
										class="form-selectgroup-label d-flex align-items-center p-3">
											<span class="me-3"> <span
												class="form-selectgroup-check"></span>
										</span> <span class="form-selectgroup-label-content"> <span
												class="form-selectgroup-title strong mb-1">Simple</span> <span
												class="d-block text-muted">Provide only basic data
													needed for the report</span>
										</span>
									</span>
									</label>
								</div>
								<div class="col-lg-6">
									<label class="form-selectgroup-item"> <input
										type="radio" name="report-type" value="1"
										class="form-selectgroup-input"> <span
										class="form-selectgroup-label d-flex align-items-center p-3">
											<span class="me-3"> <span
												class="form-selectgroup-check"></span>
										</span> <span class="form-selectgroup-label-content"> <span
												class="form-selectgroup-title strong mb-1">Advanced</span> <span
												class="d-block text-muted">Insert charts and
													additional advanced analyses to be inserted in the report</span>
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
												class="form-control ps-0" value="report-01"
												autocomplete="off">
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
										<label class="form-label">Client name</label> <input
											type="text" class="form-control">
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

			<!-- 관리자선택 팝업 -->
			<div id="dialog-form" title="관리자(부서) 선택">
				<table id="users" class="ui-widget ui-widget-content pop-border-y">
					<thead>
						<tr class="ui-widget-header ">
							<th style="width: 45%;">선택</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
	 	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String custUp = application.getRealPath("/resources/pan/js/cust-up.js");	
			File custUpFile = new File(custUp);	
			Date lastModified_custUpFile = new Date(custUpFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
			<!-- Tabler Libs JS -->
			<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
				defer></script>
			<script
				src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
				defer></script>
			<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"
				defer></script>
			<script
				src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
			<!-- Tabler Core -->
			<script src="/resources/dist/js/tabler.min.js" defer></script>
			<script src="/resources/dist/js/demo.min.js" defer></script>
			<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
			<script type="text/javascript"				src="/resources/pan/js/cust-up.js?ver=<%=fmt.format(lastModified_custUpFile)%>"></script>
			<script type="text/javascript"				src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script>
    <!-- 거래처선택 팝업 -->
					<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
						<input type="text" id="pop_cust_srch" placeholder="거래처명">
						<button class="btn btn-dark" id="btnCustFind">조회</button>
						<div id="grid_wrap_cust" style="height: 90%;"></div>
					</div>
 
</body>
</html>