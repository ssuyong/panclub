
let scanItemInfo = {};  //스캔된 부품정보를 보관하는 객체변수  
let selectRackInfo = {}; // 스캔된 랙정보를 보관하는 객체변수

// iTr_Id_'reqSeq'_'itemNo'_'storConsignCustCode'_'logisRackId' 를 선택자로 검색하면 해당 정보를 기반으로 태그 검색 가능
let reqItemList = []; //불러온 요청의 디테일중 미처리된 요청의 부품을 담는 배열
let tempConsignCode = ''; // i타입의 경우 임시로 위탁 업체 코드 보관용


$(document).ready(function(){
	$("#iDiv_itemSelectBox").css('max-height' , window.innerHeight-70); // 레이어팝업 최대 크기 지정
	
	
	//url 파라미터가 있을경우 페이지 열릴떄 해당 요청 조회
	const urlParams = new URL(location.href).searchParams;
	const type = urlParams.get('type');
	const reqNo = urlParams.get('reqNo');
	 
	console.log({type,reqNo}); 
	if(urlParams.get('type'))
	{
		findReq(type,reqNo);
	}
	 
}) 
  
//키입력에 대한 이벤트
$("body").bind("keydown",(e)=>{ 
 

	if(e.keyCode == 13) //test  엔터시 발동 =>pc테스트용
	{
		const barcodeInput = $("#iInput_barcode");

	}
	else if(e.keyCode == 0) // pda 스캔버튼 (스캔버튼이 키코드 0)
	{
		tempConsignCode = '';
		
		$("#iInput_barcode").focus(); 
	
		setTimeout(function() { 
			
			 
			const barcodeInput = $("#iInput_barcode");
	 	 
	 		if(barcodeInput.val() == '') return;  
		
			const barcodeType = getBarcodeValue(barcodeInput.val(),'t');
	 
			switch(barcodeType)
			{
				case 'R':
					const rack = $("#rack");
					const code = getBarcodeValue(barcodeInput.val(),'c');
					rack.val(code);
				
				break;
				case 'I':
					tempConsignCode = decodeURI(getBarcodeValue(barcodeInput.val(),'c'));
 					
					itemBarcodeScan(getBarcodeValue(barcodeInput.val(),'i'));
					
				break;
				case 'S': 
					soundPlay1(); 
				break;
				default:
				
				const isRackScan = ((barcodeInput.val().length==14) && (barcodeInput.val().split('-').length==5)) || (barcodeInput.val().split('@').length == 3)
				
				
					
				itemBarcodeScan(getBarcodeValue(barcodeInput.val(),'n') , isRackScan);
				
				//curFocus.val(barcodeInput.val());
				//curFocus.focus();
				//alert("잘못된 바코드입니다");
			}
		  	 
			barcodeInput.val('');
			
//			if(curFocus != barcodeInput)
			barcodeInput.blur();
		
		
			
		},400)
		
	} 
})
 
//바코드 스캔 이벤트 => 바코드 종류에 따라 분기 
setItemBarcodeScanFun((barcode,isRackSacn)=>{ 
	if(isRackSacn) //랙스캔시
	{
		rackScan(barcode);
	}
	else if(barcode.includes('www.4car.co.kr')) //url바코드
	{
		
		const {resultMsg ,type, reqNo , url  } = urlBarcodeParse(barcode);
		if(resultMsg == '성공')
		{
			const typeText = type == 'pc-req-list' ? '주문요청' :
							 type == 'ct-req-list' ? '회수요청' :
							 type == 'storage-use-req-list' ? '창고사용요청' : '실패';
			if(typeText == '실패')
			{
				alert(typeText); 
				return;
			}
			$("#iSelectPickingType").val(typeText);
			$("#iInput_reqNo").val(reqNo);
			$("#iButton_reqNoFind").trigger('click');
		}
		else 
		{
			alert(`${resultMsg}\nurl:${url}`);
		}
		 
	}
	else //랙도 아니고 url도 아니면 부품 
	{
		itemScan(barcode); 
	}
})

