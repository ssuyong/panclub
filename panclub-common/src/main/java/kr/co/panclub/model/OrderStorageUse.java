package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class OrderStorageUse {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String orderNo;
	private String orderSeq;
	private String storageCode;
	private String storageName;
	private int stockQty;
	private int ctableQty;  //supi 회수가능 수량
	private int useCnt;
	private String regUserId;
	private Date created;
	private String uptUserId;
	private Date modified;
	
	private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	
	private String qtyArr;
	private String cntArr;
	private String scdArr;
	
	private int orderCnt;
	private int salePrice;
	
	private String availableCnt;  // 창고사용가능수량 (주문수량-발주요청수량-창고사용수량) 2023.03.31 yoonsang
	
	private String rackCode;   //랙코드 2023.05.19 hsg 
	private String rackName;
	
	private String rcvLogisCode;	//240607 yooonsang 수령물류센터
	
	// 추가 행 리스트
	private ArrayList<OrderStorageUse> orderStorageUseAdd;
	// 수정 행 리스트
	private ArrayList<OrderStorageUse> orderStorageUseUpdate;
	// 삭제 행 리스트
	private ArrayList<OrderStorageUse> orderStorageUseRemove;
	
	private String pcSelectRackArr; //20240701 supi 선택된 랙 배열
	private String pcSelectQtyArr; //20240701 supi 선택된 수량 배열
	
	private String className; // 20240725 supi 구분, 공장번호
	private String factoryNo;
	private String makerName;
	
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
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public int getCtableQty() {
		return ctableQty;
	}
	public void setCtableQty(int ctableQty) {
		this.ctableQty = ctableQty;
	}
	public int getUseCnt() {
		return useCnt;
	}
	public void setUseCnt(int useCnt) {
		this.useCnt = useCnt;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
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
	public String getQtyArr() {
		return qtyArr;
	}
	public void setQtyArr(String qtyArr) {
		this.qtyArr = qtyArr;
	}
	public String getCntArr() {
		return cntArr;
	}
	public void setCntArr(String cntArr) {
		this.cntArr = cntArr;
	}
	public String getScdArr() {
		return scdArr;
	}
	public void setScdArr(String scdArr) {
		this.scdArr = scdArr;
	}
	public int getOrderCnt() {
		return orderCnt;
	}
	public void setOrderCnt(int orderCnt) {
		this.orderCnt = orderCnt;
	}
	public int getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(int salePrice) {
		this.salePrice = salePrice;
	}
	public String getAvailableCnt() {
		return availableCnt;
	}
	public void setAvailableCnt(String availableCnt) {
		this.availableCnt = availableCnt;
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
	public String getRcvLogisCode() {
		return rcvLogisCode;
	}
	public void setRcvLogisCode(String rcvLogisCode) {
		this.rcvLogisCode = rcvLogisCode;
	}
	public ArrayList<OrderStorageUse> getOrderStorageUseAdd() {
		return orderStorageUseAdd;
	}
	public void setOrderStorageUseAdd(ArrayList<OrderStorageUse> orderStorageUseAdd) {
		this.orderStorageUseAdd = orderStorageUseAdd;
	}
	public ArrayList<OrderStorageUse> getOrderStorageUseUpdate() {
		return orderStorageUseUpdate;
	}
	public void setOrderStorageUseUpdate(ArrayList<OrderStorageUse> orderStorageUseUpdate) {
		this.orderStorageUseUpdate = orderStorageUseUpdate;
	}
	public ArrayList<OrderStorageUse> getOrderStorageUseRemove() {
		return orderStorageUseRemove;
	}
	public void setOrderStorageUseRemove(ArrayList<OrderStorageUse> orderStorageUseRemove) {
		this.orderStorageUseRemove = orderStorageUseRemove;
	}
	public String getPcSelectRackArr() {
		return pcSelectRackArr;
	}
	public void setPcSelectRackArr(String pcSelectRackArr) {
		this.pcSelectRackArr = pcSelectRackArr;
	}
	public String getPcSelectQtyArr() {
		return pcSelectQtyArr;
	}
	public void setPcSelectQtyArr(String pcSelectQtyArr) {
		this.pcSelectQtyArr = pcSelectQtyArr;
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
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	@Override
	public String toString() {
		return "OrderStorageUse [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq
				+ ", storageCode=" + storageCode + ", storageName=" + storageName + ", stockQty=" + stockQty
				+ ", ctableQty=" + ctableQty + ", useCnt=" + useCnt + ", regUserId=" + regUserId + ", created="
				+ created + ", uptUserId=" + uptUserId + ", modified=" + modified + ", itemId=" + itemId + ", itemNo="
				+ itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", qtyArr=" + qtyArr + ", cntArr="
				+ cntArr + ", scdArr=" + scdArr + ", orderCnt=" + orderCnt + ", salePrice=" + salePrice
				+ ", availableCnt=" + availableCnt + ", rackCode=" + rackCode + ", rackName=" + rackName
				+ ", rcvLogisCode=" + rcvLogisCode + ", orderStorageUseAdd=" + orderStorageUseAdd
				+ ", orderStorageUseUpdate=" + orderStorageUseUpdate + ", orderStorageUseRemove="
				+ orderStorageUseRemove + ", pcSelectRackArr=" + pcSelectRackArr + ", pcSelectQtyArr=" + pcSelectQtyArr
				+ ", className=" + className + ", factoryNo=" + factoryNo + ", makerName=" + makerName + "]";
	}
	
}
