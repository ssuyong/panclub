<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>회수 요청내역 </title>
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
	
  </head>
  <script type="text/javascript"> 
	//common-pan 접근용 auigrid id
	var myGridID  = "#grid_wrap";
</script>
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
							<h2 class="page-title">회수 요청 내역</h2>
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
	<div id="dialog-form" title="회수 요청 상세내열" style="display: none; background :#f5f7fb;">
	 <div class="page-wrapper">
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->
                <h2 class="page-title">
                  회수요청 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
            <!-- <button class="btn btn-primary" id="btnConfirm">수락</button> 
            <button class="btn btn-primary" id="btnReject">거부</button>  -->
        	<button class="btn btn-primary" id="dialogBtnReg">저장</button>
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
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
	                      <div class="col">
	                      	<span id="dialogCtReqNo" style="font-weight: bold;">${pcReqNo}</span>
	                      </div>
	                     <!--  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청업체</label>
	                      <div class="col">
	                      	<span id="gvComCode"></span>
	                      </div>       -->
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청일자</label>
	                      <div class="col">                      	<span id="dialogCtRegYmd" style="font-weight: bold;"></span>                      </div>     
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청담당</label>
	                      <div class="col">      <input type="text" class="" id="dialogCtMgr" placeHolder="입력 안할 시 로그인 아이디로 저장됩니다."  style=" font-weight: bold;   width: 250px;">               </div>      
                    </div>
				  	   
		           
	  				<div class="form-group mb-3 row" style="margin-top:10px">
						  <label   class="col-3 col-form-label required" style="width: 80px;">수령방법</label>											
						  <div class="col">
						  	<select id="deliWay" class="form-select"		style="font-weight: bold; width: auto; padding: 2px 25px 2px 0;" >												
								<option value="일반배송">일반배송</option>
								<option value="택배">택배</option>
								<option value="화물">화물</option>
								<option value="퀵/용차">퀵/용차</option>
								<option value="방문수령">방문수령</option>
						  	</select>     
			              </div> 
			              <label  id="payTypeLabel" class="col-3 col-form-label required" style="*min-width: 118px; width:auto; ">비용</label>											
						  <div id='payTypeDiv' class="col">
						  	<select id="deliPayType" class="form-select"		style="font-weight: bold; width: auto; padding: 2px 25px 2px 0;" >												
								<option value="선불">선불 (월정산 포함)</option>
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
		  	             
                     <div class="form-group mb-3 row">
                      
                         
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청메모</label>
                      <div class="col"> 						 <input type="text" class="" id="dialogCtMemo" style=" font-weight: bold;   width: 600px;"> 	</div>    
                        
                    </div>
                    
                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수담당</label>
                      <div class="col">	<span id="dialogCtProcUserId" style="font-weight: bold;"></span>     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수단계</label>
                      <div class="col">	<span id="dialogCtProcStep"  style="font-weight: bold;"></span>    </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수일자</label>
                       <div class="col">	<span id="dialogCtProcDate" style="font-weight: bold;"></span>    </div>   
                       <div class="form-group mb-3 row" style="margin-top: 3px">
	                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">접수메모</label>
	                       <div class="col">	<span   id="dialogCtRejectMemo"  style="font-weight: bold;" ></span> 
                       </div>
                    
                    <div class="form-group mb-3 row">
                    	<span>
	                      	<input type="button" class="btn btn-secondary" id="dialogBtnCancel" value="요청 취소">  
	                    </span>
                      	<div id="grid_wrap2" style="width:99.1%;height:30vh;"></div>
                    </div>  

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
		
	<!--     -->		
	<!--     -->		
			
			

			<!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> 
     <script type="text/javascript" src="/resources/pan/js/out-ct-req-list.js?ver=1.0607.4"></script> 
     <script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=1.0304.4"></script>
    
  </body>
</html>