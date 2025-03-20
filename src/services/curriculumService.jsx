export const getCurriculums = () => {
  return fetch("http://localhost:8088/curriculums").then((res) => res.json());
};
