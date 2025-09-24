
//$(function(){
// 
//	var menuAuthArr = $("#menuAuthArr").val();
//    
//    //:-a001:YY-a002:YN-a003:NY-a004:YN-a005:YN-b001:NN-b002:YN-b003:YN
//    var menuAuthSplit = menuAuthArr.split("-");
//    
//    $(".nav-dep-1").addClass('disabled');
//    $(".nav-dep-2").addClass('disabled');
//    $(".nav-dep-3").addClass('disabled');
//    
//    for(var i=0;i<menuAuthSplit.length;i++){
//	    menuAuth = menuAuthSplit[i];
//	    menuSplit = menuAuth.split(":");
//	    
//	    //240920 yoonsang 그린파츠에서만 보여야하는 메뉴 P에서 안보이도록 처리
//	    if(lcd == 'ㄱ000' && menuSplit[0] == 'JE005' ){
//			continue;
//		}
//		if(lcd == 'ㄱ000' && menuSplit[0] == 'JG007' ){
//			continue;
//		}
//		if(lcd == 'ㄱ000' && menuSplit[0] == 'JG008' ){
//			continue;
//		}
//	    
//	    for(var j=0;j<menuSplit.length;j++){
//			 //console.log(menuSplit[j]);
//			 menuCode = menuSplit[0];
//			 srchAuth = menuSplit[1].substring(0,1);
//			 editAuth = menuSplit[1].substring(1,2);
//			
//				
//			 
//			 //if (srchAuth=='N') {
//			 //	$("#"+menuCode).addClass('disabled');
//			 //}
//			 if (srchAuth=='Y') {
//				
//				// console.log("id:"+menuCode.substring(0,2)); //nav-dep-2-ID
////				$("#nav-dep-1-"+menuCode.substring(0,1)).removeClass('disabled');
////				$("#nav-dep-2-"+menuCode.substring(0,2)).removeClass('disabled');
////			 	$("#"+menuCode).removeClass('disabled');
//
//				/* 
//				
//					JE005
//					
//					JG007
//					
//					JG008
//				*/
//
//
//				var codeMenu = $("#"+menuCode); // 메뉴 자신
//			 	
//			 	codeMenu.removeClass('disabled'); //자신 활성화
//				
//				
//			 	if(codeMenu.attr('class') == "dropdown-item nav-dep-2") // 네비바 메뉴(뎁스1)의 직속 메뉴
//			 	{
//					codeMenu.parent().parent().parent().parent().children('a').removeClass('disabled'); 
//				}
//			 	else  // 뎁스2 밑의 메뉴
//			 	{
//					codeMenu.parent().parent().children('a').removeClass('disabled'); // 뎁스2 풀어줌
//					codeMenu.parent().parent().parent().parent().parent().parent().children('a').removeClass('disabled'); //뎁스1 풀어줌
//				}
//				
//
//
//
//			 }
//			 
//		}
//	} 
	
    //alert(menuAuthArr);
    //$("#headerCoNameDp").css("color",dpColor);
    //menuSet();
//});

document.addEventListener("DOMContentLoaded", ready)

function ready()
{
	 $("#headerCoNameDp").css("color",dpColor);
    menuSet();
}


