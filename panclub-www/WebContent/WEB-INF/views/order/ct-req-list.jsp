<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>회수 접수내역 </title>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
	
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	<!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox --> 	
	
	<link
	href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
	rel="stylesheet" />
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
		
  </head>
  <link href="/resources/pan/css/barcodePrint.css?ver=1.0516.4" rel="stylesheet" /> 
  <script type="text/javascript"> 
	//common-pan 접근용 auigrid id
	var myGridID  = "#grid_wrap";
</script>
  <style type="text/css">
	/* 커스텀 일부완료 색스타일 */
	.aui-grid-style-ct {
		font-weight: bold;
		color: #D97443;
	}
</style>
  <body  class=" layout-fluid"> 
    <div class="page">
      
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>              

      <div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<h2 class="page-title">회수 접수 내역</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="btnFind">조회(f9)</button>
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">

								<div class="card-body">
									<!-- <form> -->
									<div class="form-group mb-3 row">

										<label class="col-3 col-form-label"
											style="*min-width: 118px; width: auto;">요청일</label> <input
											type=hidden id="prmsYmd" value=${sYmd} > <input
											type=hidden id="prmeYmd" value=${eYmd} >

										<div class="row" style="display: contents;">
											<div class="col-md-6" style="width: 280px">
												<div
													class="tui-datepicker-input tui-datetime-input tui-has-focus">
													<input id="startpicker-input" type="text" aria-label="Date">
													<span class="tui-ico-date"></span>
													<div id="startpicker-container" style="margin-left: -1px;"></div>
												</div>
												<span>~</span>
												<div
													class="tui-datepicker-input tui-datetime-input tui-has-focus">
													<input id="endpicker-input" type="text" aria-label="Date">
													<span class="tui-ico-date"></span>
													<div id="endpicker-container" style="margin-left: -1px;"></div>
												</div>
											</div>
										</div>

										<div class="col">
											<label class="form-check form-check-inline"> 기간 전체조회
												<input class="form-check-input" type="checkbox"
												id="ymdIgnoreYN" name="ymdIgnoreYN">
											</label>
										</div>

										<label class="col-3 col-form-label "
											style="min-width: 118px; width: auto;">요청번호</label>
										<div class="col">
											<input type="text" id="ctReqNo" class="form-control"
												style="width: 40%; max-width: 300px;" placeholder=""
												value=${pcReqNo}>
										</div>
										<label class="col-3 col-form-label " style="min-width: 50px; width:auto;">접수단계</label>
					                    <div class="col" style="width:auto; ">
					                      <select multiple id="procState"class="form-select" style=" width:auto; padding: 2px 25px 2px 0; min-width: 280px; ">
					                     
					                      		<option>요청</option>
					                      		<option>접수</option>
					                      		<option>일부처리</option>
					                      		<option>전체처리</option>
					                      	</select>
					                    </div>
					                    <div class="form-group mb-3 row" style="padding-top: 3px"> 
					                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품ID</label>
					                      <div class="col"><input type="text" id="itemId" class="form-control" style="width:40%; max-width:200px;" placeholder="" ></div>	
					                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품번호</label>
					                      <div class="col"><input type="text" id="itemNo" class="form-control" style="width:40%; max-width:200px;" placeholder="" ></div>	 	
					                       
					                	 </div>

									</div>
									<div class="form-group mb-3 row" style="margin-top: -10px">
										<div>
											<span
												style="display: initial; float: right; margin-right: 10px;'">
												<input type="button" class="btn btn-secondary" id="btnPrint"
												onclick="exportTo('xlsx')" value="엑셀 다운">
											</span>
										</div>
									</div>
								</div>

								<div class="form-group mb-3 row">
									<div id="grid_wrap" style="width: 99.1%; height: 70vh;"></div>
								</div>


							</div>
						</div>
					</div>

				</div>
			</div>
			
	<!--                                   -->		
	<!--  회수요청 상세내역 페이지 다이얼로그 처리   -->
	<div id="dialog-form" title="회수접수 상세내열" style="display: none; background :#f5f7fb;">
	<input type="text" id="barcodeInput"  style="position:relative; left:-2000px; top:-100000px;">	
	 <div class="page-wrapper">
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->
                <h2 class="page-title">
                  회수접수 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
            <!-- <button class="btn btn-primary" id="btnConfirm">수락</button> 
            <button class="btn btn-primary" id="btnReject">거부</button>  -->
        	<button class="btn btn-primary" id="dialogBtnReg">임시저장</button>
        	<button class="btn btn-primary" id="dialogProcStep">접수</button>
        	<button class="btn btn-secondary" id="dialogRejectReg">불가</button>
        	<button class="btn btn-primary" id="dialogProcCancel">완료취소</button>
            <button class="btn btn-primary  " id="dialogBtnClose"  style="float: right; margin-right:15px;">닫기</button>
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
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">요청번호</label>
	                      <div class="col">
	                      	<span id="dialogCtReqNo" style="font-weight: bold;">${pcReqNo}</span>
	                      </div>
	                     <!--  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청업체</label>
	                      <div class="col">
	                      	<span id="gvComCode"></span>
	                      </div>       -->
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청일자</label>
	                      <div class="col">                      	<span id="dialogCtRegYmd" style="font-weight: bold;"></span>                      
	                      </div>     
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청담당</label>
	                      <div class="col">      <span id="dialogCtMgr" style="font-weight: bold;"></span>                                          
	                      </div>      
                    </div>
				  	   
		           
	  
	               
		  	             
                     <div class="form-group mb-3 row">
                           
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청메모</label>
                      <div class="col"> 					<span id="dialogCtMemo" style="font-weight: bold;"></span> 	 	</div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">수령방법</label>
                      <div class="col">	<span id="deliWay" style="font-weight: bold;"></span> </div>    
                     <label class="col-3 col-form-label " id='deliLabel' style="min-width: 118px; width:auto;">비용</label>
                      <div class="col"><span id="deliType" style="font-weight: bold;"></span> </div>        
                    </div>
                    
                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수담당</label>
                      <div class="col">	<input type="text" class="" id="dialogCtProcUserId" style=" font-weight: bold;   width: 150px;">      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수단계</label>
					  <div class="col"  style="font-weight: bold; width:30px;font-size:13px;">	 
                      		<span id="dialogCtProcStep"></span> 
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수일자</label>
                       <div class="col">	<span id="dialogCtProcDate" style="font-weight: bold;"></span>    </div>   
                       
                       <div class="form-group mb-3 row" style="margin-top: 3px">
	                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">접수메모</label>
	                       <div class="col">	<input type="text" class="" id="dialogCtInMemo1" style="  font-weight: bold;  width: 550px;">      </div>      
                       </div>  
                       <div class="col" style="width:auto;">
	                   	 <input type="button" style=" float: right; margin-right: 30px; margin-bottom: 5px; width: 160px; height: 40px" class="btn btn-info" id="barcodeLabelPrint" value="태그인쇄">  
	                   	
	                    </div>              
                    </div> 
                    
                    <div class="form-group mb-3 row">
                    	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" id="dialogBtnCancel" value="요청 취소">  -->
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
	                    </span>
	                
                      	<div id="grid_wrap2"  style="width:98.7%;"></div>
                    </div>  
                    
                    <div class="d-flex">
							     <div>
							       <!-- Download SVG icon from http://tabler-icons.io/i/info-circle -->
							       <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
							     </div>
							     <div>
							       - 랙 선택으로 랙을 변경시 임시저장이나 접수,완료를 할때 변경한 랙이 저장 및 반영됩니다.
							     </div>
							    
				    </div>
				 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
		
	<!--     -->		
	<!--  랙선택 팝업 다이얼로그 처리   -->
	<div id="dialog-rackSelect" title="랙 선택" style="display: none; background :#f5f7fb;">
	 <div class="page-wrapper">
        
       <div id="grid_wrap-rackSelect" style="width:99.1%;height:30vh;"></div>
            
      </div>
      
    	  
      </div>
	</div>	
	</div>
	</div>
	<!--     -->	
	<!--     -->		
	<!-- 라벨출력을 위한 div -->
	<div id="barcodePrintDiv"> </div>
		
	<div id="dialog-form-itemProgress" title="처리중" style="display: none;" >
			<div class="row row-cards">
				<div class="*col-md-6"> 
						<div class="progress mb-2">
            				<div class="progress-bar" id="progress-bar" style="width: 0%; height: 30px" role="progressbar" > 
              				</div>
            			</div>
            			<div class="form-group mb-3 row" style="display: flex; justify-content: center ;">
            				<label class="col-3 col-form-label"  style="min-width: 20px; width: auto; ">진행도</label>
            				<label class="col-3 col-form-label" id="cur" style="min-width: 25px; width: auto; "></label>
            				<label class="col-3 col-form-label"  style="min-width: 10px; width: auto; ">/</label>
            		 		<label class="col-3 col-form-label" id="last" style="min-width: 25px; width: auto; "></label>
            	 		</div>
            	</div>
            </div>
		</div>
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String ctReqList = application.getRealPath("/resources/pan/js/ct-req-list.js");	
			File ctReqListFile = new File(ctReqList);	
			Date lastModified_ctReqListFile = new Date(ctReqListFile.lastModified());  	
			
			String barcodeJS = application.getRealPath("/resources/pan/js/barcodeJS.js");	
			File barcodeJSFile = new File(barcodeJS);	
			Date lastModified_barcodeJSFile = new Date(barcodeJSFile.lastModified()); 
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>	
		
			<!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> 
    <script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
	<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=<%=fmt.format(lastModified_barcodeJSFile)%>"></script> 
     <script type="text/javascript" src="/resources/pan/js/ct-req-list.js?ver=<%=fmt.format(lastModified_ctReqListFile)%>"></script> 
     <script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script>
    
  </body>
</html>