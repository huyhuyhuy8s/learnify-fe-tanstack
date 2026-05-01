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

export const GET_COURSE_LESSONS_COMMENT_QUERY = `
  query GetCourseLessonsComment($courseId: String!, $lessonCourseId: String!) {
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
    getReviewsByCourse(courseId: $courseId) {
    isSuccess
    message
    reviews {
      id
      content
      rating
      createdAt
      user {
        id
        email
        diamond
        currentSteak
        role
        username
      }
    }
  }
  }
`;
