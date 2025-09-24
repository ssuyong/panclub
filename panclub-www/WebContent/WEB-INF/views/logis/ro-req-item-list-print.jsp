<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/print.css?ver=2.0417.3" rel="stylesheet" />
<link href="/resources/pan/css/printing2.css?ver=1.0426.3" rel="stylesheet" />
<!-- <link href="/resources/pan/css/printing2.css?ver=1.0426.3" rel="stylesheet" /> -->
<link
	href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap"
	rel="stylesheet">

<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- IE10, 11 지원을 위한 es6-promise -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.js"></script>


<title>&nbsp;</title>
</head>
<body style="margin: 0 auto; display: table;">
	<div style="text-align: center;">
		<div class="page" style="max-width: 1200px;" id="page">
			<div class="subpage" id="wrapper">
				<header>
					<div class="title">
						<h1>반 출 요 청 서</h1>
						<div class="date">
							<%-- <label class="dateLabel">출고요청일:</label> <input type="text" value="${req.dmdYmd} ${req.dmdTime} "><br>
							<label class="dateLabel">출고요청번호: </label> <input type="text" id="printOrderNo" value="${req.rlReqNo}" /><br>
							<label class="dateLabel">출고방법 : </label> <input type="text" id="printOrderNo" value="${req.rlWay}" /><br> --%>
							<!-- <button onclick="download1()">이미지 다운로드</button> -->
						</div>
					</div>
					<div class="company">
						<div class="tableDiv">
							<table class="type03">
								<tr>
									<td class="th">요청번호</td>
									<td colspan="3"><c:out value="${req.roReqNo}" /></td>
								</tr>
								<tr>
									<td class="th">요청일자</td>
									<td><c:out value="${req.dmdYmd}" /></td>
									<td class="th">요청시간</td>
									<td><c:out value="${req.dmdTime}" /></td>
								</tr>
								<tr>
									<td class="th">반출방법</td>
									<td colspan="3"><c:out value="${req.roWay}" /></td>
								</tr>
								<%-- <tr>
									<td class="th">수신자</td>
									<td colspan="3"><c:out value="${req.receiver}" /></td>
								</tr> --%>
								<tr>
									<td class="th">출고창고</td>
									<td><c:out value="${req.storageCode}" /></td>
									<td class="th">출고랙</td>
									<td><c:out value="${req.rackCode}" /></td>
								</tr>
								<tr>
									<td class="th">메모</td>
									<td colspan="3"><c:out value="${req.memo1}" /></td>
								</tr>
							</table>
						</div>
					</div>
					<div class="company" style="margin-left:-50px; width:600px">
						<div class="tableDiv">
							<table class="type03">
								<tr>
									<td class="th">주문그룹ID</td>
									<td colspan="3"><c:out value="${req.orderGroupId}" /></td>
								</tr>
								<tr>
									<td class="th">차량번호</td>
									<td colspan="3"><c:out value="${req.carNo}" /></td>
								</tr>
								<tr>
									<td class="th">주문처</td>
									<td colspan="3"><c:out value="${req.saleCustName}" /></td>
								</tr>
								<tr>
									<td class="th">제조사/차종</td>
									<td colspan="3"><c:out
											value="${req.makerCode} ${req.carType}" /></td>
								</tr>
								<tr>
									<td class="th">요청자</td>
									<td colspan="3"><c:out value="${req.regUserId}" /></td>
								</tr>
							</table>
						</div>
					</div>
			</div>

			</header>
						<div  class="info">
							<%-- <label >담당자:</label> <input type="text" value="${req.regUserId}" disabled>
							 <label >차량번호:</label> <input  type="text" value="${req.carNo}" disabled><br> 
								<label  >차종:</label> <input  type="text" value="${req.makerCode}  ${req.carType}" disabled>
								<label  >차대번호:</label> <input type="text" value="${req.vinNo}" disabled> --%>
							</div>
			<section>
			<c:set var="sum" value="0" />
					<c:forEach var="item" items="${ reqItemList}" varStatus="status">
    				<c:set var="sum" value="${sum +item.salePrice *item.roReqCnt }" />
				</c:forEach>
			<div class="totalBox"  >
						<div class="totalPrice">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum}" var="totWithCommas" />
   							 <span> </span> <input type="text" style="margin: 0" value="${totWithCommas}" disabled>
    						<span> 원</span> 
						</div>
					</div>
				
					<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
								<div class="divTableCell divTablePartNo">상품ID</div>
								<div class="divTableCell divTablePartNo">부품번호</div>
								<div class="divTableCell">부품명</div>
								<!-- <div class="divTableCell">발주수량</div> -->
								<div class="divTableCell">요청수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">반출금액</div> 
								<div class="divTableCell ">발주처명</div>
								<div class="divTableCell ">요청발주처</div>
								<div class="divTableCell ">요청발주처로반출여부</div>
								<!-- <div class="divTableCell ">창고명</div> -->
							<!-- 	<div class="divTableCell">반출번호</div> -->
								
							</div>
							<div class="divTableBody">
							<c:set var="sum" value="0" />
								<c:forEach var="item" items="${ reqItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemId}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<%-- <div class="divTableCell priceCell ">${item.placeCnt}</div> --%>
										<div class="divTableCell priceCell ">${item.roReqCnt}</div>
										<div class="divTableCell priceCell ">
										<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
										<%-- ${item.salePrice} --%></div>
										<div class="divTableCell priceCell ">
										<fmt:formatNumber value="${item.salePrice *item.roReqCnt}" pattern="#,###" />
										</div>	
										<div class="divTableCell divTableCellLeft ">${item.placeCustName}</div>
										<div class="divTableCell divTableCellLeft  ">${item.orderReqPlaceCustName}</div>
										<div class="divTableCell divTableCellLeft  ">${item.toOrderReqPlaceYN}(${item.printRoCustName})</div>
										<%-- <div class="divTableCell divTableCellLeft ">${item.roNo}</div> --%>
									</div>
										<c:set var="total" value="${total + item.salePrice *item.roReqCnt}" />
										<c:set var="sum" value="${sum +item.salePrice *item.roReqCnt}" />
								</c:forEach>
							</div>
							<span>${newTotal} </span>
						</div>
					</div>
				</section>
			</div> 
		</div>
		
	
	
	<!-- 	<script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
	
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0313.3"></script>
	<script type="text/javascript" src="/resources/pan/js/ri-req-item-list-print.js?ver=1.0710.4"></script>
 
</body>
</html>