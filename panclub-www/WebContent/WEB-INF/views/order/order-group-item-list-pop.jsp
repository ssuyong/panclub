<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title> 주문그룹상세-팝업처리</title>
    <!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox -->
    
    <style>
 input:disabled {
    		all: none;
    		background-color: #fff;
    		border: 1px solid #d9dbde;
    		font-weight: 400;
    		border-radius: 4px;
    		font-family: inherit;
	}
    </style>    
    <link href="/resources/pan/css/printbox.css?ver=1.0711.3" rel="stylesheet" />
  </head>    
  <body  class=" layout-fluid">
    <div class="page">
      
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->
                <h2 class="page-title">
                  주문그룹 상세 (대량처리)
                </h2>
              </div>
            </div>
          </div>
        </div>

         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">

	               <input type="hidden" id="dataComCode" value="${dataComCode}" />
                   <input type="hidden" name="estiNo" id="estiNo" value="${estiNo}" >
                   <input type="hidden" name="seqArr" id="seqArr" value="${seqArr}" >
                   
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">주문관리ID</label>
                      <div class="col">
                        <%-- <input type="text" id="orderNo" value="${orderNo}" class="form-control" aria-describedby="" placeholder="주문번호자동생성" style="display:initial;width:48%; max-width:300px;" disabled> --%>
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
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">관리지점</label>
                      <div class="col">
                      	<select id="branchCode" class="form-select" style="display: initial; width: auto; padding: 2px 20px 2px 0;" disabled>
                          <option value=""></option>
                        </select>  
                    	</div>
                    	   
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col">
                         <div>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="orderType"  value="1" checked onClick="click_orderType(1)"disabled >
                                <span class="form-check-label">직영</span>
                              </label>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="orderType" value="2"  onClick="click_orderType(2)" disabled >
                                <span class="form-check-label">대행</span>
                              </label>
                            </div>
                      </div>      
 						<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">세액유무</label>
	                      <div class="col">
	                        <select id="taxType" class="form-select" style="width:auto; padding:2px 25px 2px 0; " onChange="fn_dcProc()" disabled>
	                          <option value="1">별도</option>
	                          <option value="3">포함</option>
	                          <option value="2">무</option>
	                        </select>
	                      </div>                        
                    	</div>
                    
                                        
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">판매처</label>
                      <div class="col">
                        <input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'custName');"readonly >
                        <input type="text" id="custName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="custMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'custMgrPhone','custCode');"readonly >
                        <input type="text" id="custMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp=""readonly >
                      </div>
					  		
                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">납품처</label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="supplyCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'supplyCustName');"readonly >
                        <input type="text" id="supplyCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="supplyMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'supplyCustMgrPhone','supplyCustCode');"readonly >
                        <input type="text" id="supplyMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp=""dreadonly isabled>
                      </div>       
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차량정보</label>
                      <div class="col">
                        <input type="text" id="carNo" class="form-control" size=12 maxlength=12 style="display:initial;width:60%; max-width:150px;" placeholder="차량번호" readonly >
                        <span id="existorderNoti" style="display:none; color:red;">작성 중인 주문이 있습니다.확인하세요. <span style="color:blue;" >보기</span></span>
                        <input type="text" id="vinNo" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="차대번호" readonly >
                        <input type="text" id="colorCode" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="컬러코드" readonly >
                        <input type="text" id="makerCode" class="form-control" style="display:initial;width:60%; max-width:100px;" placeholder="제조사" readonly  >
                       <!--  <select id="makerCode" class="form-select" style="display:initial;width:auto; padding:2px 20px 2px 0; ">
                          
                        </select> -->
                        <input type="text" id="carType" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="차종" readonly >
                      </div>
                    </div>                      

 					<div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">할인율</label>
                      <div class="col">
                          <input type="text" id="dcRate" class="form-control" aria-describedby="" placeholder="할인율" style="display:initial;width:48%; max-width:100px;" readonly >
                         
                          <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                            <input class="form-check-input" type="radio" name="dcDspType"  value="1" checked disabled >
                            <span class="form-check-label">할인가 개별표시</span>
                          </label>
                          <label class="form-check form-check-inline" style="margin-bottom: 0px;   display: initial;    position: absolute;">
                             <input class="form-check-input" type="radio" name="dcDspType"  value="2" disabled >
                            <span class="form-check-label">할인가 별도표시</span>
                          </label>
                          
                      </div>
					  		
					  <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;  display:none;">주문대행 수수료율</label>
                      <div  id="supplyInfo-input" class="col"   style="display:none; " >
                        <input type="text" id="agencyFeeRate" class="form-control" aria-describedby="" placeholder="" style="display:initial;width:48%; max-width:100px;" readonly >%
                      </div>       

                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;  display:none;">부품마진율</label>
                      <div  id="supplyInfo-input" class="col"   style="display:none; "  >
                        <input type="text" id="marginRate" class="form-control" aria-describedby="" placeholder="" style="display:initial;width:48%; max-width:100px;" readonly >%
                      </div>

                    </div>
                    
                    <div class="form-group mb-3 row">
                     <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">비고1</label>
                      <div class="col">
                        <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:560px;" placeholder="" readonly >
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">비고2</label>
                      <div class="col">
                        <input type="text" id="memo2" class="form-control" style="*width:60%; max-width:560px;" placeholder="" readonly  >
                      </div>
                    </div>      

					<%-- <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">보험사1 정보</label>
                      <div class="col">
                        <input type="text" id="insure1Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'custName');"readonly >
                        <input type="text" id="insure1Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="insure1MgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'custMgrPhone','custCode');"readonly >
                        <input type="text" id="insure1MgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp=""readonly >
                      </div>
					  		
                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">보험사2 정보</label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="insure2Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'supplyCustName');"readonly >
                        <input type="text" id="insure2Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="insure2MgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'supplyCustMgrPhone','supplyCustCode');"readonly >
                        <input type="text" id="insure2MgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp=""readonly >
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
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right; display:none;">한글금액</label>
                      <div class="col" style="display:none;" >
                        <input type="text" id="sumPriceKor" class="form-control" style="*width:60%; max-width:500px; text-align:right;" placeholder=""  disabled>
                      </div>
                    </div>
                   </div>    
                                                             
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
                      		<input type="button" class="btn btn-secondary " onclick="itemChk()" value="중복검토" id="btnItemChk" >
	                      	<input type="button" class="btn btn-secondary " onclick="storageUseReq()" value="창고사용">
	                      	<input type="button" class="btn btn-secondary" onclick="placeReq()" value="발주요청">
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="요청취소"> -->
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="요청취소"> -->
	                      	<!-- <input type="button" class="btn btn-secondary disabled" onclick="storMvReq()" value="이동요청"> -->
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="요청취소"> -->
	                      	<input type="button" id="btnClInsure" class="btn btn-secondary " onclick="clTypeProc('보험')" value="보험적용" title="보험사가 등록안된 경우 비활성화" style="pointer-events: auto;">
	                      	<input type="button" id="btnClGeneral" class="btn btn-secondary " onclick="clTypeProc('일반')" value="일반적용" >
	                      	<input type="button" class="btn btn-secondary " onclick="rlReq()" value="출고요청">
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="요청취소"> -->
	                      	<input type="button" class="btn btn-secondary" onclick="riReq()" value="반입요청">
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="요청취소"> -->
	                      	<input type="button" class="btn btn-secondary" onclick="roReq()" value="반출요청">
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="요청취소"> -->
	                      <!-- 	<input type="button" class="btn btn-secondary " onclick="clReq()" value="청구요청">	           -->            	
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="요청취소"> -->
	                      	
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="removeRow1()" value="품번변경"> -->
	                      	<!-- <input type="button" id="btnClInsure" class="btn btn-secondary " onclick="clTypeProc('보험')" value="보험적용" title="보험사가 등록안된 경우 비활성화" style="pointer-events: auto;">
	                      	<input type="button" id="btnClGeneral" class="btn btn-secondary " onclick="clTypeProc('일반')" value="일반적용" > -->
	                      	<input type="button" class="btn btn-secondary " onclick="clReq()"value="청구요청">	  
	                      	<!-- <input type="button" class="btn btn-secondary " onclick="clReqAdd()" value="청구요청2"> -->
	                      	
                      	</span>
                      	<!-- <span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary" onclick="addRow1(myGridID,'last')" value="엑셀업로드">
	                      	<input type="button" class="btn btn-secondary" onclick="removeRow1()" value="인쇄">
                      	</span> -->
                      	 <span style=" display: initial; float: right;">
                      		 <input type="button" class="btn btn-secondary" style="margin-right:7px;"onclick="printReq()" value="인쇄">
                      	 </span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:55vh;"></div>
                      <div style="margin : 2px 0px 0;">
                      	<span>
                      	<!-- <input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
                      	<input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제"> -->
                      	</span>
                      	<span style=" display: initial; float: right;"> 
                      	<input type="text" id="gridFixedCnt" value="11" style="width:40px;height:22px;text-align:center;">
						<span onclick="setFixedColumnCount()" class="btn">고정 칼럼 변경</span>
						</span>
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
	  	<div id="grid_wrap_item" style=" height:90%;"></div>
	</div>
    
    <!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
	</div>

    <!-- 거래처담당자선택 팝업 -->
	<div id="dialog-form-custMgr" title="거래처담당자 선택" style="display:none;">
		<input type="text" id="pop_custMgrName" placeholder="담당자명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
	  	<div id="grid_wrap_custMgr" style=" height:90%;"></div>
	</div>
	
		<!-- 청구요청 매칭 -->
		<div id="dialog-form-orderGroup" title="청구요청 " style="display: none;">
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnRegDialog">선택</button>
				<button class="btn btn-primary " id="btnNewDialog2">신규 청구생성</button>
				<button class="btn btn-primary disabled" id="btnNewDialog3">신규 (-) 청구생성</button>
				<!-- <button class="btn btn-primary  " id="btnNewDialog">신규 청구생성</button> -->
				<button class="btn btn-primary  " id="btnCloseDialog">닫기</button>			
					<label style="min-width: 50px; width:auto;  margin-left: 30px;pading : 5px;" >청구요청구분</label>   
                      	<select id="clReqType" style="padding: 3px;">
                      		<option></option>
                      		<option>즉시청구</option>
                      		<option>청구대기</option>
                      	</select>
                      	<label style="min-width: 50px; width:auto;  margin-left: 30px;pading : 5px;" >증빙유형</label>   
                      	<select id="expType" style="padding: 3px;">
                      		<option></option>
                      		<option>현금영수증</option>
                      		<option>세금계산서</option>
                      		<option>카드</option>
                      	</select>
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">
						<div class="*col-md-6">
							<div class="card">
								<div class="card-body">
									<div class="form-group mb-3 row">
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
			<!-- 프린트 팝업 -->
