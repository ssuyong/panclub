package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class PcReq {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	private String db_resultSeq;

	private String comCode; //주문접수거래처코드
	private String pcReqNo; //주문접수요청번호
	private String gvComCode; //요청 거래처코드
	private String gvPlacNo; //요청업체 발주번호 
	private String gvMgr; //요청업체 담당자 
	private String gvMemo; //요청업체 메모 
	private String procStep; //접수여부 (수락/거부) 
	private String procUserId; //단계 등록자 
	private String procDate; // 단계처리일시 
	private String rejectMemo; // 거부사유 
	private String inMemo1; //접수받은 업체 메모 
	
	private BigDecimal price;    // --공급가액
	private BigDecimal taxPrice;    // --세액
	private BigDecimal sumPrice;    //  --합계
	private String regUserId;    // --등록자
	private String regYmd;    // --등록일
	private String regHms;    //  --등록시
	private String uptUserId;    //  --수정자
	private String uptYmd;    // --수정일
	private String uptHms;    // --수정시	
	
	private String gvCustName;
	private String tkCustName;
	
	private String directYN; // 직송여부 
	private int directCost; //운송비 
	private String branchCode; // 지점 
	
	private String regUserName;
	private String gvMgrName;
	private String procUserName;
	private String placeCustCode;
	
	//2023.11.16 hsg -외부업체에서 주문요청하는 경우 발주번호가 아닌 품목과 수량, 메모를 입력받아 처리
	private String itemIdArr;
	private String gvQtyArr;
	private String gvMemo1Arr;
	
	private int itemQty;  //아이템수. 2023.11.20 hsg
	private String tkComCode;  //접수받는 업체코드 2023.11.21 hsg
	
	//2023.12.08 hsg
	private String deliWay;                   // 배송방법(수령방법) 내사,택배,퀵
	private String deliPayType;                   // 비용지불방식. 선불,후불
	private String senderCustName;                   // 보내는 거래처명
	private String senderName;                   // 보내는 사람
	private String senderTel;                   // 보내는 사람전화
	private String senderAddr1;                   // 보내는 사람전화
	private String receiverCustName;                   // 받는 주소
	private String receiverName;                   // 받는 사람
	private String receiverTel;                   // 받는 사람전화
	private String receiverAddr1;                   // 받는주소
	
	
	//2023.12.11 hsg
	private String gvComCodeArr;
	private String pcReqNoArr;
	private String reqSeqArr;
	
	private String regHmsg;    //  --등록시 2024.01.08 hsg
	private String uptHmsg;
	
	private String pcReqSeqArr;  //주문 접수 수락에서 선택된 랙 수량관련 데이터
	private String pcRackCodeArr;
	private String pcRackqtyArr;
	
	private String autoPcProcYN;   //2024.01.17 hsg - 접수시 주문자동생성 여부
	private String procState; // 20240125 supi 디테일 상태에 따라 반환되는 마스터 처리상태
	
	private String salePriceType; // 20240131 supi 판매가격타입

	private String orderNo; //20240221 supi 주문번호
	
	private String rcvlogisCode; // 20240311 supi 방문수령의 경우 방문처(물류수령센터코드)
	
	private String rejectCount; // 20240312 supi 마스터에 연결된 디테일의 거부상태의 수
	
	private String rejectMemoArr; // 20240314 supi 거절사유
	
	private int procCount; //20240314 supi 처리수
	
	private int orderDelCount; // 20240405 supi 주문삭제품목수
	
	private String saleRateArr; // 20250628 yoonsang 같은 물건도 할인율 다르게 팔기위해 할인율 추가 
	private String stockRackCodeArr; // 20250628 yoonsang 같은 물건도 할인율 다르게 팔기위해 rackcode 추가
	public String getWorkingType() {
		return workingType;
	}
	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}
	public String getDb_resultCode() {
		return db_resultCode;
	}
	public void setDb_resultCode(String db_resultCode) {
		this.db_resultCode = db_resultCode;
	}
	public String getDb_resultMsg() {
		return db_resultMsg;
	}
	public void setDb_resultMsg(String db_resultMsg) {
		this.db_resultMsg = db_resultMsg;
	}
	public String getDb_resultSeq() {
		return db_resultSeq;
	}
	public void setDb_resultSeq(String db_resultSeq) {
		this.db_resultSeq = db_resultSeq;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getPcReqNo() {
		return pcReqNo;
	}
	public void setPcReqNo(String pcReqNo) {
		this.pcReqNo = pcReqNo;
	}
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public String getGvPlacNo() {
		return gvPlacNo;
	}
	public void setGvPlacNo(String gvPlacNo) {
		this.gvPlacNo = gvPlacNo;
	}
	public String getGvMgr() {
		return gvMgr;
	}
	public void setGvMgr(String gvMgr) {
		this.gvMgr = gvMgr;
	}
	public String getGvMemo() {
		return gvMemo;
	}
	public void setGvMemo(String gvMemo) {
		this.gvMemo = gvMemo;
	}
	public String getProcStep() {
		return procStep;
	}
	public void setProcStep(String procStep) {
		this.procStep = procStep;
	}
	public String getProcUserId() {
		return procUserId;
	}
	public void setProcUserId(String procUserId) {
		this.procUserId = procUserId;
	}
	public String getProcDate() {
		return procDate;
	}
	public void setProcDate(String procDate) {
		this.procDate = procDate;
	}
	public String getRejectMemo() {
		return rejectMemo;
	}
	public void setRejectMemo(String rejectMemo) {
		this.rejectMemo = rejectMemo;
	}
	public String getInMemo1() {
		return inMemo1;
	}
	public void setInMemo1(String inMemo1) {
		this.inMemo1 = inMemo1;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public BigDecimal getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}
	public BigDecimal getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getRegYmd() {
		return regYmd;
	}
	public void setRegYmd(String regYmd) {
		this.regYmd = regYmd;
	}
	public String getRegHms() {
		return regHms;
	}
	public void setRegHms(String regHms) {
		this.regHms = regHms;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getUptYmd() {
		return uptYmd;
	}
	public void setUptYmd(String uptYmd) {
		this.uptYmd = uptYmd;
	}
	public String getUptHms() {
		return uptHms;
	}
	public void setUptHms(String uptHms) {
		this.uptHms = uptHms;
	}
	public String getGvCustName() {
		return gvCustName;
	}
	public void setGvCustName(String gvCustName) {
		this.gvCustName = gvCustName;
	}
	public String getTkCustName() {
		return tkCustName;
	}
	public void setTkCustName(String tkCustName) {
		this.tkCustName = tkCustName;
	}
	public String getDirectYN() {
		return directYN;
	}
	public void setDirectYN(String directYN) {
		this.directYN = directYN;
	}
	public int getDirectCost() {
		return directCost;
	}
	public void setDirectCost(int directCost) {
		this.directCost = directCost;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getGvMgrName() {
		return gvMgrName;
	}
	public void setGvMgrName(String gvMgrName) {
		this.gvMgrName = gvMgrName;
	}
	public String getProcUserName() {
		return procUserName;
	}
	public void setProcUserName(String procUserName) {
		this.procUserName = procUserName;
	}
	public String getPlaceCustCode() {
		return placeCustCode;
	}
	public void setPlaceCustCode(String placeCustCode) {
		this.placeCustCode = placeCustCode;
	}
	public String getItemIdArr() {
		return itemIdArr;
	}
	public void setItemIdArr(String itemIdArr) {
		this.itemIdArr = itemIdArr;
	}
	public String getGvQtyArr() {
		return gvQtyArr;
	}
	public void setGvQtyArr(String gvQtyArr) {
		this.gvQtyArr = gvQtyArr;
	}
	public String getGvMemo1Arr() {
		return gvMemo1Arr;
	}
	public void setGvMemo1Arr(String gvMemo1Arr) {
		this.gvMemo1Arr = gvMemo1Arr;
	}
	public int getItemQty() {
		return itemQty;
	}
	public void setItemQty(int itemQty) {
		this.itemQty = itemQty;
	}
	public String getTkComCode() {
		return tkComCode;
	}
	public void setTkComCode(String tkComCode) {
		this.tkComCode = tkComCode;
	}
	public String getDeliWay() {
		return deliWay;
	}
	public void setDeliWay(String deliWay) {
		this.deliWay = deliWay;
	}
	public String getDeliPayType() {
		return deliPayType;
	}
	public void setDeliPayType(String deliPayType) {
		this.deliPayType = deliPayType;
	}
	public String getSenderCustName() {
		return senderCustName;
	}
	public void setSenderCustName(String senderCustName) {
		this.senderCustName = senderCustName;
	}
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getSenderTel() {
		return senderTel;
	}
	public void setSenderTel(String senderTel) {
		this.senderTel = senderTel;
	}
	public String getSenderAddr1() {
		return senderAddr1;
	}
	public void setSenderAddr1(String senderAddr1) {
		this.senderAddr1 = senderAddr1;
	}
	public String getReceiverCustName() {
		return receiverCustName;
	}
	public void setReceiverCustName(String receiverCustName) {
		this.receiverCustName = receiverCustName;
	}
	public String getReceiverName() {
		return receiverName;
	}
	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}
	public String getReceiverTel() {
		return receiverTel;
	}
	public void setReceiverTel(String receiverTel) {
		this.receiverTel = receiverTel;
	}
	public String getReceiverAddr1() {
		return receiverAddr1;
	}
	public void setReceiverAddr1(String receiverAddr1) {
		this.receiverAddr1 = receiverAddr1;
	}
	public String getGvComCodeArr() {
		return gvComCodeArr;
	}
	public void setGvComCodeArr(String gvComCodeArr) {
		this.gvComCodeArr = gvComCodeArr;
	}
	public String getPcReqNoArr() {
		return pcReqNoArr;
	}
	public void setPcReqNoArr(String pcReqNoArr) {
		this.pcReqNoArr = pcReqNoArr;
	}
	public String getReqSeqArr() {
		return reqSeqArr;
	}
	public void setReqSeqArr(String reqSeqArr) {
		this.reqSeqArr = reqSeqArr;
	}
	public String getRegHmsg() {
		return regHmsg;
	}
	public void setRegHmsg(String regHmsg) {
		this.regHmsg = regHmsg;
	}
	public String getUptHmsg() {
		return uptHmsg;
	}
	public void setUptHmsg(String uptHmsg) {
		this.uptHmsg = uptHmsg;
	}
	public String getPcReqSeqArr() {
		return pcReqSeqArr;
	}
	public void setPcReqSeqArr(String pcReqSeqArr) {
		this.pcReqSeqArr = pcReqSeqArr;
	}
	public String getPcRackCodeArr() {
		return pcRackCodeArr;
	}
	public void setPcRackCodeArr(String pcRackCodeArr) {
		this.pcRackCodeArr = pcRackCodeArr;
	}
	public String getPcRackqtyArr() {
		return pcRackqtyArr;
	}
	public void setPcRackqtyArr(String pcRackqtyArr) {
		this.pcRackqtyArr = pcRackqtyArr;
	}
	public String getAutoPcProcYN() {
		return autoPcProcYN;
	}
	public void setAutoPcProcYN(String autoPcProcYN) {
		this.autoPcProcYN = autoPcProcYN;
	}
	public String getProcState() {
		return procState;
	}
	public void setProcState(String procState) {
		this.procState = procState;
	}
	public String getSalePriceType() {
		return salePriceType;
	}
	public void setSalePriceType(String salePriceType) {
		this.salePriceType = salePriceType;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getRcvlogisCode() {
		return rcvlogisCode;
	}
	public void setRcvlogisCode(String rcvlogisCode) {
		this.rcvlogisCode = rcvlogisCode;
	}
	public String getRejectCount() {
		return rejectCount;
	}
	public void setRejectCount(String rejectCount) {
		this.rejectCount = rejectCount;
	}
	public String getRejectMemoArr() {
		return rejectMemoArr;
	}
	public void setRejectMemoArr(String rejectMemoArr) {
		this.rejectMemoArr = rejectMemoArr;
	}
	public int getProcCount() {
		return procCount;
	}
	public void setProcCount(int procCount) {
		this.procCount = procCount;
	}
	public int getOrderDelCount() {
		return orderDelCount;
	}
	public void setOrderDelCount(int orderDelCount) {
		this.orderDelCount = orderDelCount;
	}
	public String getSaleRateArr() {
		return saleRateArr;
	}
	public void setSaleRateArr(String saleRateArr) {
		this.saleRateArr = saleRateArr;
	}
	public String getStockRackCodeArr() {
		return stockRackCodeArr;
	}
	public void setStockRackCodeArr(String stockRackCodeArr) {
		this.stockRackCodeArr = stockRackCodeArr;
	}
	@Override
	public String toString() {
		return "PcReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", db_resultSeq=" + db_resultSeq + ", comCode=" + comCode + ", pcReqNo=" + pcReqNo
				+ ", gvComCode=" + gvComCode + ", gvPlacNo=" + gvPlacNo + ", gvMgr=" + gvMgr + ", gvMemo=" + gvMemo
				+ ", procStep=" + procStep + ", procUserId=" + procUserId + ", procDate=" + procDate + ", rejectMemo="
				+ rejectMemo + ", inMemo1=" + inMemo1 + ", price=" + price + ", taxPrice=" + taxPrice + ", sumPrice="
				+ sumPrice + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId="
				+ uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", gvCustName=" + gvCustName
				+ ", tkCustName=" + tkCustName + ", directYN=" + directYN + ", directCost=" + directCost
				+ ", branchCode=" + branchCode + ", regUserName=" + regUserName + ", gvMgrName=" + gvMgrName
				+ ", procUserName=" + procUserName + ", placeCustCode=" + placeCustCode + ", itemIdArr=" + itemIdArr
				+ ", gvQtyArr=" + gvQtyArr + ", gvMemo1Arr=" + gvMemo1Arr + ", itemQty=" + itemQty + ", tkComCode="
				+ tkComCode + ", deliWay=" + deliWay + ", deliPayType=" + deliPayType + ", senderCustName="
				+ senderCustName + ", senderName=" + senderName + ", senderTel=" + senderTel + ", senderAddr1="
				+ senderAddr1 + ", receiverCustName=" + receiverCustName + ", receiverName=" + receiverName
				+ ", receiverTel=" + receiverTel + ", receiverAddr1=" + receiverAddr1 + ", gvComCodeArr=" + gvComCodeArr
				+ ", pcReqNoArr=" + pcReqNoArr + ", reqSeqArr=" + reqSeqArr + ", regHmsg=" + regHmsg + ", uptHmsg="
				+ uptHmsg + ", pcReqSeqArr=" + pcReqSeqArr + ", pcRackCodeArr=" + pcRackCodeArr + ", pcRackqtyArr="
				+ pcRackqtyArr + ", autoPcProcYN=" + autoPcProcYN + ", procState=" + procState + ", salePriceType="
				+ salePriceType + ", orderNo=" + orderNo + ", rcvlogisCode=" + rcvlogisCode + ", rejectCount="
				+ rejectCount + ", rejectMemoArr=" + rejectMemoArr + ", procCount=" + procCount + ", orderDelCount="
				+ orderDelCount + ", saleRateArr=" + saleRateArr + ", stockRackCodeArr=" + stockRackCodeArr + "]";
	}
	
	
	
	
	
}
