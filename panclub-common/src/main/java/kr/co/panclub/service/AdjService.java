package kr.co.panclub.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.panclub.dao.IAdjDao;

import kr.co.panclub.model.AosAccInfo;
import kr.co.panclub.model.AosAccPart;
import kr.co.panclub.model.CommonResult;
@Service
public class AdjService implements IAdjService {
	@Autowired
	private HttpSession session;
	
	@Autowired
	private IAdjDao adjDao;
	
	@Override
	public int test(int params)
	{
		return adjDao.test(params);
	}
	@Override
	public CommonResult aosAccAdd(AosAccInfo params)
	{
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		params.setLogComCode(logComCode);
		params.setLogUserId(logUserId);
		
		return adjDao.aosAccAdd(params);
	}
	@Override
	public CommonResult aosAccPartAdd(AosAccPart params)
	{
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		params.setLogComCode(logComCode);
		params.setLogUserId(logUserId);
		
		return adjDao.aosAccPartAdd(params);
	}
	@Override
	public List<AosAccInfo> aosAccList(HashMap<String, Object> params)
	{
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		
		return adjDao.aosAccList(params);
	}
	@Override
	public List<AosAccPart> aosAccPartList(HashMap<String, Object> params)
	{
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		
		return adjDao.aosAccPartList(params);
	}
	@Override
	public List<HashMap<String, Object>> aosInscdList()
	{
		return adjDao.aosInscdList();
	}
}
