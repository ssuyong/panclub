<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>청구요청 상세내역</title>
    <style>
    /* 커스텀 에디터 스타일 */
		#textAreaWrap {
			font-size:12px;
			position:absolute;
			height:80px;
			min-width:100px;
			background:#fff;
			border:1px solid #555;
			display:none;
			padding:4px;
			text-align:right;
			z-index:9999;
		}
		#textAreaWrap textarea {
		font-size:12px;
		border: 0.8px solid #626976;
		background-color: #d9e5ff;
		}
		/* 에디터 버튼 */
		.editor_btn {
			background:#ccc;
			border : 1px solid #555;
			cursor : pointer;
			margin: 2px;
			padding:2px;
		}
		.button-wrap {
		  display: flex;
		 /* // justify-content: space-between; */
		  margin-top: 4px;
		}
		/* 커스텀 행 스타일 */
		.my-cell-style {
			background: #FF9999;
			font-weight: bold;
			color: #22741C;
		}
		.container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			/* row-gap: 10px; */
			column-gap: 10px;
			grid-template-row: repeat(auto-fill, minmax(50%, auto));
		}		
		.item:nth-child(1) {
			grid-column: 1 / span 1;
			grid-row: 1 / span 2;
		}
		.item:nth-child(2) {
			grid-column: 2 / span 1;
			grid-row: 2 / span 2;
		}
		.item:nth-child(3) {
			grid-column: 3 / span 1;
			grid-row: 2 / span 2;
		}
		.item:nth-child(4) {
			grid-column: 1 / span 1;
			grid-row: 3 / span 3;
		}
		.item:nth-child(5) {
			grid-column: 2 / span 2;
			grid-row: 4 / span 2;
		}
		.item:nth-child(6) {
			grid-column: 2 / span 2;
			grid-row: 1 / span 1;
		}
    </style>

    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
	  <link href="/resources/pan/css/printbox.css?ver=1.0515.3" rel="stylesheet" />
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
                  청구요청 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>
       <input type="hidden" id="dataComCode" value="${dataComCode}" />
       
       <div style="padding: 0 0 10px 14px;" >
		   <button class="btn btn-primary" id="btnReg" >저장</button> 
		   <span style=" display: initial; margin-left: 65px;">
		   <button class="btn btn-primary" id="btnConfN" onclick="clUpProc('/order/clGroupAdd2')">기결취소</button> 
		   <button class="btn btn-primary" id="btnConfY" onclick="whUpProc('/order/clGroupAdd2')">기결</button>
		   </span> 
            <!-- <button class="btn btn-primary  " id="btnClose" >닫기</button> -->
        </div>
        
        <!-- 2023.12.26 yoonsang 대표님요구사항 ui수정 -->
        <div class="page-body" style="padding: 10px 14px 0 0;" >
          <div class="container-xl">
            <div class="row row-cards">
               	<div class="container">
					<div class="item">
						<div class="card">
                			<div class="card-body">
                				<div class="form-group mb-3 row">
                					<input type="hidden" id="oriClGroupId">
                     				<input type="hidden" id="taxBillNo">
                     				<input type="hidden" id="orderGroupId" value="${orderGroupId}" />
				                    <input type="hidden" id="ordArr" value="${ordArr}" /> 
				                    <input type="hidden" id="seqArr" value="${seqArr}" />
				                    <input type="hidden" id="srchEqualItemNo" value="" />
                     				<div class="form-group mb-3 row" >
				                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">주문처</label>
				                      <div class="col">
				                        <input type="text" id="saleCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
				                      </div>
									 </div>
                					<div class="form-group mb-3 row">
			                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">차량정보</label>
			                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차량번호</label>
			                        <input type="text" id="carNo" class="form-control" size=12 maxlength=12 style="display:initial;width:60%; max-width:130px;" placeholder="차량번호"  disabled>
			                        </div>
			                        <div class="form-group mb-3 row">
			                        <label class="col-3 col-form-label "  style="min-width: 118px; width:auto;"></label>
			                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차대번호</label>
			                        <input type="text" id="vinNo" class="form-control" style="display:initial;width:60%; max-width:170px;" placeholder="차대번호" disabled>
			                        </div>
			                        <div class="form-group mb-3 row">
			                        <label class="col-3 col-form-label "  style="min-width: 118px; width:auto;"></label>
			                        <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차종</label>
			                        <input type="text" id="makerName_carType" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="차종" disabled > 
									</div>  
				                     
                				</div>
                			</div>
               			</div>
					</div>
					<div class="item" id="insure1Info" >
						<div class="card">
                			<div class="card-body">
                				<div class="form-group mb-3 row">
                					<div class="form-group mb-3 row">
	                					<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">보험사1 정보</label>
				                      	<div class="col">
				                        <input type="text" id="insure1Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'insure1Name');" >
				                        <input type="text" id="insure1Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" readonly >
				                        <input type="text" id="insure1MgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'insure1MgrPhone','insure1Code',0,'','insure1MgrFax');" >
				                        <input type="text" id="insure1MgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="" >
				                        <input type="text" id="insure1MgrFax" class="form-control" aria-describedby="" placeholder="팩스" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="" >
				                      	</div>
			                      	</div>
			                      	<div class="form-group mb-3 row">
			                      		<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">접수번호/과실율</label>
				                      	<div class="col">
				                        <input type="text" id="insure1AcceptNo" class="form-control" aria-describedby="" placeholder="접수번호" style="display:initial;width:48%; max-width:200px;" >
				                        <input type="text" id="insure1AcciRate" class="form-control" aria-describedby="" placeholder="과실률" style="display:initial;width:48%; max-width:100px;"oninput="calculateRatioDiff1(this.value)"  >
				                      	<!-- <input type="text" id="ins1DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled> -->
				                      	</div>
			                      	</div>
			                      	<div class="form-group mb-3 row">
			                      		<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">할인율</label>
				                        <input type="text" id="ins1DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled>
				                    </div>
				                    <div class="form-group mb-3 row">
				                    	<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">청구액(과실적용)/원청구액</label>
			                      		<input type="text" id="insure1Sum" class="form-control" aria-describedby="" placeholder="청구액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
			                      		<input type="text" id="insure1Sum2" class="form-control" aria-describedby="" placeholder="청구액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
				                    </div>
				                    <div class="form-group mb-3 row">
				                    	<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">입금액</label>
			                      		<input type="text" id="insure1CollAmt" class="form-control" aria-describedby="" placeholder="입금액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
				                    </div>
				                    <div class="form-group mb-3 row">
				                    	<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">입금일자</label>
			                      		<input type="text" id="insure1CollDate" class="form-control" aria-describedby="" placeholder="입금일자" style="display:initial;width:48%; max-width:130px; " disabled>
			                      	</div>
			                      	<div class="form-group mb-3 row">
				                        <input type="hidden" name="ins1DcLC" id="ins1DcLC" >
				                        <input type="hidden" name="ins1DcWS" id="ins1DcWS" >
			                      	</div>
			                      	<div class="form-group mb-3 row">
			                      		<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보험사1 인쇄시메모</label>
			                      		<div class="col">
				                        <input type="text" id="memo" class="form-control" style="width:80%; max-width:550px; text-align:left;" placeholder=""  >
				                      	</div>			                      	
			                      	</div>
			                      	
			                      	
                				</div>
                			</div>
               			</div>
					</div>
					<div class="item" id="insure2Info" >
						<div class="card">
                			<div class="card-body">
                				<div class="form-group mb-3 row">
                					<div class="form-group mb-3 row">
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
			                      		<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">접수번호/과실율</label>
				                      	<div class="col">
				                        <input type="text" id="insure2AcceptNo" class="form-control" aria-describedby="" placeholder="접수번호" style="display:initial;width:48%; max-width:200px;" >
				                        <input type="text" id="insure2AcciRate" class="form-control" aria-describedby="" placeholder="과실률" style="display:initial;width:48%; max-width:100px;" oninput="calculateRatioDiff2(this.value)" > 
				                        <!-- <input type="text" id="ins2DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled>  -->
				                      	</div>
			                      	</div>
			                      	<div class="form-group mb-3 row">
			                      		<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">할인율</label>
				                        <input type="text" id="ins2DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled>
				                    </div>
				                    <div class="form-group mb-3 row">
				                    	<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">청구액(과실적용)/원청구액</label>
			                      		<input type="text" id="insure2Sum" class="form-control" aria-describedby="" placeholder="청구액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
			                      		<input type="text" id="insure2Sum2" class="form-control" aria-describedby="" placeholder="청구액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
				                    </div>
				                    <div class="form-group mb-3 row">
				                    	<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">입금액</label>
			                      		<input type="text" id="insure2CollAmt" class="form-control" aria-describedby="" placeholder="입금액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
				                    </div>
				                    <div class="form-group mb-3 row">
				                    	<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">입금일자</label>
			                      		<input type="text" id="insure2CollDate" class="form-control" aria-describedby="" placeholder="입금일자" style="display:initial;width:48%; max-width:130px; " disabled>
			                      	</div>
			                      	<div class="form-group mb-3 row">
				                        <input type="hidden" name="ins2DcLC" id="ins2DcLC" >
				                        <input type="hidden" name="ins2DcWS" id="ins2DcWS" >
				                    </div>
			                      	<div class="form-group mb-3 row">
			                      		<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보험사2 인쇄시메모</label>
			                      		<div class="col">
				                        <input type="text" id="pMemo2" class="form-control" style="width:80%; max-width:550px; text-align:left;" placeholder=""  >
				                      	</div>			                      	
			                      	</div>
                				</div>
                			</div>
               			</div>
					</div>
					<div class="item">
						<div class="card">
                			<div class="card-body">
                				<div class="form-group mb-3 row">
                				<div class="form-group mb-3 row">
                					<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구요청그룹 번호</label>
                       				<input type="text" id="clGroupId" value="${clGroupId}" class="form-control" aria-describedby="" style="display:initial;width:30%; max-width:300px;" disabled>
                          		</div>
                          	<div class="form-group mb-3 row">
                      			<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구요청 번호</label>
                        		<input type="text" id="clReqNo" value="${clReqNo}" class="form-control" aria-describedby="" style="display:initial;width:30%; max-width:300px;" disabled>
                      		</div>
                      		<div class="form-group mb-3 row">
	                         <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
	                         <input type="text" id="orderGroupId" value="${orderGroupId}" class="form-control" aria-describedby=""style="display:initial;width:30%; max-width:300px;" disabled>
	                         <input type="text" id="clReqNoNew" value="${clReqNoNew}" class="form-control" aria-describedby=""style="display:initial;width:30%; max-width:300px;" disabled placeHolder="신규요청번호">
                     		</div>   
                   			<div class="form-group mb-3 row">
                      			<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">청구구분</label>
	                         		<div class="col">
		                              	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
		                                <input class="form-check-input" type="radio" name="clType"  value="일반" disabled>
		                                <span class="form-check-label">일반</span>
		                              	</label>
		                              	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
		                                <input class="form-check-input" type="radio" name="clType" value="보험"  disabled >
		                                <span class="form-check-label">보험</span>
	                              	</label>
	                              	</div>
                            </div>
                            <div class="form-group mb-3 row">
                      			<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">청구요청구분</label>
	                         		<div class="col">
		                              	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
		                                <input class="form-check-input" type="radio" name="clReqType"  value="즉시청구" >
		                                <span class="form-check-label">즉시청구</span>
		                              	</label>
		                              	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
		                                <input class="form-check-input" type="radio" name="clReqType" value="청구대기"  >
		                                <span class="form-check-label">청구대기</span>
	                              	</label>
	                              	</div>
                            </div>
                          
                            <div class="form-group mb-3 row">
                            	<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">증빙유형</label>  
		                      	<select id="expType" type="text" name="expType" value="증빙유형"  style="max-width:110px;">
		                      		<option></option>
		                      		<option>현금영수증</option>
		                      		<option>세금계산서</option>
		                      		<option>카드</option>
		                      		<option>지에스에이</option>
		                      		<option>청구변경-sd</option>
									<option>청구변경-임</option>
									<option>청구변경-ks</option>		
		                      	</select>                            
                            </div>
                        	</div>
                    	</div>   
                	</div> 
					</div>
					<div class="item">
						<div class="card">
                			<div class="card-body">
                				<div class="form-group mb-3 row">
                					<div class="form-group mb-3 row">
                						<label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">공급가액</label>
					                    <div class="col">
					                    <input type="text" id="salePrice" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
					                    </div>                     
					                    <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;" >세액</label>
					                    <div class="col">
					                    <input type="text" id="taxPrice" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder="" disabled>
					                    </div>
					                    <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;">합계금액</label>
					                    <div class="col">
					                    <input type="text" id="sumPrice" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
					                    </div>
					                    <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;">청구액</label>
					                    <div class="col">
					                    <input type="text" id="clAmt" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
					                    </div>
                					</div>
                					<div class="form-group mb-3 row">
				                      	<label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">기타금액</label>
				                      	<div class="col">
				                        <input type="text" id="capitalAmt" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
				                      	</div>
                						<label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">입금일자</label>
				                      	<div class="col">
				                        <input type="text" id="depositDate" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
				                      	</div>
				                      	<label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">총 입금액</label>
				                      	<div class="col">
				                        <input type="text" id="collectAmt" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
				                      	</div>
			                     		<label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">수금률</label>
				                      	<div class="col" style="max-width:100px;">
				                        <input type="text" id="depositRate" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
				                      	</div>
                					</div>
                				</div>
                			</div>
               			</div>
					</div>
					<div class="item">
						<div class="card">
                			<div class="card-body">
                				<div class="form-group mb-3 row">
                					<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
			                      	<div class="col">
			                        <input type="text" id="regUserName" class="form-control" aria-describedby="" style="display:initial;width:30%; max-width:300px;" disabled>
			                        </div>
			                        <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">기결여부</label>
			                       	<div class="col">
			                        <input type="text" id=confYN class="form-control" aria-describedby=""style="display:initial;width:30%; max-width:300px;" disabled>
			                      	</div>
			                      	<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구요청일</label>
			                        <div class="col">
			                        <input type="text" id="regYmd" class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:300px;" disabled>
			                      	</div>  
			                     	<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">최종청구일</label>
			                        <div class="col">
			                        <input type="text" id="chkDate" class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:300px;" disabled>
			                      	</div>
                				</div>
                			</div>
               			</div>
					</div>
				</div>
             <div class="card">
                <div class="card-body">
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" id="btnReqChk" class="btn btn-secondary"	onclick="reqChk('/order/clReqItemAdd')"	value="요청취소" disabled>
	                      	<input type="button" id="btnChk" class="btn btn-secondary"	onclick="reqChk_CHK('/order/clReqAdd','CHK')"	value="청구진행" >
	                      	<input type="button" id="btnChkCancel" class="btn btn-secondary"	onclick="reqChk_CHK('/order/clReqAdd','CHK_CANCEL')"	value="진행취소" >
                      	</span>
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary"	onclick="reqChk('/order/clReqItemAdd','CHK')"	value="청구"> -->
                      	</span>
                      	
                      	<span style=" display: initial; float: right; margin-right: 50px;">
	          				<!-- <input type="button" class="btn btn-secondary" id="btnPrint" onclick="print()"value="인쇄"> -->
	          				 <!-- <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="rdoInsure"  value="insure1" checked >
                                <span class="form-check-label">보험사1</span>
                              </label>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="rdoInsure" value="insure2"   >
                                <span class="form-check-label">보험사2</span>
                              </label> -->
                              
	          			<!-- 	<input type="button" class="btn btn-secondary" id="btnAosXls" onclick="aosXls()" value="AOS용 엑셀"> -->
	          				<input type="button" class="btn btn-secondary " id="btnRlList" onclick="openRlListDialog()"value="출고번호 확인">
							<input type="button" class="btn btn-secondary " id="btnPrint" onclick="print()"value="청구서 다운">
	          				<!-- javascript:location.href='/order/aosXls?aosType=std'"value="AOS"                	
	          				<input type="button" class="btn btn-secondary" id="btnPrint" onclick="javascript:location.href='/order/aosXls?aosType=ssf'"value="삼성">-->
             			</span>
             			
                      </div>
                      	<div id="grid_wrap" style="width:70.1%;height:50vh;"></div>
                         <div id="grid_wrap1" style="width:28.1%;margin: 0px 10px;height:50vh;"></div>
										<div id="textAreaWrap">
											<textarea id="myTextArea"class="aui-grid-custom-renderer-ext" style="width: 100%; height: 50px;"></textarea>
											 <div class="button-wrap">
												<button class="editor_btn" id="confirmBtn">확인</button>
												<button class="editor_btn" id="cancelBtn">취소</button>
											</div>
										</div>
					<div style=" display: flex  ">
		              <div style="width:72.1%; text-align: left; margin-left: 11px;">
		               <input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
		               	<!-- <input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제"> --> 
		             </div> 
		               <div  style="width:24.1%; text-align: left; margin-left: -11px;">
		                <input type="button" class="btn btn-outline-info" onclick="addRow1(myGridID1,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow1()" value="행삭제">
		               	<input type="button" class="btn btn-outline-info" id="btnRegMemo" value="확인">
		              </div> 
    
                    </div>  
                    
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>
                
         <%-- <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
            <div class="*col-md-6">        
             <div class="card">
                <div class="card-body">
                      <div class="form-group mb-3 row">
                      <input type="hidden" id="oriClGroupId">
                      <input type="hidden" id="taxBillNo">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구요청그룹 번호</label>
                      <div class="col">
                        <input type="text" id="clGroupId" value="${clGroupId}" class="form-control" aria-describedby="" style="display:initial;width:30%; max-width:300px;" disabled>
                          </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구요청 번호</label>
                      <div class="col">
                        <input type="text" id="clReqNo" value="${clReqNo}" class="form-control" aria-describedby="" style="display:initial;width:30%; max-width:300px;" disabled>
                          </div>
                         <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                         <div class="col">
                         <input type="text" id="orderGroupId" value="${orderGroupId}" class="form-control" aria-describedby=""style="display:initial;width:30%; max-width:300px;" disabled>
                         
                         <input type="text" id="clReqNoNew" value="${clReqNoNew}" class="form-control" aria-describedby=""style="display:initial;width:30%; max-width:300px;" disabled placeHolder="신규요청번호">
                      </div>      
                     </div>   
                   <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">청구구분</label>
                      <div class="col" >
                         <div >
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="clType"  value="일반" disabled>
                                <span class="form-check-label">일반</span>
                              </label>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="clType" value="보험"  disabled >
                                <span class="form-check-label">보험</span>
                              </label>
                            </div>
                      </div>   
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">청구요청구분</label>
                      <div class="col">
                         <div>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="clReqType"  value="즉시청구" >
                                <span class="form-check-label">즉시청구</span>
                              </label>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="clReqType" value="청구대기"   >
                                <span class="form-check-label">청구대기</span>
                              </label>
                                <!--  <label class="form-check form-check-inline" style="min-width: 118px; width:auto;margin-left:40px;font-weight:bold;">증빙유형</label>
                                <input  id="expType"type="text" name="expType" value="증빙유형"  style="max-width:100px;"disabled  > -->
                                
                                <label class="form-check form-check-inline" style="min-width: 118px; width:auto;margin-left:40px;font-weight:bold;">증빙유형</label>   
		                      	<select id="expType" type="text" name="expType" value="증빙유형"  style="max-width:100px;">
		                      		<option></option>
		                      		<option>현금영수증</option>
		                      		<option>세금계산서</option>
		                      		<option>카드</option>
		                      	</select>
                                
                              </label>
                            </div>
                      </div>   
                </div>     
          
          
                
                <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      <div class="col">
                        <input type="text" id="regUserName" class="form-control" aria-describedby="" style="display:initial;width:30%; max-width:300px;" disabled>
                          </div>
                         <!-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문일</label>
                         <div class="col">
                         <input type="text" id="orderYmd"  class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:300px;" disabled>
                      </div>   -->
                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">기결여부</label>
                         <div class="col">
                         <input type="text" id=confYN class="form-control" aria-describedby=""style="display:initial;width:30%; max-width:300px;" disabled>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구요청일</label>
                         <div class="col">
                         <input type="text" id="regYmd" class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:300px;" disabled>
                      </div>  
                       <!-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구상태</label>
                         <div class="col">
                         <input type="text" id="procStep" class="form-control" aria-describedby=""style="display:initial;width:30%; max-width:300px;" disabled>
                      </div> -->
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">최종청구일</label>
                         <div class="col">
                         <input type="text" id="chkDate" class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:300px;" disabled>
                      </div>      
                     </div>                
                </div>
                </div>
                
              <div class="card">

                <div class="card-body">

                    <input type="hidden" id="orderGroupId" value="${orderGroupId}" />
                    <input type="hidden" id="ordArr" value="${ordArr}" /> 
                    <input type="hidden" id="seqArr" value="${seqArr}" />
                    <input type="hidden" id="srchEqualItemNo" value="" />   
                         
                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">주문처</label>
                      <div class="col">
                        <input type="text" id="saleCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                      </div>
					 </div>  		
 				<div id="insureInfo" >
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">차량정보</label>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차량번호</label>
                        <input type="text" id="carNo" class="form-control" size=12 maxlength=12 style="display:initial;width:60%; max-width:130px;" placeholder="차량번호"  disabled>
                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차대번호</label>
                        <input type="text" id="vinNo" class="form-control" style="display:initial;width:60%; max-width:170px;" placeholder="차대번호" disabled>
                        <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차종</label>
                        <input type="text" id="makerName_carType" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="차종" disabled >    
                      </div>
                      
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
                        <input type="text" id="insure1AcciRate" class="form-control" aria-describedby="" placeholder="과실률" style="display:initial;width:48%; max-width:100px;"oninput="calculateRatioDiff1(this.value)"  >
                      <input type="text" id="ins1DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled>
                      </div>					  		
                      <label class="col-3 col-form-label "  style="min-width: 118px; width:auto;"></label>
                      <div class="col">
                        <input type="text" id="insure2AcceptNo" class="form-control" aria-describedby="" placeholder="접수번호" style="display:initial;width:48%; max-width:200px;" >
                        <input type="text" id="insure2AcciRate" class="form-control" aria-describedby="" placeholder="과실률" style="display:initial;width:48%; max-width:100px;" oninput="calculateRatioDiff2(this.value)" > 
                         <input type="text" id="ins2DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled> 
                      </div>
                     </div>    
                       
                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label "  style="min-width: 118px; width:auto;"></label>
                      <div class="col">
                        <input type="text" id="ins1DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled>
                        <input type="text" id="insure1Sum" class="form-control" aria-describedby="" placeholder="청구액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
                        <input type="text" id="insure1CollAmt" class="form-control" aria-describedby="" placeholder="입금액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
                        <input type="text" id="insure1CollDate" class="form-control" aria-describedby="" placeholder="입금일자" style="display:initial;width:48%; max-width:130px; " disabled>
                        <input type="hidden" name="ins1DcLC" id="ins1DcLC" >
                        <input type="hidden" name="ins1DcWS" id="ins1DcWS" >
                      </div>					  		
                      <label class="col-3 col-form-label "  style="min-width: 118px; width:auto;"></label>
                      <div class="col">
                        <input type="text" id="ins2DcDsp" class="form-control" aria-describedby="" placeholder="부품 할인율" style="display:initial;width:48%; max-width:230px;" disabled> 
                        <input type="text" id="insure2Sum" class="form-control" aria-describedby="" placeholder="청구액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
                        <input type="text" id="insure2CollAmt" class="form-control" aria-describedby="" placeholder="입금액" style="display:initial;width:48%; max-width:200px; text-align:right;" disabled>
                        <input type="text" id="insure2CollDate" class="form-control" aria-describedby="" placeholder="입금일자" style="display:initial;width:48%; max-width:130px;" disabled>
                        <input type="hidden" name="ins2DcLC" id="ins2DcLC" >
                        <input type="hidden" name="ins2DcWS" id="ins2DcWS" >
                      </div>
                     </div> 
                   </div>    
     				<div class="form-group mb-3 row">
     				<label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">인쇄 시 메모</label>
     				 <div class="col">
                        <input type="text" id="memo" class="form-control" style="width:80%; max-width:550px; text-align:left;" placeholder=""  >
                      </div>   
     				 </div>   
                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">공급가액</label>
                      <div class="col">
                        <input type="text" id="salePrice" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;" >세액</label>
                      <div class="col">
                        <input type="text" id="taxPrice" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder="" disabled>
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;">합계금액</label>
                      <div class="col">
                        <input type="text" id="sumPrice" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;">청구액</label>
                      <div class="col">
                        <input type="text" id="clAmt" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
                      </div>
                     <label class="col-3 col-form-label" style="min-width: 80px; width:auto;  text-align:right;"></label>
                      <div class="col" style="max-width:100px;">
                        <input type="hidden" id="" class="form-control" style="*width:30%; max-width:100px; text-align:right;" placeholder=""  disabled>
                      </div>
                    </div>   
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; "></label>
                      <div class="col">
                        <input type="text" id="salePrice" class="form-control" style="*width:60%; max-width:200px; text-align:right; display: none;" placeholder=""  disabled>
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;" > 입금일자</label>
                      <div class="col">
                        <input type="text" id="depositDate" class="form-control" style="*width:60%; max-width:200px;  " placeholder="" disabled>
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;">기타금액</label>
                      <div class="col">
                        <input type="text" id="capitalAmt" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 200px; text-align:right;">총 입금액</label>
                      <div class="col">
                        <input type="text" id="collectAmt" class="form-control" style="*width:60%; max-width:200px; text-align:right;" placeholder=""  disabled>
                      </div>
                     <label class="col-3 col-form-label" style="min-width: 80px; width:auto;  text-align:right;">수금률</label>
                      <div class="col" style="max-width:100px;">
                        <input type="text" id="depositRate" class="form-control" style="*width:30%; max-width:100px; text-align:right;" placeholder=""  disabled>
                      </div> 
                    </div>  
                              
                              
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" id="btnReqChk" class="btn btn-secondary"	onclick="reqChk('/order/clReqItemAdd')"	value="요청취소" disabled>
	                      	<input type="button" id="btnChk" class="btn btn-secondary"	onclick="reqChk_CHK('/order/clReqAdd','CHK')"	value="청구진행" >
	                      	<input type="button" id="btnChkCancel" class="btn btn-secondary"	onclick="reqChk_CHK('/order/clReqAdd','CHK_CANCEL')"	value="진행취소" >
                      	</span>
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary"	onclick="reqChk('/order/clReqItemAdd','CHK')"	value="청구"> -->
                      	</span>
                      	
                      	<span style=" display: initial; float: right; margin-right: 50px;">
	          				<!-- <input type="button" class="btn btn-secondary" id="btnPrint" onclick="print()"value="인쇄"> -->
	          				 <!-- <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="rdoInsure"  value="insure1" checked >
                                <span class="form-check-label">보험사1</span>
                              </label>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="rdoInsure" value="insure2"   >
                                <span class="form-check-label">보험사2</span>
                              </label> -->
                              
	          			<!-- 	<input type="button" class="btn btn-secondary" id="btnAosXls" onclick="aosXls()" value="AOS용 엑셀"> -->
	          				<input type="button" class="btn btn-secondary " id="btnRlList" onclick="openRlListDialog()"value="출고번호 확인">
							<input type="button" class="btn btn-secondary " id="btnPrint" onclick="print()"value="청구서 다운">
	          				<!-- javascript:location.href='/order/aosXls?aosType=std'"value="AOS"                	
	          				<input type="button" class="btn btn-secondary" id="btnPrint" onclick="javascript:location.href='/order/aosXls?aosType=ssf'"value="삼성">-->
             			</span>
             			
                      </div>
                      	<div id="grid_wrap" style="width:70.1%;height:50vh;"></div>
                         <div id="grid_wrap1" style="width:28.1%;margin: 0px 10px;height:50vh;"></div>
										<div id="textAreaWrap">
											<textarea id="myTextArea"class="aui-grid-custom-renderer-ext" style="width: 100%; height: 50px;"></textarea>
											 <div class="button-wrap">
												<button class="editor_btn" id="confirmBtn">확인</button>
												<button class="editor_btn" id="cancelBtn">취소</button>
											</div>
										</div>
					<div style=" display: flex  ">
		              <div style="width:72.1%; text-align: left; margin-left: 11px;">
		               <input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
		               	<!-- <input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제"> --> 
		             </div> 
		               <div  style="width:24.1%; text-align: left; margin-left: -11px;">
		                <input type="button" class="btn btn-outline-info" onclick="addRow1(myGridID1,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow1()" value="행삭제">
		               	<input type="button" class="btn btn-outline-info" id="btnRegMemo" value="확인">
		              </div> 
    
                    </div>  
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div> --%>
     
    </div>
    
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
           <!-- <div class="form-group mb-3 row">
          <label class="col-3 col-form-label">인쇄 시 할인율 포함</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printDcYN" name="printDcYN">
          </div>
        </div> -->
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
      </div>
      </div>
      <div class="Opt">
      <label class="form-check form-check-inline" style="margin-bottom: 0px;">
           <input class="form-check-input" type="radio" name="rdoInsure"  value="insure1" checked >
           <span class="form-check-label">보험사1</span>
         </label>
        <label class="form-check form-check-inline" style="margin-bottom: 0px;">
             <input class="form-check-input" type="radio" name="rdoInsure" value="insure2"   >
              <span class="form-check-label">보험사2</span>
          </label>
      </div>
      <div class="Opt">
      <label class="col-3 col-form-label" style="margin-left: 10px;">외부/센터 표기</label>
      <div class="col">
       	<input class="form-check-input" type="checkbox" id="printCenterYN" name="printCenterYN" >
        </div>
          <!-- </label> -->

      <label class="col-3 col-form-label" style="margin-left: 10px;">청구업체변경</label>
      <div class="col">
       	<select id="chnLogCust">
       		<option value=""></option> 
	       	<option value="ㄱ000">P</option> 
	       	<option value="ㅇ413">임파츠</option>
	       	<option value="ㅇ434">에스제이</option>
	       	<option value="ㅇ436">에스디</option>
	       	<option value="ㅋ127">케이에스파츠</option>
       	</select>
        </div>
      </div>
            
      <div class="bottom" id="button-container">
        <div class="box1">
          <button type="button" id="print" class="w-btn w-btn-gray" ><i class="fas fa-file-upload"></i><span>인쇄</span></button><br>
         <!-- <button type="button" id="exportXls" class="w-btn w-btn-gray w-btn-outline" onclick="exportTo('xlsx')"value="엑셀다운"><i class="fas fa-file-upload"></i><span>엑셀 다운로드</span></button> -->
		<input type="button" id="btnAosXls"  class="w-btn w-btn-gray"onclick="aosXls()" value="AOS엑셀(센터가)"><i class="fas fa-file-upload"></i>
        </div>
        <div class="box2">
          
          <button type="button" id="btnDownload" class="w-btn w-btn-gray"><i class="fas fa-file-upload"></i><span>이미지 다운로드</span></button><br>
         <!--  <button type="button" id="exportPdf" class="w-btn w-btn-gray w-btn-outline"onclick="exportTo('pdf')" value="PDF다운"><i class="fas fa-file-upload"></i><span>PDF다운로드</span></button> -->
         <input type="button" id="btnAosXls"  class="w-btn w-btn-gray"onclick="aosDcXls()" value="AOS엑셀 (할인포함)"><i class="fas fa-file-upload"></i>
        </div>
      </div>
    </div>
  </div>
</div>

	<!-- 출고번호 확인 팝업 -->
	<div id="dialogRlList-form" title="출고번호 확인" style="display:none;">
		<div id="grid_wrap_clRl" style=" height:100%;"></div>
	</div>
	
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


    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
   <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> 
    
       <script type="text/javascript" src="/resources/pan/js/cl-req-item-list.js?ver=1.1022.4"></script>
 <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.1011.3"></script> 

 	
  </body>
</html>