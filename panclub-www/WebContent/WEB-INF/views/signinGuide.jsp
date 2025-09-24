<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 
<!DOCTYPE HTML>
<html>
<head>

<style>
 @import
	url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Nanum+Gothic:wght@400;700;800&display=swap')
	; 
body{
	box-sizing: border-box;
	background-color: #F5F7FB;}
	
#page {
	
	heigth: 350px;
}

#img {
	width: 350px;
	margin: 0px auto;
	text-align: center;
}
img{
max-width:100%}

#guide {
	margin: 0 auto;
	font-family: 'Nanum Gothic', sans-serif;
	font-weight: 800;
	font-size: 20px;
	text-align: center;
	color: rgb(25, 20, 70);
	border-bottom: solid rgb(25, 20, 70) 2px;
	padding-bottom: 5px;
}

#guide2 {
	color: rgb(25, 20, 70);
	font-family: 'Nanum Gothic', sans-serif;
	font-size: 14px;
	text-align: center;
	color: rgb(25, 20, 70);
	font-weight: 700;
	padding-top: 10px;
	background-color: #F5F7FB;
}

#body {
	padding-top: 14px;
	font-family: 'Nanum Gothic', sans-serif;
	font-size: 12px;
	background-color: #F5F7FB;
	magin: 0px auto;
}

#guide3 {
	
	font-weight: 700;
	max-width:100%
	
}

p {
	font-weight: 400;
	font-size:11px;
	padding-top: 10px;
	max-width:100%;
	text-align: left;
	
}

#btnClose {
	margin: 0 auto;
	transition: 0.3s;
	border-radius: 20%;
	height: 20px;
	width: 90px;
	border: 0;
	font-family: 'Nanum Gothic', sans-serif;
	font-size: 14px;
	font-weight: 700;
	color: white;
	background: #206bc4;
	max-width:100%
	
}

#btnClose:hover {
	background: #1a569d;
	color: white;
	box-shadow: inset 0 -54px 0 0 var(- -btn-bg);
}
</style>


</head>
<body>
	<div id="page">
		<div id="img">
			<img src="/resources/img/add-user.png" height="80" alt="">
		</div>
		<div id="header">
			<!-- <div id="guide">4CAR 회원가입</div> -->
			<div id="guide">A-parts 회원가입</div>
			<div id="guide2">[가입절차 및 유의사항]</div>
		</div>
		<div id="body">
			<<!-- div id="guide3">회원가입은 P 본사 또는 4CAR 영업담당자를 통해 가입 부탁드립니다.</div> -->
			<div id="guide3">회원가입은 A-parts 영업담당자를 통해 가입 부탁드립니다.</div>
			<div>
				<p>회원가입 관련 문의
					 <br> TEL. 010-9984-4999 | tjswhdtjd12@naver.com
				</p>
			</div>
			<div>
				<button id="btnClose" onclick="window.close()" padding:0.75rem>확인</button>
			</div>
		</div>
	</div>
</body>
</html>