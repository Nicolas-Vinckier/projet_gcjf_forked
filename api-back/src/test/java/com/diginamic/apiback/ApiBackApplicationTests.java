package com.diginamic.apiback;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.diginamic.apiback.services.TraitementNuitService;

@SpringBootTest
class ApiBackApplicationTests {

	@SpyBean
	private TraitementNuitService traitementNuitService;

	@Test
	void contextLoads() {
		traitementNuitService.launchTraitementNuit();
	}

	@Test
	void traitementNuitServiceIsNotNull() {
		assertNotNull(traitementNuitService, "TraitementNuitService should not be null");
	}

	@Test
	void launchTraitementNuitIsCalledOnce() {
		contextLoads();
		verify(traitementNuitService, times(1)).launchTraitementNuit();
	}
}