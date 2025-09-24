package kr.co.panclub.model;

public class StockReport {
	private int tab; // 탭
	private String category; // 같은탭내 다른 분류
	private int item; // 품목
	private int qty; // 수량
	private String price; // 가격1
	private String price2; // 가격2(두번째 가격이 있는경우)
	private String yymmdd; // 년월일
	private String itemCode; // 부품코드
	private String itemName; //부품이름
	private String reason; // 사유
	public int getTab() {
		return tab;
	}
	public void setTab(int tab) {
		this.tab = tab;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getItem() {
		return item;
	}
	public void setItem(int item) {
		this.item = item;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getPrice2() {
		return price2;
	}
	public void setPrice2(String price2) {
		this.price2 = price2;
	}
	public String getYymmdd() {
		return yymmdd;
	}
	public void setYymmdd(String yymmdd) {
		this.yymmdd = yymmdd;
	}
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	@Override
	public String toString() {
		return "StockReport [tab=" + tab + ", category=" + category + ", item=" + item + ", qty=" + qty + ", price="
				+ price + ", price2=" + price2 + ", yymmdd=" + yymmdd + ", itemCode=" + itemCode + ", itemName="
				+ itemName + ", reason=" + reason + "]";
	}
	 
}
