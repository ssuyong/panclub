package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class StockItemOuterNonDsp {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private long itemId;
	private String memo1;
	private String uptUserId;
	private String uptUserName;
	private String modified;
	
	private String itemNo;
	private String itemName;
	private int stockQty; 
	
	private BigDecimal centerPrice;

	// 추가 행 리스트
	private ArrayList<StockItemOuterNonDsp> stockItemOuterNonDspAdd;
	// 수정 행 리스트
	private ArrayList<StockItemOuterNonDsp> stockItemOuterNonDspUpdate;
	// 삭제 행 리스트
	private ArrayList<StockItemOuterNonDsp> stockItemOuterNonDspRemove;
	
	private String itemIdArr;
	private String memo1Arr;
	
	private String makerName;
	private String className;
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
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
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
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public ArrayList<StockItemOuterNonDsp> getStockItemOuterNonDspAdd() {
		return stockItemOuterNonDspAdd;
	}
	public void setStockItemOuterNonDspAdd(ArrayList<StockItemOuterNonDsp> stockItemOuterNonDspAdd) {
		this.stockItemOuterNonDspAdd = stockItemOuterNonDspAdd;
	}
	public ArrayList<StockItemOuterNonDsp> getStockItemOuterNonDspUpdate() {
		return stockItemOuterNonDspUpdate;
	}
	public void setStockItemOuterNonDspUpdate(ArrayList<StockItemOuterNonDsp> stockItemOuterNonDspUpdate) {
		this.stockItemOuterNonDspUpdate = stockItemOuterNonDspUpdate;
	}
	public ArrayList<StockItemOuterNonDsp> getStockItemOuterNonDspRemove() {
		return stockItemOuterNonDspRemove;
	}
	public void setStockItemOuterNonDspRemove(ArrayList<StockItemOuterNonDsp> stockItemOuterNonDspRemove) {
		this.stockItemOuterNonDspRemove = stockItemOuterNonDspRemove;
	}
	public String getItemIdArr() {
		return itemIdArr;
	}
	public void setItemIdArr(String itemIdArr) {
		this.itemIdArr = itemIdArr;
	}
	public String getMemo1Arr() {
		return memo1Arr;
	}
	public void setMemo1Arr(String memo1Arr) {
		this.memo1Arr = memo1Arr;
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
		return "StockItemOuterNonDsp [workingType=" + workingType + ", db_resultCode=" + db_resultCode
				+ ", db_resultMsg=" + db_resultMsg + ", comCode=" + comCode + ", itemId=" + itemId + ", memo1=" + memo1
				+ ", uptUserId=" + uptUserId + ", uptUserName=" + uptUserName + ", modified=" + modified + ", itemNo="
				+ itemNo + ", itemName=" + itemName + ", stockQty=" + stockQty + ", centerPrice=" + centerPrice
				+ ", stockItemOuterNonDspAdd=" + stockItemOuterNonDspAdd + ", stockItemOuterNonDspUpdate="
				+ stockItemOuterNonDspUpdate + ", stockItemOuterNonDspRemove=" + stockItemOuterNonDspRemove
				+ ", itemIdArr=" + itemIdArr + ", memo1Arr=" + memo1Arr + ", makerName=" + makerName + ", className="
				+ className + ", factoryNo=" + factoryNo + "]";
	}
	
	
}
