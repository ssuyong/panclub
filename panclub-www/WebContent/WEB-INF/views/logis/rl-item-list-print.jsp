<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<!-- <link href="/resources/pan/css/print.css?ver=1.0809.3" rel="stylesheet" /> -->
<link href="/resources/pan/css/rl_print.css?ver=3.1006.3" rel="stylesheet" />
<link href="/resources/pan/css/printing2.css?ver=1.0809.3" rel="stylesheet" />
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

	<input type="hidden" id="orderTypeName" value="${ri.orderTypeName}" />

	<div style="text-align: center;">
		<div class="page" style="max-width: 1200px;" id="page">
			<div class="subpage" id="wrapper">
				<header>
					<div class="title">
					<!-- 	<h1>거 래 명 세 서 (공급자용)</h1> -->
						<h1>거 래 명 세 서_${ri.stdClType}</h1>
						<h2 style="margin-top:-50px">(공급자용)</h2>
						<div class="date">
							<label class="dateLabel">출고일:</label> <input type="text" value="${ri.rlYmd}  "><br>
							<label class="dateLabel">출고번호: </label> <input type="text" id="printOrderNo" value="${ri.rlNo}" /><br>
							<label class="dateLabel">출고방법 : </label> <input type="text" value="${ri.rlWay}" /><br>
								<label class="dateLabel">비고 : </label> <input type="text" value="${ri.memo1}" /><br>
							<!-- <button onclick="download1()">이미지 다운로드</button> -->
						</div>
					</div>
					<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr>
								 <td rowspan="8" style="width: 30px; background-color: #EEE">공급자</td> 
								 <tr>
									<tr>
										<td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList[0].bizNo}" /></td>
									</tr>
									<tr>
										<td class="th">상호</td>
										<td class = "name" ><c:out value="${custList[0].formalName}" /></td>
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
						<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr>
								 <td rowspan="8" style="width: 30px; background-color: #EEE">공급받는자</td> 
								 <tr>
									<tr>
										<%-- <td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList2[0].bizNo}" /></td> --%>
										<td class="th">상호</td>
										<td class ="name" colspan="3" ><c:out value="${custList2[0].formalName}" /></td>
									</tr>
									<tr>
										<%-- <td class="th">상호</td>
										<td><c:out value="${custList2[0].formalName}" /></td> --%>
										<td class="th">대표</td>
										<td colspan="3"><c:out value="${custList2[0].ceoName}" /></td>
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
					</div>
				</header>
				<div class="info">
					<label>담당자:</label> <input type="text" value="${ri.regUserId}"disabled> 
					<label>차번:</label> <input type="text" value="${ri.carNo}" disabled><br> 
					<label>차종:</label> <input type="text" value="${ri.makerCode}  ${ri.carType}" disabled style="width: 230px !important">
					<label style="margin-left: -30px !important;">컬러코드:</label> <input type="text" value="${ri.colorCode}" disabled style="width: 80px !important"> 
					<label style="margin-left: -50px !important;">차대:</label> <input type="text" value="${ri.vinNo}" disabled style="width: 200px !important">
				</div>
				<div id="supplyInfo1" style = " margin-left:-150px; " >
					<label>납품처:</label> <input type="text" value="${ri.supplyCustName}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;  "> 
					<label>담당자:</label> <input type="text" value="${ri.supplyMgrName}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;" > 
					<label>전화번호:</label> <input type="text" value="${ri.supplyMgrPhone}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;">
				</div>		
				<section>
				<c:set var="sum" value="0" />
				<c:set var="sum2" value="0" />
					<c:forEach var="item" items="${ rlItemList}" varStatus="status">
    				<c:set var="sum" value="${sum + item.saleUnitPrice * item.cnt *1.1}" />
    				<c:set var="sum2" value="${sum2 + item.rlSumPrice  *1.1}" />
				</c:forEach>				
					<div class="totalBox">
						<div class="totalPrice">
						<c:if test="${printDcYN=='N'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0"
								value="${sum}" var="totWithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0" value="${totWithCommas}" disabled>
							<span> 원</span>
							</c:if> 	
							<c:if test="${printDcYN=='Y'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum2}" var="sum2WithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0" value="${sum2WithCommas}" disabled>
							<span> 원</span>
							</c:if> 	
							<c:if test="${printDcYN=='YY'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum2}" var="sum2WithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0" value="${sum2WithCommas}" disabled>
							<span> 원</span>
							</c:if> 	
						</div>
					</div>
					<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
								<div class="divTableCell divTablePartNo">부품번호</div>
								<div class="divTableCell">부품명</div>
								<div class="divTableCell priceCell">출고수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">금액</div>
								<c:if test="${printDcYN=='Y'}">
									<!-- <div class="divTableCell priceCell">할인단가</div> -->
								<div class="divTableCell priceCell">할인율</div>	
								<div class="divTableCell priceCell">할인금액</div>
								</c:if	>
							<c:if test="${printMemoYN=='Y'}">			
								<div class="divTableCell ">비고</div>
							</c:if>
							</div>
							<div class="divTableBody">
								<c:set var="sum" value="0" />
								<c:set var="dcsum" value="0" />
								<c:forEach var="item" items="${ rlItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<div class="divTableCell priceCell ">${item.cnt}</div>
									<c:if test="${printDcYN !='YY'}">	
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice * item.cnt}" pattern="#,###" />	
										</div>
										<c:if test="${printDcYN=='Y'}">
											<%-- <div class="divTableCell priceCell ">
											<fmt:formatNumber value= "${item.rlUnitPrice}" pattern="#,###" /></div> --%>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value= "${1-item.rlUnitPrice/item.saleUnitPrice}" pattern="#,###%" /></div>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.rlSumPrice}" pattern="#,###" /></div>
										</c:if>
									</c:if>	 
									<c:if test="${printDcYN=='YY'}">
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.rlUnitPrice}" pattern="#,###" /></div>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.rlSumPrice}" pattern="#,###" /></div>
										</c:if>
									<c:if test="${printMemoYN=='Y'}">		
										<div class="divTableCell divTableCellLeft  ">${item.memo1}</div>
									</c:if>	
									</div>
									<%-- <c:set var="total" value="${total + item.sumPrice}" />
									 --%>
									 <c:set var="total" value="${total + item.saleUnitPrice * item.cnt}" />
									 <c:set var="dcsum" value="${dcsum + item.rlSumPrice}" />
									 <c:set var="discountAmount" value="${total + (total/10) - (dcsum*1.1)}" />
								</c:forEach>
							</div>
						</div>
					</div>
				<c:if test="${printDcYN !='YY'}">
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
							<fmt:formatNumber type="number" pattern="#,##0" value="${total + (total/10)}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div>
						<c:if test="${printDcYN=='Y'}">
							<%-- <div class="total" style=" margin-top: -10px;">
							<fmt:formatNumber type="number" pattern="#,##0" value="${discountAmount}"  var="daWithCommas" /> 
							<label>할인금액: </label> <input type="text" id="total3"value="${daWithCommas}" disabled style=" font-weight: bold;">
						</div> --%>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum*1.1}"  var="sumWithCommas" /> 
							<label>청구금액 (할인 적용): </label> <input type="text" id="total2"value="${sumWithCommas}" disabled>
						</div>
						</c:if> 	
						<c:if test="${deliveryYN =='Y'}">	
						<div class="tax">
							<fmt:formatNumber type="number" pattern="#,##0" value="${ri.deliveryFee}"  var="deliveryFee"/> 
							<label>배송비: </label> <input type="text" id="tax"value="${deliveryFee}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum*1.1+ri.deliveryFee}"  var="sumWithCommas2" /> 
							<label>합계(배송비 포함): </label> <input type="text" id="total"value="${sumWithCommas2}" disabled>
						</div>
					</c:if>	
					</div>
				</c:if>
				<c:if test="${printDcYN =='YY'}">
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum}" var="sumDcWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumDcWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum/10}" var="taxDcWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxDcWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum + (dcsum/10)}"  var="totalDcWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalDcWithCommas}" disabled>
						</div>
						<c:if test="${deliveryYN =='Y'}">	
						<div class="tax">
							<fmt:formatNumber type="number" pattern="#,##0" value="${ri.deliveryFee}"  var="deliveryFee"/> 
							<label>배송비: </label> <input type="text" id="tax"value="${deliveryFee}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(dcsum + (dcsum/10))+ri.deliveryFee}"  var="totalDcWithCommas3" /> 
							<label>합계(배송비 포함): </label> <input type="text" id="total"value="${totalDcWithCommas3}" disabled>
						</div>
					</c:if>	
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
		
		<div class="page-break">
		
		<div style="text-align: center;" id="page2">
		<div class="page" style="max-width: 1200px;">
			<div class="subpage" id="wrapper">
				<header>
					<div class="title">
						<!-- <h1>거 래 명 세 서 (공급받는자용)</h1> -->
						<h1>거 래 명 세 서_${ri.stdClType}</h1>
						<h2 style="margin-top:-50px">(공급받는자용)</h2>
						<div class="date">
							<label class="dateLabel">출고일:</label> <input type="text" value="${ri.rlYmd}  "><br>
							<label class="dateLabel">출고번호: </label> <input type="text" id="printOrderNo" value="${ri.rlNo}" /><br>
						<%-- 	<label class="dateLabel">출고방법 : </label> <input type="text" id="printOrderNo" value="${req.rlWay}" /><br> --%>
							<!-- <button onclick="download1()">이미지 다운로드</button> -->
						</div>
					</div>
					<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr>
								 <td rowspan="8" style="width: 30px; background-color: #EEE">공급자</td> 
								 <tr>
									<tr>
										<td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList[0].bizNo}" /></td>
									</tr>
									<tr>
										<td class="th">상호</td>
										<td class="name"><c:out value="${custList[0].formalName}" /></td>
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
						<div class="company">
							<div class="tableDiv">
								<table class="type03">
								<tr>
								 <td rowspan="8" style="width: 30px; background-color: #EEE">공급받는자</td> 
								 <tr>
									<tr>
									<%-- 	<td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList2[0].bizNo}" /></td> --%>
										<td class="th">상호</td>
										<td class = "name" colspan="3"><c:out value="${custList2[0].formalName}" /></td>										
									</tr>
									<tr>
									<%-- 	<td class="th">상호</td>
										<td><c:out value="${custList2[0].formalName}" /></td> --%>
										<td class="th">대표</td>
										<td colspan="3"><c:out value="${custList2[0].ceoName}" /></td>
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
					</div>
				</header>
				<div class="info">
					<label>담당자:</label> <input type="text" value="${ri.regUserId}"disabled> 
					<label>차번:</label> <input type="text" value="${ri.carNo}" disabled><br> 
					<label>차종:</label> <input type="text" value="${ri.makerCode}  ${ri.carType}" disabled style="width: 230px !important">
					<label style="margin-left: -30px !important;">컬러코드:</label> <input type="text" value="${ri.colorCode}" disabled style="width: 80px !important"> 
					<label style="margin-left: -50px !important;">차대:</label> <input type="text" value="${ri.vinNo}" disabled style="width: 200px !important">
				</div>
				<div id="supplyInfo2" style = " margin-left:-150px; " >
					<label>납품처:</label> <input type="text" value="${ri.supplyCustName}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;  "> 
					<label>담당자:</label> <input type="text" value="${ri.supplyMgrName}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;" > 
					<label>전화번호:</label> <input type="text" value="${ri.supplyMgrPhone}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;">
				</div>		
				<section>
				<c:set var="sum" value="0" />
				<c:set var="sum2" value="0" />
					<c:forEach var="item" items="${ rlItemList}" varStatus="status">
    				<c:set var="sum" value="${sum + item.saleUnitPrice * item.cnt *1.1}" />
    				<c:set var="sum2" value="${sum2 + item.rlSumPrice  *1.1}" />
				</c:forEach>	
					<div class="totalBox">
						<div class="totalPrice">
						<c:if test="${printDcYN=='N'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0"
								value="${sum}" var="totWithCommas" />
							<!-- <span>원정</span> -->
							<span>  </span> <input type="text" style="margin: 0" value="${totWithCommas}" disabled>
							<span> 원</span>
						</c:if> 	
							<c:if test="${printDcYN=='Y'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum2}" var="sum2WithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0" value="${sum2WithCommas}" disabled>
							<span> 원</span>
							</c:if> 	
							<c:if test="${printDcYN=='YY'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum2}" var="sum2WithCommas" />
							<span> </span> <input type="text" style="margin: 0" value="${sum2WithCommas}" disabled>
							<span> 원</span>
							</c:if> 	
						</div>
					</div>
				<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
								<div class="divTableCell divTablePartNo">부품번호</div>
								<div class="divTableCell">부품명</div>
								<div class="divTableCell priceCell">출고수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">금액</div>
								<c:if test="${printDcYN=='Y'}">
									<!-- <div class="divTableCell priceCell">할인단가</div> -->
								<div class="divTableCell priceCell">할인율</div>	
								<div class="divTableCell priceCell">할인금액</div>
								</c:if	>		
							<c:if test="${printMemoYN=='Y'}">		
								<div class="divTableCell ">비고</div>
							</c:if>		
							</div>
							<div class="divTableBody">
								<c:set var="sum" value="0" />
								<c:set var="dcsum" value="0" />
								<c:forEach var="item" items="${ rlItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<div class="divTableCell priceCell ">${item.cnt}</div>
									<c:if test="${printDcYN!='YY'}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice * item.cnt}" pattern="#,###" />	
										</div>
										<c:if test="${printDcYN=='Y'}">
											<%-- <div class="divTableCell priceCell ">
											<fmt:formatNumber value= "${item.rlUnitPrice}" pattern="#,###" /></div> --%>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${1-item.rlUnitPrice/item.saleUnitPrice}" pattern="#,###%" /></div>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.rlSumPrice}" pattern="#,###" /></div>
										</c:if> 
									</c:if>	
									<c:if test="${printDcYN=='YY'}">
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.rlUnitPrice}" pattern="#,###" /></div>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.rlSumPrice}" pattern="#,###" /></div>
										</c:if>
									<c:if test="${printMemoYN=='Y'}">		
										<div class="divTableCell divTableCellLeft  ">${item.memo1}</div>
									</c:if>	
									</div>
									<%-- <c:set var="total" value="${total + item.sumPrice}" />
									 --%>
									 <c:set var="total" value="${total + item.saleUnitPrice * item.cnt}" />
									 <c:set var="dcsum" value="${dcsum + item.rlSumPrice}" />
								</c:forEach>
							</div>
						</div>
					</div>
				<c:if test="${printDcYN !='YY'}">
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${total/2}" var="sumWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${total/10/2}" var="taxWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${total/2 + (total/10/2)}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div>		
						<c:if test="${printDcYN=='Y'}">
						<%-- <div class="total" style=" margin-top: -10px;">
							<fmt:formatNumber type="number" pattern="#,##0" value="${discountAmount}"  var="daWithCommas" /> 
							<label>할인금액: </label> <input type="text" id="total3"value="${daWithCommas}" disabled style=" font-weight: bold;">
						</div> --%>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum*1.1}"  var="sumWithCommas" /> 
							<label>청구금액 (할인 적용): </label> <input type="text" id="total2"value="${sumWithCommas}" disabled>
						</div>
						</c:if> 	
						<c:if test="${deliveryYN =='Y'}">	
						<div class="tax">
							<fmt:formatNumber type="number" pattern="#,##0" value="${ri.deliveryFee}"  var="deliveryFee"/> 
							<label>배송비: </label> <input type="text" id="tax"value="${deliveryFee}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum*1.1+ri.deliveryFee}"  var="sumWithCommas3" /> 
							<label>합계(배송비 포함): </label> <input type="text" id="total"value="${sumWithCommas3}" disabled>
						</div>
					</c:if>	
					</div>
				</c:if>	
				<c:if test="${printDcYN =='YY'}">
					<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum}" var="sumDcWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumDcWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum/10}" var="taxDcWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxDcWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum + (dcsum/10)}"  var="totalDcWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalDcWithCommas}" disabled>
						</div>
					<c:if test="${deliveryYN =='Y'}">	
						<div class="tax">
							<fmt:formatNumber type="number" pattern="#,##0" value="${ri.deliveryFee}"  var="deliveryFee"/> 
							<label>배송비: </label> <input type="text" id="tax"value="${deliveryFee}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(dcsum + (dcsum/10))+ri.deliveryFee}"  var="totalDcWithCommas2" /> 
							<label>합계(배송비 포함): </label> <input type="text" id="total"value="${totalDcWithCommas2}" disabled>
						</div>
					</c:if>	
				</div>	
			</c:if>	
				</section>

			</div>

	<footer>
	
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
	<script type="text/javascript" src="/resources/pan/js/rl-item-list-print.js?ver=1.1013.3"></script>

</body>
</html>