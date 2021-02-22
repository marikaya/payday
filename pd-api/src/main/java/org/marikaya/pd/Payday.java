package org.marikaya.pd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(
        exclude = UserDetailsServiceAutoConfiguration.class)
@EnableJpaRepositories(
        basePackages = "org.marikaya.pd.repository"
)
public class Payday {

    public static void main(String[] args) {
        SpringApplication.run(Payday.class, args);
    }
}
