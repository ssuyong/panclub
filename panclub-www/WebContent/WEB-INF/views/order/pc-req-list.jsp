<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>주문 접수내역 </title>
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
  <style type="text/css">
	.custom-font-bold 
	{
		font-weight: 1000;
		background: #C99F9F;
		color: #742222;
	} 
	</style>
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
                  주문 접수 내역 
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회(f9)</button>
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                    
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">요청일</label>
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
												
 					 <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
                      <div class="col"><input type="text" id="pcReqNo" class="form-control" style="width:40%; max-width:300px;" placeholder="" value="${pcReqNo}"></div>
						<label class="col-3 col-form-label" style="min-width: 50px; width: auto;">요청업체</label>
						<div class="col">
						<input type="text" id="gvComCode" class="form-control"  aria-describedby="" placeholder="거래처코드" style="display: initial; width: 48%; max-width: 100px;"
							value="${custCode}" required onKeyUp="findCust(this,'gvCustName');"> 
						<input type="text" id="gvCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display: initial; width: 48%; max-width: 200px;" disabled>
						</div>			
						 <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청담당자</label>
                     	 <div class="col"><input type="text" id="gvMgr" class="form-control" style="width:40%; max-width:300px;" placeholder="" ></div>
                     	  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수담당자</label>
                     	 <div class="col"><input type="text" id="procUserId" class="form-control" style="width:40%; max-width:300px;" placeholder="" ></div>				
                		</div>
                	 <div class="form-group mb-3 row">
                	  <label class="col-3 col-form-label " style="min-width: 50px; width:auto;">처리상태</label>
                      <div class="col" >
                      	<select multiple id="procState"class="form-select" style=" width:auto; padding: 2px 25px 2px 0;  width: 280px; ">
                       
                      		<option>미완료</option>
                      		<option>일부완료</option>
                      		<option>완료</option>
                      	</select>
                      	</div>
                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청업체 발주번호</label>
                      <div class="col"><input type="text" id="gvPlacNo" class="form-control" style="width:40%; max-width:300px;" placeholder="" ></div>	
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품ID</label>
                      <div class="col"><input type="text" id="itemId" class="form-control" style="width:100%; max-width:500px;" placeholder="" ></div>	
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품번호</label>
                      <div class="col"><input type="text" id="itemNo" class="form-control" style="width:100%; max-width:500px;" placeholder="" ></div>	 
                	 </div>
			  </div>		
                <div class="form-group mb-3 row" style="margin-top:-10px">
									<div >
										<span style="display: initial; float: right; margin-right: 10px;'">
											<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
										</span>
									</div>
								</div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>  

            <div class="form-footer1">
            </div>
          </div>
						<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
							<input type="text" id="pop_cust_srch" placeholder="거래처명">
							<button class="btn btn-dark" id="btnCustFind">조회</button>
							<div id="grid_wrap_cust" style="height: 90%;"></div>
						</div>
					</div>        
      </div>       
        
      </div>
    </div>
    
    <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String pcReqList = application.getRealPath("/resources/pan/js/pc-req-list.js");	
			File pcReqListFile = new File(pcReqList);	
			Date lastModified_pcReqListFile = new Date(pcReqListFile.lastModified());  	
			
			
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
     <script type="text/javascript" src="/resources/pan/js/pc-req-list.js?ver=<%=fmt.format(lastModified_pcReqListFile)%>"></script> 
     <script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script>
    
  </body>
</html>