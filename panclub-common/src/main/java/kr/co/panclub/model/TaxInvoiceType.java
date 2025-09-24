package kr.co.panclub.model;

public class TaxInvoiceType {
	private String transactionType;
	private String purposeType;
	private String taxType;
	private String typeCode;
	public String getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	public String getPurposeType() {
		return purposeType;
	}
	public void setPurposeType(String purposeType) {
		this.purposeType = purposeType;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public String getTypeCode() {
		return typeCode;
	}
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}
	@Override
	public String toString() {
		return "TaxInvoiceType [transactionType=" + transactionType + ", purposeType=" + purposeType + ", taxType="
				+ taxType + ", typeCode=" + typeCode + "]";
	}
	
	
}
