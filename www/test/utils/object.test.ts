import {describe, expect, test} from 'vitest';
import * as UtilsObject from '@utils/object';

describe('getType', () => {
  test('number', () => {
    expect(UtilsObject.getType(0)).toEqual('Number');
  });
  test('string', () => {
    expect(UtilsObject.getType('0')).toEqual('String');
  });
  test('boolean', () => {
    expect(UtilsObject.getType(true)).toEqual('Boolean');
  });
  test('object', () => {
    expect(UtilsObject.getType({})).toEqual('Object');
  });
  test('array', () => {
    expect(UtilsObject.getType([])).toEqual('Array');
  });
});


describe('hasType', () => {
  test('number', () => {
    expect(UtilsObject.hasType(0, 'Number')).toBeTruthy();
  });
  test('string', () => {
    expect(UtilsObject.hasType('0', 'String')).toBeTruthy();
  });
  test('boolean', () => {
    expect(UtilsObject.hasType(true, 'Boolean')).toBeTruthy();
  });
  test('object', () => {
    expect(UtilsObject.hasType({}, 'Object')).toBeTruthy();
  });
  test('array', () => {
    expect(UtilsObject.hasType([], 'Array')).toBeTruthy();
  });
});


describe('isEmpty', () => {
  test('number', () => {
    expect(UtilsObject.isEmpty(0)).toBeFalsy();
  });
  test('string', () => {
    expect(UtilsObject.isEmpty('')).toBeTruthy();
  });
  test('boolean', () => {
    expect(UtilsObject.isEmpty(false)).toBeFalsy();
  });
  test('object', () => {
    expect(UtilsObject.isEmpty({})).toBeTruthy();
  });
  test('array', () => {
    expect(UtilsObject.isEmpty([])).toBeTruthy();
  });
});
