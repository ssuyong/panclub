<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<title>일정관리</title>


</head>
<body class=" layout-fluid">
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
		<h2 class="page-title" style="margin: 10px">일정관리</h2>
		<div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button> 
        </div>
        <div class="spinner" id="spinner"></div>
		<div class="page-body">
			<div class="card" style="margin:  10px">
				<div class="form-group mb-3 row">
		            <div class="tui-datepicker-input tui-datetime-input tui-has-focus" style="margin-left: 20px; margin-top: 10px;">
						<input id="startpicker-input" type="text" aria-label="Date">
						<span class="tui-ico-date"></span>
						<div id="calendar-wrapper" ></div>
					</div>
					<div class="col">
							<label class="form-check form-check-inline" style="margin-top: 13px">퇴사자 제외
								<input class="form-check-input" type="checkbox"
								id="finExceptYN" name="finExceptYN" checked="checked">
							</label>
					</div>
	            </div> 
	            <div style="display: flex; justify-content: space-between;"> 
	           		<div id="grid_wrap" style="height:70vh; width:42vw; margin: 0 10px 10px 10px"></div> 
                	<div id="grid_wrapDetail" style="height:70vh; width:57vw; margin: 0 10px 10px 10px; "></div>
	            </div>
	                <div class="alert alert-info" role="alert">
					   <div class="d-flex">
					     <div>
					       <!-- Download SVG icon from http://tabler-icons.io/i/info-circle -->
					       <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
					     </div>
					     <div>
							* 연차의 경우 회사의 회계기준일(1.1)로 계산(판례ㆍ노동부 행정해석)<br>
							-> 입사년연차 = 1년 미만 연차(이하 월차). 입사 1개월 후 월차 발생. 1월 10일 입사한 경우 2월 10일에 월차 1일이 발생하여 그 다음 매월 10일에 월차 1일 발생)<br> 
							-> 2년차연차=월차+연차((입사년 재직일335일÷366일)×15일)<br>
					     </div>					    
					   </div>
					</div>
               
           </div>
		</div>        
        	
	</div>
</div>
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
			<%	/* CSS/JS 파일 캐시 방지 */	
				String scheduleByMem = application.getRealPath("/resources/pan/js/scheduleByMem.js");	
				File scheduleByMemFile = new File(scheduleByMem);	
				Date lastModified_scheduleByMemFile = new Date(scheduleByMemFile.lastModified());  	
				
			 
				
				
				SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			%>		
	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script> 
	<!-- Tabler Libs JS -->
	<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
		defer></script>
	<script
		src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
		defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
		defer></script>
	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script> 
	<script type="text/javascript" src="/resources/pan/js/scheduleByMem.js?ver=<%=fmt.format(lastModified_scheduleByMemFile)%>"></script> 

</body>
</html>