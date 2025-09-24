<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>주문등록</title>
    <!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />

 	<!-- fancyBox -->
 	
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
                  주문 등록
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">등록</button>
            <button class="btn btn-primary disabled " id="btnUpt">수정</button>
            <button class="btn btn-primary disabled " id="btnDel">삭제</button>
        </div>
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">

	
                   <input type="hidden" name="estiNo" id="estiNo" value="${estiNo}" >
                   <input type="hidden" name="seqArr" id="seqArr" value="${seqArr}" >
                   <input type="hidden" name="pcReqNo" id="pcReqNo" value="${pcReqNo}" >
                   <input type="hidden" name="reqSeqArr" id="reqSeqArr" value="${reqSeqArr}" >
                   <input type="hidden" name="pcYN" id="pcYN" value="${pcYN}" > 
                   <input type="hidden" id="srchEqualItemNo" value="" />
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">주문번호</label>
                      <div class="col">
                        <input type="text" id="orderNo" value="${orderNo}" class="form-control" aria-describedby="" placeholder="주문번호자동생성" style="display:initial;width:48%; max-width:300px;" disabled>
                         <input type="text" id="orderGroupId" value="${orderGroupId}" class="form-control" aria-describedby="" placeholder="주문그룹ID자동생성" style="display:initial;width:48%; max-width:300px;" disabled>
                      </div> 
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      	<div class="col">
                      	<input type="text" class="form-control" aria-describedby="" placeholder="견적번호자동생성" style="display:none;width:48%; max-width:300px;" disabled>
                      </div>  
                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      	<div class="col">
                      	<input type="text" id="regUserName" class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:150px;" disabled>
                      </div>
                      <label id="branchCodeLabel" class="col-3 col-form-label " style="min-width: 118px; width:auto;">관리지점</label>
                      <div class="col">
                      	<select id="branchCode" class="form-select" style="display:initial;width:auto; padding:2px 20px 2px 0; ">
                          <option value=""></option>
                        </select>  
                    	</div>
                    	     
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col">
                         <div>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="orderType"  value="1" checked onClick="click_orderType(1)">
                                <span class="form-check-label">직영</span>
                              </label>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="orderType" value="2"  onClick="click_orderType(2)" >
                                <span class="form-check-label">대행</span>
                              </label>
                            </div>
                      </div>      
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">세액유무</label>
	                      <div class="col">
	                        <select id="taxType" class="form-select" style="width:auto; padding:2px 25px 2px 0;" onChange="order_dcProc()" >
	                          <option value="1">별도</option>
	                          <option value="3">포함</option>
	                          <!-- <option value="2">무</option> -->
	                        </select>
	                      </div>                        
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">주문처</label>
                      <div class="col">
                        <input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'custName');">
                        <input type="text" id="custName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                        <input type="text" id="custMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyDown="findCustMgr(this,'custMgrPhone','custCode');">
                        <input type="text" id="custMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="">
                      </div>
					  		
                  <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">납품처</label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="supplyCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'supplyCustName');">
                        <input type="text" id="supplyCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                        <input type="text" id="supplyCustMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyDown="findCustMgr(this,'supplyCustMgrPhone','supplyCustCode');">
                        <input type="text" id="supplyCustMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="">
                      </div>       
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">차량정보</label>
                      <div class="col">
                        <input type="text" id="carNo" class="form-control" size=12 maxlength=12 style="display:initial;width:60%; max-width:130px;" placeholder="차량번호" >
                        <span id="existOrderNoti" style="display:none; color:red;">작성 중인 주문이 있습니다.확인하세요. <button class="btn btn-ghost-primary w-100" style="width:20px!important;  color: black;"id ="popBtn" style="color:blue;" onclick= "openOrderGroupDialog()" >보기</button> </span>
                        <input type="text" id="vinNo" class="form-control" style="display:initial;width:60%; max-width:170px;" placeholder="차대번호" >
                        <input type="text" id="colorCode" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="컬러코드" >
                        <select id="makerCode" class="form-select" style="display:initial;width:auto; padding:2px 20px 2px 0; ">
                          <option value="">제조사</option>
                        </select>
                        <input type="text" id="carType" class="form-control" style="display:initial;width:60%; max-width:200px;" placeholder="차종" >
                      </div>
                    </div>                      

 					<div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">할인율</label>
                      <div class="col">
                          <input type="text" id="dcRate" class="form-control" aria-describedby="" placeholder="할인율" style="display:initial;width:48%; max-width:100px;"  onChange="order_dcProc(true)" oninput="this.value = this.value.replace(/[^0-9.-]/g, '').replace(/(\..*)\./g, '$1');">
                         
                        <!--   <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                            <input class="form-check-input" type="radio" name="dcDspType"  value="1" checked>
                            <span class="form-check-label">할인가 개별표시</span>
                          </label>
                          <label class="form-check form-check-inline" style="margin-bottom: 0px;   display: initial;    position: absolute;">
                             <input class="form-check-input" type="radio" name="dcDspType"  value="2" >
                            <span class="form-check-label">할인가 별도표시</span>
                          </label> -->
                         
                      </div>
					  		
					  <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto; display:none;">주문대행 수수료율</label>
                      <div  id="supplyInfo-input" class="col"  style="display:none; " >
                        <input type="text" id="agencyFeeRate" class="form-control" aria-describedby="" placeholder="" style="display:initial;width:48%; max-width:100px;" disabled>%
                      </div>       

                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto; display:none;">부품마진율</label>
                      <div  id="supplyInfo-input" class="col"  style="display:none; ">
                        <input type="text" id="marginRate" class="form-control" aria-describedby="" placeholder="" style="display:initial;width:48%; max-width:100px;" disabled>%
                      </div>

                    </div>
                    
                    <div class="form-group mb-3 row">
                     <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">비고1</label>
                      <div class="col">
                        <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:560px;" placeholder="" >
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">비고2</label>
                      <div class="col">
                        <input type="text" id="memo2" class="form-control" style="*width:60%; max-width:560px;" placeholder="" >
                      </div>
                    </div>      

		
				<%-- 	<div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">보험사1 정보</label>
                      <div class="col">
                        <input type="text" id="insure1Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'insure1Name');">
                        <input type="text" id="insure1Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" disabled>
                        <input type="text" id="insure1MgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" required onKeyDown="findCustMgr(this,'insure1MgrPhone','insure1Code');">
                        <input type="text" id="insure1MgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required >
                      </div>
					  		
                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">보험사2 정보</label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="insure2Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'insure2Name');">
                        <input type="text" id="insure2Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" disabled>
                        <input type="text" id="insure2MgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;"  required onKeyDown="findCustMgr(this,'insure2MgrPhone','insure2Code');">
                        <input type="text" id="insure2MgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="">
                      </div>       
                    </div> --%>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">보험사1 정보</label>
                      <div class="col">
                        <input type="text" id="insure1Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'insure1Name');" >
                        <input type="text" id="insure1Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="insure1MgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'insure1MgrPhone','insure1Code',0,'','insure1MgrFax');" >
                        <input type="text" id="insure1MgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="" >
                        <input type="text" id="insure1MgrFax" class="form-control" aria-describedby="" placeholder="팩스" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="" >
                      </div>	
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">보험사2 정보</label>
                     <div class="col">
                     <input type="text" id="insure2Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'insure2Name');" >
                        <input type="text" id="insure2Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="insure2MgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'insure2MgrPhone','insure2Code',0,'','insure2MgrFax');" >
                        <input type="text" id="insure2MgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="" >
                        <input type="text" id="insure2MgrFax" class="form-control" aria-describedby="" placeholder="팩스" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="" >
                      </div>       
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label "  style="min-width: 118px; width:auto;"></label>
                      <div class="col">
                        <input type="text" id="insure1AcceptNo" class="form-control" aria-describedby="" placeholder="접수번호" style="display:initial;width:48%; max-width:200px;" >
                        <input type="text" id="insure1AcciRate" class="form-control" aria-describedby="" placeholder="과실율" style="display:initial;width:48%; max-width:100px;"oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" >
                      
                      </div>
					  		
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="insure2AcceptNo" class="form-control" aria-describedby="" placeholder="접수번호" style="display:initial;width:48%; max-width:200px;" >
                        <input type="text" id="insure2AcciRate" class="form-control" aria-describedby="" placeholder="과실율" style="display:initial;width:48%; max-width:100px;" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                      </div>       
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
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">한글금액</label>
                      <div class="col">
                        <input type="text" id="sumPriceKor" class="form-control" style="*width:60%; max-width:500px; text-align:right;" placeholder=""  disabled>
                      </div>
                    </div>   
 
                                          
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary disabled" onclick="orderGroup()" value="주문관리"  id="btnOrderGroup">
	                      	<input type="button" class="btn btn-secondary disabled" onclick="stockCheck()" value="재고확인" id="btnStockChk">
	                      	<input type="button" class="btn btn-secondary disabled" onclick="itemChk()" value="부품검토"  id="btnItemChk" style="display:none; " >
	                      	<input type="button" class="btn btn-secondary disabled" onclick="divide()" value="분할" id="btnDivide">
	                      	<input type="button" class="btn btn-secondary " value="올림단위" id="btnCeilPop" style="*display:none;" > 
	                      	<!-- <button class="btn btn-secondary" id="saleRateSet" onclick="setItemBrandSaleRate(false)">브랜드별 할인 적용</button> -->
                      	</span>
                      	<span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary " onclick="estiExcelAdd()" value="엑셀업로드">
	                      	<input type="button" class="btn btn-secondary disabled" id="btnPrint" onclick="print()"value="인쇄">
	                      	
	                      	<!-- <input type="button" class="btn btn-secondary disabled" id="exportXls" onclick="exportTo('xlsx')" value="엑셀다운">
	                      	<input type="button" class="btn btn-secondary disabled" id="exportPdf"  onclick="exportTo('pdf')" value="PDF다운"> -->
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
		<button class="btn btn-dark" id="btnCustMgr">조회</button>
	  	<div id="grid_wrap_custMgr" style=" height:90%;"></div>
	</div>


