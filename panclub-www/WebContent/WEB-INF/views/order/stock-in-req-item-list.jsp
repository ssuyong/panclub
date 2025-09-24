<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>재고투입요청내역</title>
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
                  재고투입요청내역
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
                    <div class="form-group mb-3 row">
                    
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">등록일</label>
                      	<input type=hidden id="prmsYmd" value=${sYmd} >
						<input type=hidden id="prmeYmd" value=${eYmd} >
												
						<div class="row" style="display: contents;">
						    <div class="col-md-6" style="width: 280px">										       
						       <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
							        <input id="startpicker-input" type="text" aria-label="Date">
							        <span class="tui-ico-date"></span>
							        <div id="startpicker-container" style="margin-left: -1px;"></div>
							    </div>
							    <span>~</span>
							    <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
							        <input id="endpicker-input" type="text" aria-label="Date">
							        <span class="tui-ico-date"></span>
							        <div id="endpicker-container" style="margin-left: -1px;"></div>
							    </div>
						    </div>
						</div>
						
							<div class="col" >
								<label class="form-check form-check-inline" > 기간 전체조회
									<input class="form-check-input" type="checkbox" id="ymdIgnoreYN" name="ymdIgnoreYN"> </label>
							 </div>
												
 							<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품ID</label>
	                      <div class="col"><input type="text" id="itemId" class="form-control" style="width:100%; max-width:500px;" placeholder="" ></div>	
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품번호</label>
	                      <div class="col"><input type="text" id="itemNo" class="form-control" style="width:100%; max-width:500px;" placeholder="" ></div>	
                      
                   
			  	</div>
			  	<div class="form-group mb-3 row">
			  		<label class="col-3 col-form-label " style="min-width: 50px; width:auto;">처리상태</label>
                      <div class="col" >
                      	<select multiple id="procState"class="form-select" style=" width:auto; padding: 2px 50px 2px 0;  width: 200px; ">
                       
                      		<option>요청</option>
                      		<option>처리</option>
                      	</select>
                      	</div>
			  		<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문번호</label>
	                <div class="col"><input type="text" id="orderNo" class="form-control" style="width:100%; max-width:200px;" placeholder="" ></div>	
			  		<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문순번</label>
	                <div class="col"><input type="text" id="orderSeq" class="form-control" style="width:100%; max-width:80px;" placeholder="" ></div>	
	                <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">반출요청번호</label>
	                <div class="col"><input type="text" id="roReqNo" class="form-control" style="width:100%; max-width:200px;" placeholder="" ></div>	
	                <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">반출요청순번</label>
	                <div class="col"><input type="text" id="roReqSeq" class="form-control" style="width:100%; max-width:80px;" placeholder="" ></div>	
			  	</div>
			  	 <button class="btn btn-secondary" id="btnProc">처리</button>  
			  	 <button class="btn btn-secondary" id="btnProcCancel">처리취소</button>  
			  	 <button class="btn btn-secondary" id="btnReqCancel">요청취소</button>  
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
		<div id="dialog-form-itemProgress" title="처리중" style="display: none;" >
			<div class="row row-cards">
				<div class="*col-md-6"> 
						<div class="progress mb-2">
            				<div class="progress-bar" id="progress-bar" style="width: 0%; height: 30px" role="progressbar" > 
              				</div>
            			</div>
            			<div class="form-group mb-3 row" style="display: flex; justify-content: center ;">
            				<label class="col-3 col-form-label"  style="min-width: 20px; width: auto; ">진행도</label>
            				<label class="col-3 col-form-label" id="cur" style="min-width: 25px; width: auto; "></label>
            				<label class="col-3 col-form-label"  style="min-width: 10px; width: auto; ">/</label>
            		 		<label class="col-3 col-form-label" id="last" style="min-width: 25px; width: auto; "></label>
            	 		</div>
            	</div>
            </div>
		</div>
	
		
	<div id="dialog-form-rackfinder" title="랙선택" style="display:none;"> 
		<div id="grid_wrap_rackfinder" style="width:99%;height:20vh;"></div>
	</div>	 
		 
    <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String stockInReqItemList = application.getRealPath("/resources/pan/js/stock-in-req-item-list.js");	
			File stockInReqItemListFile = new File(stockInReqItemList);	
			Date lastModified_stockInReqItemListFile = new Date(stockInReqItemListFile.lastModified());  	
		 
			
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
    <script type="text/javascript"			src="/resources/pan/js/stock-in-req-item-list.js?ver=<%=fmt.format(lastModified_stockInReqItemListFile)%>"></script>
     
  </body>
</html>