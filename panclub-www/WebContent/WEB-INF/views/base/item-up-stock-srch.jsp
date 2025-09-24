<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>부품등록대상검색어</title>
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
							<h2 class="page-title">부품등록대상 검색어</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 10px;">
				<button class="btn btn-primary" id="btnFind">조회</button>
			</div>
			 

		
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							

							<div class="form-group mb-3 ">
								<span>
		                      	<input type="button" class="btn btn-secondary " onclick="itemUp('ADD')" value="부품등록" id="btnProc" >
		                      	<input type="button" class="btn btn-secondary " onclick="itemUp('EXCLUWORD_ADD')" value="등록제외" id="btnProc" >
	                      		</span>
									<span style=" display: initial; float: right;">
				                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">			                      	                     	
			                      	</span>
							</div>	
								
								<div>
								<div id="grid_wrap" style="width:99.1%;height:65vh;"></div>
								</div>
							</div>
					
					</div>	
							<div class="form-footer1"></div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!--   진행바 -->
		<div id="dialog-form-itemProgress" title="처리중" style="display: none;" >
			<div class="row row-cards">
				<div class="*col-md-6"> 
						<div class="progress mb-2">
            				<div class="progress-bar" id="progress-bar" style="width: 0%; height: 30px" role="progressbar" > 
              				</div>
            			</div>
            			<div class="form-group mb-3 row" style="display: flex; justify-content: center ;">
            				<label class="col-3 col-form-label"  style="min-width: 20px; width: auto; ">진행도</label>
            				<label class="col-3 col-form-label" id="cur" style="min-width: 25px; width: auto; "></label>
            				<label class="col-3 col-form-label"  style="min-width: 10px; width: auto; ">/</label>
            		 		<label class="col-3 col-form-label" id="last" style="min-width: 25px; width: auto; "></label>
            	 		</div>
            	</div>
            </div>
		</div>
		
				
		<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String stockSrchRnk = application.getRealPath("/resources/pan/js/stock-srch-rnk.js");	
			File stockSrchRnkFile = new File(stockSrchRnk);	
			Date lastModified_stockSrchRnkFile = new Date(stockSrchRnkFile.lastModified());  	
			
			
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

		<script type="text/javascript"			src="/resources/pan/js/item-up-stock-srch.js?ver=<%=fmt.format(lastModified_stockSrchRnkFile)%>"></script>
		<script type="text/javascript"			src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script>
</body>
</html>