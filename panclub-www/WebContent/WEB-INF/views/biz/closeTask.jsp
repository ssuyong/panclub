<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<title>마감경과 작업조회</title>


</head>
<body class=" layout-fluid">
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
		<h2 class="page-title" style="margin: 10px">마감경과 작업조회</h2>
		<div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <a style="margin-left: 10px">※아래 견적,발주,재고,물류 탭을 선택후 조회하면 됩니다.</a>	
        </div>
        <div class="spinner" id="spinner"></div>
		<div class="page-body">
			<div class="card" style="margin:  10px">
				<div class="form-group mb-3 row">
					<div id="iDiv_tabSet" style="margin: 10px">
						<button class="btn btn-secondary cButton_tabSelect">견적</button>
		            	<button class="btn btn-secondary cButton_tabSelect">발주</button>
		            	<button class="btn btn-secondary cButton_tabSelect">재고</button>
		            	<button class="btn btn-secondary cButton_tabSelect">물류</button>
		            	<button class="btn btn btn-primary" id="iButton_noticePopup" style="float: right; margin-right: 25px">마감기준</button>
		            				        
						 
		            </div>
<!-- 					<div id="iDiv_tabSet" style="margin: 10px; display: flex; justify-content: flex-start;"> -->
<!-- 						<label >마감업무</label>  -->
<!-- 						<input type="text" class="form-control" id = "iInput_biz" style="width: 10vw; margin-right : 15px; margin-left: 15px">    -->
<!-- 						<label >거래처코드</label>  -->
<!-- 						<input type="text" class="form-control" id = "aa" style="width: 10vw"> -->
<!-- 						<label >마감업무</label>  -->
<!-- 						<input type="text" class="form-control" id = "aa" style="width: 10vw"> -->
<!-- 						<label >마감업무</label>  -->
<!-- 						<input type="text" class="form-control" id = "aa" style="width: 10vw"> -->
					 
<!-- 		            </div> -->
	            </div>
                <div id="grid_wrap" style="height:70vh; margin: 0 10px 10px 10px"></div>
              
				<div class="alert alert-info" role="alert">
					   <div class="d-flex">
					     <div>
					       <!-- Download SVG icon from http://tabler-icons.io/i/info-circle -->
					       <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
					     </div>
					     <div>
					         * 내역 제외 대상<br><br>
					        <blockquote style="border:0">
								- 주문 -> 발주요청x(또는 창고사용요청x)<br> 
								<blockquote style="border:0">
								  . 주문마스터 메모에 '주문취소','작업취소','취소'가 등록된 경우<br>
								  . 주문디테일의 메모에 '청구만','대체품 등록된 경우<br>
								  . P의 '케이원모터스' 주문 건 
								</blockquote>
								- 입고(창고사용) -> 출고요청x <br>
								<blockquote style="border:0">
								  . 반출요청된 건<br>
								  . 주문마스터 메모에 '주문취소','작업취소','취소','수입건과같이출고예정' 등록된 경우<br>
								  . 주문디테일의 메모에 '국내X','수입','재고투입','재고X','잎스' 등록된 경우
								</blockquote>
								- 반입 -> 반출요청x <br>
								<blockquote style="border:0">
								  . 주문디테일의 메모에 '국내X','수입','재고투입','재고X','잎스' 등록된 경우<br>
								  . 반입마스터,디테일 메모에 '투입' 등록된 경우 
								</blockquote>	
							    - 발주 -> 입고x <br>
								<blockquote style="border:0">
								  . 30일이내 발주건 중에 발주 메모에 '수입' 또는 주문디테일 메모에 '국내X','수입','재고투입','재고X','잎스' 등록된 경우<br>
								</blockquote>				
							</blockquote>        
					     </div>					    
					   </div>
					</div>	
           </div>
		</div>        
        	
	</div>
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
			<%	/* CSS/JS 파일 캐시 방지 */	
				String closeTask = application.getRealPath("/resources/pan/js/closeTask.js");	
				File closeTaskFile = new File(closeTask);	
				Date lastModified_closeTaskFile = new Date(closeTaskFile.lastModified());  	
				
			 
				
				
				SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			%>		
	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
	<!-- Tabler Libs JS -->
	<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
		defer></script>
	<script
		src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
		defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
		defer></script>
	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>
	<!-- 		팝업매니저js 헤더로 옴김 -->
<!-- 	<script type="text/javascript"			src="/resources/pan/js/noticePopupManager.js?ver=1.0729.4"></script> -->
	<script type="text/javascript" src="/resources/pan/js/closeTask.js?ver=<%=fmt.format(lastModified_closeTaskFile)%>"></script> 

</body>
</html>