<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>

	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	
  </head>
  <body  class=" layout-fluid">
    <div class="page">
<%--        
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>    --%>           

      <div class="page-wrapper">
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->
                <h2 class="page-title">
                  출고 요청
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
<!--             <button class="btn btn-primary" id="btnReg">저장</button> -->
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
        </div> 
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
					<input type="hidden" id="dataComCode" value="${dataComCode}" />
                    <input type="hidden" id="orderGroupId" value="${orderGroupId}" />
                    <input type="hidden" id="ordArr" value="${ordArr}" /> 
                    <input type="hidden" id="seqArr" value="${seqArr}" />
                    <input type="hidden" id="stdClType" value="${stdClType}" />
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp">${orderGroupId}</span>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col"><span id="orderTypeName"></span> </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      <div class="col">                      	<span id="regUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
                      <div class="col">                      	<span id="orderYmd"></span>                      </div>      
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차번</label>
                      <div class="col">                      	<span id="carNo"></span>                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차대</label>
                      <div class="col">
                      	<span id="vinNo"></span>
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">제조사/차종</label>
                      <div class="col">
                      	<span id="makerName_carType"></span>
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">
                      	<span id="">&nbsp;</span>
                      </div>      
                    </div>
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">주문처</label>
                      <div class="col">
                        <input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'custName');"readonly >
                        <input type="text" id="custName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="custMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'custMgrPhone','custCode');"readonly >
                        <input type="text" id="custMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp=""readonly >
                      </div>
					  		
                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">납품처</label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="supplyCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCust(this,'supplyCustName');"readonly >
                        <input type="text" id="supplyCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="supplyMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'supplyCustMgrPhone','supplyCustCode');"readonly >
                        <input type="text" id="supplyMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp=""dreadonly isabled>
                      </div>
                      
                      <div  id="senderInfo" class="col" >
                      <label id="senderInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto; ">발송처</label>
                        <input type="text" id="senderCustName" class="form-control" aria-describedby="" placeholder="보낸회사" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="senderName" class="form-control" aria-describedby="" placeholder="보낸사람" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="senderTel" class="form-control" aria-describedby="" placeholder="연락처" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="senderAddr1" class="form-control" aria-describedby="" placeholder="주소" style="display:initial;width:48%; max-width:300px;" readonly>
                      </div> 
                      
                      <div  id="receiverInfo" class="col" >
                      <label id="receiverInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto; ">수령처</label>
                        <input type="text" id="receiverCustName" class="form-control" aria-describedby="" placeholder="받는회사" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="receiverName" class="form-control" aria-describedby="" placeholder="받는사람" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="receiverTel" class="form-control" aria-describedby="" placeholder="연락처" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="receiverAddr1" class="form-control" aria-describedby="" placeholder="주소" style="display:initial;width:48%; max-width:300px;" readonly>
                      </div>
                      
                    </div>                      

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출고 담당</label>
                      <div class="col">	<input type="text" id="rlMgr" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="출고담당/부서" >     </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">최종픽업부품</label>
                      <div class="col">             	
                      	<div>   <input type="text" id="lastPickParts" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>                   
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>      
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">요청일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="dmdYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper" style="margin-top: -1px;"></div>				        
        			  </div>            			  
                      <div class="col">
                      	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
                            <input class="form-check-input" type="radio" name="dmdTime"  value="오전" checked>
                            <span class="form-check-label">오전</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="dmdTime"  value="오후" >
                            <span class="form-check-label">오후</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="dmdTime"  value="아무때나" >
                            <span class="form-check-label">아무때나</span>
                        </label>
                      </div>                      
                      
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">출고방법</label>
                      <div class="col">
                      	<label class="form-check form-check-inline" style="margin-bottom: 0px;">
                            <input class="form-check-input" type="radio" name="rlWay"  value="일반배송" checked>
                            <span class="form-check-label">일반배송</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="rlWay"  value="입고즉시" >
                            <span class="form-check-label">입고즉시</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="rlWay"  value="택배" >
                            <span class="form-check-label">택배</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="rlWay"  value="퀵/용차" >
                            <span class="form-check-label">퀵/용차</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="rlWay"  value="내사" >
                            <span class="form-check-label">내사</span>
                        </label>
                        <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
                             <input class="form-check-input" type="radio" name="rlWay"  value="화물" >
                            <span class="form-check-label">화물</span>
                        </label>
                      </div>                      

<!-- 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">         	<span id="">&nbsp;</span>        </div>      
 -->                 </div>
 
                     <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출고창고</label>
                      <div class="col">	
                      	<select id="storCode" onChange="resetRackInfo()">
							<option></option>
						</select>     
                      </div>
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출고랙</label>
                      <div class="col">             	
                      		<input type="text" id="rackCode" class="form-control"	style="display:initial;width:48%; max-width:100px;" placeholder=""  disabled>
							<input type="text" id="rackName" class="form-control"	style="display:initial;width:48%; max-width:100px;" placeholder=""  disabled>
							<span class="col" style="margin-left: -10px;">
							<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;"
								 onClick="commonFindRackCall('storCode','','rackCode','rackName','','Y');">
							</span>            
                      </div>   
 					  <label class="col-3 col-form-label" style="min-width: 0px; width:auto;">&nbsp;</label>
                      <div class="col">
                      	<span id="">&nbsp;</span>
                      </div>      
 					  <label class="col-3 col-form-label" style="min-width: 0px; width:auto;">&nbsp;</label>
                      <div class="col">
                      	<span id="">&nbsp;</span>
                      </div>                            
                    </div>
                     
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="rlReqSend('/logis/rlReqAdd')" value="요청 전송"> 
	                      	
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:60vh;"></div>
                    </div>  
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
                      		* 출고가능수량 : 발주요청수량 + 창고사용요청수량 - 기출고요청수량 - 반출요청수량
	                  	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:55vh;"></div>
                    </div>  
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
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

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String rlReqUp = application.getRealPath("/resources/pan/js/rl-req-up.js");	
			File rlReqUpFile = new File(rlReqUp);	
			Date lastModified_rlReqUpFile = new Date(rlReqUpFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
    <script type="text/javascript" src="/resources/pan/js/rl-req-up.js?ver=<%=fmt.format(lastModified_rlReqUpFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>