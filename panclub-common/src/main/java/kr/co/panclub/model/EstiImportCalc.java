package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class EstiImportCalc {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String idx;
	private String comCode;
	private String estiNo;
	private String estiSeq;
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
	private ArrayList<EstiImportCalc> estiImportAdd;
	// 수정 행 리스트
	private ArrayList<EstiImportCalc> estiImportUpdate;
	// 삭제 행 리스트
	private ArrayList<EstiImportCalc> estiImportRemove;
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
	public String getEstiNo() {
		return estiNo;
	}
	public void setEstiNo(String estiNo) {
		this.estiNo = estiNo;
	}
	public String getEstiSeq() {
		return estiSeq;
	}
	public void setEstiSeq(String estiSeq) {
		this.estiSeq = estiSeq;
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
	public ArrayList<EstiImportCalc> getEstiImportAdd() {
		return estiImportAdd;
	}
	public void setEstiImportAdd(ArrayList<EstiImportCalc> estiImportAdd) {
		this.estiImportAdd = estiImportAdd;
	}
	public ArrayList<EstiImportCalc> getEstiImportUpdate() {
		return estiImportUpdate;
	}
	public void setEstiImportUpdate(ArrayList<EstiImportCalc> estiImportUpdate) {
		this.estiImportUpdate = estiImportUpdate;
	}
	public ArrayList<EstiImportCalc> getEstiImportRemove() {
		return estiImportRemove;
	}
	public void setEstiImportRemove(ArrayList<EstiImportCalc> estiImportRemove) {
		this.estiImportRemove = estiImportRemove;
	}
	@Override
	public String toString() {
		return "EstiImportCalc [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", comCode=" + comCode + ", estiNo=" + estiNo + ", estiSeq=" + estiSeq
				+ ", euroBuy=" + euroBuy + ", euroSell=" + euroSell + ", dollarBuy=" + dollarBuy + ", dollarSell="
				+ dollarSell + ", cargoGroupCode=" + cargoGroupCode + ", cargoGroupName=" + cargoGroupName
				+ ", dekoEuroPrice=" + dekoEuroPrice + ", dekoEuroKrwPrice=" + dekoEuroKrwPrice + ", dekoEuro="
				+ dekoEuro + ", eapsEuroPrice=" + eapsEuroPrice + ", eapsEuroKrwPrice=" + eapsEuroKrwPrice
				+ ", eapsEuro=" + eapsEuro + ", eapsDollarPrice=" + eapsDollarPrice + ", eapsDollarKrwPrice="
				+ eapsDollarKrwPrice + ", eapsDollar=" + eapsDollar + ", regUserId=" + regUserId + ", created="
				+ created + ", uptUserId=" + uptUserId + ", modified=" + modified + ", itemId=" + itemId + ", itemNo="
				+ itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", salePrice=" + salePrice
				+ ", estiImportAdd=" + estiImportAdd + ", estiImportUpdate=" + estiImportUpdate + ", estiImportRemove="
				+ estiImportRemove + "]";
	}

	
	
	
	
	
}
