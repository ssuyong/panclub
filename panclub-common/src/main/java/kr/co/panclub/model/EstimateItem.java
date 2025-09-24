package kr.co.panclub.model;

import java.math.BigDecimal;

public class EstimateItem {

	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String idx;
	private String comCode;
	private String estiNo;
	private String estiSeq;
	private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private String regUserId;	
	private String regYmd;
	private String regHms;
	private String uptUserId;
	private String uptYmd;
	private String uptHms;
	private int cnt;
	private BigDecimal salePrice;
	private String memo;
	private String placeCustCode;
	private String placeCustName;
	private BigDecimal placeUnitPrice;
	private BigDecimal supplyUnitPrice;
	private BigDecimal supplyPrice;
	private BigDecimal importPrice;
	
	private BigDecimal unitPrice;
	private BigDecimal sumPrice;
	
	private int dspNo;  //노출순서
	
	private String orderNo;		// 장윤상추가 주문번호,주문순번
	private String orderSeq;
	
	private BigDecimal centerPrice;

	private String dcExceptYN;   //할인제외 2023.05.13 hsg 

	//2023.08.24 hsg
	private String custCode;
	private String custName;
	private String estiYmd;
	private String makerCode;
	private String makerName;
	private String memo1;
	
	private int ceilUnit;    //올림단위. 2023.08.29 hsg
	
	private BigDecimal taxPrice;
	
	private String rcvlogisCode; // 수령물류센터 2024.03.04 supi
	
	//삭제관련 복원시 2024.06.14 hsg. 
	private String deleted;
	private String delUserId;
	private String delUserName;
	private String regUserName;
	private String srchDateType;  //기준일
	private String restoreYN;    //복원여부
	private String carNo;
	private String branchCode;
	
	private String className; // 20240724 supi 구분, 공장번호
	private String factoryNo;
	
	private String orderTotalPrice;

	private String specialNote; //특이사항. 2024.10.14 hsg

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

