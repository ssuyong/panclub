package kr.co.panclub.service;

import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.AosAccInfo;
import kr.co.panclub.model.AosAccPart;
import kr.co.panclub.model.CommonResult;

public interface IAdjService {
	public int test(int params);
	public CommonResult aosAccAdd(AosAccInfo params);  
	public CommonResult aosAccPartAdd(AosAccPart params); 
	public List<AosAccInfo> aosAccList(HashMap<String, Object> params); 
	public List<AosAccPart> aosAccPartList(HashMap<String, Object> params); 
	public List<HashMap<String, Object>> aosInscdList(); 
}
