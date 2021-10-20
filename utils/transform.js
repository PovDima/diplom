const csv = require('csv-parser')
const fs = require('fs');
const config = require('./config')

const offerTrasform = (offers) => {
  const offerMap = {
    'ID пропозиції': 'offerId',
    'КП внесено': 'isImported',
    'ПДЗ': 'pdz',
    'Вид пропозиції': 'type',
    'Іноземці': 'isForeigners',
    'Особливий вступ': 'isSpecialIntroduction',
    'Назва пропозиції': 'name',
    'Освітній ступінь': 'educationalDegree',
    'Вступ на основі': 'admissionBased',
    'Форма навчання': 'studyForm',
    'Курс': 'course',
    'Код спеціальності': 'specialtyCode',
    'Спеціальність': 'specialty',
    'Спеціалізація': 'specialization',
    'Тип програми магістра': 'masterType',
    'Освітні програми': 'educationalPrograms',
    'Структурний підрозділ': 'structuralUnit',
    'Кількість місць': 'seatsNumber',
    'Скорочений термін': 'isShortenedTerm',
    'Термін навчання': 'studyPeriod',
    'Початок навчання': 'studyStart',
    'Закінчення навчання': 'studyEnd',
    'Дата застосування пропозиції': 'dateApplication',
    'Дата останньої зміни': 'lastChange',
    'Дата завантаження ліцензії': 'licenseDownload',
    'Підстава ліцензії': 'licenseBasis',
    'МінКБР': 'minKBR',
    'Регіональне замовлення від': 'regionalOrder'
  }

  for (const offer of offers) {
    for (const [key, value] of Object.entries(offer)) {
      offer[offerMap[key] || 'offerId'] = value;
      delete offer[key]
    }
  }

  return offers
}

const statementsTransform = (statements) => {
  const statementMap = {
    'Ід заявки': 'statementId',
    'Ід персони': 'personaId',
    'Тип пропозиції': 'proposeType',
    'Чи іноземець': 'isForeigner',
    'Назва КП': 'offerName',
    'ОКР': 'okr',
    'Вступ на основі': 'admissionBased',
    'Спеціальність': 'specialty',
    'Спеціалізація': 'specialization',
    'Форма навчання': 'studyForm',
    'Курс': 'course',
    'Структурний підрозділ': 'structuralUnit',
    'Чи скорочений термін навчання': 'isTrainingPeriodReduced',
    'Чи електронна заява': 'isElectronicApplication',
    'Вступник': 'statement',
    'Контактний номер': 'contactNumber',
    'Електронна адреса': 'electronicAddress',
    'Стать': 'sex',
    'Чи громадянин України': 'isCitizenOfUkraine',
    'Статус заявки': 'statementStatus',
    'Група': 'group',
    'Номер (шифр) особової справи': 'personalFileCode',
    'Конкурсний бал': 'competitiveScore',
    'Пріоритет': 'priority',
    'Черговість в рейтингу з однаковою кількістю балів': 'sequenceRankingSameNumberOfPoints',
    'Бере участь в конкурсі на місця державного та регіонального замовлення': 'isParticipatesCompetitionStateOrRegional',
    'Бере участь в конкурсі на місця за кошти фізичних та юридичних осіб': 'isParticipatesCompetitionIndividualsOrLegal',
    'Тип конкурсу, за яким отримано рекомендацію': 'typeCompetitionRecomendation',
    'Чи рекомендовано за співбесідою': 'isRecommendedByInterview',
    'Чи подано оригінал': 'isOriginalSubmitted',
    'Чи подано довідку про місцезнаходження оригіналів': 'isLocationOriginalsProvided',
    'Категорія заяви іноземця': 'categoryForeigner',
    'Пільгові категорії': 'preferentialCategories',
    'Номер акту': 'actNumber',
    'Причини скасування': 'cancelReason',
    'Особа претендує на зарахування 200 балів': 'isPersonClaims200',
    'Особа претендує на застосування сільського коефіцієнту': 'isPersonVillageСoef',
    'Претендує на квоту 3': 'isPretendQuota3',
    'Наказ про зарахування': 'enrollmentOrder',
    'Причини відрахування': 'deductionReasons',
    'Претендує на контракт': 'isPretendContract',
    'Претендує на бюджет': 'isPretendBudget',
    'Причина допуску лише на контракт': 'reasonForContractOnly',
    "Опис причини допуску лише на контракт для причини 'Інша'": 'reasonForContractOnlyOther',
    'Чи здобувався ОКР уже за бюджет': 'isObtainedForBudget',
    'Право здобувати іншу освіту за бюджет': 'receiveOtherEducationForBudget',
    'Чи вступ на ту саму або споріднену галузь': 'isIntroductionToTheSame',
    'Чи здобуває ступінь(рівень) або вищий': 'isGetDegree',
    'Чи потрібно пройти додаткові вступні випробування': 'isNeedToPassAdditionalExams',
    'Тип документа': 'documentType',
    'Серія документа': 'documentSeries',
    'Номер документа': 'documentNumber',
    'Дата видачі документа': 'documentIssuanceDate',
    'Ким видано': 'documentIssuedBy',
    'Відзнака': 'honor',
    'Сканкопія додана': 'isScanningAdded',
    'Час додання заяви до ЄДЕБО': 'addedTimeInEDEBO',
    'Потрібно внести зміни в ЗНО': 'isNeedChangeZNO',
    'Чи рекомендовано за результатом адресного розміщення державного замовлення': 'isRecommendedByResultOfAddressBudgetOrder',
    'Тип конкурсу, за яким одержано рекомендацію за результатом адресного розміщення ДЗ': 'typeCompetitionRecomendationOfAddress',
    'Пріоритет заяви, яка отримала рекомендацію за результатом адресного розміщення ДЗ': 'priorityStatement',
    'Чи отримав рекомендацію на анульовану конкурсну пропозицію, за результатом адресного розміщення державного замовлення': 'isRecommendedOnCanceled',
    'Час останньої зміни': 'lastTimeChange',
    'Додав заяву': 'addedStatement',
    'Середній бал документа про освіту': 'averageEducationDocumentScore',
    'ЗНО.Українська мова': 'znoUkrainian',
    'ЗНО.Українська мова та література': 'znoUkrainianLiterature',
    'ЗНО.Історія України': 'znoUkrainianHistory',
    'ЗНО.Математика': 'znoMathematics',
    'ЗНО.Біологія': 'znoBiology',
    'ЗНО.Географія': 'znoGeography',
    'ЗНО.Фізика': 'znoPhysics',
    'ЗНО.Хімія': 'znoChemistry',
    'ЗНО.Англійська мова': 'znoEnglish',
    'ЗНО.Французька мова': 'znoFrench',
    'ЗНО.Німецька мова': 'znoGerman',
    'ЗНО.Іспанська мова': 'znoSpanish',
    'ДПО': 'dpo',
    'ДПО.Серія': 'dpoSeries',
    'ДПО.Номер': 'dpoNumber',
    'ДПО.Дата видачі': 'dpoIssueDate',
    'ДПО.Дійсний до': 'dpoValidUntil',
    'РНОКПП': 'rnokpp'
  }

  for (const statement of statements) {
    for (const [key, value] of Object.entries(statement)) {
      statement[statementMap[key] || 'statementId'] = value;
      delete statement[key]
    }
  }

  return statements
}
const parseCsv = (arr, filePath) =>
  new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", row => arr.push(row))
      .on("error", reject)
      .on("end", () => {
        resolve();
      });
  });

module.exports = {
  offerTrasform,
  statementsTransform,
  parseCsv
}
