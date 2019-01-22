module.exports = {
    // Helper to filter slots given their name, and potentially a lower threshold for the confidence level.
    // You can also use the onlyMostConfident boolean to return only a single slot with the highest confidence.
    // If no slot match the criterias, then returns null.
    getSlotsByName: (message, slotName, { threshold = 0, onlyMostConfident = false } = {}) => {
        if(onlyMostConfident) {
            return message.slots.reduce((acc, slot) => {
                if(slot.slot_name === slotName && slot.confidence > threshold) {
                    if(!acc || acc.confidence < slot.confidence)
                        return slot
                }
                return acc
            }, null)
        }
        return message.slots.filter(slot => slot.slot_name === slotName && slot.confidence > threshold)
    }
}