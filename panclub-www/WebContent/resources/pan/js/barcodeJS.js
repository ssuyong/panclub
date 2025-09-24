// barcodePrint.css와 같이 사용 권장

//-------------------------------------------------------------------------------------------
// 바코드 데이터 파싱관련
//getBarcodeValue를 통해 바코드 json에 원하는 키값을 가져오거나 barcodeToJson로 json 객체 직접제어
//-------------------------------------------------------------------------------------------


//---------이벤트 테스트용---------------------------------------------------------------------------
// html 클래스 barcodeChange인풋에 바코드 형식의 데이터가 들어간 상태에서 엔터키가 눌릴경우 해당 데이터에서 품번을 추출해서 그 값으로 변경해줌
//$(".barcodeChange").change(function()
//{
//	 barcodeChangeN($(this));
//});
//$(".barcodeChange").bind('paste',function(e)
//{
////	console.log("D");
//	 barcodeChangeN($(this));
//});
//$(".barcodeChange").bind('keydown',function(e)
//{
//	if(e.keyCode=="13"){ // 엔터의 경우(바코드 스캐너)
//		barcodeChangeN($(this));
//	}
//	if(e.keyCode == 0) // pda의 경우
//	{
//		//alert(e.keyCode);
//		barcodeChangeN($(this));
//	}
//	//	barcodeChangeN($(this));
//});
// 
////클래스가 아니라 이벤트식 매개변수로 j쿼리 인풋 obj넣으면 처리됨
//function barcodeChangeN(inputObj)
//{
//	
//	const strVal = inputObj.val();
//	
//	inputObj.val(getBarcodeValue(strVal , "n" ));
//	 
//}


//**************************************************** */
// 일반 인풋에서 사용시 키다운 이벤트에서 
// if(barcoderInterceptor(iwrNo ,  e.keyCode , 'i')) return; 
// 넣어서 해당키에 바코드 기능 삽입
//
// aui의 경우 aui그리드 생성후 마지막에 auiBarcoderInterceptor을 호출하여 aui 인풋에 대해 추적후 
// 해당 aui 컬럼의 갑변경 이벤트에서 }문자열 하나 지워주고 받아온 값으로 처리
let barcodeDebugMod =false;// 브라우저 콘솔로 true 주면 현재 문서의 simplePostAjax의 성공 결과값을 콘솔로 표시해줌

let barcodeBeforeObj; //바코드 스캔으로 넘어가면 넘어가기전 input 오브젝트 보관용
let barcodeKey; // 바코드에서 가져오려는 원하는 키값 저장용
let barcodeTrigger = '';  // {= 을 연속으로 입력하는것을 구분을 위해 저장되는 변수
let isAuiBarcodeInput = false; // aui의 입력인지 일반입력인지 구분용 
let barcodeProp = {};

function setBarcodeProp(key,value) //바코드 옵션용
{
	barcodeProp[key] = value;
}

//aui 생성(createAUIGrid) 마지막에 호출 //현재는 임시로
function auiBarcoderInterceptor(key)
{ 
	
	$(".aui-textinputer").bind('keydown',(e)=>{ 
		if(window.location.pathname == '/logis/stock-wr-up')
		{
			if(AUIGrid.getSelectedIndex(myGridID)[1] !=3 ) return;  //수동입출고 페이지에서 품번이 아닌곳에선 바코드 스캔 안돌도록 수정
		}  
		isAuiBarcodeInput = true;
		if(barcoderInterceptor($(":focus") ,  e.keyCode , key)) return; // 키값을 조사하면서 {=을 연속으로 입력하는 바코드 스캔인지 확인 아닐경우 false반환으로 무시됨 
	});
	 
}
//------------바코드 데이터 제어 관련 ---------------------------------------------------


// 인풋에서 {= 을 연속으로 입력하면 barcodeInput라는 아이디를 가진 인풋에 포커스를 넘겨줌
function barcoderInterceptor(obj , key ,valueKey)   // {=  => key : 16 , 219 , 187  => 시프트 , { , =
{
 	
	if(barcodeTrigger == '')  
	{ 
		isAuiBarcodeInput = false;
		if(key == 16)
		{
			barcodeTrigger = 16;
		}
		return false;
	}
	else if(barcodeTrigger == 16)
	{
		if(key == 219)
		{
			barcodeTrigger = 219;
		}
		else 
			barcodeTrigger = '';
		return false;
	}
	else if(barcodeTrigger == 219)
	{
		if(key == 187) // {= 가 연속으로 입력되면 입력중이던 입력중이던 오브젝트와 원하는 키값을 변수에 저장후 바코드 인풋에 {을 넣어주고 기존 입력창은 비워줌 그리고 포커스를 변경. 이후 true반환하여 이전 입력중이던 이벤트 return시킴 
		{
			barcodeBeforeObj = obj;
			barcodeKey = valueKey; 
			$("#barcodeInput").val('{');
			if(!barcodeProp?.textMulti) obj.val('');
			else obj.val(obj.val().replace('{',''));
			$("#barcodeInput").focus();
		}
		barcodeTrigger = '';
		return true;
	}
 
	
}
  
$("#barcodeInput").keydown((e)=>{
 	
 	
	if(e.keyCode != 221 && isAuiBarcodeInput ) return;  //  aui의 경우 } , 일반 입력의 경우 엔터가 들어올때까지 리턴 => 바코드 인풋에 갑저장
	else if (e.keyCode != 13 && !isAuiBarcodeInput) return; 
	
	const inputText = $("#barcodeInput").val(); //바코드 인풋에 저장중이던 문자열을 받아옴 
	const inputJson = barcodeToJson(inputText +(inputText.indexOf('}') != inputText.length-1 ?'}':''));
 
	const type = inputJson.t;
	
	
	 
	// 처리번호로 로드시 컴코드 확인후 다르면 메세지 + 스캔 취소	
	if(barcodeKey == 'i')
	{
		if(type == 'si') 
		{
			alert('랙별재고목록에서 출력한 바코드는 처리번호를 불러올수 없습니다.');
			return;
		}
		
		const barcodeComCode = decodeURI(inputJson.c);
		if(barcodeComCode != lcd)
		{ 
			$("#iwrNo").val('');
			alert("해당 바코드는 다른 업체에서 발급한 바코드입니다 : "+barcodeComCode);
			barcodeBeforeObj = null;
			barcodeKey = '';
			isAuiBarcodeInput = false;
			return;
		}
	}

	//수동입출고에서 바코드랙로드 체크박스 체크시 랙로드함수에 바코드텍스트를 json으로 보내서 실행
	if(window.location.pathname == '/logis/stock-wr-up' && barcodeKey == 'n') //수동입출고에서 품번스캔시
	{
		barcodeDeepLoad(inputJson); 
	}
	
	// 가져온 문자열에 }이 마지막에 없으면 붙여주고 조사하려던 키값으로 원하는 값을 받아옴 
	const text = inputJson[barcodeKey];
	 
///	console.log(barcodeBeforeObj.val());
 	//바코드 시작 객체에 바코드에서 뽑아온 값 넘겨줌 (입력순서 이슈에 따라 aui는 이후 }가 이전 입력창에 들어감)
 	if(barcodeProp?.textMulti) barcodeBeforeObj.val(barcodeBeforeObj.val()+text.toUpperCase())
 	else if(barcodeKey != 'i') barcodeBeforeObj.val(text.toUpperCase());
	else barcodeBeforeObj.val(text);
	 
	barcodeBeforeObj.focus();
	if(!isAuiBarcodeInput) //일반 입력은 엔터키가 안넘어가는 이유로 트리거로 강제로 넣어줌
	 	barcodeBeforeObj.trigger(jQuery.Event( "keydown", { keyCode: 13 } ));
	//else
	//	$(":focus").trigger(jQuery.Event( "keydown", { keyCode: 13 } ));
	
	barcodeBeforeObj = null;
	barcodeKey = '';
	isAuiBarcodeInput = false;
		
})

//스캔된 바코드를 가능하면 json 객체로 반환하는 함수, 불가능하면 null 반환
function barcodeToJson(barcodeStr)
{ 

	if((barcodeStr.indexOf("{=") == -1) || (barcodeStr.indexOf("=}") == -1) ) return null;
	
	try // json 스트링인경우 json파싱후 value의 키로 값을 추출해서 그 값을 반환
	{	
		const splitText1 = barcodeStr.split('{=');
		const splitText2 = splitText1[1].split('=}');
		const texts = [splitText1[0], splitText2[0] , splitText2[1]];
			
		const tempText = ('{'+inko.ko2en(texts[1])+'}').toLowerCase();
		const jsonData = JSON.parse(tempText);
		return jsonData;
	}
	catch (e)  
	{ 
		return null;
	}
}

