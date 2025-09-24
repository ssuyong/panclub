package kr.co.panclub.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import kr.co.panclub.model.AosAccInfo;
import kr.co.panclub.model.AosAccPart;
import kr.co.panclub.model.CommonResult;
import kr.co.panclub.service.AdjService;


/**
 * 정산관리 컨트롤러
 * 20240822 supi
 */ 
@RestController
@RequestMapping("/adj/*")
public class AdjController {
	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private AdjService adjService;
	
	
	//정산관리 내역 페이지오픈
	@RequestMapping(value = "/fi-acc-list")
	public ModelAndView mavFiAccList() {
		
		return new ModelAndView("adj/fi-acc-list");
			
	}
	
	@RequestMapping(value = "/test")
	public int test(@RequestParam int params)
	{
		
		return adjService.test(params);
	}
	@RequestMapping(value ="/aos-acc-add")
	public CommonResult aosAccAdd( AosAccInfo params)
	{
		System.out.println(params); 
		return adjService.aosAccAdd(params);
	}
	@RequestMapping(value ="/aos-acc-part-add")
	public CommonResult aosAccPartAdd(AosAccPart params)
	{
		
		return adjService.aosAccPartAdd(params);
	}
	@RequestMapping(value ="/aos-acc-list")
	public List<AosAccInfo> aosAccList(@RequestBody HashMap<String, Object> params)
	{
		System.out.println(params); 
		return adjService.aosAccList(params);
	}
	@RequestMapping(value ="/aos-acc-part-list")
	public List<AosAccPart> aosAccPartList(@RequestBody HashMap<String, Object> params)
	{
		System.out.println(params); 
		return adjService.aosAccPartList(params);
	}
	@RequestMapping(value = "/aos-inscd-list")
	public List<HashMap<String, Object>> aosInscdList()
	{
		return adjService.aosInscdList();
	}
 
}
