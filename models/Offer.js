const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    offerId: {
      type: String,
      required: true,
      unique: true,
    },
    isImported: {
      type: String,//Boolean
      default: "",
    },
    pdz: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    isForeigners: {
      type: String,//Boolean
      default: "",
    },
    isSpecialIntroduction: {//Boolean
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    educationalDegree: {
      type: String,
      default: ""
    },
    admissionBased: {
      type: String,
      default: ""
    },
    studyForm: {
      type: String,
      default: ""
    },
    course: {
      type: String,
      default: "1 курс"
    },
    specialtyCode: {
      type: String,
      default: ""
    },
    specialty: {
      type: String,
      default: ""
    },
    specialization: {
      type: String,
      default: ""
    },
    masterType: {
      type: String,
      default: ""
    },
    educationalPrograms: {
      type: String,
      default: ""
    },
    structuralUnit: {
      type: String,
      default: ""
    },
    isShortenedTerm: {
      type: String,//Boolean
      default: ""
    },
    studyPeriod: {
      type: String,
      default: ""
    },
    studyStart: {
      type: Date
    },
    studyEnd: {
      type: Date
    },
    dateApplication: {
      type: Date
    },
    lastChange: {
      type: Date
    },
    licenseDownload: {
      type: Date
    },
    licenseBasis: {
      type: String,
      default: ""
    },
    minKBR: {
      type: String,
      default: ""
    },
    regionalOrder: {
      type: String
    }
  },
  { versionKey: false, timestamps: true }
);

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;

