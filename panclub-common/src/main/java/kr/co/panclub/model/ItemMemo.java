package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class ItemMemo {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;      //  --회사코드
	private String memo;      //  --메모
	private String regUserId;      //  --등록아이디
	private String regYmd;      //  --등록일자
	private String regHms;      //  --등록시간
	private String uptUserId;      //  --수정자
	private String uptYmd;      //  --수정일자
	private String uptHms;      //  --수정시간 
	private long itemId;      // --부품ID
	private long idx;      //  
		
	// 추가 행 리스트
	private ArrayList<ItemMemo> itemMemoAdd;
	// 수정 행 리스트
	private ArrayList<ItemMemo> itemMemoUpdate;
	// 삭제 행 리스트
	private ArrayList<ItemMemo> itemMemoRemove;
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
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
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
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public long getIdx() {
		return idx;
	}
	public void setIdx(long idx) {
		this.idx = idx;
	}
	public ArrayList<ItemMemo> getItemMemoAdd() {
		return itemMemoAdd;
	}
	public void setItemMemoAdd(ArrayList<ItemMemo> itemMemoAdd) {
		this.itemMemoAdd = itemMemoAdd;
	}
	public ArrayList<ItemMemo> getItemMemoUpdate() {
		return itemMemoUpdate;
	}
	public void setItemMemoUpdate(ArrayList<ItemMemo> itemMemoUpdate) {
		this.itemMemoUpdate = itemMemoUpdate;
	}
	public ArrayList<ItemMemo> getItemMemoRemove() {
		return itemMemoRemove;
	}
	public void setItemMemoRemove(ArrayList<ItemMemo> itemMemoRemove) {
		this.itemMemoRemove = itemMemoRemove;
	}
	@Override
	public String toString() {
		final int maxLen = 10;
		return "ItemMemo [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", memo=" + memo + ", regUserId=" + regUserId + ", regYmd="
				+ regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms="
				+ uptHms + ", itemId=" + itemId + ", idx=" + idx + ", itemMemoAdd="
				+ (itemMemoAdd != null ? itemMemoAdd.subList(0, Math.min(itemMemoAdd.size(), maxLen)) : null)
				+ ", itemMemoUpdate="
				+ (itemMemoUpdate != null ? itemMemoUpdate.subList(0, Math.min(itemMemoUpdate.size(), maxLen)) : null)
				+ ", itemMemoRemove="
				+ (itemMemoRemove != null ? itemMemoRemove.subList(0, Math.min(itemMemoRemove.size(), maxLen)) : null)
				+ "]";
	}

	
	
	
}
