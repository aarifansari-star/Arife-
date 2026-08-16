import { PlayerColor } from '../types';

export const PATH_COORDS = [
  // 0-4 (Red path moving right)
  {r: 6, c: 1}, {r: 6, c: 2}, {r: 6, c: 3}, {r: 6, c: 4}, {r: 6, c: 5},
  // 5-10 (Moving up)
  {r: 5, c: 6}, {r: 4, c: 6}, {r: 3, c: 6}, {r: 2, c: 6}, {r: 1, c: 6}, {r: 0, c: 6},
  // 11-12 (Top cross)
  {r: 0, c: 7}, {r: 0, c: 8},
  // 13-17 (Moving down - Green start at 13)
  {r: 1, c: 8}, {r: 2, c: 8}, {r: 3, c: 8}, {r: 4, c: 8}, {r: 5, c: 8},
  // 18-23 (Moving right)
  {r: 6, c: 9}, {r: 6, c: 10}, {r: 6, c: 11}, {r: 6, c: 12}, {r: 6, c: 13}, {r: 6, c: 14},
  // 24-25 (Right cross)
  {r: 7, c: 14}, {r: 8, c: 14},
  // 26-30 (Moving left - Yellow start at 26)
  {r: 8, c: 13}, {r: 8, c: 12}, {r: 8, c: 11}, {r: 8, c: 10}, {r: 8, c: 9},
  // 31-36 (Moving down)
  {r: 9, c: 8}, {r: 10, c: 8}, {r: 11, c: 8}, {r: 12, c: 8}, {r: 13, c: 8}, {r: 14, c: 8},
  // 37-38 (Bottom cross)
  {r: 14, c: 7}, {r: 14, c: 6},
  // 39-43 (Moving up - Blue start at 39)
  {r: 13, c: 6}, {r: 12, c: 6}, {r: 11, c: 6}, {r: 10, c: 6}, {r: 9, c: 6},
  // 44-49 (Moving left)
  {r: 8, c: 5}, {r: 8, c: 4}, {r: 8, c: 3}, {r: 8, c: 2}, {r: 8, c: 1}, {r: 8, c: 0},
  // 50-51 (Left cross)
  {r: 7, c: 0}, {r: 6, c: 0}
];

export const HOME_COLS: Record<PlayerColor, {r: number, c: number}[]> = {
  red: [{r: 7, c: 1}, {r: 7, c: 2}, {r: 7, c: 3}, {r: 7, c: 4}, {r: 7, c: 5}],
  green: [{r: 1, c: 7}, {r: 2, c: 7}, {r: 3, c: 7}, {r: 4, c: 7}, {r: 5, c: 7}],
  yellow: [{r: 7, c: 13}, {r: 7, c: 12}, {r: 7, c: 11}, {r: 7, c: 10}, {r: 7, c: 9}],
  blue: [{r: 13, c: 7}, {r: 12, c: 7}, {r: 11, c: 7}, {r: 10, c: 7}, {r: 9, c: 7}]
};

// Map color to home block top-left coordinate (r, c)
export const HOME_BOX: Record<PlayerColor, {r: number, c: number}> = {
  red: {r: 0, c: 0},
  green: {r: 0, c: 9},
  yellow: {r: 9, c: 9},
  blue: {r: 9, c: 0}
};

// 4 goti positions inside the 6x6 home box
export const HOME_GOTI_OFFSETS = [
  {r: 1, c: 1}, {r: 1, c: 4},
  {r: 4, c: 1}, {r: 4, c: 4}
];
