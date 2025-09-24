<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>
<html>
  <head>
    <%@ include file="../icld/head.jsp" %>
    <!-- Aui 인쇄 -->  
    <script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
    <!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>
     
    <script type="text/javascript" src="/resources/js/spin.js"></script>  <!-- spinner -->	    


    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">
    
    <!-- file ajax upload -->
    <script type="text/javascript" src="/resources/js/jquery.form.js"></script>

    
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
                  부품 내역 
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>
        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnFind">조회</button>
            <button class="btn btn-primary" id="btnPrint">인쇄</button>      
            <!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
        </div>
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">제조사</label>
                      <div class="col">
                        <select id="makerCode" class="form-select" style="width:auto; padding:2px 20px 2px 0; ">
                          <option value=""></option>
                        </select> 
                        <!-- <input type="text" list="makerCode" id="makerCode1"/>
                        <datalist id ="makerCode">
                          <option value=""></option>
                        </datalist> -->
                        
                      </div>
                   
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">부품ID</label>
                      <div class="col">
                        <input type="text" id="itemId" class="form-control" aria-describedby="" placeholder="" style="width:60%; max-width:300px;">
                      </div>
                      <!-- <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">상품코드</label>
                      <div class="col">
                        <input type="text" id="itemCode" class="form-control" aria-describedby="" placeholder="" style="width:60%; max-width:300px;">
                      </div> -->
                      
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">품번</label>
                      <div class="col">
                        <input type="text" id="itemNo" class="form-control" aria-describedby="" placeholder="" style="width:60%; max-width:300px;">
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품명</label>
                      <div class="col">
                        <input type="text" id="itemName" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">클래스</label>
                      <div class="col">
                        <select id="classCode" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
                          <option value=""></option>
                          <option value="GN">정품</option>
                          <option value="AM">애프터마켓</option>
                          <option value="RM">재제조</option>
                          <option value="ET">기타</option>
                        </select>
                      </div>
                      
                      
                </div>
                <div>
                	<label style="min-width: 65px; width:auto;">재고유무</label>
					<button class="btn btn-outline-info"  id="btn1" onclick="myCustomFilter1()" >보유부품 보기</button>
					<button class="btn btn-outline-info"  id="btn2" onclick="clearMyFilter1()" >전체부품 보기</button>
					<label style="min-width: 65px; width:auto; margin-left: 30px;">공유부품</label>
					<button class="btn btn-outline-info"  id="btn3" onclick="myCustomFilter2()" >자사부품만 보기</button>
					<button class="btn btn-outline-info"  id="btn4" onclick="clearMyFilter2()" >공유부품도 보기</button>
					<input type="hidden" id="comCode_save" value="${comCode}" >
					
                    <label  style="min-width: 118px; width:auto; margin-left: 30px;">주문즉시출고</label>
                 	<input class="form-check-input" type="checkbox" id="immediateRlYN" name="immediateRlYN">
                       
                   
	 
                       
				</div>
				
				<div>
					<span style="display: initial; float: right;"> <input
						type="button" class="btn btn-secondary "
						onclick="itemExcelAdd()" value="엑셀업로드">
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
        
        <%-- <%@ include file="../icld/footer.jsp" %> --%>
        
      </div>
    </div>
    
    <!--부품가 엑셀업로드 팝업 -->
		<div id="dialogXls-form" title="엑셀업로드" style="display: none;">
			<div id="contents720">
				<form id="addExcelForm" name="addExcelForm"
					enctype="multipart/form-data" method="post" action="item-up-xls">
					<div>
						<div class="di_cl_bacth_data_guide">

							<div class="form-group mb-3 row">
								<label class="col-3 col-form-label required"
									style="min-width: 118px; width: auto; text-align: right;">품번</label>
								<div class="col">
									<input type="text" id="xls_itemNo" name="xls_itemNo"
										class="form-control" maxlength=1
										style="*width: 60%; max-width: 300px; text-align: center;"
										placeholder="" value="A" onKeyDown="_cf_onlyUpper(this)">
								</div>
								<label class="col-3 col-form-label"
									style="min-width: 118px; width: auto; *padding-left: 240px; text-align: right;">부품명</label>
								<div class="col">
									<input type="text" id="xls_itemName" name="xls_itemName"
										class="form-control" maxlength=1
										style="*width: 60%; max-width: 300px; text-align: center;"
										placeholder="" value="B" onKeyDown="_cf_onlyUpper(this)">
								</div>
								<label class="col-3 col-form-label required"
									style="min-width: 118px; width: auto; *padding-left: 240px; text-align: right;">센터가</label>
								<div class="col">
									<input type="text" id="xls_centerPrice" name="xls_centerPrice"
										class="form-control" maxlength=1
										style="*width: 60%; max-width: 300px; text-align: center;"
										placeholder="" value="C" onKeyDown="_cf_onlyUpper(this)">
								</div>
							</div>
							<div class="form-group mb-3 row">
								<label class="col-3 col-form-label"
									style="min-width: 118px; width: auto; text-align: right;">제조사</label>
								<div class="col">
									<input type="text" id="xls_makerCode" name="xls_makerCode"
										class="form-control" maxlength=1
										style="*width: 60%; max-width: 300px; text-align: center;"
										placeholder="" value="D" onKeyDown="_cf_onlyUpper(this)">
								</div>
								<label class="col-3 col-form-label"
									style="min-width: 118px; width: auto; *padding-left: 240px; text-align: right;">클래스</label>
								<div class="col">
									<input type="text" id="xls_classCode" name="xls_classCode"
										class="form-control" maxlength=1
										style="*width: 60%; max-width: 300px; text-align: center;"
										placeholder="" value="E" onKeyDown="_cf_onlyUpper(this)">
								</div>
								<label class="col-3 col-form-label"
									style="min-width: 118px; width: auto; *padding-left: 240px; text-align: right;">&nbsp;</label>
								<div class="col">&nbsp;</div>
							</div>

							<div class="form-group mb-3 row">
								<label class="col-3 col-form-label required"
									style="min-width: 118px; width: auto; text-align: right;">시작</label>
								<div class="col">
									<input type="text" id="xls_sRow" name="xls_sRow" maxlength=3
										class="form-control"
										style="*width: 60%; max-width: 300px; text-align: center;"
										placeholder="" value="1" onKeyDown="_cf_onlyNumber(this)">
								</div>
								<label class="col-3 col-form-label"
									style="min-width: 118px; width: auto; *padding-left: 240px; text-align: right;">&nbsp;</label>
								<div class="col">&nbsp;</div>
								<label class="col-3 col-form-label"
									style="min-width: 118px; width: auto; *padding-left: 240px; text-align: right;">&nbsp;</label>
								<div class="col">&nbsp;</div>
							</div>


						</div>
						<dl class="dl_cl__file">
							<dd>
								<input type="file" id="batchFile" name="batchFile"
									style="width: 480px; border: 1px solid #DDDDDD;" />
							</dd>
						</dl>
					</div>
					<div class="bottom">
						<button type="button" id="iBtn-addExcel" class="btn"
							onclick="fn_fileDataCall()">
							<i class="fas fa-file-upload"></i><span>올리기</span>
						</button>
						<!-- <button type="button" id="iBtn-popClose" class="btn" onclick="fnPopClose()" ><i class="fas fa-window-close"></i><span>닫기</span></button> -->
					</div>
					<div style= "margin-top:20px">
						<span>**&nbsp;&nbsp;기존에 등록 되어있는 부품은 센터가만 업데이트됩니다.<br>
						  &nbsp;&nbsp;&nbsp;&nbsp;목록중 새로운 부품은 입력한 정보로 새로 등록됩니다. </span>
					</div>
					<div style= "margin-top:10px">
						<span>**&nbsp;&nbsp;제조사는 완성차코드를 참고해주세요.<br>
						  &nbsp;&nbsp;&nbsp;&nbsp;클래스는 정품 = GN / 애프터마켓 = AM / 재제조 = RM / 기타 = ET 를 입력해주세요.
						  </span>
					</div>
				</form>
			</div>
		</div>
		
	<%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
			<%	/* CSS/JS 파일 캐시 방지 */	
				String itemList = application.getRealPath("/resources/pan/js/item-list.js");	
				File itemListFile = new File(itemList);	
				Date lastModified_itemListFile = new Date(itemListFile.lastModified());  	
				
			 
				
				
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
    	<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
     <script type="text/javascript" src="/resources/pan/js/item-list.js?ver=<%=fmt.format(lastModified_itemListFile)%>"></script> 
        <%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%> 
    
  </body>
</html>