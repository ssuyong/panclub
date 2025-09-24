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
							<!-- <h2 class="page-title">4CAR 이용업체</h2> -->
							<h2 class="page-title">A-parts 이용업체</h2>
						</div>
						<!-- Page title actions -->

					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnReg">저장</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">
								<div class="card-header" style="display: none;">
									<h3 class="card-title">Horizontal form</h3>
								</div>
								<div class="card-body">
									<div style="width: 100%; margin: 0 auto;">
										<div>
											<span></span>
										</div>
										<div style="display: flex;"> 
											<div id='grid_wrap'	 style="width:70%;height:70vh;"></div>
											<div style="width:25%;height:70vh; padding-left: 5vw">
												<label>관리업체 트리</label>
												<div id='grid_wrapParent'	  style="width:100% ;height:65vh;" ></div>
											</div>
										</div>
										<div>
											<input type="button" class="btn btn-outline-info"	onclick="addRow(myGridID,'last')" value="행추가"> 
											<!-- <input	type="button" class="btn btn-outline-info"	onclick="removeRow()" value="행삭제"> --> 
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

		<!-- SR선택 팝업 -->
		<div id="dialog-form" title="거래처 선택">
			<table id="srChoice" class="ui-widget ui-widget-content pop-border-y">
				<thead>
					<tr class="ui-widget-header ">
						<th style="width: 45%;">선택</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
					</tr>
				</tbody>
			</table>
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
		<script type="text/javascript"	src="/resources/pan/js/c-cust.js?ver=1.0923.4"></script>

</body>
</html>