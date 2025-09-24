const setTimeoutDelay = 100; 

const TAB_LIST = { 
					 'TAB_TEMPLATE' :{
						index : 1   ,
						leftGridID : '#grid_wrap_template' ,
						rightGridID : '#grid_wrap_templatePermission',
						selectTextId : '#selectTemplate',
						leftFind : ()=>{
							createAUIGrid_template();
							permissionTemplateListfind(); 
						},
						dataUpdate :()=>{
							templateListAdd();
						},
						rightFind : (templateIdx)=>{
							permissionTemplateDetailfind(templateIdx);
						}
					  },
					 'TAB_USER' : {
						index : 2 ,
						leftGridID : '#grid_wrap_user' ,
						rightGridID : '#grid_wrap_userPermission',
						selectTextId : '#selectUser',
						templateClassName : '.templateSelect.userTemplate' ,
						leftFind : ()=>{
							createAUIGrid_user();
							permissionUserList();
							permissionTemplateOption(); 
						},
						dataUpdate :()=>{
							permissionUserSet();
						},
						rightFind : (targetUserId)=>{
							permissionUserDetail(targetUserId);
						}
					  },
					 'TAB_PERMISSION_USER' : {
						index : 3 , 
						leftGridID : '#grid_wrap_pu' ,
						rightGridID : '#grid_wrap_puPermission',
						selectTextId : '#selectPu',
						leftFind : ()=>{
							createAUIGrid_pu();
							permissionListfind(); 
						},
						dataUpdate :()=>{
							permissionPuSet();
						},
						rightFind : (permissionIdx)=>{
							permissionUserList(permissionIdx);
						}
					}
				}
const TAB_KEY = Object.keys(TAB_LIST);
//현재 열려있는 탭 인덱스 가져오기
function getTabIndex()
{
	return $(".permissionTab.show").attr('id').replace('tab','');
}
//현재 탭 이름 가져오기
function getTabName()
{
	return TAB_KEY.find(row=>TAB_LIST[row].index == getTabIndex());
}
//현재 탭의 왼쪽 그리드 아이디 가져오기
function getTabLeftGridId()
{
	return TAB_LIST[getTabName()].leftGridID;
}
//현재 탭의 오른쪽 그리드 아이디 가져오기
function getTabRightGridId()
{
	return TAB_LIST[getTabName()].rightGridID;
}
//현재 탭의 오른쪽 그리드 아이디 가져오기
function getSelectTextId()
{
	return TAB_LIST[getTabName()].selectTextId;
}
function getTemplateClassName()
{   
	return TAB_LIST[getTabName()].templateClassName || '';
}
function TabLeftFind()
{ 
	TAB_LIST[getTabName()].leftFind();
}
function TabRightFind(params)
{ 
	TAB_LIST[getTabName()].rightFind(params);
}
function TabRightGridClear()
{
	const rightGridId = getTabRightGridId();
	if(rightGridId != null)
	{
		const selectText  = $(getSelectTextId());
		selectText.text('없음');
		AUIGrid.resize(rightGridId);
		AUIGrid.clearGridData(rightGridId);
	}
}
function TabDataUpdate()
{
	TAB_LIST[getTabName()].dataUpdate();
}

 
$(document).ready(function() {
	createAUIGrid_template();
	TabLeftFind();
	
	$(".tabSelecter").click(function() {
		
		//탭변경
		const selecterId = $(this).attr('id');
		$('.permissionTab').hide();
		$(`#${selecterId.substr(0,4)}`).show();
		
		//메인 그리드 조회
		TabLeftFind();
		//서브그리드 초기화
		TabRightGridClear();

	});
	 
})
 
//저장버튼 이벤트
function btnSave()
{ 
	if(confirm('저장하시겠습니까?'))
		TabDataUpdate();
}

const auiGridProps = {			
			editable : true,	
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			showPageRowSelect: true, 
			
			selectionMode : "multipleCells",
			showRowCheckColumn: false,
			
			// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
			rowIdField : "idx",
			
}; 

