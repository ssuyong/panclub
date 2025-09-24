package kr.co.panclub.model;

public class Ro {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String roNo;         //  --출고번호
	private String storageCode;         //  -- 창고코드
	private String custCode;         // --구매처처코드
	private String roYmd;         //  --출고일
	private String memo1;         // --비고1
	private int price;         // --공급가액
	private int taxPrice;         // --세액
	private int sumPrice;         //  --합계
	private String regUserId;         // --등록자
	private String regYmd;         // --등록일
	private String regHms;         //  --등록시
	private String uptUserId;         //  --수정자
	private String uptYmd;         // --수정일
	private String uptHms;         // --수정시
	
	private String orderGroupId;   		//2023.04.23 yoonsang  추가
	private String carNo;   		//2023.04.23 yoonsang  추가
	private String makerCode;   		//2023.04.23 yoonsang  추가
	private String carType;   		//2023.04.23 yoonsang  추가
	private String roWay;   		//2023.04.23 yoonsang  추가
	private String roMgr;   		//2023.04.23 yoonsang  추가
	
	private String orderTypeName;   		//2023.04.23 yoonsang  추가
	private String custMgrName;   		//2023.04.23 yoonsang  추가
	private String custMgrPhone;   		//2023.04.23 yoonsang  추가
	private String vinNo;   		//2023.04.23 yoonsang  추가
	
	private String odArr;   		//2023.04.23 yoonsang  추가
	private String odSeqArr;   		//2023.04.23 yoonsang  추가
	private String plArr;   		//2023.04.23 yoonsang  추가
	private String plSeqArr;   		//2023.04.23 yoonsang  추가
	private String custName;   		//2023.04.24 yoonsang  추가
	private String reqUserName;   		//2023.04.24 yoonsang  추가
	
	//2023.05.23 hsg
	private String storageName;
	private String rackCode;
	private String rackName;
	
	//2023.06.30 bk
	private String branchCode;

	private String placeCustCode;//2023.08.01 bk 발주처코드 
	private String placeCustName;//2023.08.01 bk 발주처이름
	private String custRoNo;//2023.08.01 bk 반출처거래번호

	private String gvComCode;
	
	private String reqNoArr;
	private String reqSeqArr;
	private String roCntArr;
	private String memo1Arr;
	
	private String roNoArr;
	private String roSeqArr;
	private String salePriceArr;
	private String toOrderReqPlaceYNArr;
	private String gvComName;
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
	public String getRoNo() {
		return roNo;
	}
	public void setRoNo(String roNo) {
		this.roNo = roNo;
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
	public String getRoYmd() {
		return roYmd;
	}
	public void setRoYmd(String roYmd) {
		this.roYmd = roYmd;
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
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
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
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getRoWay() {
		return roWay;
	}
	public void setRoWay(String roWay) {
		this.roWay = roWay;
	}
	public String getRoMgr() {
		return roMgr;
	}
	public void setRoMgr(String roMgr) {
		this.roMgr = roMgr;
	}
	public String getOrderTypeName() {
		return orderTypeName;
	}
	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
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
	public String getVinNo() {
		return vinNo;
	}
	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}
	public String getOdArr() {
		return odArr;
	}
	public void setOdArr(String odArr) {
		this.odArr = odArr;
	}
	public String getOdSeqArr() {
		return odSeqArr;
	}
	public void setOdSeqArr(String odSeqArr) {
		this.odSeqArr = odSeqArr;
	}
	public String getPlArr() {
		return plArr;
	}
	public void setPlArr(String plArr) {
		this.plArr = plArr;
	}
	public String getPlSeqArr() {
		return plSeqArr;
	}
	public void setPlSeqArr(String plSeqArr) {
		this.plSeqArr = plSeqArr;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
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
	public String getPlaceCustCode() {
		return placeCustCode;
	}
	public void setPlaceCustCode(String placeCustCode) {
		this.placeCustCode = placeCustCode;
	}
	public String getPlaceCustName() {
		return placeCustName;
	}
	public void setPlaceCustName(String placeCustName) {
		this.placeCustName = placeCustName;
	}
	public String getCustRoNo() {
		return custRoNo;
	}
	public void setCustRoNo(String custRoNo) {
		this.custRoNo = custRoNo;
	}
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public String getReqNoArr() {
		return reqNoArr;
	}
	public void setReqNoArr(String reqNoArr) {
		this.reqNoArr = reqNoArr;
	}
	public String getReqSeqArr() {
		return reqSeqArr;
	}
	public void setReqSeqArr(String reqSeqArr) {
		this.reqSeqArr = reqSeqArr;
	}
	public String getRoCntArr() {
		return roCntArr;
	}
	public void setRoCntArr(String roCntArr) {
		this.roCntArr = roCntArr;
	}
	public String getMemo1Arr() {
		return memo1Arr;
	}
	public void setMemo1Arr(String memo1Arr) {
		this.memo1Arr = memo1Arr;
	}
	public String getRoNoArr() {
		return roNoArr;
	}
	public void setRoNoArr(String roNoArr) {
		this.roNoArr = roNoArr;
	}
	public String getRoSeqArr() {
		return roSeqArr;
	}
	public void setRoSeqArr(String roSeqArr) {
		this.roSeqArr = roSeqArr;
	}
	public String getSalePriceArr() {
		return salePriceArr;
	}
	public void setSalePriceArr(String salePriceArr) {
		this.salePriceArr = salePriceArr;
	}
	public String getToOrderReqPlaceYNArr() {
		return toOrderReqPlaceYNArr;
	}
	public void setToOrderReqPlaceYNArr(String toOrderReqPlaceYNArr) {
		this.toOrderReqPlaceYNArr = toOrderReqPlaceYNArr;
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
		return "Ro [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg
				+ ", comCode=" + comCode + ", roNo=" + roNo + ", storageCode=" + storageCode + ", custCode=" + custCode
				+ ", roYmd=" + roYmd + ", memo1=" + memo1 + ", price=" + price + ", taxPrice=" + taxPrice
				+ ", sumPrice=" + sumPrice + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms
				+ ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", orderGroupId="
				+ orderGroupId + ", carNo=" + carNo + ", makerCode=" + makerCode + ", carType=" + carType + ", roWay="
				+ roWay + ", roMgr=" + roMgr + ", orderTypeName=" + orderTypeName + ", custMgrName=" + custMgrName
				+ ", custMgrPhone=" + custMgrPhone + ", vinNo=" + vinNo + ", odArr=" + odArr + ", odSeqArr=" + odSeqArr
				+ ", plArr=" + plArr + ", plSeqArr=" + plSeqArr + ", custName=" + custName + ", reqUserName="
				+ reqUserName + ", storageName=" + storageName + ", rackCode=" + rackCode + ", rackName=" + rackName
				+ ", branchCode=" + branchCode + ", placeCustCode=" + placeCustCode + ", placeCustName=" + placeCustName
				+ ", custRoNo=" + custRoNo + ", gvComCode=" + gvComCode + ", reqNoArr=" + reqNoArr + ", reqSeqArr="
				+ reqSeqArr + ", roCntArr=" + roCntArr + ", memo1Arr=" + memo1Arr + ", roNoArr=" + roNoArr
				+ ", roSeqArr=" + roSeqArr + ", salePriceArr=" + salePriceArr + ", toOrderReqPlaceYNArr="
				+ toOrderReqPlaceYNArr + ", gvComName=" + gvComName + ", doubleClickYN=" + doubleClickYN + "]";
	}
	
	
	
	
	  
}
