<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
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
              <div class="col">
                <!-- Page pre-title -->
                <h2 class="page-title">
                  코드
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
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
                 	<div style="width:100%;margin:0 auto;">
						<div id=grid_wrap style="width:32%; height:70vh; float:left;margin-right:2%;"></div>
						<div style="margin : 2px 117px 0; width:100%; display:none; ">
                      		<input type="button" class="btn btn-outline-info" onclick="addRow2(myGridID2,'last')" value="행추가">
                      		<input type="button" class="btn btn-outline-info" onclick="removeRow2()" value="행삭제">
                      	</div>
                      
                      	<div style="width:100%;margin:0 auto;">
							<span style="font-size:0.9em; color:#aaa;"> 마스터코드:</span> <span id="dInfo_mCode" style="margin-top:20px;"></span>
							<span style="font-size:0.9em; color:#aaa; padding-left:1%;"> 마스터코드명:</span> <span id="dInfo_mCodeName" style="margin-top:20px;"></span>							
						</div>
						<div id="grid_wrap2" style="width:66%; height:70vh; float:right;"></div>
						<div style="    margin: 2px 0 0 34%;    display: inline-block;    position: initial;">
                      		<input type="button" class="btn btn-outline-info" onclick="addRow2(myGridID2,'last')" value="행추가">
                      		<input type="button" class="btn btn-outline-info" onclick="removeRow2()" value="행삭제">
                      	</div>
						<div style="clear:both;"></div>
					</div>
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
    
    <script type="text/javascript" src="/resources/pan/js/code.js?ver=6.1110.1"></script> 

  </body>
</html>