//그리드 셋팅-템플릿
function createAUIGrid_template() {
	
	if(TAB_LIST.TAB_TEMPLATE.GridGen) return; 
	 
	const templateColumnLayout = [
		{ dataField : "idx",    headerText : "idx" , width:40 , visible : false} 
		,{ dataField : "name",   headerText : "템플릿명", width : 160} 
		,{ dataField : "permissionCount",   headerText : "권한수", width : 60, style : "right",editable: false } 
		,{ dataField : "memo",   headerText : "메모", width : 350, style : "left" } 
		
		
	];
	const templatePermissionColumnLayout = [
		{ dataField : "idx",    headerText : "idx", visible : false} 
		,{ dataField : "code",    headerText : "권한코드", width : 80,editable: false} 
		,{ dataField : "name",   headerText : "권한명", width : 160,editable: false} 
		,{ dataField: "valid", headerText: "유효",
			style: "aui-grid-user-custom",
			width: 60,
			renderer: {
				type: "CheckBoxEditRenderer",
				editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			}
		}
		,{ dataField : "type",   headerText : "권한타입", width : 80,editable: false} 
		,{ dataField : "url",   headerText : "URL", width : 200, style : "left" ,editable: false}
		,{ dataField : "memo",   headerText : "메모", width : 400, style : "left" ,editable: false}
		
	];
	 
     //템플릿설정 그리드	
	 AUIGrid.create( TAB_LIST.TAB_TEMPLATE.leftGridID , templateColumnLayout, auiGridProps);
	 AUIGrid.create( TAB_LIST.TAB_TEMPLATE.rightGridID , templatePermissionColumnLayout, auiGridProps);
	 
	
	AUIGrid.bind( TAB_LIST.TAB_TEMPLATE.leftGridID , "cellClick", (event)=>{
		if(isNaN(event.item.idx))
		{
			$(getSelectTextId()).text('없음');
			AUIGrid.clearGridData(TAB_LIST.TAB_TEMPLATE.rightGridID);
			return;
		}
		$(getSelectTextId()).text(event.item.name);
		TAB_LIST.TAB_TEMPLATE.rightFind(event.item.idx);
	});
	
	TAB_LIST.TAB_TEMPLATE.GridGen = true;
}

