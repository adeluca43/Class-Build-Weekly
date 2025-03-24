import { useState, useEffect } from "react";
import { getCurriculums } from "../services/curriculumService";

export const Curriculum = () => {
  const [curriculumList, setCurriculumList] = useState([]);

  useEffect(() => {
    getCurriculums().then(setCurriculumList);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">Curriculum Page</h2>
  
      <div className="row">
        {curriculumList.map((curriculum) => (
          <div key={curriculum.id} className="col-md-6 mb-4">
            <div className="card shadow-sm p-3 h-100">
              <h3 className="text-success">{curriculum.className}</h3>
              <p className="fs-5">{curriculum.description}</p>
              <a
                href={curriculum.file}
                target="_blank"
                rel="noopener noreferrer"
                className="btn fw-bold"
                style={{ backgroundColor: "goldenrod", color: "black", border: "none" }}
              >
                View Curriculum
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};
