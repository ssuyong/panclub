const pageInfo = {};
const today = new Date();

//노출날짜 
const picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        date: today,
    	input: '#startpicker-input',
        container: '#startpicker-container'
    },
    endpicker: {
        date: today,
        input: '#endpicker-input',
        container: '#endpicker-container'
    } 
});

//노출업체 그리드 레이아웃
const custColumnLayout = [ 
	 { dataField : "idx",   width : 68 , visible:false}, 
	 { dataField : "custCode",    headerText : "업체코드", width : 200 },  
	 { dataField : "custName",    headerText : "업체명", width : 300 },  
	 { dataField : "validYN",      headerText : "노출유무",renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : true, 
				editable : true, 
				checkValue : "Y", 
				unCheckValue : "N"
				}
	 }
];
//노출메뉴 그리드 레이아웃
const menuColumnLayout = [ 
	 { dataField : "idx",   width : 68 , visible:false}, 
	 { dataField : "menuCode",    headerText : "메뉴코드", width : 140 },  
	 { dataField : "menuName",    headerText : "메뉴이름", width : 200 },  
	 { dataField : "menuUrl",    headerText : "메뉴주소", width : 300 },  
	 { dataField : "validYN",      headerText : "노출유무",renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : true, 
				editable : true, 
				checkValue : "Y", 
				unCheckValue : "N"
				}
	 }  
];

//그리드 생성
function createAUIGrid(columnLayout)
{
	const auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			 
			rowIdField : "idx"
			};
	AUIGrid.create("#custGrid", custColumnLayout, auiGridProps);		
	AUIGrid.create("#menuGrid", menuColumnLayout, auiGridProps);		
}

//첨부시 이미지 크기 구하는곳
$("#attaFile").change(function(){
	const file = this.files[0];
	const _URL = window.URL || window.webkitURL;
	const img = new Image();
	
	img.src = _URL.createObjectURL(file);
	
	
	img.onload = function(){
		pageInfo.fileImg = img;
		$("#iInput_imgWidth").val(img.width);
		$("#iInput_imgHeight").val(img.height);
		
		//이미지 높이와 너비만큼 팝업크기에 지정(높이는 닫기버튼등으로 +100)
		//$("#iInput_popupWidth").val(img.width);
		//$("#iInput_popupHeight").val(img.height+100);
		
		$("#iInput_popupWidth").val(Math.max(Math.round(pageInfo?.fileImg?.width * parseFloat($("#iSelect_imgMag").val())) || 0 , 100));
		$("#iInput_popupHeight").val(Math.max(Math.round(pageInfo?.fileImg?.height * parseFloat($("#iSelect_imgMag").val())) || 0 , 150));
 	}
	
})
 
 
//팝업 등록
function popupReg()
{
	if(!$("#iInput_popupName").val()) 
	{
		alert('팝업이름이 없습니다(중복불가능)');
		return;
	}
	
	const form = $("#frmCust")[0];
	
	const formData = new FormData(form);
	const fileNameSplit = $("#attaFile").val().split('\\');
	let fileName  = '';
	if(fileNameSplit.length > 0)
	{
		fileName = fileNameSplit[fileNameSplit.length - 1];
	}
	
	const data = {
					popupName : $("#iInput_popupName").val(),
					popupIdx : $("#iInput_popupIdx").val() || -1 ,  // 팝업번호-> 조회한 팝업을 수정시에 들어가지며 이외엔 '-1'들어감 수정이냐 등록이냐 구분하는 값이기도 함
					title: $("#iInput_title").val(),  //팝업 타이틀
					validYN : $("#iInput_popupValidYN").prop('checked')?'N':'Y', //팝업 노출 유효
					width: $("#iInput_popupWidth").val(), //팝업 너비
					height: $("#iInput_popupHeight").val(), //팝업높이
					sYmd : $("#startpicker-input").val(), //노출 시기 - 시작일
					eYmd : $("#endpicker-input").val(), // 노출시기 - 마지막날
					allCustViewYN : $("#iInput_AllCustViewYN").prop('checked')?'Y':'N', // 모든 업체 노출여부
					allMenuViewYN : $("#iInput_AllMenuViewYN").prop('checked')?'Y':'N', // 모든 메뉴 노출여부
					allYmdYN : $("#iInput_allYmdYN").prop('checked')?'Y':'N', // 모든 일자 노출여부
					isOpenPopupYN : $("#iInput_isOpenPopupYN").prop('checked')?'Y':'N', // 페이지 열릴때 오픈여부
					isWeekCheckboxYN : $("#iInput_isWeekCheckboxYN").prop('checked')?'Y':'N', // 일주일안보기 체크박스 여부
					isModalYN : $("#iInput_isModalYN").prop('checked')?'Y':'N', // 모달 여부
					priority : $("#iInput_priority").val(), // 우선도
					imgMag : $("#iSelect_imgMag").val(), //이미지 배율
					preText : $("#iInput_preText").val() ,
					postText : $("#iInput_postText").val() ,
					memo : $("#iInput_memo").val(),
					fileName, //파일이름
					custArr : $("#iInput_AllCustViewYN").prop('checked')?'':AUIGrid.getGridData("#custGrid").filter((row)=>row.validYN=='Y').reduce((a,c)=>{return a+(a!=''?'^':'')+c.custCode},''), // 모든 업체 체크면 '' 아니면 업체코드^업체코드식으로
					menuArr : $("#iInput_AllMenuViewYN").prop('checked')?'':AUIGrid.getGridData("#menuGrid").filter((row)=>row.validYN=='Y').reduce((a,c)=>{return a+(a!=''?'^':'')+c.menuCode},'') // 모든 메뉴 체크면 '' 아니면 메뉴코드^메뉴코드식으로					
				};
	formData.append('data',new Blob ([JSON.stringify(data)] , {type:"application/json"}));
	
	
	$.ajax({
			method: 'POST',
			enctype: 'multipart/form-data',
			url: "/base/popupReg",
			data: formData,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,  
			success: function(data) {
			 
		 		//에러코드 무시하고 처리되었음으로 뜨던 부분 수정
				if(data == -2)
				{
					alert('팝업이름이 중복되었습니다.');
					
				}
				else
				{
					alert("OK" + ":" + "처리되었습니다");
	        		pageInfo.result = data;	
				//updateDataToServer("/base/custAdd", workingType);
				if($("#iInput_popupIdx").val())
					location.reload(true);
				else
					location.href= `${location.origin}${location.pathname}?popupIdx=${data}`;
			}
			
		}});
	
}
// 노출 체크표시할 메뉴목록 불러오는 함수
function getMenuList()
{
	$.ajax({
		url: '/base/menu-list',
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		async : false,
		data: { },
		success: function(data) { 
			let idx = 0;
			
			const menuCodeArr = pageInfo?.popupInfo?.menuCodeArr?.split('^') || [];
			  
			const list =  data.menuList.map((row)=>{
				if(menuCodeArr.includes(row.menuCode)) row.validYN = 'Y'; //팝업조회로 메뉴 배열이 들어왔을경우 해당번호로 초기화
				else row.validYN = 'N';
				return {idx : idx++, menuCode : row.menuCode , menuName : row.menuName , menuUrl : row.menuUrl ,validYN : row.validYN};
			});
			
			AUIGrid.setGridData("#menuGrid",list );
		},
		error: function(request, status, error) { 
		}
	});
}

