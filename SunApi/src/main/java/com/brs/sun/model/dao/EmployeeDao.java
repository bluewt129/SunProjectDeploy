package com.brs.sun.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.brs.sun.vo.EmployeeVo;


@Mapper
public interface EmployeeDao {

	List<EmployeeVo> MemberList();
	
	List<EmployeeVo> MemberList1();
	
	List<EmployeeVo> MemberList2();
	
	EmployeeVo login(String empcode, String emppw);
	
	EmployeeVo Info(String empcode);
	
	int updateMember(EmployeeVo employeeVo);
	
	int updateImage(String empCode, String empImg);
	
	EmployeeVo getMemberImage(String empCode);
	
	int passwordReset(String empCode);
	
	String generateEmpCode(String joinDate);

    void insertEmployee(EmployeeVo employeeVo);
    
    int updatePassword(String empCode, String encChangePassword);
}
