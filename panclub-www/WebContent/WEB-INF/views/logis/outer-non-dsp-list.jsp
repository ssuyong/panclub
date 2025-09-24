<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>

<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>외부비노출품목</title>

    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
</head>
<body class=" layout-fluid">
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
		    <div class="spinner" id="spinner"></div>
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							
							<h2 class="page-title">외부비노출품목</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnFind">조회</button>
				<button class="btn btn-primary" id="btnReg">저장</button>
				<!-- <button class="btn btn-primary" id="btn" onclick=" statusChk()">테스틍</button> -->
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">
						<div class="*col-md-6">
							<div class="card">
								
								<div class="card-body">
									<!-- <form> -->
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품ID</label>
					                      <div class="col">
					                        <input type="text" id="itemId" value="${itemId}"class="form-control" style="width:60%; max-width:300px;" placeholder="" >
					                      </div>
					                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">품번</label>
					                      <div class="col">
					                        <input type="text" id="itemNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
					                      </div>
									</div>

								</div>
								<div class="form-group mb-3 row" style="margin-top:-10px">
									<div>
										<span style="display: initial; float: right; margin-right: 10px;'">
											<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
										</span>
									</div>
								</div>
							</div>

							<div class="form-group mb-3 row">
								<div id="grid_wrap" style="width: 99.1%; height: 70vh;"></div>
							</div>
							<div class="form-footer1"></div>
						</div>
					</div>
				</div>

				<div class="form-group mb-3 row">
					<div style="margin: 2px;">
						<button class="btn btn-outline-info"
							onclick="addRow1(myGridID,'last')">행추가</button>
						<button class="btn btn-outline-info" onclick="removeRow1()">행삭제</button>
					</div>
				</div>
				<%-- <%@ include file="../icld/footer.jsp" %> --%>
			</div>
		</div>

     <!-- 상품선택 팝업 -->
	<div id="dialog-form-item" title="상품 선택" style="display:none;">
		<input type="text" id="pop_itemNo" placeholder="품번">
		<input type="text" id="pop_itemName"  placeholder="품명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
		<button class="btn btn-blue" id="btnItemAdd" onClick='openRegItemDialog()'>부품등록</button>
	  	<div id="grid_wrap_item" style=" height:90%;"></div>
	</div>
	
	<!-- Tabler Libs JS -->
	<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"			defer></script>
	<script			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"			defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"			defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"			defer></script>
	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>
	<script type="text/javascript"	src="/resources/pan/js/outer-non-dsp-list.js?ver=3.0514.4"></script>
	<script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=1.0221.4"></script>

</body>
</html>