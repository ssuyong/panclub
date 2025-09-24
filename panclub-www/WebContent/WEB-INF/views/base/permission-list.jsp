<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    
    <title>권한 관리</title>
      
  </head>
  <body  class=" layout-fluid">
    <div class="page">
      
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
        <div class="container-xl">
          
          <h2 class="page-title" style="margin-top: 7px; margin-bottom: 7px">권한 관리</h2>
                
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" onclick="btnSave()">저장</button>
                     
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 			
 			<div style="padding-top :5px; margin-left: 10px;">
 				<ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" >
                      <li class="nav-item">
                        <a href="#tab1" class="nav-link active tabSelecter" data-bs-toggle="tab" id="tab1Select">템플릿설정</a>
                      </li>
                      <li class="nav-item">
                        <a href="#tab2" class="nav-link tabSelecter" data-bs-toggle="tab" id="tab2Select">사용자별권한</a>
                      </li>
                      <li class="nav-item">
                        <a href="#tab3" class="nav-link tabSelecter" data-bs-toggle="tab" id="tab3Select">권한별사용자</a>
                      </li>
               </ul>
 			
 			</div>
 			
            <div class="*col-md-6">
              
                
              </div>
            </div>
				
		
			<!-- tab1 -->
			<div class="permissionTab show" id="tab1"> 
	            <div class="form-group mb-3 row">
	             	<div id="grid_wrap_template" style="width:35vw;height:75vh;"></div>
	             	<div style="width:60vw;height:75vh; margin-left: 3vw">
	             		<div style="height: 2vh"> 
	             			<span>선택된 템플릿 : </span>
	             			<span id="selectTemplate">없음</span> 
	             		</div>
	             		<div id="grid_wrap_templatePermission" style="width:60vw;height:73vh; "></div>
	             	</div>
	             	<div style="margin : 2px;">
	                      	<button class="btn btn-outline-info" onclick="AUIGrid.addRow('#grid_wrap_template',{},'last')" >행추가</button>
	            			<button class="btn btn-outline-info" onclick="AUIGrid.removeRow('#grid_wrap_template', 'selectedIndex')" >행삭제</button>
	             	</div>
	            </div>  
            </div>
           
            <!-- tab2 -->
			<div class="permissionTab" id="tab2" style="display: none;"> 
	            <div class="form-group mb-3 row">
	              <div id="grid_wrap_user" style="width:35vw;height:75vh;"></div>
	              <div style="width:60vw;height:75vh; margin-left: 3vw">
	             		<div style="height: 2vh; display:  flex; justify-content: space-between; margin-bottom: 10px"> 
	             			<div>
		             			<span>선택된 유저 : </span>
		             			<span id="selectUser">없음</span> 
	             			</div>
	             			<div  >
		             			<span>선택된 템플릿 : </span>
		             			<select class="templateSelect userTemplate" style="width: 120px">
		             				<option></option>
		             			</select>
	             			</div>
	             		</div>
	             		<div id="grid_wrap_userPermission" style="width:60vw;height:73vh; "></div>
	              </div>
	            </div>  
            </div>
          
            <!-- tab3 -->
			<div class="permissionTab" id="tab3" style="display: none;"> 
	            <div class="form-group mb-3 row">
	              <div id="grid_wrap_pu" style="width:50vw;height:75vh;"></div>
	              <div style="width:45vw;height:75vh; margin-left: 3vw">
	             		<div style="height: 2vh; display:  flex; justify-content: space-between; margin-bottom: 10px"> 
	             			<div>
		             			<span>선택된 권한 : </span>
		             			<span id="selectPu">없음</span> 
	             			</div> 
	             		</div>
	             		<div id="grid_wrap_puPermission" style="width:60vw;height:73vh; "></div>
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

     <script type="text/javascript" src="/resources/pan/js/permission-list.js?ver=1.1010.4"></script> 
        
  </body>
</html>