// 바코드 문자열 barcodeStr을 json 객체로 변환후 key와 일치하는 값을 받아서 변환, 만약 실패할경우 변환안함(json객체가 아닐경우등)
function getBarcodeValue(barcodeStr , key)
{
	const jsonObj = barcodeToJson(barcodeStr);
	
	if(jsonObj == null) return barcodeStr;
	else if(jsonObj[key] == null) return barcodeStr;
	else return jsonObj[key];
}

//-------------------------------------------------------------------------------------------
// 프린트 관련
//-------------------------------------------------------------------------------------------
//barcodePrintDiv태그 필수 -> 하위에 바코드 셋팅
function barcodeSet(item, type)
{
	const barcodePrintDiv =  $("#barcodePrintDiv") 
	let today = new Date();   

	let year = today.getFullYear(); // 년도
	let month = ((today.getMonth() + 1)+'').padStart(2,0);  // 월
	let date = (today.getDate()+'').padStart(2,0);  // 날짜 
	 
   //바코드 출력 버튼에 의해 태그 생성시 해당 정보를 서버로 보내 저장 및 부품 바코드의 경우 itemUnitIndx반환  
   simplePostAjax('/logis/barcodeAdd' ,
					{barCodeType:type , itemId:item.itemId , consignCustCode :item.storConsignCustCode  } ,
					(data)=>{
//						 console.log(data);
						if(type == 'item') //수동입출고에서 출력한 부품타입
					   {
						
							barcodePrintDiv.append(`<div class="barcodePrint_Div">
										<div class="barcodePrint_Box" id="box_${item.index}"></div>
										<label class="barcodePrint_itemId">${item.itemId}</label>
										<label class="barcodePrint_itemDataId">wr${item.dataId}</label>
								 		<label class="barcodePrint_itemNo">${item.itemNo}</label>
								 		<label class="barcodePrint_itemName">${item.itemName}</label> 
								 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
								 		<label class="barcodePrint_code">${lcd}</label>
								 		<label class="barcodePrint_storConsignCustCode">${item.storConsignCustCode}</label> 
								 		<label class="barcodePrint_itemIdx">#${data.item.unitIdx}#</label>
								 	</div>`);
//							barcodePrintDiv.append(`<div class="barcodePrint_Div">
//										<div class="barcodePrint_Box" id="box_${item.index}"></div>
//										<label class="barcodePrint_itemId">${item.itemId}</label>
//										<label class="barcodePrint_itemDataId">wr${item.dataId}</label>
//								 		<label class="barcodePrint_itemNo">${item.itemNo}</label>
//								 		<label class="barcodePrint_itemName">${item.itemName}</label> 
//								 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
//								 		<label class="barcodePrint_code">${lcd}</label>
//								 		<label class="barcodePrint_storConsignCustCode">${item.storConsignCustCode}</label>
//								 		<label class="barcodePrint_rackCode">${item.rackCode}</label>
//								 		<label class="barcodePrint_itemIdx">#${data.item.unitIdx}#</label>
//								 	</div>`);
					  
							const 
							svgNode = DATAMatrix({
							
							// t = 타입  => i는 부품타입(수동입출고)
							// n = 아이템번호 
							// i = 수동입출고처리번호_순번
							// c = 발행된 수동입출고 처리를 한 컴코드 
							     msg :  `#${data.item.unitIdx}#`
							    ,dim :   82
							    ,rct :   0
							    ,pad :   2
							    ,pal : [  "#000000","#ffffff" ]
							    ,vrb :   0
							
							});
							
						 
							const box = $(`#box_${item.index}`);
							box.append(svgNode);
						}
						else if(type == 'rack') //재고관리/랙 에서 출력한 랙바코드
						{
						
							barcodePrintDiv.append(`<div class="barcodePrint_Div">
										<div class="barcodePrint_Box" id="box_${item.index}"></div> 
								 		<label class="barcodePrint_rackName">${item.rackName}</label>  
								 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
								 		<label class="barcodePrint_logisRackId">@${item.logisRackId}@</label>
								 	</div>`);
								 	
							const 
							svgNode = DATAMatrix({  //랙은 추가정보 없이 위치정보인 랙이름 그대로를 담음 영어숫자특수문자(1바이트한정)은 상관없으나 한글과같은 타입은 url인코딩후 함 일단 한글이름은 사라질 예정이나 혹시몰라서 이런식으로 뽑히게 함 
							
							//	랙은 이름 자체가 위치좌표를 나타내는 코드가 되어 그 자체를 발행  
							     msg :  `@${item.logisRackId}@`
							    ,dim :   82
							    ,rct :   0
							    ,pad :   2
							    ,pal : [  "#000000","#ffffff" ]
							    ,vrb :   0
							
							});
							
						 	
							const box = $(`#box_${item.index}`);
							box.append(svgNode);
						}
						else if(type == 'pcLabel') //주문접수에 대한 라벨
						{
					 
							
							barcodePrintDiv.append(`<div class="barcodePrint_Div">
										 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
								 		<table class="barcodePrint_table">
								 			<tr>
							 					<th class="barcodePrint_th" scope="col">업체</th>
							 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
								 			</tr>
								 			<tr>
							 					<th  class="barcodePrint_th" scope="col">관리번호</th>
							 					<td class="barcodePrint_td barcodePrint_reqNo">주문/${item.pcReqNo}_${item.reqSeq}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">랙번호</th>
							 					<td class="barcodePrint_td">${item.rackName}(${item.rackCode})</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품번</th>
							 					<td class="barcodePrint_td">${item.itemNo}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품명</th>
							 					<td class="barcodePrint_td">${item.itemName}</td>
								 			</tr>
								 		</table>
								 	</div>`);
								 	
							const 
							svgNode = DATAMatrix({
							
							//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
							     msg :  `${window.location.host}/order/pc-req-list?popup=open#info1!${item.pcReqNo}!!!Y!!!!!`
							    ,dim :   56
							    ,rct :   0
							    ,pad :   2
							    ,pal : [  "#000000","#ffffff" ]
							    ,vrb :   0
							
							});
							
						 
							const box = $(`#box_${item.index}`);
							box.append(svgNode);
							//console.log(item);
							
					//		http://localhost:18280/order/pc-req-list#info1!20240227003!!!Y!!!!!
						}
						else if(type == 'ctLabel') // 회수접수에 대한 라벨
						{
							
					 
							
							barcodePrintDiv.append(`<div class="barcodePrint_Div">
										 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
								 		<table class="barcodePrint_table">
								 			<tr>
							 					<th class="barcodePrint_th" scope="col">업체</th>
							 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
								 			</tr>
								 			<tr>
							 					<th  class="barcodePrint_th" scope="col">관리번호</th>
							 					<td class="barcodePrint_td barcodePrint_reqNo">회수/${item.ctReqNo}_${item.reqSeq}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">랙번호</th>
							 					<td class="barcodePrint_td">${item.selectRack}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품번</th>
							 					<td class="barcodePrint_td">${item.itemNo}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품명</th>
							 					<td class="barcodePrint_td">${item.itemName}</td>
								 			</tr>
								 		</table>
								 	</div>`);
								 	
							const 
							svgNode = DATAMatrix({
							
							//회수 접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
							     msg :  `${window.location.host}/order/ct-req-list?ymdIgnoreYN=y&ctReqNo=${item.ctReqNo}&popup=open`
							    ,dim :   56
							    ,rct :   0
							    ,pad :   2
							    ,pal : [  "#000000","#ffffff" ]
							    ,vrb :   0
							
							});
							
						 
							const box = $(`#box_${item.index}`);
							box.append(svgNode);
							
						}
						else if(type == 'stockItem') //랙별재고조회에서 출력된 부품바코드
						{
							
					//		<div class="barcodePrint_Box" id="box_${item.index}"></div>
					//					<label class="barcodePrint_itemId">${item.itemId}</label>
					//					<label class="barcodePrint_itemDataId">wr${item.dataId}</label>
					//			 		<label class="barcodePrint_itemNo">${item.itemNo}</label>
					//			 		<label class="barcodePrint_itemName">${item.itemName}</label> 
					//			 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
					//			 		<label class="barcodePrint_code">${lcd}</label>
					//			 		<label class="barcodePrint_storConsignCustCode">${item.storConsignCustCode}</label>
					//			 		<label class="barcodePrint_rackCode">${item.rackCode}</label>
					
							barcodePrintDiv.append(`<div class="barcodePrint_Div">
										<div class="barcodePrint_Box" id="box_${item.index}"></div>
										<label class="barcodePrint_code">${lcd}</label> 
										<label class="barcodePrint_itemId">${item.itemId}</label> 
								 		<label class="barcodePrint_itemNo">${item.itemNo}</label>
								 		<label class="barcodePrint_itemName">${item.itemName}</label> 
								 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
								 		<label class="barcodePrint_storConsignCustCode">${item.storConsignCustCode}</label>
								 		<label class="barcodePrint_itemIdx">#${data.item.unitIdx}#</label>
								 	</div>`);
					  
							const 
							svgNode = DATAMatrix({
							 
							// t = 타입  => si는 부품타입중에 랙별재고에서 뽑은 타입
							// n = 아이템번호 
							// i = 아이템 아이디
							// c = 소유자 업체코드
							// r = 랙이름
							// rc = 랙코드
							// sc = 창고코드
							     msg :  `#${data.item.unitIdx}#`
							    ,dim :   82
							    ,rct :   0
							    ,pad :   2
							    ,pal : [  "#000000","#ffffff" ]
							    ,vrb :   0
							
							});
							
						 
							const box = $(`#box_${item.index}`);
							box.append(svgNode);
					
						}
						else if (type == 'storageUseLabel')
						{
							barcodePrintDiv.append(`<div class="barcodePrint_Div">
										 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
								 		<table class="barcodePrint_table">
								 			<tr>
							 					<th class="barcodePrint_th" scope="col">업체</th>
							 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
								 			</tr>
								 			<tr>
							 					<th  class="barcodePrint_th" scope="col">관리번호</th>
							 					<td class="barcodePrint_td barcodePrint_reqNo">창고사용/${item.storageUseReqNo}_${item.reqSeq}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">랙번호</th>
							 					<td class="barcodePrint_td">${item.rackName}(${item.rackCode})</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품번</th>
							 					<td class="barcodePrint_td">${item.itemNo}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품명</th>
							 					<td class="barcodePrint_td">${item.itemName}</td>
								 			</tr>
								 		</table>
								 	</div>`);
								 	
							const 
							svgNode = DATAMatrix({
							
							//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
							     msg :  `${window.location.host}/logis/storage-use-req-list?popup=open#info1!!2024-02-01!2024-05-07!!${item.storageUseReqNo}!`
							    ,dim :   56
							    ,rct :   0
							    ,pad :   2
							    ,pal : [  "#000000","#ffffff" ]
							    ,vrb :   0
							
							});
							
						 
							const box = $(`#box_${item.index}`);
							box.append(svgNode);
						}
						else if(type == 'rlReqLabel')
						{
							barcodePrintDiv.append(`<div class="barcodePrint_Div">
										 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
								 		<table class="barcodePrint_table">
								 			<tr>
							 					<th class="barcodePrint_th" scope="col">업체</th>
							 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
								 			</tr>
								 			<tr>
							 					<th  class="barcodePrint_th" scope="col">관리번호</th>
							 					<td class="barcodePrint_td barcodePrint_reqNo">출고/${item.rlReqNo}_${item.reqSeq}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">랙번호</th>
							 					<td class="barcodePrint_td">${item.rackName}(${item.rackCode})</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품번</th>
							 					<td class="barcodePrint_td">${item.itemNo}</td>
								 			</tr>
								 			<tr>
							 					<th class="barcodePrint_th"  scope="col">품명</th>
							 					<td class="barcodePrint_td">${item.itemName}</td>
								 			</tr>
								 		</table>
								 	</div>`);
								 	
							const 
							svgNode = DATAMatrix({
							
							//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
							     msg :  `${window.location.host}/logis/rl-req-list?popup=open#info1!!2024-04-02!2024-05-08!!!!!!${item.rlReqNo}!!!!`
							    ,dim :   56
							    ,rct :   0
							    ,pad :   2
							    ,pal : [  "#000000","#ffffff" ]
							    ,vrb :   0
							
							});
							
						 
							const box = $(`#box_${item.index}`);
							box.append(svgNode);
						}
					}); 
//    ,#{barCodeType}, 
//			#{comCode} , #{itemId} , #{rackCode} , #{memo}
    
   
	
}

