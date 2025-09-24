<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>미청구 품목 내역 </title>
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
    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
	
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
      <div class="spinner" id="spinner"></div>      
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->               
                <h2 class="page-title">
                  미청구 품목 내역 
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <span> &nbsp;&nbsp;&nbsp; &nbsp;       * 미청구 품목 내역은 출고기준으로 조회됩니다.</span>
            <!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
                                 
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
    <div class="card">
                <input type="hidden" id="dataComCode" value="${dataComCode}" />
                <div class="card-body">
                  <!-- <form> -->
                  <input type="hidden" id="dataComCode" value="${dataComCode}" />
                    <div class="form-group mb-3 row">
                    
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">출고일</label>
                      	<input type=hidden id="prmsYmd" value=${sYmd} >
						<input type=hidden id="prmeYmd" value=${eYmd} >
						<input type=hidden id="logComCode" value=${logComCode} >
						<input type=hidden id="logUserId" value=${logUserId} >
																		
						<div class="row" style="display: contents;">
						    <div class="col-md-6" style="width:auto;">										       
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
						     <div class="col" >
									<label class="form-check form-check-inline" > 기간 전체조회
									<input class="form-check-input" type="checkbox" id="ymdIgnoreYN"
										name="ymdIgnoreYN" > </label>
						    </div>
						</div>
                      	<label class="col-3 col-form-label"
											style="min-width: 30px; width: auto;">주문처</label>
										<div class="col">

											<input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드"
												style="display: initial; width: 48%; max-width: 100px;"
												value="${custCode}" onKeyUp="findCust(this,'custName');"
												ondblclick="findCust(this,'custName',0,'Y');"> <input
												type="text" id="custName" class="form-control"
												aria-describedby="" placeholder="거래처명"
												style="display: initial; width: 48%; max-width: 200px;"
												disabled>
										</div>
										
								
					<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">차량번호</label>
                      <div class="col">
                        <input type="text" id="carNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
					<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                        <input type="text" id="orderGroupId" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                        <label class="col-3 col-form-label " style="min-width: 50px; width:auto; margin-left:15px">관리지점</label>
			              <div class="col" style="width:auto;">
							 <select class="form-select" id="branchCode"  style="width:auto;min-width: 100px; ">
							  <option></option>
							   </select>
			               </div>
 					  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">담당자</label>
                      <div class="col">
                        <input type="text" id="regUserName" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      
                      
                    	<div style = "margin-top: 15px;">
                    	
                    	<label style="min-width: 50px; width:auto;  margin-left: 30px;" >일반/보험</label>      
                      	<select id="clType">
                      		<option></option>
                      		<option>보험</option>
                      		<option>일반</option>
                      	</select>
                      	
                      	<label style="min-width: 50px; width:auto;  margin-left: 30px;" >영업대표</label>
	                      	<select id="srCode" class="form-select" style="display:initial;width:auto; padding:2px 20px 2px 0; ">
	                          <option value=""></option>
	                        </select>  
	                      
                    	<!-- <label  style="min-width: 50px; width:auto;">기결여부</label>
                      
                      	<select id="confYN">
                      		<option>전체</option>    
                      		<option>기결</option>
                      		<option>미결</option>
                      	</select>
         	 -->
                      <!-- 	<label  style="min-width: 50px; width:auto;  margin-left: 30px;">청구요청상태</label>                      
                      	<select id="clReqStatus">
                      		<option></option>
                      		<option>완료</option>
                      		<option>일부완료</option>
                      		<option>미완료</option>
                      	</select> -->
                      	
                    	</div>
                    <div class="form-group mb-3 row">
		                <div style="margin : 2px 0px 0;">
		                	<span>
		                  	<input type="button" class="btn btn-secondary" id="clIgnReg" value="청구제외" >
		                  	
		                	</span>
		                	<span>
		                  	<input type="button" class="btn btn-secondary" id="regClReq" value="일반청구" onClick="getRowItems()" disabled>
		                  	
		                	</span>
		                	<span>*주문처,일반/보험(일반) 입력 후 조회시 활성화*</span>
		                <span style=" display: initial; float: right; margin-right: 10px;'"> 
		                	<label id="checkedItemInfo"></label>
	                   		 <input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')"value="엑셀 다운">
                    	</span>
		                </div>
		            <div id="grid_wrap" style="width:99.1%;height:75vh;"></div>
      				</div>
                </div>
                
              </div>
            </div>

                   
           <!--  <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>   -->

            <!-- <div class="form-footer1">
            </div> -->
          </div>
        </div>
        
      </div>
        
      </div>
    </div>
    <!-- 청구제외등록팝 -->
	<div id="dialog-clIgnPop-form" title="청구제외 사유입력" style="display:none;">
	  	<div id="grid_wrap_clIgn" style=" height:100%;"></div>
	</div>
    <!-- 거래처선택 팝업 -->
					<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
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
    <script type="text/javascript" src="/resources/pan/js/no-cl-item-list.js?ver=1.1119.4"></script> 
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0428.3"></script> 
    
  </body>
</html>