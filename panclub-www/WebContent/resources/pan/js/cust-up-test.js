// AUIGrid 생성 후 반환 ID
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
function documentReady() {  
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("/data/country_phone_8.json");
   //addRow('first');
   
   	var myData = [];
	for(var i=0; i<20; i++) {
		addRow('first');
	}
	
};

// AUIGrid 칼럼 설정
// 데이터 형태는 다음과 같은 형태임,
//[{"id":"#Cust0","date":"2014-09-03","name":"Han","country":"USA","product":"Apple","color":"Red","price":746400}, { .....} ];
var columnLayout = [{
		dataField : "name",
		headerText : "Name",
		style : "aui-grid-user-custom-left",
		renderer : {
			type : "IconRenderer",
			iconWidth : 20, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
			iconHeight : 20,
			iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
				"default" : "./assets/office_man.png" // default
			}
		}
	}, {
		dataField : "country",
		headerText : "Country",
		style :"aui-grid-user-custom-left",
		renderer : {
			type : "IconRenderer",
			iconWidth : 20, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
			iconHeight : 16,
			iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
				"Korea" : "./assets/korea.png",
				"USA" : "./assets/usa.png",
				"UK" : "./assets/uk.png",
				"Japan" : "./assets/japan.png", 
				"China" : "./assets/china.png",
				"France" : "./assets/france.png",
				"Italy" : "./assets/italy.png",
				"Singapore" : "./assets/singapore.png",
				"Taiwan" : "./assets/taiwan.png",
				"Ireland" : "./assets/ireland.png",
				"default" : "./assets/korea.png" // default
			}
		}
	}, {
		dataField : "color",
		headerText : "Color",
		renderer : {
			type : "IconRenderer",
			iconWidth : 20, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
			iconHeight : 20,
			iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
				"Blue" : "./assets/blue_circle.png",
				"Gray" : "./assets/gray_circle.png",
				"Green" : "./assets/green_circle.png",
				"Orange" : "./assets/orange2_circle.png",
				"Pink" : "./assets/pink_circle.png",
				"Violet" : "./assets/violet_circle.png",
				"Yellow" : "./assets/yellow_circle.png",
				"Red" : "./assets/orange_circle.png",
				"default" : "./assets/glider.png" //default
			}
		}
	}, {
		dataField : "product",
		headerText : "Product"
	}, {
		dataField : "price",
		headerText : "Price",
		dataType : "numeric",
		postfix : "원",
		style : "aui-grid-user-custom-right",
		editRenderer :  { 
			type : "NumberStepRenderer",
			min : 0,
			max : 1000000,
			step : 1000
		}
	}, {
		dataField : "date",
		headerText : "Date"
	}
];

// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {
			
			//rowIdField : "id",
			
			editable : true,
			
			selectionMode : "multipleRows",
			
			showFooter : true,
			
			showStateColumn : true,
			
			// 사용자가 추가한 새행은 softRemoveRowMode 적용 안함. 
			// 즉, 바로 삭제함.
			softRemovePolicy : "exceptNew"
	};
	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	// 에디팅 시작 이벤트 바인딩
	AUIGrid.bind(myGridID, "cellEditBegin", auiCellEditingHandler);

	// 에디팅 정상 종료 이벤트 바인딩
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	// 에디팅 취소 이벤트 바인딩
	AUIGrid.bind(myGridID, "cellEditCancel", auiCellEditingHandler);
	
}

function auiCellEditingHandler(event) {
	if(event.type == "cellEditBegin") {
		$("#editBeginDesc").text("에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value);
	} else if(event.type == "cellEditEnd") {
		$("#editBeginEnd").text("에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value);
	} else if(event.type == "cellEditCancel") {
		$("#editBeginEnd").text("에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value);
	}
};

var countries = ["Korea", "USA",  "UK", "Japan", "China", "France", "Italy", "Singapore", "Ireland", "Taiwan"];
var cnt = 0;
function addRow(rowPos) {
	var item = new Object();
	
	// rowIdField 로 지정한 id 는 그리드가 row 추가 시 자동으로 중복되지 않게 생성합니다.
	// DB 에서 Insert 시 실제 PK 값 결정하십시오.
	
	item.name = $("#t_name").val();
	item.country = $("#t_country").val();
	item.color = $("#t_color").val();
	item.product = $("#t_product").val();
	item.price = $("#t_price").val();
	item.date = $("#t_date").val();

	// parameter
	// item : 삽입하고자 하는 아이템 Object
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	AUIGrid.addRow(myGridID, item, rowPos);
	
	 $("#t_name").val("AUI-" + (++cnt));
	 $("#t_country").val(countries[cnt % countries.length ]);
}

function removeRow(rowPos) {
	AUIGrid.removeRow(myGridID, rowPos);
}


// 추가, 수정, 삭제 된 아이템들 확인하기
function checkItems() {
	
	// 추가된 행 아이템들(배열)
	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);
	 
	// 수정된 행 아이템들(배열) : 진짜 수정된 필드만 얻음.
	var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID);
	
	// 수정된 행 아이템들(배열) : 수정된 필드와 수정안된 필드 모두를 얻음.
	//var editedRowItems = AUIGrid.getEditedRowItems(myGridID); 
	
	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);
	
	var i, len, name, rowItem;
	var str = "";
	
	if(addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for(i=0, len=addedRowItems.length; i<len; i++) {
			rowItem = addedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for(i=0, len=editedRowItems.length; i<len; i++) {
			rowItem = editedRowItems[i]; // 행아이템
			
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for(i=0, len=removedRowItems.length; i<len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	
	// 하단에 정보 출력.
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length); 
	
	
	if(str == "")
		str = "변경 사항 없음";
	
	alert(str);
}
