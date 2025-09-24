<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>반출 상세내역 </title>

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
                  반출 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">저장</button>
            <button class="btn btn-primary" id="btnDel">삭제</button>
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
            <button class="btn btn-primary  " id="btnDateChange" >반출일 변경</button>
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
                    <input type="hidden" id="pageMoveYN" value="${pageMoveYN}" />
                    <input type="hidden" id="gvComCode" value="${gvComCode}" />
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">반출번호</label>
                      <div class="col">
                      	<span id="roNo">${roNo}</span>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문처</label>
                      <div class="col"><span id="custName"></span>                   </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">차량정보</label>
                      <div class="col"><span id="carNo"></span>                   </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">반출일</label>
                      <div class="col"><span id="roYmd"></span> </div>      
<!--                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">결제여부</label>
                      <div class="col"><span id="payStatus"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">결제금액</label>
                      <div class="col"><span id="payAmt"></span>                      </div>      
 -->                    </div>
 
					<div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">반출담당</label>
                      <div class="col">	<input type="text" id="roMgr" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="담당/부서" >     </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">반출방법</label>
                      <div class="col"><select id="roWay" class="form-select"
												style="width: auto; padding: 2px 25px 2px 0;" >
												<option value=""></option>
												<option value="일반배송">일반배송</option>
												<option value="입고즉시">입고즉시</option>
												<option value="택배">택배</option>
												<option value="퀵/용차">퀵/용차</option>
												<option value="내사">내사</option>
											</select>     </div>                                           
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청자</label>
                      <div class="col"><span id="reqRegUserId"></span> </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                         
                      <!-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>    -->     
                    </div>
                    <div class="form-group mb-3 row" >
                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">반출처거래번호</label>
                      <div class="col">
                         <div>   <input type="text" id="custRoNo" class="form-control" style="*width:60%; max-width:500px;" placeholder="" >                </div>
                      </div>    
                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">
                         <div>   <input type="text" id="" class="form-control" style="*width:60%; max-width:700px; display:none;'" placeholder="" >                </div>
                      </div>    
                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">
                         <div>   <input type="text" id="" class="form-control" style="*width:60%; max-width:700px;display:none;" placeholder="" >                </div>
                      </div>    
                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">
                         <div>   <input type="text" id="" class="form-control" style="*width:60%; max-width:700px;display:none;" placeholder="" >                </div>
                      </div>    
                    </div>
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" id="btnApply" onclick="reqChk('/logis/storageUseReqItemAdd')" value="사용 완료">   -->
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:75vh;"></div>
                    </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    
    <!-- 반출일 변경 팝업 -->
	<div id="dialog-form-changeRoYmd" title="반출일 변경" style="display: none;">
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">발주처</label>
	       <div class="col">
	        <div class="">
	          	<input type="text" class="" id="popCustName" disabled>
	      	</div>
	  	  </div>    
	  	    <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">반출번호</label>
	  	    	 <div class="col">
	  	    	<input type="text" id="popRoNo" value="" disabled/>
	  	    	</div>	
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">변경 반출일</label>
	      <div class="col">
	        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
	          <input type="text" id="popRoYmd" aria-label="Date-Time">
	          <span class="tui-ico-date"></span>
	      	</div>
	      	<div id="wrapper1" style="margin-top: -1px;"></div>				        
	  	  </div>   	  
	</div>
a

    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
     <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String roItemList = application.getRealPath("/resources/pan/js/ro-item-list.js");	
			File roItemListFile = new File(roItemList);	
			Date lastModified_roItemListFile = new Date(roItemListFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
    <script type="text/javascript" src="/resources/pan/js/ro-item-list.js?ver=<%=fmt.format(lastModified_roItemListFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>