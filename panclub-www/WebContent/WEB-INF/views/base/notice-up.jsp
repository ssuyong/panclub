<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>


<!doctype html>

<html>
<head>
<%@ include file="../icld/head.jsp"%>
<!-- fancyBox -->
<script type="text/javascript"
	src="/resources/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript"
	src="/resources/fancybox/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/fancybox/jquery.fancybox.css?v=2.1.4" media="screen" />
<!-- fancyBox -->

<!-- Begin : Toast Date Picker  -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script
	src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
<!-- End : Toast Date Picker  -->

<link href="/resources/pan/css/notice-up.css?ver=1.0207.3" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">


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
							<!-- Page pre-title -->
							<h2 class="page-title">공지사항 등록</h2>
							<input type="hidden" name="srch" id="srch" value="${srch}">
						</div>
					</div>
				</div>
			</div>
			<div style="padding: 0 0 10px 14px;" >
            <button class="btn btn-primary" id="btnReg">등록</button>
            <button class="btn btn-primary disabled " id="btnUpt">수정</button>
            <button class="btn btn-primary disabled " id="btnDel">삭제</button>
          </div>

			<div class="page-body">
				<div class="container-xl">
					<div class="row row-cards">
						<div class="*col-md-6">
							<div class="card">
								<div class="card-body">
									<div class="form-group mb-3 row">
										<div class="col">
											<label for="date" class="board-view-no" style=" ">글번호:</label> 
											<%-- <input		type="text" id="noticeNo1" value="${noticeNo}"   /> --%>
											<input type="text" id="noticeNo" class="form-control" value="${noticeNo}" 
												aria-describedby="" placeholder="글번호 자동생성"
												style="display: initial; width: 48%; max-width: 300px;"  disabled>
										</div>
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 118px; width: auto;">공지일자</label>
										<div class="col">
											<div
												class="tui-datepicker-input tui-datetime-input tui-has-focus">
												<input type="text" id="notiYmd" aria-label="Date-Time">
												<span class="tui-ico-date"></span>
											</div>
										</div>
									</div>
									
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label"
											style="min-width: 118px; width: auto;">공지유형</label>
										<div class="col">
												<label class="form-check form-check-inline"style="margin-bottom: 0px;"> 
												<input class="form-check-input" type="radio" name="comCodeArr"value="" checked> 
												<span class="form-check-label">전체공개</span>
											</label> 
											<label class="form-check form-check-inline" style="margin-bottom: 0px;"> 
											<!-- 	<input class="form-check-input" type="radio" name="comCodeArr"value="1"> 
												<span class="form-check-label">일부공개</span>
											</label> -->
										</div>
									</div>
									<div class="form-group mb-3 row">	
											<label class="col-3 col-form-label"
											style="min-width: 118px; width: auto;">기능설정</label>
												<div class="col">
												<label class="form-check form-check-inline"style="margin-bottom: 0px;"> 공지사항 상단고정
												<input class="form-check-input" type="checkbox" id="fixYN"
													name="fixYN"> </label>
												<div id="selfixSeq" style="display : none;">
												<label style="margin-bottom: 0px;"> 공지사항 상단고정 순번 </label>
														<select name = "fixSeq" id="fixSeq" >
															<option value=1>1</option>
															<option value=2>2</option>
															<option value=3>3</option>
															<option value=4>4</option>
															<option value=5>5</option>
														</select>
														<!-- <button type="button" onclick="getItem()">데이터가져오기</button>	 -->
												</div>
											</div>
												<div class="col" >
													<label class="form-check form-check-inline"style="margin-bottom: 0px;"> 공지사항 게시중단
													<input class="form-check-input" type="checkbox" id="validYN"
													name="validYN"> </label>
											</div>
									
									<div id="wrapper" style="margin-top: 16px;">
									<!--   <input type="text" id="notiYmd" class="form-control" aria-describedby="" placeholder="공지일자" style="display:initial;width:48%; max-width:100px;"  > -->
									<!-- <input type="text" id="regUserId" class="form-control" aria-describedby="" placeholder="작성자" style="display:initial;width:48%; max-width:100px;" > -->
								</div>
								<div class="form-group mb-3 row">
									<label class="col-3 col-form-label required "
										style="min-width: 118px; width: auto;" >제목</label>
									<div class="col">
										<input type="text" id="title" class="form-control"
											aria-describedby="" placeholder="제목을 입력하세요"
											maxlength=90;
											style="display: initial; width: 30%; max-width: 1200px; margin-top:2px; margin-bottom:8px;">
									</div>
									<div class="form-group mb-3 row">
										<label class="col-3 col-form-label required"
											style="min-width: 118px; width: auto;" >내용</label>
										<div class="col">
											<textarea rows="10" cols="170" wrap="hard" id="contents" required ></textarea>
										</div>
									</div>
								</div>
									<div class="form-group mb-3 row">
										<div style="margin: 2px 0px 0;">
											<!-- 	<span style=" display: initial; float: right;">
						                      	<input type="button" class="btn btn-secondary" onclick="addRow1(myGridID,'last')" value="엑셀업로드">
						                      	<input type="button" class="btn btn-secondary" onclick="removeRow1()" value="인쇄">
					                      	</span> -->
										</div>

										<div class="form-footer">
											<div class="form-group mb-3 row">
												<label class="col-3 col-form-label "
													style="min-width: 118px; width: auto; visibility:hidden;">첨부파일</label>
												<div class="col">
													<input type="file" id="attFile" name="uploadFile"
														class="form-control" aria-describedby=""
														placeholder="파일을 첨부해주세요 "
														style="display: initial;  visibility:hidden; width: 48%; max-width: 600px;"
														multiple>
													<button id="uploadBtn"  style="visibility:hidden;" >등록하깅</button>
												</div>
											</div>
											<!--  </form> -->
										</div>

									</div>

								</div>
								<div class="form-footer1" style="padding: 0 0 10px 14px;">
									<!-- <button class="btn btn-primary" id="btnReg">등록</button>
									<button class="btn btn-primary disabled " id="btnUpt">수정</button>
									<button class="btn btn-primary disabled " id="btnDel">삭제</button> -->
								</div>
								<!--             <div class="form-footer1">
				            	<button type="submit" class="btn btn-primary" id="btnReg">등록</button>
				                </div> -->
							</div>
						</div>

					</div>

				</div>
				<!-- container-xl -->
			</div>
			<!-- 페이지 body  -->
		</div>
		<!-- 페이지 wrapper  -->
	</div>


	<!-- Tabler Libs JS -->

	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>

	<script type="text/javascript"
		src="/resources/pan/js/notice-up.js?ver=6.0202.3"></script>
	<script type="text/javascript"
		src="/resources/pan/js/common-pan.js?ver=1.1116.2"></script>

</body>
</html>