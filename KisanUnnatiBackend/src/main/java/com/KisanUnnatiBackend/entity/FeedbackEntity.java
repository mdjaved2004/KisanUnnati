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

@Entity
@Table(name = "feedback")
@Data
public class FeedbackEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedbackId")
    private int feedbackId;

    @Column(name = "feedback", nullable = false, length = 500)
    private String feedback;
    
    @Column(name = "date", nullable = false)
	private LocalDate date;
    
    @Column(name = "updatingFeedbackDate", nullable = true)
	private LocalDate updatingFeedbackDate;
    
    @Column(name = "rating")
    private int rating;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_contact_id", referencedColumnName = "userContactId")
    private UserContactdetailsEntity contactdetailsEntity;
}