<!-- <div id="dialogPrint-form" title="파일 저장" style="display:none;">
  <div id="contents720">
    <div class="contentBox">
      <div>
        <h3>파일 저장하기</h3>
        <div class="form-group mb-3 row">
          <label class="col-3 col-form-label">반입 포함 인쇄</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printRiYN" name="printRiYN">
          </div>
          <label class="col-3 col-form-label">인쇄 시 할인율 포함</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printDcYN" name="printDcYN" checked>
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
	           <input class="form-check-input" type="radio" name="printDcYN"  value="Y"  >
	           <span class="form-check-label">할인율 포함(할인율 표기)</span>
	         </label>
	        <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	             <input class="form-check-input" type="radio" name="printDcYN" value="YY" checked  >
	              <span class="form-check-label">할인율 포함(할인율 미표기)</span>
	          </label>
	           <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	             <input class="form-check-input" type="radio" name="printDcYN" value="N"   >
	              <span class="form-check-label">할인율 미포함</span>
	          </label>
      	</div>
      	<div class="form-group mb-3 row"style="margin-top: 15px">
          <label class="col-3 col-form-label">반입 포함 인쇄</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printRiYN" name="printRiYN">
          </div>
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
  </div>
</div>

    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript" src="/resources/pan/js/order-group-item-list-pop.js?ver=1.1128.3"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0531.3"></script> 

  </body>
</html>