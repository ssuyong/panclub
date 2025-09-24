package kr.co.panclub.model;

public class UserLog {

	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private int hisIdx;  // 회사코드
    private String comCode;  // 회사코드
    private String comName;  // 회사명 
    private String userId; // 사용자 ID
    private String userName; // 사용자명
    private String logIp; // 자동 로그인체크한 경우 쿠키에 저장한 세션값 저장
    private String created; // --등록일
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
	public int getHisIdx() {
		return hisIdx;
	}
	public void setHisIdx(int hisIdx) {
		this.hisIdx = hisIdx;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getLogIp() {
		return logIp;
	}
	public void setLogIp(String logIp) {
		this.logIp = logIp;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	@Override
	public String toString() {
		return "UserLog [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", hisIdx=" + hisIdx + ", comCode=" + comCode + ", comName=" + comName + ", userId="
				+ userId + ", userName=" + userName + ", logIp=" + logIp + ", created=" + created + "]";
	}
    
    
}
