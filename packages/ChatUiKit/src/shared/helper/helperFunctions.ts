import React from "react";
import { DeepPartial } from "./types";

export function deepMerge<
  T extends Record<string, any>,
  U extends DeepPartial<T> & Record<string, any>
>(obj1: T, obj2: U, ...rest: (DeepPartial<T> & Record<string, any>)[]): T & U {
  // Helper function to determine if a value is a plain object
  function isObject(value: any): value is object {
    if (React.isValidElement(value)) return false;
    return value && typeof value === "object" && !Array.isArray(value);
  }

  // Main deep merge function
  function merge(
    target: Record<string, any>,
    source: Record<string, any>,
    replace: boolean = false
  ): Record<string, any> {
    const output = replace ? target : { ...target };

    for (const key in source) {
      if (isObject(source[key])) {
        if (isObject(target[key])) {
          output[key] = merge(target[key], source[key]);
        } else {
          output[key] = merge({}, source[key]);
        }
      } else if (source[key] !== undefined) {
        output[key] = source[key];
      }
    }

    return output;
  }

  // Start merging obj1 and obj2, then recursively merge the rest of the objects
  let result = merge(obj1, obj2) as T & U;
  for (const obj of rest) {
    merge(result, obj, true) as T & U;
  }

  return result;
}

export function deepClone<T>(obj: T, seen = new WeakMap()): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (seen.has(obj)) {
    return seen.get(obj);
  }

  let clone: any;
  if (Array.isArray(obj)) {
    clone = [];
    seen.set(obj, clone);
    for (const item of obj) {
      clone.push(deepClone(item, seen));
    }
  } else {
    clone = Object.create(null); // Avoid prototype issues
    seen.set(obj, clone);

    for (const key of Object.keys(obj)) {
      clone[key] = deepClone((obj as any)[key], seen);
    }
  }

  return clone as T;
}
