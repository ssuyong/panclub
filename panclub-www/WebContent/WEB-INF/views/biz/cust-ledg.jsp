<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>거래처원장</title>
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
                  거래처원장 
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
             <button class="btn btn-primary" id="btnPrint">인쇄</button>
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
												
						<div class="row" style="display: contents;">
						    <div class="col-md-6">										       
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
 					  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">거래처</label>
                      <div class="col">
                        <input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'custName');" ondblclick="findCust(this,'custName',0,'Y');">
                        <input type="text" id="custName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                      	<label class="form-check form-check-inline" > 대표거래처 기준
							<input class="form-check-input" type="checkbox" id="mainYN" name="mainYN" > </label>
                      </div>
                </div>
                
              </div>
              <div class="card-body">
                <div class="form-group mb-3 row">
              		<label class="col-3 col-form-label"style="min-width: 118px; width: auto;" >업체구분</label>
										<div class="col">
											<select id="custType" class="form-select"style="width: auto; padding: 2px 20px 2px 0;"  disabled>
												<option value="C3">일반(사업자번호 O)</option>
												<option value="C2">개인(사업자번호 x)</option>
												<option value="C1">보험사</option>
												<option value="C4">은행</option>
												<option value="C5">카드사</option>
											</select> 
										</div>	
									</div>			            
                 		  <div class="form-group mb-3 row">
											<%-- <label class="col-3 col-form-label"style="min-width: 118px; width: auto;">거래처코드</label>
											<div class="col">
												<input type="text" id="custCode2" class="form-control"aria-describedby="" placeholder=""style="display: initial; width: 25%; max-width: 300px;"maxlength="8" value="${custCode}" required
													onKeyUp="codeValidCheck(this);" disabled> 
												<input type="text"id="lastCustCode" class="form-control" aria-describedby=""placeholder="마지막 코드"style="display: initial; width: 25%; max-width: 300px;"disabled>
											</div> --%>
											<!-- <label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">거래처명(약명)</label>
											<div class="col">
												<input type="text" id="custName" class="form-control"style="width: 40%; max-width: 300px;"placeholder="ex) P-성수 ">
											</div> -->
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">거래처명(정식명)</label>
											<div class="col">
												<input type="text" id="formalName" class="form-control"style="width: 40%; max-width: 300px;"placeholder="사업자 등록증의 법인명" disabled> 
											</div>
										</div>
            						  <div class="form-group mb-3 row">
												<label class="col-3 col-form-label "style="min-width: 118px; width: auto;">사업자등록번호</label>
												<div class="col">
													<input type="text" id="bizNo" class="form-control" size=12maxlength=12 style="width: 70%; max-width: 300px;"placeholder="" maxlength="12" disabled>
												</div>
												<label class="col-3 col-form-label "style="min-width: 118px; width: auto;">업태</label>
												<div class="col">
													<input type="text" id="bzType" class="form-control"style="width: 50%; max-width: 300px;" placeholder="" disabled>
												</div>
												<label class="col-3 col-form-label "style="min-width: 118px; width: auto;">종목</label>
												<div class="col">
													<input type="text" id="bzItems" class="form-control"style="width: 50%; max-width: 300px;" placeholder="" disabled>
												</div>
	
												<label class="col-3 col-form-label "style="min-width: 118px; width: auto;">대표자명</label>
												<div class="col">
													<input type="text" id="ceoName" class="form-control" size=12maxlength=12 style="width: 60%; max-width: 300px;"placeholder="" disabled>
												</div>
												<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
												<div class="col">&nbsp;</div>
										</div>
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label "style="min-width: 118px; width: auto;">대표전화</label>
											<div class="col">
												<input type="text" id="phone" class="form-control" size=12maxlength=12 style="width: 70%; max-width: 300px;"placeholder="" disabled>
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">팩스</label>
											<div class="col">
												<input type="text" id="fax" class="form-control"style="width: 60%; max-width: 300px;" placeholder="" disabled>
											</div>

											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">세금계산서용 핸드폰</label>
											<div class="col">
												<input type="text" id="taxMobile" class="form-control"size=12 maxlength=12 style="width: 100%; max-width: 300px;"placeholder="" disabled>
											</div>
											<label class="col-3 col-form-label "style="min-width: 118px; width: auto;">세금계산서용 이메일</label>
											<div class="col">
												<input type="text" id="taxEmail" class="form-control"style="width: 100%; max-width: 300px;" placeholder="" disabled>
											</div>
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="" >
											</div>
										</div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:65vh;"></div>
            </div>  
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
                   <input class="form-check-input" type="radio" name="printType"  value="W"   >
                   <span class="form-check-label">전체</span>
             </label>
             <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                 <input class="form-check-input" type="radio" name="printType" value="S" checked>
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
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<input type="hidden" id="grid-custCode1" name="grid-custCode1" value="">
		<input type="hidden" id="grid-custName1" name="grid-custName1" value="">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnCustFind" >조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
	</div>
	
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    <script type="text/javascript" src="/resources/pan/js/cust-ledg.js?ver=1.0719.4"></script> 
   	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0309.3"></script>
     
  </body>
</html>