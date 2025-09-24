package kr.co.panclub.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.CoCard;
import kr.co.panclub.model.CustBiz;
import kr.co.panclub.model.CustLedg;
import kr.co.panclub.model.Depart;
import kr.co.panclub.model.MenuByUser;
import kr.co.panclub.model.Payment;
import kr.co.panclub.model.SalesAim;
import kr.co.panclub.model.Schedule;
import kr.co.panclub.model.Staff;
import kr.co.panclub.model.Transaction;
import kr.co.panclub.model.User;
import kr.co.panclub.model.UserLog;
import kr.co.panclub.model.WdReq;
import kr.co.panclub.model.WdReqDtl;


public interface IBizDao {

	public List<Staff> staffList(HashMap<String, Object> params);       //사원 리스팅
	public List<Depart> deptList(HashMap<String, Object> params);       //부서리스팅   
	
	public Staff staffAdd(HashMap<String, Object> params);   // 사원 등록
		
	public List<User> userList(HashMap<String, Object> params);       //사용자리스팅 정동근 추가   
	public User userAdd(HashMap<String, Object> params);	//사용자추가
	

	//사용자별메뉴
	public int menuByUserAdd(HashMap<String, Object> params);   // 등록
	public int menuByUserDel(HashMap<String, Object> params);   // 등록
	public int menuByUserUpt(HashMap<String, Object> params);   // 등록
	public List<MenuByUser> menuByUserList(HashMap<String, Object> params);       //리스팅   
	public MenuByUser menuByUserOne(HashMap<String, Object> params);     // 1개 조회 	
	
	//계좌/카드 
	public List<Payment> paymentList(HashMap<String, Object> params);       //리스팅   
	public Payment paymentAdd(HashMap<String, Object> params);	//추가

	//법인카드 
	public List<CoCard> coCardList(HashMap<String, Object> params);       //리스팅   
	public CoCard coCardAdd(HashMap<String, Object> params);	//추가
	
	//매출목푝 
	public List<SalesAim> salesAimList(HashMap<String, Object> params);       //리스팅   
	public SalesAim salesAimAdd(HashMap<String, Object> params);	//추가

	//거래처원장
	public List<CustLedg> custLedgList(HashMap<String, Object> params);       //리스팅

	//거래처별 종합 거래장
	public List<CustBiz> custBizList(HashMap<String, Object> params);       //리스팅
		
	//출금요청
	public WdReq wdReqAdd(HashMap<String, Object> params);   // 등록
	public WdReqDtl wdReqDtlAdd(HashMap<String, Object> params);   // 등록
	public List<WdReq> wdReqList(HashMap<String, Object> params);       // 마스터 리스트   
	public List<WdReqDtl> wdReqDtlList(HashMap<String, Object> params);       //디테일리스트   

	//일정
	public int schAdd(HashMap<String, Object> params);
	 
	public List<Schedule> scheduleList(HashMap<String, Object> i_param);	//일정리스트
	public int schUpt(HashMap<String, Object> params); //일정업데이트
	public int schDel(HashMap<String, Object> params);
	
	//로그현황
	public List<UserLog> userLog(HashMap<String, Object> params);       //리스팅
	//거래상세내역 
	public List<Transaction> transactionList(HashMap<String, Object> i_param);//리스팅

	//거래처원장
	public List<CustLedg> custLedgList2(HashMap<String, Object> params);       //리스팅
	public List<Transaction> transactionList2(HashMap<String, Object> i_param);
	public List<CustLedg> otherReceivablesList(HashMap<String, Object> i_param);
	public List<HashMap<String, Object>> closeTaskList(HashMap<String, Object> i_param); //2024.07.08 supi 마감경과 작업조회 데이터 받는 통신
 
	public String permissionURLCheck(HashMap<String, Object> params); 
}