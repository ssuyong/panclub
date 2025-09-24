<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
	
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
  <title>보험사 할인율</title>    
  </head>
  <body  class=" layout-fluid">
    <div class="page">

      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
                <h2 class="page-title">
                  보험사 할인율
                </h2>
        
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnInsurDcRateFind">조회</button>
            <button class="btn btn-primary" id="btnInsurDcRateReg">저장</button>
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
            <div class="*col-md-6">
              <div class="card">
                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 30px; width:auto;">보험사</label>
                      <div class="col">
                        <select id="insurCode" class="form-select" style="width:auto; padding:2px 20px 2px 0; ">
                          <option value=""></option>
                        </select>
                        <label class="col-3 col-form-label" style="min-width: 30px; width:auto; font-size: 10px">*거래처의 경우 거래처 정보에 'AOS보험사코드'가 등록된 업체만 노출됩니다. </label>
                      </div> 
                      <label class="col-3 col-form-label" style="min-width: 30px; width:auto;">완성차브랜드</label>
                      <div class="col">
                        <select id="makerCode" class="form-select" style="width:auto; padding:2px 20px 2px 0; ">
                          <option value=""></option>
                        </select>
                      </div>
                      <div class="col" >
						<label class="form-check form-check-inline" > 현재 할인율만 보기
							<input class="form-check-input" type="checkbox" id="ymdIgnoreYN" name="curInsurDcRateYN" checked="checked"> 
						</label>
					  </div>
                </div>
                
              </div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
              <div>
              	<button class="btn btn-outline-info" onclick="addRow(myGridID,'last')" >행추가</button> 
              </div>
              	             
            </div>  

          </div>
        </div>
        
      </div>
     
      </div>
    </div>
    </div>
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    <script type="text/javascript" src="/resources/pan/js/insurDc-list.js?ver=1.0113.3"></script> 

  </body>
</html>