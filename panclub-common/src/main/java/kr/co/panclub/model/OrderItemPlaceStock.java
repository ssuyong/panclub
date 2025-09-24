package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class OrderItemPlaceStock {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String idx; 
	private String comCode;            // varchar(20) not null,
	private String orderNo;            //  varchar(50) not null,
	private String orderSeq;            //  varchar(20) not null,
	private int orderCnt;
	private int placeCnt;
	private int whReqCnt;
	private int whStockCnt;
	private float glogen;            //  numeric(5,2),
	private float partsmall; 
	private float halla;            //   numeric(5,2),
	private float sk;            //   numeric(5,2),
	private float center1;            //   numeric(5,2),
	private float center2;            //   numeric(5,2),
	private float deko;            //   numeric(5,2),
	private float eapsEU;            //   numeric(5,2),
	private float eapsUSA;            //   numeric(5,2),
	private String regUserId;            //  varchar(50),
	private Date created;            //  datetime,
	private String uptUserId;            //  varchar(50),
	private Date modified;            //  datetime,
	private String cargoGroupCode;            //  varchar(20),
	private float dekoEuro;            //  numeric(5,2),
	private float eapsEuro;            //  numeric(5,2),
	private float eapsDollar;            //  numeric(5,2)
	
	private String placeCustCode;
	private String placeCustName;
	private String cargoGroupName;
	private long itemId; 
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private String salePrice;

	private int useStorageCnt;
	
	private String tempAdd;
	
	private BigDecimal centerPrice;
	
	private int shareStockQty;    //2023.06.07 hsg 공유재고수량
	
	// 추가 행 리스트
	private ArrayList<OrderItemPlaceStock> orderStockAdd;
	// 수정 행 리스트
	private ArrayList<OrderItemPlaceStock> orderStockUpdate;
	// 삭제 행 리스트
	private ArrayList<OrderItemPlaceStock> orderStockRemove;
	
	private BigDecimal unitPrice;  //견적품목의 단가.2023.08.18 hsg

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

	public int getOrderCnt() {
		return orderCnt;
	}

	public void setOrderCnt(int orderCnt) {
		this.orderCnt = orderCnt;
	}

	public int getPlaceCnt() {
		return placeCnt;
	}

	public void setPlaceCnt(int placeCnt) {
		this.placeCnt = placeCnt;
	}

	public int getWhReqCnt() {
		return whReqCnt;
	}

	public void setWhReqCnt(int whReqCnt) {
		this.whReqCnt = whReqCnt;
	}

	public int getWhStockCnt() {
		return whStockCnt;
	}

	public void setWhStockCnt(int whStockCnt) {
		this.whStockCnt = whStockCnt;
	}

	public float getGlogen() {
		return glogen;
	}

	public void setGlogen(float glogen) {
		this.glogen = glogen;
	}

	public float getPartsmall() {
		return partsmall;
	}

	public void setPartsmall(float partsmall) {
		this.partsmall = partsmall;
	}

	public float getHalla() {
		return halla;
	}

	public void setHalla(float halla) {
		this.halla = halla;
	}

	public float getSk() {
		return sk;
	}

	public void setSk(float sk) {
		this.sk = sk;
	}

	public float getCenter1() {
		return center1;
	}

	public void setCenter1(float center1) {
		this.center1 = center1;
	}

	public float getCenter2() {
		return center2;
	}

	public void setCenter2(float center2) {
		this.center2 = center2;
	}

	public float getDeko() {
		return deko;
	}

	public void setDeko(float deko) {
		this.deko = deko;
	}

	public float getEapsEU() {
		return eapsEU;
	}

	public void setEapsEU(float eapsEU) {
		this.eapsEU = eapsEU;
	}

	public float getEapsUSA() {
		return eapsUSA;
	}

	public void setEapsUSA(float eapsUSA) {
		this.eapsUSA = eapsUSA;
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

	public String getCargoGroupCode() {
		return cargoGroupCode;
	}

	public void setCargoGroupCode(String cargoGroupCode) {
		this.cargoGroupCode = cargoGroupCode;
	}

	public float getDekoEuro() {
		return dekoEuro;
	}

	public void setDekoEuro(float dekoEuro) {
		this.dekoEuro = dekoEuro;
	}

	public float getEapsEuro() {
		return eapsEuro;
	}

	public void setEapsEuro(float eapsEuro) {
		this.eapsEuro = eapsEuro;
	}

	public float getEapsDollar() {
		return eapsDollar;
	}

	public void setEapsDollar(float eapsDollar) {
		this.eapsDollar = eapsDollar;
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

	public String getCargoGroupName() {
		return cargoGroupName;
	}

	public void setCargoGroupName(String cargoGroupName) {
		this.cargoGroupName = cargoGroupName;
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

	public String getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(String salePrice) {
		this.salePrice = salePrice;
	}

	public int getUseStorageCnt() {
		return useStorageCnt;
	}

	public void setUseStorageCnt(int useStorageCnt) {
		this.useStorageCnt = useStorageCnt;
	}

	public String getTempAdd() {
		return tempAdd;
	}

	public void setTempAdd(String tempAdd) {
		this.tempAdd = tempAdd;
	}

	public BigDecimal getCenterPrice() {
		return centerPrice;
	}

	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}

	public int getShareStockQty() {
		return shareStockQty;
	}

	public void setShareStockQty(int shareStockQty) {
		this.shareStockQty = shareStockQty;
	}

	public ArrayList<OrderItemPlaceStock> getOrderStockAdd() {
		return orderStockAdd;
	}

	public void setOrderStockAdd(ArrayList<OrderItemPlaceStock> orderStockAdd) {
		this.orderStockAdd = orderStockAdd;
	}

	public ArrayList<OrderItemPlaceStock> getOrderStockUpdate() {
		return orderStockUpdate;
	}

	public void setOrderStockUpdate(ArrayList<OrderItemPlaceStock> orderStockUpdate) {
		this.orderStockUpdate = orderStockUpdate;
	}

	public ArrayList<OrderItemPlaceStock> getOrderStockRemove() {
		return orderStockRemove;
	}

	public void setOrderStockRemove(ArrayList<OrderItemPlaceStock> orderStockRemove) {
		this.orderStockRemove = orderStockRemove;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}
	

	

	
	
	
}
