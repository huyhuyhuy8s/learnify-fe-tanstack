export const GET_ALL_COURSES_QUERY = `
  query GetAllCourses($skip: Float!) {
    getAllCourses(skip: $skip) {
      count
      courses {
        id
        courseName
        abstract
        createdAt
        keyLearnings
        status
        updatedAt
      }
      isSuccess
      message
    }
  }
`;

export const GET_COURSE_AND_LESSONS_QUERY = `
  query GetCourseAndLessons($courseId: String!, $lessonCourseId: String!) {
    getCourseById(id: $courseId) {
      id
      courseName
      abstract
      createdAt
      keyLearnings
      status
      updatedAt
    }
    getLessonsByCourseId(id: $lessonCourseId) {
      isSuccess
      count
      message
      lessons {
        id
        courseId
        abstract
        createdAt
        lessonName
        updatedAt
      }
    }
  }
`;