//구 바코드 출력부분
//function barcodeSet2(item, type)
//{
//	const barcodePrintDiv =  $("#barcodePrintDiv") 
//	let today = new Date();   
//
//	let year = today.getFullYear(); // 년도
//	let month = ((today.getMonth() + 1)+'').padStart(2,0);  // 월
//	let date = (today.getDate()+'').padStart(2,0);  // 날짜 
//	 
//   
//   if(type == 'item') //수동입출고에서 출력한 부품타입
//   {
//	
//		barcodePrintDiv.append(`<div class="barcodePrint_Div">
//					<div class="barcodePrint_Box" id="box_${item.index}"></div>
//					<label class="barcodePrint_itemId">${item.itemId}</label>
//					<label class="barcodePrint_itemDataId">wr${item.dataId}</label>
//			 		<label class="barcodePrint_itemNo">${item.itemNo}</label>
//			 		<label class="barcodePrint_itemName">${item.itemName}</label> 
//			 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
//			 		<label class="barcodePrint_code">${lcd}</label>
//			 		<label class="barcodePrint_storConsignCustCode">${item.storConsignCustCode}</label>
//			 		<label class="barcodePrint_rackCode">${item.rackCode}</label>
//			 	</div>`);
//  
//		const 
//		svgNode = DATAMatrix({
//		
//		// t = 타입  => i는 부품타입(수동입출고)
//		// n = 아이템번호 
//		// i = 수동입출고처리번호_순번
//		// c = 발행된 수동입출고 처리를 한 컴코드 
//		     msg :  `{="t":"i","n":"${item.itemNo}","i":"wr${item.dataId}","c":"${encodeURI(lcd)}"=}`
//		    ,dim :   82
//		    ,rct :   0
//		    ,pad :   2
//		    ,pal : [  "#000000","#ffffff" ]
//		    ,vrb :   0
//		
//		});
//		
//	 
//		const box = $(`#box_${item.index}`);
//		box.append(svgNode);
//	}
//	else if(type == 'rack') //재고관리/랙 에서 출력한 랙바코드
//	{
//		barcodePrintDiv.append(`<div class="barcodePrint_Div">
//					<div class="barcodePrint_Box" id="box_${item.index}"></div> 
//			 		<label class="barcodePrint_rackName">${item.rackName}</label> 
//			 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
//			 	</div>`);
//			 	
//		const 
//		svgNode = DATAMatrix({  //랙은 추가정보 없이 위치정보인 랙이름 그대로를 담음 영어숫자특수문자(1바이트한정)은 상관없으나 한글과같은 타입은 url인코딩후 함 일단 한글이름은 사라질 예정이나 혹시몰라서 이런식으로 뽑히게 함 
//		
//		//	랙은 이름 자체가 위치좌표를 나타내는 코드가 되어 그 자체를 발행  
//		     msg :  encodeURI(item.rackName)
//		    ,dim :   82
//		    ,rct :   0
//		    ,pad :   2
//		    ,pal : [  "#000000","#ffffff" ]
//		    ,vrb :   0
//		
//		});
//		
//	 
//		const box = $(`#box_${item.index}`);
//		box.append(svgNode);
//	}
//	else if(type == 'pcLabel') //주문접수에 대한 라벨
//	{
// 
//		
//		barcodePrintDiv.append(`<div class="barcodePrint_Div">
//					 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
//			 		<table class="barcodePrint_table">
//			 			<tr>
//		 					<th class="barcodePrint_th" scope="col">업체</th>
//		 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
//			 			</tr>
//			 			<tr>
//		 					<th  class="barcodePrint_th" scope="col">관리번호</th>
//		 					<td class="barcodePrint_td barcodePrint_reqNo">주문/${item.pcReqNo}_${item.reqSeq}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">랙번호</th>
//		 					<td class="barcodePrint_td">${item.rackName}(${item.rackCode})</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품번</th>
//		 					<td class="barcodePrint_td">${item.itemNo}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품명</th>
//		 					<td class="barcodePrint_td">${item.itemName}</td>
//			 			</tr>
//			 		</table>
//			 	</div>`);
//			 	
//		const 
//		svgNode = DATAMatrix({
//		
//		//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
//		     msg :  `${window.location.host}/order/pc-req-list?popup=open#info1!${item.pcReqNo}!!!Y!!!!!`
//		    ,dim :   56
//		    ,rct :   0
//		    ,pad :   2
//		    ,pal : [  "#000000","#ffffff" ]
//		    ,vrb :   0
//		
//		});
//		
//	 
//		const box = $(`#box_${item.index}`);
//		box.append(svgNode);
//		//console.log(item);
//		
////		http://localhost:18280/order/pc-req-list#info1!20240227003!!!Y!!!!!
//	}
//	else if(type == 'ctLabel') // 회수접수에 대한 라벨
//	{
//		
// 
//		
//		barcodePrintDiv.append(`<div class="barcodePrint_Div">
//					 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
//			 		<table class="barcodePrint_table">
//			 			<tr>
//		 					<th class="barcodePrint_th" scope="col">업체</th>
//		 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
//			 			</tr>
//			 			<tr>
//		 					<th  class="barcodePrint_th" scope="col">관리번호</th>
//		 					<td class="barcodePrint_td barcodePrint_reqNo">회수/${item.ctReqNo}_${item.reqSeq}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">랙번호</th>
//		 					<td class="barcodePrint_td">${item.selectRack}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품번</th>
//		 					<td class="barcodePrint_td">${item.itemNo}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품명</th>
//		 					<td class="barcodePrint_td">${item.itemName}</td>
//			 			</tr>
//			 		</table>
//			 	</div>`);
//			 	
//		const 
//		svgNode = DATAMatrix({
//		
//		//회수 접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
//		     msg :  `${window.location.host}/order/ct-req-list?ymdIgnoreYN=y&ctReqNo=${item.ctReqNo}&popup=open`
//		    ,dim :   56
//		    ,rct :   0
//		    ,pad :   2
//		    ,pal : [  "#000000","#ffffff" ]
//		    ,vrb :   0
//		
//		});
//		
//	 
//		const box = $(`#box_${item.index}`);
//		box.append(svgNode);
//		
//	}
//	else if(type == 'stockItem') //랙별재고조회에서 출력된 부품바코드
//	{
//		
////		<div class="barcodePrint_Box" id="box_${item.index}"></div>
////					<label class="barcodePrint_itemId">${item.itemId}</label>
////					<label class="barcodePrint_itemDataId">wr${item.dataId}</label>
////			 		<label class="barcodePrint_itemNo">${item.itemNo}</label>
////			 		<label class="barcodePrint_itemName">${item.itemName}</label> 
////			 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
////			 		<label class="barcodePrint_code">${lcd}</label>
////			 		<label class="barcodePrint_storConsignCustCode">${item.storConsignCustCode}</label>
////			 		<label class="barcodePrint_rackCode">${item.rackCode}</label>
//
//		barcodePrintDiv.append(`<div class="barcodePrint_Div">
//					<div class="barcodePrint_Box" id="box_${item.index}"></div>
//					<label class="barcodePrint_code">${lcd}</label> 
//					<label class="barcodePrint_itemId">${item.itemId}</label> 
//			 		<label class="barcodePrint_itemNo">${item.itemNo}</label>
//			 		<label class="barcodePrint_itemName">${item.itemName}</label> 
//			 		<label class="barcodePrint_itemYMD">${year + '.' + month + '.' + date}</label>
//			 		<label class="barcodePrint_storConsignCustCode">${item.storConsignCustCode}</label>
//			 		<label class="barcodePrint_rackCode">${item.rackCode}</label>
//			 	</div>`);
//  
//		const 
//		svgNode = DATAMatrix({
//		 
//		// t = 타입  => si는 부품타입중에 랙별재고에서 뽑은 타입
//		// n = 아이템번호 
//		// i = 아이템 아이디
//		// c = 소유자 업체코드
//		// r = 랙이름
//		// rc = 랙코드
//		// sc = 창고코드
//		     msg :  `{="t":"si","n":"${item.itemNo}","i":"${item.itemId}","c":"${encodeURI(item.storConsignCustCode)}","r":"${encodeURI(item.rackName)}","rc":"${item.rackCode}","sc":"${item.storCode}"=}`
//		    ,dim :   82
//		    ,rct :   0
//		    ,pad :   2
//		    ,pal : [  "#000000","#ffffff" ]
//		    ,vrb :   0
//		
//		});
//		
//	 
//		const box = $(`#box_${item.index}`);
//		box.append(svgNode);
//
//	}
//	else if (type == 'storageUseLabel')
//	{
//		barcodePrintDiv.append(`<div class="barcodePrint_Div">
//					 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
//			 		<table class="barcodePrint_table">
//			 			<tr>
//		 					<th class="barcodePrint_th" scope="col">업체</th>
//		 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
//			 			</tr>
//			 			<tr>
//		 					<th  class="barcodePrint_th" scope="col">관리번호</th>
//		 					<td class="barcodePrint_td barcodePrint_reqNo">창고사용/${item.storageUseReqNo}_${item.reqSeq}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">랙번호</th>
//		 					<td class="barcodePrint_td">${item.rackName}(${item.rackCode})</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품번</th>
//		 					<td class="barcodePrint_td">${item.itemNo}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품명</th>
//		 					<td class="barcodePrint_td">${item.itemName}</td>
//			 			</tr>
//			 		</table>
//			 	</div>`);
//			 	
//		const 
//		svgNode = DATAMatrix({
//		
//		//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
//		     msg :  `${window.location.host}/logis/storage-use-req-list?popup=open#info1!!2024-02-01!2024-05-07!!${item.storageUseReqNo}!`
//		    ,dim :   56
//		    ,rct :   0
//		    ,pad :   2
//		    ,pal : [  "#000000","#ffffff" ]
//		    ,vrb :   0
//		
//		});
//		
//	 
//		const box = $(`#box_${item.index}`);
//		box.append(svgNode);
//	}
//	else if(type == 'rlReqLabel')
//	{
//		barcodePrintDiv.append(`<div class="barcodePrint_Div">
//					 <div class="barcodePrint_Label_Box" id="box_${item.index}"></div> 
//			 		<table class="barcodePrint_table">
//			 			<tr>
//		 					<th class="barcodePrint_th" scope="col">업체</th>
//		 					<td class="barcodePrint_td barcodePrint_tdComName">${item.reqComName}</td>
//			 			</tr>
//			 			<tr>
//		 					<th  class="barcodePrint_th" scope="col">관리번호</th>
//		 					<td class="barcodePrint_td barcodePrint_reqNo">출고/${item.rlReqNo}_${item.reqSeq}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">랙번호</th>
//		 					<td class="barcodePrint_td">${item.rackName}(${item.rackCode})</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품번</th>
//		 					<td class="barcodePrint_td">${item.itemNo}</td>
//			 			</tr>
//			 			<tr>
//		 					<th class="barcodePrint_th"  scope="col">품명</th>
//		 					<td class="barcodePrint_td">${item.itemName}</td>
//			 			</tr>
//			 		</table>
//			 	</div>`);
//			 	
//		const 
//		svgNode = DATAMatrix({
//		
//		//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
//		     msg :  `${window.location.host}/logis/rl-req-list?popup=open#info1!!2024-04-02!2024-05-08!!!!!!${item.rlReqNo}!!!!`
//		    ,dim :   56
//		    ,rct :   0
//		    ,pad :   2
//		    ,pal : [  "#000000","#ffffff" ]
//		    ,vrb :   0
//		
//		});
//		
//	 
//		const box = $(`#box_${item.index}`);
//		box.append(svgNode);
//	}
//	
//}