<!-- 기견적 조회 팝업   
					<div id="popup_layer">
							<div class="popup_box">
								팝업 컨텐츠 영역
								<div class="popup_cont">
									<h2>[주문등록 ]</h2>
									<div id="orderGroup"></div>
								</div>
								팝업 버튼 영역
								<div class="popup_btn">
									하루동안 보지않기
									<a id="chk_use" class="close_day">선택사용</a>									
									<a id="chk_new"  class="close_day">신규 주문등록</a>
									<a href="javascript:closePop();">닫기</a>
								</div>
							</div>
						</div>     

 -->





 	<!-- 엑셀업로드 팝업 -->
	<div id="dialogXls-form" title="엑셀업로드"  style="display:none;">
		  <div id="contents720">			
			<form id="addExcelForm" name="addExcelForm" enctype="multipart/form-data" method="post"  action= "order-up-xls">
			    <div >
			        <div class="di_cl_bacth_data_guide">
			        
					<div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;text-align:right;">품번</label>
                      <div class="col">
                        <input type="text" id="xls_itemNo" name="xls_itemNo" class="form-control" maxlength=1 style="*width:60%; max-width:300px; text-align:center; " placeholder="" value="A" onKeyDown="_cf_onlyUpper(this)" >
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;" >수량</label>
                      <div class="col">
                        <input type="text" id="xls_qty" name="xls_qty" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder="" value="B"  onKeyDown="_cf_onlyUpper(this)">
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">단가</label>
                      <div class="col">
                        <input type="text" id="xls_unitPrice" name="xls_unitPrice" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value="C"  onKeyDown="_cf_onlyUpper(this)">
                      </div>
                    </div>  
					<div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;text-align:right;">비고</label>
                      <div class="col">
                        <input type="text" id="xls_memo" name="xls_memo" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value=""  onKeyDown="_cf_onlyUpper(this)">
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;" >발주처코드</label>
                      <div class="col">
                        <input type="text" id="xls_placeCustCode" name="xls_placeCustCode" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value="" onKeyDown="_cf_onlyUpper(this)">
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">발주단가</label>
                      <div class="col">
                        <input type="text" id="xls_placeUnitPrice" name="xls_placeUnitPrice" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder="" value=""  onKeyDown="_cf_onlyUpper(this)" >
                      </div>
                    </div>  

					<div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;text-align:right;">시작</label>
                      <div class="col">
                        <input type="text" id="xls_sRow" name="xls_sRow" maxlength=3 class="form-control" style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value="2" onKeyDown="_cf_onlyNumber(this)">
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;" >&nbsp;</label>
                      <div class="col">
                        &nbsp;
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">&nbsp;</label>
                      <div class="col">
                        &nbsp;
                      </div>
                    </div>  


			        </div>
			        <dl class="dl_cl__file">	
			        	<div class="form-group mb-3 row">
			        	<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">이어 올리기</label>
			        	<div class="col">
                       	<label class="form-check">
                        <input class="form-check-input " type="checkbox" id="connectYN  " name="connectYN" checked disabled>
                       	 <span style="color:darkred; font-size:11px;">'이어 올리기'가 아닌 경우 품목을 삭제 후 엑셀업로드 하세요.</span> 
                        </label>
                        </div>
                        
                      </div>    
                      		        	
			            <dd><input type="file" id="batchFile"  name="batchFile" style="width:480px; border:1px solid #DDDDDD;"/></dd>
			        </dl>        
			    </div>	    
			    <div class="bottom">
			        <button type="button" id="iBtn-addExcel" class="btn" onclick="fn_fileDataCall()" ><i class="fas fa-file-upload"></i><span >올리기</span></button>
			        <!-- <button type="button" id="iBtn-popClose" class="btn" onclick="fnPopClose()" ><i class="fas fa-window-close"></i><span>닫기</span></button> -->  
			    </div>
			</form> 
		 </div>	
	</div>

	<!-- 프린트 팝업 -->
