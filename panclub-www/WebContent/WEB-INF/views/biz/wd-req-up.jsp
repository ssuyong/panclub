<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>


<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>출금 요청</title>

	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	
  </head>
  <body  class=" layout-fluid">
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
                <h2 class="page-title">
                  출금 요청
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
                
					<form name ="frmWdReq" id="frmWdReq" method="post">				
						
                    <input type="hidden" id="jobArr" name="jobArr" value="${jobArr}" /> 
                    <input type="hidden" id="custCode" name="custCode" value="${custCode}" />
                    <input type="hidden" id="wdReqType" name="wdReqType" value="${wdReqType}" />                   
                    <input type="hidden" id="custName"   name="custName" value="${custName}" />
                     <input type="hidden" id="ledgArr"   name="ledgArr" value="${ledgArr}" />
                     <input type="hidden" id="seqArr"   name="seqArr" value="${seqArr}" />
 
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">출금선택내역</label>
                      <div class="col">
                      
                      	<span id="jobArr2">${jobArr}</span>
                      </div>      
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">거래처</label>
                      <div class="col">                      	<span id="custName2">${custName}</span>                      </div>    
                    </div>                      

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">출금요청금액</label>
                      <div class="col">                      
                      <input id="wdReqAmt" value= "${sumPrice}" name="wdReqAmt"  type ="hidden"></input>
                      	<span id="wdReqAmtSpan">
                      	 			<fmt:formatNumber type="number" value="${sumPrice}" pattern="#,###"/> 원
                      	              </span>                
                            </div>    
                    </div>                      

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출금요청일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="wdReqYmd"  name="wdReqYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper" style="margin-top: -1px;"></div>				        
        			  </div>            			  
                   	</div> 
                   	    
                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">파일첨부 </label>
                      <div class="col">             	
                      	<div>   <input type="file" name="attaFile" id ="attaFile" class="form-control"  multiple/>           </div>                   
                      </div>      
                            
                    </div>

                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="reqSend('/biz/wdReqAdd')" value="요청 전송"> 
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      </div>

                    </div>  
                </form>    
                
                
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
    
    <script type="text/javascript" src="/resources/pan/js/wd-req-up.js?ver=1.0702.4"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0406.3"></script> 

 	
  </body>
</html>