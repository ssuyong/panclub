<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
<html>
<head>

<%@ include file="../icld/head.jsp"%>
<title>팝업등록</title>


</head>
<body class=" layout-fluid">
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<h2 class="page-title">팝업 등록</h2>
						</div>
					</div>
				</div>
			</div>

			<div style="padding: 0 0 10px 14px;">
				<button class="btn btn-primary" id="iButton_Reg">등록</button>
				<button class="btn btn-primary disabled " id="iButton_Upt">수정</button>
<!-- 				<button class="btn btn-primary disabled " id="iButton_Del">삭제</button> -->
				<button class="btn btn-primary" id="iButton_Preview">미리보기</button>
			</div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">

						<div class="*col-md-6">
							<div class="card">
								<div class="card-body">
								 
								<form name ="frmCust" id="frmCust" method="post">	
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label" style="width: 118px; width: auto; margin-right: 53px">팝업번호</label>
											<div class="col">
												<div>
													<input type="text" name="title" id="iInput_popupIdx" placeholder="등록시 자동생성" class="form-control" style="width: 120px;" disabled/>
												</div>
											</div>
											<label class="col-3 col-form-label" style="width: 118px; width: auto; margin-right: 53px">팝업이름</label>
											<div class="col">
												<div>
													<input type="text" name="popupName" id="iInput_popupName"  class="form-control" style="width: 120px;" />
												</div>
											</div>
											<label class="col-3 col-form-label" style="width: 118px; width: auto; margin-right: 53px">우선도</label>
											<div class="col">
												<div>
													<input type="text" name="priority" id="iInput_priority" class="form-control" style="width: 120px;"/>
												</div>
											</div>
										</div>	
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label required " style="min-width: 118px; width: auto;">팝업 타이틀</label>
											<div class="col">
												<div>
													<input type="text" name="title" id="iInput_title" class="form-control" style="width: 60%; max-width: 600px;"/>
												</div>
											</div>
											<label class="col-3 form-check" style="margin-left: 20px"> 
												<input	class="form-check-input" type="checkbox"id="iInput_popupValidYN" >
											        <span class="form-check-label">팝업 노출 중지</span>
												</label>
										</div>
								 		<div class="form-group mb-3 row">
											 
											<div class="col" style="display: flex;">
												<label class="col-3 col-form-label" style="min-width: 118px; width: auto;">팝업 너비</label>
												<div>
													<input type="text" id="iInput_popupWidth" class="form-control" style="width: 60%; max-width: 600px;" value="100"/>
												</div> 
												<label class="col-3 col-form-label" style="min-width: 80px; width: auto;">팝업 높이</label>
												<div>
													<input type="text" id="iInput_popupHeight" class="form-control" style="width: 60%; max-width: 600px;" value="150"/>
												</div>
												<label class="col-3 col-form-label" style="min-width: 80px; width: auto;">노출기간</label>
												<div class="col-md-6" style="width:auto;">										       
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
												<label class="form-check"style="margin-right: 20px; margin-left: 20px;"> 
												<input class="form-check-input" type="checkbox" id="iInput_AllCustViewYN" >
													<span class="form-check-label">모든업체 노출여부</span>
												</label> 
