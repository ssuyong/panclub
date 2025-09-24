<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>반출요청 상세내역 </title>


	
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
                  반출요청 상세내역 
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
                    <input type="hidden" id="gvComCode" value="${gvComCode}" />
                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청번호</label>
                      <div class="col">
                      	<span id="roReqNo">${roReqNo}</span>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문그룹ID</label>
                      <div class="col">
                      	<span id="orderGroupIdDsp"></span>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
                      <div class="col">                      	<span id="regUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
                      <div class="col">                      	<span id="regYmd"></span>                      </div>      
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
                    </div> 
                    
                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문처</label>
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
                    </div>                     

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">반출 담당</label>
                      <div class="col">	<input type="text" id="roMgr" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="담당/부서" >     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>
                      
                      
                      <label class="col-3 col-form-label " style="min-width: 118; width:auto;"> 첨부파일</label>
                      <div class="col-6">
                     	<span id="attaFileOri"></span>
                     </div>
                      
                   </div>

                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">요청일</label>
                      <div class="col">   	<span id="dmdYmd">&nbsp;</span> </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청시간</label>
                      <div class="col">           	<span id="dmdTime">&nbsp;</span>                  </div> 
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">반출방법</label>
                      
                      <div class="col"><select id="roWay" class="form-select"
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
                    </div> 
                                      
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="roProc('/logis/roAdd','ADD_M_D')" value="반출 처리">  
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
                      	</span>
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" id="btnApply" onclick="roProc('/logis/roItemAdd','CANCEL')" value="요청 취소">   -->
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="roReqProc('/logis/roReqItemAdd','CANCEL')" value="요청 취소">  
                      	</span>
                      	<span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="print()"value="인쇄">             	
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

	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String roReqItemList = application.getRealPath("/resources/pan/js/ro-req-item-list.js");	
			File roReqItemListFile = new File(roReqItemList);	
			Date lastModified_roReqItemListFile = new Date(roReqItemListFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>

    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <script type="text/javascript" src="/resources/pan/js/ro-req-item-list.js?ver=<%=fmt.format(lastModified_roReqItemListFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>