//그리드 셋팅 - 사용자별 권한
function createAUIGrid_user() {
	
	if(TAB_LIST.TAB_USER.GridGen) return;
 
	const custPermissionColumnLayout = [
		{ dataField : "idx",    headerText : "idx", visible : false} 
		,{ dataField : "code",    headerText : "권한코드", width : 80,editable: false} 
		,{ dataField : "name",   headerText : "권한명", width : 160,editable: false} 
		,{ dataField : "templateValid",   headerText : "템플릿기본값",
			style: "aui-grid-user-custom",
			width: 80,
			renderer: {
				type: "CheckBoxEditRenderer",
				editable: false, // 체크박스 편집 활성화 여부(기본값 : false)
			}} 
		,{ dataField: "valid", headerText: "유효",
			style: "aui-grid-user-custom",
			width: 60,
			renderer: {
				type: "CheckBoxEditRenderer",
				editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			}
		}
		,{ dataField : "type",   headerText : "권한타입", width : 80,editable: false} 
		,{ dataField : "url",   headerText : "URL", width : 200, style : "left" ,editable: false}
		,{ dataField : "memo",   headerText : "메모", width : 400, style : "left" ,editable: false}
		
	];
	const userColumnLayout = [
		{ dataField : "userId",    headerText : "사용자ID",width : 150 , editable: false} 
		,{ dataField : "userName",    headerText : "사용자이름", width : 150,editable: false} 
		,{ dataField : "templateName",   headerText : "템플릿명", width : 120,editable: false} 
		,{ dataField : "permissionCount",   headerText : "보유권한수", width : 70,editable: false} 
 
		
	];
	


	 //사용자별권한 그리드
	 AUIGrid.create( TAB_LIST.TAB_USER.leftGridID , userColumnLayout, {...auiGridProps , rowIdField : 'userId'});
	 AUIGrid.create( TAB_LIST.TAB_USER.rightGridID ,custPermissionColumnLayout, auiGridProps);
	 
	

	AUIGrid.bind(TAB_LIST.TAB_USER.leftGridID, "cellClick", (event)=>{
	 
		$(getSelectTextId()).text(`${event.item.userName}[${event.item.userId}]`);
		permissionUserDetail(event.item.userId);
		const templateSelectClassName = getTemplateClassName();  
		if(event.item.templateIdx  == 0 || event.item.templateIdx == null)
			$(`${templateSelectClassName} option[id=templateIdx]`).prop("selected", true);
		else
			$(`${templateSelectClassName} option[id=templateIdx${event.item.templateIdx}]`).prop("selected", true);
	});
	
	TAB_LIST.TAB_USER.GridGen = true;

}
//그리드 셋팅 - 권한별 사용자
function createAUIGrid_pu() {
	
	if(TAB_LIST.TAB_PERMISSION_USER.GridGen) return;
 
	const puColumnLayout = [
		{ dataField : "idx",    headerText : "idx", visible : false} 
		,{ dataField : "code",    headerText : "권한코드", width : 80} 
		,{ dataField : "name",   headerText : "권한명", width : 160} 
		,{ dataField : "type",   headerText : "권한타입", width : 60} 
		,{ dataField : "puCount",   headerText : "보유권한유저수", width : 100} 
		,{ dataField : "url",   headerText : "URL", width : 200, style : "left", visible : false }  
		,{ dataField : "memo",   headerText : "메모", width : 400, style : "left" } 
		
	]

	const puDetailColumnLayout = [ 
		{ dataField : "userId",    headerText : "사용자ID", width : 120} 
		,{ dataField : "userName",   headerText : "사용자이름", width : 200}  
		,{ dataField: "valid", headerText: "유효",
			style: "aui-grid-user-custom",
			width: 60,
			renderer: {
				type: "CheckBoxEditRenderer",
				editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			}
		} 
		
	];
	

	 //권한별사용자 그리드
	 AUIGrid.create( TAB_LIST.TAB_PERMISSION_USER.leftGridID , puColumnLayout, auiGridProps);
	 AUIGrid.create( TAB_LIST.TAB_PERMISSION_USER.rightGridID , puDetailColumnLayout, {...auiGridProps , rowIdField : 'userId'});



	AUIGrid.bind(TAB_LIST.TAB_PERMISSION_USER.leftGridID , "cellClick", (event)=>{
		const selectPu = $(getSelectTextId());
		selectPu.text(event.item.name);
		selectPu.attr('index' , event.item.idx);
		permissionUserList(event.item.idx);
	});
	
	TAB_LIST.TAB_PERMISSION_USER.GridGen = true;
}

//js내 ajax 많아서 에러코드 따로 뻄
const errFun = (x,e)=>{
	if(x.status==0){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
	        }else if(x.status==404){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
	        }else if(x.status==500){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
	        }else if(e=='parsererror'){
	            alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
	        }else if(e=='timeout'){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
	        }else {
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
	    	}
}



/*********************************************권한 템플릿 설정***********************************/

