package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class ItemStorage {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	
	private String comCode;
	private long itemId;
	private String storageCode;   //--창고
	private String lackCode;   //--랙
	private String stockQty;   //--재고수량
	private String regUserId;
	private Date created;
	private String uptUserId;
	private Date modofied;
	
	// 추가 행 리스트
	private ArrayList<ItemStorage> itemStorageAdd;
	// 수정 행 리스트
	private ArrayList<ItemStorage> itemStorageUpdate;
	// 삭제 행 리스트
	private ArrayList<ItemStorage> itemStorageRemove;
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
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getLackCode() {
		return lackCode;
	}
	public void setLackCode(String lackCode) {
		this.lackCode = lackCode;
	}
	public String getStockQty() {
		return stockQty;
	}
	public void setStockQty(String stockQty) {
		this.stockQty = stockQty;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getModofied() {
		return modofied;
	}
	public void setModofied(Date modofied) {
		this.modofied = modofied;
	}
	public ArrayList<ItemStorage> getItemStorageAdd() {
		return itemStorageAdd;
	}
	public void setItemStorageAdd(ArrayList<ItemStorage> itemStorageAdd) {
		this.itemStorageAdd = itemStorageAdd;
	}
	public ArrayList<ItemStorage> getItemStorageUpdate() {
		return itemStorageUpdate;
	}
	public void setItemStorageUpdate(ArrayList<ItemStorage> itemStorageUpdate) {
		this.itemStorageUpdate = itemStorageUpdate;
	}
	public ArrayList<ItemStorage> getItemStorageRemove() {
		return itemStorageRemove;
	}
	public void setItemStorageRemove(ArrayList<ItemStorage> itemStorageRemove) {
		this.itemStorageRemove = itemStorageRemove;
	}
	@Override
	public String toString() {
		return "ItemStorage [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", itemId=" + itemId + ", storageCode=" + storageCode
				+ ", lackCode=" + lackCode + ", stockQty=" + stockQty + ", regUserId=" + regUserId + ", created="
				+ created + ", uptUserId=" + uptUserId + ", modofied=" + modofied + ", itemStorageAdd=" + itemStorageAdd
				+ ", itemStorageUpdate=" + itemStorageUpdate + ", itemStorageRemove=" + itemStorageRemove + "]";
	}
	
	
	
}
