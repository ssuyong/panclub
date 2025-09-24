
let scanItemInfo = {};  //스캔된 부품정보를 보관하는 임시변수
let basketItemList = []; //스캔되어진 부품을 담아둔 리스트변수
let deleteItemList = []; //삭제된 부품리스트
let custList = []; // 위탁사 정보 담긴곳
let selectWrNo = ''; // 수정시 조회된 처리번호
 
$(document).ready(function(){
	$("#iDiv_itemSelectBox").css('max-height' , window.innerHeight-70); // 레이어팝업 최대 크기 지정
	findConsignCode();
	const urlParams = new URL(location.href).searchParams;
	const consignComInfo = urlParams.get('consignComInfo');
	console.log(consignComInfo)
	if(consignComInfo)
		$("#iInput_consignComInfo").val(consignComInfo);
}) 
  
//키입력에 대한 이벤트
$("body").bind("keydown",(e)=>{ 
	if(e.keyCode == 13) //test  엔터시 발동 =>pc테스트용
	{
		const barcodeInput = $("#iInput_barcode");
		console.log((barcodeInput).val());
	}
	else if(e.keyCode == 0) // pda 스캔버튼 (스캔버튼이 키코드 0)
	{
		//const curFocus = $(":focus");
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
					//beep();
					soundPlay1();
				break;
				default:
				 
				itemBarcodeScan(getBarcodeValue(barcodeInput.val(),'n') , true);
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
	
	const barcodeInput = $("#iInput_itemNo").val();
	let items = null; 

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
							{barCodeType:'IDX' ,  itemUnitIdx:textSplit[1]},
							(result)=>{
								if(result.item == null){//정보가 없을경우 팝업
											
										 	return;
										 }
								items = result.item; 
								$("#iInput_itemNo").val(result.item['itemNo']);
							}) 
					
		}
		
	} 
	if(items == null || items?.length == 0)
	{
		soundPlay1();
		alert('해당 품번은 결과가 존재하지 않습니다.')
		return;
	}
	
 	console.log(items);
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
						position: {my: "center top", at:"center top", of: window },
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
			soundPlay1();
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

function setItemInfo(item)
{
	if(item == null) return;
	
	scanItemInfo = item;
	$("#iTd_basketTable_itemNo").html(item.itemNo);
	$("#iTd_basketTable_itemInfo").html(`${item.makerCode}|${item.itemName||item.itemNameEn}`); 
	
	addItem(item);
} 


