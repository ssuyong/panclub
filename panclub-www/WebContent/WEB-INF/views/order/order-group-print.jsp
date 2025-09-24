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
						<h1>주 문 서  (${stdClType})</h1>
						<div class="date">
							<label class="dateLabel">주문일:</label> <input type="text" value="${orderGroup.orderYmd}"><br>
							<label class="dateLabel">주문그룹번호: </label> <input type="text" id="printOrderNo" value="${orderGroup.orderGroupId}" /><br>
						</div>
					</div>
					<div class="container">
						<div class="quotation">
							<div class="cust">
								<input type="text" value="${orderGroup.custName}"> <span>귀하</span>
							</div>
							<div>
								<label class="contLabel">담당자:</label> <input type="text" value="${orderGroup.regUserName}" disabled><br> 
								<label class="contLabel">차량번호:</label> <input type="text" value="${orderGroup.carNo}" disabled><br> 
								<label class="contLabel">차종:</label> <input type="text" value="${orderGroup.makerName}  ${orderGroup.carType}" disabled><br>
								<label class="contLabel">컬러코드:</label> <input type="text" value="${orderGroup.colorCode}" disabled><br> 
								<label class="contLabel">차대번호:</label> <input type="text" value="${orderGroup.vinNo}" disabled>
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
					<c:set var="sum" value="0" />
					<c:set var="Factsum" value="0" />
					
					<c:forEach var="item" items="${ orderGroupItemList}" varStatus="status">
    				<c:set var="sum" value="${sum + item.unitPrice * item.orderCnt}" /><!-- 일반 할인율 미포함 시 합계금액 + 반품 미포함--> 				
    				<c:set var="Dcsum" value="${Dcsum + item.salePrice * item.orderCnt}" /> <!-- 일반 할인율 포함 합계금액 + 반품 미포함 -->
    				<c:set var="insum" value="${insum + item.unitPrice * item.orderCnt}" /> <!-- 보험 할인율 미포함 합계금액 + 반품 미포함-->
    				
    				<c:set var="sumR" value="${sumR + item.unitPrice *(item.orderCnt - item.riCnt)}" /><!-- 일반 할인율 미포함 시 합계금액 + 반품 포함--> 				
    				<c:set var="DcsumR" value="${DcsumR + item.salePrice *(item.orderCnt - item.riCnt)}" /> <!-- 일반 할인율 포함 합계금액 + 반품 포함 -->
    				<c:set var="insumR" value="${insumR + item.unitPrice *(item.orderCnt - item.riCnt)}" /> <!-- 보험 할인율 미포함 합계금액 + 반품 포함-->
				</c:forEach>				
					<div class="totalBox" style="margin-top:15px;">
						<div class="totalPrice">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<span>  </span> 
								<!-- 반품미포함 -->
							<c:if test="${printDcYN =='N'  && printRiYN !='Y'}">	
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${sum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<c:if test="${printDcYN !='N'  && printRiYN !='Y'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${Dcsum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<%-- <c:if test="${stdClType=='보험' && printRiYN !='Y'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${insum * 1.1}' pattern='#,###' />" disabled>
							</c:if> --%>
							<!-- 반품포함 -->
							<c:if test="${printDcYN =='N' && printRiYN =='Y'}">	
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${sumR * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<c:if test="${printDcYN !='N'  && printRiYN =='Y'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${DcsumR * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<%-- <c:if test="${stdClType=='보험' && printRiYN =='Y'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${insumR * 1.1}' pattern='#,###' />" disabled>
							</c:if> --%>
							<span> 원</span>
						</div>
					</div>
					
				<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
								<div class="divTableCell divTablePartNo">부품번호</div>
								<div class="divTableCell">부품명</div>
								<div class="divTableCell priceCell">주문수량</div>
								<c:if test="${printRiYN =='Y'}">	
									<div class="divTableCell priceCell">반품수량</div>
									<div class="divTableCell priceCell">최종수량</div>
								</c:if>	
								<!--일반건 할인율 적용 x   -->
								<!-- 반품 미포함 -->
								<%-- <c:if test="${printDcYN !='Y' && stdClType=='일반'&& printRiYN !='Y' }">	 --%>
								<c:if test="${printDcYN !='Y'&& printRiYN !='Y' }">	
									<div class="divTableCell priceCell">단가</div>
									<div class="divTableCell priceCell">합계금액</div>
								</c:if>	
								<!-- 반품포함 -->
								<%-- <c:if test="${printDcYN !='Y' && stdClType=='일반'&& printRiYN =='Y' }">	 --%>
								<c:if test="${printDcYN !='Y'&& printRiYN =='Y' }">	
									<div class="divTableCell priceCell">단가</div>
									<div class="divTableCell priceCell">합계금액</div>
								</c:if>
								<!-- 일반건 할인율 적용  -->
								<%-- <c:if test="${printDcYN=='Y' && stdClType=='일반'}">	 --%>
								<c:if test="${printDcYN=='Y'}">	
									<div class="divTableCell priceCell">단가</div>
									<div class="divTableCell ">할인율</div>
									<div class="divTableCell priceCell">할인단가</div>
									<div class="divTableCell priceCell">합계금액</div>
								</c:if>	

								<!-- 보험건 -->
							<%-- 	<c:if test="${stdClType=='보험'}">
									<div class="divTableCell priceCell">단가</div>	
									<div class="divTableCell priceCell">합계금액</div>
								</c:if>			 --%>						
							</div>					
							<div class="divTableBody">
								<%-- <c:set var="sum" value="0" /> --%>
								<c:forEach var="item" items="${ orderGroupItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<div class="divTableCell priceCell ">${item.orderCnt}</div>
										<c:if test="${printRiYN =='Y'}">	
											<div class="divTableCell priceCell ">
												<c:choose>
														<c:when test="${item.riCnt == 0}">0</c:when>
													 	<c:otherwise>-${item.riCnt}</c:otherwise>
											  </c:choose>	
											</div>
										<div class="divTableCell priceCell "> ${item.orderCnt-item.riCnt}</div>
									</c:if>
										<!-- 일반건 할인율 적용x -->
										<%-- <c:if test="${printDcYN =='N' && stdClType=='일반' && printRiYN !='Y' }">	 --%>
										<c:if test="${printDcYN =='N' && printRiYN !='Y' }">	
											<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.unitPrice}" pattern="#,###" />
											</div>
											<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.unitPrice * item.orderCnt}" pattern="#,###" />
											</div>
										</c:if>									
										<%--<c:if test="${printDcYN =='N' && stdClType=='일반' && printRiYN =='Y' }"> --%>
										<c:if test="${printDcYN =='N' && printRiYN =='Y' }">
										<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.unitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.unitPrice * (item.orderCnt - item.riCnt)}" pattern="#,###"/>
											</div>
										</c:if>
											<!-- 일반건 할인율 적용 / 미표기 -->
									<%-- 	<c:if test="${printDcYN =='YY' && stdClType=='일반' && printRiYN !='Y' }">	 --%>
										<c:if test="${printDcYN =='YY' && printRiYN !='Y' }">	
											<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
											</div>
											<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.salePrice * item.orderCnt}" pattern="#,###" />
											</div>
										</c:if>
										<%-- <c:if test="${printDcYN =='YY' && stdClType=='일반' && printRiYN =='Y' }"> --%>
										<c:if test="${printDcYN =='YY'  && printRiYN =='Y' }">
										<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
											</div>
										<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.salePrice * (item.orderCnt - item.riCnt)}" pattern="#,###"/>
											</div>
										</c:if>
										
										<!-- 일반건 할인율 적용 -->
										<%-- <c:if test="${printDcYN=='Y' && stdClType=='일반'}"> --%>
										<c:if test="${printDcYN=='Y'}">
											<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.unitPrice}" pattern="#,###" />
											</div>
											<div class="divTableCell priceCell">
												<c:choose>
													<c:when test="${item.salePrice == 0.00}">0%</c:when>
													<c:when test="${item.salePrice eq null}"> 0</c:when>
													<c:otherwise><fmt:formatNumber value="${1 - item.salePrice/item.unitPrice}" pattern="#,###%" /></c:otherwise>
												</c:choose>
											</div>
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
											</div>
										</c:if>	
									<%-- 	<c:if test="${printDcYN=='Y' && stdClType=='일반' && printRiYN !='Y'}"> --%>
										<c:if test="${printDcYN=='Y'  && printRiYN !='Y'}">
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.salePrice * item.orderCnt}" pattern="#,###" />
											</div>
										</c:if>	
										<%-- <c:if test="${printDcYN=='Y' && stdClType=='일반' && printRiYN =='Y'}"> --%>
										<c:if test="${printDcYN=='Y'  && printRiYN =='Y'}">
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.salePrice * (item.orderCnt - item.riCnt)}" pattern="#,###" />
											</div>
										</c:if>		
										
									
									</div>
									<c:set var="total" value="${total + item.unitPrice * item.orderCnt }" /><!-- 일반건 합계 (센터가)  -->
									<%-- <c:set var="facTotal" value="${facTotal + item.centUnitPrice * item.cnt}" /> --%>
									<c:set var="facDcTotal" value="${facDcTotal + item.salePrice * item.orderCnt}" /><!-- 일반건 합계 (할인가)  -->
									 <c:set var="totalRi" value="${totalRi + item.unitPrice * (item.orderCnt - item.riCnt) }" /><!-- 일반건 합계 (센터가) 반품포함 -->
									<c:set var="facDcRiTotal" value="${facDcRiTotal + item.salePrice * (item.orderCnt - item.riCnt)}" /><!-- 일반건 합계 (할인가)반품포함  -->
								</c:forEach>
							</div>
						</div>
					</div>
				<c:if test="${printRiYN !='Y' && printDcYN != 'YY'}">
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${total}" var="sumWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${total/10}" var="taxWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(total + (total/10))}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div>
					<!-- 할인율 적용시  -->			
					<%-- <c:if test="${stdClType=='일반' && printDcYN=='Y' }">	 --%>
					<c:if test="${printDcYN=='Y' }">	
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facDcTotal + (facDcTotal/10))}"  var="dcTotalWithCommas2" /> 
							<label>합계금액 (할인 적용): </label> <input type="text" id="total2"value="${dcTotalWithCommas2}" disabled>
						</div>
					</c:if>		
					</div>
			</c:if>		
			<c:if test="${printRiYN !='Y' && printDcYN == 'YY'}">
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${facDcTotal}" var="sumDcWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumDcWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${facDcTotal/10}" var="taxDcWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxDcWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facDcTotal + (facDcTotal/10))}"  var="totalDcWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalDcWithCommas}" disabled>
						</div>
					</div>
			</c:if>		
			
			<c:if test="${printRiYN =='Y' && printDcYN != 'YY'}">
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${totalRi}" var="sumRWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumRWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${totalRi/10}" var="taxRWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxRWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(totalRi + (totalRi/10))}"  var="totalRWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalRWithCommas}" disabled>
						</div>
					<!-- 할인율 적용시  -->			
					<%-- <c:if test="${stdClType=='일반' && printDcYN=='Y' }">	 --%>
					<c:if test="${printDcYN=='Y' }">	
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facDcRiTotal + (facDcRiTotal/10))}"  var="dcTotalWithCommas3" /> 
							<label>합계금액 (할인 적용): </label> <input type="text" id="total2"value="${dcTotalWithCommas3}" disabled>
						</div>
					</c:if>		
					</div>
			</c:if>		
			<c:if test="${printRiYN =='Y' && printDcYN == 'YY'}">
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${facDcRiTotal}" var="sumRWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumRWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${facDcRiTotal/10}" var="taxRWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxRWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facDcRiTotal + (facDcRiTotal/10))}"  var="totalRWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalRWithCommas}" disabled>
						</div>
					</div>
			</c:if>		

				</section>

			</div>

 		<footer>
				<c:forEach var="payment" items="${paymentList2}">
					<div style="margin-top: 10px !important;">
						<label> 입금계좌: </label> <span> ${payment.name} &nbsp;${payment.accoutNo}</span>
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
	<script type="text/javascript" src="/resources/pan/js/order-up-print.js?ver=2.1004.3"></script>
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0313.3"></script>


</body>
</html>