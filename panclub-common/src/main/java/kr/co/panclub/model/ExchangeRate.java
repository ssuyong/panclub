package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class ExchangeRate {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String comCode;
	private String refdate;
	private String code;
	private String codeName;
	private BigDecimal sellingPrice;
	private BigDecimal buyingPrice;
	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;
	

	private ArrayList<ExchangeRate> exchangeUpdateList;

	private ArrayList<ExchangeRate> exchangeAddList;
		
	private ArrayList<ExchangeRate> exchangeRemoveList;

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

	public String getRefdate() {
		return refdate;
	}

	public void setRefdate(String refdate) {
		this.refdate = refdate;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public BigDecimal getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(BigDecimal sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public BigDecimal getBuyingPrice() {
		return buyingPrice;
	}

	public void setBuyingPrice(BigDecimal buyingPrice) {
		this.buyingPrice = buyingPrice;
	}

	public String getRegUserId() {
		return regUserId;
	}

	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public String getUptUserId() {
		return uptUserId;
	}

	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public ArrayList<ExchangeRate> getExchangeUpdateList() {
		return exchangeUpdateList;
	}

	public void setExchangeUpdateList(ArrayList<ExchangeRate> exchangeUpdateList) {
		this.exchangeUpdateList = exchangeUpdateList;
	}

	public ArrayList<ExchangeRate> getExchangeAddList() {
		return exchangeAddList;
	}

	public void setExchangeAddList(ArrayList<ExchangeRate> exchangeAddList) {
		this.exchangeAddList = exchangeAddList;
	}

	public ArrayList<ExchangeRate> getExchangeRemoveList() {
		return exchangeRemoveList;
	}

	public void setExchangeRemoveList(ArrayList<ExchangeRate> exchangeRemoveList) {
		this.exchangeRemoveList = exchangeRemoveList;
	}

	@Override
	public String toString() {
		return "ExchangeRate [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", refdate=" + refdate + ", code=" + code + ", codeName="
				+ codeName + ", sellingPrice=" + sellingPrice + ", buyingPrice=" + buyingPrice + ", regUserId="
				+ regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified=" + modified
				+ ", exchangeUpdateList=" + exchangeUpdateList + ", exchangeAddList=" + exchangeAddList
				+ ", exchangeRemoveList=" + exchangeRemoveList + "]";
	}
	
	
}
