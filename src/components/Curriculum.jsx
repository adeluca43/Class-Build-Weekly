import { useState, useEffect } from "react";
import { getCurriculums } from "../services/curriculumService";

export const Curriculum = () => {
  const [curriculumList, setCurriculumList] = useState([]);

  useEffect(() => {
    getCurriculums().then(setCurriculumList);
  }, []);

  return (
    <div>
      <h2>Curriculum Page</h2>
      {curriculumList.map((curriculum) => (
        <div key={curriculum.id}>
          <h3>{curriculum.className}</h3>
          <p>{curriculum.description}</p>
          <a href={curriculum.file} target="_blank" rel="noopener noreferrer">
            View Curriculum
          </a>
        </div>
      ))}
    </div>
  );
};
