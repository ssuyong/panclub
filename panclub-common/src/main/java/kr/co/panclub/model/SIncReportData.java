package kr.co.panclub.model;

//월간 출고,입고,주문(증감)현황 데이터 조회 모델
public class SIncReportData {
	private int category; // 1 = 출고데이터 , 2= 입고데이터 , 3 = 주문데이터
	private String comCode; // 회사 컴코드
	private String stdYmd; // 날짜 포멧은 yyyy-mm-dd
	private int sumPriceTax; // 총합금액(세금포함)
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getStdYmd() {
		return stdYmd;
	}
	public void setStdYmd(String stdYmd) {
		this.stdYmd = stdYmd;
	}
	public int getSumPriceTax() {
		return sumPriceTax;
	}
	public void setSumPriceTax(int sumPriceTax) {
		this.sumPriceTax = sumPriceTax;
	}
	@Override
	public String toString() {
		return "SIncReportData [category=" + category + ", comCode=" + comCode + ", stdYmd=" + stdYmd + ", sumPriceTax="
				+ sumPriceTax + "]";
	}
	 
	
	
}
