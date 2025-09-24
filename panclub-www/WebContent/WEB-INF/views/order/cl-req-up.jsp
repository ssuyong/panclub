<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>

    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
    <script type="text/javascript" src="/resources/js/jquery.form.js"></script>  <!-- file ajax upload -->
    <link href="/resources/pan/css/printbox.css?ver=3.0313.3" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
	
  </head>
  <body  class=" layout-fluid">
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
                <h2 class="page-title">
                  청구 요청
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
<!--             <button class="btn btn-primary" id="btnReg">저장</button> -->
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
        </div> 
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">

                    <input type="hidden" id="orderGroupId" value="${orderGroupId}" />
                    <input type="hidden" id="ordArr" value="${ordArr}" /> 
                    <input type="hidden" id="seqArr" value="${seqArr}" />
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp">${orderGroupId}</span>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col"><span id="orderTypeName"></span> </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      <div class="col">                      	<span id="regUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
                      <div class="col">                      	<span id="orderYmd"></span>                      </div>      
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차번</label>
                      <div class="col">                      	<span id="carNo"></span>                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차대</label>
                      <div class="col">
                      	<span id="vinNo"></span>
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">제조사/차종</label>
                      <div class="col">
                      	<span id="makerName_carType"></span>
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">
                      	<span id="">&nbsp;</span>
                      </div>      
                    </div>                      

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">유형</label>
                      <div class="col">                      	<span id="clTypeInfo"></span>                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보험사1</label>
                      <div class="col">                      	<span id="insure1Info"></span>                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보험사2</label>
                      <div class="col">                      	<span id="insure2Info"></span>                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">
                      	<span id="">&nbsp;</span>
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
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="reqSend('/order/clReqAdd')" value="요청 전송"> 
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
                      <div style="margin : 2px 0px 0;">
                      	<input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
                      <!-- 	<input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제"> -->
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

    <!-- 상품선택 팝업 -->
	<div id="dialog-form-item" title="상품 선택" style="display:none;">
		<input type="text" id="pop_itemNo" placeholder="품번">
		<input type="text" id="pop_itemName"  placeholder="품명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
		<button class="btn btn-blue" id="btnItemAdd" onClick='openRegItemDialog()'>부품등록</button>
	  	<div id="grid_wrap_item" style=" height:90%;"></div>
	</div>
    
    
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <script type="text/javascript" src="/resources/pan/js/cl-req-up.js?ver=3.1219.3"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0411.3"></script> 

 	
  </body>
</html>