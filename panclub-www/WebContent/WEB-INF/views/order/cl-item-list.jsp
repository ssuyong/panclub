<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>


	
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
                  청구 상세내역 
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
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구번호</label>
                      <div class="col">
                      	<span id="clNo">${clNo}</span>
                      </div>
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
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">청구구분</label>
                      <div class="col">	<input type="text" id="clType" class="form-control" style="display:initial;width:60%; max-width:150px;" >     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">처리단계</label>
                      <div class="col">             	 <input type="text" id="procStep" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                    </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>      
                    </div>

                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">요청일</label>
                      <div class="col">   	<span id="regYmd">&nbsp;</span> </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보험사1</label>
                      <div class="col">     <span id="insure1Name">&nbsp;</span>                  </div> 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보험사2</label>
                      <div class="col">   	<span id="insure2Name">&nbsp;</span> </div>
                    </div> 
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" id="btnApply" onclick="clProc('/order/clAdd')" value="청구 처리">   -->
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
    
    <script type="text/javascript" src="/resources/pan/js/cl-item-list.js?ver=1.0105.3"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.1116.2"></script> 

 	
  </body>
</html>