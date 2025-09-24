package kr.co.panclub.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.panclub.dao.IBizDao;
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


@Service
public class Bizservice  implements IBizService{

	@Autowired
	private IBizDao bizDao;

 

	@Override
	public List<Depart> deptList(HashMap<String, Object> params) {
		
		return bizDao.deptList(params);
	}
	

	//2022-10-24 장윤상
	@Override
	public List<Staff> staffList(HashMap<String, Object> params) {
		
		return bizDao.staffList(params);
	}
	
	@Override
	public Staff staffAdd(HashMap<String, Object> params) {
		
		return bizDao.staffAdd(params);
	}


	@Override
	public List<User> userList(HashMap<String, Object> params) {
		return bizDao.userList(params);
	}


	@Override
	public User userAdd(HashMap<String, Object> params) {
		return bizDao.userAdd(params);
	}


	@Override
	public int menuByUserAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
	
		if (("ADD").equals(workingType)){
			
			return bizDao.menuByUserAdd(params);
			
		}else if(("DEL").equals(workingType)){			
			return bizDao.menuByUserDel(params);
			
		}else {
			return bizDao.menuByUserUpt(params);
			
		}
	}


	@Override
	public List<MenuByUser> menuByUserList(HashMap<String, Object> params) {
		return bizDao.menuByUserList(params);
	}


	@Override
	public List<Payment> paymentList(HashMap<String, Object> params) {
		
		return bizDao.paymentList(params);
	}


	@Override
	public Payment paymentAdd(HashMap<String, Object> params) {
		
		return bizDao.paymentAdd(params);
	}


	@Override
	public List<CoCard> coCardList(HashMap<String, Object> params) {
		
		return bizDao.coCardList(params);
	}


	@Override
	public CoCard coCardAdd(HashMap<String, Object> params) {
		
		return bizDao.coCardAdd(params);
	}


	@Override
	public List<SalesAim> salesAimList(HashMap<String, Object> params) {
		
		return bizDao.salesAimList(params);
	}


	@Override
	public SalesAim salesAimAdd(HashMap<String, Object> params) {
		
		return bizDao.salesAimAdd(params);
	}


	@Override
	public List<CustLedg> custLedgList(HashMap<String, Object> params) {
		
		return bizDao.custLedgList(params);
	}


	@Override
	public List<CustBiz> custBizList(HashMap<String, Object> params) {
		
		return bizDao.custBizList(params);
	}


	@Override
	public WdReq wdReqAdd(HashMap<String, Object> params) {
		
		return bizDao.wdReqAdd(params);
	}


	@Override
	public WdReqDtl wdReqDtlAdd(HashMap<String, Object> params) {

		return bizDao.wdReqDtlAdd(params);
	}


	@Override
	public List<WdReq> wdReqList(HashMap<String, Object> params) {
		
		return bizDao.wdReqList(params);
	}


	@Override
	public List<WdReqDtl> wdReqDtlList(HashMap<String, Object> params) {
		
		return bizDao.wdReqDtlList(params);
	}


	@Override
	public MenuByUser menuByUserOne(HashMap<String, Object> params) {
		
		return bizDao.menuByUserOne(params);
	}


	@Override
	public int schAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
		if (("ADD").equals(workingType)) {
			return bizDao.schAdd(params);

		}

		/*
		 * else if (("UPT").equals(workingType)) {
		 * 
		 * bizDao.schDel(params); return bizDao.schAdd(params);
		 * 
		 * }
		 */

		else if (("DEL").equals(workingType)) {
			return bizDao.schDel(params);

		} else {
			return 0;
		}
	}

	 
	
	@Override
	public List<Schedule> scheduleList(HashMap<String, Object> i_param) {
		return bizDao.scheduleList(i_param);
	}

	@Override
	public List<UserLog> userLog(HashMap<String, Object> params) {
		return  bizDao.userLog(params);
	}


	@Override
	public List<Transaction> transactionList(HashMap<String, Object> i_param) {
		return bizDao.transactionList(i_param);
	}


	@Override
	public List<CustLedg> custLedgList2(HashMap<String, Object> params) {
		
		return bizDao.custLedgList2(params);
	}


	@Override
	public List<Transaction> transactionList2(HashMap<String, Object> i_param) {
		return bizDao.transactionList2(i_param);
	}


	@Override
	public List<CustLedg> otherReceivablesList(HashMap<String, Object> i_param) {
		return bizDao.otherReceivablesList(i_param);
	}
	//2024.07.08 supi 마감경과 작업조회 데이터 받는 통신
	@Override
	public List<HashMap<String, Object>> closeTaskList(HashMap<String, Object> i_param) {
		return bizDao.closeTaskList(i_param);
	}
	@Override
	public String permissionURLCheck(HashMap<String, Object> i_param)
	{ 
		return bizDao.permissionURLCheck(i_param);
	}
}
