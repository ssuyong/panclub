package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class WdReq {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;                     //
	private String wdReqNo;                     // --출금요청번호
	private String wdReqType;                     // --출고요청타입. 발주/입고
	private String custCode;                     // 
	private String wdReqYmd;                     // --출금요청일
	private int wdReqAmt;                     // -- 출금요청금액
	private String attaFile;                     // -- 첨부파일명
	private String attaFileOri;                     // --  첨부파일원본명
	private String memo1;                     //  --메모
	private String regUserId;                     //
	private String regYmd;                     //
	private String regHms;                     //
	private String uptUserId;                     //
	private String uptYmd;                     //
	private String uptHms;                     //
	
	private String jobArr;
	private String reqArr;
	
	private String custName;
	private int itemCnt;
	private int sumCnt;
	
	private String regUserName;
	private String uptUserName;
	
	private String buyChk;      // -- 매입확정여부 2023.04.11 bokyung
    private Date buyChkDate;      //   -- 매입확정일자 2023.04.11 bokyung
	private String buyChkUserId;     //   -- 매입확정자 2023.04.11 bokyung
	
	private String wdReqNoArr; // 출금요청리스트 2023.04.11 bokyung 
	
	private int whSumCnt; // 발주출금 시 입고수량 
	private int whSumPrice; // 발주출금 시 입고금액
	 
	private int wiSumCnt; // 입고출금 시 입고수량 
	private int wiSumPrice;// 입고출금 시 입고금액
	
	private String payStatus; //출금상태 2023.04.13 bokyung
	
	private BigDecimal wdReqSumPrice; // 출금요청액 합 2023.04.17 bk
	private BigDecimal wdMoney; // 출금액  2023.04.17 bk
	private BigDecimal difWdMoney; // 잔액 2023.04.17 bk
	
	private String seqArr;//2023.06.29 bokyung 추가
	private String ledgArr; //2023.06.29 bokyung 추가
	private String wdDate; //2023.07.12  bokyung 추가
	
	private BigDecimal dcSumPrice;  //2023.09.06 hsg . 출금할인액
	
	public WdReq() {
		// TODO Auto-generated constructor stub
	}
	
	

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

	public String getWdReqNo() {
		return wdReqNo;
	}

	public void setWdReqNo(String wdReqNo) {
		this.wdReqNo = wdReqNo;
	}

	public String getWdReqType() {
		return wdReqType;
	}

	public void setWdReqType(String wdReqType) {
		this.wdReqType = wdReqType;
	}

	public String getCustCode() {
		return custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}

	public String getWdReqYmd() {
		return wdReqYmd;
	}

	public void setWdReqYmd(String wdReqYmd) {
		this.wdReqYmd = wdReqYmd;
	}

	public int getWdReqAmt() {
		return wdReqAmt;
	}

	public void setWdReqAmt(int wdReqAmt) {
		this.wdReqAmt = wdReqAmt;
	}

	public String getAttaFile() {
		return attaFile;
	}

	public void setAttaFile(String attaFile) {
		this.attaFile = attaFile;
	}

	public String getAttaFileOri() {
		return attaFileOri;
	}

	public void setAttaFileOri(String attaFileOri) {
		this.attaFileOri = attaFileOri;
	}

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
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

	public String getJobArr() {
		return jobArr;
	}

	public void setJobArr(String jobArr) {
		this.jobArr = jobArr;
	}

	public String getReqArr() {
		return reqArr;
	}

	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public int getItemCnt() {
		return itemCnt;
	}

	public void setItemCnt(int itemCnt) {
		this.itemCnt = itemCnt;
	}

	public int getSumCnt() {
		return sumCnt;
	}

	public void setSumCnt(int sumCnt) {
		this.sumCnt = sumCnt;
	}

	public String getRegUserName() {
		return regUserName;
	}

	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}

	public String getUptUserName() {
		return uptUserName;
	}

	public void setUptUserName(String uptUserName) {
		this.uptUserName = uptUserName;
	}

	public String getBuyChk() {
		return buyChk;
	}

	public void setBuyChk(String buyChk) {
		this.buyChk = buyChk;
	}

	public Date getBuyChkDate() {
		return buyChkDate;
	}

	public void setBuyChkDate(Date buyChkDate) {
		this.buyChkDate = buyChkDate;
	}

	public String getBuyChkUserId() {
		return buyChkUserId;
	}

	public void setBuyChkUserId(String buyChkUserId) {
		this.buyChkUserId = buyChkUserId;
	}

	public String getWdReqNoArr() {
		return wdReqNoArr;
	}

	public void setWdReqNoArr(String wdReqNoArr) {
		this.wdReqNoArr = wdReqNoArr;
	}

	public int getWhSumCnt() {
		return whSumCnt;
	}

	public void setWhSumCnt(int whSumCnt) {
		this.whSumCnt = whSumCnt;
	}

	public int getWhSumPrice() {
		return whSumPrice;
	}

	public void setWhSumPrice(int whSumPrice) {
		this.whSumPrice = whSumPrice;
	}

	public int getWiSumCnt() {
		return wiSumCnt;
	}

	public void setWiSumCnt(int wiSumCnt) {
		this.wiSumCnt = wiSumCnt;
	}

	public int getWiSumPrice() {
		return wiSumPrice;
	}

	public void setWiSumPrice(int wiSumPrice) {
		this.wiSumPrice = wiSumPrice;
	}

	public String getPayStatus() {
		return payStatus;
	}

	public void setPayStatus(String payStatus) {
		this.payStatus = payStatus;
	}

	public BigDecimal getWdReqSumPrice() {
		return wdReqSumPrice;
	}

	public void setWdReqSumPrice(BigDecimal wdReqSumPrice) {
		this.wdReqSumPrice = wdReqSumPrice;
	}

	public BigDecimal getWdMoney() {
		return wdMoney;
	}

	public void setWdMoney(BigDecimal wdMoney) {
		this.wdMoney = wdMoney;
	}

	public BigDecimal getDifWdMoney() {
		return difWdMoney;
	}

	public void setDifWdMoney(BigDecimal difWdMoney) {
		this.difWdMoney = difWdMoney;
	}

	public String getSeqArr() {
		return seqArr;
	}

	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}

	public String getLedgArr() {
		return ledgArr;
	}

	public void setLedgArr(String ledgArr) {
		this.ledgArr = ledgArr;
	}

	public String getWdDate() {
		return wdDate;
	}

	public void setWdDate(String wdDate) {
		this.wdDate = wdDate;
	}

	public BigDecimal getDcSumPrice() {
		return dcSumPrice;
	}

	public void setDcSumPrice(BigDecimal dcSumPrice) {
		this.dcSumPrice = dcSumPrice;
	}

	@Override
	public String toString() {
		return "WdReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", wdReqNo=" + wdReqNo + ", wdReqType=" + wdReqType
				+ ", custCode=" + custCode + ", wdReqYmd=" + wdReqYmd + ", wdReqAmt=" + wdReqAmt + ", attaFile="
				+ attaFile + ", attaFileOri=" + attaFileOri + ", memo1=" + memo1 + ", regUserId=" + regUserId
				+ ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd
				+ ", uptHms=" + uptHms + ", jobArr=" + jobArr + ", reqArr=" + reqArr + ", custName=" + custName
				+ ", itemCnt=" + itemCnt + ", sumCnt=" + sumCnt + ", regUserName=" + regUserName + ", uptUserName="
				+ uptUserName + ", buyChk=" + buyChk + ", buyChkDate=" + buyChkDate + ", buyChkUserId=" + buyChkUserId
				+ ", wdReqNoArr=" + wdReqNoArr + ", whSumCnt=" + whSumCnt + ", whSumPrice=" + whSumPrice + ", wiSumCnt="
				+ wiSumCnt + ", wiSumPrice=" + wiSumPrice + ", payStatus=" + payStatus + ", wdReqSumPrice="
				+ wdReqSumPrice + ", wdMoney=" + wdMoney + ", difWdMoney=" + difWdMoney + ", seqArr=" + seqArr
				+ ", ledgArr=" + ledgArr + ", wdDate=" + wdDate + ", dcSumPrice=" + dcSumPrice + "]";
	}
	

	
	
	
	
	
	
}
