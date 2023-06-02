export interface Plan {
  time?: string;
  contentsString?: string;
}

export interface PlanContainer {
  id?: number;
  creationTime?: string;
  contents?: Plan[];
  isSuccess?: number; //  1 : 성공, 2 : 반절 성공, 3 : 실패
}

export interface UserPlan {
  id: string;
  name: string;
  email: string;
  plan: PlanContainer[];
}
