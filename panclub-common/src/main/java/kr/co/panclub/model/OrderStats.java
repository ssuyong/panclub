package kr.co.panclub.model;

import java.math.BigDecimal;

public class OrderStats {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;          //   --회사코드	
	private String makerCode;
	private String itemNo;
	private String itemName;
	private BigDecimal centerPrice;   
	private int cQty;                   // -- 주문업체수
	private int oQty;                   // --주문건수
	private int iQty;                   // --주문수량
	private int cRank;                   // --주문업체 랭킹
	private int oRank;                   // --주문건수 랭킹 
	private int iRank;                   // --주문수량 랭킹
	
	private String itemId;
	private String className;
	private String makerName;
	private String factoryNo;
	
	public String getWorkingType() {
		return workingType;
	}
	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}
	public String getDb_resultCode() {
		return db_resultCode;
	}
	public void setDb_resultCode(String db_resultCode) {
		this.db_resultCode = db_resultCode;
	}
	public String getDb_resultMsg() {
		return db_resultMsg;
	}
	public void setDb_resultMsg(String db_resultMsg) {
		this.db_resultMsg = db_resultMsg;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
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
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public int getcQty() {
		return cQty;
	}
	public void setcQty(int cQty) {
		this.cQty = cQty;
	}
	public int getoQty() {
		return oQty;
	}
	public void setoQty(int oQty) {
		this.oQty = oQty;
	}
	public int getiQty() {
		return iQty;
	}
	public void setiQty(int iQty) {
		this.iQty = iQty;
	}
	public int getcRank() {
		return cRank;
	}
	public void setcRank(int cRank) {
		this.cRank = cRank;
	}
	public int getoRank() {
		return oRank;
	}
	public void setoRank(int oRank) {
		this.oRank = oRank;
	}
	public int getiRank() {
		return iRank;
	}
	public void setiRank(int iRank) {
		this.iRank = iRank;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	@Override
	public String toString() {
		return "OrderStats [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", makerCode=" + makerCode + ", itemNo=" + itemNo
				+ ", itemName=" + itemName + ", centerPrice=" + centerPrice + ", cQty=" + cQty + ", oQty=" + oQty
				+ ", iQty=" + iQty + ", cRank=" + cRank + ", oRank=" + oRank + ", iRank=" + iRank + ", itemId=" + itemId
				+ ", className=" + className + ", makerName=" + makerName + ", factoryNo=" + factoryNo + "]";
	}
	
}
