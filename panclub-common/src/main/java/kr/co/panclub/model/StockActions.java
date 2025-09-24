package kr.co.panclub.model;

import java.math.BigDecimal;

public class StockActions {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private long idx;
	private String comCode;	
	private String rackCode;
	private String rackName;
	private String storCode;
	private String storName;	
	private long itemId;
	private String actionType;    // --작업구분 입고,출고,이동,실사, WH, RL,  MOVE, INSPEC
	private int procQty;    //  --처리수량
	private int beforeQty;    // --변경전수량
	private int afterQty;    //  --변경후수량
	private String procMemo1;    //   --비고
	private String regUserId;    // 
	private String regUserName; 
	private String created;    // 
	
	private String itemNo;
	private String itemName;
	
	private String actionName;
	private String makerCode;
	private String makerName;
	private String comName;
	
	//2024.07.11 hsg
	private BigDecimal centerPrice;
	private BigDecimal salePrice;   //부품할인가
	
	private String className;
	private String factoryNo;
	
	private String jobNo;
	private String jobType;
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
	public long getIdx() {
		return idx;
	}
	public void setIdx(long idx) {
		this.idx = idx;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public String getStorCode() {
		return storCode;
	}
	public void setStorCode(String storCode) {
		this.storCode = storCode;
	}
	public String getStorName() {
		return storName;
	}
	public void setStorName(String storName) {
		this.storName = storName;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public String getActionType() {
		return actionType;
	}
	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
	public int getProcQty() {
		return procQty;
	}
	public void setProcQty(int procQty) {
		this.procQty = procQty;
	}
	public int getBeforeQty() {
		return beforeQty;
	}
	public void setBeforeQty(int beforeQty) {
		this.beforeQty = beforeQty;
	}
	public int getAfterQty() {
		return afterQty;
	}
	public void setAfterQty(int afterQty) {
		this.afterQty = afterQty;
	}
	public String getProcMemo1() {
		return procMemo1;
	}
	public void setProcMemo1(String procMemo1) {
		this.procMemo1 = procMemo1;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
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
	public String getActionName() {
		return actionName;
	}
	public void setActionName(String actionName) {
		this.actionName = actionName;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
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
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getJobType() {
		return jobType;
	}
	public void setJobType(String jobType) {
		this.jobType = jobType;
	}
	@Override
	public String toString() {
		return "StockActions [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", comCode=" + comCode + ", rackCode=" + rackCode + ", rackName="
				+ rackName + ", storCode=" + storCode + ", storName=" + storName + ", itemId=" + itemId
				+ ", actionType=" + actionType + ", procQty=" + procQty + ", beforeQty=" + beforeQty + ", afterQty="
				+ afterQty + ", procMemo1=" + procMemo1 + ", regUserId=" + regUserId + ", regUserName=" + regUserName
				+ ", created=" + created + ", itemNo=" + itemNo + ", itemName=" + itemName + ", actionName="
				+ actionName + ", makerCode=" + makerCode + ", makerName=" + makerName + ", comName=" + comName
				+ ", centerPrice=" + centerPrice + ", salePrice=" + salePrice + ", className=" + className
				+ ", factoryNo=" + factoryNo + ", jobNo=" + jobNo + ", jobType=" + jobType + "]";
	}

	
	
	
	
}
