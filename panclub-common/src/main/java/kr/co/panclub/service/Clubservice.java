package kr.co.panclub.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.panclub.common.SHA256Util;
import kr.co.panclub.dao.IBaseDao;
import kr.co.panclub.dao.IBizDao;
import kr.co.panclub.dao.IClubDao;
import kr.co.panclub.model.C_cust;
import kr.co.panclub.model.C_custMenu;
import kr.co.panclub.model.User;


@Service
public class Clubservice  implements IClubService{

	@Autowired
	private IClubDao clubDao;

	@Autowired
	private IBaseDao baseDao;

	@Autowired
	private IBizDao bizDao;



	@Override
	public List<C_cust> c_custList(HashMap<String, Object> params) {
		
		return clubDao.c_custList(params);
	}

	@Transactional
	@Override
	public int c_custReg(HashMap<String, Object> params) {

		String workingType = (String) params.get("workingType");
		int result = 0;
		User i_user = new User();
		User o_user = new User();
		if (("ADD").equals(workingType)){
			//return baseDao.c_custAdd(params);
			try {
				result = clubDao.c_custAdd(params);
				if (result ==1) {  //팬클럽 사용거래처 성공하면 masterId를 시스템관리자로 등록.
					Iterator<String> it = params.keySet().iterator(); 

					//키값이 존재할동안 반복
					while(it.hasNext()) {
						String key = it.next();
						
						
						if (("c_cust").equals(key)) {
							C_cust i_c_cust = new C_cust();
							i_c_cust = (C_cust) params.get(key);
							
							i_user.setComCode(i_c_cust.getCustCode());
							i_user.setUserId(i_c_cust.getMasterId()); //masterId
							i_user.setUserName(i_c_cust.getCustName()); //custName
							i_user.setPwdEnc(SHA256Util.getSha256("aptapt"));//최초 masterId 를 비밀번호로 함.
							i_user.setUserTypeCode("시스템관리자");
							i_user.setValidYN("Y");
							 break;
						}
					}
					
					/*
					 * i_user.setUserId(params.get("c_cust").getClass(); //masterId
					 * i_user.setUserName(params.get("c_cust").getClass(); //custName
					 * i_user.setPwdEnc(params.get("c_cust").getClass();
					 * i_user.setUserTypeCode(params.get("c_cust").getClass();
					 * i_user.setValidYN("Y");
					 */
					
					params.put("user", i_user);
					o_user = bizDao.userAdd(params);
					
					if (("OK").equals(o_user.getDb_resultCode())){
						return result;
					}				
				}				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return result;  // 0 이 리턴됨.
		}else if(("DEL").equals(workingType)){			
			return clubDao.c_custDel(params);
		}else {
			return clubDao.c_custUpt(params);			
		}
	}

	@Override
	public List<C_custMenu> c_custMenuList(HashMap<String, Object> params) {
		
		return clubDao.c_custMenuList(params);
	}

	@Override
	public int c_custMenuReg(HashMap<String, Object> params) {
		
		String workingType = (String) params.get("workingType");
		
		if (("ADD").equals(workingType)){
			return clubDao.c_custMenuAdd(params);
		//}else if(("DEL").equals(workingType)){			
		//	return clubDao.c_custMenuDel(params);
		}else {
			return clubDao.c_custMenuDel(params);			
		}
	}
	

}
