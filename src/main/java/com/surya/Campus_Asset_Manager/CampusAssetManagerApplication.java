package com.surya.Campus_Asset_Manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CampusAssetManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusAssetManagerApplication.class, args);
	}

}
