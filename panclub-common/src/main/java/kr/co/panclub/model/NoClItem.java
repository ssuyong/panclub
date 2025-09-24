package kr.co.panclub.model;

import java.math.BigDecimal;

public class NoClItem {

	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String orderGroupId;
	private String orderNo;
	private String orderSeq;
	private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private String regUserId;	
	private String regYmd;
	private String regHms;
	private String uptUserId;
	private String uptYmd;
	private String uptHms;
	private int cnt;
	private BigDecimal unitPrice;
	private BigDecimal salePrice;
	private BigDecimal sumPrice;
	private String memo;
	private String placeCustCode;
	private String placeCustName;
	private BigDecimal placeUnitPrice;
	private BigDecimal supplyUnitPrice;
	private BigDecimal supplyPrice;
	private BigDecimal importPrice;
	private String estiNo;
	private String estiSeq;
	
	private String releaseReqYmd;   //출고요청일
	private String clType;   //보험/청구
	private String makerName;    //완선차코드
	private String storageMoveReqStatus;   //창고이동상태
	private String placeReqStatus;   //발주요청
	private String releaseReqStaus;  //출고요청
	private String reinStatus;//반입요청
	private String reoutStatus;//반출요청
	private int realReleaseCnt;//실제출고수량
	private int stockReqCnt;//창고요청수량
	private int stockUseCnt;//창고사용수량
	private int placeCnt;//발주수량
	private int reinCnt;//반입수량
	private int reoutCnt;//반출수량
	private int finalCnt;//최종수량
	
	private String storageCode; //창고사용
	private String storageName;
	
	private String rlYmd;
	private String rlNo;
	private String rlSeq;
	
	private String riYmd;
	private String riNo;
	private String riSeq;
	
	private String orderCnt;  //주문수량
	private int whStockCnt;  // 재고(창고보유수량) 2023.03.27 hsg
	
	private String storUseReqStatus; // 창고사용요청 상태. 2023.03.29 hsg
	
	private String availableCnt;  // 발주가능수량 (주문수량-발주요청수량-재고사용수량) 2023.03.31 yoonsang
	private String availableRlCnt;  // 출고가능수량 (주문수량-출고요청수량) 2023.04.12 yoonsang
	private String availableRiCnt;  // 반입가능수량 (출고수량-반입요청수량) 2023.04.20 yoonsang
	private String availableRoCnt;  // 반출가능수량 (발주수량-반출요청수량) 2023.04.21 yoonsang

	//2023.03.31 hsg 요청수량 :요청상태를 요청수량으로변환위해
	private int storMvReqCnt;   //창고이동
	private int plReqCnt;   //발주요청
	private int rlReqCnt;  //출고요청
	private int riCnt;//반입요청
	private int roCnt;//반출요청
	
	//청구요청/청구여부 : 주문그룹에서 청구요청 중복안되게 용도
	private String clReqYN;  //청구요청여부
	private String clYN;  //청구여부
	
	private String riReqNo;  //2023.04.17 yoonsang 반입요청번호
	private String roReqNo;  //2023.04.19 yoonsang 반출요청번호
	
	private String placeNo;  //2023.04.20 yoonsang 발주번호
	private String placeSeq;  //2023.04.20 yoonsang 발주순번
	
	private int workableQty;  //2023.05.02 hsg 판매가능수량

	private String custCode; //납품처20230509 bk
	private String custName; //납품처명 20230509 bk
	private String carNo; //차량번호 20230509 bk
	private String regUserName; // 20230509 bk
	private String makerCode; // 20230509 bk
	private String carType; // 20230509 bk
	
	private int rlCnt;// 출고수량 20230511 yoonsang

	private String clReqChkYN;  //청구진행여부 20230518 yoonsag 

	private String minusClYN;  //일반에서보험청구전환시 이용(-세금계산서위함) 20230616 yoonsang

	private String noClType;   // 출고/반입 구분. 2023.06.19
	
	private String branchCode;   // 2023.06.30 bk 지점
	
	private String srCode;   //2023.12.05 영업담당 hsg
	
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

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
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

	public String getItemNameEn() {
		return itemNameEn;
	}

	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
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

	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
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

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
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

	public BigDecimal getPlaceUnitPrice() {
		return placeUnitPrice;
	}

	public void setPlaceUnitPrice(BigDecimal placeUnitPrice) {
		this.placeUnitPrice = placeUnitPrice;
	}

	public BigDecimal getSupplyUnitPrice() {
		return supplyUnitPrice;
	}

	public void setSupplyUnitPrice(BigDecimal supplyUnitPrice) {
		this.supplyUnitPrice = supplyUnitPrice;
	}

	public BigDecimal getSupplyPrice() {
		return supplyPrice;
	}

	public void setSupplyPrice(BigDecimal supplyPrice) {
		this.supplyPrice = supplyPrice;
	}

	public BigDecimal getImportPrice() {
		return importPrice;
	}

	public void setImportPrice(BigDecimal importPrice) {
		this.importPrice = importPrice;
	}