<!-- 												<label class="form-check" style="margin-left: 20px">  -->
<!-- 												<input	class="form-check-input" type="checkbox"id="iInput_AllMenuViewYN" > -->
<!-- 											        <span class="form-check-label">모든페이지 노출여부</span> -->
<!-- 												</label> -->
<!-- 												<label class="form-check" style="margin-left: 20px">  -->
<!-- 												<input	class="form-check-input" type="checkbox"id="iInput_allYmdYN" > -->
<!-- 											        <span class="form-check-label">모든기간 노출여부</span> -->
<!-- 												</label> -->
												
												<label class="form-check" style="margin-left: 20px"> 
												<input	class="form-check-input" type="checkbox"id="iInput_isOpenPopupYN" checked="checked">
											        <span class="form-check-label">페이지오픈시 열릴지 여부</span>
												</label>
												<label class="form-check" style="margin-left: 20px"> 
												<input	class="form-check-input" type="checkbox"id="iInput_isWeekCheckboxYN"  checked="checked">
											        <span class="form-check-label">일주일안보기 체크박스여부</span>
												</label>
												<label class="form-check" style="margin-left: 20px"> 
												<input	class="form-check-input" type="checkbox"id="iInput_isModalYN" checked="checked">
											        <span class="form-check-label">모달 여부</span>
												</label>
											</div>  
										</div>
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">상단 메세지</label>
											<div class="col">
												<textarea id="iInput_preText" class="form-control"data-bs-toggle="autosize" placeholder=""style="width: 80%"></textarea>
											</div>
										</div>
									
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label required " style="min-width: 118px; width: auto;">팝업이미지 첨부</label>
											<div class="col">
												<div>
													<input type="file" name="attaFile" id="attaFile" class="form-control" style="width: 60%; max-width: 600px;" accept="image/jpeg,image/png"/>
												</div> 
											</div>  
											<div class="col" style="display: flex;">
												<label class="col-3 col-form-label" style="min-width: 80px; width: auto;">이미지너비</label>
												<div>
													<input type="text" id="iInput_imgWidth" class="form-control" style="width: 60%; max-width: 600px;" disabled/>
												</div> 
												<label class="col-3 col-form-label" style="min-width: 80px; width: auto;">이미지높이</label>
												<div>
													<input type="text" id="iInput_imgHeight" class="form-control" style="width: 60%; max-width: 600px;" disabled/>
												</div> 
												<label class="col-3 col-form-label" style="min-width: 80px; width: auto;">이미지배율</label>
												<select id="iSelect_imgMag">
													<option>0.25</option>
													<option>0.5</option>
													<option>0.75</option>
													<option selected="selected">1</option>
													<option>1.25</option>
													<option>1.5</option>
												</select>
											</div> 
										</div>
										<div class="form-group mb-3 row" id="iDiv_regFile" style="display: none; display: inline;  ">
											<a>등록된 파일</a> 
										</div> 
										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">하단 메세지</label>
											<div class="col">
												<textarea id="iInput_postText" class="form-control"data-bs-toggle="autosize" placeholder=""style="width: 80%"></textarea>
											</div>
										</div>
											
								


										<div class="form-group mb-3 row">
											<label class="col-3 col-form-label"style="min-width: 118px; width: auto;">메모</label>
											<div class="col">
												<textarea id="iInput_memo" class="form-control"data-bs-toggle="autosize" placeholder="특이사항 등.."style="width: 80%"></textarea>
											</div>
										</div>
										
										

						 		</form>  
						 		<div style="display: flex;  ">			
							 		<div style="width: 40vw; height: 50vh;" id="custGrid"></div>
							 		<div style="width: 50vw; height: 50vh;" id="menuGrid"></div>
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
				String noticePopupReg = application.getRealPath("/resources/pan/js/noticePopupReg.js");	
				File noticePopupRegFile = new File(noticePopupReg);	
				Date lastModified_noticePopupRegFile = new Date(noticePopupRegFile.lastModified());  	
				
			 
				
				
				SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			%>		

			<!-- Tabler Libs JS -->
			<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
				defer></script>
			<script
				src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
				defer></script>
			<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"
				defer></script>
			<script
				src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js" defer></script>
			<!-- Tabler Core -->
			<script src="/resources/dist/js/tabler.min.js" defer></script>
			<script src="/resources/dist/js/demo.min.js" defer></script>
			<!-- 		팝업매니저js 헤더로 옴김 -->
<!-- 	<script type="text/javascript"			src="/resources/pan/js/noticePopupManager.js?ver=1.0722.4"></script> -->
 	<script type="text/javascript" src="/resources/pan/js/noticePopupReg.js?ver=<%=fmt.format(lastModified_noticePopupRegFile)%>"></script>
</body>
</html>