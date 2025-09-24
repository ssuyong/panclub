<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<meta name="viewport" content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;" />
<!doctype html>

<html>
<head> 
 <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<link href="/resources/dist/css/tabler.css" rel="stylesheet" />
<link href="/resources/panMobile/css/mobile.css?ver=2.0709.4" rel="stylesheet" />
</head>

<body class="body cBody_index">
	<div class ="cDiv_title">
 		<a></a>
		<!-- <h2>4CAR 작업 선택</h2> -->
		<h2>A-parts 작업 선택</h2>
		<a></a>
 	</div>
 	 <hr/>
	<div id="iDiv_indexButtonSet">
		<a class="btn btn-primary cButton_index" href='/mobile/itemInfo'>품목조회</a>
		<div id='iDiv_indexButtonItem'>  
			<a class="btn btn-primary cButton_indexSmall" id="iBtnIndex1" href='/mobile/itemListUp'>품목정리</a>  
			<a class="btn btn-primary cButton_indexSmall" id="iBtnIndex2" href='/mobile/itemWr'>수동입출고</a> 
		</div>
		<div id='iDiv_indexButtonPicking'> 
			<a class="btn btn-primary cButton_indexSmall" href='/mobile/pickingList'>피킹 내역 조회</a> 
			<a class="btn btn-primary cButton_indexSmall" href='/mobile/pickingItemList'>피킹 상세내역</a> 
		</div>
		<div id='iDiv_indexButtonPacking'> 
			<a class="btn btn-primary cButton_indexSmall" href='/mobile/packingList'>패킹 내역 조회</a> 
			<a class="btn btn-primary cButton_indexSmall" href='/mobile/packingItemList'>패킹 상세내역</a> 
		</div>
		<div id='iDiv_indexButton4car'>  
			<!-- <a class="btn btn-primary cButton_indexSmall" id="iBtnIndex4" href='/'>PC 4CAR 접속</a> -->
			<a class="btn btn-primary cButton_indexSmall" id="iBtnIndex4" href='/'>PC A-parts 접속</a>
			<a class="btn btn-primary cButton_indexSmall" id="iBtnIndex5" href='/sign-out'>로그아웃</a>
	 	</div>
	</div>

<script type="text/javascript" src="/resources/panMobile/js/index.js?ver=2.0428.3"></script> 
</body>
</html>