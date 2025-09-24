<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>
<!--
* Tabler - Premium and Open Source dashboard template with responsive and high quality UI.
* @version 1.0.0-beta11
* @link https://tabler.io
* Copyright 2018-2022 The Tabler Authors
* Copyright 2018-2022 codecalm.net PaweÅ Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
-->
<html>
<head>
<%@ include file="icld/head.jsp"%>
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css">

<script
	src="https://uicdn.toast.com/tui.code-snippet/v1.5.0/tui-code-snippet.min.js"></script>
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js"></script>

<link rel="stylesheet" type="text/css"
	href="/resources/datetimepicker-master//jquery.datetimepicker.css">
<script
	src="/resources/datetimepicker-master/build/jquery.datetimepicker.full.min.js"></script>

<script src="/resources/moment/moment.js"></script>
<script src="/resources/moment/moment-timezone.js"></script>


<!-- Begin : Toast Date Picker  
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<!-- Begin : Toast Calendar     
    <link rel="stylesheet" href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css" />
    <script src="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.js"></script>
     <script src="https://uicdn.toast.com/calendar/latest/toastui-calendar.ie11.min.js"></script> 
	<script>
	  const Calendar = tui.Calendar;
	</script>
     End : Toast Calendar -->
<script
	src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/index.global.min.js'></script>
<!--  
     <script>
    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth'
        });
        calendar.render();
      });
   </script>
     -->
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
	rel="stylesheet" />
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>

<style>
.modal-head {
	width: 100%;
	padding: 15px;
	height: 30px;
	display: flex;
	align-items: center;
	background-color: #D8D8D8;
	height: 30px;
	display: flex;
	align-items: center;
}
</style>


