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
<link href="/resources/panMobile/css/mobile.css?ver=2.0620.4" rel="stylesheet" />
</head>
<body class="body" style="overscroll-behavior-y:contain;">
	
 	<div class ="cDiv_title">
 		<button   onclick="pageMove('back')">
 		<img src="data:image/svg+xml,%3Csvg%20%20xmlns=%22http://www.w3.org/2000/svg%22%20%20width=%2224%22%20%20height=%2224%22%20%20viewBox=%220%200%2024%2024%22%20%20fill=%22none%22%20%20stroke=%22currentColor%22%20%20stroke-width=%222%22%20%20stroke-linecap=%22round%22%20%20stroke-linejoin=%22round%22%20%20class=%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-arrow-big-left%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M20%2015h-8v3.586a1%201%200%200%201%20-1.707%20.707l-6.586%20-6.586a1%201%200%200%201%200%20-1.414l6.586%20-6.586a1%201%200%200%201%201.707%20.707v3.586h8a1%201%200%200%201%201%201v4a1%201%200%200%201%20-1%201z%22%20/%3E%3C/svg%3E">
		</button>
<!-- 		<a class="cblueColorFont" onclick="pageMove('back')">뒤로</a> -->
		<h2>수동입출고</h2>
		<button   onclick="pageMove('new')">
 		<img src="data:image/svg+xml,%3Csvg%20%20xmlns=%22http://www.w3.org/2000/svg%22%20%20width=%2224%22%20%20height=%2224%22%20%20viewBox=%220%200%2024%2024%22%20%20fill=%22none%22%20%20stroke=%22currentColor%22%20%20stroke-width=%222%22%20%20stroke-linecap=%22round%22%20%20stroke-linejoin=%22round%22%20%20class=%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-cube-plus%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M21%2012.5v-4.509a1.98%201.98%200%200%200%20-1%20-1.717l-7%20-4.008a2.016%202.016%200%200%200%20-2%200l-7%204.007c-.619%20.355%20-1%201.01%20-1%201.718v8.018c0%20.709%20.381%201.363%201%201.717l7%204.008a2.016%202.016%200%200%200%202%200%22%20/%3E%3Cpath%20d=%22M12%2022v-10%22%20/%3E%3Cpath%20d=%22M12%2012l8.73%20-5.04%22%20/%3E%3Cpath%20d=%22M3.27%206.96l8.73%205.04%22%20/%3E%3Cpath%20d=%22M16%2019h6%22%20/%3E%3Cpath%20d=%22M19%2016v6%22%20/%3E%3C/svg%3E">
		</button>
<!-- 		<a class="cblueColorFont" onclick="pageMove('new')">신규</a> -->
 	</div>
 	 
 	<hr/>
	<div class="cDiv_inputArea">
		<select id="iSelectWrType">
			<option>수동입고</option>
			<option>수동출고</option>
			<option>이동</option>
<!-- 			<option>수동출고</option> -->
<!-- 			<option>이동</option> -->
		</select>
		<input class="cWidth50vw" id="iInput_logisRackName" placeholder="랙 바코드 입력">
		<button class ="btn btn-primary" id="iButton_logisRackFind">검색</button> 
	</div>
	<div class="cDiv_inputArea" >
			<table> 
				<tr>
<!-- 					<td class="cTd_itemInfo cWidth20vw cFont13p" scope="col">랙 정보</th> -->
					<td class="cTd_itemInfo cTextalignLeft cWidth90vw cFont13p cColorGray" id="iTd_rackInfo" scope="row">[랙위치]랙명</td> 
				</tr>
			</table>
	</div>
	<div class="cDiv_inputArea">
		<input  id="iInput_itemNo" placeholder="바코드 입력">
		<button class ="btn btn-primary" id="iButton_itemNoFind">검색</button> 
	</div>
	<div>
		<div class="cDiv_inputArea">
		
			<table > 
			 
				<tr>
