<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>

<html>
<head>
<%@ include file="../icld/head.jsp"%>

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	

</head>
<link href="/resources/pan/css/barcodePrint.css?ver=1.0516.4" rel="stylesheet" />
<body class=" layout-fluid">
	<div class="page">
		<%--        
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>    --%>

		<div class="page-wrapper">
		        <div class="spinner" id="spinner"></div>
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<h2 class="page-title">재고수동처리</h2>
						</div>
					</div>
				</div>
			</div>

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnReg">저장</button>
				<button class="btn btn-primary  " id="btnBarcodePrint" onclick="barcodePrintItem()" style="display: none;">바코드출력</button>
				<button class="btn btn-primary  " id="btnClose">닫기</button>
				
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 50px; width: auto;">유형</label>
										<div class="col">
											<div>
												<label class="form-check form-check-inline"	style="margin-bottom: 0px;"> 
													<input	class="form-check-input" id="stockProcType" type="radio" name="stockProcType" value="whna" checked onClick="setStockProcType()"	> 
													<span class="form-check-label">수동입고</span>
												</label> 
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input	class="form-check-input" id="stockProcType" type="radio" name="stockProcType" value="rlna" onClick="setStockProcType()"	 >
													<span class="form-check-label">수동출고</span>
												</label> 
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="stockProcType" type="radio" name="stockProcType" value="move"  onClick="setStockProcType()"	>
													<span class="form-check-label">이동</span>
												</label> 
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="stockProcType" type="radio" name="stockProcType" value="inspec" onClick="setStockProcType()"	 >
													<span class="form-check-label">실사</span>
												</label>
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="stockProcType" type="radio" name="stockProcType" value="rlod" onClick="setStockProcType()"	 >
													<span class="form-check-label">판매출고</span>
												</label>
												<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
													<input class="form-check-input" id="stockProcType" type="radio" name="stockProcType" value="whri" onClick="setStockProcType()"	 >
													<span class="form-check-label">반품입고</span>
												</label> 
											</div>
										</div>
									</div>
																	
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required required"
											style="*min-width: 118px; width: auto;">처리 일자</label>
										<div
											class="tui-datepicker-input tui-datetime-input tui-has-focus">
											<input type="text" id="datepicker-input1"
												aria-label="Date-Time"> <span class="tui-ico-date"></span>
										</div>
										<div id="wrapper1" style="margin-top: 10px;"></div>
										<%-- 
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label " style="*min-width: 118px; width: auto;">부품ID</label> 
											<div class="col">
											<input type="text" id="itemId_clicked" value="${itemId}" disabled/>
											</div>
										</div> --%>
										
										<%-- <label class="col-3 col-form-label"	style="min-width: 30px; width: auto;">부품ID</label>
										<div class="col">
											<input type="text" id="itemId" class="form-control"	value="${itemId}" style="width: 60%; max-width: 300px;" placeholder=""  disabled
												onChange="findStockRackInfo('/logis/stock-rack-list',this);">
										</div> --%>
										
									</div>
									
	
									<div id="stockInfo" class="form-group mb-3 row">
									<div class="col">
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">부품번호</label>
										<div class="row">
											<!-- <input type="text" id="itemNo" class="form-control"	style="width: 60%; max-width: 300px;" placeholder="" readonly	onClick = "openFindStockDialog()"> -->
											<!-- <input type="text" id="itemNo" class="form-control"	style="width: 60%; max-width: 300px;" placeholder="" readonly	onClick = "findItem('/base/item-list', 0,0,'','Y','itemId','itemName');"> -->
											<input type="text" id="itemNo" class="form-control"	style="width: 60%; max-width: 300px; margin-left:7px;" placeholder="" 	 onKeyUp="findItemCall(this.value,'N');" ondblclick="findItemCall('popItemNoNew','Y');">
											<span class="col" style="margin-left: -10px;">
												<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;" onClick="findItemCall('popItemNoNew','Y');">
											</span>
											<!-- <span style="position:fixed;">
		          								<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;" onClick="findItemCall('popItemNoNew','Y');">
									          </span> 	 -->
										</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;"> 부품ID</label>
										<div class="col">
											<input type="text" id="itemId" class="form-control"	value="${itemId}" style="width: 60%; max-width: 300px;" placeholder=""  disabled
												onChange="findStockRackInfo('/logis/stock-rack-list',this);">
										</div>
								</div>	
										
									<div class="col">	
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">부품명</label>
										<div class="col">
											<input type="text" id="itemName" class="form-control" style="width: 60%; max-width: 300px;" placeholder=""  disabled>
										</div>
										
