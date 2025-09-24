
let scanItemInfo = {};  //스캔된 부품정보를 보관하는 임시변수
let basketItemList = []; //스캔되어진 부품을 담아둔 리스트변수
let deleteItemList = []; //삭제된 부품리스트 
let selectRackInfo = {};

let curWrType = ''; //수동입고,이동,수동출고 타입 저장하는용도

let isItemMoveFlag = false;
let moveRackInfo = {};

$(document).ready(function(){
	$("#iDiv_itemSelectBox").css('max-height' , window.innerHeight-70); // 레이어팝업 최대 크기 지정
	curWrType =  $("#iSelectWrType").val();
	 
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
		//moveRackInfo
		if(isItemMoveFlag && ($("#iLabel_RackSelectMsg").html().length >20)) //이동처리 누르고 이루 랙 넣은 상태에선 스캔 무효화
		{
			 
			return; 
		} 
		if(barcodeProp.wrNo)
		{
			alert(`이미 처리되었습니다.\n처리번호 : ${barcodeProp.wrNo}`);
			return;
		}
		//const curFocus = $(":focus");
		if(isItemMoveFlag)
			$("#iInput_moveRackBarcode").focus();
		else
			$("#iInput_barcode").focus(); 
		//console.log("포커스 전환 => " +$(":focus").attr("id"));
		setTimeout(function() { 
			
			 
			const barcodeInput = isItemMoveFlag ? $("#iInput_moveRackBarcode"): $("#iInput_barcode");
	 	 
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
	//				navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
	//				if (navigator.vibrate) {
	//			        navigator.vibrate(1800); // 진동을 울리게 한다. 1000ms = 1초
//				        const snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
//						snd.volume = 1;
//	 					snd.play();  
	//			    }
	//			    else {
	//			        alert("진동을 지원하지 않는 기종 입니다.");
	//			    }
					soundPlay1();
					//beep();
				break;
				default:
				
				const isRackScan = ((barcodeInput.val().length==14) && (barcodeInput.val().split('-').length==5)) || (barcodeInput.val().split('@').length == 3)
				
				if(isRackScan)
				{
					if(isItemMoveFlag)
					{
						
						//이동랙 셋팅
						setMoveRackInfo(barcodeInput.val()); 
					}
					else
					{
						$("#iInput_logisRackName").val(barcodeInput.val());
						$('#iButton_logisRackFind').trigger('click');
				 	}
					
				}
				else
				{
					if(isItemMoveFlag)
					{
						soundPlay1();
						alert('랙이 아닌 바코드를 스캔하셨습니다.');
						
					}
					else
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
	if($(".ui-dialog").css('display') == 'block') //레이어팝업이 열려있으면 막힘
	{  
		soundPlay1();
		return;
	}
	
	//이동과 수동출고는 랙을 선택해야 부품을 선택할수 있음
	if(Object.keys(selectRackInfo).length ==0 && ( curWrType == '이동' || curWrType == '수동출고'))
	{
		soundPlay1();
		alert(`${curWrType}에서는 랙선택후 부품을 추가할수 있습니다.`);
		return;
	}
	
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
			//beep(); 
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
$('#iButton_logisRackFind').on('click', function(e) { 
	 //이동과 수동출고는 랙을 선택해야 부품을 선택할수 있음
	if(Object.keys(basketItemList).length >0 && (curWrType == '이동' || curWrType == '수동출고'))
	{
		soundPlay1();
		alert(`${curWrType}에서는 부품이 추가된 상태에서 랙을 변경할수 없습니다.`);
		
		return;
	}
	 
	 
	 const inputLogisRackName = $("#iInput_logisRackName").val();
	 
	 
	 //구 바코드인지 여부 조사
	 const isOldRackBarcode = (inputLogisRackName.length==14) && (inputLogisRackName.split('-').length==5);
	 
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
								$("#iTd_rackInfo").html(`[${selectRackInfo.logisCodeName}]${selectRackInfo.logisRackName}`);
								$('#iTd_rackInfo').removeClass('cColorGray');
								//console.log(selectRackInfo)
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
										$("#iTd_rackInfo").html(`[${result.item.logisCodeName}]${result.item.logisRackName}`);
										$('#iTd_rackInfo').removeClass('cColorGray');
										selectRackInfo = result.item;
										//console.log(selectRackInfo)
									})
		
  	 }
	  
	 
	 //구 랙바코드식으로 스캔시 용인 위치 가져옴
	 
	 
}); 

function setItemInfo(item)
{
	if(item == null) return;
	
	scanItemInfo = item;
//	$("#iTd_basketTable_itemNo").html(item.itemNo);
	$("#iTd_basketTable_itemInfo").html(`${item.itemId}|<label class="cFont15pBold">${item.itemNo}</label>|${item.makerCode}|${item.itemName||item.itemNameEn || ''}`); 
	if(item.consignCustName)
		$("#iTd_basketTable_consignInfo").html(`${item.consignCustCode}|<label class="cFont15pBold">${item.consignCustName.replace('주식회사 ','')}</label>`); 
	else 
		$("#iTd_basketTable_consignInfo").html(``); 
	
	$('#iTd_basketTable_itemInfo').removeClass('cColorGray');
	$('#iTd_basketTable_consignInfo').removeClass('cColorGray');
	 
	addItem(item);
} 


function addItem(item)
{
	
	const itemTable  = $("#iTr_basketItemHeader");
	const now = item.modified?new Date(item.modified) :new Date;  //처리번호 조회로 불러와서 추가된 부품의 경우 데이터에 기록된 수정날짜를 일시로 받음 이외엔 현재시간
	const consignCustName = item.consignCustName?item.consignCustName.replace('주식회사 ',''):'';
	const consignCustNameLen6 = consignCustName.substr(0,6) + (consignCustName.length>6?'...':'');
	
	const hasItem = $(`.itemId${item.itemId}_${item.consignCustCode}`).length >0;
	if(!item.consignCustCode)
	{
		soundPlay1();
		alert('위탁사 정보가 없는 바코드 입니다');
		return;
	}
	if(curWrType != '수동입고' && !(item.stockQty>0))//수동입고가 아니면서 랙에 재고가 0개 이상이 아닌경우
	{
		soundPlay1();
		alert('랙에 재고가 없습니다');
		return;
	}
	
	if(hasItem) // 부품바코드가 스캔될때 이미 해당 부품의 아이디의 위탁사가 동일한 부품이 리스트내 등록되어 있을경우 수량증가후 리턴
	{
		const itemTr = $(`.itemId${item.itemId}_${item.consignCustCode}`);
		const inputQty = itemTr.children("#iTdQty").children("#iInputQty");
		
		if((parseInt(inputQty.val()||0) >= item.stockQty)) // 재고 이상이 바구니에 들어가면
		{
			soundPlay1();
			alert('재고보다 많은 수량을 담을수 없습니다');
			return;
		}
		
		inputQty.val(parseInt(inputQty.val() || 0 ) + 1);
		basketItemList.find((temp)=>{
			if((temp.itemId == item.itemId) && (temp.consignCustCode == item.consignCustCode)) return true;
		}).qty= inputQty.val() ;
		return;
	}
	
	if(curWrType == '수동입고')
	{
		itemTable.after(`<tr class="cTr_basketTableItem itemId${item.itemId}_${item.consignCustCode}" id="m_basketTable_Header1">
						<td class="cTd_basket cWidth5vwZoom" scope="col"><input type="checkbox" name="chkRow"></th>
						<td class="cTd_basket cTextalignLeft cWidth70vw cFont13p" scope="col">${item.itemId}|<label class="cFont15pBold">${item.itemNo.toString()}</label>|${item.makerCode}<br>${item.itemName||item.itemNameEn||''}<br>${item.consignCustCode || ''}|<label class="cFont15pBold">${consignCustNameLen6}</label></th>  
						<td class="cTd_basket cWidth20vw cFont13p" id="iTdQty" scope="col">
							<input class="cWidth15vw cTextalignRight" id="iInputQty" value="1"></input>
						</td>   
						
					</tr>`);
					
	 
		
		//수량 수동변경 이벤트
		$("#iInputQty").change(function(e){
			
			const beforeQty = basketItemList.find((temp)=>{
								if((temp.itemId == item.itemId) && (temp.consignCustCode == item.consignCustCode)) return true;
							}).qty; 
			 
			if(0> parseInt($(this).val()) ) //음수입력
			{
				soundPlay1();
				alert('0보다 낮은수량은 입력할수 없습니다.')
				$(this).val(beforeQty);
				return;
			}
				
			basketItemList.find((temp)=>{
				if((temp.itemId == item.itemId) && (temp.consignCustCode == item.consignCustCode)) return true;
			}).qty = parseInt($(this).val());
			 
		})	
		
						
	}
	else
	{
		itemTable.after(`<tr class="cTr_basketTableItem itemId${item.itemId}_${item.consignCustCode}" id="m_basketTable_Header1">
						<td class="cTd_basket cWidth5vwZoom" scope="col"><input type="checkbox" name="chkRow"></th>
						<td class="cTd_basket cTextalignLeft cWidth50vw cFont13p" scope="col">${item.itemId}|<label class="cFont15pBold">${item.itemNo.toString()}</label>|${item.makerCode}<br>${item.itemName||item.itemNameEn||''}<br>${item.consignCustCode || ''}|<label class="cFont15pBold">${consignCustNameLen6}</label></th>  
						<td class="cTd_basket cWidth20vw cFont13p" id="iTdStockQty" scope="col">${item.stockQty}</td>
						<td class="cTd_basket cWidth20vw cFont13p" id="iTdQty" scope="col">
							<input class="cWidth15vw cTextalignRight" id="iInputQty" value="1"></input>
						</td>   
						
					</tr>`);
		
		//수량 수동변경 이벤트
		$("#iInputQty").change(function(e){
			
			const beforeQty = basketItemList.find((temp)=>{
								if((temp.itemId == item.itemId) && (temp.consignCustCode == item.consignCustCode)) return true;
							}).qty; 
			const stockQty = parseInt($(this).parent().parent().children("#iTdStockQty").html());
				
			if(stockQty < parseInt($(this).val()) ) //입고가 아니면서 재고보다 많은 수량이 입력될 경우
			{
				soundPlay1();
				alert('재고보다 많은 수량은 입력할수 없습니다.')
				$(this).val(beforeQty);
				return;
			}
			if(0> parseInt($(this).val()) ) //음수입력
			{
				soundPlay1();
				alert('0보다 낮은수량은 입력할수 없습니다.')
				$(this).val(beforeQty);
				return;
			}
				
			basketItemList.find((temp)=>{
				if((temp.itemId == item.itemId) && (temp.consignCustCode == item.consignCustCode)) return true;
			}).qty = parseInt($(this).val());
			 
		})	
	}
	
			
	
	$("#iLabel_basketCount").html((parseInt($("#iLabel_basketCount").html())+1).toString());
	
	//품번, 제품코드,이름 , 시간 , 아이템아이디
	const itemInfo = {itemNo:item.itemNo , makerCode:item.makerCode , itemName:item.itemName||item.itemNameEn||'' , modified:now , itemId:item.itemId};
	//console.log(itemInfo);
	item.qty = 1;
	basketItemList.push(item);
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

$("#iButton_BasketDelete").on('click',()=>{
	checkDeleteRow();
})

 
function checkDeleteRow ()
{
	const rows = $('input[name="chkRow"]').map(function(row){
			if($(this).is(":checked")) return row; 
			});
	const rowLength = $('input[name="chkRow"]').length;
	if(rows.length == 0 )
	{
		soundPlay1();
		alert('체크한 부품이 없습니다.')
		return;
	} 
	if(confirm('정말 삭제하시겠습니까?'))
	{
		$("#iLabel_basketCount").html((parseInt($("#iLabel_basketCount").html())-rows.length).toString()); 
		for(row of rows)
		{ 
			if(basketItemList[rowLength-(row+1)].wrSeq != null) //삭제시 순번이 있는 부품 즉 불러온 부품은 삭제 리스트에 저장
			{
				deleteItemList.push(basketItemList[rowLength-(row+1)]);
			}
			basketItemList.splice(rowLength-(row+1),1);
		}  
		for(row of rows.sort((a,b)=>{return b-a}))
		{   
			$(`#iTable_basket>tbody>tr:nth-child(${row+2})`).remove();
			
		} 
		
	}
}

function beep()
{
	const snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
						snd.volume = 1;
	 					snd.play();  
}



function pageMove(type)
{
	if(type == 'new')
	{
		soundPlay1();
		if(confirm('새로 입고하시겠습니까?\n저장하지 않은 데이터는 보존되지 않습니다.'))
		{
			window.location.href = '/mobile/itemWr'
		}
		
	}
	else if(type =='back')
	{
		soundPlay1();
		if(confirm('목록으로 돌아가시겠습니까?\n저장하지 않은 데이터는 보존되지 않습니다.'))
		{
			window.location.href = '/mobile/';
		}
	}
}

 
//모바일 수동입출고 처리타입 변경시 내부 정보 비워버림 => 이유 : 각처리마다 프로세스순서도 다르며 명시적으로 비워줌으로서 오처리 방지
$("#iSelectWrType").on("change", function(){ 
	if(barcodeProp.wrNo)
	{
		soundPlay1();
		alert(`이미 처리되었습니다.\n처리번호 : ${barcodeProp.wrNo}`);
		$("#iSelectWrType").val(curWrType);
		return;
	}
	
	
	if($("#iSelectWrType").val() == curWrType) return;
	soundPlay1();
	if(!confirm('작업타입을 변경시 기존 저장된 정보는 사라집니다 변경하시겠습니까?'))
	{
		$("#iSelectWrType").val(curWrType);
		return; 
	}
	
	curWrType = $("#iSelectWrType").val();
	
	
	$("#iInput_logisRackName").val('');
	$("#iTd_rackInfo").html('[랙위치]랙명'); // =>
	$("#iInput_itemNo").val('');
	$("#iTd_basketTable_itemInfo").html('부품정보'); // =>
	$("#iTd_basketTable_consignInfo").html('위탁사'); // =>
	
	$('#iTd_rackInfo').addClass('cColorGray');
	$('#iTd_basketTable_itemInfo').addClass('cColorGray');
	$('#iTd_basketTable_consignInfo').addClass('cColorGray');
	
	$("#iLabel_basketCount").html('0');
	$(".cTr_basketTableItem").remove(); //담긴부품 비워줌
	
	scanItemInfo = {};   
	basketItemList = []; 
	deleteItemList = [];    
	selectRackInfo = {};
	
	if(curWrType == '수동입고')
	{
		$(".cTd_baket_type2").hide();
		$(".cTd_baket_type1").show();
	}
	else
	{
		$(".cTd_baket_type1").hide();
		$(".cTd_baket_type2").show();
	}
})


$("#iButton_itemWrChk").on("click" , function(){ 
	if(barcodeProp.wrNo)
	{
		soundPlay1();
		alert(`이미 처리되었습니다.\n처리번호 : ${barcodeProp.wrNo}`);
		return;
	}
	
	 
	
	if(curWrType == '수동입고')
	{
		if(basketItemList.length == 0)
		{
			soundPlay1();
			alert('스캔된 부품이 없습니다 부품을 스캔후 입고해주세요');
			return;
		}
		if(selectRackInfo.logisCode == null)
		{
			soundPlay1();
			alert('스캔된 랙이 없습니다 입고할 랙을 스캔해주세요');
			return;
		}
		soundPlay1();
		if(confirm(`${$("#iTd_rackInfo").html()}로 스캔한 부품을\n입고하시겠습니까?`))
		{ 
			updateDataToServer('ADD');
		} 
	}
	else if(curWrType == '이동')
	{
		if(selectRackInfo.logisCode == null)
		{
			soundPlay1();
			alert('스캔된 랙이 없습니다\n이동할 부품이 담긴 랙을 스캔해주세요');
			return;
		}
		if(basketItemList.length == 0)
		{
			soundPlay1();
			alert('스캔된 부품이 없습니다\n부품을 스캔후 이동해주세요');
			return;
		}
		
		const dialogRackSelect =  $("#iDiv_affterRackSelect").dialog({ 
						title : "이동랙 스캔", // 랙선택 팝업의 타이틀에 편의성을 위해 현재 랙선택 하려는 부품에 대한 정보와 요청수량을 적어줌
						minHeight: '60%',
						width: '80%',
						modal: true,
						headerHeight: 40,
						position: {my: "center", at:"center", of: window },
						open:()=>{
								isItemMoveFlag = true;
								$('body').addClass('cOverflow-y-hidden');
								$(":focus").blur();
		 					},
		 				close:()=>{
								isItemMoveFlag = false; 
						    	$("#iLabel_RackSelectMsg").html("이동될 랙을 스캔해주세요.");
						    	$("#iDiv_MoveAffterRackPopupYN").hide(); 
								$('body').removeClass('cOverflow-y-hidden');
							}	
						});
	}
	else if(curWrType == '수동출고')
	{
		if(selectRackInfo.logisCode == null)
		{
			soundPlay1();
			alert('스캔된 랙이 없습니다\n이동할 부품이 담긴 랙을 스캔해주세요');
			return;
		}
		if(basketItemList.length == 0)
		{
			soundPlay1();
			alert('스캔된 부품이 없습니다\n부품을 스캔후 이동해주세요');
			return;
		}
		
		soundPlay1();
		//아이템수 : <b>${basketItemList.length}</b><br>
		//재고수량 : <b>${basketItemList.reduce((sum,item)=>{return sum+(parseInt(item.qty)||0)},0)}</b><br>
		//
		if(confirm(`${$("#iTd_rackInfo").html()}에서\n아이템수 : ${basketItemList.length}\n재고수량 : ${basketItemList.reduce((sum,item)=>{return sum+(parseInt(item.qty)||0)},0)}\n출고하시겠습니까?`))
		{ 
			updateDataToServer('ADD');
		} 
	}
	else
	{
		
	}
})


function updateDataToServer(  workingType ) {

 
	
	let consignComCode = '';
	
	if($("#iInput_consignComInfo").val())
	{
		consignComCode = $("#iInput_consignComInfo").val().split('|')[1];
	}
	
  	
  	var addList  = []; 
    const wrType = curWrType == '수동입고'? 'whna' :
    			   curWrType == '이동' ? 'move' : 
    			   curWrType == '수동출고' ? 'rlna' : '' ;
  	let wrNo = ''; 
  	
  	const moveLogisRackId = wrType == 'move' ? moveRackInfo.logisRackId : '';

	if(workingType == 'ADD') 
  	{
	  	addList = basketItemList.map((row)=>{
				row.storCode = '';
				row.storName = '';
				row.rackCode = '';
				row.rackName = '';
				row.logisRackId = selectRackInfo.logisRackId;
				row.moveLogisRackId = moveLogisRackId
				return row;
			});
	}  
	
	var data = {};
	
	if(addList.length > 0) data.stockWrItemAdd = addList;
	else data.stockWrItemAdd = [];
	
	data.stockWrItemUpdate = [];
	data.stockWrItemRemove = [];

    data.workingType = workingType;
	data.wrNo = wrNo;  
    data.wrType = wrType; 
    data.consignComCode = consignComCode;
 	data.memo1 = "디바이스:모바일"
 	
 	
 	 
   
	$.ajax({
	    url : "/logis/stockWrAdd",
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) { 
			deleteItemList = [];
			
			
			
			$("#iInput_itemListNo").val(data.wrNo);	
			
			
			simplePostAjax("/logis/stockWrItemAdd" , 
			{"workingType":"M_CHK" ,
			 "wrNo" : data.wrNo 
			 },(result)=>{
				
				//	console.log(result);
				 if(result.result_code == 'Err')
				 {
					
					//입고실패시 생성된 처리 삭제
					$.ajax({
						    url : "/logis/stockWrAdd",
						    dataType : "json",
						    type : "POST",
						    contentType: "application/json; charset=utf-8", 
							data : JSON.stringify({"workingType":"DEL" ,
							 "wrNo" : data.wrNo  ,
							 "stockWrItemAdd":[],
							 "stockWrItemUpdate":[],
							 "stockWrItemRemove":[]
							 }),
							 success:(r)=>{}});
					
					soundPlay1();
					alert(`처리에 실패하였습니다\n${result.result_msg}\n처리번호 : ${data.wrNo}`);
					
					
				 }
				 else
				 {
					alert('성공하였습니다.\n처리번호 : '+data.wrNo);
					setBarcodeProp('wrNo',data.wrNo);
					$("#iwrNo").html(`처리번호 : ${data.wrNo}`);
					$('#iButton_itemWrChk').removeClass('btn-danger');
					$('#iButton_itemWrChk').addClass('btn-secondary');
					$('#iButton_itemWrChk').addClass('disabled');
					$('#iButton_BasketDelete').addClass('disabled');
					$('#iButton_itemNoFind').addClass('disabled');
					$('#iButton_logisRackFind').addClass('disabled');
					
				 }
					
				
			}
			)
			
			
	    },
	    error:function(request, status, error){
			 
		//	document.getElementById('btnReg').classList.toggle('disabled');
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};
//품번 직접 입력을 위해 포커스 잡으면 기존 입력값 날려버림
$("#iInput_itemNo").focus(function(e){
	$("#iInput_itemNo").val('');
})
//랙 직접 입력을 위해 포커스 잡으면 기존 입력값 날려버림
$("#iInput_logisRackName").focus(function(e){
	$("#iInput_logisRackName").val('');
})

function setMoveRackInfo(inputLogisRackName)
{
	const isOldRackBarcode = (inputLogisRackName.length==14) && (inputLogisRackName.split('-').length==5);
 
	 if(isOldRackBarcode)
	 {
		 
		simplePostAjax("/logis/logis-rack-list" ,
							{"logisRackName": inputLogisRackName},
							(result)=>{ 
								if( result.logisRackList.length ==0) {
									soundPlay1();
									alert("해당 랙이름은 물류센터 기본랙에 존재하지 않는 랙입니다");
									return;
								}
								const rackInfo = result.logisRackList.filter((rack)=>{if(rack.logisCode == '용인1') return true;})[0];
								moveRackInfo = {comCode : rackInfo.comCode , logisCode : rackInfo.logisCode 
												, logisCodeName : rackInfo.logisName ,  logisRackId : rackInfo.logisRackId 
												, logisRackName : rackInfo.logisRackName , memo : rackInfo.memo 
												, validYN : rackInfo.validYN};
							//	$("#iTd_rackInfo").html(`[${selectRackInfo.logisCodeName}]${selectRackInfo.logisRackName}`);
							//	$('#iTd_rackInfo').removeClass('cColorGray');
								//console.log(selectRackInfo)
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
													soundPlay1();
													alert("해당 랙이름은 물류센터 기본랙에 존재하지 않는 랙입니다."); 
												 	return;
												 }
								//		$("#iTd_rackInfo").html(`[${result.item.logisCodeName}]${result.item.logisRackName}`);
								//		$('#iTd_rackInfo').removeClass('cColorGray');
										moveRackInfo = result.item;
										//console.log(selectRackInfo)
									})
		
  	 }
  	 if(moveRackInfo.logisRackName != null)
  	 {
		$("#iLabel_RackSelectMsg").html(`아이템수 : <b>${basketItemList.length}</b><br>
		재고수량 : <b>${basketItemList.reduce((sum,item)=>{return sum+(parseInt(item.qty)||0)},0)}</b><br>
		[${selectRackInfo.logisCodeName}] <b>${selectRackInfo.logisRackName}</b> 에서<br>
		[${moveRackInfo.logisCodeName}] <b>${moveRackInfo.logisRackName}</b> 으로<br>
		이동시키겠습니까?`);
		$("#iDiv_MoveAffterRackPopupYN").show(); 
		$("#ibutton_MoveY").on("click", function(){
	    	 $("#iDiv_affterRackSelect").dialog('close'); 
	    	 updateDataToServer('ADD');
		});
		$("#ibutton_MoveN").on("click", function(){
	    	 moveRackInfo ={};
	    	 $("#iDiv_affterRackSelect").dialog('close'); 
		});
	 }
  	 
} 
 
