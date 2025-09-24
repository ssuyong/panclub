<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>주문요청 상세내역 </title>	
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
                  주문요청 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
            <!-- <button class="btn btn-primary" id="btnConfirm">수락</button> 
            <button class="btn btn-primary" id="btnReject">거부</button>  -->
        	<button class="btn btn-primary" id="btnReg">저장</button>
            <button class="btn btn-primary  " id="btnClose"  style="float: right; margin-right:15px;">닫기</button>
        </div> 
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">

                    <input type="hidden" id="orderGroupId" value="${orderGroupId}" />
                    <input type="hidden" id="ordArr" value="${ordArr}" /> 
                    <input type="hidden" id="seqArr" value="${seqArr}" />
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
	                      <div class="col">
	                      	<span id="pcReqNo" style="font-weight: bold;">${pcReqNo}</span>
	                      </div>
	                     <!--  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청업체</label>
	                      <div class="col">
	                      	<span id="gvComCode"></span>
	                      </div>       -->
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청일자</label>
	                      <div class="col">                      	<span id="regYmd" style="font-weight: bold;"></span>                      </div>     
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청담당</label>
	                      <div class="col">      <input type="text" class="" id="gvMgr" placeHolder="입력 안할 시 로그인 아이디로 저장됩니다."  style=" font-weight: bold;   width: 250px;">               </div>      
                    </div>
				  	  <div class="form-group mb-3 row" style="margin-top:10px">
						  <label   class="col-3 col-form-label required" style="width: 80px;">수령방법</label>											
						  <div class="col">
						  	<select id="deliWay" class="form-select"		style="font-weight: bold; width: auto; padding: 2px 25px 2px 0;" >												
								<option value="일반배송">일반배송</option>
								<option value="택배">택배</option>
								<option value="퀵/용차">퀵/용차</option>
								
								<option value="방문수령">방문수령</option>
						  	</select>     
			              </div> 
			              <label  id="payTypeLabel" class="col-3 col-form-label required" style="*min-width: 118px; width:auto; ">비용</label>											
						  <div id='payTypeDiv' class="col">
						  	<select id="deliPayType" class="form-select"		style="font-weight: bold; width: auto; padding: 2px 25px 2px 0;" >												
								<!-- <option value="선불">선불 (월정산 포함)</option> -->
								<option value="착불">착불 (수취자 부담)</option>
								<option value="직접배차">직접배차 (주문자 부담)</option>
						  	</select>     
			              </div> 
			              
			              <label  id='rcvlogisCodeLabel' class="col-3 col-form-label required" style="*min-width: 118px; width:auto; display: none;">방문처</label>											
						  <div id='rcvlogisCodeDiv' style="display: none;" class="col">
						  	<select id="rcvlogisCode" class="form-select"		style="font-weight: bold; width: auto; padding: 2px 25px 2px 0; " > 											
								<option value="중곡">중곡</option>
								<option value="남양">남양</option>
								<option value="청라">청라</option>
								<option value="부산">부산</option>
						  	</select>     
			              </div>  
			              
		              </div>
		              
	                 <div id='senderDiv' class="form-group mb-3 row" style="margin-top:10px">
		               <label class="col-3 col-form-label " style="width: 80px; *width:auto;">보내는이</label>
				      <div class="col" style="display: contents;" >
				        	 <input type="text" class="" id="senderCustName" placeHolder="회사명" style=" font-weight: bold;   width: 100px;    ">
				       </div> 	 
				       <div class="col" style="display: contents;" >  	 
				        	 <input type="text" class="" id="senderName" placeHolder="보내는 사람" style="  font-weight: bold;  width: 100px;  ">
				  	  </div>  
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">연락처</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="senderTel"  style=" font-weight: bold;   width: 100px;  ">
				      	</div>
				  	  </div>
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">주소</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="senderAddr1"  style="  font-weight: bold;  width: 400px; ">
				      	</div>
				  	  </div>
			  	  </div>
	  
	                <div id='receiverDiv' class="form-group mb-3 row" style="margin-top:10px">
		               <label class="col-3 col-form-label " style="width: 80px; *width:auto;">받는 이</label>
				      <div class="col" style="display: contents;" >
				        	 <input type="text" class="" id="receiverCustName" placeHolder="회사명" style=" font-weight: bold;   width: 100px;    ">
				       </div> 	 
				       <div class="col" style="display: contents;" >  	 
				        	 <input type="text" class="" id="receiverName" placeHolder="받는 사람" style="font-weight: bold;    width: 100px;  ">
				  	  </div>  
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">연락처</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="receiverTel"  style=" font-weight: bold;   width: 100px;  ">
				      	</div>
				  	  </div>
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">주소</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="receiverAddr1"  style="font-weight: bold;    width: 400px; ">
				      	</div>
				  	  </div>
			  	  </div>
		  	             
                     <div class="form-group mb-3 row">
                      
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">접수단계</label>
                      <div class="col">             	<span id="gvPlacNo"></span>         -->            </div>              
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청메모</label>
                      <div class="col"> 						 <input type="text" class="" id="gvMemo" style="font-weight: bold;    width: 600px;"> 	</div>    
                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto;"></label>
                      <div class="col">	<span id="makerName_carType"></span> </div>    
                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col"><span id="carNo"></span> </div>     
                    </div>
                    
                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수담당</label>
                      <div class="col">	<span id="procUserId" style="font-weight: bold;"></span>     </div>      
                   <!--    <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수단계</label>
                      <div class="col">	<span id="procStep"></span>    </div>       -->
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수일자</label>
                       <div class="col">	<span id="procDate" style="font-weight: bold;"></span>    </div>   
                      <label class="col-3 col-form-label  required" style="min-width: 118px; width:auto;">거부사유</label>
                       <div class="col">	<input type="text" id="rejectMemo" class="form-control" style="display:initial;width:100%; max-width:300px; font-weight: bold;" placeholder="거부사유"  >    </div>                      
                    </div> 
                    
                    <div class="form-group mb-3 row">
                    	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnCancel" value="요청 취소">  
	                    </span>
                      	<div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
                    </div>  

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>


    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <script type="text/javascript" src="/resources/pan/js/out-pc-req-item-list.js?ver=1.0303.5"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.1121.3"></script> 
 	
  </body>
</html>