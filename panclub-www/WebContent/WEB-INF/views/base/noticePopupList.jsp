<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>팝업등록 내역조회</title>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
	
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	<!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox --> 	
	<link
	href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
	rel="stylesheet" />
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
  </head>
  <body  class=" layout-fluid">
	<%@ page import="java.util.*"%>
	<%@ page import="java.text.*"%>
	 
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
                  팝업등록 내역조회
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button> 
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
                  <!-- <form> -->
                    <div style="display: flex;">
	                     <label style="min-width: 118px; width:auto;">노출여부</label>
			             <select class="form-select" id="iSelect_validYN"  style="width:60%; max-width:40px;">
			                <option></option>
			                <option>Y</option>
			                <option>N</option>
			               </select>
			              <label class="col-3 col-form-label " style="min-width: 88px; width:auto;  margin-left: 20px">자동오픈팝업여부</label>
			              <select class="form-select" id="iSelect_isOpenPopupYN"  style="width:60%; max-width:40px;">
			                	<option></option>
			                	<option>Y</option>
			                	<option>N</option>
			                </select>
			               <label class="col-3 col-form-label " style="min-width: 88px; width:auto; margin-left: 20px">모든업체 노출여부</label> 
			               <select class="form-select" id="iSelect_allCustViewYN"  style="width:60%; max-width:40px;">
			                	<option></option>
			                	<option>Y</option>
			                	<option>N</option>
			                </select>
<!-- 			                <label class="col-3 col-form-label " style="min-width: 88px; width:auto; margin-left: 20px">모든메뉴 노출여부</label> -->
<!-- 			                <select class="form-select" id="iSelect_allMenuViewYN"  style="width:60%; max-width:40px;"> -->
<!-- 			                	<option></option> -->
<!-- 			                	<option>Y</option> -->
<!-- 			                	<option>N</option> -->
<!-- 			                </select> -->
<!-- 			                <label class="col-3 col-form-label " style="min-width: 88px; width:auto; margin-left: 20px">모든일자 노출여부</label> -->
<!-- 			                <select class="form-select" id="iSelect_allYmdYN"  style="width:60%; max-width:40px;"> -->
<!-- 			                	<option></option> -->
<!-- 			                	<option>Y</option> -->
<!-- 			                	<option>N</option> -->
<!-- 			                </select> -->
			        </div>  
			  </div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>  

          </div>
					
		</div>        
      </div>       
        
      </div>
    </div>
    </div>
    </div>
	<form name="popForm"> 
		<input type="hidden" id="popForm_wrNo" name="wrNo" value="">
	</form> 
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String noticePopupList = application.getRealPath("/resources/pan/js/noticePopupList.js");	
			File noticePopupListFile = new File(noticePopupList);	
			Date lastModified_noticePopupListFile = new Date(noticePopupListFile.lastModified());  	
			
		 
			
			
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
    
    <script type="text/javascript"			src="/resources/pan/js/noticePopupList.js?ver=<%=fmt.format(lastModified_noticePopupListFile)%>"></script>
  </body>
</html>