//바코드 프린트 div찾아서 자식 전체 삭제
function barcodeRemove()
{
	const barcodePrintDiv =  $("#barcodePrintDiv");
	barcodePrintDiv.children('div').remove();
}

//testBarcode({itemId:"1" , itemNo :"000979151E" , itemName : "WIRE SET" ,dataId : "1"});
//testBarcode({itemId:"2" , itemNo :"8T0821468A" , itemName : "휀더 브라켓" ,dataId : "2"});
//testBarcode({itemId:"3" , itemNo :"8T0807331A" , itemName : "좌후 범퍼홀더" ,dataId : "3"});
//testBarcode({itemId:"4" , itemNo :"07119905467" , itemName : "전구" ,dataId : "4"});   
  
  
function barcodePrintItem()
{
	//바코드 div 초기화
	barcodeRemove();
	if(window.location.pathname == '/logis/stock-wr-up') //재고관리/수동출고에서 바코드 출력
	{ 
		//임시로 기존방식도 가능하도록
//		if($("#wrType").val() != 'itemList')
//		{
//			alert("품목정리에서만 바코드인쇄가 가능합니다");
//			return;
//		}

//	 	const consignComCode = $('#consignComCode [value="'+$("#consignComText").val()+'"]').data('custcode');
	 	
	 	const nonConsignCode = AUIGrid.getCheckedRowItems('#grid_wrap').find(r=>r.item.consignCustCode == '' || r.item.consignCustCode == null);
	 	if(nonConsignCode && $("#wrType").val() == 'itemList')
	 	{
			alert('소유업체명이 지정되지 않은 부품이 존재합니다');
			return;
		} 
//	 	if($("#consignComText").val() != barcodeProp.consignComText)
//	 	{
//			alert('소유업체 변경시 수정을 하고 바코드 출력이 가능합니다.')
//			return;
//		} 
	 	
	 	
		const checkedRowItems = AUIGrid.getCheckedRowItems(myGridID).sort((a,b)=>{return a.rowIndex - b.rowIndex}); // 수동입출고내역에서 그리드 정렬조정한순으로 출력되도록 요청사항 들어와서 sort 추가함
		if(checkedRowItems.length == 0) 
		{
			alert("부품을 선택해주세요.");
			return;
		}
		const wrNo =  $("#btnReg").hasClass('disabled')?$("#wrNo").val():'';
		if(wrNo == '')
		{
			alert("수동입출고 등록후 바코드인쇄가 가능합니다")
			return;
		} 	
	  	//체크된 부품을 바코드로 생성
		for(row of checkedRowItems)
		{
		// 	console.log(row);
	 		for(let i = 0 ; i < row.item.printQty ; i++) 
				barcodeSet({itemId:row.item.itemId ,  //부품아이디 
							itemNo :row.item.itemNo ,  //부품번호
							itemName :row.item.itemName , //부품이름
							dataId : wrNo+'_'+row.item.wrSeq ,  //처리번호_순번
//							storConsignCustCode : ($("#wrType").val() != 'itemList'? row.item.storConsignCustCode:consignComCode), //품목정리일경우 마스터에 선택된 업체로, 아닐경우 각 랙의 위탁업체로
							storConsignCustCode : row.item.consignCustCode, //품목정리일경우 마스터에 선택된 업체로, 아닐경우 각 랙의 위탁업체로
						//	rackCode : $("#wrType").val() == 'move'?row.item.moveRackCode:row.item.rackCode,
							index:row.rowIndex+'_'+i} ,  // 행인덱스_현재매수  => html 태그 구별용 인덱스
							'item'); //바코드출력타입
		}
		 
	}
	else if(window.location.pathname == '/base/rack-list') //재고관리/랙 에서 바코드 출력
	{

//		const checkedRowItems = AUIGrid.getCheckedRowItems(myGridID);
//		
//		if(checkedRowItems.length == 0) 
//		{
//			alert("랙을 선택해주세요.");
//			return;
//		} 
//		//체크된 부품을 바코드로 생성
//		for(row of checkedRowItems)
//		{
//			if(row.item.rackCode == null)
//			{
//				alert('저장하지 않은 미등록 랙은 바코드 출력을 할수 없습니다.');
//				return;
//			} 
//	 		 
//			barcodeSet({ rackName :row.item.rackName , //랙이름 
//						storageCode : row.item.storageCode,
//						index:row.rowIndex} ,  // html 태그 구별용 인덱스
//						'rack'); //바코드출력타입
//		}

		alert('랙 바코드 발행은 이제 물류센터 기본랙 페이지에서 가능합니다.');
		setBarcodeProp('notPrint' , true);
		 
	}
	else if(window.location.pathname == '/order/pc-req-item-list') // 물류관리/재고관리-스케쥴/주문접수내역/상세내역에서 라벨출력
	{
		const checkRows =  AUIGrid.getCheckedRowItems(myGridID);
		const reqComName = $("#gvComCode").text();
		const pcReqNo = $("#pcReqNo").text();
	
		
		if(checkRows.length == 0) 
		{
			alert("부품을 선택해주세요.");
			return;
		} 
		
		for(row of checkRows)
		{
			barcodeSet({pcReqNo ,
					   reqComName : `${reqComName}${row?.item?.rcvCustName?`(${row?.item?.rcvCustName})`:''}` ,
					   reqSeq : row.item.reqSeq ,
					   rackName:row.item.rackName ,
					   rackCode:row.item.rackCode ,
					   itemId : row.item.itemId ,
					   itemNo : row.item.itemNo ,
					   itemName : row.item.itemName,
					   index : row.rowIndex},'pcLabel');
		} 
	}
	else if(window.location.pathname == '/order/ct-req-list') // 물류관리/재고관리-스케쥴/회수접수내역/상세내역에서 라벨출력
	{
		const checkRows = AUIGrid.getCheckedRowItems('#grid_wrap2');
		//const reqComName = $("#gvComCode").text();
		//const pcReqNo = $("#pcReqNo").text();
		
		if(checkRows.length == 0) 
		{
			alert("부품을 선택해주세요.");
			return;
		} 
		
		
		for(row of checkRows)
		{
			barcodeSet({ctReqNo : row.item.ctReqNo ,
					   reqComName : `${row.item.reqCustName}${row?.item?.custName?`(${row?.item?.custName})`:''}` ,
					   reqSeq : row.item.reqSeq ,
					   selectRack : (row.item.selectRack ?? '' ), 
					   itemId : row.item.itemId ,
					   itemNo : row.item.itemNo ,
					   itemName : row.item.itemName,
					   index : row.rowIndex},'ctLabel');
	//		console.log(row);
		}  
		
		//레이어팝업에서 프린트 될경우 팝업 다이얼로그가 출력에 영향을 주기 떄문에 프린트 되는동안 숨김 처리하고 꺼지면 다시 보여지고 이 이벤트들 삭제함
		window.onbeforeprint = ()=>{$('.ui-dialog').hide()};
		window.onafterprint = ()=>{
										$('.ui-dialog').show()
										$('.ui-dialog-buttons').hide();
										window.onbeforeprint = null;
										window.onafterprint = null;
								};
	}
	else if(window.location.pathname == '/logis/stock-rack-list') //재고관리/랙별재고에서 바코드출력
	{
		const checkRows =  AUIGrid.getCheckedRowItems(myGridID).sort((a,b)=>{return a.rowIndex - b.rowIndex}); // aui 정렬 변경된 인덱스로 정렬
		
		if(checkRows.length == 0) 
		{
			alert("부품을 선택해주세요.");
			return;
		} 
		
		for(row of checkRows)
		{ 
	//		console.log(row);
			barcodeSet({itemId:row.item.itemId ,  //부품아이디 
						itemNo :row.item.itemNo ,  //부품번호
						itemName :row.item.itemName , //부품이름 
						storConsignCustCode : row.item.storConsignCustCode,
						storCode:row.item.storCode,
						rackName:row.item.rackName,
						rackCode:row.item.rackCode,
						index:row.rowIndex} ,  // 행인덱스_현재매수  => html 태그 구별용 인덱스
						'stockItem'); //바코드출력타입  
		} 
	}
	else if(window.location.pathname == '/logis/stock-up') // 개별 재고 수동처리(팬시박스)
	{
		const itemInfo =  barcodeProp['itemData'];
		if(itemInfo.actionType == 'move') itemInfo.rackCode = itemInfo.afterRackCode;  //이동시 이동랙으로 바코드 출력
		
		
		simplePostAjax('/logis/stock-rack-list',
						{ymIgnoreYN:'Y',itemId:itemInfo.itemId , rackCode:itemInfo.rackCode} , 
						(data)=>{
							
							const item = data.stockRackList[0];
					//		console.log(item)
							barcodeSet({itemId:item.itemId ,  //부품아이디 
										itemNo :item.itemNo ,  //부품번호
										itemName :item.itemName , //부품이름 
										storConsignCustCode : item.storConsignCustCode,
										storCode:item.storCode,
										rackName:item.rackName,
										rackCode:item.rackCode,
										index:0} ,  // 행인덱스_현재매수  => html 태그 구별용 인덱스
										'stockItem'); //바코드출력타입  
						});
	}
	else if(window.location.pathname == '/logis/storage-use-req-item-list')
	{
		const checkRows =  AUIGrid.getCheckedRowItems(myGridID);
		const reqComName = $("#custName").text();
		const storageUseReqNo = $("#storageUseReqNo").text();
	
		
		if(checkRows.length == 0) 
		{
			alert("부품을 선택해주세요.");
			return;
		} 
		
		for(row of checkRows)
		{
			barcodeSet({storageUseReqNo ,
					   reqComName ,
					   reqSeq : row.item.reqSeq ,
					   rackName:row.item.rackName ,
					   rackCode:row.item.rackCode ,
					   itemId : row.item.itemId ,
					   itemNo : row.item.itemNo ,
					   itemName : row.item.itemName,
					   index : row.rowIndex},'storageUseLabel');
		} 
	}
	else if(window.location.pathname == '/logis/rl-req-item-list')
	{
		const checkRows =  AUIGrid.getCheckedRowItems(myGridID);
		const reqComName = $("#custName").val();
		const rlReqNo = $("#rlReqNo").text();
	
		
		if(checkRows.length == 0) 
		{
			alert("부품을 선택해주세요.");
			return;
		} 
		
		for(row of checkRows)
		{
			barcodeSet({rlReqNo ,
					   reqComName ,
					   reqSeq : row.item.reqSeq ,
					   rackName:row.item.rlStandByRackName ,
					   rackCode:row.item.rlStandByRackCode ,
					   itemId : row.item.itemId ,
					   itemNo : row.item.itemNo ,
					   itemName : row.item.itemName,
					   index : row.rowIndex},'rlReqLabel');
		} 
	}
	else if(window.location.pathname == '/logis/logis-rack-list') //재고관리/물류센터기본랙 에서 바코드 출력
	{

//		const checkedRowItems = AUIGrid.getCheckedRowItems(myGridID);
		const checkedRowItems = AUIGrid.getCheckedRowItems(myGridID).sort((a,b)=>{return a.rowIndex - b.rowIndex});
		
		if(checkedRowItems.length == 0) 
		{
			alert("랙을 선택해주세요.");
			return;
		} 
		//체크된 부품을 바코드로 생성
		for(row of checkedRowItems)
		{ 
		 
	 		 
			barcodeSet({ rackName :row.item.logisRackName , //랙이름 
						logisCode : row.item.logisName, //물류센터 코드
						logisRackId : row.item.logisRackId, //물류센터 기본랙 id
						index:row.rowIndex} ,  // html 태그 구별용 인덱스
						'rack'); //바코드출력타입
						 
		}
  
	}
	else{
		console.log(window.location.pathname);
		return;
	}
	 
	//프린트
	
	if(barcodeProp.notPrint){  //옵션으로 프린트 중지속성 들어있을경우 프린트 직전에 함수종료
		setBarcodeProp('notPrint' , false);
		return;
	} 
	
	window.print();
	
	
} 

