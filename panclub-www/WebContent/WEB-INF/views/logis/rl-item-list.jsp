<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>출고 상세내역</title>

	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	

    <link href="/resources/pan/css/printbox.css?ver=3.0313.3" rel="stylesheet" />
	
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
                  출고 상세내역 
                </h2>
              </div>
            </div>
          </div>
        </div>

       <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">저장</button>
            <button class="btn btn-primary  " id="btnDateChange" >출고일 변경</button>
            <span style=" display: initial; float: right; margin-right: 50px;">
	          <input type="button" class="btn btn-secondary" id="btnPrint" onclick="print()"value="인쇄">               	
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
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
                    <input type="hidden" id="pageMoveYN"  value="${pageMoveYN}" />
                    <input type="hidden" id="gvComCode" value="${gvComCode}" />
                          
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">출고번호</label>
                      <div class="col">
                      	<span id="rlNo">${rlNo}</span>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp"></span>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
                      <div class="col"><span id="orderTypeName"></span> </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">출고일</label>
                      <div class="col"><span id="rlYmd"></span> </div>
<!--                       <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">결제여부</label>
                      <div class="col"><span id="payStatus"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">결제금액</label>
                      <div class="col"><span id="payAmt"></span>                      </div>      
 -->                </div>
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
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">실제 출고일</label>
                      <div class="col">
                      	<span id="realRlYmd"></span> 
                      </div>      
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
                        <label class="col-3 col-form-label required"style="min-width: 118px; width: auto;">운송비 설정</label>
							<div class="col" style="display: flex; flex-direction: row;">
							<label class="form-check"style="margin-right: 20px"> 
								<input class="form-check-input" type="checkbox" id="deliveryYN" name = "deliveryYN" onchange="delivery_chk()"  >
								<span class="form-check-label">운송비 적용</span>
							</label>   							
							<label class="form-check"style="margin-right: 20px">    
							 	 <input type="text"  class="form-control" id="deliveryFee"  placeholder="운송비를 입력해주세요(VAT포함)"style="display:initial; width:130%;  max-width:300px; display:none"  > 
							</label>  
                    </div>
                    </div>                     

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출고 담당</label>
                      <div class="col">	<input type="text" id="rlMgr" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="담당/부서" >     </div>
                      <label   class="col-3 col-form-label required" style="min-width: 118px; width:auto; ">출고방법</label>
											
										<div class="col"><select id="rlWay" class="form-select"
												style="width: auto; padding: 2px 25px 2px 0;" >
												<option value=""></option>
												<option value="일반배송">일반배송</option>
												<option value="입고즉시">입고즉시</option>
												<option value="택배">택배</option>
												<option value="퀵/용차">퀵/용차</option>
												<option value="내사">내사</option>
											</select>     </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;" >메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:700px;" placeholder="" readonly >                </div>
                      </div>      
                         
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>      
                    </div>
 
                    <button class="btn btn-secondary" id="btnDel">삭제</button>
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
    
    	<!-- 프린트 팝업 -->
<div id="dialogPrint-form" title="파일 저장" style="display:none;">
  <div id="contents720">
    <div class="contentBox">
      <div>
        <h3>파일 저장하기</h3>
		</div>
		 <div class="form-group mb-3 row">
          <!-- <label class="col-3 col-form-label">인쇄 시 할인율 포함</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printDcYN" name="printDcYN" >
          </div> -->
            <label class="col-3 col-form-label" style="padding-top:10px;">인쇄 시 할인율</label>
          <div class="Opt">
	      <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	           <input class="form-check-input" type="radio" name="printDcYN"  value="Y"  >
	           <span class="form-check-label">할인율 포함(할인율 표기)</span>
	         </label>
	        <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	             <input class="form-check-input" type="radio" name="printDcYN" value="YY"  checked >
	              <span class="form-check-label">할인율 포함(할인율 미표기)</span>
	          </label>
	           <label class="form-check form-check-inline" style="margin-bottom: 0px;">
	             <input class="form-check-input" type="radio" name="printDcYN" value="N"   >
	              <span class="form-check-label">할인율 미포함</span>
	          </label>
      	</div>
      	<div class="form-group mb-3 row"style="margin-top: 15px; margin-left:5px; ">
          <label class="col-3 " style="display:contents;" >비고 인쇄</label>          
          <div class="col">
            <input class="form-check-input" type="checkbox" id="printMemoYN" name="printMemoYN">
          </div>
          <label class="col-3 " style="display:contents;"  >품번 오름차순 인쇄</label>
          <div class="col">
            <input class="form-check-input" type="checkbox" id="itemNoOderByAscYN" name="itemNoOderByAscYN"> 
          </div>
          <% if (("ㄱ000").equals(comCode)) {   //2024.11.04 sg%>
	      <label class="col-3 " style="margin-left: 10px;display:contents;">공급자변경</label>
	      <div class="col">
	       	<select id="chnLogCust">
	       		<option value=""></option> 
		       	<option value="ㄱ000">P</option> 
		       	<option value="ㅇ413">임파츠</option>
		       	<option value="ㅇ434">에스제이</option>
		       	<option value="ㅇ436">에스디</option>
		       	<option value="ㅋ127">케이에스파츠</option>
	       	</select>
	        </div>
	        <%} %>
                  
        </div>
      <div class="bottom" id="button-container" style="padding-top:20px;" >
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

 <!-- 출고일 변경 팝업 -->
	<div id="dialogChangeDate" title="출고일 변경" style="display: none;">
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">거래처</label>
	      <div class="col">
	        <div class="">
	        	<input type="hidden" id="popCustCode" value="" />
	          	<input type="text" class="" id="popCustName" disabled>
	      	</div>
	  	  </div>    
	  	    <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">출고번호</label>
	  	    	 <div class="col">
	  	    	<input type="text" id="popRlNo" value="" disabled/>
	  	    	</div>		
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">변경 출고일</label>
	      <div class="col">
	        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
	          <input type="text" id="popCnRlYmd" aria-label="Date-Time">
	          <span class="tui-ico-date"></span>
	      	</div>
	      	<div id="wrapper1" style="margin-top: -1px;"></div>				        
	  	  </div>   	  
	</div>


    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String rlItemList = application.getRealPath("/resources/pan/js/rl-item-list.js");	
			File rlItemListFile = new File(rlItemList);	
			Date lastModified_rlItemListFile = new Date(rlItemListFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
    <script type="text/javascript" src="/resources/pan/js/rl-item-list.js?ver=<%=fmt.format(lastModified_rlItemListFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>