require('dotenv').config();

const mongoose = require('mongoose');
const statSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    person: {
        type: Number,
        required: true,
    },
    surface: {
        type: Number,
        required: true
    },
    heating_system: {
        type: String,
        required: true,
    },
    total_consumed: {
        type: [mongoose.Schema.Types.Mixed],
        required: false,
        default: [0.00, [0.00], [0.00], [0.00]] //[Consommation de l'heure, [Consommation journalière séquencé par heure], [Consommation des jours précédents séquencé par jour], [Consommation des mois dernier séquencer par mois]]
    },
    limit: {
        type: Number,
        required: false,
        default: 0.00
    },
    limit_set_notif: { //Faudra revoir ça car çc'est pas un élément modifiable par l'utilisateur
        type: Boolean,
        required: false,
        default: false
    },
    co2_saved: {
        type: Number,
        required: false,
        default: 0
    },
    money_saved: {
        type: Number,
        required: false,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Stat', statSchema, `${process.env.STATS}`);