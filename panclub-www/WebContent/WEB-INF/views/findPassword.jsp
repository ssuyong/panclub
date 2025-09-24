<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%> 


<!DOCTYPE html>
<html>
<head>
	<title> 비밀번호 찾기</title>
	
	 <link href="/resources/dist/css/tabler.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/tabler-flags.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/tabler-payments.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/tabler-vendors.min.css" rel="stylesheet"/>
    <link href="/resources/dist/css/demo.min.css" rel="stylesheet"/>
    <link href="/resources/pan/css/signup.min.css?ver=1.20.123" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Nanum+Gothic+Coding:wght@400;700&display=swap" rel="stylesheet">
    
       <script type="text/javascript">
		var result = '${msg}';		
		if(result=='FAIL'){
			alert("입력 정보가 잘못되었습니다.");
		}	
	</script>
	
</head>

<% 
String serverName = request.getServerName(); //현재 사이트 주소

boolean isPanclubServer = "www.panclub.co.kr".equals(serverName); 
%>

<body>
         
	<body  class=" border-top-wide border-primary d-flex flex-column">

    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-3">
          <a href="." class="navbar-brand navbar-brand-autodark"></a>
             <%-- <% if(isPanclubServer) {%>
			 	<img src="/resources/img/panclub_v1_s.png" width="150" alt="4car"> 
			 <%} else {%> 
			 	<img src="/resources/img/4car_logo.png" width="150" alt="4car">  
			 <%}  %> --%>
			 
			 <!-- 아파츠로고나오기전까지 -->
			 <!-- <img src="/resources/img/panclub_v1_s.png" width="150" alt="4car"> -->
			 <span id="headerCoNameDp" style="padding: 0px 15px;  font-size:32px;">A-parts</span> 
			 
        </div>
        <form class="card card-md" action="./findPwd" method="post" autocomplete="off" novalidate>
          <div class="card-body">
            <h2 class="card-title text-center mb-4">비밀번호 변경</h2>
            <p class="text-muted mb-4"> 기존에 가입했던 정보와 동일한 회사코드 아이디 이름을 입력해주세요.</p>
            <div class="mb-3">
              <label class="form-label">회사코드</label>
              <input type="text" class="form-control" name="comCode" placeholder="회사코드를 입력해주세요" >
              <label class="form-label"> 이름 </label>
              <input type="text" class="form-control" name="uname" placeholder="이름을 입력해주세요">
               <label class="form-label">아이디</label>
              <input type="text" class="form-control" name="uid" placeholder="id를 입력해주세요">
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100" id="btnFindPw"> 비밀번호 변경  </button>
            </div>
          </div>
        </form>
        <div class="text-center text-muted mt-3">
           <a href="./sign-in.html">로그인 페이지</a>로 돌아가기
        </div>
      </div>
    </div>


</body>
</html>