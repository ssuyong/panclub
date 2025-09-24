package kr.co.panclub.model;

import java.math.BigDecimal;

public class RlReq {
	
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;             //
	private String rlReqNo;             //  --발주번호
	private String storageCode;             // -- 창고코드
	private String custCode;             //--구매처처코드
	private String dmdYmd;             // --출고요청일
	private String dmdTime;             // --요청시간
	private String custOrderNo;             // --구매처주문번호
	private String rlMgr;             // --출고담당
	private String memo1;             //--비고1
	private String lastPickParts;             // -- 최종픽업부품
	private String rlWay;             //  --출고방법
	private String regUserId;             //--등록자
	private String regUserName;             //--등록자
	private String regYmd;             //--등록일
	private String regHms;             // --등록시
	private String uptUserId;             // --수정자
	private String uptYmd;             //--수정일
	private String uptHms;             //--수정시	
	private String orderGroupId;

	private String saleCustCode;		//판매처코드
	private String saleCustName;		//판매처코드
	private String carNo;				//차량정보
	private String vinNo;				//차량정보
	private String procStatus;			//처리상태
	private String orderTypeName;		//판매구분
	private String makerCode;				//제조사
	private String carType;				//차종
	private String custMgrName;				//담당자
	private String custMgrPhone;				//담단자전화	
	
	//2023.05.20 hsg
	private String storageName;
	private String rackCode;
	private String rackName;
	//2023.06.30 bk
	private String branchCode;
	
	private String stdClType; //2023.07.05 청구구분 yoonsang

	private BigDecimal rlSumPrice; //2023.07.07 bk 공급가액
	private BigDecimal rlTaxPrice; //2023.07.07 bk 세액
	private BigDecimal rlSumPriceTax; //2023.07.07 bk 합계금액
	
	private String printCnt;//2023.07.07 프린트 횟
	private String printUser;//2023.07.07

	private String pcYN;//2023.08.28 주문연동여부
	private String rcvCustName;//2023.08.28 주문연동업체 납품처
	
	private int cnt;  //2023.08.31 수량. 미출고수량에서 사용하기위한 용도. 다른데 쓸경우 범용적으로 쓰기 위해 cnt로 명명
	private String custName;
	
	private String gvComCode;	// 2023.09.14 yoonsang
	private String colorCode;	// 2023.10.06 bk 컬러코드
	
	private String supplyCustCode; //20231013
	private String supplyCustName; //20231013
	private String supplyMgrName; //20231013 
	private String supplyMgrPhone; //20231013 
	
	private String gvComName;
	
	private String comName;
	
	private String doubleClickYN;
	
	private int itemQty; // 2024.07.05 supi pda에서 출고조회시 출고 디테일 수 표시용도

	private String isAccept; // 2024.07.10 supi 출고요청 접수여부
	
	private String pcReqDeliWay; //20240827 yoonsang 수령방법(주문에서 넘어온 것)
	private String receiverAddr1; //20240827 yoonsang 받는 주소(주문에서 넘어온)
	
	private String pcReqYN; //20240827 yoonsang 그린파츠 주문 여부
	private String receiverCustName; //20240827 yoonsang 수령회상명
	private String receiverName; //20240827 yoonsang 수령받는사람명
	private String receiverTel; //20240827 yoonsang 수령받는연락처
	
	private String senderCustName;      //20240903 yoonsang 보내는 거래처명
	private String senderName;          //20240903 yoonsang 보내는 사람
	private String senderTel;           //20240903 yoonsang 보내는 사람전화
	private String senderAddr1;			//20240903 yoonsang 보내는 사람주소
	
	private String deliPayType;         //20240903 yoonsang 비용지불방식. 선불,후불

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

	public String getRlReqNo() {
		return rlReqNo;
	}

	public void setRlReqNo(String rlReqNo) {
		this.rlReqNo = rlReqNo;
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

	public String getDmdYmd() {
		return dmdYmd;
	}

	public void setDmdYmd(String dmdYmd) {
		this.dmdYmd = dmdYmd;
	}

	public String getDmdTime() {
		return dmdTime;
	}

	public void setDmdTime(String dmdTime) {
		this.dmdTime = dmdTime;
	}

	public String getCustOrderNo() {
		return custOrderNo;
	}

	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
	}

