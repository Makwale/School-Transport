import { gql } from "apollo-angular";

export const GET_LEARNERS = gql`
query GetLearners {
    learner {
      name
      surname
      school: learner_schools{
        grade
      }
    }
}`;