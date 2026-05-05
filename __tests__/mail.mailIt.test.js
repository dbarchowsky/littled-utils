import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import { mailIt } from '../src/mail';

describe('mailIt', () => {
    let navigateSpy;

    beforeEach(() => {
        navigateSpy = jest.spyOn(mailIt, '_navigate').mockImplementation(() => {});
    });

    afterEach(() => {
        navigateSpy.mockRestore();
    });

    it('should set window.location.href correctly without a subject', () => {
        mailIt('user', 'example', 'com');
        expect(navigateSpy).toHaveBeenCalledWith('mailto:user@example.com');
    });

    it('should set window.location.href correctly with a subject', () => {
        mailIt('user', 'example', 'com', 'Hello World');
        expect(navigateSpy).toHaveBeenCalledWith('mailto:user@example.com?subject=Hello%20World');
    });

    it('should handle special characters in the subject', () => {
        mailIt('user', 'example', 'com', 'Testing & Encoding');
        expect(navigateSpy).toHaveBeenCalledWith('mailto:user@example.com?subject=Testing%20%26%20Encoding');
    });
});