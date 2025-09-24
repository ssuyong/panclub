package kr.co.panclub.model;

import java.math.BigDecimal;

public class NoCl {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String orderGroupId;
	private String orderNo;
	private String orderYmd;
	private int orderType;
	private String custCode;
	private String custName;
	private String supplyCustCode;
	private String supplyCustName;
	private String carNo;
	private String vinNo;
	private String makerCode;
	private String makerName;
	private String carType;
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
	private BigDecimal sumSupplyPrice;
	private BigDecimal supplyPrice;
	private BigDecimal supplyTaxPrice;

	private String claimType;  //청구구분
	private String claimYN;    //청구여부
	private String collectYN;  //수금여부
	
	private String custMgrName;//2023.03.16 bokyung
	private String custMgrPhone;;//2023.03.16 bokyung
	private String supplyMgrName;;//2023.03.16 bokyung
	private String supplyMgrPhone;//2023.03.16 bokyung
	private String colorCode;//2023.03.16 bokyung
	private String memo1;//2023.03.16 bokyung
	private String memo2;//2023.03.16 bokyung
	
	private int orderCnt; // 20230427 주문개수 bk
	private int rlCnt; // 20230427 출고개수 bk
	private int clReqCnt; // 20230427 청구요청 개수 bk
	private int clCnt; // 20230427 청구개수 bk
	private String clReqStatus; // 20230427 청구요청상태 bk
	private String clStatus; // 20230427 청구상태 bk
	private String dpMoney; // 20230427 입금액 bk
	private String clType ; // 20230427 일반/보험  bk
	private String confYN ; // 20230504 기결여부  bk
	
	private String branchCode;    //관리지점
	private String branchName;    //관리지점명
	private String rlYmd;    //2023.08.09 출고일 bk
	