	public String getEstiNo() {
		return estiNo;
	}

	public void setEstiNo(String estiNo) {
		this.estiNo = estiNo;
	}

	public String getEstiSeq() {
		return estiSeq;
	}

	public void setEstiSeq(String estiSeq) {
		this.estiSeq = estiSeq;
	}

	public String getReleaseReqYmd() {
		return releaseReqYmd;
	}

	public void setReleaseReqYmd(String releaseReqYmd) {
		this.releaseReqYmd = releaseReqYmd;
	}

	public String getClType() {
		return clType;
	}

	public void setClType(String clType) {
		this.clType = clType;
	}

	public String getMakerName() {
		return makerName;
	}

	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}

	public String getStorageMoveReqStatus() {
		return storageMoveReqStatus;
	}

	public void setStorageMoveReqStatus(String storageMoveReqStatus) {
		this.storageMoveReqStatus = storageMoveReqStatus;
	}

	public String getPlaceReqStatus() {
		return placeReqStatus;
	}

	public void setPlaceReqStatus(String placeReqStatus) {
		this.placeReqStatus = placeReqStatus;
	}

	public String getReleaseReqStaus() {
		return releaseReqStaus;
	}

	public void setReleaseReqStaus(String releaseReqStaus) {
		this.releaseReqStaus = releaseReqStaus;
	}

	public String getReinStatus() {
		return reinStatus;
	}

	public void setReinStatus(String reinStatus) {
		this.reinStatus = reinStatus;
	}

	public String getReoutStatus() {
		return reoutStatus;
	}

	public void setReoutStatus(String reoutStatus) {
		this.reoutStatus = reoutStatus;
	}

	public int getRealReleaseCnt() {
		return realReleaseCnt;
	}

	public void setRealReleaseCnt(int realReleaseCnt) {
		this.realReleaseCnt = realReleaseCnt;
	}

	public int getStockReqCnt() {
		return stockReqCnt;
	}

	public void setStockReqCnt(int stockReqCnt) {
		this.stockReqCnt = stockReqCnt;
	}

	public int getStockUseCnt() {
		return stockUseCnt;
	}

	public void setStockUseCnt(int stockUseCnt) {
		this.stockUseCnt = stockUseCnt;
	}

	public int getPlaceCnt() {
		return placeCnt;
	}

	public void setPlaceCnt(int placeCnt) {
		this.placeCnt = placeCnt;
	}

	public int getReinCnt() {
		return reinCnt;
	}

	public void setReinCnt(int reinCnt) {
		this.reinCnt = reinCnt;
	}

	public int getReoutCnt() {
		return reoutCnt;
	}

	public void setReoutCnt(int reoutCnt) {
		this.reoutCnt = reoutCnt;
	}

	public int getFinalCnt() {
		return finalCnt;
	}

	public void setFinalCnt(int finalCnt) {
		this.finalCnt = finalCnt;
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

	public String getRlYmd() {
		return rlYmd;
	}

	public void setRlYmd(String rlYmd) {
		this.rlYmd = rlYmd;
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

	public String getRiYmd() {
		return riYmd;
	}

	public void setRiYmd(String riYmd) {
		this.riYmd = riYmd;
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

	public String getOrderCnt() {
		return orderCnt;
	}

	public void setOrderCnt(String orderCnt) {
		this.orderCnt = orderCnt;
	}

	public int getWhStockCnt() {
		return whStockCnt;
	}

	public void setWhStockCnt(int whStockCnt) {
		this.whStockCnt = whStockCnt;
	}

	public String getStorUseReqStatus() {
		return storUseReqStatus;
	}

	public void setStorUseReqStatus(String storUseReqStatus) {
		this.storUseReqStatus = storUseReqStatus;
	}

	public String getAvailableCnt() {
		return availableCnt;
	}

	public void setAvailableCnt(String availableCnt) {
		this.availableCnt = availableCnt;
	}

	public String getAvailableRlCnt() {
		return availableRlCnt;
	}

	public void setAvailableRlCnt(String availableRlCnt) {
		this.availableRlCnt = availableRlCnt;
	}

	public String getAvailableRiCnt() {
		return availableRiCnt;
	}

	public void setAvailableRiCnt(String availableRiCnt) {
		this.availableRiCnt = availableRiCnt;
	}

	public String getAvailableRoCnt() {
		return availableRoCnt;
	}

	public void setAvailableRoCnt(String availableRoCnt) {
		this.availableRoCnt = availableRoCnt;
	}

	public int getStorMvReqCnt() {
		return storMvReqCnt;
	}

	public void setStorMvReqCnt(int storMvReqCnt) {
		this.storMvReqCnt = storMvReqCnt;
	}

	public int getPlReqCnt() {
		return plReqCnt;
	}

	public void setPlReqCnt(int plReqCnt) {
		this.plReqCnt = plReqCnt;
	}

	public int getRlReqCnt() {
		return rlReqCnt;
	}

	public void setRlReqCnt(int rlReqCnt) {
		this.rlReqCnt = rlReqCnt;
	}

	public int getRiCnt() {
		return riCnt;
	}

	public void setRiCnt(int riCnt) {
		this.riCnt = riCnt;
	}

	public int getRoCnt() {
		return roCnt;
	}

	public void setRoCnt(int roCnt) {
		this.roCnt = roCnt;
	}

	public String getClReqYN() {
		return clReqYN;
	}

	public void setClReqYN(String clReqYN) {
		this.clReqYN = clReqYN;
	}

	public String getClYN() {
		return clYN;
	}

	public void setClYN(String clYN) {
		this.clYN = clYN;
	}

	public String getRiReqNo() {
		return riReqNo;
	}

	public void setRiReqNo(String riReqNo) {
		this.riReqNo = riReqNo;
	}

	public String getRoReqNo() {
		return roReqNo;
	}

	public void setRoReqNo(String roReqNo) {
		this.roReqNo = roReqNo;
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

	public int getWorkableQty() {
		return workableQty;
	}

	public void setWorkableQty(int workableQty) {
		this.workableQty = workableQty;
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

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getRegUserName() {
		return regUserName;
	}

	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
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

	public int getRlCnt() {
		return rlCnt;
	}

	public void setRlCnt(int rlCnt) {
		this.rlCnt = rlCnt;
	}

	public String getClReqChkYN() {
		return clReqChkYN;
	}

	public void setClReqChkYN(String clReqChkYN) {
		this.clReqChkYN = clReqChkYN;
	}

	public String getMinusClYN() {
		return minusClYN;
	}

	public void setMinusClYN(String minusClYN) {
		this.minusClYN = minusClYN;
	}

	public String getNoClType() {
		return noClType;
	}

	public void setNoClType(String noClType) {
		this.noClType = noClType;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getSrCode() {
		return srCode;
	}

	public void setSrCode(String srCode) {
		this.srCode = srCode;
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
		return "NoClItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", orderGroupId=" + orderGroupId + ", orderNo=" + orderNo
				+ ", orderSeq=" + orderSeq + ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName=" + itemName
				+ ", itemNameEn=" + itemNameEn + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms="
				+ regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", cnt=" + cnt
				+ ", unitPrice=" + unitPrice + ", salePrice=" + salePrice + ", sumPrice=" + sumPrice + ", memo=" + memo
				+ ", placeCustCode=" + placeCustCode + ", placeCustName=" + placeCustName + ", placeUnitPrice="
				+ placeUnitPrice + ", supplyUnitPrice=" + supplyUnitPrice + ", supplyPrice=" + supplyPrice
				+ ", importPrice=" + importPrice + ", estiNo=" + estiNo + ", estiSeq=" + estiSeq + ", releaseReqYmd="
				+ releaseReqYmd + ", clType=" + clType + ", makerName=" + makerName + ", storageMoveReqStatus="
				+ storageMoveReqStatus + ", placeReqStatus=" + placeReqStatus + ", releaseReqStaus=" + releaseReqStaus
				+ ", reinStatus=" + reinStatus + ", reoutStatus=" + reoutStatus + ", realReleaseCnt=" + realReleaseCnt
				+ ", stockReqCnt=" + stockReqCnt + ", stockUseCnt=" + stockUseCnt + ", placeCnt=" + placeCnt
				+ ", reinCnt=" + reinCnt + ", reoutCnt=" + reoutCnt + ", finalCnt=" + finalCnt + ", storageCode="
				+ storageCode + ", storageName=" + storageName + ", rlYmd=" + rlYmd + ", rlNo=" + rlNo + ", rlSeq="
				+ rlSeq + ", riYmd=" + riYmd + ", riNo=" + riNo + ", riSeq=" + riSeq + ", orderCnt=" + orderCnt
				+ ", whStockCnt=" + whStockCnt + ", storUseReqStatus=" + storUseReqStatus + ", availableCnt="
				+ availableCnt + ", availableRlCnt=" + availableRlCnt + ", availableRiCnt=" + availableRiCnt
				+ ", availableRoCnt=" + availableRoCnt + ", storMvReqCnt=" + storMvReqCnt + ", plReqCnt=" + plReqCnt
				+ ", rlReqCnt=" + rlReqCnt + ", riCnt=" + riCnt + ", roCnt=" + roCnt + ", clReqYN=" + clReqYN
				+ ", clYN=" + clYN + ", riReqNo=" + riReqNo + ", roReqNo=" + roReqNo + ", placeNo=" + placeNo
				+ ", placeSeq=" + placeSeq + ", workableQty=" + workableQty + ", custCode=" + custCode + ", custName="
				+ custName + ", carNo=" + carNo + ", regUserName=" + regUserName + ", makerCode=" + makerCode
				+ ", carType=" + carType + ", rlCnt=" + rlCnt + ", clReqChkYN=" + clReqChkYN + ", minusClYN="
				+ minusClYN + ", noClType=" + noClType + ", branchCode=" + branchCode + ", srCode=" + srCode
				+ ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}

	
}
