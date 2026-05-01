export const GET_COMMENT_BY_COURSE = `
query Query($courseId: String!) {
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

export const CREATE_COMMENT_MUTATION = `
mutation Mutation($data: CreateReviewInput!) {
  createReview(data: $data) {
    isSuccess
    message
    reviews {
      id
      rating
      content
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
