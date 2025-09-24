package kr.co.panclub.model;

import java.util.Date;

public class StockChk {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private long itemId;
	private String storCode;
	private String rackCode;
	private int chkQty;
	private String uptUserId;
	private Date modified;
	
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	
	private String itemCode;
	private String factoryNo;
	private String makerCode;
	private String makerName;
	private String storName;
	private String rackName;
	private int stockQty;
	private int gapQty;
	
	private String procUserid; // --실사 반영 사원
	private String procYmd; //    --실사반영일
	private String procHms; //
	
	private String itemArr;
	private String storArr;
	private String rackArr;
	private String qtyArr;
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
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public int getChkQty() {
		return chkQty;
	}
	public void setChkQty(int chkQty) {
		this.chkQty = chkQty;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
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
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
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
	public String getStorName() {
		return storName;
	}
	public void setStorName(String storName) {
		this.storName = storName;
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
	public int getGapQty() {
		return gapQty;
	}
	public void setGapQty(int gapQty) {
		this.gapQty = gapQty;
	}
	public String getProcUserid() {
		return procUserid;
	}
	public void setProcUserid(String procUserid) {
		this.procUserid = procUserid;
	}
	public String getProcYmd() {
		return procYmd;
	}
	public void setProcYmd(String procYmd) {
		this.procYmd = procYmd;
	}
	public String getProcHms() {
		return procHms;
	}
	public void setProcHms(String procHms) {
		this.procHms = procHms;
	}
	public String getItemArr() {
		return itemArr;
	}
	public void setItemArr(String itemArr) {
		this.itemArr = itemArr;
	}
	public String getStorArr() {
		return storArr;
	}
	public void setStorArr(String storArr) {
		this.storArr = storArr;
	}
	public String getRackArr() {
		return rackArr;
	}
	public void setRackArr(String rackArr) {
		this.rackArr = rackArr;
	}
	public String getQtyArr() {
		return qtyArr;
	}
	public void setQtyArr(String qtyArr) {
		this.qtyArr = qtyArr;
	}
	@Override
	public String toString() {
		return "StockChk [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", itemId=" + itemId + ", storCode=" + storCode
				+ ", rackCode=" + rackCode + ", chkQty=" + chkQty + ", uptUserId=" + uptUserId + ", modified="
				+ modified + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn
				+ ", itemCode=" + itemCode + ", factoryNo=" + factoryNo + ", makerCode=" + makerCode + ", makerName="
				+ makerName + ", storName=" + storName + ", rackName=" + rackName + ", stockQty=" + stockQty
				+ ", gapQty=" + gapQty + ", procUserid=" + procUserid + ", procYmd=" + procYmd + ", procHms=" + procHms
				+ ", itemArr=" + itemArr + ", storArr=" + storArr + ", rackArr=" + rackArr + ", qtyArr=" + qtyArr + "]";
	}
	

	
	

	
	
}
