<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <title>거래처내역</title>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
      
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
                <div class="page-pretitle" style="display:none;">
                  요약
                </div>
                <h2 class="page-title">
                  거래처내역
                </h2>
              </div>
              <!-- Page title actions -->
              <div class="col-12 col-md-auto ms-auto d-print-none" style="display:none;">
                <div class="btn-list">
                  <span class="d-none d-sm-inline">
                    <a href="#" class="btn btn-white">
                      New view
                    </a>
                  </span>
                  <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                    <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Create new report
                  </a>
                  <a href="#" class="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal" data-bs-target="#modal-report" aria-label="Create new report">
                    <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
         <!--    <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">
                <div class="card-header" style="display:none;">
                  <h3 class="card-title">Horizontal form</h3>
                </div>
                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">업체구분</label>
                      <div class="col">
                        <select id="custType" class="form-select" style="width:auto; padding:2px 20px 2px 0; ">
                          <option value="" selected></option>
                          <option value="C3" >일반(사업자번호 O)</option>
                          <option value="C2">개인(사업자번호 x)</option>
                          <option value="C1">보험사</option>
                          <option value="C4">은행</option>
                          <option value="C5">카드사</option>
                          <!-- <optgroup label="자동차정비업">
                            <option value="A1">자동차종합정비업(구 1급)</option>
                            <option value="A2">소형자동차종합정비업(구 2급)</option>
                            <option value="A3">자동차전문정비업(구 3급)</option>
                            <option value="A4">제조사 서비스센터</option>
                            <option value="A5">운수업체</option>
                          </optgroup>
                          <optgroup label="부품업">
                            <option value="B1">도매업체</option>
                            <option value="B2">소매업체</option>
                          </optgroup>
                          <option value="C1">보험사</option>
                          <option value="C4">은행</option>
                          <option value="C5">카드사</option>
                          <option value="C2">택배사</option>
                          <option value="C3">기타 법인</option>
                          <option value="D1">기타(사업자번호 x)</option>
                          <optgroup label="SR">
                            <option value="E1">SR2</option>
                            <option value="E2">SR3</option>
                          </optgroup> -->
                          
                        </select>
                      </div>
                   
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">거래처코드</label>
                      	<div class="col">
                        	<input type="text" id="custCode" class="form-control" aria-describedby="" placeholder="" style="width:60%; max-width:300px; ">
                     	 </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">거래처명(약명)</label>
                      	<div class="col">
                        	<input type="text" id="custName" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      	</div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">사업자번호</label>
                      	<div class="col">
                        	<input type="text" id="bizNo" class="form-control" maxlength="12" style="width:60%; max-width:300px;" placeholder="" >
                      	</div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">거래구분</label>
                      	<div class="col">
                      		<select id="custCatalog" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
                          		<option value="w" >전체</option>
                         		 <option value="p" >발주처</option>
                          		<option value="s">주문처</option>
                       		 </select>
                      </div>  
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">사용유무</label>
                      	<div class="col">
                      		<select id="validYN" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
                          		<option value="" >전체</option>
                          		<option value="Y" selected>사용</option>
                          		<option value="N">중지</option>
                        	</select>
                     	 </div>  
                </div>
                <div class="form-group mb-3 row">
            	    <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">대표자명 </label>
                      	<div class="col">
                        	<input type="text" id="ceoName" class="form-control" style="width:60%; max-width:130px;" placeholder="" >
                      	</div>
                      	
                    <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">담당자 </label>
                      	<div class="col">
                        	<input type="text" id="custManager" class="form-control" style="width:60%; max-width:130px;" placeholder="" >
                      	</div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">결제일</label>
                      	<select id="paymentDay" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option></option>
													<option>즉시</option>
													<option>월말</option>
													<option>익월5일</option>
													<option>익월10일</option>
													<option>익월15일</option>
						</select>
						
						<label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매가격유형</label>
                      	<select id="salePriceType" class="form-select"style="width: auto; padding: 2px 25px 2px 0;">
													<option></option>
													<option>센터가</option>
													<option>매입가</option> 
						</select>
					<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">&nbsp;</label>
											<div class="col">
												<input type="number" min="0" value="0" class="form-control"style="width: 60%; max-width: 100px; padding-right: 12px; display: none;"placeholder="">
											</div>
					
                </div>
                	
             
              </div>
              <div class="form-group mb-3 row" style="margin-top:-10px">
									<div>
										<span style="display: initial; float: right; margin-right: 10px;'">
											<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">
										</span>
									</div>
								</div>
            </div>

            <div class="form-group mb-3 row">
              <div id="grid_wrap" style="width:99.1%;height:70vh;"></div>
            </div>  

            <div class="form-footer1">
            </div>
          </div>
        </div>
        
      </div>
     </div> 
        
        <%-- <%@ include file="../icld/footer.jsp" %> --%>
        
      </div>
    </div>
    <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New report</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" name="example-text-input" placeholder="Your report name">
            </div>
            <label class="form-label">Report type</label>
            <div class="form-selectgroup-boxes row mb-3">
              <div class="col-lg-6">
                <label class="form-selectgroup-item">
                  <input type="radio" name="report-type" value="1" class="form-selectgroup-input" checked>
                  <span class="form-selectgroup-label d-flex align-items-center p-3">
                    <span class="me-3">
                      <span class="form-selectgroup-check"></span>
                    </span>
                    <span class="form-selectgroup-label-content">
                      <span class="form-selectgroup-title strong mb-1">Simple</span>
                      <span class="d-block text-muted">Provide only basic data needed for the report</span>
                    </span>
                  </span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="form-selectgroup-item">
                  <input type="radio" name="report-type" value="1" class="form-selectgroup-input">
                  <span class="form-selectgroup-label d-flex align-items-center p-3">
                    <span class="me-3">
                      <span class="form-selectgroup-check"></span>
                    </span>
                    <span class="form-selectgroup-label-content">
                      <span class="form-selectgroup-title strong mb-1">Advanced</span>
                      <span class="d-block text-muted">Insert charts and additional advanced analyses to be inserted in the report</span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8">
                <div class="mb-3">
                  <label class="form-label">Report url</label>
                  <div class="input-group input-group-flat">
                    <span class="input-group-text">
                      https://tabler.io/reports/
                    </span>
                    <input type="text" class="form-control ps-0"  value="report-01" autocomplete="off">
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <label class="form-label">Visibility</label>
                  <select class="form-select">
                    <option value="1" selected>Private</option>
                    <option value="2">Public</option>
                    <option value="3">Hidden</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Client name</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Reporting period</label>
                  <input type="date" class="form-control">
                </div>
              </div>
              <div class="col-lg-12">
                <div>
                  <label class="form-label">Additional information</label>
                  <textarea class="form-control" rows="3"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
              Cancel
            </a>
            <a href="#" class="btn btn-primary ms-auto" data-bs-dismiss="modal">
              <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Create new report
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Tabler Libs JS -->
    <script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
    <script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
    <!-- Tabler Core -->
    <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script>
    	<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
     <script type="text/javascript" src="/resources/pan/js/cust-list.js?ver=1.0206.4"></script>
     <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=1.0105.4"></script>
     <!--240110 4car에 윗줄적용안됨-->
    

  </body>
</html>