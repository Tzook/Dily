'use strict';

/**
 * 
 */
class MathHelper {
    /**
     * 
     */
    getRandomNumber(start, end) {
        return (Math.random() * (end - start + 1) + start) | 0;
    }
}

module.exports = MathHelper;