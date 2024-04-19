package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.dto.EmployeeDto;
import com.ems.service.EmployeeService;

@CrossOrigin("*") // star means all the client can able to call rest api
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	
	// inject the dependency
	@Autowired
	private EmployeeService employeeService;

	//Build Add Employee REST API    { Insert Employee Details In a Database }
	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
		EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
		return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
	}
	
	//Build Get Employee REST API   { Get Employee Details From the Database }
	@GetMapping("/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
		EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
		return ResponseEntity.ok(employeeDto);
	}
	
	//Build Get All Employee REST API { Get All Employees Data From The Database }
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
		List<EmployeeDto> employees = employeeService.getAllEmployees();
		return ResponseEntity.ok(employees);
	}
	
	// Build Update Employee REST API  { Update the exiting Employee Data From the Database } 
	@PutMapping("/{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, 
														@RequestBody EmployeeDto updatedEmployeeDto){
		
		EmployeeDto  employeeDto = employeeService.updateEmployee(employeeId, updatedEmployeeDto);
		
		return ResponseEntity.ok(employeeDto);
	}
	
	//Build Delete Employee REST API  { Delete The Exiting Employee Data From The Database } 
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Employee Deleted Successfully...");
	}
	
}
