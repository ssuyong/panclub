package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Estimate {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String comCode;
	private String estiNo;
	private String estiYmd;
	private int estiType;
	private String estiTypeName; 
	private String custCode;
	private String custName;
	private String custMgrName;
	private String custMgrPhone;
	private String supplyCustCode;
	private String supplyCustName;
	private String supplyMgrName;
	private String supplyMgrPhone;
	private String carNo;
	private String vinNo;            
	private String colorCode;
	private String makerCode;
	private String makerName;
	private String carType;
	private String memo1;
	private String memo2;
	private String taxType;
	private String regUserId;
	private String regUserName;
	private String created;
	private String uptUserId;
	private String uptUserName;
	private String modified;
	private int itemCnt;
	private String sumPrice;
	private BigDecimal salePrice;
	private BigDecimal taxPrice;
	//private int sumSupplyPrice;
	//private int supplyPrice;
	private BigDecimal supplyTaxPrice;
	private float dcRate;
	private int dcDspType;
	private float agencyFeeRate;
	private float marginRate;
	
	private String sumPriceKor; //  --합계금액
	
	private float expectMarginRate;  //예상마진율
	private String taxTypeName;
	
	private String placeCustArr;
	
	private int orderNum;		//	주문완료갯수
	
	private String branchCode;    //관리지점
	private String branchName;    //관리지점명
	
	private String allItemDelYN;    //품목 전체삭제여부. 수정할때 엑셀업로드 시 이어올리기 아닌 경우. 2023.07.10 hsg
	
	// 추가 행 리스트
	private ArrayList<EstimateItem> estiItemAdd;
	// 수정 행 리스트
	private ArrayList<EstimateItem> estiItemUpdate;
	// 삭제 행 리스트
	private ArrayList<EstimateItem> estiItemRemove;
	
	private String orderTotalPrice;

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

	public String getEstiNo() {
		return estiNo;
	}

	public void setEstiNo(String estiNo) {
		this.estiNo = estiNo;
	}

	public String getEstiYmd() {
		return estiYmd;
	}

	public void setEstiYmd(String estiYmd) {
		this.estiYmd = estiYmd;
	}

	public int getEstiType() {
		return estiType;
	}

	public void setEstiType(int estiType) {
		this.estiType = estiType;
	}

	public String getEstiTypeName() {
		return estiTypeName;
	}

	public void setEstiTypeName(String estiTypeName) {
		this.estiTypeName = estiTypeName;
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

	public String getCustMgrName() {
		return custMgrName;
	}

	public void setCustMgrName(String custMgrName) {
		this.custMgrName = custMgrName;
	}

	public String getCustMgrPhone() {
		return custMgrPhone;
	}

	public void setCustMgrPhone(String custMgrPhone) {
		this.custMgrPhone = custMgrPhone;
	}

	public String getSupplyCustCode() {
		return supplyCustCode;
	}

	public void setSupplyCustCode(String supplyCustCode) {
		this.supplyCustCode = supplyCustCode;
	}

	public String getSupplyCustName() {
		return supplyCustName;
	}

	public void setSupplyCustName(String supplyCustName) {
		this.supplyCustName = supplyCustName;
	}

	public String getSupplyMgrName() {
		return supplyMgrName;
	}

	public void setSupplyMgrName(String supplyMgrName) {
		this.supplyMgrName = supplyMgrName;
	}

	public String getSupplyMgrPhone() {
		return supplyMgrPhone;
	}

	public void setSupplyMgrPhone(String supplyMgrPhone) {
		this.supplyMgrPhone = supplyMgrPhone;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getVinNo() {
		return vinNo;
	}

	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}

	public String getColorCode() {
		return colorCode;
	}

	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
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

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public String getMemo2() {
		return memo2;
	}

	public void setMemo2(String memo2) {
		this.memo2 = memo2;
	}

	public String getTaxType() {
		return taxType;
	}

	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}

	public String getRegUserId() {
		return regUserId;
	}

	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}

	public String getRegUserName() {
		return regUserName;
	}

	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public String getUptUserId() {
		return uptUserId;
	}

	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}

	public String getUptUserName() {
		return uptUserName;
	}

	public void setUptUserName(String uptUserName) {
		this.uptUserName = uptUserName;
	}

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public int getItemCnt() {
		return itemCnt;
	}

	public void setItemCnt(int itemCnt) {
		this.itemCnt = itemCnt;
	}

	public String getSumPrice() {
		return sumPrice;
	}

	public void setSumPrice(String sumPrice) {
		this.sumPrice = sumPrice;
	}

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public BigDecimal getTaxPrice() {
		return taxPrice;
	}

	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}

	public BigDecimal getSupplyTaxPrice() {
		return supplyTaxPrice;
	}

	public void setSupplyTaxPrice(BigDecimal supplyTaxPrice) {
		this.supplyTaxPrice = supplyTaxPrice;
	}

	public float getDcRate() {
		return dcRate;
	}

	public void setDcRate(float dcRate) {
		this.dcRate = dcRate;
	}

	public int getDcDspType() {
		return dcDspType;
	}

	public void setDcDspType(int dcDspType) {
		this.dcDspType = dcDspType;
	}

	public float getAgencyFeeRate() {
		return agencyFeeRate;
	}

	public void setAgencyFeeRate(float agencyFeeRate) {
		this.agencyFeeRate = agencyFeeRate;
	}

	public float getMarginRate() {
		return marginRate;
	}

	public void setMarginRate(float marginRate) {
		this.marginRate = marginRate;
	}

	public String getSumPriceKor() {
		return sumPriceKor;
	}

	public void setSumPriceKor(String sumPriceKor) {
		this.sumPriceKor = sumPriceKor;
	}

	public float getExpectMarginRate() {
		return expectMarginRate;
	}

	public void setExpectMarginRate(float expectMarginRate) {
		this.expectMarginRate = expectMarginRate;
	}

	public String getTaxTypeName() {
		return taxTypeName;
	}

	public void setTaxTypeName(String taxTypeName) {
		this.taxTypeName = taxTypeName;
	}

	public String getPlaceCustArr() {
		return placeCustArr;
	}

	public void setPlaceCustArr(String placeCustArr) {
		this.placeCustArr = placeCustArr;
	}

	public int getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getAllItemDelYN() {
		return allItemDelYN;
	}

	public void setAllItemDelYN(String allItemDelYN) {
		this.allItemDelYN = allItemDelYN;
	}

	public ArrayList<EstimateItem> getEstiItemAdd() {
		return estiItemAdd;
	}

	public void setEstiItemAdd(ArrayList<EstimateItem> estiItemAdd) {
		this.estiItemAdd = estiItemAdd;
	}

	public ArrayList<EstimateItem> getEstiItemUpdate() {
		return estiItemUpdate;
	}

	public void setEstiItemUpdate(ArrayList<EstimateItem> estiItemUpdate) {
		this.estiItemUpdate = estiItemUpdate;
	}

	public ArrayList<EstimateItem> getEstiItemRemove() {
		return estiItemRemove;
	}

	public void setEstiItemRemove(ArrayList<EstimateItem> estiItemRemove) {
		this.estiItemRemove = estiItemRemove;
	}

	public String getOrderTotalPrice() {
		return orderTotalPrice;
	}

	public void setOrderTotalPrice(String orderTotalPrice) {
		this.orderTotalPrice = orderTotalPrice;
	}

	@Override
	public String toString() {
		return "Estimate [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", estiNo=" + estiNo + ", estiYmd=" + estiYmd + ", estiType="
				+ estiType + ", estiTypeName=" + estiTypeName + ", custCode=" + custCode + ", custName=" + custName
				+ ", custMgrName=" + custMgrName + ", custMgrPhone=" + custMgrPhone + ", supplyCustCode="
				+ supplyCustCode + ", supplyCustName=" + supplyCustName + ", supplyMgrName=" + supplyMgrName
				+ ", supplyMgrPhone=" + supplyMgrPhone + ", carNo=" + carNo + ", vinNo=" + vinNo + ", colorCode="
				+ colorCode + ", makerCode=" + makerCode + ", makerName=" + makerName + ", carType=" + carType
				+ ", memo1=" + memo1 + ", memo2=" + memo2 + ", taxType=" + taxType + ", regUserId=" + regUserId
				+ ", regUserName=" + regUserName + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", uptUserName=" + uptUserName + ", modified=" + modified + ", itemCnt=" + itemCnt + ", sumPrice="
				+ sumPrice + ", salePrice=" + salePrice + ", taxPrice=" + taxPrice + ", supplyTaxPrice="
				+ supplyTaxPrice + ", dcRate=" + dcRate + ", dcDspType=" + dcDspType + ", agencyFeeRate="
				+ agencyFeeRate + ", marginRate=" + marginRate + ", sumPriceKor=" + sumPriceKor + ", expectMarginRate="
				+ expectMarginRate + ", taxTypeName=" + taxTypeName + ", placeCustArr=" + placeCustArr + ", orderNum="
				+ orderNum + ", branchCode=" + branchCode + ", branchName=" + branchName + ", allItemDelYN="
				+ allItemDelYN + ", estiItemAdd=" + estiItemAdd + ", estiItemUpdate=" + estiItemUpdate
				+ ", estiItemRemove=" + estiItemRemove + ", orderTotalPrice=" + orderTotalPrice + "]";
	}
	
	
	
	
	
	
}
