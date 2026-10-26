package com.store.store_backend.service;

import com.store.store_backend.entity.User;
import com.store.store_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("این ایمیل قبلاً ثبت شده است");
        }

        return userRepository.save(user);
    }

    public User login(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new RuntimeException("ایمیل یا رمز عبور اشتباه است");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("ایمیل یا رمز عبور اشتباه است");
        }

        return user;
    }
}