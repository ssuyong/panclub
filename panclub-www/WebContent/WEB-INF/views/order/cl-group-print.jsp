<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>

<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<link href="/resources/pan/css/printClgroup.css?ver=1.0817.3" rel="stylesheet" />
<link href="/resources/pan/css/printing4.css?ver=1.0817.3" rel="stylesheet" />
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
						<c:if test="${clType=='보험'}">
						<h1>부 품 청 구 서 </h1>
						</c:if>
						<c:if test="${clType=='일반'}">
						<h1>거 래 명 세 서 (일반)</h1>
						</c:if>
						<div class="date">
							<label class="dateLabel">청구일자:</label> <input type="text"  id="billingDate" ><br>
							<label class="dateLabel">청구번호: </label> <input type="text" id="printOrderNo" value="${clGroup.clGroupId}" /><br>
						<%-- 	<label class="dateLabel">출고방법 : </label> <input type="text" id="printOrderNo" value="${req.rlWay}" /><br> --%>
							<!-- <button onclick="download1()">이미지 다운로드</button> -->
						</div>
					</div>
				<c:if test="${clType=='일반'}">
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
					</c:if>	
						<c:if test="${clType=='보험'}">
							<div class="company">
								<div class="tableDiv">
								<table class="type03">
								<!-- <tr>
								 <td rowspan="8" style="width: 30px; background-color: #EEE">보험정보</td>  -->
								 <tr>
								 	<tr>
										<td class="th">공업사</td>
										<td colspan="3"><c:out value="${clGroup.custName}" /></td>
									</tr>
									<tr>
										<td class="th">차량번호</td>
										<%-- <td colspan="3"><c:out value="${clGroup.carNo}" /></td> --%>
										<td><c:out value="${clGroup.carNo}" /></td>
										<td class="th">보험사</td>
										<td><c:out value="${insureName}" /></td>
									</tr>
									<tr>
										<td class="th">차종</td>
										<td><c:out value="${clGroup.makerCode}  ${clGroup.carType} " /></td>
										<td class="th">접수번호</td>
										<td><c:out value="${insureAcceptNo}" /></td>
									</tr>
									<tr>
										<td class="th">차대번호</td>
										<td><c:out value="${clGroup.vinNo}" /></td>
										<td class="th">담당자</td>
										<td><c:out value="${insureMgrName}" /></td>
									<tr>
										<td class="th">작성자</td>
										<td><c:out value="${clGroup.regUserName}" /></td>
										<td class="th">전화번호/팩스</td>
										<td><c:out value="${insureMgrPhone}  ${insureMgrFax}" /></td>
									</tr>
								</table>
							</div>
						</div>
					</c:if>	
							
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
				<c:if test="${clType=='일반'}">	
				 <div  class="info" style="margin-top: 2px;">
					<label >담당자:</label> <input type="text" value="${clGroup.regUserId}" disabled>
					<label >차량번호:</label> <input  type="text" value="${clGroup.carNo}" disabled><br> 
					<label  >차종:</label> <input  type="text" value="${clGroup.makerCode}  ${clGroup.carType}" disabled>
					<label  >차대번호:</label> <input type="text" value="${clGroup.vinNo}" disabled>
				</div>				
			</c:if>	 
				<section>
					<c:set var="sum" value="0" />
					<c:set var="Factsum" value="0" />
					
					<c:forEach var="item" items="${ reqItemList}" varStatus="status">
    				<c:set var="sum" value="${sum + item.unitPrice * item.cnt}" /><!-- 일반 할인율 포함 시 합계금액 -->
    				
    				<c:set var="Factsum" value="${Factsum + item.centUnitPrice * item.cnt}" /> <!-- 일반 할인율 미포함 합계금액 -->
    				<c:set var="inssum" value="${inssum + item.unitPrice * item.cnt}" /> <!-- 보험 할인율 미포함 합계금액 -->
    			<c:choose>
    				<c:when test="${item.insureClPrice == null}">	
    					<c:set var="insDcsum" value="${insDcsum + item.unitPrice* item.cnt}" />
    				</c:when>
    				<c:otherwise>
						<c:set var="insDcsum" value="${insDcsum + item.insureClPrice }" /> <!-- 보험 할인율 미포함 합계금액 -->
					</c:otherwise>
				</c:choose>	
				</c:forEach>				
					<div class="totalBox" style="margin-top:15px;">
						<div class="totalPrice">
							<h4>총 금액 : &nbsp;&nbsp;&nbsp;&nbsp;</h4>
						<%-- 	<fmt:formatNumber type="number" pattern="#,##0"
								value="${ri.sumPrice}" var="totWithCommas" /> --%>
							<!-- <span>원정</span> -->
							<span>  </span> 
							<c:if test="${printDcYN =='N' && clType=='일반'}">	
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${Factsum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<c:if test="${printDcYN=='Y' && clType=='일반'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${sum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<c:if test="${printDcYN=='N' && clType=='보험'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${inssum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<c:if test="${printDcYN=='Y' && clType=='보험'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${insDcsum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<!-- 할인율 포함 /미표기 -->
								<c:if test="${printDcYN =='YY' && clType=='일반'}">	
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${sum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<c:if test="${printDcYN=='YY' && clType=='보험'}">		
								<input type="text" style="margin: 0" value="<fmt:formatNumber value='${insDcsum * 1.1}' pattern='#,###' />" disabled>
							</c:if>
							<span> 원</span>
						</div>
					</div>
					<div class="table">
						<div class="divTable">
							<div class="divTableHeading" id="heading">
								<div class="divTableCell divTableCellLft">NO</div>
								<div class="divTableCell divTablePartNo">부품번호</div>
								<div class="divTableCell">부품명</div>
								<div class="divTableCell priceCell">수량</div>
								<!--일반건 할인율 적용 x   -->
								<c:if test="${printDcYN =='N' && clType=='일반'}">	
									<div class="divTableCell priceCell">단가</div>
									<div class="divTableCell priceCell">합계금액</div>
								</c:if>	
								<!--일반건 할인율 적용 /미표기   -->
								<c:if test="${printDcYN =='YY' && clType=='일반'}">	
									<div class="divTableCell priceCell">단가</div>
									<div class="divTableCell priceCell">합계금액</div>
								</c:if>	
								<!-- 일반건 할인율 적용 /표기 -->
								<c:if test="${printDcYN=='Y' && clType=='일반'}">	
									<div class="divTableCell priceCell">단가</div>
									<div class="divTableCell ">할인율</div>
									<div class="divTableCell priceCell">할인단가</div>
									<div class="divTableCell priceCell">할인금액</div>
								</c:if>	
								<!-- 보험건 할인율 적용x -->
								<c:if test="${clType=='보험'}">
									<div class="divTableCell priceCell">단가</div>	
									<div class="divTableCell priceCell">금액</div>
								<c:if test="${printCenterYN =='Y' }">
									<div class="divTableCell priceCell">센터/외부</div>
								</c:if>	
								</c:if>			
								<!-- 보험건 할인율 적용  -->
								<c:if test="${printDcYN=='Y' && clType=='보험'}">	
									<div class="divTableCell">할인율</div>
									<div class="divTableCell priceCell">청구금액</div>
								</c:if>	

								<!-- <div class="divTableCell ">비고</div> -->
							</div>
							
							<div class="divTableBody">
								<%-- <c:set var="sum" value="0" /> --%>
								<c:forEach var="item" items="${ reqItemList}" varStatus="status">
									<div class="divTableRow">
										<div class="divTableCell divTableCellLft  ">${status.count}</div>
										<div class="divTableCell divTableCellLeft  ">${item.itemNo}</div>
										<!-- <div class="divTableCell"></div> -->
										<div class="divTableCell divTableCellLeft  ">${item.itemName}</div>
										<div class="divTableCell priceCell ">${item.cnt}</div>
										<!-- 일반건 할인율 적용x -->
										<c:if test="${printDcYN =='N' && clType=='일반'}">	
											<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.centUnitPrice}" pattern="#,###" />
											</div>
											<div class="divTableCell priceCell ">
												<fmt:formatNumber value="${item.centUnitPrice * item.cnt}" pattern="#,###" />
											</div>
										</c:if>
										<!-- 일반건 할인율 적용/미표기 -->
										<c:if test="${printDcYN =='YY' && clType=='일반'}">	
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.unitPrice }" pattern="#,###" />
											</div>
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.unitPrice * item.cnt}" pattern="#,###" />
											</div>
										</c:if>
										<!-- 일반건 할인율 적용/표기 -->
										<c:if test="${printDcYN=='Y' && clType=='일반'}">
											<div class="divTableCell priceCell ">
												<c:choose>
													<c:when test="${item.centUnitPrice == 0.00}">
														<fmt:formatNumber value="${item.unitPrice * item.cnt}" pattern="#,###" />
													</c:when>
													<c:otherwise>
														<fmt:formatNumber value="${item.centUnitPrice}" pattern="#,###" />
													</c:otherwise>
												</c:choose>
											</div>
											<div class="divTableCell priceCell">
												<c:choose>
													<c:when test="${item.centUnitPrice == 0.00}">
											        0%
											    </c:when>
													<c:when test="${item.centUnitPrice eq null}">
													        0
													    </c:when>
													<c:otherwise>
														<fmt:formatNumber value="${1 - item.unitPrice/item.centUnitPrice}" pattern="#,###%" />
													</c:otherwise>
												</c:choose>
											</div>
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.unitPrice }" pattern="#,###" />
											</div>
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.unitPrice * item.cnt}" pattern="#,###" />
											</div>
										</c:if>
										<!-- 보험 할인율 적용x -->
										<c:if test="${clType=='보험' && printDcYN !='YY' }">
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.unitPrice}" pattern="#,###" />
											</div>
											<div class="divTableCell priceCell">
												<fmt:formatNumber value="${item.unitPrice * item.cnt}" pattern="#,###" />
											</div>
										<c:if test="${printCenterYN =='Y' }">	
											<div class="divTableCell">
												<c:choose>
													<c:when test="${item.centerYN eq 'Y'}"> 
										            센터
										        </c:when>
													<c:otherwise>
										            외부재고
										        </c:otherwise>
												</c:choose>
											</div>
										</c:if>	
											<!-- 보험 할인율 적용 -->
											<c:if test="${printDcYN=='Y'}">
												<div class="divTableCell priceCell">
													<fmt:formatNumber value="${item.insureDcRate*0.01}"
														pattern="#,###%" />
												</div>
												<div class="divTableCell priceCell">
													<%-- <fmt:formatNumber value="${item.insureClPrice}" pattern="#,###" /> --%>
													<c:choose>
													<c:when test="${item.insureClPrice == null}">
														<fmt:formatNumber value="${item.unitPrice * item.cnt}" pattern="#,###" />
													</c:when>
													<c:otherwise>
														<fmt:formatNumber value="${item.insureClPrice}" pattern="#,###" />
													</c:otherwise>
												</c:choose>
												</div>
											</c:if>
										</c:if>
										<!-- 보험 할인율 적용/ 미표기 -->
										<c:if test="${clType=='보험' && printDcYN =='YY' }">
											<div class="divTableCell priceCell">
												<c:choose>
													<c:when test="${item.insureClPrice == null}">
														<fmt:formatNumber value="${item.unitPrice}" pattern="#,###" />
													</c:when>
													<c:otherwise>
														<fmt:formatNumber value="${item.insureClPrice/ item.cnt}" pattern="#,###" />
													</c:otherwise>
												</c:choose>
											</div>
											<div class="divTableCell priceCell">
												<c:choose>
													<c:when test="${item.insureClPrice == null}">
														<fmt:formatNumber value="${item.unitPrice *  item.cnt}" pattern="#,###" />
													</c:when>
													<c:otherwise>
														<fmt:formatNumber value="${item.insureClPrice}" pattern="#,###" />
													</c:otherwise>
												</c:choose>
											</div>
										<c:if test="${printCenterYN =='Y' }">	
											<div class="divTableCell">
												<c:choose>
													<c:when test="${item.centerYN eq 'Y'}"> 
										            센터
										        </c:when>
													<c:otherwise>
										            외부재고
										        </c:otherwise>
												</c:choose>
											</div>										
											</c:if>
										</c:if>
										<%-- <div class="divTableCell divTableCellLeft  ">${item.memo1}</div> --%>
									</div>
									<%-- <c:set var="total" value="${total + item.sumPrice}" />
									 --%>
									<c:set var="total" value="${total + item.sumPrice}" />
									<c:choose>
										<c:when test="${item.insureClPrice == null}">
											<c:set var="dcTotal"
												value="${dcTotal + item.unitPrice* item.cnt}" />
										</c:when>
										<c:otherwise>
											<c:set var="dcTotal" value="${dcTotal + item.insureClPrice}" />
										</c:otherwise>
									</c:choose>
									<c:set var="facTotal" value="${facTotal + item.centUnitPrice * item.cnt}" /><!-- 일반건 합계 (센터가)  -->
									   <c:set var="facDcTotal" value="${facDcTotal + item.unitPrice * item.cnt}" /><!-- 일반건 합계 (할인가)  -->
									   
								</c:forEach>
							</div>
						</div>
					</div>

					<div class="sum">
					<c:if test="${ clType=='보험'  && printDcYN !='YY'}">	
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${facDcTotal}" var="sumWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${facDcTotal/10}" var="taxWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax"value="${taxWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facDcTotal + (facTotal/10))}"  var="totalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total"value="${totalWithCommas}" disabled>
						</div>
					</c:if>	
					<c:if test="${ clType=='일반'  && printDcYN !='YY'}">	
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${facTotal}" var="sumFWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost2" name="supplyCost" value="${sumFWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${facTotal/10}" var="taxFWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax2"value="${taxFWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facTotal + (facTotal/10))}"  var="totalFWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total2"value="${totalFWithCommas}" disabled>
						</div>
					</c:if>	
					<!-- 할인율 적용/미표기 -->
					<c:if test="${ clType=='일반'  && printDcYN =='YY'}">	
						<div>
							<fmt:formatNumber type="number" pattern="#,##0" value="${facDcTotal}" var="sumDCWithCommas" /> 
							<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost2" name="supplyCost" value="${sumDCWithCommas}"disabled />
						</div>
						<div class="tax">
						<fmt:formatNumber type="number" pattern="#,##0" value="${facDcTotal/10}" var="taxDCWithCommas" /> 
							<label>세액: </label> <input type="text" id="tax2"value="${taxDCWithCommas}" disabled>
						</div>
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facDcTotal + (facDcTotal/10))}"  var="dcTotalWithCommas" /> 
							<label>합계금액: </label> <input type="text" id="total2"value="${dcTotalWithCommas}" disabled>
						</div>
					</c:if>	
					<!-- 할인율 적용시/ 표기   -->
					<c:if test="${printDcYN=='Y'  && clType=='보험'}">	
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(dcTotal + (dcTotal/10))}"  var="dcTotalWithCommas" /> 
							<label>청구금액 (할인 적용): </label> <input type="text" id="total2"value="${dcTotalWithCommas}" disabled>
						</div>
					</c:if>			
					<c:if test="${clType=='일반' && printDcYN=='Y' }">	
						<div class="total">
							<fmt:formatNumber type="number" pattern="#,##0" value="${(facDcTotal + (facDcTotal/10))}"  var="dcTotalWithCommas2" /> 
							<label>청구금액 (할인 적용): </label> <input type="text" id="total2"value="${dcTotalWithCommas2}" disabled>
						</div>
					</c:if>		
			<!-- 할인율 적용 / 미표기 -->	
				<c:if test="${ clType=='보험'  && printDcYN =='YY'}">	
							<div>
								<fmt:formatNumber type="number" pattern="#,##0" value="${dcTotal}" var="sumDcInsWithCommas" /> 
								<label for="supplyCost">공급가액: </label> <input type="text" id="supplyCost" name="supplyCost" value="${sumDcInsWithCommas}"disabled />
							</div>
							<div class="tax">
							<fmt:formatNumber type="number" pattern="#,##0" value="${dcTotal/10}" var="taxDcInsWithCommas" /> 
								<label>세액: </label> <input type="text" id="tax"value="${taxDcInsWithCommas}" disabled>
							</div>
							<div class="total">
								<fmt:formatNumber type="number" pattern="#,##0" value="${(dcTotal + (dcTotal/10))}"  var="totalDcInsWithCommas" /> 
								<label>합계금액: </label> <input type="text" id="total"value="${totalDcInsWithCommas}" disabled>
							</div>
						</c:if>		
						<div class="total">
						<%-- <input id="clMemo" type="text" value="${clGroup.memo}"  disabled> --%>
						<input id="clMemo" type="text" value="${insureMemo}"  disabled>
					</div>
					</div>
				</section>
			</div>

	<footer>
					<span> 위 차량에 대한 수리부품으로 귀사(수리공장)가 주문한 아래 부품을 납품하여 그 대금을 상기와 같이 청구합니다. </span> 
	
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
				<!-- <span> 위 차량에 대한 수리부품으로 귀사(수리공장)가 주문한 아래 부품을 납품하여 그 대금을 상기와 같이 청구합니다. </span> 
				<div  id="last"  >
					<span> 위 차량에 대한 수리부품으로 귀사(수리공장)가 주문한 아래 부품을 납품하여 그 대금을 상기와 같이 청구합니다. </span> 
				</div> -->
			</footer>
 		</div>
	</div>
</div>	

	
	
	<!-- 	<script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
	
	<script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0313.3"></script>
	<script type="text/javascript" src="/resources/pan/js/cl-group-print.js?ver=1.1227.3"></script>
<!-- 	<script type="text/javascript" src="/resources/pan/js/rl-item-list-print.js?ver=1.0313.3"></script> -->

</body>
</html>