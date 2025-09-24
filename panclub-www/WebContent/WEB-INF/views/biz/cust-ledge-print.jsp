<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjfs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/print2.css?ver=1.0801.3" rel="stylesheet" />
<link href="/resources/pan/css/printing3.css?ver=4.0530.3" rel="stylesheet" />
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
						<h1>거 래 처 원 장</h1>
						<input type="hidden" value="${custCode}"  id="printOrderNo">					
						<div class="date">
							<%-- <label class="dateLabel">주문일:</label> <input type="text" value="${order.orderYmd}"><br>
							<label class="dateLabel">출고요청일:</label> <input type="text" ><br>  
							 <input type="text" id="printOrderNo" value="${order.orderNo}" /><br> --%>
							<!-- <button onclick="download1()">이미지 다운로드</button> -->
							${sYmd}<label>~</label>${eYmd}
						</div>
					</div>

						<div class="company">
							<div class="tableDiv">
								<table class="type03">
									<tr>
										<td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList2[0].bizNo}" /></td>
									</tr>
									<tr>
										<td class="th">상호</td>
										<td><c:out value="${custList2[0].formalName}" /></td>
										<td class="th">대표</td>
										<td><c:out value="${custList2[0].ceoName}" /></td>
									</tr>
									<tr>
										<td class="th">주소</td>
										<td colspan="3"><c:out
												value="${custList2[0].custAddress1}" /></td>
									</tr>
									<tr>
										<td class="th">전화번호</td>
										<td><c:out value="${custList2[0].phone}" /></td>
										<td class="th">팩스</td>
										<td><c:out value="${custList2[0].fax}" /></td>
									</tr>
									<tr>
										<td class="th">업태</td>
										<td><c:out value="${custList2[0].bzType}" /></td>
										<td class="th">종목</td>
										<td><c:out value="${custList2[0].bzItems}" /></td>
									</tr>
								</table>
							</div>
						</div>
								
						<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<!-- <tr>
								 <td rowspan="8" style="width: 30px; background-color: #EEE">공급자</td>  -->
								 <tr>
									<tr>
										<td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList[0].bizNo}" /></td>
									</tr>
									<tr>
										<td class="th">상호</td>
										<td><c:out value="${custList[0].formalName}" /></td>
										<td class="th">대표</td>
										<td><c:out value="${custList[0].ceoName}" /></td>
									</tr>
									<tr>
										<td class="th">주소</td>
										<td colspan="3"><c:out
												value="${custList[0].custAddress1}" /></td>
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
				</header>
				<section>
					<div class="totalBox">
						<div class="totalPrice">
						<%-- 	<h4>총 금액 :</h4>
							<fmt:formatNumber type="number" pattern="#,##0"
								value="${order.salePrice *1.1}" var="totWithCommas" />
							<input type="text" value="${order.sumPriceKor}" disabled>
							<!-- <span>원정</span> -->
							<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( ￦ </span> <input type="text" style="margin: 0" value="${totWithCommas}" disabled>
							<span> 원)&nbsp;&nbsp;</span> --%>
						</div>
					</div>
					<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">일자</div>
								<!-- <div class="divTableCell divTableCellLft">일자</div> -->
								<div class="divTableCell divTablePartNo">적요</div>
							<c:if test="${(printType=='W') || (printType=='S')}">	
								 <div class="divTableCell">차량번호</div>
								 <div class="divTableCell">차종 (Model)</div>
								<div class="divTableCell">출고금액</div>
								<div class="divTableCell">입금금액</div>
								<div class="divTableCell priceCell">입금할인</div>
								<!-- <div class="divTableCell priceCell ">외상매출잔액</div> -->
							</c:if>
							<c:if test="${(printType=='W') || (printType=='B')}">	
								<div class="divTableCell priceCell">입고금액</div>
								<div class="divTableCell priceCell">출금금액</div>
								<div class="divTableCell priceCell">출금할인</div>
								<!-- <div class="divTableCell priceCell ">외상매입잔액</div> -->
							</c:if>	
								<div class="divTableCell priceCell ">기말잔액</div>
								<%-- <c:if test="${memoYN=='Y'}">
									<div class="divTableCell">비고</div>
								</c:if> --%>
							</div>
							<div class="divTableBody">
								<c:set var="rlSum" value="0" />
								<c:set var="depositSum" value="0" />
								<c:set var="dpDcAmt" value="0" />
								<c:set var="whAmt" value="0" />
								<c:set var="wdAmt" value="0" />
								<c:set var="wdDcAmt" value="0" />
								<c:set var="creditAmt" value="0" />
								<c:set var="payableAmt" value="0" />
								<c:set var="balanceAmt" value="0" />
								<c:forEach var="item" items="${ custLedgList}" varStatus="status">
									<div class="divTableRow">
										<%-- <div class="divTableCell divTableCellLft  ">${status.count}</div> --%>
										<div class="divTableCell divTableCellLft  ">${item.stdYmd}</div>
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft ">${item.summary}</div>
									<c:if test="${(printType=='W') || (printType=='S')}">		
										<div class="divTableCell divTableCellLeft ">${item.carNo}</div>
										<div class="divTableCell divTableCellLeft ">${item.carType}</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value=	"${item.rlAmt}" pattern="#,###" />	
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.depositAmt}" pattern="#,###" />	
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.dpDcAmt}" pattern="#,###" />
										</div>
										<%-- <div class="divTableCell priceCell ">
											<fmt:formatNumber value="${item.creditAmt}" pattern="#,###" />
										</div> --%>
									</c:if>	
									<c:if test="${(printType=='W') || (printType=='B')}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.whAmt}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
										<fmt:formatNumber value="${item.wdAmt}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.wdDcAmt}" pattern="#,###" />
										</div>
										<%-- <div class="divTableCell priceCell ">
											<fmt:formatNumber value="${item.payableAmt}" pattern="#,###" />
										</div> --%>
									</c:if>		
										<div class="divTableCell priceCell   ">
											<fmt:formatNumber value="${item.balanceAmt}" pattern="#,###" />
										</div>
									</div>
									 <c:set var="rlSum" value="${rlSum + item.rlAmt}" /> 
									 <c:set var="depositSum" value="${depositSum + item.depositAmt}" /> 
									  <c:set var="dpDcAmt" value="${dpDcAmt + item.dpDcAmt}" /> 
									  <c:set var="whAmt" value="${whAmt + item.whAmt}" /> 
									  <c:set var="wdAmt" value="${wdAmt + item.wdAmt}" /> 
									  <c:set var="wdDcAmt" value="${wdDcAmt + item.wdDcAmt}" /> 
									  <c:set var="creditAmt" value="${item.creditAmt}" />
									  <c:set var="payableAmt" value="${item.payableAmt}" />
									  <c:set var="balanceAmt" value="${item.balanceAmt}" />
								<%-- 	<c:set var="sum" value="${sum + item.cnt * item.salePrice}" /> --%>
								</c:forEach>
								
								<div class="divTableRow totalRow" style="	border: 1px solid black;" >
            						 <div class="divTableCell priceCell divTableCellLft totalRow">합 계 :</div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						 <c:if test="${(printType=='W') || (printType=='S')}">	 
            						   <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						    <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  </c:if>  
            						<c:if test="${(printType=='W') || (printType=='S')}">	
            						<div class="divTableCell priceCell totalRow">
            							  <fmt:formatNumber value="${rlSum}" pattern="#,###" />
            						</div>
            						<div class="divTableCell priceCell totalRow">
            							 <fmt:formatNumber value="${depositSum}" pattern="#,###" />
            						</div>
            						<div class="divTableCell priceCell totalRow">
            							 <fmt:formatNumber value="${dpDcAmt}" pattern="#,###" />
            						</div>
            						<%-- <div class="divTableCell priceCell totalRow">
            							 <fmt:formatNumber value="${creditAmt}" pattern="#,###" />
            							</div> --%>
            						</c:if>	
            					<c:if test="${(printType=='W') || (printType=='B')}">	
            						<div class="divTableCell priceCell totalRow">
            						 	<fmt:formatNumber value="${whAmt}" pattern="#,###" />
            						</div>
            						<div class="divTableCell priceCell totalRow">
            						 	<fmt:formatNumber value="${wdAmt}" pattern="#,###" />
            						</div>
            						<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${wdDcAmt}" pattern="#,###" />
            						</div>
            					<%-- 	<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${payableAmt}" pattern="#,###" />
            						</div> --%>
            					</c:if>		
            						<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${balanceAmt}" pattern="#,###" />
            						</div>
							</div>
							
						</div>
					</div>       

					<div class="sum">
						<%-- <div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum}" var="sumWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum/10}" var="taxWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum + (sum/10)}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div> --%>
					</div>

				</section>

			</div>

		<footer>
					<!-- <span> 위 차량에 대한 수리부품으로 귀사(수리공장)가 주문한 아래 부품을 납품하여 그 대금을 상기와 같이 청구합니다. </span> -->
	<c:forEach var="payment" items="${paymentList2}">
			<div style="display: flex; justify-content: space-between;">			
					<div style="margin-top: 10px !important;">
						<label> 입금계좌: </label> <span> ${payment.name} &nbsp;
							${payment.accoutNo}</span>
						<div class="footer- text">
							<span>${payment.accOwner} </span>
						</div>
					</div>
				</c:forEach>						
			</footer>
		</div>
	</div>
	<!-- 	<script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
	<script type="text/javascript" src="/resources/pan/js/cust-ledge-print.js?ver=1.0531.3"></script>
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0313.3"></script>


</body>
</html>