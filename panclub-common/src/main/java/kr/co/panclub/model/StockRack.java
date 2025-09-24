package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class StockRack {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private long itemId;
	private String storCode;
	private String storName;
	private String rackCode;
	private String rackName;
	private int stockQty;
	private String created;
	private String modified;
	
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	
	private String regUserId;
	private String regUserName;
	private String uptUserId;
	private String uptUserName;
	
	private String makerCode;
	private String makerName;
	private String classCode;
	private String className;
	
	private BigDecimal centerPrice;
	private BigDecimal costPrice;
	private BigDecimal salePrice;
	
	private String storConsignCustCode; // 바코드 출력용 입고 창고 업체 기반한 업체코드
	
	private String factoryNo;
	
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
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
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
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
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
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getUptUserName() {
		return uptUserName;
	}
	public void setUptUserName(String uptUserName) {
		this.uptUserName = uptUserName;
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
	public String getClassCode() {
		return classCode;
	}
	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public BigDecimal getCostPrice() {
		return costPrice;
	}
	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public String getStorConsignCustCode() {
		return storConsignCustCode;
	}
	public void setStorConsignCustCode(String storConsignCustCode) {
		this.storConsignCustCode = storConsignCustCode;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	@Override
	public String toString() {
		return "StockRack [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", itemId=" + itemId + ", storCode=" + storCode
				+ ", storName=" + storName + ", rackCode=" + rackCode + ", rackName=" + rackName + ", stockQty="
				+ stockQty + ", created=" + created + ", modified=" + modified + ", itemNo=" + itemNo + ", itemName="
				+ itemName + ", itemNameEn=" + itemNameEn + ", regUserId=" + regUserId + ", regUserName=" + regUserName
				+ ", uptUserId=" + uptUserId + ", uptUserName=" + uptUserName + ", makerCode=" + makerCode
				+ ", makerName=" + makerName + ", classCode=" + classCode + ", className=" + className
				+ ", centerPrice=" + centerPrice + ", costPrice=" + costPrice + ", salePrice=" + salePrice
				+ ", storConsignCustCode=" + storConsignCustCode + ", factoryNo=" + factoryNo + "]";
	}
	
}
