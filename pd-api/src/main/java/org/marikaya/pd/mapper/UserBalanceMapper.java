package org.marikaya.pd.mapper;

import org.marikaya.pd.dto.UserBalanceDTO;
import org.marikaya.pd.entity.UserBalanceEntity;
import org.marikaya.pd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton")
public class UserBalanceMapper extends BaseMapper<UserBalanceEntity, UserBalanceDTO> {

    private final UserRepository userRepository;

    @Autowired
    public UserBalanceMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserBalanceDTO mapToDTO(UserBalanceEntity entity) {
        UserBalanceDTO userBalanceDTO = new UserBalanceDTO();
        userBalanceDTO.setAmount(entity.getAmount());
        userBalanceDTO.setKey(entity.getKey());
        userBalanceDTO.setUserId(entity.getUser().getId());
        return userBalanceDTO;
    }

    @Override
    public UserBalanceEntity mapToEntity(UserBalanceDTO dto) {
        UserBalanceEntity userBalanceEntity = new UserBalanceEntity();
        userBalanceEntity.setAmount(dto.getAmount());
        userBalanceEntity.setUser(this.userRepository.getOne(dto.getUserId()));
        userBalanceEntity.setKey(dto.getKey());
        return userBalanceEntity;
    }
}
