package org.marikaya.pd.controller;


import org.marikaya.pd.dao.UserBalanceDAO;
import org.marikaya.pd.dao.UserDAO;
import org.marikaya.pd.dto.UserBalanceDTO;
import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.request.DepositBalanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "balance")
public class UserBalanceController {

    private final UserBalanceDAO userBalanceDAO;
    private final UserDAO userDAO;

    @Autowired
    public UserBalanceController(UserBalanceDAO userBalanceDAO, UserDAO userDAO) {
        this.userBalanceDAO = userBalanceDAO;
        this.userDAO = userDAO;
    }

    @RequestMapping(path = "getBalances")
    public List<UserBalanceDTO> getBalances(Authentication authentication) {
        String loggedUserEmail = (String) authentication.getPrincipal();
        UserDTO loggedUser = this.userDAO.findByEmail(loggedUserEmail);

        return this.userBalanceDAO.findByUserId(loggedUser.getId());
    }


    @RequestMapping(path = "deposit")
    public void getBalances(@RequestBody DepositBalanceRequest depositBalanceRequest, Authentication authentication) {
        String loggedUserEmail = (String) authentication.getPrincipal();
        UserDTO loggedUser = this.userDAO.findByEmail(loggedUserEmail);
    }
}
