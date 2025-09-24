<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>출고요청 상세내역 </title>
    
    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	
    <script type="text/javascript" src="/resources/js/jquery.form.js"></script>  <!-- file ajax upload -->
    <link href="/resources/pan/css/printbox.css?ver=3.0313.3" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
	
  </head>
   <link href="/resources/pan/css/barcodePrint.css?ver=1.0516.4" rel="stylesheet" /> 
  <body  class=" layout-fluid">
    <div class="page">
<%--        
      <%@ include file="../icld/header.jsp" %>
      <%@ include file="../icld/navbar.jsp" %>    --%>           

      <div class="page-wrapper">
      <div class="spinner" id="spinner"></div>
        <div class="container-xl">
          <!-- Page title -->
          <div class="page-header d-print-none">
            <div class="row g-2 align-items-center">
              <div class="col">
                <!-- Page pre-title -->
                <!-- <h2 class="page-title"> -->
                <h2 class="page-title" id = "page-title">
                  출고요청 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>

			<div style="padding: 0 0 10px 14px;">
				<!--             <button class="btn btn-primary" id="btnReg">저장</button> -->
				<span style="float: right; margin-right:15px;">
					<button class="btn btn-primary  " id="btnClose">닫기</button>
				</span>
				<button class="btn btn-primary" id="btnReg">저장</button>
				<button class="btn btn-primary" id="btnAccept">접수</button>
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
                    <input type="hidden" id="stdClType" value="${stdClType}" />
                    <input type="hidden" id="gvComCode" value="${gvComCode}" />
                    <input type=hidden id=rlComCode"} >
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
                      <div class="col">
                      	<span id="rlReqNo">${rlReqNo}</span>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp"></span>
                      </div>      
                            
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
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col"><span id="orderTypeName"></span> </div>    
                          
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
                      <label id="senderInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">발송처</label>
                        <input type="text" id="senderCustName" class="form-control" aria-describedby="" placeholder="보낸회사" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="senderName" class="form-control" aria-describedby="" placeholder="보낸사람" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="senderTel" class="form-control" aria-describedby="" placeholder="연락처" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="senderAddr1" class="form-control" aria-describedby="" placeholder="주소" style="display:initial;width:48%; max-width:300px;" readonly>
                      </div>
                      
                      <div  id="receiverInfo" class="col" >
                      <label id="receiverInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">수령처</label>
                        <input type="text" id="receiverCustName" class="form-control" aria-describedby="" placeholder="받는회사" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="receiverName" class="form-control" aria-describedby="" placeholder="받는사람" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="receiverTel" class="form-control" aria-describedby="" placeholder="연락처" style="display:initial;width:48%; max-width:100px;" readonly >
                        <input type="text" id="receiverAddr1" class="form-control" aria-describedby="" placeholder="주소" style="display:initial;width:48%; max-width:300px;" readonly>
                      </div>  
                             
                    </div>                     

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출고 담당</label>
                      <div class="col">	<input type="text" id="rlMgr" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="담당/부서" >     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">최종픽업부품</label>
                      <div class="col">             	<span id="lastPickParts">&nbsp;</span>                   </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>      
                    </div>

                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">요청일</label>
                      <div class="col">   	<span id="dmdYmd">&nbsp;</span> </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청시간</label>
                      <div class="col">           	<span id="dmdTime">&nbsp;</span>                  </div> 
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">출고방법</label>
                      <div class="col">   	<span id="rlWay">&nbsp;</span> </div> -->
                      <label   class="col-3 col-form-label required" style="min-width: 118px; width:auto; ">출고방법</label>
											
										<div class="col"><select id="rlWay" class="form-select"
												style="width: auto; padding: 2px 25px 2px 0;" >												
												<option value="일반배송">일반배송</option>
												<option value="입고즉시">입고즉시</option>
												<option value="택배">택배</option>
												<option value="퀵/용차">퀵/용차</option>
												<option value="내사">내사</option>
											</select>     </div>
                    </div> 
                    
                    
                    
                    
                    <div class="form-group mb-3 row">                    
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출고창고</label>
                      <div class="col">  
                      		<input type="text" id="storageCode" class="form-control"	style="display:initial;width:48%; max-width:100px;" placeholder=""  disabled>
							<input type="text" id="storageName" class="form-control"	style="display:initial;width:48%; max-width:100px;" placeholder=""  disabled>							
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">출고랙</label>
                      <div class="col"> 
                      		<input type="text" id="rackCode" class="form-control"	style="display:initial;width:48%; max-width:100px;" placeholder=""  disabled>
							<input type="text" id="rackName" class="form-control"	style="display:initial;width:48%; max-width:100px;" placeholder=""  disabled>                 
                       </div>  
                          <div class="col" style="width:auto;">
                    
                   	 <input type="button" style=" float: right; margin-right: 30px; margin-bottom: 5px; width: 160px; height: 40px" class="btn btn-info" id="barcodeLabelPrint" value="태그인쇄">  
                   	  
                    </div>
                    </div> 
                   
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
                      		<input type="text" id="barcodeReaderInput" placeholder="바코드" autocomplete="off">  
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="rlProcAdd()" value="출고 처리">  
	                      	<input type="button" class="btn btn-secondary" id="btnCancle" onclick="rlProcCancel()" value="요청 취소">  
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      		<!-- <span style=" display: initial; float: right;">
                      		  <span>인쇄 시 할인율 포함<span>
	                      	  <input class="form-check-input" type="checkbox" id="printDcYN" name="printDcYN" style="margin-right: 20px" >          	
                      	</span> -->
                      	
                      	<span style="float:right;"> 
						<label class="form-check form-check-inline" style="margin-bottom: 0px;">			
			                <input class="form-check-input" type="radio" name="printDcYN" value="Y" >
			                <span class="form-check-label">할인율 포함(할인율 표기)</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="printDcYN" value="YY" checked >
			                <span class="form-check-label">할인율 포함(할인율 미표기)</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			                 <input class="form-check-input" type="radio" name="printDcYN"  value="N" >
			                <span class="form-check-label">할인율 미포함</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			             
           					<input class="form-check-input" type="checkbox" id="itemNoOderByAscYN" name="itemNoOderByAscYN">  
			                <span class="form-check-label">품번 오름차순 인쇄</span>
			            </label>
			            <label class="form-check form-check-inline" style="margin-bottom: 0px;   ">
			             
           					<input class="form-check-input" type="checkbox" id="iInput_printAccept" name="p" checked="checked">  
			                <span class="form-check-label">인쇄시 자동 접수</span>
			            </label>
	                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="print_()"value="인쇄">             	
		            	</span> 
		            	  
              <!--         	<span style=" display: initial; float: right;"> -->
                      	<!-- </span> -->
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:60vh;"></div>
                    </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>


	<!-- 프린트 팝업 -->
