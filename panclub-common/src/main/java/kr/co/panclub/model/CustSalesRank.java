package kr.co.panclub.model;

public class CustSalesRank {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private int ranking;  //순위
	private String custCode; //거래처코드
	private String custName; //거래처명
	private int creditSales;  //외상매출
	private int cashSales;   //현금매출
	private int insurSales;  //보험매출
	private int totalSales;  //순위매출
	
	private int rlAmt;    //팬클럽 기준 : 출고 기준
	private int dpAmt;    //팬클럽 기준 : 입금 기준
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
	public int getRanking() {
		return ranking;
	}
	public void setRanking(int ranking) {
		this.ranking = ranking;
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
	public int getCreditSales() {
		return creditSales;
	}
	public void setCreditSales(int creditSales) {
		this.creditSales = creditSales;
	}
	public int getCashSales() {
		return cashSales;
	}
	public void setCashSales(int cashSales) {
		this.cashSales = cashSales;
	}
	public int getInsurSales() {
		return insurSales;
	}
	public void setInsurSales(int insurSales) {
		this.insurSales = insurSales;
	}
	public int getTotalSales() {
		return totalSales;
	}
	public void setTotalSales(int totalSales) {
		this.totalSales = totalSales;
	}
	public int getRlAmt() {
		return rlAmt;
	}
	public void setRlAmt(int rlAmt) {
		this.rlAmt = rlAmt;
	}
	public int getDpAmt() {
		return dpAmt;
	}
	public void setDpAmt(int dpAmt) {
		this.dpAmt = dpAmt;
	}
	@Override
	public String toString() {
		return "CustSalesRank [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", ranking=" + ranking + ", custCode=" + custCode + ", custName=" + custName
				+ ", creditSales=" + creditSales + ", cashSales=" + cashSales + ", insurSales=" + insurSales
				+ ", totalSales=" + totalSales + ", rlAmt=" + rlAmt + ", dpAmt=" + dpAmt + "]";
	}
	
	

	

}
