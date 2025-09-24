<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>재고 사용 현황</title>
<!-- Begin: Tab 사용 -->
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<!-- End: Tab 사용 -->

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<script type="text/javascript" src="/resources/js/spin.js"></script>
<!-- spinner -->
<!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox --> 
 
</head>
<style type="text/css">
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	  margin: 0;
	}
</style>
<script type="text/javascript">
	function updateGridRow() {  
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	item = {
		itemId: rowItem.itemId,
		itemNo: rowItem.itemNo,
		itemName: rowItem.itemName,
		itemNameEn: rowItem.itemNameEn,
		salePrice: rowItem.salePrice
		, unitPrice: rowItem.salePrice
		, cnt: 1
		, saleUnitPrice: rowItem.salePrice 
		, sumPrice: rowItem.salePrice * 1
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	
 
	} 
	//common-pan 접근용 auigrid id
	var myGridID  = "#grid_wrap1";
</script>
<body class=" layout-fluid">
	<%@ include file="../icld/header.jsp"%>
	<%@ include file="../icld/navbar.jsp"%>

	<div class="page-wrapper" > 
				<h4 id="subTitle" style="margin: 10px;">재고 사용 현황</h4> 
				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnFind"  >조회</button>
				</div>
				
				
                <div class="card" >
                  	<div class="card-header" >  
                  	
                  	 <div class="page-body"> 
 
          			  <div class="*col-md-6"> 
                  	
                  		<div class="form-group mb-3 row">
	                  		<label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">기준일</label>
	                  		<div class="row" style="display: contents;">
										    <div class="col-md-6" style="width: auto">										       
										       <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
											        <input id="startpicker-input" type="text" aria-label="Date">
											        <span class="tui-ico-date"></span>
											        <div id="startpicker-container" style="margin-left: -1px;"></div>
											    </div>
											    <span>~</span>
											    <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
											        <input id="endpicker-input" type="text" aria-label="Date">
											        <span class="tui-ico-date"></span>
											        <div id="endpicker-container" style="margin-left: -1px;"></div>
											    </div>
										    </div> 
										  
							</div>
						    <div class="col" style="margin-top: 3px;">
								<label class="form-check form-check-inline" style="margin-top: 3px"> 기간 전체조회
								<input class="form-check-input" type="checkbox" id="ymdIgnoreYN" name="ymdIgnoreYN" > </label>
							</div>	
							<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">위탁업체코드</label>
							<div class="col">
									<input type="text" id="consignCustCode" class="form-control" aria-describedby="" placeholder="위탁업체코드"
									style="display: initial; width: 48%; max-width: 100px;"
									value="${consignCustCode}" onKeyUp="findCust(this,'consignCustName');"
									ondblclick="findCust(this,'consignCustName',0,'Y');"> <input
									type="text" id="consignCustName" class="form-control"
									aria-describedby="" placeholder="위탁업체명"
									style="display: initial; width: 48%; max-width: 200px;"
									disabled>
							</div>
							 
							<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문업체코드</label>
				            <div class="col"> 
				              <input type="text" id="orderCustCode" class="form-control" aria-describedby="" placeholder="주문업체코드"
									style="display: initial; width: 48%; max-width: 100px;"
									value="${orderCustCode}" onKeyUp="findCust(this,'orderCustName');"
									ondblclick="findCust(this,'orderCustName',0,'Y');"> <input
									type="text" id="orderCustName" class="form-control"
									aria-describedby="" placeholder="주문업체명"
									style="display: initial; width: 48%; max-width: 200px;"
									disabled>
				            </div>
<!-- 							<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">납품업체코드</label> -->
<!-- 				            <div class="col">  -->
<!-- 				              <input type="text" id="rcvCustCode" class="form-control" aria-describedby="" placeholder="납품업체코드" -->
<!-- 									style="display: initial; width: 48%; max-width: 100px;" -->
<%-- 									value="${rcvCustCode}" onKeyUp="findCust(this,'rcvCustName');" --%>
<!-- 									ondblclick="findCust(this,'rcvCustName',0,'Y');"> <input -->
<!-- 									type="text" id="rcvCustName" class="form-control" -->
<!-- 									aria-describedby="" placeholder="납품업체명" -->
<!-- 									style="display: initial; width: 48%; max-width: 200px;" -->
<!-- 									disabled> -->
<!-- 				            </div> -->

							<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품ID</label>
				            <div class="col">
				              <input type="number" id="itemId" class="form-control" style="width:60%; max-width:200px;" placeholder="" >
				            </div>
							<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">품번</label>
				            <div class="col">
				              <input type="text" id="itemNo" class="form-control" style="width:60%; max-width:200px;" placeholder="" >
				            </div>
				            <% if (  ("ㄱ121").equals(comCode) ) { %>
						     <div class="col" >
											<label class="form-check form-check-inline" > P 제외하기
											<input class="form-check-input" type="checkbox" id="pIgnoreYN"
												name="pIgnoreYN" checked> </label>
									 </div>
							 <%} %> 
			          	</div>
			          	<div class="form-group mb-3 row">
	                  	  
							
				            
<!-- 							<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">품명</label> -->
<!-- 				            <div class="col"> -->
<!-- 				              <input type="text" id="itemName" class="form-control" style="width:60%; max-width:200px;" placeholder="" > -->
<!-- 				            </div> -->
			          	</div>
			          
			          	<div class="form-group mb-3 row">
	                     	<div class="col">
							<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운" style="position:absolute; ; right: 28px;">
							</div>
						</div>
					 
               	   </div>
               	  
			</div>
		</div>
               	  
        <div style="margin: 10px 10px">
	                     
<!-- 	                     <a style="display: initial; float: right; margin-right: 14px;"> (단위 : 천원)</a> -->  
	                     <div id="grid_wrap1" style="min-height: 65vh;"></div>
                   </div>
                    
              	 	 
            
        </div>
			  
		 <!-- 거래처선택 팝업 -->
					<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
						<input type="text" id="pop_cust_srch" placeholder="거래처명">
						<button class="btn btn-dark" id="btnCustFind">조회</button>
						<div id="grid_wrap_cust" style="height: 90%;"></div>
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
		
	 
		<script type="module" src="/resources/pan/js/conStockRpt.js?ver=1.0618.4"></script> 
		 <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0428/.3"></script>
	</div>
	 
</body>
</html>