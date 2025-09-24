<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<html>
<head>
<%@ include file="../icld/head.jsp"%>
<!-- <title>4car재고조회</title> -->
<title>아파츠 재고조회</title>
	<!-- Aui 인쇄 -->
	<script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>
	<!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>	
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">		
	<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->	
	<!-- fancyBox -->
	<script type="text/javascript" src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
	<script type="text/javascript" src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
	<link rel="stylesheet" type="text/css" href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
	<!-- fancyBox -->
</head>
<style type="text/css">
	/* 커스텀 일부완료 색스타일 */
	.aui-grid-style-rightbold {
		font-weight: bold;
		text-align:right;
 	}
 	
 	.auigrid-ost-row-style {
		background-color: #52fa82; 
		font-weight: bold;
		
		/* 
		background-color: #5ac46c;
		color: #333;              
		font-weight: bold;    */     
	}
	.auigrid-ost2-row-style {
		background-color: #fabf52; 
		font-weight: bold;
		  
	}
	.auigrid-ost3-row-style {
		background-color: #d195ff; 
		font-weight: bold;
		  
	}
 	
</style>
<body class=" layout-fluid">
	<script type="text/javascript">

		
		 window.kakaoAsyncInit = function() {
			    Kakao.Channel.createAddChannelButton({
			      container: '#kakao-talk-channel-add-button',
			    });
			  };

			  (function(d, s, id) {
			    var js, fjs = d.getElementsByTagName(s)[0];
			    if (d.getElementById(id)) return;
			    js = d.createElement(s); js.id = id;
			    js.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.channel.min.js';
			    js.integrity = 'sha384-j5TN6EqladB+HIfGV8dVYRIzoJf9Fb4lvrkPmo9KlnDWpN1CZz8yC4rCH1ChRbbh';
			    js.crossOrigin = 'anonymous';
			    fjs.parentNode.insertBefore(js, fjs);
			  })(document, 'script', 'kakao-js-sdk');
    </script>
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<!-- <h2 class="page-title">4CAR재고조회</h2> -->
							<h2 class="page-title">아파츠재고조회</h2>
						</div>
						<!-- Page title actions -->
					</div>
				</div>
			</div>
			<div style="padding: 0 14px 10px 14px;">
				<button class="btn btn-primary" id="btnFind">조회</button>

				<button  class="btn btn-info"  onclick ="simplePopupOpen_PopupName('brandDcRate')">브랜드별 할인율</button>
				<button  class="btn btn-info"  onclick ="simplePopupOpen_PopupName('requestMethod')">주문요청과 회수요청 방법</button>
				
				<!--카카오채널추가 -->
				<!-- <div
				  id="kakao-talk-channel-add-button"
				  data-channel-public-id="_fggGG"
				  data-size="small"
				  data-support-multiple-densities="true"				  
					style="display: inline;"
				></div> -->
				
				<!-- <p class="btn" onclick="exportPdfClick()">PDF 저장하기</p> -->
				<!-- <button class="btn btn-primary" id="btnUpt">수동처리</button>  -->
			</div>
			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="form-group mb-3 ">
								<!-- 대량조회 -->
							  	<div id="idDiv_bulkSrch_section" style="float:left; border:1px solid #eee;height:500px; padding:0 1px; *display:none;">
									<header_ba >
							        <div id="hamburger">
							            <div></div>
							            <div></div>
							            <div></div>
							        </div>
								    </header_ba>
								    <nav>
								    	<div style="padding:3px">
								    	<input type="radio"	value="itemId" name="bulkSrchType" id="" class="" 
								    		style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" ><span style="padding-right: 8px;">부품ID</span> 
								    	<input type="radio"	value="itemNo" name="bulkSrchType" id="" class="" 
								    	 	style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" checked><span style="padding-right: 8px;">품번</span>
								    	<input type="radio"	value="makerCode" name="bulkSrchType" id="makerCodeRadio" class="" 
								    	 	style=" width: 20px; height: 16px;  margin: 0 2px 0 0;" ><span>제조사</span>
								    	</div>
								    	<div id="textAreaDiv">
									        <div>
									        	<textarea rows="10" cols="25" style="height:59vh;border:1px solid #bbb; font-size:14px; " wrap="off" id="item_bulk" name="item_bulk" 
									        	></textarea>
									        </div>
									        <div>	
									        	<button class="" onClick="txtAreaReset()" 
									        	style="font-size: 13px; width: 60px; border: 1px solid #aaa; background-color: #fff; border-radius: 3px; color:#555; padding:2px;"}>
									        	RESET</button>
									        	<!-- <button class="" onClick="javascript:fn_goodsSrch(0,'bulk_Y');"
									        	style="font-size: 13px; width: 60px; border: 1px solid #aaa;background-color: #ebfaff; border-radius: 3px; color:#555; padding:2px;" >
									        	SEARCH</button> -->
									        </div>	
								    	</div>
								    	<div id="selectBoxDiv" style="display:none;">
								    		<select id="makerCode" class="form-select" style="width:180px; padding:2px 20px 2px 0; ">
					                        <option value=""></option>
					                        </select>
								    	</div>
								    </nav>	    
								</div>
								<!-- 대량조회 END -->
								<div>
								<div style="margin : 2px 0px 0;">
			                      	<span>
			                      	<% if ( !("ㄱ000").equals(comCode) && !("ㄱ121").equals(comCode) && !("ㅇ413").equals(comCode) && !("ㅇ434").equals(comCode) && !("ㅇ436").equals(comCode) && !("ㅋ127").equals(comCode) ) { %>
				                       	<input type="button" class="btn btn-secondary " value="주문요청" id="btnPcReq">	
 				                    <%--  <% if (("ㄱ000").equals(comCode) || ("zzz").equals(comCode) || ("ㅈ004").equals(comCode)) {%> 	 --%>
 				                       	<input type="button" class="btn btn-secondary " value="회수요청" id="btnCtReq">	 		 
				                      <%} %>    	                     	
			                      	</span>
			                      	<!-- <span>*녹색배경의 물건은 별도할인율적용 물건입니다.*</span> -->
			                      	<span style="background-color: #52fa82;">*녹색배경의 물건은 별도할인율적용 물건입니다.*</span>
			                      	<span style="background-color: #fabf52;">*주황색배경의 물건은 별도할인율/별도배송시간 적용 물건입니다.*</span>
			                      	<span style="background-color: #d195ff;">*보라색배경의 물건은 부산창고 물건입니다.*</span>
			                      	<span style=" display: initial; float: right;">
				                      <!-- 	<input type="button" class="btn btn-secondary" onclick="popLink('/logis/stock-rack-list')" value="랙별재고">
				                      	<input type="button" class="btn btn-secondary" onclick="popLink('/logis/stock-actions-list')" value="재고이력">	 -->
				                      	<label style="font-size: 13px; padding-right: 10px">(※부가세 별도)</label>
				                      	<input type="button" class="btn btn-secondary" id="btnPrint" onclick="exportTo('xlsx')" value="엑셀 다운">			                      	                     	
			                      	</span>			
			                    </div>
                      
								<div id="grid_wrap" style="width: 88%; height: 70vh;"></div>
								</div>
							</div>

							<div class="form-footer1"></div>
						</div>
					</div>

				</div>

				<%-- <%@ include file="../icld/footer.jsp" %> --%>

			</div>
		</div>

				<%-- <%@ include file="../icld/footer.jsp" %> --%>

			</div>
			
	


		<!-- 주문요청처리 팝업 -->
		<div id="dialog-form" title="주문요청" style="display: none;">
			
		  	  <div class="form-group mb-3 row" style="margin-top:10px">
				  <label class="col-3 col-form-label required" style="width: 80px;">담당자</label>
			      <div class="col">
			        	 <input type="text" class="" id="gvMgr" placeHolder="입력 안할 시 로그인 아이디로 저장됩니다."  style="    width: 250px;">
			  	  </div>  
			  </div>	
				  	    
			  	  <div class="form-group mb-3 row" style="margin-top:10px">
					  <label   class="col-3 col-form-label required" style="width: 80px; ">수령방법</label>											
					  <div class="col">
					  	<select id="deliWay" class="form-select"		style="width: auto; padding: 2px 25px 2px 0;" >	
					  		<option value=""></option>											
							<option value="일반배송">일반배송</option>
							<option value="택배">택배</option>
							<option value="화물">화물</option>
							<option value="퀵/용차">퀵/용차</option>
							<option value="방문수령">방문수령</option>
							
					  	</select>     
		              </div> 
		              
		              <label  id='payTypeLabel' class="col-3 col-form-label required" style="*min-width: 118px; width:auto; ">비용</label>											
					  <div id='payTypeDiv' class="col">
					  	<select id="deliPayType" class="form-select"		style="width: auto; padding: 2px 25px 2px 0;" >
					  		<option value=""></option>													
							<!-- <option id="payTypeLabel_prepayment" value="선불">선불 (월정산 포함)</option> -->
							<option value="착불">착불 (수취자 부담)</option>
							<option value="직접배차">직접배차 (주문자 부담)</option>
					  	</select>     
		              </div>
		              <label  id='rcvlogisCodeLabel' class="col-3 col-form-label required" style="*min-width: 118px; width:auto; display: none;">방문처</label>											
					  <div id='rcvlogisCodeDiv' style="display: none;" class="col">
					  	<select id="rcvlogisCode" class="form-select"		style="width: auto; padding: 2px 25px 2px 0; display: inline-block;" >
					  		<!-- <option value=""></option> -->
					  		<!-- <option value="직접">직접배송</option>	 -->												
							<option value="중곡">중곡</option>
							<option value="남양">남양</option>
							<option value="청라">청라</option>
							<option value="부산">부산</option>
							<!-- <option value="청라">청라</option> -->
					  	</select>  
					   
		              	<button class ="btn btn-primary" onclick="companyMapOpen()" >위치 안내</button>      
		              </div> 
		             
	              </div>
	            <div id="PcReqDiv">	    
	              <div id='senderDiv' class="form-group mb-3 row" style="margin-top:10px">
		               <label class="col-3 col-form-label " style="width: 80px;">보내는이</label>
				      <div class="col" style="display: contents;" >
				        	 <input type="text" class="" id="senderCustName" placeHolder="회사명" style="    width: 100px;    ">
				       </div> 	 
				       <div class="col" style="display: contents;" >  	 
				        	 <input type="text" class="" id="senderName" placeHolder="보내는 사람" style="    width: 100px;  ">
				  	  </div>  
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">연락처</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="senderTel"  style="    width: 100px;  ">
				      	</div>
				  	  </div>
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">주소</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="senderAddr1"  style="    width: 300px; ">
				      	</div>
				  	  </div>
			  	  </div>
	  
	                <div id='receiverDiv'  class="form-group mb-3 row" style="margin-top:10px">
		               <label class="col-3 col-form-label " style="width: 80px;">받는 이</label>
				      <div class="col" style="display: contents;" >
				        	 <input type="text" class="" id="receiverCustName" placeHolder="회사명" style="    width: 100px;    ">
				       </div> 	 
				       <div class="col" style="display: contents;" >  	 
				        	 <input type="text" class="" id="receiverName" placeHolder="받는 사람" style="    width: 100px;  ">
				  	  </div>  
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">연락처</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="receiverTel"  style="    width: 100px;  ">
				      	</div>
				  	  </div>
					 <label class="col-3 col-form-label " style="*min-width: 118px; width:auto;">주소</label>
				      <div class="col" style="display: contents;" >
				        <div class="">
				        	 <input type="text" class="" id="receiverAddr1"  style="    width: 300px; ">
				      	</div>
				  	  </div>
			  	  </div>
		  	  </div>       
			  <label class="col-3 col-form-label required" style="min-width: 118px; width:auto; margin-top:15px;">메모</label>
		      <div class="col">
		        <div class="">
		          <input type="text" class="" id="gvMemo" style="    width: 600px;">
		      	</div>
		      	<div id="wrapper" style="margin-top: -1px;"></div>				        
		  	  </div> 
		  	  <div id="req_grid_wrap" style="margin: 10px;"></div>
<!-- 	  	  <div style="margin-top:10px; color:darkRed;">
		  	* 입고번호는 발주번호별로 생성됩니다.<br>
		  	* 입고일은 실입고일이 아닌 발주처에서 출고한 일자를 입력하세요.
		  </div> -->
		</div>
	
		<!--     -->		
		<!--  랙선택 팝업 다이얼로그 처리   -->
		<div id="dialog-rackSelect" title="랙 선택" style="display: none; background :#f5f7fb;">
		 <div class="page-wrapper">
	        
	       <div id="grid_wrap-rackSelect" style="width:99.1%;height:30vh;"></div>
	            
	      </div>
	      </div>
			
		<!--     -->	
		<!--     -->	
		<!--  랙선택 팝업 다이얼로그 처리   -->
		<div id="dialog-companyMap" title="위치 안내" style="display: none; background :#f5f7fb;">
		<!-- <div id="companyMap_Seongsu">
                  <h2 class="u-text u-text-1">성수</h2>
                  <p class="u-text u-text-2">서울시 성동구 아차산로 13길 44</p>
                  <p class="u-text u-text-3">TEL. 010-2852-4999</p> 
                  <iframe width="576" height="500" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.3464103151173!2d127.0601964156475!3d37.546901533009176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4c0646fe7e3%3A0x39021a38db18ec89!2z7ISc7Jq47Yq567OE7IucIOyEseuPmeq1rCDslYTssKjsgrDroZwxM-q4uCA0NA!5e0!3m2!1sko!2skr!4v1667199671265!5m2!1sko!2skr&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
	    
        </div>
		<div id="companyMap_Gunja">
                  <h2 class="u-text u-text-1">군자</h2>
                  <p class="u-text u-text-2">서울시 광진구 동일로 312</p>
                  <p class="u-text u-text-3">TEL. 010-2852-4999</p> 
                  <iframe width="576" height="500" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.83676361525!2d127.07383619999999!3d37.5589095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4d2c85cf071%3A0x64b1dd6230a366b2!2z7ISc7Jq47Yq567OE7IucIOq0keynhOq1rCDrj5nsnbzroZwgMzEy!5e0!3m2!1sko!2skr!4v1717724640844!5m2!1sko!2skr" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
	    
        </div>
		<div id="companyMap_Cheongna">
                  <h2 class="u-text u-text-1">청라</h2>
                  <p class="u-text u-text-2">인천시 서구 담지로 86번길 5-11</p>
                  <p class="u-text u-text-3">TEL. 010-2852-4999</p> 
                  <iframe width="576" height="500" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.7400064464236!2d126.65990211564754!3d37.53762563354026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7e48b597f507%3A0x1e78d6af71dfce94!2z7J247LKc6rSR7Jet7IucIOyEnOq1rCDri7Tsp4DroZw4NuuyiOq4uCA1LTQz!5e0!3m2!1sko!2skr!4v1667202080594!5m2!1sko!2skr&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
		<div id="companyMap_Yongin">
                  <h2 class="u-text u-text-1">용인</h2>
                  <p class="u-text u-text-2">경기도 용인시 처인구 모현읍 갈담리 219-28</p>
                  <p class="u-text u-text-3">TEL. 010-2852-4999</p> 
                  <iframe width="576" height="500" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.04225165582!2d127.24663871157131!3d37.31782683823391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b55a8d28a9707%3A0x492f27ce446568ce!2z6rK96riw64-EIOyaqeyduOyLnCDsspjsnbjqtawg66qo7ZiE7J2NIOqwiOuLtOumrCAyMTktMjg!5e0!3m2!1sko!2skr!4v1716343727679!5m2!1sko!2skr" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div> -->
        
        <div id="companyMap_Junggok">
                  <h2 class="u-text u-text-1">중곡</h2>
                  <p class="u-text u-text-2">서울시 광진구 중곡동 49-3</p>
                  <p class="u-text u-text-3">TEL. 010-9984-4999</p> 
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.7744009371418!2d127.08052677640553!3d37.56037862448027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbad5ffb7ddfb%3A0x9d0b321aded8654e!2z7ISc7Jq47Yq567OE7IucIOq0keynhOq1rCDspJHqs6Hrj5kgNDktMw!5e0!3m2!1sko!2skr!4v1739763378069!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                 
        </div>
        
        <div id="companyMap_Namyang">
                  <h2 class="u-text u-text-1">남양</h2>
                  <p class="u-text u-text-2">경기도 남양주시 진건읍 배양리 564-4</p>
                  <p class="u-text u-text-3">TEL. 010-9984-4999</p> 
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.795243411101!2d127.16324297640807!3d37.630503920456626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb703ca385d09%3A0x15252d8a25a61d3c!2z6rK96riw64-EIOuCqOyWkeyjvOyLnCDsp4TqsbTsnY0g67Cw7JaR66asIDU2NC00!5e0!3m2!1sko!2skr!4v1739763089387!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                 
        </div>
        
        <div id="companyMap_Cheongna2">
                  <h2 class="u-text u-text-1">청라</h2>
                  <p class="u-text u-text-2">인천시 서구 담지로 104번길 16,1층</p>
                  <p class="u-text u-text-3">TEL. 010-9984-4999</p> 
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.6926356995536!2d126.65831377640485!3d37.538742125720375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7e48d9333819%3A0xc5ea5ef1463c8123!2z7J247LKc6rSR7Jet7IucIOyEnOq1rCDri7Tsp4DroZwxMDTrsojquLggMTYgMey4tQ!5e0!3m2!1sko!2skr!4v1739763406106!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  
        </div>
        
        <div id="companyMap_Busan">
                  <h2 class="u-text u-text-1">부산</h2>
                  <p class="u-text u-text-2">부산 강서구 유통단지1로57번길 34. 107동101호 (자동차부품유통단지)</p>
                  <p class="u-text u-text-3">TEL. 010-8730-1865</p> 
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d969.7106247461816!2d128.95367470599135!3d35.16398339755122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568c199a4de4cdb%3A0x244b3bc99a124226!2z67aA7IKw6rSR7Jet7IucIOqwleyEnOq1rCDsnKDthrXri6jsp4Ax66GcNTfrsojquLggMzQ!5e0!3m2!1sko!2skr!4v1754985222784!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
		 
        </div>
        
        <%@ page import="java.io.*, java.util.* , java.text.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String commonPan = application.getRealPath("/resources/pan/js/common-pan.js");	
			File commonPanFile = new File(commonPan);	
			Date lastModified_commonPanFile = new Date(commonPanFile.lastModified());  	
			
			String outStockBulkList = application.getRealPath("/resources/pan/js/out-stock-bulk-list.js");	
			File outStockBulkListFile = new File(outStockBulkList);	
			Date lastModified_outStockBulkListFile = new Date(outStockBulkListFile.lastModified());  	
			
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>
			
		<!--     -->	
		<!-- Tabler Libs JS -->
		<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"			defer></script>
		<script			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"			defer></script>
		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>
		<!-- <p><span onclick="checkItems()" class="btn">추가, 삭제, 수정된 아이템 확인하기</span></p> -->
		<script type="text/javascript"			src="/resources/pan/js/common-pan.js?ver=<%=fmt.format(lastModified_commonPanFile)%>"></script>
		<script type="text/javascript"			src="/resources/pan/js/out-stock-bulk-list.js?ver=<%=fmt.format(lastModified_outStockBulkListFile)%>"></script>
<!-- 		팝업매니저js 헤더로 옴김 -->
<!-- 		<script type="text/javascript"			src="/resources/pan/js/noticePopupManager.js?ver=1.0624.4"></script> -->
		<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/pan/js/cust-up-test.js?ver=4"></script>  --%>
</body>
</html>