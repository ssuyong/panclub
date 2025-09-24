<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>주문접수 상세내역 </title>
<link href="/resources/pan/css/barcodePrint.css?ver=1.0516.4" rel="stylesheet" /> 

 
	
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
            <button class="btn btn-primary" id="btnConfirm">완료</button> 
            <button class="btn btn-primary" id="btnReject">거부</button> 
            <button class="btn btn-primary" id="btnAccept" style="display: none;">접수</button> 
            <button class="btn btn-primary" id="btnRejectCancel" style="display: none;">거부취소</button> 
            <button class="btn btn-primary" id="btnReAccept" style="display: none;">주문등록</button> 
            <!-- <button class="btn btn-primary  " id="btnClose" >닫기</button> -->
            <span>*관계사는 수락 시 자동으로 위탁창고에서 출고되고 요청업체로 발주입고 됩니다.</span>
            <span style=" display: initial; float: right; margin-right: 50px;">
	        	<button class="btn btn-primary bg-dark " id="btnClose" >닫기</button>
             </span>
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
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;  ">요청번호</label>
	                      <div class="col">
	                      	<span id="pcReqNo" style="font-weight: bold;">${pcReqNo}</span>
	                      </div>
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">요청업체</label>
	                      <div class="col">
	                      	<span id="gvComCode" style="font-weight: bold;"></span>
	                      </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청담당</label>
	                      <div class="col">                      	<span id="gvMgr" style="font-weight: bold;"></span>                      </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청일자</label>
	                      <div class="col">                      	<span id="regYmd" style="font-weight: bold;"></span>                      </div>     
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청업체 발주번호</label>
                      <div class="col">                      	<span id="gvPlacNo" style="font-weight: bold;"></span>                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청메모</label>
                      <div class="col"> 							<span id="gvMemo" style="font-weight: bold;"></span> 						</div>    
                     <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">수령방법</label>
                      <div class="col">	<span id="deliWay" style="font-weight: bold;"></span> </div>    
                     <label class="col-3 col-form-label " id='deliLabel' style="min-width: 118px; width:auto;">비용</label>
                      <div class="col"><span id="deliType" style="font-weight: bold;"></span> </div>      
                  
                       <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;"></label>
                      <div class="col">	<span id="makerName_carType"></span> </div>    
                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col"><span id="carNo"></span> </div>    -->  
                    </div>

                   <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보내는업체</label>
                      <div class="col">  <span id="senderCustName" style="font-weight: bold;"></span> </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">보내는사람</label>
                      <div class="col"> <span id="senderName" style="font-weight: bold;"></span> </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">연락처</label>
                      <div class="col">	<span id="senderTel" style="font-weight: bold;"></span> </div>    
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주소</label>
                      <div class="col"><span id="senderAddr1" style="font-weight: bold;"></span> </div>      
                   </div>
                                      
                   <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">받는업체</label>
                      <div class="col">  <span id="receiverCustName" style="font-weight: bold;"></span> </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">받는사람</label>
                      <div class="col"> 							<span id="receiverName" style="font-weight: bold;"></span> 						</div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">연락처</label>
                      <div class="col">	<span id="receiverTel" style="font-weight: bold;"></span> </div>    
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주소</label>
                      <div class="col"> <span id="receiverAddr1" style="font-weight: bold;"></span> </div>      
                    </div>
                   
                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수담당</label>
                      <div class="col">	<span id="procUserId" style="font-weight: bold;"></span>     </div>      
