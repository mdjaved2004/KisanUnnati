package com.KisanUnnatiBackend.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "categorize_of_crops")
@Data
public class AddCategoryEntity {
	 @Id	
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
     private int categoryId;
	 
	 @Column(name="category", nullable = false, unique = true, length=30)
	 private String category;
	 
	 @Column(name = "date", nullable = false)
	 private LocalDate date;
	 
	 @Column(name = "adminId", nullable = false)
	 private int adminId;
	 
	 @Column(name = "display", nullable = false)
	 private boolean display = true;
	 
	 @Column(name = "deletedDate", columnDefinition = "DATE DEFAULT NULL")
	 private LocalDate deletedDate;

}
