<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 

<!DOCTYPE html>
<html>
<head>
	<title> 비밀번호 재설정</title>	
	 <link href="/resources/dist/css/tabler.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/tabler-flags.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/tabler-payments.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/tabler-vendors.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/demo.min.css" rel="stylesheet"/>
    <link href="/resources/pan/css/resetpw.min.css?ver=1.25.013" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">

    <script type="text/javascript">
		var result = '${msg}';		
		if(result=='FAIL'){
			alert("비밀번호 재설정 시 오류가 발생했습니다.\n잠시 후에 다시 시도하세요.");
		}	
		if(result=='OK'){
			alert("비밀번호가 변경되었습니다. \n로그인 하세요.");
			location.href ="sign-in";
		}
		
	</script>
 </head>
<body>
         
	<body  class=" border-top-wide border-primary d-flex flex-column">

    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-3">
          <a href="." class="navbar-brand navbar-brand-autodark"></a>
             <!-- <img src="/resources/img/4car_logo.png" width="150" alt=""> -->
             
             <!-- 아파츠로고나오기전까지 -->
             <!-- <img src="/resources/img/panclub_v1_s.png" width="150" alt=""> -->
             <span id="headerCoNameDp" style="padding: 0px 15px;  font-size:32px;">A-parts</span>
             
        </div>
        <form class="card card-md" action="/resetPw" method="post" autocomplete="off" novalidate>
         <input type="hidden" id="uid"  name="uid"  value="${uid}">
         <input type="hidden" id="uname"  name="uname" value="${uname}">
         <input type="hidden" id="comCode" name="comCode" value="${comCode}">
         
          <div class="card-body">
            <h2 class="card-title text-center mb-4">비밀번호 재설정</h2>
            <p class="text-muted mb-4"> 변경하실 비밀번호를 입력해주세요.<br>
           	비밀번호는 4~20자리 내외로 입력해주세요. </p>
            <div class="mb-3">
              <label class="form-label"> 비밀번호  </label>
              <input type="text" class="form-control" name="upw1" id= "upwd1" placeholder="비밀번호를 입력해주세요" onchange="pwCheck()">
               <label class="form-label">비밀번호 확인</label>
              <input type="text" class="form-control" name="upw2" id="upwd2" placeholder="비밀번호를 다시 입력해주세요" onchange="comparePw()">
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100" id="btnResetPw"> 비밀번호 재설정  </button>
            </div>
          </div>
        </form>
        <div class="text-center text-muted mt-3">
          <a href="./sign-in.html">로그인 페이지</a>로 돌아가기.
        </div>
      </div>
    </div>   
 	<script src="/resources/pan/js/resetpw.js?ver=1.25.123"></script>
    </body>