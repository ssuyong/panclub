<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!doctype html>

<html>
  <head>
  	  <!-- <script type="text/javascript">
		var theme = "blue";
	</script> -->
    <%@ include file="../icld/head.jsp" %>
    <title>부품 등록</title>
        	    
    <!-- Begin : jquery-ui 레이어파업 -->
<!--     <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="https://code.jquery.com/ui/1.11.1/jquery-ui.js"></script> -->
	<!-- End : jquery-ui 레이어파업 --> <style>
    /* 커스텀 에디터 스타일 */
		#textAreaWrap {
			font-size:12px;
			position:absolute;
			height:80px;
			min-width:100px;
			background:#fff;
			border:1px solid #555;
			display:none;
			padding:4px;
			text-align:right;
			z-index:9999;
		}
		#textAreaWrap textarea {
		font-size:12px;
		border: 0.8px solid #626976;
		background-color: #d9e5ff;
		}
		/* 에디터 버튼 */
		.editor_btn {
			background:#ccc;
			border : 1px solid #555;
			cursor : pointer;
			margin: 2px;
			padding:2px;
		}
		.button-wrap {
		  display: flex;
		  margin-top: 4px;
		}
    </style>

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
                  부품 등록
                </h2>
              </div>
              <!-- Page title actions -->
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">등록</button>
            <button class="btn btn-primary disabled " id="btnUpt">수정</button>
            <button class="btn btn-primary disabled " id="btnDel">삭제</button>
            <span id="gui-topbtn-side" style="min-width: 118px; width:auto; color:#f76707; display:none;">  공유부품의 경우 수정/삭제가 불가능합니다.  </span>    
        </div>
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
 			<input type="hidden" id="logComCode" name="logComCode"  value="${logComCode}" />
            <div class="*col-md-6">
              <div class="card">
                <div class="card-body">
                  <!-- <form> -->
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">제조사</label>
                      <div class="col">
                        <select id="makerCode" class="form-select" style="width:auto; padding:2px 20px 2px 0; " >
                          <option value=""></option>                                                    
                        </select>
                      </div>         
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">차종</label>
                      <div class="col">
                        <input type="text" id="carType" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>             
                    </div>

                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">부품ID</label>
                      <div class="col">
                        <input type="text" id="itemId" class="form-control" aria-describedby="" value="${itemId}"  placeholder="" style="display:initial;width:48%; max-width:300px;" disabled>
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;" >위탁거래처</label>
                      <div class="col">
                        <input type="text" id="consignCustCode" class="form-control" aria-describedby="" placeholder="거래처코드" style="display:initial;width:48%; max-width:100px;" required onKeyUp="findCust(this,'cosignCustName');">
                        <input type="text" id="consignCustName" class="form-control" aria-describedby="" placeholder="거래처명" style="display:initial;width:48%; max-width:200px;" disabled>
                        
                      </div>
                                            
                      <%-- <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;" >상품코드</label>
                      <div class="col">
                        <input type="text" id="itemCode" class="form-control" style="width:60%; max-width:300px;" placeholder="" disabled value="${logComCode}-">
                      </div> --%>
                    </div>  
                    <div class="form-group mb-3 row">                       
                      <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">품번</label>
                      <div class="col">
                        <input type="text" id="itemNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">공장품번</label>
                      <div class="col">
                        <input type="text" id="factoryNo" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                    </div>
                    
                    <div class="form-group mb-3 row">
                     <label class="col-3 col-form-label required" style="min-width: 118px; width:auto;">부품명</label>
                      <div class="col">
                        <input type="text" id="itemName" class="form-control" style="*width:60%; max-width:800px;" placeholder="" >
                      </div>                     
                   </div>  
                    <div class="form-group mb-3 row">                       
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">영문부품명</label>
                      <div class="col">
                        <input type="text" id="itemNameEn" class="form-control" style="*width:60%; max-width:800px;" placeholder="" >
                      </div>
                    </div>
                    
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">브랜드</label>
                      <div class="col">
                        <input type="text" id="brandCode" class="form-control" size=12 maxlength=12 style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">판매브랜드</label>
                      <div class="col">
                        <input type="text" id="saleBrandCode" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                    </div>  
                    <div class="form-group mb-3 row">                       
                     <!--  <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">정품여부</label>
                      <div class="col">
                       	<label class="form-check">
                        <input class="form-check-input" type="checkbox" id="genuineYN" name="genuineYN">
                        </label>
                      </div>        -->
                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">클래스</label>
                      <div class="col">
                        <select id="classCode" class="form-select" style="width:auto; padding:2px 25px 2px 0; " >
                          <option value="GN">정품</option>
                          <option value="AM">애프터마켓</option>
                          <option value="RM">재제조</option>
                          <option value="UD">중고</option>
                          <option value="RF">리퍼</option>
                          <option value="ET">기타</option>
                        </select>
                      </div>               
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">호환ID</label>
                      <div class="col">
                        <input type="text" id="itemExchangeId" class="form-control" size=12 maxlength=12 style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                    </div>                         
                    
                    <div class="form-group mb-3 row">                     
	                  <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">센터가</label>
                      <div class="col">
                        <input type="number" id="centerPrice" min="0" step="10" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">원
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">입고단가</label>
                      <div class="col">
                        <input type="number" id="inPrice"  min="0" step="10" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">원
                      </div> 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">판매단가</label>
                      <div class="col">
                        <input type="number" id="salePrice"  min="0" step="10" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">원
                      </div> 
                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp</label>
                      <div class="col">
                        &nbsp;
                      </div> 
                    </div>  
                                                        
                    <div class="form-group mb-3 row" style="display: none" >
	                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">등록자</label>
	                      <div class="col">
	                        <input type="text" id="regUserName" class="form-control" size=12 maxlength=12 style="width:60%; max-width:300px;" placeholder=""  disabled>
	                      </div>
	                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">등록일자</label>
	                      <div class="col">
	                        <input type="text" id="regDate" class="form-control" style="width:60%; max-width:300px;" placeholder=""  disabled>
	                      </div>
                     </div>  
                    <div class="form-group mb-3 row" style="display: none" >
	                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">수정자</label>
	                      <div class="col">
	                        <input type="text" id="uptUserName" class="form-control" size=12 maxlength=12 style="width:100%; max-width:300px;" placeholder=""  disabled>
	                      </div>
	                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">수정일자</label>
	                      <div class="col">
	                        <input type="text" id="uptDate" class="form-control" style="width:100%; max-width:300px;" placeholder=""  disabled>
	                      </div>
                    </div>      
                                                  
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">생산년도</label>
                      <div class="col">
                        <input type="text" id="productYear" class="form-control" size=12 maxlength=12 style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">원산지</label>
                      <div class="col">
                        <input type="text" id="home" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                    </div>  
                    <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">장착위치</label>
                      <div class="col">
                        <input type="text" id="equipPlace" class="form-control" style="width:60%; max-width:300px;" placeholder="" >
                      </div>                      
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">색상</label>
                      <div class="col">
                        <input type="text" id="color" class="form-control" size=12 maxlength=12 style="width:60%; max-width:300px;" placeholder="" >
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">광택</label>
                      <div class="col">
                        <select id="shine" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
                          <option value="0">알수없음</option>
                          <option value="1">광택</option>
                          <option value="2">무광택</option>
                        </select>
                      </div>
                    </div>                   
                   
                    <div class="form-group mb-3 row">                     
	                  <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">무게</label>
                      <div class="col">
                        <input type="number" id="weight" min="0" step="0.001" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">CBM</label>
                      <div class="col">
                        <input type="number" id="cbm"  min="0" step="0.00001" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">
                      </div> 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">가로(Width)</label>
                      <div class="col">
                        <input type="number" id="width"  min="0" step="0.1" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">
                      </div> 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">세로(Depth)</label>
                      <div class="col">
                        <input type="number" id="depth"  min="0" step="0.1" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">
                      </div> 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">높이(Height)</label>
                      <div class="col">
                        <input type="number" id="height"  min="0" step="0.1" value="0" class="form-control" style="width:60%; max-width:100px; padding-right: 12px;  display: initial;" placeholder="">
                      </div> 
                    </div>  
                    
					<div class="form-group mb-3 row">                       
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">부품공유범위(여부)</label>
                      <div class="col">
                      	<select id="shareYN" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
                          <option value="Y" selected>관계사 공유</option>
                          <!-- <option value="A">4car사용업체 공유</option> -->
                          <option value="A">A-parts사용업체 공유</option>
                          <option value="N">공유 안함</option>
                        </select>
                       	<!-- <label class="form-check">
                        <input class="form-check-input" type="checkbox" id="shareYN" name="shareYN" checked>
                        </label> -->
                      </div>         
