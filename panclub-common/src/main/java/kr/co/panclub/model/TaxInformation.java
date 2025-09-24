package kr.co.panclub.model;

public class TaxInformation {
	private String issueDate;
	private String memo;
	private String bookNo;
	private String serial;
	private String description;
	private String cash;
	private String check;
	private String draft;
	private String uncollected;
	private String totalSupplyPrice;
	private String totalTax;
	public String getIssueDate() {
		return issueDate;
	}
	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getBookNo() {
		return bookNo;
	}
	public void setBookNo(String bookNo) {
		this.bookNo = bookNo;
	}
	public String getSerial() {
		return serial;
	}
	public void setSerial(String serial) {
		this.serial = serial;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCash() {
		return cash;
	}
	public void setCash(String cash) {
		this.cash = cash;
	}
	public String getCheck() {
		return check;
	}
	public void setCheck(String check) {
		this.check = check;
	}
	public String getDraft() {
		return draft;
	}
	public void setDraft(String draft) {
		this.draft = draft;
	}
	public String getUncollected() {
		return uncollected;
	}
	public void setUncollected(String uncollected) {
		this.uncollected = uncollected;
	}
	public String getTotalSupplyPrice() {
		return totalSupplyPrice;
	}
	public void setTotalSupplyPrice(String totalSupplyPrice) {
		this.totalSupplyPrice = totalSupplyPrice;
	}
	public String getTotalTax() {
		return totalTax;
	}
	public void setTotalTax(String totalTax) {
		this.totalTax = totalTax;
	}
	@Override
	public String toString() {
		return "TaxInformation [issueDate=" + issueDate + ", memo=" + memo + ", bookNo=" + bookNo + ", serial=" + serial
				+ ", description=" + description + ", cash=" + cash + ", check=" + check + ", draft=" + draft
				+ ", uncollected=" + uncollected + ", totalSupplyPrice=" + totalSupplyPrice + ", totalTax=" + totalTax
				+ "]";
	}
	
	
}