	public String getRegUserId() {
		return regUserId;
	}

	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}

	public String getRegYmd() {
		return regYmd;
	}

	public void setRegYmd(String regYmd) {
		this.regYmd = regYmd;
	}

	public String getRegHms() {
		return regHms;
	}

	public void setRegHms(String regHms) {
		this.regHms = regHms;
	}

	public String getUptUserId() {
		return uptUserId;
	}

	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}

	public String getUptYmd() {
		return uptYmd;
	}

	public void setUptYmd(String uptYmd) {
		this.uptYmd = uptYmd;
	}

	public String getUptHms() {
		return uptHms;
	}

	public void setUptHms(String uptHms) {
		this.uptHms = uptHms;
	}

	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
	}

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getPlaceCustCode() {
		return placeCustCode;
	}

	public void setPlaceCustCode(String placeCustCode) {
		this.placeCustCode = placeCustCode;
	}

	public String getPlaceCustName() {
		return placeCustName;
	}

	public void setPlaceCustName(String placeCustName) {
		this.placeCustName = placeCustName;
	}

	public BigDecimal getPlaceUnitPrice() {
		return placeUnitPrice;
	}

	public void setPlaceUnitPrice(BigDecimal placeUnitPrice) {
		this.placeUnitPrice = placeUnitPrice;
	}

	public BigDecimal getSupplyUnitPrice() {
		return supplyUnitPrice;
	}

	public void setSupplyUnitPrice(BigDecimal supplyUnitPrice) {
		this.supplyUnitPrice = supplyUnitPrice;
	}

	public BigDecimal getSupplyPrice() {
		return supplyPrice;
	}

	public void setSupplyPrice(BigDecimal supplyPrice) {
		this.supplyPrice = supplyPrice;
	}

	public BigDecimal getImportPrice() {
		return importPrice;
	}

	public void setImportPrice(BigDecimal importPrice) {
		this.importPrice = importPrice;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public BigDecimal getSumPrice() {
		return sumPrice;
	}

	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
	}

	public int getDspNo() {
		return dspNo;
	}

	public void setDspNo(int dspNo) {
		this.dspNo = dspNo;
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

	public BigDecimal getCenterPrice() {
		return centerPrice;
	}

	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}

	public String getDcExceptYN() {
		return dcExceptYN;
	}

	public void setDcExceptYN(String dcExceptYN) {
		this.dcExceptYN = dcExceptYN;
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

	public String getEstiYmd() {
		return estiYmd;
	}

	public void setEstiYmd(String estiYmd) {
		this.estiYmd = estiYmd;
	}

	public String getMakerCode() {
		return makerCode;
	}

	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}

	public String getMakerName() {
		return makerName;
	}

	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public int getCeilUnit() {
		return ceilUnit;
	}

	public void setCeilUnit(int ceilUnit) {
		this.ceilUnit = ceilUnit;
	}

	public BigDecimal getTaxPrice() {
		return taxPrice;
	}

	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}

	public String getRcvlogisCode() {
		return rcvlogisCode;
	}

	public void setRcvlogisCode(String rcvlogisCode) {
		this.rcvlogisCode = rcvlogisCode;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getDelUserId() {
		return delUserId;
	}

	public void setDelUserId(String delUserId) {
		this.delUserId = delUserId;
	}

	public String getDelUserName() {
		return delUserName;
	}

	public void setDelUserName(String delUserName) {
		this.delUserName = delUserName;
	}

	public String getRegUserName() {
		return regUserName;
	}

	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}

	public String getSrchDateType() {
		return srchDateType;
	}

	public void setSrchDateType(String srchDateType) {
		this.srchDateType = srchDateType;
	}

	public String getRestoreYN() {
		return restoreYN;
	}

	public void setRestoreYN(String restoreYN) {
		this.restoreYN = restoreYN;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
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

	public String getOrderTotalPrice() {
		return orderTotalPrice;
	}

	public void setOrderTotalPrice(String orderTotalPrice) {
		this.orderTotalPrice = orderTotalPrice;
	}

	public String getSpecialNote() {
		return specialNote;
	}

	public void setSpecialNote(String specialNote) {
		this.specialNote = specialNote;
	}

	@Override
	public String toString() {
		return "EstimateItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", comCode=" + comCode + ", estiNo=" + estiNo + ", estiSeq=" + estiSeq
				+ ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", cnt=" + cnt + ", salePrice=" + salePrice + ", memo="
				+ memo + ", placeCustCode=" + placeCustCode + ", placeCustName=" + placeCustName + ", placeUnitPrice="
				+ placeUnitPrice + ", supplyUnitPrice=" + supplyUnitPrice + ", supplyPrice=" + supplyPrice
				+ ", importPrice=" + importPrice + ", unitPrice=" + unitPrice + ", sumPrice=" + sumPrice + ", dspNo="
				+ dspNo + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", centerPrice=" + centerPrice
				+ ", dcExceptYN=" + dcExceptYN + ", custCode=" + custCode + ", custName=" + custName + ", estiYmd="
				+ estiYmd + ", makerCode=" + makerCode + ", makerName=" + makerName + ", memo1=" + memo1 + ", ceilUnit="
				+ ceilUnit + ", taxPrice=" + taxPrice + ", rcvlogisCode=" + rcvlogisCode + ", deleted=" + deleted
				+ ", delUserId=" + delUserId + ", delUserName=" + delUserName + ", regUserName=" + regUserName
				+ ", srchDateType=" + srchDateType + ", restoreYN=" + restoreYN + ", carNo=" + carNo + ", branchCode="
				+ branchCode + ", className=" + className + ", factoryNo=" + factoryNo + ", orderTotalPrice="
				+ orderTotalPrice + ", specialNote=" + specialNote + "]";
	}
	

	
	
	
}
