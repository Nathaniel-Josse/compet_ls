const express = require('express');
const User = require('../models/Stat');
const router = express.Router();
const limits = require('../utils/set_limit.json'); // Assuming limits are stored in a JSON file
const Stat = require('../models/Stat');
const jwt = require('jsonwebtoken');
const { sendPushNotification} = require('../notifications');
const { subscriptions } = require('./subscribe');

router.post('/add', async (req, res) => {
    const { user_id, person, surface, heating_system} = req.body;

    if (!user_id || !person || !surface || !heating_system) {
        return res.status(400).json({ message: 'user_id, personNumber, surface, and total_consumption are required' });
    }

    try {
        const set_limit = limits[heating_system][surface][person][1] || 0;
        const stat = new Stat({
            user_id: user_id,
            person: person,
            surface : surface,
            heating_system: heating_system,
            total_consumed: [0.00, 0.00, 0.00, 0.00],
            limit: set_limit,
            limit_set_notif: false,
            co2_saved: 0,
            money_saved: 0,
            created_at: new Date(),
        });
        await stat.save();
        res.status(201).json({ message: 'Statistiques ajoutées avec succès', stat });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

    router.get('/user', async (req, res) => {
        const signupDate = new Date(req.query.signupDate);
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const stats = await Stat.find({ user_id: decoded.userId });
            if (stats.length === 0) {
                return res.status(404).json({ message: 'Aucune statistique trouvée pour cet utilisateur' });
            }

            const min = limits[stats[0].heating_system][stats[0].surface][stats[0].person][0] || 0;
            const max = limits[stats[0].heating_system][stats[0].surface][stats[0].person][1] || 0;

            const energie = Math.floor(Math.random() * (max - min + 1)) + min;

            let currentConsumption = 0.00;
            let dailyConsumption = 0.00;
            let monthlyConsumption = 0.00;
            let lastDayConsumption = 0.00;

            const now = new Date();
            const depuisMinuit = now.getHours() + now.getMinutes() / 60;
            const nowDay = now.getDate();
            const signupDay = signupDate.getDate();
            const nowHour = now.getHours();
            const signupHour = signupDate.getHours();
            if (nowDay !== signupDay) {

            }
            console.log(!stats[0].total_consumed)
            console.log(stats[0].total_consumed[0] !== 0.00)

            if(stats[0].total_consumed[0] === 0.00) {
                currentConsumption = (energie / 24)*1000;
                dailyConsumption = (currentConsumption/1000) * depuisMinuit;

                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const isSignupThisMonth = signupDate > startOfMonth;
                const daysPassed = isSignupThisMonth
                ? Math.floor((now - signupDate) / (1000 * 60 * 60 * 24))
                : new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                if (nowDay !== signupDay) {
                    monthlyConsumption = (daysPassed * energie) + dailyConsumption;
                } else if (nowHour !== signupHour) {
                    monthlyConsumption = (daysPassed * energie) + currentConsumption/100;
                } else {
                    monthlyConsumption = energie;
                }
            } else {
                const updateDate = stats[0].updated_at.getDate();
                const updateHour = stats[0].updated_at.getHours();
                if (nowDay !== updateDate) {
                    currentConsumption = 0.00 + (energie / 24)*1000;
                    lastDayConsumption = stats[0].total_consumed[1]
                    dailyConsumption = 0.00 + (currentConsumption/1000) * depuisMinuit;
                    monthlyConsumption = stats[0].total_consumed[2] + dailyConsumption;
                    ;
                } else if (nowHour !== updateHour) {
                    currentConsumption = stats[0].total_consumed[0] + (energie / 24)*1000;
                    dailyConsumption = stats[0].total_consumed[1] + (currentConsumption/1000) * depuisMinuit;
                    monthlyConsumption = stats[0].total_consumed[2] + currentConsumption/1000;
                    lastDayConsumption = stats[0].total_consumed[3];
                } else {
                    currentConsumption = stats[0].total_consumed[0];
                    dailyConsumption = stats[0].total_consumed[1];
                    monthlyConsumption = stats[0].total_consumed[2];
                    lastDayConsumption = stats[0].total_consumed[3];
                }
            }

            if (stats[0].limit_set_notif === true) {
                const payload = {
                    title: 'Alerte consommation',
                    body: `PLACEHOLDER.`,
                };

                if (Array.isArray(subscriptions)) {
                    for (const sub of subscriptions) {
                        await sendPushNotification(sub, payload);
                        }
                    }
            } else {
                console.error('Erreur notification:', err);
            }

            res.status(200).json({stats,
                currentConsumption: currentConsumption.toFixed(2),
                dailyConsumption: dailyConsumption.toFixed(2),
                monthlyConsumption: monthlyConsumption.toFixed(2),
                lastDayConsumption: lastDayConsumption.toFixed(2),}
            );
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur' });
        }
    });

router.put('/update', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { person, surface, heating_system, total_consumed, limit_set_notif, co2_saved, money_saved } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const stat = await Stat.find({ user_id: decoded.userId });
        if (stat.length === 0) {
                return res.status(404).json({ message: 'Aucune statistique trouvée pour cet utilisateur' });
        }
        if (person !== undefined) stat[0].person = person;
        if (surface !== undefined) stat[0].surface = surface;
        if (heating_system !== undefined) stat[0].heating_system = heating_system;
        if (person !== undefined || surface !== undefined || heating_system !== undefined) {
            const set_limit = limits[stat[0].heating_system][stat[0].surface][stat[0].person][1] || 0;
            stat.limit = set_limit;
        }
        if (total_consumed !== undefined) stat[0].total_consumed = total_consumed;
        if (stat[0].total_consumed[3] < stat[0].limit) stat[0].limit_set_notif = true;
        if (co2_saved !== undefined) stat[0].co2_saved = co2_saved;
        if (money_saved !== undefined) stat[0].money_saved = money_saved;
        stat[0].updated_at = new Date();

        await stat[0].save();
        res.status(200).json({ message: 'Statistique mise à jour avec succès', stat });
    } catch (error) {
        console.error('Error updating stats:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

module.exports = router;