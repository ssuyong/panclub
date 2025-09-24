package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class StorageUseItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String storageUseReqNo;        //  --창고사용번호
	private String reqSeq;        //  --순번
	private String orderNo;        //  --주문번호
	private String orderSeq;        //  --주문순번
	private String useCnt;        // --창고수량
	private String storageCode;        //  --창고코드
	//--합계?
	private String memo1;        // 
	private String memo2;        // 
	private String regUserId;        // 
	private String regYmd;        //  
	private String regHms;        //  
	private String uptUserId;        // 
	private String uptYmd;        // 
	private String uptHms;        // 
	
    private String reqArr;
    private String rseArr;
    private String ordArr;
    private String seqArr;
    private String scdArr;
    private String mm1Arr;
    private String mm2Arr;
    private String cntArr;
    
    private String chkUserId;
    private Date chkDate;
    private String chkYmd;
    
    private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	
	private int salePrice;
	
	//주문관련 추가 2023.03.30 hsg
	private String orderGroupId;
	private int orderCnt;
	private String storageName;
	
	private BigDecimal unitPrice;   //2023.08.23. hsg

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

	public String getStorageUseReqNo() {
		return storageUseReqNo;
	}

	public void setStorageUseReqNo(String storageUseReqNo) {
		this.storageUseReqNo = storageUseReqNo;
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

	public String getUseCnt() {
		return useCnt;
	}

	public void setUseCnt(String useCnt) {
		this.useCnt = useCnt;
	}

	public String getStorageCode() {
		return storageCode;
	}

	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
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

	public String getScdArr() {
		return scdArr;
	}

	public void setScdArr(String scdArr) {
		this.scdArr = scdArr;
	}

	public String getMm1Arr() {
		return mm1Arr;
	}

	public void setMm1Arr(String mm1Arr) {
		this.mm1Arr = mm1Arr;
	}

	public String getMm2Arr() {
		return mm2Arr;
	}

	public void setMm2Arr(String mm2Arr) {
		this.mm2Arr = mm2Arr;
	}

	public String getCntArr() {
		return cntArr;
	}

	public void setCntArr(String cntArr) {
		this.cntArr = cntArr;
	}

	public String getChkUserId() {
		return chkUserId;
	}

	public void setChkUserId(String chkUserId) {
		this.chkUserId = chkUserId;
	}

	public Date getChkDate() {
		return chkDate;
	}

	public void setChkDate(Date chkDate) {
		this.chkDate = chkDate;
	}

	public String getChkYmd() {
		return chkYmd;
	}

	public void setChkYmd(String chkYmd) {
		this.chkYmd = chkYmd;
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

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}

	public int getOrderCnt() {
		return orderCnt;
	}

	public void setOrderCnt(int orderCnt) {
		this.orderCnt = orderCnt;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	@Override
	public String toString() {
		return "StorageUseItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", storageUseReqNo=" + storageUseReqNo + ", reqSeq=" + reqSeq
				+ ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", useCnt=" + useCnt + ", storageCode="
				+ storageCode + ", memo1=" + memo1 + ", memo2=" + memo2 + ", regUserId=" + regUserId + ", regYmd="
				+ regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms="
				+ uptHms + ", reqArr=" + reqArr + ", rseArr=" + rseArr + ", ordArr=" + ordArr + ", seqArr=" + seqArr
				+ ", scdArr=" + scdArr + ", mm1Arr=" + mm1Arr + ", mm2Arr=" + mm2Arr + ", cntArr=" + cntArr
				+ ", chkUserId=" + chkUserId + ", chkDate=" + chkDate + ", chkYmd=" + chkYmd + ", itemId=" + itemId
				+ ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", salePrice="
				+ salePrice + ", orderGroupId=" + orderGroupId + ", orderCnt=" + orderCnt + ", storageName="
				+ storageName + ", unitPrice=" + unitPrice + "]";
	}
	

	
	
	


	

    
}