<!-- 										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">완성차</label>
										<div class="col">
											<input type="text" id="carType" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="" readonly>
										</div> -->
							
									<div class="col">
										<!-- <label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">부품ID</label>
										<div class="col">
											<input type="text" id="itemId" class="form-control"	style="width: 60%; max-width: 300px;" placeholder=""  disabled 
												onChange="findStockRackInfo('/logis/stock-rack-list',this);">
										</div> -->
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">제조사</label>
										<div class="col">
											<input type="text" id="makerName" class="form-control" style="width: 60%; max-width: 300px;" placeholder=""  disabled>
										</div>
									</div>	
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto; display:none;">영문부품명</label>
										<div class="col">
											<input type="text" id="itemNameEn" class="form-control" style="width: 60%; max-width: 300px;display:none;" placeholder=""  disabled>
										</div>
										<label class="col-3 col-form-label" style="min-width: 30px; width: auto; display:none;">클래스</label>
										<div class="col" style="display:none;">
											<input type="text" id="classCode" class="form-control" style="width: 60%; max-width: 300px;" placeholder=""  disabled>
										</div>
									</div>
																		
									<p></p>
									<div id="iDiv_rack_dsp" style="color:#4486bd; font-size:11px; ">
										<span>※ 아래의 목록 클릭 시 해당 창고위치가 자동 선택됩니다.</span>
										<table id="iDiv_rack_lst" style="color:#2b699d; font-size:12px; margin-top: 8px; margin-left: 9px;" >
										</table>
									</div>
									<p></p>
									<hr/>
									<div id="stockPlace" class="form-group mb-3 row"  style="margin-top: -25px;">
										<div class="col">
											<label class="col-3 col-form-label"	style="min-width: 30px; width: auto;">창고</label>
											<div class="col1">
												<!-- <input type="text" id="storCode" class="form-control" style="width: 60%; max-width: 100px;" placeholder=""  disabled>
												<input type="text" id="storName" class="form-control" style="width: 60%; max-width: 300px;" placeholder=""  disabled> -->
												<select id="storCode" onChange="resetRackInfo()" class="form-select" style="width:200px;">
													<option></option>
												</select>
											</div>
											<label class="col-3 col-form-label" style="min-width: 30px; width: auto;">재고수량</label>
											<div class="col">
												<input type="text" id=stockQty class="form-control"style="width: 60%; max-width: 300px;" placeholder=""  disabled>
											</div>
											
										</div>
										<div class="col">
											<label class="col-3 col-form-label"	style="min-width: 30px; width: auto;">랙</label>
											<div class="row"> 
												<input type="text" id="rackCode" class="form-control"	style="width: 60%; max-width: 100px;" placeholder=""  disabled>
												<input type="text" id="rackName" class="form-control"	style="width: 60%; max-width: 300px;" placeholder=""  disabled>
												<span class="col" style="margin-left: -10px;">
												<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;" onClick="findRackCall('rackCode','Y');">
												</span>
											</div>
											
										</div>
									</div>
									
								<div id="stockPlaceMove" class="form-group mb-3 row"  >
										<div class="col">
											<label class="col-3 col-form-label"	style="min-width: 30px; width: auto;">이동창고</label>
											<div class="col1">
												<!-- <input type="text" id="storCode" class="form-control" style="width: 60%; max-width: 100px;" placeholder=""  disabled>
												<input type="text" id="storName" class="form-control" style="width: 60%; max-width: 300px;" placeholder=""  disabled> -->
												<select id="storCode2" onChange="resetRackInfo2()" class="form-select" style="width:200px;">
													<option></option>
												</select>
											</div>
											<!-- <label class="col-3 col-form-label" style="min-width: 30px; width: auto;">재고수량</label>
											<div class="col">
												<input type="text" id=stockQty class="form-control"style="width: 60%; max-width: 300px;" placeholder=""  disabled>
											</div> -->
											
										</div>
										<div class="col">
											<label class="col-3 col-form-label"	style="min-width: 30px; width: auto;">이동랙</label>
											<div class="row"> 
												<input type="text" id="rackCode2" class="form-control"	style="width: 60%; max-width: 100px;" placeholder=""  disabled>
												<input type="text" id="rackName2" class="form-control"	style="width: 60%; max-width: 300px;" placeholder=""  disabled>
												<span class="col" style="margin-left: -10px;">
												<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;" onClick="findRackCall('rackCode2','Y');">
												</span>
											</div>
											
										</div>
									</div>
									
									
	
									
									
								<div id="uptQty" class="form-group mb-3 row">
									<div class="col">
										<label id="whQtyDp" class="col-3 col-form-label" style="min-width: 30px; width: auto; display:none;">입고수량</label>
										<label id="rlQtyDp" class="col-3 col-form-label" style="min-width: 30px; width: auto;display:none;">출고수량</label>
										<label id="moveQtyDp" class="col-3 col-form-label" style="min-width: 30px; width: auto;display:none;">이동수량</label>
										<label id="inspecQtyDp" class="col-3 col-form-label" style="min-width: 30px; width: auto;display:none;">실사수량</label>
										<label id="rlodQtyDp" class="col-3 col-form-label" style="min-width: 30px; width: auto;display:none;">판매출고수량</label>
										<label id="whriQtyDp" class="col-3 col-form-label" style="min-width: 30px; width: auto;display:none;">반품입고수량</label>
										<div class="col">
											<input type="text" id=procQty class="form-control" style="width: 60%; max-width: 300px;" placeholder=""
											oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
										</div>
									</div>
									
									<!-- <div class="col" id="whPrDiv">
										<label id="whPrDp" class="col-3 col-form-label" style="min-width: 30px; width: auto; ">단가</label>									
										<div class="col">
											<input type="text" id="inPrice" class="form-control" style="width: 60%; max-width: 300px;" placeholder=""
											oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
										</div>
									</div> -->
								</div>			
										<div class="form-group mb-3 row">	
											<div class="col">
											<label id="memoTitle" class="col-3 col-form-label" style="min-width: 30px; width: auto;">비고</label>
													<input type="text" id=procMemo1 class="form-control" style="width: 60%; max-width: 300px;" placeholder="">
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

		<!-- 재고찾기 -->
		<div id="dialog-form-stock" title="재고검색" style="display: none;">

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnSchDialog">조회</button>
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
											style="min-width: 118px; width: auto;">부품번호</label>
										<div class="col">
											<input type="text" id="itemNo_dialog" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">부품ID</label>
										<div class="col">
											<input type="text" id="itemId_dialog" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">부품명</label>
										<div class="col">
											<input type="text" id="itemName_dialog" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
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
		</div>

     <!-- 상품선택 팝업 -->
	<div id="dialog-form-item" title="상품 선택" style="display:none;">
		<input type="hidden" id="form-itemId1" name="form-itemId1" value="">
		<input type="hidden" id="form-itemNo1" name="form-itemNo1" value="">
		<input type="hidden" id="form-itemUnitPrice1" name="form-itemNo1" value="">
		
		<input type="hidden" id="form-itemNameKo1" name="form-itemNameKo1" value="">
		<input type="hidden" id="form-itemNameEn1" name="form-itemNameEn1" value="">
		<input type="hidden" id="form-makerName1" name="form-makerName1" value="">
		<input type="hidden" id="form-classCode1" name="form-classCode1" value="">
		
		
		<input type="text" id="pop_itemNo" placeholder="품번">
		<input type="text" id="pop_itemName"  placeholder="품명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
		<button class="btn btn-blue" id="btnItemAdd" onClick='openRegItemDialog()'>부품등록</button>
	  	<div id="grid_wrap_item" style=" height:90%;"></div>
	</div>
	
	<!--230308 장윤상 아이템 등록 dialog -->
	<div id="dialog-form-RItem" title="부품등록" style="display: none;">

		<div style="padding: 0 0 10px 14px;">
			<button class="btn btn-primary" id="btnRegItemDialog">저장</button>
			<button class="btn btn-primary  " id="btnCloseItemDialog">닫기</button>
		</div>

		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards">

					<div class="*col-md-6">
						<div class="card">

							<div class="card-body">
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">제조사</label>
									<div class="col">
										<select id="makerCodeReg" class="form-select"
											style="width: auto; padding: 2px 20px 2px 0;"> <!--onChange='fn_itemCodeCreate()'  -->
											<option value=""></option>
										</select>
									</div>
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">차종</label>
									<div class="col">
										<input type="text" id="carTypeReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">품번</label>
									<div class="col">
										<input type="text" id="itemNoReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">공장품번</label>
									<div class="col">
										<input type="text" id="factoryNoReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">부품명</label>
									<div class="col">
										<input type="text" id="itemNameReg" class="form-control"
											style="*width: 60%; max-width: 800px;" placeholder="">
									</div>
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label"
										style="min-width: 118px; width: auto;">영문부품명</label>
									<div class="col">
										<input type="text" id="itemNameEnReg" class="form-control"
											style="*width: 60%; max-width: 800px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">

									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">클래스</label>
									<div class="col">
										<select id="classCodeReg" class="form-select"
											style="width: auto; padding: 2px 25px 2px 0;"> <!-- onChange='fn_itemCodeCreate()' -->
											<option value="GN">정품</option>
											<option value="AM">애프터마켓</option>
											<option value="RM">재제조</option>
											<option value="ET">기타</option>
										</select>
									</div>
								</div>

								<div class="form-group mb-3 row" style="*min-width: 30px;">
									<label class="col-3 col-form-label" style="min-width: 118px; width: auto; ">센터가</label>
									<div class="col">
										<input type="number" id="centerPriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: inline-block;"
											placeholder="">원

									</div>
									<label class="col-3 col-form-label" style="min-width: 70px; width: auto; ">입고단가</label>
									<div class="col">
										<input type="number" id="inPriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: initial;"
											placeholder="">원
									</div>
									<label class="col-3 col-form-label" style="min-width: 70px; width: auto; ">판매단가</label>
									<div class="col">
										<input type="number" id="salePriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: initial;"
											placeholder="">원
									</div>
									<label class="col-3 col-form-label"
										style="min-width: 118px; width: auto;">&nbsp</label>
									<div class="col">&nbsp;</div>
								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

     <!-- 랙선택 팝업 -->
	<div id="dialog-form-rack" title="랙 선택" style="display:none;">
		
		<input type="text" id="pop_storCode" placeholder="창고코드">
		<input type="text" id="pop_storName"  placeholder="창고명">
		<input type="text" id="pop_rackCode" placeholder="랙코드">
		<input type="text" id="pop_rackName"  placeholder="랙명">
		<button class="btn btn-dark" id="btnRackFind">조회</button>
	  	<div id="grid_wrap_rack" style=" height:90%;"></div>
	</div>
	</div>
    </div>
    <div id="barcodePrintDiv"> </div>   
    			
			<!-- Tabler Libs JS -->

			<!-- Tabler Core -->
			<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
			<script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
		    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
			<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=1.0516.4"></script> 
			<script type="text/javascript"src="/resources/pan/js/stock-up.js?ver=1.0516.4"></script>
			<script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=3.0602.3"></script>
</body>
</html>