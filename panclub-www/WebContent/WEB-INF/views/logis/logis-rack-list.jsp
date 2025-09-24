<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>    
    <link href="/resources/pan/css/barcodePrint.css?ver=1.0614.4" rel="stylesheet" />      
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
                <h2 class="page-title">
                  물류센터 기본랙
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <button class="btn btn-primary" id="btnReg">저장</button>
             <!-- <button class="btn btn-primary" id="btnPrint">인쇄</button>         -->
             <input type="text" id="comCode" style="  display: none;">
             
        </div>
        <div class="form-group mb-3 row" style="margin-top:-10px">
			<div >
				<span style="display: initial; float: right; margin-right: 10px;'">
					<input type="button" class="btn btn-secondary " onclick="barcodePrintRack()" value="바코드인쇄">
					<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
				</span>
			</div>
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
                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">물류센터</label>
                      <div class="col">
                      <input type="text" list="logisCode" id="logisText" class="barcodeReaderInput_logisRack_logisCode">
                       <datalist id="logisCode"  style="width:60%; max-width:200px;">
                      		<option></option>
                      	</datalist >
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">기본랙ID</label>
                       <div class="col">
                        <input type="text" id="logisRackId" class="form-control barcodeReaderInput_logisRack_logisRackId" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                        <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">기본랙명</label>
                       <div class="col">
                        <input type="text" id="logisRackName" class="form-control barcodeReaderInput_logisRack_logisRackName" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
              <div >
                <button class="btn btn-outline-info" onclick="addRow(myGridID,'last')" >행추가</button>
            	<button class="btn btn-outline-info" onclick="removeRow()" >행삭제</button>
              </div>
            </div>  

            <div class="form-footer1">
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </div>
    
	<!--  바코드 인쇄에서 사용되는 div  -->
	<input type="text" id="barcodeInput"  style="position:relative; left:-2000px; top:-100000px;">
    	<div id="barcodePrintDiv"> </div>
    <!-- Tabler Libs JS -->
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
	<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=1.0507.4"></script>
    
     <script type="text/javascript" src="/resources/pan/js/logis-rack-list.js?ver=4.0610.4"></script> 
     <script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=1.0821.3"></script>

  </body>
</html>