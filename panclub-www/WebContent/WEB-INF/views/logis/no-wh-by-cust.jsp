<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>발주처별미입고</title>
    <style type="text/css">
	/* 특정 칼럼(데모의 price)의 체크박스 크기 설정 */
	/* 확인할려면 칼럼레이아웃에 정의된 my-check-column 의 주석 제거 */
	.my-check-column .aui-checkbox {
		width: 20px !important;
		height: 20px !important;
	}
</style>
<script>
function checkExportToXlsx_grid_wrap_detail()
{
	const gridId = '#grid_wrap_detail';  //export 할 그리드 아이디
	const key  = 'idx'; // 체크 복구를 위한 그리드의 rowIdField

	const beforeGridData = AUIGrid.getGridData(gridId);  //기존 그리드 데이터 저장
	const checkGrid = AUIGrid.getCheckedRowItems(gridId).map((row)=>row.item); // 체크된 그리드의 데이터 저장
	if(checkGrid.length > 0) // 체크수가 1개 이상일때
		AUIGrid.exportToXlsx(gridId , 
							{	beforeRequestCallback  :()=>{AUIGrid.setGridData(gridId,checkGrid)} ,  
								afterRequestCallback :()=>{AUIGrid.setGridData(gridId , beforeGridData)  
														   AUIGrid.setCheckedRowsByIds(gridId , checkGrid.reduce((a,c)=>{
															   																a.push(c[key]); 
															   																return a;
															   															},[])
															   							)
															}
								});
	else 
		AUIGrid.exportToXlsx(gridId);
}	
</script>
  </head>
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
                <h2 class="page-title">
                  발주처별 미입고 품목
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>

       <!--  <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">저장</button>
        </div> -->
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">
                <div class="card-header" style="display:none;">
                  <h3 class="card-title">Horizontal form</h3>
                </div>
                <div class="card-body">
                 	<div style="width:100%;margin:0 auto;">
						<div id=grid_wrap style="width:23%; height:70vh; float:left;margin-right:2%;"></div>
                      
                      
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                  		<input type="button" class="btn btn-secondary" onclick="whUp()" value="발주입고..">
	                  		<!-- <input type="button" class="btn btn-secondary" onclick="priceChk('/logis/whItemAdd','CHK')" value="인쇄"> -->
	                 	</span> 
	                 	<span style="display: initial; float: right; margin-right: 10px;'">
							<input type="button" class="btn btn-secondary" id="btnPrint" onclick="checkExportToXlsx_grid_wrap_detail()" value="엑셀 다운">
						</span>
											<!-- 	<span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary" onclick="removeRow1()" value="인쇄">
                      	</span> -->
                      </div>                      
                      
                      
                      	<div style="width:100%;margin:0 auto;">
							<span style="font-size:0.9em; color:#aaa;"> 발주처코드:</span> <span id="dInfo_custCode" style="margin-top:20px;"></span>
							<span style="font-size:0.9em; color:#aaa; padding-left:1%;"> 발주처명:</span> <span id="dInfo_custName" style="margin-top:20px;"></span>							
						</div>
						<div id="grid_wrap_detail" style="width:75%; height:70vh; float:right;"></div>
						<div style="clear:both;"></div>
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
		
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">발주처</label>
	      <div class="col">
	        <div class="">
	        	<input type="hidden" id="popCustCode" value="" />
	          	<input type="text" class="" id="popCustName" disabled>
	      	</div>
	  	  </div>    
		
		  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">입고일(발주처출고일을 입력)</label>
	      <div class="col">
	        <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
	          <input type="text" id="popWhYmd" aria-label="Date-Time">
	          <span class="tui-ico-date"></span>
	      	</div>
	      	<div id="wrapper" style="margin-top: -1px;"></div>				        
	  	  </div> 
	  	  
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
  	  <div style="margin-top:10px; color:darkRed;">
	  	* 입고번호는 발주번호별로 생성됩니다.<br>
	  	* 입고일은 실입고일이 아닌 발주처에서 출고한 일자를 입력하세요.
	  </div>
	</div>
	
	
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String noWhByCust = application.getRealPath("/resources/pan/js/no-wh-by-cust.js");	
			File noWhByCustFile = new File(noWhByCust);	
			Date lastModified_noWhByCustFile = new Date(noWhByCustFile.lastModified());  	
			
			
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
    
    <script type="text/javascript" src="/resources/pan/js/no-wh-by-cust.js?ver=<%=fmt.format(lastModified_noWhByCustFile)%>"></script> 
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script> 
  </body>
</html>