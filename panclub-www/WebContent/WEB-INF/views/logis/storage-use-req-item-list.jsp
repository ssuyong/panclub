<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>창고사용요청 상세내역</title>

	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	
  </head>
  <link href="/resources/pan/css/barcodePrint.css?ver=1.0516.4" rel="stylesheet" /> 
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
                  창고사용요청 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">저장</button>
            <button class="btn btn-secondary" id="btnClose" style="float: right; margin-right:15px;">닫기</button>
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
                      	<span id="storageUseReqNo">${storageUseReqNo}</span>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp"></span>
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
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">주문처</label>
                      <div class="col">
                      	<span id="custName"></span>
                      </div>      
                    </div>                      

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">창고 담당</label>
                      <div class="col">	<input type="text" id="storageMgr" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="담당/부서" disabled>     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">             	<span id="">&nbsp;</span>                   </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>      
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">요청일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="useDmdYmd" aria-label="Date-Time" disabled>
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper" style="margin-top: -1px;"></div>
				        
        			  </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">창고이동일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="moveSchYmd" aria-label="Date-Time" disabled>
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper2" style="margin-top: -1px;"></div>				        
                      </div> 
                      </div>   
                      
                    </div> 
                    <div class="col" style="width:auto;">
                    
                   	 <input type="button" style=" float: right; margin-right: 30px; margin-bottom: 5px; width: 160px; height: 40px" class="btn btn-info" id="barcodeLabelPrint" value="태그인쇄">  
                   	  
                    </div>
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	
                      	<span> 
	                   			<input type="text" id="barcodeReaderInput" placeholder="바코드" autocomplete="off">   
		                    
	                      	<!-- <input type="button" class="btn btn-secondary" id="btnApply" onclick="reqChk('/logis/storageUseReqItemAdd','CHK')" value="사용 완료">   -->
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="reqChkPop('/logis/storageUseReqItemAdd','CHK')" value="사용 완료">  
	                      	<input type="button" class="btn btn-secondary"	onclick="reqChk('/logis/storageUseReqItemAdd','CANCEL')"	value="요청취소">
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      	<span style="float:right;">
                      		<input type="button" class="btn btn-secondary" id="btnPrint" onclick="print_()"value="인쇄">             	
		            	</span> 
                      </div>
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

	<!-- 창고사용(창고이동 팝업 -->
	<div id="dialog-form-chk" title="사용완료 (선택한 창고로 이동 처리)" style="display: none;">
		
	 	  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">이동할 창고</label>
	      <div class="col">
	        <div class="">
	        	<!-- <input type="hidden" id="popAfterStorCode" value="" />
	          	<input type="text" class="" id="popAfterStorName"  value="" disabled > -->
	          	<select id="popAfterStorCode" onChange="resetRackInfo()">
					<option></option>
				</select>
	      	</div>
	  	  </div>    
	 	  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">이동할 랙</label>
	      <div class="col">
	        <div class="row">
	        	<!-- <input type="hidden" id="popAfterRackCode" value="" />
	          	<input type="text" class="" id="popAfterRackName" value=""  disabled> -->
	          	<input type="text" id="popAfterRackCode" class="form-control"	style="width: 60%; max-width: 100px;" placeholder=""  disabled>
				<input type="text" id="popAfterRackName" class="form-control"	style="width: 60%; max-width: 300px;" placeholder=""  disabled>
				<span class="col" style="margin-left: -10px;">
				<img src="/resources/img/content_paste_search_black_24dp.svg" style="filter:opacity(0.5);  width:25px; cursor: pointer;"
					 onClick="commonFindRackCall('popAfterStorCode','','popAfterRackCode','popAfterRackName','','Y');">
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
		
	<div id="barcodePrintDiv"> </div>
	<input type="text" id="barcodeInput"  style="position:relative; left:-2000px; top:-100000px;">
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String storageUseReqItemList = application.getRealPath("/resources/pan/js/storage-use-req-item-list.js");	
			File storageUseReqItemListFile = new File(storageUseReqItemList);	
			Date lastModified_storageUseReqItemListFile = new Date(storageUseReqItemListFile.lastModified());  	
			
			String barcodeJS = application.getRealPath("/resources/pan/js/barcodeJS.js");	
			File barcodeJSFile = new File(barcodeJS);	
			Date lastModified_barcodeJSFile = new Date(barcodeJSFile.lastModified()); 
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
    <script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
	<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=<%=fmt.format(lastModified_barcodeJSFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/storage-use-req-item-list.js?ver=<%=fmt.format(lastModified_storageUseReqItemListFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>