//노출 체크표시할 업체목록불러오는 함수
function getCustList()
{
	$.ajax({
		url: '/club/c-cust',
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		async : false,
		data: { },
		success: function(data) { 
			let idx = 0;
			
			const custCodeArr = pageInfo?.popupInfo?.custCodeArr?.split('^') || [];
			
			const list = data.c_custList.map((row)=>{
				if(custCodeArr.includes(row.custCode)) row.validYN = 'Y'; //팝업조회로 업체 배열이 들어왔을경우 해당번호로 초기화
				else row.validYN = 'N';
				return {idx : idx++,custCode : row.custCode , custName : row.custName ,validYN : row.validYN};
			})
			AUIGrid.setGridData("#custGrid",list);
		},
		error: function(request, status, error) { 
		}
	});
}

//미리보기
function popupPreview()
{
	
	if(noticeList['popupPreview'])
	{
		noticePopupDestroy('popupPreview')
	}
	
	const title = $("#iInput_title").val();
	const preText =$("#iInput_preText").val();
	const postText = $("#iInput_postText").val();
	const memo = $("#iInput_memo").val(); 
	const w = $("#iInput_popupWidth").val(); 
	const h = $("#iInput_popupHeight").val(); 
	
	
	noticePopupGen({popupId:'popupPreview',
					title,
					fileImg : pageInfo?.fileImg?.src , 
					imgWidth : Math.round(pageInfo?.fileImg?.width * parseFloat($("#iSelect_imgMag").val())) ,
					imgHeight : Math.round(pageInfo?.fileImg?.height * parseFloat($("#iSelect_imgMag").val())), 
					preText,
					postText,
					isWeekCheckbox:$("#iInput_isWeekCheckboxYN").prop('checked')
					});
	noticePopupOpen({popupId:'popupPreview',w,h});
}

$(document).ready(function() {

	const params = new URL(document.location).searchParams;
	
	const popupIdx = params.get('popupIdx') || -1; // url에서 idx 받아옴
	if(popupIdx > 0) //idx가 존재시
	{
		getNoticePopupInfo(popupIdx);
	}  
	
	createAUIGrid();
	getMenuList();
	getCustList();
});

