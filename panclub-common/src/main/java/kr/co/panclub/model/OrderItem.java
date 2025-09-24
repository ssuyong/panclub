package kr.co.panclub.model;

import java.math.BigDecimal;

public class OrderItem {

	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	private String db_resultSeq;
	
	private String idx;
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
	private String useStorageCnt;
	
	private int dspNo;  //노출순서
	
	//청구유형 적용위해 추가. 2023.04.11 hsg
	private String orderArr;
	private String seqArr;
	private String clType;
	
	private BigDecimal costPrice;    //원가.  2023.04.17 hsg
	private BigDecimal centerPrice;  //센터가. 2023.04.21 hsg 
	
	//실제발주정보
	private String plCustCode;
	private String plCustName;
	private BigDecimal plUnitPrice;
	

	private String rlYmd; //출고일자 20230509 bk
	private String clReqYN; //청구여부 20230509 bk
	private String custCode; //납품처20230509 bk
	private String custName; //납품처명 20230509 bk
	
	private String dcExceptYN;   //할인제외 2023.05.13 hsg 
	
	private String minusClYN;   //청구전환(일반->보험 세금계산서 -처리하기위한 구분값) 2023.05.13 hsg 

	//2023.07.19 hsg -  주문품목내역에서 사용한 조회조건
	private String carNo;
	private String supplyCustCode;
	private String supplyCustName;
	private String branchCode;
	private String branchName;
	private String regUserName;
	private String makerCode;
	private String makerName;
	private String rlStatus; //출고상택 
	private int rlCnt;    //출고수량
	private String rlrStatus; //출고요청상택 2023.07.20 hsg
	private String rlrCnt; //출고요청수량  2023.07.20 hsg
	
	// 창고사용요청수량, 창고사용수량, 발주요청수량,발주수량,발주입고수량, 청구요청수량,청구수량, 반입요청수량,반입수량,반출요청수량,반출수량 2023.08.03 hsg
	private int suriCnt; 
	private int suiCnt; 
	private int plriCnt; 
	private int pliCnt; 
	private int whiCnt; 
	private int ririCnt; 
	private int riiCnt; 
	private int roriCnt; 
	private int roiCnt; 
	private int clriCnt; 
	private int cliCnt;
	
	private BigDecimal whUnitPrice;  //입고단가. 2023.08.03 hsg
	private String orderYmd;          //주문일.2023.08.03 hsg 

	private String pcReqNo;          //주문요청번호.2023.08.23 bk
	private String reqSeq;          //주문요청순번.2023.08.23 bk
	
	private String memo1;    //비고 2023.08.24 hsg

	private int ceilUnit;    //올림단위. 2023.08.29 hsg

	private String dlvType;    //배송유형 2023.09.01 bk
	
	private BigDecimal taxPrice;
	
	private int whStockCnt; // 주문그룹상세내역에서 노출되는것처럼 창고/보유,판매가능,회수가능,발주가능의 수량 노출
	private int workableQty;
	private int ctableQty;
	private int placeableQty;
	
	private String rcvlogisCode; // 수령물류센터 2024.03.04 supi
	private String orderReqPlaceCust; // 20240328 yoonsang 요청발주처
	
	private int saleRate; // 20240613 supi 품목별 브랜드 할인율 받아올떄 쓰는 변수 10일경우 10%
	private int curSaleRate; // 20240614 supi 현재 적용중인 할인율
	
	private int placeImportCnt; // 20240715 supi 수입품 수량 
	
	private int sirChkCnt;  // 20240722 supi 재고투입 처리수량
	private int sirCnt;     // 20240722 supi 재고투입 요청수량
	
	private String className; // 20240724 supi 구분, 공장번호
	private String factoryNo;
	
	private String clYN;		//20240912 yoonsang 추가
	private String clIgnYN;		//20240912 yoonsang 추가
	private String clIgnMemo1;		//20240912 yoonsang 추가
	private String clIgnMemo2;		//20240912 yoonsang 추가
	private String rlNo;		//20240912 yoonsang 추가
	private String rlSeq;		//20240912 yoonsang 추가
	private String carType;		//20240912 yoonsang 추가
	
	private String memo2;		//제외사유2 20240913 yoonsang 추가
	private String procUserName;		//처리자 20240913 yoonsang 추가
	
