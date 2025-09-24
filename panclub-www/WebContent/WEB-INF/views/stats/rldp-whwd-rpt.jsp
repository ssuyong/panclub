<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>출고/입금, 입고/출금 현황</title>
<!-- Begin: Tab 사용 -->
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<!-- End: Tab 사용 -->

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<script type="text/javascript" src="/resources/js/spin.js"></script>
<!-- spinner -->
<!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox --> 
<style type="text/css">
    /* 커스텀 칼럼 헤더 스타일 정의 */ 
    .total-custom {
        background: #ffffdd;
        font-weight: bold;
        text-align: right;
    }
    .total-custom2 {
        background: #FFE4E1;
        font-weight: bold;
        text-align: right;
    }
    .total-footer-custom {
   	 	background: #8888cc;
        font-weight: bold;
        text-align: right; 
    }
    .green-grid-custom {
    	background: #CCFFCC;
        font-weight: bold;
        text-align: right; 
    }
    .green-footer-custom {
    	background: #99FF99;
        font-weight: bold;
        text-align: right; 
    }
    .total-footer-custom2 {
        background: #FFF1CF;
        font-weight: bold;
        text-align: center;
    }
    .total-footer-custom3 {
        background: #FFD675;
        font-weight: bold;
        text-align: right;
    }
    .total-footer-custom4 {
        background: #FFF1CF;
        font-weight: bold;
        text-align: right;
    }
    
 
</style>
</head>
<body class=" layout-fluid">
	<%@ include file="../icld/header.jsp"%>
	<%@ include file="../icld/navbar.jsp"%>

	<div class="page-wrapper" >
		<div class="page" > 
			<div class="col-md-4" style="width: 100%" >
				  
				<h4 style="margin: 10px;">출고/입금, 입고/출금 현황</h4> 
				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnFind">조회</button>
				</div>
                <div class="card" >
                  	<div class="card-header" > 
                  		<button class="btn btn-info" id="btnDateTypeChange">월간으로</button>
                 		<div class="tui-datepicker-input tui-datetime-input tui-has-focus" style="margin: 0px 30px" id="btnYYMMSelect">
						<input id="reportTargetMM" type="text" aria-label="Date" >
						<span class="tui-ico-date" ></span>
						<div id="calendar-wrapper" ></div>
						</div>
						
						<div class="col">
							<label class="form-check form-check-inline"> 제외업체 제외
								<input class="form-check-input" type="checkbox"
								id="exceptCustYN" name="exceptCustYN" checked>
							</label>
						</div>
   		
                     
						<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운" style="position:absolute; ; right: 28px;">
					 
               	   </div>
               	   <div style="margin: 10px 10px; ">
	                     <a style="display: initial; float: right; margin-right: 14px;  "> (단위 : 천원)</a>
	                     <div style=" text-align: center;">
		                     <div id="grid_wrap1" style="min-height: 90vh; width: 99vw; display: inline-block; "></div>  
	                     </div>
	                     
	                     <div class="alert alert-info" role="alert">
							<div class="d-flex">
							     <div>
							       <!-- Download SVG icon from http://tabler-icons.io/i/info-circle -->
							       <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
							     </div>
							     <div>
							       - 세금이 포함된 금액입니다.<br>
							       - 제외업체 제외 : P(임파츠,SD,SJ,KS,그린파츠,오토픽스,인콘 으로부터 입금 제외), 나머지 업체는 (P,임파츠,SD,SJ,KS,그린파츠,오토픽스, 인콘 으로 부터 입금 제외)<br>
							       &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;, 임파츠와 SD는 웰컴저축은행계좌로 입금되는 입금건 추가 제외.
							     </div>
							    
							</div>
						</div>
                   </div>
              	</div>
            </div>
        </div>
				  
		

		<!-- Tabler Libs JS -->
		<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
			defer></script>
		<script
			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"
			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
			defer></script>
		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>

		<script type="text/javascript" src="/resources/pan/js/rldp-whwd-rpt.js?ver=1.0927.4"></script> 
		<script type="text/javascript"
			src="/resources/pan/js/common-pan.js?ver=1.0924.4"></script>
	</div>
	 
</body>
</html>