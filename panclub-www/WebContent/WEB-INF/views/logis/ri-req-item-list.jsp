<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
    <%@ include file="../icld/head.jsp" %>


	
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
                  반입요청 상세내역 
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
                      	<span id="riReqNo">${riReqNo}</span>
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
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문처</label>
                      <div class="col">
                        <input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}"  readonly >
                        <input type="text" id="custName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="custMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" readonly >
                        <input type="text" id="custMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" readonly >
                      </div>
					  		
                      <label id="supplyInfo-title" class="col-3 col-form-label " style="min-width: 118px; width:auto;">납품처</label>
                      <div  id="supplyInfo-input" class="col" >
                        <input type="text" id="supplyCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" value="${custCode}" readonly >
                        <input type="text" id="supplyCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" readonly >
                        <input type="text" id="supplyMgrName" class="form-control" aria-describedby="" placeholder="담당자명" style="display:initial;width:48%; max-width:100px;" value="${custCode}" readonly >
                        <input type="text" id="supplyMgrPhone" class="form-control" aria-describedby="" placeholder="전화번호" style="display:initial;width:48%; max-width:150px;" value="${custCode}" readonly>
                      </div>       
                    </div>                       

                    <div class="form-group mb-3 row" >
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">수신자</label>
                      <div class="col">	<input type="text" id="receiver" class="form-control" style="display:initial;width:60%; max-width:150px;" placeholder="담당/부서" >     </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">메모</label>
                      <div class="col">
                         <div>   <input type="text" id="memo1" class="form-control" style="*width:60%; max-width:700px;" placeholder="" >                </div>
                      </div>      
                          
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>      
                    </div>

                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청일</label>
                      <div class="col">   	<span id="dmdYmd">&nbsp;</span> </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">요청시간</label>
                      <div class="col">           	<span id="dmdTime">&nbsp;</span>                  </div> 
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">출고방법</label>
                      <div class="col">   	<span id="rlWay">&nbsp;</span> </div> -->
                      <label   class="col-3 col-form-label" style="min-width: 118px; width:auto; ">반입방법</label>
										<div class="col">   	<span id="riWay">&nbsp;</span> </div>	
										<!-- <div class="col"><select id="riWay" class="form-select"
												style="width: auto; padding: 2px 25px 2px 0;" >												
												<option value="방문수거">방문수거</option>
												<option value="택배수거">택배수거</option>
												<option value="퀵수거">퀵수거</option>
												<option value="기타">기타</option>
											</select>     </div> -->
					<label class="col-3 col-form-label " style="min-width: 118px; width:auto;"></label>
                      <div class="col">           	<span id="">&nbsp;</span>                  </div>
                    </div>
                    
                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" id="btnApply" onclick="riProc('/logis/riAdd','ADD')" value="반입 처리"> -->
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="riProcPop('/logis/riAdd','ADD')" value="반입 처리..">    
                      	</span>
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" id="btnApply" onclick="riProc('/logis/riItemAdd','CANCEL')" value="요청 취소"> -->  
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="riReqProc('/logis/riReqItemAdd','CANCEL')" value="요청 취소">
                      	</span>
                      	<span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="print()"value="인쇄">             	
                      	</span>
                      </div>
                      <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
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
	  	  <% if (("ㄱ121").equals(comCode)) {%>	
			<div class="alert alert-warning" role="alert" style="margin-top:30px;">
			<div class="d-flex">
			     <div>
			       <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" /><path d="M12 16h.01" /></svg>
                        </div>
			     <div>
			       그린파츠의 경우 출고된 랙으로 입고됩니다.<br>(선택한 랙 무시)
			     </div>
			    
			   </div>
			</div>
		  <% } %>					
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
		

    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String riReqItemList = application.getRealPath("/resources/pan/js/ri-req-item-list.js");	
			File riReqItemListFile = new File(riReqItemList);	
			Date lastModified_riReqItemListFile = new Date(riReqItemListFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
    
    <script type="text/javascript" src="/resources/pan/js/ri-req-item-list.js?ver=<%=fmt.format(lastModified_riReqItemListFile)%>"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 

 	
  </body>
</html>