package kr.co.panclub.model;

public class CtReqItem {
	private String ctReqNo;
	private String reqSeq;
	private String itemId;
	private String itemNo;
	private String itemName;
	private String qty;
	private String reqMemo1;
	private String selectRack;
	private String storReqNo;
	private String storReqSeq;
	private String inMemo1;
	private String procStep;
	private String procUserId;
	private String procDate;
	private String rejectMemo;
	private String storReqComCode;
	private String storReqComName;
	private String custName1;
	private String custName2;
	private String reqCustName;
	private String rcvLogisCode;	// 240607 yoonsang 수령물류센터
	
	private String reqCustCode;   //2024.07.01 hsg
	
	private String makerName;
	private String className;
	private String factoryNo;

	public String getCtReqNo() {
		return ctReqNo;
	}

	public void setCtReqNo(String ctReqNo) {
		this.ctReqNo = ctReqNo;
	}

	public String getReqSeq() {
		return reqSeq;
	}

	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
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

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getReqMemo1() {
		return reqMemo1;
	}

	public void setReqMemo1(String reqMemo1) {
		this.reqMemo1 = reqMemo1;
	}

	public String getSelectRack() {
		return selectRack;
	}

	public void setSelectRack(String selectRack) {
		this.selectRack = selectRack;
	}

	public String getStorReqNo() {
		return storReqNo;
	}

	public void setStorReqNo(String storReqNo) {
		this.storReqNo = storReqNo;
	}

	public String getStorReqSeq() {
		return storReqSeq;
	}

	public void setStorReqSeq(String storReqSeq) {
		this.storReqSeq = storReqSeq;
	}

	public String getInMemo1() {
		return inMemo1;
	}

	public void setInMemo1(String inMemo1) {
		this.inMemo1 = inMemo1;
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

	public String getStorReqComCode() {
		return storReqComCode;
	}

	public void setStorReqComCode(String storReqComCode) {
		this.storReqComCode = storReqComCode;
	}

	public String getStorReqComName() {
		return storReqComName;
	}

	public void setStorReqComName(String storReqComName) {
		this.storReqComName = storReqComName;
	}

	public String getCustName1() {
		return custName1;
	}

	public void setCustName1(String custName1) {
		this.custName1 = custName1;
	}

	public String getCustName2() {
		return custName2;
	}

	public void setCustName2(String custName2) {
		this.custName2 = custName2;
	}

	public String getReqCustName() {
		return reqCustName;
	}

	public void setReqCustName(String reqCustName) {
		this.reqCustName = reqCustName;
	}

	public String getRcvLogisCode() {
		return rcvLogisCode;
	}

	public void setRcvLogisCode(String rcvLogisCode) {
		this.rcvLogisCode = rcvLogisCode;
	}

	public String getReqCustCode() {
		return reqCustCode;
	}

	public void setReqCustCode(String reqCustCode) {
		this.reqCustCode = reqCustCode;
	}

	public String getMakerName() {
		return makerName;
	}

	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getFactoryNo() {
		return factoryNo;
	}

	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}

	@Override
	public String toString() {
		return "CtReqItem [ctReqNo=" + ctReqNo + ", reqSeq=" + reqSeq + ", itemId=" + itemId + ", itemNo=" + itemNo
				+ ", itemName=" + itemName + ", qty=" + qty + ", reqMemo1=" + reqMemo1 + ", selectRack=" + selectRack
				+ ", storReqNo=" + storReqNo + ", storReqSeq=" + storReqSeq + ", inMemo1=" + inMemo1 + ", procStep="
				+ procStep + ", procUserId=" + procUserId + ", procDate=" + procDate + ", rejectMemo=" + rejectMemo
				+ ", storReqComCode=" + storReqComCode + ", storReqComName=" + storReqComName + ", custName1="
				+ custName1 + ", custName2=" + custName2 + ", reqCustName=" + reqCustName + ", rcvLogisCode="
				+ rcvLogisCode + ", reqCustCode=" + reqCustCode + ", makerName=" + makerName + ", className="
				+ className + ", factoryNo=" + factoryNo + "]";
	}

	

	
	
}