//권한 템플릿 조회
function permissionTemplateListfind()
{
	$.ajax(	{
		type : "POST",
		url : '/base/permission-template-list',
		dataType : "json",
		data: {},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){  
		 	AUIGrid.setGridData(TAB_LIST.TAB_TEMPLATE.leftGridID , result.filter(r=>r.templateType=='user'));
			AUIGrid.resize(TAB_LIST.TAB_TEMPLATE.leftGridID);
		},
		error:function(x,e){
			errFun(x,e);
		}
	});
}
//권한 템플릿이 가진 권한
function permissionTemplateDetailfind(idx)
{
	$.ajax(	{
		type : "POST",
		url : '/base/permission-template-detail',
		dataType : "json",
		data: {idx},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){   
			const resultData = result.map(row=>{return {...row  , templateIdx : idx}}).sort((a,b)=>a.idx-b.idx);
			
		 	AUIGrid.setGridData(TAB_LIST.TAB_TEMPLATE.rightGridID , resultData);
			AUIGrid.resize(TAB_LIST.TAB_TEMPLATE.rightGridID);
		},
		error:function(x,e){
			errFun(x,e);
		}
	});	
}
//탬플릿 추가삭제 및 권한 수정
function templateListAdd()
{
	const dataArr = [
					...AUIGrid.getAddedRowItems(TAB_LIST.TAB_TEMPLATE.leftGridID).map((row)=>{return {template:{...row , idx :-1  , templateType : 'user'} , workingType : 'ADD'}}) , 
				 	...AUIGrid.getEditedRowItems(TAB_LIST.TAB_TEMPLATE.leftGridID).map((row)=>{return {template:{...row , templateType : 'user'} , workingType : 'EDITE'}}) , 
				  	...AUIGrid.getRemovedItems(TAB_LIST.TAB_TEMPLATE.leftGridID).map((row)=>{return {template:{idx : row.idx} , workingType : 'REMOVE'}})
				 ]; 
	
	//템플릿의 변경하려는 권한 
	const changePermissionList = AUIGrid.getEditedRowItems(TAB_LIST.TAB_TEMPLATE.rightGridID).map((row)=>{
																	return {
																			template:{ idx:row.templateIdx , permissionIdx : row.idx , valid : row.valid} 
																			, workingType:'PERMISSION_CHANGE'
																			}
															});
	
	if(changePermissionList.length > 0)
 	{
		const templateIdx = changePermissionList[0].template.idx;
		
		//수정한 디테일의 탬플릿이 삭제된 경우 생략, 삭제되지 않은경우 처리배열에 추가
		const isRemoveIdx = dataArr.find(row=>row.workingType=='REMOVE' && row.template.idx == templateIdx)?true:false;
		if(!isRemoveIdx)
		{
			for(item of changePermissionList)
			{
				dataArr.push(item);
			} 
		}
	}
	
	if(dataArr.length == 0 )
	{
		alert('변경된 내용이 없습니다.');
		return;	
	}	
	 
	const addNullDataChk = dataArr.filter((row)=>(row.workingType=='ADD' || row.workingType=='EDITE') && row.template.name == null )
	if(addNullDataChk.length>0)
	{
		alert(`추가된 템플릿은 이름이 필수입니다`); 
		return;
	}
	  
	ProgressManager.open(dataArr.length);
 	templateAdd(dataArr ,0)
}
//권한설정 - 추가삭제수정 처리
function templateAdd(dataArr , index)
{
	ProgressManager.next();
	
	
	if(dataArr.length > index)
	{
		const data = dataArr[index];
		 
		setTimeout(()=>{
			$.ajax(	{
				type : "POST",
				url : '/base/permission-template-add',
				dataType : "json",
				data  :JSON.stringify(data)  ,
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){ 
					templateAdd(dataArr , index+1)
				},
				error:function(x,e){
					errFun(x,e);
				}
			});  
		} , setTimeoutDelay);
	}
	else
	{	 
		ProgressManager.end('처리성공' , ()=>{
											TAB_LIST.TAB_TEMPLATE.leftFind(); 
											
											//처리중에 디테일 권한 변경 처리가 있을경우 해당 순번으로 디테일 재조회해서 갱신해줌
											const templateDetailIdx = dataArr.find(row=>row.workingType == 'PERMISSION_CHANGE')?.template?.idx; 
											if(templateDetailIdx)
											{
												TAB_LIST.TAB_TEMPLATE.rightFind(templateDetailIdx); 
											}
										});
	}
	
}


