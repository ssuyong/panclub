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
							<h2 class="page-title">SR목록&관리거래처</h2>
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
											<span>SR목록</span>
										</div>
										<div id=grid_wrap
											style="width: 32%; height: 70vh; float: left; margin-right: 2%;"></div>
										<div>
											<span>관리거래처</span><span
												style="font-size: 0.9em; color: #aaa; padding-left: 1%;">
												영업대표그룹구분:</span> <span id="srTypeSave" style="margin-top: 20px;"></span>
											<span
												style="font-size: 0.9em; color: #aaa; padding-left: 1%;">
												영업대표코드:</span> <span id="srCodeSave" style="margin-top: 20px;"></span>
										</div>
										<div id="grid_wrap1"
											style="width: 66%; height: 70vh; float: right;"></div>
										<div>
											<input type="button" class="btn btn-outline-info"
												onclick="addRow(myGridID,'last')" value="행추가"> <input
												type="button" class="btn btn-outline-info"
												onclick="removeRow()" value="행삭제"> <input
												type="button" class="btn btn-outline-info"
												onclick="addRow1(myGridID1,'last')" value="행추가"> <input
												type="button" class="btn btn-outline-info"
												onclick="removeRow1()" value="행삭제">
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
		<div class="modal modal-blur fade" id="modal-report" tabindex="-1"
			role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">New report</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label class="form-label">Name</label> <input type="text"
								class="form-control" name="example-text-input"
								placeholder="Your report name">
						</div>
						<label class="form-label">Report type</label>
						<div class="form-selectgroup-boxes row mb-3">
							<div class="col-lg-6">
								<label class="form-selectgroup-item"> <input
									type="radio" name="report-type" value="1"
									class="form-selectgroup-input" checked> <span
									class="form-selectgroup-label d-flex align-items-center p-3">
										<span class="me-3"> <span
											class="form-selectgroup-check"></span>
									</span> <span class="form-selectgroup-label-content"> <span
											class="form-selectgroup-title strong mb-1">Simple</span> <span
											class="d-block text-muted">Provide only basic data
												needed for the report</span>
									</span>
								</span>
								</label>
							</div>
							<div class="col-lg-6">
								<label class="form-selectgroup-item"> <input
									type="radio" name="report-type" value="1"
									class="form-selectgroup-input"> <span
									class="form-selectgroup-label d-flex align-items-center p-3">
										<span class="me-3"> <span
											class="form-selectgroup-check"></span>
									</span> <span class="form-selectgroup-label-content"> <span
											class="form-selectgroup-title strong mb-1">Advanced</span> <span
											class="d-block text-muted">Insert charts and
												additional advanced analyses to be inserted in the report</span>
									</span>
								</span>
								</label>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-8">
								<div class="mb-3">
									<label class="form-label">Report url</label>
									<div class="input-group input-group-flat">
										<span class="input-group-text">
											https://tabler.io/reports/ </span> <input type="text"
											class="form-control ps-0" value="report-01"
											autocomplete="off">
									</div>
								</div>
							</div>
							<div class="col-lg-4">
								<div class="mb-3">
									<label class="form-label">Visibility</label> <select
										class="form-select">
										<option value="1" selected>Private</option>
										<option value="2">Public</option>
										<option value="3">Hidden</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-lg-6">
								<div class="mb-3">
									<label class="form-label">Client name</label> <input
										type="text" class="form-control">
								</div>
							</div>
							<div class="col-lg-6">
								<div class="mb-3">
									<label class="form-label">Reporting period</label> <input
										type="date" class="form-control">
								</div>
							</div>
							<div class="col-lg-12">
								<div>
									<label class="form-label">Additional information</label>
									<textarea class="form-control" rows="3"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<a href="#" class="btn btn-link link-secondary"
							data-bs-dismiss="modal"> Cancel </a> <a href="#"
							class="btn btn-primary ms-auto" data-bs-dismiss="modal"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
							<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
								height="24" viewBox="0 0 24 24" stroke-width="2"
								stroke="currentColor" fill="none" stroke-linecap="round"
								stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" /></svg> Create new report
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- SR선택 팝업 -->
		<div id="dialog-form" title="SR 선택">
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
		<script type="text/javascript"
			src="/resources/pan/js/sr-list.js?ver=10.0713.3"></script>


</body>
</html>