// 랙바코드 스캔
function rackScan(inputLogisRackName)
{ 
	 //구 바코드인지 여부 조사
	 const isOldRackBarcode = (inputLogisRackName.length==14) && (inputLogisRackName.split('-').length==5);
	 
	 //랙스캔시 아이템 스캔정보 초기화
	 $("#iLabel_itemNo").html('');
	 scanItemInfo = {};
	 
	 if(isOldRackBarcode)
	 {
		 
		simplePostAjax("/logis/logis-rack-list" ,
							{"logisRackName": inputLogisRackName},
							(result)=>{ 
								if( result.logisRackList.length ==0) {
									alert("해당 랙이름은 물류센터 기본랙에 존재하지 않는 랙입니다");
									return;
								}
								const rackInfo = result.logisRackList.filter((rack)=>{if(rack.logisCode == '용인1') return true;})[0];
								selectRackInfo = {comCode : rackInfo.comCode , logisCode : rackInfo.logisCode 
												, logisCodeName : rackInfo.logisName ,  logisRackId : rackInfo.logisRackId 
												, logisRackName : rackInfo.logisRackName , memo : rackInfo.memo 
												, validYN : rackInfo.validYN};
							 	$("#iLabel_scanRackName").html(selectRackInfo.logisRackName);
							}) 
	 }
	 else
	 {
		//idx타입 바코드 인지 확인
		const textSplit = inputLogisRackName.split('@');
		if(textSplit.length != 3) return; //바코드 규격에 안맞음
		if(isNaN(textSplit[1])) return; //숫자가 아님
		
		simplePostAjax('/logis/barcodeItem' , //idx타입으로 idx를 보내서 해당 정보 받음
									{barCodeType:'LOGISRACK_IDX' ,  logisRackIdx:textSplit[1]},
									(result)=>{
										if(result.item == null){
													alert("해당 랙이름은 물류센터 기본랙에 존재하지 않는 랙입니다."); 
												 	return;
												 } 
										selectRackInfo = result.item; 
										$("#iLabel_scanRackName").html(selectRackInfo.logisRackName);
									})
		
  	 }
}

//부품 스캔
function itemScan(barcodeInput)
{ 
	if($(".ui-dialog").css('display') == 'block') //레이어팝업이 열려있으면 막힘
	{  
		soundPlay1();
		return;
	}
	
	if(Object.keys(selectRackInfo).length ==0 )
	{
		soundPlay1();
		alert(`랙선택후 부품을 스캔해주세요.`);
		return;
	}

	 
	let items = null; 
	

	
	if(barcodeInput == '') {}
	else if(barcodeInput.indexOf('#') == -1) // #이 없을때 품번 직접조회
	{
		 
	  simplePostAjax( '/logis/barcodeItem' , 
			{
				barCodeType:'I',
				wrRegComCode : tempConsignCode ,
				wrNo : barcodeInput.replace('wr','').split('_')[0],
				wrSeq : barcodeInput.replace('wr','').split('_')[1]
			} , (result)=>{items = result.item;
				 
						 
						  })
	}
	else
	{
		const textSplit = barcodeInput.split('#');   // #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
		if(textSplit.length ==  3  && !isNaN(textSplit[1]) ) // #으로 자른 배열이 딱 3이면서 idx가 int형식일때
		{ 
			simplePostAjax('/logis/barcodeItem' , //idx타입으로 idx를 보내서 해당 정보 받음
							{barCodeType:'IDX' ,  itemUnitIdx:textSplit[1] , logisRackIdx : selectRackInfo.logisRackId || '' },
							(result)=>{
								if(result.item == null){//정보가 없을경우 팝업
											
										 	return;
										 }
								items = result.item; 
								 
					//			$("#iInput_itemNo").val(result.item['itemNo']);
							}) 
					
		}
		
	} 
	if(items == null || items?.length == 0)
	{
		soundPlay1();
		alert('해당 품번은 결과가 존재하지 않습니다.')
		return;
	}
	
 
	if(items?.barcodeType) // #idx#타입 -> 결과값이 하나임
	{
		console.log('#Idx# scan')
		setItemInfo(items);
	}
	else 
	{
		if(items.length>1) //복수의 결과값
		{
			console.log('itemNo Result Mult')
			const dialogRackSelect =  $("#layerPopup").dialog({ 
						title : "부품선택", // 랙선택 팝업의 타이틀에 편의성을 위해 현재 랙선택 하려는 부품에 대한 정보와 요청수량을 적어줌
						minHeight: '60%',
						width: '90%',
						modal: true,
						headerHeight: 40,
						position: {my: "center", at:"center", of: window },
						open:()=>{
							$('body').addClass('cOverflow-y-hidden');
		 					},
		 				close:()=>{
							$('body').removeClass('cOverflow-y-hidden');
							
							}	
						});
			const itemSelectBoxDiv = $("#iDiv_itemSelectBox");
			itemSelectBoxDiv.children('div').remove();
			
			scanItemInfo = items;// 스캔된 부품명에 브랜드 규칙해당하는부분 변수에 등록
			
			for(index in items) //스캔된 아이템리스트를 레이어팝업으로 보여지도록 한후 선택버튼에 해당 인덱스의 리스트 아이템을 이벤트로 등록
			{ 
				itemSelectBoxDiv.append(`<div style="height:40px; border: 1px solid #000; display:flex; justify-content: space-between; align-items: center; margin:2px;">
							<label>${items[index].makerCode}/${items[index].itemNo}/${items[index].itemName||items[index].itemNameEn}</label>
							<button class ="btn btn-primary" style="height:24px;" onclick="$('#layerPopup').dialog('close'); setItemInfo(scanItemInfo[${index}]);">선택</button>
							</div>`)
			} 
			//layerPopupClose(scanItemInfo[${index}]);
			$(":focus").blur();
		}
		else //결과가 하나일떄 
		{
			console.log('itemNo Result SINGLE')
			setItemInfo(items[0]);
		} 
	}
	
 
 
};   
 