<!-- <div id="dialogPrint-form" title="파일 저장" style="display:none;">
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
	 -->
	 
	 <!-- 프린트 팝업 -->
<!-- <div id="dialogPrint-form" title="파일 저장" style="display:none;">
  <div id="contents720">
    <div class="contentBox">
      <div>
        <h3>파일 저장하기</h3>
        <div class="form-group mb-3 row">
          <label class="col-3 col-form-label">비고 인쇄</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printMemoYN" name="printMemoYN">
          </div>
          <label class="col-3 col-form-label">인쇄 시 할인율 포함</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printDcYN" name="printDcYN">
          </div>
        </div>
        <div class="form-group mb-3 row">
        <label class="col-3 col-form-label">품번 숨기기</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printNoYN" name="printNoYN">
          </div>
        </div>
        </div>
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
  </div> -->
  <div id="dialogPrint-form" title="파일 저장" style="display:none;">
  <div id="contents720">
    <div class="contentBox">
      <div>
        <h3>파일 저장하기</h3>
        <div class="form-group mb-3 row">
          <label class="col-3 col-form-label">인쇄 시 할인율</label>
         <div class="Opt">
	      <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	           <input class="form-check-input" type="radio" name="printDcYN"  value="Y" checked >
	           <span class="form-check-label">할인율 포함(할인율 표기)</span>
	         </label>
	        <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	             <input class="form-check-input" type="radio" name="printDcYN" value="YY"   >
	              <span class="form-check-label">할인율 포함(할인율 미표기)</span>
	          </label>
	           <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	             <input class="form-check-input" type="radio" name="printDcYN" value="N"   >
	              <span class="form-check-label">할인율 미포함</span>
	          </label>
      	</div>
      	<div class="form-group mb-3 row"style="margin-top: 15px">
          <label class="col-3 col-form-label" style="margin-left: 50px;">비고 인쇄</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printMemoYN" name="printMemoYN">
          </div>
         <!--  <label class="col-3 col-form-label">인쇄 시 할인율 포함</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printDcYN" name="printDcYN">
          </div> -->
        <label class="col-3 col-form-label">품번 숨기기</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printNoYN" name="printNoYN">
          </div>
        </div>
       </div> 
       <!--  <div class="form-group mb-3 row">
        </div> -->
        </div>
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
	
		
	<!-- 오더그룹 매칭 -->
		<div id="dialog-form-orderGroup" title="주문등록" style="display: none;">
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnRegDialog">선택</button>
				<button class="btn btn-primary  " id="btnNewDialog">신규 주문생성</button>
				<button class="btn btn-primary  " id="btnCloseDialog">닫기</button>
				
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">
						<div class="*col-md-6">
							<div class="card">
								<div class="card-body">
									<div class="form-group mb-3 row">
										<!-- <label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">차량번호</label>
										<div class="col">
											<input type="text" id="carNo_dialog" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div>
										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">요청번호</label>
										<div class="col">
											<input type="text" id="clReqNo" class="form-control"
												style="width: 60%; max-width: 300px;" placeholder="">
										</div> -->
										<div class="form-group mb-3 row">
											<div id="grid_wrap_orderGroup" style="width: 99.1%; height: 50vh;"></div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>                                         
			</div>
		</div>	
	
     <!-- 단위 올림 팝업 -->
	<div id="dialog-form-ceil" title="단위 올림" style="display:none;">
		<div style="padding: 30px 0;">
	          <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	            	<input class="form-check-input" type="radio" name="ceilUnit"  value="100" checked >
	            	<span class="form-check-label">100원단위</span>
	          </label>
	          <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	            	<input class="form-check-input" type="radio" name="ceilUnit" value="10"  >
	            	<span class="form-check-label">10원단위</span>
	          </label>
	          <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	            	<input class="form-check-input" type="radio" name="ceilUnit" value="0"  >
	            	<span class="form-check-label">0원단위</span>
	          </label>
        </div>
        <div style="color:darkRed">
        * 그리드에서만 변경되며 등록/수정 버튼을 클릭해야 저장됩니다.<br>
         </div>
		<!-- <button class="btn btn-blue" id="btnCeil" >올림 처리</button> -->

	</div>
	
	 <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String orderUp = application.getRealPath("/resources/pan/js/order-up.js");	
			File orderUpFile = new File(orderUp);	
			Date lastModified_orderUpFile = new Date(orderUpFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
					
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript" src="/resources/pan/js/order-up.js?ver=<%=fmt.format(lastModified_orderUpFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

  </body>
</html>