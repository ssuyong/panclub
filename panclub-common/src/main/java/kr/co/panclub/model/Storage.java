package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class Storage {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;	
	
	private String comCode;
	private String storageCode;             //  --창고코드
	private String storageName;             // --창고명
	private String storType;             // --창고타입 230215 장윤상추가
	
	private String memo1;           //   -- 비고
	private String validYN;         //   --사용여부
	private String regUerId;
	private Date created;
	private String uptUerId;
	private Date modified;
	
	private String rlStandByYN;   //2023.04.28 hsg 출고대기창고 : 판매가능수량에서 제외하는 창고. 주문된 재고를 옮겨놓는 창고.
	private String workableYN;        //2023.04.28 hsg 판매가능창고. 판매가능수량에 포함하는 창고
	
	// 추가 행 리스트
	private ArrayList<Storage> storageAdd;
	// 수정 행 리스트
	private ArrayList<Storage> storageUpdate;
	// 삭제 행 리스트
	private ArrayList<Storage> storageRemove;
	
	//위탁창고 2023.08.24
	private String consignYN;
	private String consignCustCode;
	private String consignCustName;
	
	private String storCodeMulti;   // 창고여러개조회시 2023.09.21 hsg
	
	private String checkType;   // 외주창고만조회하기위한 변수 2023.10.10 yoonsang

	//수탁협력사코드 2023.11.09 hsg
	private String consignCoworkCustCode;
	private String consignCoworkCustName;
	
	//현황관련 2023.12.22 hsg
	private int itemQty;
	private int stockQty;
	private BigDecimal centerPrice;
	private BigDecimal sumCenterPrice;
	
	private String ctStorageYN; // 회수창고 여부
	private String consignViewYN;

	private String gvComCode;	//240313
	private String orderByString;	//240313
	
	private String logisCode;  //2024.06.04 hsg  물류센터 기초코드

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

	public String getStorType() {
		return storType;
	}

	public void setStorType(String storType) {
		this.storType = storType;
	}

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public String getValidYN() {
		return validYN;
	}

	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}

	public String getRegUerId() {
		return regUerId;
	}

	public void setRegUerId(String regUerId) {
		this.regUerId = regUerId;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public String getUptUerId() {
		return uptUerId;
	}

	public void setUptUerId(String uptUerId) {
		this.uptUerId = uptUerId;
	}

	public Date getModified() {
		return modified;
	}

	public void setModified(Date modified) {
		this.modified = modified;
	}

	public String getRlStandByYN() {
		return rlStandByYN;
	}

	public void setRlStandByYN(String rlStandByYN) {
		this.rlStandByYN = rlStandByYN;
	}

	public String getWorkableYN() {
		return workableYN;
	}

	public void setWorkableYN(String workableYN) {
		this.workableYN = workableYN;
	}

	public ArrayList<Storage> getStorageAdd() {
		return storageAdd;
	}

	public void setStorageAdd(ArrayList<Storage> storageAdd) {
		this.storageAdd = storageAdd;
	}

	public ArrayList<Storage> getStorageUpdate() {
		return storageUpdate;
	}

	public void setStorageUpdate(ArrayList<Storage> storageUpdate) {
		this.storageUpdate = storageUpdate;
	}

	public ArrayList<Storage> getStorageRemove() {
		return storageRemove;
	}

	public void setStorageRemove(ArrayList<Storage> storageRemove) {
		this.storageRemove = storageRemove;
	}

	public String getConsignYN() {
		return consignYN;
	}

	public void setConsignYN(String consignYN) {
		this.consignYN = consignYN;
	}

	public String getConsignCustCode() {
		return consignCustCode;
	}

	public void setConsignCustCode(String consignCustCode) {
		this.consignCustCode = consignCustCode;
	}

	public String getConsignCustName() {
		return consignCustName;
	}

	public void setConsignCustName(String consignCustName) {
		this.consignCustName = consignCustName;
	}

	public String getStorCodeMulti() {
		return storCodeMulti;
	}

	public void setStorCodeMulti(String storCodeMulti) {
		this.storCodeMulti = storCodeMulti;
	}

	public String getCheckType() {
		return checkType;
	}

	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}

	public String getConsignCoworkCustCode() {
		return consignCoworkCustCode;
	}

	public void setConsignCoworkCustCode(String consignCoworkCustCode) {
		this.consignCoworkCustCode = consignCoworkCustCode;
	}

	public String getConsignCoworkCustName() {
		return consignCoworkCustName;
	}

	public void setConsignCoworkCustName(String consignCoworkCustName) {
		this.consignCoworkCustName = consignCoworkCustName;
	}

	public int getItemQty() {
		return itemQty;
	}

	public void setItemQty(int itemQty) {
		this.itemQty = itemQty;
	}

	public int getStockQty() {
		return stockQty;
	}

	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}

	public BigDecimal getCenterPrice() {
		return centerPrice;
	}

	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}

	public BigDecimal getSumCenterPrice() {
		return sumCenterPrice;
	}

	public void setSumCenterPrice(BigDecimal sumCenterPrice) {
		this.sumCenterPrice = sumCenterPrice;
	}

	public String getCtStorageYN() {
		return ctStorageYN;
	}

	public void setCtStorageYN(String ctStorageYN) {
		this.ctStorageYN = ctStorageYN;
	}

	public String getConsignViewYN() {
		return consignViewYN;
	}

	public void setConsignViewYN(String consignViewYN) {
		this.consignViewYN = consignViewYN;
	}

	public String getGvComCode() {
		return gvComCode;
	}

	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}

	public String getOrderByString() {
		return orderByString;
	}

	public void setOrderByString(String orderByString) {
		this.orderByString = orderByString;
	}

	public String getLogisCode() {
		return logisCode;
	}

	public void setLogisCode(String logisCode) {
		this.logisCode = logisCode;
	}

	@Override
	public String toString() {
		return "Storage [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", storageCode=" + storageCode + ", storageName="
				+ storageName + ", storType=" + storType + ", memo1=" + memo1 + ", validYN=" + validYN + ", regUerId="
				+ regUerId + ", created=" + created + ", uptUerId=" + uptUerId + ", modified=" + modified
				+ ", rlStandByYN=" + rlStandByYN + ", workableYN=" + workableYN + ", storageAdd=" + storageAdd
				+ ", storageUpdate=" + storageUpdate + ", storageRemove=" + storageRemove + ", consignYN=" + consignYN
				+ ", consignCustCode=" + consignCustCode + ", consignCustName=" + consignCustName + ", storCodeMulti="
				+ storCodeMulti + ", checkType=" + checkType + ", consignCoworkCustCode=" + consignCoworkCustCode
				+ ", consignCoworkCustName=" + consignCoworkCustName + ", itemQty=" + itemQty + ", stockQty=" + stockQty
				+ ", centerPrice=" + centerPrice + ", sumCenterPrice=" + sumCenterPrice + ", ctStorageYN=" + ctStorageYN
				+ ", consignViewYN=" + consignViewYN + ", gvComCode=" + gvComCode + ", orderByString=" + orderByString
				+ ", logisCode=" + logisCode + "]";
	}
	

		
}
