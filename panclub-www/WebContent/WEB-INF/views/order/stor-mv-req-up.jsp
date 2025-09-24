<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>

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
                  이동 요청
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
                      <%-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
                      <div class="col">
                      	<span id="storageUseReqNo">${storageUseReqNo}</span>
                      </div> --%>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp"></span>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col"><span id="orderTypeName"></span> </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      <div class="col">                      	<span id="regUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
                      <div class="col">                      	<span id="estiYmd"></span>                      </div>      
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

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출발지점</label>
                      <div class="col">	<input type="text" id="sBranchCode" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="지점" >     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">도착지점</label>
                      <div class="col">	<input type="text" id="eBranchCode" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="지점" >     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo2" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                    </div>

                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출발요청일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="dmdYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper" style="margin-top: -1px;"></div>
				        
        			  </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">도착예정일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="schYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper2" style="margin-top: -1px;"></div>				        
                      </div> 
                    </div>   
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">이동방법</label>
                      <div class="col">
                      	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
                            <input class="form-check-input" type="radio" name="mvWay"  value="정기이송" checked>
                            <span class="form-check-label">정기이송</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="mvWay"  value="택배" >
                            <span class="form-check-label">택배</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="mvWay"  value="퀵/용차" >
                            <span class="form-check-label">퀵/용차</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="mvWay"  value="기타" >
                            <span class="form-check-label">기타</span>
                        </label>
                        <input type="text" id="mvWayEtc" class="form-control" style="display: initial; max-width:200px;" placeholder="" > 
                      </div>
                          
                    </div> 
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="reqSend('/order/storMvReqAdd')" value="요청 전송"> 
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:75vh;"></div>
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
    
    <script type="text/javascript" src="/resources/pan/js/stor-mv-req-up.js?ver=2.1219.2"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.1116.2"></script> 

 	
  </body>
</html>