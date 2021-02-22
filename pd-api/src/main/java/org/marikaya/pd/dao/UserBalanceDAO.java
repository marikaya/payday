package org.marikaya.pd.dao;

import org.marikaya.pd.dto.UserBalanceDTO;
import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.entity.UserBalanceEntity;
import org.marikaya.pd.entity.UserEntity;
import org.marikaya.pd.mapper.UserBalanceMapper;
import org.marikaya.pd.mapper.UserMapper;
import org.marikaya.pd.repository.UserBalanceRepository;
import org.marikaya.pd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserBalanceDAO extends BaseDAO<UserBalanceEntity, UserBalanceDTO, Long, UserBalanceRepository, UserBalanceMapper> {

    @Autowired
    public UserBalanceDAO(UserBalanceRepository repository, UserBalanceMapper mapper) {
        super(repository, mapper);
    }

    public List<UserBalanceDTO> findByUserId(long userId){
        List<UserBalanceEntity> balanceEntityList = this.repository.findByUserId(userId);
        return this.mapper.mapToDTO(balanceEntityList);
    }
}