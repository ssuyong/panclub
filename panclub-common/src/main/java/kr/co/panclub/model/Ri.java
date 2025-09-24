package kr.co.panclub.model;

public class Ri {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String riNo;             //  --출고번호
	private String storageCode;       // -- 창고코드
	private String custCode;         //--구매처처코드
	private String riYmd;            // --출고일
	private String memo1;           // --비고1
	private int price;             //--공급가액
	private int taxPrice;               //--세액
	private int sumPrice;             // --합계
	private String regUserId;                    // --등록자
	private String regYmd;                 // --등록일
	private String regHms;                    // --등록시
	private String uptUserId;                    // --수정자
	private String uptYmd;                      // --수정일
	private String uptHms;                    //--수정시
	private String receiver;                    //2023.04.18 yoonsang
	private String carNo;                    //2023.04.18 yoonsang
	private String makerCode;                    //2023.04.18 yoonsang
	private String orderGroupId;                    //2023.04.18 yoonsang
	private String riWay;                    //2023.04.18 yoonsang
	private String riMgr;                    //2023.04.18 yoonsang
	private String custName;                    //2023.04.19 yoonsang
	private String carType;                    //2023.04.19 yoonsang
	private String reqUserName;                    //2023.04.19 yoonsang
	
	//2023.05.23 hsg
	private String storageName;
	private String rackCode;
	private String rackName;
	
	//2023.06.30 bk
	private String branchCode;
	private String realRiYmd; // 2023.07.27 실제 반입일
	

	private String vinNo; // 2023.08.17 차대번호 bk

	private String gvComCode; // 2023.09.21 yoonsang
	private String gvComName; // 240313
	private String doubleClickYN;
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
	public String getRiNo() {
		return riNo;
	}
	public void setRiNo(String riNo) {
		this.riNo = riNo;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getRiYmd() {
		return riYmd;
	}
	public void setRiYmd(String riYmd) {
		this.riYmd = riYmd;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(int taxPrice) {
		this.taxPrice = taxPrice;
	}
	public int getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(int sumPrice) {
		this.sumPrice = sumPrice;
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
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getRiWay() {
		return riWay;
	}
	public void setRiWay(String riWay) {
		this.riWay = riWay;
	}
	public String getRiMgr() {
		return riMgr;
	}
	public void setRiMgr(String riMgr) {
		this.riMgr = riMgr;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getReqUserName() {
		return reqUserName;
	}
	public void setReqUserName(String reqUserName) {
		this.reqUserName = reqUserName;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public String getRealRiYmd() {
		return realRiYmd;
	}
	public void setRealRiYmd(String realRiYmd) {
		this.realRiYmd = realRiYmd;
	}
	public String getVinNo() {
		return vinNo;
	}
	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public String getGvComName() {
		return gvComName;
	}
	public void setGvComName(String gvComName) {
		this.gvComName = gvComName;
	}
	public String getDoubleClickYN() {
		return doubleClickYN;
	}
	public void setDoubleClickYN(String doubleClickYN) {
		this.doubleClickYN = doubleClickYN;
	}
	@Override
	public String toString() {
		return "Ri [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg
				+ ", comCode=" + comCode + ", riNo=" + riNo + ", storageCode=" + storageCode + ", custCode=" + custCode
				+ ", riYmd=" + riYmd + ", memo1=" + memo1 + ", price=" + price + ", taxPrice=" + taxPrice
				+ ", sumPrice=" + sumPrice + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms
				+ ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", receiver=" + receiver
				+ ", carNo=" + carNo + ", makerCode=" + makerCode + ", orderGroupId=" + orderGroupId + ", riWay="
				+ riWay + ", riMgr=" + riMgr + ", custName=" + custName + ", carType=" + carType + ", reqUserName="
				+ reqUserName + ", storageName=" + storageName + ", rackCode=" + rackCode + ", rackName=" + rackName
				+ ", branchCode=" + branchCode + ", realRiYmd=" + realRiYmd + ", vinNo=" + vinNo + ", gvComCode="
				+ gvComCode + ", gvComName=" + gvComName + ", doubleClickYN=" + doubleClickYN + "]";
	} 



	

	
}
