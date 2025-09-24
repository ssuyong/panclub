<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjfs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/print2.css?ver=4.0531.3" rel="stylesheet" />
<link href="/resources/pan/css/printing3.css?ver=4.0531.3" rel="stylesheet" />
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
								<div class="divTableCell divTablePartNo">적요</div>
								<div class="divTableCell">유형</div>
								<div class="divTableCell ">부품번호</div>
								<div class="divTableCell ">부품명</div>
								<div class="divTableCell divTablePartNo">부품수량</div>
								<div class="divTableCell divTablePartNo">부품단가</div>
								<div class="divTableCell divTablePartNo">합계금액(세 포함)</div>		
							<c:if test="${(printType=='W') || (printType=='S')}">	
								<div class="divTableCell">입금금액</div>
								<div class="divTableCell priceCell">입금할인</div>
							</c:if>	
							<c:if test="${(printType=='W') || (printType=='B')}">	
								<div class="divTableCell">출금금액</div>
								<!-- <div class="divTableCell priceCell">출금할인</div> -->
							</c:if>	
								<div class="divTableCell priceCell ">기말잔액</div> 
							</div>
							<div class="divTableBody">
								<c:forEach var="item" items="${ custLedgList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${item.stdYmd}</div>
										<div class="divTableCell divTableCellLeft ">${item.summary}</div>							
										<div class="divTableCell divTableCellLeft ">${item.ledgType}</div>
										<div class="divTableCell divTableCellLeft">${item.itemNo}</div>
										<div class="divTableCell divTableCellLeft">${item.itemName}</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.cnt}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell ">
											<fmt:formatNumber value="${item.unitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.sumPriceTax}" pattern="#,###" />
										</div>
										
									<c:if test="${(printType=='W') || (printType=='S')}">		
										<div class="divTableCell priceCell ">
											<fmt:formatNumber value="${item.depositAmt}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell ">
											<fmt:formatNumber value="${item.dpDcAmt}" pattern="#,###" />
										</div>
								</c:if>		
								<c:if test="${(printType=='W') || (printType=='B')}">	
										<div class="divTableCell priceCell">
										<fmt:formatNumber value="${item.wdAmt + item.wdDcAmt}" pattern="#,###" />
										</div>
									</c:if>			
										<div class="divTableCell priceCell">
										<fmt:formatNumber value="${item.balanceAmt}" pattern="#,###" />
										</div>	
									 								
									</div>								 
								</c:forEach>
								
								<div class="divTableRow totalRow"  >
									<c:set var="rlSum" value="0" />
									<c:set var="depositSum" value="0" />
									<c:set var="dpDcAmt" value="0" />
									<c:set var="whAmt" value="0" />
									<c:set var="wdAmt" value="0" />
									<c:set var="wdDcAmt" value="0" />
									<c:set var="creditAmt" value="0" />
									<c:set var="payableAmt" value="0" />
									<c:set var="balanceAmt" value="0" />
								<c:forEach var="item2" items="${ custLedgList2}" varStatus="status">
									<c:set var="rlSum" value="${rlSum + item2.rlAmt}" /> 
									 <c:set var="depositSum" value="${depositSum + item2.depositAmt}" /> 
									  <c:set var="dpDcAmt" value="${dpDcAmt + item2.dpDcAmt}" /> 
									  <c:set var="whAmt" value="${whAmt + item2.whAmt}" /> 
									  <c:set var="wdAmt" value="${wdAmt + item2.wdAmt}" /> 
									  <c:set var="wdDcAmt" value="${wdDcAmt + item2.wdDcAmt}" /> 
									  <c:set var="creditAmt" value="${item2.creditAmt}" />
									  <c:set var="payableAmt" value="${item2.payableAmt}" />
									  <c:set var="balanceAmt" value="${item2.balanceAmt}" /> 
								</c:forEach>	
            						<%--  <div class="divTableCell priceCell  totalRow"></div>
            						  <div class="divTableCell   totalRow"> 출 고 합 계 :</div>
            						  <div class="divTableCell priceCell  totalRow"> </div>
            						  <div class="divTableCell priceCell  totalRow"> </div>
            						  <div class="divTableCell priceCell  totalRow"> </div>
            						  <div class="divTableCell priceCell  totalRow"> </div>
            						  <div class="divTableCell priceCell  totalRow"> </div>
            						  <div class="divTableCell priceCell  totalRow"> </div>
            						  <div class="divTableCell priceCell  totalRow"> </div>
            						  <div class="divTableCell priceCell  totalRow"> </div>           						 
            						  <div class="divTableCell priceCell  totalRow"> </div>           						 
            						<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${rlSum}" pattern="#,###" />
            						</div> --%>
            						</div> 
            						
            						<%-- <div class="divTableRow totalRow" >
            						  <div class="divTableCell priceCell divTableCellLft totalRow"></div>
            						  <div class="divTableCell  divTableCellLftt totalRow"> 입 금 합 계 :</div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${depositSum + dpDcAmt}" pattern="#,###" />
            						</div>
									</div>
            						  
            						  <div class="divTableRow totalRow"  >
            						  <div class="divTableCell priceCell divTableCellLft totalRow"></div>
            						  <div class="divTableCell  divTableCellLftt totalRow"> 입 고 합 계 :</div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${whAmt}" pattern="#,###" />
            						</div>
									</div>
									
									<div class="divTableRow totalRow"  >
            						  <div class="divTableCell priceCell divTableCellLft totalRow"></div>
            						  <div class="divTableCell  divTableCellLftt totalRow"> 출 금 합 계 :</div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${wdAmt + wdDcAmt}" pattern="#,###" />
            						</div>
									</div>
									
										<div class="divTableRow totalRow"  >
            						  <div class="divTableCell priceCell divTableCellLft totalRow"></div>
            						  <div class="divTableCell  divTableCellLftt totalRow"> 잔 액 :</div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						  <div class="divTableCell priceCell divTableCellLftt totalRow"> </div>           						 
            						<div class="divTableCell priceCell totalRow">
            							<fmt:formatNumber value="${balanceAmt}" pattern="#,###" />
            						</div>
									</div> --%>
						</div>
					</div>       
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${rlSum}" var="rlsumWithCommas" /> 
							<label for="supplyCost">출고합계: </label> <input type="text" id="supplyCost" name="supplyCost" value="${rlsumWithCommas}"disabled />
						</div>
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${depositSum + dpDcAmt}" var="dpSumWithCommas" /> 
							<label for="supplyCost">입금합계: </label> <input type="text" id="supplyCost" name="supplyCost" value="${dpSumWithCommas}"disabled />
						</div>
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${whAmt}" var="whSumWithCommas" /> 
							<label for="supplyCost">입고합계: </label> <input type="text" id="supplyCost" name="supplyCost" value="${whSumWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${wdAmt + wdDcAmt}" var="wdSumWithCommas" /> 
							<label>출금합계: </label> <input type="text" id="tax"value="${wdSumWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${balanceAmt}"  var="balanceAmt" /> 
							<label>잔액: </label> <input type="text" id="total"value="${balanceAmt}" disabled>
						</div> 
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