	private String otherSaleType;		//처리자 250513 yoonsang 추가 김용원재고 다른할인율적용

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

	public String getDb_resultSeq() {
		return db_resultSeq;
	}

	public void setDb_resultSeq(String db_resultSeq) {
		this.db_resultSeq = db_resultSeq;
	}

	public String getIdx() {
		return idx;
	}

	public void setIdx(String idx) {
		this.idx = idx;
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

	public String getUseStorageCnt() {
		return useStorageCnt;
	}

	public void setUseStorageCnt(String useStorageCnt) {
		this.useStorageCnt = useStorageCnt;
	}

	public int getDspNo() {
		return dspNo;
	}

	public void setDspNo(int dspNo) {
		this.dspNo = dspNo;
	}

	public String getOrderArr() {
		return orderArr;
	}

	public void setOrderArr(String orderArr) {
		this.orderArr = orderArr;
	}

	public String getSeqArr() {
		return seqArr;
	}

	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}

	public String getClType() {
		return clType;
	}

	public void setClType(String clType) {
		this.clType = clType;
	}

	public BigDecimal getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}

	public BigDecimal getCenterPrice() {
		return centerPrice;
	}

	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}

	public String getPlCustCode() {
		return plCustCode;
	}

	public void setPlCustCode(String plCustCode) {
		this.plCustCode = plCustCode;
	}

	public String getPlCustName() {
		return plCustName;
	}

	public void setPlCustName(String plCustName) {
		this.plCustName = plCustName;
	}

	public BigDecimal getPlUnitPrice() {
		return plUnitPrice;
	}

	public void setPlUnitPrice(BigDecimal plUnitPrice) {
		this.plUnitPrice = plUnitPrice;
	}

	public String getRlYmd() {
		return rlYmd;
	}

	public void setRlYmd(String rlYmd) {
		this.rlYmd = rlYmd;
	}

	public String getClReqYN() {
		return clReqYN;
	}

	public void setClReqYN(String clReqYN) {
		this.clReqYN = clReqYN;
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

	public String getDcExceptYN() {
		return dcExceptYN;
	}

	public void setDcExceptYN(String dcExceptYN) {
		this.dcExceptYN = dcExceptYN;
	}

	public String getMinusClYN() {
		return minusClYN;
	}

	public void setMinusClYN(String minusClYN) {
		this.minusClYN = minusClYN;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
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

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
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

	public String getMakerName() {
		return makerName;
	}

	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}

	public String getRlStatus() {
		return rlStatus;
	}

	public void setRlStatus(String rlStatus) {
		this.rlStatus = rlStatus;
	}

	public int getRlCnt() {
		return rlCnt;
	}

	public void setRlCnt(int rlCnt) {
		this.rlCnt = rlCnt;
	}

	public String getRlrStatus() {
		return rlrStatus;
	}

	public void setRlrStatus(String rlrStatus) {
		this.rlrStatus = rlrStatus;
	}

	public String getRlrCnt() {
		return rlrCnt;
	}

	public void setRlrCnt(String rlrCnt) {
		this.rlrCnt = rlrCnt;
	}

	public int getSuriCnt() {
		return suriCnt;
	}

	public void setSuriCnt(int suriCnt) {
		this.suriCnt = suriCnt;
	}

	public int getSuiCnt() {
		return suiCnt;
	}

	public void setSuiCnt(int suiCnt) {
		this.suiCnt = suiCnt;
	}

	public int getPlriCnt() {
		return plriCnt;
	}

	public void setPlriCnt(int plriCnt) {
		this.plriCnt = plriCnt;
	}

	public int getPliCnt() {
		return pliCnt;
	}

	public void setPliCnt(int pliCnt) {
		this.pliCnt = pliCnt;
	}

	public int getWhiCnt() {
		return whiCnt;
	}

	public void setWhiCnt(int whiCnt) {
		this.whiCnt = whiCnt;
	}

	public int getRiriCnt() {
		return ririCnt;
	}

	public void setRiriCnt(int ririCnt) {
		this.ririCnt = ririCnt;
	}

	public int getRiiCnt() {
		return riiCnt;
	}

	public void setRiiCnt(int riiCnt) {
		this.riiCnt = riiCnt;
	}

	public int getRoriCnt() {
		return roriCnt;
	}

	public void setRoriCnt(int roriCnt) {
		this.roriCnt = roriCnt;
	}

	public int getRoiCnt() {
		return roiCnt;
	}

	public void setRoiCnt(int roiCnt) {
		this.roiCnt = roiCnt;
	}

	public int getClriCnt() {
		return clriCnt;
	}

	public void setClriCnt(int clriCnt) {
		this.clriCnt = clriCnt;
	}

	public int getCliCnt() {
		return cliCnt;
	}

	public void setCliCnt(int cliCnt) {
		this.cliCnt = cliCnt;
	}

	public BigDecimal getWhUnitPrice() {
		return whUnitPrice;
	}

	public void setWhUnitPrice(BigDecimal whUnitPrice) {
		this.whUnitPrice = whUnitPrice;
	}

	public String getOrderYmd() {
		return orderYmd;
	}

	public void setOrderYmd(String orderYmd) {
		this.orderYmd = orderYmd;
	}

	public String getPcReqNo() {
		return pcReqNo;
	}

	public void setPcReqNo(String pcReqNo) {
		this.pcReqNo = pcReqNo;
	}

	public String getReqSeq() {
		return reqSeq;
	}

	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public int getCeilUnit() {
		return ceilUnit;
	}

	public void setCeilUnit(int ceilUnit) {
		this.ceilUnit = ceilUnit;
	}

	public String getDlvType() {
		return dlvType;
	}

	public void setDlvType(String dlvType) {
		this.dlvType = dlvType;
	}

	public BigDecimal getTaxPrice() {
		return taxPrice;
	}

	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}

	public int getWhStockCnt() {
		return whStockCnt;
	}

	public void setWhStockCnt(int whStockCnt) {
		this.whStockCnt = whStockCnt;
	}

	public int getWorkableQty() {
		return workableQty;
	}

	public void setWorkableQty(int workableQty) {
		this.workableQty = workableQty;
	}

	public int getCtableQty() {
		return ctableQty;
	}

	public void setCtableQty(int ctableQty) {
		this.ctableQty = ctableQty;
	}

	public int getPlaceableQty() {
		return placeableQty;
	}

	public void setPlaceableQty(int placeableQty) {
		this.placeableQty = placeableQty;
	}

	public String getRcvlogisCode() {
		return rcvlogisCode;
	}

	public void setRcvlogisCode(String rcvlogisCode) {
		this.rcvlogisCode = rcvlogisCode;
	}

	public String getOrderReqPlaceCust() {
		return orderReqPlaceCust;
	}

	public void setOrderReqPlaceCust(String orderReqPlaceCust) {
		this.orderReqPlaceCust = orderReqPlaceCust;
	}

	public int getSaleRate() {
		return saleRate;
	}

	public void setSaleRate(int saleRate) {
		this.saleRate = saleRate;
	}

	public int getCurSaleRate() {
		return curSaleRate;
	}

	public void setCurSaleRate(int curSaleRate) {
		this.curSaleRate = curSaleRate;
	}

	public int getPlaceImportCnt() {
		return placeImportCnt;
	}

	public void setPlaceImportCnt(int placeImportCnt) {
		this.placeImportCnt = placeImportCnt;
	}

	public int getSirChkCnt() {
		return sirChkCnt;
	}

	public void setSirChkCnt(int sirChkCnt) {
		this.sirChkCnt = sirChkCnt;
	}

	public int getSirCnt() {
		return sirCnt;
	}

	public void setSirCnt(int sirCnt) {
		this.sirCnt = sirCnt;
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

	public String getClYN() {
		return clYN;
	}

	public void setClYN(String clYN) {
		this.clYN = clYN;
	}

	public String getClIgnYN() {
		return clIgnYN;
	}

	public void setClIgnYN(String clIgnYN) {
		this.clIgnYN = clIgnYN;
	}

	public String getClIgnMemo1() {
		return clIgnMemo1;
	}

	public void setClIgnMemo1(String clIgnMemo1) {
		this.clIgnMemo1 = clIgnMemo1;
	}

	public String getClIgnMemo2() {
		return clIgnMemo2;
	}

	public void setClIgnMemo2(String clIgnMemo2) {
		this.clIgnMemo2 = clIgnMemo2;
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

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getMemo2() {
		return memo2;
	}

	public void setMemo2(String memo2) {
		this.memo2 = memo2;
	}

	public String getProcUserName() {
		return procUserName;
	}

	public void setProcUserName(String procUserName) {
		this.procUserName = procUserName;
	}

	public String getOtherSaleType() {
		return otherSaleType;
	}

	public void setOtherSaleType(String otherSaleType) {
		this.otherSaleType = otherSaleType;
	}

	@Override
	public String toString() {
		return "OrderItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", db_resultSeq=" + db_resultSeq + ", idx=" + idx + ", comCode=" + comCode
				+ ", orderGroupId=" + orderGroupId + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", itemId="
				+ itemId + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", cnt=" + cnt + ", unitPrice=" + unitPrice
				+ ", salePrice=" + salePrice + ", sumPrice=" + sumPrice + ", memo=" + memo + ", placeCustCode="
				+ placeCustCode + ", placeCustName=" + placeCustName + ", placeUnitPrice=" + placeUnitPrice
				+ ", supplyUnitPrice=" + supplyUnitPrice + ", supplyPrice=" + supplyPrice + ", importPrice="
				+ importPrice + ", estiNo=" + estiNo + ", estiSeq=" + estiSeq + ", useStorageCnt=" + useStorageCnt
				+ ", dspNo=" + dspNo + ", orderArr=" + orderArr + ", seqArr=" + seqArr + ", clType=" + clType
				+ ", costPrice=" + costPrice + ", centerPrice=" + centerPrice + ", plCustCode=" + plCustCode
				+ ", plCustName=" + plCustName + ", plUnitPrice=" + plUnitPrice + ", rlYmd=" + rlYmd + ", clReqYN="
				+ clReqYN + ", custCode=" + custCode + ", custName=" + custName + ", dcExceptYN=" + dcExceptYN
				+ ", minusClYN=" + minusClYN + ", carNo=" + carNo + ", supplyCustCode=" + supplyCustCode
				+ ", supplyCustName=" + supplyCustName + ", branchCode=" + branchCode + ", branchName=" + branchName
				+ ", regUserName=" + regUserName + ", makerCode=" + makerCode + ", makerName=" + makerName
				+ ", rlStatus=" + rlStatus + ", rlCnt=" + rlCnt + ", rlrStatus=" + rlrStatus + ", rlrCnt=" + rlrCnt
				+ ", suriCnt=" + suriCnt + ", suiCnt=" + suiCnt + ", plriCnt=" + plriCnt + ", pliCnt=" + pliCnt
				+ ", whiCnt=" + whiCnt + ", ririCnt=" + ririCnt + ", riiCnt=" + riiCnt + ", roriCnt=" + roriCnt
				+ ", roiCnt=" + roiCnt + ", clriCnt=" + clriCnt + ", cliCnt=" + cliCnt + ", whUnitPrice=" + whUnitPrice
				+ ", orderYmd=" + orderYmd + ", pcReqNo=" + pcReqNo + ", reqSeq=" + reqSeq + ", memo1=" + memo1
				+ ", ceilUnit=" + ceilUnit + ", dlvType=" + dlvType + ", taxPrice=" + taxPrice + ", whStockCnt="
				+ whStockCnt + ", workableQty=" + workableQty + ", ctableQty=" + ctableQty + ", placeableQty="
				+ placeableQty + ", rcvlogisCode=" + rcvlogisCode + ", orderReqPlaceCust=" + orderReqPlaceCust
				+ ", saleRate=" + saleRate + ", curSaleRate=" + curSaleRate + ", placeImportCnt=" + placeImportCnt
				+ ", sirChkCnt=" + sirChkCnt + ", sirCnt=" + sirCnt + ", className=" + className + ", factoryNo="
				+ factoryNo + ", clYN=" + clYN + ", clIgnYN=" + clIgnYN + ", clIgnMemo1=" + clIgnMemo1 + ", clIgnMemo2="
				+ clIgnMemo2 + ", rlNo=" + rlNo + ", rlSeq=" + rlSeq + ", carType=" + carType + ", memo2=" + memo2
				+ ", procUserName=" + procUserName + ", otherSaleType=" + otherSaleType + "]";
	}
	
	
	
	
	
}
