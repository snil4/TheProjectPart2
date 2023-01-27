package com.yiftach.TheProjectPart3.app.core.entities;

import com.yiftach.TheProjectPart3.app.core.data.Role;

import javax.persistence.*;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "client_id")
    private int clientId;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    public Client() {
    }

    public Client(int id, int clientId, String name, String email, String password, Role role) {
        this.id = id;
        this.clientId = clientId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Client(int id, int clientId, String name, String email, Role role) {
        this.id = id;
        this.clientId = clientId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
