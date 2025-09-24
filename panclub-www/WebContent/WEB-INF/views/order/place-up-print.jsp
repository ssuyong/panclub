<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/print.css?ver=2.0703.3" rel="stylesheet" />
<link href="/resources/pan/css/printing.css?ver=3.0703.3" rel="stylesheet" />
<link
	href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap"
	rel="stylesheet">
 
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
					<h1>발 주 서</h1>
					<div class="date">
						<label class="dateLabel">발주일:</label> <input type="text" value= "${place.placeDmdYmd}"><br>
						<label class="dateLabel" >발주서번호: </label> <input type="text"  id="printPlaceNo" value="${place.placeNo}" /><br>
						<!-- <button onclick="download1()">이미지 다운로드</button> -->
						
					</div>
				</div>
				<div class="container">
					<div class="quotation">
						<div class="cust">
							<input type="text"value="${place.custName}" > <span>귀하</span>  <!-- 발주처명 -->
						</div>
						<div>
							<label class="contLabel">작성자:</label> <input type="text" value="${place.regUserName}" disabled><br>
							<label class="contLabel">입고예정일:</label> <input type="text" class="placeInfo"  value="${place.whSchYmd}   ${place.turnNum}" disabled><br>
							<label class="contLabel">입고예정시간:</label> <input type="text" class="placeInfo"  value="${place.whSchTime}" disabled><br>
							<label class="contLabel">발주처 주문번호:</label> <input type="text"  class="placeInfo" value="${place.custOrderNo}  " disabled><br>
							<label class="contLabel">비고1:</label> <input type="text"  class="memo placeInfo"  value="${place.memo1}" disabled><br>
							<label class="contLabel">비고2:</label> <input type="text" class="memo placeInfo"value="${place.memo2}" disabled>
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
				<div class="totalBox">
					<div class="totalPrice">
						<h4>총 금액 :</h4>
						<fmt:formatNumber type="number" pattern="#,##0" value="${place.sumPrice}" var="totWithCommas"/>
						<%-- <input type="text" value="${esti.sumPriceKor}" disabled> --%><!-- <span>원정</span> --> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							 </span> <input type="text" style="margin: 0" value="${totWithCommas}" disabled> <span>
							원&nbsp;&nbsp;</span>
					</div>
				</div>
				<div class="table">
				<c:set var="memoYN" value="${param.memoYN}" />
					<div class="divTable">
						<div class="divTableHeading" id="heading">
							<div class="divTableCell divTableCellLft">NO</div>
							<div class="divTableCell divTablePartNo">부품번호</div>
							 <div class="divTableCell">차종 (Model)</div> 
							<div class="divTableCell">부품명</div>
							<div class="divTableCell">수량</div>
							<div class="divTableCell priceCell">단가</div>
							<div class="divTableCell priceCell">금액 </div>
							<c:if test="${memoYN=='Y'}">
							<div class="divTableCell">비고</div>
							</c:if>
							<div class="divTableCell">주문처</div>
							<div class="divTableCell">주문그룹 ID</div>
							<div class="divTableCell">수령물류센터</div>
						</div>
						<div class="divTableBody">
							<c:set var = "sum" value = "0" />
						   		<c:forEach var="item" items="${placeItemList}" varStatus="status">
								<div class="divTableRow">
									<div class="divTableCell divTableCellLft  ">${status.count}</div>
									<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
									 <div class="divTableCell">${item.makerName}</div>
									<div class="divTableCell divTableCellLeft ">${item.itemName}</div>
									<div class="divTableCell divTableCellRight">${item.cnt}</div>
									<div class="divTableCell priceCell"><fmt:formatNumber value="${item.unitPrice}" pattern="#,###" /></div>
									<div class="divTableCell priceCell"><fmt:formatNumber value="${item.unitPrice * item.cnt }" pattern="#,###" /></div>
									<c:if test="${memoYN=='Y'}">
									<div class="divTableCell">${item.memo1}</div>
									</c:if>
									<div class="divTableCell  ">${item.rcvCustName}</div>
									<div class="divTableCell  ">${item.orderGroupId}</div>
									<div class="divTableCell  ">${item.rcvLogisCode}</div>
								</div>
								<c:set var= "sum" value="${sum + item.cnt * item.salePrice}"/>
							</c:forEach>	
						
							<!-- <div class="divTableRow">
								<div class="divTableCell divTableCellLeft">2</div>
								<div class="divTableCell divTablePartNo">72761TVAA02</div>
								<div class="divTableCell">ACOORD</div>
								<div class="divTableCell">후 도어 C필러 커버 좌</div>
								<div class="divTableCell">1</div>
								<div class="divTableCell priceCell">37,070</div>
								<div class="divTableCell priceCell">37,070</div>
								<div class="divTableCell">이건 비고양 비고양 비고</div>
							</div> -->
							
						</div>
					</div>
				</div>

				<div class="sum">
    <div>
        <fmt:formatNumber type="number" pattern="#,##0" value="${place.price}" var="sumWithCommas"/>
        <label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumWithCommas}" disabled/>
    </div>
    <div class="tax">
        <fmt:formatNumber type="number" pattern="#,##0" value="${place.taxPrice}" var="taxWithCommas"/>
        <label>세액: </label> <input type="text" id="tax" value="${taxWithCommas}" disabled>
    </div>
    <div class="total">
        <fmt:formatNumber type="number" pattern="#,##0" value="${place.sumPrice}" var="totalWithCommas"/>
        <label>합계금액: </label> <input type="text" id="total" value="${totalWithCommas}" disabled>
    </div>
</div>

			</section>

		</div>
	<%-- 	<footer>
		<c:forEach var="payment" items="${paymentList2}">
			<div style="margin-top: 10px!important;">
				<label> 입금계좌: </label> <span> ${payment.name} &nbsp; ${payment.accoutNo}</span>
				<div class="footer- text">
					<span>${payment.accOwner} </span>
				</div>
			</div>
			</c:forEach>	
		</footer> --%>
		
	</div>
</div>	
<!-- 	<script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
	<script type="text/javascript" src="/resources/pan/js/place-up-print.js?ver=2.0507.3"></script>
	 <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=2.0403.3"></script> 

	
</body>
</html>