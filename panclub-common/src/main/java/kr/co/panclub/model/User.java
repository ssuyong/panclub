package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class User {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
    private String comCode;  // 회사코드
    private String comName;  // 회사명 
    private String userId_origin;
    private String userId; // 사용자 ID
    private String userName; // 사용자명
    private String pwdEnc; // 일방향암호화된 패스워드
    private String divisionCode; // 소속부서
    private String divisionName; 
    private String userTypeCode; // 사용자구분, 전체관리자,사업장관리자,일반사용자,물류관리자
    private String userTypeName; 
    private String autoLoginSession; // 자동 로그인체크한 경우 쿠키에 저장한 세션값 저장
    private Date autoLoginSessionLimit; // 자동 로그인 세션값 유효시간
    private String validYN; // 사용유무
    private String created; // --등록일
    private String modified; // 수정일
    private String empNo_origin; // 정동근추가
    private String empNo; // 정동근추가
    
    private String menuAuthArr;  //메뉴권한 A001:YN-A002:NN
    
    
	// 수정 행 리스트
	private ArrayList<User> userUpdate;
	
	// 추가 행 리스트
	private ArrayList<User> userAdd;
	
	// 삭제 행 리스트
	private ArrayList<User> userRemove;
	
	private String dpColor;   //2023.08.25 hsg - 디스플레이칼러.

	private int templateIdx; //지정된 권한템플릿 인덱스
	private String templateName; // 지정된 권한템플릿명
	private int permissionCount; // 보유권한수
	private boolean permissionValid; // 권한보유여부
	
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

	public String getComName() {
		return comName;
	}

	public void setComName(String comName) {
		this.comName = comName;
	}

	public String getUserId_origin() {
		return userId_origin;
	}

	public void setUserId_origin(String userId_origin) {
		this.userId_origin = userId_origin;
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

	public String getPwdEnc() {
		return pwdEnc;
	}

	public void setPwdEnc(String pwdEnc) {
		this.pwdEnc = pwdEnc;
	}

	public String getDivisionCode() {
		return divisionCode;
	}

	public void setDivisionCode(String divisionCode) {
		this.divisionCode = divisionCode;
	}

	public String getDivisionName() {
		return divisionName;
	}

	public void setDivisionName(String divisionName) {
		this.divisionName = divisionName;
	}

	public String getUserTypeCode() {
		return userTypeCode;
	}

	public void setUserTypeCode(String userTypeCode) {
		this.userTypeCode = userTypeCode;
	}

	public String getUserTypeName() {
		return userTypeName;
	}

	public void setUserTypeName(String userTypeName) {
		this.userTypeName = userTypeName;
	}

	public String getAutoLoginSession() {
		return autoLoginSession;
	}

	public void setAutoLoginSession(String autoLoginSession) {
		this.autoLoginSession = autoLoginSession;
	}

	public Date getAutoLoginSessionLimit() {
		return autoLoginSessionLimit;
	}

	public void setAutoLoginSessionLimit(Date autoLoginSessionLimit) {
		this.autoLoginSessionLimit = autoLoginSessionLimit;
	}

	public String getValidYN() {
		return validYN;
	}

	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public String getEmpNo_origin() {
		return empNo_origin;
	}

	public void setEmpNo_origin(String empNo_origin) {
		this.empNo_origin = empNo_origin;
	}

	public String getEmpNo() {
		return empNo;
	}

	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

	public String getMenuAuthArr() {
		return menuAuthArr;
	}

	public void setMenuAuthArr(String menuAuthArr) {
		this.menuAuthArr = menuAuthArr;
	}

	public ArrayList<User> getUserUpdate() {
		return userUpdate;
	}

	public void setUserUpdate(ArrayList<User> userUpdate) {
		this.userUpdate = userUpdate;
	}

	public ArrayList<User> getUserAdd() {
		return userAdd;
	}

	public void setUserAdd(ArrayList<User> userAdd) {
		this.userAdd = userAdd;
	}

	public ArrayList<User> getUserRemove() {
		return userRemove;
	}

	public void setUserRemove(ArrayList<User> userRemove) {
		this.userRemove = userRemove;
	}

	public String getDpColor() {
		return dpColor;
	}

	public void setDpColor(String dpColor) {
		this.dpColor = dpColor;
	}

	public int getTemplateIdx() {
		return templateIdx;
	}

	public void setTemplateIdx(int templateIdx) {
		this.templateIdx = templateIdx;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public int getPermissionCount() {
		return permissionCount;
	}

	public void setPermissionCount(int permissionCount) {
		this.permissionCount = permissionCount;
	}

	public boolean isPermissionValid() {
		return permissionValid;
	}

	public void setPermissionValid(boolean permissionValid) {
		this.permissionValid = permissionValid;
	}

	@Override
	public String toString() {
		return "User [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", comName=" + comName + ", userId_origin=" + userId_origin
				+ ", userId=" + userId + ", userName=" + userName + ", pwdEnc=" + pwdEnc + ", divisionCode="
				+ divisionCode + ", divisionName=" + divisionName + ", userTypeCode=" + userTypeCode + ", userTypeName="
				+ userTypeName + ", autoLoginSession=" + autoLoginSession + ", autoLoginSessionLimit="
				+ autoLoginSessionLimit + ", validYN=" + validYN + ", created=" + created + ", modified=" + modified
				+ ", empNo_origin=" + empNo_origin + ", empNo=" + empNo + ", menuAuthArr=" + menuAuthArr
				+ ", userUpdate=" + userUpdate + ", userAdd=" + userAdd + ", userRemove=" + userRemove + ", dpColor="
				+ dpColor + ", templateIdx=" + templateIdx + ", templateName=" + templateName + ", permissionCount="
				+ permissionCount + ", permissionValid=" + permissionValid + "]";
	}

	
}
