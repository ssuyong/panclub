package kr.co.panclub.model;

public class RlReportDetailItem {
	private String custName;
	private String itemNo;
	private String itemName;
	private int cnt;
	private int rlSumPrice;
	private String storageName;
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
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
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public int getRlSumPrice() {
		return rlSumPrice;
	}
	public void setRlSumPrice(int rlSumPrice) {
		this.rlSumPrice = rlSumPrice;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	@Override
	public String toString() {
		return "RlReportDetailItem [custName=" + custName + ", itemNo=" + itemNo + ", itemName=" + itemName + ", cnt="
				+ cnt + ", rlSumPrice=" + rlSumPrice + ", storageName=" + storageName + "]";
	}
	
	
	
}
