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
<title>창고별재고현황</title>
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
							<h2 class="page-title">창고별 재고 현황</h2>
						</div>
						<!-- Page title actions -->
						<div class="col-12 col-md-auto ms-auto d-print-none"
							style="display: none;">
							<div class="btn-list">
								<span class="d-none d-sm-inline"> <a href="#"
									class="btn btn-white"> New view </a>
								</span> <a href="#" class="btn btn-primary d-none d-sm-inline-block"
									data-bs-toggle="modal" data-bs-target="#modal-report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
										height="24" viewBox="0 0 24 24" stroke-width="2"
										stroke="currentColor" fill="none" stroke-linecap="round"
										stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" /></svg> Create new report
								</a> <a href="#" class="btn btn-primary d-sm-none btn-icon"
									data-bs-toggle="modal" data-bs-target="#modal-report"
									aria-label="Create new report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
										height="24" viewBox="0 0 24 24" stroke-width="2"
										stroke="currentColor" fill="none" stroke-linecap="round"
										stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" /></svg>
								</a>
							</div>
						</div>
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
								<div class="card-header" style="display: none;">
									<h3 class="card-title">Horizontal form</h3>
								</div>
								<div class="card-body">
									<div class="form-group mb-3 row">
					                	<label class="col-3 col-form-label" style="min-width: 118px; width: auto;">창고코드</label>
											<div class="col">
											<input type="text" id="storageCode" class="form-control"aria-describedby="" placeholder="" style="width: 60%; max-width: 300px;">
											</div>
										<label class="col-3 col-form-label" style="min-width: 118px; width: auto;">창고명</label>
											<div class="col">
											<input type="text" id="storageName" class="form-control"aria-describedby="" placeholder="" style="width: 60%; max-width: 300px;">
											</div>
											<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">창고구분</label>
								                      <div class="col">
								                       <select class="form-select" id="storType"  style="width:60%; max-width:200px;">
								                      		<option></option>
								                      	</select>
								                      </div>
										<!-- 	<label class="col-3 col-form-label" style="min-width: 118px; width: auto;">부품ID</label>
											<div class="col">
											<input type="text" id="itemId" class="form-control"aria-describedby="" placeholder="" style="width: 60%; max-width: 300px;">
											</div>				 -->
						
									
					                    <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">출고대기창고 여부</label>      
					                   	 <div class="col">
					                      	<select  class="form-select"  id="rlStandByYN" style="width:30%; max-width:80px;">
					                      		<option></option>
					                      		<option>Y</option>
					                      		<option>N</option>
					                      	</select>
					                      </div>	
					 
					                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매가능창고여부</label>                    
					                     	 <div class="col">  
					                         	<select  class="form-select"   id="workableYN" style="width:30%; max-width:80px;">
					                      		<option></option>
					                      		<option>Y</option>
					                      		<option>N</option>
					                      	</select>
					                     </div> 	
					
					                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">수탁창고여부</label>                    
					                     	 <div class="col">  
					                         	<select  class="form-select"   id="consignYN" style="width:30%; max-width:80px;">
					                      		<option></option>
					                      		<option>Y</option>
					                      		<option>N</option>
					                      	</select>
					                     </div> 	
					                     
					                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">외부비노출</label>                    
					                     	 <div class="col">  
					                         	<select  class="form-select"   id="consignViewYN" style="width:30%; max-width:80px;">
					                      		<option></option>
					                      		<option>Y</option>
					                      		<option>N</option>
					                      	</select>
					                     </div> 	
					                     					                                           		
					                    	<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">사용여부</label>             
					                    	 <div class="col">         
						                      	<select class="form-select"  id="validYN" style="width:30%; max-width:80px;">
						                      		<option></option>
						                      		<option>Y</option>
						                      		<option>N</option>
						                      	</select>	
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
							
							
							<div class="alert alert-info" role="alert">
							<div class="d-flex">
							     <div>
							       <!-- Download SVG icon from http://tabler-icons.io/i/info-circle -->
							       <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
							     </div>
							     <div>
							       - 사용여부에 'N'으로 체크된 창고와 랙의 재고도 포함되어 있습니다.<br>
							       - 재고목록의 경우 판매가능수량에 불량창고와 사용안하는 창고/랙이 제외됩니다. 따라서, 이 메뉴와 금액 차이가 존재합니다.
							       - 창고코드 579 외부대전-코리아파츠창고-신품의 경우 센터가합계가 판매가의 합계로 표시됩니다.(AM부품인 관계로..)
							     </div>
							    
							   </div>
							</div>
							
							<div class="form-footer1"></div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>
		<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
		<script type="text/javascript" 		src="/resources/pan/js/stor-stock-rpt.js?ver=1.1015.4"></script>
		    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.1222.3"></script>
</body>
</html>