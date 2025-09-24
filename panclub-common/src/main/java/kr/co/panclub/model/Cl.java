package kr.co.panclub.model;

import java.math.BigDecimal;

public class Cl {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;  		//   --회사코드
	private String clNo;  		// --발주요청번호
	private String orderGroupId;  		// --주문그룹ID
	private String clType;  		// --청구구분: 보험/일반
	private String memo;  		//  --메모
	private String regUserId;  		// -- 등록자
	private String regYmd;  		// 
	private String regHms;  		// 
	private String uptUserId;  		// --수정자
	private String uptYmd;  		// 
	private String uptHms;  		// 
	
	private String reqArr;
	
	private String carNo;               //차번
	private String custName;               //납품처
	private String billPubli;               //청구구분
	private String insure1Name;               //보험사
	private String insure1AcceptNo;               //접수번호
	private float insure1AcciRate;               //과실
	private String insure2Name;               //보험사
	private String insure2AcceptNo;               //접수번호
	private float insure2AcciRate;               //과실
	private BigDecimal insure1CollAmt;               //보험사1수금액
	private BigDecimal insure2CollAmt;               //보험사2수금액
	private BigDecimal riAmt;               //반입
	private BigDecimal extraAmt;               //부대비용
	private BigDecimal primeAmt;                // 원가
	private BigDecimal saleAmt;               //판매가
	private BigDecimal clAmt;             //청구금액
	private BigDecimal collectAmt;          //수금액
	private BigDecimal capitalAmt;     //캐피탈수금액
	
	
	//주문정보 display 용도. hsg 2023.04.13
	private String orderTypeName;
	private String vinNo;
	private String makerCode;
	private String carType;
	private String orderYmd;
	private String resUserName;
	
	private String clGroupId;       //청구그룹ID.hsg. 2023.04.24

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

	public String getClNo() {
		return clNo;
	}

	public void setClNo(String clNo) {
		this.clNo = clNo;
	}

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}

	public String getClType() {
		return clType;
	}

	public void setClType(String clType) {
		this.clType = clType;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
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

	public String getReqArr() {
		return reqArr;
	}

	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getBillPubli() {
		return billPubli;
	}

	public void setBillPubli(String billPubli) {
		this.billPubli = billPubli;
	}

	public String getInsure1Name() {
		return insure1Name;
	}

	public void setInsure1Name(String insure1Name) {
		this.insure1Name = insure1Name;
	}

	public String getInsure1AcceptNo() {
		return insure1AcceptNo;
	}

	public void setInsure1AcceptNo(String insure1AcceptNo) {
		this.insure1AcceptNo = insure1AcceptNo;
	}

	public float getInsure1AcciRate() {
		return insure1AcciRate;
	}

	public void setInsure1AcciRate(float insure1AcciRate) {
		this.insure1AcciRate = insure1AcciRate;
	}

	public String getInsure2Name() {
		return insure2Name;
	}

	public void setInsure2Name(String insure2Name) {
		this.insure2Name = insure2Name;
	}

	public String getInsure2AcceptNo() {
		return insure2AcceptNo;
	}

	public void setInsure2AcceptNo(String insure2AcceptNo) {
		this.insure2AcceptNo = insure2AcceptNo;
	}

	public float getInsure2AcciRate() {
		return insure2AcciRate;
	}

	public void setInsure2AcciRate(float insure2AcciRate) {
		this.insure2AcciRate = insure2AcciRate;
	}

	public BigDecimal getInsure1CollAmt() {
		return insure1CollAmt;
	}

	public void setInsure1CollAmt(BigDecimal insure1CollAmt) {
		this.insure1CollAmt = insure1CollAmt;
	}

	public BigDecimal getInsure2CollAmt() {
		return insure2CollAmt;
	}

	public void setInsure2CollAmt(BigDecimal insure2CollAmt) {
		this.insure2CollAmt = insure2CollAmt;
	}

	public BigDecimal getRiAmt() {
		return riAmt;
	}

	public void setRiAmt(BigDecimal riAmt) {
		this.riAmt = riAmt;
	}

	public BigDecimal getExtraAmt() {
		return extraAmt;
	}

	public void setExtraAmt(BigDecimal extraAmt) {
		this.extraAmt = extraAmt;
	}

	public BigDecimal getPrimeAmt() {
		return primeAmt;
	}

	public void setPrimeAmt(BigDecimal primeAmt) {
		this.primeAmt = primeAmt;
	}

	public BigDecimal getSaleAmt() {
		return saleAmt;
	}

	public void setSaleAmt(BigDecimal saleAmt) {
		this.saleAmt = saleAmt;
	}

	public BigDecimal getClAmt() {
		return clAmt;
	}

	public void setClAmt(BigDecimal clAmt) {
		this.clAmt = clAmt;
	}

	public BigDecimal getCollectAmt() {
		return collectAmt;
	}

	public void setCollectAmt(BigDecimal collectAmt) {
		this.collectAmt = collectAmt;
	}

	public BigDecimal getCapitalAmt() {
		return capitalAmt;
	}

	public void setCapitalAmt(BigDecimal capitalAmt) {
		this.capitalAmt = capitalAmt;
	}

	public String getOrderTypeName() {
		return orderTypeName;
	}

	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
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

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getOrderYmd() {
		return orderYmd;
	}

	public void setOrderYmd(String orderYmd) {
		this.orderYmd = orderYmd;
	}

	public String getResUserName() {
		return resUserName;
	}

	public void setResUserName(String resUserName) {
		this.resUserName = resUserName;
	}

	public String getClGroupId() {
		return clGroupId;
	}

	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}

	@Override
	public String toString() {
		return "Cl [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg
				+ ", comCode=" + comCode + ", clNo=" + clNo + ", orderGroupId=" + orderGroupId + ", clType=" + clType
				+ ", memo=" + memo + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms
				+ ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", reqArr=" + reqArr
				+ ", carNo=" + carNo + ", custName=" + custName + ", billPubli=" + billPubli + ", insure1Name="
				+ insure1Name + ", insure1AcceptNo=" + insure1AcceptNo + ", insure1AcciRate=" + insure1AcciRate
				+ ", insure2Name=" + insure2Name + ", insure2AcceptNo=" + insure2AcceptNo + ", insure2AcciRate="
				+ insure2AcciRate + ", insure1CollAmt=" + insure1CollAmt + ", insure2CollAmt=" + insure2CollAmt
				+ ", riAmt=" + riAmt + ", extraAmt=" + extraAmt + ", primeAmt=" + primeAmt + ", saleAmt=" + saleAmt
				+ ", clAmt=" + clAmt + ", collectAmt=" + collectAmt + ", capitalAmt=" + capitalAmt + ", orderTypeName="
				+ orderTypeName + ", vinNo=" + vinNo + ", makerCode=" + makerCode + ", carType=" + carType
				+ ", orderYmd=" + orderYmd + ", resUserName=" + resUserName + ", clGroupId=" + clGroupId + "]";
	}
	

	


	
	
}
