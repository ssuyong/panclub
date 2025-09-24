<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>창고내역</title>
    
      
  </head>
  <body  class=" layout-fluid">
    <div class="page">
      
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
        <div class="container-xl">
          
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                
                <div class="page-pretitle" style="display:none;">
                  요약
                </div>
                <h2 class="page-title">
                  창고내역
                </h2>
              </div>
              <!-- Page title actions -->
              <div class="col-12 col-md-auto ms-auto d-print-none" style="display:none;">
                <div class="btn-list">
                  <span class="d-none d-sm-inline">
                    <a href="#" class="btn btn-white">
                      New view
                    </a>
                  </span>
                  <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                    <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Create new report
                  </a>
                  <a href="#" class="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal" data-bs-target="#modal-report" aria-label="Create new report">
                    <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <button class="btn btn-primary" id="btnReg">저장</button>      
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">
                <div class="card-header" style="display:none;">
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
                     
                                           		
                    	<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">사용여부</label>             
                    	 <div class="col">         
	                      	<select class="form-select"  id="validYN" style="width:30%; max-width:80px;">
	                      		<option></option>
	                      		<option selected>Y</option>
	                      		<option>N</option>
	                      	</select>	
	                      </div> 	 	
               

                
              </div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
              <div style="margin : 2px;">
                      	<button class="btn btn-outline-info" onclick="addRow(myGridID,'last')" >행추가</button>
            			<!-- <button class="btn btn-outline-info" onclick="removeRow()" >행삭제</button> -->
              </div>
            </div>  

            <div class="form-footer1">
            </div>
          </div>
        </div>
        
      </div>
        
        <%-- <%@ include file="../icld/footer.jsp" %> --%>
        
      </div>
    </div>
    <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New report</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" name="example-text-input" placeholder="Your report name">
            </div>
            <label class="form-label">Report type</label>
            <div class="form-selectgroup-boxes row mb-3">
              <div class="col-lg-6">
                <label class="form-selectgroup-item">
                  <input type="radio" name="report-type" value="1" class="form-selectgroup-input" checked>
                  <span class="form-selectgroup-label d-flex align-items-center p-3">
                    <span class="me-3">
                      <span class="form-selectgroup-check"></span>
                    </span>
                    <span class="form-selectgroup-label-content">
                      <span class="form-selectgroup-title strong mb-1">Simple</span>
                      <span class="d-block text-muted">Provide only basic data needed for the report</span>
                    </span>
                  </span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="form-selectgroup-item">
                  <input type="radio" name="report-type" value="1" class="form-selectgroup-input">
                  <span class="form-selectgroup-label d-flex align-items-center p-3">
                    <span class="me-3">
                      <span class="form-selectgroup-check"></span>
                    </span>
                    <span class="form-selectgroup-label-content">
                      <span class="form-selectgroup-title strong mb-1">Advanced</span>
                      <span class="d-block text-muted">Insert charts and additional advanced analyses to be inserted in the report</span>
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
                      https://tabler.io/reports/
                    </span>
                    <input type="text" class="form-control ps-0"  value="report-01" autocomplete="off">
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <label class="form-label">Visibility</label>
                  <select class="form-select">
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
                  <label class="form-label">Client name</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Reporting period</label>
                  <input type="date" class="form-control">
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
            <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
              Cancel
            </a>
            <a href="#" class="btn btn-primary ms-auto" data-bs-dismiss="modal">
              <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Create new report
            </a>
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
	
	
	  
    <!-- 부서팝업 정동근 추가 -->
   <!--  <div id="dialog-form" title="부서 선택">
	  <table id="users" class="ui-widget ui-widget-content pop-border-y">
	    <thead>
	      <tr class="ui-widget-header ">
	        <th style="width:45%;">선택</th>
	      </tr>
	    </thead>
	    <tbody>
	    	<tr><td></td></tr>
	    </tbody>
	  </table>
	</div>
     -->
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    	<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
     <script type="text/javascript" src="/resources/pan/js/storage-list.js?ver=9.1015.4"></script> 
     <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=9.1108.3"></script> 

  </body>
</html>