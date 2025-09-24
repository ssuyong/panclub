// 알림 레이어팝업 많아져서 일단 따로 분리하기 위한 js파일

//팝업의 현재 상태 및 데이터 관리용변수
const noticeList = {};
//열린팝업수 
let openPopup = 0;
//바로직전에 열린 팝업 object;
let openPopupList = [];
/**
알림팝업을 생성하는 함수 생성후 리스트에 id를 키로 저장함
예) noticePopupGen({popupId:'aa',title:'test',preText:'<h1>앞메세지</h1>',postText:'뒤 메세지' , imgName:"orderPopup_800_425.png" , imgWidth:"800",imgHeight:"425"});
 */
function noticePopupGen(noticeData)
{ 
	const {popupId,title , preText , postText , imgName,imgWidth,imgHeight , mapUrl ,mapWidth , mapHeight , isWeekCheckbox = false , fileImg ,fileUploadComCode} = noticeData;
	if(noticeList[popupId])
	{
		delete noticeList[popupId];  //팝업id존재시 해당 팝업id삭제후 다시 생성
		//alert("이미 팝업ID가 존재합니다");
		//return;
	}
	const mainBody =  $("body");
	const imgTag = (imgName||'')!=''?`<img src="${fileRootUrl}${fileUploadComCode}/popupImg/${imgName}" width=${imgWidth} height=${imgHeight}/><br>`:'';
	const mapTag = (mapUrl||'')!=''?`<iframe width=${mapWidth} height=${mapHeight} id="gmap_canvas" src="${mapUrl}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><br>`:'';
	const checkBoxTag = isWeekCheckbox?`<label>일주일 팝업 다시 보지 않기</label><input id="isWeekNopen_${popupId}" type="checkbox" />`:'';
	const noticePopupTag =
		`<div id=noticPopupId_${popupId} title="${title}" style="display:none;">
			${preText || ''}
 			${imgTag}
 			${fileImg!=null?`<img src="${fileImg}" width=${imgWidth} height=${imgHeight}/><br>` :''}
 			${mapTag}
			${postText || ''}
			<div align="center" style="padding: 10px 0px">
				${checkBoxTag}
				<button class ="btn btn-primary" onclick="$('#noticPopupId_${popupId}').dialog('close')" >닫기</button>
			</div>
		</div>`
	mainBody.append(noticePopupTag);
	
	noticeList[popupId]=noticeData;
}
/**
생성된 알림팝업의 아이디와 팝업크기를 매개변수로 받아서 팝업을 열어주는 함수 

예)noticePopupOpen('aa',800,600)
 */

function noticePopupOpen(openData)
{ 
	const {popupId,w,h , parent = null, position = null, isModal = true} = openData;
	if(!noticeList[popupId])
	{
		alert("팝업ID가 존재하지 않습니다");
		return;
	}
	if(noticeList[popupId]?.isOpen)
	{
		alert("팝업이 이미 열려있습니다");
		return;
	}
	
	const pos = ((parent==null) ? { my: "center", at: "center", of: window } : 
									(position||'left') == 'left' ?  { my: "right", at: "left", of: parent } : { my: "left", at: "right", of: parent });

	const dialogPrint = $(`#noticPopupId_${popupId}`).dialog({
	    autoOpen: false,
	    height: h, 
	    width: w,
	    modal: isModal,
	    position : pos,
	    open:()=>{dialogPrint.scrollTop(0)} ,
	    close:()=>{noticePopupClose(popupId);}
	  });
	  $(`#noticPopupId_${popupId}`).dialog().parent().children(".ui-dialog-titlebar").children(".ui-dialog-titlebar-close").hide();
	  dialogPrint.dialog( "open" );
	  
	noticeList[popupId] = {...noticeList[popupId],isOpen : true};
	openPopup++;
	openPopupList.push(dialogPrint);
	
	return dialogPrint;
}
/**
	팝업을 닫는 함수
 */
function noticePopupClose(popupId)
{
	if(!noticeList[popupId])
	{
		alert("팝업ID가 존재하지 않습니다");
		return;
	}
	if(!noticeList[popupId]?.isOpen)
	{
		alert("팝업이 열려있지 않습니다");
		return;
	}
	
	noticeList[popupId].isOpen = false;
	openPopup--;
	openPopupList = openPopupList.filter((popup)=>popup.prop('id')!=`noticPopupId_${popupId}`);
	
	
	//일주일 안보기 체크되어있으면 쿠키로 1주일 등록
	if($(`#isWeekNopen_${popupId}`).prop('checked'))
	{
		setCookieWeekNPopup(popupId);
	}
}
/**
	팝업이 다이얼로그로 변환되어 있으면 풀어주고 
	팝업 태그와 리스트에 저장된 정보를 삭제하는 함수
 */