	private String insure1Code;    //20231226 yoonsang 보험사1
	private String insure2Code;    //20231226 yoonsang 보험사1
	private String insure1Name;    //20231226 yoonsang 보험사1
	private String insure2Name;    //20231226 yoonsang 보험사2
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
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getOrderYmd() {
		return orderYmd;
	}
	public void setOrderYmd(String orderYmd) {
		this.orderYmd = orderYmd;
	}
	public int getOrderType() {
		return orderType;
	}
	public void setOrderType(int orderType) {
		this.orderType = orderType;
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
	public BigDecimal getSumSupplyPrice() {
		return sumSupplyPrice;
	}
	public void setSumSupplyPrice(BigDecimal sumSupplyPrice) {
		this.sumSupplyPrice = sumSupplyPrice;
	}
	public BigDecimal getSupplyPrice() {
		return supplyPrice;
	}
	public void setSupplyPrice(BigDecimal supplyPrice) {
		this.supplyPrice = supplyPrice;
	}
	public BigDecimal getSupplyTaxPrice() {
		return supplyTaxPrice;
	}
	public void setSupplyTaxPrice(BigDecimal supplyTaxPrice) {
		this.supplyTaxPrice = supplyTaxPrice;
	}
	public String getClaimType() {
		return claimType;
	}
	public void setClaimType(String claimType) {
		this.claimType = claimType;
	}
	public String getClaimYN() {
		return claimYN;
	}
	public void setClaimYN(String claimYN) {
		this.claimYN = claimYN;
	}
	public String getCollectYN() {
		return collectYN;
	}
	public void setCollectYN(String collectYN) {
		this.collectYN = collectYN;
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
	public String getColorCode() {
		return colorCode;
	}
	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
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
	public int getOrderCnt() {
		return orderCnt;
	}
	public void setOrderCnt(int orderCnt) {
		this.orderCnt = orderCnt;
	}
	public int getRlCnt() {
		return rlCnt;
	}
	public void setRlCnt(int rlCnt) {
		this.rlCnt = rlCnt;
	}
	public int getClReqCnt() {
		return clReqCnt;
	}
	public void setClReqCnt(int clReqCnt) {
		this.clReqCnt = clReqCnt;
	}
	public int getClCnt() {
		return clCnt;
	}
	public void setClCnt(int clCnt) {
		this.clCnt = clCnt;
	}
	public String getClReqStatus() {
		return clReqStatus;
	}
	public void setClReqStatus(String clReqStatus) {
		this.clReqStatus = clReqStatus;
	}
	public String getClStatus() {
		return clStatus;
	}
	public void setClStatus(String clStatus) {
		this.clStatus = clStatus;
	}
	public String getDpMoney() {
		return dpMoney;
	}
	public void setDpMoney(String dpMoney) {
		this.dpMoney = dpMoney;
	}
	public String getClType() {
		return clType;
	}
	public void setClType(String clType) {
		this.clType = clType;
	}
	public String getConfYN() {
		return confYN;
	}
	public void setConfYN(String confYN) {
		this.confYN = confYN;
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
	public String getRlYmd() {
		return rlYmd;
	}
	public void setRlYmd(String rlYmd) {
		this.rlYmd = rlYmd;
	}
	public String getInsure1Code() {
		return insure1Code;
	}
	public void setInsure1Code(String insure1Code) {
		this.insure1Code = insure1Code;
	}
	public String getInsure2Code() {
		return insure2Code;
	}
	public void setInsure2Code(String insure2Code) {
		this.insure2Code = insure2Code;
	}
	public String getInsure1Name() {
		return insure1Name;
	}
	public void setInsure1Name(String insure1Name) {
		this.insure1Name = insure1Name;
	}
	public String getInsure2Name() {
		return insure2Name;
	}
	public void setInsure2Name(String insure2Name) {
		this.insure2Name = insure2Name;
	}
	@Override
	public String toString() {
		return "NoCl [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", orderGroupId=" + orderGroupId + ", orderNo=" + orderNo
				+ ", orderYmd=" + orderYmd + ", orderType=" + orderType + ", custCode=" + custCode + ", custName="
				+ custName + ", supplyCustCode=" + supplyCustCode + ", supplyCustName=" + supplyCustName + ", carNo="
				+ carNo + ", vinNo=" + vinNo + ", makerCode=" + makerCode + ", makerName=" + makerName + ", carType="
				+ carType + ", regUserId=" + regUserId + ", regUserName=" + regUserName + ", created=" + created
				+ ", uptUserId=" + uptUserId + ", uptUserName=" + uptUserName + ", modified=" + modified + ", itemCnt="
				+ itemCnt + ", sumPrice=" + sumPrice + ", salePrice=" + salePrice + ", taxPrice=" + taxPrice
				+ ", sumSupplyPrice=" + sumSupplyPrice + ", supplyPrice=" + supplyPrice + ", supplyTaxPrice="
				+ supplyTaxPrice + ", claimType=" + claimType + ", claimYN=" + claimYN + ", collectYN=" + collectYN
				+ ", custMgrName=" + custMgrName + ", custMgrPhone=" + custMgrPhone + ", supplyMgrName=" + supplyMgrName
				+ ", supplyMgrPhone=" + supplyMgrPhone + ", colorCode=" + colorCode + ", memo1=" + memo1 + ", memo2="
				+ memo2 + ", orderCnt=" + orderCnt + ", rlCnt=" + rlCnt + ", clReqCnt=" + clReqCnt + ", clCnt=" + clCnt
				+ ", clReqStatus=" + clReqStatus + ", clStatus=" + clStatus + ", dpMoney=" + dpMoney + ", clType="
				+ clType + ", confYN=" + confYN + ", branchCode=" + branchCode + ", branchName=" + branchName
				+ ", rlYmd=" + rlYmd + ", insure1Code=" + insure1Code + ", insure2Code=" + insure2Code
				+ ", insure1Name=" + insure1Name + ", insure2Name=" + insure2Name + "]";
	}

	
	
}
