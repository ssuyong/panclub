//통신으로 받은 메뉴 구조 트리데이터
//트리구조 변경비교하기 위해 보관
let originData = null;

$(document).ready(function() { 
	createAUIGrid();
	menuStructureList((result)=>{
		AUIGrid.setGridData('#grid_wrap' , result); 
		originData = getTreeData(AUIGrid.getTreeFlatData('#grid_wrap'));
	}) 
})
 

function createAUIGrid() {
	const menuStructureColumnLayout = [ 
		{ dataField : "menuName",    headerText : "메뉴이름",width : 200  } , 
		{ dataField : "permissionIdx",    headerText : "권한Id",width : 50 , editable: false ,visible : false } , 
		{ dataField : "parentMenuIdx",    headerText : "상위권한Id",width : 50 , editable: false ,visible : false } ,  
		{ dataField : "seq",    headerText : "순번",width : 50 , editable: false  } , 
		{ dataField : "permissionCode",    headerText : "필요권한코드",width : 100 , editable: false  } , 
		{ dataField : "permissionName",    headerText : "필요권한명",width : 100 , editable: false } , 
		{ dataField : "url",    headerText : "url",width : 250 , editable: false } , 
		{ dataField: "valid", headerText: "메뉴유효",
			style: "aui-grid-user-custom",
			width: 60,
			renderer: {
				type: "CheckBoxEditRenderer",
				editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			}
		},
		{ dataField: "hiddenMenu", headerText: "권한미보유시비노출",
			style: "aui-grid-user-custom",
			width: 120,
			renderer: {
				type: "CheckBoxEditRenderer",
				editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			}
		},
		{ dataField : "idx",    headerText : "ID",width : 150 , editable: false  ,visible : false} 
	];
	
	const permissionColumnLayout = [
		{ dataField : "code",    headerText : "권한코드",width : 100  } , 
		{ dataField : "name",    headerText : "권한명",width : 150  } , 
		{ dataField : "url",    headerText : "url",width : 200  } , 
	];

	const auiGridProps = {  
		showAutoNoDataMessage : false, 
		
		displayTreeOpen: true, 
		editable: true, 
		flat2tree: true,
	 	// 행의 고유 필드명
		rowIdField: "idx", 
		// 트리의 고유 필드명
		treeIdField: "idx", 
		// 계층 구조에서 내 부모 행의 treeIdField 참고 필드명
		treeIdRefField: "parentMenuIdx", 
		 
		enableDrag: true,
		// 드랍 가능 여부 (기본값 : true)
		enableDrop: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		enableDragByCellDrag: true,
		enableSorting : false
	};
	const permissionAuiGridProps = {   
		editable: false,  
	 	// 행의 고유 필드명
		rowIdField: "code", 
	 
	};

	AUIGrid.create("#grid_wrap", menuStructureColumnLayout , auiGridProps);
	AUIGrid.create("#grid_wrap_permission", permissionColumnLayout , permissionAuiGridProps);

	//AUIGrid.bind(myGridID, "cellClick", auiGridSelectionChangeHandler);
 

	AUIGrid.bind("#grid_wrap", "cellDoubleClick", function(event) {
		currentRowIndex = event.rowIndex; // // 에디팅 시작 시 해당 행 인덱스 보관
		
		if (event.dataField == 'permissionName' || event.dataField == 'permissionCode') { 
			
			const dialogPrint = $(`#dialog-form-permission`).dialog({
			    autoOpen: false,
			    height: 500, 
			    width: 550,
			    modal: true,
			    open:()=>{
					dialogPrint.scrollTop(0);
					
					$.ajax(	{
						type : "POST",
						url : '/base/permission-list',
						dataType : "json",
						data: {type :''},
						async: false,
						//contentType: "application/json; charset=utf-8",
						contentType : "application/x-www-form-urlencoded;charset=UTF-8",
						success:function(result){ 
							const gridID = "#grid_wrap_permission";
							  
							AUIGrid.setGridData( gridID , result.sort((a,b)=>a.idx-b.idx));
							AUIGrid.resize(gridID);  
						},
						error:function(x,e){ 
						}
					});
			    	
			    },
				buttons : {
					"닫기":function(){dialogPrint.dialog('close')}
					}
			  //  close:()=>{noticePopupClose(popupId);}
			});
			$(`#dialog-form-permission`).dialog().parent().children(".ui-dialog-titlebar").children(".ui-dialog-titlebar-close").hide();
			dialogPrint.dialog( "open" );
		}
		return false;  
	});
	AUIGrid.bind("#grid_wrap_permission", "cellDoubleClick", function(event) {
		const selectIndex = AUIGrid.getSelectedIndex('#grid_wrap')[0];
		const data = {
			permissionCode : event.item.code , 
			permissionIdx : event.item.idx , 
			permissionName : event.item.name , 
			url : event.item.url
		}; 
		if(selectIndex == null) return false;
		AUIGrid.updateRow('#grid_wrap' , data ,selectIndex)
		
		$(`#dialog-form-permission`).dialog('close');
	});
}

function menuStructureList(fun=()=>{})
{ 
	$.ajax(	{
				type : "POST",
				url : '/base/menuStructureList',
				dataType : "json", 
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){  
					fun(result);  
				},
				error:function(x,e){
					 
				}
	});  
}

