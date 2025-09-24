package kr.co.panclub.model;

import java.util.Date;

public class StorMvReqItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String reqNo;      //  --창고사용번호
	private String reqSeq;      //  --순번
	private String orderNo;      //  --주문번호
	private String orderSeq;      //  --주문순번
	private int reqCnt;      //  --요청수량
	private int rlSbCnt;      //  --출고대기수량
	private int unitPrice;      //  --발주단가
	private String memo1;      // 
	private String memo2;      // 
	private String regUserId;      // 
	private String regYmd;      //  
	private String regHms;      //  
	private String uptUserId;      // 
	private String uptYmd;      // 
	private String uptHms;      // 
	private Date chkDate;      // 
	private String chkUserId;      // 
	private String statusCode;      // 
	
	private String ordArr;
	private String seqArr;
	private String cntArr;
	private String rlSbCntArr;
	private String unitPriceArr;
	private String memo1Arr;
	private String memo2Arr;
	private String reqArr;
	private String rseArr;
	
	private int mvCnt;
	private int mvCntArr;

    private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private int salePrice;
	
    private String chkYmd;

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

	public String getComCode() {
		return comCode;
	}

	public void setComCode(String comCode) {
		this.comCode = comCode;
	}

	public String getReqNo() {
		return reqNo;
	}

	public void setReqNo(String reqNo) {
		this.reqNo = reqNo;
	}

	public String getReqSeq() {
		return reqSeq;
	}

	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderSeq() {
		return orderSeq;
	}

	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
	}

	public int getReqCnt() {
		return reqCnt;
	}

	public void setReqCnt(int reqCnt) {
		this.reqCnt = reqCnt;
	}

	public int getRlSbCnt() {
		return rlSbCnt;
	}

	public void setRlSbCnt(int rlSbCnt) {
		this.rlSbCnt = rlSbCnt;
	}

	public int getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(int unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public String getMemo2() {
		return memo2;
	}

	public void setMemo2(String memo2) {
		this.memo2 = memo2;
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

	public Date getChkDate() {
		return chkDate;
	}

	public void setChkDate(Date chkDate) {
		this.chkDate = chkDate;
	}

	public String getChkUserId() {
		return chkUserId;
	}

	public void setChkUserId(String chkUserId) {
		this.chkUserId = chkUserId;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getOrdArr() {
		return ordArr;
	}

	public void setOrdArr(String ordArr) {
		this.ordArr = ordArr;
	}

	public String getSeqArr() {
		return seqArr;
	}

	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}

	public String getCntArr() {
		return cntArr;
	}

	public void setCntArr(String cntArr) {
		this.cntArr = cntArr;
	}

	public String getRlSbCntArr() {
		return rlSbCntArr;
	}

	public void setRlSbCntArr(String rlSbCntArr) {
		this.rlSbCntArr = rlSbCntArr;
	}

	public String getUnitPriceArr() {
		return unitPriceArr;
	}

	public void setUnitPriceArr(String unitPriceArr) {
		this.unitPriceArr = unitPriceArr;
	}

	public String getMemo1Arr() {
		return memo1Arr;
	}

	public void setMemo1Arr(String memo1Arr) {
		this.memo1Arr = memo1Arr;
	}

	public String getMemo2Arr() {
		return memo2Arr;
	}

	public void setMemo2Arr(String memo2Arr) {
		this.memo2Arr = memo2Arr;
	}

	public String getReqArr() {
		return reqArr;
	}

	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}

	public String getRseArr() {
		return rseArr;
	}

	public void setRseArr(String rseArr) {
		this.rseArr = rseArr;
	}

	public int getMvCnt() {
		return mvCnt;
	}

	public void setMvCnt(int mvCnt) {
		this.mvCnt = mvCnt;
	}

	public int getMvCntArr() {
		return mvCntArr;
	}

	public void setMvCntArr(int mvCntArr) {
		this.mvCntArr = mvCntArr;
	}

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public String getItemNo() {
		return itemNo;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemNameEn() {
		return itemNameEn;
	}

	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
	}

	public int getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(int salePrice) {
		this.salePrice = salePrice;
	}

	public String getChkYmd() {
		return chkYmd;
	}

	public void setChkYmd(String chkYmd) {
		this.chkYmd = chkYmd;
	}

	@Override
	public String toString() {
		return "StorMvReqItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", reqNo=" + reqNo + ", reqSeq=" + reqSeq + ", orderNo="
				+ orderNo + ", orderSeq=" + orderSeq + ", reqCnt=" + reqCnt + ", rlSbCnt=" + rlSbCnt + ", unitPrice="
				+ unitPrice + ", memo1=" + memo1 + ", memo2=" + memo2 + ", regUserId=" + regUserId + ", regYmd="
				+ regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms="
				+ uptHms + ", chkDate=" + chkDate + ", chkUserId=" + chkUserId + ", statusCode=" + statusCode
				+ ", ordArr=" + ordArr + ", seqArr=" + seqArr + ", cntArr=" + cntArr + ", rlSbCntArr=" + rlSbCntArr
				+ ", unitPriceArr=" + unitPriceArr + ", memo1Arr=" + memo1Arr + ", memo2Arr=" + memo2Arr + ", reqArr="
				+ reqArr + ", rseArr=" + rseArr + ", mvCnt=" + mvCnt + ", mvCntArr=" + mvCntArr + ", itemId=" + itemId
				+ ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", salePrice="
				+ salePrice + ", chkYmd=" + chkYmd + "]";
	}


	

	
	
}
