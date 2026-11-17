
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registerNumber: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    technicalSkills: {
        type: [String],
        default: []
    },
    aptitudeScore: {
        type: Number,
        default: 0
    },
    communicationSkills: {
        type: String,
        required: true
    },
    placementReadiness: {
        type: String,
        default: "Not Assessed"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
