package kr.co.panclub.model;

import java.math.BigDecimal;

public class RiReqItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String riReqNo;
	private String reqSeq;
	private String rlNo;           // --출고번호
	private String rlSeq;           //   --출고순번
	private long itemId;           //  -- 품목ID,  
	private int cnt;           //  -- 수량
	private String memo1;           //  -- 메모1
	private String memo2;           // 
	private String regUserId;           // 
	private String regYmd;           // --등록일
	private String regHms;           //  --등록시
	private String uptUserId;           //  --수정자
	private String uptYmd;           // --수정일
	private String uptHms;           // --수정시
	
	private String odArr;   		// 2023.04.20 yoonsang 추가
	private String odSeqArr;		//  2023.04.20 yoonsang 추가

	private String rlArr;   
	private String seqArr;	       
	private String cntArr;	
	private String reqArr; 
	private String rseArr;
	private String mm1Arr; 
	private String mm2Arr;
	
	//2023.04.18 yoonsang 추가
	private String claimType;			//청구구분 보험/일반
	private String itemNo;				//품번
	private String itemName;			//품명
	private String itemNameEn;			//영문품명
	private int rlCnt;					//출고수량
	private int riReqCnt;				//반입요청수량
	private int riCnt;					//실제반입수량
	private BigDecimal salePrice;		//판매단가
	private BigDecimal sumPrice;		//합계
	private String placeCustCode;		//발주처코드
	private String placeCustName;		//발주처명
	private String storageCode;			//사용창고코드
	private String storageName;			//사용창고명
	private String orderGroupId;		//주문그룹ID
	private String riNo;				//반입번호
	
	private String orderNo;				//주문번호
	private String orderSeq;				//주문순번
	 
	private String gvComCode;				//230921 yoonsang

	private String consignStorYN;       //출고창고가 위탁창고인지 여부 2023.09.21 

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

	public String getRiReqNo() {
		return riReqNo;
	}

	public void setRiReqNo(String riReqNo) {
		this.riReqNo = riReqNo;
	}

	public String getReqSeq() {
		return reqSeq;
	}

	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
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

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
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

	public String getRlArr() {
		return rlArr;
	}

	public void setRlArr(String rlArr) {
		this.rlArr = rlArr;
	}

	public String getSeqArr() {
		return seqArr;
	}

	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}

	public String getCntArr() {
		return cntArr;
	}

	public void setCntArr(String cntArr) {
		this.cntArr = cntArr;
	}

	public String getReqArr() {
		return reqArr;
	}

	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}

	public String getRseArr() {
		return rseArr;
	}

	public void setRseArr(String rseArr) {
		this.rseArr = rseArr;
	}

	public String getMm1Arr() {
		return mm1Arr;
	}

	public void setMm1Arr(String mm1Arr) {
		this.mm1Arr = mm1Arr;
	}

	public String getMm2Arr() {
		return mm2Arr;
	}

	public void setMm2Arr(String mm2Arr) {
		this.mm2Arr = mm2Arr;
	}

	public String getClaimType() {
		return claimType;
	}

	public void setClaimType(String claimType) {
		this.claimType = claimType;
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

	public int getRlCnt() {
		return rlCnt;
	}

	public void setRlCnt(int rlCnt) {
		this.rlCnt = rlCnt;
	}

	public int getRiReqCnt() {
		return riReqCnt;
	}

	public void setRiReqCnt(int riReqCnt) {
		this.riReqCnt = riReqCnt;
	}

	public int getRiCnt() {
		return riCnt;
	}

	public void setRiCnt(int riCnt) {
		this.riCnt = riCnt;
	}

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public BigDecimal getSumPrice() {
		return sumPrice;
	}

	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
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

	public String getStorageCode() {
		return storageCode;
	}

	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}

	public String getRiNo() {
		return riNo;
	}

	public void setRiNo(String riNo) {
		this.riNo = riNo;
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

	public String getGvComCode() {
		return gvComCode;
	}

	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}

	public String getConsignStorYN() {
		return consignStorYN;
	}

	public void setConsignStorYN(String consignStorYN) {
		this.consignStorYN = consignStorYN;
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
		return "RiReqItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", riReqNo=" + riReqNo + ", reqSeq=" + reqSeq + ", rlNo="
				+ rlNo + ", rlSeq=" + rlSeq + ", itemId=" + itemId + ", cnt=" + cnt + ", memo1=" + memo1 + ", memo2="
				+ memo2 + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId="
				+ uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", odArr=" + odArr + ", odSeqArr="
				+ odSeqArr + ", rlArr=" + rlArr + ", seqArr=" + seqArr + ", cntArr=" + cntArr + ", reqArr=" + reqArr
				+ ", rseArr=" + rseArr + ", mm1Arr=" + mm1Arr + ", mm2Arr=" + mm2Arr + ", claimType=" + claimType
				+ ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", rlCnt=" + rlCnt
				+ ", riReqCnt=" + riReqCnt + ", riCnt=" + riCnt + ", salePrice=" + salePrice + ", sumPrice=" + sumPrice
				+ ", placeCustCode=" + placeCustCode + ", placeCustName=" + placeCustName + ", storageCode="
				+ storageCode + ", storageName=" + storageName + ", orderGroupId=" + orderGroupId + ", riNo=" + riNo
				+ ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", gvComCode=" + gvComCode + ", consignStorYN="
				+ consignStorYN + ", makerName=" + makerName + ", className=" + className + ", factoryNo=" + factoryNo
				+ "]";
	}

	
	
	
	
}
