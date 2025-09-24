<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>정산내역</title>
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
  <body  class=" layout-fluid">
	<%@ page import="java.util.*"%>
	<%@ page import="java.text.*"%>
	 
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
                 	정산내역
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button> 
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                    
                      <label class="col-3 col-form-label" style="*min-width: 118px; width:auto;">작성기간</label>
                      	<input type=hidden id="prmsYmd" value=${sYmd} >
						<input type=hidden id="prmeYmd" value=${eYmd} >
												
						<div class="row" style="display: contents;">
						    <div class="col-md-6" style="width: 280px">										       
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
						</div>
						
							<div class="col" >
								<label class="form-check form-check-inline" > 기간 전체조회
									<input class="form-check-input" type="checkbox" id="ymdIgnoreYN" name="ymdIgnoreYN"> </label>
							 </div>
					 <label class="col-3 col-form-label" style="min-width: 50px; width: auto;">요청업체</label>
						<div class="col">
						<input type="text" id="gvComCode" class="form-control"  aria-describedby="" placeholder="거래처코드" style="display: initial; width: 48%; max-width: 100px;"
							value="" required onKeyUp="findCust(this,'gvCustName');"> 
						<input type="text" id="gvCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display: initial; width: 48%; max-width: 200px;" disabled>
						</div>									
 					 <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">접수번호</label>
                      <div class="col"><input type="text" id="accNo" class="form-control" style="width:40%; max-width:300px;" placeholder="" value=${wrNo}></div>
 					 <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">차량번호</label>
                      <div class="col"><input type="text" id="carnum" class="form-control" style="width:40%; max-width:300px;" placeholder="" value=${wrNo}></div>
                	  
                 
			  </div>
			  <div class="form-group mb-3 row"  >
			  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">보험사</label>
                      <div class="col">
                      		<select id="selectInsnm" style="width:40%; max-width:300px;"> 
                      			<option>전체</option> 
                      		</select>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">청구상태</label>
                      <div class="col">
                      	<input type="radio" value="전체" name="accStatus" id="" class="" style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" checked="checked">
                      	<span style="padding-right: 12px;">전체</span>
                      	<input type="radio" value="작성중" name="accStatus" id="" class="" style=" width: 20px; height: 16px;  margin: 0 2px 0 0;">
                      	<span style="padding-right: 12px;">작성</span>
                      	<input type="radio" value="청구" name="accStatus" id="" class="" style=" width: 20px; height: 16px;  margin: 0 2px 0 0;">
                      	<span style="padding-right: 12px;">청구</span>
                      	<input type="radio" value="종결" name="accStatus" id="" class="" style=" width: 20px; height: 16px;  margin: 0 2px 0 0;">
                      	<span style="padding-right: 12px;">종결</span>
                      	<input type="checkbox"  id="closingIncludeYN" class="" style=" width: 20px; height: 16px;  margin: 0 2px 0 0;">
                      	<span style="padding-right: 12px;">종결포함</span>
                      </div>
                      <div class="col"></div>
			  </div>		
                <div class="form-group mb-3 row"  >
									<div >
										<input type="button" class="btn btn-secondary " style="float: left;" onclick="accInfoDeleteBtn()" value="삭제">
										<span style="display: initial; float: right; margin-right: 10px;'">
											<input type="button" class="btn btn-secondary " onclick="JsonDataAdd()" value="데이터업로드">
											<input type="button" class="btn btn-secondary " onclick="excelAdd()" value="엑셀업로드">
											<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
										</span>
									</div>
								</div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>  

          </div>
					
		</div>        
      </div>       
        
      </div>
    </div>
    </div>
    </div>
	
	
	<!-- 엑셀업로드 팝업 -->
	<div id="dialogJson-form" title="데이터업로드"  style="display:none;">
		<input id="jsonFile" type="file" onchange="readJsonData()">
		<div style="height: 48%;  margin-top: 10px;">
			<div id="grid_wrap_jsonInfo" style="width:99.1%;height:99%;"></div>
		</div>
		<div style="height: 45%;  margin-top: 10px;">
			<div id="grid_wrap_jsonDetail" style="width:99.1%;height:99%;"></div>
		</div>
		 		
	</div>
	
	<!-- 엑셀업로드 팝업 -->
	<div id="dialogXls-form" title="엑셀업로드"  style="display:none;">
		  <div id="contents720">			
			<form id="addExcelForm" name="addExcelForm" enctype="multipart/form-data" method="post"  action= "stock-wr-up-xls">
			
                <div class="form-group mb-3 row">
					<label class="col-3 col-form-label required" style="min-width: 118px; width:auto;" id="consignComCodeLabel">업체명</label>
			                      <div class="col" id="consignComCodeSelect" >
			                      <input type="text" list="consignComCode" id="consignComText" >
			                       <datalist id="consignComCode"  style="width:60%; max-width:200px;">
			                      		<option></option>
			                      	</datalist >
			                      	</div>
				    <div class="col">
				        
				        <input id="excelFile" type="file" onchange="readExcel()">
				    </div>
				</div>	    
			    <div id="excel_grid_wrap" style="width:99.1%;height:70vh;"></div>
			</form> 
		 </div>	
	</div>
	
	<!-- 진행바  -->
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
	
	<!--  detail-->
	
	<div id="dialog-form-detail" title="정산관리 상세내역" style="display: none; background :#f5f7fb;">
	 <div class="page-wrapper">
       <h2 class="page-title">
          보험수리비 청구서
       </h2>
       <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary  " onclick="accDetailClose()"  style="float: right; margin-right:15px;">닫기</button>
            <button class="btn btn-primary  " id="detailDataUpload" onclick="excelDetailDataUpt()"  style="float: right; margin-right:10px;">저장</button>
