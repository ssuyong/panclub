<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>  매입처 거래상세내역2  </title>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
	
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	
	<!-- fancyBox -->
	<script type="text/javascript"
		src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
	<script type="text/javascript"
		src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
	<link rel="stylesheet" type="text/css"
		href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
		
<!-- fancyBox -->
 	<link href="/resources/pan/css/printbox.css?ver=3.0313.3" rel="stylesheet" />
	
  </head>
  <body  class=" layout-fluid">
	<%@ page import="java.util.*"%>
	<%@ page import="java.text.*"%>
	<%
	String prmsYmd = ""; 
	prmsYmd= request.getParameter("sYmd");
	
	String prmeYmd = "";
	prmeYmd= request.getParameter("eYmd");
	
	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	Calendar cal = Calendar.getInstance();
			
	if (("").equals(prmsYmd) || prmsYmd == null ){
		cal.setTime(new Date());
		cal.add(Calendar.MONTH, -1);
	
		prmsYmd = dateFormat.format(cal.getTime());
		/* out.println(dateFormat.format(cal.getTime())); */
	}
	
	if (("").equals(prmeYmd) || prmeYmd == null ){
		cal.setTime(new Date());
		cal.add(Calendar.MONTH, 0);
	
		prmeYmd = dateFormat.format(cal.getTime());
		/* out.println(dateFormat.format(cal.getTime())); */
	}
	
	%>
		
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
                  매입처 거래상세내역2
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
             <button type="button" id="exportXls" class="btn btn-primary" onclick="exportTo('xlsx')"value="엑셀다운"><i class="fas fa-file-upload"></i><span>엑셀 다운로드</span></button>
       <!--       <button class="btn btn-primary" id="btnPrint" >엑셀다운로드</button> -->
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
                    
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">기준일</label>
                      	<input type=hidden id="prmsYmd" value=${sYmd} >
						<input type=hidden id="prmeYmd" value=${eYmd} >
							<div class="row" style="display: contents; width: auto;">
											<div class="col-md-6" style="width: 280px">
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
											</div>	
										<!-- <div class="col" style="margin-top: 3px;">
											<label class="form-check form-check-inline" style="margin-top: 3px"> 발주처 출고기준 
											<input class="form-check-input" type="checkbox" id="placeYmdYN" name="placeYmdYN" > </label>
										</div>		 -->							
										</div>
 					  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">거래처</label>
                      <div class="col">
                        <input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'custName');" ondblclick="findCust(this,'custName',0,'Y');">
                        <input type="text" id="custName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                      </div>
  					<label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left: 20px;">주문그룹ID</label>
                      <div class="col">
                        <input type="text" id="orderGroupId" class="form-control" style="width:60%; max-width:150px;" placeholder="" >
                      </div>
                        <label class="col-3 col-form-label " style="min-width: 118px; width: auto;">차량번호</label>
						<div class="col" >
						 	<input type="text" id="carNo" class="form-control" style="width: 40%;" placeholder="">
						</div>	
							<label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left: 20px;">거래처 주문번호</label>
                      <div class="col">
                        <input type="text" id="custOrderNo" class="form-control" style="width:60%; max-width:150px;" placeholder="" >
                      </div>
                </div>
				   <div class="form-group mb-3 row" style="margin-top:5px;">
						    <label class="col-3 col-form-label " style="min-width: 80px; width: auto; ">부품ID</label>
				          	<div class="col"  style="display: contents;">
				                <input type="text" id="itemId" class="form-control" style="width:60%; max-width:150px;" placeholder="" >
				             </div> 
				               <label class="col-3 col-form-label " style="min-width: 80px; width: auto; margin-left:70px; ">부품번호</label>
				          	<div class="col"  style="display: contents;">
				                <input type="text" id="itemNo" class="form-control" style="width:60%; max-width:150px;" placeholder="" >
				             </div>         
               				<label class="col-3 col-form-label " style="min-width: 80px; width: auto; margin-left:70px;">유형</label>
							<div class="col"  style="display: contents;">
								<select id="ledgType" class="form-select" style="width: auto; min-width: 100px;">
									<option value=""></option>
								 	<option value="입고">입고(반출포함)</option>
									<!-- <option value="출고">출고</option> -->
								 	<option value="반출">반출</option>
									<!--  <option value="반입">반입</option> -->
								 </select>       
							</div>
							<label class="col-3 col-form-label " style="min-width: 80px; width: auto; margin-left:70px;">지점</label>
							<div class="col"  style="display: contents;">
								<select id="branchComCode" class="form-select" style="width: auto; min-width: 100px;">
									<option>전체</option>
		                      		<option>P</option>
		                      		<option>임파츠</option>
		                      		<option>에스제이파츠</option>
		                      		<option>에스디파츠</option>
		                      		<option>케이에스파츠</option>
								 </select>       
							</div>
                   </div>
       
						 
            <!--     <label class="col-3 col-form-label " style="min-width: 70px; width: auto;margin-left: 20px;">일반/보험</label>
					<div class="col"  style="display: contents;">
						<select id="clType" class="form-select" style="width: auto; min-width: 100px;">
						 <option value=""></option>
						 <option value="일반">일반</option>
						 <option value="보험">보험</option>
						 </select>             
              		</div>        	    -->   
              	</div>		             	
              </div> 
            </div>  
          </div>    
              <div class="form-group mb-3 row">
								<div style="margin: 2px 0px 0;">
									<span> 
										<input type="button" class="btn btn-secondary" onclick="wdReq()" value="출금요청"> 
									</span>	
              			<div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
           				</div>
              			</div> 
              		</div> 	
         </div>        
              <!-- <div class="card-body">
               
            <div class="form-group mb-3 row"> -->
           <!--    <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>  --> 
	<!-- 프린트 팝업 -->
