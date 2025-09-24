package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class OrderImportCalc {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String idx;
	private String comCode;
	private String orderNo;
	private String orderSeq;
	private String euroBuy;
	private String euroSell;
	private String dollarBuy;
	private String dollarSell;
	private String cargoGroupCode;
	private String cargoGroupName;
	private String dekoEuroPrice;
	private String dekoEuroKrwPrice;
	private String dekoEuro;
	private String eapsEuroPrice;
	private String eapsEuroKrwPrice;
	private String eapsEuro;
	private String eapsDollarPrice;
	private String eapsDollarKrwPrice;
	private String eapsDollar;

	private String regUserId;
	private Date created;
	private String uptUserId;
	private Date modified;
	
	private long itemId; 
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private String salePrice;
	
	// 추가 행 리스트
	private ArrayList<OrderImportCalc> orderImportAdd;
	// 수정 행 리스트
	private ArrayList<OrderImportCalc> orderImportUpdate;
	// 삭제 행 리스트
	private ArrayList<OrderImportCalc> orderImportRemove;
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
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getOrderSeq() {
		return orderSeq;
	}
	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
	}
	public String getEuroBuy() {
		return euroBuy;
	}
	public void setEuroBuy(String euroBuy) {
		this.euroBuy = euroBuy;
	}
	public String getEuroSell() {
		return euroSell;
	}
	public void setEuroSell(String euroSell) {
		this.euroSell = euroSell;
	}
	public String getDollarBuy() {
		return dollarBuy;
	}
	public void setDollarBuy(String dollarBuy) {
		this.dollarBuy = dollarBuy;
	}
	public String getDollarSell() {
		return dollarSell;
	}
	public void setDollarSell(String dollarSell) {
		this.dollarSell = dollarSell;
	}
	public String getCargoGroupCode() {
		return cargoGroupCode;
	}
	public void setCargoGroupCode(String cargoGroupCode) {
		this.cargoGroupCode = cargoGroupCode;
	}
	public String getCargoGroupName() {
		return cargoGroupName;
	}
	public void setCargoGroupName(String cargoGroupName) {
		this.cargoGroupName = cargoGroupName;
	}
	public String getDekoEuroPrice() {
		return dekoEuroPrice;
	}
	public void setDekoEuroPrice(String dekoEuroPrice) {
		this.dekoEuroPrice = dekoEuroPrice;
	}
	public String getDekoEuroKrwPrice() {
		return dekoEuroKrwPrice;
	}
	public void setDekoEuroKrwPrice(String dekoEuroKrwPrice) {
		this.dekoEuroKrwPrice = dekoEuroKrwPrice;
	}
	public String getDekoEuro() {
		return dekoEuro;
	}
	public void setDekoEuro(String dekoEuro) {
		this.dekoEuro = dekoEuro;
	}
	public String getEapsEuroPrice() {
		return eapsEuroPrice;
	}
	public void setEapsEuroPrice(String eapsEuroPrice) {
		this.eapsEuroPrice = eapsEuroPrice;
	}
	public String getEapsEuroKrwPrice() {
		return eapsEuroKrwPrice;
	}
	public void setEapsEuroKrwPrice(String eapsEuroKrwPrice) {
		this.eapsEuroKrwPrice = eapsEuroKrwPrice;
	}
	public String getEapsEuro() {
		return eapsEuro;
	}
	public void setEapsEuro(String eapsEuro) {
		this.eapsEuro = eapsEuro;
	}
	public String getEapsDollarPrice() {
		return eapsDollarPrice;
	}
	public void setEapsDollarPrice(String eapsDollarPrice) {
		this.eapsDollarPrice = eapsDollarPrice;
	}
	public String getEapsDollarKrwPrice() {
		return eapsDollarKrwPrice;
	}
	public void setEapsDollarKrwPrice(String eapsDollarKrwPrice) {
		this.eapsDollarKrwPrice = eapsDollarKrwPrice;
	}
	public String getEapsDollar() {
		return eapsDollar;
	}
	public void setEapsDollar(String eapsDollar) {
		this.eapsDollar = eapsDollar;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
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
	public String getItemNameEn() {
		return itemNameEn;
	}
	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
	}
	public String getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(String salePrice) {
		this.salePrice = salePrice;
	}
	public ArrayList<OrderImportCalc> getOrderImportAdd() {
		return orderImportAdd;
	}
	public void setOrderImportAdd(ArrayList<OrderImportCalc> orderImportAdd) {
		this.orderImportAdd = orderImportAdd;
	}
	public ArrayList<OrderImportCalc> getOrderImportUpdate() {
		return orderImportUpdate;
	}
	public void setOrderImportUpdate(ArrayList<OrderImportCalc> orderImportUpdate) {
		this.orderImportUpdate = orderImportUpdate;
	}
	public ArrayList<OrderImportCalc> getOrderImportRemove() {
		return orderImportRemove;
	}
	public void setOrderImportRemove(ArrayList<OrderImportCalc> orderImportRemove) {
		this.orderImportRemove = orderImportRemove;
	}
	@Override
	public String toString() {
		return "OrderImportCalc [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", comCode=" + comCode + ", orderNo=" + orderNo + ", orderSeq="
				+ orderSeq + ", euroBuy=" + euroBuy + ", euroSell=" + euroSell + ", dollarBuy=" + dollarBuy
				+ ", dollarSell=" + dollarSell + ", cargoGroupCode=" + cargoGroupCode + ", cargoGroupName="
				+ cargoGroupName + ", dekoEuroPrice=" + dekoEuroPrice + ", dekoEuroKrwPrice=" + dekoEuroKrwPrice
				+ ", dekoEuro=" + dekoEuro + ", eapsEuroPrice=" + eapsEuroPrice + ", eapsEuroKrwPrice="
				+ eapsEuroKrwPrice + ", eapsEuro=" + eapsEuro + ", eapsDollarPrice=" + eapsDollarPrice
				+ ", eapsDollarKrwPrice=" + eapsDollarKrwPrice + ", eapsDollar=" + eapsDollar + ", regUserId="
				+ regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified=" + modified
				+ ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn
				+ ", salePrice=" + salePrice + ", orderImportAdd=" + orderImportAdd + ", orderImportUpdate="
				+ orderImportUpdate + ", orderImportRemove=" + orderImportRemove + "]";
	}

	
	
	
	
}
