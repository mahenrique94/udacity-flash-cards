import { permissions } from '../constants/permissions'
import { DB_NOTIFICATIONS } from '../constants/storage'

import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

import i18n from '../_translate/i18n'

import { not } from '../utils/functions'

const createNotification = () => ({
    android: { sound: true },
    body: i18n.t('notifications.body'),
    ios: { sound: true },
    title: i18n.t('notifications.title')
})

const clearNotifications = () => AsyncStorage.removeItem(DB_NOTIFICATIONS).then(Notifications.cancelAllScheduledNotificationsAsync)

const init = () =>
    AsyncStorage.getItem(DB_NOTIFICATIONS)
        .then(JSON.parse)
        .then(data => {
            if (not(data)) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === permissions.GRANTED) {
                        Notifications.cancelAllScheduledNotificationsAsync().then(() => {
                            const notification = createNotification()
                            const today = new Date()
                            today.setDate(today.getDate())
                            today.setHours(21, 0, 0)

                            Notifications.scheduleLocalNotificationAsync(notification, { time: today, repeat: 'day' })
                        })

                        AsyncStorage.setItem(DB_NOTIFICATIONS, JSON.stringify(true))
                    }
                })
            }
        })

export { clearNotifications, init }
