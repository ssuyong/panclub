<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
     
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">
 
 	<!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox --> 	
 	       
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
                  재고 실사 
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">품번</label>
                      <div class="col">
                        <input type="text" id="itemNo" class="form-control" aria-describedby="" placeholder="" style="width:60%; max-width:300px;">
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품명</label>
                      <div class="col">
                        <input type="text" id="itemName" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">창고코드</label>
                      <div class="col">
                        <input type="text" id="storCode" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">재고위치</label>
                      <div class="col">
                        <input type="text" id="rackCode" class="form-control" aria-describedby="" placeholder="" style="width:60%; max-width:300px;">                        
                      </div>                   
                      
                </div>
                
              </div>
            </div>

            <div class="form-group mb-3 row">
             	<div style="margin : 2px 0px 0;">
                 	<span>
	                   	<input type="button" class="btn btn-secondary" id="btnApply" onclick="chkProc('ADD','/logis/stockChkAdd')" value="실사입력"> 
	                   	<input type="button" class="btn btn-secondary" id="btnApply" onclick="chkProc('CHK','/logis/stockChkAdd')" value="재고변경">
                   	</span>
                </div>                      
              	<div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>  

            <div class="form-footer1">
            </div>
          </div>
        </div>
        
      </div>
        
        <%-- <%@ include file="../icld/footer.jsp" %> --%>
        
      </div>
    </div>

    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
   	<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
    <script type="text/javascript" src="/resources/pan/js/stock-chk-list.js?ver=2.0110.3"></script> 
    <%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%> 
    
  </body>
</html>
