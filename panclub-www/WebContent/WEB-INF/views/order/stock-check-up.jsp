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
                  재고 확인
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">임시저장</button>
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
            <span style="color:##5f94d3; font-size:0.9em">[임시저장]의 경우 견적에 반영되지 않습니다.견적에 반영하려면 [적용]을 클릭하세요.</span>
        </div>
                
         <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">

            	<div class="*col-md-6">
                   <div id="esti-dsp" class="form-group mb-3 row" style="*display:none!important;">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto; color:#f76707;">
                      발주처의 거래처코드는 아래와 같습니다. 도매업체의 거래처코드가 다른 경우 <a href="/base/config" target="_blank">환경설정</a>에서 변경하세요. </label>
                      <div class="col">
                      	글로젠<input type="text" id="glogenCode" value="${glogenCode}" disabled style="width:100px;"/>
	                    파츠몰에이투지<input type="text" id="partsmallCode" value="${partsmallCode}"  disabled style="width:100px;"/>
	                    한라홀딩스<input type="text" id="hallaCode" value="${hallaCode}"  disabled style="width:100px;"/>
	                    SK네트웍스<input type="text" id="skCode" value="${skCode}"  disabled style="width:100px;"/>
	                    데코코리아<input type="text" id="dekoCode" value="${dekoCode}"  disabled style="width:100px;" />
	                    입스코리아<input type="text" id="eapsCode" value="${eapsCode}"  disabled style="width:100px;"/>  
                      </div>      
                    </div>
              	<div class="card">

                <div class="card-body">

                    <input type="hidden" id="estiNo" value="${estiNo}" /> 
                    <input type="hidden" id="seqArr" value="${seqArr}" />
                    
                                      


                    
                    <div id="esti-dsp" class="form-group mb-3 row">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">견적번호 : </label>
                      <div class="col">
                      	<span id="estiNoDsp">${estiNo}</span>
                      </div>      
                      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분 : </label>
                      <div class="col"><span id="estiTypeName"></span> </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자 : </label>
                      <div class="col">                      	<span id="regUserName"></span>                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일 : </label>
                      <div class="col">                      	<span id="estiYmd"></span>                      </div>      
                    </div>
                    
                    <div id="order-dsp" class="form-group mb-3 row" style="display:none">
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문번호 : </label>
                      <div class="col">	<span id="orderNo">${orderNo}</span>       </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분 : </label>
                      <div class="col">
                         <div>    <span id="orderType"></span>                 </div>
                      </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자 : </label>
                      <div class="col">             	<span id="regUserName"></span>                   </div>      
                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일 : </label>
                      <div class="col">           	<span id="orderYmd"></span>                  </div>      
                    </div>

                     <div class="form-group mb-3 row">
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차번 : </label>
                      <div class="col">                      	<span id="carNo"></span>                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">차대 : </label>
                      <div class="col">
                      	<span id="vinNo"></span>
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">제조사/차종 : </label>
                      <div class="col">
                      	<span id="makerName_carType"></span>
                      </div>    
                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
                      <div class="col">
                      	<span id="">&nbsp;</span>
                      </div>      
                    </div>                      

                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="placeApply('/order/stockCheckAdd')" value="적용"> 
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->
	                      	<input type="button" class="btn btn-secondary" onclick="findImportCalc('/order/import-calc-list',1)" value="수입계산기" style="display:none;">
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

    <!-- Begin : 수입계산기 -->
	<div id="dialog-form-importcalc" title="수입계산기" style="display:none;">
	
	        <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">저장</button>
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
	        </div>
	                
	         <div class="page-body">
	          <div class="container-xl">
	            <div class="row row-cards">
	 
	            <div class="*col-md-6">
	              <div class="card">
	
	                <div class="card-body">
	
	                    <input type="hidden" id="estiNo" value="${estiNo}" /> 
	                    <input type="hidden" id="seqArr" value="${seqArr}" />
	                    
	                    <div id="esti-dsp" class="form-group mb-3 row">
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">견적번호</label>
	                      <div class="col">
	                      	<span id="estiNoDsp"></span>
	                      </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
	                      <div class="col"><span id="estiTypeName"></span> </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
	                      <div class="col">                      	<span id="regUserName"></span>                      </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
	                      <div class="col">                      	<span id="estiYmd"></span>                      </div>      
	                    </div>
	                    
	                    <div id="order-dsp" class="form-group mb-3 row" style="display:none">
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">주문번호</label>
	                      <div class="col">	<span id="orderNo">${orderNo}</span>       </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">판매구분</label>
	                      <div class="col">
	                         <div>    <span id="orderType"></span>                 </div>
	                      </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성자</label>
	                      <div class="col">             	<span id="regUserName"></span>                   </div>      
	                      <label class="col-3 col-form-label " style="min-width: 118px; width:auto;">작성일</label>
	                      <div class="col">           	<span id="orderYmd"></span>                  </div>      
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
	                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">&nbsp;</label>
	                      <div class="col">
	                      	<span id="">&nbsp;</span>
	                      </div>      
	                    </div>                  
	                    
	                    <div class="form-group mb-3 row">
	                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">환율</label>
	                      <div class="col"> 업데이트: 	<span id="exRateYmd">2022-12-01</span>                  
	                      	<table style="border:1px solid darkblue;">
	                      		<tr style="border:1px solid darkblue;">
	                      			<th style="border:1px solid darkblue;"></th>
	                      			<th style="border:1px solid darkblue;">살때￦</th>
	                      			<th style="border:1px solid darkblue;">팔때￦</th>
	                      		</tr>
	                      		<tr style="border:1px solid darkblue;">
	                      			<th style="border:1px solid darkblue;">유로€</th>
	                      			<th style="border:1px solid darkblue;"><span id="euroBuy">1,350</span></th>
	                      			<th style="border:1px solid darkblue;"><span id="euroSell"></span></th>
	                      		</tr>
	                      		<tr>
	                      			<th style="border:1px solid darkblue;">달러$</th>
	                      			<th style="border:1px solid darkblue;"><span id="dollarBuy">1,400</span></th>
	                      			<th style="border:1px solid darkblue;"><span id="dollarSell"></span></th>
	                      		</tr>
	                      		
	                      	</table>    
	                      </div>    
	                      <label class="col-3 col-form-label" style="min-width: 118px; width:auto;">화물분류</label>
	                      <div class="col">
	                      	<ul id="cargoGroup">
	                      		<li>A코드 : 후드, 루프트림, 전ㆍ후면 유리, 트렁크, 후휀다, 범퍼, 사이드프레임</li>
	                      		<li>B코드 : 휀다, 도어</li>
	                      		<li>C코드 : 휠</li>
	                      		<li>D코드 : 도장판넬류, 전판넬</li>
	                      		<li>E코드 : 내장트림 중 부피가 큰 부품</li>
	                      		<li>기본 : 일반적인 박스 패킹이 가능한 부품</li>
	                      	</ul>						
	                      </div>                      
	                    </div>          
	
	                    <div class="form-group mb-3 row">
	                      <div style="margin : 2px 0px 0;">
	                      	<span>
		                      	<!-- <input type="button" class="btn btn-secondary" onclick="findImportCalc('/order/import-calc-up',1)" value="계산하기"> -->
		                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="calcApply('/order/importCalcAdd')" value="적용"> 
		                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->		                      	
	                      	</span>
	                      </div>
	                      <div id="grid_wrap_importcalc" style=" height:90%;"></div>
	                    </div>  
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
   	</div>
    <!-- End : 수입계산기 -->

    <!-- Begin : 창고수량확인 -->
	<div id="dialog-form-stockchk" title="창고수량확인" style="display:none;">
	
        <div style="padding: 0 0 10px 14px;" >
            <!-- <button class="btn btn-primary" id="btnReg">적용</button> -->
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
        </div>	                
        <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">	
                    <input type="hidden" id="estiSeq" value="${estiSeq}" />	                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<span>
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="findImportCalc('/order/import-calc-up',1)" value="계산하기"> -->
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="stockApply('/order/stockChkAdd')" value="적용"> 
	                      	<!-- <input type="button" class="btn btn-secondary" onclick="stockCheck()" value="새로고침"> -->		                      	
                      	</span>
                      </div>
                      <div id="grid_wrap_stockchk" style=" height:90%;"></div>
                    </div>
                    <div>
                    견적서에 반영되는 창고수량은 다른 사용자에 의해 요청되면 변경될 수 있으니 주문시에는 재조회 하여 수량을 확인 하십시오
                    </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   	</div>
    <!-- End : 창고수량확인 -->

    <!-- Begin : 창고보유 -->
	<div id="dialog-form-whStockCnt" title="창고보유" style="display:none;">
	
        <!-- <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
        </div>	            -->     
        <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">	
                    <input type="hidden" id="estiSeq" value="${estiSeq}" />	                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<!-- <span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="stockApply('/order/stockChkAdd')" value="적용"> 
                      	</span> -->
                      </div>
                      <div id="grid_wrap_whStockCnt" style=" height:90%;width:98%;"></div>
                    </div>
                    <div>
                    </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   	</div>
    <!-- End : 공유재고 -->
    <!-- Begin : 공유재고 -->
	<div id="dialog-form-stockshare" title="공유재고" style="display:none;">
	
        <!-- <div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary  " id="btnClose" >닫기</button>
        </div>	            -->     
        <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
 
            <div class="*col-md-6">
              <div class="card">

                <div class="card-body">	
                    <input type="hidden" id="estiSeq" value="${estiSeq}" />	                    
                    <div class="form-group mb-3 row">
                      <div style="margin : 2px 0px 0;">
                      	<!-- <span>
	                      	<input type="button" class="btn btn-secondary" id="btnApply" onclick="stockApply('/order/stockChkAdd')" value="적용"> 
                      	</span> -->
                      </div>
                      <div id="grid_wrap_stockshare" style=" height:90%;width:98%;"></div>
                    </div>
                    <div>
                    </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   	</div>
    <!-- End : 공유재고 -->
        
    <!-- Tabler Libs JS -->

    <!-- Tabler Core -->
<!--     <script src="/resources/dist/js/tabler.min.js" defer></script>
    <script src="/resources/dist/js/demo.min.js" defer></script> -->
    
    <script type="text/javascript" src="/resources/pan/js/stock-check-up.js?ver=1.0216.4"></script>
    <script type="text/javascript" src="/resources/pan/js/common-pan.js?ver=4.1120.3"></script> 

 	
  </body>
</html>