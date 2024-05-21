package com.diginamic.apiback.services;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.diginamic.apiback.models.Absence;
import com.diginamic.apiback.models.User;
import com.diginamic.apiback.repository.AbsenceRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Classe de test pour le service AbsenceService.
 */
public class AbsenceServiceTest {

    @Mock
    private AbsenceRepository absenceRepository;

    @Mock
    private UserService userService;

    @Mock
    private ServiceService serviceService;

    @InjectMocks
    private AbsenceService absenceService;

    public AbsenceServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<Absence> expectedAbsences = new ArrayList<>();
        expectedAbsences.add(new Absence());
        expectedAbsences.add(new Absence());
        when(absenceRepository.findAll()).thenReturn(expectedAbsences);

        List<Absence> actualAbsences = absenceService.findAll();

        assertEquals(expectedAbsences, actualAbsences);
        verify(absenceRepository, times(1)).findAll();
    }

    @Test
    void testfindAllForCurrentManager() {
        User user = new User();
        List<Absence> expectedAbsences = new ArrayList<>();
        expectedAbsences.add(new Absence());
        expectedAbsences.add(new Absence());
        when(absenceRepository.findByManagerId(user)).thenReturn(expectedAbsences);

        List<Absence> actualAbsences = absenceService.findAllForCurrentManager(user);

        assertEquals(expectedAbsences, actualAbsences);
        verify(absenceRepository, times(1)).findByManagerId(user);
    }

    @Test
    void testFindAllForCurrentManager() {
        User user = new User();
        List<Absence> expectedAbsences = new ArrayList<>();
        expectedAbsences.add(new Absence());
        expectedAbsences.add(new Absence());
        when(absenceRepository.findByManagerId(user)).thenReturn(expectedAbsences);

        List<Absence> actualAbsences = absenceService.findAllForCurrentManager(user);

        assertEquals(expectedAbsences, actualAbsences);
        verify(absenceRepository, times(1)).findByManagerId(user);
    }

}