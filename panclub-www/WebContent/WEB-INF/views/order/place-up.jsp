<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>발주 등록</title>
     <style>
     	.container {
			display: grid;
			grid-template-columns: 45% 45%;
			grid-template-rows: 30% 30% 30%;
		}
		.item:nth-child(1) {
			grid-column-start: 1;
    		grid-column-end: 3;
		}
		.item:nth-child(2) {
			grid-column-start: 1;
    		grid-column-end: 2;
		}
		.item:nth-child(3) {
			grid-column-start: 2;
    		grid-column-end: 3;
		}
		.item:nth-child(4) {
			grid-column-start: 1;
    		grid-column-end: 4;
		}
     </style>
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script> 
	<!-- <script src="/resources/toastUI/tui.date-picker/latest/tui-date-picker.js"></script> -->
	<!-- End : Toast Date Picker  -->
	<!-- BEGIN: TimePicker -->
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
	<!--END: TimePicker  -->
	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
    <script type="text/javascript" src="/resources/js/jquery.form.js"></script>  <!-- file ajax upload -->
    <link href="/resources/pan/css/printbox.css?ver=3.0313.3" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
    
  </head>
  <body  class=" layout-fluid">
    <div class="page">
      
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
              <div class="spinner" id="spinner"></div>
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->
                <h2 class="page-title">
                  발주 등록
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">등록</button>
            <button class="btn btn-primary disabled " id="btnUpt">수정</button>
            <button class="btn btn-primary disabled " id="btnDel">삭제</button>
            <button class="btn btn-primary disabled " id="btnList">목록 이동</button>
            <button class="btn btn-primary" id="btnOReq" disabled >주문요청(작업중)</button>
        </div>
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">

	
                   <input type="hidden" name="reqArr" id="reqArr" value="${reqArr}" >
                   <input type="hidden" name="seqArr" id="seqArr" value="${seqArr}" >
                   <input type="hidden" name="orderArr" id="orderArr" value="${orderArr}" >
                   <input type="hidden" name="orderSeqArr" id="orderSeqArr" value="${orderSeqArr}" >
                   <input type="hidden" id="srchEqualItemNo" value="" />
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">발주번호</label>
                      <div class="col">
                        <input type="text" id="placeNo" value="${placeNo}" class="form-control" aria-describedby="" placeholder="발주번호자동생성" style="display:initial;width:48%; max-width:300px;" disabled>
                      </div>
                      <label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">직송 여부</label>
							<div class="col" id="custCat"style="display: flex; flex-direction: row;">
							<label class="form-check"style="margin-right: 5px"> 
								<input class="form-check-input" type="checkbox" id="directYN" name = "directYN" onchange="direct_chk()"  >
								<span class="form-check-label">직송(세액포함) </span>
							</label>   
							
							<label class="form-check"style="margin-right: 10px">    
							 	 <input type="text"  class="form-control" id="directCost"  placeholder="운송비를 입력해주세요"style="display:initial;width:100%; max-width:200px; display:none"  > 
							</label>  
                    </div>
                    <label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">발주단가 세액유무</label>
					<div class="col">
                       <select id="taxType" class="form-select" style="width:auto; padding:2px 25px 2px 0; " onChange="fn_dcProc()" >
                         <option value="1">별도</option>
                         <option value="3">포함</option>
                         <!-- <option value="2">무</option> -->
                       </select>
                     </div>
                    <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                    <!--   	<div class="col">
                      	<input type="text" class="form-control" aria-describedby="" placeholder="견적번호자동생성" style="display:none;width:48%; max-width:300px;" disabled>
                      </div>   -->
                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      	<div class="col">
                      	<input type="text" id="regUserName" class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:150px;" disabled>
                      </div> 
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">발주처</label>
                      <div class="col">
                        <input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'custName');">
                        <input type="text" id="custName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                        <input type="text" id="custMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'custMgrPhone','custCode');">
                        <input type="text" id="custMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="">
                      </div>
					  <%-- 		
                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">납품처</label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="supplyCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'supplyCustName');">
                        <input type="text" id="supplyCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                        <input type="text" id="supplyMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'supplyCustMgrPhone','supplyCustCode');">
                        <input type="text" id="supplyMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="">
                      </div> --%>       
                    </div>
                    
                 <!--   <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">요청일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="placeDmdYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper" style="margin-top: -1px;"></div> -->
				        
				         <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">발주일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="placeYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper" style="margin-top: -1px;"></div>
				        
        			  </div>    
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">입고예정일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="whSchYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper2" style="margin-top: -1px;"></div>
				        </div>
				        <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">입고예정시간</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="whSchTime" aria-label="Time">
				            <!-- <span class="tui-ico-date"></span> -->
				        </div>
				        <div id="wrapper3" style="margin-top: -1px;"></div>
				        
                      </div>    
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">차수</label>
                      <div class="col">
                      	<select id="turnNum">
                      		<option>1차(09:00)</option>
                      		<option>2차(16:00)</option>
                      	</select>
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col"><span id="">&nbsp;</span>        </div>      
                    </div>
                    
                    <div class="form-group mb-3 row">
                     <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">발주처주문번호</label>
                      <div class="col">
                        <input type="text" id="custOrderNo" class="form-control" style="*width:60%; max-width:200px;" placeholder="" >
                      </div>
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">주문요청발주번호</label> -->
                      <div class="col">
                        <input type="hidden" id="gvPlacNo" class="form-control" style="*width:60%; max-width:200px;" placeholder="" >
                      </div>
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">발급해준키</label> -->
                      <div class="col">
                        <input type="hidden" id="linkGvKey" class="form-control" style="*width:60%; max-width:200px;" placeholder="" >
                      </div>
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">발급받은키</label> -->
                      <div class="col">
                        <input type="hidden" id="linkTkKey" class="form-control" style="*width:60%; max-width:200px;" placeholder="" >
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; padding-left: 240px;">&nbsp;</label>
                      <div class="col" style="display:none">
                        <input type="text" id="" class="form-control" style="*width:60%; max-width:200px;" placeholder="" />
                      </div>
                    </div>
                     
                    <div class="form-group mb-3 row">
                     <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">비고1</label>
                      <div class="col">
                        <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:800px;" placeholder="" >
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; padding-left: 240px;">비고2</label>
                      <div class="col">
                        <input type="text" id="memo2" class="form-control" style="*width:60%; max-width:800px;" placeholder="" >
                      </div>
                    </div>      
 
  					<div class="form-group mb-3 row">
 					</div>
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">공급가액</label>
                      <div class="col">
                        <input type="text" id="salePrice" class="form-control" style="*width:60%; max-width:300px; text-align:right;" placeholder=""  disabled>
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;" >세액</label>
                      <div class="col">
                        <input type="text" id="taxPrice" class="form-control" style="*width:60%; max-width:300px; text-align:right;" placeholder="" disabled>
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">합계</label>
                      <div class="col">
                        <input type="text" id="sumPrice" class="form-control" style="*width:60%; max-width:300px; text-align:right;" placeholder=""  disabled>
                      </div>
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">한글금액</label>
                      <div class="col">
                        <input type="text" id="sumPriceKor" class="form-control" style="*width:60%; max-width:500px; text-align:right;" placeholder=""  disabled>
                      </div> -->
                    </div>                      

                    
                    <div class="form-group mb-3 row">	
                      <div style="margin : 2px 0px 0;">
                      	<!-- <span> <input type="button" class="btn btn-secondary"
								onclick="uptOrderItemCnt()" value="주문수량변경">
						</span> -->
                      	<span> <input type="button" class="btn btn-secondary"
								id="uptOrderCntBtn" value="주문수량변경">
						</span>
                      	<span style=" display: initial; float: right;">

	                      	<input type="button" class="btn btn-secondary disabled" id="btnPrint" onclick="print()"value="인쇄">
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:55vh;"></div>
                      <div style="margin : 2px 0px 0;">
                      	<input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
                      	<input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제">
                      </div>
                    </div>  

                   <!--  <div class="form-footer">
                      <button type="submit" class="btn btn-primary">등록</button>
                    </div> -->
                 <!--  </form> -->
                </div>
                
              </div>

            </div>
