<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <!-- 아래는 title 제외 tabler 작업 -->    
 <meta charset="utf-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
 <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
 
 <!-- 아파츠로고나오기전까지 주석-->
 <!-- <link rel="icon" href="/resources/img/favicon_v2.ico"> -->
 
<!--  <title>팬클럽-자동차 부품업 ERP 최강파트너</title> -->

<%
String comCode = (String) session.getAttribute("comCode"); //회사코드
String comName = (String) session.getAttribute("comName"); //회사명
String userId = (String) session.getAttribute("userId");   //사용자ID
String userName = (String) session.getAttribute("userName"); //사용자명
String serverName = request.getServerName(); //현재 사이트 주소

boolean isPanclubServer = "www.panclub.co.kr".equals(serverName);
boolean is4carServer = "www.4car.co.kr".equals(serverName);
 
String fileRootUrl = (String)(isPanclubServer?"https://img.panclub.co.kr/":"https://img.panclub.co.kr/");

//쿠키값 가져오기
 Cookie[] cookies = request.getCookies() ;
String dpColor = "";
if(cookies != null){
	for(int i=0; i < cookies.length; i++){
		Cookie c = cookies[i] ;

	    if ("dPc515R".equals(c.getName())){  //자동로그인여부
	    	dpColor = c.getValue();
	    }
	}
}
%>

	
 <!-- tablerCSS files -->
	 <link href="/resources/dist/css/tabler.min.css" rel="stylesheet"/>
	 <link href="/resources/dist/css/tabler-flags.min.css" rel="stylesheet"/>
	 <link href="/resources/dist/css/tabler-payments.min.css" rel="stylesheet"/>
	 <link href="/resources/dist/css/tabler-vendors.min.css" rel="stylesheet"/>
	 <link href="/resources/dist/css/demo.min.css" rel="stylesheet"/>

<!-- Begin : AUIGrid 용 -->
	<!-- ajax 요청을 위한 스크립트입니다. -->
	<!-- jQuery 사용한다면, 해당 2개의 JS는 불필요 합니다.  -->
	<script type="text/javascript" src="/resources/AUIGrid/ajax.js"></script>
	<script type="text/javascript" src="/resources/AUIGrid/common.js"></script>
	
	<!-- AUIGrid 테마 CSS 파일입니다. 그리드 출력을 위해 꼭 삽입하십시오. -->
	<!-- 원하는 테마가 있다면, 다른 파일로 교체 하십시오. -->
<!-- 	<link href="/resources/AUIGrid/AUIGrid_style.css" rel="stylesheet"> -->
<% if(isPanclubServer) {%>
	<link href="/resources/AUIGrid/AUIGrid_classic_style.css" rel="stylesheet">
<%} else {%> 
	<link href="/resources/AUIGrid/AUIGrid_classic_style.css" rel="stylesheet">
<%}  %>
	
	

	
	<!-- 브라우저 다운로딩 할 수 있는 JS 추가 -->
	<script type="text/javascript" src="/resources/pdfkit/FileSaver.min.js"></script>

<!-- END : AUIGrid 용 -->

<!-- jQuery ui-->
	<!-- <script type="text/javascript"	src="http://code.jquery.com/jquery-1.10.2.js"></script> -->    
   <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
   <!--    <link rel="stylesheet" href="/resources/demos/style.css">  -->
   <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
   <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>  
	
<!--     <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="https://code.jquery.com/ui/1.11.1/jquery-ui.js"></script> 	 -->
	
	<link rel="stylesheet" href="/resources/pan/css/common.css?ver=1.0725.4">
	<script type="text/javascript" src="/resources/pan/js/common.js?ver=1.0315.3"></script>
	
    
 <!-- 아래는 사용자 코딩 --> 


<script> var host = '<%=serverName%>'; </script>
<script> var fileRootUrl = '<%=fileRootUrl%>'; </script>
<script> var lcd = '<%=comCode%>'; </script>
<script> var dpColor = '<%=dpColor%>'; </script>

<!-- AUIGrid 라이센스 파일입니다. 그리드 출력을 위해 꼭 삽입하십시오. -->
<script type="text/javascript" src="/resources/AUIGrid/AUIGridLicense.js"></script>
	
<!-- 실제적인 AUIGrid 라이브러리입니다. 그리드 출력을 위해 꼭 삽입하십시오.--> 
<script type="text/javascript" src="/resources/AUIGrid/AUIGrid.js"></script>
<script type="text/javascript" src="/resources/pdfkit/AUIGrid.pdfkit.js"></script>


<!-- <style type="text/css">
	/* 커스텀 칼럼 스타일 정의 */
	.aui-grid-user-custom-left {
		text-align: left;
	}

	/* 커스컴 disable 스타일*/
	.mycustom-disable-color {
		color: #cccccc;
	}

	/* 그리드 오버 시 행 선택자 만들기 */
	.aui-grid-body-panel table tr:hover {
		background: #D9E5FF;
		color: #000;
	}

	.aui-grid-main-panel .aui-grid-body-panel table tr td:hover {
		background: #D9E5FF;
		color: #000;
	}

	#editWindow {
		font-size: 13px;
	}

	#editWindow label,
	input {
		display: block;
	}

	#editWindow input.text {
		margin-bottom: 10px;
		width: 95%;
		padding: 0.1em;
	}

	#editWindow fieldset {
		padding: 0;
		border: 0;
		margin-top: 10px;
	}
</style> -->
