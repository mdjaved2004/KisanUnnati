package com.KisanUnnatiBackend.entity;


import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;


@Data
@Entity
@Table(name = "crop_seller_listings")
public class CropSellerListingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sellingId;

	@Column(name = "crop_name", length = 100, nullable = false)
	private String cropName;
	
	@Column(name = "cropCategory", length = 100, nullable = false)
	private String cropCategory;

//	@Column(name = "seller_name", length = 50, nullable = false)
//	private String sellerName;
//
//	@Column(name = "seller_email", length = 100, nullable = false)
//	private String sellerEmail;

	@Column(name = "price", nullable = false)
	private Double price;

	@Column(name = "quantity", nullable = false)
	private Double quantity;

	@Column(name = "total_quantity", nullable = false)
	private Double totalQuantity;

//	@Column(name = "contact_number", length = 10, nullable = false)
//	private String contactNumber;

//	@Column(name = "address", length = 200, nullable = false)
//	private String address;

	@Column(name = "description", length = 1000)
	private String description;

	@Column(name = "image_path", length = 500)
	private String imagePath;

	@Column(name = "date", nullable = false)
	private LocalDate date;
	
	@Column(name = "sellingCompletingDate", nullable = true)
	private LocalDate sellingCompletingDate;
	
	@Column(name = "display", nullable = false)
	private boolean display = true;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_contact_id", referencedColumnName = "userContactId")
	private UserContactdetailsEntity contactdetailsEntity;
}
