package kr.co.panclub.model;

import java.math.BigDecimal;

public class ConStockRpt {
	private String comCode;
	private String rptType;
	private String stdYmd;
	private String stdHms;
	private String consignCustCode;
	private String consignCustName;
	private String orderCustCode;
	private String orderCustName;
	private String rcvCustCode;
	private String rcvCustName;
	private String itemId;
	private String itemNo;
	private String itemName;
	private long qty;
	private BigDecimal centerPrice;
	private BigDecimal costPrice;
	private BigDecimal saleUnitPrice;
	private BigDecimal totalPrice;  //판매가합 (판매단가 * 수량)
	private String saleType;
	private BigDecimal grCostPrice;
	private BigDecimal grSaleUnitPrice;
	
	//기간별 재고사용현황 변수들
	private long Acount;  //전체사용건
	private long type1;  //1. 주문(발주)접수
	private long type1Qty;
	private long type2;  //2. 그린주문(창고사용)
	private long type2Qty;
	private long type3; //3. 회수(팬오토창고사용)
	private long type3Qty;
	private long consignPanItem;
	private long consignOutItem;
	
	private BigDecimal totalCenterPrice; // 센터가합( 센터가 * 수량)
	private BigDecimal totalCostPrice;  // 매입단가합(매입단가 * 수량)
	
	private String makerName;
	private String className;
	private String factoryNo;
	
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getRptType() {
		return rptType;
	}
	public void setRptType(String rptType) {
		this.rptType = rptType;
	}
	public String getStdYmd() {
		return stdYmd;
	}
	public void setStdYmd(String stdYmd) {
		this.stdYmd = stdYmd;
	}
	public String getStdHms() {
		return stdHms;
	}
	public void setStdHms(String stdHms) {
		this.stdHms = stdHms;
	}
	public String getConsignCustCode() {
		return consignCustCode;
	}
	public void setConsignCustCode(String consignCustCode) {
		this.consignCustCode = consignCustCode;
	}
	public String getConsignCustName() {
		return consignCustName;
	}
	public void setConsignCustName(String consignCustName) {
		this.consignCustName = consignCustName;
	}
	public String getOrderCustCode() {
		return orderCustCode;
	}
	public void setOrderCustCode(String orderCustCode) {
		this.orderCustCode = orderCustCode;
	}
	public String getOrderCustName() {
		return orderCustName;
	}
	public void setOrderCustName(String orderCustName) {
		this.orderCustName = orderCustName;
	}
	public String getRcvCustCode() {
		return rcvCustCode;
	}
	public void setRcvCustCode(String rcvCustCode) {
		this.rcvCustCode = rcvCustCode;
	}
	public String getRcvCustName() {
		return rcvCustName;
	}
	public void setRcvCustName(String rcvCustName) {
		this.rcvCustName = rcvCustName;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public long getQty() {
		return qty;
	}
	public void setQty(long qty) {
		this.qty = qty;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public BigDecimal getCostPrice() {
		return costPrice;
	}
	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}
	public BigDecimal getSaleUnitPrice() {
		return saleUnitPrice;
	}
	public void setSaleUnitPrice(BigDecimal saleUnitPrice) {
		this.saleUnitPrice = saleUnitPrice;
	}
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getSaleType() {
		return saleType;
	}
	public void setSaleType(String saleType) {
		this.saleType = saleType;
	}
	public BigDecimal getGrCostPrice() {
		return grCostPrice;
	}
	public void setGrCostPrice(BigDecimal grCostPrice) {
		this.grCostPrice = grCostPrice;
	}
	public BigDecimal getGrSaleUnitPrice() {
		return grSaleUnitPrice;
	}
	public void setGrSaleUnitPrice(BigDecimal grSaleUnitPrice) {
		this.grSaleUnitPrice = grSaleUnitPrice;
	}
	public long getAcount() {
		return Acount;
	}
	public void setAcount(long acount) {
		Acount = acount;
	}
	public long getType1() {
		return type1;
	}
	public void setType1(long type1) {
		this.type1 = type1;
	}
	public long getType1Qty() {
		return type1Qty;
	}
	public void setType1Qty(long type1Qty) {
		this.type1Qty = type1Qty;
	}
	public long getType2() {
		return type2;
	}
	public void setType2(long type2) {
		this.type2 = type2;
	}
	public long getType2Qty() {
		return type2Qty;
	}
	public void setType2Qty(long type2Qty) {
		this.type2Qty = type2Qty;
	}
	public long getType3() {
		return type3;
	}
	public void setType3(long type3) {
		this.type3 = type3;
	}
	public long getType3Qty() {
		return type3Qty;
	}
	public void setType3Qty(long type3Qty) {
		this.type3Qty = type3Qty;
	}
	public long getConsignPanItem() {
		return consignPanItem;
	}
	public void setConsignPanItem(long consignPanItem) {
		this.consignPanItem = consignPanItem;
	}
	public long getConsignOutItem() {
		return consignOutItem;
	}
	public void setConsignOutItem(long consignOutItem) {
		this.consignOutItem = consignOutItem;
	}
	public BigDecimal getTotalCenterPrice() {
		return totalCenterPrice;
	}
	public void setTotalCenterPrice(BigDecimal totalCenterPrice) {
		this.totalCenterPrice = totalCenterPrice;
	}
	public BigDecimal getTotalCostPrice() {
		return totalCostPrice;
	}
	public void setTotalCostPrice(BigDecimal totalCostPrice) {
		this.totalCostPrice = totalCostPrice;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	@Override
	public String toString() {
		return "ConStockRpt [comCode=" + comCode + ", rptType=" + rptType + ", stdYmd=" + stdYmd + ", stdHms=" + stdHms
				+ ", consignCustCode=" + consignCustCode + ", consignCustName=" + consignCustName + ", orderCustCode="
				+ orderCustCode + ", orderCustName=" + orderCustName + ", rcvCustCode=" + rcvCustCode + ", rcvCustName="
				+ rcvCustName + ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName=" + itemName + ", qty=" + qty
				+ ", centerPrice=" + centerPrice + ", costPrice=" + costPrice + ", saleUnitPrice=" + saleUnitPrice
				+ ", totalPrice=" + totalPrice + ", saleType=" + saleType + ", grCostPrice=" + grCostPrice
				+ ", grSaleUnitPrice=" + grSaleUnitPrice + ", Acount=" + Acount + ", type1=" + type1 + ", type1Qty="
				+ type1Qty + ", type2=" + type2 + ", type2Qty=" + type2Qty + ", type3=" + type3 + ", type3Qty="
				+ type3Qty + ", consignPanItem=" + consignPanItem + ", consignOutItem=" + consignOutItem
				+ ", totalCenterPrice=" + totalCenterPrice + ", totalCostPrice=" + totalCostPrice + ", makerName="
				+ makerName + ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}
	
}
