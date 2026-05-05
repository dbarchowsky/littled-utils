import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import { redirectTo } from '../src/index.js';

describe('redirectTo', () => {
    let navigateSpy;

    beforeEach(() => {
        navigateSpy = jest.spyOn(redirectTo, '_navigate').mockImplementation(() => {});
    });

    afterEach(() => {
        navigateSpy.mockRestore();
    });

    it('should redirect to the specified URL', () => {
        redirectTo('https://bfhhandwriting.com');
        expect(navigateSpy).toHaveBeenCalledWith('https://bfhhandwriting.com');
    });
});