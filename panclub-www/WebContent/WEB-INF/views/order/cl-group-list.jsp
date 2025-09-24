<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title> 청구 그룹 내역 </title>
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
                  청구 그룹 내역 
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
                <input type="hidden" id="dataComCode" value="${dataComCode}" />
                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                    
                    <label class="col-3 col-form-label " style="min-width: 70px; width: auto;">기준일자  </label>
							 	<input type=hidden id="prmsYmd" value=${sYmd} >
								<input type=hidden id="prmeYmd" value=${eYmd} >
										<div style="width: 80px!important">
											<select id="clDateType" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value="생성일">생성일</option>
												<!-- <option value="요청일">요청일</option> -->
												<option value="청구일">청구일</option>
												<option value="출고일">출고일</option>
											</select>
										</div>          
										<div class="row" style="display: contents; ">
											<div class="col-md-6" style="width: auto; ">
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
						<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">차량번호</label>
                      <div class="col">
                        <input type="text" id="carNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
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
					<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">보험사 정보</label>
                      <div class="col">
                        <input type="text" id="insure1Code" class="form-control" aria-describedby="" placeholder="보험사코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'insure1Name');" >
                        <input type="text" id="insure1Name" class="form-control" aria-describedby="" placeholder="보험사명" style="display:initial;width:48%; max-width:200px;" readonly >
                       </div> 	
                       				
 					  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">보험 담당자</label>
                      <div class="col">
                        <input type="text" id="insure1ＭgrName" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                </div>
                <div class="form-group mb-3 row">
                <label class="col-3 col-form-label " style="min-width: 70px; width: auto;">일반/보험</label>
										<div class="col"  style="display: contents;">
											<select id="clType" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="일반">일반</option>
												<option value="보험">보험</option>
											</select>
										</div>	
						<label class="col-3 col-form-label " style="min-width: 70px; width: auto; margin-left : 50px;">청구상태</label>
										<div class="col"  style="display: contents;">
											<select id=procStep class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value="전체"></option>
												<option value="청구">청구</option>
												<option value="미청구">미청구</option>
											</select>	
										</div>	
					<label class="col-3 col-form-label " style="min-width: 70px; width: auto; margin-left : 50px;">세금계산서 발행여부</label>
										<div class="col"  style="display: contents;">
											<select id=billPubli class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value="전체"></option>
												<option value="Y">발행</option>
												<option value="N">미발행</option>
											</select>
										</div>
										
					<label class="col-3 col-form-label " style="min-width: 70px; width: auto; margin-left : 50px;">증빙유형</label>
										<div class="col"  style="display: contents;">
											<select id="expType" class="form-select" style="width: auto; padding: 2px 25px 2px 0;">
												<option value="전체"></option>
												<option value="현금영수증">현금영수증</option>
												<option value="세금계산서">세금계산서</option>
												<option value="카드">카드</option>
												<option value="지에스에이">지에스에이</option>
												<option value="청구변경-sd">청구변경-sd</option>
												<option value="청구변경-임">청구변경-임</option>
												<option value="청구변경-ks">청구변경-ks</option>
											</select>
										</div>																
               		 <!-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left: 100px;">청구요청번호</label>
                      <div class="col">
                        <input type="text" id="clReqNo" class="form-control" style="width:60%; max-width:100px;" placeholder="" >
                      </div> -->
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; margin-left: 100px;">주문그룹ID</label>
                      <div class="col">
                        <input type="text" id="orderGroupId" value="${orderGroupId}" class="form-control" style="width:60%; max-width:150px;" placeholder="" >
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구그룹ID</label>
                      <div class="col">
                        <input type="text" id="clGroupId" class="form-control" style="width:60%; max-width:150px;" placeholder="" >
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">담당자</label>
                      <div class="col">
                        <input type="text" id="regUserName" class="form-control" style="width:60%; max-width:100px;" placeholder="" >
                        </div>
                         <label class="col-3 col-form-label " style="min-width: 50px; width:auto; margin-left:15px">관리지점</label>
			              <div class="col" style="width:auto;">
							 <select class="form-select" id="branchCode"  style="width:auto;min-width: 100px; ">
							  <option></option>
							   </select>
			               </div>
                      
										
                      </div>                   
                </div>
                 <div style="margin-left: 10px;"> 
                      <span >
						<label class="form-check form-check-inline" style="margin-bottom: 0px;">			
			                <input class="form-check-input" type="radio" name=confYN value="기결" >
			                <span class="form-check-label">기결</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="confYN" value="미결" >
			                <span class="form-check-label">미결</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="confYN"  value="전체" >
			                <span class="form-check-label">전체</span>
			            </label>
		            	</span>
                	</div>
              </div>
              </div>     
            </div>

			<div class="form-group mb-3 row">
                <div style="margin : 2px 0px 0;">
                	<span>
                	<!-- 20231220 yoonsang - 대표님지시사항 전체기결못하도록. 건별로 상세들어가서 기결하도록 버튼삭제
                	<input type="button" class="btn btn-secondary"  onclick="whUpProc('/order/clGroupAdd2')" value="기결">
                  	<input type="button" class="btn btn-secondary"  onclick="clUpProc('/order/clGroupAdd2')" value="기결취소"> -->
                  	<input type="button" class="btn btn-secondary"  onclick="taxBillReg()" value="세금계산서등록">                 	
                	</span>
                	<span style=" display: initial; float: right; margin-right: 10px;'">
	                    <input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')"value="엑셀 다운">
                     </span>
                </div>
                <div id="grid_wrap" style="width:99.1%;height:75vh;"></div>
      		</div>  
                   
           <!-- <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>   

            <div class="form-footer1">
            </div> -->
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
    </div>
    

    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    <script type="text/javascript" src="/resources/pan/js/cl-group-list.js?ver=1.0522.4"></script> 
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0428.3"></script>
  </body>
</html>