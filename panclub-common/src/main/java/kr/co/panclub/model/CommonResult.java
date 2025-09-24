package kr.co.panclub.model;


//2024.08.23 supi 추가삭제등 결과값을 성공실패등 메세지만 받기위한 공용 결과메세지 dto
public class CommonResult {
	private String db_resultCode;
	private String db_resultMsg;
	private int idx; //2024.10.04 supi 공용적으로 생성 확인 받을때 인덱스나 순번, 요청번호등 받을경우 여기로
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
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	@Override
	public String toString() {
		return "CommonResult [db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg + ", idx=" + idx + "]";
	}
	
	
}
