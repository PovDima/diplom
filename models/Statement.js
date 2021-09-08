const mongoose = require("mongoose");

const StatementSchema = new mongoose.Schema(
  {
    statementId: {
      type: String,
      required: true,
      unique: true,
    },
    personaId: {
      type: String,
      default: "",
    },
    proposeType: {
      type: String,
      default: "",
    },
    isForeigner: {//Boolean
      type: String,
      default: "",
    },
    offerName: {
      type: String,
      default: "",
    },
    okr: {
      type: String,
      default: "",
    },
    admissionBased: {//Boolean
      type: String,
      default: "",
    },
    specialty: {
      type: String,
      default: "",
    },
    specialization: {
      type: String,
      default: "",
    },
    studyForm: {
      type: String,
      default: "",
    },
    course: {
      type: String,
      default: "",
    },
    structuralUnit: {
      type: String,
      default: "",
    },
    isTrainingPeriodReduced: {//Boolean
      type: String,
      default: "",
    },
    isElectronicApplication: {//Boolean
      type: String,
      default: "",
    },
    statement: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      default: "",
    },
    electronicAddress: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      default: "",
    },
    isCitizenOfUkraine: {//Boolean//Boolean
      type: String,
      default: "",
    },
    statementStatus: {
      type: String,
      default: "",
    },
    personalFileCode: {
      type: String,
      default: "",
    },
    competitiveScore: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      default: "",
    },
    sequenceRankingSameNumberOfPoints: {
      type: String,
      default: "",
    },
    isParticipatesCompetitionStateOrRegional: {//Boolean
      type: String,
      default: "",
    },
    isParticipatesCompetitionIndividualsOrLegal: {//Boolean
      type: String,
      default: "",
    },
    typeCompetitionRecomendation: {
      type: String,
      default: "",
    },
    isRecommendedByInterview: {//Boolean
      type: String,
      default: "",
    },
    isOriginalSubmitted: {//Boolean
      type: String,
      default: "",
    },
    isLocationOriginalsProvided: {//Boolean
      type: String,
      default: "",
    },
    categoryForeigner: {
      type: String,
      default: "",
    },
    preferentialCategories: {
      type: String,
      default: "",
    },
    actNumber: {
      type: String,
      default: "",
    },
    cancelReason: {
      type: String,
      default: "",
    },
    isPersonClaims200: {//Boolean
      type: String,
      default: "",
    },
    isPersonVillageСoef: {//Boolean
      type: String,
      default: "",
    },
    isPretendQuota3: {//Boolean
      type: String,
      default: "",
    },
    enrollmentOrder: {
      type: String,
      default: "",
    },
    deductionReasons: {
      type: String,
      default: "",
    },
    isPretendContract: {//Boolean
      type: String,
      default: "",
    },
    isPretendBudget: {//Boolean
      type: String,
      default: "",
    },
    reasonForContractOnly: {
      type: String,
      default: "",
    },
    reasonForContractOnlyOther: {
      type: String,
      default: "",
    },
    isObtainedForBudget: {//Boolean
      type: String,
      default: "",
    },
    receiveOtherEducationForBudget: {
      type: String,
      default: "",
    },
    isIntroductionToTheSame: {//Boolean
      type: String,
      default: "",
    },
    isGetDegree: {//Boolean
      type: String,
      default: "",
    },
    isNeedToPassAdditionalExams: {//Boolean
      type: String,
      default: "",
    },
    documentType: {
      type: String,
      default: "",
    },
    documentSeries: {
      type: String,
      default: "",
    },
    documentNumber: {
      type: String,
      default: "",
    },
    documentIssuanceDate: {
      type: String,
      default: "",
    },
    documentIssuedBy: {
      type: String,
      default: "",
    },
    honor: {
      type: String,
      default: "",
    },
    isScanningAdded: {//Boolean
      type: String,
      default: "",
    },
    addedTimeInEDEBO: {
      type: String,
      default: "",
    },
    isNeedChangeZNO: {//Boolean
      type: String,
      default: "",
    },
    isRecommendedByResultOfAddressBudgetOrder: {//Boolean
      type: String,
      default: "",
    },
    typeCompetitionRecomendationOfAddress: {
      type: String,
      default: "",
    },
    priorityStatement: {
      type: String,
      default: "",
    },
    isRecommendedOnCanceled: {//Boolean
      type: String,
      default: "",
    },
    lastTimeChange: {
      type: String,
      default: "",
    },
    addedStatement: {
      type: String,
      default: "",
    },
    averageEducationDocumentScore: {
      type: String,
      default: "",
    },
    znoUkrainian: {
      type: String,
      default: "",
    },
    znoUkrainianLiterature: {
      type: String,
      default: "",
    },
    znoUkrainianHistory: {
      type: String,
      default: "",
    },
    znoMathematics: {
      type: String,
      default: "",
    },
    znoBiology: {
      type: String,
      default: "",
    },
    znoGeography: {
      type: String,
      default: "",
    },
    znoPhysics: {
      type: String,
      default: "",
    },
    znoChemistry: {
      type: String,
      default: "",
    },
    znoEnglish: {
      type: String,
      default: "",
    },
    znoFrench: {
      type: String,
      default: "",
    },
    znoGerman: {
      type: String,
      default: "",
    },
    znoSpanish: {
      type: String,
      default: "",
    },
    dpo: {
      type: String,
      default: "",
    },
    dpoSeries: {
      type: String,
      default: "",
    },
    dpoNumber: {
      type: String,
      default: "",
    },
    dpoIssueDate: {
      type: String,
      default: "",
    },
    dpoValidUntil: {
      type: String,
      default: "",
    },
    rnokpp: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const Statement = mongoose.model("Statement", StatementSchema);

module.exports = Statement;