//--------------- 바코드 읽는 팝업창 관련 
//const rackListMap = {}; 
//function createBarcodeReaderAUIGrid() {
//	const columnLayout = [		 
//			{ dataField : "itemId",      headerText : "부품ID", width : 120, editable : false}
//			,{ dataField : "itemNo",      headerText : "품번", width : 150, editable : false}
//			,{ dataField : "itemName",      headerText : "부품명", width : 250, editable : false}
//			,{ dataField : "qty",     headerText : "수량", width : 90 , editable : false}
//			,{ dataField : "storName",     headerText : "창고명", width : 150 , editable : false}
//			,{ dataField : "storCode",     headerText : "창고코드", width : 100 , editable : false}
//	//		,{ dataField : "rackName",     headerText : "랙이름", width : 100 , editable : false}
//	//		,{ dataField : "rackCode",     headerText : "랙코드", width : 100 , editable : false}
//	//		,{ dataField : "stockQty",     headerText : "재고수량", width : 100 , editable : false}
//			,{dataField : "rack",
//				headerText : "랙",
//				width:200,
////				editRenderer : {
////					type : "DropDownListRenderer",
////					showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
////					// 같은 행의 color 값을 보고 출력시킬 list 를 결정함.
////					listFunction : function(rowIndex, columnIndex, item, dataField) {
////						const param = item.itemId +'_'+item.storCode;
////						const list = rackListMap[param];
////					 
////						return list;
////					}
////				}
//			}  
//			 
//	];
//	const gridPros = {
//		 
//		editable : true
//		
//	};
//	
//
//	
//	//var auiGridProps = {};
//			
//	// 실제로 #grid_wrap 에 그리드 생성
//	AUIGrid.create("#barcodeReader_grid_wrap", columnLayout, gridPros);
//}
//function barcodeReaderOpen()
//{
// 
//	const barcodeReader = $("#dialog-form-barcodeReader").dialog({
//		height: 600,
//		width: 1200,
//		modal: true,
//		headerHeight: 40,
//		position: { my: "center", at: "center", of: window },
//
//		close: function() { 
//			$("#barcodeReaderInput").unbind('keydown');
//			AUIGrid.clearGridData("#barcodeReader_grid_wrap");
//		},
//		open: function(type, data) {
//
//			$("#barcodeReaderInput").bind('keydown',(e)=>{
//				barcodeReaderInputKeyDown(e)
//			})
//			createBarcodeReaderAUIGrid();
//			
//		}
//	});
// } 

