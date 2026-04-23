/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: string; output: string };
  DateTime: { input: string; output: string };
  JSON: { input: Record<string, unknown>; output: Record<string, unknown> };
  Upload: { input: File; output: File };
};

export type AiContentItem = {
  __typename?: "AiContentItem";
  content: Scalars["String"]["output"];
  url_pdf: Scalars["String"]["output"];
};

export type AiLessonResponse = {
  __typename?: "AiLessonResponse";
  content: Array<AiContentItem>;
  lesson_id: Scalars["String"]["output"];
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  accessToken?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type CancelPaymentInput = {
  paymentId: Scalars["String"]["input"];
};

export type CheckPaymentStatusInput = {
  paymentId: Scalars["String"]["input"];
};

export type CompleteCourseResponse = {
  __typename?: "CompleteCourseResponse";
  count: Scalars["Float"]["output"];
  data?: Maybe<Array<CompleteCourseReturn>>;
};

export type CompleteCourseReturn = {
  __typename?: "CompleteCourseReturn";
  abstract?: Maybe<Scalars["String"]["output"]>;
  courseName: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  isDone: Scalars["Boolean"]["output"];
  keyLearnings: Array<Scalars["String"]["output"]>;
};

export type Conversation = {
  __typename?: "Conversation";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  isGroup: Scalars["Boolean"]["output"];
  messages?: Maybe<Array<Message>>;
  participants: Array<ConversationParticipant>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type ConversationParticipant = {
  __typename?: "ConversationParticipant";
  conversationId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  joinedAt: Scalars["DateTime"]["output"];
  user?: Maybe<UserResponse>;
  userId: Scalars["String"]["output"];
};

export type ConversationResponse = {
  __typename?: "ConversationResponse";
  createdAt: Scalars["DateTime"]["output"];
  creatorId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ConversationReturn = {
  __typename?: "ConversationReturn";
  conversations: Array<ConversationResponse>;
  count?: Maybe<Scalars["Float"]["output"]>;
  isSuccess: Scalars["Boolean"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
};

export type CourseDto = {
  __typename?: "CourseDto";
  abstract?: Maybe<Scalars["String"]["output"]>;
  courseName: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  keyLearnings: Array<Scalars["String"]["output"]>;
  status?: Maybe<StatusCourse>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type CoursePriceDto = {
  __typename?: "CoursePriceDto";
  id: Scalars["String"]["output"];
  isFree: Scalars["Boolean"]["output"];
  originalPrice: Scalars["Float"]["output"];
  salePrice?: Maybe<Scalars["Float"]["output"]>;
};

export type CourseReturn = {
  __typename?: "CourseReturn";
  count?: Maybe<Scalars["Float"]["output"]>;
  courses: Array<CourseDto>;
  isSuccess: Scalars["Boolean"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
};

export type CreateConversationInput = {
  creatorId: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateCourseDto = {
  abstract?: InputMaybe<Scalars["String"]["input"]>;
  courseName: Scalars["String"]["input"];
  creatorId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateEnrollmentInput = {
  courseId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type CreateLessonExplanationInput = {
  courseId: Scalars["String"]["input"];
  emotion: Scalars["String"]["input"];
  lessonId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type CreateLessonFromAiInput = {
  abstract: Scalars["String"]["input"];
  course_id: Scalars["String"]["input"];
  lessonName: Scalars["String"]["input"];
};

export type CreateMessage2Input = {
  conversationId: Scalars["String"]["input"];
  lesson_id?: InputMaybe<Scalars["String"]["input"]>;
  messages?: InputMaybe<Scalars["String"]["input"]>;
  question?: InputMaybe<Scalars["String"]["input"]>;
  user_id?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateMindMapInput = {
  courseId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateNodeInput = {
  description: Scalars["String"]["input"];
  mindMapId?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Scalars["Float"]["input"]>;
  parentId?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type CreateNoteInput = {
  content: Scalars["String"]["input"];
  enrollmentId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreatePaymentInput = {
  courseId: Scalars["String"]["input"];
};

export type CreateProgressInput = {
  courseId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type CreateReviewInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  courseId: Scalars["String"]["input"];
  rating: Scalars["Int"]["input"];
};

export type CreateSystemPromptInput = {
  content: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type Document = {
  __typename?: "Document";
  createdAt: Scalars["DateTime"]["output"];
  fileName: Scalars["String"]["output"];
  fileSize: Scalars["Int"]["output"];
  fileType: Scalars["String"]["output"];
  fileUrl: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  publicId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  uploadedBy?: Maybe<Scalars["String"]["output"]>;
};

export type EnrollmentResponse = {
  __typename?: "EnrollmentResponse";
  courseId: Scalars["String"]["output"];
  enrolledAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type GenericResponse = {
  __typename?: "GenericResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type InProgressCourseResponse = {
  __typename?: "InProgressCourseResponse";
  count: Scalars["String"]["output"];
  data?: Maybe<Array<InProgressCourseReturn>>;
  progress?: Maybe<Scalars["Float"]["output"]>;
};

export type InProgressCourseReturn = {
  __typename?: "InProgressCourseReturn";
  abstract?: Maybe<Scalars["String"]["output"]>;
  courseName: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  isDone: Scalars["Boolean"]["output"];
  keyLearnings: Array<Scalars["String"]["output"]>;
};

export type InitEnrollProgessReturn = {
  __typename?: "InitEnrollProgessReturn";
  count?: Maybe<Scalars["Float"]["output"]>;
  isSuccess: Scalars["Boolean"]["output"];
  lessonProgress: Array<ProgressLessonResponse>;
  message?: Maybe<Scalars["String"]["output"]>;
  progress: Array<ProgressResponse>;
};

export type LessonDto = {
  __typename?: "LessonDto";
  abstract?: Maybe<Scalars["String"]["output"]>;
  courseId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  lessonName: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type LessonExplanationResponse = {
  __typename?: "LessonExplanationResponse";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type LessonReturn = {
  __typename?: "LessonReturn";
  count?: Maybe<Scalars["Float"]["output"]>;
  isSuccess: Scalars["Boolean"]["output"];
  lessons: Array<LessonDto>;
  message?: Maybe<Scalars["String"]["output"]>;
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MarkCompleteInput = {
  lessonId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type Message = {
  __typename?: "Message";
  content: Scalars["String"]["output"];
  conversationId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  read: Scalars["Boolean"]["output"];
  sender?: Maybe<UserResponse>;
  senderId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type MessageResponse = {
  __typename?: "MessageResponse";
  agent?: Maybe<Scalars["String"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  conversationId?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  response?: Maybe<Scalars["String"]["output"]>;
  senderType?: Maybe<SenderType>;
  timestamp?: Maybe<Scalars["DateTime"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type MindMapResponse = {
  __typename?: "MindMapResponse";
  courseId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  nodes?: Maybe<Array<Maybe<NodeResponse>>>;
  title: Scalars["String"]["output"];
};

export type MindMapReturn = {
  __typename?: "MindMapReturn";
  data: MindMapResponse;
  message: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  cancelPayment: Scalars["Boolean"]["output"];
  createConversation: ConversationReturn;
  createConversationChat: Conversation;
  createCourse: CourseReturn;
  createLessonExplanation: LessonExplanationResponse;
  createLessonFromAi: AiLessonResponse;
  createMessage: MessageResponse;
  createMindMap: MindMapReturn;
  createNode: NodeReturn;
  createNote: NoteResponse;
  createPayment: PaymentResponse;
  createReview: ReviewResponse;
  createSocketToken: Scalars["String"]["output"];
  createSystemPrompt: SystemPromptResponse;
  createUser: UserResponse;
  deleteConversation: ConversationReturn;
  deleteCourse: CourseReturn;
  deleteDocument: UploadResponse;
  deleteLesson: LessonReturn;
  deleteLessonExplanation: LessonExplanationResponse;
  deleteMessage: MessageResponse;
  deleteMindMap: MindMapReturn;
  deleteNode: NodeReturn;
  deleteNote: NoteResponse;
  deleteSystemPrompt: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  enrollCourse: EnrollmentResponse;
  googleLogin: AuthResponse;
  initProgressEnroll: InitEnrollProgessReturn;
  login: AuthResponse;
  logout: GenericResponse;
  markCompleteLesson: ProgressLessonReturn;
  markDone: LessonReturn;
  publishCourse: CourseReturn;
  refresh: GenericResponse;
  register: GenericResponse;
  rejectCourse: CourseReturn;
  updateAdmin: UserResponse;
  updateConversation: ConversationReturn;
  updateCourse: CourseReturn;
  updateLesson: LessonReturn;
  updateLessonExplanation: LessonExplanationResponse;
  updateMessage: MessageResponse;
  updateMindMap: MindMapReturn;
  updateNode: NodeReturn;
  updateNote: NoteResponse;
  updatePaymentStatus: PaymentStatusResponse;
  updateProgress: ProgressReturn;
  updateSystemPrompt: SystemPromptResponse;
  updateUser: UserReturn;
  uploadDocument: UploadResponse;
  verifyEmail: GenericResponse;
};

export type MutationCancelPaymentArgs = {
  input: CancelPaymentInput;
};

export type MutationCreateConversationArgs = {
  data: CreateConversationInput;
};

export type MutationCreateConversationChatArgs = {
  title?: InputMaybe<Scalars["String"]["input"]>;
  userIds: Array<Scalars["String"]["input"]>;
};

export type MutationCreateCourseArgs = {
  data: CreateCourseDto;
};

export type MutationCreateLessonExplanationArgs = {
  data: CreateLessonExplanationInput;
};

export type MutationCreateLessonFromAiArgs = {
  data: CreateLessonFromAiInput;
  pdfFile: Scalars["Upload"]["input"];
};

export type MutationCreateMessageArgs = {
  data: CreateMessage2Input;
};

export type MutationCreateMindMapArgs = {
  data: CreateMindMapInput;
};

export type MutationCreateNodeArgs = {
  data: CreateNodeInput;
};

export type MutationCreateNoteArgs = {
  data: CreateNoteInput;
};

export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};

export type MutationCreateReviewArgs = {
  data: CreateReviewInput;
};

export type MutationCreateSystemPromptArgs = {
  data: CreateSystemPromptInput;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteConversationArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteCourseArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteDocumentArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteLessonArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteLessonExplanationArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteMessageArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteMindMapArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteNodeArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteNoteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteSystemPromptArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["String"]["input"];
};

export type MutationEnrollCourseArgs = {
  input: CreateEnrollmentInput;
};

export type MutationGoogleLoginArgs = {
  idToken: Scalars["String"]["input"];
};

export type MutationInitProgressEnrollArgs = {
  input: CreateProgressInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationMarkCompleteLessonArgs = {
  input: MarkCompleteInput;
};

export type MutationMarkDoneArgs = {
  id: Scalars["String"]["input"];
  isDone: Scalars["Boolean"]["input"];
};

export type MutationPublishCourseArgs = {
  courseId: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationRejectCourseArgs = {
  courseId: Scalars["String"]["input"];
};

export type MutationUpdateAdminArgs = {
  data: UpdateUserAdminInput;
};

export type MutationUpdateConversationArgs = {
  data: UpdateConversationInput;
};

export type MutationUpdateCourseArgs = {
  data: UpdateCourseDto;
};

export type MutationUpdateLessonArgs = {
  data: UpdateLessonDto;
};

export type MutationUpdateLessonExplanationArgs = {
  data: UpdateLessonExplanationInput;
};

export type MutationUpdateMessageArgs = {
  data: UpdateMessageInput;
};

export type MutationUpdateMindMapArgs = {
  data: UpdateMindMapInput;
  id: Scalars["String"]["input"];
};

export type MutationUpdateNodeArgs = {
  data: UpdateNodeInput;
  id: Scalars["String"]["input"];
};

export type MutationUpdateNoteArgs = {
  data: UpdateNoteInput;
  id: Scalars["String"]["input"];
};

export type MutationUpdatePaymentStatusArgs = {
  input: UpdatePaymentStatus;
};

export type MutationUpdateProgressArgs = {
  input: UpdateProgressInput;
};

export type MutationUpdateSystemPromptArgs = {
  data: UpdateSystemPromptInput;
  id: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationUploadDocumentArgs = {
  file: Scalars["Upload"]["input"];
  uploadedBy?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationVerifyEmailArgs = {
  token: Scalars["String"]["input"];
};

export type NodeResponse = {
  __typename?: "NodeResponse";
  children?: Maybe<Array<Maybe<NodeResponse>>>;
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  order: Scalars["Float"]["output"];
  title: Scalars["String"]["output"];
};

export type NodeReturn = {
  __typename?: "NodeReturn";
  data: NodeResponse;
  message: Scalars["String"]["output"];
};

export type NoteResponse = {
  __typename?: "NoteResponse";
  count?: Maybe<Scalars["Float"]["output"]>;
  data?: Maybe<NoteReturn>;
  isSuccess: Scalars["Boolean"]["output"];
  message: Scalars["String"]["output"];
};

export type NoteReturn = {
  __typename?: "NoteReturn";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  enrollmentId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type Payment = {
  __typename?: "Payment";
  amount: Scalars["Float"]["output"];
  course?: Maybe<CourseDto>;
  courseId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  currency: Scalars["String"]["output"];
  expiredAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  orderId: Scalars["String"]["output"];
  paidAt?: Maybe<Scalars["DateTime"]["output"]>;
  paymentGatewayData?: Maybe<Scalars["JSON"]["output"]>;
  paymentStatus: Scalars["String"]["output"];
  payosAccountName?: Maybe<Scalars["String"]["output"]>;
  payosAccountNumber?: Maybe<Scalars["String"]["output"]>;
  payosBin?: Maybe<Scalars["String"]["output"]>;
  payosCheckoutUrl?: Maybe<Scalars["String"]["output"]>;
  payosOrderCode?: Maybe<Scalars["BigInt"]["output"]>;
  payosQrCode?: Maybe<Scalars["String"]["output"]>;
  transactionId?: Maybe<Scalars["String"]["output"]>;
  transactions?: Maybe<Array<Transaction>>;
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["String"]["output"];
};

export type PaymentResponse = {
  __typename?: "PaymentResponse";
  accountName?: Maybe<Scalars["String"]["output"]>;
  accountNumber?: Maybe<Scalars["String"]["output"]>;
  amount: Scalars["Float"]["output"];
  bin?: Maybe<Scalars["String"]["output"]>;
  checkoutUrl?: Maybe<Scalars["String"]["output"]>;
  currency: Scalars["String"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  orderId: Scalars["String"]["output"];
  qrCode?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["String"]["output"];
};

export type PaymentStatusResponse = {
  __typename?: "PaymentStatusResponse";
  isSuccess: Scalars["Boolean"]["output"];
  message: Scalars["String"]["output"];
  paidAt?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
};

export type ProgressLessonResponse = {
  __typename?: "ProgressLessonResponse";
  completeAt?: Maybe<Scalars["DateTime"]["output"]>;
  courseId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  isCompleted: Scalars["Boolean"]["output"];
  isUnlocked: Scalars["Boolean"]["output"];
  lessonId: Scalars["String"]["output"];
  lessonOrder: Scalars["Float"]["output"];
  userId: Scalars["String"]["output"];
};

export type ProgressLessonReturn = {
  __typename?: "ProgressLessonReturn";
  count?: Maybe<Scalars["Float"]["output"]>;
  isSuccess: Scalars["Boolean"]["output"];
  lessonProgress: Array<ProgressLessonResponse>;
  message?: Maybe<Scalars["String"]["output"]>;
};

export type ProgressResponse = {
  __typename?: "ProgressResponse";
  completedLessons: Scalars["Float"]["output"];
  courseId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  lastCompleteAt?: Maybe<Scalars["DateTime"]["output"]>;
  lastCompletedLessonId?: Maybe<Scalars["String"]["output"]>;
  percentage: Scalars["Float"]["output"];
  status: ProgressStatusEnum;
  totalLessons: Scalars["Float"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["String"]["output"];
};

export type ProgressReturn = {
  __typename?: "ProgressReturn";
  count?: Maybe<Scalars["Float"]["output"]>;
  isSuccess: Scalars["Boolean"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  progress: Array<ProgressResponse>;
};

export enum ProgressStatusEnum {
  Completed = "COMPLETED",
  InProgress = "IN_PROGRESS",
}

export type Query = {
  __typename?: "Query";
  INSTRUCTOR: Scalars["String"]["output"];
  checkPaymentStatus: PaymentStatusResponse;
  conversation?: Maybe<ConversationResponse>;
  countInProgressEnrollments?: Maybe<InProgressCourseResponse>;
  countSuccessEnrollments?: Maybe<CompleteCourseResponse>;
  currentUser: UserReturn;
  findEnrollment?: Maybe<EnrollmentResponse>;
  getAllCourses: CourseReturn;
  getAllDocuments: Array<Document>;
  getAllLessons: LessonReturn;
  getAllNodeMindMap?: Maybe<Array<NodeResponse>>;
  getAllPublishedCourses: CourseReturn;
  getCourseById?: Maybe<CourseDto>;
  getCourseByUserId?: Maybe<Array<CourseDto>>;
  getCoursePrice: CoursePriceDto;
  getCoursesByStatus: CourseReturn;
  getDocumentById?: Maybe<Document>;
  getLessonById?: Maybe<LessonReturn>;
  getLessonsByCourseId: LessonReturn;
  getMessages: Array<Message>;
  getMindMapByCourse?: Maybe<MindMapResponse>;
  getMyConversations: Array<Conversation>;
  getNodeById?: Maybe<NodeResponse>;
  getNotesByEnrollment?: Maybe<Array<Maybe<NoteReturn>>>;
  getProgress: ProgressReturn;
  getProgressByUserAndCourse: ProgressReturn;
  getProgressLessonByUserAndCourse: ProgressLessonReturn;
  getReviewsByCourse?: Maybe<ReviewResponse>;
  getSectionByLesson?: Maybe<Array<SectionResponse>>;
  getUserEnrollments: Array<EnrollmentResponse>;
  hello: Scalars["String"]["output"];
  lessonExplanation?: Maybe<LessonExplanationResponse>;
  lessonExplanationByLessonAndUser?: Maybe<LessonExplanationResponse>;
  message?: Maybe<MessageResponse>;
  messagesByConversation: Array<MessageResponse>;
  myConversations: Array<ConversationResponse>;
  myPayments: Array<Payment>;
  payment?: Maybe<Payment>;
  systemPrompt: SystemPromptResponse;
  systemPrompts: Array<SystemPromptResponse>;
  user: UserResponse;
  userAdmin: UserResponse;
  users: UserReturn;
};

export type QueryCheckPaymentStatusArgs = {
  input: CheckPaymentStatusInput;
};

export type QueryConversationArgs = {
  id: Scalars["String"]["input"];
};

export type QueryCountInProgressEnrollmentsArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryCountSuccessEnrollmentsArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryFindEnrollmentArgs = {
  courseId: Scalars["String"]["input"];
};

export type QueryGetAllCoursesArgs = {
  skip: Scalars["Float"]["input"];
};

export type QueryGetAllNodeMindMapArgs = {
  mindmapId: Scalars["String"]["input"];
};

export type QueryGetAllPublishedCoursesArgs = {
  skip: Scalars["Float"]["input"];
};

export type QueryGetCourseByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetCourseByUserIdArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetCoursePriceArgs = {
  courseId: Scalars["String"]["input"];
};

export type QueryGetCoursesByStatusArgs = {
  skip: Scalars["Float"]["input"];
  status: StatusCourse;
};

export type QueryGetDocumentByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetLessonByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetLessonsByCourseIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetMessagesArgs = {
  conversationId: Scalars["String"]["input"];
  take?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetMindMapByCourseArgs = {
  courseId: Scalars["String"]["input"];
};

export type QueryGetNodeByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetNotesByEnrollmentArgs = {
  enrollmentId: Scalars["String"]["input"];
};

export type QueryGetProgressArgs = {
  progressId: Scalars["String"]["input"];
};

export type QueryGetProgressByUserAndCourseArgs = {
  courseId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type QueryGetProgressLessonByUserAndCourseArgs = {
  courseId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type QueryGetReviewsByCourseArgs = {
  courseId: Scalars["String"]["input"];
};

export type QueryGetSectionByLessonArgs = {
  lessonId: Scalars["String"]["input"];
};

export type QueryGetUserEnrollmentsArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryLessonExplanationArgs = {
  id: Scalars["String"]["input"];
};

export type QueryLessonExplanationByLessonAndUserArgs = {
  lessonId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type QueryMessageArgs = {
  id: Scalars["String"]["input"];
};

export type QueryMessagesByConversationArgs = {
  conversationId: Scalars["String"]["input"];
};

export type QueryPaymentArgs = {
  paymentId: Scalars["String"]["input"];
};

export type QuerySystemPromptArgs = {
  id: Scalars["String"]["input"];
};

export type QueryUserAdminArgs = {
  userId: Scalars["String"]["input"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Review = {
  __typename?: "Review";
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  rating: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: UserResponse;
};

export type ReviewResponse = {
  __typename?: "ReviewResponse";
  isSuccess: Scalars["Boolean"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  reviews: Array<Review>;
};

export type SectionResponse = {
  __typename?: "SectionResponse";
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  lecturer_segment?: Maybe<Scalars["JSON"]["output"]>;
  lessonId: Scalars["String"]["output"];
  order: Scalars["Float"]["output"];
  urlPdf: Scalars["String"]["output"];
};

export enum SenderType {
  Ai = "AI",
  User = "USER",
}

export enum StatusCourse {
  Pending = "Pending",
  Published = "Published",
  Rejected = "Rejected",
}

export type Subscription = {
  __typename?: "Subscription";
  messageAdded: MessageResponse;
};

export type SubscriptionMessageAddedArgs = {
  conversationId: Scalars["String"]["input"];
};

export type SystemPromptResponse = {
  __typename?: "SystemPromptResponse";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type Transaction = {
  __typename?: "Transaction";
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  currency: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  gatewayResponse?: Maybe<Scalars["JSON"]["output"]>;
  gatewayTransactionId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  paymentId: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
  transactionType: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type UpdateConversationInput = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCourseDto = {
  abstract?: InputMaybe<Scalars["String"]["input"]>;
  courseName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
};

export type UpdateLessonDto = {
  abstract?: InputMaybe<Scalars["String"]["input"]>;
  courseId: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
  lessonName: Scalars["String"]["input"];
};

export type UpdateLessonExplanationInput = {
  content: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
};

export type UpdateMessageInput = {
  content: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
};

export type UpdateMindMapInput = {
  courseId?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type UpdateNodeInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  mindMapId?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Scalars["Float"]["input"]>;
  title: Scalars["String"]["input"];
};

export type UpdateNoteInput = {
  content: Scalars["String"]["input"];
  courseId?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type UpdatePaymentStatus = {
  orderCode: Scalars["String"]["input"];
  status: Scalars["String"]["input"];
};

export type UpdateProgressInput = {
  completedLessons: Scalars["Float"]["input"];
  progressId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type UpdateSystemPromptInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserAdminInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadResponse = {
  __typename?: "UploadResponse";
  document?: Maybe<Document>;
  success: Scalars["Boolean"]["output"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  avatar?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type UserReturn = {
  __typename?: "UserReturn";
  count?: Maybe<Scalars["Float"]["output"]>;
  isSuccess: Scalars["Boolean"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  users: Array<UserResponse>;
};
