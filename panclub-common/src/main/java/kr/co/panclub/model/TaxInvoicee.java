package kr.co.panclub.model;

public class TaxInvoicee {
	private String companyNumber;
	private String taxNumber;
	private String companyName;
	private String companyAddress;
	private String ceoName;
	private String bizType;
	private String bizClassification;
	private String partyTypeCode;
	private TaxContact primaryContact;
	private TaxContact secondaryContact;
	public String getCompanyNumber() {
		return companyNumber;
	}
	public void setCompanyNumber(String companyNumber) {
		this.companyNumber = companyNumber;
	}
	public String getTaxNumber() {
		return taxNumber;
	}
	public void setTaxNumber(String taxNumber) {
		this.taxNumber = taxNumber;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public String getCeoName() {
		return ceoName;
	}
	public void setCeoName(String ceoName) {
		this.ceoName = ceoName;
	}
	public String getBizType() {
		return bizType;
	}
	public void setBizType(String bizType) {
		this.bizType = bizType;
	}
	public String getBizClassification() {
		return bizClassification;
	}
	public void setBizClassification(String bizClassification) {
		this.bizClassification = bizClassification;
	}
	public String getPartyTypeCode() {
		return partyTypeCode;
	}
	public void setPartyTypeCode(String partyTypeCode) {
		this.partyTypeCode = partyTypeCode;
	}
	public TaxContact getPrimaryContact() {
		return primaryContact;
	}
	public void setPrimaryContact(TaxContact primaryContact) {
		this.primaryContact = primaryContact;
	}
	public TaxContact getSecondaryContact() {
		return secondaryContact;
	}
	public void setSecondaryContact(TaxContact secondaryContact) {
		this.secondaryContact = secondaryContact;
	}
	@Override
	public String toString() {
		return "TaxInvoicee [companyNumber=" + companyNumber + ", taxNumber=" + taxNumber + ", companyName="
				+ companyName + ", companyAddress=" + companyAddress + ", ceoName=" + ceoName + ", bizType=" + bizType
				+ ", bizClassification=" + bizClassification + ", partyTypeCode=" + partyTypeCode + ", primaryContact="
				+ primaryContact + ", secondaryContact=" + secondaryContact + "]";
	}
	
	
}
