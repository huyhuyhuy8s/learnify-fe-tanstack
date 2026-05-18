export const GET_LESSON_BY_ID = `
  query GetLessonById($id: String!) {
    getLessonById(id: $id) {
      isSuccess
      lessons {
        id
        lessonName
        abstract
        courseId
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_SECTIONS_BY_LESSON = `
  query GetSectionsByLesson($lessonId: String!) {
    getSectionByLesson(lessonId: $lessonId) {
      id
      urlPdf
      content
      order
      lecturer_segment
    }
  }
`;

export const GET_COURSE_BY_ID = `
  query GetCourseById($id: String!) {
    getCourseById(id: $id) {
      id
      courseName
      abstract
      keyLearnings
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_LESSONS_BY_COURSE_ID_QUERY = `
  query GetLessonsByCourseId($id: String!) {
    getLessonsByCourseId(id: $id) {
      isSuccess
      lessons {
        id
        lessonName
        abstract
        courseId
        createdAt
        updatedAt
      }
    }
  }
`;

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
