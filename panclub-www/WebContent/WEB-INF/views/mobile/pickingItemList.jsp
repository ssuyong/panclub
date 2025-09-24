<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<meta name="viewport" content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;" />
<!doctype html>

<html>
<head> 
 <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
 
 <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>  
<link href="/resources/dist/css/tabler.css" rel="stylesheet" />
<link href="/resources/panMobile/css/mobile.css?ver=2.0624.4" rel="stylesheet" />
</head>
<body class="body" style="overscroll-behavior-y:contain;">
	
 	<div class ="cDiv_title">
 		<button   onclick="pageMove('back')">
 		<img src="data:image/svg+xml,%3Csvg%20%20xmlns=%22http://www.w3.org/2000/svg%22%20%20width=%2224%22%20%20height=%2224%22%20%20viewBox=%220%200%2024%2024%22%20%20fill=%22none%22%20%20stroke=%22currentColor%22%20%20stroke-width=%222%22%20%20stroke-linecap=%22round%22%20%20stroke-linejoin=%22round%22%20%20class=%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-arrow-big-left%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M20%2015h-8v3.586a1%201%200%200%201%20-1.707%20.707l-6.586%20-6.586a1%201%200%200%201%200%20-1.414l6.586%20-6.586a1%201%200%200%201%201.707%20.707v3.586h8a1%201%200%200%201%201%201v4a1%201%200%200%201%20-1%201z%22%20/%3E%3C/svg%3E">
		</button>
 
		<h2>피킹 상세내역</h2>
		<a></a>
 	</div>
 	 
 	<hr/>
	<div class="cDiv_inputArea">
		<label>피킹구분</label>
		<select class="cWidth50vw" id="iSelectPickingType">
			<option id="pc">주문요청</option>
			<option id="ct">회수요청</option>
			<option id="storUse">창고사용요청</option> 
		</select>
	</div>
	
	<div class="cDiv_inputArea">
		<label>요청번호</label>
		<input class="cWidth50vw" id="iInput_reqNo" placeholder="바코드 입력">
		<button class ="btn btn-primary" id="iButton_reqNoFind">검색</button> 
	</div>
	
	<div id="iDic_pickingTopArea">
	 	<div>
	 		<label id="iLabel_pickingType"></label>
	 		<label id="iLabel_pickingReqNo"></label>
	 	</div>
	 	<div>
	 		<label id="iLabel_pickinggvCustName"></label>  
	 	</div>
	 	<div> 
	 		<label id="iLabel_pickingRcvCustName"></label> 
	 	</div>
	 	<div>
	 		<button class="btn btn-primary" id="iBtnAccept" style="display:  none;">접수</button>
	 		<button class="btn btn-primary" id="iBtnConfirm" style="display:  none;">완료</button>
	 		<button class="btn btn-secondary" id="iBtnReject" style="display:  none;">거부</button>
	 		
	 	</div>
 	</div>
	<hr>
	<div id="iDic_scanInfo">
		<label id="iLabel_scanRackName"></label>
		<label id="iLabel_itemNo"></label>
	</div> 
	<div class="cDiv_basket">
			<table  id="iTable_basket"> 
			 
				<tr id="iTr_basketItemHeader" >
					<!-- 수동입고 부품 바구니  -->
					<td class="cTd_basket cWidth5vwZoom" scope="col"><input type="checkbox" name="" id="chkRowAll"></th>
					<td class="cTd_basket cWidth30vw cFont13p cHeight3vh cTd_baket_type1" scope="col">부품정보</th>
					<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col">요청</th>
					<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" id="iTd_basketHeader3" scope="col">재고</th>
					<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col">피킹</th>
					<td class="cTd_basket cWidth30vw cFont13p cTd_baket_type1" scope="col">위치</th>
				</tr>
				
				
				
				 
			</table>
		</div>
 	<input id ="iInput_barcode" inputmode="none"> <br>
 	


</body>
<script src="https://cdn.jsdelivr.net/npm/inko@1.1.0/inko.min.js"> </script>
<script type="text/javascript" src="/resources/pan/js/barcodeJS.js?ver=1.0626.4"></script> 
<script type="text/javascript" src="/resources/panMobile/js/pickingItemList.js?ver=1.0704.4"></script> 
</html>