function noticePopupDestroy(popupId)
{
	if(!noticeList[popupId])
	{
		alert("팝업ID가 존재하지 않습니다");
		return;
	}
	if(noticeList[popupId].isOpen)
	{
		openPopup--;
		openPopupList = openPopupList.filter((popup)=>popup!=$(`#noticPopupId_${popupId}`));
	} 
	if(noticeList[popupId].isOpen !=null) 
		$(`#noticPopupId_${popupId}`).dialog('destroy');
	$(`#noticPopupId_${popupId}`).remove();
	delete noticeList[popupId];
} 

/**
	서버와 통신해서 팝업데이터 셋팅 현재는 등록및 조회가 없어서 그냥 하드코딩으로 생성
 */
//function popupDataFind()
//{
//	//이후 서버에 등록 및 조회하게 되면 여기서 구현
//	noticePopupGen({popupId:'barndSaleRate',
//					title:'브랜드별 할인율',
//					preText:`<p style="font-size: 15px">부품 구매 시 가격기준은 아래와 같습니다.</p>`,
//					imgName:`sale_brand_dc_rate_20231124.png`,
//					imgWidth:287,
//					imgHeight:523,
//					isWeekCheckbox:true
//					});
//	noticePopupGen({popupId:'deadlineTimeChange',
//					title:'[공지]마감 및 픽업시간 변경안내',
//					preText:`<label style="font-size: 16px; margin-top: 7px; margin-bottom: 12px">아래와 같이 마감 및 픽업시간이 변경되었습니다.</label>`,
//					imgName:`2024-06-03.png`,
//					imgWidth:440,
//					imgHeight:90,
//					isWeekCheckbox:true
//					});
//	noticePopupGen({popupId:'logisChangeSeongsu',
//					title:'[공지]성수 수령방문처 위치 변경 안내',
//					preText:`<label style="font-size: 16px; margin-top: 7px; margin-bottom: 12px"><b>성수 수령방문처 위치 변경 안내</b><br><br>6월 7일 오후 주문건 부터 성수 수령처가 <b>군자동</b>으로 변경 되오니<br>아래 지도 참조하여 업무에 참고 부탁 드립니다.</label>`,
//					mapUrl:`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.83676361525!2d127.07383619999999!3d37.5589095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4d2c85cf071%3A0x64b1dd6230a366b2!2z7ISc7Jq47Yq567OE7IucIOq0keynhOq1rCDrj5nsnbzroZwgMzEy!5e0!3m2!1sko!2skr!4v1717724640844!5m2!1sko!2skr`,
//					mapWidth : 576,
//					mapHeight: 500,
//					isWeekCheckbox:true
//					});
//	noticePopupGen({popupId:'pcctGuide',
//					title:'주문요청과 회수요청 방법',
//					imgName:`orderPopup_800_425.png`,
//					imgWidth:800,
//					imgHeight:425
//					});
//	noticePopupGen({popupId:'monthlySettlement',
//					title:'[공지]그린파츠 월 정산 기간안내',
//					imgName:`20240624.jpg`,
//					imgWidth:730,
//					imgHeight:487,
//					isWeekCheckbox:true
//					});
//} 

// 팝업데이터 불러오는 함수 콜백함수와 파라미터 객체를 매개변수로 호출
function popupDataFind(fun = ()=>{}, params = {})
{
	$.ajax(	{
		type : "POST",
		url : '/base/popupList',
		
		data: params,
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){
            fun(result);
        }
	}) 
}

//팝업아이디로 1주일 유효기간 발행하는 함수
function setCookieWeekNPopup(popupId) {
	const date = new Date(); 
	date.setTime(date.getTime() +604800000);  // 604800000 = 1주일
	document.cookie = popupId+'=true'  + ';expires=' + date.toUTCString() + ';path=/'; 
		
} 
//팝업아이디로 존재유무 검사
function checkCookiePopup(popupId)
{ 
	const value = document.cookie.match('(^|;) ?' + popupId + '=([^;]*)(;|$)');
    return value? value[2] : false;
}

//페이지 열리자마자 열리는 팝업
//function startPopupOpen(popupId , w,h)
//{
//	if(checkCookiePopup(popupId)) return;
//	
//	//중앙 > 중앙의 왼쪽 > 중앙의 오른쪽 순으로 열림
//	pos = {0:'null', 1:'left',2:'right'};
//	parent = openPopupList.length==0 ? null : openPopupList[0]; 
//	noticePopupOpen({popupId,w,h ,parent , position :pos[openPopup] ,isModal:true});
// 
//}