	public String getRlMgr() {
		return rlMgr;
	}

	public void setRlMgr(String rlMgr) {
		this.rlMgr = rlMgr;
	}

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public String getLastPickParts() {
		return lastPickParts;
	}

	public void setLastPickParts(String lastPickParts) {
		this.lastPickParts = lastPickParts;
	}

	public String getRlWay() {
		return rlWay;
	}

	public void setRlWay(String rlWay) {
		this.rlWay = rlWay;
	}

	public String getRegUserId() {
		return regUserId;
	}

	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}

	public String getRegUserName() {
		return regUserName;
	}

	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
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

	public String getSaleCustCode() {
		return saleCustCode;
	}

	public void setSaleCustCode(String saleCustCode) {
		this.saleCustCode = saleCustCode;
	}

	public String getSaleCustName() {
		return saleCustName;
	}

	public void setSaleCustName(String saleCustName) {
		this.saleCustName = saleCustName;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getVinNo() {
		return vinNo;
	}

	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}

	public String getProcStatus() {
		return procStatus;
	}

	public void setProcStatus(String procStatus) {
		this.procStatus = procStatus;
	}

	public String getOrderTypeName() {
		return orderTypeName;
	}

	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
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

	public String getStdClType() {
		return stdClType;
	}

	public void setStdClType(String stdClType) {
		this.stdClType = stdClType;
	}

	public BigDecimal getRlSumPrice() {
		return rlSumPrice;
	}

	public void setRlSumPrice(BigDecimal rlSumPrice) {
		this.rlSumPrice = rlSumPrice;
	}

	public BigDecimal getRlTaxPrice() {
		return rlTaxPrice;
	}

	public void setRlTaxPrice(BigDecimal rlTaxPrice) {
		this.rlTaxPrice = rlTaxPrice;
	}

	public BigDecimal getRlSumPriceTax() {
		return rlSumPriceTax;
	}

	public void setRlSumPriceTax(BigDecimal rlSumPriceTax) {
		this.rlSumPriceTax = rlSumPriceTax;
	}

	public String getPrintCnt() {
		return printCnt;
	}

	public void setPrintCnt(String printCnt) {
		this.printCnt = printCnt;
	}

	public String getPrintUser() {
		return printUser;
	}

	public void setPrintUser(String printUser) {
		this.printUser = printUser;
	}

	public String getPcYN() {
		return pcYN;
	}

	public void setPcYN(String pcYN) {
		this.pcYN = pcYN;
	}

	public String getRcvCustName() {
		return rcvCustName;
	}

	public void setRcvCustName(String rcvCustName) {
		this.rcvCustName = rcvCustName;
	}

	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getGvComCode() {
		return gvComCode;
	}

	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}

	public String getColorCode() {
		return colorCode;
	}

	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
	}

	public String getSupplyCustCode() {
		return supplyCustCode;
	}

	public void setSupplyCustCode(String supplyCustCode) {
		this.supplyCustCode = supplyCustCode;
	}

	public String getSupplyCustName() {
		return supplyCustName;
	}

	public void setSupplyCustName(String supplyCustName) {
		this.supplyCustName = supplyCustName;
	}

	public String getSupplyMgrName() {
		return supplyMgrName;
	}

	public void setSupplyMgrName(String supplyMgrName) {
		this.supplyMgrName = supplyMgrName;
	}

	public String getSupplyMgrPhone() {
		return supplyMgrPhone;
	}

	public void setSupplyMgrPhone(String supplyMgrPhone) {
		this.supplyMgrPhone = supplyMgrPhone;
	}

	public String getGvComName() {
		return gvComName;
	}

	public void setGvComName(String gvComName) {
		this.gvComName = gvComName;
	}

	public String getComName() {
		return comName;
	}

	public void setComName(String comName) {
		this.comName = comName;
	}

	public String getDoubleClickYN() {
		return doubleClickYN;
	}

	public void setDoubleClickYN(String doubleClickYN) {
		this.doubleClickYN = doubleClickYN;
	}

	public int getItemQty() {
		return itemQty;
	}

	public void setItemQty(int itemQty) {
		this.itemQty = itemQty;
	}

	public String getIsAccept() {
		return isAccept;
	}

	public void setIsAccept(String isAccept) {
		this.isAccept = isAccept;
	}

	public String getPcReqDeliWay() {
		return pcReqDeliWay;
	}

	public void setPcReqDeliWay(String pcReqDeliWay) {
		this.pcReqDeliWay = pcReqDeliWay;
	}

	public String getReceiverAddr1() {
		return receiverAddr1;
	}

	public void setReceiverAddr1(String receiverAddr1) {
		this.receiverAddr1 = receiverAddr1;
	}

	public String getPcReqYN() {
		return pcReqYN;
	}

	public void setPcReqYN(String pcReqYN) {
		this.pcReqYN = pcReqYN;
	}

	public String getReceiverCustName() {
		return receiverCustName;
	}

	public void setReceiverCustName(String receiverCustName) {
		this.receiverCustName = receiverCustName;
	}

	public String getReceiverName() {
		return receiverName;
	}

	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}

	public String getReceiverTel() {
		return receiverTel;
	}

	public void setReceiverTel(String receiverTel) {
		this.receiverTel = receiverTel;
	}

	public String getSenderCustName() {
		return senderCustName;
	}

	public void setSenderCustName(String senderCustName) {
		this.senderCustName = senderCustName;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getSenderTel() {
		return senderTel;
	}

	public void setSenderTel(String senderTel) {
		this.senderTel = senderTel;
	}

	public String getSenderAddr1() {
		return senderAddr1;
	}

	public void setSenderAddr1(String senderAddr1) {
		this.senderAddr1 = senderAddr1;
	}

	public String getDeliPayType() {
		return deliPayType;
	}

	public void setDeliPayType(String deliPayType) {
		this.deliPayType = deliPayType;
	}

	@Override
	public String toString() {
		return "RlReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", rlReqNo=" + rlReqNo + ", storageCode=" + storageCode
				+ ", custCode=" + custCode + ", dmdYmd=" + dmdYmd + ", dmdTime=" + dmdTime + ", custOrderNo="
				+ custOrderNo + ", rlMgr=" + rlMgr + ", memo1=" + memo1 + ", lastPickParts=" + lastPickParts
				+ ", rlWay=" + rlWay + ", regUserId=" + regUserId + ", regUserName=" + regUserName + ", regYmd="
				+ regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms="
				+ uptHms + ", orderGroupId=" + orderGroupId + ", saleCustCode=" + saleCustCode + ", saleCustName="
				+ saleCustName + ", carNo=" + carNo + ", vinNo=" + vinNo + ", procStatus=" + procStatus
				+ ", orderTypeName=" + orderTypeName + ", makerCode=" + makerCode + ", carType=" + carType
				+ ", custMgrName=" + custMgrName + ", custMgrPhone=" + custMgrPhone + ", storageName=" + storageName
				+ ", rackCode=" + rackCode + ", rackName=" + rackName + ", branchCode=" + branchCode + ", stdClType="
				+ stdClType + ", rlSumPrice=" + rlSumPrice + ", rlTaxPrice=" + rlTaxPrice + ", rlSumPriceTax="
				+ rlSumPriceTax + ", printCnt=" + printCnt + ", printUser=" + printUser + ", pcYN=" + pcYN
				+ ", rcvCustName=" + rcvCustName + ", cnt=" + cnt + ", custName=" + custName + ", gvComCode="
				+ gvComCode + ", colorCode=" + colorCode + ", supplyCustCode=" + supplyCustCode + ", supplyCustName="
				+ supplyCustName + ", supplyMgrName=" + supplyMgrName + ", supplyMgrPhone=" + supplyMgrPhone
				+ ", gvComName=" + gvComName + ", comName=" + comName + ", doubleClickYN=" + doubleClickYN
				+ ", itemQty=" + itemQty + ", isAccept=" + isAccept + ", pcReqDeliWay=" + pcReqDeliWay
				+ ", receiverAddr1=" + receiverAddr1 + ", pcReqYN=" + pcReqYN + ", receiverCustName=" + receiverCustName
				+ ", receiverName=" + receiverName + ", receiverTel=" + receiverTel + ", senderCustName="
				+ senderCustName + ", senderName=" + senderName + ", senderTel=" + senderTel + ", senderAddr1="
				+ senderAddr1 + ", deliPayType=" + deliPayType + "]";
	}
	
	
	
}
