package kr.co.panclub.model;

import java.util.List;

public class TaxInvoice {
	private TaxInformation information;
    private TaxInvoiceType invoiceType;
    private String invoicer;
    private TaxInvoicee invoicee;
    private List<TaxItem> items;
	public TaxInformation getInformation() {
		return information;
	}
	public void setInformation(TaxInformation information) {
		this.information = information;
	}
	public TaxInvoiceType getInvoiceType() {
		return invoiceType;
	}
	public void setInvoiceType(TaxInvoiceType invoiceType) {
		this.invoiceType = invoiceType;
	}
	public String getInvoicer() {
		return invoicer;
	}
	public void setInvoicer(String invoicer) {
		this.invoicer = invoicer;
	}
	public TaxInvoicee getInvoicee() {
		return invoicee;
	}
	public void setInvoicee(TaxInvoicee invoicee) {
		this.invoicee = invoicee;
	}
	public List<TaxItem> getItems() {
		return items;
	}
	public void setItems(List<TaxItem> items) {
		this.items = items;
	}
	@Override
	public String toString() {
		return "TaxInvoice [information=" + information + ", invoicer=" + invoicer + "]";
	}
    
    
}
