import {beforeEach, afterEach, describe, expect, test} from "@jest/globals";
import {collectFormProperty} from "../../src/littled-utils.js";

describe('SiteUtils.collectFormProperty()', () => {

    beforeEach(() => {
        document.body.innerHTML = `
<form>
    <input type="hidden" name="itqt" value="2" />
    <input type="hidden" name="ciid" value="19" />
</form>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test.each`
    key        | expected
    ${"itqt"}  | ${"2"}
    ${"ciid"}  | ${"19"}
    ${"bogus"} | ${null}
    `('input named "$key" should return "$expected"',
        ({key, expected}) => {
        expect(collectFormProperty(key)).toEqual({[key]: expected});
    });
});