function setItemInfo(item) // 랙찍고 부품찍은 결과
{

	if(item == null) return;
	$("#iLabel_itemNo").html(item.itemNo);
	scanItemInfo = item;
	
	// 
	const target= reqItemList.find((row)=>(row.itemId == scanItemInfo.itemId) &&  // 스캔한 부품과 요청부품의 itemId가 일치하면서
												(row.storConsignCustCode == scanItemInfo.consignCustCode) &&//스캔한 부품의 위탁업체 정보와 재고가 존재하는 랙의 위탁사가 일치하면서
										   		(row.stockQty > row.pickingQty) && //피킹한 수량이 재고보다 낮으면서
										 		(row.logisRackId == selectRackInfo.logisRackId) &&
										 		(row.cnt > reqItemList.reduce((a,c)=>{return a+((c.reqSeq == row.reqSeq)?c.pickingQty:0) },0)) // 해당순번의 피킹수량 총합이 요청수량보다 적을때
										)
  
	if(target) // 같은 부품이 여러개인경우 제일 위에부터 체움
	{
		const targetTag = $(`#iTr_Id_${target.reqSeq}_${target.itemNo}_${target.storConsignCustCode}_${target.logisRackId}`);
	
		if((target.pickingQty+1) > parseInt(target.stockQty)) //피킹수량이 재고보다 높아질경우
		{
			soundPlay1();
			alert('재고수량보다 많은 수량을 피킹할수 없습니다');
			return;
		}
		if((target.pickingQty+1) > target.cnt) //피킹수량이 요청수량보다 높아질경우
		{
			soundPlay1();
			alert('요청수량보다 많은 수량을 피킹할수 없습니다');
			return;
		}
		target.pickingQty++; // 변수의 수량 증가
		
		targetTag.children("#iTd_qty").children(".cInput_pickingQty").val(target.pickingQty); //테이블 태그에 반영
		
		$('body').animate({scrollTop:targetTag.position().top},300)
		if(target.pickingQty == target.cnt)
		{
			 
			targetTag.children(".cWidth5vwZoom").children('input').prop('checked', true).change();
		}
 	}
 	else
 	{
		alert('스캔한 부품에 해당하는 요청이 없습니다.'); 
	}
} 

 
 
//id에 all이 접미로 붙은 체크박스의 상태가 변경시
$(document).on('change', 'input[id$="All"]:checkbox', function() {
  fncCheckAll($(this).attr('id'));
});

//보내진 id에서 ALL만 제거된 이름과 동일 이름을 모두 자신과 같은 상태로 만듬
function fncCheckAll(id) {
	const targetName = id.replace('All', '');
	$('input[name=' + targetName + ']').each(function() {
    	$(this).prop('checked', $('#' + id).is(':checked'));
    });
   
}

  // 모두 체크된 경우 Header 체크박스를 변경
$(document).on('change', 'input:checkbox', function() {
    const chgId = $(this).attr('id') || '';
    const chgNm = $(this).attr('name') || '';

    // 다른 Checkbox에 영향이 가지 않도록 id 와 name 값이 'chk'로 시작하는 Checkbox만 대상으로 함
    if (chgId.indexOf('chk') == -1 && chgNm.indexOf('chk') == -1) return;

    // id 와 name 값이 모두 없는 경우 제외
    if (isNullStr(chgId) && isNullStr(chgNm)) return;

    // Header(ID가 '%All'로 끝나는)에 있는 CheckBox인 경우는 제외
    if (chgId.indexOf('All') > -1) return;

    const totLen = $('input[name=' + chgNm + ']').length;
    const chkLen = $('input[name=' + chgNm + ']:checked').length;

    // 목록에 있는 CheckBox가 모두 체크된 경우 Header도 체크되도록 설정
    if (totLen == chkLen) {
      $('#' + chgNm + 'All').prop('checked', true);
    } else {
      $('#' + chgNm + 'All').prop('checked', false);
    }
  });
  
  
//널체크
function isNullStr(text) {
  const str = $.trim(text);
  if (str == null || str == 'undefined' || str.length == 0 || typeof str == 'undefined' || str == '') {
    return true;
  } else {
    return false;
  }
}
 

function pageMove(type)
{
	if(type =='back')
	{
		soundPlay1();
		if(confirm('목록으로 돌아가시겠습니까?\n저장하지 않은 데이터는 보존되지 않습니다.'))
		{
			window.location.href = '/mobile/';
		}
	}
}

//요청번호 검색 버튼
$("#iButton_reqNoFind").click(function(){
	const type = $("#iSelectPickingType option:selected").attr('id');
	const reqNo = $("#iInput_reqNo").val();
	
	if(reqNo == '')
	{
		alert('요청번호를 입력해주세요');
		return;
	}
	findReq(type,reqNo);
})
 
