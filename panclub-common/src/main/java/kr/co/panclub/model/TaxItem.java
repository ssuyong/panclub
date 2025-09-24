package kr.co.panclub.model;

public class TaxItem {
	private String month;
    private String day;
    private String subject;
    private String unit;
    private String quantity;
    private String unitPrice;
    private String supplyPrice;
    private String tax;
    private String description;
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(String unitPrice) {
		this.unitPrice = unitPrice;
	}
	public String getSupplyPrice() {
		return supplyPrice;
	}
	public void setSupplyPrice(String supplyPrice) {
		this.supplyPrice = supplyPrice;
	}
	public String getTax() {
		return tax;
	}
	public void setTax(String tax) {
		this.tax = tax;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "TaxItem [month=" + month + ", day=" + day + ", subject=" + subject + ", unit=" + unit + ", quantity="
				+ quantity + ", unitPrice=" + unitPrice + ", supplyPrice=" + supplyPrice + ", tax=" + tax
				+ ", description=" + description + "]";
	}
    
    
}
