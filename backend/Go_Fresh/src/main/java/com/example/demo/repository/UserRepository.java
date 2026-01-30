package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;



@Repository
public interface UserRepository extends JpaRepository<User, Integer> {



    @Query("""
        SELECT u FROM User u
        JOIN FETCH u.role
        WHERE u.email = :value OR u.username = :value
    """)
    User findByEmailOrUsername(@Param("value") String value);
	
	
//	Optional<User> findByUsername(String username);
//
//	Optional<User> findByEmail(String email);
//
//	boolean existsByUsername(String username);
//
//	boolean existsByEmail(String email);

}
