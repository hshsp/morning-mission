export interface Plan {
  time?: string;
  contentsString?: string;
}

export interface UserPlan {
  id: string;
  name: string;
  email: string;
  plan: {
    id?: number;
    creationTime?: string;
    contents?: Plan[];
  }[];
}
