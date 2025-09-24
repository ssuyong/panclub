package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class StockYM {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;	
	
	private long idx;
	private String comCode;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
	private String stdYM;                                                                                                                                                                                                                            
	private long itemId;
	private int beginQty;     // --기초재고
	private BigDecimal beginUnitPrice;     //  --기초단가
	private int whQty;     //   --입고수량
	private BigDecimal whUnitPrice;     //  --입고금액
	private int rlQty;     //  --출고수량
	private BigDecimal rlUnitPrice;     //  --출고금액
	private int endQty;     //  --기말재고
	private BigDecimal endUnitPrice;     //  --기말단가
	private Date created;     // 
	private Date modified;     // 
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
	public long getIdx() {
		return idx;
	}
	public void setIdx(long idx) {
		this.idx = idx;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getStdYM() {
		return stdYM;
	}
	public void setStdYM(String stdYM) {
		this.stdYM = stdYM;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public int getBeginQty() {
		return beginQty;
	}
	public void setBeginQty(int beginQty) {
		this.beginQty = beginQty;
	}
	public BigDecimal getBeginUnitPrice() {
		return beginUnitPrice;
	}
	public void setBeginUnitPrice(BigDecimal beginUnitPrice) {
		this.beginUnitPrice = beginUnitPrice;
	}
	public int getWhQty() {
		return whQty;
	}
	public void setWhQty(int whQty) {
		this.whQty = whQty;
	}
	public BigDecimal getWhUnitPrice() {
		return whUnitPrice;
	}
	public void setWhUnitPrice(BigDecimal whUnitPrice) {
		this.whUnitPrice = whUnitPrice;
	}
	public int getRlQty() {
		return rlQty;
	}
	public void setRlQty(int rlQty) {
		this.rlQty = rlQty;
	}
	public BigDecimal getRlUnitPrice() {
		return rlUnitPrice;
	}
	public void setRlUnitPrice(BigDecimal rlUnitPrice) {
		this.rlUnitPrice = rlUnitPrice;
	}
	public int getEndQty() {
		return endQty;
	}
	public void setEndQty(int endQty) {
		this.endQty = endQty;
	}
	public BigDecimal getEndUnitPrice() {
		return endUnitPrice;
	}
	public void setEndUnitPrice(BigDecimal endUnitPrice) {
		this.endUnitPrice = endUnitPrice;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	@Override
	public String toString() {
		return "StockYM [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", comCode=" + comCode + ", stdYM=" + stdYM + ", itemId=" + itemId
				+ ", beginQty=" + beginQty + ", beginUnitPrice=" + beginUnitPrice + ", whQty=" + whQty
				+ ", whUnitPrice=" + whUnitPrice + ", rlQty=" + rlQty + ", rlUnitPrice=" + rlUnitPrice + ", endQty="
				+ endQty + ", endUnitPrice=" + endUnitPrice + ", created=" + created + ", modified=" + modified + "]";
	}
	
	
}