<!--             <button class="btn btn-primary  " id="dialogBtnClose"  style="float: right; margin-right:10px;">엑셀업로드</button> -->
			<input id="detailExcelFile" type="file" onchange="readDetailExcel()"  style="float: right; margin-right:10px;">
        </div> 
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6"> 
              <div class="card">
                <div class="card-body"> 
                	<div>
                		<h4>차량정보</h4>
                	
	                    <div class="form-group mb-3 row">
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">차량번호</label>
		                      <div class="col">
		                      	<input type="text" id="detail_carnum" value="" disabled/>
		                      </div>  
		                      
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">차량명</label>
		                      <div class="col">  <input type="text" id="detail_carnm" value="" disabled/>                                         
		                      </div>      
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">사업자번호</label>
		                      <div class="col">      <input type="text" id="detail_autbizno" value="" disabled/>                                         
		                      </div>      
	                    </div>
	                    <div class="form-group mb-3 row">
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">정비공장</label>
		                      <div class="col">
		                       <input type="text" id="detail_autbiznm" value="" disabled/>   
		                      </div>
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">사고일자</label>
		                      <div class="col">       <input type="text" id="detail_accymd" value="" disabled/>                       
		                      </div>     
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">VINCODE</label>
		                      <div class="col">       <input type="text" id="detail_carbdynum" value="" disabled/>                                        
		                      </div>      
	                    </div>
	                    <br/>
	                    <h4>청구처</h4> 
	                    <div id="ins_grid_wrap" style="width: 200px; height: 120px; float: left;"></div> 
	                    <div class="form-group mb-3 row" style="">
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">접수번호/ 회차</label>
		                      <div class="col">
		                      	 <input type="text" id="detail_accno_odr" value="" disabled/> 
		                      </div>
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">담보/서열</label>
		                      <div class="col">      <input type="text" id="detail_mrtgnm_ordrank" value="" disabled/>                           
		                      </div>     
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">과실율</label>
		                      <div class="col">    <input type="text" id="detail_fltrt" value="" disabled/>                                                    
		                      </div>      
		                   <!--    <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">과실상계율</label>
		                      <div class="col">      <span id="detail_dialogCtMgr" style="font-weight: bold;">0%</span>                                          
		                      </div> -->      
	                    </div>
	                    <div class="form-group mb-3 row">
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">담당자이메일</label>
		                      <div class="col">
		                        <input type="text" id="detail_cstnemail" value="" disabled/>    
		                      </div>
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부가세</label>
		                      <div class="col">            <input type="text" id="detail_vatrt_vat" value="" disabled/>                            
		                      </div>     
		                     <!--  <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">담당자핸드폰</label>
		                      <div class="col">      <span id="detail_dcspay" style="font-weight: bold;">010-2348-4630</span>                                          
		                      </div> -->      
	                    </div>
	                    <div class="form-group mb-3 row">
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">순정부품</label>
		                      <div class="col">
		                        <input type="text" id="detail_aunpatsum" value="" disabled/>         
		                      </div>
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">합계</label>
		                      <div class="col">
		                   	   <input type="text" id="detail_nsum" value="" disabled/>          
		                      </div>		    
	                    </div>
	                    <div class="form-group mb-3 row">
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">(LOCAL)할인율</label>
		                      <div class="col">
		                      	<input type="text" id="detail_ndc" value="" disabled/>      
		                      </div>
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">청구액</label>
		                      <div class="col">
		                      	<input type="text" id="detail_dcspay" value="" disabled/>       
		                      </div>		    
	                    </div>
	                    <div class="form-group mb-3 row">
		                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; ">부품소계</label>
		                      <div class="col">
		                      	<input type="text" id="detail_patsum" value="" disabled/>        
		                      </div>    
	                    </div>
	                </div> 
                </div>
              </div>
               <div class="card" style="margin-top: 10px">
                <div class="card-body">
              		<h4>부품정보</h4>
              		<div id="accDetail_grid_wrap" style="width:99.1%;height:40vh;"></div>
               	</div>
               </div>
              
            </div>
          </div>
        </div>
      </div>
      </div>
		

	<div id="dialog-form-cust" title="거래처 선택" style="display: none;">
					<input type="text" id="pop_cust_srch" placeholder="거래처명">
					<button class="btn btn-dark" id="btnCustFind">조회</button>
					<div id="grid_wrap_cust" style="height: 90%;"></div>
					</div>  
	<!-- Q -->
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js"></script>
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script> 
     <script type="text/javascript" src="/resources/pan/js/fi-acc-list.js"></script> 
    <script type="text/javascript"src="/resources/pan/js/common-pan.js?ver=20240807090856885"></script>
  </body>
</html>