<!--             <div class="form-footer1">
            	<button type="submit" class="btn btn-primary" id="btnReg">등록</button>
            </div> -->
          </div>
        </div>
        
      </div>
        
      </div>
    </div>

<!-- 	<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-simple">
    	Simple modal
    </a>
                 -->  

    
    <!-- 상품선택 팝업 -->
	<div id="dialog-form-item" title="상품 선택" style="display:none;">
		<input type="text" id="pop_itemNo" placeholder="품번">
		<input type="text" id="pop_itemName"  placeholder="품명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
		<button class="btn btn-blue" id="btnItemAdd" onClick='openRegItemDialog()'>부품등록</button>
	  	<div id="grid_wrap_item" style=" height:90%;"></div>
	</div>
    
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

    <!-- 거래처담당자선택 팝업 -->
	<div id="dialog-form-custMgr" title="거래처담당자 선택" style="display:none;">
		<input type="text" id="pop_custMgrName" placeholder="담당자명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
	  	<div id="grid_wrap_custMgr" style=" height:90%;"></div>
	</div>

	<!-- 프린트 팝업 -->
<div id="dialogPrint-form" title="파일 저장" style="display:none;">
  <div id="contents720">
    <div class="contentBox">
      <div>
        <h3>파일 저장하기</h3>
        <div class="form-group mb-3 row">
          <label class="col-3 col-form-label">비고 인쇄</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printMemoYN" name="printMemoYN">
          </div>
        </div>
          <p>비고 출력을 원하는 경우 상단 체크박스를 체크해주세요</p>
      </div>
      <div class="bottom" id="button-container">
        <div class="box1">
          <button type="button" id="print" class="w-btn w-btn-gray" ><i class="fas fa-file-upload"></i><span>인쇄</span></button><br>
         <button type="button" id="exportXls" class="w-btn w-btn-gray w-btn-outline" onclick="exportTo('xlsx')"value="엑셀다운"><i class="fas fa-file-upload"></i><span>엑셀 다운로드</span></button>
        </div>
        <div class="box2">
          
          <button type="button" id="btnDownload" class="w-btn w-btn-gray"><i class="fas fa-file-upload"></i><span>이미지 다운로드</span></button><br>
          <button type="button" id="exportPdf" class="w-btn w-btn-gray w-btn-outline"onclick="exportTo('pdf')" value="PDF다운"><i class="fas fa-file-upload"></i><span>PDF다운로드</span></button>
        </div>
      </div>
    </div>
  </div>
