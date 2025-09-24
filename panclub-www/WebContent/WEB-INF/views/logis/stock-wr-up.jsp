<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>수동입출고</title>
    
    <!-- fancyBox -->
 	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
 	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
 	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
 	<!-- fancyBox -->
    
    
    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
    <script type="text/javascript" src="/resources/js/jquery.form.js"></script>  <!-- file ajax upload -->
    <link href="/resources/pan/css/printbox.css?ver=3.0313.3" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
    <link href="/resources/pan/css/barcodePrint.css?ver=1.0614.4" rel="stylesheet" /> 
    		
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
                 수동 입출고 처리
             </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">등록</button>
            <button class="btn btn-primary disabled " id="btnUpt">수정</button>
            <button class="btn btn-primary disabled " id="btnDel">삭제</button>
            <button class="btn btn-primary disabled " id="btnNew">신규등록</button>
        </div>
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">

                    <input type="hidden" id="srchEqualItemNo" value="" />
                    <input type="hidden" id="srchEqualRackCode" value="" />
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">처리번호</label>
                      <div class="col">
                      	<input type="text" id="iwrNo" value="${wrNo}" class="form-control" aria-describedby="" placeholder="자동생성" style="display:initial;width:48%; max-width:300px;">
                        <input type="text" id="wrNo" value="${wrNo}" class="form-control" aria-describedby="" placeholder="자동생성" style="display:initial;width:48%; max-width:300px; " disabled  hidden="true">
                        <input type="text" id="wrSeq" value="${wrSeq}" disabled  hidden="true">
                      </div>
                     <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      	<div class="col">
                      	<input type="text" id="regUserName" class="form-control" aria-describedby=""style="display:initial;width:48%; max-width:150px;" disabled>
                      </div>
                    </div>
                    <div class="form-group mb-3 row">
                      <!-- <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">유형</label>
                      <div class="col">
                         <div>
	                         <div class="col">
		                        <select id="bizType" class="form-select" style="width:auto; padding:2px 25px 2px 0; " >
		                          <option value=""></option>
		                          <option value="수정">수정</option>
		                          <option value="이동">이동</option>
		                          <option value="위탁">위탁</option>
		                        </select>
		                      </div>  	                      
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="estiType"  value="1" checked onClick="click_EstiType(1)">
                                <span class="form-check-label">직영</span>
                              </label>
                              <label class="form-check form-check-inline" style="margin-bottom: 0px;">
                                <input class="form-check-input" type="radio" name="estiType" value="2"  onClick="click_EstiType(2)" >
                                <span class="form-check-label">대행</span>
                              </label>

                          </div>
                      </div>     -->
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">처리구분</label>
	                      <div class="col">
	                        <select id="wrType" class="form-select" style="width:auto; padding:2px 25px 2px 0; " >
	                          <option value=""></option>
	                          <option value="whna">수동입고</option>
	                          <option value="rlna">수동출고</option>
	                          <option value="move">이동</option>
	                          <option value="rlod">판매출고 </option>
	                          <option value="whri">반품입고 </option>
	                          <option value="itemList">품목정리 </option>
	                        </select>
	                      </div>  
	                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; display: none;" id="consignComCodeLabel">업체명</label>
	                      <div class="col" id="consignComCodeSelect" style="display: none;">
	                      <input type="text" list="consignComCode" id="consignComText" >
	                       <datalist id="consignComCode"  style="width:60%; max-width:200px;">
	                      		<option></option>
	                      	</datalist >
	                      	<button class="btn btn-primary" id="btnConsignNew">업체로 신규품목정리</button>
	                      </div>
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <%-- <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">위탁거래처</label>
                      <div class="col">
                        <input type="text" id="consignCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${consignCustCode}" required onKeyUp="findCust(this,'custName');" ondblclick="findCust(this,'custName',0,'Y');">
                        <input type="text" id="conSignCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                        <input type="text" id="custMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" required onKeyUp="findCustMgr(this,'custMgrPhone','custCode');">
                        <input type="text" id="custMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" required onKeyUp="">
                      </div> --%>
                    <!-- </div>

 					<div class="form-group mb-3 row"> -->
                     <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">비고</label>
                     
                      <div class="col">
                        <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:500px;" placeholder="" >
                      </div> 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">바코드 추가정보스캔</label>
                      <div class="col">
                      	<input class="form-check-input" type="checkbox"   id="barcodeDeepLoadYN" checked>  
                      </div>     
                                    
                     
                    </div>      
 					<div class="form-group mb-3 row">
 					</div>
                                         
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary " onclick="itemChk()" value="중복검토" id="btnItemChk" >
	                      	<input type="button" class="btn btn-secondary " onclick="itemProc()" value="처리" id="btnProc" >
	                      	<input type="button" class="btn btn-secondary " onclick="rackSelect('rack')" value="랙선택" id="btnProc" >
	                      	<input type="button" class="btn btn-secondary " onclick="rackSelect('move')" value="이동랙선택" id="btnProc" >
                      	</span>
                      	<span style=" display: initial; float: right;">
                       		<%if(userId.equals("supi20")) {%> 
	                      	<input type="button" class="btn btn-secondary " onclick="itemFinderPopupOpen()" value="엑셀로 재고불러오기">
 	                      	<%} %> 
	                      	<input type="button" class="btn btn-secondary " onclick="storageSynchro()" value="창고기준으로 소유업체맞추기">
	                      	<input type="button" class="btn btn-secondary " onclick="barcodePrintItem()" value="바코드인쇄">

	                      	<input type="button" class="btn btn-secondary " onclick="excelAdd()" value="엑셀업로드">
	                      	<!-- <input type="button" class="btn btn-secondary disabled" id="btnPrint" onclick="print()"value="인쇄"> -->
	                      	<input type="button" class="btn btn-secondary disabled" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:55vh;"></div>
                      <div style="margin : 2px 0px 0;">
                      	<input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
                      	<input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제">
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


     <!-- 상품선택 팝업 -->
	<div id="dialog-form-item" title="상품 선택" style="display:none;">
		<input type="text" id="pop_itemNo" placeholder="품번">
		<input type="text" id="pop_itemName"  placeholder="품명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
		<button class="btn btn-blue" id="btnItemAdd" onClick='openRegItemDialog()'>부품등록</button>
	  	<div id="grid_wrap_item" style=" height:90%;"></div>
	</div>
    
     <!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<input type="hidden" id="grid-custCode1" name="grid-custCode1" value="">
		<input type="hidden" id="grid-custName1" name="grid-custName1" value="">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnCustFind" >조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
	</div>

    <!-- 랙선택 팝업 -->
	<div id="dialog-form-rack" title="랙 선택" style="display:none;">
		<input type="hidden" id="grid-rackCode1" name="grid-rackCode1" value="">
		<input type="hidden" id="grid-rackName1" name="grid-rackName1" value="">
		창고
