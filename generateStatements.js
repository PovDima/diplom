const mongoose = require('mongoose');
require('dotenv').config('./.env');
const fs = require('fs')

const Statement = require("./models/Statement");
const Offer = require("./models/Offer");
const { NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_ATLAS, PORT } = process.env;

const persons = [
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
  Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
]

const sampleStatement = (statementId, personaId, offerName, specialty, structuralUnit, priority) => {
  return {
    statementId,
    personaId,
    proposeType: 'Відкрита',
    isForeigner: 'Ні',
    offerName,
    okr: 'Магістр',
    admissionBased: 'Бакалавр',
    specialty,
    specialization: '',
    studyForm: 'Денна',
    course: '1 Курс',
    structuralUnit,
    isTrainingPeriodReduced: 'Ні',
    isElectronicApplication: 'Ні',
    statement: `Тест Тест ${statementId} 31.10.1999`,
    contactNumber: '+380(99)-999-99-99',
    electronicAddress: `test${personaId}.@ukr.net`,
    sex: 'Жіноча',
    isCitizenOfUkraine: 'Так',
    statementStatus: 'Допущено',
    personalFileCode: '',
    competitiveScore: Math.floor(Math.random() * (Math.floor(200) - Math.ceil(1) + 1)) + Math.ceil(1),
    priority,
    sequenceRankingSameNumberOfPoints: '',
    isParticipatesCompetitionStateOrRegional: 'Так',
    isParticipatesCompetitionIndividualsOrLegal: 'Так',
    typeCompetitionRecomendation: 'На загальних умовах',
    isRecommendedByInterview: 'Ні',
    isOriginalSubmitted: 'Так',
    isLocationOriginalsProvided: 'Ні',
    categoryForeigner: '',
    preferentialCategories: '',
    actNumber: '',
    cancelReason: '',
    isPersonClaims200: 'Ні',
    isPersonVillageСoef: 'Ні',
    isPretendQuota3: 'Ні',
    enrollmentOrder: '',
    deductionReasons: '',
    isPretendContract: 'Так',
    isPretendBudget: 'Так',
    reasonForContractOnly: '',
    reasonForContractOnlyOther: '',
    isObtainedForBudget: 'не здобувався',
    receiveOtherEducationForBudget: 'Ні',
    isIntroductionToTheSame: 'Ні',
    isGetDegree: 'Ні',
    isNeedToPassAdditionalExams: 'Ні',
    documentType: 'Диплом бакалавра',
    documentSeries: 'B21',
    documentNumber: '171917',
    documentIssuanceDate: '2021-06-29T21:00:00.000Z',
    documentIssuedBy: 'Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»',
    honor: '',
    isScanningAdded: 'Ні',
    addedTimeInEDEBO: '2021-06-29T21:00:00.000Z',
    isNeedChangeZNO: 'Ні',
    isRecommendedByResultOfAddressBudgetOrder: 'Так',
    typeCompetitionRecomendationOfAddress: 'На загальних умовах',
    priorityStatement: '1',
    isRecommendedOnCanceled: 'Ні',
    lastTimeChange: '2021-06-29T21:00:00.000Z',
    addedStatement: '',
    averageEducationDocumentScore: '',
    znoUkrainian: '',
    znoUkrainianLiterature: '',
    znoUkrainianHistory: '',
    znoMathematics: '',
    znoBiology: '',
    znoGeography: '',
    znoPhysics: '',
    znoChemistry: '',
    znoEnglish: '',
    znoFrench: '',
    znoGerman: '',
    znoSpanish: '',
    dpo: '',
    dpoSeries: '',
    dpoNumber: '',
    dpoIssueDate: '',
    dpoValidUntil: '',
    rnokpp: '',
  }
}
const db = MONGO_ATLAS ? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@masterdegree.xomet.mongodb.net/masterdegree?retryWrites=true&w=majority` : "mongodb://localhost:27017/masterdegree"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(db, options).then(async () => {
  (async () => {
    console.log('conected')
    console.time('a')
    const results = []
    const offers = await Offer.find({ educationalDegree: 'Магістр' }, { name: 1, offerId: 1, seatsNumber: 1, specialtyCode: 1, specialty: 1, structuralUnit: 1 });
    const result = offers.slice(0, 5).forEach((offer, index) => {
      const { name, specialtyCode, structuralUnit, specialty } = offer
      persons.forEach((person) => results.push(sampleStatement(
        Math.floor(Math.random() * (Math.floor(20000) - Math.ceil(1) + 1)) + Math.ceil(1),
        person,
        name,
        `${specialtyCode} ${specialty}`,
        structuralUnit,
        index + 1// Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1)) + Math.ceil(1)
      )))
    })
    await Statement.create(results)
    console.timeEnd('a')
    process.exit()
  })();
}).catch(() => {
  process.exit()
});

//отсекать по месту и все 
