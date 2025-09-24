package kr.co.panclub.model;

public class AccountHistory {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String comCode;
	private String payCode;
	private String payName;
	private String payNo;

	private int dpMSum;
	private int wdMSum;
	private String dwType;
	private String dwDate;
	private String dwNo;

	private String accCode;
	private String accName;
	private String custCode;
	private String custName;
	private String carNo;
	private int dpMoney;
	private int wdMoney;
	private String memo;
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
	public String getPayCode() {
		return payCode;
	}
	public void setPayCode(String payCode) {
		this.payCode = payCode;
	}
	public String getPayName() {
		return payName;
	}
	public void setPayName(String payName) {
		this.payName = payName;
	}
	public String getPayNo() {
		return payNo;
	}
	public void setPayNo(String payNo) {
		this.payNo = payNo;
	}
	public int getDpMSum() {
		return dpMSum;
	}
	public void setDpMSum(int dpMSum) {
		this.dpMSum = dpMSum;
	}
	public int getWdMSum() {
		return wdMSum;
	}
	public void setWdMSum(int wdMSum) {
		this.wdMSum = wdMSum;
	}
	public String getDwType() {
		return dwType;
	}
	public void setDwType(String dwType) {
		this.dwType = dwType;
	}
	public String getDwDate() {
		return dwDate;
	}
	public void setDwDate(String dwDate) {
		this.dwDate = dwDate;
	}
	public String getDwNo() {
		return dwNo;
	}
	public void setDwNo(String dwNo) {
		this.dwNo = dwNo;
	}
	public String getAccCode() {
		return accCode;
	}
	public void setAccCode(String accCode) {
		this.accCode = accCode;
	}
	public String getAccName() {
		return accName;
	}
	public void setAccName(String accName) {
		this.accName = accName;
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
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public int getDpMoney() {
		return dpMoney;
	}
	public void setDpMoney(int dpMoney) {
		this.dpMoney = dpMoney;
	}
	public int getWdMoney() {
		return wdMoney;
	}
	public void setWdMoney(int wdMoney) {
		this.wdMoney = wdMoney;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	@Override
	public String toString() {
		return "AccountHistory [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", payCode=" + payCode + ", payName=" + payName + ", payNo="
				+ payNo + ", dpMSum=" + dpMSum + ", wdMSum=" + wdMSum + ", dwType=" + dwType + ", dwDate=" + dwDate
				+ ", dwNo=" + dwNo + ", accCode=" + accCode + ", accName=" + accName + ", custCode=" + custCode
				+ ", custName=" + custName + ", carNo=" + carNo + ", dpMoney=" + dpMoney + ", wdMoney=" + wdMoney
				+ ", memo=" + memo + "]";
	}
	
	
}