<!-- 					<td class="cTd_itemInfo cWidth30vw cFont13p" scope="col">품번</th> -->
					<td class="cTd_itemInfo cWidth90vw cTextalignLeft cFont13p cColorGray" id="iTd_basketTable_itemInfo" scope="row">부품정보</td> 
				</tr>
<!-- 				<tr> -->
<!-- 					<td class="cTd_itemInfo cWidth30vw cFont13p" scope="col">브랜드|품명</th> -->
<!-- 					<td class="cTd_itemInfo cWidth80vw cTextalignLeft cFont13p" id="iTd_basketTable_itemInfo" scope="row"></td>  -->
<!-- 				</tr>  -->
				<tr>
<!-- 					<td class="cTd_itemInfo cWidth30vw cFont13p" scope="col">위탁사</th> -->
					<td class="cTd_itemInfo cWidth90vw cTextalignLeft cFont13p cColorGray" id="iTd_basketTable_consignInfo" scope="row">위탁사</td> 
				</tr> 
			</table>
		</div>
 
 	</div> 
 		
		<label class="cLabel_wrCheck"> 
				<label class="cFont15pBold cPadding8px" id="iwrNo"></label>
				<button class ="btn btn-danger cButton_wrCheck" id='iButton_itemWrChk'>처리</button> 
			</label>
	<hr>
	<label class="cLabel_basketDeleteText"> 
		<button class ="btn btn-warning cButton_basketDelete" id='iButton_BasketDelete'>삭제</button> 
	</label>
	<label>부품수 :</label>
	<label id="iLabel_basketCount">0</label>
	<div class="cDiv_basket">
			<table  id="iTable_basket"> 
			 
				<tr id="iTr_basketItemHeader" >
					<!-- 수동입고 부품 바구니  -->
					<td class="cTd_basket cWidth5vwZoom" scope="col"><input type="checkbox" name="" id="chkRowAll"></th>
					<td class="cTd_basket cWidth70vw cFont13p cHeight3vh cTd_baket_type1" scope="col">부품정보 / 위탁사</th>
					<td class="cTd_basket cWidth20vw cFont13p cTd_baket_type1" scope="col">수량</th>
					<!-- 수동출고/이동 부품 바구니 (재고수량 보여주기 위함) -->
					<td class="cTd_basket cWidth50vw cFont13p cHeight3vh cTd_baket_type2" scope="col" style="display: none;" >부품정보 / 위탁사</th>
					<td class="cTd_basket cWidth20vw cFont13p cTd_baket_type2" scope="col" style="display: none;">재고</th>
					<td class="cTd_basket cWidth20vw cFont13p cTd_baket_type2" scope="col" style="display: none;">수량</th>
				</tr>
				
				 
			</table>
		</div>
 	<input id ="iInput_barcode" inputmode="none"> <br>
 	
<!--  	레이어팝업 -->
 	<div class="layer-popup" id="layerPopup" style="display: none;"> 
    <div class="layer-containers">
       <div class="inner">
          <div id="iDiv_itemSelectBox" style="max-height: 390px">
          </div>
       </div>
    </div>
 	 </div>
<!-- 		 -->
<!--  이동후랙선택 팝업 -->
	<div class="layer-popup" id="iDiv_affterRackSelect" style="display: none;"> 
    	<labal id="iLabel_RackSelectMsg">이동될 랙을 스캔해주세요.</labal>
    	<input id ="iInput_moveRackBarcode" inputmode="none">
    	<div id="iDiv_MoveAffterRackPopupYN"  style="display: none;">
	    	<button id="ibutton_MoveY" class="btn btn-primary" >예</button>
	    	<button id="ibutton_MoveN" class="btn btn-primary" >아니요</button>
    	</div>
 	</div>
 	
<!--  -->

</body>
<script src="https://cdn.jsdelivr.net/npm/inko@1.1.0/inko.min.js"> </script>
<script type="text/javascript" src="/resources/pan/js/barcodeJS.js?ver=1.0620.4"></script> 
<script type="text/javascript" src="/resources/panMobile/js/itemWr.js?ver=3.0620.4"></script> 
</html>