</head>
<body class=" layout-fluid">
	<%@ page import="java.util.*"%>
	<%@ page import="java.text.*"%>
	<%
	String prmsYmd = "";
	prmsYmd = request.getParameter("sYmd");

	String prmeYmd = "";
	prmeYmd = request.getParameter("eYmd");

	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	Calendar cal = Calendar.getInstance();

	if (("").equals(prmsYmd) || prmsYmd == null) {
		cal.setTime(new Date());
		cal.add(Calendar.MONTH, -1);

		prmsYmd = dateFormat.format(cal.getTime());
		/* out.println(dateFormat.format(cal.getTime())); */
	}

	if (("").equals(prmeYmd) || prmeYmd == null) {
		cal.setTime(new Date());
		cal.add(Calendar.MONTH, 0);

		prmeYmd = dateFormat.format(cal.getTime());
		/* out.println(dateFormat.format(cal.getTime())); */
	}
	%>
	<div class="page">

		<%@ include file="icld/header.jsp"%>
		<%@ include file="icld/navbar.jsp"%>

		<div class="page-wrapper">
			<div class="container-xl">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<div class="page-pretitle" style="display: none;">요약</div>
							<h2 class="page-title">대시보드</h2>
						</div>
						<input type="hidden" id="comCode_save" value="${comCode}" >
						<input type="hidden" id="userId_save" value="${userId}" >
						<input type="hidden" id="userName_save" >
						<!-- Page title actions -->
						<div class="col-12 col-md-auto ms-auto d-print-none"
							style="display: none;">
							<div class="btn-list">
								<span class="d-none d-sm-inline"> <a href="#"
									class="btn btn-white"> New view </a>
								</span> <a href="#" class="btn btn-primary d-none d-sm-inline-block"
									data-bs-toggle="modal" data-bs-target="#modal-report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
										height="24" viewBox="0 0 24 24" stroke-width="2"
										stroke="currentColor" fill="none" stroke-linecap="round"
										stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" /></svg> Create new report
								</a> <a href="#" class="btn btn-primary d-sm-none btn-icon"
									data-bs-toggle="modal" data-bs-target="#modal-report"
									aria-label="Create new report"> <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
									<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
										height="24" viewBox="0 0 24 24" stroke-width="2"
										stroke="currentColor" fill="none" stroke-linecap="round"
										stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" /></svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="page-body" style="">
				<div class="container-xl">
					<div class="row row-deck row-cards">


						<div class="col-12">
							<div class="card">


								<div class="table-responsive">
									<!-- fullCalendar -->
									<div id="calendar"></div>
								</div>

							</div>
						</div>

					</div>
				</div>
			</div>

			<%@ include file="icld/footer.jsp"%>

		</div>
	</div>

	<!-- 일정등록 모달 -->
	<div id="modal"
		style="position: absolute; display: none; border-radius: 10px; overflow: hidden; box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, .3);">
		<div class="modal-head">
			<b><span>일정등록</span></b>
		</div>
		<div style="padding: 3px;">
			<div style="padding: 2px;">
				<button class="btn btn-secondary" id="btnReg1" style="padding: 5px;">외근</button>
				<button class="btn btn-secondary" id="btnReg2" style="padding: 5px;">출장</button>
				<button class="btn btn-secondary" id="btnReg3" style="padding: 5px;">회의</button>
			</div>
			<div >
				<button class="btn btn-secondary" id="btnReg4" style="padding: 5px;">내방</button>
				<button class="btn btn-secondary" id="btnReg5" style="padding: 5px;">휴무</button>
				<button class="btn btn-secondary" id="btnReg6" style="padding: 5px;">시간휴무</button>
			</div>
			<div style="padding: 2px;" >
				<button class="btn btn-secondary" id="btnReg7" style="padding: 5px;">공가</button>
				<button class="btn btn-secondary" id="btnReg8" style="padding: 5px;">인정휴무</button>
				<button class="btn btn-secondary" id="btnReg9" style="padding: 5px;">당직</button>
			</div>
			<!-- <div   >
				<button class="btn btn-secondary" id="btnReg10" style="padding: 5px;">휴양소</button> 
			</div> -->
		</div>
		<br>
		<div style="padding-left : 3px;">
			<button class="btn btn-primary  " id="btnRegClose">닫기</button>
		</div>
	</div>

	<!-- 마우스 오버 세부일정보기 모달 -->
	<div id="modal2"
		style="position: absolute; display: none; border-radius: 10px; overflow: hidden; box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, .3);">
		<div class="modal-head">
			<span id="title_modal"></span><br>
		</div>
		<div style="padding: 10px;">
			<b><label>참여자: </label></b> <span id="member_modal"></span><br>
			<b><label>기간: </label></b> <span id="dateTime_modal"></span><br>
			<b><label>외부인원(명): </label></b> <span id="iSpan_outerPerson"></span><br>
			<b><label>내용</label></b>
			<div class="col">
				<textarea id="contents_modal" class="form-control" placeholder=""></textarea>
			</div>

		</div>
	</div>

	<!-- 일정등록다이알로그 -->
	<div id="dialog-form-schReg" title="일정등록" style="display: none;">
		<div style="padding: 0 0 10px 14px;">
			<button class="btn btn-primary" id="btnRegDialog">저장</button>
			<button class="btn btn-primary  " id="btnCloseDialog">닫기</button>
		</div>

		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards">

					<div class="*col-md-6">
						<div class="card">

							<div class="card-body">

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">유형</label> <input
										type="hidden" id="schNo_dialog" class="form-control"
										style="width: 60%; max-width: 300px;">
									<div class="col">
										<select id="category_dialog" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
											<option>외근</option>
											<option>출장</option>
											<option>회의</option>
											<option>내방</option>
											<option>휴무</option>
											<option>시간휴무</option>
											<option>공가</option>
											<option>인정휴무</option>
											<option>당직</option>
											<!-- <option>휴양소</option> -->
										</select>

									</div>
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">제목</label>
									<div class="col">
										<input type="text" id="title_dialog" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>


								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">참여자</label>
									<div class="col">
										<select id="member_dialog" class="form-select"
											style="width: 60%; max-width: 300px;" multiple="multiple">
											<option value=""></option>
										</select>
									</div>


								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">기간</label> <input
										type=hidden id="prmsYmd" value=${sYmd} > <input
										type=hidden id="prmeYmd" value=${eYmd} > <input
										type=hidden id="startpicker-input_save"> <input
										type=hidden id="endpicker-input_save">

									<div class="row" style="display: contents;">
										<div class="col-md-6">
											<div
												class="tui-datepicker-input tui-datetime-input tui-has-focus">
												<input id="startpicker-input" type="text" style="font-size: 10px;"
													aria-label="Date-Time"> <span class="tui-ico-date"></span>
												<div id="startpicker-container"></div>
											</div>
											<span>~</span>
											<div
												class="tui-datepicker-input tui-datetime-input tui-has-focus">
												<input id="endpicker-input" type="text" style="font-size: 10px;"
													aria-label="Date-Time"> <span class="tui-ico-date"></span>
												<div id="endpicker-container"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">외부인원(명)</label>
									<div class="col">
										<input id="iInput_outerPerson"  >
									</div>


								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">내용</label>
									<div class="col">
										<textarea id="contents_dialog" class="form-control"
											style="width: 60%; max-width: 300px; height: 200px;"
											placeholder=""></textarea>
									</div>

								</div>

							</div>
							<div style="padding: 0 0 10px 14px;">
								<button class="btn btn-primary" id="btnDelDialog"
									style="display: none">삭제</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		<!-- 타사 사원 일정정보 보기 -->
		<div id="dialog-form-schReg2" title="타사 사원 일정정보" style="display: none;">
		<div style="padding: 0 0 10px 14px;">
			
			<button class="btn btn-primary  " id="btnCloseDialog">닫기</button>
		</div>

		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards">

					<div class="*col-md-6">
						<div class="card">

							<div class="card-body">

								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">유형</label> <input
										type="hidden" id="schNo_dialog" class="form-control"
										style="width: 60%; max-width: 300px;">
									<div class="col">
										<lebel id="category_dialog" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
											 
										</lebel>

									</div>
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">제목</label>
									<div class="col">
										<lebel type="text" id="title_dialog" class="form-control"
											style="width: 60%; max-width: 300px;" placeholder="">
									</div>


								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">참여자</label>
									<div class="col">
										<label id="member_dialog" class="form-select"
											style="width: 60%; max-width: 300px;" multiple="multiple">
											 
										</label>
									</div>


								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">기간</label> <input
										type=hidden id="prmsYmd" value=${sYmd} > <input
										type=hidden id="prmeYmd" value=${eYmd} > <input
										type=hidden id="startpicker-input_save"> <input
										type=hidden id="endpicker-input_save">

									<div class="row" style="display: contents;">
										<div class="col-md-6">
											<div
												class="tui-datepicker-input tui-datetime-input tui-has-focus">
												<label id="startpicker-input"  style="font-size: 10px;"
													></label>  
											</div>
											<span>~</span>
											<div
												class="tui-datepicker-input tui-datetime-input tui-has-focus">
												<label id="endpicker-input"   style="font-size: 10px;"
													></label>
											</div>
										</div>
									</div>
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label "
										style="min-width: 118px; width: auto;">내용</label>
									<div class="col">
										<lebel id="contents_dialog" class="form-control"
											style="width: 60%; max-width: 300px; height: 200px;"
											placeholder=""></lebel>
									</div>

								</div>

							</div>
							 
						</div>
					</div>
				</div>
			</div>
		</div>
		<%@ page import="java.io.*, java.util.*" %> 
		
		<%	/* CSS/JS 파일 캐시 방지 */	
			String calendar = application.getRealPath("/resources/pan/js/calendar.js");	
			File calendarFile = new File(calendar);	
			Date lastModified_calendarFile = new Date(calendarFile.lastModified());  
			
			SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		%>

		<!-- Libs JS -->
		<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
			defer></script>
		<script
			src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js"
			defer></script>
		<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
			defer></script>
		<!-- Tabler Core -->
		<script src="/resources/dist/js/tabler.min.js" defer></script>
		<script src="/resources/dist/js/demo.min.js" defer></script>

		<script type="text/javascript"
			src="/resources/pan/js/calendar.js?ver=<%=fmt.format(lastModified_calendarFile)%>"></script>
</body>
</html>