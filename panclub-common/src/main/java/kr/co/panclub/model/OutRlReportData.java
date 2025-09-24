package kr.co.panclub.model;

import java.math.BigDecimal;

public class OutRlReportData { 
	private String stdYmd;  //날짜 yyyy-mm-dd
	private int mmCustCount; // 거래처수 (월)
	private int custCount; // 거래처수
	private int mmItemCount; // 부품 품목수 (월)
	private int itemCount; // 부품 품목수
	private int cnt;    //수량
	private BigDecimal sumPrice; //공급가액
	private BigDecimal taxPrice; // 세액
	private BigDecimal sumPriceTax; // 합계금액
	private BigDecimal sumCenterPrice; // 표준가 합계
	private int type1;  //판매출고(H)
	private int type2;  //반품입고(H)
	private int type3;  //판매출고(B)
	private int type4;  //반품입고(B)
	private BigDecimal salePrice; // supi 2024.01.12  판매가격
	private BigDecimal profitsPrice; // supi 2024.01.12  판매가격-공급가액
	public String getStdYmd() {
		return stdYmd;
	}
	public void setStdYmd(String stdYmd) {
		this.stdYmd = stdYmd;
	}
	public int getMmCustCount() {
		return mmCustCount;
	}
	public void setMmCustCount(int mmCustCount) {
		this.mmCustCount = mmCustCount;
	}
	public int getCustCount() {
		return custCount;
	}
	public void setCustCount(int custCount) {
		this.custCount = custCount;
	}
	public int getMmItemCount() {
		return mmItemCount;
	}
	public void setMmItemCount(int mmItemCount) {
		this.mmItemCount = mmItemCount;
	}
	public int getItemCount() {
		return itemCount;
	}
	public void setItemCount(int itemCount) {
		this.itemCount = itemCount;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public BigDecimal getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
	}
	public BigDecimal getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}
	public BigDecimal getSumPriceTax() {
		return sumPriceTax;
	}
	public void setSumPriceTax(BigDecimal sumPriceTax) {
		this.sumPriceTax = sumPriceTax;
	}
	public BigDecimal getSumCenterPrice() {
		return sumCenterPrice;
	}
	public void setSumCenterPrice(BigDecimal sumCenterPrice) {
		this.sumCenterPrice = sumCenterPrice;
	}
	public int getType1() {
		return type1;
	}
	public void setType1(int type1) {
		this.type1 = type1;
	}
	public int getType2() {
		return type2;
	}
	public void setType2(int type2) {
		this.type2 = type2;
	}
	public int getType3() {
		return type3;
	}
	public void setType3(int type3) {
		this.type3 = type3;
	}
	public int getType4() {
		return type4;
	}
	public void setType4(int type4) {
		this.type4 = type4;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public BigDecimal getProfitsPrice() {
		return profitsPrice;
	}
	public void setProfitsPrice(BigDecimal profitsPrice) {
		this.profitsPrice = profitsPrice;
	}
	@Override
	public String toString() {
		return "OutRlReportData [stdYmd=" + stdYmd + ", mmCustCount=" + mmCustCount + ", custCount=" + custCount
				+ ", mmItemCount=" + mmItemCount + ", itemCount=" + itemCount + ", cnt=" + cnt + ", sumPrice="
				+ sumPrice + ", taxPrice=" + taxPrice + ", sumPriceTax=" + sumPriceTax + ", sumCenterPrice="
				+ sumCenterPrice + ", type1=" + type1 + ", type2=" + type2 + ", type3=" + type3 + ", type4=" + type4
				+ ", salePrice=" + salePrice + ", profitsPrice=" + profitsPrice + "]";
	}
	
	
	
	
}