//  '/order/ct-req-list'  , '/order/pc-req-item-list'

//주문회수창고사용출고요청등에서의 입력부분 
$("#barcodeReaderInput").bind('keydown',(e)=>{
				barcodeReaderInputKeyDown(e)
				if(e.keyCode == 13) //바코드리더인풋 id를 가진 input태그에서 엔터를 누를때
				{ 
					const textSplit = $("#barcodeReaderInput").val().split('#');   // #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
			 		
					if(textSplit.length ==  3  && !isNaN(textSplit[1])) // #으로 자른 배열이 딱 3이면서 idx가 int형식일때 
					{
						simplePostAjax('/logis/barcodeItem' , //idx타입으로 idx를 보내서 해당 정보 받음
										{barCodeType:'IDX' , itemUnitIdx:textSplit[1]},
										(result)=>{
											if(result.item == null){ //정보가 없을경우 팝업
														itemBarcodeScanfailPopup('조회 실패 (idx)', {t:'temp'});
													 	return;
													 }
											barcodeScanCountUp(); // 현재 페이지에서 스캔횟수
											$("#barcodeReaderInput").val(result.item.itemNo); //해당 input에 품번으로 셋팅 
											itemBarcodeScan(result.item); //각 js에서 구현된 함수에 통신으로 받은 데이터를 넣어줌
										}) 
						
					}
				}
})

function barcodeReaderInputKeyDown(e)
{	
	const barcodeReaderInput = $("#barcodeReaderInput"); 
	if(barcoderInterceptor(barcodeReaderInput ,e.keyCode, 'n')) return;
	 
	if(e.keyCode == 13 && $("#barcodeInput").val() != '')
	{ 
		const itemJson = barcodeToJson($("#barcodeInput").val());
		let data = {};
	 
		if(itemJson.t == 'i') //바코드가 수동입출고에서 나온경우
		{
			const wrNo = itemJson.i.replace('wr','').split('_'); 
			data = 	{barCodeType:'I' ,wrRegComCode:decodeURI(itemJson.c) ,wrNo:wrNo[0] , wrSeq:wrNo[1]};
		} 
		else if(itemJson.t == 'si') //바코드가 랙별재고에서
		{
			data = {barCodeType:'SI'  , rackCode:itemJson.rc , itemId:itemJson.i }; 	
		}
	
		if(data.barCodeType)
		{
			simplePostAjax('/logis/barcodeItem',
							data,
							(result)=>{  
								if(result.item == null ) itemBarcodeScanfailPopup('바코드 데이터 조회에 실패하였습니다' , itemJson); // 조회한 아이템이 null 이라는건 해당 데이터가 db에 존재안함
								else itemBarcodeScan(result.item);
							})
		}
		else
		{
			
		}
		$("#barcodeInput").val(''); //바코드 스캔이 끝나면 바코드 인풋비워줌
	}
}

