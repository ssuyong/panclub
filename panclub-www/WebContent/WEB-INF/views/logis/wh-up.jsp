<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>발주 입고</title>
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	
	<!-- BEGIN: TimePicker -->
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
	<!--END: TimePicker  -->
	
	<script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
    <script type="text/javascript" src="/resources/js/jquery.form.js"></script>  <!-- file ajax upload -->
    
    <!-- fancyBox -->
<script type="text/javascript"
	src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript"
	src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
	
	
	<style type="text/css">
	/* 커스텀 summary total  스타일 */
	.aui-grid-my-footer-sum-total {
		font-weight: bold;
		color: #4374D9;
	}

	.aui-grid-my-footer-sum-total2 {
		text-align: right;
	}

	.my-right-column {
		text-align: right;
	}

	/* 커스텀 열 스타일 */
	.my-column-style {
		background: #eeeeee;
		color: #005500;
		font-weight: bold;
	}

	/* 커스텀 열 스타일 */
	.my-column-style2 {
		background: #FFEBFE;
		color: #0000ff;
		font-weight: bold;
	}

	/* 커스텀 행 스타일 */
	.my-row-style {
		background: #9FC93C;
		font-weight: bold;
		color: #22741C;
	}

	/* 커스텀 셀 스타일 */
	.my-cell-style {
		background: #FF007F;
		font-weight: bold;
		color: #fff;
	}
