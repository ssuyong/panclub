package kr.co.panclub.model;

public class SaleItemQty {
	private String comName;
	private String stdYm;
	private String itemNo;
	private String makerName;
	private String itemName;
	private String saleQty;
	private String createdDate;
	
	
	private String startYm;
	private String endYm;
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getStdYm() {
		return stdYm;
	}
	public void setStdYm(String stdYm) {
		this.stdYm = stdYm;
	}
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getSaleQty() {
		return saleQty;
	}
	public void setSaleQty(String saleQty) {
		this.saleQty = saleQty;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public String getStartYm() {
		return startYm;
	}
	public void setStartYm(String startYm) {
		this.startYm = startYm;
	}
	public String getEndYm() {
		return endYm;
	}
	public void setEndYm(String endYm) {
		this.endYm = endYm;
	}
	@Override
	public String toString() {
		return "SaleItemQty [comName=" + comName + ", stdYm=" + stdYm + ", itemNo=" + itemNo + ", makerName="
				+ makerName + ", itemName=" + itemName + ", saleQty=" + saleQty + ", createdDate=" + createdDate
				+ ", startYm=" + startYm + ", endYm=" + endYm + "]";
	}
	 
	
	
	
}
