<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<!-- <title>4car재고판매할인율</title> -->
<title>A-parts재고판매할인율</title>
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
							<!-- <h2 class="page-title">4car재고판매 할인율</h2> -->
							<h2 class="page-title">A-parts재고판매 할인율</h2>
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
                <div class="card-body"   > 
            	    <div id="grid_wrap_default" style="width:32%; height:70vh; float: left; "></div>
				    <div id="grid_wrap" style="width:32%; height:70vh; float:left;"></div>
				    <div>
						<span>선택된 거래처 할인율</span>
						<span style="font-size: 0.9em; color: #aaa; padding-left: 1%;">
							거래처명:</span> <span id="selCustName" style="margin-top: 20px;"></span> 
						<span style="font-size: 0.9em; color: #aaa; padding-left: 1%;">
							거래처코드:</span> <span id="selCustCode" style="margin-top: 20px;"></span> 
					</div>
   				 	<div id="grid_wrap2" style="width:32%; height:68vh; float: left;"></div>
   				 	<!-- <div id="grid_wrap3" style="width:32%; height:70vh;"></div> -->
				</div>
				<div style=" display: flex  ">
					<div style="width:33%; text-align: left; margin-left: 11px;">
<!-- 		              	<input type="button" class="btn btn-outline-info" onclick="addRow('#grid_wrap_base','last')" value="행추가"> -->
<!-- 		               	<input type="button" class="btn btn-outline-info" onclick="removeRow('#grid_wrap_base')" value="행삭제"> -->
		             </div> 
		              <div style="width:33%; text-align: left; margin-left: 11px;">
		              	<input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow(myGridID)" value="행삭제">
		             </div> 
		              <!--  <div  style="width:33%; text-align: left; margin-left: 18px;">
		                <input type="button" class="btn btn-outline-info" onclick="addRow(myGridID2,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow(myGridID2)" value="행삭제">
		              </div> --> 
		              <div style="width:33%; text-align: left; margin-left: 20px;">
		                <input type="button" class="btn btn-outline-info" onclick="addRow(myGridID2,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow(myGridID2)" value="행삭제">
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
		
		
		
		<!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<input type="hidden" id="grid-custCode1" name="grid-custCode1" value="">
		<input type="hidden" id="grid-custName1" name="grid-custName1" value="">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnCustFind" >조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
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
		<script type="text/javascript"			src="/resources/pan/js/out-stock-dc-rate.js?ver=1.0206.4"></script>
		<script type="text/javascript" 			src="/resources/pan/js/common-pan.js?ver=2.1107.3"></script>
</body>
</html>