function simplePostAjax(url,data,s,er = null)
{
	
	$.ajax(	{
			type : "POST",
			url : url,
			dataType : "json",
			data,
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success:function(data){
				if(barcodeDebugMod) console.log(data);
				s(data);
			},
				error:function(x,e){
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
			        if(er != null)
			        	er(x,e);
				}
			});	
	
}
function simplePostAjax2(url,data,s,er = null)
{
	
	$.ajax(	{
			type : "POST",
			url : url,
			dataType : "json",
			data,
			async: false,
			contentType: "application/json; charset=utf-8",
			//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success:function(data){
				if(barcodeDebugMod) console.log(data);
				s(data);
			},
				error:function(x,e){
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
			        if(er != null)
			        	er(x,e);
				}
			});	
	
}

//피킹 패킹 스캔함수 저장용 변수, 실제 구현은 해당 js 파일에서
let itemBarcodeScan = (item) => {console.log(`itemBarcodeScan not defined`)}


//아래함수에 콜백함수를 넣으면 스캔이벤트로 됨 매개변수는 item
function setItemBarcodeScanFun(fun)
{
	itemBarcodeScan = fun;
}

// 바코드 관련 팝업
function itemBarcodeScanfailPopup(text,itemData)
{ 
 	 
 	if($("#dialog-BarcodeScanfailPopup").length == 0)
 	{
	 	$("#barcodePrintDiv").append(`<div id="dialog-BarcodeScanfailPopup" title="바코드 스캔실패" style="display: none; "> 
		 		 <label id="label-itemBarcodeScanfailPopup" style="font-size: 16px; display: flex;   "></label> 
		 		 <label id="label-itemBarcodeScanfailPopup2" style="font-size: 14px; display: flex;   "></label>
		 		 <label id="label-itemBarcodeScanfailPopup3" style="font-size: 14px; display: flex;   "></label> 
	    	 </div>`);
	}
	const dialog = $("#dialog-BarcodeScanfailPopup").dialog({
		height: 200,
		width: 400,
		modal: true,
		headerHeight: 40,
		position: { my: "center", at: "center", of: window },
		buttons: {
							"확인": (event)=>{
							 	dialog.dialog("close");
							}	 
						},
		close: function() {
			 
		},
		open: function(type, data) { 
			$(':focus').blur(); 
			const dialogPopupParent = $("#dialog-BarcodeScanfailPopup").parent();
			 
			$('.ui-button ui-corner-all ui-widget').blur();
			$("#label-itemBarcodeScanfailPopup").text(text);
			if(itemData.t == 'i') // 수동입출고 정보 없을때 데이터 내역
			{
				const wrNo = itemData.i.replace('wr','').split('_');
				$("#label-itemBarcodeScanfailPopup2").text(`출력업체코드 : ${decodeURI(itemData.c)} / 품번 : ${itemData.n}`);
				$("#label-itemBarcodeScanfailPopup3").text(`처리번호 : ${wrNo[0]} / 순번 : ${wrNo[1]}`);
			}
			else if(itemData.t =='si') // 랙별재고 정보가 없을때 내역  
			{ 
				$("#label-itemBarcodeScanfailPopup2").text(`품번 : ${itemData.n} / 부품ID : ${itemData.i}`);
				$("#label-itemBarcodeScanfailPopup3").text(`창고코드 : ${itemData.sc} / 랙코드 : ${itemData.rc}`);
			}
			else if(itemData.t = 'temp')
			{
				$("#label-itemBarcodeScanfailPopup2").text(``);
				$("#label-itemBarcodeScanfailPopup3").text(``);
			}
			else // 바코드의 정보로 통신은 성공했는데 다른이유로 실패할경우 통신으로 가져온 데이터를 보여줌
			{
				$("#label-itemBarcodeScanfailPopup2").text(`품번 : ${itemData.itemNo} / 부품ID : ${itemData.itemId}`);
				$("#label-itemBarcodeScanfailPopup3").text(`창고코드 : ${itemData.storCode} / 랙코드 : ${itemData.rackCode}`);
			}
			dialogPopupParent.css('border-color','#d63939');
			dialogPopupParent.css('border-width','2px');
			

			$(".ui-dialog-titlebar-close").hide();
		 
		}
	}) 
	
}
 
// input클래스명, 부품바코드 key 넣으면 해당 클래스인풋에 #idx#타입 치고 엔터치면 해당바코드내 데이터의 key값의 정보 불러옴
function inputBarcodeEnterSet(inputClassName , itemKey)
{
	if($(inputClassName).length == 0) return; // 해당 클래스 0개면 그냥 종료
	
	$(inputClassName).keydown((e)=>{  //input type text 에 barcodeReaderInput_itemNo킄래스 추가하면 이벤트 자동 추가
 	 
			const inputHTML =$(inputClassName);
			
			// 키입력이 {= 연속으로 시작되면 이후 키다운 이벤트를 가져가서 바코드 스캔시작 . 엔터키를 누르면 그동안 입력된 문자열을 json으로 변환하여 i키 가져옴 이외의 입력은 무시
			if(itemKey == 'itemNo')
			{
				if(barcoderInterceptor(inputHTML ,  e.keyCode , 'n')) return; 
			}
			
			if(e.keyCode == 13) //엔터키를 눌렀을때
			{
				const textSplit = inputHTML.val().split('#');   // #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
				if(textSplit.length ==  3  && !isNaN(textSplit[1]) ) // #으로 자른 배열이 딱 3이면서 idx가 int형식일때
				{ 
					simplePostAjax('/logis/barcodeItem' , //idx타입으로 idx를 보내서 해당 정보 받음
									{barCodeType:'IDX' ,  itemUnitIdx:textSplit[1]},
									(result)=>{
										if(result.item == null){//정보가 없을경우 팝업
													itemBarcodeScanfailPopup('조회 실패 (idx)', {t:'temp'});
												 	return;
												 }
										inputHTML.val(result.item[itemKey]); //input에 받아온 데이터중 itemNo로 셋팅
									}) 
					
				}
			} 
	}) 
}
// 랙바코드에 대한 처리
function inputRackBarcodeEnterSet(inputClassName , itemKey)
{
	
	if($(inputClassName).length == 0) return; // 해당 클래스 0개면 그냥 종료
	
	$(inputClassName).keydown((e)=>{  //input type text 에 barcodeReaderInput_itemNo킄래스 추가하면 이벤트 자동 추가
 	 
			const inputHTML =$(inputClassName);
			// 키입력이 {= 연속으로 시작되면 이후 키다운 이벤트를 가져가서 바코드 스캔시작 . 엔터키를 누르면 그동안 입력된 문자열을 json으로 변환하여 i키 가져옴 이외의 입력은 무시
//			if(itemKey == 'itemNo')
//			{
//				if(barcoderInterceptor(inputHTML ,  e.keyCode , 'n')) return; 
//			}
			
			if(e.keyCode == 13) //엔터키를 눌렀을때
			{
				const textSplit = inputHTML.val().split('@');   // #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
				if(textSplit.length ==  3  && !isNaN(textSplit[1]) ) // #으로 자른 배열이 딱 3이면서 idx가 int형식일때
				{ 
					simplePostAjax('/logis/barcodeItem' , //idx타입으로 idx를 보내서 해당 정보 받음
									{barCodeType:'LOGISRACK_IDX' ,  logisRackIdx:textSplit[1]},
									(result)=>{
										if(result.item == null){//정보가 없을경우 팝업
													itemBarcodeScanfailPopup('조회 실패 (idx)', {t:'temp'});
												 	return;
												 }
										inputHTML.val(result.item[itemKey]); //input에 받아온 데이터중 itemNo로 셋팅
									}) 
					
				}
			} 
	}) 
}

//아래 클래스가 textinput 태그에 클래스로 추가되어있고 이 js가 들어있으면 자동으로 해당 태그에 바코드 불러오는 기능이 반영됨 
inputBarcodeEnterSet('.barcodeReaderInput_itemNo' , 'itemNo');
inputBarcodeEnterSet('.barcodeReaderInput_itemId' , 'itemId');
inputBarcodeEnterSet('.barcodeReaderInput_itemName' , 'itemName');
inputBarcodeEnterSet('.barcodeReaderInput_rackCode' , 'rackCode');
inputBarcodeEnterSet('.barcodeReaderInput_rackName' , 'rackName');


//랙스캔시 아래 클래스로 이벤트 설정
inputRackBarcodeEnterSet('.barcodeReaderInput_logisRack_logisRackId' , 'logisRackId');
inputRackBarcodeEnterSet('.barcodeReaderInput_logisRack_logisCode' , 'logisCode');
inputRackBarcodeEnterSet('.barcodeReaderInput_logisRack_logisRackName' , 'logisRackName');


