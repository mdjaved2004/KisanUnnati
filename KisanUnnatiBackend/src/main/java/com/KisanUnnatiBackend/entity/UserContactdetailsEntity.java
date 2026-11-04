package com.KisanUnnatiBackend.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "UserContactDetails")
public class UserContactdetailsEntity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userContactId;
	
	
	@Column(name = "mobile_number", length = 10, nullable = false)
	private String mobileNumber;
	
	@Column(name = "stateName", length = 255)
	private String stateName;
	
	@Column(name = "district", length = 255, nullable = false)
	private String district;
	
	@Column(name = "city", length = 255, nullable = false)
	private String city;
	
	@Column(name = "address",length = 150, nullable = false)
	private String address;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "userId")
	@JsonIgnore
	private UserRegisterLoginEntity userRegisterLoginEntity;	
}