</style>

  </head>
  <body  class=" layout-fluid">
    <div class="page">
      
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
        <div class="spinner" id="spinner"></div>
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->
                <h2 class="page-title">
                  발주 입고
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <button class="btn btn-primary" id="btnPrint">인쇄</button>
            <!-- <button class="btn btn-primary disabled " id="btnUpt">수정</button> -->
            <!-- <button class="btn btn-primary disabled " id="btnDel">삭제</button> -->
        </div>
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
	
                   <input type="hidden" name="reqArr" id="reqArr" value="${reqArr}" >
                   <input type="hidden" name="seqArr" id="seqArr" value="${seqArr}" >
                   
                    <input type="hidden" name=placeNoArr id="placeNoArr" value="${placeArr}" >
                    <input type="hidden" name="placeSeqArr" id="placeSeqArr" value="${placeSeqArr}" >
                   
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">발주일</label>
                      	<input type=hidden id="prmsYmd" value=${sYmd} >
						<input type=hidden id="prmeYmd" value=${eYmd} >
												
						<div class="row" style="display: contents;">
						    <div class="col-md-6" style="width: auto">										       
						       <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
							        <input id="startpicker-input" type="text" aria-label="Date">
							        <span class="tui-ico-date"></span>
							        <div id="startpicker-container" style="margin-left: -1px;"></div>
							    </div>
							    <span>~</span>
							    <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
							        <input id="endpicker-input" type="text" aria-label="Date">
							        <span class="tui-ico-date"></span>
							        <div id="endpicker-container" style="margin-left: -1px;"></div>
							    </div>
						    </div>
						    <!-- 미입고조회때문에 넣었는데 너무 많은조회가 된다(19년도미입고까지 조회)-->
						    	<div class="col" style="margin-top: 3px; display:none;">
									<label class="form-check form-check-inline" style="margin-top: 3px"> 기간 전체조회
									<input class="form-check-input" type="checkbox" id="ymdIgnoreYN" name="ymdIgnoreYN" > </label>
								</div> 
						</div>
						
						<label class="col-3 col-form-label" style="min-width: 50px; width:auto;">입고예상일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="whSchYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper4" style="margin-top: -1px;"></div>
				        
                      </div>
						
						<label class="col-3 col-form-label" style="min-width: 50px; width:auto;">입고일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="whYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper2" style="margin-top: -1px;"></div>
				        
                      </div>
                     <label class="col-3 col-form-label" style="min-width: 50px; width:auto;">입고예상시간</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="whSchTime" aria-label="Date-Time">
				        </div>
				        <div id="wrapper7" style="margin-top: -1px;"></div>				        
                      </div>
                          
                    <label class="col-3 col-form-label" style="min-width: 50px; width:auto;display:none;">발주처 출고일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="rlSchYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper5" style="margin-top: -1px;"></div>
				        
                      </div>
                    
                      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">거래처주문번호</label>
                      <div class="col">
                        <input type="text" id="custOrderNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      
 					  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                        <input type="text" id="orderGroupId" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                     <!--  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문번호</label>
                      <div class="col">
                        <input type="text" id="orderNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div> -->
                      </div>
                       <div class="form-group mb-3 row">                   
                    	<span style="float:right;">
						<label class="form-check form-check-inline" style="margin-bottom: 0px;">			
			                <input class="form-check-input" type="radio" name="bizNo" value="2208140833" >
			                <span class="form-check-label">파츠몰</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="bizNo" value="2068704075" >
			                <span class="form-check-label">글로젠</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="bizNo"  value="1258130627" >
			                <span class="form-check-label">한라홀딩스</span>
			            </label>
			          <!--   <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="custCode"  value="ㅇ262" >
			                <span class="form-check-label">SK(오케이상사_로컬)</span>
			            </label> -->
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="bizNo" value="etc" >
			                <span class="form-check-label">기타</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
											 <input class="form-check-input" type="radio" name="bizNo" value="전체"> 
											 <span class="form-check-label">전체</span>
										</label>
		            	</span> 
		            	<label class="col-3 col-form-label"
											style="min-width: 59px; width: auto;">발주처</label>
										<div class="col" style="display: contents;">

											<input type="text" id="custCode" class="form-control"
												aria-describedby="" placeholder="거래처코드"
												style="display: initial; width: 48%; max-width: 100px;"
												value="${custCode}" onKeyUp="findCust(this,'custName');"
												ondblclick="findCust(this,'custName',0,'Y');"> <input
												type="text" id="custName" class="form-control"
												aria-describedby="" placeholder="거래처명"
												style="display: initial; width: 48%; max-width: 200px;"
												disabled>
										</div>
						<label class="col-3 col-form-label" style="min-width: 60px; width: auto; margin-left:15px">주문처</label>
										<div class="col" style="display: contents;">
											<input type="text" id="rcvCustCode" class="form-control"
												aria-describedby="" placeholder="거래처코드"
												style="display: initial; width: 48%; max-width: 100px;"
												value="${custCode}" required
												onKeyUp="findCust(this,'supplyCustName');"> <input
												type="text" id="supplyCustName" class="form-control"
												aria-describedby="" placeholder="거래처명"
												style="display: initial; width: 48%; max-width: 200px;"
												disabled>
										</div>
				<label class="col-3 col-form-label " style="min-width: 20px; width: auto; margin-left:145px">부품ID</label>
                      <div class="col">
                        <input type="text" id="itemId" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>				
						
				<label class="col-3 col-form-label " style="min-width: 20px; width: auto; margin-left:15px">품번</label>
                      <div class="col">
                        <input type="text" id="itemNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                 <label class="col-3 col-form-label " style="min-width: 20px; width: auto; margin-left:15px">발주번호</label>
                      <div class="col">
                        <input type="text" id="placeNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>    
                  <label class="col-3 col-form-label " style="min-width: 20px; width:auto;">주문번호</label>
                      <div class="col">
                        <input type="text" id="orderNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>      
						
		          </div>
		            <div class="form-group mb-3 row">
		            	  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">관리지점</label>
			                      <div class="col"style="display: contents;">
			                       <select class="form-select" id="branchCode"  style="width:20%; max-width:100px;">
			                      		<option></option>
			                      	</select>
			                      </div>
																							
						<label class="col-3 col-form-label "
											style="min-width: 80px; width: auto; margin-left:15px">입고상태</label>
										<div class="col"  style="display: contents;">
											<select id="whStatus" class="form-select"
												style="width:20%;max-width:100px; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="미입고">미입고</option>
												<option value="창고입고">창고입고</option>
											</select>
										</div>
						<label class="col-3 col-form-label "
											style="min-width: 80px; width: auto; margin-left:15px">입고가등록  </label>
										<div class="col"  style="display: contents;">
											<select id="whUnitPriceReg" class="form-select"
												style="width:20%; max-width:100px; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="미완료">미완료</option>
												<option value="입고가완">입고가완</option>
											</select>
										</div>  
