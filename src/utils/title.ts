import isEmpty from "lodash/isEmpty";

export const createLearnerHead = (pageTitle: string) => ({
  meta: [
    {
      title: `${!isEmpty(pageTitle) && pageTitle + " | "} Learnify for Learner`,
    },
  ],
});