<!-- 		<select id="pop_storCode"> -->
<!-- 			<option></option> -->
<!-- 		</select>		 -->
		 <input type="text" list="storageCode" id="pop_storCode">
                       <datalist id="storageCode"  style="width:60%; max-width:200px;">
                      		<option></option>
                      	</datalist >
		<input type="text" id="pop_rackCode" placeholder="랙코드">
		<input type="text" id="pop_rackName"  placeholder="랙명">
		<input type="hidden" id="pop_rackSrch"  placeholder="랙코드이름">
		<input type="text" id="pop_itemId"  placeholder="부품ID" disabled>
		<button class="btn btn-dark" id="btnRackFind" onClick="commonFindRack('/base/rack-list' )">조회</button>
	  	<div id="grid_wrap_rack" style=" height:90%;"></div>
	</div>
	
 	<!-- 엑셀업로드 팝업 -->
	<div id="dialogXls-form" title="엑셀업로드"  style="display:none;">
		  <div id="contents720">			
			<form id="addExcelForm" name="addExcelForm" enctype="multipart/form-data" method="post"  action= "stock-wr-up-xls">
			    <div >
			        <div class="di_cl_bacth_data_guide">
			        
					<div class="form-group mb-3 row">
					
					
				 
					
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;text-align:right;">품번</label>
                      <div class="col">
                        <input type="text" id="xls_itemNo" name="xls_itemNo" class="form-control" maxlength=1 style="*width:60%; max-width:300px; text-align:center; " placeholder="" value="A" onKeyDown="_cf_onlyUpper(this)" >
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;" >수량</label>
                      <div class="col">
                        <input type="text" id="xls_qty" name="xls_qty" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder="" value="B"  onKeyDown="_cf_onlyUpper(this)">
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">랙코드</label>
                      <div class="col">
                        <input type="text" id="xls_rackCode" name="xls_rackCode" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value="C"  onKeyDown="_cf_onlyUpper(this)">
                      </div>
                    </div>  
					<div class="form-group mb-3 row">
                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">이동랙코드</label>
                      <div class="col">
                        <input type="text" id="xls_moveRackCode" name="xls_moveRackCode" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value=""  onKeyDown="_cf_onlyUpper(this)">
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;text-align:right;">비고</label>
                      <div class="col">
                        <input type="text" id="xls_memo" name="xls_memo" class="form-control"  maxlength=1 style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value=""  onKeyDown="_cf_onlyUpper(this)">
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;text-align:right;"></label>
                      <div class="col">
                        
                      </div>                  
                    </div>  

					<div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;text-align:right;">시작</label>
                      <div class="col">
                        <input type="text" id="xls_sRow" name="xls_sRow" maxlength=3 class="form-control" style="*width:60%; max-width:300px; text-align:center;" placeholder=""  value="2" onKeyDown="_cf_onlyNumber(this)">
                      </div>                     
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;" >&nbsp;</label>
                      <div class="col">
                        &nbsp;
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; *padding-left: 240px; text-align:right;">&nbsp;</label>
                      <div class="col">
                        &nbsp;
                      </div>
                    </div>  


			        </div>
			        <dl class="dl_cl__file">	
			        	<div class="form-group mb-3 row">
			        	<label class="col-3 col-form-label" style="min-width: 118px; width:auto;">이어 올리기</label>
			        	<div class="col">
                       	<label class="form-check">
                        <input class="form-check-input" type="checkbox" id="connectYN  " name="connectYN" checked>
                        </label>
                        </div>
                        
                      </div>    
                      		        	
                      		        	
			            <dd><input type="file" id="batchFile"  name="batchFile" style="width:480px; border:1px solid #DDDDDD;"/></dd>
			        </dl>        
			    </div>	    
			    <div class="bottom">
			        <button type="button" id="iBtn-addExcel" class="btn" onclick="fn_fileDataCall()" ><i class="fas fa-file-upload"></i><span >올리기</span></button>
			        <!-- <button type="button" id="iBtn-popClose" class="btn" onclick="fnPopClose()" ><i class="fas fa-window-close"></i><span>닫기</span></button> -->  
			    </div>
			</form> 
		 </div>	
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
		
		 <!-- 엑셀로 재고불러오기 팝업 -->
		<div id="dialog-form-itemfinder" title="엑셀로 재고불러오기" style="display:none;"> 
		  	<form id="addExcelForm" name="addExcelForm" enctype="multipart/form-data" method="post"  action= "stock-wr-up-xls">
			
                <div class="form-group mb-3 row">
					 
				    <div class="col">
				        
				        <input id="excelFile" type="file" onchange="readExcel()">
				    </div>
				</div>	    
			    <div id="grid_wrap_itemFinder" style="width:90%;height:50vh;"></div>
			</form> 
		  	
		</div>
		
		<!--   부품 등록 진행바 -->
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
		
		<!--  바코드 인쇄에서 사용되는 div  -->
		<input type="text" id="barcodeInput"  style="position:relative; left:-2000px; top:-100000px;">
		<div id="barcodePrintDiv">
			 
	 	</div>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js"></script>	
    <!-- Tabler Libs JS -->
	<form name="popForm"> 
		<input type="hidden" id="popForm_consignComCode" name="consignComCode" value="">
	</form> 
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
 
    
    <script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
	<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=1.0604.4"></script>
    <script type="text/javascript" src="/resources/pan/js/stock-wr-up.js?ver=2.0204.5"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0530.4"></script> 


  </body>
</html>