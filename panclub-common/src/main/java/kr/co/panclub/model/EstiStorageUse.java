package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class EstiStorageUse {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String estiNo;
	private String estiSeq;
	private String storageCode;
	private String storageName;
	private int stockQty;
	private int useCnt;
	private String regUserId;
	private Date created;
	private String uptUserId;
	private Date modified;
	
	private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	
	private String qtyArr;
	private String cntArr;
	private String scdArr;
	
	
	// 추가 행 리스트
	private ArrayList<EstiStorageUse> estiStorageUseAdd;
	// 수정 행 리스트
	private ArrayList<EstiStorageUse> estiStorageUseUpdate;
	// 삭제 행 리스트
	private ArrayList<EstiStorageUse> estiStorageUseRemove;
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
	public String getEstiNo() {
		return estiNo;
	}
	public void setEstiNo(String estiNo) {
		this.estiNo = estiNo;
	}
	public String getEstiSeq() {
		return estiSeq;
	}
	public void setEstiSeq(String estiSeq) {
		this.estiSeq = estiSeq;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public int getUseCnt() {
		return useCnt;
	}
	public void setUseCnt(int useCnt) {
		this.useCnt = useCnt;
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
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
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
	public String getQtyArr() {
		return qtyArr;
	}
	public void setQtyArr(String qtyArr) {
		this.qtyArr = qtyArr;
	}
	public String getCntArr() {
		return cntArr;
	}
	public void setCntArr(String cntArr) {
		this.cntArr = cntArr;
	}
	public String getScdArr() {
		return scdArr;
	}
	public void setScdArr(String scdArr) {
		this.scdArr = scdArr;
	}
	public ArrayList<EstiStorageUse> getEstiStorageUseAdd() {
		return estiStorageUseAdd;
	}
	public void setEstiStorageUseAdd(ArrayList<EstiStorageUse> estiStorageUseAdd) {
		this.estiStorageUseAdd = estiStorageUseAdd;
	}
	public ArrayList<EstiStorageUse> getEstiStorageUseUpdate() {
		return estiStorageUseUpdate;
	}
	public void setEstiStorageUseUpdate(ArrayList<EstiStorageUse> estiStorageUseUpdate) {
		this.estiStorageUseUpdate = estiStorageUseUpdate;
	}
	public ArrayList<EstiStorageUse> getEstiStorageUseRemove() {
		return estiStorageUseRemove;
	}
	public void setEstiStorageUseRemove(ArrayList<EstiStorageUse> estiStorageUseRemove) {
		this.estiStorageUseRemove = estiStorageUseRemove;
	}
	@Override
	public String toString() {
		return "EstiStorageUse [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", estiNo=" + estiNo + ", estiSeq=" + estiSeq
				+ ", storageCode=" + storageCode + ", storageName=" + storageName + ", stockQty=" + stockQty
				+ ", useCnt=" + useCnt + ", regUserId=" + regUserId + ", created=" + created + ", uptUserId="
				+ uptUserId + ", modified=" + modified + ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName="
				+ itemName + ", itemNameEn=" + itemNameEn + ", qtyArr=" + qtyArr + ", cntArr=" + cntArr + ", scdArr="
				+ scdArr + ", estiStorageUseAdd=" + estiStorageUseAdd + ", estiStorageUseUpdate=" + estiStorageUseUpdate
				+ ", estiStorageUseRemove=" + estiStorageUseRemove + "]";
	}

	
	
	
	
	
}
