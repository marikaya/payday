package org.marikaya.pd.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "PD_USER_BALANCE")
@Entity
public class UserBalanceEntity extends BaseEntity {

    @ManyToOne(targetEntity = UserEntity.class)
    private UserEntity user;
    private String key;

    @Column(precision = 10, scale = 2)
    private Double amount;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
