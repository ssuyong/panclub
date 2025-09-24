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
                  창고사용 요청
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

                    <input type="hidden" id="orderGroupId" value="${orderGroupId}" />
                    <input type="hidden" id="ordArr" value="${ordArr}" /> 
                    <input type="hidden" id="seqArr" value="${seqArr}" />
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <%-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
                      <div class="col">
                      	<span id="storageUseReqNo">${storageUseReqNo}</span>
                      </div> --%>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp">${orderGroupId}</span>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col"><span id="orderTypeName"></span> </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      <div class="col">                      	<span id="regUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
                      <div class="col">                      	<span id="estiYmd"></span>                      </div>      
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

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">창고 담당</label>
                      <div class="col">	<input type="text" id="storageMgr" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="담당/부서" >     </div>      
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
				            <input type="text" id="useDmdYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper" style="margin-top: -1px;"></div>
				        
        			  </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">창고이동일</label>
                      <div class="col">
                      	<div class="tui-datepicker-input tui-datetime-input tui-has-focus">
				            <input type="text" id="moveSchYmd" aria-label="Date-Time">
				            <span class="tui-ico-date"></span>
				        </div>
				        <div id="wrapper2" style="margin-top: -1px;"></div>				        
                      </div> 
                      </div>   
                      
                    </div> 
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="storageUseReqSend('/order/storageUseReqAdd')" value="요청 전송"> 
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span  style="color:darkblue">
                      		* '창고보유수량' 을 클릭하여 창고를 변경할 수 있습니다.
                      	</span>
                      </div>
                      
                    </div>  
                      
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>


    <!-- Begin : 창고수량확인 -->
	<div id="dialog-form-stockchk" title="창고수량확인" style="display:none;">
	
        <div style="padding: 0 0 10px 14px;" >
            <!-- <button class="btn btn-primary" id="btnReg">적용</button> -->
           <!--  <button class="btn btn-primary  " id="btnClose" >닫기</button> -->
        </div>	                
        <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">	
                    <input type="hidden" id="orderSeq" value="${orderSeq}" />	                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="findImportCalc('/order/import-calc-up',1)" value="계산하기"> -->
	                      	<!-- <input type="button" class="btn btn-secondary" id="btnApply" onclick="stockApply('/order/orderStockChkAdd')" value="적용"> --> 
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="storSelect('storageCode','storageName')" value="적용">
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->		                      	
                      	</span>
                      </div>
                      <div id="grid_wrap_stockchk" style=" height:90%;"></div>
                    </div>
                   <!--  <div>
                    견적서에 반영되는 창고수량은 다른 사용자에 의해 요청되면 변경될 수 있으니 주문시에는 재조회 하여 수량을 확인 하십시오
                    </div>   -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   	</div>
    <!-- End : 창고수량확인 -->
    
 	
	   
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String storageUseReqUp = application.getRealPath("/resources/pan/js/storage-use-req-up.js");	
			File storageUseReqUpFile = new File(storageUseReqUp);	
			Date lastModified_storageUseReqUpFile = new Date(storageUseReqUpFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
    <script type="text/javascript" src="/resources/pan/js/storage-use-req-up.js?ver=<%=fmt.format(lastModified_storageUseReqUpFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>