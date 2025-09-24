<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/rl_print.css?ver=3.1006.3" rel="stylesheet" />
<link href="/resources/pan/css/printing2.css?ver=1.1006.3" rel="stylesheet" />
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

	<input type="hidden" id="orderTypeName" value="${req.orderTypeName}" />
	<input type="hidden" id="pcReqYN" value="${req.pcReqYN}" />
	
	<div class = "page-border"style="text-align: center;">
		<div class="page-break">	
		<div class="page" style="max-width: 1120px;" id="page1">
			<div class="subpage" id="wrapper">
				<header>
					<div class="title">
						<div id='box'></div>
						<h1>출 고 요 청 서_${req.stdClType}</h1>
						<div class="date">
							<label class="dateLabel">출고요청일:</label> <input type="text" value="${req.dmdYmd} ${req.dmdTime} "><br>
							<label class="dateLabel">출고요청번호: </label> <input type="text" id="printOrderNo" value="${req.rlReqNo}" /><br>
							<label class="dateLabel">출고방법 : </label> <input type="text" id="printOrderNo" value="${req.rlWay}" /><br>
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
										<td colspan="3" ><c:out
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
										<td class ="name" colspan="3"><c:out value="${custList2[0].formalName}" /></td>
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
				</header>
					</div>
				
				<div id="info1" class="info"  >
					<label style="margin-right: 10px;">담당자:</label>
					<input type="text" value="${req.regUserId}" disabled style="flex: 1;">
					<label style="margin-right: 10px;">차번:</label>
					<input type="text" value="${req.carNo}" disabled style="flex: 1;">
					<label style="margin-right: 10px;">차종:</label>
					<input type="text" value="${req.makerCode}  ${req.carType}" disabled style="flex: 1;">
					<label style="margin-right: 10px;">컬러코드:</label>
					<input type="text" value="${req.colorCode}" disabled style="flex: 1;">
					<label style="margin-right: 10px;">차대:</label>
					<input type="text" value="${req.vinNo}" disabled style="flex: 3; min-width: 320px;"> <!-- min-width 추가 -->
				</div>
								
				<div id="supplyInfo1" class="info" >
				    <div style="display: flex; align-items: center; ">
				        <label>납품처:</label>
				        <input type="text" value="${req.supplyCustName}" disabled style="border: none; width: 100%; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>담당자:</label>
				        <input type="text" value="${req.supplyMgrName}" disabled style="border: none; width: 100%; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>전화번호:</label>
				        <input type="text" value="${req.supplyMgrPhone}" disabled style="border: none; min-width: 120px; font-size: 16px; font-weight: bold;">
				    </div>
				</div>
				
				<div id="senderInfo" class="info" >
					<div style="display: flex; align-items: center; ">
						<label>발송처:</label>
				        <input type="text" value="${req.senderCustName}" disabled style="border: none; width: 100%; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>담당자:</label>
				        <input type="text" value="${req.senderName}" disabled style="border: none; width: 100%; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>전화번호:</label>
				        <input type="text" value="${req.senderTel}" disabled style="border: none; min-width: 120px; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>주소:</label>
				        <input type="text" value="${req.senderAddr1}" disabled style="border: none; min-width: 450px; font-size: 16px; font-weight: bold;">
			        </div>
				</div>
				
				<div id="receiverInfo" class="info" >
					<div style="display: flex; align-items: center;">
						<label>수령처:</label>
				        <input type="text" value="${req.receiverCustName}" disabled style="border: none; width: 100%; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>담당자:</label>
				        <input type="text" value="${req.receiverName}" disabled style="border: none; width: 100%; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>전화번호:</label>
				        <input type="text" value="${req.receiverTel}" disabled style="border: none; min-width: 120px; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
				        <label>주소:</label>
				        <input type="text" value="${req.receiverAddr1}" disabled style="border: none; min-width: 450px; font-size: 16px; font-weight: bold;">
			        </div>
				</div>
				
				<div id="memoInfo" class="info" >
					<div style="display: flex; align-items: center;">

				        <label >메모:</label>
				        <input type="text" value="${req.memo1}"  disabled style="border: none; min-width: 400px; font-size: 16px; font-weight: bold; margin-bottom: 5px; margin-right: 200px;">
				        <label >지불방법:</label>
				        <input type="text" value="${req.deliPayType}"  disabled style="border: none; width: 100%; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
			        </div>
				</div>
					
				
				 
				<section>
				<c:set var="sum" value="0" />
				<c:set var="dcsum" value="0" />
					<c:forEach var="item" items="${ reqItemList}" varStatus="status">
    				<c:set var="sum" value="${sum + item.saleUnitPrice* item.rlCnt*1.1}" />
    				<c:set var="dcsum" value="${dcsum + item.sumPrice*1.1}" />
				</c:forEach>				
					<div class="totalBox">
						<div class="totalPrice">
						<c:if test="${printDcYN=='N'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum}" var="totWithCommas" />
							<!-- <span>원정</span> -->
							<span></span> <input type="text" style="margin: 0; width:250px;" value="${totWithCommas}" disabled>
							<span> 원</span>
						</c:if> 		
					<c:if test="${printDcYN=='Y'}">
						<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum}" var="dcWithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0; width:250px;" value="${dcWithCommas}" disabled>
							<span> 원</span>
					</c:if> 	
					<c:if test="${printDcYN=='YY'}">
						<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum}" var="dcWithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0; width:250px;" value="${dcWithCommas}" disabled>
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
							<!-- 	<div class="divTableCell">출고요청수량</div> -->
								<div class="divTableCell">수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">금액</div>
								<!-- <div class="divTableCell ">발주처명</div>
								<div class="divTableCell ">창고명</div> -->
								<c:if test="${printDcYN=='Y'}">
								<div class="divTableCell priceCell">할인율</div>
									<!-- <div class="divTableCell priceCell">할인단가</div> -->
								<div class="divTableCell priceCell">할인금액</div>
								</c:if>
								<div class="divTableCell ">발주처명</div>
								<div class="divTableCell ">요청발주처명</div>
								<div class="divTableCell ">대기</div>
								<c:if test="${memoYN=='Y'}">
									<div class="divTableCell">비고</div>
								</c:if>		
							</div>
							<div class="divTableBody">
								<c:set var="sum" value="0" />
								<c:forEach var="item" items="${ reqItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<%-- <div class="divTableCell divTableCellLeft ">${item.rlReqCnt}</div> --%>
										<div class="divTableCell priceCell">${item.rlCnt}</div>
									<c:if test="${printDcYN !='YY'}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice*item.rlCnt }" pattern="#,###" />
										</div>
										<c:if test="${printDcYN=='Y'}">
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value= "${1-item.salePrice/item.saleUnitPrice}" pattern="#,###%" /></div>
											<%-- <div class="divTableCell priceCell ">
											<fmt:formatNumber value= "${item.salePrice}" pattern="#,###" /></div> --%>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.sumPrice}" pattern="#,###" /></div>
										</c:if> 
									</c:if> 	
									<c:if test="${printDcYN =='YY'}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.sumPrice}" pattern="#,###" />
										</div>
									</c:if>
									<div class="divTableCell divTableCellLeft ">${item.placeCustName}</div>
									<div class="divTableCell divTableCellLeft ">${item.reqPlaceCustName}</div>
										<div class="divTableCell divTableCellRight ">${item.rlStandByQty}</div>
										<c:if test="${memoYN=='Y'}">
											<div class="divTableCell">${item.memo1}</div>
										</c:if>
										
										<%-- <div class="divTableCell divTableCellLeft ">${item.placeCustName}</div>
										<div class="divTableCell divTableCellLeft ">${item.storageName}</div>
										<c:if test="${memoYN=='Y'}"> --%>
										<%-- 	<div class="divTableCell">${item.memo1}</div>
										</c:if> --%>
									</div>
									<c:set var="total" value="${total + item.saleUnitPrice *item.rlCnt }" />
									<c:set var="sum" value="${sum + item.sumPrice}" />
									<c:set var="discountAmount" value="${(total + (total/10))/2-(sum*1.1)}" />
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
							<fmt:formatNumber type="number" pattern="#,##0" value="${(total + (total/10))}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div>
					<c:if test="${printDcYN=='Y'}">
					<%-- <div class="total" style=" margin-top: -10px;">
							<fmt:formatNumber type="number" pattern="#,##0" value="${discountAmount}"  var="daWithCommas" /> 
							<label>할인금액: </label> <input type="text" id="total3"value="${daWithCommas}" disabled style=" font-weight: bold;">
						</div> --%>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum*1.1}"  var="sumWithCommas" /> 
							<label>청구금액 (할인 적용): </label> <input type="text" id="total2"value="${sumWithCommas}" disabled>
						</div>
						</c:if> 	
					</div>
				</c:if>
				<c:if test="${printDcYN =='YY'}">          
				<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum}" var="sumDcWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumDcWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum*0.1}" var="taxDcWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxDcWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(sum + (sum/10))}"  var="totalDcWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalDcWithCommas}" disabled>
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
	 
		
	<div class="page-break">
		<div style="text-align: center;">
		<div class="page" style="max-width: 1200px;" id="page2">
			<div class="subpage" id="wrapper">
				<header>
					<div class="title">
					<!-- <h1>거 래 명 세 서 (공급받는자용)</h1> -->
						<h1>거 래 명 세 서_${req.stdClType}</h1>
						<h2 style="margin-top:-50px">(공급받는자용)</h2>
						<div class="date">
							<label class="dateLabel">출고일:</label> <input type="text" value="${req.dmdYmd} ${req.dmdTime} "><br>
							<label class="dateLabel">출고번호: </label> <input type="text" id="printOrderNo" value="${req.rlReqNo}" /><br>
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
										<%-- <td class="th">등록번호</td>
										<td colspan="3"><c:out value="${custList2[0].bizNo}" /></td> --%>
										<td class="th">상호</td>
										<td class = "name"  colspan="3" ><c:out value="${custList2[0].formalName}" /></td>
									</tr>
									<tr>
										<%-- <td class="th">상호</td>
										<td><c:out value="${custList2[0].formalName}" /></td> --%>
										<td class="th">대표</td>
										<td   colspan="3" ><c:out value="${custList2[0].ceoName}" /></td>
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
						<label>담당자:</label> <input type="text" value="${req.regUserId}"disabled> 
						<label  style="margin-left: -30px !important;">차번:</label> <input type="text" value="${req.carNo}" disabled><br> 
						<label  style="margin-left: -30px !important;">차종:</label> <input type="text" value="${req.makerCode}  ${req.carType}" disabled style="width: 230px !important">
						<label style="margin-left: -30px !important;">컬러코드:</label> <input type="text" value="${req.colorCode}" disabled style="width: 80px !important"> 
						<label style="margin-left: -50px !important;">차대:</label> <input type="text" value="${req.vinNo}" disabled style="width: 230px !important">
					</div>
					<div id="supplyInfo2" style = " margin-left:-150px; " >
						<label>납품처:</label> <input type="text" value="${req.supplyCustName}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;  "> 
						<label>담당자:</label> <input type="text" value="${req.supplyMgrName}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;" > 
						<label>전화번호:</label> <input type="text" value="${req.supplyMgrPhone}" disabled style = "border: none; width:230px !important; font-size: 16px; font-weight: bold;">
					</div>
				<section>
				<c:set var="sum" value="0" />
				<c:set var="dcsum" value="0" />
					<c:forEach var="item" items="${ reqItemList}" varStatus="status">
    				<c:set var="sum" value="${sum + item.saleUnitPrice* item.rlCnt*1.1}" />
    				<c:set var="dcsum" value="${dcsum + item.sumPrice*1.1}" />
				</c:forEach>				
					<div class="totalBox">
						<div class="totalPrice">
						<c:if test="${printDcYN=='N'}">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum}" var="totWithCommas" />
							<!-- <span>원정</span> -->
							<span></span> <input type="text" style="margin: 0; width:250px;" value="${totWithCommas}" disabled>
							<span> 원</span>
						</c:if> 		
					<c:if test="${printDcYN=='Y'}">
						<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum}" var="dcWithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0; width:250px;" value="${dcWithCommas}" disabled>
							<span> 원</span>
					</c:if> 	
					<c:if test="${printDcYN=='YY'}">
						<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcsum}" var="dcWithCommas" />
							<!-- <span>원정</span> -->
							<span> </span> <input type="text" style="margin: 0; width:250px;" value="${dcWithCommas}" disabled>
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
							<!-- 	<div class="divTableCell">출고요청수량</div> -->
								<div class="divTableCell">수량</div>
								<div class="divTableCell priceCell">단가</div>
								<div class="divTableCell priceCell">금액</div>
								<!-- <div class="divTableCell ">발주처명</div>
								<div class="divTableCell ">창고명</div> -->
								<c:if test="${printDcYN=='Y'}">
								<div class="divTableCell priceCell">할인율</div>
									<!-- <div class="divTableCell priceCell">할인단가</div> -->
								<div class="divTableCell priceCell">할인금액</div>
								</c:if	>		
							</div>
							<div class="divTableBody">
								<c:set var="sum" value="0" />
								<c:forEach var="item" items="${ reqItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<%-- <div class="divTableCell divTableCellLeft ">${item.rlReqCnt}</div> --%>
										<div class="divTableCell priceCell">${item.rlCnt}</div>
									<c:if test="${printDcYN !='YY'}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.saleUnitPrice*item.rlCnt }" pattern="#,###" />
										</div>
										<c:if test="${printDcYN=='Y'}">
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value= "${1-item.salePrice/item.saleUnitPrice}" pattern="#,###%" /></div>
											<%-- <div class="divTableCell priceCell ">
											<fmt:formatNumber value= "${item.salePrice}" pattern="#,###" /></div> --%>
											<div class="divTableCell priceCell ">
											<fmt:formatNumber value=  "${item.sumPrice}" pattern="#,###" /></div>
										</c:if> 
									</c:if> 	
									<c:if test="${printDcYN =='YY'}">
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.salePrice}" pattern="#,###" />
										</div>
										<div class="divTableCell priceCell">
											<fmt:formatNumber value="${item.sumPrice}" pattern="#,###" />
										</div>
									</c:if>
										
										<%-- <div class="divTableCell divTableCellLeft ">${item.placeCustName}</div>
										<div class="divTableCell divTableCellLeft ">${item.storageName}</div>
										<c:if test="${memoYN=='Y'}"> --%>
										<%-- 	<div class="divTableCell">${item.memo1}</div>
										</c:if> --%>
									</div>
									<c:set var="total" value="${total + item.saleUnitPrice *item.rlCnt }" />
									<c:set var="sum" value="${sum + item.sumPrice}" />
									<c:set var="discountAmount" value="${(total + (total/10))/2-(sum*1.1)}" />
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
							<fmt:formatNumber type="number" pattern="#,##0" value="${(total + (total/10))/2}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div>
					<c:if test="${printDcYN=='Y'}">
					<%-- <div class="total" style=" margin-top: -10px;">
							<fmt:formatNumber type="number" pattern="#,##0" value="${discountAmount}"  var="daWithCommas" /> 
							<label>할인금액: </label> <input type="text" id="total3"value="${daWithCommas}" disabled style=" font-weight: bold;">
						</div> --%>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum*1.1}"  var="sumWithCommas" /> 
							<label>청구금액 (할인 적용): </label> <input type="text" id="total2"value="${sumWithCommas}" disabled>
						</div>
						</c:if> 	
					</div>
				</c:if>
				<c:if test="${printDcYN =='YY'}">          
				<div class="sum">
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${sum}" var="sumDcWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumDcWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${sum*0.1}" var="taxDcWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxDcWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(sum + (sum/10))}"  var="totalDcWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalDcWithCommas}" disabled>
						</div>
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
				<div style="margin-left: -150px;">
					<span> 인수자:</span> <input type="text" disabled  style="border: none;" ></input> 
				</div>
			</footer>
 		</div>
	</div>

	<!-- 20240711 supi  용인 요청으로 그린파츠는 출고요청서 3장나오는 부분 한장만 나와도 된다고 함(박준영팀장님 요청) -> 2장으로 수정   -->

	<% if(!("ㄱ121").equals(((String) session.getAttribute("comCode")))) { %>
	
	<div class="info_page" style="width: 100vw;" id="page3">
		<!-- <div class= "info_page">	 -->
		<div class="cell">
			<div class="car_info">${req.carNo}</div>
	    </div>
	    <div class="cell">
	      <div class="car_info">${req.makerCode} ${req.carType}</div>
	    </div>
	    <div class="cell">
	      <div class="car_info">${custList2[0].formalName}</div>
	    </div>
	    <div id="supplyInfo3" class="cell">
	      <div class="car_info">${req.supplyCustName}</div>
	    </div>
	    <div class="cell">
	      <div class="car_info">${custList[0].formalName}</div>
	    </div>
	</div>
	<% } %>
	 
	
	
	<!-- 	<script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
	<script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script>
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0507.3"></script>
	<script type="text/javascript" src="/resources/pan/js/rl-req-item-list-print.js?ver=1.0919.4"></script>

</body>
</html>