</div>

		
		
	<!--230308 장윤상 아이템 등록 dialog -->
	<div id="dialog-form-RItem" title="부품등록" style="display: none;">

		<div style="padding: 0 0 10px 14px;">
			<button class="btn btn-primary" id="btnRegDialog">저장</button>
			<button class="btn btn-primary  " id="btnCloseDialog">닫기</button>
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
	
	<!-- 주문요청진행 팝업 -->
	<div id="dialogOReq-form" title="주문요청진행" style="display:none;">
	<div style="padding: 0 0 10px 14px;">
		<button class="btn btn-primary" id="btnRegDialogOReq">저장</button>
		<button class="btn btn-primary  " id="btnDelDialogOReq">삭제</button>
		<span style=" display: initial; float: right; margin-right: 50px;">
			<button class="btn btn-primary  " id="btnCloseDialogOReq">닫기</button>
        </span>
	</div>
		<div id="grid_wrap_oReq" style=" height:80%;"></div>
	</div>
	
	<!-- 주문수량변경 팝업 -->
	<div id="dialog-form-upt-order-cnt" title="주문 수량 정보" style="display:none;">
			
		<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">주문처</label>
        <div class="col">
	        <div class="">
	          	<input type="text" class="" id="pop_custName" disabled>
	      	</div>
  	    </div>
  	    
  	    
  	    <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:5px;">부품정보</label>
	    <div class="col">
	        <div style="display: flex;">
		         	<input type="text" class="form-control" id="pop_itemId" value=""  style="width: 15%; margin-right: 5px;" placeholder="" disabled> 
		         	<input type="text" class="form-control" id="pop_itemNo2" value=""  style="width: 30%; margin-right: 5px;" placeholder="" disabled> 
		         	<input type="text" class="form-control" id="pop_itemName2" value="" style="width: 50%; margin-right: 5px;" placeholder="" disabled> 
		    </div>
	    </div>
	    
	    <div style="display: flex;">
  	    	<label style="min-width: 150px; margin-top:15px;">현재</label> 
  	    	<label style="min-width: 150px; margin-top:15px; ">변경 후</label> 
  	    	<label style="min-width: 150px; margin-top:15px; ">변경여부</label>
  	    </div>
  	    <div style="display: flex;">
  	    	<label style="min-width: 150px; margin-top:5px;">주문수량</label> 
  	    	<!-- <label style="min-width: 150px;  margin-top:5px;">주문수량</label> -->
  	    </div>
	    <div class="col">
	    	 <div class="flex;">
	          	<input type="text" id="pop_oiCnt" placeholder="주문수량"  style="width: 20%; text-align: right;" disabled>
	          	<input type="text" id="pop_oiCnt_after" placeholder=""  style="margin-left: 70px; width: 20%; text-align: right;" disabled>
	          	<input type="checkbox" name="chkOiCnt" id="chkOiCnt" style="margin-left: 90px;" checked disabled>
	      	</div>
	  	</div>
	  	
	  	<label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-top:15px;">발주요청수량(총)</label>
	    <div class="col">
	    	 <div class="flex;">
	          	<input type="text" id="pop_sumPriCnt" placeholder="발주요청수량"  style="width: 20%; text-align: right;" disabled>
	          	<input type="text" id="pop_sumPriCnt_after" placeholder=""  style="margin-left: 70px; width: 20%; text-align: right;" disabled>
	          	<input type="checkbox" name="chkPriCnt" id="chkPriCnt" style="margin-left: 90px;" checked disabled>
	      	</div>
	  	</div>
		
	  	<label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-top:15px;">출고요청수량(총)</label>
	    <div class="col">
	    	 <div class="flex;">
	          	<input type="text" id="pop_sumRlCnt" placeholder="출고요청수량"  style="width: 20%; text-align: right;" disabled>
	          	<input type="text" id="pop_sumRlCnt_after" placeholder=""  style="margin-left: 70px; width: 20%; text-align: right;" disabled>
	          	<input type="checkbox" name="chkRlCnt" id="chkRlCnt" style="margin-left: 90px;" checked>
	      	</div>
	  	</div>
		
		<input type="hidden" id="pop_priCnt"  placeholder="발주수량">
		
		<hr width="100%" noshade/>
		
		<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">변경수량</label>
	    <div class="col">
	    	 <div class="">
	          	<input type="text" id="pop_uptCnt" class="form-control" style="width:60%;  margin-top:5px; text-align: right;" placeholder="증감수량입력" oninput="this.value=this.value.replace(/[^-0-9]/g,'');" >
	      	</div>
	  	</div>

		
	</div>
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String placeUp = application.getRealPath("/resources/pan/js/place-up.js");	
			File placeUpFile = new File(placeUp);	
			Date lastModified_placeUpFile = new Date(placeUpFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>	
		
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript" src="/resources/pan/js/place-up.js?ver=<%=fmt.format(lastModified_placeUpFile)%>"></script>
    <!-- <script type="module" src="/resources/pan/js/place-up.js?ver=2.0124.4"></script> -->
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

  </body>
</html>