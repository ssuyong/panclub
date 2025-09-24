<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>


<!DOCTYPE html>
<html>
<head>
<title>주문 방법 및 브랜드 할인율 알림</title>
 <link href="/resources/dist/css/tabler.min.css" rel="stylesheet"/> 

 

</head>
<body> 
	<script type="text/javascript">
		function setCookieWeekNopenPopup() {
			var date = new Date();
			var cookieName = 'sele_Brand_dc_rate_popup_isWeekNopen';
		    date.setTime(date.getTime() +604800000);  // 604800000 = 1주일
		    document.cookie = cookieName+'=true'  + ';expires=' + date.toUTCString() + ';path=/'; 
		
		} 
    </script>
	
	<div class="page page-center">
		<div style="margin:  0px 65px; ">
		
			<h1  align="center" >안내</h1>
			<p style="font-size: 15px">부품 구매 시 가격기준과 거래방법은 아래와 같습니다.<br/>추후, 주문 시스템을 순차적으로 적용해 나갈 예정입니다.</p>
			<h2 align="center">- 아래 -<h2 >
			
		</div>
		<h3 style="margin: 0px 65px;">1. 가격 기준 </h3 > 
		<div align="center">
			<img
				src="https://img.4car.co.kr/%E3%84%B1000/notice/sale_brand_dc_rate_20231124.png
		" width="191" height="348"/>
		</div>
		<div style="margin: 0px 65px;">
			<h3 >2. 거래방법 </h3 >   
			 	<a>① 구매하고자 하는 부품의 </a><b style="font-size: 15px">재고</b><a>를 </a><b style="font-size: 15px">조회</b><a>합니다.</a><br/>
			 	<a>② 4CAR </a><b style="font-size: 15px">단톡방</b><a>에 부품 구매를 </a><b style="font-size: 15px">요청</b><a>합니다.</a> <br/>
			 	<a>③ 담당자가 확인 후 부품을 </a><b style="font-size: 15px">배송</b><a>해드립니다.</a>	
		</div>
		<div align="center" style="padding: 10px 0px">
			<label>일주일 팝업 다시 보지 않기</label>
			<input id="isWeekNopen" type="checkbox" value=false/>
			<button class ="btn btn-primary"  onclick="if(document.getElementById('isWeekNopen').checked){setCookieWeekNopenPopup(); }; self.close();" >닫기</button>
	 	</div>
	 	
		 
	</div>


</body>
</html>