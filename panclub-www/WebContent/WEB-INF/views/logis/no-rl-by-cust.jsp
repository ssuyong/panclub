<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>주문처별미출고</title>
    <style type="text/css">
	/* 특정 칼럼(데모의 price)의 체크박스 크기 설정 */
	/* 확인할려면 칼럼레이아웃에 정의된 my-check-column 의 주석 제거 */
	.my-check-column .aui-checkbox {
		width: 20px !important;
		height: 20px !important;
	}
</style>
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
                <h2 class="page-title" style="display:inline;">
                  주문처별 미출고 품목
                </h2>
                <span style="color:#958a8a;">- 출고요청건 중 출고 안된 부품</span>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>

       <!--  <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">저장</button>
        </div> -->
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">
                <div class="card-header" style="display:none;">
                  <h3 class="card-title">Horizontal form</h3>
                </div>
                <div class="card-body">
                 	<div style="width:100%;margin:0 auto;">
						<div id=grid_wrap style="width:23%; height:70vh; float:left;margin-right:2%;"></div>
                      
                      	<div style="width:100%;margin:0 auto;">
							<span style="font-size:0.9em; color:#aaa;"> 주문처코드:</span> <span id="dInfo_custCode" style="margin-top:20px;"></span>
							<span style="font-size:0.9em; color:#aaa; padding-left:1%;"> 주문처명:</span> <span id="dInfo_custName" style="margin-top:20px;"></span>							
						</div>
						<div id="grid_wrap_detail" style="width:75%; height:70vh; float:right;"></div>
						<div style="clear:both;"></div>
					</div>
                </div>
                
              </div>

            </div>
          </div>
        </div>
        
      </div>
        
      </div>
    </div>
	
	 <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String noRlByCust = application.getRealPath("/resources/pan/js/no-rl-by-cust.js");	
			File noRlByCustFile = new File(noRlByCust);	
			Date lastModified_noRlByCustFile = new Date(noRlByCustFile.lastModified());  	
			 
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript" src="/resources/pan/js/no-rl-by-cust.js?ver=<%=fmt.format(lastModified_noRlByCustFile)%>"></script> 

  </body>
</html>