$(document).ready(function(){
 
 	const pathName = location.pathname;
 	
 	 
	//서버에 현재 자신의 url을 매개변수로 팝업 조회 있을경우 생성해서 리스트에 등록
 	popupDataFind((result)=>{
		const popupMaxCount = result.length; // 통신으로 받아온 현재 페이지에서의 팝업 갯수
		let popupCurCount = 0;
		for(const noticeInfo of result)  // 통신으로 받아온 팝업 생성
		{ 
			if(noticeInfo.imgFileName)
			{
				const fileUploadComCode = noticeInfo.fileUploadComCode;
				// 이미지 로딩해서 이미지 크기 받아옴
				getImgWH( `${fileRootUrl}${fileUploadComCode}/popupImg/${noticeInfo.imgFileName}` ,  
							({width,height})=>{
											//팝업 생성
											noticePopupGen({ ... noticeInfo , 
																popupId : `popup_${noticeInfo.idx}` ,
																imgName : noticeInfo.imgFileName ,
																imgWidth : width * noticeInfo.imgMag, 
																imgHeight : height * noticeInfo.imgMag,
																isWeekCheckbox : noticeInfo.isWeekCheckboxYN == 'Y'
								 			 })
								 			 popupCurCount++;
								 			 //모든 팝업이 생성되면 페이지가 열릴떄 여는 팝업을 열어줌
								 			 if(popupMaxCount == popupCurCount) {
												pageOpenPopupOpen();
											}
							})
			}
			else if(noticeInfo.title)
			{
				noticePopupGen({ ... noticeInfo , popupId : `popup_${noticeInfo.idx}` , 
									isWeekCheckbox : noticeInfo.isWeekCheckboxYN == 'Y'
								 })
				popupCurCount++;
								 			 
				//모든 팝업이 생성되면 페이지가 열릴떄 여는 팝업을 열어줌
				if(popupMaxCount == popupCurCount) pageOpenPopupOpen();
			}
		 
		} 
		
		
	},{menuUrl:pathName})
 	
 	
 	
 	
 	
 	
 	/*
 	
 	if(pathName == '/logis/out-stock-bulk-list') //4car재고조회
 	{
		popupDataFind();
		 
		startPopupOpen('barndSaleRate', 330,670);
		startPopupOpen('deadlineTimeChange',460,230);
	//	startPopupOpen('logisChangeSeongsu', 600,710);
		startPopupOpen('monthlySettlement', 750,585);
		for(obj of openPopupList) //반복문 돌면서 zindex 동기화
		{
			obj.parent().css('z-index', 9999);  
			obj.parent().css('opacity', 1);  
		}
	
	}
	else if(pathName == '/biz/closeTask') // 마감경과 작업조회
	{
 
		noticePopupGen({popupId:'closeTask',
					title:'마감업무정리',
					imgName:`20240729.png`,
					imgWidth:1708,
					imgHeight:2003,
					isWeekCheckbox:false
					});				
					 
	}
	
	*/
	
	 
	
})


//서버에 저장된 이미지 파일의 url을 호출하면 해당 이미지 너비와 높이를 매개변수로 콜백함수가 호출됨 테스트중
//getImgWH( `https://img.4car.co.kr/%E3%84%B1000/notice/${imgFileName}` , ({width,height})=>{console.log({width , height})})
function getImgWH(url , callback)
{
	const img = new Image();
	img.src = url;
	img.onload = function(){  
		callback({img ,width:img.width , height:img.height});
  	} 
}

//페이지가 열릴때 팝업데이터를 다 받은후 이 함수를 통해 isOpenPopupYN이 y인 팝업들을 우선순위 순서대로 열어줌
function pageOpenPopupOpen()
{	
	console.log("check1");
	const noticeListKeys = Object.keys(noticeList).sort((a,b)=>noticeList[b].priority - noticeList[a].priority); //우선도가 높은순으로 정렬
	for(key of noticeListKeys)
	{
	    const noticeInfo = noticeList[key]
	    const popupId = `popup_${noticeInfo.idx}`
	    if(noticeInfo.isOpenPopupYN == 'N') continue; // 페이지 오픈시 열리는 팝업이 아니면 패스
	    if(checkCookiePopup(popupId)) continue;
	    
	    const pos = {0:'null', 1:'left',2:'right'};
		const parent = openPopupList.length==0 ? null : openPopupList[0]; 
	    
	    
	    noticePopupOpen({popupId   , w : noticeInfo.width , h: noticeInfo.height , parent ,  position :pos[openPopup] , isModal : noticeInfo.isModalYN =='Y'  })
	      
	}
	for(obj of openPopupList) //반복문 돌면서 zindex 동기화
	{
		obj.parent().css('z-index', 9999);  
		obj.parent().css('opacity', 1);  
	}
}

//popupName 넣으면 열어줌
function simplePopupOpen_PopupName(popupName)
{
	console.log("check2");
	const key = Object.keys(noticeList).find((key)=>noticeList[key].popupName == popupName);  //팝업이름이 맞는 키를 가져옴
	const noticeInfo = noticeList[key];  //팝업 정보 가져옴
	console.log(noticeInfo);
	noticePopupOpen({popupId:`popup_${noticeInfo?.idx}`,w: noticeInfo?.width ,h: noticeInfo?.height, isModal : noticeInfo.isModalYN =='Y'  });
}
//팝업 idx만 넣으면 열어줌
function simplePopupOpen_IDX(idx)
{
	console.log("check3");
	const noticeInfo = noticeList[`popup_${idx}`];  //팝업 정보 가져옴
	noticePopupOpen({popupId:`popup_${noticeInfo?.idx}`,w: noticeInfo?.width ,h: noticeInfo?.height, isModal : noticeInfo.isModalYN =='Y'  });
}
