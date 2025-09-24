
let scanItemInfo = {};  //스캔된 부품정보를 보관하는 임시변수

$(document).ready(function(){
	$("#iDiv_itemSelectBox").css('max-height' , window.innerHeight-70); // 레이어팝업 최대 크기 지정
}) 
  
//키입력에 대한 이벤트
$("body").bind("keydown",(e)=>{ 
 
	if(e.keyCode == 13) //test  엔터시 발동 =>pc테스트용
	{
		const barcodeInput = $("#iInput_barcode");
//		console.log((barcodeInput).val());
	}
	else if(e.keyCode == 0) // pda 스캔버튼 (스캔버튼이 키코드 0)
	{
		
		$("#iInput_barcode").focus(); 
		//console.log("포커스 전환 => " +$(":focus").attr("id"));
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
					itemBarcodeScan(getBarcodeValue(barcodeInput.val(),'n'));
					
				break;
				case 'S':

					soundPlay1();
					//beep();
				break;
				default:
				
				const isRackScan = ((barcodeInput.val().length==14) && (barcodeInput.val().split('-').length==5)) || (barcodeInput.val().split('@').length == 3)
				
				if(isRackScan)
				{
					alert('부품바코드를 스캔해주세요');
					
				}
				else
				{
					
					itemBarcodeScan(getBarcodeValue(barcodeInput.val(),'n') , true);
				}
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

//바코드를 읽은경우 마지막에 검색버튼 누르도록 설정
setItemBarcodeScanFun((item)=>{  
	$("#iInput_itemNo").val(item);
	$('#iButton_itemNoFind').trigger('click');
})


$('#iButton_itemNoFind').on('click', function(e) { 
 
	
	const barcodeInput = $("#iInput_itemNo").val();
	let items = null; 
	
	//console.log(barcodeInput);
	
	if(barcodeInput == '') {}
	else if(barcodeInput.indexOf('#') == -1) // #이 없을때 품번 직접조회
	{
	  simplePostAjax( '/base/item-list', 
			{
				'workingType':'STOCKWRUP_LIST',
				"itemNo":barcodeInput,
				"srchEqualItemNo": ''  //동일한 것만 검색되게 추가 
			} , (result)=>{items = result.itemList; })
	}
	else
	{
		const textSplit = barcodeInput.split('#');   // #을 구분자로 자름 전문자열 idx 후문자열 식으로  자름
		if(textSplit.length ==  3  && !isNaN(textSplit[1]) ) // #으로 자른 배열이 딱 3이면서 idx가 int형식일때
		{ 
			simplePostAjax('/logis/barcodeItem' , //idx타입으로 idx를 보내서 해당 정보 받음
							{barCodeType:'IDX' ,  itemUnitIdx:textSplit[1]  },
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
	 
 	//console.log(items);
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
	
 
 
});   


function setItemInfo(item)
{
	if(item == null) return;

	
//	$("#iTd_basketTable_itemNo").html(item.itemNo);
	$("#iTd_basketTable_itemInfo").html(`${item.itemId}|<label class="cFont15pBold">${item.itemNo}</label>|${item.makerCode}|${item.itemName||item.itemNameEn || ''}`); 
	if(item.consignCustName)
		$("#iTd_basketTable_consignInfo").html(`${item.consignCustCode}|<label class="cFont15pBold">${item.consignCustName.replace('주식회사 ','')}</label>`); 
	else 
		$("#iTd_basketTable_consignInfo").html(``); 
	
	$('#iTd_basketTable_itemInfo').removeClass('cColorGray');
	$('#iTd_basketTable_consignInfo').removeClass('cColorGray');
	
	
	
	simplePostAjax("/logis/stock-rack-list" , {
		ymdIgnoreYN : 'Y',
		itemNo : item.itemNo
	} , (result)=>{ 
		
		//위탁사가 있으면 위탁사로 필터, 아니면 전체
		const rackData = item.consignCustCode?result.stockRackList.filter((row)=>{
												if(row.storConsignCustCode == item.consignCustCode) return true;
											 })	:	result.stockRackList;
		 
		$("#iLabel_basketCount").html(rackData.length);
		
		$("#iTable_basket>tBody>.cTr_basketTableItem").remove();
		
		const itemTable  = $("#iTable_basket>tbody");
		
		for(rack of rackData)
		{
			itemTable.append(`<tr class="cTr_basketTableItem itemId${item.itemId}_${item.consignCustCode}" id="m_basketTable_Header1">
							<td class="cTd_basket cTextalignLeft cWidth75vw cFont13p" scope="col">[${rack.storName}]<label class="cFont15pBold">${rack.rackName}</label></td>  
							<td class="cTd_basket cWidth20vw cFont13p" id="iTdQty" scope="col">${rack.stockQty}</td>   
						</tr>`);
			
		}
		
	})

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

//품번 직접 입력을 위해 포커스 잡으면 기존 입력값 날려버림
$("#iInput_itemNo").focus(function(e){
	$("#iInput_itemNo").val('');
})

