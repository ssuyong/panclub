package kr.co.panclub.model;

import java.math.BigDecimal;

public class RoReqItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String roNo;
	private String roSeq;
	private String roReqNo;
	private String reqSeq;
	private String riNo;           // --출고번호
	private String riSeq;           //  --출고순번
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
	
	private String plArr;   		//2023.04.21 yoonsang 키사용하기위해 추가
	private String plSeqArr;   		//2023.04.21 yoonsang 키사용하기위해 추가
	private String riArr;   
	private String seqArr;	       
	private String cntArr;	
	private String reqArr; 
	private String rseArr;
	private String mm1Arr; 
	private String mm2Arr;
	
	private String odArr;				//2023.04.20 yoonsang 반입대신 주문
	private String odSeqArr;
	
	//2023.04.18 yoonsang 추가
	private String claimType;			//청구구분 보험/일반
	private String itemNo;				//품번
	private String itemName;			//품명
	private String itemNameEn;			//영문품명
	private int riCnt;					//반입수량
	private int roReqCnt;				//반출요청수량
	private int roCnt;					//실제반출수량
	private BigDecimal salePrice;		//반출단가(입고단가로수정해야할듯 sale을)
	private BigDecimal sumPrice;		//합계
	private String placeCustCode;		//발주처코드
	private String placeCustName;		//발주처명
	private String storageCode;			//사용창고코드
	private String storageName;			//사용창고명
	private String orderGroupId;		//주문그룹ID
	private String orderNo;		//주문번호
	private String orderSeq;		//주문순번
	private String placeNo;		//발주번호
	private String placeSeq;		//발주순번
	private int placeCnt;		//발주수량
	
	private int rlStandByQty;          // 2023.05.20 hsg  --출고대기수량
	private String rlStandByRackCode;
	private String rlStandByRackName;
	private String rlStandByStorCode;
	private String rlStandByStorName;
	
	private String toOrderReqPlaceYN;
	private String toOrderReqPlaceYNArr;
	
	private String gvComCode;
	private String gvComName;
	
	private String orderReqPlaceCustCode;
	private String orderReqPlaceCustName;
	
	private String printRoCustCode;
	private String printRoCustName;
	
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
	public String getRoNo() {
		return roNo;
	}
	public void setRoNo(String roNo) {
		this.roNo = roNo;
	}
	public String getRoSeq() {
		return roSeq;
	}
	public void setRoSeq(String roSeq) {
		this.roSeq = roSeq;
	}
	public String getRoReqNo() {
		return roReqNo;
	}
	public void setRoReqNo(String roReqNo) {
		this.roReqNo = roReqNo;
	}
	public String getReqSeq() {
		return reqSeq;
	}
	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
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
	public String getRiArr() {
		return riArr;
	}
	public void setRiArr(String riArr) {
		this.riArr = riArr;
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
	public int getRiCnt() {
		return riCnt;
	}
	public void setRiCnt(int riCnt) {
		this.riCnt = riCnt;
	}
	public int getRoReqCnt() {
		return roReqCnt;
	}
	public void setRoReqCnt(int roReqCnt) {
		this.roReqCnt = roReqCnt;
	}
	public int getRoCnt() {
		return roCnt;
	}
	public void setRoCnt(int roCnt) {
		this.roCnt = roCnt;
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
	public String getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(String placeNo) {
		this.placeNo = placeNo;
	}
	public String getPlaceSeq() {
		return placeSeq;
	}
	public void setPlaceSeq(String placeSeq) {
		this.placeSeq = placeSeq;
	}
	public int getPlaceCnt() {
		return placeCnt;
	}
	public void setPlaceCnt(int placeCnt) {
		this.placeCnt = placeCnt;
	}
	public int getRlStandByQty() {
		return rlStandByQty;
	}
	public void setRlStandByQty(int rlStandByQty) {
		this.rlStandByQty = rlStandByQty;
	}
	public String getRlStandByRackCode() {
		return rlStandByRackCode;
	}
	public void setRlStandByRackCode(String rlStandByRackCode) {
		this.rlStandByRackCode = rlStandByRackCode;
	}
	public String getRlStandByRackName() {
		return rlStandByRackName;
	}
	public void setRlStandByRackName(String rlStandByRackName) {
		this.rlStandByRackName = rlStandByRackName;
	}
	public String getRlStandByStorCode() {
		return rlStandByStorCode;
	}
	public void setRlStandByStorCode(String rlStandByStorCode) {
		this.rlStandByStorCode = rlStandByStorCode;
	}
	public String getRlStandByStorName() {
		return rlStandByStorName;
	}
	public void setRlStandByStorName(String rlStandByStorName) {
		this.rlStandByStorName = rlStandByStorName;
	}
	public String getToOrderReqPlaceYN() {
		return toOrderReqPlaceYN;
	}
	public void setToOrderReqPlaceYN(String toOrderReqPlaceYN) {
		this.toOrderReqPlaceYN = toOrderReqPlaceYN;
	}
	public String getToOrderReqPlaceYNArr() {
		return toOrderReqPlaceYNArr;
	}
	public void setToOrderReqPlaceYNArr(String toOrderReqPlaceYNArr) {
		this.toOrderReqPlaceYNArr = toOrderReqPlaceYNArr;
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
	public String getOrderReqPlaceCustCode() {
		return orderReqPlaceCustCode;
	}
	public void setOrderReqPlaceCustCode(String orderReqPlaceCustCode) {
		this.orderReqPlaceCustCode = orderReqPlaceCustCode;
	}
	public String getOrderReqPlaceCustName() {
		return orderReqPlaceCustName;
	}
	public void setOrderReqPlaceCustName(String orderReqPlaceCustName) {
		this.orderReqPlaceCustName = orderReqPlaceCustName;
	}
	public String getPrintRoCustCode() {
		return printRoCustCode;
	}
	public void setPrintRoCustCode(String printRoCustCode) {
		this.printRoCustCode = printRoCustCode;
	}
	public String getPrintRoCustName() {
		return printRoCustName;
	}
	public void setPrintRoCustName(String printRoCustName) {
		this.printRoCustName = printRoCustName;
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
		return "RoReqItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", roNo=" + roNo + ", roSeq=" + roSeq + ", roReqNo=" + roReqNo
				+ ", reqSeq=" + reqSeq + ", riNo=" + riNo + ", riSeq=" + riSeq + ", itemId=" + itemId + ", cnt=" + cnt
				+ ", memo1=" + memo1 + ", memo2=" + memo2 + ", regUserId=" + regUserId + ", regYmd=" + regYmd
				+ ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms
				+ ", plArr=" + plArr + ", plSeqArr=" + plSeqArr + ", riArr=" + riArr + ", seqArr=" + seqArr
				+ ", cntArr=" + cntArr + ", reqArr=" + reqArr + ", rseArr=" + rseArr + ", mm1Arr=" + mm1Arr
				+ ", mm2Arr=" + mm2Arr + ", odArr=" + odArr + ", odSeqArr=" + odSeqArr + ", claimType=" + claimType
				+ ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", riCnt=" + riCnt
				+ ", roReqCnt=" + roReqCnt + ", roCnt=" + roCnt + ", salePrice=" + salePrice + ", sumPrice=" + sumPrice
				+ ", placeCustCode=" + placeCustCode + ", placeCustName=" + placeCustName + ", storageCode="
				+ storageCode + ", storageName=" + storageName + ", orderGroupId=" + orderGroupId + ", orderNo="
				+ orderNo + ", orderSeq=" + orderSeq + ", placeNo=" + placeNo + ", placeSeq=" + placeSeq + ", placeCnt="
				+ placeCnt + ", rlStandByQty=" + rlStandByQty + ", rlStandByRackCode=" + rlStandByRackCode
				+ ", rlStandByRackName=" + rlStandByRackName + ", rlStandByStorCode=" + rlStandByStorCode
				+ ", rlStandByStorName=" + rlStandByStorName + ", toOrderReqPlaceYN=" + toOrderReqPlaceYN
				+ ", toOrderReqPlaceYNArr=" + toOrderReqPlaceYNArr + ", gvComCode=" + gvComCode + ", gvComName="
				+ gvComName + ", orderReqPlaceCustCode=" + orderReqPlaceCustCode + ", orderReqPlaceCustName="
				+ orderReqPlaceCustName + ", printRoCustCode=" + printRoCustCode + ", printRoCustName="
				+ printRoCustName + ", makerName=" + makerName + ", className=" + className + ", factoryNo=" + factoryNo
				+ "]";
	}
	
	
}
