package kr.co.panclub.model;

public class CustBiz {

	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String custCode;
	private String custName;
	private int totUnColl;              // 총미수액
	private int prevMMBalance;       //전월 잔액
	private int prevMMUnColl;	   //전월 미수액
	private int rlCash;              //출고 현금
	private int rlCredit;           //출고 외상
	private int rlSum;               //출고 합계
	private int dp;                   //입금 금액
	private int dpDc;               //입금 할인액
	private int nowMMUnColl;    //당월 미수액
	private int prevMMUnPaid;   //전월 미불액
	private int whCash;       //입고 현금
	private int whCredit;      //입고 외상
	private int whSum;        //입고 합계
	private int wd;           //출금 금액
	private int wdDc;        //출금 할인액
	private int nowMMUnPaid;   //당월 미불액
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
	public int getTotUnColl() {
		return totUnColl;
	}
	public void setTotUnColl(int totUnColl) {
		this.totUnColl = totUnColl;
	}
	public int getPrevMMBalance() {
		return prevMMBalance;
	}
	public void setPrevMMBalance(int prevMMBalance) {
		this.prevMMBalance = prevMMBalance;
	}
	public int getPrevMMUnColl() {
		return prevMMUnColl;
	}
	public void setPrevMMUnColl(int prevMMUnColl) {
		this.prevMMUnColl = prevMMUnColl;
	}
	public int getRlCash() {
		return rlCash;
	}
	public void setRlCash(int rlCash) {
		this.rlCash = rlCash;
	}
	public int getRlCredit() {
		return rlCredit;
	}
	public void setRlCredit(int rlCredit) {
		this.rlCredit = rlCredit;
	}
	public int getRlSum() {
		return rlSum;
	}
	public void setRlSum(int rlSum) {
		this.rlSum = rlSum;
	}
	public int getDp() {
		return dp;
	}
	public void setDp(int dp) {
		this.dp = dp;
	}
	public int getDpDc() {
		return dpDc;
	}
	public void setDpDc(int dpDc) {
		this.dpDc = dpDc;
	}
	public int getNowMMUnColl() {
		return nowMMUnColl;
	}
	public void setNowMMUnColl(int nowMMUnColl) {
		this.nowMMUnColl = nowMMUnColl;
	}
	public int getPrevMMUnPaid() {
		return prevMMUnPaid;
	}
	public void setPrevMMUnPaid(int prevMMUnPaid) {
		this.prevMMUnPaid = prevMMUnPaid;
	}
	public int getWhCash() {
		return whCash;
	}
	public void setWhCash(int whCash) {
		this.whCash = whCash;
	}
	public int getWhCredit() {
		return whCredit;
	}
	public void setWhCredit(int whCredit) {
		this.whCredit = whCredit;
	}
	public int getWhSum() {
		return whSum;
	}
	public void setWhSum(int whSum) {
		this.whSum = whSum;
	}
	public int getWd() {
		return wd;
	}
	public void setWd(int wd) {
		this.wd = wd;
	}
	public int getWdDc() {
		return wdDc;
	}
	public void setWdDc(int wdDc) {
		this.wdDc = wdDc;
	}
	public int getNowMMUnPaid() {
		return nowMMUnPaid;
	}
	public void setNowMMUnPaid(int nowMMUnPaid) {
		this.nowMMUnPaid = nowMMUnPaid;
	}
	@Override
	public String toString() {
		return "CustBiz [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", custCode=" + custCode + ", custName=" + custName + ", totUnColl=" + totUnColl
				+ ", prevMMBalance=" + prevMMBalance + ", prevMMUnColl=" + prevMMUnColl + ", rlCash=" + rlCash
				+ ", rlCredit=" + rlCredit + ", rlSum=" + rlSum + ", dp=" + dp + ", dpDc=" + dpDc + ", nowMMUnColl="
				+ nowMMUnColl + ", prevMMUnPaid=" + prevMMUnPaid + ", whCash=" + whCash + ", whCredit=" + whCredit
				+ ", whSum=" + whSum + ", wd=" + wd + ", wdDc=" + wdDc + ", nowMMUnPaid=" + nowMMUnPaid + "]";
	}
	

	
}
