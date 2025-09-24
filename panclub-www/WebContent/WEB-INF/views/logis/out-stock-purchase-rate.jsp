<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>수주업체매입율</title>
	<!-- Aui 인쇄 -->
	<script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
	<!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>	
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">		
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	<!-- spinner -->
	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->
	<!-- fancyBox -->
	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
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
							<h2 class="page-title">수주업체 매입율</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<!-- <button class="btn btn-primary" id="btnFind">조회</button> -->
				<button class="btn btn-primary" id="btnReg">저장</button>
				<!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
				<!-- <button class="btn btn-primary" id="btnUpt">수동처리</button>  -->
			</div>
			<div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">
                <div class="card-header" style="display:none;">
                  <h3 class="card-title">Horizontal form</h3>
                </div>
                <div>
                	<input type="hidden" name="selectCustCode" id="selectCustCode" value="${selectCustCode}" >
                  	
                </div>
                <div class="card-body" style="display: flex; justify-content: space-between; flex-direction: row;">
				    <div id="grid_wrap" style="width:32%; height:70vh;"></div>
   				 	<div id="grid_wrap2" style="width:32%; height:70vh;"></div>
   				 	<div id="grid_wrap3" style="width:32%; height:70vh;"></div>
				</div>
				<div style=" display: flex  ">
		              <div style="width:33%; text-align: left; margin-left: 11px;">
		              	<input type="button" class="btn btn-outline-info" onclick="addRow(myGridID1,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow(myGridID1)" value="행삭제">
		             </div> 
		               <div  style="width:33%; text-align: left; margin-left: 18px;">
		                <input type="button" class="btn btn-outline-info" onclick="addRow(myGridID2,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow(myGridID2)" value="행삭제">
		              </div> 
		              <div style="width:33%; text-align: left; margin-left: 20px;">
		                <input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow(myGridID)" value="행삭제">
		               	</div> 
              </div>
                
              </div>

            </div>
          </div>
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
		
		<!--230308 장윤상 아이템 등록 dialog -->
	<div id="dialog-form-RItem" title="부품등록" style="display: none;">

		<div style="padding: 0 0 10px 14px;">
			<button class="btn btn-primary" id="btnRegItemDialog">저장</button>
			<button class="btn btn-primary  " id="btnCloseItemDialog">닫기</button>
		</div>

		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards">

					<div class="*col-md-6">
						<div class="card">

							<div class="card-body">
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">제조사</label>
									<div class="col">
										<select id="makerCodeReg" class="form-select"
											style="width: auto; padding: 2px 20px 2px 0;"> <!--onChange='fn_itemCodeCreate()'  -->
											<option value=""></option>
										</select>
									</div>
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">차종</label>
									<div class="col">
										<input type="text" id="carTypeReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">품번</label>
									<div class="col">
										<input type="text" id="itemNoReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">공장품번</label>
									<div class="col">
										<input type="text" id="factoryNoReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">부품명</label>
									<div class="col">
										<input type="text" id="itemNameReg" class="form-control"
											style="*width: 60%; max-width: 800px;" placeholder="">
									</div>
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label"
										style="min-width: 118px; width: auto;">영문부품명</label>
									<div class="col">
										<input type="text" id="itemNameEnReg" class="form-control"
											style="*width: 60%; max-width: 800px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">

									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">클래스</label>
									<div class="col">
										<select id="classCodeReg" class="form-select"
											style="width: auto; padding: 2px 25px 2px 0;"> <!-- onChange='fn_itemCodeCreate()' -->
											<option value="GN">정품</option>
											<option value="AM">애프터마켓</option>
											<option value="RM">재제조</option>
											<option value="ET">기타</option>
										</select>
									</div>
								</div>

								<div class="form-group mb-3 row" style="*min-width: 30px;">
									<label class="col-3 col-form-label" style="min-width: 118px; width: auto; ">센터가</label>
									<div class="col">
										<input type="number" id="centerPriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: inline-block;"
											placeholder="">원

									</div>
									<label class="col-3 col-form-label" style="min-width: 70px; width: auto; ">입고단가</label>
									<div class="col">
										<input type="number" id="inPriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: initial;"
											placeholder="">원
									</div>
									<label class="col-3 col-form-label" style="min-width: 70px; width: auto; ">판매단가</label>
									<div class="col">
										<input type="number" id="salePriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: initial;"
											placeholder="">원
									</div>
									<label class="col-3 col-form-label"
										style="min-width: 118px; width: auto;">&nbsp</label>
									<div class="col">&nbsp;</div>
								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Tabler Libs JS -->
		<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"			defer></script>
		<script			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"			defer></script>
		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>
		<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
		<script type="text/javascript"			src="/resources/pan/js/out-stock-purchase-rate.js?ver=1.0523.4"></script>
		<script type="text/javascript" 			src="/resources/pan/js/common-pan.js?ver=2.0523.4"></script>
</body>
</html>