<!--                       <label class="col-3 col-form-label" style="min-width: 118px; width:auto; ">재고공유범위(여부)</label>
                      <div class="col">
                      	<select id="stockShareYN" class="form-select" style="width:auto; padding:2px 25px 2px 0; ">
                          <option value="Y" selected>관계사 공유</option>
                          <option value="A">4car사용업체 공유</option>
                          <option value="N">공유 안함</option>
                        </select>
                      </div>     -->
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">할인제외여부</label>
                      <div class="col">
                       	<label class="form-check">
                        <input class="form-check-input" type="checkbox" id="dcExceptYN" name="dcExceptYN">
                        </label>
                      </div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">주문즉시출고</label>
                      <div class="col">
                       	<label class="form-check">
                        <input class="form-check-input" type="checkbox" id="immediateRlYN" name="immediateRlYN">
                        </label>
                      </div> 
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">비실물 여부</label>
                      <div class="col">
                       	<label class="form-check">
                        <input class="form-check-input" type="checkbox" id="noRealYN" name="noRealYN">
                        </label>
                      </div>                        
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">&nbsp;</div>
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">&nbsp;</div>
                    </div>         
                    <div class="form-group mb-3 row">
                    </div>
                     <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<!-- <span style=" display: initial; float: right;">
	                      	<input type="button" class="btn btn-secondary disabled" id="btnPrint" onclick="print()"value="인쇄">
                      	</span> -->
                      </div>
                      <div class="form-group mb-3 row" >
                      		 <h4>정품 품번 등록</h4>
                     </div>
                      <div id="grid_wrap" style="width:70.1%;height:40vh;"></div>
                      <div id="grid_wrap1" style="width:28.1%;margin: 0px 10px;height:40vh;"></div>
							<div id="textAreaWrap">
								<textarea id="myTextArea"class="aui-grid-custom-renderer-ext" style="width: 100%; height: 50px;"></textarea>
								<div class="button-wrap">
									<button class="editor_btn" id="confirmBtn">확인</button>
									<button class="editor_btn" id="cancelBtn">취소</button>
								</div>
							</div>
                      <div style=" display: flex  ">
		              <div style="width:72.1%; text-align: left; margin-left: 0px;">
                      	<input type="button" class="btn btn-outline-info" onclick="addRow(myGridID,'last')" value="행추가">
                      	<input type="button" class="btn btn-outline-info" onclick="removeRow()" value="행삭제">
                      </div>
                       <div  style="width:24.1%; text-align: left; margin-left: -15px;">
		                <input type="button" class="btn btn-outline-info" onclick="addRow1(myGridID1,'last')" value="행추가">
		               	<input type="button" class="btn btn-outline-info" onclick="removeRow1()" value="행삭제">
		               	<input type="button" class="btn btn-outline-info" id="btnRegMemo" value="확인">
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
 
    <!-- 거래처선택 팝업 -->
	<div id="dialog-form-cust" title="거래처 선택" style="display:none;">
		<!-- <input type="text" id="pop_custCode" placeholder="거래처코드">
		<input type="text" id="pop_custName"  placeholder="거래처명"> -->
		<input type="text" id="pop_cust_srch"  placeholder="거래처명">
		<button class="btn btn-dark" id="btnItemFind">조회</button>
	  	<div id="grid_wrap_cust" style=" height:90%;"></div>
	</div>
    
    <%@ page import="java.io.*, java.util.* , java.text.*" %>		
	<%	/* CSS/JS 파일 캐시 방지 */	
		String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
		File commonPanFile = new File(commonPan);	
		Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
		
		String estiUp = application.getRealPath("/resources/pan/js/esti-up.js");	
		File estiUpFile = new File(estiUp);	
		Date lastModified_estiUpFile = new Date(estiUpFile.lastModified());  			
		
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
    <script type="text/javascript" src="/resources/pan/js/item-up.js?ver=<%=fmt.format(lastModified_estiUpFile)%>"></script> 
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_estiUpFile)%>"></script> 

  </body>
</html>