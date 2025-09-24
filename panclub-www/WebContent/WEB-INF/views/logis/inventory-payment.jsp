<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>     
    <title>재고수불부</title>
    <link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
  </head>
   <style type="text/css">
	.custom-font-bold 
	{
		text-align:right;
		background: #94efff;
		color : #4f2720;
		font-weight: bold;
		
	} 
	</style>
  <body  class=" layout-fluid">
    <div class="page">
      
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
        <div class="container-xl">
          
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <h2 class="page-title">
                  재고수불부
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button> 
             <!-- <button class="btn btn-primary" id="btnPrint">인쇄</button>         -->
             <input type="text" id="comCode" style="  display: none;">
             
        </div>
        <div class="form-group mb-3 row" style="margin-top:-10px">
			<div >
				<span style="display: initial; float: right; margin-right: 10px;'">
					<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
				</span>
			</div>
		</div>
		
<div class="page-body">
		<div class="spinner" id="spinner"></div>
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">
                <div class="card-header" style="display:none;">
                  <h3 class="card-title">Horizontal form</h3>
                </div>
                <div class="card-body">
                
                  
					<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"	style="*min-width: 118px; width: auto;">기간</label> 

										<div class="row" style="display: contents;">
											<div class="col-md-6" style="width:auto;">
												<div 
													class="tui-datepicker-input tui-datetime-input tui-has-focus">
													<input id="startpicker-input" type="text" aria-label="Date">
													<span class="tui-ico-date"></span>
													<div id="startpicker-container" style="margin-left: -1px;"></div>
												</div>
												<span>~</span>
												<div
													class="tui-datepicker-input tui-datetime-input tui-has-focus">
													<input id="endpicker-input" type="text" aria-label="Date">
													<span class="tui-ico-date"></span>
													<div id="endpicker-container" style="margin-left: -1px;"></div>
												</div>
												<label class="form-check form-check-inline" > 기간 전체조회
											<input class="form-check-input" type="checkbox" id="ymdIgnoreYN"
											name="ymdIgnoreYN"  checked="checked"> </label>
											</div>
										<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">주문처</label>
										<div class="col">

											<input type="text" id="custCode" class="form-control"
												aria-describedby="" placeholder="거래처코드"
												style="display: initial; width: 48%; max-width: 100px;"
												value="${custCode}" onKeyUp="findCust(this,'custName');"
												ondblclick="findCust(this,'custName',0,'Y');"> <input
												type="text" id="custName" class="form-control"
												aria-describedby="" placeholder="거래처명"
												style="display: initial; width: 48%; max-width: 200px;"
												disabled>
										</div>
										 <label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">부품ID</label>
										<div class="col">
											<input type="text" id="itemId" class="form-control barcodeReaderInput_itemId"	value="${itemId}"	aria-describedby="" placeholder=""	style="width: 60%; max-width: 300px;">
										</div>

										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">품번</label>
										<div class="col">
											<input type="text" id="itemNo" class="form-control barcodeReaderInput_itemNo"	aria-describedby="" placeholder=""	style="width: 60%; max-width: 300px;">
										</div>
									</div>
								 

								</div>

                    
                    
                </div>
              </div>
            </div>
 
            <div id="grid_wrap" style="width:99.1%;height:70vh;"></div> 
          
          </div>
        </div>
        
      </div>
      </div>
    </div>
 
 	<!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnCustFind">조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
	</div>
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String inventoryPayment = application.getRealPath("/resources/pan/js/inventoryPayment.js");	
			File inventoryPaymentFile = new File(inventoryPayment);	
			Date lastModified_inventoryPaymentFile = new Date(inventoryPaymentFile.lastModified()); 	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
 	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script> 
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript" src="/resources/pan/js/inventoryPayment.js?ver=<%=fmt.format(lastModified_inventoryPaymentFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script>  

  </body>
</html>