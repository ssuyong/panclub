<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/print.css?ver=2.0703.3" rel="stylesheet" />
<link href="/resources/pan/css/printing.css?ver=3.0703.3" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
	<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<!-- IE10, 11 지원을 위한 es6-promise -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.js"></script>
<title >주문 요청서</title>
</head>
<body  style="margin: 0 auto; display: table;">
<div style="text-align: center;">
	<div class="page" style="max-width: 1200px;" id="page">
		<div class="subpage" id="wrapper">
			<header>
				<div class="title" >
					<div id='box'></div>
					<h1>주문 요청서</h1>
					<div class="date">
						<label class="dateLabel">요청일:</label> <input type="text" id="regYmd"><br>
						<label class="dateLabel" >요청번호: </label> <input type="text"  id="pcReqNo"  /><br>						
					</div>
				</div>
				<div class="container" style="flex-wrap: nowrap" >
					<div class="quotation">
						<div class="cust"></div>
						<div>
							<label class="contLabel">요청담당:</label> <input type="text" id="gvMgr" disabled>
							<label class="contLabel">요청업체:</label> <input type="text" id="gvComCode" disabled>
							<label class="contLabel">요청발주번호:</label> <input type="text" id="gvPlacNo" disabled>
							<label class="contLabel">수령방법:</label> <input type="text"  id="deliWay" disabled>
							<label class="contLabel" id="labelDeliType">비용:</label> <input type="text"  id="deliType" disabled>
							<label class="contLabel">요청메모:</label> <input type="text"  id="gvMemo" disabled>
						</div>
												
					</div>
	 				<div class="quotation">
						<div class="cust"></div>
						<div>
							<label class="contLabel">보내는 업체:</label> <input type="text" id="senderCustName" disabled>
							<label class="contLabel">사람:</label> <input type="text" id="senderName" disabled>
							<label class="contLabel">연락처:</label> <input type="text" id="senderTel" disabled>
							<label class="contLabel">주소:</label> <input type="text" id="senderAddr1" disabled>
							<label class="contLabel">받는 업체:</label> <input type="text"  id="receiverCustName" disabled> 
							<label class="contLabel">사람:</label> <input type="text"  id="receiverName" disabled> 
							<label class="contLabel">연락처:</label> <input type="text"  id="receiverTel" disabled>
							<label class="contLabel">주소:</label> <input type="text"  id="receiverAddr1" disabled>
						</div>
												
					</div>
					 
				</div>
			</header>
			<section>
				<div class="totalBox" style="visibility: hidden; height: 5px;">
					<div class="totalPrice" >
					</div>
				</div>
				<div class="table">
					<div class="divTable">
						<div class="divTableHeading" id="heading">
							<div class="divTableCell divTableCellLft">순번</div> 
							<div class="divTableCell divTablePartNo">부품ID</div>
							<div class="divTableCell divTablePartNo">부품번호</div>
							<div class="divTableCell">부품명</div>
							<div class="divTableCell">요청수량</div>
							<div class="divTableCell">수량</div>
							<div class="divTableCell">창고명(코드) </div>
							<div class="divTableCell">랙명(코드)</div>
							<div class="divTableCell">비고</div>
							<div class="divTableCell">수령물류센터</div>
						</div>
						<div class="divTableBody">
						  
 
						 
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>	
<!-- 	<script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
	  <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
	<script type="module" src="/resources/pan/js/pc-req-item-list-print.js?ver=1.0626.4"></script> 
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.0403.3"></script> 
	
	
</body>
</html>