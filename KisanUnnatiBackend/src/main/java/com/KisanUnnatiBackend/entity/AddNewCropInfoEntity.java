package com.KisanUnnatiBackend.entity;


import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "crops_Information")
@Data
public class AddNewCropInfoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cropId")
	private int cropId;

	@Column(name = "cropName", nullable = false, length = 50)
	private String cropName;

	@Column(name = "date", nullable = false)
	private LocalDate date;

	@Column(name = "adminId", nullable = false)
	private int adminId;

	@Column(name = "imageLink", length = 350)
	private String imageLink;

	@Column(name = "imageAddAdminId")
	private int imageAddAdminId;

	@Column(name = "state", nullable = false)
	private String state;

	@Column(name = "deletedDate", nullable = true)
	private LocalDate deletedDate;
    
	@Column(name = "fileLink", nullable = true)
	private String fileLink;
	
	@Column(name = "fileAddAdminId")
	private int fileAddAdminId;

	@Column(name = "display", nullable = false)
	private boolean display = true;
 
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "categoryId", referencedColumnName = "categoryId", nullable = false)
	private AddCategoryEntity categoryId;
}

