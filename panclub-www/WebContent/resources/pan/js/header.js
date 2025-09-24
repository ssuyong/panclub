 
  
var date = new Date();
var reload = getCookie('reload')==null?0:getCookie('reload');

//****  알람 관련 */ 
var notiDataList = [];  //자신이 봐야할 알람 데이터가 담기는곳
var viewNotiNum = 0; // 자신이 한번에 볼수있는 알람의 갯수 
var notiInterval = -1; // 다음 통신까지의 남은 초

//알림 UI 갱신을 위한 카운트
const notiUIOpenInterval = 3;   // 알람이 사라지고 다시 표시될때 까지 남은 초
var notiUIOpenCurCount = -1;

var notiDivList=[]; // 보여지고 있는 알람이 담기는 곳
///////
$(document).ready(function(){
	
	getCAComCode(); // 페이지가 열릴때 회사 전환 메뉴 갱신
	notilistread(); // 페이지가 열릴때 한번 알람리스트와 볼수있는 갯수 , 그리고 다음 통신까지 남은 시간을 받아옴
	
});

setInterval(()=>{
	var reloadCookie = getCookie('reload');
	
	
	if(notiInterval-- == 0) notilistread();  // 남은 알람통신 지연시간이 0이 되는 순간 통신(통신으로 알람 지연시간 프로시저로 인해 초기화됨)
	 
	if(notiUIOpenCurCount-- <0) // 보여져야할 남은알람리스트가 다시 열릴떄 까지 남은 시간
	{
		notiUIOpen(); 
	} 
	
	if(reloadCookie == null) return;
	
 	if(reload<reloadCookie)
 	{
		reload = reloadCookie
		location.reload(); 
	}
	
	
},1000);

function setCookie(name, value, exp) {
  
  date.setTime(date.getTime() + (exp*24*60*60*1000));
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function getCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
}

function getCAComCode() // 같은 계정명, 이름 , 비밀번호를 공유하는 다른 회사 목록 가져와서 우측상단 버튼 밑에 추가해주는 기능
	{
		$.ajax(	{
			type :"POST" ,
			url : "/getCAComCode", 
			dataType : "Json",
			async: false,
		//	contentType: "application/json; charset=utf-8",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success:function(data){
			 
				var div = $("#header-nav-item-dropdown-div");
				
				//갱신시 초기화
				div.children().remove();
				var defaultTag= "<a href='/biz/upw-change' class='dropdown-item'>비밀번호 변경</a><a href='/sign-out' class='dropdown-item'>로그아웃</a>";
				div.append(defaultTag);
				
				//모바일 환경의 경우 모바일화면으로 변경버튼
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
					div.append("<a href='/mobile/' class='dropdown-item'>모바일화면 변경</a>");
				
				//통신으로 가져온 동일 계정의 사명 표시 및 이벤트 부여
				var changeAppendTag = '';
				var curComName = $("#headerCoNameDp").text(); 
				for(let i = 0 ; i < data.length ; i++)
				{  
					if(curComName== data[i]) continue ;
					if(changeAppendTag == '') changeAppendTag+= "<div class='dropdown-divider'></div>";
					changeAppendTag += '<a onclick="cComCode(this.text)" class="dropdown-item">'+data[i]+'</a>'; 
				}
				div.append(changeAppendTag);
				
			},
			error:function(x,e){
				//console.log(e);
		}
	});
		 
}

function cComCode(changeComName) {   // 사명 변경의 이름으로 전환 해주는 기능  단 계정명,이름,비밀번호가 다르면 실패하고 새로 갱신
 	$.ajax(	{
		   type :"POST" ,
			url : "/cComCode",
			dataType : "text",
			data: {
				changeComName
			},
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success:function(data){ 
				if(data == -1)
				{
					//데이터가 없다는것은 중간에 비밀번호가 변경되었거나 정보가 달라져서이므로 실패메세지와 함께 변경메뉴 갱신
					alert("회사 변경이 실패하였습니다 다시 로그인후 변경될 회사의 로그인 정보를 확인해주세요");
//					getCAComCode();
					location.reload();
				}
				else if(data == 1)
				{
					
					setCookie('reload',reload+1);
				}
			},
			error:function(x,e){
				 
			}
	});
	    
} 

