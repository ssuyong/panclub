const { myGridID } = require("./out-stock-bulk-list");

//주문요청. 2023.11.15
export function pcReqAdd() {


    if (dblRegClkChk()) return;
    const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
    if (checkedItems.length <= 0) {
        alert("품목을 선택하세요!");
        return;
    }

    const deliWay = $("#deliWay").val();
    const deliPayType = $("#deliPayType").val();
    const rcvlogisCode = $("#rcvlogisCode").val();

    if (deliWay == '') {
        alert("수령방법을 선택하세요.");
        $("#deliWay").focus();
        dblRegClkBln = false;
        return;
    }
    if (deliWay == '방문수령') {
        if (rcvlogisCode == '') {
            alert("방문처를 선택하세요.");
            $("#rcvlogisCode").focus();
            dblRegClkBln = false;
            return;
        }
    }

    else {
        if (deliPayType == '' && deliWay != '일반배송') {
            alert("비용을 선택하세요.");
            $("#deliPayType").focus();
            dblRegClkBln = false;
            return;
        }
    }

    let rowItem;
    console.log("rowItem : " + rowItem);

    let gvMemo1;
    let gvQty;
    let itemId;
    let itemIdArr = "";
    let gvQtyArr = "";
    let gvMemo1Arr = "";
    let saleRate;
    let saleRateArr = "";

    let stockRackCode;
    let stockRackCodeArr = "";


    for (let i = 0, len = checkedItems.length; i < len; i++) {
        rowItem = checkedItems[i];

        itemId = rowItem.item.itemId;
        gvQty = rowItem.item.gvQty;
        gvMemo1 = rowItem.item.gvMemo1;
        saleRate = rowItem.item.saleRate;
        stockRackCode = rowItem.item.stockRackCode;


        if (typeof itemId == 'undefined' || itemId == null) { itemId = ""; }
        if (typeof gvQty == 'undefined' || gvQty == null) { gvQty = ""; }
        if (typeof gvMemo1 == 'undefined' || gvMemo1 == null) { gvMemo1 = ""; }
        if (typeof saleRate == 'undefined' || saleRate == null) { saleRate = ""; }
        if (typeof stockRackCode == 'undefined' || stockRackCode == null) { stockRackCode = ""; }

        if (i == 0) {
            itemIdArr = itemId;
            gvQtyArr = gvQty;
            gvMemo1Arr = gvMemo1;
            saleRateArr = saleRate;
            stockRackCodeArr = stockRackCode;
        } else {
            itemIdArr = itemIdArr + "^" + itemId;
            gvQtyArr = gvQtyArr + "^" + gvQty;
            gvMemo1Arr = gvMemo1Arr + "^" + gvMemo1;
            saleRateArr = saleRateArr + "^" + saleRate;
            stockRackCodeArr = stockRackCodeArr + "^" + stockRackCode;
        }

    }

    let gvMgr = $("#gvMgr").val();
    let gvMemo = $("#gvMemo").val();

    let senderCustName = $("#senderCustName").val();
    let senderName = $("#senderName").val();
    let senderTel = $("#senderTel").val();
    let senderAddr1 = $("#senderAddr1").val();
    let receiverCustName = $("#receiverCustName").val();
    let receiverName = $("#receiverName").val();
    let receiverTel = $("#receiverTel").val();
    let receiverAddr1 = $("#receiverAddr1").val();


    let data = {};
    data.workingType = "ADD_NOPL";
    data.gvMgr = gvMgr;
    data.gvMemo = gvMemo;
    data.itemIdArr = itemIdArr;
    data.gvQtyArr = gvQtyArr;
    data.gvMemo1Arr = gvMemo1Arr;
    data.deliWay = deliWay;
    data.deliPayType = deliWay == '방문수령' ? '' : deliPayType;
    data.senderCustName = senderCustName;
    data.senderName = senderName;
    data.senderTel = senderTel;
    data.senderAddr1 = senderAddr1;
    data.receiverCustName = receiverCustName;
    data.receiverName = receiverName;
    data.receiverTel = receiverTel;
    data.receiverAddr1 = receiverAddr1;
    data.rcvlogisCode = deliWay == '방문수령' ? rcvlogisCode : '';
    data.saleRateArr = saleRateArr;
    data.stockRackCodeArr = stockRackCodeArr;


    $.ajax({
        url: "/order/pcReqAdd",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function(data) {
            if (data.result_code == 'Err') {
                alert(data.result_code + ":" + data.result_msg);
            } else {
                if (confirm("등록되었습니다.주문요청내역으로 이동하시겠습니까?")) {
                    location.href = "/order/out-pc-req-list?pcReqNo=" + data.pcReqNo;
                } else {
                    location.reload(true);
                }

            }
        },
        error: function(request, status, error) {
            dblRegClkBln = false;
            alert("code:" + request.status + "\n" + "error:" + error);
        }
    });

    /*
    $.ajax({
        url: "/order/pcReqAdd",
        dataType: "json",
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: {
            "workingType": "ADD_NOPL",
            "gvMgr": gvMgr,
            "gvMemo": gvMemo,

            "itemIdArr": itemIdArr,
            "gvQtyArr": gvQtyArr,
            "gvMemo1Arr": gvMemo1Arr
        },
        success: function(data) {
            alert(data.result_code + ":" + data.result_msg);
        },
        error: function(request, status, error) {
            alert("code:" + request.status + "\n" + "error:" + error);
        }
    });
    */
}
