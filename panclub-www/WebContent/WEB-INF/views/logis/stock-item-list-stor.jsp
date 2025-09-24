<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>창고별 재고 목록</title>
<!-- Aui 인쇄 -->
<script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
<!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>

<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">
	
<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->
<!-- 토스트 트리 -->
<script src="https://uicdn.toast.com/tui-tree/latest/tui-tree.js"></script>

<link
  rel="stylesheet"
  type="text/css"
  href="https://uicdn.toast.com/tui-tree/latest/tui-tree.css"
/>
<!--  -->

<!-- fancyBox -->
<script type="text/javascript"
	src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript"
	src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
<!-- fancyBox -->

</head>
<style type="text/css">
	/* 커스텀 일부완료 색스타일 */
	.ti-ico-green,
	.ti-ico-red,
	.ti-ico-blue 
	{
	  overflow: hidden;
	  display: inline-block;
	 
	  line-height: 300px;
	  vertical-align: top;
	  width: 9px;
	  height: 14px;
	  background: green;
	  background-position: 0px -32px;
	  margin: 0 9px 0 2px;
	}
	.ti-ico-green  {
	  background: green;
	}
	.ti-ico-red {
	  background: red;
	} 
	.ti-ico-blue {
	  background: blue;
	} 
	#tree::-webkit-scrollbar , 
	.tui-tree::-webkit-scrollbar
	{
		width: 15px; 
		height: 15px;
	}
    .tui-tree-wrap
    {
    	padding: 0px;
    }	
    #tree>ul.tui-tree
    {
	    height:100%;
    }
    .tui-tree-content-wrapper
    {
	    width:max-content;
	    max-width: 1000px;
    }
    .tree-stor>span.tui-tree-text 
    {
    	overflow: visible;
    } 
</style>

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
							<h2 class="page-title">창고별 재고 목록</h2>
						</div>
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
							 
							<!-- 창고다중선택 -->
							<div class="form-group mb-3 row"   style="float:left; width: 320px;  ">
						 		<div style="padding:3px">
								    	<input type="radio"	value="itemId" name="srchType" id="" class="" 
								    		style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" ><span style="padding-right: 12px;">부품ID단위</span> 
								    	<input type="radio"	value="stor" name="srchType" id="" class="" 
								    	 	style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" checked><span>창고단위</span>
								    	<button id="treeReset" 
									       style="float:right; font-size: 13px; width: 70px; border: 1px solid #aaa; background-color: #fff; border-radius: 3px; color:#555; ">
									       체크해제
								        </button>
								    	</div>
								<div id="tree" style="float:left; width: 320px; background-color:white;   border:1px solid #C5DBEC;  height:70vh; overflow:auto;" class="tui-tree-wrap" ></div>
								 	
						 	</div>
							<!--  -->

							<div class="form-group mb-3 row">
								<div style="margin: 2px 0px 0;">
									<span> 
										<input type="button" id="btnUpt" class="btn btn-secondary" value="수동처리" style="margin-left: 5px">
										
									</span>
									<span style=" display: initial; float: right;">
				                      	<input type="button" class="btn btn-secondary" onclick="popLink('/logis/stock-rack-list')" value="랙별재고">
				                      	<input type="button" class="btn btn-secondary" onclick="popLink('/logis/stock-actions-list')" value="재고이력">	
				                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="partsmallexportTo()" value="엑셀 다운(파츠몰)">	
				                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">			                      	                     	
			                      	</span>
								</div>
															
								<div id="grid_wrap" style="width: 99.1%; height: 70vh; margin-left: 5px"></div>
							</div>

							<div class="form-footer1"></div>
						</div>
					</div>

				</div>

				<%-- <%@ include file="../icld/footer.jsp" %> --%>

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
		<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
		<script type="text/javascript"			src="/resources/pan/js/stock-item-list-stor.js?ver=1.0318.4"></script>
		<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.1010.3"></script> 
		<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%>
</body>
</html>