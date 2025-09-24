package kr.co.panclub.model;

import java.math.BigDecimal;

public class AssaySales {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String orderYmd;   //주문일자  
	private String custCode;   // 거래처코드
	private String custName;   // 거래처명 
	private String orderGroupId;  // 주문그룹ID
	private String clType;  //청구유형
	private BigDecimal costAmt;  // 원가 	
	private BigDecimal orderAmt; //  주문액
	private BigDecimal orderProfitAmt;  // 주문이익액
	private float orderProfitRate; //주문 이익율
	private BigDecimal rlAmt;    // 출고액
	private BigDecimal rlProfitAmt;    // 출고이익액
	private float rlProfitRate;    // 출고이익율
	private BigDecimal clAmt;    // 청구액
	private BigDecimal clProfitAmt;    //청구이익
	private float clProfitRate;  //청구이익율
	private BigDecimal depositAmt;   // 보험입금액
	private String clConfYN;        //  청구기결여부
	private BigDecimal rlCostAmt;    //출고원가
	private BigDecimal clCostAmt;    //청구원가
	
	private BigDecimal expectPlaceAmt;  //2023.08.01 hsg 예정발주액
	private BigDecimal expectPlaceProfitAmt; //2023.08.01 hsg 예상발주이익액
	private float expectPlaceProfitRate; //2023.08.01 hsg 예상발주이익율
	private int nonWhPriceChkCnt;   //2023.08.09 입고단가 확인안한 수량
	
	//2023.10.10 hsg
	private String carNo;
	private String branchCode;
	private String branchName;
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
	public String getOrderYmd() {
		return orderYmd;
	}
	public void setOrderYmd(String orderYmd) {
		this.orderYmd = orderYmd;
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
	public BigDecimal getCostAmt() {
		return costAmt;
	}
	public void setCostAmt(BigDecimal costAmt) {
		this.costAmt = costAmt;
	}
	public BigDecimal getOrderAmt() {
		return orderAmt;
	}
	public void setOrderAmt(BigDecimal orderAmt) {
		this.orderAmt = orderAmt;
	}
	public BigDecimal getOrderProfitAmt() {
		return orderProfitAmt;
	}
	public void setOrderProfitAmt(BigDecimal orderProfitAmt) {
		this.orderProfitAmt = orderProfitAmt;
	}
	public float getOrderProfitRate() {
		return orderProfitRate;
	}
	public void setOrderProfitRate(float orderProfitRate) {
		this.orderProfitRate = orderProfitRate;
	}
	public BigDecimal getRlAmt() {
		return rlAmt;
	}
	public void setRlAmt(BigDecimal rlAmt) {
		this.rlAmt = rlAmt;
	}
	public BigDecimal getRlProfitAmt() {
		return rlProfitAmt;
	}
	public void setRlProfitAmt(BigDecimal rlProfitAmt) {
		this.rlProfitAmt = rlProfitAmt;
	}
	public float getRlProfitRate() {
		return rlProfitRate;
	}
	public void setRlProfitRate(float rlProfitRate) {
		this.rlProfitRate = rlProfitRate;
	}
	public BigDecimal getClAmt() {
		return clAmt;
	}
	public void setClAmt(BigDecimal clAmt) {
		this.clAmt = clAmt;
	}
	public BigDecimal getClProfitAmt() {
		return clProfitAmt;
	}
	public void setClProfitAmt(BigDecimal clProfitAmt) {
		this.clProfitAmt = clProfitAmt;
	}
	public float getClProfitRate() {
		return clProfitRate;
	}
	public void setClProfitRate(float clProfitRate) {
		this.clProfitRate = clProfitRate;
	}
	public BigDecimal getDepositAmt() {
		return depositAmt;
	}
	public void setDepositAmt(BigDecimal depositAmt) {
		this.depositAmt = depositAmt;
	}
	public String getClConfYN() {
		return clConfYN;
	}
	public void setClConfYN(String clConfYN) {
		this.clConfYN = clConfYN;
	}
	public BigDecimal getRlCostAmt() {
		return rlCostAmt;
	}
	public void setRlCostAmt(BigDecimal rlCostAmt) {
		this.rlCostAmt = rlCostAmt;
	}
	public BigDecimal getClCostAmt() {
		return clCostAmt;
	}
	public void setClCostAmt(BigDecimal clCostAmt) {
		this.clCostAmt = clCostAmt;
	}
	public BigDecimal getExpectPlaceAmt() {
		return expectPlaceAmt;
	}
	public void setExpectPlaceAmt(BigDecimal expectPlaceAmt) {
		this.expectPlaceAmt = expectPlaceAmt;
	}
	public BigDecimal getExpectPlaceProfitAmt() {
		return expectPlaceProfitAmt;
	}
	public void setExpectPlaceProfitAmt(BigDecimal expectPlaceProfitAmt) {
		this.expectPlaceProfitAmt = expectPlaceProfitAmt;
	}
	public float getExpectPlaceProfitRate() {
		return expectPlaceProfitRate;
	}
	public void setExpectPlaceProfitRate(float expectPlaceProfitRate) {
		this.expectPlaceProfitRate = expectPlaceProfitRate;
	}
	public int getNonWhPriceChkCnt() {
		return nonWhPriceChkCnt;
	}
	public void setNonWhPriceChkCnt(int nonWhPriceChkCnt) {
		this.nonWhPriceChkCnt = nonWhPriceChkCnt;
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
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	@Override
	public String toString() {
		return "AssaySales [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", orderYmd=" + orderYmd + ", custCode=" + custCode + ", custName=" + custName
				+ ", orderGroupId=" + orderGroupId + ", clType=" + clType + ", costAmt=" + costAmt + ", orderAmt="
				+ orderAmt + ", orderProfitAmt=" + orderProfitAmt + ", orderProfitRate=" + orderProfitRate + ", rlAmt="
				+ rlAmt + ", rlProfitAmt=" + rlProfitAmt + ", rlProfitRate=" + rlProfitRate + ", clAmt=" + clAmt
				+ ", clProfitAmt=" + clProfitAmt + ", clProfitRate=" + clProfitRate + ", depositAmt=" + depositAmt
				+ ", clConfYN=" + clConfYN + ", rlCostAmt=" + rlCostAmt + ", clCostAmt=" + clCostAmt
				+ ", expectPlaceAmt=" + expectPlaceAmt + ", expectPlaceProfitAmt=" + expectPlaceProfitAmt
				+ ", expectPlaceProfitRate=" + expectPlaceProfitRate + ", nonWhPriceChkCnt=" + nonWhPriceChkCnt
				+ ", carNo=" + carNo + ", branchCode=" + branchCode + ", branchName=" + branchName + "]";
	}
	
	

	

	
	
	
}
