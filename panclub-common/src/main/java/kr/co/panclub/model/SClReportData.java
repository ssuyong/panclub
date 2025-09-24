package kr.co.panclub.model;

import java.math.BigDecimal;

public class SClReportData {
	private String comCode; //거래처코드
	private String comName; //거래처명
	private String custCode; //업체코드
	private String custName; //업체명
	
	//전체
	private BigDecimal sumSaleAmt; // 판매가
	private BigDecimal sumClAmt;  // 청구액
	private BigDecimal sumCollectAmt; //수금액
	
	//보험
	private BigDecimal insureSaleAmt; // 판매가
	private BigDecimal insureClAmt; //청구액
	private BigDecimal insureCollectAmt; //수금액
	
	//일반
	private BigDecimal saleAmt; //판매가
	private BigDecimal clAmt; // 청구액
	private BigDecimal collectAmt; //수금액
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public BigDecimal getSumSaleAmt() {
		return sumSaleAmt;
	}
	public void setSumSaleAmt(BigDecimal sumSaleAmt) {
		this.sumSaleAmt = sumSaleAmt;
	}
	public BigDecimal getSumClAmt() {
		return sumClAmt;
	}
	public void setSumClAmt(BigDecimal sumClAmt) {
		this.sumClAmt = sumClAmt;
	}
	public BigDecimal getSumCollectAmt() {
		return sumCollectAmt;
	}
	public void setSumCollectAmt(BigDecimal sumCollectAmt) {
		this.sumCollectAmt = sumCollectAmt;
	}
	public BigDecimal getInsureSaleAmt() {
		return insureSaleAmt;
	}
	public void setInsureSaleAmt(BigDecimal insureSaleAmt) {
		this.insureSaleAmt = insureSaleAmt;
	}
	public BigDecimal getInsureClAmt() {
		return insureClAmt;
	}
	public void setInsureClAmt(BigDecimal insureClAmt) {
		this.insureClAmt = insureClAmt;
	}
	public BigDecimal getInsureCollectAmt() {
		return insureCollectAmt;
	}
	public void setInsureCollectAmt(BigDecimal insureCollectAmt) {
		this.insureCollectAmt = insureCollectAmt;
	}
	public BigDecimal getSaleAmt() {
		return saleAmt;
	}
	public void setSaleAmt(BigDecimal saleAmt) {
		this.saleAmt = saleAmt;
	}
	public BigDecimal getClAmt() {
		return clAmt;
	}
	public void setClAmt(BigDecimal clAmt) {
		this.clAmt = clAmt;
	}
	public BigDecimal getCollectAmt() {
		return collectAmt;
	}
	public void setCollectAmt(BigDecimal collectAmt) {
		this.collectAmt = collectAmt;
	}
	@Override
	public String toString() {
		return "SClReportData [comCode=" + comCode + ", comName=" + comName + ", custCode=" + custCode + ", custName="
				+ custName + ", sumSaleAmt=" + sumSaleAmt + ", sumClAmt=" + sumClAmt + ", sumCollectAmt="
				+ sumCollectAmt + ", insureSaleAmt=" + insureSaleAmt + ", insureClAmt=" + insureClAmt
				+ ", insureCollectAmt=" + insureCollectAmt + ", saleAmt=" + saleAmt + ", clAmt=" + clAmt
				+ ", collectAmt=" + collectAmt + "]";
	}
	
	
	
}