function menuSet()
{ 
	const menuList = menuListSet();
	
//	const menuList = JSON.parse(sessionStorage.getItem('menuList')); 
//	const permissionModified = sessionStorage.getItem('permissionModified'); 
//	const comCode = sessionStorage.getItem('comCode'); 
//	try
//	{ 
//		if(!menuList || !permissionModified) // 둘중하나라도 데이터가 비어있다면 예외발생시켜서 갱신후 다시 메뉴셋
//		{
//			throw 'session data null';
//		} 
//		if(comCode != lcd) // 업체변경시
//		{
//			throw 'comCode Change';
//		}
//		getPermissionModified((result)=>{
//			if(permissionModified != result)
//			{
//				throw 'permissionModified update';
//			}
//		})
//	}
//	catch(except)
//	{
//		//console.log(except);
//		
//		//예외발생시 메뉴 갱신하고 새로받기
//		menuListSet(()=>{
//			menuSet();
//		}); 
//		return;
//	}

	let viewMenuList = [];
	
	 
	menuStructureList((r)=>{
		//메뉴유효성이 true면서 메뉴가 권한x비노출이 아니거나 권한을 보유중인 경우로 필터 -> 부모탭,순번으로 정렬 
		viewMenuList = 	r.filter(row=>row.permissionIdx == -1 || (row.valid && (!row.hiddenMenu || menuList.find(menuItem => menuItem.idx == row.permissionIdx)) ) )
						 .sort((a,b)=>a.parentMenuIdx - b.parentMenuIdx  || a.seq - b.seq);
						 
		//필요권한이 존재하는 메뉴거나 탭이라서 하위 메뉴가 존재할경우로 필터 =>권한 보유여부 속성 추가
		viewMenuList = viewMenuList.filter(row=>viewMenuList.filter(r => r.parentMenuIdx == row.idx).length>0 || row.permissionIdx != -1)
								   .map(r=>{return {...r , hasPermission : menuList.find(menuItem => menuItem.idx == r.permissionIdx)}})
						
		let menuArr = [];// viewMenuList.filter(r=>r.parentMenuIdx ==0);
		let menuSeqInfo = {}; // key parentMenuIdx , value seq
		viewMenuList.forEach((row)=>{
			if(row.parentMenuIdx == 0) menuArr.push(row);
			else
			{
				const seq = menuSeqInfo[row.parentMenuIdx] || 1;
				menuSeqInfo[row.parentMenuIdx] = seq+1;
				const index = menuArr.findIndex(r=>r.idx == row.parentMenuIdx)+seq ;
				menuArr.splice(index,0,row)
			}
		})
		
		let curRoot = '';
		let curTab = '';
		
		let tag = '';
		
		const rootMenu = [];
		
		//배열을 html태그 문자열로 변형
		menuArr.forEach((row)=>{
			//root의 경우 최상위 탭
			if(row.parentMenuIdx == 0)
			{
				//현재 root가 있는데 새로운 root 들어오면 기존 root 태그열린부분 닫아줌
				if(curRoot != '') 
				{
					tag+=`			</div>                     
			              		</div>
			           		</div>
			      		</li>`;
				}
				
				tag += `<li class="nav-item dropdown">
            				<a class="nav-link dropdown-toggle nav-dep-1 rootMenu${row.idx}" id="nav-dep-1" href="#navbar-extra" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false" >              
              					<span class="nav-link-title">
               						${row.menuName}
              					</span>
            				</a>
            				<div class="dropdown-menu">
              					<div class="dropdown-menu-columns">              
                					<div class="dropdown-menu-column">`;
                curRoot = row.idx;
                rootMenu.push(row);
			}
			//필요권한 없을경우 하위탭 존재로 간주
			else if(row.permissionIdx == -1)
			{
				//탭이 이미 있는 상태에서 새로운 탭이 들어오면 기존 탭 캐드 닫아줌
				if(curTab != '')
				{
					tag+=`</div>
							</div> `;
				}
				
				//자신의 자식중 활성화가 1개라도 있는지
				row.hasPermission = menuArr.find(r=>r.parentMenuIdx == row.idx && r.hasPermission);
				
				tag+= `<div class="dropend">
		                  	<a class="dropdown-item dropdown-toggle nav-dep-2 ${row.hasPermission?'':'disabled'}"   id="nav-dep-2" href="#sidebar-cards" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false" >
		                      ${row.menuName}
		                    </a>
		                    <div class="dropdown-menu">`;
		        curTab = row.idx;
			}
			else 
			{
				//열려있는 탭과 메뉴의 부모가 다를경우 메뉴가 탭의 소속이 아니므로 열려있던 탭을 닫아주고 현재 탭지정을 ''으로 초기화
				if(curTab != '' && row.parentMenuIdx != curTab)
				{
					tag+=`	</div>
						  </div>`;
					curTab = '';
				} 
				tag+=`<a href="${row.url}" class="dropdown-item nav-dep-3 ${row.hasPermission?'':'disabled'}">${row.menuName}</a>`;
			}
			
		})
		$("#menuRoot").append(tag);
		
		//태그 생성후 root의 하위가 모두 비활성화이거나 root의 하위가 권한미보유시 비노출인데 모두 권한이 없어서 자식이 0개인경우 
		rootMenu.forEach(row=>{
			//루트의 자식이 권한 미보유 숨김이라 자식 태그가 아에 없을경우 루트메뉴도 삭제
			if(menuArr.find(r=>r.parentMenuIdx == row.idx ) == null)
				$(`.rootMenu${row.idx}`).remove();
			//자식은 있는데 권한이 없을경우 비활성화
			else if(menuArr.find(r=>r.parentMenuIdx == row.idx && r.hasPermission) == null)
				$(`.rootMenu${row.idx}`).addClass('disabled');
		})
	}) 
	
  
//	$(".nav-dep-1").addClass('disabled');
//	$(".nav-dep-2").addClass('disabled');
//	$(".nav-dep-3").addClass('disabled');
//					
//	for(item of menuList)
//	{
//		menuCode = item.code;
//		var codeMenu = $("#"+menuCode); // 메뉴 자신
//		 	
//		codeMenu.removeClass('disabled'); //자신 활성화
//								
//		if(codeMenu.attr('class') == "dropdown-item nav-dep-2") // 네비바 메뉴(뎁스1)의 직속 메뉴
//		{
//			codeMenu.parent().parent().parent().parent().children('a').removeClass('disabled'); 
//		}
//		else  // 뎁스2 밑의 메뉴
//		{
//			codeMenu.parent().parent().children('a').removeClass('disabled'); // 뎁스2 풀어줌
//			codeMenu.parent().parent().parent().parent().parent().parent().children('a').removeClass('disabled'); //뎁스1 풀어줌
//		}
//	}
//	hiddenMenuCodeList((result)=>{
//		for(code of result)
//		{
//			$(`#${code}`).remove(); // 숨김처리된 태그 삭제
//		}
//		
//		//뎁스2메뉴중에 자식이 모두 메뉴숨김인 경우 뎁스2탭도 숨김
//		$('.dropdown-item.dropdown-toggle.nav-dep-2.disabled').each(function (index , item) { 
//		    const dep2 = $(item);
//		     
//		    if(dep2.parent().children('.dropdown-menu').children('.dropdown-item.nav-dep-3').length == 0)
//		    {
//				dep2.remove();		
//			}	 
//		})
//		//루트메뉴
//		$('li.nav-item.dropdown').each(function (index , item) { 
//		    const rootMenu = $(item);
//		 //   console.log(item)
//		  //  console.log(rootMenu.children('.dropdown-menu').children('.dropdown-menu-columns').children('.dropdown-menu-column').children('.dropdown-item.nav-dep-2,.dropdown-item.nav-dep-2,.dropend>dropdown-menu>dropdown-item.nav-dep-3').length); 
//		    if(rootMenu.children('.dropdown-menu').children('.dropdown-menu-columns').children('.dropdown-menu-column').children('.dropdown-item.nav-dep-2,.dropdown-item.nav-dep-2,.dropend>.dropdown-menu>.dropdown-item.nav-dep-3').length == 0)
//		    {
//			//	rootMenu.remove();		
//			}	 
//		}) 
//	});
}

