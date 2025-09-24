<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
	<%@ include file="../icld/head.jsp"%>
	<!-- Aui 인쇄 -->
	<script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
	<!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
	
	<!-- fancyBox -->
	<script type="text/javascript"
		src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
	<script type="text/javascript"
		src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
	<link rel="stylesheet" type="text/css"
		href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
	<!-- fancyBox -->
	
<link href="/resources/pan/css/notice-list.css?ver=1.0201.3" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
<style type="text/css">
	/* 커스텀 칼럼 스타일 정의 */
	.left {		text-align: left;	}
</style>
</head>
<body class=" layout-fluid">
	<div class="page">
		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>
		<input type="hidden" name="srch" id="srch" value="${srch}">
		<div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<div class="page-pretitle" style="display: none;">요약</div>
							<h2 class="page-title">공지사항</h2>
							<!-- Page title actions -->
						</div>
					</div>
				</div>
				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnFind">조회</button>
				</div>
				
				<div class="page-body">
					<div class="container-xl">
						<div class="row row-cards">

							<div class="*col-md-6">
								<div class="card">
									<div class="card-body">
										<!-- <form> -->
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"
												style="min-width: 118px; width: auto; text-align: center; padding-top: 5px" >제목</label>
											<div class="col" style="padding-top: 3px;">
												<input type="text" id="title" class="form-control"
													aria-describedby="" placeholder=""
													style="width: 40%; max-width: 600px;">
											</div>
										</div>
									</div>
								</div>
								<div class="form-group mb-3 row">
									<div id="grid_wrap" style="width: 98.1%; height: 70vh;"></div>
								</div>
								<div class="form-footer1"></div>
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
			<script
				src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
			<!-- Tabler Core -->
			<script src="/resources/dist/js/tabler.min.js" defer></script>
			<script src="/resources/dist/js/demo.min.js" defer></script>

			<script type="text/javascript"
				src="/resources/pan/js/notice-list.js?ver=1.0203.3"></script>
</body>
</html>