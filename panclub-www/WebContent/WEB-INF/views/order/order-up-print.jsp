<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/print.css?ver=1.0703.3" rel="stylesheet" />
<link href="/resources/pan/css/printing.css?ver=1.0703.3" rel="stylesheet" />
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
						<h1>주 문 서</h1>
						<div class="date">
							<label class="dateLabel">주문일:</label> <input type="text" value="${order.orderYmd}"><br>
							<!-- <label class="dateLabel">출고요청일:</label> <input type="text" ><br>   -->
							<label class="dateLabel">주문서번호: </label> <input type="text" id="printOrderNo" value="${order.orderNo}" /><br>
							<!-- <button onclick="download1()">이미지 다운로드</button> -->

						</div>
					</div>
					<div class="container">
						<div class="quotation">
							<div class="cust">
								<input type="text" value="${order.custName}"> <span>귀하</span>
							</div>
							<div>
								<label class="contLabel">담당자:</label> <input type="text" value="${order.regUserName}" disabled><br> 
								<label class="contLabel">차량번호:</label> <input type="text" value="${order.carNo}" disabled><br> 
								<label class="contLabel">차종:</label> <input type="text" value="${order.makerName}  ${order.carType}" disabled><br>
								<label class="contLabel">컬러코드:</label> <input type="text" value="${order.colorCode}" disabled><br> 
								<label class="contLabel">차대번호:</label> <input type="text" value="${order.vinNo}" disabled>
							<c:if test="${order.orderType == '2'}"> 
								<label class="contLabel">납품처:</label> <input type="text" value="${order.supplyCustName}" disabled>
							</c:if>	
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

					</div>
				</header>
				<section>
				<c:set var="total" value="0" />
				<c:forEach var="item" items="${ o_orderItemList}" varStatus="status">
    				<c:set var="total_t" value="${total_t + item.unitPrice* item.cnt*1.1}" />
    				<c:set var="dcsum_t" value="${dcsum_t + item.salePrice* item.cnt*1.1}" />
    			</c:forEach>	
				
					<div class="totalBox">
						<div class="totalPrice">
						<c:if test="${printDcYN=='N'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${total_t}" var="tottWithCommas" />
							<!-- <span>원정</span> -->
							<span>  </span> <input type="text" style="margin: 0; width:250px;" value="${tottWithCommas}" disabled>
							<span> 원</span>
						</c:if> 		
					<c:if test="${printDcYN=='Y'}">
						<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum_t}" var="dctWithCommas" />
							<!-- <span>원정</span> -->
							<span> ￦ </span> <input type="text" style="margin: 0; width:250px;" value="${dctWithCommas}" disabled>
							<span> 원</span>
					</c:if> 	
					<c:if test="${printDcYN=='YY'}">
						<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum_t}" var="dctWithCommas" />
							<!-- <span>원정</span> -->
							<span> ￦ </span> <input type="text" style="margin: 0; width:250px;" value="${dctWithCommas}" disabled>
							<span> 원</span>
					</c:if> 	
						</div>
					</div>
					<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
							<c:if test="${printNoYN=='N'}">	
								<div class="divTableCell divTablePartNo">부품번호</div>
							</c:if>	
								<!-- <div class="divTableCell">차종 (Model)</div> -->
								<div class="divTableCell">부품명</div>
								<div class="divTableCell">수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">금액</div>
								<c:if test="${printDcYN=='Y'}">
								<!-- <div class="divTableCell priceCell">할인단가</div> -->
								<div class="divTableCell priceCell">할인율 </div>
								<div class="divTableCell priceCell">할인금액 </div>
								</c:if>								
								<c:if test="${memoYN=='Y'}">
									<div class="divTableCell">비고</div>
								</c:if>
							</div>
							<div class="divTableBody">
								<c:set var="sum" value="0" />
								<c:forEach var="item" items="${ o_orderItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
									<c:if test="${printNoYN=='N'}">	
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
									</c:if>	
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft ">${item.itemName}</div>
										<div class="divTableCell divTableCellRight">${item.cnt}</div>
									<c:if test="${printDcYN !='YY'}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.unitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.unitPrice * item.cnt }" pattern="#,###" />
										</div>
									</c:if>		
									<c:if test="${printDcYN =='YY'}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.salePrice * item.cnt }" pattern="#,###" />
										</div>
									</c:if>				
									<c:if test="${printDcYN=='Y'}">	
										<%-- <div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
										</div> --%>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${1-item.salePrice/item.unitPrice}" pattern="#,###%" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.salePrice * item.cnt }" pattern="#,###" />
										</div>
									</c:if>		
										<c:if test="${memoYN=='Y'}">
											<div class="divTableCell">${item.memo}</div>
										</c:if>
									</div>
									<c:set var="sum2" value="${sum2 + item.salePrice* item.cnt}" />
									<c:set var= "sum" value="${sum + item.cnt * item.unitPrice}"/>
									<c:set var="discountAmount" value="${(sum + (sum/10))-(sum2*1.1)}" />
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
			<c:if test="${printDcYN !='YY'}">
				<div class="sum">
					<div>
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum}" var="sumWithCommas"/>
						<label for="supplyCost">공급가액: </label> <input type="text"  id="supplyCost" name="supplyCost" value="${sumWithCommas}" disabled/>
					</div>
					<div class="tax">
					<fmt:formatNumber type="number" pattern="#,##0" value="${sum/10}" var="taxWithCommas"/>
						<label>세액: </label> <input type="text" id="tax" value="${taxWithCommas}" disabled>
					</div>
					<div class="total">
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum + (sum/10)}" var="totalWithCommas"/>
						<label>합계금액: </label> <input type="text" id="total" value="${totalWithCommas}" disabled>
					</div>
						<c:if test="${printDcYN=='Y'}">
				<%-- 	<div class="total" style=" margin-top: -10px;">
							<fmt:formatNumber type="number" pattern="#,##0" value="${discountAmount}"  var="daWithCommas" /> 
							<label>할인금액: </label> <input type="text" id="total3"value="${daWithCommas}" disabled style=" font-weight: bold;"> 
						</div> --%>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum2*1.1}"  var="sum2WithCommas" /> 
							<label>청구금액 (할인 적용): </label> <input type="text" id="total2"value="${sum2WithCommas}" disabled>
						</div>
						</c:if> 	
				</div>
			</c:if> 		
			<c:if test="${printDcYN =='YY'}">
				<div class="sum">
					<div>
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum2}" var="sumDcWithCommas"/>
						<label for="supplyCost">공급가액: </label> <input type="text"  id="supplyCost" name="supplyCost" value="${sumDcWithCommas}" disabled/>
					</div>
					<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum2/10}" var="taxDcWithCommas"/>
						<label>세액: </label> <input type="text" id="tax" value="${taxDcWithCommas}" disabled>
					</div>
					<div class="total">
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum2 + (sum2/10)}" var="totalDcWithCommas"/>
						<label>합계금액: </label> <input type="text" id="total" value="${totalDcWithCommas}" disabled>
					</div>	
				</div>
			</c:if> 		

				</section>

			</div>

	<footer>
				<c:forEach var="payment" items="${paymentList2}">
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
	<script type="text/javascript" src="/resources/pan/js/order-up-print.js?ver=2.0802.3"></script>
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0313.3"></script>


</body>
</html>