package kr.co.panclub.model;

import java.util.ArrayList;

public class Rack {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;  			//230315 장윤상 추가
    private String storageCode;  
    private String rackCode;  
    private String rackName; 
    private String validYN; 
    private String regUserId; 
    private String uptUserId; 
    
    private String storageName;
    private String barcode;
    
    private ArrayList<Rack> rackUpdate;//정동근추가
    private ArrayList<Rack> rackAdd;	//정동근추가
    private ArrayList<Rack> rackRemove;	//정동근추가
    
    //2023.09.08 hsg
    private long itemId;
    private String itemNo;
    private String itemName;
    private int stockQty;
    
    private String rackSrch; //231006 yooonsang -- rackCode or rackName
    
    private String memo; //2023.11.28 hsg
    
    private String gvComCode; //240313 yoonsang 
    
    //2024.06.11 hsg 
    private int logisRackId;
    private String logisRackName;
    
    //재고투입에서 위탁경우 랙 찾을때 사용중
    private String storType; // 랙이 들어있는 창고의 타입(신품 분실 등)
    private String rlStandByYN; // 랙이 출고대기창고에 있는랙인지 반환을 위해
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
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
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
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	public String getBarcode() {
		return barcode;
	}
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}
	public ArrayList<Rack> getRackUpdate() {
		return rackUpdate;
	}
	public void setRackUpdate(ArrayList<Rack> rackUpdate) {
		this.rackUpdate = rackUpdate;
	}
	public ArrayList<Rack> getRackAdd() {
		return rackAdd;
	}
	public void setRackAdd(ArrayList<Rack> rackAdd) {
		this.rackAdd = rackAdd;
	}
	public ArrayList<Rack> getRackRemove() {
		return rackRemove;
	}
	public void setRackRemove(ArrayList<Rack> rackRemove) {
		this.rackRemove = rackRemove;
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
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public String getRackSrch() {
		return rackSrch;
	}
	public void setRackSrch(String rackSrch) {
		this.rackSrch = rackSrch;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public int getLogisRackId() {
		return logisRackId;
	}
	public void setLogisRackId(int logisRackId) {
		this.logisRackId = logisRackId;
	}
	public String getLogisRackName() {
		return logisRackName;
	}
	public void setLogisRackName(String logisRackName) {
		this.logisRackName = logisRackName;
	}
	public String getStorType() {
		return storType;
	}
	public void setStorType(String storType) {
		this.storType = storType;
	}
	public String getRlStandByYN() {
		return rlStandByYN;
	}
	public void setRlStandByYN(String rlStandByYN) {
		this.rlStandByYN = rlStandByYN;
	}
	@Override
	public String toString() {
		return "Rack [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", storageCode=" + storageCode + ", rackCode=" + rackCode
				+ ", rackName=" + rackName + ", validYN=" + validYN + ", regUserId=" + regUserId + ", uptUserId="
				+ uptUserId + ", storageName=" + storageName + ", barcode=" + barcode + ", rackUpdate=" + rackUpdate
				+ ", rackAdd=" + rackAdd + ", rackRemove=" + rackRemove + ", itemId=" + itemId + ", itemNo=" + itemNo
				+ ", itemName=" + itemName + ", stockQty=" + stockQty + ", rackSrch=" + rackSrch + ", memo=" + memo
				+ ", gvComCode=" + gvComCode + ", logisRackId=" + logisRackId + ", logisRackName=" + logisRackName
				+ ", storType=" + storType + ", rlStandByYN=" + rlStandByYN + "]";
	}
	
}
