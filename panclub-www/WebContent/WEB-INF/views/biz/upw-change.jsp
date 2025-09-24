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

<link href="/resources/dist/css/tabler.min.css" rel="stylesheet" />
<link href="/resources/dist/css/tabler-flags.min.css" rel="stylesheet" />
<link href="/resources/dist/css/tabler-payments.min.css"
	rel="stylesheet" />
<link href="/resources/dist/css/tabler-vendors.min.css" rel="stylesheet" />
<link href="/resources/dist/css/demo.min.css" rel="stylesheet" />
<link href="/resources/pan/css/upw-change.css?ver=6.0209.3"
	rel="stylesheet" />
<link
	href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap"
	rel="stylesheet">


</head>
<body class=" layout-fluid">
	<div class="page">

		<%@ include file="../icld/header.jsp"%>
		<%@ include file="../icld/navbar.jsp"%>

		<div class="page-wrapper">
			<div class="container-xl" style="width: 100%">
				<!-- Page title -->
				<div class="page-header d-print-none">
					<div class="row g-2 align-items-center">
						<div class="col">
							<!-- Page pre-title -->
							<h3 class="page-title">사용자 비밀번호 변경</h3>
						</div>
					</div>
				</div>

				<div style="padding: 0 0 10px 14px;">
					<button class="btn btn-primary" id="btnReg" onclick="checkPw()">변경</button>

				</div>

				<div class="page-body">
					<div class="container-xl">
						<div class="row row-cards">
							<div class="*col-md-6">
								<div class="card">
									<div class="card-body" style="width: 1639px; height: 500px">

										<div class="container1">
											<div class="title ">
												<h4>기본정보</h4>
											</div>
											<div class="form">
												<div class="row1">
													<div class="left_col">
														<p>회사코드</p>
													</div>
													<div class="middle">
														<input type="text" class="form-control"
															style="width: 60%; max-width: 300px;" placeholder=""
															id="comCode" name="comCode" value="${comCode}" disabled>
													</div>
												</div>
												<div class="row1">
													<div class="left_col">
														<p>이름</p>
													</div>
													<div class="middle">
														<input type="text" class="form-control"
															style="width: 60%; max-width: 300px;" placeholder=""
															id="uname" name="uname" disabled>
													</div>
												</div>
												<div class="row1">
													<div class="left_col">
														<p>아이디</p>
													</div>
													<div class="middle">
														<input type="text" class="form-control"
															style="width: 60%; max-width: 300px;" placeholder=""
															id="uid" name="uid" value="${userId}" disabled>
													</div>
												</div>
											</div>
										</div>


										<div class="container">
											<div class="title ">
												<h4>비밀번호 변경</h4>
											</div>
											<div class="form">
												<div class="row2">
													<div class="left_col">
														<p>
															현재 비밀번호<span class="form-required">*</span>
														</p>
													</div>
													<div class="middle">
														<input type="password" name="nowpwd" id="nowpwd"	maxlength="30" placeholder="현재 비밀번호" autocomplete="off"	class="form-text"
														onkeydown="fn_reset('nowpwd');" >
														<div class="error_box" >
															<span class="error_next_box" id="error1"></span>
														</div>
													</div>

												</div>
												<div class="row2">
													<div class="left_col">
														<p>
															새 비밀번호<span class="form-required">*</span>
														</p>
													</div>
													<div class="middle">
														<input type="password" name="newpwd" id="newpwd"
															maxlength="30" placeholder="새로운 비밀번호" autocomplete="off"
															class="form-text" onkeydown="fn_reset('newpwd');" >
														<div class="error_box" id="error_box1" >
															<span class="error_next_box" id="error2"></span>
															<span class="error_next_box" id="error3"></span>
														</div>
													</div>

												</div>
												<div class="row2">
													<div class="left_col">
														<p>
															비밀번호 재확인<span class="form-required">*</span>
														</p>
													</div>

													<div class="middle">
														<input type="password" name="renewpwd" id="renewpwd"
															maxlength="30" placeholder="새로운 비밀번호 재입력"
															autocomplete="off" class="form-text" onkeydown="fn_reset('renewpwd');" >
														<div class="error_box" >
															<span class="error_next_box" id="error4"></span>
															<span class="error_next_box" id="error5"></span>
														</div>
													</div>

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
					</div>
				</div>
			</div>

		</div>
	</div>




	<!-- Tabler Libs JS -->

	<!-- Tabler Core -->
	<script src="/resources/dist/js/tabler.min.js" defer></script>
	<script src="/resources/dist/js/demo.min.js" defer></script>

	<script type="text/javascript"
		src="/resources/pan/js/upw-change.js?ver=1.0209.3"></script>
	<script type="text/javascript"
		src="/resources/pan/js/common-pan.js?ver=1.1116.2"></script>

</body>
</html>