//현재 계정으로 권한에 맞는 메뉴 리스트 갱신
function menuListSet(fun=()=>{})
{
//	menuList((menuList)=>{
//		console.log(menuList);
//		sessionStorage.setItem('menuList' , JSON.stringify(menuList));
//		getPermissionModified((permissionModified)=>{
//			sessionStorage.setItem('permissionModified',permissionModified);
//			sessionStorage.setItem('comCode',lcd);
//			fun();
//		})
//	})

	let menuListObject ;
	menuList((result)=>{
		menuListObject = result; 
		 
	}) 
	return menuListObject;
}
 
function menuStructureList(fun = ()=>{})
{
	$.ajax(	{
				type : "POST",
				url : '/base/menuStructureList',
				dataType : "json", 
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){ 
				//	console.log('메뉴구조가져오기'); 
					fun(result);
				},
				error:function(x,e){
					 
				}
	}); 
} 
function menuList(fun = ()=>{})
{
	$.ajax(	{
				type : "POST",
				url : '/base/menuViewList',
				dataType : "json", 
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){ 
				//	console.log('메뉴조회통신'); 
					fun(result);
				},
				error:function(x,e){
					 
				}
	}); 
} 
function getPermissionModified(fun=()=>{})
{ 
 
	$.ajax(	{
				type : "POST",
				url : '/base/getPermissionModified',
				dataType : "json", 
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){ 
				//	console.log('권한변경일자 조회통신');
					fun(result);
				},
				error:function(x,e){
				}
	});  
}
//function hiddenMenuCodeList(fun=()=>{})
//{ 
//	$.ajax(	{
//				type : "POST",
//				url : '/base/hiddenMenuCodeList',
//				dataType : "json", 
//				async: false,
//				contentType: "application/json; charset=utf-8",
//				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
//				success:function(result){  
//					fun(result);
//				},
//				error:function(x,e){
//					 
//				}
//	});  
//}

//function isErpOperateTest()
//{
//	$.ajax(	{
//				type : "POST",
//				url : '/base/isErpOperate',
//				dataType : "json", 
//				async: false,
//				contentType: "application/json; charset=utf-8",
//				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
//				success:function(result){  
//					console.log('erp 오퍼체크통신');
//				},
//				error:function(x,e){
//					 
//				}
//			});  
//	
//	
//}


//버그리폿 함수
// bugReport() , bugReport({title :'test'}) , bugReport({title :'test' , content:'내용'})등으로 사용
//사용시 _bugReport 테이블에 호출한 유저의 업체, id, 호출시간, 호출url , 매개변수로 넣은 제목과 내용등이 저장됨 
//다른 ajax 통신에서 실패하거나 모니터링중인 통신 실패일때 매개변수를 직렬화 시켜서 content 넣으면 추적하기 편할듯
function bugReport(params= {})
{ 
 	const {title = '', content = ''} = params;
	$.ajax(	{
				type : "POST",
				url : '/base/bugReport',
				dataType : "json", 
				async: false,
				data : {
					title , 
					content
				}, 
				contentType : "application/x-www-form-urlencoded;charset=UTF-8"
	});  
}