<!--                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수단계</label> -->
<!--                       <div class="col">	<span id="procStep"></span>    </div>       -->
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수일자</label>
                       <div class="col">	<span id="procDate" style="font-weight: bold;"></span>    </div>   
                       
                       <label class="col-3 col-form-label " style="min-width: 50px; width:auto;">판매가격유형</label>
                      <div class="col" style="width:auto; ">
                      	<select id="salePriceType"class="form-select" style="font-weight: bold; width:auto; padding: 2px 25px 2px 0; min-width: 80px; "> 
                      		<option>매입가</option>
                      		<option>센터가</option> 
                      	</select>
                      </div>
                          <!--  <label class="col-3 col-form-label  required" style="min-width: 118px; width:auto;">거부사유</label>
                       <div class="col">	<input type="text" id="rejectMemo" class="form-control" style="display:initial;width:100%; max-width:300px;" placeholder="거부사유" >    </div>                      
                    </div>
                    --!>
                    
                    
                   <!--  <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">공급가액</label>
                      <div class="col">	 <input type="text" id="salePrice" class="form-control" style="*width:60%; max-width:300px; text-align:right;" placeholder=""  disabled>    </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">세액</label>
                      <div class="col">	<input type="text" id="taxPrice" class="form-control" style="*width:60%; max-width:300px; text-align:right;" placeholder="" disabled>    </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">합계</label>
                       <div class="col">	 <input type="text" id="sumPrice" class="form-control" style="*width:60%; max-width:300px; text-align:right;" placeholder=""  disabled>    </div>   
                      <label class="col-3 col-form-label  required" style="min-width: 118px; width:auto;">한글금액</label>
                       <div class="col">	<input type="text" id="sumPriceKor" class="form-control" style="*width:60%; max-width:500px; text-align:right;" placeholder=""  disabled>    </div>                      
                    </div> -->
<!--                     <div class="form-group mb-3 row">
                    	<span>
	                      	<input type="button" class="btn btn-secondary" id="dialogBtnCancel" value="요청 취소">  
	                    </span>
                      	<div id="grid_wrap2"  ></div>
                    </div>   -->
                    <div class="col" style="width:auto;">
                   	 <input type="button" style=" float: right; margin-right: 30px; margin-bottom: 5px; width: 160px; height: 40px" class="btn btn-info" id="barcodeLabelPrint" value="태그인쇄">  
                   	
                    </div>
                    <div class="form-group mb-3 row"> 
                    	<div>
	                   		<span style="display: initial; float: left; margin-right: 10px; "> 
	                   			<input type="text" id="barcodeReaderInput" placeholder="바코드" autocomplete="off">  
<!-- 		                     	<input type="button" class="btn btn-secondary" id="barcodeReaderOpenBtn" onclick="barcodeReaderOpen()" value="바코드 불러오기">   -->
		                    </span>
	                   		<span style="display: initial; float: right; margin-right: 10px; ">
	                   			<label class="form-check form-check-inline"style="margin-bottom: 0px;">체크품목만 인쇄하기
									<input class="form-check-input" type="checkbox" id="checkItemPrintYN" name="checkItemPrintYN"> 
								</label>
		                     	<input type="button" class="btn btn-secondary" id="buttonPrint" value="인쇄">  
		                    </span>
                      	</div>
                    </div>   
                    <div class="form-group mb-3 row">
                    
                    <!--   <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="riProcPop('/logis/riAdd','ADD')" value="반입 처리">    
                      	</span>
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="riReqProc('/logis/riReqItemAdd','CANCEL')" value="요청 취소">
                      	</span>
                      	<span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="print()"value="인쇄">             	
                      	</span>
                      </div> -->
                      <div id="grid_wrap" style="width:99.1%;height:65vh;"></div>
                    </div>  
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
	</div>		
	<!-- 라벨출력을 위한 div -->
	
	<div id="barcodePrintDiv"> </div>
	
<!-- 	<div id="dialog-form-barcodeReader" title="품번바코드 스캔" style="display:none;"> -->
			
			
			<input type="text" id="barcodeInput"  style="position:relative; left:-2000px; top:-100000px;">
<!-- 		  	<div id="barcodeReader_grid_wrap" style=" height:90%;"></div> -->
<!-- 		</div> -->
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
 <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String pcReqItemList = application.getRealPath("/resources/pan/js/pc-req-item-list.js");	
			File pcReqItemListFile = new File(pcReqItemList);	
			Date lastModified_pcReqItemListFile = new Date(pcReqItemListFile.lastModified());  	
			
			String barcodeJS = application.getRealPath("/resources/pan/js/barcodeJS.js");	
			File barcodeJSFile = new File(barcodeJS);	
			Date lastModified_barcodeJSFile = new Date(barcodeJSFile.lastModified()); 
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>   
    
<style type="text/css">
	.my-cell-style {		background: #FFAAAA;		font-weight: bold;		color: #fff;	}
</style>
    <script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
	<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=<%=fmt.format(lastModified_barcodeJSFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/pc-req-item-list.js?ver=<%=fmt.format(lastModified_pcReqItemListFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>