//주문, 회수, 창고사용요청 조회. 조회시 reqItemList전역변수에 처리 가능한 요청의 리스트 담김(랙이 바코드 스캔 가능한 경우만 )
function findReq(type,reqNo)
{
	const typeEnum = {pc:'주문요청',ct:'회수요청',storUse:'창고사용요청'}
	if(type == 'pc') //주문
	{
		simplePostAjax('/order/pc-req-list', // 주문마스터 조회
			{
				workingType : 'LIST',
				pcReqNo : reqNo
			},
			(masterResult)=>{ 
				const pcReq= masterResult.pcReqList[0];
				if(pcReq == null) 
				{
					alert('해당 요청번호의 결과가 없습니다.');
					return;
				}
				
				
				
				simplePostAjax('/order/pc-req-item-list', //주문 디테일 조회
					{ 
						pcReqNo : reqNo
					},
					(detailResult)=>{
						
						//요청업체 , 발주번호 
						//주문접수 디테일 배열
						const pcReqItemList = detailResult.reqItemList;
						const rcvCustName = pcReqItemList.find((row)=>{if(row.rcvCustName!='') return true;})?.rcvCustName || '';
						
					
						
						$("#iLabel_pickingType").html(`${typeEnum[type]}`);
						$("#iLabel_pickingReqNo").html(`${reqNo}`);
						$("#iLabel_pickinggvCustName").html(`요청:${pcReq.gvCustName}`);
						$("#iLabel_pickingRcvCustName").html(`${rcvCustName?`납품:${rcvCustName}`:''}`);
						$("#iTd_basketHeader3").html(`재고`);
						reqStateButtonSet(pcReq.procState);
						//기존 리스트 삭제
						$("#iTable_basket>tBody>.cTr_basketTableItem").remove();
						
						//동일 순번병합을 위한 순번별 랙 갯수 객체로 저장
						const r = pcReqItemList.reduce((a,c)=>{
							if(a[c.reqSeq]) a[c.reqSeq]++;
							else a[c.reqSeq] = 1;
							return a;
						},{});
						 
						//추가할 부모태그 선택
						const itemTable  = $("#iTable_basket>tbody");
						
						//비처리된 리스트를 전역으로 필요한 부분만 새로 객체로 만들어서 보관
						reqItemList = pcReqItemList.filter((row)=>row.procStep==''&&row.logisRackId>0).map((row)=>{
											return {cnt : row.cnt, // 요청수량
													itemId : row.itemId, //부품정보
													itemNo : row.itemNo,
													itemName : row.itemName,
													reqNo : row.pcReqNo, //요청번호
													pickingQty : 0 , //피킹수량
													rackName : row.rackName, //랙정보
													rackCode : row.rackCode,
													reqSeq : row.reqSeq, //요청순번
													stockQty : row.stockQty, //재고
													storConsignCustCode : row.storConsignCustCode, //창고정보
													storageCode : row.storageCode ,
													storageName : row.storageName,
													logisRackId : row.logisRackId
												   }
										});
						
						//비처리된것을 위로 올리면서 순번대로 정렬
						for(const reqItem of pcReqItemList.sort((a,b)=>a.procStep.localeCompare(b.procStep) || a.reqSeq-b.reqSeq  || b.logisRackId - a.logisRackId  ))
						{
							const isProc = reqItem.procStep!='';
							const LogisRackId = reqItem.logisRackId; //물류기본랙 속성이 없으면 처리 못하게 하기 위해
							itemTable.append(`<tr class="cTr_basketTableItem" id="iTr_Id_${reqItem.reqSeq}_${reqItem.itemNo}_${reqItem.storConsignCustCode}_${reqItem.logisRackId}">
								<td class="cTd_basket cWidth5vwZoom" scope="col">${isProc || !LogisRackId?'':`<input type="checkbox" name="chkRow">`}</th> 
								
								${r[reqItem.reqSeq]>0?`<td class="cTd_basket cWidth30vw cFont13p cHeight3vh cTd_baket_type1" scope="col" rowspan="${r[reqItem.reqSeq]}"><b>${reqItem.itemNo}</b><br>${reqItem.itemName}</th>
								<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col" rowspan="${r[reqItem.reqSeq]}">${reqItem.cnt}</th>`:''}
								
								
								<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col">${reqItem.stockQty}</th>
								<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col" id="iTd_qty">${isProc || !LogisRackId?'':`<input class="cWidth10vw cInput_pickingQty" value='0'>`}</th>
								<td class="cTd_basket cWidth30vw cFont13p cTd_baket_type1" scope="col">${isProc?'처리':`${reqItem.storageName}<br><b>${reqItem.rackName}</b>`}</th>
							</tr>`);
							
							r[reqItem.reqSeq] = 0;
							 
							
						}
						$(".cInput_pickingQty").change(function(){
							pickingQtyChange(this);
						})
					}
				); 
			}
		);
		
	}
	else if(type == 'ct') // 회수
	{
		simplePostAjax( "/order/out-ct-req-list", //회수 마스터 조회
			{ctReqNo : reqNo , ymdIgnoreYN : 'Y',reqYN : 'N'},
			(masterResult)=>{
				const ctReq= masterResult.ctReqList[0];
			 
				if(ctReq == null) 
				{
					alert('해당 요청번호의 결과가 없습니다.');
					return;
				}
				
				
				simplePostAjax( "/order/out-ct-req-item-list", //회수 디테일 조회
					{ctReqNo : reqNo},
					(detailResult)=>{
						simplePostAjax("/order/ctStoRackList", //회수 디테일의 창고랙 정보 조회
							{ctReqNo : reqNo},
							(rackInfo)=>{
								//요청업체 , 발주번호
								const ctReq= masterResult.ctReqList[0];
								//주문접수 디테일 배열
								const ctReqItemList = detailResult.ctReqItemList;
								const rcvCustName = ctReqItemList.find((row)=>{if(row.custName1!='') return true;})?.custName1 || '';
								
								reqItemList = [];
								
								$("#iLabel_pickingType").html(`${typeEnum[type]}`);
								$("#iLabel_pickingReqNo").html(`${reqNo}`);
								$("#iLabel_pickinggvCustName").html(`요청:${ctReq.custName}`);
								$("#iLabel_pickingRcvCustName").html(`${rcvCustName?`납품:${rcvCustName}`:''}`);
								$("#iTd_basketHeader3").html(`재고`);
								reqStateButtonSet(ctReq.procStep);
								//기존 리스트 삭제
								$("#iTable_basket>tBody>.cTr_basketTableItem").remove();
								//추가할 부모태그 선택
								const itemTable  = $("#iTable_basket>tbody");
								
								for(const reqItem of ctReqItemList.sort((a,b)=>a.procStep.localeCompare(b.procStep) || a.reqSeq-b.reqSeq)) // 디테일별
								{
									const reqItemRackInfo = rackInfo.ctStoRackList.filter((row)=>reqItem.itemId==row.itemId);
									
									//랙 베이스로 테이블을 생성하기 떄문에 현재 재고가 0개인 랙배열이 0인경우 재고 없다는 데이터를 추가해줌
									if(reqItemRackInfo.length == 0)
										reqItemRackInfo.push({stockQty:0 , storageName : '재고없음',rackName:''})
									let isFirstRow = true; 
									for(const rack of reqItemRackInfo.sort((a,b)=>b.logisRackId - a.logisRackId )) //디테일에 해당하는 랙
									{ 
										const isProc = reqItem.procStep == '완료' || reqItem.procStep =='불가';  
										const LogisRackId = rack.logisRackId; //물류기본랙 속성이 없으면 처리 못하게 하기 위해
										itemTable.append(`<tr class="cTr_basketTableItem" id="iTr_Id_${reqItem.reqSeq}_${reqItem.itemNo}_${rack.storConsignCustCode}_${rack.logisRackId}">
											<td class="cTd_basket cWidth5vwZoom" scope="col">${isProc || !LogisRackId?'':`<input type="checkbox" name="chkRow">`}</th> 
											
											${isFirstRow?`<td class="cTd_basket cWidth30vw cFont13p cHeight3vh cTd_baket_type1" scope="col" ${isProc?'':`rowspan="${reqItemRackInfo.length}"`}><b>${reqItem.itemNo}</b><br>${reqItem.itemName}</th>
											<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col" ${isProc ?'':`rowspan="${reqItemRackInfo.length}"`}>${reqItem.qty}</th>`:''} 
											
											<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col">${rack.stockQty}</th>
											<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col" id="iTd_qty">${isProc || !LogisRackId?'':`<input class="cWidth10vw cInput_pickingQty" value='0'>`}</th>
											<td class="cTd_basket cWidth30vw cFont13p cTd_baket_type1" scope="col">${isProc?reqItem.procStep:`${rack.storageName}<br><b>${rack.rackName}</b>`}</th>
										</tr>`);
										
										isFirstRow = false;
										if(isProc) break;
										
										reqItemList.push({...reqItem , ...rack});
									}
								}
								$(".cInput_pickingQty").change(function(){
									pickingQtyChange(this);
								})
								reqItemList = reqItemList.filter((row)=>row.procStep!='완료' && row.logisRackId>0).map((row)=>{
											return {cnt : row.qty, // 요청수량
													itemId : row.itemId, //부품정보
													itemNo : row.itemNo,
													itemName : row.itemName,
													reqNo : row.ctReqNo, //요청번호
													pickingQty : 0 , //피킹수량
													rackName : row.rackName, //랙정보
													rackCode : row.rackCode,
													reqSeq : row.reqSeq, //요청순번
													stockQty : row.stockQty, //재고
													storConsignCustCode : row.storConsignCustCode, //창고정보
													storageCode : row.storageCode ,
													storageName : row.storageName,
													logisRackId : row.logisRackId
												   }
										});
								
							}
						)
					}
				)
			}			
		)
	}
	else if(type == 'storUse') //창고사용요청
	{
		simplePostAjax('/logis/storage-use-req-list', //창고사용요청 마스터 조회
		{
			"workingType":"LIST",
			"storageUseReqNo":reqNo
		},
		(masterResult)=>{ 
			const reqInfo = masterResult.reqList[0];   //마스터 정보
			if(reqInfo == null) 
			{
				alert('해당 요청번호의 결과가 없습니다.');
				return;
			}
			
			simplePostAjax('/logis/storage-use-req-item-list', //창고사용요청 디테일 조회
			{ 
				"storageUseReqNo":reqNo
			},
			(detailResult)=>{ 
				const reqInfo = masterResult.reqList[0];   //마스터 정보

				reqItemList = detailResult.reqItemList.filter((row)=>(row.chkUserId || '') == '' && row.logisRackId>0).map((row)=>{
											return {cnt : row.orderCnt, // 요청수량
													itemId : row.itemId, //부품정보
													itemNo : row.itemNo,
													itemName : row.itemName,
													reqNo : row.storageUseReqNo, //요청번호
													pickingQty : row.pcReqNo==''?0:parseInt(row.useCnt) , //피킹수량
													rackName : row.rackName, //랙정보
													rackCode : row.rackCode,
													reqSeq : row.reqSeq, //요청순번
													stockQty : row.useCnt, //재고
													storConsignCustCode : row.storConsignCustCode, //창고정보
													storageCode : row.storageCode ,
													storageName : row.storageName,
													logisRackId : row.logisRackId 
													 
												   }
										});
			

				$("#iLabel_pickingType").html(`${typeEnum[type]}`);
				$("#iLabel_pickingReqNo").html(`${reqNo}`);
				$("#iLabel_pickinggvCustName").html(`요청:${reqInfo.custName}`);
				$("#iTd_basketHeader3").html(`창고`);
				reqStateButtonSet('접수');
				//기존 리스트 삭제
				$("#iTable_basket>tBody>.cTr_basketTableItem").remove();
				//추가할 부모태그 선택
				const itemTable  = $("#iTable_basket>tbody");
				
				for(const reqItem of detailResult.reqItemList.sort((a,b)=>(a.chkUserId || '').localeCompare(b.chkUserId || '') || b.logisRackId - a.logisRackId || a.reqSeq - b.reqSeq))
				{
					const isProc = (reqItem.chkUserId || '') != '';  
					const LogisRackId = reqItem.logisRackId; //물류기본랙 속성이 없으면 처리 못하게 하기 위해
	 
					itemTable.append(`<tr class="cTr_basketTableItem" id="iTr_Id_${reqItem.reqSeq}_${reqItem.itemNo}_${reqItem.storConsignCustCode}_${reqItem.logisRackId}">
											<td class="cTd_basket cWidth5vwZoom" scope="col">${isProc || !LogisRackId?'':`<input type="checkbox" name="chkRow">`}</th> 
											<td class="cTd_basket cWidth30vw cFont13p cHeight3vh cTd_baket_type1" scope="col""><b>${reqItem.itemNo}</b><br>${reqItem.itemName}</th>
											<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col"">${reqItem.orderCnt}</th> 
											<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col">${reqItem.useCnt}</th>
											<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col" id="iTd_qty">${isProc || !LogisRackId?'':`<input class="cWidth10vw cInput_pickingQty" value='${reqItem.pcReqNo==''?0:reqItem.useCnt}'>`}</th>
											<td class="cTd_basket cWidth30vw cFont13p cTd_baket_type1" scope="col">${isProc?'처리':`${reqItem.storageName}<br><b>${reqItem.rackName}</b>`}</th>
										</tr>`);
				}
				$(".cInput_pickingQty").change(function(){
					pickingQtyChange(this);
				}) 
			}) 
		}) 
	}
	else
	{
		
	} 
}

//디테일의 피킹 수량변경에 대한 이벤트
function pickingQtyChange(obj)
{
	//인풋박스위 상위 태그 클래스명을 파싱해서 리스트중 요청정보가 들어있는 객체를 추적
	const textSplit = $(obj).parent().parent().attr('id').split("_");
	const reqItem = reqItemList.find((row)=>row.itemNo==textSplit[3] && row.storConsignCustCode == textSplit[4] && row.logisRackId == textSplit[5]);
	const reqSeq = parseInt(textSplit[2]);
	
	
	const beforeQty = reqItem.pickingQty;
	const inputVal = $(obj).val();
	
	if(inputVal =='') // 비워지면 0으로 초기화
	{
		$(obj).val(0);
		reqItem.pickingQty = 0;
		$(obj).parent().parent().children(".cWidth5vwZoom").children('input').prop('checked', false).change();
		return;
	}
	if(isNaN(inputVal)) //숫자인지 검사
	{
		alert('숫자가 아닌 문자를 입력하셨습니다');
		$(obj).val(beforeQty);
		return;
	}
	const afterQty = parseInt($(obj).val());
	if(afterQty > reqItem.stockQty)  //랙재고수량보다 높은지 검사
	{
		
		alert(`${$("#iLabel_pickingType").html()=='창고사용요청'?'창고사용수량':'재고수량'}보다 높은 수량을 입력하셨습니다`);
		$(obj).val(beforeQty);
		return;
	}
	if(afterQty > reqItem.cnt) //요펑 수량보다 높은지 검사
	{
		alert('요청수량보다 높은 수량을 입력하셨습니다');
		$(obj).val(beforeQty);
		return;
	}
	if(reqItemList.reduce((a,c)=>{return a+(c.reqSeq==reqSeq?c.pickingQty:0)},0)-beforeQty+afterQty >reqItem.cnt) // 해당 요청의 전체 합보다 높아지는지 검사
	{
		alert('해당 요청에 모든 랙의 피킹 수량이 요청수량보다 높게 설정되셨습니다.');
		$(obj).val(beforeQty);
		return;
	}
	if(afterQty < 0) // 음수 검사
	{
		alert('0보다 작은 수량을 입력하셨습니다');
		$(obj).val(beforeQty);
		return;
	}
	$(obj).val(afterQty); 
	reqItem.pickingQty = afterQty; 
	
	$(obj).parent().parent().children(".cWidth5vwZoom").children('input').prop('checked', reqItem.pickingQty > 0).change();
} 

//마스터의 상태에 따라 버튼들의 분기
function reqStateButtonSet(state)
{
 	if(state == 'hide' || state == '전체처리')
 	{
		$("#iBtnAccept").hide();
		$("#iBtnConfirm").hide();
		$("#iBtnReject").hide();
	}
	else if(state == '미완료' || state == '요청')
	{
		$("#iBtnAccept").show();
		$("#iBtnConfirm").hide();
		$("#iBtnReject").hide();		
	}
	else if(state =='일부완료' || state =='접수' || state == '일부처리')
	{
		$("#iBtnAccept").hide();
		$("#iBtnConfirm").show();
		$("#iBtnReject").show();	
	}
	
	const reqType = $('#iLabel_pickingType').html();
	$("#iBtnReject").html(reqType=='창고사용요청'? '요청취소' : 
						  reqType=='회수요청'?    '불가'   : '거부');
	 
}

//접수버튼 이벤트
$("#iBtnAccept").click(()=>{
	pickingAccept();
})

//피킹 접수 (주문,회수에서 접수/ 창고사용은 접수가 따로 없어서 자동 접수로 간주)
function pickingAccept()
{
	const typeText = $('#iLabel_pickingType').html();
	const reqNo = $("#iLabel_pickingReqNo").html();
	
	if(typeText =='주문요청')
	{
		simplePostAjax2('/order/pcReqAdd',
			JSON.stringify({
				"workingType":"ACCEPT_MASTER",
				"pcReqNo":reqNo,
				"inMemo1" : 'pda'
			}),
			(result)=>{ 
				alert(result.result_msg);
				if(result.result_code =='OK') //성공시 처리
				{
					reqStateButtonSet('접수');
				}
			}
		)
	}
	else if(typeText =='회수요청')
	{ 
		simplePostAjax('/order/ctProcess',
			{ 
				reqNo,
				seqArr : 'pda'
			},
			(result)=>{  
				alert(result.ctProcess.db_resultMsg);
				if(result.ctProcess.db_resultCode == 'Success')
				{
					reqStateButtonSet('접수');
				} 
			}
		)
	}
}

//완료버튼
$("#iBtnConfirm").click(()=>{
	pickingProc("ACCEPT");
})
//거부버튼
$("#iBtnReject").click(()=>{
	pickingProc("REJECT");
})
//완료 및 거부처리 
function pickingProc(workingType)
{
	const checkRowReq = []; 
	//체크박스에 체크된 요청의 속성기반으로 reqItemList에서 찾아서 저장
	$('input[name="chkRow"]:checked').each(function () { 
		//  순번,품번,랙의 창고 업체코드 , 랙의 logisRackId
		const checkRowPropSplit = $(this).parent().parent().attr('id').split('_');

		if(checkRowPropSplit.length <4) return;
		checkRowReq.push(reqItemList.find((row)=>row.reqSeq==checkRowPropSplit[2] &&
								row.itemNo==checkRowPropSplit[3] &&
								row.storConsignCustCode == checkRowPropSplit[4] &&
								row.logisRackId == checkRowPropSplit[5]));
	})
	
	if(checkRowReq.length == 0)
	{
		alert('체크된 요청이 없습니다.');
		return;
	}
	const zeroPickItem = checkRowReq.find((row)=>row.pickingQty==0);
	if(zeroPickItem && workingType == 'ACCEPT')
	{
		alert('피킹수량이 0개인 부품이 체크되었습니다');
		return;
	}
	
	const typeText = $('#iLabel_pickingType').html();
	const reqNo = $("#iLabel_pickingReqNo").html();
	
	if(typeText =='주문요청')
	{
		const rejectMemo = workingType=='REJECT'?prompt('거부사유를 입력해주세요'):'';
		if(!rejectMemo && workingType=='REJECT')
		{
			alert('거절사유를 입력하지 않으면 거부처리가 불가능합니다');
			return;
		}
		const arrData = checkRowReq.reduce((a,c)=>{
			if(a.pcRackCodeArr == null)
			{
				a.pcRackCodeArr = c.rackCode;
				a.pcRackqtyArr  = c.pickingQty;
				a.pcReqSeqArr  = c.reqSeq;
				a.rejectMemoArr = rejectMemo;
			}
			else
			{
				a.pcRackCodeArr += '^'+ c.rackCode;
				a.pcRackqtyArr  += '^'+ c.pickingQty;
				a.pcReqSeqArr  += '^'+ c.reqSeq;
				a.rejectMemoArr += '^'+ rejectMemo;
			} 
			
			return a;
		},{})
		
		const data = {...arrData , pcReqNo : reqNo , workingType};
		
	 
		simplePostAjax2('/order/pcReqAdd',
			JSON.stringify(data),
			(result)=>{ 
				alert(result.result_msg);
				if(result.result_code =='OK') //성공시 처리
				{
					location.reload();
				}
			 
			}
		)
	}
	else if(typeText =='회수요청')
	{
		const rejectMemo = workingType=='REJECT'?prompt('불가사유를 입력해주세요'):'';
		if(!rejectMemo && workingType=='REJECT')
		{
			alert('불가사유를 입력하지 않으면 거부처리가 불가능합니다');
			return;
		}
		const arrData = checkRowReq.reduce((a,c)=>{
		if(a.rackArr == null)
		{
			a.rackArr = c.rackCode;
			a.qtyArr  = c.pickingQty;
			a.seqArr  = c.reqSeq;
			a.ctReqSeqArr  = c.reqSeq;
				 
		}
		else
		{
			a.rackArr += '^'+ c.rackCode;
			a.qtyArr  += '^'+ c.pickingQty;
			a.seqArr  += '^'+ c.reqSeq;
			a.ctReqSeqArr  += '^'+ c.reqSeq;
			 
		} 
			
			return a;
		},{})
		
		const data = {...arrData ,  reqNo, ctReqNo:reqNo , workingType};
	 
		simplePostAjax(workingType == 'ACCEPT'?"/order/ctProcess":"/order/ctReqDel",
			data
			,
			(data)=>{  
				const result = workingType == 'ACCEPT'? data.ctProcess : data; 
				alert(result.db_resultMsg);
				if(result.db_resultCode =='Success') //성공시 처리
				{
					
						let itemSeqArr = '';
						let itemRejectMemoArr = '';
						let itemRackArr = '';
						
						
						const itemArr = checkRowReq.reduce((a,c)=>{
						    if(a[c.reqSeq])
						    {
						        a[c.reqSeq].rack += ' / ' +`${c.rackName}[${c.rackCode}]:${c.pickingQty}`;
						    }
						    else
						    {
						        a[c.reqSeq] = {rack:`${c.rackName}[${c.rackCode}]:${c.pickingQty}` }
						    }
						    return a;
						},{})
						
						for(key in itemArr)
						{
							if(itemSeqArr != '')
							{
								itemSeqArr += '^';
								itemRejectMemoArr += '^';
								itemRackArr += '^';
							}
							itemSeqArr += key;
							itemRejectMemoArr += workingType=='REJECT'?rejectMemo:' ';
							itemRackArr += workingType=='REJECT'?' ':itemArr[key].rack;
						}	
						
						 
						simplePostAjax("/order/ctReqAdd",
										{
											reqNo,
											itemRackArr,
											itemSeqArr ,
											itemRejectMemoArr
										}
										,
										(data)=>{  
											if(data.db_resultCode == 'Success')   
											{
												location.reload(); //정보 수정성공시 화면 새로고침
											}				 
										}
								);
						  
				}
			}
		)  
	}
	else if(typeText =='창고사용요청')
	{
		 
 	 	//완료 버튼을 누른 경우 체크된 부품중에 피킹수량이 창고사용수량보다 적은 부품이 있는지 검색
 		if(workingType == 'ACCEPT' && checkRowReq.find((row)=>parseInt(row.stockQty)>row.pickingQty))
 		{
			alert(`창고사용수량보다 적게 피킹된 부품이 존재합니다`);
			return;
		}
 		
	
		const reqDataArr = checkRowReq.reduce((a,c)=>{
			if(a.reqArr == null)
			{
				a.reqArr = c.reqNo;
				a.rseArr = c.reqSeq;
			}
			else
			{
				a.reqArr += '^'+ c.reqNo;
				a.rseArr += '^'+ c.reqSeq;
			}
			
			return a;
		},{})	
		
		
 
		simplePostAjax('/logis/storageUseReqItemAdd',
						{
							afterRackCode : workingType == 'REJECT'?'':'1',
							workingType : workingType == 'REJECT'? 'CANCEL' : 'CHK',
							reqArr : reqDataArr.reqArr,
							rseArr : reqDataArr.rseArr
						},
						(data)=>{  
						
							if(workingType == 'REJECT')
							{
								alert(data.result_msg);
							}
							else
							{
								alert(`${data.result_msg} 출고대기랙으로 이동됩니다`);
							}
							if(data.result_code == 'OK')   
							{
								location.reload(); //정보 수정성공시 화면 새로고침
							}
														 
						}
		);
	
	}
	

	
}