//알림을 열어주는 기능
function notiOpen(index,notiData,w, h) {
	
	const maxTextLength = 100; //최대 글자수 넘으면 자르고 ...붙임
	
	
	//내용이 maxTextLength이상이면 자르고 ... 붙임
	const contentsText = notiData.contents.length>maxTextLength?notiData.contents.substr(0,maxTextLength)+".....":notiData.contents;
	
	//동적 태그 생성을 위한 코드
	const notiHTML = "<div id='Notification' name='notiIndex"+ notiData.index+"'  style='display:none;'><h4>"+
	notiData.title+"</h4><p style='font-size: 12px; word-wrap:break-word;'>"+contentsText+"</p></div>";
	
	//알림이 열리기전 상위 대상잡기 위해 만든 변수
	const notiParnetDiv = $("#NotificationParentDiv");
	//notiHTML로 알림 태그 생성
	notiParnetDiv.append(notiHTML);
	const noti = $("div[name='notiIndex"+index+"']");
 
 	
 	// 다이얼로그 알람 레이아웃
	const dialogPrint = noti.dialog({ 
	    autoOpen: false,
	    minHeight: h,
	    Width: w,  
	    position :{  //다수의 알림을 위해 자신이 몇번째 열리는 알림창인지에 따라 위치 변동
			my: notiDivList.length>0? 'left bottom' : 'right bottom' ,
            at: notiDivList.length>0? 'right top' : 'right bottom' ,
            of: notiDivList.length>0? notiDivList[notiDivList.length-1].dialogPrint.parent():window,
            collision: "fit"
		},
	    show : { //등장 효과
		 	effect: "drop",
       	 	duration: 850  //0.85초인데 나오는 순간 다른 창이 닫히면 위치 버그있음
		} ,
		close : (event)=>{ //알람 닫기 버튼 이벤트
//			if(event.originalEvent != null) notiClose(index,false);   // X표시버튼으로로 인해 꺼질경우를 위한 통신 현재는 X버튼자체가 사라져서 주석화 

			//꺼질때 myDivList에서 제거해주기 위한 코드
		 	var myDivIndex = -1; 
			for(let i =0 ; i<notiDivList.length ; i++)
			{
				if(notiDivList[i].name == dialogPrint.attr("name"))
				{
					myDivIndex = i;
					notiDivList.splice(myDivIndex,1);  
					noti.remove();
				} 
			}  
			//꺼진후 ui 재설정
			notiUISet();
		} ,
		draggable  :false,
	 	resizable  :false, 
	 	buttons:{ 
			'다시안보기':()=>{
				noti.dialog("close");
				notiClose(index,true);
			},
			'닫기':()=>{
				noti.dialog("close");
				notiClose(index,false);
			}	
		}, 
	 	open:()=>{
			//알림창 클릭에 링크로 보내기 위한 바인딩
			dialogPrint.bind("click",()=>{ 
				noti.dialog("close");
				notiClose(index,false);
				if(notiData.linkUrl != '') location.href = notiData.linkUrl;
			});
		
		} 
		
	  });  
	  
	  //다른 다이얼로그에 영향 주지 않도록 css 셋팅
	  const dialog =  noti.parent(".ui-dialog");
	  dialog.css("cursor","pointer");
      dialog.children(".ui-dialog-titlebar").remove(); 
	  dialog.children(".ui-widget-content").css("border",0);
	  dialog.children(".ui-widget-content").css("margin",0);
	  dialog.children(".ui-widget-content").css("padding",0);
	  dialog.children(".ui-widget-content").children(".ui-dialog-buttonset").children(".ui-dialog .ui-dialog-buttonpane button").css("margin",0); 
	  dialog.css("padding",6);
	  
	  
	  //알람 다이얼로그 열기
	  dialogPrint.dialog( "open" );
	  
	  //열린 알람을 리스트에 등록
	  notiDivList.push({index,name : dialogPrint.attr("name") , dialogPrint  }); 
} 
//리사이즈, 스크롤시 위치 고정
window.onresize = ()=> {
	notiUISet();
}
window.onscroll = () => { 
 	notiUISet();
}; 

//생성,파괴,창변화등을 위한 현재 보여지는 알람 리스트의 ui 위치값 셋팅
function notiUISet()
{
	for(let i = 0 ; i < notiDivList.length ; i++)
	{  
		notiDivList[i].dialogPrint.dialog({
			position : {
			my: i>0? 'left bottom' : 'right bottom',
            at: i>0? 'right top' : 'right bottom',
            of: i>0? notiDivList[i-1].dialogPrint.parent() :window,
            collision: "fit"
		}})  
	}
	
}
 