<div id="dialogPrint-form" title="파일 저장" style="display:none;">
  <div id="contents720">
    <div class="contentBox">
      <div>
        <h3>파일 저장하기</h3>
        
      </div>
      <div class="bottom" id="button-container">
        <div class="box1">
          <button type="button" id="print" class="w-btn w-btn-gray" ><i class="fas fa-file-upload"></i><span>인쇄</span></button><br>
         <button type="button" id="exportXls" class="w-btn w-btn-gray w-btn-outline" onclick="exportTo('xlsx')"value="엑셀다운"><i class="fas fa-file-upload"></i><span>엑셀 다운로드</span></button>
        </div>
        <div class="box2">
          
          <button type="button" id="btnDownload" class="w-btn w-btn-gray"><i class="fas fa-file-upload"></i><span>이미지 다운로드</span></button><br>
          <button type="button" id="exportPdf" class="w-btn w-btn-gray w-btn-outline"onclick="exportTo('pdf')" value="PDF다운"><i class="fas fa-file-upload"></i><span>PDF다운로드</span></button>
        </div>
      </div>
    </div>
  </div>
</div>

	<div id="barcodePrintDiv"> </div>
	<input type="text" id="barcodeInput"  style="position:relative; left:-2000px; top:-100000px;">
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String rlReqItemList = application.getRealPath("/resources/pan/js/rl-req-item-list.js");	
			File rlReqItemListFile = new File(rlReqItemList);	
			Date lastModified_rlReqItemListFile = new Date(rlReqItemListFile.lastModified());  	
			
			String barcodeJS = application.getRealPath("/resources/pan/js/barcodeJS.js");	
			File barcodeJSFile = new File(barcodeJS);	
			Date lastModified_barcodeJSFile = new Date(barcodeJSFile.lastModified()); 
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>

    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    <script type="text/javascript"			src="/resources/inko/inko.min.js"></script> 
    <script type="text/javascript"			src="/resources/datamatrix-svg/datamatrix.js"></script> 
	<script type="text/javascript"			src="/resources/pan/js/barcodeJS.js?ver=<%=fmt.format(lastModified_barcodeJSFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/rl-req-item-list.js?ver=<%=fmt.format(lastModified_rlReqItemListFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>