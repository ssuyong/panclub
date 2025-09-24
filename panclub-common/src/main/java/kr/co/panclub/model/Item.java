package kr.co.panclub.model;

import java.io.Console;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class Item {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private long itemId;
	private String itemCode;
	private String itemNo;  // --품번
	private String factoryNo;  //   --공장품번
	private String carType; //차종
	private String itemName;  // 
	private String itemNameEn;  // 
	private String makerCode;  //  --제조사코드
	private String makerName;  //  --제조사이름
	private String brandCode;
	private String saleBrandCode;
	private String genuineYN;  //  --정품여부
	private long itemExchangeId;  // 
	private BigDecimal centerPrice;  // 
	private BigDecimal inPrice;  // 
	private BigDecimal salePrice;  // 
	private String regUserId;  // 
	private String regYmd;
	private String regHms;
	private String uptUserId;  // 
	private String uptYmd;
	private String uptHms;
	private String productYear;  //  --생산년도
	private String home;  //  --원산지
	private String equipPlace;  // --장착위치
	private String color;  //  --색상
	private int shine;  // - 광택0:알수없음, 1:광택, 2:무광택
	private float weight;  // --무게
	private float cbm;
	private float width;  //  --가로,폭,너비(앞에서 볼때 좌우로~)
	private float depth;  //  --세로(앞쪽에서 뒤쪽으로의 깊이~)
	private float height;  //  --높이

	private String classCode;
	private String className;
	private String shareYN;
	
	private String consignCustCode; //위탁거래처
	private String consignCustName; //위탁거래처
	
	private String comName; 
	
	private String stockPlace;
	private int stockQty;
	
	private String dcExceptYN;   // 할인율제외. 2023.05.12. 공장부담금, 할인 등
	
	private String immediateRlYN;
	
	private String noRealYN;
	
	// 추가 행 리스트
	private ArrayList<Item> itemAdd;
	// 수정 행 리스트
	private ArrayList<Item> itemUpdate;
	// 삭제 행 리스트
	private ArrayList<Item> itemRemove;
	
	// 추가 행 리스트
	private ArrayList<ItemOe> itemOeAdd;
	// 수정 행 리스트
	private ArrayList<ItemOe> itemOeUpdate;
	// 삭제 행 리스트
	private ArrayList<ItemOe> itemOeRemove;
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
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
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
	public String getBrandCode() {
		return brandCode;
	}
	public void setBrandCode(String brandCode) {
		this.brandCode = brandCode;
	}
	public String getSaleBrandCode() {
		return saleBrandCode;
	}
	public void setSaleBrandCode(String saleBrandCode) {
		this.saleBrandCode = saleBrandCode;
	}
	public String getGenuineYN() {
		return genuineYN;
	}
	public void setGenuineYN(String genuineYN) {
		this.genuineYN = genuineYN;
	}
	public long getItemExchangeId() {
		return itemExchangeId;
	}
	public void setItemExchangeId(long itemExchangeId) {
		this.itemExchangeId = itemExchangeId;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public BigDecimal getInPrice() {
		return inPrice;
	}
	public void setInPrice(BigDecimal inPrice) {
		this.inPrice = inPrice;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
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
	public String getProductYear() {
		return productYear;
	}
	public void setProductYear(String productYear) {
		this.productYear = productYear;
	}
	public String getHome() {
		return home;
	}
	public void setHome(String home) {
		this.home = home;
	}
	public String getEquipPlace() {
		return equipPlace;
	}
	public void setEquipPlace(String equipPlace) {
		this.equipPlace = equipPlace;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public int getShine() {
		return shine;
	}
	public void setShine(int shine) {
		this.shine = shine;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public float getCbm() {
		return cbm;
	}
	public void setCbm(float cbm) {
		this.cbm = cbm;
	}
	public float getWidth() {
		return width;
	}
	public void setWidth(float width) {
		this.width = width;
	}
	public float getDepth() {
		return depth;
	}
	public void setDepth(float depth) {
		this.depth = depth;
	}
	public float getHeight() {
		return height;
	}
	public void setHeight(float height) {
		this.height = height;
	}
	public String getClassCode() {
		return classCode;
	}
	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getShareYN() {
		return shareYN;
	}
	public void setShareYN(String shareYN) {
		this.shareYN = shareYN;
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
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getStockPlace() {
		return stockPlace;
	}
	public void setStockPlace(String stockPlace) {
		this.stockPlace = stockPlace;
	}
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public String getDcExceptYN() {
		return dcExceptYN;
	}
	public void setDcExceptYN(String dcExceptYN) {
		this.dcExceptYN = dcExceptYN;
	}
	public String getImmediateRlYN() {
		return immediateRlYN;
	}
	public void setImmediateRlYN(String immediateRlYN) {
		this.immediateRlYN = immediateRlYN;
	}
	public ArrayList<Item> getItemAdd() {
		return itemAdd;
	}
	public void setItemAdd(ArrayList<Item> itemAdd) {
		this.itemAdd = itemAdd;
	}
	public ArrayList<Item> getItemUpdate() {
		return itemUpdate;
	}
	public void setItemUpdate(ArrayList<Item> itemUpdate) {
		this.itemUpdate = itemUpdate;
	}
	public ArrayList<Item> getItemRemove() {
		return itemRemove;
	}
	public void setItemRemove(ArrayList<Item> itemRemove) {
		this.itemRemove = itemRemove;
	}
	public ArrayList<ItemOe> getItemOeAdd() {
		return itemOeAdd;
	}
	public void setItemOeAdd(ArrayList<ItemOe> itemOeAdd) {
		this.itemOeAdd = itemOeAdd;
	}
	public ArrayList<ItemOe> getItemOeUpdate() {
		return itemOeUpdate;
	}
	public void setItemOeUpdate(ArrayList<ItemOe> itemOeUpdate) {
		this.itemOeUpdate = itemOeUpdate;
	}
	public ArrayList<ItemOe> getItemOeRemove() {
		return itemOeRemove;
	}
	public void setItemOeRemove(ArrayList<ItemOe> itemOeRemove) {
		this.itemOeRemove = itemOeRemove;
	}
	public String getNoRealYN() {
		return noRealYN;
	}
	public void setNoRealYN(String noRealYN) {
		this.noRealYN = noRealYN;
	}
	@Override
	public String toString() {
		return "Item [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", itemId=" + itemId + ", itemCode=" + itemCode + ", itemNo="
				+ itemNo + ", factoryNo=" + factoryNo + ", carType=" + carType + ", itemName=" + itemName
				+ ", itemNameEn=" + itemNameEn + ", makerCode=" + makerCode + ", makerName=" + makerName
				+ ", brandCode=" + brandCode + ", saleBrandCode=" + saleBrandCode + ", genuineYN=" + genuineYN
				+ ", itemExchangeId=" + itemExchangeId + ", centerPrice=" + centerPrice + ", inPrice=" + inPrice
				+ ", salePrice=" + salePrice + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms
				+ ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", productYear="
				+ productYear + ", home=" + home + ", equipPlace=" + equipPlace + ", color=" + color + ", shine="
				+ shine + ", weight=" + weight + ", cbm=" + cbm + ", width=" + width + ", depth=" + depth + ", height="
				+ height + ", classCode=" + classCode + ", className=" + className + ", shareYN=" + shareYN
				+ ", consignCustCode=" + consignCustCode + ", consignCustName=" + consignCustName + ", comName="
				+ comName + ", stockPlace=" + stockPlace + ", stockQty=" + stockQty + ", dcExceptYN=" + dcExceptYN
				+ ", immediateRlYN=" + immediateRlYN + ", noRealYN=" + noRealYN + ", itemAdd=" + itemAdd
				+ ", itemUpdate=" + itemUpdate + ", itemRemove=" + itemRemove + ", itemOeAdd=" + itemOeAdd
				+ ", itemOeUpdate=" + itemOeUpdate + ", itemOeRemove=" + itemOeRemove + "]";
	}
	 
}
