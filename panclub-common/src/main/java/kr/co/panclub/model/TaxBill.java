package kr.co.panclub.model;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class TaxBill {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String comCode;
	private String taxBillNo;
	private String appStatusCode;
	private String appStatus;
	private String docStatusCode;
	private String docStatus;
	
	private String documentId;
	private String documentId2;
	
	private String taxBillDate;
	private String bizType;
	private String custCode;
	private String custName;
	private String ceoName;
	private String bizNo;
	private String address;
	private String phone;
	private String fax;
	private String taxEmail;
	
	private String itemName;	
	private int supPrice;	
	private int vat;	
	private int totalPrice;	
	private String clType;	
	private String memo;	
	private String taxTypeCode;	
	private String taxTypeName;	
	private String errCode;	
	private String errMsg;	
	
	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;
	
	private String saveUrl;
	private String saveOfficeKey;
	private String saveAccessKey;
	private String saveBizNo;
	
	private String[] reqArr;
	
	private ArrayList<TaxBill> checkedList;
	private ArrayList<TaxBill> taxBillDelList;
	
	private String clGroupId;
	private String expType;
	private String clgArr;
	private String tbNoArr;
	
	private String summary; //20240201 yoonsang 판매출고 세금계산서 등록하기위함
	private String seq;
	private String clType2;	//240522 yoonsang 일반/보험 표시를 위함
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
	public String getTaxBillNo() {
		return taxBillNo;
	}
	public void setTaxBillNo(String taxBillNo) {
		this.taxBillNo = taxBillNo;
	}
	public String getAppStatusCode() {
		return appStatusCode;
	}
	public void setAppStatusCode(String appStatusCode) {
		this.appStatusCode = appStatusCode;
	}
	public String getAppStatus() {
		return appStatus;
	}
	public void setAppStatus(String appStatus) {
		this.appStatus = appStatus;
	}
	public String getDocStatusCode() {
		return docStatusCode;
	}
	public void setDocStatusCode(String docStatusCode) {
		this.docStatusCode = docStatusCode;
	}
	public String getDocStatus() {
		return docStatus;
	}
	public void setDocStatus(String docStatus) {
		this.docStatus = docStatus;
	}
	public String getDocumentId() {
		return documentId;
	}
	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}
	public String getDocumentId2() {
		return documentId2;
	}
	public void setDocumentId2(String documentId2) {
		this.documentId2 = documentId2;
	}
	public String getTaxBillDate() {
		return taxBillDate;
	}
	public void setTaxBillDate(String taxBillDate) {
		this.taxBillDate = taxBillDate;
	}
	public String getBizType() {
		return bizType;
	}
	public void setBizType(String bizType) {
		this.bizType = bizType;
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
	public String getCeoName() {
		return ceoName;
	}
	public void setCeoName(String ceoName) {
		this.ceoName = ceoName;
	}
	public String getBizNo() {
		return bizNo;
	}
	public void setBizNo(String bizNo) {
		this.bizNo = bizNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getTaxEmail() {
		return taxEmail;
	}
	public void setTaxEmail(String taxEmail) {
		this.taxEmail = taxEmail;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public int getSupPrice() {
		return supPrice;
	}
	public void setSupPrice(int supPrice) {
		this.supPrice = supPrice;
	}
	public int getVat() {
		return vat;
	}
	public void setVat(int vat) {
		this.vat = vat;
	}
	public int getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getClType() {
		return clType;
	}
	public void setClType(String clType) {
		this.clType = clType;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getTaxTypeCode() {
		return taxTypeCode;
	}
	public void setTaxTypeCode(String taxTypeCode) {
		this.taxTypeCode = taxTypeCode;
	}
	public String getTaxTypeName() {
		return taxTypeName;
	}
	public void setTaxTypeName(String taxTypeName) {
		this.taxTypeName = taxTypeName;
	}
	public String getErrCode() {
		return errCode;
	}
	public void setErrCode(String errCode) {
		this.errCode = errCode;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
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
	public String getSaveUrl() {
		return saveUrl;
	}
	public void setSaveUrl(String saveUrl) {
		this.saveUrl = saveUrl;
	}
	public String getSaveOfficeKey() {
		return saveOfficeKey;
	}
	public void setSaveOfficeKey(String saveOfficeKey) {
		this.saveOfficeKey = saveOfficeKey;
	}
	public String getSaveAccessKey() {
		return saveAccessKey;
	}
	public void setSaveAccessKey(String saveAccessKey) {
		this.saveAccessKey = saveAccessKey;
	}
	public String getSaveBizNo() {
		return saveBizNo;
	}
	public void setSaveBizNo(String saveBizNo) {
		this.saveBizNo = saveBizNo;
	}
	public String[] getReqArr() {
		return reqArr;
	}
	public void setReqArr(String[] reqArr) {
		this.reqArr = reqArr;
	}
	public ArrayList<TaxBill> getCheckedList() {
		return checkedList;
	}
	public void setCheckedList(ArrayList<TaxBill> checkedList) {
		this.checkedList = checkedList;
	}
	public ArrayList<TaxBill> getTaxBillDelList() {
		return taxBillDelList;
	}
	public void setTaxBillDelList(ArrayList<TaxBill> taxBillDelList) {
		this.taxBillDelList = taxBillDelList;
	}
	public String getClGroupId() {
		return clGroupId;
	}
	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}
	public String getExpType() {
		return expType;
	}
	public void setExpType(String expType) {
		this.expType = expType;
	}
	public String getClgArr() {
		return clgArr;
	}
	public void setClgArr(String clgArr) {
		this.clgArr = clgArr;
	}
	public String getTbNoArr() {
		return tbNoArr;
	}
	public void setTbNoArr(String tbNoArr) {
		this.tbNoArr = tbNoArr;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getClType2() {
		return clType2;
	}
	public void setClType2(String clType2) {
		this.clType2 = clType2;
	}
	@Override
	public String toString() {
		return "TaxBill [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", taxBillNo=" + taxBillNo + ", appStatusCode="
				+ appStatusCode + ", appStatus=" + appStatus + ", docStatusCode=" + docStatusCode + ", docStatus="
				+ docStatus + ", documentId=" + documentId + ", documentId2=" + documentId2 + ", taxBillDate="
				+ taxBillDate + ", bizType=" + bizType + ", custCode=" + custCode + ", custName=" + custName
				+ ", ceoName=" + ceoName + ", bizNo=" + bizNo + ", address=" + address + ", phone=" + phone + ", fax="
				+ fax + ", taxEmail=" + taxEmail + ", itemName=" + itemName + ", supPrice=" + supPrice + ", vat=" + vat
				+ ", totalPrice=" + totalPrice + ", clType=" + clType + ", memo=" + memo + ", taxTypeCode="
				+ taxTypeCode + ", taxTypeName=" + taxTypeName + ", errCode=" + errCode + ", errMsg=" + errMsg
				+ ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified="
				+ modified + ", saveUrl=" + saveUrl + ", saveOfficeKey=" + saveOfficeKey + ", saveAccessKey="
				+ saveAccessKey + ", saveBizNo=" + saveBizNo + ", reqArr=" + Arrays.toString(reqArr) + ", checkedList="
				+ checkedList + ", taxBillDelList=" + taxBillDelList + ", clGroupId=" + clGroupId + ", expType="
				+ expType + ", clgArr=" + clgArr + ", tbNoArr=" + tbNoArr + ", summary=" + summary + ", seq=" + seq
				+ ", clType2=" + clType2 + "]";
	}
	
	
	
	
	

}