<!-- 							<label class="col-3 col-form-label "style="min-width: 80px; width: auto; margin-left:15px">배송유형  </label>
										<div class="col">
											<select id="dlvType" class="form-select" style="width:20%; max-width:100px; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="일반">일반</option>
												<option value="배송대행">배송대행</option>
												<option value="직수령">직수령</option>
											</select>
										</div>   -->		
										
										<label class="col-3 col-form-label "style="min-width: 80px; width: auto; margin-left:15px">요청업체  </label>
										<div class="col">
											<select id="gvComCode" class="form-select" style="width:20%; max-width:100px; padding: 2px 25px 2px 0;">
												<option value=""></option>
												<option value="ㄱ000">P</option>
												<option value="ㅇ413">임파츠</option>
												<option value="ㅇ434">에스제이파츠</option>
												<option value="ㅇ436">에스디파츠</option>
												<option value="ㅇ439">오토픽스</option>
												<option value="ㅋ127">케이에스파츠</option>
												 
											</select>
										</div>  
										
<%-- 										 <% if (("ㄱ000").equals(comCode))  {%>  --%>
<!-- 									      <label class="col-3 col-form-label" -->
<!-- 											style="min-width: 30px; width: auto;">요청업체</label> -->
<!-- 										<div class="col"> -->

<!-- 											<input type="text" id="gvComCode" class="form-control" -->
<!-- 												aria-describedby="" placeholder="요청업체코드" -->
<!-- 												style="display: initial; width: 48%; max-width: 100px;" -->
<%-- 												value="${gvComCode}" onKeyUp="findCust(this,'gvComCodeName');" --%>
<!-- 												ondblclick="findCust(this,'gvComCodeName',0,'Y');"> <input -->
<!-- 												type="text" id="gvComCodeName" class="form-control" -->
<!-- 												aria-describedby="" placeholder="요청업체명" -->
<!-- 												style="display: initial; width: 48%; max-width: 200px;" -->
<!-- 												disabled> -->
<!-- 										</div> -->
<%-- 										<%} %> 	         --%>
		            </div>
                   
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                  		<input type="button" class="btn btn-secondary" onclick="whUp('/logis/whAdd')" value="창고입고">
	                  		<input type="button" class="btn btn-secondary" onclick="priceChk('/logis/whItemAdd','CHK')" value="입고가확인">
	                  		<input type="button" class="btn btn-secondary" onclick="priceChk('/logis/whItemAdd','CANCEL')" value="입고가확인취소">
	                  		<input type="button" class="btn btn-secondary" onclick="buyChk('/order/placeItemAdd')" value="매입확정" style="display:none;">
	                  		<input type="button" class="btn btn-secondary" onclick="whItemChn('/logis/whItemChn')" value="품번변경">
	                  		
	                  		<!-- <input type="button" class="btn btn-secondary" onclick="place()" value="입고가입력">
	                  		<input type="button" class="btn btn-secondary" onclick="removeRow1()" value="출금요청">
	                  		<input type="button" class="btn btn-secondary" onclick="removeRow1()" value="출금요청취소">	         -->   	                  	
	                 	</span> 
	                 	<span style="display: initial; float: right; margin-right: 10px;'">
							<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
						</span>
											<!-- 	<span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary" onclick="removeRow1()" value="인쇄">
                      	</span> -->
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:55vh;"></div>
<!--                       <div style="margin : 2px 0px 0;">
                      	<input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
                      	<input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제">
                      </div> -->
                    </div>  

                   <!--  <div class="form-footer">
                      <button type="submit" class="btn btn-primary">등록</button>
                    </div> -->
                 <!--  </form> -->
                </div>
                
              </div>

            </div>
