<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
	
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	
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
                  카윈 주문진행현황 
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

                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                    
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">출고일</label>
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
 					  <label class="col-3 col-form-label " style="min-width: 118px; width:auto; display:none;">출고처코드</label>
                      <div class="col">
                        <input type="text" id="출고처코드" class="form-control" style="width:60%; max-width:300px;  display:none;" placeholder="" >
                      </div>
                      
						<%-- <span style="float: right;   margin: 2px;">
						<select name=setDate id=setDate onChange="fn_dateType()">
							<option value="최근7일" <c:if test="${setDate=='최근7일'}"> selected </c:if> >최근7일</option>
							<option value="최근10일" <c:if test="${setDate=='최근10일'}"> selected </c:if> >최근10일</option>
							<option value="최근20일" <c:if test="${setDate=='최근20일'}"> selected </c:if> >최근20일</option>
							<option value="최근1개월" <c:if test="${setDate=='최근1개월'}"> selected </c:if> >최근1개월</option>
							<option value="최근3개월" <c:if test="${setDate=='최근3개월'}"> selected </c:if> >최근3개월</option>
							<option value="오늘" <c:if test="${setDate=='오늘'}"> selected </c:if> >오늘</option>							
							<option value="어제" <c:if test="${setDate=='어제'}"> selected </c:if> >어제</option>
							<option value="이번주" <c:if test="${setDate=='이번주'}"> selected </c:if> >이번주</option>
							<option value="지난주" <c:if test="${setDate=='지난주'}"> selected </c:if> >지난주</option>
							<option value="이번달" <c:if test="${setDate=='이번달'}"> selected </c:if> >이번달</option>
							<option value="지난달" <c:if test="${setDate=='지난달'}"> selected </c:if> >지난달</option>
						</select>
						</span> --%>
                </div>
                

              </div>           
                             <div class="form-group mb-3 row">
            	<div style="margin : 2px 0px 0;">
                  	<span style=" display: initial; float: right;">
                  	<span style="display:none;">
                  	<input type="checkbox" id="chkbox" checked="checked" style="vertical-align:middle; "><label for="chkbox">xlsx 스타일 유지</label>
                  	</span>
                   	<input type="button" class="btn btn-secondary" onclick="exportTo('xlsx')" value="엑셀다운로드">
                   	</span>
                  </div>
                      
                 <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>  
            
             
            </div>
            <div class="form-footer1">
            </div>
          </div>
        </div>
        
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
     <script type="text/javascript" src="/resources/pan/js/cw-ord-prog-list.js?ver=1.0112.3"></script> 
     <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0112.3"></script> 
  </body>
</html>