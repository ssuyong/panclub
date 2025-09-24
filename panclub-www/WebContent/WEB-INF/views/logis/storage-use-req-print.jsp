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
<title >&nbsp;</title>
</head>

<body  style="margin: 0 auto; display: table;">
<div style="text-align: center;">
	<div class="page" style="max-width: 1200px;" id="page">
		<div class="subpage" id="wrapper">
			<header>
				<div class="title">
					<div id='box'></div>
					<h1>창고 사용 요청서</h1>
					<div class="date">
						<label class="dateLabel">요청일:</label> <input type="text" value= "${req.useDmdYmd}"><br>
						<label class="dateLabel" >요청번호: </label> <input type="text"  id="printPlaceNo" value="${req.storageUseReqNo}" /><br>						
					</div>
				</div>
				<div class="container">
					<div class="quotation">
						<div class="cust"></div>
						<div>
							<label class="contLabel">작성자:</label> <input type="text" value="${req.regUserName}" disabled><br>
							<label class="contLabel">창고이동일:</label> <input type="text" class="placeInfo"  value="${req.moveSchYmd}" disabled><br>
							<label class="contLabel">주문처:</label> <input type="text" class="placeInfo"  value="${req.custName}" disabled><br>
							<label class="contLabel">차량번호:</label> <input type="text" class="placeInfo"  value="${req.carNo}" disabled><br>
							<%-- <label class="contLabel">차대:</label> <input type="text"  class="placeInfo" value="${req.vinNo}  " disabled><br> --%>
							<label class="contLabel">제조사/차종:</label> <input type="text"  class="placeInfo"  value="${req.makerCode} ${req.carType}" disabled><br>
							<label class="contLabel">메모:</label> <input type="text" class="placeInfo"value="${req.memo1}" disabled>
						</div>						
					</div>
				<div class="company">
						<div class="tableDiv">
							<table class="type03">
								<tr>
									<td class="th">등록번호</td>
									<td colspan="3"><c:out value="${custList[0].bizNo}" /></td>
								</tr>
								<tr>
									<td class="th">상호</td>
									<td>	<c:out value="${custList[0].formalName}" /></td>
									<td class="th">대표</td>
									<td><c:out value="${custList[0].ceoName}" /></td>
								</tr>
								<tr>
									<td class="th">주소</td>
									<td colspan="3"><c:out value="${custList[0].custAddress1}" /></td>
								</tr>
								<tr>
									<td class="th">전화번호</td>
									<td><c:out value="${custList[0].phone}" /></td>
									<td class="th">팩스</td>
									<td><c:out value="${custList[0].fax}" /></td>
								</tr>
								<tr>
									<td class="th">업태</td>
									<td><c:out value="${custList[0].bzType}" /></td>
									<td class="th">종목</td>
									<td><c:out value="${custList[0].bzItems}" /></td>
								</tr>
							</table>
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
							<div class="divTableCell divTableCellLft">NO</div>
							<div class="divTableCell divTablePartNo">부품ID</div>
							<div class="divTableCell divTablePartNo">부품번호</div>
							<div class="divTableCell">부품명</div>
							<div class="divTableCell">수량</div>
							<div class="divTableCell">창고명(코드) </div>
							<div class="divTableCell">랙명(코드)</div>
							<div class="divTableCell">비고</div>
						</div>
						<div class="divTableBody">
						   		<c:forEach var="item" items="${reqItemList}" varStatus="status">
								<div class="divTableRow">
									<div class="divTableCell divTableCellLft  ">${status.count}</div>
									<div class="divTableCell divTableCellLeft  ">${item.itemId}</div>
									<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
									<div class="divTableCell divTableCellLeft ">${item.itemName}</div>
									<div class="divTableCell divTableCellRight">${item.useCnt}</div>
									<div class="divTableCell divTableCellLeft">${item.storageName} (${item.storageCode})</div>
									<div class="divTableCell divTableCellLeft">${item.rackName} (${item.rackCode})</div>
									<div class="divTableCell">${item.memo1}</div>
								</div>
							</c:forEach>
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
 
    
	<script type="text/javascript" src="/resources/pan/js/place-up-print.js?ver=1.0507.3"></script>
	 <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.0403.3"></script> 

	
</body>
</html>