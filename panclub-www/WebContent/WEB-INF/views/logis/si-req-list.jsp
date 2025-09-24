<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>재고입고 요청내역</title>
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
	
	
	<link
	href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
	rel="stylesheet" />
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>

	
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
                  재고입고 요청내역
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <!-- <button class="btn btn-primary" id="btnPrint">인쇄</button> -->
            <!-- <button class="btn btn-primary disabled " id="btnUpt">수정</button> -->
            <!-- <button class="btn btn-primary disabled " id="btnDel">삭제</button> -->
        </div>
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">요청일</label>
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
					    	<div class="col" style="margin-top: 3px; ">
								<label class="form-check form-check-inline" style="margin-top: 3px"> 기간 전체조회
								<input class="form-check-input" type="checkbox" id="ymdIgnoreYN" name="ymdIgnoreYN" > </label>
							</div>
							
							<label class="col-3 col-form-label " style="min-width: 80px; width: auto; margin-left:15px">요청구분</label>
							<div class="col"  style="display: contents;">
								<select id="reqType" class="form-select"
									style="width:20%;max-width:100px; padding: 2px 25px 2px 0;">
									<option value=""></option>
									<option value="재고투입">재고투입</option>
									<option value="반품입고">반품입고</option>
								</select>
							</div>
							
						
						<label class="col-3 col-form-label " style="min-width: 20px; width: auto; margin-left:145px">부품ID</label>
	                      <div class="col">
	                        <input type="text" id="itemId" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
	                      </div>				
							
						<label class="col-3 col-form-label " style="min-width: 20px; width: auto; margin-left:15px">품번</label>
	                      <div class="col">
	                        <input type="text" id="itemNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
	                      </div>
	                    
		                  

                    </div>
                    
                    <div class="form-group mb-3 row">
                    	<label class="col-3 col-form-label " style="min-width: 50px; width:auto;">처리상태</label>
                      <div class="col" >
                      	<select multiple id="procState" style=" width:auto; padding: 2px 50px 2px 0;  width: 200px; ">
                       
                      		<option>요청</option>
                      		<option>처리</option>
                      	</select>
                      	</div>
                    
                    	
                    </div>

                   
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                  		<input type="button" class="btn btn-secondary" onclick="rackSelect('rack')" value="창고입고">                	
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

		
		
    <!-- 랙선택 팝업 -->
	<div id="dialog-form-rack" title="랙 선택" style="display:none;" >
	<div id="hidden-focus" tabindex="-1"></div>
		<input type="hidden" id="grid-rackCode1" name="grid-rackCode1" value="">
		<input type="hidden" id="grid-rackName1" name="grid-rackName1" value="">
		<input type="hidden" id="totReqQty" name="totReqQty" value="">
		<input type="hidden" id="sumReqQty" name="totReqQty" value="">
		<input type="hidden" id="reqTypePop" name="reqTypePop" value="">
		창고

		 <input type="text" list="storageCode" id="pop_storCode">
		
                       <datalist id="storageCode"  style="width:60%; max-width:200px;" >
                      		<option></option>
                      	</datalist >
      
		<input type="text" id="pop_rackCode" placeholder="랙코드">
		<input type="text" id="pop_rackName"  placeholder="랙명">
		<input type="hidden" id="pop_rackSrch"  placeholder="랙코드이름">
		<input type="text" id="pop_itemId"  placeholder="부품ID" disabled>
		<button class="btn btn-dark" id="btnRackFind" onClick="commonFindRack('/base/rack-list' )">조회</button>
	  	<div id="grid_wrap_rack" style=" height:90%;"></div>
	</div>
	
	<!-- 작업처리로딩 팝업 -->
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
			
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    
    <script type="text/javascript" src="/resources/pan/js/si-req-list.js?ver=1.0731.4"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0304.4"></script> 

  </body>
</html>