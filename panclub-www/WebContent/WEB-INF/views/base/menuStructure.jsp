<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<!--
* Tabler - Premium and Open Source dashboard template with responsive and high quality UI.
* @version 1.0.0-beta11
* @link https://tabler.io
* Copyright 2018-2022 The Tabler Authors
* Copyright 2018-2022 codecalm.net PaweÅ Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
-->

<html>
<head>
<%@ include file="../icld/head.jsp"%>
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
							<div class="page-pretitle" style="display: none;">요약</div>
							<h2 class="page-title">메뉴구조 관리</h2>
						</div>
						<!-- Page title actions -->

					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnReg" onclick="uptBtn()">저장</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">
								<div class="card-body">
									<div style="width: 100%; margin: 0 auto;">
										<div style="display: flex;"> 
											<div id='grid_wrap'	 style="width:98%;height:70vh;"></div> 
										</div>
										<div>
											<input type="button" class="btn btn-outline-info" onclick="addRowBtn()" value="행추가"> 
											<input type="button" class="btn btn-outline-info" onclick="addRowBtn(true)" value="하위행추가"> 
											<button class="btn btn-outline-info" onclick="AUIGrid.removeRow('#grid_wrap', 'selectedIndex')" >행삭제</button> 
										</div>
										<div style="clear: both;"></div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>

		</div>
		
		<!-- 물류센터별 기본랙선택 팝업 -->
		<div id="dialog-form-permission" title="필요권한선택" style="display:none;">   
		  	<div id="grid_wrap_permission" style=" height:90%;"></div>
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
		<script type="text/javascript"	src="/resources/pan/js/menuStructure.js?ver=1.1010.4"></script>
</body>
</html>