$("#iButton_Preview").on('click',()=>
{
	popupPreview();
})
$("#iButton_Reg").on('click',()=>
{
	popupReg();
})
$("#iButton_Upt").on('click',()=>
{
	popupReg();
})
$("#iSelect_imgMag").on('change',()=>{
	 $("#iInput_popupWidth").val(Math.max(Math.round(pageInfo?.fileImg?.width * parseFloat($("#iSelect_imgMag").val())) || 0 , 100));
	 $("#iInput_popupHeight").val(Math.max(Math.round(pageInfo?.fileImg?.height * parseFloat($("#iSelect_imgMag").val())) || 0 , 150));
	 
})

$("#iInput_popupWidth").on('change',()=>{
	const minWidth = Math.max(Math.round(pageInfo?.fileImg?.width * parseFloat($("#iSelect_imgMag").val())) || 0 , 100); // 이미지의 너비*배율 (없으면 0으로 간주) 과 100중에 높은수
	
	if($("#iInput_popupWidth").val() < minWidth)
	{
		alert(`팝업최소 너비 ${minWidth}보다 작습니다`);
		$("#iInput_popupWidth").val(minWidth);
	}
})
$("#iInput_popupHeight").on('change',()=>{
	const minHeight = 200;//Math.max(Math.round(pageInfo?.fileImg?.height * parseFloat($("#iSelect_imgMag").val())) || 0 , 150); // 이미지의 너비*배율 (없으면 0으로 간주) 과 150중에 높은수
	
	if($("#iInput_popupHeight").val() < minHeight)
	{
		alert(`팝업최소 높이 ${minHeight}보다 작습니다`);
		$("#iInput_popupHeight").val(minHeight);
	}
})

//팝업조회
function getNoticePopupInfo(popupIdx)
{
	  
	$.ajax({ url : '/base/popupList' , 
		dataType : 'json',
		type : 'POST',
		async : false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
			popupIdx
		},
		success : (result)=>{ 
			
			const popupInfo = result[0];
			
			if(popupInfo == null)
			{
				alert('팝업 정보를 찾을수 없습니다.');
				return;
			}
			
			pageInfo.popupInfo = popupInfo;
			
			 
			$("#iInput_popupName").val(popupInfo.popupName);
			$("#iInput_popupIdx").val(popupInfo.idx);
			$("#iInput_popupValidYN").prop('checked',popupInfo.validYN == 'N');
			$("#iInput_title").val(popupInfo.title);
			$("#iInput_popupWidth").val(Math.round(popupInfo.width)); 
			$("#iInput_popupHeight").val(Math.round(popupInfo.height)); 
			$("#startpicker-input").val(popupInfo.sYmd);
			$("#endpicker-input").val(popupInfo.eYmd);
			$("#iInput_AllCustViewYN").prop('checked',popupInfo.allCustViewYN == 'Y'); 
			$("#iInput_AllMenuViewYN").prop('checked',popupInfo.allMenuViewYN == 'Y'); 
			$("#iInput_preText").val(popupInfo.preText); 
			$("#iInput_postText").val(popupInfo.postText);
			$("#iSelect_imgMag").val(popupInfo.imgMag);
			$("#iInput_memo").val(popupInfo.memo);
			$("#iInput_priority").val(popupInfo.priority);
			$("#iInput_allYmdYN").prop('checked',popupInfo.allYmdYN == 'Y'); 
			$("#iInput_isOpenPopupYN").prop('checked',popupInfo.isOpenPopupYN == 'Y'); 
			$("#iInput_isWeekCheckboxYN").prop('checked',popupInfo.isWeekCheckboxYN == 'Y'); 
			$("#iInput_isModalYN").prop('checked',popupInfo.isModalYN == 'Y'); 
			const originFileParent = $("#iDiv_regFile"); 
			const fileUploadComCode = popupInfo.fileUploadComCode;
			//C:\\WebService\\fileUpload\\panClub\\"+comCode+"\\popupImg\\
			originFileParent.append(`<a href="${fileRootUrl}${fileUploadComCode}/popupImg/${popupInfo.imgFileName}">${popupInfo.imgOriginFileName}</a>`)
			$("#iDiv_regFile").show();
			
			getImgWH(`${fileRootUrl}${fileUploadComCode}/popupImg/${popupInfo.imgFileName}` , ({img,width , height})=>{
																							pageInfo.fileImg = img;
																							$("#iInput_imgWidth").val(img.width);
																							$("#iInput_imgHeight").val(img.height);
																						}) 
			$("#iButton_Reg").addClass('disabled');
			$("#iButton_Upt").removeClass('disabled');
			$("#iButton_Del").removeClass('disabled');
			
		},
		error : (e)=>{
		}
		})
}