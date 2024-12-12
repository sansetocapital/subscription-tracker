const cron = require("node-cron");
const  subscriptionService  = require("./services/subscriptionService");

cron.schedule("0 0 * * *", async () => {
    console.log("Running daily subscription expiry check...");
    try {
        const remindersSent = await subscriptionService.sendExpiryReminders();
        console.log(`${remindersSent} reminders sent successfully.`);
    } catch (error) {
        console.error("Error in daily subscription expiry check:", error);
    }
});
