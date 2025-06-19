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
            total_consumed: [0.00, [0.00], [0.00], [0.00]],
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
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const stats = await Stat.findOne({ user_id: decoded.userId });
            if (!stats) {
                return res.status(404).json({ message: 'Aucune statistique trouvée pour cet utilisateur' });
            }
            const pastLast = stats.total_consumed[2].length - 1
            const yearlyLast = stats.total_consumed[3].length - 1

            const currentConsumption = stats.total_consumed[0];
            const dailyConsumption = stats.total_consumed[1].reduce((a, b) => a+b, 0);
            const monthlyConsumption = stats.total_consumed[2][pastLast];
            const lastDayConsumption = stats.total_consumed[3][yearlyLast];

            if (stats.limit_set_notif === true) {
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
                console.error('Erreur notification:');
            }

            res.status(200).json({stats,
                currentConsumption: currentConsumption.toFixed(2),
                dailyConsumption: dailyConsumption.toFixed(2),
                monthlyConsumption: monthlyConsumption.toFixed(2),
                lastDayConsumption: lastDayConsumption.toFixed(2),}
            );
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur', error });
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
        const stat = await Stat.findOne({ user_id: decoded.userId });
        if (stat.length === 0) {
                return res.status(404).json({ message: 'Aucune statistique trouvée pour cet utilisateur' });
        }
        if (person !== undefined) stat.person = person;
        if (surface !== undefined) stat.surface = surface;
        if (heating_system !== undefined) stat.heating_system = heating_system;
        if (person !== undefined || surface !== undefined || heating_system !== undefined) {
            const set_limit = limits[stat.heating_system][stat.surface][stat.person] || 0;
            stat.limit = set_limit;
        }
        if (total_consumed !== undefined) stat.total_consumed = total_consumed;
        if (co2_saved !== undefined) stat.co2_saved = co2_saved;
        if (money_saved !== undefined) stat.money_saved = money_saved;
        stat[0].updated_at = new Date();

        await stat[0].save();
        res.status(200).json({ message: 'Statistique mise à jour avec succès', stat });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

router.put('/updateall', async (req, res) => {
    let now = new Date();
    let nowDay = now.getDate();
    let nowHour = now.getHours();
    let nowMonth = now.getMonth();

    try {
        const allStats = await Stat.find();

        for(const stats of allStats) {
            let min = limits[stats.heating_system][stats.surface][stats.person][0] || 0;
            let max = limits[stats.heating_system][stats.surface][stats.person][1] || 0;

            let energie = Math.floor(Math.random() * (max - min + 1)) + min;

            let pastLast = stats.total_consumed[2].length - 1
            let yearlyLast = stats.total_consumed[3].length - 1
            let dayLast = stats.total_consumed[1].length - 1
            let updateDate = stats.updated_at.getDate();
            let updateHour = stats.updated_at.getHours();
            let updateMonth = stats.updated_at.getMonth();

            if (updateDate !== nowDay) {
                if (updateMonth !== nowMonth) {
                    stats.total_consumed[3].push(Math.round((stats.total_consumed[1]))* 100) / 100;
                } else {
                    stats.total_consumed[3][yearlyLast] = Math.round((stats.total_consumed[3][yearlyLast] + stats.total_consumed[1])* 100) / 100;
                }
                stats.total_consumed[2].push(Math.round(stats.total_consumed[1].reduce((a, b) => a+b, 0) * 100) / 100);
                stats.total_consumed[2][pastLast] > stats.total_consumed[1] && stats.limit_set_notif === true ? stats.limit_set_notif = true : stats.limit_set_notif = false;
                stats.total_consumed[0] = Math.round((energie/24*1000)* 100) / 100;
                stats.total_consumed[1] = [Math.round((0.00 + stats.total_consumed[0])* 100) / 100] //Need to finish later

            } else if (updateHour !== nowHour && updateDate === nowDay) {
                stats.total_consumed[0] = Math.round((energie/24*1000)* 100) / 100;
                stats.total_consumed[1].push(Math.round(((stats.total_consumed[1][dayLast] + stats.total_consumed[0]/1000))* 100) / 100)
                stats.total_consumed[3][yearlyLast] = Math.round((stats.total_consumed[3][yearlyLast] + stats.total_consumed[0]/1000)* 100) / 100;
            } else if (stats.updated_at === stats.created_at) {
                stats.total_consumed[0] = Math.round((energie/24*1000)* 100) / 100;
                stats.total_consumed[1][0] = Math.round((energie/24)* 100) / 100;
                stats.total_consumed[3][0] = Math.round((energie/24)* 100) / 100;
            }
            stats.updated_at = now;
            stats.markModified('total_consumed');
            await stats.save()
        };
        res.status(200).json({ message: 'Statistiques mise à jour avec succès' });
    } catch(error) {
        res.status(500).json({ message: 'Server Error'});
    }
});

module.exports = router;