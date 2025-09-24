<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>

	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
  <!-- Begin: Tab 사용 -->	 	
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <!-- End: Tab 사용 -->

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
							<h2 class="page-title">환경설정</h2>
						</div>
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnReg">저장</button>
				<% if ( ("ㄱ000").equals(comCode) || ("ㄱ121").equals(comCode)) { %>
				
				    <button class="btn btn-google"  id="btnStUpdate" style="float: right; margin: 0px 10px" >
				    <img  src="data:image/svg+xml,%3Csvg%20%20xmlns=%22http://www.w3.org/2000/svg%22%20%20width=%2224%22%20%20height=%2224%22%20%20viewBox=%220%200%2024%2024%22%20%20fill=%22none%22%20%20stroke=%22currentColor%22%20%20stroke-width=%221.5%22%20%20stroke-linecap=%22round%22%20%20stroke-linejoin=%22round%22%20%20class=%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-database-search%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M4%206c0%201.657%203.582%203%208%203s8%20-1.343%208%20-3s-3.582%20-3%20-8%20-3s-8%201.343%20-8%203%22%20/%3E%3Cpath%20d=%22M4%206v6c0%201.657%203.582%203%208%203m8%20-3.5v-5.5%22%20/%3E%3Cpath%20d=%22M4%2012v6c0%201.657%203.582%203%208%203%22%20/%3E%3Cpath%20d=%22M18%2018m-3%200a3%203%200%201%200%206%200a3%203%200%201%200%20-6%200%22%20/%3E%3Cpath%20d=%22M20.2%2020.2l1.8%201.8%22%20/%3E%3C/svg%3E">
				    </button>	
 				<%} %> 
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
								
								<div id="tabs">
								  <ul>
								    <li><a href="#tabs-1">도매 거래처</a></li>
								    <li ><a href="#tabs-2">위탁판매 설정</a></li>
								    <li ><a href="#tabs-3">업체관계사</a></li> 
								    <li ><a href="#tabs-4">주문연동설정</a></li> 
								  </ul>
								  <div id="tabs-1">
								    <p>주요 도매거래처의 거래처코드를 입력해야 견적/주문의 재고확인에서 해당 업체의 정보를 셋팅할 수 있습니다.</p>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">파츠몰</label>
										<div class="col">
					                        <input type="text" id="partsmallCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${partsmallCustCode}" required onKeyUp="findCust(this,'partsmallCustName');" ondblclick="findCust(this,'partsmallCustName',0,'Y');">
					                        <input type="text" id="partsmallCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
					                  	</div>      
										<div id="wrapper1" style="margin-top: 10px;"></div>
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">글로젠</label>
										<div class="col">
					                        <input type="text" id="glozenCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${glozenCustCode}" required onKeyUp="findCust(this,'glozenCustName');" ondblclick="findCust(this,'glozenCustName',0,'Y');">
					                        <input type="text" id="glozenCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
					                  	</div> 
										<div id="wrapper1" style="margin-top: 10px;"></div>
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">한라</label>
										<div class="col">
					                        <input type="text" id="hallaCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${hallaCustCode}" required onKeyUp="findCust(this,'hallaCustName');" ondblclick="findCust(this,'hallaCustName',0,'Y');">
					                        <input type="text" id="hallaCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
					                  	</div> 
										<div id="wrapper1" style="margin-top: 10px;"></div>
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">SK</label>
										<div class="col">
					                        <input type="text" id="skCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${skCustCode}" required onKeyUp="findCust(this,'skCustName');" ondblclick="findCust(this,'skCustName',0,'Y');">
					                        <input type="text" id="skCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
					                  	</div> 
										<div id="wrapper1" style="margin-top: 10px;"></div>
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">DEKO</label>
										<div class="col">
					                        <input type="text" id="dekoCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${dekoCustCode}" required onKeyUp="findCust(this,'dekoCustName');" ondblclick="findCust(this,'dekoCustName',0,'Y');">
					                        <input type="text" id="dekoCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
					                  	</div> 
										<div id="wrapper1" style="margin-top: 10px;"></div>
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">EAPS</label>
										<div class="col">
					                        <input type="text" id="eapsCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${eapsCustCode}" required onKeyUp="findCust(this,'eapsCustName');" ondblclick="findCust(this,'eapsCustName',0,'Y');">
					                        <input type="text" id="eapsCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
					                  	</div> 
										<div id="wrapper1" style="margin-top: 10px;"></div>										
									</div>	 				   
								 </div>
								 
								 <div id="tabs-2">
									<div class="form-group mb-3 row" style="padding: 20px 0px ;">
									 	<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;" >● 위탁판매업체</label>
										<div class="col">
						                    <input type="text" id="stockConsignCustCode" class="form-control" aria-describedby="" placeholder="위탁판매업체코드" style="display:initial;width:48%; max-width:100px;"  required onKeyUp="findCust(this,'stockConsignCustName');" ondblclick="findCust(this,'stockConsignCustName',0,'Y');">
						                    <input type="text" id="stockConsignCustName" class="form-control" aria-describedby="" placeholder="위탁판매업체명" style="display:initial;width:48%; max-width:200px;" disabled>
						                </div>    
						            </div>
								    
									<div class="form-group mb-3 row">
										<p style="margin-bottom: 1px;">● 수탁업체의 센터가 대비 기본 매입율을 설정합니다.</p>
										<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">기본 매입율</label>
										<div class="col">
					                        <input type="number" id="cCustRate" class="form-control" aria-describedby="" placeholder="기본매입율" style="display:initial;width:48%; max-width:80px; padding-right: 10px;" value="${cCustRate}" required>
					                  	</div>
					                </div>	  
					                
					                <div class="form-group mb-3 row">
					                	<!-- <p style="margin-top: 20px; margin-bottom: 1px;">● 4car재고판매 센터가 기준일때 기본 할인율을 설정합니다.</p> -->
					                	<p style="margin-top: 20px; margin-bottom: 1px;">● A-parts 재고판매 센터가 기준일때 기본 할인율을 설정합니다.</p>
					           		    <label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">기본 할인율</label>
										<div class="col">
					                        <input type="number" id="saleDcRate" class="form-control" aria-describedby="" placeholder="기본할인율" style="display:initial;width:48%; max-width:80px; padding-right: 10px;" >
					                  	</div>  
					                </div>	
					                
					                <div class="form-group mb-3 row">
					             	   <!-- <p style="margin-top: 20px; margin-bottom: 1px;">● 4car재고판매 매입가 기준일때 기본 마진율을 설정합니다.</p> -->
					             	   <p style="margin-top: 20px; margin-bottom: 1px;">● A-parts 재고판매 매입가 기준일때 기본 마진율을 설정합니다.</p>
					                  	<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;">기본 마진율</label>
										<div class="col">
					                        <input type="number" id="saleMarginRate" class="form-control" aria-describedby="" placeholder="기본마진율" style="display:initial;width:48%; max-width:80px; padding-right: 10px;" >
					                  	</div>               
										<div id="wrapper1" style="margin-top: 10px;"></div>
									 </div>	
								 </div>
								 
								  <div id="tabs-3">
								  	<div class="form-group mb-3 row" style="padding: 20px 0px ;">
									 	<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;" >● 상위관리회사</label>
										<div class="col">
						                    <input type="text" id="iInput_parentComName" class="form-control" aria-describedby="" placeholder="" style="display:initial;width:48%; max-width:200px;" disabled> 
						                </div>    
						            </div>
								  	<div class="form-group mb-3 row" style="padding: 20px 0px ;">
									 	<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;" >● 관리중인 회사</label>
										<div class="col" id="iDiv_childComName">
						                      
						                </div>    
						            </div>
								  </div>
								  
								  <div id="tabs-4">
								  	<div class="form-group mb-3 row" style="padding: 20px 0px ;">
									 	<label class="col-3 col-form-label"	style="min-width: 118px; width: auto;" >● 주문연동업체설정</label>
										<div class="col"> 
					             			<select id="iSelect_orderReqCustInfo" style="width: 200px">
					             				<option></option>
					             			</select>
						                </div>    
						            </div>
								  </div>
								  
								</div>
								</div>
							</div>


							<div class="form-footer1"></div>
						</div>
					</div>
				</div>
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
		<script type="text/javascript"			src="/resources/pan/js/config.js?ver=1.1022.4"></script>
		    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.0427.3"></script> 
</body>
</html>