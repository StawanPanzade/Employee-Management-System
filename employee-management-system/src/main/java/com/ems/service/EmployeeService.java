package com.ems.service;

import java.util.List;

import com.ems.dto.EmployeeDto;

public interface EmployeeService {
	// method of Creating Employee
	EmployeeDto createEmployee(EmployeeDto employeeDto);
	
	
	EmployeeDto getEmployeeById(Long employeeId);
	
	List<EmployeeDto> getAllEmployees();
	
	EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

	void deleteEmployee(Long employeeId);

}
