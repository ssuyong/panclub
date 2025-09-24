package kr.co.panclub.model;

public class CtStorageRackQty {
	private String itemId;
	private String storageCode;
	private String storageName;
	private String rackCode;
	private String stockQty;
	private String rackName;
	private int logisRackId;  // 2024.06.27 supi - pda 피킹 처리에 랙 구분을 위해 logisRackId 반환 추가
	private String storConsignCustCode; //2024.06.27 supi - pda에서 해당 데이터의 창고 소유업체를 확인하기 위한변수
	
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
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
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getStockQty() {
		return stockQty;
	}
	public void setStockQty(String stockQty) {
		this.stockQty = stockQty;
	}
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public int getLogisRackId() {
		return logisRackId;
	}
	public void setLogisRackId(int logisRackId) {
		this.logisRackId = logisRackId;
	}
	public String getStorConsignCustCode() {
		return storConsignCustCode;
	}
	public void setStorConsignCustCode(String storConsignCustCode) {
		this.storConsignCustCode = storConsignCustCode;
	}
	@Override
	public String toString() {
		return "CtStorageRackQty [itemId=" + itemId + ", storageCode=" + storageCode + ", storageName=" + storageName
				+ ", rackCode=" + rackCode + ", stockQty=" + stockQty + ", rackName=" + rackName + ", logisRackId="
				+ logisRackId + ", storConsignCustCode=" + storConsignCustCode + "]";
	}
	
	
	
}
