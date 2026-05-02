// Author: Gowtham B
// Loan Application and Approval System

package com.examly.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableAsync
public class SpringappApplication {

	public static void main(String[] args) {
		System.out.println("CWD: " + System.getProperty("user.dir"));
		try {
			Dotenv dotenv = Dotenv.load();
			System.out.println("Dotenv loaded successfully");
			System.out.println("Dotenv entries: " + dotenv.entries());
			// Manually set system properties
			System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
			System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
			System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
			System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));
		} catch (Exception e) {
			System.out.println("Dotenv load failed: " + e.getMessage());
			e.printStackTrace();
		}
		System.out.println("DB_USERNAME: " + System.getProperty("DB_USERNAME"));
		System.out.println("JWT_SECRET: " + System.getProperty("JWT_SECRET"));
		SpringApplication.run(SpringappApplication.class, args);
	}
}
