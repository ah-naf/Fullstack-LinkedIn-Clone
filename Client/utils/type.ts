export type EventType = React.FormEvent<HTMLFormElement>;

export interface RegDetailsType extends LoginDetailsType {
  fullName: string;
  username: string;
}

export interface LoginDetailsType {
  email: string;
  password: string;
}

export interface PostType {
  user_id: string
  post_id: string;
  post: string;
  img: string;
  post_time: string;
  comments: string;
  username: string;
  avatar: string;
  full_name: string;
  bio: string;
  total_likes: string;
}

export interface PropsType {
  current_user: UserType;
  user_details: UserDetailsType;
  posts: PostType;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  avatar: string;
  full_name: string;
}

export interface UserDetailsType {
  user_id: string;
  summary: string;
  bio: string;
  experience: string;
  education: string;
  skill: string;
}

export interface SummaryType {
  id: string;
  summary: string;
}

export interface ExperienceType {
  id: string;
  experience: OnlyExperienceType[];
}

export interface OnlyExperienceType {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  desc: string;
}

export interface SkillType {
  id: string;
  skill: string[];
}

export interface SendPostType {
  post: {
    id: string;
    desc: string;
    image: string;
    post_time: string;
  };
}

export interface SendCommentType {
  post_id: string;
  full_name: string;
  avatar: string;
  username: string;
  bio: string;
  comment: string;
}

export interface SendCompanyType {
  name: string;
  website: string;
  type: string;
  tagline: string;
  company_logo: string;
  cover_pic: string;
  location: string
}

export interface CompanyType extends SendCompanyType {
  id: string
}

export interface SendJobType {
  position: string,
  company: string,
  location: string,
  type: string,
  workplace_type: string,
  desc: string
}

export interface JobType extends SendJobType {
  id: string,
  user_id: string
  avatar: string,
  bio: string,
  full_name: string
}

export interface PymkType {
  id: string,
  full_name: string,
  bio: string,
  username: string,
  avatar: string
}