//다중 부품조회의 id,No idx바코드 대응
$(".barcodeReaderInput_bulk").keydown((e)=>{ //input type text 에 barcodeReaderInput_bulk 킄래스 추가하면 이벤트 자동 추가
			const item_bulk =$(".barcodeReaderInput_bulk"); 
			if(barcoderInterceptor(item_bulk, e.keyCode  , 'n')) return;
			
			
			
			if(e.keyCode == 13) // 엔터이벤트
			{ 
				const textSplit = item_bulk.val().split('\n');  //개행으로 나눔
				const textSplit2 = textSplit[textSplit.length-1].split('#');    //마지막행을 #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
				if(textSplit2.length ==  3  && !isNaN(textSplit2[1])  ) // #으로 자른 배열이 딱 3이면서 idx가 int형식일때
				{ 
					simplePostAjax('/logis/barcodeItem' , //idx타입으로 idx를 보내서 해당 정보 받음
									{barCodeType:'IDX' ,  itemUnitIdx:textSplit2[1]}, 
									(result)=>{
										if(result.item != null) 
										{
											let text = '';
											textSplit[textSplit.length-1]=result.item[$(':radio[name="bulkSrchType"]:checked').val()];
											for(item of textSplit)
											{
												if(text != '') text += '\n';
												text += item;
											}
											item_bulk.val(text);	
										} 
									}
								); 
				}  
			} 
		}
)

//aui cellEditEnd이벤트(셀 편집 엔터 이벤트)에 if(auigridItemUnitBarcodeScan(event)) return 식으로 넣어주면 셀내에 반영됨
function auigridItemUnitBarcodeScan(event)
{
	const cellValue =  AUIGrid.getCellValue(myGridID,event.rowIndex,event.dataField);
	if(cellValue == null) return false;
	if(cellValue.indexOf('#')==-1) return false;  // '#이 포함안된 문자열이라 해당없음'
	
	const textSplit = cellValue.split('#');    // #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
	if(textSplit.length ==  3  && !isNaN(textSplit[1]))// #으로 자른 배열이 딱 3이면서 idx가 int형식일때 
	{ 
		simplePostAjax('/logis/barcodeItem' ,//idx타입으로 idx를 보내서 해당 정보 받음
						{barCodeType:'IDX' ,  itemUnitIdx:textSplit[1]},
						(result)=>{ 
								if(result.item == null){ //정보가 없을경우 팝업
										itemBarcodeScanfailPopup('조회 실패 (idx)', {t:'temp'});
									 	return;
								}
									
								//추가정보스캔 체크박스가 체크되어 있고 반환된 데이터가 출력된 컴코드가 현재 컴코드와 일치할경우 랙정보 불러옴
								const item = barcodeDataScan($("#barcodeDeepLoadYN").is(':checked') && (result.item.comCode == lcd) , result.item); 
								item['qty'] =1;
									
								AUIGrid.updateRow(myGridID,  //AUIGrid에 데이터 셋
												 item,
											      event.rowIndex); 
						}
		)
		if(AUIGrid.getCellValue(myGridID,event.rowIndex,'qty') != null) return true; //통신에 성공하여 정상적으로 입력된경우 	
	}
	
	return false; //정상적으로 입력된경우 위쪽에서 true로 리턴하는데 여기까지 왔다는건 통신에 실패한경우
} 

//aui cellEditEnd이벤트(셀 편집 엔터 이벤트)에 if(auigridItemRackBarcodeScan(event)) return 식으로 넣어주면 셀내에 반영됨
function auigridRackBarcodeScan(event)
{
	const cellValue =  AUIGrid.getCellValue(myGridID,event.rowIndex,event.dataField);
	if(cellValue == null) return false;
	if(cellValue.indexOf('@')==-1) return false;  // '#이 포함안된 문자열이라 해당없음'
	
	const textSplit = cellValue.split('@');    // #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
	if(textSplit.length ==  3  && !isNaN(textSplit[1]))// #으로 자른 배열이 딱 3이면서 idx가 int형식일때 
	{ 
		simplePostAjax('/logis/barcodeItem' ,//idx타입으로 idx를 보내서 해당 정보 받음
						{barCodeType:'LOGISRACK_IDX' ,  logisRackIdx:textSplit[1]},
						(result)=>{ 
								console.log(result);
								console.log(textSplit);
								if(result.item == null){ //정보가 없을경우 팝업
										itemBarcodeScanfailPopup('조회 실패 (idx)', {t:'temp'});
									 	return;
								}
									
								//추가정보스캔 체크박스가 체크되어 있고 반환된 데이터가 출력된 컴코드가 현재 컴코드와 일치할경우 랙정보 불러옴
								const item = {logisRackName:result.item.logisRackName,
												logisRackId : result.item.logisRackId,
												rackName : result.item.logisRackName 
								};
									
								AUIGrid.updateRow(myGridID,  //AUIGrid에 데이터 셋
												 item,
											      event.rowIndex); 
						}
		)
		if(AUIGrid.getCellValue(myGridID,event.rowIndex,'logisRackId') != null) return true; //통신에 성공하여 정상적으로 입력된경우 	
	}
	
	return false; //정상적으로 입력된경우 위쪽에서 true로 리턴하는데 여기까지 왔다는건 통신에 실패한경우
} 

//첫번째 매개변수에 따라(체크박스), 두번쨰 객체에서 가져오는 데이터의 양이 달라지며 그 가져온 데이터를 반환 하는 함수
function barcodeDataScan(isDeepLoad , obj)
{
	if(isDeepLoad)
	{
		return {itemId : obj.itemId,
				itemNo : obj.itemNo,
				itemName : obj.itemName,
				storName:obj.storName,
				storCode:obj.storCode,
				rackName:obj.rackName,
				rackCode:obj.rackCode,
				consignCustCode:obj.consignCustCode,
				consignCustName:obj.consignCustName
				}
	}
	else
	{
		return {
					itemId : obj.itemId,
					itemNo : obj.itemNo,
					itemName : obj.itemName ,
					consignCustCode:obj.consignCustCode,
					consignCustName:obj.consignCustName
				}
	}
}

function barcodeScanCountUp()
{
	barcodeProp['scanCount'] = (barcodeProp['scanCount'] || 0) +1;
}
function barcodeScanSuccessCountUp()
{
	barcodeProp['scanSuccessCount'] = (barcodeProp['scanSuccessCount'] || 0) +1;
}


const soundType = {sine:'sine' ,square : 'square' , triangle : 'triangle' , sawtooth:'sawtooth' }
/**
	soundType과 멈추는 시간을 넣어 효과음 재생
 */
function effectSound(type, stopTime) {	
	const context = new AudioContext()
    o = context.createOscillator()
    g = context.createGain()
    o.connect(g)
    o.type = type
    g.connect(context.destination)
    o.start(0)
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + stopTime)

}

/**
	효과음 1
 */
function soundPlay1()
{
	effectSound(soundType.sine , 1);
}

// url 바코드 스캔(주문 회수 창고사용의 라벨)시 해당 url을 파싱해서 타입과 요청번호를 객체에 담아 넘겨주는 함수
function urlBarcodeParse(barcode)
{
 
	if(barcode.includes('www.4car.co.kr'))
	{
		try{//불확실한 string의 길이를 알수없어 어디서 null 이슈 뜰지 몰라 try catch로 함
				const textSplit = barcode.split('?'); // 
				const textSplit2 = textSplit[0].split('/');
				
				
				const type = textSplit2[2];
				let reqNo = 0;
				
				if(type == 'pc-req-list')
					reqNo = textSplit[1].split('#info1!')[1].split('!')[0];
				else if(type == 'ct-req-list')
					reqNo = textSplit[1].split('ctReqNo=')[1].split('&')[0];
				else if(type == 'storage-use-req-list')
				{
					const textSplit3 = textSplit[1].split('!');
					
					 
					reqNo = textSplit3[5];
				} 
				else if(type == 'rl-req-list')
				{
					const textSplit3 = textSplit[1].split('!');
					reqNo = textSplit3[9];
				}
				
				
				return {resultMsg : '성공' ,type, reqNo , url : barcode}
			}
			catch(e)
			{ 
				return { resultMsg : 'url 파싱에 실패하였습니다', url : barcode};
			}
	}
	else
	{ 
		return {resultMsg : 'url이 아닙니다',url : barcode};
	}	
}