//행추가 (매개변수가 true면 하위행으로 추가)
function addRowBtn(isChildGen = false)
{
	const selectedItems = AUIGrid.getSelectedItems("#grid_wrap"); 
	
	if (selectedItems.length == 0)
	{
		alert('행을 선택해주세요')
		return;
	}		 
		
	let item = selectedItems[0].item;
	
	if(!isChildGen)
	{
		item = AUIGrid.getParentItemByRowId("#grid_wrap", item.idx);
			
	} 	 
	
	AUIGrid.addTreeRow("#grid_wrap", {parentMenuIdx :item?.idx }, item?.idx , "selectionDown");
}

//aui Grid의 데이터를 (인덱스 , 부모인덱스 , 순번) 가공
function getTreeData(data)
{
	const treeData = data;
	
	return  treeData.map((row)=>{
									return {...row,parent:row._$parent};
								}) 
}

//오리진 데이터에서 변경된 데이터를 검출하는 함수(변경후 부모(parent)와 새로운 순번 newSeq)
function getGridEditingData()
{
	//삭제된 행 데이터
	const removeData = AUIGrid.getRemovedItems('#grid_wrap').map(row=>{
																		return {...row , workingType : 'REMOVE'}
																	});
	//삭제된 행 데이터가 배제된 데이터
	const treeData = getTreeData(AUIGrid.getTreeFlatData('#grid_wrap')).filter(row=>removeData.find(r=>r.idx==row.idx) == null);
	
	//tree데이터와 통신으로 받은 oroginData와 부모나 순번이 다른 데이터
	const editingData = getGridEditingDataCheck(treeData , treeData.filter((row)=>row.parent == null) , []);
	 
	 
	return [...removeData , ...editingData];
}
//
// 순번, 뎁스 변경된 데이터 배열 체크하는 함수 (부모단위로 재귀함수)
//  매개변수 , 전체데이터 , 현재조사중인 데이터 , 변경된 데이터  
function getGridEditingDataCheck(treeData , arrData , editingData )
{
	if(arrData.length == 0 ) return [];
	//매개변수와 동일한 parent를 쓰는 오리진데이터를 가져옴 
	const originArr = originData.filter((row)=>row.parent == arrData[0].parent);
	
	//매개변수 배열 조사
	for(index in arrData)
	{	
		//해당 인덱스의 원본배열 데이터와 데이터가 불일치 하는지 
		const notEqualIdx = arrData[index].idx != originArr[index]?.idx; 
		const notEqualMenuName = arrData[index].menuName != originArr[index]?.menuName;
		const notEqualPermissionIdx = arrData[index].permissionIdx != originArr[index]?.permissionIdx;
		const notEqualhiddenMenu = arrData[index].hiddenMenu != originArr[index]?.hiddenMenu;
		const notEqualvalid = arrData[index].valid != originArr[index]?.valid;
	
		//데이터가 하나라도 안맞는다면 수정. 만약 idx가 uuid라면 행추가로 생성된 데이터라 add타입으로 추가
		if(notEqualIdx || notEqualMenuName || notEqualPermissionIdx || notEqualhiddenMenu || notEqualvalid)
		{
			editingData.push({...arrData[index] , newSeq : parseInt(index)+1 , workingType : isNaN(arrData[index].idx)?'ADD':'EDITE'}  );  
		} 
	 
		//현재의 인덱스 아이템에 자식이 있을경우 재귀
		const childArr = treeData.filter(row=>row.parent == arrData[index].idx);
		if(childArr.length>0)
		{
			getGridEditingDataCheck(treeData , childArr , editingData);
		}
	}
	return editingData;
}

//저장버튼
function uptBtn()
{
	const editingData = getGridEditingData();
	
	//추가 수정 삭제할 데이터들 모음
	const dataArr = editingData.map((row)=>{
											return {
												workingType : row.workingType ,
												id : row.idx ,
												idx : row.workingType=='ADD'?-1:row.idx ,
												seq : row.newSeq || -1 , 
												menuName : row.menuName || '' ,
												permissionIdx : row.permissionIdx || -1 ,
												parentMenuIdx : row.parent ,
												hiddenMenu : row.hiddenMenu || false ,
												valid : row.valid || false ,												
											}
										}) 
	if(dataArr.length ==0)
	{
		alert('수정된 데이터가 없습니다.');
		return;
	}
	
	if(!confirm(`${dataArr.length}개의 데이터가 수정됩니다 저장하시겠습니까?`))
		return;									
	
	ProgressManager.open(dataArr.length);
	menuStructureAdd(dataArr , 0 , {});
}

//메뉴cud처리
function menuStructureAdd(dataArr , index, parentUUIDHash)
{
	ProgressManager.next();
	
	
	if(dataArr.length > index)
	{
		const data = dataArr[index];
		if(  parentUUIDHash[data.parentMenuIdx])
		{
			data.parentMenuIdx_old = data.parentMenuIdx;
			data.parentMenuIdx = parentUUIDHash[data.parentMenuIdx]; 
		} 
		setTimeout(()=>{
			$.ajax(	{
				type : "POST",
				url : '/base/menuStructureAdd',
				dataType : "json",
				data  :JSON.stringify(data)  ,
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){ 
					if(result.idx)
					{
						parentUUIDHash[data.id] = result.idx;
					} 
					menuStructureAdd(dataArr , index+1 , parentUUIDHash)
				},
				error:function(x,e){  
				}
			});  
		} , 300);
	}
	else
	{	 
		ProgressManager.end('처리성공' , ()=>{
			
											menuStructureList((result)=>{
												AUIGrid.setGridData('#grid_wrap' , result); 
												originData = getTreeData(AUIGrid.getTreeFlatData('#grid_wrap'));
											}) 
										});
	}
}