function addItem(item)
{
	const itemTable  = $("#iTr_basketItemHeader");
	const now = item.modified?new Date(item.modified) :new Date;  //처리번호 조회로 불러와서 추가된 부품의 경우 데이터에 기록된 수정날짜를 일시로 받음 이외엔 현재시간
	
	itemTable.after(`<tr class="cTr_basketTableItem" id="m_basketTable_Header1">
					<td class="cTd_basket cWidth5vwZoom" scope="col"><input type="checkbox" name="chkRow"></th>
					<td class="cTd_basket cTextalignLeft cWidth70vw cFont13p" scope="col">${item.itemNo.toString()}<br>${item.makerCode}|${item.itemName||item.itemNameEn||''}</th> 
					<td class="cTd_basket cWidth20vw cFont13p" scope="col">${now.getFullYear().toString().substring(2,4)}:${(now.getMonth()+1).toString().padStart(2,'0')}:${(now.getDate()).toString().padStart(2,'0')}<br>
												  ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}</th>
					
				</tr>`);
	
	$("#iLabel_basketCount").html((parseInt($("#iLabel_basketCount").html())+1).toString());
	
	//품번, 제품코드,이름 , 시간 , 아이템아이디
	const itemInfo = {itemNo:item.itemNo , makerCode:item.makerCode , itemName:item.itemName||item.itemNameEn||'' , modified:now , itemId:item.itemId};
	//console.log(itemInfo);
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
$("#iButton_itemListFind").on('click',()=>{
	findListUpMst();
})
$("#iButton_consignFind").on('click',()=>{ 
	
			const itemSelectBoxDiv = $("#iDiv_itemSelectBox");
			itemSelectBoxDiv.children('div').remove();
			 
			for(cust of custList) //스캔된 아이템리스트를 레이어팝업으로 보여지도록 한후 선택버튼에 해당 인덱스의 리스트 아이템을 이벤트로 등록
			{  
				itemSelectBoxDiv.append(`<div style="height:40px; border: 1px solid #000; display:flex; justify-content: space-between; align-items: center; margin:2px;">
							<label style="margin-left:5px;">${cust.custName}[${cust.custCode}]</label>
							<button class ="btn btn-primary" style="height:24px; margin-right:5px;" onclick="$('#layerPopup').dialog('close'); setCustInfo('${cust.custCode}','${cust.custName}');">선택</button>
							</div>`)
			}
			const dialogCustSelect =  $("#layerPopup").dialog({ 
						title : "위탁사 선택", // 랙선택 팝업의 타이틀에 편의성을 위해 현재 랙선택 하려는 부품에 대한 정보와 요청수량을 적어줌
						minHeight: '60%',
						width: '90%',
						modal: true,
						headerHeight: 40,
						position: {my: "center top", at:"center top", of: window },
						open:()=>{
							$('body').addClass('cOverflow-y-hidden');
		 					},
		 				close:()=>{
							$('body').removeClass('cOverflow-y-hidden');
							
							}	
						}); 
			
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

function findListUpMst(isPass = false)
{
	soundPlay1();
	if(!confirm('처리번호로 조회하시겠습니까?')) return;
	const wrNo = $("#iInput_itemListNo").val();
	if(wrNo == '') 
	{
		soundPlay1();
		alert('품목정리 처리번호를 입력해주세요');
		return;
	}
	simplePostAjax('/logis/stock-wr-list' , 
					{"workingType":"LIST",
					 wrNo},
					 (result)=>{
					 
						if(result.stockWrList.length == 0)
						{
							alert('조회결과가 존재하지 않습니다 처리번호를 확인해주세요');
							return;
						}
						if(result.stockWrList[0].wrType != 'itemList')
						{
							alert('해당 처리번호는 품목정리중인 처리번호가 아닙니다\n처리번호의 처리구분을 pc에서 확인해주세요');
							return;
						}
						if(!isPass)
							if(!confirm('처리번호에 해당하는 정보를 찾았습니다.\n불러오시겠습니까?')) return;
						const info = result.stockWrList[0];
						if(result.stockWrList[0].consignComCode)	
					 		$("#iInput_consignComInfo").val((result.stockWrList[0].consignComName||'')+'|'+(result.stockWrList[0].consignComCode||''))
						$(".cTr_basketTableItem").remove();
						$("#iLabel_basketCount").html('0');
						selectWrNo = wrNo;
						simplePostAjax('/logis/stock-wr-item-list' , 
										{wrNo},
										(r)=>{
											const stockWrItemList = r.stockWrItemList; 
											basketItemList = [];
											for(item of stockWrItemList)
											{
												addItem(item); 
											} 
										})
						$("#iButton_itemListSave").html('수정');				 
					 })
	
	///logis/stock-wr-list
}

//위탁업체 리스트 받아오는 통신
function findConsignCode()
{
	simplePostAjax("/club/c-cust" ,
					{},
					(result)=>{ 
						custList.push({custCode:'ㄱ000' , custName:'P'})
						for(cust of result.c_custList)
						{	
							
							if(cust.validYN == 'Y' && cust.custCode != 'zzz' && cust.custCode != 'ㄱ121' )	
								custList.push({custCode:cust.custCode , custName:cust.custName})
						}
					})
}

//위탁업체 레이어팝업에서 선택시 해당 업체로 마스터의 위탁업체 정보 셋팅
function setCustInfo(custCode,custName)
{
	 
	$("#iInput_consignComInfo").val(`${custName}|${custCode}`);
}


$("#iButton_itemListSave").on('click',()=>{
	const btnText = $("#iButton_itemListSave").html();
	soundPlay1();
	if(confirm(`정말로 ${btnText} 하시겠습니까?`))
		updateDataToServer("/logis/stockWrAdd", btnText=='등록'? 'ADD' : 'UPT' );
})


//updateDataToServer("/logis/stockWrAdd", "ADD");


function updateDataToServer( url, workingType ) {

//	 
//	var wrNo = $("#wrNo").val();  
//    //var bizType = $("#bizType").val(); 
//    var wrType = $("#wrType").val(); 
//    //var consignCustCode = $("#consignCustCode").val(); 
//    var memo1 = $("#memo1").val(); 
//
	
	let consignComCode = '';
	
	if($("#iInput_consignComInfo").val())
	{
		consignComCode = $("#iInput_consignComInfo").val().split('|')[1];
	}
	
  	
  	var addList  = [];
	var updateList = [];// AUIGrid.getEditedRowItems(myGridID); 
	var removeList = [];//AUIGrid.getRemovedItems(myGridID);    
    const wrType = 'itemList';
  	let wrNo = ''; 

	if(workingType == 'ADD') // 신규등록인 경우 목록 전체를 추가 리스트로 보냄
  	{
	  	addList = basketItemList.map((row)=>{
				row.qty = 1; 
				row.consignCustCode = consignComCode || row.consignCustCode;
				row.storCode = '';
				row.storName = '';
				row.rackCode = '';
				row.rackName = '';
				
				return row;
			});
	} 
	else if(workingType == 'UPT')
	{
		wrNo = selectWrNo;
		//리스트에서 wrSeq 즉 순번이 없는 부품은 신규 등록 부품 
		addList = basketItemList.filter((row)=>{
				row.qty = 1; 
				row.consignCustCode = consignComCode || row.consignCustCode;
				row.storCode = '';
				row.storName = '';
				row.rackCode = '';
				row.rackName = '';
				if(row.wrSeq == null) return true;
				else false;
			});
//		updateList = basketItemList.filter((row)=>{  //순번이 있는경우 수정
//				row.consignCustCode = consignComCode || row.consignCustCode;
//				row.storCode = '';
//				row.storName = '';
//				row.rackCode = '';
//				row.rackName = '';
//				if(row.wrSeq != null) return true;
//				else false;
//			});	
		removeList = deleteItemList;
	}  
	 
	
	var data = {};
	
	if(addList.length > 0) data.stockWrItemAdd = addList;
	else data.stockWrItemAdd = [];
	
//	if(updateList.length > 0) data.stockWrItemUpdate = updateList;
//	else data.stockWrItemUpdate = [];
	data.stockWrItemUpdate = [];
	if(removeList.length > 0) data.stockWrItemRemove = removeList;
	else data.stockWrItemRemove = [];

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
			alert($("#iButton_itemListSave").html()+'에 성공하였습니다.\n처리번호 : '+data.wrNo);
			findListUpMst(true);
			
	    },
	    error:function(request, status, error){
			 
		//	document.getElementById('btnReg').classList.toggle('disabled');
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

function pageMove(type)
{
	soundPlay1();
	if(type == 'new')
	{
		if(confirm('새로 등록하시겠습니까?\n저장하지 않은 데이터는 보존되지 않습니다.'))
		{
			const consingComInfo = $("#iInput_consignComInfo").val();
			if(consingComInfo && confirm(`선택한 위탁사 ${$("#iInput_consignComInfo").val()}로 신규등록하시겠습니까?`))
				window.location.href = `/mobile/itemListUp?consignComInfo=${encodeURI($("#iInput_consignComInfo").val())}`;
			else 
				window.location.href = `/mobile/itemListUp`;
		}
		
	}
	else if(type =='back')
	{
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