<!--             <div class="form-footer1">
            	<button type="submit" class="btn btn-primary" id="btnReg">등록</button>
            </div> -->
          </div>
        </div>
        
      </div>
        
 
    </div>
    </div>

<!-- 	<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-simple">
    	Simple modal
    </a>
                 -->  
                 
  

     
    
  
     
	  
    
    <!-- 상품선택 팝업 -->
	<div id="dialog-form-item" title="상품 선택" style="display:none;">
		<input type="text" id="pop_itemNo" placeholder="품번">
		<input type="text" id="pop_itemName"  placeholder="품명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
		<button class="btn btn-blue" id="btnItemAdd" onClick='openRegItemDialog()'>부품등록</button>
	  	<div id="grid_wrap_item" style=" height:90%;"></div>
	</div>
    
       
    <!-- 거래처선택 팝업 -->
		<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
			<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
			<input type="text" id="pop_cust_srch" placeholder="거래처명">
			<button class="btn btn-dark" id="btnCustFind">조회</button>
			<div id="grid_wrap_cust" style="height: 90%;"></div>
		</div>

	<!--230308 장윤상 아이템 등록 dialog -->
	<div id="dialog-form-RItem" title="부품등록" style="display: none;">

		<div style="padding: 0 0 10px 14px;">
			<button class="btn btn-primary" id="btnRegItemDialog">저장</button>
			<button class="btn btn-primary  " id="btnCloseItemDialog">닫기</button>
		</div>

		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards">

					<div class="*col-md-6">
						<div class="card">

							<div class="card-body">
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">제조사</label>
									<div class="col">
										<select id="makerCodeReg" class="form-select"
											style="width: auto; padding: 2px 20px 2px 0;"> <!--onChange='fn_itemCodeCreate()'  -->
											<option value=""></option>
										</select>
									</div>
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">차종</label>
									<div class="col">
										<input type="text" id="carTypeReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">품번</label>
									<div class="col">
										<input type="text" id="itemNoReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">공장품번</label>
									<div class="col">
										<input type="text" id="factoryNoReg" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">부품명</label>
									<div class="col">
										<input type="text" id="itemNameReg" class="form-control"
											style="*width: 60%; max-width: 800px;" placeholder="">
									</div>
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label"
										style="min-width: 118px; width: auto;">영문부품명</label>
									<div class="col">
										<input type="text" id="itemNameEnReg" class="form-control"
											style="*width: 60%; max-width: 800px;" placeholder="">
									</div>
								</div>

								<div class="form-group mb-3 row">

									<label class="col-3 col-form-label required"
										style="min-width: 118px; width: auto;">클래스</label>
									<div class="col">
										<select id="classCodeReg" class="form-select"
											style="width: auto; padding: 2px 25px 2px 0;"> <!-- onChange='fn_itemCodeCreate()' -->
											<option value="GN">정품</option>
											<option value="AM">애프터마켓</option>
											<option value="RM">재제조</option>
											<option value="ET">기타</option>
										</select>
									</div>
								</div>

								<div class="form-group mb-3 row" style="*min-width: 30px;">
									<label class="col-3 col-form-label" style="min-width: 118px; width: auto; ">센터가</label>
									<div class="col">
										<input type="number" id="centerPriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: inline-block;"
											placeholder="">원

									</div>
									<label class="col-3 col-form-label" style="min-width: 70px; width: auto; ">입고단가</label>
									<div class="col">
										<input type="number" id="inPriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: initial;"
											placeholder="">원
									</div>
									<label class="col-3 col-form-label" style="min-width: 70px; width: auto; ">판매단가</label>
									<div class="col">
										<input type="number" id="salePriceReg" min="0" step="10"
											value="0" class="form-control"
											style="width: 90px; max-width: 100px; padding-right: 12px; display: initial;"
											placeholder="">원
									</div>
									<label class="col-3 col-form-label"
										style="min-width: 118px; width: auto;">&nbsp</label>
									<div class="col">&nbsp;</div>
								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>	
		
		<!-- 창고입고 팝업 -->
	<div id="dialog-form" title="창고 입고" style="display: none;">
		
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">발주처</label>
	      <div class="col">
	        <div class="">
	        	<input type="hidden" id="popCustCode" value="" />
	          	<input type="text" class="" id="popCustName" disabled>
	      	</div>
	  	  </div>    
		
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">입고일(발주처출고일을 입력)</label>
	      <div class="col">
	        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
	          <input type="text" id="popWhYmd" aria-label="Date-Time">
	          <span class="tui-ico-date"></span>
	      	</div>
	      	<div id="wrapper" style="margin-top: -1px;"></div>				        
	  	  </div> 
	  	  
	  	  <!-- <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">발주처출고일</label>
	      <div class="col">
	        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
	          <input type="text" id="popPlRlYmd" aria-label="Date-Time">
	          <span class="tui-ico-date"></span>
	      	</div>
	      	<div id="wrapper3" style="margin-top: -1px;"></div>				        
	  	  </div> -->   
	  	  
	 	  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">입고창고</label>
	      <div class="col">
	        <div class="">
	        	<!-- <input type="hidden" id="popStorageCode" value="" />
	          	<input type="text" class="" id="popStorageName"  value="" disabled > -->
	          	<select id="popStorageCode" onChange="resetRackInfo()">
	          	<option></option>
				</select>
	      	</div>
	  	  </div>    
	 	  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">입고랙</label>
	      <div class="col">
	        <div class="row">
	        	<!-- <input type="hidden" id="popRackCode" value="" />
	          	<input type="text" class="" id="popRackName" value=""  disabled> -->
	          	<input type="text" id="popRackCode" class="form-control"	style="width: 60%; max-width: 100px;" placeholder=""  disabled>
				<input type="text" id="popRackName" class="form-control"	style="width: 60%; max-width: 300px;" placeholder=""  disabled>
				<span class="col" style="margin-left: -10px;">
				<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;"
					 onClick="commonFindRackCall('popStorageCode','','popRackCode','popRackName','','Y');">
				</span>
	      	</div>
	  	  </div>    
  	  <div style="margin-top:10px; color:darkRed;">
	  	* 입고번호는 발주번호별로 생성됩니다.<br>
	  	* 입고일은 실입고일이 아닌 발주처에서 출고한 일자를 입력하세요.
	  </div>
	</div>
	
	<!-- 품목변경 팝업 -->
	<div id="dialog-form-itemChn" title="품번변경" style="display: none;">
		<input type="hidden" id="form-itemId1" name="form-itemId1" value="">
		<input type="hidden" id="form-itemNo1" name="form-itemNo1" value="">
		<input type="hidden" id="form-itemUnitPrice1" name="form-itemNo1" value="">
		
		<div class="form-group mb-3 row" style="margin-top:5px;">
			  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">발주번호</label>
		      <div class="col">
		        <div class="">
		          	<input type="text" class="" id="popPlaceNo" disabled>
		      	</div>
		  	  </div>    
		  	  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">발주순번</label>
		      <div class="col">
		        <div class="">
		          	<input type="text" class="" id="popPlaceSeq" disabled>
		      	</div>
		  	  </div>
		  	  <label class="col-3 col-form-label " style="min-width: 80px; width:auto;">&nbsp;</label>
		      <div class="col">
		        <div class="">	          	&nbsp;		      	</div>
		  	  </div>        
		 </div>
		 <div class="form-group mb-3 row" style="margin-top:5px;"> 	  
			  <label class="col-3 col-form-label " style="min-width: 80px; width:auto;">주문그룹ID</label>
		      <div class="col">
		        <div class="">
		          	<input type="text" class="" id="popOrderGroupId" disabled>
		      	</div>
		  	  </div>    
		  	  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">주문번호</label>
		      <div class="col">
		        <div class="">
		          	<input type="text" class="" id="popOrderNo" disabled>
		      	</div>
		  	  </div>
		  	  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">주문순번</label>
		      <div class="col">
		        <div class="">
		          	<input type="text" class="" id="popOrderSeq" disabled>
		      	</div>
		  	  </div>
		 </div>
		 <div class="form-group mb-3 row" style="margin-top:15px;">	
		  	  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">선택부품ID</label>
		      <div class="col">
		        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
		          <input type="text" class="" id="popItemIdPrev" disabled>
		      	</div>
		  	  </div>
			  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">선택품번</label>
		      <div class="col">
		        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
		          <input type="text" class="" id="popItemNoPrev" disabled>
		      	</div>
		  	  </div>    
		  	  <label class="col-3 col-form-label " style="min-width: 80px; width:auto;">판매단가</label>
		      <div class="col">
		        <div class="">	 <input type="text" class="" id="popSaleUnitPricePrev" disabled>	      	</div>
		  	  </div>    
		 </div>
		 <div class="form-group mb-3 row" style="margin-top:5px;"> 
		 	<label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">변경부품ID</label>
		      <div class="col">
		        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
		          <input type="text" class="" id="popItemIdNew" disabled>
		      	</div>
		  	  </div>	  
			  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">변경품번</label>
		      <div class="col">
		        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
		          <input type="text" class="" id="popItemNoNew"  onKeyUp="findItemCall(this,'N');" ondblclick="findItemCall('popItemNoNew','Y');">
		          <span style="position:fixed;">
		          	<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;" onClick="findItemCall('popItemNoNew','Y');">
		          </span>
		      	</div>
		  	  </div>
		  	  <label class="col-3 col-form-label required" style="min-width: 80px; width:auto;">변경단가</label>
		      <div class="col">
		        <div class="">	 <input type="text" class="" id="popSaleUnitPriceNew" >	      	</div>
		  	  </div>    	  	      
	  	</div>  
	  	
	  	<!-- <div class="form-group mb-3 row" style="margin-top:15px;">
          <label class="col-3 col-form-label">주문그룹ID 전체변경</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="allItemChnYN" name="allItemChnYN" checked>
          </div>          
        </div>
        
	  	<div style="margin-top:10px; color:darkRed;">
	  	* '주문그룹ID 전체변경'은 주문그룹ID 내의 선택품번이 모두 변경품번으로 적용됩니다.(기 입고품목 제외)<br>
	  	* 판매가 변동 이슈는 담당자에게 확인을 요청 하세요.
	  	</div>
	  	 -->
	</div>
		
     <!-- 랙선택 팝업 -->
	<div id="dialog-form-rack" title="랙 선택" style="display:none;">
		
		<input type="text" id="pop_storCode" placeholder="창고코드">
		<input type="text" id="pop_storName"  placeholder="창고명">
		<input type="text" id="pop_rackCode" placeholder="랙코드">
		<input type="text" id="pop_rackName"  placeholder="랙명">
		<button class="btn btn-dark" id="btnRackFind" onClick="commonFindRack('/base/rack-list' )">조회</button>
	  	<div id="grid_wrap_rack" style=" height:90%;"></div>
	</div>
			
    <!-- Tabler Libs JS -->

	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String whUp = application.getRealPath("/resources/pan/js/wh-up.js");	
			File whUpFile = new File(whUp);	
			Date lastModified_whUpFile = new Date(whUpFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>	
		
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript" src="/resources/pan/js/wh-up.js?ver=<%=fmt.format(lastModified_whUpFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

  </body>
</html>