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
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />

<!--아파츠로고나오기전까지주석-->
<!-- <link rel="icon" href="/resources/img/favicon_v2.ico"> -->

<title>수입자동차부품에 특화된 재고관리 전문기업</title>
<!-- CSS files -->
<link href="/resources/dist/css/tabler.min.css" rel="stylesheet" />
<link href="/resources/dist/css/tabler-flags.min.css" rel="stylesheet" />
<link href="/resources/dist/css/tabler-payments.min.css"
	rel="stylesheet" />
<link href="/resources/dist/css/tabler-vendors.min.css" rel="stylesheet" />
<link href="/resources/dist/css/demo.min.css" rel="stylesheet" />
<link href="/resources/pan/css/signup.min.css" rel="stylesheet" />

<% 
String serverName = request.getServerName(); //현재 사이트 주소

boolean isPanclubServer = "www.panclub.co.kr".equals(serverName); 
%>

<script type="text/javascript">
	var result = '${msg}';
	if (result == 'FAIL') {
		alert("입력 정보가 잘못되었습니다.");
	}
</script>

</head>
<body class=" border-top-wide border-primary d-flex flex-column">
	<div class="page page-center">
		<div class="container-tight py-4">
			<div class="text-center mb-3">
				<a href="." class="navbar-brand navbar-brand-autodark"> <!-- <span style="color:#206bc4; font-size:28px; font-weight:400;font-family: fantasy;">PAN</span><span style="color:#cf2222; font-size:28px; font-weight:bold; font-family: fantasy;">CLUB</span> -->
					<%-- <% if(isPanclubServer) {%>
						<img src="/resources/img/panclub_v1_s.png" width="150" alt="4car"> 
			        <%} else {%> 
			       		<img src="/resources/img/4car_logo.png" width="150" alt="4car">  
			        <%}  %> --%>
			        
			        <!-- aparts 로고나오기전까지 -->
			        <!-- <img src="/resources/img/panclub_v1_s.png" width="150" alt="4car"> -->
			        <span id="headerCoNameDp" style="padding: 0px 15px;  font-size:32px;">A-parts</span>
					
					<!-- <span style="width:300px;" ></span>
          <img src="/resources/img/panclub_v2.png" height="30" alt="">   
           <span style="width:300px;" ></span>
          <img src="/resources/img/panclub_v3.png" height="50" alt=""> -->
				</a>
			</div>
			<form class="card card-md" action="/sign-in" method="post"
				autocomplete="off">
				<input type="hidden" name="rdU" value="${rdU}"> <input
					type="hidden" name="rtU" value="${rdU}">

				<div class="card-body">
					<!--   <h2 class="card-title text-center mb-4">로그인 하세요</h2> -->
					<div class="mb-3">
						<label class="form-label">회사(지점)코드</label> <input type="text"
							class="form-control" placeholder="회사코드를 입력하세요" autocomplete="off"
							name="comCode" id="comCode" style="padding: 0.75rem;"
							onchange="chkComCode()">

						<div class="mb-3">
							<label class="form-label">아이디</label> <input type="text" id="uid"
								class="form-control" placeholder="아이디를 입력하세요" autocomplete="off"
								name="userId" style="padding: 0.75rem;" minlength="2" 
								maxlength="20">
						</div>

						<div class="mb-2">
							<label class="form-label"> 비밀번호 <span
								class="form-label-description"> <a href="/findPassword">비밀번호
										찾기</a>
							</span>
							</label>
							<div class="input-group input-group-flat">
								<input type="password" class="form-control"
									placeholder="비밀번호를 입력하세요" autocomplete="off" name="pwd"
									style="padding: 0.75rem;" id="pw1"> <span
									class="input-group-text"> <a href="#"
									class="link-secondary" title="비밀번호 보이기"
									data-bs-toggle="tooltip" onclick="togglePw()">
										<!-- Download SVG icon from http://tabler-icons.io/i/eye --> <svg
											xmlns="http://www.w3.org/2000/svg" class="icon" width="24"
											height="24" viewBox="0 0 24 24" s stroke-width="2"
											stroke="currentColor" fill="none" stroke-linecap="round"
											stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<circle cx="12" cy="12" r="2" />
											<path
												d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>
								</a>
								</span>
							</div>
						</div>
						<div class="mb-2">
							<label class="form-check" for="save-data-checkbox"> <input
								type="checkbox" class="form-check-input" name="signInfoSave"
								id="saveId" /> <span class="form-check-label">로그인정보(회사코드,아이디)
									저장</span>
							</label>
							<% if (request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1) { %>
				                       <label class="form-check" for="mobileLogin"> <input
											type="checkbox" class="form-check-input" name="mobileLogin"
											id="mobileLogin" /> <span class="form-check-label">모바일화면으로 접속하기</span>
										</label>	 
				             <%} %> 
						</div>
						<div class="form-footer">
							<button type="submit" id="loginbtn" class="btn btn-primary w-100"
								style="padding: 0.75rem;">로그인</button>
						</div>
					</div>
					<!-- <div class="hr-text">or</div>
          <div class="card-body">
            <div class="row">
              <div class="col"><a href="#" class="btn btn-white w-100">
                  Download SVG icon from http://tabler-icons.io/i/brand-github
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon text-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                  Login with Github
                </a></div>
              <div class="col"><a href="#" class="btn btn-white w-100">
                  Download SVG icon from http://tabler-icons.io/i/brand-twitter
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon text-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                  Login with Twitter
                </a></div>
            </div>
          </div> -->
          </div>
			</form> 
<!-- 			<div class="text-center text-muted mt-3" style="display:none;"> -->
<!-- 				가입 하시겠습니까? <a href="javascript:openWin()" tabindex="-1">가입안내</a> -->
<!-- 			</div> -->
		</div>
	</div>


	<!-- Tabler Libs JS -->
	<script src="/resources/dist/libs/apexcharts/dist/apexcharts.min.js"
		defer></script>
	<script
		src="/resources/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"
		defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world.js" defer></script>
	<script src="/resources/dist/libs/jsvectormap/dist/maps/world-merc.js"
		defer></script>
	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>
	 <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="/resources/pan/js/sign-in.js?ver=1.0605.4"></script>
</body>
</html>