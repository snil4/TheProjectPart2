package com.yiftach.TheProjectPart3.app.core.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yiftach.TheProjectPart3.app.core.data.Category;
import org.hibernate.annotations.Check;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Check(constraints = "amount >= 0 && price >= 0")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Column(unique = true)
    private String title;
    private String description;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    private int amount;
    private double price;
    private String imageName;
    @ManyToMany
    @JoinTable(name = "customers_vs_coupons",joinColumns = @JoinColumn(name = "coupon_id")
    ,inverseJoinColumns = @JoinColumn(name = "customer_id"))
    @JsonIgnore
    private List<Customer> customers;

    public Coupon() {
    }

    public Coupon(int id, Company company, Category category, String title, LocalDate startDate, LocalDate endDate,
                  int amount, double price) {
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
    }

    public Coupon(int id, Company company, Category category, String title, String description, LocalDate startDate,
                  LocalDate endDate, int amount, double price, String imageName) {
        setId(id);
        setCompany(company);
        setCategory(category);
        setTitle(title);
        setDescription(description);
        setStartDate(startDate);
        setEndDate(endDate);
        setAmount(amount);
        setPrice(price);
        setImage(imageName);
    }

    @Override
    public String toString() {
        return "core.app.beans.Coupon{" +
                "id=" + id +
                ", company=" + company +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                ", price=" + price +
                ", image='" + imageName + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImage(String imageName) {
        this.imageName = imageName;
    }
}
