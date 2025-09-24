package kr.co.panclub.model;

import java.math.BigDecimal;

public class SCustReportData {
	private String custCode; //거래처코드
	private String custName; //거래처명
	private String comCode; //업체코드
	private String comName; //업체명
	private BigDecimal rlPrice; //출고 금액
	private BigDecimal whPrice;  // 입고 금액
	private BigDecimal orderPrice; //주문 금액
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
	public BigDecimal getRlPrice() {
		return rlPrice;
	}
	public void setRlPrice(BigDecimal rlPrice) {
		this.rlPrice = rlPrice;
	}
	public BigDecimal getWhPrice() {
		return whPrice;
	}
	public void setWhPrice(BigDecimal whPrice) {
		this.whPrice = whPrice;
	}
	public BigDecimal getOrderPrice() {
		return orderPrice;
	}
	public void setOrderPrice(BigDecimal orderPrice) {
		this.orderPrice = orderPrice;
	}
	@Override
	public String toString() {
		return "CustReport [custCode=" + custCode + ", custName=" + custName + ", comCode=" + comCode + ", comName="
				+ comName + ", rlPrice=" + rlPrice + ", whPrice=" + whPrice + ", orderPrice=" + orderPrice + "]";
	} 
	
	
	
}
