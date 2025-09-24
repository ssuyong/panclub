<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>

<!doctype html>

<html>
<head>
<%@ include file="../icld/head.jsp"%>

<link href="/resources/pan/css/noticeView.css?ver=1.0213.3"
	rel="stylesheet" />
<link
	href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap"
	rel="stylesheet">
</head>

<body>
	<div class="contents-wrap">
		<div class="heading-wrap-01">
			<h2 class="heading-01">공지사항</h2>
			<p class="heading-desc-01">P의 새로운 소식을 알려드립니다.</p>
		</div>
		<div class="board-view-wrap-01">
			<div class="board-view">
				<label for="title" class="board-view-heading">제목</label> <input
					type="text" id="title" disabled>
				<div class="board-view-wrap-03">
					<div class="board-view-wrap-03">
						<label for="regYmd" class="board-view-date">작성일자:</label> <input
							type="text" id="regYmd" disabled><br>
					<label for="regUserName" class="board-view-date">작성자:</label> <input
							type="text" id="regUserName" disabled><br>
					<label for="date" class="board-view-no">글번호:</label> <input
						type="text" id="noticeNo" value="${noticeNo}" disabled />
			</div>
		</div>
		<div class="board-view-content">
			<label for="contents" class="board-view-contents" >내용</label>
			<div class="board-view-text">
			
				<textarea id="contents" style="width:100%; height: 300px;"  disabled ></textarea>
				
			</div>
		</div>
		</div>
		</div>
		<div class="form-footer1">
		<!-- <div class="align-center"> -->
		<div id="buttonBox">
			<button type="button" id="btnClose">닫기</button>	
			<button type="button" id="btnEdit" style="display:none">수정</button>
			</div>
		</div>
	<!-- </div> -->
</div>	

	<script type="text/javascript"
		src="/resources/pan/js/noticeView.js?ver=2.0203.3"></script>
	<script type="text/javascript"
		src="/resources/pan/js/common-pan.js?ver=1.0127.3"></script>
</body>
</html>