//템플릿 selete의 option 태그 생성용
function permissionTemplateOption()
{
	$.ajax(	{
		type : "POST",
		url : '/base/permission-template-list',
		dataType : "json",
		data: {},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){    
			const templateSelectClassName = getTemplateClassName();
			
			if(templateSelectClassName == '') return;
			
		 	const parent = $(templateSelectClassName);
		 	parent.children().remove();
		 	
		 	const optionHtml = result.filter(r=>r.templateType=='user')
		 							 .reduce((a,c)=>{
									            a+=`<option id="templateIdx${c.idx}">${c.name}[${c.permissionCount}]</option>`
									            return a;
    							},'<option id="templateIdx"></option>');
    		
		 	parent.append(optionHtml); 
		},
		error:function(x,e){
			errFun(x,e);
		}
	});
}
//업체별권한, 사용자별 권한에서 템플릿을 select로 변경시 해당 템플릿에 저장된 권한으로 덮어써주는 이벤트
$(".templateSelect").change(function(e){
	if($(getSelectTextId()).text() == '없음')
	{
		alert('템플릿을 적용할 대상이 없습니다');
		return;
	}
	
//	const tabIndex = getTabIndex();
	
//	if(tabIndex !=3 && tabIndex !=4) return;
	
	const templateSelectClassName = getTemplateClassName();
	
	if(templateSelectClassName == '') return;
	
	const selectedOption = $(`${templateSelectClassName} option:selected`); 
	
	const selectedOptionIdx = selectedOption.attr('id').replace('templateIdx', '');
	//템플릿 공백 선택시
	
 	const permissionGridName = getTabRightGridId();
 	const permissionDetailUrl =  '/base/permission-template-detail';
 	

	if(selectedOptionIdx == '') 
	{
		//전체 유효 false
		AUIGrid.setGridData(permissionGridName , AUIGrid.getGridData(permissionGridName).map(row=>{return {...row , templateValid : 'false', valid:'false'}}));
		return;
	} 
	$.ajax(	{
		type : "POST",
		url : permissionDetailUrl,
		dataType : "json",
		data: {idx : selectedOptionIdx},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){   
			const resultData = result.map(row=>{return {...row ,templateValid : row.valid , templateIdx : selectedOptionIdx}}); 
			if(getTabName() == 'TAB_USER')
			{
		 		AUIGrid.setGridData(permissionGridName , resultData.sort((a,b)=>a.code.localeCompare(b.code))); 
		 	}
		},
		error:function(x,e){
			errFun(x,e);
		}
	});	 
	
})


/***************************************** 유저권한설정 */

function permissionUserList(selectIndex = -1)
{

	$.ajax(	{
		type : "POST",
		url : '/base/permission-user-list',
		dataType : "json", 
		async: false,
		data:{selectIndex},
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){   
			let gridId = '';
			if(selectIndex == -1)  // 인덱스가 없는경우 = 업체별권한에서 메인 그리드 조회
			{
				gridId = getTabLeftGridId();
				AUIGrid.setGridData(gridId ,result);
				AUIGrid.resize(gridId);
			}
			else  // 인덱스가 있는경우 = 권한별 업체에서 오른쪽 그리드로 권한에 대한 업체 권한보유정보 조회할때
			{
				gridId = getTabRightGridId();
				AUIGrid.setGridData(gridId , result.map(row=>{return {...row , valid:row.permissionValid }}));
				AUIGrid.resize(gridId);
			}  
		},
		error:function(x,e){
			errFun(x,e);
		}
	});	
}
function permissionUserDetail(targetUserId)
{

	$.ajax(	{
		type : "POST",
		url : '/base/permission-user-detail',
		dataType : "json", 
		data:{targetUserId},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){    
		 	AUIGrid.setGridData( TAB_LIST.TAB_USER.rightGridID , result.map(row=>{return {...row  }}).sort((a,b)=>a.code.localeCompare(b.code)));
			AUIGrid.resize( TAB_LIST.TAB_USER.rightGridID );
		},
		error:function(x,e){
			errFun(x,e);
		}
	});	
}

