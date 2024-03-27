package com.diginamic.apiback.models;

import java.util.Date;

import com.diginamic.apiback.dto.SpecificAbsenceDTO;
import com.diginamic.apiback.enums.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@lombok.Getter
@lombok.Setter
public class SpecificAbsence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Organization organization;

    private Date dt_debut;

    private Date dt_fin;

    @Enumerated(EnumType.STRING)
    private AbsenceType type;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String motif;

    @Column(name = "organization_id", insertable = false, updatable = false)
    private Long organization_id;

    public SpecificAbsence() {

    }

    @Override
    public String toString() {
        return "SpecificAbsence [id=" + id + ", organization=" + organization + ", dt_debut=" + dt_debut + ", dt_fin="
                + dt_fin + ", type=" + type + ", status=" + status + ", motif=" + motif + "]";
    }

    public SpecificAbsenceDTO toDto() {
        SpecificAbsenceDTO absenceDTO = new SpecificAbsenceDTO();
        absenceDTO.setDt_debut(dt_debut);
        absenceDTO.setDt_fin(dt_fin);
        absenceDTO.setId(id);
        absenceDTO.setMotif(motif);
        absenceDTO.setStatus(status);
        absenceDTO.setType(type);
        return absenceDTO;
    }
}