// 자신의 봐야할 알람 리스트 데이터를 가져오기 위한 통신 함수
function notilistread()
{  
	$.ajax(	{
		   type :"POST" ,
			url : "/notilistread",
			dataType : "Json",
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success:function(data){ 
					 	
				notiDataList = [];  
				notiInterval = data[0].title;     // 데이터의 첫자리에 더미데이터로 다음 통신까지 남은 초를 받아옴
				viewNotiNum = data[0].contents; /// 보여지는 알람갯수를 통신으로 받아옴

				//다른 브라우저에서 닫혀서 리스트 갱신때 현재 열린 알림이 데이터에 없을경우 닫아줌
				for(let i = 0 ; i<notiDivList.length ; i++ )
				{
					let isData = false;
					for(let j = 1 ; j <data.length ; j++)
					{
						if(notiDivList[i].index == data[j].idx )
						{
							isData = true;
							break;
						}
					}
					if(!isData) notiDivList[i--].dialogPrint.dialog("close");
				}
				
				//데이터를 받아서 notiDataList로 데이터를 정리해서 넣고 만약 데이터가 notiDivList에 들어있어 이미 보여지는 중이라면 notiDataList에 저장하지 않음 
				for(let i = 1 ; i < data.length ; i++)
				{
					var isDivNoti = false;
					for(let j =0 ; j<notiDivList.length ; j++)
					{
						if(notiDivList[j].index == data[i].idx)
						{
							isDivNoti = true;
							break;
						} 
					}  
					if(isDivNoti) continue;
					
					var noti = {
						index : data[i].idx,
						title :  data[i].title ,
						contents :  data[i].contents ,
						linkUrl :  data[i].linkUrl 
						
					}; 
					notiDataList.push(noti);  // 즉 notiDataList만 최신화
				}
				 
				notiUIOpen(); 
			},
			error:function(x,e){
				 notiInterval = 180; //실패하면 3분후 재통신
				 viewNotiNum = 0;
			}
	});
	
} 

//현재 더 열릴수 잇는 알람갯수중에 데이터로부터 다시 열어주는 함수
function notiUIOpen()
{ 
	//열수있는 갯수가 남아있다는 조건하에 notiDataList에서 열고 열린 데이터는 notiDataList에서 제거해줌
	for(let i = 0 ; notiDivList.length < viewNotiNum && i< notiDataList.length ; i++) // 더 열수 있는 조건하에 notiDataList수만큼 반복문
	{
		notiOpen(notiDataList[i].index,notiDataList[i], 220,100);
		notiDataList.splice(i--,1); // 알람이 노출되면 데이터 목록에서 제거
	
	} 
	//UI갱신 주기 초기화
    notiUIOpenCurCount = notiUIOpenInterval;   
}

// 알림이 닫힐때 통신
function notiClose(notiIdx , isNotView)
{ 
	
	$.ajax(	{
		   type :"POST" ,
			url : "/notiClose",
			dataType : "Json",
			data : {
				notiIdx,
				isNotView
			},
			async: false,
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success:function(data){ 
					 	 
			},
			error:function(x,e){ 
			}
	});
}
// 신년인사 안뜨도록 주석처리
//function newYearPopup()
//{
//	const popup = $("#newYearPopUp-form");
// 
// 	
// 	// 다이얼로그 알람 레이아웃
//	const dialogPrint2 = popup.dialog({ 
//	    autoOpen: false,
//	    height: 800,
//	    width: 550,   
//		close : (event)=>{ //알람 닫기 버튼 이벤트
// 
//		} ,
//		draggable  :false,
//	 	resizable  :false, 
//	 	buttons:{ 
//			'다시안보기':()=>{ 
//				setCookie("newYearPopup",true,7)
//				dialogPrint2.dialog("close");
//			},
//			'닫기':()=>{ 
//				setCookie("newYearPopup",true,1)
//				dialogPrint2.dialog("close");
//			}	
//		},   
//	  });
//	  dialogPrint2.dialog( "open" );
//	  
//}
//if(!getCookie("newYearPopup"))
//{
//	newYearPopup();
//}   