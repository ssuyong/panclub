package kr.co.panclub.model;

import java.util.ArrayList;

public class CoCard {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String custCode;                   // --카드사 코드
	private String cardNum;                   //  --카드번호
	private String cardName;                   //  --카드명
	private String cvc;                   //  --cvc
	private String expirDate;                   //  --유효기간
	private String settleDay;                   // --결제일
	private String ownType;                   //  --소유구분: 공용/지정
	private String userComment;                   //  --사용자코멘트
	private int limitAmt;                   // --한도
	private String usePeriod;                   // --사용일
	private String memo1;                   //  --비고
	private String prevCardNum1;                   // --이전카드번호1
	private String validYN;                   //  --사용여부
	
	private String custName; 
	
	// 추가 행 리스트
	private ArrayList<CoCard> coCardAdd;
	// 수정 행 리스트
	private ArrayList<CoCard> coCardUpdate;
	// 삭제 행 리스트
	private ArrayList<CoCard> coCardRemove;
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
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getCardNum() {
		return cardNum;
	}
	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}
	public String getCardName() {
		return cardName;
	}
	public void setCardName(String cardName) {
		this.cardName = cardName;
	}
	public String getCvc() {
		return cvc;
	}
	public void setCvc(String cvc) {
		this.cvc = cvc;
	}
	public String getExpirDate() {
		return expirDate;
	}
	public void setExpirDate(String expirDate) {
		this.expirDate = expirDate;
	}
	public String getSettleDay() {
		return settleDay;
	}
	public void setSettleDay(String settleDay) {
		this.settleDay = settleDay;
	}
	public String getOwnType() {
		return ownType;
	}
	public void setOwnType(String ownType) {
		this.ownType = ownType;
	}
	public String getUserComment() {
		return userComment;
	}
	public void setUserComment(String userComment) {
		this.userComment = userComment;
	}
	public int getLimitAmt() {
		return limitAmt;
	}
	public void setLimitAmt(int limitAmt) {
		this.limitAmt = limitAmt;
	}
	public String getUsePeriod() {
		return usePeriod;
	}
	public void setUsePeriod(String usePeriod) {
		this.usePeriod = usePeriod;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public String getPrevCardNum1() {
		return prevCardNum1;
	}
	public void setPrevCardNum1(String prevCardNum1) {
		this.prevCardNum1 = prevCardNum1;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public ArrayList<CoCard> getCoCardAdd() {
		return coCardAdd;
	}
	public void setCoCardAdd(ArrayList<CoCard> coCardAdd) {
		this.coCardAdd = coCardAdd;
	}
	public ArrayList<CoCard> getCoCardUpdate() {
		return coCardUpdate;
	}
	public void setCoCardUpdate(ArrayList<CoCard> coCardUpdate) {
		this.coCardUpdate = coCardUpdate;
	}
	public ArrayList<CoCard> getCoCardRemove() {
		return coCardRemove;
	}
	public void setCoCardRemove(ArrayList<CoCard> coCardRemove) {
		this.coCardRemove = coCardRemove;
	}
	@Override
	public String toString() {
		return "CoCard [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", custCode=" + custCode + ", cardNum=" + cardNum
				+ ", cardName=" + cardName + ", cvc=" + cvc + ", expirDate=" + expirDate + ", settleDay=" + settleDay
				+ ", ownType=" + ownType + ", userComment=" + userComment + ", limitAmt=" + limitAmt + ", usePeriod="
				+ usePeriod + ", memo1=" + memo1 + ", prevCardNum1=" + prevCardNum1 + ", validYN=" + validYN
				+ ", custName=" + custName + ", coCardAdd=" + coCardAdd + ", coCardUpdate=" + coCardUpdate
				+ ", coCardRemove=" + coCardRemove + "]";
	}
	

	
}
