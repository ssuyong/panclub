<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>코드</title>
     <script type="text/javascript" src="/resources/pan/js/qrcode.js?ver=1.0821.3"></script> 
     <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js"></script>
  <!--    <style>
     		.qrcode-container{
     			margin-bottom: 30px;
     		}
     		.rackname-container{
     			font-size: 16px;
     			font-weight: bold;
     			margin-top: 5px
     		}
     		
     
     </style> -->
     <link href="/resources/pan/css/barcode.css?ver=1.0821.3" rel="stylesheet" />
  </head>
  <body  class=" layout-fluid">
    <div class="page">
      <div class="page-wrapper">
        <div class="container-xl">
          
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                
                <div class="page-pretitle" style="display:none;">
                  요약
                </div>
                <h2 class="page-title">
                  QR인쇄 
                </h2>
              </div>
                <div style="padding: 0 0 10px 14px;" >
							<button class="btn btn-primary" id="print" onclick="printQR()   ">프린트</button>
							<button class="btn btn-primary" id="download" onclick="downloadQR()">다운로드</button>
							 <input type="text" id="custName" style="  display: none;"> 
				</div>
        
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">
                <div class="card-header" style="display:none;">
                  <h3 class="card-title">Horizontal form</h3>
                </div>
                <div class="card-body">   
               <!--이거  -->              
            <div id="qr-container" class="qrContainer"></div> 
                    </div>
                </div>
                
              </div>
            </div>

            <div class="form-group mb-3 row">
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
     <script type="text/javascript" src="/resources/pan/js/rack-list-print.js?ver=3.0522.3"></script> 
        <%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%> 

  </body>
</html>