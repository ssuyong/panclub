<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/print.css?ver=1.0817.3" rel="stylesheet" />
<link href="/resources/pan/css/printing2.css?ver=1.0817.3" rel="stylesheet" />
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
						<h1>거 래 명 세 서</h1>
						<h2 style="margin-top:-50px">(공급자용)</h2>
						<div class="date">
							<label class="dateLabel">반입일:</label> <input type="text" value="${ri.riYmd}  "><br>
							<label class="dateLabel">반입번호: </label> <input type="text" id="printOrderNo" value="${ri.riNo}" /><br>
							<label class="dateLabel">반입방법 : </label> <input type="text" value="${ri.riWay}" /><br>
							<label class="dateLabel">비고 : </label> <input type="text" value="${ri.memo1}" /><br>
						</div>
					</div>
					<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr> <td rowspan="8" style="width: 30px!important; background-color: #EEE">공급자</td> <tr>
									<tr>
										<td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList[0].bizNo}" /></td>
									</tr>
									<tr>
										<td class="th">상호</td><td><c:out value="${custList[0].formalName}" /></td>
										<td class="th">대표</td><td><c:out value="${custList[0].ceoName}" /></td>
									</tr>
									<tr>
										<td class="th">주소</td> <td colspan="3"><c:out value="${custList[0].custAddress1}" /></td>
									</tr>
									<tr>
										<td class="th">전화번호</td> <td><c:out value="${custList[0].phone}" /></td>
										<td class="th">팩스</td><td><c:out value="${custList[0].fax}" /></td>
									</tr>
									<tr>
										<td class="th">업태</td> <td><c:out value="${custList[0].bzType}" /></td>
										<td class="th">종목</td> <td><c:out value="${custList[0].bzItems}" /></td>
									</tr>
								</table>
							</div>
						</div>
						<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr><td rowspan="8" style="width: 30px !important; background-color: #EEE">공급받는자</td>  <tr>
									<tr>
										<td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList2[0].bizNo}" /></td>
									</tr>
									<tr>
										<td class="th">상호</td><td><c:out value="${custList2[0].formalName}" /></td>
										<td class="th">대표</td><td><c:out value="${custList2[0].ceoName}" /></td>
									</tr>
									<tr>
										<td class="th">주소</td><td colspan="3"><c:out value="${custList2[0].custAddress1}" /></td>
									</tr>
									<tr>
										<td class="th">전화번호</td><td><c:out value="${custList2[0].phone}" /></td>
										<td class="th">팩스</td><td><c:out value="${custList2[0].fax}" /></td>
									</tr>
									<tr>
										<td class="th">업태</td><td><c:out value="${custList2[0].bzType}" /></td>
										<td class="th">종목</td><td><c:out value="${custList2[0].bzItems}" /></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</header>
			<div class="info">
				<label>담당자:</label> <input type="text" value="${ri.reqUserName}"disabled> 
				<label>차량번호:</label> <input type="text" value="${ri.carNo}" disabled><br> 
				<label>차종:</label><input type="text" value="${ri.makerCode}  ${ri.carType}" disabled>
				<label>차대번호:</label> <input type="text" value="${ri.vinNo}"disabled>
			</div>
			<section>
				<c:set var="sum" value="0" />
				<c:forEach var="item" items="${ riItemList}" varStatus="status">
					<c:set var="sum" value="${sum + item.riUnitPrice* item.cnt *1.1}" />
				</c:forEach>
				<div class="totalBox">
					<div class="totalPrice">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="-${sum}" var="totWithCommas" />
							<span> </span>
							<input type="text" style="margin: 0" value="${totWithCommas}" disabled>
							<span> 원</span>
					</div>
				</div>
				<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
								<div class="divTableCell divTablePartNo">부품번호</div>
								<div class="divTableCell">부품명</div>
								<div class="divTableCell priceCell">반입수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">금액</div>
								<div class="divTableCell ">비고</div>
							</div>
							<div class="divTableBody">
								<c:set var="sum" value="0" />
								<c:set var="dcsum" value="0" />
								<c:forEach var="item" items="${riItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<div class="divTableCell priceCell ">${item.cnt}</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="-${item.riUnitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="-${item.riUnitPrice * item.cnt}" pattern="#,###" />	
										</div>
										<div class="divTableCell divTableCellLeft  ">${item.memo1}</div>
									</div>
									 <c:set var="total" value="${total + item.riUnitPrice * item.cnt}" />
								</c:forEach>
							</div>
						</div>
					</div>			
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="-${total}" var="sumWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="-${total/10}" var="taxWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="-${total + (total/10)}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div>
					</div>			
				</section>
			</div>

	<footer>
				<c:forEach var="payment" items="${paymentList2}">
					<div style="margin-top: 10px !important;">
						<label> 입금계좌: </label> <span> ${payment.name} &nbsp; ${payment.accoutNo}</span>
						<div class="footer- text"> <span>${payment.accOwner} </span></div>
					</div>
				</c:forEach>
			</footer>
 
		</div>
		
		<div class="page-break">
		
		<div style="text-align: center;" id="page2">
		<div class="page" style="max-width: 1200px;">
			<div class="subpage" id="wrapper">
				<header>
					<div class="title">
						<!-- <h1>거 래 명 세 서 (공급받는자용)</h1> -->
						<h1>거 래 명 세 서 </h1>
						<h2 style="margin-top:-50px">(공급받는자용)</h2>
						<div class="date">
							<label class="dateLabel">출고일:</label> <input type="text" value="${ri.riYmd}  "><br>
							<label class="dateLabel">출고번호: </label> <input type="text" id="printOrderNo" value="${ri.riNo}" /><br>
						</div>
					</div>
					<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr>
								 <td rowspan="8" style="width: 30px; background-color: #EEE">공급자</td> 
								 <tr>
									<tr>
										<td class="th">등록번호</td><td colspan="3"><c:out value="${custList[0].bizNo}" /></td>
									</tr>
									<tr>
										<td class="th">상호</td><td><c:out value="${custList[0].formalName}" /></td>
										<td class="th">대표</td><td><c:out value="${custList[0].ceoName}" /></td>
									</tr>
									<tr>    
										<td class="th">주소</td><td colspan="3"><c:out value="${custList[0].custAddress1}" /></td>
									</tr>
									<tr>
										<td class="th">전화번호</td><td><c:out value="${custList[0].phone}" /></td>
										<td class="th">팩스</td><td><c:out value="${custList[0].fax}" /></td>
									</tr>
									<tr>
										<td class="th">업태</td><td><c:out value="${custList[0].bzType}" /></td>
										<td class="th">종목</td><td><c:out value="${custList[0].bzItems}" /></td>
									</tr>
								</table>
							</div>
						</div>
						<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr><td rowspan="8" style="width: 30px; background-color: #EEE">공급받는자</td>  <tr>
									<tr><td class="th">등록번호</td><td colspan="3"><c:out value="${custList2[0].bizNo}" /></td></tr>
									<tr>
										<td class="th">상호</td><td><c:out value="${custList2[0].formalName}" /></td>
										<td class="th">대표</td><td><c:out value="${custList2[0].ceoName}" /></td>
									</tr>
									<tr>
										<td class="th">주소</td>
										<td colspan="3"><c:out value="${custList2[0].custAddress1}" /></td>
									</tr>
									<tr>
										<td class="th">전화번호</td><td><c:out value="${custList2[0].phone}" /></td>
										<td class="th">팩스</td><td><c:out value="${custList2[0].fax}" /></td>
									</tr>
									<tr>
										<td class="th">업태</td><td><c:out value="${custList2[0].bzType}" /></td>
										<td class="th">종목</td><td><c:out value="${custList2[0].bzItems}" /></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</header>
					<div  class="info">
							<label >담당자:</label> <input type="text" value="${ri.reqUserName}" disabled>
							<label >차량번호:</label> <input  type="text" value="${ri.carNo}" disabled><br> 
							<label  >차종:</label> <input  type="text" value="${ri.makerCode}  ${ri.carType}" disabled>
							<label  >차대번호:</label> <input type="text" value="${ri.vinNo}" disabled> 
					</div>
					<section>
				<c:set var="sum" value="0" />
				<c:forEach var="item" items="${ riItemList}" varStatus="status">
					<c:set var="sum" value="${sum + item.riUnitPrice* item.cnt *1.1}" />
				</c:forEach>
				<div class="totalBox">
					<div class="totalPrice">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="-${sum}" var="totWithCommas" />
							<span> </span>
							<input type="text" style="margin: 0" value="${totWithCommas}" disabled>
							<span> 원</span>
					</div>
				</div>
				<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
								<div class="divTableCell divTablePartNo">부품번호</div>
								<div class="divTableCell">부품명</div>
								<div class="divTableCell priceCell">반입수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">금액</div>
								<div class="divTableCell ">비고</div>
							</div>
							<div class="divTableBody">
								<c:set var="sum" value="0" />
								<c:set var="dcsum" value="0" />
								<c:forEach var="item" items="${riItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<div class="divTableCell priceCell ">${item.cnt}</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="-${item.riUnitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="-${item.riUnitPrice * item.cnt}" pattern="#,###" />	
										</div>
										<div class="divTableCell divTableCellLeft  ">${item.memo1}</div>
									</div>
									 <c:set var="total2" value="${total2 + item.riUnitPrice * item.cnt}" />
								</c:forEach>
							</div>
						</div>
					</div>			
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="-${total2}" var="sumWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="-${total2/10}" var="taxWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${total2 + (total2/10)}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="-${totalWithCommas}" disabled>
						</div>
					</div>			
				</section>
			</div>

	<footer>
	
	<c:forEach var="payment" items="${paymentList2}">
			<div style="display: flex; justify-content: space-between;">			
					<div style="margin-top: 10px !important;">
						<label> 입금계좌: </label> <span> ${payment.name} &nbsp; ${payment.accoutNo}</span>
						<div class="footer- text">
							<span>${payment.accOwner} </span>
						</div>
					</div>
				</c:forEach>
				<div  id="last"  style="margin-left: -150px;">
					<span> 인수자:</span> <input type="text" disabled  style="border: none;" ></input> 
				</div>
			</footer>
 		</div>
	</div>
</div>	

	
	
	<!-- 	<script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
	
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0313.3"></script>
	<script type="text/javascript" src="/resources/pan/js/rl-item-list-print.js?ver=1.1012.3"></script>

</body>
</html>