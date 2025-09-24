package kr.co.panclub.model;

public class RiItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String riNo;
	private String riSeq;
	private String riReqNo;          // -- 요청번호
	private String riReqSeq;          // --요청순번
	private long itemId;          // -- 품목ID,  
	private int riUnitPrice;          // --판매단가
	private int cnt;          // -- 수량
	private String memo1;          // -- 메모1
	private String memo2;          //
	private String regUserId;          //
	private String regYmd;          //--등록일
	private String regHms;          // --등록시
	private String uptUserId;          // --수정자
	private String uptYmd;          //--수정일
	private String uptHms;          //--수정시	
	
	private String odNoArr;		//2023.04.20 yoonsang 추가
	private String odSeqArr;		//2023.04.20 yoonsang 추가
	
	private String reqNoArr;
	private String reqSeqArr;
	private String storCdArr;
	private String memo1Arr;
	private String memo2Arr;
	
	private String riUnitPriceArr;
	private String riCntArr;
	private String riNoArr;
	private String riSeqArr;
	
	private String rlNo;
	private String rlSeq;
	
	private String orderGroupId;
	private String orderNo;
	private String orderSeq;
	
	private String custCode;
	private String storageCode;
	
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	
	private int reqCnt;						//2023.04.19 yoonsang 추가
	private String storageName;			
	private String placeCustCode;
	private String placeCustName;
	
	private String gvComCode; //20230921 yoonsang
	private String gvComName; //240313
	
	private String makerName;
	private String className;
	private String factoryNo;
	
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
	public String getRiSeq() {
		return riSeq;
	}
	public void setRiSeq(String riSeq) {
		this.riSeq = riSeq;
	}
	public String getRiReqNo() {
		return riReqNo;
	}
	public void setRiReqNo(String riReqNo) {
		this.riReqNo = riReqNo;
	}
	public String getRiReqSeq() {
		return riReqSeq;
	}
	public void setRiReqSeq(String riReqSeq) {
		this.riReqSeq = riReqSeq;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public int getRiUnitPrice() {
		return riUnitPrice;
	}
	public void setRiUnitPrice(int riUnitPrice) {
		this.riUnitPrice = riUnitPrice;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public String getMemo2() {
		return memo2;
	}
	public void setMemo2(String memo2) {
		this.memo2 = memo2;
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
	public String getOdNoArr() {
		return odNoArr;
	}
	public void setOdNoArr(String odNoArr) {
		this.odNoArr = odNoArr;
	}
	public String getOdSeqArr() {
		return odSeqArr;
	}
	public void setOdSeqArr(String odSeqArr) {
		this.odSeqArr = odSeqArr;
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
	public String getStorCdArr() {
		return storCdArr;
	}
	public void setStorCdArr(String storCdArr) {
		this.storCdArr = storCdArr;
	}
	public String getMemo1Arr() {
		return memo1Arr;
	}
	public void setMemo1Arr(String memo1Arr) {
		this.memo1Arr = memo1Arr;
	}
	public String getMemo2Arr() {
		return memo2Arr;
	}
	public void setMemo2Arr(String memo2Arr) {
		this.memo2Arr = memo2Arr;
	}
	public String getRiUnitPriceArr() {
		return riUnitPriceArr;
	}
	public void setRiUnitPriceArr(String riUnitPriceArr) {
		this.riUnitPriceArr = riUnitPriceArr;
	}
	public String getRiCntArr() {
		return riCntArr;
	}
	public void setRiCntArr(String riCntArr) {
		this.riCntArr = riCntArr;
	}
	public String getRiNoArr() {
		return riNoArr;
	}
	public void setRiNoArr(String riNoArr) {
		this.riNoArr = riNoArr;
	}
	public String getRiSeqArr() {
		return riSeqArr;
	}
	public void setRiSeqArr(String riSeqArr) {
		this.riSeqArr = riSeqArr;
	}
	public String getRlNo() {
		return rlNo;
	}
	public void setRlNo(String rlNo) {
		this.rlNo = rlNo;
	}
	public String getRlSeq() {
		return rlSeq;
	}
	public void setRlSeq(String rlSeq) {
		this.rlSeq = rlSeq;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getOrderSeq() {
		return orderSeq;
	}
	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
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
	public String getItemNameEn() {
		return itemNameEn;
	}
	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
	}
	public int getReqCnt() {
		return reqCnt;
	}
	public void setReqCnt(int reqCnt) {
		this.reqCnt = reqCnt;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
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
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	@Override
	public String toString() {
		return "RiItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", riNo=" + riNo + ", riSeq=" + riSeq + ", riReqNo=" + riReqNo
				+ ", riReqSeq=" + riReqSeq + ", itemId=" + itemId + ", riUnitPrice=" + riUnitPrice + ", cnt=" + cnt
				+ ", memo1=" + memo1 + ", memo2=" + memo2 + ", regUserId=" + regUserId + ", regYmd=" + regYmd
				+ ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms
				+ ", odNoArr=" + odNoArr + ", odSeqArr=" + odSeqArr + ", reqNoArr=" + reqNoArr + ", reqSeqArr="
				+ reqSeqArr + ", storCdArr=" + storCdArr + ", memo1Arr=" + memo1Arr + ", memo2Arr=" + memo2Arr
				+ ", riUnitPriceArr=" + riUnitPriceArr + ", riCntArr=" + riCntArr + ", riNoArr=" + riNoArr
				+ ", riSeqArr=" + riSeqArr + ", rlNo=" + rlNo + ", rlSeq=" + rlSeq + ", orderGroupId=" + orderGroupId
				+ ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", custCode=" + custCode + ", storageCode="
				+ storageCode + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn
				+ ", reqCnt=" + reqCnt + ", storageName=" + storageName + ", placeCustCode=" + placeCustCode
				+ ", placeCustName=" + placeCustName + ", gvComCode=" + gvComCode + ", gvComName=" + gvComName
				+ ", makerName=" + makerName + ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}
	
}
