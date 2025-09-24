<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
	<title>출금요청 상세내역 </title>

	
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
                  출금요청 상세내역 
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
                     <input type="hidden" id="attaFile" name ="attaFile" value="${attaFile}" />
                    <%-- <input type="text" id="attaFileOri" name ="attaFileOri" value="${attaFileOri}" /> --%>
                  
					<%-- <a href="http://www.panauto.co.kr/temp_panclub/67412769-1dd8-4a9c-a8da-7272b2e28bbb.xlsx"  onClick="window.open(this.href, '', 'width=400, height=430'); return false;">${attaFile}</a> --%>
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
                      <div class="col"><span id="wdReqNo">${wdReqNo}</span>                     </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청구분</label>
                      <div class="col"><span id="wdReqType"></span> </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">출금처</label>
                      <div class="col"><span id="custName"></span>                    </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청금액</label>
                      <div class="col"><span id="wdReqAmt"></span>                      </div>      
                      ><span id="wdReqAmt2"></span>
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      <div class="col"><span id="regUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
                      <div class="col"><span id="regYmd"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">수정자</label>
                      <div class="col"><span id="uptUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">수정일</label>
                      <div class="col"><span id="uptYmd"></span>                      </div>      
                    </div>   
                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"> 거래명세서</label>
                      <div class="col">
                     <%-- <a href="https://img.4car.co.kr/${comCode}/wd/${attaFile}"  onClick="window.open(this.href, '', 'width=400, height=430'); return false;">${attaFileOri}</a>--%>
                     	<span id="attaFileOri"></span>
                     </div>
                    </div>                    

                    <div class="form-group mb-3 row">
                      
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
    
    <script type="text/javascript" src="/resources/pan/js/wd-req-dtl-list.js?ver=1.0805.4"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.1116.2"></script> 

 	
  </body>
</html>