function permissionUserSet()
{
	const selectUserText = $(getSelectTextId()).text();
	if(selectUserText == '없음') 
	{
		alert('선택된 업체가 없습니다');
		return;
	}
	const templateSelectClassName = getTemplateClassName();
	
	if(templateSelectClassName == '') return;
	
	const selectUserId = selectUserText.split('[')[1].replace(']','');
	
	//템플릿 인덱스
	const templateIdx = $(`${templateSelectClassName} option:selected`).attr('id').replace('templateIdx', '');


	//변경된 권한정보 데이터 가공
	const data = AUIGrid.getGridData(TAB_LIST.TAB_USER.rightGridID).filter(row=>row.templateValid != row.valid).map(row=>{
																																return {
																																			targetUserId : selectUserId,
																																			workingType : 'PERMISSION_CHANGE',
																																			permissionIdx:row.idx , 
																																			valid:row.valid 
																																		}
																															});
	data.unshift({targetUserId : selectUserId , workingType : 'TEMPLATE_SET' , templateIdx   })
	 
	ProgressManager.open(data.length);
	permissionUserAdd(data, 0);
}
//권한설정 - 추가삭제수정 처리
function permissionUserAdd(dataArr , index)
{
	ProgressManager.next();
	
	
	if(dataArr.length > index)
	{
		const data = dataArr[index];
		setTimeout(()=>{
			$.ajax(	{
				type : "POST",
				url : '/base/permission-user-add',
				dataType : "json",
				data  :JSON.stringify(data)  ,
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){ 
					permissionUserAdd(dataArr , index+1)
				},
				error:function(x,e){
					errFun(x,e);
				}
			});  
		} , setTimeoutDelay);
	}
	else
	{	 
		ProgressManager.end('처리성공' , ()=>{
			
											const tabName = getTabName();
											
											//왼쪽 그리드 조회갱신
											TabLeftFind();
											
											//탭이름에 따라 맞는 오른쪽 그리드 조회(파라미터는 탭의 종류에 따라 다르게 들어감)
											if(tabName == 'TAB_USER')
											{
												const targetUserId = dataArr.find(row=>row.targetUserId != null).targetUserId;
												TabRightFind(targetUserId);
											}
											else if(tabName == 'TAB_PERMISSION_USER')
												TabRightFind(dataArr[0].permissionIdx);
												 
										});
	}
}
 
//사용자별 업체에서 저장
function permissionPuSet()
{
	
	
	const puIndex = $(getSelectTextId()).attr('index');
	if($("#selectPu").text() == '없음')
	{
		alert('권한을 선택해주세요');
		return;
	}

	const data = AUIGrid.getEditedRowItems("#grid_wrap_puPermission").map(row=>{
																					return {
																								workingType : 'PERMISSION_CHANGE',
																								permissionIdx:puIndex , 
																								valid:row.valid ,
																								targetUserId : row.userId
																							}
																				});
																				
	 																
	if(data.length == 0)
	{
		alert('변경된 데이터가 없습니다');
		return;
	}
	 
	ProgressManager.open(data.length);
	permissionUserAdd(data, 0);
}



function permissionListfind()
{
	$.ajax(	{
		type : "POST",
		url : '/base/permission-list',
		dataType : "json",
		data: {type:'pu'},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){ 
			const gridID = getTabLeftGridId(); // 권한 데이터는 leftGrid조회만 존재
			  
			//console.log(result);
			AUIGrid.setGridData( gridID , result.sort((a,b)=>a.code.localeCompare(b.code)));
			AUIGrid.resize(gridID); 
		},
		error:function(x,e){
			errFun(x,e);
		}
	});
}