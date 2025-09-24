
let scanItemInfo = {};  //스캔된 부품정보를 보관하는 객체변수  
//let selectRackInfo = {}; // 스캔된 랙정보를 보관하는 객체변수


let reqMasterInfo = {};
// iTr_Id_'reqSeq'_'itemNo'_'storConsignCustCode'_'logisRackId' 를 선택자로 검색하면 해당 정보를 기반으로 태그 검색 가능
let reqItemList = []; //불러온 요청의 디테일중 미처리된 요청의 부품을 담는 배열



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
	reqStateButtonSet('접수');
	 
}) 
  
//키입력에 대한 이벤트
$("body").bind("keydown",(e)=>{ 
 

	if(e.keyCode == 13) //test  엔터시 발동 =>pc테스트용
	{
		const barcodeInput = $("#iInput_barcode");

	}
	else if(e.keyCode == 0) // pda 스캔버튼 (스캔버튼이 키코드 0)
	{
		
		
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
					itemBarcodeScan(getBarcodeValue(barcodeInput.val(),'n'));
					
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
	if(isRackSacn) //랙스캔시 패킹에선 사용안함
	{
		alert('출고처리에선 랙 바코드를 스캔할 필요가 없습니다.');
		//rackScan(barcode);
	}
	else if(barcode.includes('www.4car.co.kr')) //url바코드
	{
		
		const {resultMsg ,type, reqNo , url  } = urlBarcodeParse(barcode);
		if(resultMsg == '성공')
		{
			const typeText = type == 'rl-req-list' ? '출고요청' : '실패';
			if(typeText == '실패')
			{
				alert(typeText); 
				return;
			}
			$("#iSelectPackingType").val(typeText);
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

 

//부품 스캔
function itemScan(barcodeInput)
{ 
	if($(".ui-dialog").css('display') == 'block') //레이어팝업이 열려있으면 막힘
	{  
		soundPlay1();
		return;
	}
	
//	if(Object.keys(selectRackInfo).length ==0 )
//	{
//		soundPlay1();
//		alert(`랙선택후 부품을 스캔해주세요.`);
//		return;
//	}

	 
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
							{barCodeType:'IDX' ,  itemUnitIdx:textSplit[1]   },
							(result)=>{
								if(result.item == null){//정보가 없을경우 팝업
											
										 	return;
										 }
								items = result.item; 
					//			 console.log(result);
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
 
function setItemInfo(item) // 부품찍은 결과
{

	if(item == null) return;
	$("#iLabel_itemNo").html(item.itemNo);
	scanItemInfo = item;
	
	// 
	const target= reqItemList.find((row)=>(row.itemId == scanItemInfo.itemId) &&  // 스캔한 부품과 요청부품의 itemId가 일치하면서
										   		(row.stockQty > row.packingQty) && //패킹한 수량이 재고보다 낮으면서
										 		(row.cnt > reqItemList.reduce((a,c)=>{return a+((c.reqSeq == row.reqSeq)?c.packingQty:0) },0)) // 해당순번의 패킹수량 총합이 요청수량보다 적을때
										)
  
	if(target) // 같은 부품이 여러개인경우 제일 위에부터 체움
	{
		const targetTag = $(`#iTr_Id_${target.reqSeq}_${target.itemNo}`);
	
		if((target.packingQty+1) > parseInt(target.stockQty)) //패킹수량이 재고보다 높아질경우
		{
			soundPlay1();
			alert('재고수량보다 많은 수량을 패킹할수 없습니다');
			return;
		}
		if((target.packingQty+1) > target.cnt) //패킹수량이 요청수량보다 높아질경우
		{
			soundPlay1();
			alert('요청수량보다 많은 수량을 패킹할수 없습니다');
			return;
		}
		target.packingQty++; // 변수의 수량 증가
		
		targetTag.children("#iTd_qty").children(".cInput_packingQty").val(target.packingQty); //테이블 태그에 반영
		
		$('body').animate({scrollTop:targetTag.position().top},300)
		if(target.packingQty == target.cnt)
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
	const type = $("#iSelectPackingType option:selected").attr('id');
	const reqNo = $("#iInput_reqNo").val();
	
	if(reqNo == '')
	{
		alert('요청번호를 입력해주세요');
		return;
	}
	findReq(type,reqNo);
})
 
//출고 조회
function findReq(type,reqNo)
{
	 
	const typeEnum = {rl:'출고요청'};
	if(type == 'rl') //출고
	{
		 
		simplePostAjax('/logis/rl-req-list',
						{ workingType : "LIST-ALL" , ymdIgnoreYN : "Y" , rlReqNo : reqNo},
						(masterResult)=>{
							const rlReq = masterResult.reqList[0];
							
							if(rlReq == null) 
							{
								alert('해당 요청번호의 결과가 없습니다.');
								return;
							}
							
							simplePostAjax('/logis/rl-req-item-list',
										{ "rlReqNo":reqNo},
										(detailResult)=>{
										 										
										 
											const rlReqItemList = detailResult.reqItemList;
											
											console.log(rlReq);
											console.log(rlReqItemList);
											
											reqMasterInfo = {
																comCode : rlReq.comCode ,
																custCode : rlReq.saleCustCode ,
																gvComCode : rlReq.gvComCode ,
																memo : rlReq.memo1 , 
																orderGroupId : rlReq.orderGroupId ,
																rackCode : rlReq.rackCode , 
																rlMgr : rlReq.rlMgr ,
																rlWay : rlReq.rlWay ,
																stdClType : rlReq.stdClType ,
																storageCode : rlReq.storageCode 
															};
											
											$("#iLabel_packingType").html(`${typeEnum[type]}`);
											$("#iLabel_packingReqNo").html(`${reqNo}`);
											$("#iLabel_packingCustName").html(`주문:${rlReq.saleCustName}`);
											
											//기존 리스트 삭제
											$("#iTable_basket>tBody>.cTr_basketTableItem").remove();
											//추가할 부모태그 선택
											const itemTable  = $("#iTable_basket>tbody");
											
											//비처리된 리스트를 전역으로 필요한 부분만 새로 객체로 만들어서 보관
											reqItemList = rlReqItemList.map((row)=>{
																return {cnt : row.rlReqCnt, // 요청수량
																		itemId : row.itemId, //부품정보
																		itemNo : row.itemNo,
																		itemName : row.itemName,
																		reqNo : row.rlReqNo, //요청번호
																		packingQty : 0 , //패킹수량
																		rackName : row.rlStandByRackName, //랙정보
																		rackCode : row.rlStandByRackCode,
																		reqSeq : row.reqSeq, //요청순번
																		stockQty : row.rlStandByQty, //재고
																		//storConsignCustCode : row.storConsignCustCode, //창고정보
																		storageCode : row.rlStandByStorCode ,
																		storageName : row.rlStandByStorName,
																		//logisRackId : row.logisRackId
																		rlNo : row.rlNo,
																		salePrice : row.salePrice,
																		saleUnitPrice : row.saleUnitPrice,
																		sumPrice : row.sumPrice
																	   }
															});
											//비처리된것을 위로 올리면서 순번대로 정렬
											for(const reqItem of reqItemList.sort((a,b)=>a.rlNo - b.rlNo))
											{
												const isProc =reqItem.rlNo != '';// reqItem.rlNo!='';
											 
												itemTable.append(`<tr class="cTr_basketTableItem" id="iTr_Id_${reqItem.reqSeq}_${reqItem.itemNo}">
													<td class="cTd_basket cWidth5vwZoom" scope="col">${isProc ?'':`<input type="checkbox" name="chkRow">`}</th> 
													
													<td class="cTd_basket cWidth30vw cFont13p cHeight3vh cTd_baket_type1" scope="col"><b>${reqItem.itemNo}</b><br>${reqItem.itemName}</th>
													<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col">${reqItem.cnt}</th>
													
													
													<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col">${reqItem.stockQty}</th>
													<td class="cTd_basket cWidth10vw cFont13p cTd_baket_type1" scope="col" id="iTd_qty">${isProc?'':`<input class="cWidth10vw cInput_packingQty" value='0'>`}</th>
													<td class="cTd_basket cWidth30vw cFont13p cTd_baket_type1" scope="col">${isProc?'처리':`${reqItem.storageName}<br><b>${reqItem.rackName}</b>`}</th>
												</tr>`);
												
											}
											$(".cInput_packingQty").change(function(){
												packingQtyChange(this);
											})
										})
						})
		 

		
	}
	else
	{
		
	} 
}

//디테일의 패킹 수량변경에 대한 이벤트
function packingQtyChange(obj)
{
	//인풋박스위 상위 태그 클래스명을 파싱해서 리스트중 요청정보가 들어있는 객체를 추적
	const textSplit = $(obj).parent().parent().attr('id').split("_");
	const reqItem = reqItemList.find((row)=>row.reqSeq==textSplit[2] && row.itemNo==textSplit[3] && row.storConsignCustCode == textSplit[4] && row.logisRackId == textSplit[5]);
	const reqSeq = parseInt(textSplit[2]);
	
	
	const beforeQty = reqItem.packingQty;
	const inputVal = $(obj).val();
	
	if(inputVal =='') // 비워지면 0으로 초기화
	{
		$(obj).val(0);
		reqItem.packingQty = 0;
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
		
		alert(`출고대기랙의 재고수량보다 높은 수량을 입력하셨습니다`);
		$(obj).val(beforeQty);
		return;
	}
	if(afterQty > reqItem.cnt) //요펑 수량보다 높은지 검사
	{
		alert('요청수량보다 높은 수량을 입력하셨습니다');
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
	reqItem.packingQty = afterQty; 
	
	$(obj).parent().parent().children(".cWidth5vwZoom").children('input').prop('checked', reqItem.packingQty > 0).change();
} 

//마스터의 상태에 따라 버튼들의 분기
function reqStateButtonSet(state)
{
	console.log(state)
// 	if(state == 'hide' || state == '전체처리')
// 	{
//		$("#iBtnAccept").hide();
//		$("#iBtnConfirm").hide();
//		$("#iBtnReject").hide();
//	}
//	else if(state == '미완료' || state == '요청')
//	{
//		$("#iBtnAccept").show();
//		$("#iBtnConfirm").hide();
//		$("#iBtnReject").hide();		
//	}
//	else if(state =='일부완료' || state =='접수' || state == '일부처리')
//	{
		$("#iBtnAccept").hide();
		$("#iBtnConfirm").show();
		$("#iBtnReject").show();	
//	}
	
	//const reqType = $('#iLabel_packingType').html();
	//$("#iBtnReject").html(reqType=='출고요청'? '요청취소' :  '거부');
	 
}

////접수버튼 이벤트
//$("#iBtnAccept").click(()=>{
//	pickingAccept();
//})
//
////피킹 접수 (주문,회수에서 접수/ 창고사용은 접수가 따로 없어서 자동 접수로 간주)
//function pickingAccept()
//{
//	const typeText = $('#iLabel_pickingType').html();
//	const reqNo = $("#iLabel_pickingReqNo").html();
//	
//	if(typeText =='주문요청')
//	{
//		simplePostAjax2('/order/pcReqAdd',
//			JSON.stringify({
//				"workingType":"ACCEPT_MASTER",
//				"pcReqNo":reqNo,
//				"inMemo1" : 'pda'
//			}),
//			(result)=>{ 
//				alert(result.result_msg);
//				if(result.result_code =='OK') //성공시 처리
//				{
//					reqStateButtonSet('접수');
//				}
//			}
//		)
//	}
//	else if(typeText =='회수요청')
//	{ 
//		simplePostAjax('/order/ctProcess',
//			{ 
//				reqNo,
//				seqArr : 'pda'
//			},
//			(result)=>{  
//				alert(result.ctProcess.db_resultMsg);
//				if(result.ctProcess.db_resultCode == 'Success')
//				{
//					reqStateButtonSet('접수');
//				} 
//			}
//		)
//	}
//}

//완료버튼
$("#iBtnConfirm").click(()=>{
	packingProc("ADD");
})
//거부버튼
$("#iBtnReject").click(()=>{
	packingProc("CANCEL");
})
//완료 및 거부처리 
function packingProc(workingType)
{
	const checkRowReq = []; //체크된 행의 데이터 객체를 찾아 보관할 변수 
	//체크박스에 체크된 요청의 속성기반으로 reqItemList에서 찾아서 저장
	$('input[name="chkRow"]:checked').each(function () { 
		//  순번,품번,랙의 창고 업체코드 , 랙의 logisRackId
		const checkRowPropSplit = $(this).parent().parent().attr('id').split('_');

		if(checkRowPropSplit.length <2) return;
		
		checkRowReq.push(reqItemList.find((row)=>row.reqSeq==checkRowPropSplit[2] &&
								row.itemNo==checkRowPropSplit[3]));
																
	})
	 
	const typeText = $('#iLabel_packingType').html();
	const reqNo = $("#iLabel_packingReqNo").html();
	
	if(typeText =='출고요청')
	{ 
		if(checkRowReq.find((row)=>row.packingQty ==0) && workingType =='ADD')
		{
			alert(`패킹수량이 0입니다.`);
			return;
		}
		if(checkRowReq.find((row)=>row.packingQty<row.cnt) && workingType =='ADD')
		{
			alert('패킹수량이 요청수량보다 적습니다.');
			return;
		}
		//통신으로 보낼 테이블 데이터를 가공해서 보관할 객체변수
		const checkData = checkRowReq.reduce((a,c)=>{ 
						    a.reqSeqArr += (a.reqNoArr != ''?'^':'')+c.reqSeq;
						    a.rlCntArr += (a.reqNoArr != ''?'^':'')+c.packingQty;
						    a.rlUnitPriceArr += (a.reqNoArr != ''?'^':'')+c.salePrice;
						    a.memo1Arr += (a.reqNoArr != ''?'^':'')+'pda처리';
						    a.memo2Arr += (a.reqNoArr != ''?'^':'')+'';
						    a.reqNoArr += (a.reqNoArr != ''?'^':'')+c.reqNo;
						    a.price += c.salePrice;
						    a.sumPrice += c.salePrice * c.packingQty;
						    return a;
						},{reqNoArr : '' , reqSeqArr : '' , rlCntArr : '' , rlUnitPriceArr : '' , memo1Arr : '' , memo2Arr : '' , price: 0 , sumPrice : 0});
		 			
			
		const data = {... reqMasterInfo , ...checkData  ,workingType}; 
		
		
		//패킹 처리
		simplePostAjax( workingType=='ADD'?'/logis/rlAdd':'/logis/rlItemAdd' ,
						data,
						(result)=>{
							
							if(result.result_code =='OK')
							{
								if(workingType=='ADD')
								{
									document.querySelector('dialog').showModal();
									setStartSpinner();
									const rlAddItemInfo = checkRowReq.map(row=>{
												return {
															workingType , 
															rlNo : result.rlno  ,
															reqSeqArr : row.reqSeq , 
															rlCntArr : row.packingQty , 
														    rlUnitPriceArr : row.salePrice ,
														    memo1Arr : 'pda처리' ,
														    memo2Arr : '' ,
														    reqNoArr : row.reqNo ,
														    price : row.salePrice ,
														    sumPrice :  row.salePrice * row.packingQty ,
														   
												}
									}) 
									 
									rlProcItemAdd(rlAddItemInfo , 0);
									 
									return;	
								}
								else
								{
									alert(result.result_msg)
								}
								location.reload();
							}
							else
							{
								alert(result.result_msg)
							}
							
						})
		
	}
	else
	{
		
	}
}

//디테일 처리
function rlProcItemAdd(itemInfo , index)
{
	const data = itemInfo[index];
	$.ajax({
	    url : '/logis/rlItemAdd',
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data  ,
	    success: function(result) {
			const nextIndex = index+1;
			
			if(itemInfo.length > nextIndex)
			{
				setTimeout(()=>{
					rlProcItemAdd(itemInfo,nextIndex);
				} , 250);
			}
			else
			{
				alert('처리완료');
				setStopSpinner();
				location.reload();
			}
	    },
	    error:function(request, status, error){ 
	    }
	});
}		