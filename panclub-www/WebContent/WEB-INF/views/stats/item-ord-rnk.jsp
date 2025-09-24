<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>부품주문순위</title>
<!-- Aui 인쇄 -->
<script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
<!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>

<script type="text/javascript"	src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
<link rel="stylesheet" type="text/css"	href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">
	
<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<!-- fancyBox -->
<script type="text/javascript"	src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript"	src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css"	href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
<!-- fancyBox -->

</head>
<body class=" layout-fluid">

	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<h2 class="page-title">부품 주문 순위</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 10px;">
				<button class="btn btn-primary" id="btnFind">조회</button>
			</div>
			<div class="form-group mb-3 row"> 
				<div class="row" style="display: contents;"> 
			 		<div class="col-md-6" style="width: auto; padding: 0 0 0 20px;">
						<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
							<input id="startpicker-input" type="text" aria-label="Year-Month">
							<span class="tui-ico-date"></span>
							<div id="startpicker-container" style="margin-left: -1px;"></div>
						</div>
						<span>~</span>
						<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
							<input id="endpicker-input" type="text" aria-label="Year-Month">
							<span class="tui-ico-date"></span>
							<div id="endpicker-container" style="margin-left: -1px;"></div>
						</div>
					</div>
				</div>
				<label class="col-3 col-form-label"	style="margin-left:100px; *min-width: 118px; width: auto;">제조사</label>
				<div class="col">
					<select id="makerCodeReg" class="form-select"	style="width: auto; padding: 2px 20px 2px 0;">
						<option value=""></option>
					</select>
				</div>
				<label class="col-3 col-form-label"	style="margin-left:100px; *min-width: 118px; width: auto;">센터가</label>
				<div class="col">
					<input type="number" id="centerPrice" class="form-control"	aria-describedby="" placeholder="#,#### 이상"	style="width: 60%; max-width: 200px;" >
					<!-- <label>이상</label> -->
				</div>
				
				<div style="margin: 2px 0px 0;">
					<span style=" display: initial; float: right;">
				       	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">			                      	                     	
			       	</span>
				</div>
			</div>			
		
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">
						<div class="*col-md-6">
							<div class="form-group mb-3 ">								
								<!-- 대량조회 -->
							  	<div id="idDiv_bulkSrch_section" style="float:left; border:1px solid #eee;height:500px; padding:0 1px; *display:none;">
									<header_ba >
							        <div id="hamburger">
							            <div></div>
							            <div></div>
							            <div></div>
							        </div>
								    </header_ba>
								    <nav>
								    	<div style="padding:3px">
								    	</div>
								        <div>
								        	<textarea rows="10" cols="20" style="height:59vh;border:1px solid #bbb; font-size:14px; " wrap="off" id="item_bulk" name="item_bulk" 
								        	></textarea>
								        </div>
								        <div>	
								        	<button class="" onClick="txtAreaReset()" 
								        	style="font-size: 13px; width: 60px; border: 1px solid #aaa; background-color: #fff; border-radius: 3px; color:#555; padding:2px;"}>
								        	RESET</button>
								        </div>	
								    </nav>	    
								</div>
								<!-- 대량조회 END -->
								<div>
								<div id="grid_wrap" style="width: 85%; height: 70vh;"></div>
								</div>
							</div>
					<div class="alert alert-info" role="alert">
					   <div class="d-flex">
					     <div>
					       <!-- Download SVG icon from http://tabler-icons.io/i/info-circle -->
					       <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
					     </div>
					     <div>
					        순위는 검색기간의 전체부품의 주문순위 중 해당 부품의 순위입니다.					        
					        <br>기본정렬을 주문수량 순위입니다.			        
					     </div>					    
					   </div>
					</div>	
							<div class="form-footer1"></div>
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
			
			String itemOrdRnk = application.getRealPath("/resources/pan/js/item-ord-rnk.js");	
			File itemOrdRnkFile = new File(itemOrdRnk);	
			Date lastModified_itemOrdRnkFile = new Date(itemOrdRnkFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>

		<!-- Tabler Libs JS -->
		<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"			defer></script>
		<script			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"			defer></script>
		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>

		<script type="text/javascript"			src="/resources/pan/js/item-ord-rnk.js?ver=<%=fmt.format(lastModified_itemOrdRnkFile)%>"></script>
		<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 
</body>
</html>