<div id="dialogPrint-form" title="파일 저장" style="display:none;">
  <div id="contents720">
    <div class="contentBox">
      <div>
        <h3>파일 저장하기</h3>
        <div class="form-group mb-3 row">
          <label class="col-3 col-form-label">인쇄구분</label>
          <div class="col">
          	<div>
          	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
                   <input class="form-check-input" type="radio" name="printType"  value="W" checked  >
                   <span class="form-check-label">전체</span>
             </label>
             <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                 <input class="form-check-input" type="radio" name="printType" value="S">
                 <span class="form-check-label">매출</span>
               </label>
               <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                 <input class="form-check-input" type="radio" name="printType" value="B">
                 <span class="form-check-label">매입</span>
               </label>
           </div>
          </div>
        </div>
      </div>
      <div class="bottom" id="button-container">
        <div class="box1">
          <button type="button" id="print" class="w-btn w-btn-gray" ><i class="fas fa-file-upload"></i><span>인쇄</span></button><br>
      		<button type="button" id="btnDownload" class="w-btn w-btn-gray"><i class="fas fa-file-upload"></i><span>이미지 다운로드</span></button>
        </div>
        <div class="box2">
           <button type="button" id="printDtl" class="w-btn w-btn-gray w-btn-outline" value="품목인쇄"><i class="fas fa-file-upload"></i><span>품목인쇄</span></button><br>
        <!--   <button type="button" id="btnDownload" class="w-btn w-btn-gray"><i class="fas fa-file-upload"></i><span>이미지 다운로드</span></button> -->
           <button type="button" id="exportXls" class="w-btn w-btn-gray w-btn-outline" onclick="exportTo('xlsx')"value="엑셀다운"><i class="fas fa-file-upload"></i><span>엑셀 다운로드</span></button>
        </div>
      </div>
    </div>
  </div>
</div>

            <div class="form-footer1">
            </div>
          </div>
        </div>
        
      </div>
        
      </div>
    </div>

    		<!-- 거래처선택 팝업 -->
					<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
						<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
						<input type="text" id="pop_custName"  placeholder="거래처명"> -->
						<input type="text" id="pop_cust_srch" placeholder="거래처명">
						<button class="btn btn-dark" id="btnCustFind">조회</button>
						<div id="grid_wrap_cust" style="height: 90%;"></div>
					</div>
	
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    <script type="text/javascript" src="/resources/pan/js/wh-tran-list2.js?ver=1.1123.3"></script> 
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0117.3"></script>
     
  </body>
</html>