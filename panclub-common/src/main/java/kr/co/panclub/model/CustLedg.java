package kr.co.panclub.model;

import java.math.BigDecimal;

public class CustLedg {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String stdYmd;              // ,--일자
	private String summary;              // --적요.전표번호
	private int rlAmt;              //  --출고
	private int depositAmt;              // --입금
	private int dpDcAmt;              // --입금할인
	private int whAmt;              // --입고
	private int wdAmt;              //--출금
	private int wdDcAmt;              //--출금할인
	private int balanceAmt;              //--잔액
	
	private String custCode;
	private String custName;
	
	private String ledgType; // 유형
	private BigDecimal creditAmt; // 외상매출금 잔액
	private BigDecimal payableAmt; // 외상매입금 잔액
	private String stdYearMonth; // 연월
	
	//품목별 거래처원장
	private String seq;

	private BigDecimal unitPrice;
	private BigDecimal sumPrice;
	private BigDecimal sumPriceTax;
	private int itemId;
	private String itemNo;
	private String itemName;
	private String cnt;
	private String ledgCateg;

	private String carNo;//2023.08.29 bk 차량번호
	private String carType ;//2023.08.29 bk 차종
	
	private String printType ;//20231031 yoonsang 프린트타입(전체/매출/매입)
	
	private String summary2;	//240118 yoonsang 적요2 

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

	public String getStdYmd() {
		return stdYmd;
	}

	public void setStdYmd(String stdYmd) {
		this.stdYmd = stdYmd;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public int getRlAmt() {
		return rlAmt;
	}

	public void setRlAmt(int rlAmt) {
		this.rlAmt = rlAmt;
	}

	public int getDepositAmt() {
		return depositAmt;
	}

	public void setDepositAmt(int depositAmt) {
		this.depositAmt = depositAmt;
	}

	public int getDpDcAmt() {
		return dpDcAmt;
	}

	public void setDpDcAmt(int dpDcAmt) {
		this.dpDcAmt = dpDcAmt;
	}

	public int getWhAmt() {
		return whAmt;
	}

	public void setWhAmt(int whAmt) {
		this.whAmt = whAmt;
	}

	public int getWdAmt() {
		return wdAmt;
	}

	public void setWdAmt(int wdAmt) {
		this.wdAmt = wdAmt;
	}

	public int getWdDcAmt() {
		return wdDcAmt;
	}

	public void setWdDcAmt(int wdDcAmt) {
		this.wdDcAmt = wdDcAmt;
	}

	public int getBalanceAmt() {
		return balanceAmt;
	}

	public void setBalanceAmt(int balanceAmt) {
		this.balanceAmt = balanceAmt;
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

	public String getLedgType() {
		return ledgType;
	}

	public void setLedgType(String ledgType) {
		this.ledgType = ledgType;
	}

	public BigDecimal getCreditAmt() {
		return creditAmt;
	}

	public void setCreditAmt(BigDecimal creditAmt) {
		this.creditAmt = creditAmt;
	}

	public BigDecimal getPayableAmt() {
		return payableAmt;
	}

	public void setPayableAmt(BigDecimal payableAmt) {
		this.payableAmt = payableAmt;
	}

	public String getStdYearMonth() {
		return stdYearMonth;
	}

	public void setStdYearMonth(String stdYearMonth) {
		this.stdYearMonth = stdYearMonth;
	}

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
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

	public BigDecimal getSumPriceTax() {
		return sumPriceTax;
	}

	public void setSumPriceTax(BigDecimal sumPriceTax) {
		this.sumPriceTax = sumPriceTax;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
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

	public String getCnt() {
		return cnt;
	}

	public void setCnt(String cnt) {
		this.cnt = cnt;
	}

	public String getLedgCateg() {
		return ledgCateg;
	}

	public void setLedgCateg(String ledgCateg) {
		this.ledgCateg = ledgCateg;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getPrintType() {
		return printType;
	}

	public void setPrintType(String printType) {
		this.printType = printType;
	}

	public String getSummary2() {
		return summary2;
	}

	public void setSummary2(String summary2) {
		this.summary2 = summary2;
	}

	@Override
	public String toString() {
		return "CustLedg [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", stdYmd=" + stdYmd + ", summary=" + summary + ", rlAmt=" + rlAmt + ", depositAmt="
				+ depositAmt + ", dpDcAmt=" + dpDcAmt + ", whAmt=" + whAmt + ", wdAmt=" + wdAmt + ", wdDcAmt=" + wdDcAmt
				+ ", balanceAmt=" + balanceAmt + ", custCode=" + custCode + ", custName=" + custName + ", ledgType="
				+ ledgType + ", creditAmt=" + creditAmt + ", payableAmt=" + payableAmt + ", stdYearMonth="
				+ stdYearMonth + ", seq=" + seq + ", unitPrice=" + unitPrice + ", sumPrice=" + sumPrice
				+ ", sumPriceTax=" + sumPriceTax + ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName="
				+ itemName + ", cnt=" + cnt + ", ledgCateg=" + ledgCateg + ", carNo=" + carNo + ", carType=" + carType
				+ ", printType=" + printType + ", summary2=" + summary2 + "]";
	}

	
	
}
