import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faUserCircle,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { StyledTableCell } from "./styledTableCell";
import { StyledTableRow } from "./styledTableRow";

export default function CustomTableCell({ person }) {
  const [homeWorld, setHomeWorld] = useState("");

  const fetchHomeWorld = useCallback(async () => {
    let response = await axios.get(person.homeworld);

    setHomeWorld(response.data.name);
  }, [person, setHomeWorld]);

  useEffect(() => {
    fetchHomeWorld();
  }, [fetchHomeWorld]);

  function getIcon(gender) {
    if (gender === "male" || gender === "female") {
      return <FontAwesomeIcon icon={faUserCircle} />;
    }
    if (gender === "n/a") return <FontAwesomeIcon icon={faRobot} />;
    return <FontAwesomeIcon icon={faQuestion} />;
  }

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="center">
          {getIcon(person.gender)}
        </StyledTableCell>
        <StyledTableCell align="center">{person.name}</StyledTableCell>
        <StyledTableCell align="center">{person.height}</StyledTableCell>
        <StyledTableCell align="center">{person.mass}</StyledTableCell>
        <StyledTableCell align="center">{person.hair_color}</StyledTableCell>
        <StyledTableCell align="center">{person.skin_color}</StyledTableCell>
        <StyledTableCell align="center">{person.eye_color}</StyledTableCell>
        <StyledTableCell align="center">{person.birth_year}</StyledTableCell>
        <StyledTableCell align="center">{person.gender}</StyledTableCell>
        <StyledTableCell align="center">{homeWorld}</StyledTableCell>
      </StyledTableRow>
    </>
  );
}
